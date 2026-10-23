'use strict';
// Synthetic canaries only. This test cannot target a remote API or database.
const assert=require('node:assert/strict');
const {readFileSync,statSync,lstatSync}=require('node:fs');
const {resolve}=require('node:path');
const {createRequire}=require('node:module');
const {randomUUID,createHash}=require('node:crypto');
const {localConfiguration,requireLocalDatabasePeer}=require('./professional-chronology-e2e.cjs');
let stage='configuration';
async function storageLogContract(){
 const vm=require('node:vm'),{stripTypeScriptTypes}=require('node:module'),{inspect}=require('node:util');
 const evaluate=(path,names,context)=>vm.runInNewContext(stripTypeScriptTypes(readFileSync(path,'utf8').replace(/^import .*$/gm,''),{mode:'transform'}).replace(/\bexport\s+/g,'')+'\n({'+names.join(',')+'})',context);
 const transaction=evaluate('apps/mobile/lib/session-transaction.ts',['createSessionQueue','persistVerifiedSession','clearExpectedSession','persistExpectedTenant'],{});
 const canary='SyntheticNativeError-'+randomUUID(),warnings=[],values=new Map();let fail=true;
 const failure=()=>{const error=new Error(canary);Object.assign(error,{token:canary,details:canary});return error;};
 const SecureStore={getItemAsync:async key=>{if(fail)throw failure();return values.get(key)??null;},setItemAsync:async(key,value)=>{if(fail)throw failure();values.set(key,value);},deleteItemAsync:async key=>{if(fail)throw failure();values.delete(key);}};
 const storage=evaluate('apps/mobile/lib/session.ts',['getSession','saveSession','clearSession','getTenant','saveTenant','clearTenant','saveVerifiedSignin','clearSessionForAuthorization','saveTenantForContext','authenticatedTenantHeaders'],{...transaction,SecureStore,console:{warn:(...args)=>warnings.push(args)}});
 assert.equal(await storage.getSession(),null);assert.equal(await storage.getTenant(),null);
 await storage.saveSession(canary);await storage.saveTenant(canary);await storage.clearSession();await storage.clearTenant();
 assert.equal(warnings.length,6,'Storage warnings must remain observable');
 const leaked=inspect(warnings).includes(canary);console.log('SECURITY_MOBILE_LOG_OBSERVED '+JSON.stringify({actualSource:true,nativeAdapterFixture:true,warnings:warnings.length,canaryDisclosed:leaked,physicalDevice:false}));
 assert.equal(leaked,false,'Mobile diagnostic disclosed the injected storage error');
 fail=false;const token='SyntheticStored-'+randomUUID(),tenant=randomUUID();
 assert.equal(await storage.saveVerifiedSignin({token,tenantId:tenant},null,()=>true),'saved');
 assert.equal(await storage.getSession(),token);assert.equal(await storage.getTenant(),tenant);
 const nextTenant=randomUUID();assert.equal(await storage.saveTenantForContext(nextTenant,{Authorization:'Bearer '+token,'x-tenant-id':tenant},()=>true),'saved');
 assert.equal((await storage.authenticatedTenantHeaders())['x-tenant-id'],nextTenant);
 assert.equal(await storage.clearSessionForAuthorization('Bearer '+token),'cleared');assert.equal(await storage.getSession(),null);assert.equal(await storage.getTenant(),null);
 console.log('SECURITY_MOBILE_LOG_AND_SESSION_PASS '+JSON.stringify({warningsRetained:true,noRawError:true,realQueueAndVerifiedStorageCore:true,nativeSecureStore:false}));
}
async function main(){
 const config=localConfiguration(process.env);
 const logPath=process.env.SECURITY_ACCEPTANCE_API_LOG;
 assert.equal(logPath,'/tmp/mlivre-api.log','Explicit disposable API log required');
 assert.ok(lstatSync(logPath).isFile()&&!lstatSync(logPath).isSymbolicLink(),'Owned CI log must be a regular file');
 const logOffset=statSync(logPath).size;
 const {Client}=createRequire(resolve('apps/api/package.json'))('pg');
 const db=new Client({connectionString:config.databaseUrl});await db.connect();
 const suffix=randomUUID().replaceAll('-',''),prefix='security_'+suffix;
 const canaries={password:'SyntheticSecret-'+suffix+'!',query:'SyntheticQuery-'+suffix,path:'SyntheticPath-'+suffix,body:'SyntheticBody-'+suffix,fault:'SyntheticDatabasePII-'+suffix,ownMessage:'SyntheticOwnMessage-'+suffix,foreignMessage:'SyntheticForeignMessage-'+suffix,foreignRating:'SyntheticForeignRating-'+suffix};
 const secrets=[];let requests=0,faultInstalled=false;
 async function call(path,{method='GET',token,tenant,body,status=200,headers={}}={}){
  requests++;
  const response=await fetch(config.origin+path,{method,redirect:'error',signal:AbortSignal.timeout(15000),headers:{...(token?{authorization:'Bearer '+token}:{}),...(tenant?{'x-tenant-id':tenant}:{}),...(body!==undefined?{'content-type':'application/json'}:{}),...headers},body:body===undefined?undefined:JSON.stringify(body)});
  const data=await response.json();assert.equal(response.status,status,'HTTP contract '+method+' '+path.split('?')[0].replace(canaries.path,'[fixture]'));return data;
 }
 async function account(label,type='professional'){
  const email='security-'+label+'-'+suffix+'@example.test';secrets.push(email);
  const signup=await call('/v1/auth/signup',{method:'POST',body:{email,password:canaries.password,accountType:type,...(type==='company'?{workspaceName:'Security fixture'}:{})},status:201});
  const auth=await call('/v1/auth/signin',{method:'POST',body:{email,password:canaries.password},status:201});secrets.push(auth.accessToken);
  assert.equal(auth.identity.id,signup.id);return{id:signup.id,tenant:signup.tenantId,token:auth.accessToken,email};
 }
 async function removeFault(){
  if(faultInstalled){await db.query('DROP TRIGGER IF EXISTS '+prefix+' ON public.privacy_requests; DROP FUNCTION IF EXISTS public.'+prefix+'(); DROP SEQUENCE IF EXISTS public.'+prefix+'_attempts;');faultInstalled=false;}
 }
 try{
  const server=(await db.query('SELECT current_database() name')).rows[0];requireLocalDatabasePeer(server,db.connection.stream.remoteAddress);
  stage='authentication-storage';
  const company=await account('company','company'),pro=await account('professional'),outsider=await account('outsider'),limited=await account('limiter');
  for(const actor of [company,pro,outsider,limited]){
   const row=(await db.query('SELECT password_hash FROM identities WHERE id=$1',[actor.id])).rows[0];
   assert.match(row.password_hash,/^scrypt\$[0-9a-f]{32}\$[0-9a-f]{128}$/);assert.ok(!row.password_hash.includes(canaries.password));
   const hash=createHash('sha256').update(actor.token).digest('hex');
   const sessions=(await db.query('SELECT token_hash FROM sessions WHERE identity_id=$1',[actor.id])).rows;
   assert.ok(sessions.some(x=>x.token_hash===hash));assert.ok(sessions.every(x=>x.token_hash!==actor.token));
  }
  stage='concurrent-rate-limit';
  const attempts=await Promise.all(Array.from({length:8},async()=>{
   requests++;const response=await fetch(config.origin+'/v1/auth/signin',{method:'POST',redirect:'error',signal:AbortSignal.timeout(15000),headers:{'content-type':'application/json'},body:JSON.stringify({email:limited.email,password:'SyntheticWrong-'+suffix})});
   const body=await response.json();assert.ok(!JSON.stringify(body).includes(limited.email));return response.status;
  }));
  assert.deepEqual(attempts.sort(),[401,401,401,401,401,401,401,429]);
  const limiter=(await db.query('SELECT failed_count,locked_until>now() locked FROM auth_signin_limits WHERE identity_id=$1',[limited.id])).rows[0];assert.equal(limiter.failed_count,8);assert.equal(limiter.locked,true);
  await call('/v1/auth/signin',{method:'POST',body:{email:limited.email,password:canaries.password},status:429});
  await db.query("UPDATE auth_signin_limits SET locked_until=now()-interval '1 second' WHERE identity_id=$1",[limited.id]);
  const recovered=await call('/v1/auth/signin',{method:'POST',body:{email:limited.email,password:canaries.password},status:201});secrets.push(recovered.accessToken);
  assert.equal((await db.query('SELECT count(*)::int n FROM auth_signin_limits WHERE identity_id=$1',[limited.id])).rows[0].n,0);
  console.log('SECURITY_AUTHENTICATION_CONCURRENCY_PASS '+JSON.stringify({realHTTPPostgres:true,parallelFailures:8,unauthorized:7,locked:1,storedPasswordsScrypt:true,storedTokensSHA256:true,explicitRecovery:true}));
  stage='private-export';
  const profile=await call('/v1/professional-profile',{method:'PUT',token:pro.token,body:{displayName:'Security professional',homeCity:'São Paulo',primaryRole:'Bartender'}});
  await call('/v1/professional-profile',{method:'PUT',token:outsider.token,body:{displayName:'Security outsider'}});
  const startsAt=new Date(Date.now()+86400000).toISOString(),endsAt=new Date(Date.now()+90000000).toISOString();
  const job=await call('/v1/company/jobs',{method:'POST',token:company.token,tenant:company.tenant,body:{title:'Security private journey',requiredRole:'Bartender',workCity:'São Paulo',startsAt,endsAt,payCents:1234},status:201});
  await call('/v1/jobs/'+job.id+'/interest',{method:'POST',token:pro.token,status:201});
  const assignment=await call('/v1/company/jobs/'+job.id+'/confirm',{method:'POST',token:company.token,tenant:company.tenant,body:{professionalId:profile.id},status:201});
  const chatPath='/v1/conversations/'+assignment.id+'/messages';
  const ownMessage=await call(chatPath,{method:'POST',token:pro.token,tenant:company.tenant,body:{body:canaries.ownMessage},status:201});
  const foreignMessage=await call(chatPath,{method:'POST',token:company.token,tenant:company.tenant,body:{body:canaries.foreignMessage},status:201});
  for(const step of ['check-in','start','check-out','complete'])await call('/v1/assignments/'+assignment.id+'/'+step,{method:'POST',token:pro.token,tenant:company.tenant,body:{},status:201});
  const rating=await call('/v1/assignments/'+assignment.id+'/rating',{method:'POST',token:company.token,tenant:company.tenant,body:{score:5,comment:canaries.foreignRating},status:201});
  assert.equal((await db.query('SELECT body FROM conversation_messages WHERE id=$1',[foreignMessage.id])).rows[0].body,canaries.foreignMessage);
  assert.equal((await db.query('SELECT comment FROM work_ratings WHERE id=$1',[rating.id])).rows[0].comment,canaries.foreignRating);
  const exported=await call('/v1/privacy/export',{token:pro.token}),foreignExport=await call('/v1/privacy/export',{token:company.token}),outsideExport=await call('/v1/privacy/export',{token:outsider.token});
  assert.ok(exported.authoredMessages.some(x=>x.id===ownMessage.id&&x.body===canaries.ownMessage));
  assert.ok(foreignExport.authoredMessages.some(x=>x.id===foreignMessage.id&&x.body===canaries.foreignMessage));
  assert.ok(exported.ratingsReceived.some(x=>x.id===rating.id&&x.score===5&&!('comment'in x)));
  for(const [value,forbidden]of [[exported,[canaries.foreignMessage,canaries.foreignRating,company.email,outsider.email]],[foreignExport,[canaries.ownMessage,pro.email]],[outsideExport,[canaries.ownMessage,canaries.foreignMessage,canaries.foreignRating,company.email,pro.email]]]){
   const raw=JSON.stringify(value);for(const secret of [...forbidden,canaries.password,...secrets.filter(x=>!x.includes('@'))])assert.ok(!raw.includes(secret),'Export disclosed a forbidden canary');
   for(const key of ['password_hash','passwordHash','token_hash','tokenHash','accessToken','operatorNote','handledBy','evidenceRef'])assert.ok(!raw.includes('"'+key+'"'),'Export secret/operator field');
  }
  await call('/v1/privacy/export',{status:401});await call('/v1/company/dashboard/assignments',{token:outsider.token,tenant:company.tenant,status:401});
  console.log('SECURITY_PRIVATE_EXPORT_PASS '+JSON.stringify({realPersistedMessagesAndRating:true,ownContentPreserved:true,thirdPartyContentRedacted:true,outsiderEmptyPrivateData:true,credentialsAndOperatorFieldsAbsent:true}));
  stage='owned-failure';
  const cliRequest=await call('/v1/privacy/requests',{method:'POST',token:pro.token,body:{requestType:'correction',details:canaries.body},status:201});
  const before=(await db.query('SELECT id FROM privacy_requests WHERE identity_id=$1 ORDER BY id',[pro.id])).rows;
  // The sequence is an out-of-transaction witness of exactly one failed SQL attempt.
  // Only the fresh fixture identity/detail matches; no policy/ACL/runtime code is changed.
  await db.query('CREATE SEQUENCE public.'+prefix+'_attempts;');faultInstalled=true;
  await db.query("CREATE FUNCTION public."+prefix+"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.identity_id='"+pro.id+"'::uuid AND NEW.request_details='"+canaries.body+"' THEN PERFORM nextval('public."+prefix+"_attempts'); RAISE EXCEPTION '"+canaries.fault+"' USING ERRCODE='P0001'; END IF; RETURN NEW; END $$;");
  await db.query('CREATE TRIGGER '+prefix+' BEFORE INSERT OR UPDATE ON public.privacy_requests FOR EACH ROW EXECUTE FUNCTION public.'+prefix+'();');
  const failed=await call('/v1/privacy/requests',{method:'POST',token:pro.token,body:{requestType:'correction',details:canaries.body},status:500});
  assert.equal(failed.requestId,undefined);assert.ok(!JSON.stringify(failed).includes(canaries.fault),'Raw database error in response');
  assert.deepEqual((await db.query('SELECT id FROM privacy_requests WHERE identity_id=$1 ORDER BY id',[pro.id])).rows,before);
  const sequence=(await db.query('SELECT last_value::int n,is_called FROM public.'+prefix+'_attempts')).rows[0];assert.equal(sequence.n,1);assert.equal(sequence.is_called,true);
  const {spawnSync}=require('node:child_process');
  const cli=spawnSync(process.execPath,['apps/api/dist/privacy-requests-ops.js','start',cliRequest.requestId,'test:security-owned-fault'],{env:{...process.env,PRIVACY_MAINTENANCE_DATABASE_URL:config.databaseUrl,PRIVACY_OPERATOR_ID:'ci:security-acceptance'},encoding:'utf8',timeout:15000,maxBuffer:65536});
  assert.equal(cli.error,undefined);assert.equal(cli.status,1);assert.equal(cli.stdout.trim(),'');
  assert.equal((await db.query('SELECT last_value::int n FROM public.'+prefix+'_attempts')).rows[0].n,2,'Exactly one additional failed CLI SQL attempt');
  const cliRow=(await db.query('SELECT status,evidence_ref FROM privacy_requests WHERE id=$1 AND identity_id=$2',[cliRequest.requestId,pro.id])).rows[0];assert.equal(cliRow.status,'submitted');assert.equal(cliRow.evidence_ref,null);
  console.log('SECURITY_OPERATION_LOG_OBSERVED '+JSON.stringify({realChildProcessAndDatabase:true,exitCode:cli.status,noSuccessOutput:true,canaryDisclosed:cli.stderr.includes(canaries.fault)}));
  assert.ok(!cli.stderr.includes(canaries.fault),'Operator diagnostic disclosed private SQL error');
  assert.ok(cli.stderr.includes('database_P0001'),'Operator error must retain safe SQL diagnostics');
  await removeFault();
  const recoveredRequest=await call('/v1/privacy/requests',{method:'POST',token:pro.token,body:{requestType:'correction',details:canaries.body},status:201});
  assert.equal((await db.query('SELECT request_details FROM privacy_requests WHERE id=$1 AND identity_id=$2',[recoveredRequest.requestId,pro.id])).rows[0].request_details,canaries.body);
  console.log('SECURITY_FAILURE_RECOVERY_PASS '+JSON.stringify({realDatabaseFault:true,http500:true,noSuccessACK:true,zeroPartialRows:true,sqlAttempts:1,automaticRetry:false,explicitManualRetry201:true,ownedFaultRemoved:true}));
  stage='server-log-privacy';
  await call('/v1/health/ready?email='+encodeURIComponent(pro.email)+'&accessToken='+canaries.query,{headers:{authorization:'Bearer '+pro.token,cookie:'session='+canaries.password,'x-request-id':canaries.query}});
  await call('/v1/'+canaries.path,{status:404,headers:{authorization:'Bearer '+pro.token}});
  await call('/v1/auth/signin',{method:'POST',body:{email:pro.email,password:canaries.body},status:401});
  await call('/v1/auth/signout',{method:'POST',token:pro.token,body:{},status:201});
  await call('/v1/me',{token:pro.token,status:401});
  // A bounded flush interval observes real server logging, never manufactures it.
  await new Promise(resolve=>setTimeout(resolve,200));
  const bytes=readFileSync(logPath);assert.ok(bytes.length>logOffset,'API log capture empty');
  const log=bytes.subarray(logOffset).toString('utf8');
  const categories={credentials:[...secrets,canaries.password],query:[canaries.query,encodeURIComponent(pro.email)],unmatchedPath:[canaries.path],requestBody:[canaries.body,canaries.ownMessage,canaries.foreignMessage,canaries.foreignRating],databaseError:[canaries.fault]};
  const violations=Object.entries(categories).map(([category,values])=>({category,leakedValues:values.filter(value=>log.includes(value)).length})).filter(x=>x.leakedValues>0);
  const statuses=[200,201,401,404,429,500];
  assert.ok(statuses.every(status=>new RegExp('"statusCode"\\s*:\\s*'+status+'\\b').test(log)),'HTTP status diagnostics missing');
  assert.ok(/"reqId"\s*:\s*"[^"\r\n]+"/.test(log),'Request correlation missing');
  console.log('SECURITY_LOG_PRIVACY_OBSERVED '+JSON.stringify({actualAPILog:true,scannedBytes:Buffer.byteLength(log),syntheticCategories:Object.keys(categories),violations,statusDiagnostics:statuses,requestCorrelation:true}));
  assert.equal(violations.length,0,'API logs exposed synthetic credential/PII canaries');
  assert.ok(/"event"\s*:\s*"application_error"/.test(log)&&/"code"\s*:\s*"P0001"/.test(log),'Application error diagnostics must remain observable');
  stage='mobile-storage-privacy';await storageLogContract();
  console.log('SECURITY_INTERNAL_ACCEPTANCE_HTTP_PG_PASS '+JSON.stringify({authentication:true,concurrentRateLimit:true,privateExport:true,realFaultRecovery:true,noAutomaticRetry:true,serverLogPrivacy:true,requests,disposableLocalOnly:true,externalPentest:false,physicalDevice:false,production:false}));
 }finally{await removeFault();await db.end();}
}
if(require.main===module)(process.argv.includes('--storage-only')?storageLogContract():main()).catch(()=>{console.error('SECURITY_INTERNAL_ACCEPTANCE_FAIL '+JSON.stringify({stage,details:'assertion_failed; synthetic values omitted'}));process.exitCode=1;});
