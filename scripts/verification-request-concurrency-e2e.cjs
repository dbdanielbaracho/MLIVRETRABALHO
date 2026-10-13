// CI-only isolated local HTTP/Postgres verification-request race.
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
const {VERIFICATION_PRO_TOKEN:professional,VERIFICATION_COMPANY_TOKEN:company,VERIFICATION_TENANT:tenant}=process.env;
assert.ok(professional&&company&&tenant,'existing isolated journey actors required');
const client=new Client({connectionString:database.toString()});
async function request(route,token){
 const response=await fetch(new URL(route,base),{method:'POST',headers:{authorization:'Bearer '+token,'x-tenant-id':tenant,'content-type':'application/json'},body:'{}',signal:AbortSignal.timeout(15000)});
 return{status:response.status,body:await response.json()};
}
async function overlap(subject,route,token){
 const before=await client.query('SELECT count(*)::int AS n FROM verification_cases WHERE tenant_id=$1 AND subject_type=$2',[tenant,subject]);
 assert.equal(before.rows[0].n,0,subject+' fixture must begin without a case');
 let settled,released=false;
 await client.query('BEGIN');
 try{
  await client.query("SET LOCAL statement_timeout='10s'");
  await client.query('LOCK TABLE verification_cases IN SHARE MODE');
  settled=Promise.allSettled([request(route,token),request(route,token)]);
  const deadline=Date.now()+5000;
  let blocked=0;
  do{
   await client.query('SELECT pg_stat_clear_snapshot()');
   const result=await client.query("SELECT count(*)::int AS n FROM pg_stat_activity WHERE datname=current_database() AND pid<>pg_backend_pid() AND wait_event_type='Lock' AND query LIKE '%INSERT INTO verification_cases%'");
   blocked=result.rows[0].n;
   if(blocked===2)break;
   await delay(20);
  }while(Date.now()<deadline);
  assert.equal(blocked,2,subject+' requests must overlap at verification insert');
  await client.query('COMMIT');
  released=true;
 }finally{
  if(!released)await client.query('ROLLBACK');
 }
 const outcomes=await settled;
 for(const result of outcomes)assert.equal(result.status,'fulfilled');
 const responses=outcomes.map(result=>result.value);
 assert.deepEqual(responses.map(result=>result.status),[201,201]);
 assert.equal(responses[0].body.id,responses[1].body.id);
 assert.deepEqual(responses.map(result=>result.body.status),['pending','pending']);
 const rows=await client.query('SELECT id,status FROM verification_cases WHERE tenant_id=$1 AND subject_type=$2',[tenant,subject]);
 assert.equal(rows.rows.length,1,subject+' must retain one verification case');
 assert.equal(rows.rows[0].id,responses[0].body.id);
}
(async()=>{
 await client.connect();
 try{
  await overlap('identity','/v1/verification/mine/request',professional);
  await overlap('business','/v1/verification/business/request',company);
  console.log('PASS: concurrent identity and business verification requests crossed PostgreSQL barrier and shared one pending case each');
 }finally{await client.end();}
})().catch(error=>{console.error(error);process.exitCode=1;});
