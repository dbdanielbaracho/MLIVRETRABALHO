'use strict';
const assert=require('node:assert/strict');
const {createRequire}=require('node:module');
const {resolve}=require('node:path');
const {randomUUID}=require('node:crypto');
const {localConfiguration,requireLocalDatabasePeer}=require('./professional-chronology-e2e.cjs');
async function main(){
 const config=localConfiguration(process.env);
 const {Client}=createRequire(resolve('apps/api/package.json'))('pg');
 const db=new Client({connectionString:config.databaseUrl});await db.connect();
 try{
  const server=(await db.query('SELECT current_database() name,inet_server_addr()::text address')).rows[0];
  requireLocalDatabasePeer(server,db.connection.stream.remoteAddress);
  console.log('SAFETY_CHRONOLOGY_DB_CONTEXT '+JSON.stringify({database:server.name,clientSocket:db.connection.stream.remoteAddress}));
  const stamp=randomUUID(),password='SafetyChronology123!';
  async function call(path,{method='GET',token,tenant,body,status=200}={}){
   const r=await fetch(config.origin+path,{method,redirect:'error',signal:AbortSignal.timeout(15000),headers:{...(token?{authorization:'Bearer '+token}:{}),...(tenant?{'x-tenant-id':tenant}:{}),...(body!==undefined?{'content-type':'application/json'}:{})},body:body===undefined?undefined:JSON.stringify(body)});
   const data=await r.json();assert.equal(r.status,status,'Fixture HTTP '+method+' '+path);return data;
  }
  async function account(label,type){
   const email='safety-chronology-'+label+'-'+stamp+'@example.test';
   const signup=await call('/v1/auth/signup',{method:'POST',body:{email,password,accountType:type,...(type==='company'?{workspaceName:'Safety chronology '+label}:{})},status:201});
   const auth=await call('/v1/auth/signin',{method:'POST',body:{email,password},status:201});
   assert.equal(auth.identity.id,signup.id);return{identity:signup.id,tenant:signup.tenantId,token:auth.accessToken};
  }
  const pro=await account('professional','professional'),outsider=await account('outsider','professional');
  const companies=[await account('a','company'),await account('b','company')];
  const profile=await call('/v1/professional-profile',{method:'PUT',token:pro.token,body:{displayName:'Safety chronology professional',primaryRole:'Bartender',homeCity:'São Paulo'}});
  const first=Date.now()+86400000;
  await call('/v1/availability/mine',{method:'POST',token:pro.token,body:{startsAt:new Date(first-3600000).toISOString(),endsAt:new Date(first+56*3600000).toISOString()},status:201});
  const fixtures=[];
  for(const [index,company]of companies.entries()){
   const startsAt=new Date(first+index*86400000).toISOString(),endsAt=new Date(first+index*86400000+8*3600000).toISOString();
   const job=await call('/v1/company/jobs',{method:'POST',token:company.token,tenant:company.tenant,body:{title:'Safety chronology '+index,requiredRole:'Bartender',workCity:'São Paulo',startsAt,endsAt,payCents:18000},status:201});
   await call('/v1/jobs/'+job.id+'/interest',{method:'POST',token:pro.token,status:201});
   const assignment=await call('/v1/company/jobs/'+job.id+'/confirm',{method:'POST',token:company.token,tenant:company.tenant,body:{professionalId:profile.id},status:201});
   const report=await call('/v1/safety-cases',{method:'POST',token:pro.token,tenant:company.tenant,body:{assignmentId:assignment.id,category:'unsafe_work',description:'Own disposable chronology '+stamp},status:201});
   assert.equal(report.status,'open');
   const appeal=await call('/v1/safety-appeals',{method:'POST',token:pro.token,tenant:company.tenant,body:{safetyCaseId:report.id,reason:'Own fixture review '+stamp},status:201});
   assert.equal(appeal.created,true);assert.equal(appeal.status,'submitted');
   const review=await call('/v1/company/safety-appeals/'+appeal.id+'/status',{method:'POST',token:company.token,tenant:company.tenant,body:{status:'reviewing',note:'Controlled fixture review'},status:201});
   assert.equal(review.changed,true);
   const repeat=await call('/v1/company/safety-appeals/'+appeal.id+'/status',{method:'POST',token:company.token,tenant:company.tenant,body:{status:'reviewing'},status:201});assert.equal(repeat.changed,false);
   const support=await call('/v1/support-cases',{method:'POST',token:pro.token,tenant:company.tenant,body:{assignmentId:assignment.id,category:'schedule',description:'Own support '+stamp,priority:'normal'},status:201});assert.equal(support.status,'open');
   fixtures.push({tenant:company.tenant,assignment:assignment.id,case:report.id,appeal:appeal.id,support:support.id,caseTime:['2026-10-14T12:00:00.000Z','2026-10-15T12:00:00.000Z'][index],supportTime:['2026-10-15T12:00:00.000Z','2026-10-14T12:00:00.000Z'][index]});
  }
  const tables=['safety_cases','safety_case_appeals','safety_case_events','safety_case_appeal_events','support_cases'];
  const security=async()=>({classes:(await db.query('SELECT relname,relrowsecurity,relforcerowsecurity,relacl::text FROM pg_class WHERE oid=ANY($1::regclass[]) ORDER BY relname',[tables])).rows,policies:(await db.query('SELECT * FROM pg_policies WHERE schemaname=$1 AND tablename=ANY($2::text[]) ORDER BY tablename,policyname',['public',tables])).rows});
  const beforeSecurity=await security();
  for(const table of ['safety_case_appeals','safety_case_events','safety_case_appeal_events']){
   const p=(await db.query("SELECT has_table_privilege('app_runtime',$1,'UPDATE') u,has_table_privilege('app_runtime',$1,'DELETE') d",[table])).rows[0];assert.equal(p.u,false);assert.equal(p.d,false);
  }
  // Admin changes ONLY created_at on these new HTTP-owned disposable fixture rows.
  // Every row is bound to its tenant, assignment, identity, parent and marker BEFORE DML.
  // Immutable event timestamps/status/notes, grants, policies, old data and production are never altered.
  for(const f of fixtures){
   const binding=await db.query(`SELECT sc.id FROM safety_cases sc JOIN work_assignments wa ON wa.id=sc.assignment_id AND wa.tenant_id=sc.tenant_id JOIN professional_profiles p ON p.id=wa.professional_id JOIN safety_case_appeals a ON a.safety_case_id=sc.id AND a.tenant_id=sc.tenant_id JOIN support_cases s ON s.assignment_id=wa.id AND s.tenant_id=sc.tenant_id WHERE sc.id=$1 AND sc.tenant_id=$2 AND sc.reporter_identity_id=$3 AND sc.assignment_id=$4 AND p.identity_id=$3 AND a.id=$5 AND a.appellant_identity_id=$3 AND s.id=$6 AND s.reporter_identity_id=$3 AND sc.description=$7 AND a.reason=$8 AND s.description=$9`,[f.case,f.tenant,pro.identity,f.assignment,f.appeal,f.support,'Own disposable chronology '+stamp,'Own fixture review '+stamp,'Own support '+stamp]);assert.equal(binding.rows.length,1);
   await db.query('BEGIN');try{
    assert.equal((await db.query('UPDATE safety_cases SET created_at=$1 WHERE id=$2 AND tenant_id=$3 AND reporter_identity_id=$4 AND assignment_id=$5',[f.caseTime,f.case,f.tenant,pro.identity,f.assignment])).rowCount,1);
    assert.equal((await db.query('UPDATE safety_case_appeals SET created_at=$1 WHERE id=$2 AND tenant_id=$3 AND appellant_identity_id=$4 AND safety_case_id=$5',[f.caseTime,f.appeal,f.tenant,pro.identity,f.case])).rowCount,1);
    assert.equal((await db.query('UPDATE support_cases SET created_at=$1 WHERE id=$2 AND tenant_id=$3 AND reporter_identity_id=$4 AND assignment_id=$5',[f.supportTime,f.support,f.tenant,pro.identity,f.assignment])).rowCount,1);
    await db.query('COMMIT');
   }catch(error){await db.query('ROLLBACK');throw error;}
  }
  // Fresh urgent item must remain AFTER overdue entries; no priority/date policy is added.
  const recent=await call('/v1/support-cases',{method:'POST',token:pro.token,tenant:fixtures[0].tenant,body:{category:'other',description:'Recent fixture '+stamp,priority:'urgent'},status:201});
  const eventSnapshots=[];
  for(const [index,f]of fixtures.entries()){
   const events=await call('/v1/company/safety-appeals/'+f.appeal+'/events',{token:companies[index].token,tenant:f.tenant});assert.equal(events.length,1);assert.equal(events[0].actorIdentityId,companies[index].identity);assert.equal(events[0].toStatus,'reviewing');eventSnapshots.push(events);
  }
  const snapshot=async()=>{const result={};for(const table of tables)result[table]=(await db.query('SELECT * FROM '+table+' WHERE tenant_id=ANY($1::uuid[]) ORDER BY id',[fixtures.map(f=>f.tenant)])).rows;return result;};
  const beforeRows=await snapshot();
  const types=(await db.query('SELECT sc.created_at c,a.created_at a,s.created_at s FROM safety_cases sc JOIN safety_case_appeals a ON a.safety_case_id=sc.id JOIN support_cases s ON s.assignment_id=sc.assignment_id AND s.tenant_id=sc.tenant_id WHERE sc.id=ANY($1::uuid[])',[fixtures.map(f=>f.case)])).rows;
  assert.equal(types.length,2);assert.ok(types.every(x=>x.c instanceof Date&&x.a instanceof Date&&x.s instanceof Date));
  console.log('SAFETY_CHRONOLOGY_PG_TYPES '+JSON.stringify({dateObjects:true,fixtures}));
  const cases=await call('/v1/safety-cases/mine',{token:pro.token}),appeals=await call('/v1/safety-appeals/mine',{token:pro.token});
  const exceptions=await call('/v1/company/exceptions',{token:companies[0].token,tenant:fixtures[0].tenant});
  assert.equal(cases.length,2);assert.equal(appeals.length,2);assert.equal(exceptions.length,3);
  assert.ok(cases.every(x=>x.reportedByMe&&x.status==='open'));assert.ok(appeals.every(x=>x.status==='reviewing'));
  assert.equal(exceptions.find(x=>x.id===recent.id).overdue,false);
  assert.ok(exceptions.filter(x=>x.id!==recent.id).every(x=>x.overdue));
  for(const [index,f]of fixtures.entries()){
   assert.deepEqual((await call('/v1/safety-cases/mine',{token:pro.token,tenant:f.tenant})).map(x=>x.id),[f.case]);
   assert.deepEqual((await call('/v1/safety-appeals/mine',{token:pro.token,tenant:f.tenant})).map(x=>x.id),[f.appeal]);
   assert.deepEqual(await call('/v1/company/safety-appeals/'+f.appeal+'/events',{token:companies[index].token,tenant:f.tenant}),eventSnapshots[index]);
  }
  for(const path of ['/v1/safety-cases/mine','/v1/safety-appeals/mine']){
   assert.deepEqual(await call(path,{token:outsider.token}),[]);await call(path,{token:outsider.token,tenant:fixtures[0].tenant,status:401});await call(path,{status:401});
  }
  await call('/v1/company/exceptions',{token:pro.token,tenant:fixtures[0].tenant,status:403});await call('/v1/company/exceptions',{token:companies[1].token,tenant:fixtures[0].tenant,status:401});await call('/v1/company/exceptions',{tenant:fixtures[0].tenant,status:401});
  assert.deepEqual(await snapshot(),beforeRows);assert.deepEqual(await security(),beforeSecurity);
  let failures=0;
  for(const [endpoint,actual,expected]of [['safety-cases',cases.map(x=>x.id),[fixtures[1].case,fixtures[0].case]],['safety-appeals',appeals.map(x=>x.id),[fixtures[1].appeal,fixtures[0].appeal]],['exceptions',exceptions.map(x=>x.id),[fixtures[0].case,fixtures[0].support,recent.id]]]){
   const pass=JSON.stringify(actual)===JSON.stringify(expected);if(!pass)failures++;console.log('SAFETY_CHRONOLOGY_OBSERVED '+JSON.stringify({endpoint,pass,actual,expected}));
  }
  assert.equal(failures,0,'Safety/support chronology failed on actual HTTP/Postgres');
  // Actual API JSON also enters the unchanged professional mobile safety loader.
  // This exercises its data contract, not React Native render, taps or native storage.
  const fs=require('node:fs'),vm=require('node:vm'),{stripTypeScriptTypes}=require('node:module');
  const source=stripTypeScriptTypes(fs.readFileSync('apps/mobile/lib/professional-safety.ts','utf8'),{mode:'transform'}).replace(/\bexport\s+/g,'');
  const {loadSafety}=vm.runInNewContext(source+';({loadSafety})',{Date,Number,Array,Object,Set});
  const assignments=await call('/v1/assignments/mine',{token:pro.token});
  const payloads={'/assignments/mine':assignments,'/safety-cases/mine':cases,'/safety-appeals/mine':appeals};
  const loaded=await loadSafety(async path=>{assert.ok(Object.hasOwn(payloads,path));return{ok:true,status:200,json:async()=>payloads[path]};});
  for(const key of ['assignments','cases','appeals'])assert.equal(loaded[key].status,'ready');
  assert.deepEqual(loaded.cases.data.map(x=>x.id),[fixtures[1].case,fixtures[0].case]);
  assert.deepEqual(loaded.appeals.data.map(x=>x.id),[fixtures[1].appeal,fixtures[0].appeal]);
  console.log('SAFETY_CHRONOLOGY_PASS three real ordered reads, overdue-first preserved, actor/tenant isolation, immutable events and runtime grants unchanged, actual JSON through unchanged mobile safety loader; not Android/physical/provider evidence');

  // Independent actual mobile client/API/storage cases after ALL original assertions.
  // Response loss is a defined fixture; no browser gate, old assertion or deadline changes.
  const beforeClient=await snapshot();
  const bindClient=async(record,ack)=>{
   const bound=(await db.query('SELECT id,created_at AS "createdAt",request_payload_hash AS "requestHash" FROM support_cases WHERE id=$1 AND tenant_id=$2 AND reporter_identity_id=$3 AND assignment_id=$4 AND request_key=$5 AND category=$6 AND priority=$7 AND description=$8 AND status=$9',[ack.id,record.tenantId,record.reporterIdentityId,record.payload.assignmentId,record.requestKey,record.payload.category,record.payload.priority,record.payload.description,ack.status])).rows;
   assert.equal(bound.length,1);assert.ok(bound[0].createdAt instanceof Date);assert.match(bound[0].requestHash,/^[0-9a-f]{64}$/);
   assert.equal(bound[0].createdAt.toISOString(),new Date(ack.createdAt).toISOString());
   return {rows:1,dateObject:true};
  };
  const {verifySupportClient}=require('./mobile-support-client-http-e2e.cjs');
  const verified=await verifySupportClient({identityId:pro.identity,tenantId:fixtures[0].tenant,assignmentId:fixtures[0].assignment,token:pro.token,description:'Own client support '+stamp,witnessLost:async({record,ack})=>{
   assert.equal(record.phase,'pending');
   return bindClient(record,ack);
  }});
  const afterClient=await snapshot(),records=verified.records;
  assert.equal(new Set(records.map(r=>r.requestKey)).size,2);assert.equal(new Set(records.map(r=>r.acknowledgement.id)).size,2);
  for(const table of tables){
   if(table==='support_cases'){
    assert.equal(afterClient[table].length,beforeClient[table].length+2);
    for(const row of beforeClient[table])assert.deepEqual(afterClient[table].find(x=>x.id===row.id),row);
    const added=afterClient[table].filter(x=>!beforeClient[table].some(y=>y.id===x.id));
    assert.deepEqual(added.map(x=>x.id).sort(),records.map(r=>r.acknowledgement.id).sort());
   }else assert.deepEqual(afterClient[table],beforeClient[table]);
  }
  for(const record of records)await bindClient(record,record.acknowledgement);
  assert.deepEqual(await security(),beforeSecurity);
  await call('/v1/support-cases/mine',{token:outsider.token,tenant:fixtures[0].tenant,status:401});
  console.log('MOBILE_SUPPORT_CLIENT_HTTP_PG_PASS '+JSON.stringify({actualClient:true,actualHTTP:true,actualPGDates:true,normalCasePOSTs:1,lostResponseCasePOSTs:1,explicitPendingRetryPOSTs:1,preparationPOSTs:2,caseRowsAdded:2,committedRowWitnessBeforeRetry:true,restartRecovered:true,noImplicitPOST:true,explicitLocalRelease:true,oldFiveTableRowsUnchanged:true,policiesACLUnchanged:true,storageFixture:'in_memory',nativeUI:false,caseIds:records.map(r=>r.acknowledgement.id)}));
 }finally{await db.end();}
}
if(require.main===module)main().catch(error=>{console.error('SAFETY_CHRONOLOGY_FAIL '+error.message);process.exitCode=1;});
