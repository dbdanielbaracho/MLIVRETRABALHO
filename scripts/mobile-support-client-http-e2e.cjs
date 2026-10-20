'use strict';
// Disposable CI client/API journey. Real mobile modules and real localhost HTTP;
// the serialized store adapter is in-memory, not native SecureStore.
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {stripTypeScriptTypes}=require('node:module');
const {localConfiguration}=require('./professional-chronology-e2e.cjs');
const asModule=source=>'data:text/javascript;base64,'+Buffer.from(stripTypeScriptTypes(source,{mode:'strip'})).toString('base64');
async function verifySupportClient(context){
 const config=localConfiguration(process.env);
 assert.equal(typeof context.witnessLost,'function','Read-only PostgreSQL witness required');
 const {identityId,tenantId,assignmentId,token,description}=context;
 const authorization='Bearer '+token,payload={assignmentId,category:'schedule',description,priority:'normal'};
 const intentURL=asModule(readFileSync('apps/mobile/lib/support-intent.ts','utf8'));
 const {createSupportIntentStore,supportAcknowledgement}=await import(intentURL);
 const submissionSource=readFileSync('apps/mobile/lib/support-submission.ts','utf8').replaceAll("'./support-intent'",JSON.stringify(intentURL));
 const {createSupportSubmission}=await import(asModule(submissionSource));
 let raw=null,removals=0,phase='normal',loseNextAck=false,lostAck=null,expectedPayload=payload;const calls=[];
 const adapter={
  read:async owner=>{assert.equal(owner,identityId);return raw;},
  write:async(owner,value)=>{assert.equal(owner,identityId);raw=value;},
  remove:async owner=>{assert.equal(owner,identityId);removals++;raw=null;}
 };
 const transport=async(path,options)=>{
  assert.ok((path==='/me'&&options.method==='GET')||(['/support-cases/intent','/support-cases'].includes(path)&&options.method==='POST'),'Only fixture client routes allowed');
  assert.ok(options.headers.Authorization===authorization,'Fixture authorization changed');
  assert.ok(options.signal instanceof AbortSignal&&!options.signal.aborted);
  if(path==='/me'){
   assert.equal(options.body,undefined);assert.equal(options.headers['x-tenant-id'],undefined);
  }else{
   assert.equal(options.headers['x-tenant-id'],tenantId);
   assert.deepEqual(JSON.parse(options.body),expectedPayload);
   if(path==='/support-cases')assert.match(options.headers['idempotency-key'],/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
   else assert.equal(options.headers['idempotency-key'],undefined);
  }
  calls.push({path,method:options.method,phase});
  const response=await fetch(config.origin+'/v1'+path,{...options,redirect:'error'});
  assert.equal(response.status,path==='/me'?200:201,'Actual fixture HTTP response');
  if(loseNextAck&&path==='/support-cases'){
   loseNextAck=false;lostAck=await response.json();
   assert.ok(supportAcknowledgement(lostAck,expectedPayload),'Real committed response must be valid before controlled loss');
   throw Error('fixture_response_lost_after_actual_201');
  }
  return response;
 };
 const options={getHeaders:async()=>({Authorization:authorization}),transport,isCurrent:()=>true};
 const store=createSupportIntentStore(adapter),flow=createSupportSubmission({...options,store});
 assert.equal((await flow.inspect(authorization)).status,'empty');
 const sent=await flow.sendNew(tenantId,assignmentId,payload,authorization);
 assert.equal(sent.status,'confirmed','Actual client did not confirm the real API ACK');
 const record=sent.record;
 assert.equal(record.reporterIdentityId,identityId);assert.equal(record.tenantId,tenantId);
 assert.deepEqual(record.payload,payload);assert.equal(record.phase,'confirmed');
 assert.ok(!raw.includes(token),'Credential must not be persisted in the fixture slot');
 const before=raw;
 const restarted=createSupportSubmission({...options,store:createSupportIntentStore(adapter)});
 const restored=await restarted.inspect(authorization);assert.equal(restored.status,'confirmed');assert.deepEqual(restored.record,record);
 const repeated=await restarted.sendNew(tenantId,assignmentId,{...payload,description:'Not a newly authorized intent'},authorization);
 assert.equal(repeated.status,'confirmed');assert.deepEqual(repeated.record,record);assert.equal(raw,before);
 assert.equal((await restarted.retry(record.requestKey,authorization)).status,'confirmed');
 assert.equal(calls.filter(x=>x.path==='/support-cases/intent').length,1);
 assert.equal(calls.filter(x=>x.path==='/support-cases').length,1,'Confirmed recovery must not make another case POST');
 assert.equal((await restarted.releaseConfirmed(record.requestKey,authorization)).status,'empty');
 assert.equal(removals,1);assert.equal(raw,null);

 // A NEW independent intent: the real server commits and returns201, then this
 // fixture loses that response locally. No app retry is added or API altered.
 phase='lost-response';loseNextAck=true;
 const lostPayload={...payload,description:description+' lost-response'};expectedPayload=lostPayload;
 const lostStore=createSupportIntentStore(adapter),lostFlow=createSupportSubmission({...options,store:lostStore});
 assert.deepEqual(await lostFlow.sendNew(tenantId,assignmentId,lostPayload,authorization),{status:'unknown'});
 const pending=await lostStore.load(identityId);assert.equal(pending.status,'existing');assert.equal(pending.record.phase,'pending');
 const pendingRecord=pending.record,pendingBytes=raw;
 assert.notEqual(pendingRecord.requestKey,record.requestKey);assert.ok(lostAck);
 assert.deepEqual(pendingRecord.payload,lostPayload);
 // The caller proves the row already exists in the guarded local PostgreSQL
 // BEFORE the separate explicit retry, using the actual HTTP IDs and key.
 const witness=await context.witnessLost({record:pendingRecord,ack:lostAck});
 assert.deepEqual(witness,{rows:1,dateObject:true});
 const pendingRestart=createSupportSubmission({...options,store:createSupportIntentStore(adapter)});
 assert.equal((await pendingRestart.inspect(authorization)).status,'pending');
 const blocked=await pendingRestart.sendNew(tenantId,assignmentId,{...lostPayload,description:'No new intent'},authorization);
 assert.equal(blocked.status,'pending');assert.deepEqual(blocked.record,pendingRecord);
 assert.deepEqual(await pendingRestart.releaseConfirmed(pendingRecord.requestKey,authorization),{status:'error'});
 assert.equal(removals,1);assert.equal(raw,pendingBytes);
 assert.equal(calls.filter(x=>x.path==='/support-cases/intent').length,2);
 assert.equal(calls.filter(x=>x.path==='/support-cases').length,2,'Unknown pending recovery must not POST automatically');

 phase='explicit-pending-retry';
 const recovered=await pendingRestart.retry(pendingRecord.requestKey,authorization);
 assert.equal(recovered.status,'confirmed');assert.deepEqual(recovered.record.acknowledgement,lostAck);
 assert.equal(recovered.record.requestKey,pendingRecord.requestKey);
 assert.deepEqual(recovered.record.payload,lostPayload);
 assert.equal((await pendingRestart.releaseConfirmed(pendingRecord.requestKey,authorization)).status,'empty');
 assert.equal(raw,null);assert.equal(removals,2);
 assert.equal(calls.filter(x=>x.path==='/support-cases/intent').length,2);
 assert.equal(calls.filter(x=>x.path==='/support-cases').length,3);
 assert.equal(calls.filter(x=>x.path==='/support-cases'&&x.phase==='normal').length,1);
 assert.equal(calls.filter(x=>x.path==='/support-cases'&&x.phase==='lost-response').length,1);
 assert.equal(calls.filter(x=>x.path==='/support-cases'&&x.phase==='explicit-pending-retry').length,1);
 return {records:[record,recovered.record],calls};
}
module.exports={verifySupportClient};
