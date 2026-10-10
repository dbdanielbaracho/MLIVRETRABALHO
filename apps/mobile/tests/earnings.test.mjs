import test from 'node:test';
import assert from 'node:assert/strict';
import {runForSession} from '../lib/session-context.ts';
import {loadEarnings,earningsWeek,earningStatus} from '../lib/earnings.ts';
import {weeklyEarnings} from '../lib/professional-home.ts';
const now=new Date(2026,9,9,14),row=(id,status,day,amountCents=1000)=>({id,tenantId:'real-tenant',title:'Real job',status,amountCents,createdAt:new Date(2026,9,day,12).toISOString()});
test('earnings empty success is distinct from HTTP/network/schema/date failure',async()=>{
 assert.deepEqual(await loadEarnings(async()=>({ok:true,json:async()=>[]})),{status:'ready',data:[]});
 for(const request of [async()=>({ok:false,json:async()=>[]}),async()=>{throw Error('offline');},async()=>({ok:true,json:async()=>({})}),async()=>({ok:true,json:async()=>[null]}),async()=>({ok:true,json:async()=>[{...row('real','paid',9),amountCents:1.5}]}),async()=>({ok:true,json:async()=>[{...row('real','paid',9),createdAt:'invalid'}]})])assert.deepEqual(await loadEarnings(request),{status:'error'});
});
test('weekly total and daily graph include payable/paid only, in local week through now',()=>{
 const items=[row('mon','payable',5,1200),row('fri','paid',9,2300),row('pending','pending',8,900),row('rev','reversed',8,900),row('unknown','unknown',8,900),row('prev','paid',4,900),row('future','paid',10,900),{...row('later','paid',9,900),createdAt:new Date(2026,9,9,16).toISOString()}];
 const result=earningsWeek(items,now);
 assert.deepEqual(result,{total:3500,daily:[1200,0,0,0,2300,0,0]});
 assert.equal(result.daily.reduce((a,b)=>a+b,0),result.total);
 assert.equal(result.total,weeklyEarnings(items,now));
});
test('ledger states do not pretend every entry is completed or paid',()=>{
 assert.equal(earningStatus('pending'),'Em processamento');assert.equal(earningStatus('payable'),'A receber');assert.equal(earningStatus('paid'),'Pago');assert.equal(earningStatus('reversed'),'Estornado');assert.equal(earningStatus('unknown'),'Status não identificado');
});
test('multiple company earnings retain tenant/item identity and real data',async()=>{
 const rows=[row('same-id','payable',5),{...row('same-id','paid',9),tenantId:'other-tenant'}];
 assert.deepEqual(await loadEarnings(async()=>({ok:true,json:async()=>rows})),{status:'ready',data:rows});
});

test('earnings from a previous identity are withheld instead of displaying its ledger as the current account',async()=>{
 let authorization='Bearer a',calls=0;const result=await runForSession(async()=>({Authorization:authorization}),headers=>loadEarnings(async()=>{calls++;assert.deepEqual(headers,{Authorization:'Bearer a'});authorization='Bearer b';return {ok:true,json:async()=>[row('actual','paid',9)]}}),()=>true);
 assert.equal(result.status,'stale');assert.equal('data' in result,false);assert.equal(calls,1);
 const empty=await runForSession(async()=>({Authorization:'Bearer a'}),()=>loadEarnings(async()=>({ok:true,json:async()=>[]})),()=>true);assert.equal(empty.status,'ready');assert.deepEqual(empty.data,{status:'ready',data:[]});
});
