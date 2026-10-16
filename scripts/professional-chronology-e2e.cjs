'use strict';
const assert=require('node:assert/strict');
const {createRequire}=require('node:module');
const {resolve}=require('node:path');
const {randomUUID}=require('node:crypto');
function localConfiguration(env){
 assert.ok(['true','1'].includes(env.CI),'CI disposable fixture only');
 const db=new URL(env.DATABASE_URL||''),api=new URL(env.BASE_URL||'');
 assert.ok(['postgres:','postgresql:'].includes(db.protocol)&&['localhost','127.0.0.1'].includes(db.hostname)&&db.port&&db.pathname==='/mlivretrabalho_http'&&!db.search&&!db.hash,'Exact local disposable database required');
 assert.ok(api.protocol==='http:'&&['localhost','127.0.0.1'].includes(api.hostname)&&api.port&&api.pathname==='/'&&!api.username&&!api.password&&!api.search&&!api.hash,'Explicit local API origin required');
 return{databaseUrl:db.href,origin:api.origin};
}
function requireLocalDatabasePeer(server,socketAddress){
 assert.equal(server.name,'mlivretrabalho_http');
 assert.ok(['127.0.0.1','::1','::ffff:127.0.0.1'].includes(socketAddress),'Actual PostgreSQL client socket must terminate at loopback');
}
module.exports={localConfiguration,requireLocalDatabasePeer};
async function main(){
 const config=localConfiguration(process.env);
 const {Client}=createRequire(resolve('apps/api/package.json'))('pg');
 const db=new Client({connectionString:config.databaseUrl});await db.connect();
 try{
  const server=(await db.query('SELECT current_database() name,inet_server_addr()::text address')).rows[0];
  // PostgreSQL's server-side address may be the CI container IP behind the loopback port mapping.
  // Verify the actual client socket endpoint, not an assumed address on the server's interface.
  const socketAddress=db.connection.stream.remoteAddress;
  console.log('PROFESSIONAL_CHRONOLOGY_DB_CONTEXT '+JSON.stringify({database:server.name,serverAddress:server.address,clientSocketAddress:socketAddress}));
  requireLocalDatabasePeer(server,socketAddress);
  const stamp=randomUUID(),password='ChronologyFixture123!';
  async function call(path,{method='GET',token,tenant,body,status=200}={}){
   const r=await fetch(config.origin+path,{method,redirect:'error',signal:AbortSignal.timeout(15000),headers:{...(token?{authorization:'Bearer '+token}:{}),...(tenant?{'x-tenant-id':tenant}:{}),...(body!==undefined?{'content-type':'application/json'}:{})},body:body===undefined?undefined:JSON.stringify(body)});
   const data=await r.json();assert.equal(r.status,status,'Fixture HTTP '+method+' '+path);return data;
  }
  async function account(label,type){
   const email='chronology-'+label+'-'+stamp+'@example.test';
   const signup=await call('/v1/auth/signup',{method:'POST',body:{email,password,accountType:type,...(type==='company'?{workspaceName:'Chronology '+label}: {})},status:201});
   const auth=await call('/v1/auth/signin',{method:'POST',body:{email,password},status:201});
   assert.equal(auth.identity.id,signup.id);return{identity:signup.id,tenant:signup.tenantId,token:auth.accessToken};
  }
  const pro=await account('professional','professional'),outsider=await account('outsider','professional');
  const companies=[await account('a','company'),await account('b','company')];
  const profile=await call('/v1/professional-profile',{method:'PUT',token:pro.token,body:{displayName:'Chronology professional',homeCity:'São Paulo',primaryRole:'Bartender'}});
  await call('/v1/professional-profile',{method:'PUT',token:outsider.token,body:{displayName:'Chronology outsider'}});
  const first=new Date();first.setUTCHours(12,0,0,0);first.setUTCDate(first.getUTCDate()+((3-first.getUTCDay()+7)%7||7));
  const second=new Date(first.getTime()+86400000),ends=new Date(second.getTime()+8*3600000);
  await call('/v1/availability/mine',{method:'POST',token:pro.token,body:{startsAt:new Date(first.getTime()-3600000).toISOString(),endsAt:new Date(ends.getTime()+3600000).toISOString()},status:201});
  const fixtures=[];
  for(const [index,company]of companies.entries()){
   const startsAt=[first,second][index],endsAt=new Date(startsAt.getTime()+8*3600000);
   const job=await call('/v1/company/jobs',{method:'POST',token:company.token,tenant:company.tenant,body:{title:'Chronology '+index,requiredRole:'Bartender',workCity:'São Paulo',startsAt:startsAt.toISOString(),endsAt:endsAt.toISOString(),payCents:25000+index*1000},status:201});
   await call('/v1/jobs/'+job.id+'/interest',{method:'POST',token:pro.token,status:201});
   const assignment=await call('/v1/company/jobs/'+job.id+'/confirm',{method:'POST',token:company.token,tenant:company.tenant,body:{professionalId:profile.id},status:201});
   for(const step of ['check-in','start','check-out','complete'])await call('/v1/assignments/'+assignment.id+'/'+step,{method:'POST',token:pro.token,tenant:company.tenant,body:{},status:201});
   fixtures.push({tenant:company.tenant,job:job.id,assignment:assignment.id,startsAt:startsAt.toISOString(),completion:['2026-10-14T12:00:00.000Z','2026-10-15T12:00:00.000Z'][index]});
  }
  // Bind every HTTP-created fixture to PostgreSQL before changing only fixture timestamps.
  // No DDL, grant changes, deleted history, provider calls or production database access.
  for(const f of fixtures){
   const rows=(await db.query('SELECT wa.id FROM work_assignments wa JOIN professional_profiles p ON p.id=wa.professional_id JOIN company_jobs j ON j.id=wa.job_id WHERE wa.id=$1 AND wa.tenant_id=$2 AND wa.job_id=$3 AND wa.professional_id=$4 AND p.identity_id=$5 AND j.tenant_id=$2 AND wa.status=$6',[f.assignment,f.tenant,f.job,profile.id,pro.identity,'completed'])).rows;
   assert.equal(rows.length,1);
   await db.query('BEGIN');
   try{
    assert.equal((await db.query('UPDATE work_assignments SET completed_at=$1 WHERE id=$2 AND tenant_id=$3 AND professional_id=$4 AND status=$5',[f.completion,f.assignment,f.tenant,profile.id,'completed'])).rowCount,1);
    assert.equal((await db.query('UPDATE earnings_ledger SET created_at=$1 WHERE assignment_id=$2 AND tenant_id=$3 AND professional_id=$4 AND status=$5',[f.completion,f.assignment,f.tenant,profile.id,'payable'])).rowCount,1);
    await db.query('COMMIT');
   }catch(error){await db.query('ROLLBACK');throw error;}
  }
  const typed=(await db.query('SELECT j.starts_at AS "startsAt",wa.completed_at AS "completedAt",e.created_at AS "createdAt" FROM work_assignments wa JOIN company_jobs j ON j.id=wa.job_id JOIN earnings_ledger e ON e.assignment_id=wa.id WHERE wa.id=ANY($1::uuid[])',[fixtures.map(f=>f.assignment)])).rows;
  assert.equal(typed.length,2);assert.ok(typed.every(r=>['startsAt','completedAt','createdAt'].every(k=>r[k] instanceof Date)),'Actual pg parser must return Date objects for this reduction');
  console.log('PROFESSIONAL_CHRONOLOGY_PG_TYPES '+JSON.stringify({dateObjects:true,fixtureAssignments:fixtures.map(f=>f.assignment),startsAt:fixtures.map(f=>f.startsAt),completedAt:fixtures.map(f=>f.completion)}));
  const mine=await call('/v1/assignments/mine',{token:pro.token});
  const passport=await call('/v1/work-passport/mine',{token:pro.token});
  const earnings=await call('/v1/earnings/mine',{token:pro.token});
  assert.equal(passport.completedWorkCount,2);assert.equal(passport.ratingCount,0);assert.equal(passport.averageRating,null);
  assert.deepEqual(earnings.map(r=>r.amountCents).sort((a,b)=>a-b),[25000,26000]);
  for(const [index,f]of fixtures.entries()){
   const scoped=await call('/v1/assignments/mine',{token:pro.token,tenant:f.tenant});assert.deepEqual(scoped.map(r=>r.id),[f.assignment]);
   const scopedPassport=await call('/v1/work-passport/mine',{token:pro.token,tenant:f.tenant});assert.deepEqual(scopedPassport.verifiedHistory.map(r=>r.id),[f.assignment]);
   const scopedEarnings=await call('/v1/earnings/mine',{token:pro.token,tenant:f.tenant});assert.deepEqual(scopedEarnings.map(r=>r.assignmentId),[f.assignment]);assert.equal(scopedEarnings[0].amountCents,25000+index*1000);
  }
  assert.deepEqual(await call('/v1/assignments/mine',{token:outsider.token}),[]);assert.deepEqual(await call('/v1/earnings/mine',{token:outsider.token}),[]);
  assert.deepEqual((await call('/v1/work-passport/mine',{token:outsider.token})).verifiedHistory,[]);
  await call('/v1/assignments/mine',{token:outsider.token,tenant:companies[0].tenant,status:401});
  await call('/v1/work-passport/mine',{status:401});await call('/v1/earnings/mine',{status:401});
  const expectations=[['assignments',mine.map(r=>r.id),fixtures.map(f=>f.assignment)],['passport',passport.verifiedHistory.map(r=>r.id),[...fixtures].reverse().map(f=>f.assignment)],['earnings',earnings.map(r=>r.assignmentId),[...fixtures].reverse().map(f=>f.assignment)]];
  let failures=0;
  for(const [endpoint,actual,expected]of expectations){const pass=JSON.stringify(actual)===JSON.stringify(expected);if(!pass)failures++;console.log('PROFESSIONAL_CHRONOLOGY_OBSERVED '+JSON.stringify({endpoint,pass,actual,expected}));}
  assert.equal(failures,0,'Professional chronological ordering failed across actual tenant slices');
  // Real JSON also flows through the unchanged mobile loaders used by Agenda/Ganhos/Perfil.
  const fs=require('node:fs'),vm=require('node:vm'),{stripTypeScriptTypes}=require('node:module');
  const exported=(path,names)=>vm.runInNewContext(stripTypeScriptTypes(fs.readFileSync(path,'utf8').replace(/^import .*$/gm,''),{mode:'transform'}).replace(/\bexport\s+/g,'')+'\n({'+names.join(',')+'})',{Date,Number,Array,Object,Set});
  const loaderResult=async(loader,data)=>loader(async()=>({ok:true,status:200,json:async()=>data}));
  const agenda=await loaderResult(exported('apps/mobile/lib/agenda.ts',['loadAgenda']).loadAgenda,mine);
  const money=await loaderResult(exported('apps/mobile/lib/earnings.ts',['loadEarnings']).loadEarnings,earnings);
  const history=await loaderResult(exported('apps/mobile/lib/professional-profile.ts',['loadWorkPassport']).loadWorkPassport,passport);
  for(const result of [agenda,money,history])assert.equal(result.status,'ready');
  assert.deepEqual(agenda.data.map(r=>r.id),fixtures.map(f=>f.assignment));assert.deepEqual(money.data.map(r=>r.assignmentId),[...fixtures].reverse().map(f=>f.assignment));assert.deepEqual(history.data.verifiedHistory.map(r=>r.id),[...fixtures].reverse().map(f=>f.assignment));
  console.log('PROFESSIONAL_CHRONOLOGY_PASS actual HTTP/Postgres Date objects, ascending assignments, descending passport/earnings, scoped and outsider isolation, real mobile loaders; not Android render or physical evidence');
 }finally{await db.end();}
}
if(require.main===module)main().catch(error=>{console.error('PROFESSIONAL_CHRONOLOGY_FAIL '+error.message);process.exitCode=1;});
