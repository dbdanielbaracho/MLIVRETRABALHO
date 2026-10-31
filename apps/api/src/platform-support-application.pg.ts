import 'reflect-metadata';
import assert from 'node:assert/strict';
import {randomBytes,randomUUID} from 'node:crypto';
import {Pool} from 'pg';
import {NestFactory} from '@nestjs/core';
import {FastifyAdapter,type NestFastifyApplication} from '@nestjs/platform-fastify';
import {AppModule} from './app.module';
import {DatabaseService} from './database.service';
import {PlatformSupportDatabases,supportScopes,supportEnvironment,supportPermissions,type SupportScope} from './platform-support-databases';

// Invoked only by the guarded disposable HTTP journey. No operational provisioning command.
export async function startPlatformSupportApplication(config:{databaseUrl:string;origin:string}){
 const url=new URL(config.databaseUrl),origin=new URL(config.origin);
 assert.ok(['localhost','127.0.0.1'].includes(url.hostname));assert.equal(url.pathname,'/mlivretrabalho_http');
 assert.equal(origin.protocol,'http:');assert.ok(['localhost','127.0.0.1'].includes(origin.hostname));assert.ok(origin.port);
 const pool=new Pool({connectionString:config.databaseUrl,max:1,connectionTimeoutMillis:5000}),setup=await pool.connect();
 const created:string[]=[],logins={} as Record<SupportScope,string>,environment:Record<string,string>={},stamp=randomUUID().replaceAll('-','');
 let app:NestFastifyApplication|undefined,closed=false,stage='local-guard';
 const unavailable=(e:unknown)=>e instanceof Error&&e.message==='platform_support_unavailable';
 async function close(){
  if(closed)return;closed=true;
  try{await app?.close();}finally{try{
   for(const login of created.reverse()){await setup.query(`DROP OWNED BY ${login}`);await setup.query(`DROP ROLE ${login}`);assert.equal((await setup.query('SELECT 1 FROM pg_roles WHERE rolname=$1',[login])).rowCount,0);}
   console.log('PLATFORM_SUPPORT_APPLICATION_CLEANUP_PASS '+JSON.stringify({realAppModuleClosed:true,fourSyntheticLoginsAndACLsRemoved:true,production:false}));
  }finally{setup.release();await pool.end();}}
 }
 try{
  const peer=(setup as unknown as {connection:{stream:{remoteAddress?:string}}}).connection.stream.remoteAddress;
  assert.ok(peer&&['127.0.0.1','::1','::ffff:127.0.0.1'].includes(peer));assert.equal((await setup.query('SELECT current_database() name')).rows[0]?.name,'mlivretrabalho_http');
  for(const scope of supportScopes){
   stage='provision-fixture-'+scope;
   const login='support_app_'+scope+'_'+stamp,password=randomBytes(24).toString('hex');logins[scope]=login;
   await setup.query(`CREATE ROLE ${login} LOGIN PASSWORD '${password}' NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOREPLICATION NOBYPASSRLS`);created.push(login);
   await setup.query(`GRANT USAGE ON SCHEMA public TO ${login}`);
   for(const [table,rights]of Object.entries(supportPermissions[scope].tables))for(const [privilege,columns]of Object.entries(rights))await setup.query(`GRANT ${privilege}${columns==='*'?'':'('+columns!.join(',')+')'} ON public.${table} TO ${login}`);
   for(const signature of supportPermissions[scope].functions)await setup.query(`GRANT EXECUTE ON FUNCTION public.${signature} TO ${login}`);
   const connection=new URL(config.databaseUrl);connection.username=login;connection.password=password;connection.search='';environment[supportEnvironment(scope)]=connection.toString();
  }
  // Exercise the real application composition. No controller/provider/authentication override.
  const keys=['DATABASE_URL',...supportScopes.map(supportEnvironment)],saved=Object.fromEntries(keys.map(k=>[k,process.env[k]]));
  try{
   Object.assign(process.env,environment,{DATABASE_URL:config.databaseUrl});
   stage='AppModule-bootstrap';app=await NestFactory.create<NestFastifyApplication>(AppModule,new FastifyAdapter({logger:false}),{logger:false,abortOnError:false});
  }finally{for(const key of keys){if(saved[key]===undefined)delete process.env[key];else process.env[key]=saved[key];}}
  app.setGlobalPrefix('v1');await app.listen(0,'127.0.0.1');
  const address=app.getHttpServer().address() as {address:string;port:number};assert.equal(address.address,'127.0.0.1');
  const databases=app.get(PlatformSupportDatabases),auth=app.get(DatabaseService);
  const authActor=(await auth.query('SELECT current_user actor')).rows[0]?.actor;assert.ok(!created.includes(authActor));
  for(const scope of supportScopes){
   stage='attest-'+scope;const db=databases.forScope(scope);
   const identity=await db.transaction(async c=>(await c.query('SELECT current_user actor,session_user login')).rows[0]);
   assert.deepEqual(identity,{actor:logins[scope],login:logins[scope]});
   await assert.rejects(db.transaction(c=>c.query('SELECT token_hash FROM public.sessions')),(e:unknown)=>(e as {code:string}).code==='42501');
  }
  return {origin:'http://127.0.0.1:'+address.port,close,verify:async()=>{
   // Excess effective authority must fail before the business callback, even on an existing pooled connection.
   let calls=0;await setup.query(`GRANT UPDATE(deactivated_at) ON public.identities TO ${logins.owner}`);
   try{await assert.rejects(databases.forScope('owner').transaction(async()=>{++calls;}),unavailable);assert.equal(calls,0);}
   finally{await setup.query(`REVOKE UPDATE(deactivated_at) ON public.identities FROM ${logins.owner}`);}
   for(const scope of supportScopes){
    const state=await databases.forScope(scope).transaction(async c=>(await c.query("SELECT current_user actor,current_setting('app.platform_support_identity',true) identity,current_setting('app.platform_support_operator',true) operator,current_setting('app.platform_support_role_management',true) role_context,current_setting('app.platform_support_dispatch',true) dispatch,current_setting('app.tenant_id',true) tenant")).rows[0]);
    assert.equal(state.actor,logins[scope]);for(const k of ['identity','operator','role_context','dispatch','tenant'])assert.ok(state[k]===null||state[k]==='');
   }
   console.log('PLATFORM_SUPPORT_APPLICATION_POOL_COMPOSITION_PG_PASS '+JSON.stringify({actualAppModuleNoProviderOverride:true,actualAuthServiceSessionsOnSeparateOriginalPool:true,fourDistinctRestrictedLogins:true,ownerOperatorRoleDispatchHTTP:true,effectivePrivilegeCheckBeforeEveryTransaction:true,excessACLRejectedBeforeCallback:true,noSessionReadOrIdentityUpdate:true,noSharedCredentialFallback:true,noSetRole:true,transactionContextsCleared:true,configurationCodeAdopted:true,realCredentialProvisioning:false,render:false,production:false}));
  }};
 }catch(error){const code=(error as {code?:unknown})?.code;console.error('PLATFORM_SUPPORT_APPLICATION_FIXTURE_FAIL '+JSON.stringify({stage,sqlstate:typeof code==='string'&&/^[A-Z0-9]{5}$/.test(code)?code:null,privateDataExported:false}));await close();throw error;}
}
