import 'reflect-metadata';
import assert from 'node:assert/strict';
import {randomUUID,createHash} from 'node:crypto';
import {Module} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {FastifyAdapter,type NestFastifyApplication} from '@nestjs/platform-fastify';
import type {PoolClient} from 'pg';
import {DatabaseService} from './database.service';
import {AuthService} from './auth.service';
import {PlatformSupportController} from './platform-support.controller';
type Account={id:string;email:string;token:string;tenant?:string};
// No production listener/configuration: called only inside the guarded disposable schema/login lifetime.
export async function verifyPlatformSupportOwnerHTTP(setup:PoolClient,schema:string,authDatabaseUrl:string,restrictedDatabaseUrl:string,authOrigin:string,operator:string){
 assert.match(schema,/^support_fixture_[a-f0-9]{32}$/);
 const origin=new URL(authOrigin);assert.equal(origin.protocol,'http:');assert.ok(['127.0.0.1','localhost'].includes(origin.hostname));assert.ok(origin.port);assert.equal(origin.pathname,'/');assert.ok(!origin.username&&!origin.password&&!origin.search&&!origin.hash);
 const authUrl=new URL(authDatabaseUrl),restrictedUrl=new URL(restrictedDatabaseUrl);
 for(const url of [authUrl,restrictedUrl]){assert.ok(['127.0.0.1','localhost'].includes(url.hostname));assert.equal(url.pathname,'/mlivretrabalho_http');}
 assert.ok(restrictedUrl.username.startsWith('support_owner_runtime_'));assert.equal(restrictedUrl.hostname,authUrl.hostname);assert.equal(restrictedUrl.port,authUrl.port);
 authUrl.searchParams.set('options','-c search_path=public -c statement_timeout=5000');
 const accounts:Account[]=[],stamp=randomUUID(),password='OwnerHTTPFixture123!',input={category:'other',description:'Synthetic private HTTP request'};
 const fault='owner_http_fault_'+randomUUID().replaceAll('-','');
 let authDb:DatabaseService|undefined,restrictedDb:DatabaseService|undefined,auth:AuthService|undefined,app:NestFastifyApplication|undefined,trigger=false,requests=0;
 const initialCapability=(await setup.query('SELECT enabled FROM platform_support_capability WHERE singleton')).rows[0].enabled;
 function database(url:string){const prior=process.env.DATABASE_URL;try{process.env.DATABASE_URL=url;return new DatabaseService();}finally{if(prior===undefined)delete process.env.DATABASE_URL;else process.env.DATABASE_URL=prior;}}
 async function request(base:string,actor:Account|null,method:string,path:string,body:unknown,status:number,extra:Record<string,string>={}):Promise<any>{
  assert.ok(path.startsWith('/v1/'));++requests;
  const r=await fetch(base+path,{method,redirect:'error',signal:AbortSignal.timeout(15000),headers:{...(actor?{Authorization:'Bearer '+actor.token}:{}),...(body===undefined?{}:{'content-type':'application/json'}),...extra},...(body===undefined?{}:{body:JSON.stringify(body)})});
  assert.equal(r.status,status,'Restricted owner HTTP '+method+' '+path);
  return r.json();
 }
 const authCall=(actor:Account|null,method:string,path:string,body:unknown,status=201)=>request(origin.origin,actor,method,path,body,status);
 async function account(label:string,company=false){
  const email='owner-http-'+label+'-'+stamp+'@example.test';
  const signup=await authCall(null,'POST','/v1/auth/signup',{email,password,accountType:company?'company':'professional',...(company?{workspaceName:'Owner HTTP '+label}:{})});
  const signed=await authCall(null,'POST','/v1/auth/signin',{email,password});assert.equal(signed.identity.id,signup.id);assert.ok(signed.accessToken);
  const value={id:signup.id,email,token:signed.accessToken,...(signup.tenantId?{tenant:signup.tenantId}:{})};accounts.push(value);
  await setup.query('INSERT INTO identities(id) VALUES($1)',[value.id]);
  if(!company)assert.equal(signed.memberships.length,0);return value;
 }
 try{
  authDb=database(authUrl.toString());auth=new AuthService(authDb);restrictedDb=database(restrictedUrl.toString());
  const who=(await restrictedDb.query('SELECT current_user actor,session_user login')).rows[0];assert.deepEqual(who,{actor:restrictedUrl.username,login:restrictedUrl.username});
  await assert.rejects(restrictedDb.query('SELECT token_hash FROM public.sessions'),(e:unknown)=>(e as {code:string}).code==='42501');
  const owner=await account('unlinked'),other=await account('foreign'),company=await account('company-a',true),companyB=await account('company-b',true);
  assert.equal((await authDb.query('SELECT count(*)::int n FROM professional_profiles WHERE identity_id=$1',[owner.id])).rows[0]?.n,0);
  assert.equal((await authDb.query('SELECT count(*)::int n FROM tenant_memberships WHERE identity_id=$1',[owner.id])).rows[0]?.n,0);
  // Actual controller and actual AuthService. Only their database authorities are separated.
  class OwnerRuntimeHTTPFixture{}
  Module({controllers:[PlatformSupportController],providers:[{provide:DatabaseService,useValue:restrictedDb},{provide:AuthService,useValue:auth}]})(OwnerRuntimeHTTPFixture);
  app=await NestFactory.create<NestFastifyApplication>(OwnerRuntimeHTTPFixture,new FastifyAdapter({logger:false}),{logger:false,abortOnError:false});
  app.setGlobalPrefix('v1');await app.listen(0,'127.0.0.1');
  const address=app.getHttpServer().address() as {address:string;port:number};assert.equal(address.address,'127.0.0.1');assert.ok(address.port>0);
  const base='http://127.0.0.1:'+address.port,path='/v1/me/platform-support';
  const call=(actor:Account|null,method:string,suffix='',body:unknown=undefined,status=200,headers:Record<string,string>={})=>request(base,actor,method,path+suffix,body,status,headers);
  const foreignHeader={'x-tenant-id':company.tenant!,'x-identity-id':other.id};
  await setup.query('UPDATE platform_support_capability SET enabled=true');
  assert.equal((await call(owner,'GET','',undefined,200,foreignHeader)).acceptingRequests,true);
  await call(owner,'POST','/intent',{...input,ownerIdentityId:other.id},400,foreignHeader);
  const prepared=await call(owner,'POST','/intent',input,201,foreignHeader);assert.ok(prepared.requestKey);
  assert.deepEqual(await call(owner,'GET','/recovery/'+prepared.requestKey),{status:'prepared'});
  const [one,two]=await Promise.all([call(owner,'POST','',input,201,{'idempotency-key':prepared.requestKey,...foreignHeader}),call(owner,'POST','',input,201,{'idempotency-key':prepared.requestKey})]);assert.deepEqual(one,two);assert.equal(one.id,prepared.requestKey);
  assert.equal((await call(owner,'GET','/recovery/'+prepared.requestKey)).id,one.id);
  for(const actor of [other,company,companyB]){
   assert.deepEqual((await call(actor,'GET')).items,[]);
   await call(actor,'GET','/'+one.id,undefined,404);
   await call(actor,'GET','/recovery/'+prepared.requestKey,undefined,404);
   await call(actor,'POST','/'+one.id+'/withdraw',undefined,404);
  }
  const cp=await call(company,'POST','/intent',input,201,{'x-tenant-id':companyB.tenant!});
  const cc=await call(company,'POST','',input,201,{'x-tenant-id':companyB.tenant!,'idempotency-key':cp.requestKey});
  assert.deepEqual((await call(company,'GET')).items.map((r:any)=>r.id),[cc.id]);assert.deepEqual((await call(companyB,'GET')).items,[]);
  await setup.query('INSERT INTO platform_support_responses(case_id,operator_identity_id,body) VALUES($1,$2,$3)',[one.id,operator,'Synthetic reply visible only to requester']);
  const detail=await call(owner,'GET','/'+one.id);assert.equal(detail.description,input.description);assert.equal(detail.responses[0].body,'Synthetic reply visible only to requester');
  for(const id of [operator,other.id,company.id,companyB.id])assert.ok(!JSON.stringify(detail).includes(id));
  const pending=await call(owner,'POST','/intent',input,201);
  await setup.query(`CREATE FUNCTION ${fault}() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.actor_identity_id='${owner.id}'::uuid AND NEW.action='submitted' THEN RAISE EXCEPTION 'synthetic_owner_http_audit_fault'; END IF; RETURN NEW; END $$`);
  await setup.query(`CREATE TRIGGER ${fault} BEFORE INSERT ON platform_support_audit FOR EACH ROW EXECUTE FUNCTION ${fault}()`);trigger=true;
  await call(owner,'POST','',input,500,{'idempotency-key':pending.requestKey});
  assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_cases WHERE id=$1',[pending.requestKey])).rows[0]?.n,0);
  assert.deepEqual(await call(owner,'GET','/recovery/'+pending.requestKey),{status:'prepared'});
  await setup.query(`DROP TRIGGER ${fault} ON platform_support_audit`);trigger=false;await setup.query(`DROP FUNCTION ${fault}()`);
  assert.equal((await call(owner,'POST','',input,201,{'idempotency-key':pending.requestKey})).id,pending.requestKey);
  const third=await call(owner,'POST','/intent',input,201);await call(owner,'POST','',input,201,{'idempotency-key':third.requestKey});
  const seen:string[]=[];let cursor:string|null=null;
  for(let i=0;i<8;i++){const page=await call(owner,'GET','?limit=1'+(cursor?'&cursor='+encodeURIComponent(cursor):''));seen.push(...page.items.map((r:any)=>r.id));cursor=page.nextCursor;if(!cursor)break;}
  const expected=(await setup.query('SELECT id FROM platform_support_cases WHERE owner_identity_id=$1 ORDER BY created_at DESC,id DESC',[owner.id])).rows.map(r=>r.id);assert.deepEqual(seen,expected);assert.equal(seen.length,3);
  const withdrawn=await call(owner,'POST','/'+one.id+'/withdraw',undefined,201);assert.equal(withdrawn.status,'withdrawn');assert.deepEqual(await call(owner,'POST','/'+one.id+'/withdraw',undefined,201),withdrawn);
  const disabled=await call(owner,'POST','/intent',input,201);await setup.query('UPDATE platform_support_capability SET enabled=false');
  assert.equal((await call(owner,'GET')).acceptingRequests,false);
  await call(owner,'POST','/intent',input,503);await call(owner,'POST','',input,503,{'idempotency-key':disabled.requestKey});
  assert.deepEqual(await call(owner,'GET','/recovery/'+disabled.requestKey),{status:'prepared'});assert.equal((await call(owner,'GET','/'+one.id)).id,one.id);
  const matrix:[string,string,unknown,Record<string,string>][]=[
   ['GET','',undefined,foreignHeader],['POST','/intent',input,foreignHeader],['POST','',input,{'idempotency-key':disabled.requestKey}],
   ['GET','/recovery/'+disabled.requestKey,undefined,foreignHeader],['GET','/'+one.id,undefined,foreignHeader],['POST','/'+one.id+'/withdraw',undefined,foreignHeader]
  ];
  const snapshot=async()=>JSON.stringify((await setup.query('SELECT (SELECT count(*) FROM platform_support_cases) cases,(SELECT count(*) FROM platform_support_intents) intents,(SELECT count(*) FROM platform_support_audit) audits')).rows);
  const before=await snapshot();
  for(const [method,suffix,body,headers]of matrix)await call(null,method,suffix,body,401,headers);
  await authCall(owner,'POST','/v1/auth/signout',undefined);
  for(const [method,suffix,body,headers]of matrix)await call(owner,method,suffix,body,401,headers);
  assert.equal(await snapshot(),before);
  const old=owner.token,newSession=await authCall(null,'POST','/v1/auth/signin',{email:owner.email,password});owner.token=newSession.accessToken;
  await call({...owner,token:old},'GET','',undefined,401);assert.equal((await call(owner,'GET')).items.length,3);
  const afterRefresh=await snapshot();
  const tokenHash=createHash('sha256').update(owner.token).digest('hex');
  await authDb.query("UPDATE sessions SET expires_at=now()-interval '1 second' WHERE token_hash=$1",[tokenHash]);
  for(const [method,suffix,body,headers]of matrix)await call(owner,method,suffix,body,401,headers);
  const fresh=await authCall(null,'POST','/v1/auth/signin',{email:owner.email,password});owner.token=fresh.accessToken;
  await setup.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[owner.id]);await call(owner,'GET','',undefined,401);await setup.query('UPDATE identities SET deactivated_at=NULL WHERE id=$1',[owner.id]);
  await authDb.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[owner.id]);await call(owner,'GET','',undefined,401);await authDb.query('UPDATE identities SET deactivated_at=NULL WHERE id=$1',[owner.id]);
  await auth!.revokeAll(owner.id);for(const [method,suffix,body,headers]of matrix)await call(owner,method,suffix,body,401,headers);
  assert.equal(await snapshot(),afterRefresh);
  console.log('PLATFORM_SUPPORT_OWNER_HTTP_RESTRICTED_PG_PASS '+JSON.stringify({actualLoopbackNestFastifyHTTP:true,actualControllerAndAuthService:true,realSignupSigninAndSessionRows:true,authPoolSeparateFromRestrictedStore:true,restrictedPoolCannotReadSessions:true,currentUserEqualsNonprivilegedLogin:true,unlinkedWithoutProfile:true,allSixRoutesExercised:true,twoCompaniesAndForeignOwnerIsolated:true,forgedIdentityAndTenantDenied:true,companyOwnRequestAllowed:true,concurrentReplayRecovery:true,authorizedRepliesNoOperatorIdentity:true,auditFailureRollback:true,cursorPagination:true,withdrawReplay:true,capabilityFalseHistoryNoNewWrite:true,anonymousSignoutExpiredRevokedAllSixDenied:true,oldTokenCannotUseNewSession:true,storeAndAuthDeactivationDenied:true,rejectedCallsNoWrites:true,operatorAdminRestrictedRuntimeProof:false,operationalConfiguration:false,nativeUI:false,production:false,requests}));
 }finally{
  if(app)await app.close();else if(restrictedDb)await restrictedDb.onModuleDestroy();
  try{
   if(auth)for(const account of accounts)await auth.revokeAll(account.id);
   if(trigger){await setup.query(`DROP TRIGGER IF EXISTS ${fault} ON platform_support_audit`);await setup.query(`DROP FUNCTION IF EXISTS ${fault}()`);}
   const ids=accounts.map(a=>a.id);
   await setup.query('DELETE FROM platform_support_audit WHERE actor_identity_id=ANY($1::uuid[])',[ids]);
   await setup.query('DELETE FROM platform_support_cases WHERE owner_identity_id=ANY($1::uuid[])',[ids]);
   await setup.query('DELETE FROM platform_support_intents WHERE owner_identity_id=ANY($1::uuid[])',[ids]);
   await setup.query('DELETE FROM identities WHERE id=ANY($1::uuid[])',[ids]);
   await setup.query('UPDATE platform_support_capability SET enabled=$1',[initialCapability]);
   if(authDb)assert.equal((await authDb.query('SELECT count(*)::int n FROM sessions WHERE identity_id=ANY($1::uuid[])',[ids])).rows[0]?.n,0);
  }finally{if(authDb)await authDb.onModuleDestroy();}
 }
 console.log('PLATFORM_SUPPORT_OWNER_HTTP_RESTRICTED_CLEANUP_PASS '+JSON.stringify({listenerAndPoolsClosed:true,actualSessionsRevoked:true,privateFixtureRowsRemoved:true,originalCapabilityRestored:true,syntheticPublicAccountsUntilDisposableDatabaseDestroyed:true,production:false}));
}
