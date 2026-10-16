'use strict';
// Consumes only JSON already obtained by the disposable HTTP fixtures.
// No HTTP, credentials, database access, native UI or SecureStore implementation here.
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {stripTypeScriptTypes}=require('node:module');
const {resolve}=require('node:path');
const {localConfiguration}=require('./professional-chronology-e2e.cjs');
async function moduleFrom(path){
 const source=readFileSync(resolve(path),'utf8');
 return import('data:text/javascript;base64,'+Buffer.from(stripTypeScriptTypes(source,{mode:'strip'})).toString('base64'));
}
async function main(){
 localConfiguration(process.env);
 const input=JSON.parse(readFileSync(0,'utf8')),mode=process.argv[2];
 const response=data=>({ok:true,status:200,json:async()=>data});
 if(mode==='chat'){
  const {loadMessages,sendMessage}=await moduleFrom('apps/mobile/lib/conversation.ts');
  assert.ok(Array.isArray(input.messages)&&input.messages.length>0);
  assert.ok(input.messages.some(m=>m.id===input.ack.id&&m.body===input.ack.body&&m.createdAt===input.ack.createdAt));
  assert.deepEqual(await loadMessages(async(path,body)=>{
   assert.equal(path,'/conversations/'+input.assignmentId+'/messages');assert.equal(body,undefined);return response(input.messages);
  },input.assignmentId),{status:'ready',data:input.messages});
  let acknowledgements=0;
  assert.deepEqual(await sendMessage(async(path,body)=>{
   acknowledgements++;assert.equal(path,'/conversations/'+input.assignmentId+'/messages');assert.deepEqual(body,{body:input.ack.body});return response(input.ack);
  },input.assignmentId,input.ack.body),{status:'sent',id:input.ack.id});
  assert.equal(acknowledgements,1);
  console.log('MOBILE_CHAT_REAL_JSON_PASS actual_API_JSON_consumed=true native_UI=false new_HTTP_POSTs=0');
 }else if(mode==='support'){
  const {createSupportIntentStore,pendingSupportIntent,supportAcknowledgement}=await moduleFrom('apps/mobile/lib/support-intent.ts');
  const pending=pendingSupportIntent(input.identityId,input.tenantId,input.requestKey,input.payload);
  assert.ok(pending);
  const ack=supportAcknowledgement(input.ack,pending.payload);assert.ok(ack);
  let raw=null,removals=0;
  const adapter={read:async()=>raw,write:async(_,value)=>{raw=value;},remove:async()=>{removals++;raw=null;}};
  const store=createSupportIntentStore(adapter);
  assert.deepEqual(await store.stage(pending),{status:'saved',record:pending});
  const confirmed={...pending,phase:'confirmed',acknowledgement:ack};
  assert.deepEqual(await store.confirm(input.identityId,input.requestKey,input.ack),{status:'saved',record:confirmed});
  assert.deepEqual(await createSupportIntentStore(adapter).load(input.identityId),{status:'existing',record:confirmed});
  assert.deepEqual(await store.releaseConfirmed(input.identityId,input.requestKey),{status:'empty'});
  assert.equal(removals,1);assert.equal(raw,null);
  console.log('MOBILE_SUPPORT_REAL_JSON_PASS actual_API_JSON_consumed=true storage_fixture=in_memory native_UI=false new_HTTP_POSTs=0');
 }else throw Error('unknown_contract_mode');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
