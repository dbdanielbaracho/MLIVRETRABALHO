import test from 'node:test';
import assert from 'node:assert/strict';
import {loadMessages,sendMessage} from '../lib/conversation.ts';
const assignment='00000000-0000-4000-8000-000000000001';
const message={id:'fixture-message',body:'Fixture',senderIdentityId:'fixture-sender',createdAt:'2024-02-29T23:30:00-03:00'};
const response=data=>({ok:true,status:200,json:async()=>data});
for(const createdAt of ['2026-02-30T12:00:00Z','2025-02-29T12:00:00-03:00','2026-04-31T12:00:00+02:00']){
 test('conversation read rejects impossible '+createdAt,async()=>{assert.deepEqual(await loadMessages(async()=>response([{...message,createdAt}]),assignment),{status:'error'});});
 test('conversation ACK remains unknown for '+createdAt,async()=>{let calls=0;const result=await sendMessage(async(path,body)=>{calls++;assert.equal(path,'/conversations/'+assignment+'/messages');assert.deepEqual(body,{body:message.body});return response({...message,createdAt});},assignment,message.body);assert.equal(calls,1);assert.deepEqual(result,{status:'unknown'});});
}
test('legitimate leap/offset response and ACK remain exact',async()=>{assert.deepEqual(await loadMessages(async()=>response([message]),assignment),{status:'ready',data:[message]});assert.deepEqual(await sendMessage(async()=>response(message),assignment,message.body),{status:'sent',id:message.id});});
test('invalid conversation ID never dispatches transport',async()=>{let calls=0;const request=async()=>{calls++;return response(message);};assert.deepEqual(await loadMessages(request,'not-uuid'),{status:'error'});assert.deepEqual(await sendMessage(request,'not-uuid',message.body),{status:'rejected'});assert.equal(calls,0);});
