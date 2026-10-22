'use strict';
// Actual SDKs -> disposable local HTTP/PostgreSQL, not native UI or an external provider.
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
 const db=new Client({connectionString:config.databaseUrl,connectionTimeoutMillis:5000});await db.connect();
 const tokens=new Set();let requests=0,posts=0;
 try{
  requireLocalDatabasePeer((await db.query('SELECT current_database() name,inet_server_addr()::text address')).rows[0],db.connection.stream.remoteAddress);
  const candidates=await mobile('company-candidates'),replacement=await mobile('company-replacements'),teams=await mobile('teams'),jobs=await mobile('jobs');
  const stamp=randomUUID(),password='MatchingJourney-'+randomUUID()+'!';
  async function response(actor,tenant,path,method='GET',body){
   check(/^\/v1\/[a-z0-9/-]+$/.test(path),'fixture_route_required');requests++;if(method==='POST')posts++;
   return fetch(config.origin+path,{method,redirect:'error',signal:AbortSignal.timeout(15000),headers:{...(actor?{authorization:'Bearer '+actor.token}:{}),...(tenant?{'x-tenant-id':tenant}:{}),...(body===undefined?{}:{'content-type':'application/json'})},...(body===undefined?{}:{body:JSON.stringify(body)})});
  }
  async function call(actor,tenant,path,method='GET',body,status=200){
   const r=await response(actor,tenant,path,method,body);check(r.status===status,'http_'+method+'_'+path.replace(/[0-9a-f]{8}-[0-9a-f-]{27}/g,'UUID')+'_'+r.status+'_expected_'+status);return r.json();
  }
  const companyClient=(actor,tenant)=>(path,options)=>response(actor,tenant,'/v1'+path,options?.method||'GET',options?.body===undefined?undefined:JSON.parse(options.body));
  const replacementClient=(actor,tenant)=>(path,method,body)=>response(actor,tenant,'/v1'+path,method,body);
  const jobsClient=actor=>(path,method)=>response(actor,null,'/v1'+path,method||'GET');
  async function account(label,type){
   const email='matching-acceptance-'+label+'-'+stamp+'@example.test';
   const a=await call(null,null,'/v1/auth/signup','POST',{email,password,accountType:type,...(type==='company'?{workspaceName:'Matching '+label}: {})},201);
   const s=await call(null,null,'/v1/auth/signin','POST',{email,password},201);check(s.identity.id===a.id,'identity_binding');tokens.add(s.accessToken);return{id:a.id,tenant:a.tenantId,token:s.accessToken};
  }
  stage='fresh-actors-and-availability';
  const owner=await account('owner','company'),foreign=await account('foreign','company');
  const actors={best:await account('best','professional'),manual:await account('manual','professional'),alternate:await account('alternate','professional'),unavailable:await account('unavailable','professional')};
  const clock=Date.now(),iso=h=>new Date(clock+h*3600000).toISOString();
  for(const [label,actor]of Object.entries(actors)){
   const profile=await call(actor,null,'/v1/professional-profile','PUT',{displayName:'Matching '+label,homeCity:'São Paulo',primaryRole:label==='best'||label==='unavailable'?'Bartender':label==='manual'?'Limpeza':'Garçom'});actor.professionalId=profile.id;
   if(label!=='unavailable')await call(actor,null,'/v1/availability/mine','POST',{startsAt:iso(47),endsAt:iso(220)},201);
  }
  const tenant=owner.tenant,client=companyClient(owner,tenant),replClient=replacementClient(owner,tenant);
  const createJob=(label,start=72,end=80)=>call(owner,tenant,'/v1/company/jobs','POST',{title:'Matching '+label+' '+stamp,requiredRole:'Bartender',workCity:'São Paulo',location:'CI local',startsAt:iso(start),endsAt:iso(end),payCents:12345},201);
  const tables=['work_assignments','replacement_requests','tenant_memberships','talent_pool_members','workforce_team_members','notifications','earnings_ledger'];
  async function snapshot(ids=[tenant,foreign.tenant]){const out={};for(const table of tables)out[table]=(await db.query('SELECT to_jsonb(t) row FROM public.'+table+' t WHERE tenant_id=ANY($1::uuid[]) ORDER BY to_jsonb(t)::text',[ids])).rows;return out;}
  const security=async()=>({classes:(await db.query('SELECT relname,relrowsecurity,relforcerowsecurity,relacl::text FROM pg_class WHERE oid=ANY($1::regclass[]) ORDER BY relname',[tables])).rows,policies:(await db.query("SELECT * FROM pg_policies WHERE schemaname='public' AND tablename=ANY($1::text[]) ORDER BY tablename,policyname",[tables])).rows});
  const securityBefore=await security(),foreignBefore=await snapshot([foreign.tenant]);
  stage='real-candidates-ranking-readonly';
  const target=await createJob('target');
  for(const actor of Object.values(actors))check(await jobs.sendInterest(jobsClient(actor),target.id)==='interested','one_bodyless_real_interest');
  const beforeRanking=await snapshot();
  const data=await candidates.loadCandidates(client,target.id);
  check(data.candidates.status==='ready'&&data.candidates.data.length===4&&data.recommendations.status==='ready','actual_candidate_and_recommendation_json');
  const ranking=data.recommendations.data,ordered=candidates.orderedCandidates(data);
  check(ranking[0].professionalId===actors.best.professionalId&&ordered[0].professionalId===actors.best.professionalId,'best_role_city_ranks_first');
  check(ranking[0].reasons.includes('alta compatibilidade com a função')&&ranking[0].reasons.includes('próximo do local'),'factual_ranking_reasons');
  check(!ranking.some(x=>x.professionalId===actors.unavailable.professionalId)&&ranking.find(x=>x.professionalId===actors.manual.professionalId).score<ranking[0].score,'unavailable_excluded_lower_rank_kept');
  assert.deepEqual(await snapshot(),beforeRanking,'recommendations never confirm or write');
  const headers={Authorization:'Bearer '+owner.token,'x-tenant-id':tenant};
  for(const changed of [{...headers,'x-tenant-id':foreign.tenant},{...headers,Authorization:'Bearer '+foreign.token}])check(!candidates.sameCompanyContext(headers,changed)&&!replacement.sameReplacementContext(headers,changed)&&!teams.sameTeamContext(headers,changed),'stale_display_context_rejected');
  stage='explicit-human-confirmation-and-replay';
  let confirmCalls=0;
  const confirming=(...args)=>{confirmCalls++;return client(...args);};
  check(await candidates.confirmCandidate(confirming,target.id,actors.manual.professionalId,tenant),'explicit_lower_rank_human_choice');check(confirmCalls===1,'one_explicit_confirm');
  const original=(await db.query('SELECT id,status FROM work_assignments WHERE tenant_id=$1 AND job_id=$2',[tenant,target.id])).rows;
  check(original.length===1&&original[0].status==='confirmed','one_persisted_manual_assignment');
  const originalId=original[0].id,beforeReplay=await snapshot();
  check(await candidates.confirmCandidate(confirming,target.id,actors.manual.professionalId,tenant),'explicit_confirm_replay_ack');check(confirmCalls===2,'no_automatic_confirm_retry');
  assert.deepEqual(await snapshot(),beforeReplay,'confirm replay keeps membership assignment notification exact');
  check(await jobs.sendInterest(jobsClient(actors.manual),target.id)==='confirmed','interest_replay_never_downgrades_confirmation');
  const manualAgenda=await call(actors.manual,null,'/v1/assignments/mine');check(manualAgenda.some(x=>x.id===originalId&&x.tenantId===tenant&&x.jobId===target.id),'actual_authenticated_professional_company_binding');
  stage='pool-membership-through-real-seed-confirmations';
  // Availability constrains ranking/select, not the existing company confirm endpoint.
  // Seed each membership through actual interest/confirm, including the unavailable control.
  for(const label of ['best','alternate','unavailable']){
   const actor=actors[label],seed=await createJob('membership-'+label,192,200);
   check(await jobs.sendInterest(jobsClient(actor),seed.id)==='interested','seed_interest');
   check(await candidates.confirmCandidate(client,seed.id,actor.professionalId,tenant),'seed_real_membership');
  }
  for(const actor of Object.values(actors))await call(owner,tenant,'/v1/company/talent-pools','POST',{professionalId:actor.professionalId,pool:'preferred'},201);
  stage='actual-team-allocation-readonly';
  const created=await teams.createTeam(client,'Matching team '+stamp);check(created.status==='created','team_created');const teamId=created.team.id;
  const empty=await teams.loadAllocation(client,teamId,target.id);check(empty.status==='ready'&&empty.data.length===0,'real_empty_team_contract');
  for(const actor of Object.values(actors))check(await teams.changeTeamMember(client,teamId,actor.professionalId,false),'team_member_actual_ack');
  const beforeAllocation=await snapshot(),allocation=await teams.loadAllocation(client,teamId,target.id);
  check(allocation.status==='ready'&&allocation.data[0].professionalId===actors.best.professionalId&&!allocation.data.some(x=>x.professionalId===actors.unavailable.professionalId),'team_ranking_uses_availability');
  const outside=await createJob('outside',300,308),unavailable=await teams.loadAllocation(client,teamId,outside.id);check(unavailable.status==='ready'&&unavailable.data.length===0,'no_availability_returns_real_empty');
  assert.deepEqual(await snapshot(),beforeAllocation,'allocation does not assign or notify');
  stage='replacement-request-and-recommendation-without-mutation';
  check(await replacement.requestReplacement(replClient,originalId,'Escolha humana'),'one_request_real_ack');
  const loaded=await replacement.loadReplacements(replClient);check(loaded.assignments.status==='ready'&&loaded.replacements.status==='ready','actual_replacement_json');
  const pending=loaded.replacements.data.find(x=>x.assignmentId===originalId);check(pending?.status==='open','pending_bound_to_original');
  check(await replacement.requestReplacement(replClient,originalId,'Escolha humana'),'explicit_open_request_replay');
  check((await db.query('SELECT id FROM replacement_requests WHERE tenant_id=$1 AND assignment_id=$2',[tenant,originalId])).rows.length===1,'no_duplicate_open_request');
  const beforeMatch=await snapshot(),match=await replacement.matchReplacement(replClient,pending.id);
  check(match.status==='ready'&&match.data.recommendedProfessionalId===actors.best.professionalId,'actual_best_replacement_recommendation');
  assert.deepEqual(await snapshot(),beforeMatch,'auto_match_only_recommends_never_selects');
  const rawCandidates=await call(owner,tenant,'/v1/company/replacements/'+pending.id+'/candidates');
  check(rawCandidates.some(x=>x.professionalId===actors.alternate.professionalId)&&!rawCandidates.some(x=>[actors.manual.professionalId,actors.unavailable.professionalId].includes(x.professionalId)),'original_and_unavailable_excluded');
  stage='denials-preserve-facts';
  const beforeDenials=await snapshot();
  await call(owner,tenant,'/v1/company/replacements/'+pending.id+'/select','POST',{professionalId:actors.unavailable.professionalId},400);
  await call(owner,tenant,'/v1/company/replacements/'+pending.id+'/select','POST',{professionalId:actors.manual.professionalId},400);
  await call(foreign,tenant,'/v1/company/replacements/'+pending.id+'/select','POST',{professionalId:actors.alternate.professionalId},401);
  await call(actors.manual,tenant,'/v1/company/replacements/'+pending.id+'/select','POST',{professionalId:actors.alternate.professionalId},403);
  await call(owner,tenant,'/v1/company/jobs/'+target.id+'/confirm','POST',{professionalId:'not-a-uuid'},400);
  check(!(await candidates.confirmCandidate(companyClient(foreign,tenant),target.id,actors.best.professionalId,tenant)),'foreign_sdk_confirm_rejected');
  check((await replacement.matchReplacement(replacementClient(foreign,tenant),pending.id)).status==='error','foreign_match_is_error_not_empty');
  assert.deepEqual(await snapshot(),beforeDenials,'denied and unavailable operations leave all seven tables exact');
  stage='explicit-nonrecommended-selection-and-closed-replay';
  let selects=0;const selecting=(...args)=>{selects++;return replClient(...args);};
  check(await replacement.selectReplacement(selecting,pending,actors.alternate.professionalId),'human_explicit_nonrecommended_selection');check(selects===1,'one_select_post_no_auto');
  const assigned=(await db.query('SELECT id,professional_id,status FROM work_assignments WHERE tenant_id=$1 AND job_id=$2 ORDER BY id',[tenant,target.id])).rows;
  check(assigned.length===2&&assigned.find(x=>x.id===originalId)?.status==='cancelled','original_cancelled_only_after_select');
  const selected=assigned.find(x=>x.professional_id===actors.alternate.professionalId);check(selected&&selected.status==='confirmed'&&selected.id!==originalId,'new_assignment_bound_to_human_choice');
  const actualRequest=(await db.query('SELECT status,replacement_professional_id FROM replacement_requests WHERE tenant_id=$1 AND id=$2',[tenant,pending.id])).rows[0];
  check(actualRequest.status==='matched'&&actualRequest.replacement_professional_id===actors.alternate.professionalId,'request_matched_to_explicit_choice');
  const notified=(await db.query("SELECT identity_id FROM notifications WHERE tenant_id=$1 AND type='replacement_confirmed'",[tenant])).rows;
  check(notified.length===1&&notified[0].identity_id===actors.alternate.id,'one_notification_for_selected_identity');
  const afterSelection=await snapshot();check(!(await replacement.selectReplacement(selecting,pending,actors.alternate.professionalId)),'closed_replay_rejected_not_idempotent_ack');check(selects===2,'only_second_explicit_attempt');
  assert.deepEqual(await snapshot(),afterSelection,'closed_replay_no_duplicate_or_retarget');
  const agenda=await call(actors.alternate,null,'/v1/assignments/mine');check(agenda.some(x=>x.id===selected.id&&x.status==='confirmed'&&x.tenantId===tenant&&x.jobId===target.id),'selected_professional_real_authenticated_agenda');
  const final=await replacement.loadReplacements(replClient);check(final.replacements.status==='ready'&&final.replacements.data.find(x=>x.id===pending.id)?.status==='matched','actual_sdk_final_matched_read');
  assert.deepEqual(await snapshot([foreign.tenant]),foreignBefore,'foreign_tenant_unchanged_through_whole_journey');assert.deepEqual(await security(),securityBefore,'ACL_and_RLS_metadata_unchanged');
  for(const token of tokens)await call({token},null,'/v1/auth/signout','POST',{},201);tokens.clear();
  console.log('MATCHING_ACCEPTANCE_HTTP_PG_PASS '+JSON.stringify({actualMobileClients:hashes,realHTTPPostgres:true,humanLowerRankConfirmation:true,confirmationReplayExact:true,availabilityFiltersRecommendationAllocationSelection:true,allocationAndAutoMatchReadOnly:true,explicitNonrecommendedReplacement:true,closedSelectionReplayRejected:true,selectedProfessionalAgendaBound:true,sevenTablesTwoTenantsDenialsUnchanged:true,ACLPoliciesUnchanged:true,requests,posts,nativeUI:false,physicalDevice:false,providerOrRealMoney:false}));
 }finally{for(const token of tokens)await fetch(config.origin+'/v1/auth/signout',{method:'POST',redirect:'error',signal:AbortSignal.timeout(15000),headers:{authorization:'Bearer '+token}}).catch(()=>{});await db.end();}
}
main().catch(()=>{console.error('MATCHING_ACCEPTANCE_HTTP_PG_FAIL '+JSON.stringify({stage,reason:'assertion_or_local_transport_failed'}));process.exitCode=1;});
