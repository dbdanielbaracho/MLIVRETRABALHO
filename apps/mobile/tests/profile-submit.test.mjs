import test from 'node:test';import assert from 'node:assert/strict';
import {submitProfile} from '../lib/profile-submit.ts';
const input={displayName:' Ana ',homeCity:' São Paulo ',primaryRole:' Bartender '},data={id:'profile',displayName:'Ana',homeCity:'São Paulo',primaryRole:'Bartender'};
const response=(data,ok=true,status=ok?200:500)=>({ok,status,json:async()=>data});
test('profile save submits the existing trimmed contract and only acknowledges the actual fields',async()=>{const calls=[];assert.deepEqual(await submitProfile(async(...args)=>{calls.push(args);return response(data)},input,'profile'),{status:'saved',data});assert.deepEqual(calls,[['/professional-profile',{displayName:'Ana',homeCity:'São Paulo',primaryRole:'Bartender'}]]);});
test('profile creation accepts a real new ID and preserves backend nulls for optional empty fields',async()=>{const profile={id:'new',displayName:'Ana',homeCity:null,primaryRole:null};assert.deepEqual(await submitProfile(async()=>response(profile),{displayName:'Ana',homeCity:' ',primaryRole:''}),{status:'saved',data:profile});});
test('wrong identity profile ID or name/city/role cannot clear the draft despite HTTP success',async()=>{for(const patch of [{id:'other'},{id:''},{displayName:'Other'},{homeCity:null},{primaryRole:'Different'}])assert.deepEqual(await submitProfile(async()=>response({...data,...patch}),input,'profile'),{status:'unknown'});});
test('empty profile name prevents any PUT before the backend request',async()=>{let calls=0;assert.deepEqual(await submitProfile(async()=>{calls++;return response(data)},{...input,displayName:' '},'profile'),{status:'invalid'});assert.equal(calls,0);});
test('rejected profile input is distinct from uncertain server result without fabricated success',async()=>{assert.deepEqual(await submitProfile(async()=>response({},false,401),input,'profile'),{status:'rejected'});assert.deepEqual(await submitProfile(async()=>response({},false,500),input,'profile'),{status:'unknown'});});
test('profile timeout or invalid JSON never retries or reports saved',async()=>{let calls=0;assert.deepEqual(await submitProfile(async()=>{calls++;throw Error('timeout')},input,'profile'),{status:'unknown'});assert.equal(calls,1);assert.deepEqual(await submitProfile(async()=>({ok:true,status:200,json:async()=>{throw Error('JSON')}}),input,'profile'),{status:'unknown'});});

test('expired profile operation never starts a PUT',async()=>{
 let calls=0;assert.deepEqual(await submitProfile(async()=>{calls++;return response(data)},input,'profile',()=>false),{status:'unknown'});assert.equal(calls,0);
});
test('late profile HTTP success after deadline is unknown and its body is not consumed',async()=>{
 const controller=new AbortController();let calls=0,reads=0;
 const result=await submitProfile(async()=>{calls++;controller.abort();return {ok:true,status:200,json:async()=>{reads++;return data}}},input,'profile',()=>!controller.signal.aborted);
 assert.deepEqual(result,{status:'unknown'});assert.equal(calls,1);assert.equal(reads,0);
});
test('profile JSON completing after deadline cannot acknowledge save or trigger retry',async()=>{
 const controller=new AbortController();let resolve,calls=0;const pending=new Promise(r=>{resolve=r});
 const result=submitProfile(async()=>{calls++;return {ok:true,status:200,json:()=>pending}},input,'profile',()=>!controller.signal.aborted);
 await Promise.resolve();controller.abort();resolve(data);assert.deepEqual(await result,{status:'unknown'});assert.equal(calls,1);
});
