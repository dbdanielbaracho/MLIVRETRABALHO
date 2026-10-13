// CI-only isolated local HTTP/Postgres conversation creation race.
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
const {CONVERSATION_COMPANY_TOKEN:company,CONVERSATION_PRO_TOKEN:professional,CONVERSATION_TENANT:tenant,CONVERSATION_PROFESSIONAL_ID:professionalId}=process.env;
assert.ok(company&&professional&&tenant&&professionalId,'existing isolated journey actors required');
const client=new Client({connectionString:database.toString()});
async function request(url,token,scope,body){
 const response=await fetch(new URL(url,base),{method:'POST',headers:{authorization:'Bearer '+token,'content-type':'application/json',...(scope?{'x-tenant-id':scope}:{})},body:JSON.stringify(body),signal:AbortSignal.timeout(15000)});
 return{status:response.status,body:await response.json()};
}
(async()=>{
 await client.connect();
 try{
  const stamp=Date.now(),start=new Date(Date.now()+12*86400000),end=new Date(start.getTime()+2*3600000);
  const job=await request('/v1/company/jobs',company,tenant,{title:'Conversation race '+stamp,requiredRole:'Bartender',workCity:'São Paulo',location:'CI fixture',startsAt:start.toISOString(),endsAt:end.toISOString(),payCents:77});
  assert.equal(job.status,201);assert.ok(job.body.id);
  const interest=await request('/v1/jobs/'+job.body.id+'/interest',professional,undefined,{});
  assert.equal(interest.status,201);assert.equal(interest.body.status,'interested');
  const assignment=await request('/v1/company/jobs/'+job.body.id+'/confirm',company,tenant,{professionalId});
  assert.equal(assignment.status,201);assert.ok(assignment.body.id);
  const assignmentId=assignment.body.id;
  const before=await client.query("SELECT count(*)::int AS n FROM notifications WHERE tenant_id=$1 AND type='new_message'",[tenant]);
  const send=body=>request('/v1/conversations/'+assignmentId+'/messages',company,tenant,{body});
  let settled;
  await client.query('BEGIN');
  try{
   await client.query("SET LOCAL statement_timeout='10s'");
   await client.query('LOCK TABLE conversations IN SHARE MODE');
   settled=Promise.allSettled([send('Primeira mensagem simultânea'),send('Segunda mensagem simultânea')]);
   const deadline=Date.now()+5000;let blocked=0;
   do{
    await client.query('SELECT pg_stat_clear_snapshot()');
    const result=await client.query("SELECT count(*)::int AS n FROM pg_stat_activity WHERE datname=current_database() AND wait_event_type='Lock' AND query LIKE 'INSERT INTO conversations%'");
    blocked=result.rows[0].n;if(blocked===2)break;await delay(20);
   }while(Date.now()<deadline);
   assert.equal(blocked,2,'both real sends must overlap at conversation creation');
   await client.query('COMMIT');
  }finally{
   await client.query('ROLLBACK');if(settled)await settled;
  }
  const outcomes=await settled;for(const result of outcomes)assert.equal(result.status,'fulfilled');
  const responses=outcomes.map(result=>result.value);
  assert.deepEqual(responses.map(result=>result.status),[201,201]);
  assert.deepEqual(responses.map(result=>result.body.body).sort(),['Primeira mensagem simultânea','Segunda mensagem simultânea']);
  const conversations=await client.query('SELECT id FROM conversations WHERE tenant_id=$1 AND assignment_id=$2',[tenant,assignmentId]);
  assert.equal(conversations.rows.length,1,'one assignment must retain exactly one conversation');
  const messages=await client.query('SELECT conversation_id,body FROM conversation_messages WHERE tenant_id=$1 AND conversation_id=$2 ORDER BY body',[tenant,conversations.rows[0].id]);
  assert.equal(messages.rows.length,2);assert.ok(messages.rows.every(row=>row.conversation_id===conversations.rows[0].id));
  const after=await client.query("SELECT count(*)::int AS n FROM notifications WHERE tenant_id=$1 AND type='new_message'",[tenant]);
  assert.equal(after.rows[0].n,before.rows[0].n+2,'each accepted message retains its factual notification');
  const visible=await fetch(new URL('/v1/conversations/'+assignmentId+'/messages',base),{headers:{authorization:'Bearer '+professional,'x-tenant-id':tenant},signal:AbortSignal.timeout(15000)});
  assert.equal(visible.status,200);const visibleRows=await visible.json();
  assert.equal(visibleRows.filter(row=>row.body.includes('mensagem simultânea')).length,2);
  console.log('PASS: concurrent first messages crossed PostgreSQL barrier, two ACKs, one conversation, two messages and two notifications');
 }finally{await client.end();}
})().catch(error=>{console.error(error);process.exitCode=1;});
