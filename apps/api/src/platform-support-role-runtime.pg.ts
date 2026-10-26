import 'reflect-metadata';
import assert from 'node:assert/strict';
import {randomUUID,randomBytes,createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {Module} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {FastifyAdapter,type NestFastifyApplication} from '@nestjs/platform-fastify';
import type {PoolClient} from 'pg';
import {DatabaseService} from './database.service';
import {PlatformSupportDatabases} from './platform-support-databases';
import {AuthService} from './auth.service';
import {PlatformSupportRoleStore} from './platform-support-role-store';
import {PlatformSupportAdminController} from './platform-support-admin.controller';
type Account={id:string;email:string;token:string};
// Guarded disposable-schema journey, actual sessions and restricted store connection.
// Only the operator-role endpoint is certified here, not case dispatch or operational configuration.
export async function verifyPlatformSupportRoleRuntime(setup:PoolClient,schema:string,databaseUrl:string,originValue:string){
 assert.match(schema,/^support_fixture_[a-f0-9]{32}$/);
 const url=new URL(databaseUrl),authUrl=new URL(databaseUrl),origin=new URL(originValue);
 assert.ok(['127.0.0.1','localhost'].includes(url.hostname));assert.equal(url.pathname,'/mlivretrabalho_http');
 assert.equal(origin.protocol,'http:');assert.ok(['localhost','127.0.0.1'].includes(origin.hostname));assert.ok(origin.port);assert.equal(origin.pathname,'/');assert.ok(!origin.username&&!origin.password&&!origin.search&&!origin.hash);
 const login='support_role_runtime_'+randomUUID().replaceAll('-',''),password=randomBytes(24).toString('hex'),stamp=randomUUID(),accountPassword='RoleRuntimeFixture123!';
 const accounts:Account[]=[],caseIds=[randomUUID(),randomUUID()],owner=randomUUID(),fault='role_runtime_fault_'+randomUUID().replaceAll('-','');
 let db:DatabaseService|undefined,authDb:DatabaseService|undefined,auth:AuthService|undefined,app:NestFastifyApplication|undefined,created=false,trigger=false,stage='setup',requests=0;
 function database(value:string){const prior=process.env.DATABASE_URL;try{process.env.DATABASE_URL=value;return new DatabaseService();}finally{if(prior===undefined)delete process.env.DATABASE_URL;else process.env.DATABASE_URL=prior;}}
 async function request(base:string,actor:Account|null,path:string,body:unknown,status:number,headers:Record<string,string>={}):Promise<any>{
  assert.ok(path.startsWith('/v1/'));requests++;
  const r=await fetch(base+path,{method:'POST',redirect:'error',signal:AbortSignal.timeout(15000),headers:{...(actor?{authorization:'Bearer '+actor.token}:{}),...(body===undefined?{}:{'content-type':'application/json'}),...headers},...(body===undefined?{}:{body:JSON.stringify(body)})});assert.equal(r.status,status,'Restricted role HTTP '+path);return r.json();
 }
 const authCall=(actor:Account|null,path:string,body:unknown=undefined,status=201)=>request(origin.origin,actor,'/v1/auth/'+path,body,status);
 async function account(label:string,company=false){
  const email='role-runtime-'+label+'-'+stamp+'@example.test',signup=await authCall(null,'signup',{email,password:accountPassword,accountType:company?'company':'professional',...(company?{workspaceName:'Role fixture '+label}:{})});
  const signin=await authCall(null,'signin',{email,password:accountPassword});assert.equal(signin.identity.id,signup.id);assert.ok(signin.accessToken);
  const a={id:signup.id,email,token:signin.accessToken};accounts.push(a);await setup.query('INSERT INTO identities(id) VALUES($1)',[a.id]);return a;
 }
 try{
  await setup.query(`CREATE ROLE ${login} LOGIN PASSWORD '${password}' NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS`);created=true;
  await setup.query(`GRANT USAGE ON SCHEMA ${schema} TO ${login}`);
  await setup.query(`GRANT EXECUTE ON FUNCTION platform_support_dispatch_case_allowed(uuid,uuid,boolean) TO ${login}`);
  await setup.query(`GRANT SELECT(id,deactivated_at) ON identities TO ${login}`);
  await setup.query(`GRANT SELECT ON platform_support_operators TO ${login}`);
  await setup.query(`GRANT INSERT(identity_id,active,revision),UPDATE(active,revision) ON platform_support_operators TO ${login}`);
  await setup.query(`GRANT SELECT(id) ON platform_support_cases TO ${login}`);
  await setup.query(`GRANT SELECT(case_id,operator_identity_id,revoked_at,revision),UPDATE(revoked_at,revision) ON platform_support_assignments TO ${login}`);
  await setup.query(`GRANT INSERT(case_id,actor_identity_id,subject_identity_id,action) ON platform_support_audit TO ${login}`);
  await setup.query(`GRANT EXECUTE ON FUNCTION platform_support_lock_owner_identity(),platform_support_lock_administrator(),platform_support_lock_role_target(uuid,boolean) TO ${login}`);
  authUrl.searchParams.set('options','-c search_path=public -c statement_timeout=5000');authDb=database(authUrl.toString());auth=new AuthService(authDb);
  stage='real-sessions';const admin=await account('admin'),target=await account('target'),ordinary=await account('ordinary'),company=await account('company-a',true),companyB=await account('company-b',true);
  await setup.query('INSERT INTO identities(id) VALUES($1)',[owner]);await setup.query('INSERT INTO platform_support_administrators(identity_id,active) VALUES($1,true)',[admin.id]);await setup.query('INSERT INTO platform_support_operators(identity_id,active) VALUES($1,true)',[ordinary.id]);
  url.username=login;url.password=password;url.searchParams.set('options',`-c search_path=${schema},public -c statement_timeout=5000`);db=database(url.toString());const runtime=db,roles=new PlatformSupportRoleStore(runtime),denied=(e:unknown)=>(e as {code:string}).code==='42501';
  assert.deepEqual((await runtime.query('SELECT current_user actor,session_user login')).rows[0],{actor:login,login});
  assert.deepEqual((await setup.query('SELECT rolsuper,rolbypassrls,rolcreaterole,rolcreatedb,rolinherit FROM pg_roles WHERE rolname=$1',[login])).rows[0],{rolsuper:false,rolbypassrls:false,rolcreaterole:false,rolcreatedb:false,rolinherit:false});
  const context=async<T>(actor:string,work:(c:PoolClient)=>Promise<T>)=>runtime.transaction(async c=>{await c.query("SELECT set_config('app.platform_support_identity',$1,true),set_config('app.platform_support_role_management','true',true)",[actor]);return work(c);});
  stage='baseline';await assert.rejects(context(admin.id,c=>c.query('INSERT INTO platform_support_operators(identity_id,active,revision) VALUES($1,true,1)',[target.id])),denied);
  console.log('PLATFORM_SUPPORT_ROLE_RUNTIME_BASELINE_REPRODUCED '+JSON.stringify({actualRestrictedLogin:true,adminRoleInsertRLS42501:true,before0082:true}));
  await setup.query(readFileSync('packages/db/migrations/0082_platform_support_role_runtime.sql','utf8'));await setup.query(`GRANT EXECUTE ON FUNCTION platform_support_lock_role_cases(uuid) TO ${login}`);
  for(const sql of ['UPDATE identities SET deactivated_at=NULL','UPDATE platform_support_administrators SET active=true','SELECT * FROM platform_support_administrators','UPDATE platform_support_capability SET enabled=true','UPDATE platform_support_cases SET status=status','SELECT description FROM platform_support_cases','SELECT * FROM platform_support_audit','SELECT * FROM public.sessions'])await assert.rejects(context(admin.id,c=>c.query(sql)),denied);
  for(const id of caseIds){await setup.query('INSERT INTO platform_support_intents(request_key,owner_identity_id) VALUES($1,$2)',[id,owner]);await setup.query("INSERT INTO platform_support_cases(id,owner_identity_id,category,description) VALUES($1,$2,'other','Synthetic private case excluded from administrative metadata ACL')",[id,owner]);}
  const identityOnly=async<T>(work:(c:PoolClient)=>Promise<T>)=>runtime.transaction(async c=>{await c.query("SELECT set_config('app.platform_support_identity',$1,true)",[admin.id]);return work(c);});
  assert.equal((await identityOnly(c=>c.query('SELECT id FROM platform_support_cases'))).rowCount,2);
  console.log('PLATFORM_SUPPORT_ROLE_SCOPE_BASELINE_REPRODUCED '+JSON.stringify({candidate0082WithoutOperationContext:true,adminIdentityAloneReadsTwoForeignCaseIds:true,syntheticOnly:true}));
  await setup.query(readFileSync('packages/db/migrations/0083_platform_support_role_context.sql','utf8'));
  assert.equal((await identityOnly(c=>c.query('SELECT id FROM platform_support_cases'))).rowCount,0);
  await assert.rejects(identityOnly(c=>c.query('INSERT INTO platform_support_operators(identity_id,active,revision) VALUES($1,true,1)',[target.id])),denied);
  stage='grant-and-rls';
  await assert.rejects(context(ordinary.id,c=>c.query('INSERT INTO platform_support_operators(identity_id,active,revision) VALUES($1,true,1)',[target.id])),denied);
  await assert.rejects(context(admin.id,c=>c.query('INSERT INTO platform_support_operators(identity_id,active,revision) VALUES($1,true,1)',[admin.id])),denied);
  const grants=await Promise.all([roles.change(admin.id,target.id,true,0),roles.change(admin.id,target.id,true,0)]);assert.deepEqual(grants[0],grants[1]);assert.equal(grants[0].revision,1);
  assert.equal((await setup.query("SELECT count(*)::int n FROM platform_support_audit WHERE subject_identity_id=$1 AND action='operator_granted'",[target.id])).rows[0]?.n,1);
  for(const id of caseIds)await setup.query('INSERT INTO platform_support_assignments(case_id,operator_identity_id) VALUES($1,$2)',[id,target.id]);
  assert.equal((await context(ordinary.id,c=>c.query('UPDATE platform_support_operators SET active=false WHERE identity_id=$1 RETURNING identity_id',[target.id]))).rowCount,0);
  await assert.rejects(context(admin.id,c=>c.query("INSERT INTO platform_support_audit(actor_identity_id,subject_identity_id,action) VALUES($1,$2,'operator_revoked')",[ordinary.id,target.id])),denied);
  const snapshot=async()=>JSON.stringify((await setup.query("SELECT jsonb_build_object('roles',(SELECT jsonb_agg(to_jsonb(o) ORDER BY identity_id) FROM platform_support_operators o),'assignments',(SELECT jsonb_agg(to_jsonb(a) ORDER BY case_id) FROM platform_support_assignments a),'audit',(SELECT jsonb_agg(to_jsonb(a) ORDER BY id) FROM platform_support_audit a)) snapshot")).rows);
  stage='atomic-sql-revocation-rollback';const before=await snapshot();
  await setup.query(`CREATE FUNCTION ${fault}() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.actor_identity_id='${admin.id}'::uuid AND NEW.action='operator_revoked' THEN RAISE EXCEPTION 'synthetic_role_runtime_audit_fault'; END IF; RETURN NEW; END $$`);await setup.query(`CREATE TRIGGER ${fault} BEFORE INSERT ON platform_support_audit FOR EACH ROW EXECUTE FUNCTION ${fault}()`);trigger=true;
  await assert.rejects(roles.change(admin.id,target.id,false,1),/synthetic_role_runtime_audit_fault/);assert.equal(await snapshot(),before);
  await setup.query(`DROP TRIGGER ${fault} ON platform_support_audit`);trigger=false;await setup.query(`DROP FUNCTION ${fault}()`);
  stage='actual-controller';class RoleRuntimeHTTPFixture{}Module({controllers:[PlatformSupportAdminController],providers:[{provide:PlatformSupportDatabases,useValue:{forScope:()=>runtime}},{provide:AuthService,useValue:auth}]})(RoleRuntimeHTTPFixture);
  app=await NestFactory.create<NestFastifyApplication>(RoleRuntimeHTTPFixture,new FastifyAdapter({logger:false}),{logger:false,abortOnError:false});app.setGlobalPrefix('v1');await app.listen(0,'127.0.0.1');const addr=app.getHttpServer().address() as {address:string;port:number};assert.equal(addr.address,'127.0.0.1');
  const base='http://127.0.0.1:'+addr.port,path='/v1/platform-support/admin/operators/'+target.id,call=(actor:Account|null,body:unknown,status:number,headers:Record<string,string>={})=>request(base,actor,path,body,status,headers);
  stage='http-authorization';const pending={active:false,expectedRevision:1},forged={'x-identity-id':admin.id,'x-tenant-id':randomUUID()};
  for(const a of [ordinary,company,companyB])await call(a,pending,403,forged);
  await request(base,admin,'/v1/platform-support/admin/operators/'+admin.id,{active:true,expectedRevision:0},403);
  await call(admin,{...pending,actorIdentityId:ordinary.id},400);assert.equal(await snapshot(),before);
  stage='http-two-case-revocation';const ack=await call(admin,pending,201);assert.equal(ack.active,false);assert.equal(ack.revision,2);assert.deepEqual(await call(admin,pending,201),ack);
  assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_assignments WHERE case_id=ANY($1::uuid[]) AND revoked_at IS NOT NULL',[caseIds])).rows[0]?.n,2);
  const regrant=await call(admin,{active:true,expectedRevision:2},201);assert.equal(regrant.revision,3);assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_assignments WHERE case_id=ANY($1::uuid[]) AND revoked_at IS NOT NULL',[caseIds])).rows[0]?.n,2);
  await call(admin,{active:false,expectedRevision:1},409);
  // Explicit synthetic reassignment, not resurrection by regrant.
  await setup.query('UPDATE platform_support_assignments SET revoked_at=NULL,revision=revision+1 WHERE case_id=ANY($1::uuid[])',[caseIds]);const beforeFault=await snapshot();
  await setup.query(`CREATE FUNCTION ${fault}() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.actor_identity_id='${admin.id}'::uuid AND NEW.action='operator_revoked' THEN RAISE EXCEPTION 'synthetic_role_runtime_audit_fault'; END IF; RETURN NEW; END $$`);await setup.query(`CREATE TRIGGER ${fault} BEFORE INSERT ON platform_support_audit FOR EACH ROW EXECUTE FUNCTION ${fault}()`);trigger=true;
  await call(admin,{active:false,expectedRevision:3},500);assert.equal(await snapshot(),beforeFault);
  await setup.query(`DROP TRIGGER ${fault} ON platform_support_audit`);trigger=false;await setup.query(`DROP FUNCTION ${fault}()`);
  const revoked=await call(admin,{active:false,expectedRevision:3},201);assert.equal(revoked.revision,4);assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_assignments WHERE case_id=ANY($1::uuid[]) AND revoked_at IS NOT NULL',[caseIds])).rows[0]?.n,2);
  stage='admin-and-session-revocation';const deniedBaseline=await snapshot(),next={active:true,expectedRevision:4};
  await setup.query('UPDATE platform_support_administrators SET active=false WHERE identity_id=$1',[admin.id]);await call(admin,next,403);await setup.query('UPDATE platform_support_administrators SET active=true WHERE identity_id=$1',[admin.id]);
  await setup.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[admin.id]);await call(admin,next,401);await setup.query('UPDATE identities SET deactivated_at=NULL WHERE id=$1',[admin.id]);
  await authDb.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[admin.id]);await call(admin,next,401);await authDb.query('UPDATE identities SET deactivated_at=NULL WHERE id=$1',[admin.id]);
  await call(null,next,401);const hash=createHash('sha256').update(admin.token).digest('hex');await authDb.query("UPDATE sessions SET created_at=now()-interval '2 days',expires_at=now()-interval '1 day' WHERE token_hash=$1",[hash]);await call(admin,next,401);
  const fresh=await authCall(null,'signin',{email:admin.email,password:accountPassword});admin.token=fresh.accessToken;await authCall(admin,'signout');await call(admin,next,401);
  const fresh2=await authCall(null,'signin',{email:admin.email,password:accountPassword});admin.token=fresh2.accessToken;await auth.revokeAll(admin.id);await call(admin,next,401);assert.equal(await snapshot(),deniedBaseline);
  assert.equal((await runtime.transaction(c=>c.query("SELECT NULLIF(current_setting('app.platform_support_identity',true),'') actor"))).rows[0]?.actor,null);
  assert.equal((await runtime.transaction(c=>c.query("SELECT NULLIF(current_setting('app.platform_support_role_management',true),'') scope"))).rows[0]?.scope,null);
  console.log('PLATFORM_SUPPORT_ROLE_HTTP_RESTRICTED_PG_PASS '+JSON.stringify({requests,actualControllerAuthServiceAndSessions:true,separateAuthPool:true,restrictedDatabaseServiceNoSetRole:true,currentUserEqualsLogin:true,grantRevokeRoleCASAndReplay:true,rlsNonAdminAndSelfGrantDenied:true,forgedAuditActorDenied:true,twoAssignmentsRevokedAtomically:true,regrantNeverResurrects:true,SQLAndHTTPAuditFailureRollBackRoleBothAssignmentsAndAudits:true,twoCompaniesAndOrdinaryOperatorDenied:true,anonymousExpiredSignoutRevokedAndDeactivatedDenied:true,fullSnapshotDeniedNoWrites:true,noIdentityAdminCapabilityCaseUpdateACL:true,noCaseBodyOrSessionsOrAuditReadACL:true,transactionContextCleared:true,operationScopeRequiredAndCleared:true,adminIdentityAloneForeignCaseReadDenied:true,caseDispatchRuntimeProof:false,operationalConfiguration:false,render:false,production:false}));
 }catch(e){console.error('PLATFORM_SUPPORT_ROLE_RUNTIME_DIAGNOSTIC '+JSON.stringify({stage,sqlstate:typeof(e as {code?:unknown})?.code==='string'?(e as {code:string}).code:null,assertion:e instanceof assert.AssertionError}));throw e;
 }finally{
  if(app)await app.close();else if(db)await db.onModuleDestroy();if(auth)for(const a of accounts)await auth.revokeAll(a.id);
  if(trigger){await setup.query(`DROP TRIGGER IF EXISTS ${fault} ON platform_support_audit`);await setup.query(`DROP FUNCTION IF EXISTS ${fault}()`);}
  const ids=[...accounts.map(a=>a.id),owner];await setup.query('DELETE FROM platform_support_audit WHERE actor_identity_id=ANY($1::uuid[]) OR subject_identity_id=ANY($1::uuid[]) OR case_id=ANY($2::uuid[])',[ids,caseIds]);
  await setup.query('DELETE FROM platform_support_cases WHERE id=ANY($1::uuid[])',[caseIds]);await setup.query('DELETE FROM platform_support_intents WHERE request_key=ANY($1::uuid[])',[caseIds]);
  await setup.query('DELETE FROM platform_support_administrators WHERE identity_id=ANY($1::uuid[])',[ids]);await setup.query('DELETE FROM platform_support_operators WHERE identity_id=ANY($1::uuid[])',[ids]);await setup.query('DELETE FROM identities WHERE id=ANY($1::uuid[])',[ids]);
  if(authDb)await authDb.onModuleDestroy();if(created){await setup.query(`DROP OWNED BY ${login}`);await setup.query(`DROP ROLE ${login}`);assert.equal((await setup.query('SELECT count(*)::int n FROM pg_roles WHERE rolname=$1',[login])).rows[0]?.n,0);}
 }
 console.log('PLATFORM_SUPPORT_ROLE_RUNTIME_CLEANUP_PASS '+JSON.stringify({listenerPoolsClosedSessionsRevoked:true,privateSyntheticRowsAndLoginACLsRemoved:true,publicSyntheticAccountsUntilDatabaseTeardown:true,noRealProvisioning:true}));
}

