import test from 'node:test';
import assert from 'node:assert/strict';
import {loadSafety,sameSafetyContext,changeCase,changeAppeal} from '../lib/company-safety.ts';
const response=(data,ok=true,status=ok?200:500)=>({ok,status,json:async()=>data});
const report={id:'c',category:'unsafe_work',description:'Relato real',status:'open',createdAt:'2026-10-09T15:00:00Z'};
const appeal={id:'a',safetyCaseId:'c',appellantIdentityId:'p',reason:'Pedido real',status:'submitted',createdAt:'2026-10-09T16:00:00Z'};
test('safety empty is verified per section; forbidden and network failure never imply no reports or reviews',async()=>{
 const empty=await loadSafety(async()=>response([]));assert.deepEqual(empty.cases,{status:'ready',data:[]});assert.deepEqual(empty.appeals,{status:'ready',data:[]});
 assert.deepEqual((await loadSafety(async()=>response([],false,403))).cases,{status:'error',forbidden:true});
 assert.equal((await loadSafety(async()=>{throw Error('offline')})).appeals.status,'error');
});
test('appeal read failure preserves actual reports; retry recovers both real sections',async()=>{
 const partial=await loadSafety(async p=>p==='/company/safety-cases'?response([report]):response({},false));assert.deepEqual(partial.cases.data,[report]);assert.equal(partial.appeals.status,'error');
 const retry=await loadSafety(async p=>response(p==='/company/safety-cases'?[report]:[appeal]));assert.deepEqual(retry.appeals.data,[appeal]);assert.equal(retry.cases.status,'ready');
});
test('invalid safety payload, statuses and dates are errors rather than invented empty or renderable unsafe labels',async()=>{
 for(const d of [{...report,category:'__proto__'},{...report,status:'unknown'},{...report,createdAt:'invalid'}])assert.equal((await loadSafety(async()=>response([d]))).cases.status,'error');
 assert.equal((await loadSafety(async()=>response([{...appeal,status:'unknown'}]))).appeals.status,'error');
});
test('safety actions require the company and identity that originated displayed sensitive records',()=>{
 const h={'x-tenant-id':'t',Authorization:'Bearer a'};assert.equal(sameSafetyContext({...h},h),true);assert.equal(sameSafetyContext({...h,'x-tenant-id':'other'},h),false);assert.equal(sameSafetyContext({...h,Authorization:'Bearer b'},h),false);assert.equal(sameSafetyContext({},{}),false);
});
test('report update uses existing manual status payload and only acknowledges the requested report/status',async()=>{
 const calls=[];assert.equal(await changeCase(async(p,b)=>{calls.push([p,b]);return response({id:'c',status:'reviewing',changed:true})},'c','reviewing'),true);assert.deepEqual(calls,[['/company/safety-cases/c/status',{status:'reviewing'}]]);
 assert.equal(await changeCase(async()=>response({id:'other',status:'resolved'}),'c','resolved'),false);assert.equal(await changeCase(async()=>{throw Error('timeout')},'c','resolved'),false);
});
test('appeal update preserves the existing human-review note/ack and does not infer a decision from failed HTTP',async()=>{
 const calls=[];assert.equal(await changeAppeal(async(p,b)=>{calls.push([p,b]);return response({id:'a',status:'modified',changed:true})},'a','modified'),true);assert.deepEqual(calls,[['/company/safety-appeals/a/status',{status:'modified',note:'Decisão modificada após revisão humana.'}]]);
 assert.equal(await changeAppeal(async()=>response({id:'a',status:'reviewing'}),'a','reversed'),false);assert.equal(await changeAppeal(async()=>response({},false),'a','upheld'),false);
});
