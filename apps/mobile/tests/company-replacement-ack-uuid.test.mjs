import test from 'node:test';
import assert from 'node:assert/strict';
import {requestReplacement,selectReplacement} from '../lib/company-replacements.ts';
const requestId='abcdef12-2222-4333-8444-555555555555',originalId='aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee',newId='abcdefab-8888-4777-8666-555555555555';
const replacement={id:requestId,assignmentId:originalId,status:'open'};
const response=data=>({ok:true,json:async()=>data});
test('replacement creation cannot acknowledge fabricated non-UUID request IDs while original binding and one POST remain exact',async()=>{
 for(const id of ['request-a','r','', ' ', ' '+requestId+' ',123,{},[]]){
  let calls=0;
  assert.equal(await requestReplacement(async()=>{calls++;return response({id,assignmentId:originalId,status:'open'})},originalId,'Fixture'),false);
  assert.equal(calls,1);
 }
 for(const id of [requestId,requestId.toUpperCase()]){
  const calls=[];
  assert.equal(await requestReplacement(async(...args)=>{calls.push(args);return response({id,assignmentId:originalId,status:'open'})},originalId,'Fixture'),true);
  assert.deepEqual(calls,[['/company/replacements/'+originalId,'POST',{reason:'Fixture'}]]);
 }
 assert.equal(await requestReplacement(async()=>response({id:requestId,assignmentId:'other',status:'open'}),originalId),false);
});
test('selection requires a real different substitute assignment UUID and retains exact requested IDs with no automatic retry',async()=>{
 const ack={replacementRequestId:requestId,assignmentId:newId,replacedAssignmentId:originalId,professionalId:'fixture-professional',status:'matched'};
 for(const assignmentId of ['new-a','', ' ', ' '+newId+' ',123,{},[],originalId,originalId.toUpperCase()]){
  let calls=0;
  assert.equal(await selectReplacement(async()=>{calls++;return response({...ack,assignmentId})},replacement,'fixture-professional'),false);
  assert.equal(calls,1);
 }
 for(const assignmentId of [newId,newId.toUpperCase()]){
  const calls=[];
  assert.equal(await selectReplacement(async(...args)=>{calls.push(args);return response({...ack,assignmentId})},replacement,'fixture-professional'),true);
  assert.deepEqual(calls,[['/company/replacements/'+requestId+'/select','POST',{professionalId:'fixture-professional'}]]);
 }
 for(const delta of [{replacementRequestId:'other'},{professionalId:'other'},{replacedAssignmentId:'other'},{status:'open'}])
  assert.equal(await selectReplacement(async()=>response({...ack,...delta}),replacement,'fixture-professional'),false);
});
