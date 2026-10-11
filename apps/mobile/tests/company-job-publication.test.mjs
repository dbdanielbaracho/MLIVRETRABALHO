import test from 'node:test';
import assert from 'node:assert/strict';
import {publishJob} from '../lib/company-job-publication.ts';
const body={title:' Garçom ',location:'Restaurante',workCity:' São Paulo ',startsAt:'2026-10-10T22:00:00.000Z',endsAt:'2026-10-11T06:00:00.000Z',payCents:18000};
const ack={location:'Restaurante',id:'aaaaaaaa-1111-4222-8333-444444444444',title:'Garçom',workCity:'São Paulo',status:'open',startsAt:'2026-10-10T19:00:00-03:00',endsAt:'2026-10-11T03:00:00-03:00',payCents:18000};
const response=(data,ok=true,status=ok?201:500)=>({ok,status,json:async()=>data});
test('publication preserves the existing request and recognizes the actual created job across timestamp formats',async()=>{
 const calls=[];assert.deepEqual(await publishJob(async payload=>{calls.push(payload);return response(ack)},body),{status:'created',id:'aaaaaaaa-1111-4222-8333-444444444444'});assert.deepEqual(calls,[body]);
});
test('successful HTTP without the correct job facts cannot clear the publication form',async()=>{
 for(const delta of [{id:null},{id:''},{title:'Outro'},{workCity:'Outra'},{status:'cancelled'},{payCents:0},{startsAt:'invalid'},{endsAt:body.startsAt}]){
  assert.deepEqual(await publishJob(async()=>response({...ack,...delta}),body),{status:'unknown'});
 }
 assert.deepEqual(await publishJob(async()=>response([]),body),{status:'unknown'});
});
test('explicit client rejection differs from server failure and malformed acknowledgement',async()=>{
 assert.deepEqual(await publishJob(async()=>response({},false,403),body),{status:'rejected'});
 assert.deepEqual(await publishJob(async()=>response({},false,500),body),{status:'unknown'});
 assert.deepEqual(await publishJob(async()=>({ok:true,status:201,json:async()=>{throw Error('truncated')}}),body),{status:'unknown'});
});
test('timeout or lost response stays unknown and never automatically repeats the non-idempotent publication',async()=>{
 let calls=0;assert.deepEqual(await publishJob(async()=>{calls++;throw new DOMException('timeout','AbortError')},body),{status:'unknown'});assert.equal(calls,1);
});

test('publication confirms normalized actual location including an omitted empty location as backend null',async()=>{
 assert.equal((await publishJob(async()=>response({...ack,location:'Restaurante'}),{...body,location:' Restaurante '})).status,'created');
 assert.equal((await publishJob(async()=>response({...ack,location:null}),{...body,location:' '})).status,'created');
});
test('wrong or missing location and whitespace job ID never acknowledge a matching created job',async()=>{
 for(const delta of [{location:'Other place'},{location:undefined},{location:null},{id:' '}])assert.equal((await publishJob(async()=>response({...ack,...delta}),body)).status,'unknown');
});


test('successful publication with a malformed job UUID remains unknown and never fabricates a created acknowledgement or retries',async()=>{
 for(const id of ['job-real','invalid','aaaaaaaa-1111-4222-8333-444444444444x',' aaaaaaaa-1111-4222-8333-444444444444 ',null,undefined,false,42,[],{},['aaaaaaaa-1111-4222-8333-444444444444']]){
  let calls=0;assert.deepEqual(await publishJob(async()=>{calls++;return response({...ack,id})},body),{status:'unknown'});assert.equal(calls,1);
 }
 assert.deepEqual(await publishJob(async()=>response({...ack,id:ack.id.toUpperCase()}),body),{status:'created',id:ack.id.toUpperCase()});
});
