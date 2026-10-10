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
import {runForSession} from '../lib/session-context.ts';
test('sensitive company records require nonblank IDs and an authenticated context',async()=>{
 for(const d of [{...report,id:' '},{...report,assignmentId:''}])assert.equal((await loadSafety(async()=>response([d]))).cases.status,'error');
 for(const d of [{...appeal,id:''},{...appeal,safetyCaseId:' '},{...appeal,appellantIdentityId:''}])assert.equal((await loadSafety(async()=>response([d]))).appeals.status,'error');
 assert.equal(sameSafetyContext({'x-tenant-id':'t'},{'x-tenant-id':'t'}),false);
});
test('missing case/appeal identifiers never call manual decision endpoints',async()=>{
 let calls=0;const request=async()=>{calls++;return response({id:'',status:'reviewing'})};assert.equal(await changeCase(request,'','reviewing'),false);assert.equal(await changeAppeal(request,' ','reviewing'),false);assert.equal(calls,0);
});
test('a verified company status ACK is discarded when the selected company changes',async()=>{
 let tenant='t',calls=0;const result=await runForSession(async()=>({Authorization:'Bearer a','x-tenant-id':tenant}),()=>changeCase(async()=>{calls++;tenant='other';return response({id:'c',status:'reviewing'})},'c','reviewing'),()=>true,'Bearer a','t');assert.equal(result.status,'stale');assert.equal('data' in result,false);assert.equal(calls,1);
});
