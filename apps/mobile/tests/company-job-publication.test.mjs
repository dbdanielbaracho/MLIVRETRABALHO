import test from 'node:test';
import assert from 'node:assert/strict';
import {publishJob} from '../lib/company-job-publication.ts';
const body={title:' Garçom ',location:'Restaurante',workCity:' São Paulo ',startsAt:'2026-10-10T22:00:00.000Z',endsAt:'2026-10-11T06:00:00.000Z',payCents:18000};
const ack={id:'job-real',title:'Garçom',workCity:'São Paulo',status:'open',startsAt:'2026-10-10T19:00:00-03:00',endsAt:'2026-10-11T03:00:00-03:00',payCents:18000};
const response=(data,ok=true,status=ok?201:500)=>({ok,status,json:async()=>data});
test('publication preserves the existing request and recognizes the actual created job across timestamp formats',async()=>{
 const calls=[];assert.deepEqual(await publishJob(async payload=>{calls.push(payload);return response(ack)},body),{status:'created',id:'job-real'});assert.deepEqual(calls,[body]);
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
