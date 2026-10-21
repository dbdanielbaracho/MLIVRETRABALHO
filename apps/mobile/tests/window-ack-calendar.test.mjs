import test from 'node:test';
import assert from 'node:assert/strict';
import {submitAvailability} from '../lib/availability-submit.ts';
import {publishJob} from '../lib/company-job-publication.ts';
const id='00000000-0000-4000-8000-000000000001';
const response=data=>({ok:true,status:201,json:async()=>data});
const invalid=['2026-02-30T12:00:00Z','2025-02-29T12:00:00-03:00','2026-04-31T12:00:00+02:00'];
function windowFor(invalid,field){
 const normalized=new Date(invalid).toISOString(),millis=new Date(normalized).getTime();
 return field==='startsAt'?{startsAt:normalized,endsAt:new Date(millis+3600000).toISOString()}:{startsAt:new Date(millis-3600000).toISOString(),endsAt:normalized};
}
const job=window=>({...window,title:' Fixture ',workCity:' São Paulo ',location:' ',payCents:12345});
const jobAck=body=>({...body,id,title:body.title.trim(),workCity:body.workCity.trim(),location:null,status:'open'});
for(const bad of invalid)for(const field of ['startsAt','endsAt']){
 test('availability valid request rejects impossible equivalent ACK '+field+' '+bad,async()=>{
  const window=windowFor(bad,field),before=JSON.stringify(window),ack={...window,id,[field]:bad};let calls=0;
  const result=await submitAvailability(async(path,payload)=>{calls++;assert.equal(path,'/availability/mine');assert.deepEqual(payload,window);return response(ack);},window);
  assert.equal(calls,1);assert.equal(JSON.stringify(window),before);assert.deepEqual(result,{status:'unknown'});
 });
 test('publication valid request rejects impossible equivalent ACK '+field+' '+bad,async()=>{
  const body=job(windowFor(bad,field)),before=JSON.stringify(body),ack={...jobAck(body),[field]:bad};let calls=0;
  const result=await publishJob(async payload=>{calls++;assert.deepEqual(payload,body);return response(ack);},body);
  assert.equal(calls,1);assert.equal(JSON.stringify(body),before);assert.deepEqual(result,{status:'unknown'});
 });
}
test('legitimate leapday offsets crossing UTC date and epoch zero remain equivalent ACKs',async()=>{
 for(const [startsAt,endsAt]of [['2024-02-29T23:30:00-03:00','2024-03-01T00:30:00-03:00'],['1970-01-01T00:00:00Z','1970-01-01T01:00:00Z']]){
  const window={startsAt:new Date(startsAt).toISOString(),endsAt:new Date(endsAt).toISOString()},body=job(window);
  assert.deepEqual(await submitAvailability(async()=>response({id,startsAt,endsAt}),window),{status:'saved',id});
  assert.deepEqual(await publishJob(async()=>response({...jobAck(body),startsAt,endsAt}),body),{status:'created',id});
 }
});
test('existing current-context cancellation and rejected HTTP outcomes are not promoted by calendar validation',async()=>{
 const window=windowFor(invalid[0],'startsAt');let calls=0;
 assert.deepEqual(await submitAvailability(async()=>{calls++;return response({id,...window});},window,()=>false),{status:'unknown'});assert.equal(calls,0);
 assert.deepEqual(await publishJob(async()=>({ok:false,status:403,json:async()=>({})}),job(window)),{status:'rejected'});
});
