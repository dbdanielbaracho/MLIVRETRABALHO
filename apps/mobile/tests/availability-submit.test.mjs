import test from 'node:test';import assert from 'node:assert/strict';
import {submitAvailability} from '../lib/availability-submit.ts';
const window={startsAt:'2026-10-10T22:00:00.000Z',endsAt:'2026-10-11T06:00:00.000Z'};
const response=(data,ok=true,status=ok?201:500)=>({ok,status,json:async()=>data});
test('availability submission preserves the existing window and needs its real saved ID and instants',async()=>{const calls=[];assert.deepEqual(await submitAvailability(async(...args)=>{calls.push(args);return response({id:'a',...window})},window),{status:'saved',id:'a'});assert.deepEqual(calls,[['/availability/mine',window]]);});
test('equivalent timestamp serialization acknowledges the same actual availability window',async()=>{assert.deepEqual(await submitAvailability(async()=>response({id:'a',startsAt:'2026-10-10T19:00:00-03:00',endsAt:'2026-10-11T03:00:00-03:00'}),window),{status:'saved',id:'a'});});
test('successful HTTP with another window or missing ID does not permit clearing the draft',async()=>{for(const data of [{...window,id:''},{...window,id:'a',endsAt:'2026-10-11T07:00:00Z'},{}])assert.deepEqual(await submitAvailability(async()=>response(data),window),{status:'unknown'});});
test('actual profile-required rejection differs from generic rejection and uncertain server failure',async()=>{assert.deepEqual(await submitAvailability(async()=>response({message:'professional_profile_required'},false,400),window),{status:'rejected',profileRequired:true});assert.deepEqual(await submitAvailability(async()=>response({},false,401),window),{status:'rejected',profileRequired:false});assert.deepEqual(await submitAvailability(async()=>response({},false,500),window),{status:'unknown'});});
test('lost response or malformed JSON stays unknown and is never automatically resent',async()=>{let calls=0;assert.deepEqual(await submitAvailability(async()=>{calls++;throw Error('timeout')},window),{status:'unknown'});assert.equal(calls,1);assert.deepEqual(await submitAvailability(async()=>({ok:true,status:201,json:async()=>{throw Error('JSON')}}),window),{status:'unknown'});});
test('invalid/reversed availability never reaches the endpoint',async()=>{let calls=0;const request=async()=>{calls++;return response({})};for(const value of [{startsAt:'bad',endsAt:window.endsAt},{startsAt:window.endsAt,endsAt:window.startsAt},{startsAt:window.startsAt,endsAt:window.startsAt}])assert.deepEqual(await submitAvailability(request,value),{status:'invalid'});assert.equal(calls,0);});

test('expired availability operation never starts a POST',async()=>{
 let calls=0;assert.deepEqual(await submitAvailability(async()=>{calls++;return response({id:'a',...window})},window,()=>false),{status:'unknown'});assert.equal(calls,0);
});
test('late availability HTTP success is unknown without reading an acknowledgement',async()=>{
 const controller=new AbortController();let calls=0,reads=0;
 assert.deepEqual(await submitAvailability(async()=>{calls++;controller.abort();return {ok:true,status:201,json:async()=>{reads++;return {id:'a',...window}}}},window,()=>!controller.signal.aborted),{status:'unknown'});assert.equal(calls,1);assert.equal(reads,0);
});
test('availability JSON after deadline stays unknown for both saved and profile-required responses',async()=>{
 for(const ok of [true,false]){
  const controller=new AbortController();let resolve,calls=0;const pending=new Promise(r=>{resolve=r});
  const result=submitAvailability(async()=>{calls++;return {ok,status:ok?201:400,json:()=>pending}},window,()=>!controller.signal.aborted);
  await Promise.resolve();controller.abort();resolve(ok?{id:'a',...window}:{message:'professional_profile_required'});
  assert.deepEqual(await result,{status:'unknown'});assert.equal(calls,1);
 }
});
