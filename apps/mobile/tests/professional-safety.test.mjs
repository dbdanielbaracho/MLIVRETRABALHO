import test from 'node:test';
import assert from 'node:assert/strict';
import {loadSafety,safetyKey,canRequestReview,sameSafetySession,submitSafetyCase,submitSafetyAppeal} from '../lib/professional-safety.ts';
const response=(data,ok=true,status=ok?200:500)=>({ok,status,json:async()=>data});
const assignment={id:'a',tenantId:'t',title:'Trabalho real',status:'confirmed'};
const report={id:'c',tenantId:'t',assignmentId:'a',category:'unsafe_work',description:'Relato de teste',status:'resolved',createdAt:'2026-10-09T18:00:00Z',reportedByMe:true};
const appeal={id:'r',tenantId:'t',safetyCaseId:'c',reason:'Pedido de teste',status:'submitted',createdAt:report.createdAt};
test('professional safety reads distinguish verified empty from failures without erasing independent valid records',async()=>{
 const empty=await loadSafety(async()=>response([]));assert.deepEqual(empty.cases,{status:'ready',data:[]});
 const partial=await loadSafety(async path=>path==='/assignments/mine'?response([assignment]):path==='/safety-cases/mine'?response([report]):response({},false));assert.deepEqual(partial.cases.data,[report]);assert.equal(partial.appeals.status,'error');
});
test('malformed tenant, reporter facts or status are errors and retry restores actual related cases',async()=>{
 for(const delta of [{tenantId:''},{reportedByMe:undefined},{category:'fake'},{status:'fake'},{createdAt:'invalid'}])assert.equal((await loadSafety(async()=>response([{...report,...delta}]))).cases.status,'error');
 const actual=await loadSafety(async path=>response(path==='/assignments/mine'?[assignment]:path==='/safety-cases/mine'?[report]:[appeal]));assert.deepEqual(actual.appeals.data,[appeal]);
});
test('existing review display and eligibility use both tenant and case; failed appeal read cannot mean no existing appeal',()=>{
 assert.notEqual(safetyKey('t','c'),safetyKey('other','c'));assert.equal(canRequestReview(report,{status:'error'}),false);assert.equal(canRequestReview(report,{status:'ready',data:[appeal]}),false);assert.equal(canRequestReview(report,{status:'ready',data:[{...appeal,tenantId:'other'}]}),true);
 assert.equal(canRequestReview({...report,status:'open'},{status:'ready',data:[]}),false);assert.equal(canRequestReview({...report,status:'open',reportedByMe:false},{status:'ready',data:[]}),true);
});
test('safety submission retains the identity that read assignments and related cases',()=>{
 const h={Authorization:'Bearer a'};assert.equal(sameSafetySession({...h},h),true);assert.equal(sameSafetySession({Authorization:'Bearer b'},h),false);assert.equal(sameSafetySession({},{}),false);
});
test('case submission uses selected assignment tenant and existing payload; only actual returned fields authorize success',async()=>{
 const calls=[];assert.deepEqual(await submitSafetyCase(async(...args)=>{calls.push(args);return response({id:'c',category:'unsafe_work',status:'open',createdAt:report.createdAt})},assignment,'unsafe_work','Relato de teste'),{status:'created'});assert.deepEqual(calls,[['/safety-cases','t',{assignmentId:'a',category:'unsafe_work',description:'Relato de teste'}]]);
 assert.deepEqual(await submitSafetyCase(async()=>response({id:'c',category:'other',status:'open',createdAt:report.createdAt}),assignment,'unsafe_work','Relato'),{status:'unknown'});
});
test('appeal creation requires the selected tenant/case and newly stored reason; existing idempotent result is distinguished',async()=>{
 const calls=[];assert.deepEqual(await submitSafetyAppeal(async(...args)=>{calls.push(args);return response({...appeal,created:true})},report,appeal.reason),{status:'created'});assert.deepEqual(calls,[['/safety-appeals','t',{safetyCaseId:'c',reason:appeal.reason}]]);
 assert.deepEqual(await submitSafetyAppeal(async()=>response({...appeal,reason:'Motivo anterior',status:'reviewing',created:false}),report,'Outro texto'),{status:'existing'});
 assert.deepEqual(await submitSafetyAppeal(async()=>response({...appeal,safetyCaseId:'other',created:true}),report,appeal.reason),{status:'unknown'});
});
test('HTTP rejection and server failure do not create a safety report or infer a human review decision',async()=>{
 assert.deepEqual(await submitSafetyCase(async()=>response({},false,403),assignment,'unsafe_work','Relato'),{status:'rejected'});
 assert.deepEqual(await submitSafetyAppeal(async()=>response({},false,500),report,'Pedido'),{status:'unknown'});
});
test('lost submission response stays unknown without automatically duplicating sensitive reports or appeals',async()=>{
 let calls=0;const request=async()=>{calls++;throw Error('timeout')};assert.deepEqual(await submitSafetyCase(request,assignment,'unsafe_work','Relato'),{status:'unknown'});assert.deepEqual(await submitSafetyAppeal(request,report,'Pedido'),{status:'unknown'});assert.equal(calls,2);
});
import {runForSession} from '../lib/session-context.ts';
test('professional safety records and ACKs reject whitespace identities without inventing tenant echoes',async()=>{
 assert.equal((await loadSafety(async()=>response([{...report,tenantId:' '}]))).cases.status,'error');
 assert.equal((await loadSafety(async()=>response([{...appeal,safetyCaseId:' '}]))).appeals.status,'error');
 assert.deepEqual(await submitSafetyCase(async()=>response({id:' ',category:'unsafe_work',status:'open',createdAt:report.createdAt}),assignment,'unsafe_work','Relato'),{status:'unknown'});
});
test('missing assignment/case/tenant IDs prevent sensitive submission transport',async()=>{
 let calls=0;const request=async()=>{calls++;return response({})};
 for(const a of [{...assignment,id:''},{...assignment,tenantId:' '}])assert.deepEqual(await submitSafetyCase(request,a,'unsafe_work','Relato'),{status:'rejected'});
 for(const item of [{...report,id:' '},{...report,tenantId:''}])assert.deepEqual(await submitSafetyAppeal(request,item,'Pedido'),{status:'rejected'});assert.equal(calls,0);
});
test('a successful report ACK cannot confirm submission in a new account or repeat POST',async()=>{
 let authorization='Bearer a',calls=0;const result=await runForSession(async()=>({Authorization:authorization}),()=>submitSafetyCase(async(path,tenant)=>{calls++;assert.equal(tenant,'t');authorization='Bearer b';return response({id:'c',category:'unsafe_work',status:'open',createdAt:report.createdAt})},assignment,'unsafe_work','Relato'),()=>true,'Bearer a');assert.equal(result.status,'stale');assert.equal('data' in result,false);assert.equal(calls,1);
});
