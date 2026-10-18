'use strict';
// Disposable local CI only. This is failure evidence, not a product/migration trigger.
const assert=require('node:assert/strict');
const {createRequire}=require('node:module');
const {resolve}=require('node:path');
const {randomUUID}=require('node:crypto');
const {localConfiguration,requireLocalDatabasePeer}=require('./professional-chronology-e2e.cjs');
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function scopeFor(input){
 for(const key of ['stamp','tenantId','assignmentId','jobId','professionalId','identityId'])assert.match(input[key],uuid,'Owned HTTP fixture UUID required');
 assert.equal(input.amountCents,23456,'Exact owned fixture amount required');
 const prefix='ledger_atomicity_'+input.stamp.replaceAll('-','');
 return{...input,sequence:prefix+'_seq',fn:prefix+'_fn',trigger:prefix+'_trg'};
}
function requireBinding(scope,row,ledger){
 scopeFor(scope);assert.ok(row,'Owned assignment binding required');
 for(const [key,value]of [['id',scope.assignmentId],['tenant_id',scope.tenantId],['job_id',scope.jobId],['professional_id',scope.professionalId],['identity_id',scope.identityId],['job_tenant_id',scope.tenantId],['job_title','Ledger rollback a '+scope.stamp],['pay_cents',scope.amountCents],['status','checked_out']])assert.equal(row[key],value,'HTTP/Postgres binding '+key);
 assert.equal(row.completed_at,null);assert.ok(row.checked_in_at instanceof Date);assert.ok(row.checked_out_at instanceof Date);
 assert.deepEqual(ledger,[],'No prior owned ledger entry before insert case');
}
function requireNames(scope){const expected=scopeFor(scope);for(const key of ['sequence','fn','trigger'])assert.equal(scope[key],expected[key],'Owned hook identifier');}
function failureFunctionSQL(scope){
 requireNames(scope);
 return `CREATE FUNCTION public.${scope.fn}() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,public AS $fixture$
  DECLARE completed_rows integer; ledger_rows integer;
  BEGIN
   IF NEW.tenant_id='${scope.tenantId}'::uuid AND NEW.assignment_id='${scope.assignmentId}'::uuid AND NEW.professional_id='${scope.professionalId}'::uuid THEN
    SELECT count(*) INTO completed_rows FROM public.work_assignments
     WHERE id=NEW.assignment_id AND tenant_id=NEW.tenant_id AND job_id='${scope.jobId}'::uuid AND professional_id=NEW.professional_id AND status='completed' AND completed_at IS NOT NULL;
    SELECT count(*) INTO ledger_rows FROM public.earnings_ledger
     WHERE id=NEW.id AND tenant_id=NEW.tenant_id AND assignment_id=NEW.assignment_id AND professional_id=NEW.professional_id AND amount_cents=${scope.amountCents} AND status='payable';
    IF completed_rows<>1 OR ledger_rows<>1 THEN RAISE EXCEPTION 'fixture_precondition_completed_and_ledger'; END IF;
    PERFORM pg_catalog.nextval('public.${scope.sequence}'::regclass);
    RAISE EXCEPTION 'fixture_ledger_insert_failure';
   END IF;
   RETURN NEW;
  END $fixture$`;
}
async function cleanupHook(db,scope,owned){
 requireNames(scope);const errors=[];
 for(const [flag,sql]of [['trigger','DROP TRIGGER '+scope.trigger+' ON public.earnings_ledger'],['fn','DROP FUNCTION public.'+scope.fn+'()'],['sequence','DROP SEQUENCE public.'+scope.sequence]]){
  if(!owned[flag])continue;try{await db.query(sql);owned[flag]=false;}catch(error){errors.push(error);}
 }
 if(errors.length)throw Error('Owned ledger hook cleanup failed');
}
// Consume only JSON already returned by the existing HTTP calls below. This loader
// callback performs no transport, SQL or retry; the application source is unchanged.
async function consumeEarningsJSON(data,expected){
 if(expected!==null){
  assert.ok(expected,'Explicit empty or bound positive expectation required');
  for(const key of ['tenantId','assignmentId','ledgerId'])assert.match(expected[key],uuid,'Actual fixture ledger binding required');
  assert.equal(expected.amountCents,23456);
 }
 const fs=require('node:fs'),vm=require('node:vm'),{stripTypeScriptTypes}=require('node:module');
 const source=fs.readFileSync(resolve(__dirname,'../apps/mobile/lib/earnings.ts'),'utf8');
 const {loadEarnings}=vm.runInNewContext(stripTypeScriptTypes(source.replace(/^import type .*$/gm,''),{mode:'transform'}).replace(/\bexport\s+/g,'')+'\n({loadEarnings})',{Date,Number,Array,Object,Set});
 let callbacks=0,jsonReads=0;
 const result=await loadEarnings(async()=>{callbacks++;return{ok:true,json:async()=>{jsonReads++;return data;}};});
 assert.equal(callbacks,1);assert.equal(jsonReads,1);
 assert.equal(result.status,'ready','Real mobile loader must accept actual successful earnings JSON');
 assert.equal(result.data,data,'Consumer must preserve the actual HTTP JSON without invented rows');
 if(expected===null)assert.deepEqual(result.data,[],'Rollback must remain verified empty, not a synthetic zero');
 else{
  assert.equal(result.data.length,1);const row=result.data[0];
  for(const [key,value]of [['id',expected.ledgerId],['tenantId',expected.tenantId],['assignmentId',expected.assignmentId],['amountCents',expected.amountCents],['status','payable']])assert.equal(row[key],value,'Real mobile ledger binding '+key);
 }
 return result;
}
module.exports={scopeFor,requireBinding,failureFunctionSQL,cleanupHook,consumeEarningsJSON};
async function main(){
 const config=localConfiguration(process.env);
 const {Client}=createRequire(resolve('apps/api/package.json'))('pg');
 const db=new Client({connectionString:config.databaseUrl});await db.connect();
 let scope;const owned={sequence:false,fn:false,trigger:false};
 try{
  const server=(await db.query('SELECT current_database() name,inet_server_addr()::text address')).rows[0];
  requireLocalDatabasePeer(server,db.connection.stream.remoteAddress);
  const stamp=randomUUID(),password='LedgerAtomicity123!';
  async function call(path,{method='GET',token,tenant,body,status=200}={}){
   assert.ok(path.startsWith('/v1/'));
   const response=await fetch(config.origin+path,{method,redirect:'error',signal:AbortSignal.timeout(15000),headers:{...(token?{authorization:'Bearer '+token}:{}),...(tenant?{'x-tenant-id':tenant}:{}),...(body!==undefined?{'content-type':'application/json'}:{})},...(body===undefined?{}:{body:JSON.stringify(body)})});
   const data=await response.json();assert.equal(response.status,status,'Actual HTTP '+method+' '+path);return data;
  }
  async function account(label,type){
   const email='ledger-atomicity-'+label+'-'+stamp+'@example.test';
   const signup=await call('/v1/auth/signup',{method:'POST',body:{email,password,accountType:type,...(type==='company'?{workspaceName:'Ledger rollback '+label}:{})},status:201});
   const auth=await call('/v1/auth/signin',{method:'POST',body:{email,password},status:201});
   assert.equal(auth.identity.id,signup.id);return{identity:signup.id,tenant:signup.tenantId,token:auth.accessToken};
  }
  const a=await account('a','company'),b=await account('b','company'),pro=await account('pro','professional'),outsider=await account('outsider','professional');
  assert.notEqual(a.tenant,b.tenant);
  const profile=await call('/v1/professional-profile',{method:'PUT',token:pro.token,body:{displayName:'Ledger rollback professional',homeCity:'São Paulo',primaryRole:'Bartender'}});
  const first=new Date();first.setUTCHours(12,0,0,0);first.setUTCDate(first.getUTCDate()+3);
  await call('/v1/availability/mine',{method:'POST',token:pro.token,body:{startsAt:new Date(first.getTime()-3600000).toISOString(),endsAt:new Date(first.getTime()+33*3600000).toISOString()},status:201});
  const fixtures=[];
  for(const [index,company]of [a,b].entries()){
   const startsAt=new Date(first.getTime()+index*86400000),endsAt=new Date(startsAt.getTime()+8*3600000),amountCents=[23456,34567][index];
   const job=await call('/v1/company/jobs',{method:'POST',token:company.token,tenant:company.tenant,body:{title:'Ledger rollback '+['a','b'][index]+' '+stamp,requiredRole:'Bartender',workCity:'São Paulo',startsAt:startsAt.toISOString(),endsAt:endsAt.toISOString(),payCents:amountCents},status:201});
   await call('/v1/jobs/'+job.id+'/interest',{method:'POST',token:pro.token,status:201});
   const assignment=await call('/v1/company/jobs/'+job.id+'/confirm',{method:'POST',token:company.token,tenant:company.tenant,body:{professionalId:profile.id},status:201});
   for(const step of ['check-in','start','check-out'])await call('/v1/assignments/'+assignment.id+'/'+step,{method:'POST',token:pro.token,tenant:company.tenant,body:{},status:201});
   if(index===1)await call('/v1/assignments/'+assignment.id+'/complete',{method:'POST',token:pro.token,tenant:company.tenant,status:201});
   fixtures.push({tenantId:company.tenant,assignmentId:assignment.id,jobId:job.id,professionalId:profile.id,identityId:pro.identity,amountCents});
  }
  scope=scopeFor({stamp,...fixtures[0]});
  const binding=(await db.query('SELECT wa.*,p.identity_id,j.tenant_id job_tenant_id,j.title job_title,j.pay_cents FROM work_assignments wa JOIN professional_profiles p ON p.id=wa.professional_id JOIN company_jobs j ON j.id=wa.job_id WHERE wa.id=$1 AND wa.tenant_id=$2',[scope.assignmentId,scope.tenantId])).rows[0];
  requireBinding(scope,binding,(await db.query('SELECT * FROM earnings_ledger WHERE assignment_id=$1 AND tenant_id=$2',[scope.assignmentId,scope.tenantId])).rows);
  const foreign=(await db.query('SELECT e.* FROM earnings_ledger e JOIN work_assignments wa ON wa.id=e.assignment_id AND wa.tenant_id=e.tenant_id WHERE e.assignment_id=$1 AND e.tenant_id=$2 AND e.professional_id=$3 AND e.amount_cents=$4 AND e.status=$5 AND wa.status=$6',[fixtures[1].assignmentId,b.tenant,profile.id,34567,'payable','completed'])).rows;
  assert.equal(foreign.length,1,'Foreign completed assignment and real ledger control required');
  const tenants=[a.tenant,b.tenant],tables=['work_assignments','earnings_ledger','company_jobs','tenant_memberships','payment_events'];
  const snapshot=async()=>{const result={};for(const table of tables)result[table]=(await db.query('SELECT * FROM public.'+table+' WHERE tenant_id=ANY($1::uuid[]) ORDER BY id',[tenants])).rows;return result;};
  const security=async()=>({classes:(await db.query('SELECT relname,relrowsecurity,relforcerowsecurity,relacl::text FROM pg_class WHERE oid=ANY($1::regclass[]) ORDER BY relname',[tables])).rows,policies:(await db.query("SELECT * FROM pg_policies WHERE schemaname='public' AND tablename=ANY($1::text[]) ORDER BY tablename,policyname",[tables])).rows});
  const before=await snapshot(),beforeSecurity=await security();
  const completePath='/v1/assignments/'+scope.assignmentId+'/complete';
  await call(completePath,{method:'POST',tenant:a.tenant,status:401});
  await call(completePath,{method:'POST',token:outsider.token,tenant:a.tenant,status:401});
  await call(completePath,{method:'POST',token:b.token,tenant:a.tenant,status:401});
  await call(completePath,{method:'POST',token:pro.token,tenant:b.tenant,status:400});
  assert.deepEqual(await snapshot(),before,'Auth/foreign negatives must leave both tenants intact');
  assert.deepEqual(await call('/v1/earnings/mine',{token:pro.token,tenant:a.tenant}),[]);
  await db.query('CREATE SEQUENCE public.'+scope.sequence);owned.sequence=true;
  await db.query(failureFunctionSQL(scope));owned.fn=true;
  await db.query('REVOKE ALL ON FUNCTION public.'+scope.fn+'() FROM PUBLIC');
  await db.query('CREATE TRIGGER '+scope.trigger+' AFTER INSERT ON public.earnings_ledger FOR EACH ROW EXECUTE FUNCTION public.'+scope.fn+'()');owned.trigger=true;
  await call(completePath,{method:'POST',token:pro.token,tenant:a.tenant,status:500});
  const witness=(await db.query('SELECT last_value,is_called FROM public.'+scope.sequence)).rows[0];
  assert.equal(witness.is_called,true);assert.equal(String(witness.last_value),'1');
  assert.deepEqual(await snapshot(),before,'Ledger INSERT failure must undo completed status/timestamp and new ledger, across all five tables/two tenants');
  assert.deepEqual(await security(),beforeSecurity);
  const mine=await call('/v1/assignments/mine',{token:pro.token,tenant:a.tenant});
  assert.equal(mine.length,1);assert.equal(mine[0].id,scope.assignmentId);assert.equal(mine[0].status,'checked_out');assert.equal(mine[0].completedAt,null);
  const rollbackEarnings=await call('/v1/earnings/mine',{token:pro.token,tenant:a.tenant});
  assert.deepEqual(rollbackEarnings,[]);
  await consumeEarningsJSON(rollbackEarnings,null);
  console.log('LEDGER_COMPLETION_INSERT_ROLLBACK_PASS '+JSON.stringify({realHTTP500:true,completedAndLedgerWitness:2,nonRollbackWitness:1,fiveTablesTwoTenantsUnchanged:true,assignmentStillCheckedOut:true,noPayableEarning:true,policiesACLUnchanged:true}));
  await cleanupHook(db,scope,owned);
  // Exactly one separately explicit recovery, not a business/client automatic retry.
  const ack=await call(completePath,{method:'POST',token:pro.token,tenant:a.tenant,status:201});
  assert.equal(ack.id,scope.assignmentId);assert.equal(ack.status,'completed');assert.ok(Number.isFinite(Date.parse(ack.completedAt)));
  const final=await snapshot(),old=before.work_assignments.find(x=>x.id===scope.assignmentId),now=final.work_assignments.find(x=>x.id===scope.assignmentId);
  assert.equal(now.status,'completed');assert.ok(now.completed_at instanceof Date);
  assert.deepEqual({...now,status:old.status,completed_at:old.completed_at},old,'Only status and completion timestamp may change');
  assert.equal(final.earnings_ledger.length,before.earnings_ledger.length+1);
  const entry=final.earnings_ledger.filter(x=>x.assignment_id===scope.assignmentId);assert.equal(entry.length,1);
  assert.equal(entry[0].tenant_id,a.tenant);assert.equal(entry[0].professional_id,profile.id);assert.equal(entry[0].amount_cents,scope.amountCents);assert.equal(entry[0].status,'payable');assert.ok(entry[0].created_at instanceof Date);
  for(const table of tables){
   assert.deepEqual(final[table].filter(x=>x.tenant_id===b.tenant),before[table].filter(x=>x.tenant_id===b.tenant));
   if(!['work_assignments','earnings_ledger'].includes(table))assert.deepEqual(final[table],before[table]);
  }
  for(const row of before.earnings_ledger)assert.deepEqual(final.earnings_ledger.find(x=>x.id===row.id),row);
  for(const row of before.work_assignments.filter(x=>x.id!==scope.assignmentId))assert.deepEqual(final.work_assignments.find(x=>x.id===row.id),row);
  const earnings=await call('/v1/earnings/mine',{token:pro.token,tenant:a.tenant});
  assert.equal(earnings.length,1);assert.equal(earnings[0].assignmentId,scope.assignmentId);assert.equal(earnings[0].amountCents,23456);assert.equal(earnings[0].status,'payable');
  await consumeEarningsJSON(earnings,{tenantId:scope.tenantId,assignmentId:scope.assignmentId,ledgerId:entry[0].id,amountCents:scope.amountCents});
  await call(completePath,{method:'POST',token:pro.token,tenant:a.tenant,status:400});
  assert.deepEqual(await snapshot(),final,'Already completed retry must not create a second ledger');
  assert.deepEqual(await security(),beforeSecurity);
  assert.equal((await db.query('SELECT to_regclass($1) object',['public.'+scope.sequence])).rows[0].object,null);
  assert.equal((await db.query('SELECT to_regprocedure($1) object',['public.'+scope.fn+'()'])).rows[0].object,null);
  assert.equal((await db.query('SELECT count(*)::int n FROM pg_trigger WHERE tgrelid=$1::regclass AND tgname=$2',['public.earnings_ledger',scope.trigger])).rows[0].n,0);
  console.log('LEDGER_MOBILE_REAL_JSON_PASS '+JSON.stringify({actualHTTPJSON:true,rollbackReadyEmpty:true,recoveryReadyBoundPayable:true,tenantId:scope.tenantId,assignmentId:scope.assignmentId,ledgerId:entry[0].id,amountCents:23456,additionalHTTPRequests:0,androidUIOrProviderOrRealMoney:false}));
  console.log('LEDGER_COMPLETION_ATOMICITY_HTTP_PG_PASS '+JSON.stringify({rollback:true,explicitRecovery201:true,oneExactPayableLedger:true,repeatComplete400:true,foreignLedgerUnchanged:true,authIsolation:true,ownedHookRemoved:true,providerOrRealMoneyOrNativeUI:false}));
 }finally{try{if(scope)await cleanupHook(db,scope,owned);}finally{await db.end();}}
}
if(require.main===module)main().catch(error=>{console.error('LEDGER_COMPLETION_ATOMICITY_FAIL '+error.message);process.exitCode=1;});
