import test from 'node:test';
import assert from 'node:assert/strict';
import {createSupportIntentStore,pendingSupportIntent,supportAcknowledgement} from '../lib/support-intent.ts';
const identity='00000000-0000-4000-8000-000000000001',tenant='00000000-0000-4000-8000-000000000002',request='00000000-0000-4000-8000-000000000003',id='00000000-0000-4000-8000-000000000004';
const payload={assignmentId:'00000000-0000-4000-8000-000000000005',category:'schedule',priority:'normal',description:'Fixture'};
const acknowledgement=createdAt=>({id,category:payload.category,priority:payload.priority,status:'open',createdAt});
function fixture(){let raw=null,removed=0;const store=createSupportIntentStore({read:async()=>raw,write:async(_,v)=>{raw=v;},remove:async()=>{removed++;raw=null;}});return {store,raw:()=>raw,removed:()=>removed};}
for(const createdAt of ['2026-02-30T12:00:00Z','2025-02-29T12:00:00-03:00','2026-04-31T12:00:00+02:00'])test('bad ACK keeps exact pending durable intent '+createdAt,async()=>{
 const f=fixture(),pending=pendingSupportIntent(identity,tenant,request,payload);assert.equal((await f.store.stage(pending)).status,'saved');const before=f.raw();assert.equal(supportAcknowledgement(acknowledgement(createdAt),payload),null);assert.deepEqual(await f.store.confirm(identity,request,acknowledgement(createdAt)),{status:'failed'});assert.equal(f.raw(),before);assert.deepEqual(await f.store.releaseConfirmed(identity,request),{status:'failed'});assert.equal(f.removed(),0);assert.equal((await f.store.load(identity)).record.phase,'pending');
});
test('valid leapday and offset keep confirmation/release contract',async()=>{for(const createdAt of ['2024-02-29T23:30:00-03:00','1970-01-01T00:00:00Z']){const f=fixture();await f.store.stage(pendingSupportIntent(identity,tenant,request,payload));assert.equal((await f.store.confirm(identity,request,acknowledgement(createdAt))).record.acknowledgement.createdAt,createdAt);assert.deepEqual(await f.store.releaseConfirmed(identity,request),{status:'empty'});assert.equal(f.removed(),1);}});

test('stored confirmed intent with impossible date fails closed without removal or replacement',async()=>{
 const pending=pendingSupportIntent(identity,tenant,request,payload);
 let raw=JSON.stringify({...pending,phase:'confirmed',acknowledgement:acknowledgement('2026-02-30T12:00:00Z')}),writes=0,removes=0;
 const original=raw,store=createSupportIntentStore({read:async()=>raw,write:async(_,v)=>{writes++;raw=v;},remove:async()=>{removes++;raw=null;}});
 assert.deepEqual(await store.load(identity),{status:'failed'});assert.deepEqual(await store.stage(pending),{status:'failed'});assert.deepEqual(await store.releaseConfirmed(identity,request),{status:'failed'});
 assert.equal(raw,original);assert.equal(writes,0);assert.equal(removes,0);
});
