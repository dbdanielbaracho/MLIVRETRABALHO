// CI-only isolated local API/Postgres: concurrent replacement selection.
const assert=require('node:assert/strict');
const {createRequire}=require('node:module');
const path=require('node:path');
const {setTimeout:delay}=require('node:timers/promises');
const {Client}=createRequire(path.resolve(__dirname,'../apps/api/package.json'))('pg');
const dburl=new URL(process.env.DATABASE_URL||'invalid:');
const base=new URL(process.env.BASE_URL||'http://127.0.0.1:3000');
assert.ok(['true','1'].includes(process.env.CI),'CI fixture required');
assert.ok(['localhost','127.0.0.1'].includes(dburl.hostname),'local database required');
assert.ok(['/mlivretrabalho','/mlivretrabalho_http'].includes(dburl.pathname),'known CI database required');
dburl.pathname='/mlivretrabalho_http';
assert.ok(['localhost','127.0.0.1'].includes(base.hostname),'local HTTP required');
const {REPLACE_COMPANY_TOKEN:company,REPLACE_ORIGINAL_TOKEN:originalToken,REPLACE_ORIGINAL_ID:originalId,REPLACE_CANDIDATE_ID:firstId,REPLACE_TENANT:tenant}=process.env;
assert.ok(company&&originalToken&&originalId&&firstId&&tenant,'journey actors required');
const client=new Client({connectionString:dburl.toString()});
async function request(url,token,scope,body){
 const res=await fetch(new URL(url,base),{method:'POST',headers:{'content-type':'application/json',...(token?{authorization:'Bearer '+token}:{}),...(scope?{'x-tenant-id':scope}:{})},body:JSON.stringify(body),signal:AbortSignal.timeout(15000)});
 return{status:res.status,body:await res.json()};
}
async function ok(url,token,scope,body){const r=await request(url,token,scope,body);assert.equal(r.status,201,'fixture API request failed: '+url);return r.body;}
(async()=>{
 await client.connect();try{
  const stamp=Date.now(),password='ReplacementConcurrencyPass123!',email='replacement-race-'+stamp+'@example.test';
  await ok('/v1/auth/signup',undefined,undefined,{email,password,accountType:'professional'});
  const signin=await ok('/v1/auth/signin',undefined,undefined,{email,password}),thirdToken=signin.accessToken;
  // Profile creation uses PUT, matching the original journey.
  const profileResponse=await fetch(new URL('/v1/professional-profile',base),{method:'PUT',headers:{authorization:'Bearer '+thirdToken,'content-type':'application/json'},body:JSON.stringify({displayName:'Isolated third replacement',homeCity:'São Paulo',primaryRole:'Bartender'}),signal:AbortSignal.timeout(15000)});
  assert.equal(profileResponse.status,200);const third=await profileResponse.json(),thirdId=third.id;assert.ok(thirdId);
  const time=h=>new Date(Date.now()+h*3600000).toISOString();
  await ok('/v1/availability/mine',thirdToken,undefined,{startsAt:time(47),endsAt:time(100)});
  const job=async(title,start,end)=>ok('/v1/company/jobs',company,tenant,{title,requiredRole:'Bartender',workCity:'São Paulo',location:'CI fixture',startsAt:time(start),endsAt:time(end),payCents:77});
  const seed=await job('Replacement race membership '+stamp,90,94);
  await ok('/v1/jobs/'+seed.id+'/interest',thirdToken,undefined,{});
  await ok('/v1/company/jobs/'+seed.id+'/confirm',company,tenant,{professionalId:thirdId});
  await ok('/v1/company/talent-pools',company,tenant,{professionalId:thirdId,pool:'preferred'});
  const fresh=await job('Concurrent replacement '+stamp,60,64);
  await ok('/v1/jobs/'+fresh.id+'/interest',originalToken,undefined,{});
  const original=await ok('/v1/company/jobs/'+fresh.id+'/confirm',company,tenant,{professionalId:originalId});
  const rr=await ok('/v1/company/replacements/'+original.id,company,tenant,{reason:'CI concurrent selection'});
  const notices=await client.query("SELECT count(*)::int AS n FROM notifications WHERE tenant_id=$1 AND type='replacement_confirmed'",[tenant]);
  const select=professionalId=>request('/v1/company/replacements/'+rr.id+'/select',company,tenant,{professionalId});
  let settled;await client.query('BEGIN');
  try{
   await client.query("SET LOCAL statement_timeout='10s'");
   await client.query('LOCK TABLE work_assignments IN SHARE MODE');
   settled=Promise.allSettled([select(firstId),select(thirdId)]);
   const deadline=Date.now()+5000;let blocked=0;
   do{
    await client.query('SELECT pg_stat_clear_snapshot()');
    const r=await client.query(`SELECT count(*)::int AS n FROM pg_stat_activity WHERE datname=current_database() AND wait_event_type='Lock'
      AND (query LIKE 'INSERT INTO work_assignments%' OR query LIKE 'SELECT assignment_id%FROM replacement_requests%')`);
    blocked=r.rows[0].n;if(blocked===2)break;await delay(20);
   }while(Date.now()<deadline);
   assert.equal(blocked,2,'both actual selections must overlap at the database barrier');
   await client.query('COMMIT');
  }finally{await client.query('ROLLBACK');if(settled)await settled;}
  const outcomes=await settled;for(const r of outcomes)assert.equal(r.status,'fulfilled');
  const results=outcomes.map(r=>r.value);
  assert.deepEqual(results.map(r=>r.status).sort(),[201,400],'one replacement selection must win; another cannot claim matched');
  const winner=results.find(r=>r.status===201).body,loser=results.find(r=>r.status===400).body;
  assert.equal(loser.message,'replacement_not_open');
  assert.equal(winner.status,'matched');assert.equal(winner.replacementRequestId,rr.id);assert.equal(winner.replacedAssignmentId,original.id);
  assert.ok([firstId,thirdId].includes(winner.professionalId));
  const rows=await client.query('SELECT id,professional_id,status FROM work_assignments WHERE tenant_id=$1 AND job_id=$2',[tenant,fresh.id]);
  assert.equal(rows.rows.length,2,'exactly original plus one substitute');
  const orig=rows.rows.find(r=>r.id===original.id),replacement=rows.rows.find(r=>r.id===winner.assignmentId);
  assert.equal(orig.status,'cancelled');assert.equal(replacement.status,'confirmed');assert.equal(replacement.professional_id,winner.professionalId);
  const record=await client.query('SELECT status,replacement_professional_id FROM replacement_requests WHERE id=$1 AND tenant_id=$2',[rr.id,tenant]);
  assert.deepEqual(record.rows,[{status:'matched',replacement_professional_id:winner.professionalId}]);
  const after=await client.query("SELECT count(*)::int AS n FROM notifications WHERE tenant_id=$1 AND type='replacement_confirmed'",[tenant]);
  assert.equal(after.rows[0].n,notices.rows[0].n+1);
  const beforeRetry=JSON.stringify(rows.rows.sort((a,b)=>a.id.localeCompare(b.id)));
  const retry=await select(winner.professionalId);assert.equal(retry.status,400);assert.equal(retry.body.message,'replacement_not_open');
  const replayRows=await client.query('SELECT id,professional_id,status FROM work_assignments WHERE tenant_id=$1 AND job_id=$2',[tenant,fresh.id]);
  assert.equal(JSON.stringify(replayRows.rows.sort((a,b)=>a.id.localeCompare(b.id))),beforeRetry);
  console.log('PASS: concurrent replacement selection crossed PostgreSQL barrier, one matched ACK, one closed-request rejection, one substitute and notification');
 }finally{await client.end();}
})().catch(error=>{console.error(error);process.exitCode=1;});
