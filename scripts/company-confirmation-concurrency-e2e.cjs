// CI-only local HTTP/Postgres concurrency fixture. No production data or services.
const assert=require('node:assert/strict');
const {createRequire}=require('node:module');
const path=require('node:path');
const {setTimeout:delay}=require('node:timers/promises');
const {Client}=createRequire(path.resolve(__dirname,'../apps/api/package.json'))('pg');
const database=new URL(process.env.DATABASE_URL||'invalid:');
const base=new URL(process.env.BASE_URL||'http://127.0.0.1:3000');
assert.ok(['true','1'].includes(process.env.CI),'CI required');
assert.ok(['localhost','127.0.0.1'].includes(database.hostname),'local database required');
assert.ok(['/mlivretrabalho','/mlivretrabalho_http'].includes(database.pathname),'known CI database required');
database.pathname='/mlivretrabalho_http';
assert.ok(['localhost','127.0.0.1'].includes(base.hostname),'local HTTP required');
const {CONFIRM_COMPANY_TOKEN:company,CONFIRM_PRO_TOKEN:pro,CONFIRM_OTHER_COMPANY_TOKEN:other,CONFIRM_TENANT:tenant,CONFIRM_PROFESSIONAL:professional}=process.env;
assert.ok(company&&pro&&other&&tenant&&professional,'existing isolated journey identities required');
const client=new Client({connectionString:database.toString()});
async function request(url,token,scope,body){
 const response=await fetch(new URL(url,base),{method:'POST',
  headers:{authorization:'Bearer '+token,'content-type':'application/json',...(scope?{'x-tenant-id':scope}:{})},
  body:JSON.stringify(body),signal:AbortSignal.timeout(15000)});
 return {status:response.status,body:await response.json()};
}
(async()=>{
 await client.connect();
 try{
  const start=new Date(Date.now()+9*86400000),end=new Date(start.getTime()+2*3600000);
  const job=await request('/v1/company/jobs',company,tenant,{title:'Isolated concurrency '+Date.now(),requiredRole:'Bartender',workCity:'São Paulo',location:'CI fixture',startsAt:start.toISOString(),endsAt:end.toISOString(),payCents:77});
  assert.equal(job.status,201);assert.ok(job.body.id);
  const jobId=job.body.id;
  const interest=await request('/v1/jobs/'+jobId+'/interest',pro,undefined,{});
  assert.equal(interest.status,201);assert.equal(interest.body.status,'interested');
  const existing=await client.query('SELECT id FROM work_assignments WHERE job_id=$1 AND professional_id=$2',[jobId,professional]);
  assert.equal(existing.rows.length,0,'fresh job must have no prior assignment');
  const membership=await client.query("SELECT count(*)::int AS n FROM tenant_memberships WHERE tenant_id=$1 AND identity_id=(SELECT identity_id FROM professional_profiles WHERE id=$2)",[tenant,professional]);
  assert.equal(membership.rows[0].n,1,'use membership from the original journey, without seeding or weakening its proof');
  const notificationBefore=await client.query("SELECT count(*)::int AS n FROM notifications WHERE tenant_id=$1 AND identity_id=(SELECT identity_id FROM professional_profiles WHERE id=$2) AND type='assignment_confirmed'",[tenant,professional]);
  const confirm=token=>request('/v1/company/jobs/'+jobId+'/confirm',token,tenant,{professionalId:professional});
  let settled;
  await client.query('BEGIN');
  try{
   await client.query("SET LOCAL statement_timeout='10s'");
   // Hold actual assignment writes until both HTTP requests are blocked inside the database.
   // Both old concurrent INSERTs or one INSERT + a serialized job read satisfy the barrier.
   await client.query('LOCK TABLE work_assignments IN SHARE MODE');
   settled=Promise.allSettled([confirm(company),confirm(company)]);
   const deadline=Date.now()+5000;let blocked=0;
   do{
    const result=await client.query(`SELECT count(*)::int AS n FROM pg_stat_activity
     WHERE datname=current_database() AND wait_event_type='Lock'
     AND (query LIKE 'INSERT INTO work_assignments%' OR query LIKE 'SELECT id,status,title,%FROM company_jobs%')`);
    blocked=result.rows[0].n;if(blocked===2)break;await delay(20);
   }while(Date.now()<deadline);
   assert.equal(blocked,2,'both real confirmations must overlap before releasing the fixture barrier');
   await client.query('COMMIT');
  }finally{
   await client.query('ROLLBACK');if(settled)await settled;
  }
  const outcomes=await settled;for(const r of outcomes)assert.equal(r.status,'fulfilled');
  const results=outcomes.map(r=>r.value);
  assert.deepEqual(results.map(r=>r.status),[201,201],'concurrent identical confirmations must both return factual receipts');
  assert.deepEqual(results[0].body,results[1].body,'same assignment/date/tenant must be acknowledged');
  const ack=results[0].body;
  assert.equal(ack.jobId,jobId);assert.equal(ack.professionalId,professional);assert.equal(ack.tenantId,tenant);assert.equal(ack.status,'confirmed');
  assert.ok(Number.isFinite(Date.parse(ack.confirmedAt)));
  const rows=await client.query('SELECT id,status,confirmed_at FROM work_assignments WHERE tenant_id=$1 AND job_id=$2 AND professional_id=$3',[tenant,jobId,professional]);
  assert.equal(rows.rows.length,1);assert.equal(rows.rows[0].id,ack.id);assert.equal(rows.rows[0].status,'confirmed');
  assert.equal(new Date(rows.rows[0].confirmed_at).toISOString(),ack.confirmedAt);
  const notifications=await client.query("SELECT count(*)::int AS n FROM notifications WHERE tenant_id=$1 AND identity_id=(SELECT identity_id FROM professional_profiles WHERE id=$2) AND type='assignment_confirmed'",[tenant,professional]);
  assert.equal(notifications.rows[0].n,notificationBefore.rows[0].n+1,'exactly one new notification relative to actual existing facts, no concurrent duplicate');
  assert.deepEqual(await confirm(company),results[0],'sequential replay retains the exact stored receipt');
  const foreign=await confirm(other);assert.equal(foreign.status,401,'other company cannot confirm within this tenant');
  const after=await client.query('SELECT count(*)::int AS n FROM work_assignments WHERE job_id=$1 AND professional_id=$2',[jobId,professional]);
  assert.equal(after.rows[0].n,1);
  console.log('PASS: concurrent company confirmations crossed PostgreSQL barrier, two exact ACKs, one assignment, one notification, tenant isolation');
 }finally{await client.end();}
})().catch(error=>{console.error(error);process.exitCode=1;});
