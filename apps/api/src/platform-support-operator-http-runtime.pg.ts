import 'reflect-metadata';
import assert from 'node:assert/strict';
import {randomUUID,createHash} from 'node:crypto';
import {Module} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {FastifyAdapter,type NestFastifyApplication} from '@nestjs/platform-fastify';
import type {PoolClient} from 'pg';
import {DatabaseService} from './database.service';
import {PlatformSupportDatabases} from './platform-support-databases';
import {AuthService} from './auth.service';
import {PlatformSupportOperatorController} from './platform-support-operator.controller';
type Account={id:string;email:string;token:string;tenant?:string};
// Real sessions and controller, separate auth authority, disposable restricted store login.
export async function verifyPlatformSupportOperatorHTTP(setup:PoolClient,schema:string,authDatabaseUrl:string,restrictedDatabaseUrl:string,authOrigin:string){
 assert.match(schema,/^support_fixture_[a-f0-9]{32}$/);
 const origin=new URL(authOrigin),authUrl=new URL(authDatabaseUrl),restrictedUrl=new URL(restrictedDatabaseUrl);
 assert.equal(origin.protocol,'http:');assert.ok(['127.0.0.1','localhost'].includes(origin.hostname));assert.ok(origin.port);assert.equal(origin.pathname,'/');assert.ok(!origin.username&&!origin.password&&!origin.search&&!origin.hash);
 for(const url of [authUrl,restrictedUrl]){assert.ok(['127.0.0.1','localhost'].includes(url.hostname));assert.equal(url.pathname,'/mlivretrabalho_http');}
 assert.match(restrictedUrl.username,/^support_operator_runtime_[a-f0-9]{32}$/);assert.equal(restrictedUrl.hostname,authUrl.hostname);assert.equal(restrictedUrl.port,authUrl.port);
 authUrl.searchParams.set('options','-c search_path=public -c statement_timeout=5000');
 const stamp=randomUUID(),password='OperatorHTTPFixture123!',accounts:Account[]=[],cases:string[]=[],fault='operator_http_fault_'+randomUUID().replaceAll('-','');
 let authDb:DatabaseService|undefined,db:DatabaseService|undefined,auth:AuthService|undefined,app:NestFastifyApplication|undefined,trigger=false,requests=0,stage='configuration';
 function database(url:string){const prior=process.env.DATABASE_URL;try{process.env.DATABASE_URL=url;return new DatabaseService();}finally{if(prior===undefined)delete process.env.DATABASE_URL;else process.env.DATABASE_URL=prior;}}
 async function request(base:string,actor:Account|null,method:string,path:string,body:unknown,status:number,extra:Record<string,string>={}):Promise<any>{
  assert.ok(path.startsWith('/v1/'));++requests;
  const response=await fetch(base+path,{method,redirect:'error',signal:AbortSignal.timeout(15000),headers:{...(actor?{Authorization:'Bearer '+actor.token}:{}),...(body===undefined?{}:{'content-type':'application/json'}),...extra},...(body===undefined?{}:{body:JSON.stringify(body)})});
  assert.equal(response.status,status,'Restricted operator HTTP '+method+' '+path);return response.json();
 }
 const authCall=(actor:Account|null,method:string,path:string,body:unknown=undefined,status=201)=>request(origin.origin,actor,method,path,body,status);
 async function account(label:string,company=false){
  const email='operator-http-'+label+'-'+stamp+'@example.test';
  const signup=await authCall(null,'POST','/v1/auth/signup',{email,password,accountType:company?'company':'professional',...(company?{workspaceName:'Operator HTTP '+label}:{})});
  const signin=await authCall(null,'POST','/v1/auth/signin',{email,password});assert.equal(signin.identity.id,signup.id);assert.ok(signin.accessToken);
  const actor:Account={id:signup.id,email,token:signin.accessToken,...(signup.tenantId?{tenant:signup.tenantId}:{})};accounts.push(actor);await setup.query('INSERT INTO identities(id) VALUES($1)',[actor.id]);return actor;
 }
 try{
  authDb=database(authUrl.toString());auth=new AuthService(authDb);db=database(restrictedUrl.toString());
  assert.deepEqual((await db.query('SELECT current_user actor,session_user login')).rows[0],{actor:restrictedUrl.username,login:restrictedUrl.username});
  await assert.rejects(db.query('SELECT * FROM public.sessions'),(e:unknown)=>(e as {code:string}).code==='42501');
  stage='real-sessions';const operator=await account('assigned'),other=await account('other-operator'),owner=await account('requester'),company=await account('company-a',true),companyB=await account('company-b',true);
  await setup.query('INSERT INTO platform_support_operators(identity_id,active) VALUES($1,true),($2,true)',[operator.id,other.id]);
  // Synthetic role/assignment setup is local to this schema, not administrative provisioning.
  for(let i=0;i<4;i++){
   const id=randomUUID();cases.push(id);await setup.query('INSERT INTO platform_support_intents(request_key,owner_identity_id) VALUES($1,$2)',[id,owner.id]);
   await setup.query("INSERT INTO platform_support_cases(id,owner_identity_id,category,description,created_at) VALUES($1,$2,'other','Synthetic private operator HTTP case','2026-01-01T00:00:00Z'::timestamptz+($3::int*interval '1 microsecond'))",[id,owner.id,i]);
   await setup.query('INSERT INTO platform_support_assignments(case_id,operator_identity_id) VALUES($1,$2)',[id,i===3?other.id:operator.id]);
  }
  class OperatorRuntimeHTTPFixture{}
  Module({controllers:[PlatformSupportOperatorController],providers:[{provide:PlatformSupportDatabases,useValue:{forScope:()=>db}},{provide:AuthService,useValue:auth}]})(OperatorRuntimeHTTPFixture);
  app=await NestFactory.create<NestFastifyApplication>(OperatorRuntimeHTTPFixture,new FastifyAdapter({logger:false}),{logger:false,abortOnError:false});app.setGlobalPrefix('v1');await app.listen(0,'127.0.0.1');
  const address=app.getHttpServer().address() as {address:string;port:number};assert.equal(address.address,'127.0.0.1');assert.ok(address.port>0);
  const base='http://127.0.0.1:'+address.port,path='/v1/platform-support/cases';
  const call=(actor:Account|null,method:string,suffix='',body:unknown=undefined,status=200,headers:Record<string,string>={})=>request(base,actor,method,path+suffix,body,status,headers);
  stage='isolation-and-pagination';const one=cases[0]!,foreign=cases[3]!,headers={'x-tenant-id':company.tenant!,'x-identity-id':other.id};
  const first=await call(operator,'GET','?limit=2',undefined,200,headers);assert.equal(first.items.length,2);assert.ok(first.nextCursor);
  assert.ok(!JSON.stringify(first).includes('Synthetic private'));for(const a of accounts)assert.ok(!JSON.stringify(first).includes(a.id));
  const second=await call(operator,'GET','?limit=2&cursor='+encodeURIComponent(first.nextCursor));assert.equal(second.nextCursor,null);
  assert.deepEqual([...first.items,...second.items].map((r:any)=>r.id),[cases[2],cases[1],cases[0]]);
  const detail=await call(operator,'GET','/'+one,undefined,200,headers);assert.equal(detail.description,'Synthetic private operator HTTP case');assert.ok(!JSON.stringify(detail).includes(owner.id));
  await call(operator,'GET','/'+foreign,undefined,404);await call(other,'GET','/'+one,undefined,404);
  const reply={responseKey:randomUUID(),body:'Synthetic restricted HTTP reply',resolve:false};
  for(const denied of [owner,company,companyB]){await call(denied,'GET','',undefined,404,headers);await call(denied,'GET','/'+one,undefined,404);await call(denied,'POST','/'+one+'/responses',reply,404);}
  await call(operator,'POST','/'+one+'/responses',{...reply,operatorIdentityId:other.id},400,headers);
  stage='concurrent-response';const pair=await Promise.all([call(operator,'POST','/'+one+'/responses',reply,201,headers),call(operator,'POST','/'+one+'/responses',reply,201)]);assert.deepEqual(pair[0],pair[1]);
  assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_responses WHERE case_id=$1',[one])).rows[0]?.n,1);
  assert.equal((await setup.query("SELECT count(*)::int n FROM platform_support_audit WHERE case_id=$1 AND action='responded'",[one])).rows[0]?.n,1);
  await call(operator,'POST','/'+one+'/responses',{...reply,resolve:true},409);
  stage='response-audit-rollback';
  await setup.query(`CREATE FUNCTION ${fault}() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.actor_identity_id='${operator.id}'::uuid AND NEW.action='responded' THEN RAISE EXCEPTION 'synthetic_operator_http_audit_fault'; END IF; RETURN NEW; END $$`);
  await setup.query(`CREATE TRIGGER ${fault} BEFORE INSERT ON platform_support_audit FOR EACH ROW EXECUTE FUNCTION ${fault}()`);trigger=true;
  const closing={responseKey:randomUUID(),body:'Synthetic final HTTP response',resolve:true};await call(operator,'POST','/'+one+'/responses',closing,500);
  assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_responses WHERE request_key=$1',[closing.responseKey])).rows[0]?.n,0);
  assert.equal((await setup.query('SELECT status FROM platform_support_cases WHERE id=$1',[one])).rows[0]?.status,'reviewing');
  await setup.query(`DROP TRIGGER ${fault} ON platform_support_audit`);trigger=false;await setup.query(`DROP FUNCTION ${fault}()`);
  const resolved=await call(operator,'POST','/'+one+'/responses',closing,201);assert.equal(resolved.resolvesCase,true);assert.deepEqual(await call(operator,'POST','/'+one+'/responses',closing,201),resolved);
  await call(operator,'POST','/'+one+'/responses',{...reply,responseKey:randomUUID()},409);
  stage='whole-page-audit-rollback';
  const beforePage=(await setup.query('SELECT count(*)::int n FROM platform_support_audit WHERE actor_identity_id=$1',[operator.id])).rows[0]?.n;
  await setup.query(`CREATE FUNCTION ${fault}() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.actor_identity_id='${operator.id}'::uuid AND NEW.case_id='${cases[1]}'::uuid AND NEW.action='read' THEN RAISE EXCEPTION 'synthetic_operator_http_page_fault'; END IF; RETURN NEW; END $$`);
  await setup.query(`CREATE TRIGGER ${fault} BEFORE INSERT ON platform_support_audit FOR EACH ROW EXECUTE FUNCTION ${fault}()`);trigger=true;await call(operator,'GET','?limit=2',undefined,500);
  assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_audit WHERE actor_identity_id=$1',[operator.id])).rows[0]?.n,beforePage);
  await setup.query(`DROP TRIGGER ${fault} ON platform_support_audit`);trigger=false;await setup.query(`DROP FUNCTION ${fault}()`);
  stage='revocation-and-deactivation';
  await setup.query('UPDATE platform_support_assignments SET revoked_at=now() WHERE case_id=$1',[one]);await call(operator,'GET','/'+one,undefined,404);await call(operator,'POST','/'+one+'/responses',closing,404);
  assert.ok(!(await call(operator,'GET')).items.some((r:any)=>r.id===one));
  await setup.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[owner.id]);await call(operator,'GET','/'+cases[1],undefined,404);assert.deepEqual((await call(operator,'GET')).items,[]);
  await setup.query('UPDATE identities SET deactivated_at=NULL WHERE id=$1',[owner.id]);
  const matrix:[string,string,unknown][]=[['GET','',undefined],['GET','/'+cases[1],undefined],['POST','/'+cases[1]+'/responses',{...reply,responseKey:randomUUID()}]];
  await setup.query('UPDATE platform_support_operators SET active=false WHERE identity_id=$1',[operator.id]);for(const [m,p,b]of matrix)await call(operator,m,p,b,404);await setup.query('UPDATE platform_support_operators SET active=true WHERE identity_id=$1',[operator.id]);
  await setup.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[operator.id]);for(const [m,p,b]of matrix)await call(operator,m,p,b,401);await setup.query('UPDATE identities SET deactivated_at=NULL WHERE id=$1',[operator.id]);
  stage='session-matrices';
  const snapshot=async()=>JSON.stringify((await setup.query("SELECT jsonb_build_object('cases',(SELECT jsonb_agg(to_jsonb(c) ORDER BY id) FROM platform_support_cases c),'responses',(SELECT jsonb_agg(to_jsonb(r) ORDER BY id) FROM platform_support_responses r),'audits',(SELECT jsonb_agg(to_jsonb(a) ORDER BY id) FROM platform_support_audit a)) snapshot")).rows),before=await snapshot();
  for(const [m,p,b]of matrix)await call(null,m,p,b,401);
  const hash=createHash('sha256').update(operator.token).digest('hex');await authDb.query("UPDATE sessions SET created_at=now()-interval '2 days',expires_at=now()-interval '1 day' WHERE token_hash=$1",[hash]);for(const [m,p,b]of matrix)await call(operator,m,p,b,401);
  const signed=await authCall(null,'POST','/v1/auth/signin',{email:operator.email,password});operator.token=signed.accessToken;
  await authCall(operator,'POST','/v1/auth/signout');for(const [m,p,b]of matrix)await call(operator,m,p,b,401);
  const fresh=await authCall(null,'POST','/v1/auth/signin',{email:operator.email,password});operator.token=fresh.accessToken;await auth.revokeAll(operator.id);for(const [m,p,b]of matrix)await call(operator,m,p,b,401);
  assert.equal(await snapshot(),before);
  assert.equal((await db.transaction(c=>c.query("SELECT NULLIF(current_setting('app.platform_support_identity',true),'') actor"))).rows[0]?.actor,null);
  console.log('PLATFORM_SUPPORT_OPERATOR_HTTP_RESTRICTED_PG_PASS '+JSON.stringify({requests,actualHTTPControllerAndAuthService:true,realSignupSigninSessions:true,authPoolSeparate:true,storePoolActualRestrictedLogin:true,noSessionReadACL:true,threeOperatorRoutes:true,paginationMicroseconds:true,companiesAndRequesterDenied:true,foreignCaseAndForgedActorDenied:true,concurrentIdempotence:true,responseAndPageAuditRollback:true,resolveReplayAndConflict:true,revocationAndDeactivationDenied:true,anonymousExpiredSignoutRevokedMatrices401:true,rejectedNoWrites:true,contextCleared:true,adminRuntimeProof:false,operationalConfiguration:false,render:false,production:false}));
 }catch(e){console.error('PLATFORM_SUPPORT_OPERATOR_HTTP_RESTRICTED_DIAGNOSTIC '+JSON.stringify({stage,sqlstate:typeof(e as {code?:unknown})?.code==='string'?(e as {code:string}).code:null,assertion:e instanceof assert.AssertionError}));throw e;
 }finally{
  if(app)await app.close();if(db)await db.onModuleDestroy();
  if(auth)for(const a of accounts)await auth.revokeAll(a.id);
  if(trigger){await setup.query(`DROP TRIGGER IF EXISTS ${fault} ON platform_support_audit`);await setup.query(`DROP FUNCTION IF EXISTS ${fault}()`);}
  const ids=accounts.map(a=>a.id);
  await setup.query('DELETE FROM platform_support_audit WHERE actor_identity_id=ANY($1::uuid[]) OR case_id=ANY($2::uuid[])',[ids,cases]);
  await setup.query('DELETE FROM platform_support_cases WHERE id=ANY($1::uuid[])',[cases]);await setup.query('DELETE FROM platform_support_intents WHERE request_key=ANY($1::uuid[])',[cases]);
  await setup.query('DELETE FROM platform_support_operators WHERE identity_id=ANY($1::uuid[])',[ids]);await setup.query('DELETE FROM identities WHERE id=ANY($1::uuid[])',[ids]);
  assert.equal((await setup.query('SELECT count(*)::int n FROM identities WHERE id=ANY($1::uuid[])',[ids])).rows[0]?.n,0);
  if(authDb)await authDb.onModuleDestroy();
 }
 console.log('PLATFORM_SUPPORT_OPERATOR_HTTP_RESTRICTED_CLEANUP_PASS '+JSON.stringify({listenerAndPoolsClosed:true,realSessionsRevoked:true,privateSyntheticRowsRemoved:true,publicFixtureAccountsUntilDatabaseTeardown:true,production:false}));
}

