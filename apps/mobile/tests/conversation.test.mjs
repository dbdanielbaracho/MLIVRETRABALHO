import test from 'node:test';
import assert from 'node:assert/strict';
import {routeId,messagePath,loadMessages,sameConversationSession,sendMessage} from '../lib/conversation.ts';
const response=(data,ok=true,status=ok?200:500)=>({ok,status,json:async()=>data});
const message={id:'m',body:'Mensagem real',senderIdentityId:'p',createdAt:'2026-10-09T18:00:00Z'};
test('conversation route accepts a single explicit assignment/tenant and rejects ambiguous arrays or missing values',()=>{
 assert.equal(routeId('a'),'a');for(const x of [undefined,'',['a'],['a','other'],{}])assert.equal(routeId(x),'');assert.equal(messagePath('a/x'),'/conversations/a%2Fx/messages');
});
test('conversation reads preserve actual messages and distinguish verified empty from access/network failure',async()=>{
 assert.deepEqual(await loadMessages(async()=>response([message]),'a'),{status:'ready',data:[message]});assert.deepEqual(await loadMessages(async()=>response([]),'a'),{status:'ready',data:[]});
 assert.equal((await loadMessages(async()=>response([],false,403),'a')).forbidden,true);assert.equal((await loadMessages(async()=>response([],false,404),'a')).missing,true);assert.equal((await loadMessages(async()=>{throw Error('offline')},'a')).status,'error');
});
test('malformed message identity/date or truncated payload cannot masquerade as no messages; retry recovers',async()=>{
 for(const data of [{messages:[]},[{...message,senderIdentityId:null}],[{...message,createdAt:'invalid'}]])assert.equal((await loadMessages(async()=>response(data),'a')).status,'error');
 assert.deepEqual((await loadMessages(async()=>response([message]),'a')).data,[message]);
});
test('message send remains bound to the identity which read the explicit conversation',()=>{
 const h={Authorization:'Bearer a'};assert.equal(sameConversationSession({...h},h),true);assert.equal(sameConversationSession({Authorization:'Bearer b'},h),false);assert.equal(sameConversationSession({},{}),false);
});
test('send clears a draft only for a matching real message acknowledgement and preserves the existing payload',async()=>{
 const calls=[];assert.deepEqual(await sendMessage(async(...args)=>{calls.push(args);return response({id:'m',body:message.body,createdAt:message.createdAt})},'a',message.body),{status:'sent',id:'m'});assert.deepEqual(calls,[['/conversations/a/messages',{body:message.body}]]);
 assert.deepEqual(await sendMessage(async()=>response({...message,body:'Other'}),'a',message.body),{status:'unknown'});assert.deepEqual(await sendMessage(async()=>response({},false,403),'a',message.body),{status:'rejected'});
});
test('lost message response stays unknown and never automatically duplicates a message or notification',async()=>{
 let calls=0;assert.deepEqual(await sendMessage(async()=>{calls++;throw Error('timeout')},'a',message.body),{status:'unknown'});assert.equal(calls,1);
});
