import test from 'node:test';
import assert from 'node:assert/strict';
import {loadAgenda,assignmentState} from '../lib/agenda.ts';
const row={id:'work',tenantId:'company',status:'confirmed',title:'Real work',startsAt:null,endsAt:null,location:null,companyRatingScore:null};
test('empty agenda is success only after HTTP/schema succeeds; errors never masquerade as no work',async()=>{
 assert.deepEqual(await loadAgenda(async()=>({ok:true,json:async()=>[]})),{status:'ready',data:[]});
 for(const request of [async()=>({ok:false,json:async()=>[]}),async()=>{throw Error('offline');},async()=>({ok:true,json:async()=>{throw Error('bad JSON');}}),async()=>({ok:true,json:async()=>[null]}),async()=>({ok:true,json:async()=>[{...row,tenantId:null}]}),async()=>({ok:true,json:async()=>[{...row,companyRatingScore:8}]})])assert.deepEqual(await loadAgenda(request),{status:'error'});
});
test('assignment records retain tenant and actual status/rating across companies',async()=>{
 const rows=[row,{...row,tenantId:'other-company',status:'completed',companyRatingScore:4}];
 assert.deepEqual(await loadAgenda(async()=>({ok:true,json:async()=>rows})),{status:'ready',data:rows});
});
test('only the existing backend lifecycle states offer their next action',()=>{
 assert.deepEqual(['confirmed','checked_in','in_progress','checked_out'].map(s=>assignmentState(s).endpoint),['check-in','start','check-out','complete']);
 for(const status of ['completed','cancelled','unexpected'])assert.equal(assignmentState(status).endpoint,null);
});
test('completed, cancelled and unknown work do not appear as confirmed or offer inappropriate ratings',()=>{
 assert.equal(assignmentState('completed').label,'Trabalho concluído');assert.equal(assignmentState('completed').canRate,true);
 assert.equal(assignmentState('cancelled').label,'Trabalho cancelado');assert.equal(assignmentState('cancelled').canRate,false);
 assert.equal(assignmentState('unexpected').canRate,false);
 assert.equal(assignmentState('__proto__').label,'Status não informado');
 for(const status of ['confirmed','checked_in','in_progress','checked_out'])assert.equal(assignmentState(status).canRate,false);
});

test('expired agenda read avoids transport and late decoded assignments cannot become ready',async()=>{
 let calls=0;assert.deepEqual(await loadAgenda(async()=>{calls++;return {ok:true,json:async()=>[row]}},()=>false),{status:'error'});assert.equal(calls,0);
 const controller=new AbortController();let resolve;const pending=new Promise(r=>{resolve=r});
 const result=loadAgenda(async()=>({ok:true,json:()=>pending}),()=>!controller.signal.aborted);
 await Promise.resolve();controller.abort();resolve([row]);assert.deepEqual(await result,{status:'error'});
});

test('agenda rejects missing/blank actual reference, tenant, lifecycle label or title instead of exposing actionable records',async()=>{
 for(const patch of [{id:''},{id:' '},{tenantId:''},{tenantId:' '},{status:''},{title:' '},{id:42},{tenantId:null}]){
  assert.deepEqual(await loadAgenda(async()=>({ok:true,json:async()=>[{...row,...patch}]})),{status:'error'});
 }
});
test('malformed agenda timestamps are an error, while optional absence remains compatible',async()=>{
 for(const key of ['startsAt','endsAt'])for(const value of ['not-a-date',' ','',42,{}]){
  assert.deepEqual(await loadAgenda(async()=>({ok:true,json:async()=>[{...row,[key]:value}]})),{status:'error'});
 }
});
test('agenda preserves real opaque references, future nonempty statuses and valid offset timestamps without normalizing data',async()=>{
 const data=[{...row,id:'opaque:work',tenantId:'other-company',status:'future_status',startsAt:'2026-10-10T19:00:00-03:00',endsAt:'2026-10-11T06:00:00Z'}];
 assert.deepEqual(await loadAgenda(async()=>({ok:true,json:async()=>data})),{status:'ready',data});
 assert.equal(assignmentState(data[0].status).endpoint,null);
});
