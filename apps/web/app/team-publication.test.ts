import test from 'node:test';
import assert from 'node:assert/strict';
import {publishCompanyTeam} from './team-publication.ts';
const ID='abcdef12-2222-4333-8444-555555555555';
test('Web team publication validates the trimmed API name and UUID while preserving the submitted payload',async()=>{
 const body={name:' Fixture team '};let calls=0;
 const result=await publishCompanyTeam(async sent=>{calls++;assert.equal(sent,body);return {ok:true,status:201,json:async()=>({id:ID,name:'Fixture team'})}},body);
 assert.deepEqual(result,{status:'created',id:ID});assert.equal(calls,1);assert.deepEqual(body,{name:' Fixture team '});
});
test('Web team publication treats missing, fabricated and mismatched ACKs as unknown without another POST',async()=>{
 for(const ack of [null,[],{}, {id:'fake',name:'Fixture'}, {id:ID,name:'Other'}, {id:ID}, {id:ID+' ',name:'Fixture'}]){
  let calls=0;const result=await publishCompanyTeam(async()=>{calls++;return {ok:true,status:201,json:async()=>ack}},{name:'Fixture'});
  assert.deepEqual(result,{status:'unknown'});assert.equal(calls,1);
 }
});
test('Web team publication preserves HTTP errors and treats transport or JSON loss as unknown without retry',async()=>{
 for(const status of [400,401,403,429,500]){
  let calls=0;const result=await publishCompanyTeam(async()=>{calls++;return {ok:false,status,json:async()=>{throw Error('must not read error body')}}},{name:'Fixture'});
  assert.deepEqual(result,{status:status<500?'rejected':'unknown',httpStatus:status});assert.equal(calls,1);
 }
 for(const json of [false,true]){
  let calls=0;const result=await publishCompanyTeam(async()=>{calls++;if(!json)throw Error('lost');return {ok:true,status:201,json:async()=>{throw Error('lost body')}}},{name:'Fixture'});
  assert.deepEqual(result,{status:'unknown'});assert.equal(calls,1);
 }
});
