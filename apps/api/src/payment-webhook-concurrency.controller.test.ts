
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { PaymentWebhookController } from './payment-webhook.controller';
import type { DatabaseService } from './database.service';

const tenant='11111111-1111-4111-8111-111111111111';
const assignment='22222222-2222-4222-8222-222222222222';
const professional='33333333-3333-4333-8333-333333333333';
const secret='isolated-payment-concurrency-test';
const payload={tenantId:tenant,assignmentId:assignment,eventType:'authorized',amountCents:77,providerReference:'sandbox-reference',idempotencyKey:'sandbox-key'};
const ack={id:'44444444-4444-4444-8444-444444444444',provider:'internal_hmac_v1',assignmentId:assignment,eventType:'authorized',amountCents:77,providerReference:'sandbox-reference',recipientProfessionalId:null,idempotencyKey:'sandbox-key',createdAt:'2026-10-11T21:00:00Z'};
function signed(body:Record<string,unknown>=payload){
 const rawBody=Buffer.from(JSON.stringify(body));const timestamp=String(Math.floor(Date.now()/1000));
 const signature=createHmac('sha256',secret).update(timestamp+'.'+rawBody.toString('utf8')).digest('hex');
 return {request:{rawBody},timestamp,signature:'sha256='+signature};
}
function fixture(replies:Array<Array<Record<string,unknown>>|Error>){
 const calls:Array<{sql:string;values:unknown[]}>=[],tenants:string[]=[];
 const db={tenant:async(t:string,work:(client:unknown)=>Promise<unknown>)=>{
  tenants.push(t);return work({query:async(sql:string,values:unknown[])=>{calls.push({sql,values});const next=replies.shift();if(next instanceof Error)throw next;if(!next)throw Error('unexpected_query');return {rows:next};}});
 }};
 const controller=new PaymentWebhookController(db as unknown as DatabaseService);
 return {calls,tenants,run:async(body:Record<string,unknown>=payload)=>{
  const previous=process.env.PAYMENT_WEBHOOK_SECRET;process.env.PAYMENT_WEBHOOK_SECRET=secret;
  try{const s=signed(body);return await controller.webhook(s.request,s.signature,s.timestamp);}
  finally{if(previous===undefined)delete process.env.PAYMENT_WEBHOOK_SECRET;else process.env.PAYMENT_WEBHOOK_SECRET=previous;}
 }};
}
test('payment webhook new event returns actual scoped insert ACK without extra writes',async()=>{
 const f=fixture([[{professionalId:professional}],[],[ack]]);
 assert.deepEqual(await f.run(),ack);assert.deepEqual(f.tenants,[tenant]);
 assert.deepEqual(f.calls[2]?.values,[tenant,'internal_hmac_v1',assignment,'authorized',77,'sandbox-reference',null,'sandbox-key']);
 assert.equal(f.calls.filter(c=>c.sql.startsWith('INSERT')).length,1);
 assert.equal(f.calls.some(c=>c.sql.startsWith('UPDATE')),false);
});
test('payment webhook existing replay checks exact facts without another insert',async()=>{
 const f=fixture([[{professionalId:professional}],[ack]]);assert.deepEqual(await f.run(),ack);assert.equal(f.calls.length,2);
 for(const changed of [{provider:'other'},{assignmentId:'other'},{eventType:'captured'},{amountCents:78},{providerReference:'other'},{recipientProfessionalId:professional}]){
  const g=fixture([[{professionalId:professional}],[{...ack,...changed}]]);
  await assert.rejects(g.run(),/idempotency_conflict/);assert.equal(g.calls.length,2);
 }
});
test('concurrent payment insert loser returns the committed matching ACK and never fabricates or overwrites',async()=>{
 const f=fixture([[{professionalId:professional}],[],[],[ack]]);
 assert.deepEqual(await f.run(),ack);assert.equal(f.calls.length,4);
 assert.deepEqual(f.calls[3]?.values,['sandbox-key']);
 assert.equal(f.calls.filter(c=>c.sql.startsWith('INSERT')).length,1);
 assert.equal(f.calls.some(c=>c.sql.startsWith('UPDATE')),false);
});
test('concurrent payment insert loser rejects every mismatched winning financial event',async()=>{
 for(const changed of [{provider:'other'},{assignmentId:'other'},{eventType:'captured'},{amountCents:78},{providerReference:'other'},{recipientProfessionalId:professional}]){
  const f=fixture([[{professionalId:professional}],[],[],[{...ack,...changed}]]);
  await assert.rejects(f.run(),/idempotency_conflict/);
  assert.equal(f.calls.length,4);assert.equal(f.calls.filter(c=>c.sql.startsWith('INSERT')).length,1);
  assert.equal(f.calls.some(c=>c.sql.startsWith('UPDATE')),false);
 }
});
test('concurrent payment insert loser with no visible winner fails instead of acknowledging undefined',async()=>{
 const f=fixture([[{professionalId:professional}],[],[],[]]);
 await assert.rejects(f.run(),/payment_event_replay_missing/);assert.equal(f.calls.length,4);
});
test('payment replay lookup failure remains a database error with no compensating write',async()=>{
 const f=fixture([[{professionalId:professional}],[],[],Error('database_offline')]);
 await assert.rejects(f.run(),/database_offline/);assert.equal(f.calls.length,4);
 assert.equal(f.calls.some(c=>c.sql.startsWith('UPDATE')),false);
});
test('payment verification and assignment recipient boundaries precede event writes',async()=>{
 const invalid=fixture([]);await assert.rejects(invalid.run({...payload,amountCents:-1}),/payment_event_invalid/);
 assert.equal(invalid.calls.length,0);assert.equal(invalid.tenants.length,0);
 const missing=fixture([[]]);await assert.rejects(missing.run(),/assignment_not_found/);assert.equal(missing.calls.length,1);
 const wrong=fixture([[{professionalId:professional}]]);
 await assert.rejects(wrong.run({...payload,eventType:'payout_paid',recipientProfessionalId:'55555555-5555-4555-8555-555555555555'}),/payout_recipient_mismatch/);assert.equal(wrong.calls.length,1);
});

test('signed null webhook is an invalid event before any tenant lookup or financial write',async()=>{
 const f=fixture([]);
 await assert.rejects(f.run(null as unknown as Record<string,unknown>),/payment_event_invalid/);
 assert.equal(f.tenants.length,0);assert.equal(f.calls.length,0);
});

test('out of range signed payment amounts reject before tenant access while exact integer endpoints retain actual ACK',async()=>{
 for(const amountCents of [2_147_483_648,Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER+1,1e100,0.5,'77',null]){
  const f=fixture([]);await assert.rejects(f.run({...payload,amountCents}),/payment_event_invalid/);
  assert.equal(f.tenants.length,0);assert.equal(f.calls.length,0);
 }
 for(const amountCents of [0,2_147_483_647]){
  const actual={...ack,amountCents},f=fixture([[{professionalId:professional}],[],[actual]]);
  assert.deepEqual(await f.run({...payload,amountCents}),actual);
  assert.deepEqual(f.tenants,[tenant]);assert.equal(f.calls.length,3);
  assert.equal(f.calls[2]?.values[4],amountCents);
 }
});

test('signed malformed internal payment IDs reject before opening any tenant or querying SQL',async()=>{
 for(const field of ['tenantId','assignmentId','recipientProfessionalId']){
  for(const value of ['not-a-uuid','', ' ', ' '+tenant+' ', tenant.replaceAll('-',''),123,{},[]]){
   const f=fixture([]);await assert.rejects(f.run({...payload,[field]:value}),/payment_event_invalid/);
   assert.equal(f.tenants.length,0);assert.equal(f.calls.length,0);
  }
 }
});
test('valid internal payment UUIDs preserve assignment ownership and exact optional recipient binding',async()=>{
 const actual={...ack,recipientProfessionalId:professional},f=fixture([[{professionalId:professional}],[],[actual]]);
 assert.deepEqual(await f.run({...payload,recipientProfessionalId:professional}),actual);
 assert.deepEqual(f.tenants,[tenant]);assert.deepEqual(f.calls[0]?.values,[assignment]);
 assert.equal(f.calls[2]?.values[6],professional);
 const missing=fixture([[]]);await assert.rejects(missing.run(),/assignment_not_found/);
 assert.deepEqual(missing.tenants,[tenant]);assert.equal(missing.calls.length,1);
 const different=fixture([[{professionalId:professional}]]);
 await assert.rejects(different.run({...payload,recipientProfessionalId:'55555555-5555-4555-8555-555555555555'}),/payout_recipient_mismatch/);
 assert.equal(different.calls.length,1);assert.equal(different.calls.some(x=>x.sql.startsWith('INSERT')),false);
});
