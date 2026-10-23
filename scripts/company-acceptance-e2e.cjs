'use strict';
// Actual mobile clients + real, disposable HTTP/PostgreSQL. No native UI or provider.
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {resolve}=require('node:path');
const {createRequire,stripTypeScriptTypes}=require('node:module');
const {randomUUID,createHash}=require('node:crypto');
const {localConfiguration,requireLocalDatabasePeer}=require('./professional-chronology-e2e.cjs');
let stage='local-configuration';
const hashes={};
function check(value,label){if(!value)throw Error(label);}
async function mobile(name){
 const source=readFileSync(resolve('apps/mobile/lib/'+name+'.ts'),'utf8');
 hashes[name]=createHash('sha1').update('blob '+Buffer.byteLength(source)+'\0').update(source).digest('hex');
 return import('data:text/javascript;base64,'+Buffer.from(stripTypeScriptTypes(source,{mode:'strip'})).toString('base64'));
}
async function main(){
 const config=localConfiguration(process.env);
 const {Client}=createRequire(resolve('apps/api/package.json'))('pg');
 const db=new Client({connectionString:config.databaseUrl,connectionTimeoutMillis:5000});
 await db.connect();
 const tokens=new Set();let requests=0,posts=0;
 try{
  requireLocalDatabasePeer((await db.query('SELECT current_database() name,inet_server_addr()::text address')).rows[0],db.connection.stream.remoteAddress);
  const {publishJob}=await mobile('company-job-publication');
  const {loadTeamBase,knownProfessionals,createTeam,changeTeamMember,loadMembers,sameTeamContext}=await mobile('teams');
  const {generateInvitation,acceptInvitation,loadManagement,sameManagementContext}=await mobile('company-members');
  const {loadCompanyDashboard}=await mobile('company-dashboard');
  const stamp=randomUUID(),password='CompanyJourney-'+randomUUID()+'!';
  async function response(actor,tenant,path,method='GET',body){
   check(/^\/v1\/[a-z0-9/-]+$/.test(path),'fixture_route_required');requests++;if(method==='POST')posts++;
   return fetch(config.origin+path,{method,redirect:'error',signal:AbortSignal.timeout(15000),headers:{...(actor?{authorization:'Bearer '+actor.token}:{}),...(tenant?{'x-tenant-id':tenant}:{}),...(body===undefined?{}:{'content-type':'application/json'})},...(body===undefined?{}:{body:JSON.stringify(body)})});
  }
  async function call(actor,tenant,path,method='GET',body,status=200){
   const r=await response(actor,tenant,path,method,body);check(r.status===status,'http_status_'+method+'_'+path.replace(/[0-9a-f]{8}-[0-9a-f-]{27}/g,'UUID')+'_'+r.status+'_expected_'+status);return r.json();
  }
  const membersClient=(actor,tenant)=>(path,body,method)=>response(actor,tenant,'/v1'+path,method||(body===undefined?'GET':'POST'),body);
  const teamClient=(actor,tenant)=>(path,options)=>response(actor,tenant,'/v1'+path,options?.method||'GET',options?.body===undefined?undefined:JSON.parse(options.body));
  async function account(label,type){
   const email='company-acceptance-'+label+'-'+stamp+'@example.test';
   const a=await call(null,null,'/v1/auth/signup','POST',{email,password,accountType:type,...(type==='company'?{workspaceName:'Company '+label}: {})},201);
   const s=await call(null,null,'/v1/auth/signin','POST',{email,password},201);
   check(s.identity.id===a.id,'signup_signin_binding');tokens.add(s.accessToken);return{id:a.id,email,tenant:a.tenantId,token:s.accessToken};
  }
  stage='accounts-and-real-memberships';
  const owner=await account('owner','company'),foreign=await account('foreign','company');
  const admin=await account('admin','professional'),manager=await account('manager','professional'),legacy=await account('legacy','professional');
  const pro=await account('worker','professional'),outsider=await account('outsider','professional');
  check(owner.tenant&&foreign.tenant&&owner.tenant!==foreign.tenant,'two_real_workspaces');
  for(const [role,actor]of [['admin',admin],['manager',manager]]){
   const invitation=await generateInvitation(membersClient(owner,owner.tenant),owner.tenant,actor.email,role);
   check(invitation.status==='created','owner_invite_'+role);
   const ack=await acceptInvitation(membersClient(actor,null),invitation.inviteCode);
   check(ack.status==='accepted'&&ack.tenantId===owner.tenant&&ack.role===role,'accepted_membership_'+role);
  }
  // The legacy company role has no public invitation path. Seed ONLY this fresh fixture
  // membership, in the exact guarded CI database; never change roles/policies/grants.
  const absent=await db.query('SELECT id FROM tenant_memberships WHERE tenant_id=$1 AND identity_id=$2',[owner.tenant,legacy.id]);
  check(absent.rows.length===0,'legacy_fixture_must_be_new');
  const inserted=await db.query("INSERT INTO tenant_memberships(tenant_id,subject_id,identity_id,role) VALUES($1,$2,$2,'company') RETURNING tenant_id,identity_id,role",[owner.tenant,legacy.id]);
  check(inserted.rows.length===1&&inserted.rows[0].identity_id===legacy.id&&inserted.rows[0].tenant_id===owner.tenant&&inserted.rows[0].role==='company','legacy_fixture_bound');
  const actors=[['owner',owner],['admin',admin],['manager',manager],['company',legacy]];
  for(const [role,actor]of actors){const me=await call(actor,null,'/v1/me');check(me.id===actor.id&&me.memberships.some(m=>m.tenant_id===owner.tenant&&m.role===role),'actual_me_role_'+role);}
  const tables=['company_jobs','workforce_teams','workforce_team_members','tenant_memberships','company_member_invitations','work_assignments','earnings_ledger','notifications'];
  const tenants=[owner.tenant,foreign.tenant];
  async function snapshot(ids=tenants){const out={};for(const table of tables)out[table]=(await db.query('SELECT to_jsonb(t) row FROM public.'+table+' t WHERE tenant_id=ANY($1::uuid[]) ORDER BY to_jsonb(t)::text',[ids])).rows;return out;}
  const security=async()=>({classes:(await db.query('SELECT relname,relrowsecurity,relforcerowsecurity,relacl::text FROM pg_class WHERE oid=ANY($1::regclass[]) ORDER BY relname',[tables])).rows,policies:(await db.query("SELECT * FROM pg_policies WHERE schemaname='public' AND tablename=ANY($1::text[]) ORDER BY tablename,policyname",[tables])).rows});
  const securityBefore=await security(),foreignBefore=await snapshot([foreign.tenant]);
  stage='empty-real-client-states';
  for(const [,actor]of actors){const base=await loadTeamBase(teamClient(actor,owner.tenant));for(const x of Object.values(base))check(x.status==='ready'&&x.data.length===0,'empty_team_base');}
  const display={Authorization:'Bearer '+owner.token,'x-tenant-id':owner.tenant};
  check(sameTeamContext(display,{...display})&&sameManagementContext(display,{...display}),'same_current_context');
  for(const other of [{...display,'x-tenant-id':foreign.tenant},{...display,Authorization:'Bearer '+admin.token}])check(!sameTeamContext(display,other)&&!sameManagementContext(display,other),'stale_context_denied');
  stage='seed-real-assignment';
  const profile=await call(pro,null,'/v1/professional-profile','PUT',{displayName:'Company worker '+stamp,homeCity:'São Paulo',primaryRole:'Bartender'});
  const start=new Date(Date.now()+3*86400000),end=new Date(start.getTime()+8*3600000);
  await call(pro,null,'/v1/availability/mine','POST',{startsAt:new Date(start.getTime()-3600000).toISOString(),endsAt:new Date(end.getTime()+3600000).toISOString()},201);
  const payload={title:'Company shift '+stamp,location:'Centro',workCity:'São Paulo',startsAt:start.toISOString(),endsAt:end.toISOString(),payCents:12345};
  const seed=await call(owner,owner.tenant,'/v1/company/jobs','POST',payload,201);
  await call(pro,null,'/v1/jobs/'+seed.id+'/interest','POST',undefined,201);
  const assigned=await call(owner,owner.tenant,'/v1/company/jobs/'+seed.id+'/confirm','POST',{professionalId:profile.id},201);
  check(assigned.tenantId===owner.tenant&&assigned.professionalId===profile.id&&assigned.status==='confirmed','real_assignment_binding');
  const jobIds=[seed.id],teamIds=[];
  stage='four-role-publication-and-team-client-journey';
  for(const [role,actor]of actors){
   const body={...payload,title:'Published '+role+' '+stamp};let publishCalls=0;
   const published=await publishJob(b=>{publishCalls++;return response(actor,owner.tenant,'/v1/company/jobs','POST',b);},body);
   check(published.status==='created'&&publishCalls===1,'one_real_publish_'+role);jobIds.push(published.id);
   const rows=await call(actor,owner.tenant,'/v1/company/jobs');check(rows.some(x=>x.id===published.id&&x.title===body.title&&x.payCents===body.payCents&&x.status==='open'),'read_published_'+role);
   const client=teamClient(actor,owner.tenant),created=await createTeam(client,'Team '+role+' '+stamp);
   check(created.status==='created','real_team_ack_'+role);const id=created.team.id;teamIds.push(id);
   let members=await loadMembers(client,id);check(members.status==='ready'&&members.data.length===0,'new_team_empty_'+role);
   check(await changeTeamMember(client,id,profile.id,false),'member_add_'+role);
   check(await changeTeamMember(client,id,profile.id,false),'member_replay_ack_'+role);
   members=await loadMembers(client,id);check(members.status==='ready'&&members.data.length===1&&members.data[0].professionalId===profile.id&&members.data[0].displayName==='Company worker '+stamp,'one_bound_member_'+role);
   check(await changeTeamMember(client,id,profile.id,true),'member_delete_'+role);
   members=await loadMembers(client,id);check(members.status==='ready'&&members.data.length===0,'member_removed_'+role);
   const base=await loadTeamBase(client);for(const x of Object.values(base))check(x.status==='ready','team_base_ready_'+role);
   check(base.teams.data.some(x=>x.id===id&&x.memberCount===0)&&base.jobs.data.some(x=>x.id===published.id),'team_counts_and_jobs_'+role);
   check(knownProfessionals(base).some(x=>x.professionalId===profile.id),'real_known_worker_'+role);
   const dash=await loadCompanyDashboard(path=>response(actor,owner.tenant,'/v1'+path));
   check(dash.dashboard.status==='ready'&&dash.active.status==='ready'&&dash.completed.status==='ready'&&dash.active.data.some(x=>x.id===assigned.id&&x.professionalId===profile.id),'real_dashboard_'+role);
  }
  const persisted=await db.query('SELECT id,title,pay_cents,status FROM company_jobs WHERE tenant_id=$1 AND id=ANY($2::uuid[])',[owner.tenant,jobIds]);
  check(persisted.rows.length===5&&persisted.rows.every(x=>x.pay_cents===12345&&x.status==='open'),'exact_five_persisted_jobs');
  check((await db.query('SELECT id FROM workforce_teams WHERE tenant_id=$1 AND id=ANY($2::uuid[])',[owner.tenant,teamIds])).rows.length===4,'four_real_teams');
  check((await db.query('SELECT team_id FROM workforce_team_members WHERE tenant_id=$1 AND team_id=ANY($2::uuid[])',[owner.tenant,teamIds])).rows.length===0,'no_duplicate_or_remaining_members');
  stage='authority-errors-and-no-writes';
  const before=await snapshot();
  for(const [,actor]of actors.slice(1)){
   const m=await loadManagement(membersClient(actor,owner.tenant));check(m.members.status==='error'&&m.members.forbidden===true&&m.invitations.status==='error'&&m.invitations.forbidden===true,'nonowner_management_forbidden');
   await call(actor,owner.tenant,'/v1/company/members/invitations','POST',{email:outsider.email,role:'owner'},403);
  }
  const management=await loadManagement(membersClient(owner,owner.tenant));
  check(management.members.status==='ready'&&management.invitations.status==='ready','owner_management_ready');
  check(actors.every(([role,a])=>management.members.data.some(m=>m.identityId===a.id&&m.role===role)),'all_real_management_roles');
  for(const actor of [null,foreign,outsider]){
   const expected=401;
   await call(actor,owner.tenant,'/v1/company/jobs','POST',payload,expected);
   await call(actor,owner.tenant,'/v1/company/teams','POST',{name:'denied'},expected);
  }
  await call(pro,owner.tenant,'/v1/company/jobs','POST',payload,400);
  await call(pro,owner.tenant,'/v1/company/teams','POST',{name:'denied'},403);
  await call(manager,null,'/v1/company/jobs','POST',payload,400);
  await call(manager,owner.tenant,'/v1/company/jobs','POST',{...payload,title:42},400);
  await call(manager,owner.tenant,'/v1/company/teams','POST',{name:' '},400);
  const rejected=await publishJob(b=>response(foreign,owner.tenant,'/v1/company/jobs','POST',b),payload);check(rejected.status==='rejected','client_rejects_foreign_publication');
  const denied=await loadTeamBase(teamClient(foreign,owner.tenant));check(Object.values(denied).every(x=>x.status==='error'),'foreign_client_error_sections');
  const current=await loadCompanyDashboard(path=>response(owner,owner.tenant,'/v1'+path),()=>false);check(Object.values(current).every(x=>x.status==='error'),'stale_client_dashboard_error');
  assert.deepEqual(await snapshot(),before,'denied and malformed operations must leave eight tables/two tenants unchanged');
  assert.deepEqual(await snapshot([foreign.tenant]),foreignBefore,'all positives and negatives preserve foreign tenant');
  assert.deepEqual(await security(),securityBefore,'no policy ACL RLS changes');
  stage='explicit-session-cleanup';
  for(const token of tokens)await call({token},null,'/v1/auth/signout','POST',{},201);
  console.log('COMPANY_ACCEPTANCE_HTTP_PG_PASS '+JSON.stringify({roles:['owner','admin','manager','company'],actualMobileClients:hashes,realHTTPPostgres:true,adminManagerInvitedViaHTTP:true,legacyCompanyMembership:'one fresh CI-only SQL fixture row; no public role-creation claim',publicationOnePOSTPerRole:true,persistedJobs:5,realTeams:4,memberAddReplayRemove:true,ownerOnlyManagement:true,emptyErrorAndContextStates:true,eightTablesTwoTenantsUnchangedOnDenials:true,foreignTenantUnchanged:true,policiesACLUnchanged:true,requests,posts,nativeUI:false,physicalDevice:false,providerOrRealMoney:false}));
 }finally{await db.end();}
}
if(require.main===module)main().catch(error=>{console.error('COMPANY_ACCEPTANCE_FAIL '+JSON.stringify({stage,label:error instanceof assert.AssertionError?'assertion_failed':String(error?.message||'failure').slice(0,220)}));process.exitCode=1;});
