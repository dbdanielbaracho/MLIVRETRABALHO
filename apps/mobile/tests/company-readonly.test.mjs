import test from 'node:test';
import assert from 'node:assert/strict';
import {loadReconciliation,loadPlanner,moneyOrMissing} from '../lib/company-readonly.ts';
const response=(data,ok=true,status=ok?200:500)=>({ok,status,json:async()=>data});
const financial={assignmentId:'a',title:'Trabalho real',professionalName:'Nome real',payableCents:null,earningStatus:null,capturedCents:0,refundedCents:0,paidOutCents:0,reconciliationStatus:'no_earning'};
const plan={id:'j',title:'Trabalho real',jobStatus:'open',payCents:null,startsAt:null,endsAt:null,interestCount:0,confirmedCount:0,activeCount:0,completedCount:0,cancelledCount:0};
test('read-only reconciliation retains absent ledger entry and measured zero aggregates distinctly',async()=>{
 const paths=[];assert.deepEqual(await loadReconciliation(async p=>{paths.push(p);return response([financial])}),{status:'ready',data:[financial]});assert.deepEqual(paths,['/company/payment-events/reconciliation']);
 assert.equal(moneyOrMissing(null),'Não registrado');assert.equal(moneyOrMissing(undefined),'Não registrado');assert.equal(moneyOrMissing(0),'R$ 0,00');assert.equal(moneyOrMissing(12550),'R$ 125,50');
});
test('reconciliation distinguishes authorized empty from forbidden, network, malformed finance or unknown status',async()=>{
 assert.deepEqual(await loadReconciliation(async()=>response([])),{status:'ready',data:[]});assert.deepEqual(await loadReconciliation(async()=>response({},false,403)),{status:'error',forbidden:true});
 for(const r of [async()=>{throw Error('offline')},async()=>response([{...financial,capturedCents:'0'}]),async()=>response([{...financial,reconciliationStatus:'unknown'}]),async()=>response([{...financial,payableCents:1.1}])])assert.equal((await loadReconciliation(r)).status,'error');
});
test('reconciliation retry recovers recorded amounts without creating payment events',async()=>{
 assert.equal((await loadReconciliation(async()=>response([],false))).status,'error');
 const data={...financial,payableCents:20000,earningStatus:'paid',paidOutCents:20000,reconciliationStatus:'reconciled'};
 assert.deepEqual((await loadReconciliation(async()=>response([data]))).data,[data]);
});
test('planner retains actual absence, dates and counts in server order rather than estimating headcount',async()=>{
 const data=[plan,{...plan,id:'j2',startsAt:'2026-10-10T12:00:00Z',endsAt:'2026-10-10T18:00:00Z',payCents:12000,confirmedCount:2}];
 const paths=[];assert.deepEqual((await loadPlanner(async p=>{paths.push(p);return response(data)})).data,data);assert.deepEqual(paths,['/company/planner']);
});
test('planner failure is not a zero-operation or empty list and invalid counts/dates are rejected',async()=>{
 assert.deepEqual(await loadPlanner(async()=>response([])),{status:'ready',data:[]});
 for(const r of [async()=>{throw Error('timeout')},async()=>response([],false),async()=>response([{...plan,interestCount:-1}]),async()=>response([{...plan,confirmedCount:'2'}]),async()=>response([{...plan,startsAt:'invalid'}])])assert.equal((await loadPlanner(r)).status,'error');
});
test('planner retry restores server facts after JSON failure without confirming any professional',async()=>{
 assert.equal((await loadPlanner(async()=>({ok:true,json:async()=>{throw Error('json')}}))).status,'error');
 assert.deepEqual((await loadPlanner(async()=>response([plan]))).data,[plan]);
});
