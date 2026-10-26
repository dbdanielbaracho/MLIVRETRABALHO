import {Injectable,OnModuleDestroy} from '@nestjs/common';
import {Pool,type PoolClient} from 'pg';

export const supportScopes=['owner','operator','role','dispatch'] as const;
export type SupportScope=typeof supportScopes[number];
export type SupportTransactions={transaction<T>(work:(client:PoolClient)=>Promise<T>):Promise<T>};
export const supportEnvironment=(scope:SupportScope)=>'PLATFORM_SUPPORT_'+scope.toUpperCase()+'_DATABASE_URL';
type Rights=Partial<Record<'SELECT'|'INSERT'|'UPDATE',string[]|'*'>>;
const common={identities:{SELECT:['id','deactivated_at']},platform_support_audit:{INSERT:['case_id','actor_identity_id','action']}} satisfies Record<string,Rights>;
const sharedFunctions=['platform_support_lock_administrator()','platform_support_dispatch_case_allowed(uuid,uuid,boolean)','platform_support_lock_owner_identity()'];
// An allowlist, also checked against effective column privileges before every transaction.
// This module never creates roles, grants ACLs, changes capability, or provisions people.
export const supportPermissions:Record<SupportScope,{tables:Record<string,Rights>;functions:string[]}>= {
 owner:{tables:{...common,platform_support_intents:{SELECT:'*',INSERT:['request_key','owner_identity_id','payload_hash'],UPDATE:['submitted_at']},platform_support_cases:{SELECT:'*',INSERT:['id','owner_identity_id','category','description'],UPDATE:['status','closed_at','updated_at']},platform_support_operators:{SELECT:'*'},platform_support_assignments:{SELECT:'*'},platform_support_responses:{SELECT:'*'}},functions:[...sharedFunctions,'platform_support_intake_available(boolean)']},
 operator:{tables:{...common,platform_support_cases:{SELECT:'*',UPDATE:['status','closed_at','updated_at']},platform_support_operators:{SELECT:'*'},platform_support_assignments:{SELECT:'*'},platform_support_responses:{SELECT:'*',INSERT:['request_key','case_id','operator_identity_id','body','resolves_case']}},functions:[...sharedFunctions,'platform_support_lock_operator()','platform_support_lock_assigned_case(uuid,boolean)']},
 role:{tables:{...common,platform_support_audit:{INSERT:['case_id','actor_identity_id','subject_identity_id','action']},platform_support_operators:{SELECT:'*',INSERT:['identity_id','active','revision'],UPDATE:['active','revision']},platform_support_cases:{SELECT:['id']},platform_support_assignments:{SELECT:['case_id','operator_identity_id','revoked_at','revision'],UPDATE:['revoked_at','revision']}},functions:[...sharedFunctions,'platform_support_lock_role_target(uuid,boolean)','platform_support_lock_role_cases(uuid)']},
 dispatch:{tables:{...common,platform_support_audit:{INSERT:['case_id','actor_identity_id','subject_identity_id','action']},platform_support_operators:{SELECT:'*'},platform_support_cases:{SELECT:['id','status','owner_identity_id']},platform_support_assignments:{SELECT:'*',INSERT:['case_id','operator_identity_id','revision'],UPDATE:['operator_identity_id','assigned_at','revoked_at','revision']}},functions:[...sharedFunctions,'platform_support_lock_dispatch_operator(uuid)','platform_support_lock_dispatch_case(uuid)']}
};

export function supportConfiguration(env:NodeJS.ProcessEnv):Record<SupportScope,string>|null{
 try{
  const base=new URL(env.DATABASE_URL??'');
  if(!['postgres:','postgresql:'].includes(base.protocol)||!base.username)return null;
  const urls=supportScopes.map(scope=>new URL(env[supportEnvironment(scope)]??''));
  for(const url of urls){
   if(!['postgres:','postgresql:'].includes(url.protocol)||!url.username||!url.password||url.hash||url.pathname==='/'||[...url.searchParams.keys()].some(key=>key!=='sslmode'))return null;
   if(!['localhost','127.0.0.1','[::1]'].includes(url.hostname)&&url.searchParams.get('sslmode')!=='verify-full')return null;
   // Same database, separate login for every business authority and for authentication.
   if(url.hostname!==base.hostname||(url.port||'5432')!==(base.port||'5432')||url.pathname!==base.pathname||decodeURIComponent(url.username)===decodeURIComponent(base.username))return null;
  }
  if(new Set(urls.map(url=>decodeURIComponent(url.username))).size!==supportScopes.length)return null;
  return Object.fromEntries(supportScopes.map((scope,i)=>[scope,urls[i]!.toString()])) as Record<SupportScope,string>;
 }catch{return null;}
}

@Injectable()
export class PlatformSupportDatabases implements OnModuleDestroy{
 private readonly configuration=supportConfiguration(process.env);
 private readonly pools=new Map<SupportScope,Pool>();
 forScope(scope:SupportScope):SupportTransactions{return {transaction:<T>(work:(client:PoolClient)=>Promise<T>)=>this.transaction(scope,work)};}
 private async attest(client:PoolClient,scope:SupportScope,connection:string){
  const url=new URL(connection),expected=decodeURIComponent(url.username),rights=supportPermissions[scope];
  const row=(await client.query(`SELECT current_user::text actor,session_user::text login,current_database() database,r.rolsuper,r.rolbypassrls,r.rolcreaterole,r.rolcreatedb,r.rolinherit,r.rolreplication,r.rolcanlogin,
   EXISTS(SELECT 1 FROM pg_catalog.pg_auth_members WHERE member=r.oid) memberships,
   has_schema_privilege(current_user,'public','CREATE') schema_create,
   EXISTS(SELECT 1 FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='public' AND c.relowner=r.oid) OR EXISTS(SELECT 1 FROM pg_catalog.pg_proc p JOIN pg_catalog.pg_namespace n ON n.oid=p.pronamespace WHERE n.nspname='public' AND p.proowner=r.oid) owns
   FROM pg_catalog.pg_roles r WHERE r.rolname=current_user`)).rows[0];
  if(!row||!row.rolcanlogin||row.actor!==expected||row.login!==expected||row.database!==decodeURIComponent(url.pathname.slice(1))||['rolsuper','rolbypassrls','rolcreaterole','rolcreatedb','rolinherit','rolreplication','memberships','schema_create','owns'].some(k=>row[k]))throw Error('platform_support_unavailable');
  const columns=(await client.query(`SELECT EXISTS(SELECT 1 FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid=c.relnamespace JOIN pg_catalog.pg_attribute a ON a.attrelid=c.oid
   CROSS JOIN (VALUES('SELECT'),('INSERT'),('UPDATE')) p(privilege)
   WHERE n.nspname='public' AND c.relkind IN('r','p','v','m','f') AND a.attnum>0 AND NOT a.attisdropped
   AND has_column_privilege(current_user,c.oid,a.attnum,p.privilege) IS DISTINCT FROM
   COALESCE(($1::jsonb->c.relname->p.privilege)='"*"'::jsonb OR ($1::jsonb->c.relname->p.privilege)?a.attname,false)) mismatch`,[JSON.stringify(rights.tables)])).rows[0];
  if(columns?.mismatch)throw Error('platform_support_unavailable');
  const unsafe=(await client.query(`SELECT EXISTS(SELECT 1 FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='public' AND c.relkind IN('r','p','v','m','f') AND has_table_privilege(current_user,c.oid,'DELETE,TRUNCATE,REFERENCES,TRIGGER')) unsafe,
   EXISTS(SELECT 1 FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='public' AND c.relname LIKE 'platform_support_%' AND c.relkind='r' AND (NOT c.relrowsecurity OR NOT c.relforcerowsecurity)) rls_unsafe`)).rows[0];
  const sequences=(await client.query("SELECT EXISTS(SELECT 1 FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='public' AND c.relkind='S' AND has_sequence_privilege(current_user,c.oid,'USAGE,SELECT,UPDATE')) unsafe")).rows[0];
  if(sequences?.unsafe||unsafe?.unsafe||unsafe?.rls_unsafe)throw Error('platform_support_unavailable');
  const functions=(await client.query(`SELECT p.oid::regprocedure::text signature,has_function_privilege(current_user,p.oid,'EXECUTE') allowed,p.prosecdef definer FROM pg_catalog.pg_proc p JOIN pg_catalog.pg_namespace n ON n.oid=p.pronamespace WHERE n.nspname='public' AND (p.prosecdef OR p.proname LIKE 'platform_support_%')`)).rows;
  for(const f of functions)if(f.allowed&&!rights.functions.includes(f.signature.replace(/^public\./,'')))throw Error('platform_support_unavailable');
  if(rights.functions.some(signature=>!functions.some(f=>f.signature.replace(/^public\./,'')===signature&&f.allowed&&f.definer)))throw Error('platform_support_unavailable');
 }
 private async transaction<T>(scope:SupportScope,work:(client:PoolClient)=>Promise<T>):Promise<T>{
  const connection=this.configuration?.[scope];if(!connection)throw Error('platform_support_unavailable');
  let pool=this.pools.get(scope);if(!pool){pool=new Pool({connectionString:connection,max:4,connectionTimeoutMillis:5000,idleTimeoutMillis:30000,options:'-c search_path=pg_catalog,public,pg_temp -c statement_timeout=10000 -c lock_timeout=5000'});pool.on('error',()=>{/* Idle clients are evicted by pg; never log credentials. */});this.pools.set(scope,pool);}
  let client:PoolClient;try{client=await pool.connect();}catch{throw Error('platform_support_unavailable');}
  let discard=false;
  try{
   await client.query('BEGIN');
   await client.query('SET LOCAL search_path TO pg_catalog,public,pg_temp');await client.query('SET LOCAL row_security TO on');
   try{await this.attest(client,scope,connection);}catch{throw Error('platform_support_unavailable');}
   await client.query("SELECT set_config('app.platform_support_identity','',true),set_config('app.platform_support_operator','',true),set_config('app.platform_support_role_management','',true),set_config('app.platform_support_dispatch','',true),set_config('app.tenant_id','',true)");
   const result=await work(client);await client.query('COMMIT');return result;
  }catch(error){try{await client.query('ROLLBACK');}catch{discard=true;}throw error;}finally{client.release(discard||undefined);}
 }
 async onModuleDestroy(){await Promise.all([...this.pools.values()].map(pool=>pool.end()));this.pools.clear();}
}
