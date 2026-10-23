import {test} from 'node:test';
import assert from 'node:assert/strict';
import {ForbiddenException, UnauthorizedException, BadRequestException} from '@nestjs/common';
import {PaymentEventsController} from './payment-events.controller';
import type {DatabaseService} from './database.service';
import type {AuthService} from './auth.service';

const base={assignmentId:'11111111-1111-4111-8111-111111111111',title:'Fixture',professionalName:'Fixture Professional',payableCents:25000,earningStatus:'payable',capturedCents:'0',refundedCents:'0',paidOutCents:'0',reconciliationStatus:'pending'};
const position=(netCapturedCents:number,professionalPayableCents:number,platformRemainderCents:number,cashBalanceCents:number)=>({simulatedSplit:{netCapturedCents,professionalPayableCents,platformRemainderCents},cashBalanceCents});
function setup(rows:Record<string,unknown>[]=[base],role='owner',failure?:Error){
 const contexts:string[]=[],queries:{sql:string;params:unknown[]}[]=[];
 const auth={identityFromAuthorization:async(a?:string)=>{if(!a)throw new UnauthorizedException();return{id:'trusted-identity'};},requireMembership:async()=>({role})};
 const db={tenant:async(tenant:string,op:(db:unknown)=>Promise<unknown>)=>{contexts.push(tenant);if(failure)throw failure;return op({query:async(sql:string,params:unknown[]=[])=>{queries.push({sql,params});return{rows};}});}};
 return {controller:new PaymentEventsController(db as unknown as DatabaseService,auth as unknown as AuthService),contexts,queries};
}
test('reconciliation converts exact PostgreSQL aggregate text to JSON numbers including zero',async()=>{
 const h=setup();assert.deepEqual(await h.controller.reconciliation('Bearer fixture','trusted-tenant'),[{...base,capturedCents:0,refundedCents:0,paidOutCents:0,...position(0,25000,-25000,0)}]);
 assert.deepEqual(h.contexts,['trusted-tenant']);assert.deepEqual(h.queries[0]?.params,['trusted-tenant']);
});
test('reconciliation keeps totals beyond int32 exact while preserving financial facts and classification',async()=>{
 const row={...base,capturedCents:'4294992294',refundedCents:'4294967294',paidOutCents:'4294992294',reconciliationStatus:'overpaid'};
 const h=setup([row]);assert.deepEqual(await h.controller.reconciliation('Bearer fixture','trusted-tenant'),[{...row,capturedCents:4294992294,refundedCents:4294967294,paidOutCents:4294992294,...position(25000,25000,0,-4294967294)}]);
});
test('reconciliation preserves the maximum exact JSON integer without rounding',async()=>{
 const row={...base,capturedCents:String(Number.MAX_SAFE_INTEGER),refundedCents:'0',paidOutCents:'25000',reconciliationStatus:'reconciled'};
 const h=setup([row]);const [out]=await h.controller.reconciliation('Bearer fixture','trusted-tenant');assert.equal(out.capturedCents,Number.MAX_SAFE_INTEGER);assert.equal(out.paidOutCents,25000);
});
test('reconciliation rejects out-of-range totals instead of silently rounding cents',async()=>{
 for(const field of ['capturedCents','refundedCents','paidOutCents'])for(const value of ['9007199254740992','9007199254740993','9223372036854775807']){
  const h=setup([{...base,[field]:value}]);await assert.rejects(h.controller.reconciliation('Bearer fixture','trusted-tenant'),/reconciliation_total_out_of_range/);
 }
});
test('reconciliation rejects malformed aggregate facts rather than coercing them to zero',async()=>{
 for(const value of [null,undefined,'',' ',false,{},[],NaN,Infinity,-1,'-1','1.5','1e3','not-a-number']){
  const h=setup([{...base,capturedCents:value}]);await assert.rejects(h.controller.reconciliation('Bearer fixture','trusted-tenant'),/reconciliation_total_out_of_range/);
 }
});
test('reconciliation preserves empty result and independent assignment rows',async()=>{
 assert.deepEqual(await setup([]).controller.reconciliation('Bearer fixture','trusted-tenant'),[]);
 const rows=[base,{...base,assignmentId:'22222222-2222-4222-8222-222222222222',capturedCents:'17'}];
 const result=await setup(rows).controller.reconciliation('Bearer fixture','trusted-tenant');assert.equal(result.length,2);assert.equal(result[0].capturedCents,0);assert.equal(result[1].capturedCents,17);
});
test('reconciliation preserves owner/admin access and denies other roles before tenant SQL',async()=>{
 for(const role of ['owner','admin'])assert.equal((await setup([],role).controller.reconciliation('Bearer fixture','trusted-tenant')).length,0);
 for(const role of ['manager','company','professional','member']){const h=setup([],role);await assert.rejects(h.controller.reconciliation('Bearer fixture','trusted-tenant'),e=>e instanceof ForbiddenException);assert.equal(h.contexts.length,0);}
 const h=setup();await assert.rejects(h.controller.reconciliation(undefined,'trusted-tenant'),e=>e instanceof UnauthorizedException);await assert.rejects(h.controller.reconciliation('Bearer fixture'),e=>e instanceof BadRequestException&&e.message==='tenant_required');assert.equal(h.contexts.length,0);
});
test('reconciliation database failure propagates instead of inventing an empty financial state',async()=>{
 const failure=new Error('fixture database failure'),h=setup([],'owner',failure);await assert.rejects(h.controller.reconciliation('Bearer fixture','trusted-tenant'),e=>e===failure);
});

test('reconciliation exposes a theoretical split without inventing a fee or transfer',async()=>{
 const row={...base,capturedCents:'30000',refundedCents:'0',paidOutCents:'25000',reconciliationStatus:'reconciled'};
 const [out]=await setup([row]).controller.reconciliation('Bearer fixture','trusted-tenant');
 assert.deepEqual(out.simulatedSplit,{netCapturedCents:30000,professionalPayableCents:25000,platformRemainderCents:5000});
 assert.equal(out.cashBalanceCents,5000);
});
test('reconciliation preserves a negative simulated balance after refunds exceed capture',async()=>{
 const row={...base,capturedCents:'30000',refundedCents:'40000',paidOutCents:'25000',reconciliationStatus:'reconciled'};
 const [out]=await setup([row]).controller.reconciliation('Bearer fixture','trusted-tenant');
 assert.deepEqual(out.simulatedSplit,{netCapturedCents:-10000,professionalPayableCents:25000,platformRemainderCents:-35000});
 assert.equal(out.cashBalanceCents,-35000);
});
test('reconciliation rejects derived split overflow instead of rounding a negative balance',async()=>{
 const row={...base,payableCents:2147483647,capturedCents:'0',refundedCents:String(Number.MAX_SAFE_INTEGER),paidOutCents:'0'};
 await assert.rejects(setup([row]).controller.reconciliation('Bearer fixture','trusted-tenant'),/reconciliation_total_out_of_range/);
});
