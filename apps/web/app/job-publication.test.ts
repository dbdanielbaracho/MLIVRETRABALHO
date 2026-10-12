import test from 'node:test';
import assert from 'node:assert/strict';
import {publishCompanyJob} from './job-publication.ts';
const body={title:' Fixture ',requiredRole:' ',location:' ',workCity:' ',startsAt:'2026-10-20T12:00:00Z',endsAt:'2026-10-20T16:00:00Z',payCents:0};
const ack={id:'abcdef12-2222-4333-8444-555555555555',title:'Fixture',requiredRole:'Fixture',location:null,workCity:null,status:'open',startsAt:body.startsAt,endsAt:body.endsAt,payCents:0,engagementModality:'gig'};
const response=(data:unknown,ok=true,status=ok?201:500)=>({ok,status,json:async()=>data});
test('Web publication accepts the API canonical nullable fields, role fallback, timestamps and UUID without mutating the submitted payload',async()=>{
 for(const id of [ack.id,ack.id.toUpperCase()]){
  const calls:unknown[]=[];const r=await publishCompanyJob(async value=>{calls.push(value);return response({...ack,id})},body);
  assert.deepEqual(r,{status:'created',id});assert.equal(calls.length,1);assert.equal(calls[0],body);
 }
});
test('Web publication rejects fabricated or mismatched ACKs instead of declaring creation',async()=>{
 for(const data of [null,[],{}, {...ack,id:'job'}, {...ack,title:'Other'},{...ack,requiredRole:'Other'},{...ack,workCity:'Other'},{...ack,location:'Other'},{...ack,status:'closed'},{...ack,payCents:1},{...ack,startsAt:body.endsAt},{...ack,endsAt:body.startsAt},{...ack,engagementModality:'other'}]){
  let calls=0;assert.deepEqual(await publishCompanyJob(async()=>{calls++;return response(data)},body),{status:'unknown'});assert.equal(calls,1);
 }
});
test('Web publication preserves explicit HTTP errors and treats lost or unreadable responses as unknown without repeating POST',async()=>{
 for(const [status,state] of [[400,'rejected'],[401,'rejected'],[500,'unknown']] as const){
  let calls=0;assert.deepEqual(await publishCompanyJob(async()=>{calls++;return response({},false,status)},body),{status:state,httpStatus:status});assert.equal(calls,1);
 }
 let calls=0;assert.deepEqual(await publishCompanyJob(async()=>{calls++;throw Error('lost')},body),{status:'unknown'});assert.equal(calls,1);
 assert.deepEqual(await publishCompanyJob(async()=>({ok:true,status:201,json:async()=>{throw Error('JSON')}}),body),{status:'unknown'});
});
