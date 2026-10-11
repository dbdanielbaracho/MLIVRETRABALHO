// CI-only, local Postgres + actual signed HTTP callbacks. Never target production.
const assert = require('node:assert/strict');
const { createHmac } = require('node:crypto');
const { createRequire } = require('node:module');
const path = require('node:path');
const { setTimeout: delay } = require('node:timers/promises');
const requireApi = createRequire(path.resolve(__dirname, '../apps/api/package.json'));
const { Client } = requireApi('pg');
const databaseUrl = new URL(process.env.DATABASE_URL || 'invalid:');
const base = new URL(process.env.BASE_URL || 'http://127.0.0.1:3000');
assert.ok(['true','1'].includes(process.env.CI), 'CI fixture required');
assert.ok(['localhost','127.0.0.1'].includes(databaseUrl.hostname), 'local database required');
assert.ok(['/mlivretrabalho','/mlivretrabalho_http'].includes(databaseUrl.pathname), 'known CI database required');
// The existing workflow creates this dedicated database before running HTTP scenarios.
databaseUrl.pathname='/mlivretrabalho_http';
assert.ok(['localhost','127.0.0.1'].includes(base.hostname), 'local HTTP required');
const [tenantId,assignmentId,stamp] = process.argv.slice(2);
assert.ok(tenantId && assignmentId && stamp && process.env.PAYMENT_WEBHOOK_SECRET, 'fixture inputs required');
const client = new Client({ connectionString: databaseUrl.toString() });

async function callback(payload) {
 const rawBody=JSON.stringify(payload),timestamp=String(Math.floor(Date.now()/1000));
 const signature=createHmac('sha256',process.env.PAYMENT_WEBHOOK_SECRET).update(timestamp+'.'+rawBody).digest('hex');
 const response=await fetch(new URL('/v1/payments/webhook',base),{
  method:'POST',headers:{'content-type':'application/json','x-webhook-timestamp':timestamp,'x-webhook-signature':'sha256='+signature},
  body:rawBody,signal:AbortSignal.timeout(15000),
 });
 const text=await response.text();return {status:response.status,body:text ? JSON.parse(text) : null};
}
async function race(different) {
 const key='finance-race-'+(different?'conflict-':'identical-')+stamp;
 const first={tenantId,assignmentId,eventType:'authorized',amountCents:77,providerReference:key,idempotencyKey:key};
 const second={...first,amountCents:different?78:77};
 await client.query('BEGIN');
 let requests,settled;
 try {
  await client.query("SET LOCAL statement_timeout='10s'");
  // SHARE permits both pre-insert SELECTs but blocks each INSERT's RowExclusiveLock.
  await client.query('LOCK TABLE payment_events IN SHARE MODE');
  requests=[callback(first),callback(second)];
  // Attach rejection handlers immediately; always release the lock in finally.
  settled=Promise.allSettled(requests);
  const deadline=Date.now()+5000;
  let blocked=0;
  do {
   const result=await client.query(`SELECT count(*)::int AS blocked
    FROM pg_locks l JOIN pg_stat_activity a ON a.pid=l.pid
    WHERE l.relation='payment_events'::regclass AND l.mode='RowExclusiveLock'
      AND NOT l.granted AND a.datname=current_database()
      AND a.query LIKE 'INSERT INTO payment_events%'`);
   blocked=result.rows[0].blocked;
   if(blocked===2) break;
   await delay(20);
  } while(Date.now()<deadline);
  assert.equal(blocked,2,'both real callbacks must reach INSERT before releasing fixture barrier');
  await client.query('COMMIT');
 } finally {
  await client.query('ROLLBACK'); // harmless after COMMIT, mandatory if barrier setup/assertion failed
  if(settled) await settled;
 }
 const outcomes=await settled;
 for(const result of outcomes) assert.equal(result.status,'fulfilled','signed HTTP request failed');
 const results=outcomes.map(result=>result.value);
 const successes=results.filter(result=>result.status===201);
 const conflicts=results.filter(result=>result.status===400);
 if(different) {
  assert.equal(successes.length,1,'one actual insert winner required');
  assert.equal(conflicts.length,1,'different same-key loser must be a conflict');
  assert.equal(conflicts[0].body.message,'idempotency_conflict');
 } else {
  assert.equal(successes.length,2,'identical concurrent requests must both return factual receipts');
  assert.deepEqual(successes[0].body,successes[1].body,'concurrent replay must return exact winning receipt');
 }
 const ack=successes[0].body;
 assert.ok(ack && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(ack.id),'real UUID ACK required');
 assert.equal(ack.assignmentId,assignmentId);assert.equal(ack.provider,'internal_hmac_v1');
 assert.equal(ack.eventType,'authorized');assert.equal(ack.providerReference,key);assert.equal(ack.idempotencyKey,key);
 assert.ok([first.amountCents,second.amountCents].includes(ack.amountCents));
 const stored=await client.query('SELECT id,amount_cents FROM payment_events WHERE tenant_id=$1 AND idempotency_key=$2',[tenantId,key]);
 assert.equal(stored.rows.length,1,'concurrency must persist exactly one tenant/key row');
 assert.equal(stored.rows[0].id,ack.id);assert.equal(stored.rows[0].amount_cents,ack.amountCents);
 // Replay remains identical; a sequential incompatible amount must still reject.
 assert.deepEqual(await callback({...first,amountCents:ack.amountCents}),{status:201,body:ack});
 const mismatch=await callback({...first,amountCents:ack.amountCents+1});
 assert.equal(mismatch.status,400);assert.equal(mismatch.body.message,'idempotency_conflict');
 console.log('PASS: payment webhook '+(different?'conflicting':'identical')+' concurrent callbacks crossed PostgreSQL insert barrier, one stored event, exact ACK/conflict');
}
(async()=>{
 await client.connect();
 try{
  const invalid=await callback(null);
  assert.equal(invalid.status,400);assert.equal(invalid.body.message,'payment_event_invalid');
  console.log('PASS: signed null payment JSON returns controlled HTTP400 before financial writes');
  await race(false);await race(true);
 }
 finally{await client.end();}
})().catch(error=>{console.error(error);process.exitCode=1;});
