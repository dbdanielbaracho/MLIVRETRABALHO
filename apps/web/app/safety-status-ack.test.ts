import test from 'node:test';
import assert from 'node:assert/strict';
import {confirmSafetyStatus} from './safety-status-ack.ts';
const ID='abcdef12-2222-4333-8444-555555555555',OTHER='abcdef12-2222-4333-8444-666666666666';
test('Web safety status confirms exact id and status including the canonical unchanged ACK without changing the payload',async()=>{
 for(const changed of [false,true]){
  const body={status:'reviewing',note:' note '};let calls=0;
  const r=await confirmSafetyStatus(async sent=>{calls++;assert.equal(sent,body);return {ok:true,status:201,json:async()=>({id:ID,status:'reviewing',changed})}},ID,body);
  assert.deepEqual(r,{status:'confirmed',changed});assert.equal(calls,1);assert.deepEqual(body,{status:'reviewing',note:' note '});
 }
});
test('Web safety status does not confirm malformed or mismatched ACKs and never repeats the POST',async()=>{
 for(const ack of [null,[],{}, {id:'fake',status:'reviewing',changed:true},{id:OTHER,status:'reviewing',changed:true},{id:ID,status:'resolved',changed:true},{id:ID,status:'reviewing'},{id:ID,status:'reviewing',changed:1}]){
  let calls=0;const r=await confirmSafetyStatus(async()=>{calls++;return {ok:true,status:201,json:async()=>ack}},ID,{status:'reviewing'});
  assert.deepEqual(r,{status:'unknown'});assert.equal(calls,1);
 }
 let calls=0;const r=await confirmSafetyStatus(async()=>{calls++;return {ok:true,status:201,json:async()=>({id:'bad',status:'reviewing',changed:true})}},'bad',{status:'reviewing'});
 assert.deepEqual(r,{status:'unknown'});assert.equal(calls,1);
});
test('Web safety status preserves HTTP errors and treats lost transport or JSON as unknown without retry',async()=>{
 for(const status of [400,401,403,404,409,429,500]){
  let calls=0;const r=await confirmSafetyStatus(async()=>{calls++;return {ok:false,status,json:async()=>{throw Error('must not read')}}},ID,{status:'reviewing'});
  assert.deepEqual(r,{status:status<500?'rejected':'unknown',httpStatus:status});assert.equal(calls,1);
 }
 for(const json of [false,true]){
  let calls=0;const r=await confirmSafetyStatus(async()=>{calls++;if(!json)throw Error('lost');return {ok:true,status:201,json:async()=>{throw Error('lost')}}},ID,{status:'reviewing'});
  assert.deepEqual(r,{status:'unknown'});assert.equal(calls,1);
 }
});
