'use strict';
// Actual HTTP/PostgreSQL contracts, constrained to the disposable CI fixture.
const assert=require('node:assert/strict');
const {readFileSync,readdirSync}=require('node:fs');
const {resolve}=require('node:path');
const {createRequire}=require('node:module');
const {randomUUID,createHash,createHmac}=require('node:crypto');
const {localConfiguration,requireLocalDatabasePeer}=require('./professional-chronology-e2e.cjs');
const {contract}=require('./openapi-contract.cjs');
const uuid=x=>typeof x==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(x);
const sha=text=>createHash('sha1').update('blob '+Buffer.byteLength(text)+'\0').update(text).digest('hex');
let stage='configuration',lastContract=null;
function inventory(){
 const routes=[],controllers=[],sources={};
 for(const file of readdirSync('apps/api/src').filter(f=>f.endsWith('controller.ts')).sort()){
  const source=readFileSync('apps/api/src/'+file,'utf8');sources[file]=sha(source);
  const classes=[...source.matchAll(/@Controller\((?:'([^']*)')?\)\s*export class (\w+)/g)];
  for(let i=0;i<classes.length;i++){
   const c=classes[i];controllers.push(c[2]);const span=source.slice(c.index+c[0].length,classes[i+1]?.index??source.length);
   const methods=[...span.matchAll(/@(Get|Post|Put|Patch|Delete)\((?:'([^']*)')?\)/g)];
   for(let j=0;j<methods.length;j++){
    const m=methods[j],body=span.slice(m.index+m[0].length,methods[j+1]?.index??span.length);
    const path='/v1/'+[c[1],m[2]].filter(Boolean).map(x=>x.replace(/^\/|\/$/g,'')).join('/');
    routes.push({controller:c[2],method:m[1].toUpperCase(),path,tenantHeader:body.includes("@Headers('x-tenant-id')")});
   }
  }
 }
 const module=readFileSync('apps/api/src/app.module.ts','utf8'),registered=module.match(/controllers:\s*\[([^\]]+)\]/s)?.[1].match(/\w+Controller/g);
 assert.deepEqual([...controllers].sort(),[...registered].sort(),'Registered controller inventory drift');
 assert.equal(controllers.length,45);assert.equal(routes.length,114);assert.equal(new Set(routes.map(r=>r.method+' '+r.path)).size,114);
 return {controllers,routes,sources};
}
module.exports={inventory};
async function main(){
 const config=localConfiguration(process.env),catalog=inventory(),openapi=contract(catalog);
 assert.equal(process.env.PAYMENT_WEBHOOK_SECRET,'ci-payment-webhook-secret','Only the established synthetic CI webhook fixture is eligible');
 const {Client}=createRequire(resolve('apps/api/package.json'))('pg');
 const db=new Client({connectionString:config.databaseUrl,connectionTimeoutMillis:5000});await db.connect();
 let requests=0;const positives=new Map(),negatives=[],violations=[];
 const routeFor=(method,path)=>{
  const pathname=path.split('?')[0];const matched=catalog.routes.filter(r=>r.method===method&&new RegExp('^'+r.path.split('/').map(s=>s.startsWith(':')?'[^/]+':s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('/')+'$').test(pathname));
  assert.equal(matched.length,1,'Every request must bind exactly one inventoried route');return matched[0];
 };
 async function call(actor,method,path,body,status=method==='POST'?201:200,extra={}){
  const route=routeFor(method,path);requests++;lastContract={method,route:route.path,expected:status};
  const headers={...(actor?.token?{authorization:'Bearer '+actor.token}:{}),...(actor?.tenant?{'x-tenant-id':actor.tenant}:{}),...(body===undefined?{}:{'content-type':'application/json'}),...extra};
  openapi.request(route,path,headers,body);
  const response=await fetch(config.origin+path,{method,redirect:'error',signal:AbortSignal.timeout(15000),headers,...(body===undefined?{}:{body:JSON.stringify(body)})});
  let data;try{data=await response.json();}catch{throw Error('JSON_contract_'+route.method+'_'+route.path);}
  lastContract.actual=response.status;openapi.response(route,response.status,data);
  if(!(Array.isArray(status)?status.includes(response.status):response.status===status)){console.log('BACKEND_CONTRACT_STATUS_MISMATCH '+JSON.stringify({stage,method,route:route.path,actual:response.status,expected:status}));throw Error('HTTP_contract');}
  if(response.status>=200&&response.status<300){positives.set(method+' '+route.path,(positives.get(method+' '+route.path)||0)+1);}
  return data;
 }
 async function negative(actor,method,path,body,status=400){
  const route=routeFor(method,path);requests++;lastContract={method,route:route.path,expected:status};
  const response=await fetch(config.origin+path,{method,redirect:'error',signal:AbortSignal.timeout(15000),headers:{...(actor?.token?{authorization:'Bearer '+actor.token}:{}),...(actor?.tenant?{'x-tenant-id':actor.tenant}:{}),...(body===undefined?{}:{'content-type':'application/json'})},...(body===undefined?{}:{body:JSON.stringify(body)})});
  const data=await response.json();lastContract.actual=response.status;openapi.response(route,response.status,data);const row={method,route:route.path,expected:status,actual:response.status};negatives.push(row);
  if(!(Array.isArray(status)?status.includes(response.status):response.status===status))violations.push(row);
  assert.ok(!JSON.stringify(data).includes('password_hash')&&!JSON.stringify(data).includes('token_hash'),'No stored credential in negative response');
 }
 const needId=x=>{assert.ok(uuid(x));return x;};
 const has=(rows,id,key='id')=>{assert.ok(Array.isArray(rows));assert.ok(rows.some(row=>row[key]===id),'Expected persisted identity in actual JSON');};
 const scalar=(x,key,value)=>assert.equal(x[key],value);
 const stamp=randomUUID(),password='BackendFixture-'+stamp+'!',iso=h=>new Date(Date.now()+h*3600000).toISOString();
 async function account(label,type='professional'){
  const email='backend-'+label+'-'+stamp+'@example.test';
  const signup=await call(null,'POST','/v1/auth/signup',{email,password,accountType:type,...(type==='company'?{workspaceName:'Backend '+label}:{})});needId(signup.id);
  const auth=await call(null,'POST','/v1/auth/signin',{email,password});scalar(auth.identity,'id',signup.id);assert.ok(auth.accessToken);
  return {id:signup.id,email,token:auth.accessToken,...(signup.tenantId?{tenant:needId(signup.tenantId)}:{})};
 }
 const scopeTables=['assignment_cancellations','company_jobs','company_member_invitations','company_work_ratings','conversation_messages','conversations','direct_hire_conversions','earnings_ledger','job_interests','marketplace_integrity_cases','notifications','payment_events','professional_availability','replacement_requests','safety_case_appeal_events','safety_case_appeals','safety_case_events','safety_cases','support_cases','talent_pool_members','tenant_memberships','trust_events','verification_cases','work_assignments','work_ratings','workforce_team_members','workforce_teams'];
 const snapshot=async tenant=>{
  const rows={};for(const table of scopeTables){const r=await db.query('SELECT COALESCE(jsonb_agg(to_jsonb(x) ORDER BY to_jsonb(x)::text),\'[]\'::jsonb)::text data FROM public.'+table+' x WHERE tenant_id=$1',[tenant]);rows[table]=createHash('sha256').update(r.rows[0].data).digest('hex');}return rows;
 };
 const security=async()=>(await db.query("SELECT tablename,policyname,roles,cmd,qual,with_check FROM pg_policies WHERE schemaname='public' ORDER BY tablename,policyname")).rows;
 try{
  requireLocalDatabasePeer((await db.query('SELECT current_database() name')).rows[0],db.connection.stream.remoteAddress);
  await require('../apps/api/dist/platform-support-store.pg.js').verifyPlatformSupportIntake(config);
  const policiesBefore=await security();
  stage='public-and-identity';
  scalar(await call(null,'GET','/v1/health/ready'), 'database','ok');
  const packs=await call(null,'GET','/v1/vertical-packs');assert.equal(packs.length,5);
  for(const pack of packs){const detail=await call(null,'GET','/v1/vertical-packs/'+pack.id);scalar(detail,'id',pack.id);assert.deepEqual(detail.checklist,pack.checklist);assert.deepEqual(detail.defaultTeam,pack.defaultTeam);scalar(detail,'active',pack.active);}
  const roles=await call(null,'GET','/v1/taxonomy/roles');assert.ok(roles.length>=6);const role=roles.find(r=>r.role==='bartender');assert.ok(role?.id);
  const owner=await account('owner','company'),foreign=await account('foreign','company'),pro=await account('professional'),sub=await account('substitute'),admin=await account('admin'),retired=await account('retired');
  scalar(await call(owner,'GET','/v1/me'),'id',owner.id);assert.ok(Array.isArray(await call(owner,'GET','/v1/me/support-contexts')));
  async function profile(actor,label){const p=await call(actor,'PUT','/v1/professional-profile',{displayName:'Backend '+label,homeCity:'São Paulo',primaryRole:'Bartender'});actor.professionalId=needId(p.id);scalar(await call(actor,'GET','/v1/professional-profile'),'id',p.id);const a=await call(actor,'POST','/v1/availability/mine',{startsAt:iso(1),endsAt:iso(300)});needId(a.id);has(await call(actor,'GET','/v1/availability/mine'),a.id);}
  await require('./platform-support-owner-acceptance-e2e.cjs')({db,call,negative,account,company:owner});
  await profile(pro,'professional');await profile(sub,'substitute');
  const savedPreferences=await require('./preferences-acceptance-e2e.cjs').preferencesJourney({db,call,negative,pro,sub,owner,role});
  const cap=await call(pro,'PUT','/v1/professional-capabilities/'+role.id,{skills:[],certifications:[],provenLevel:'entry'});scalar(cap,'roleId',role.id);has(await call(pro,'GET','/v1/professional-capabilities'),role.id,'roleId');
  const invite=await call(owner,'POST','/v1/company/members/invitations',{email:admin.email,role:'admin'});needId(invite.invitationId);
  scalar(await call(admin,'POST','/v1/company/members/invitations/accept',{inviteCode:invite.inviteCode}),'accepted',true);admin.tenant=owner.tenant;
  const revoke=await call(owner,'POST','/v1/company/members/invitations',{email:'unused-'+stamp+'@example.test',role:'manager'});scalar(await call(owner,'POST','/v1/company/members/invitations/'+revoke.invitationId+'/revoke'),'revoked',true);
  has(await call(owner,'GET','/v1/company/members'),admin.id,'identityId');has(await call(owner,'GET','/v1/company/members/invitations'),revoke.invitationId);
  async function job(actor,label,h){const r=await call(actor,'POST','/v1/company/jobs',{title:'Backend '+label,requiredRole:'Bartender',workCity:'São Paulo',startsAt:iso(h),endsAt:iso(h+8),payCents:2345});return needId(r.id);}
  const foreignProfile=await call(foreign,'PUT','/v1/professional-profile',{displayName:'Backend foreign owner profile'});needId(foreignProfile.id);
  const foreignJob=await job(foreign,'foreign',72),foreignBefore=await snapshot(foreign.tenant);
  const jobId=await job(owner,'completion',72),replacementJob=await job(owner,'replacement',120),cancelJob=await job(owner,'cancel',168),memberJob=await job(owner,'membership',216);
  has(await call(owner,'GET','/v1/company/jobs'),jobId);has(await call(pro,'GET','/v1/jobs'),jobId);
  assert.ok(!(await call(owner,'GET','/v1/company/jobs')).some(j=>j.id===foreignJob));
  async function confirm(actor,id){const interest=await call(actor,'POST','/v1/jobs/'+id+'/interest');scalar(interest,'jobId',id);scalar(await call(actor,'GET','/v1/jobs/'+id+'/interest'),'professionalId',actor.professionalId);const a=await call(owner,'POST','/v1/company/jobs/'+id+'/confirm',{professionalId:actor.professionalId});needId(a.id);scalar(a,'status','confirmed');return a.id;}
  const assignment=await confirm(pro,jobId);pro.tenant=owner.tenant;
  const memberAssignment=await confirm(sub,memberJob);sub.tenant=owner.tenant;
  has(await call(owner,'GET','/v1/company/jobs/'+jobId+'/candidates'),pro.professionalId,'professionalId');has(await call(owner,'GET','/v1/company/jobs/'+jobId+'/recommendations'),pro.professionalId,'professionalId');
  has(await call(pro,'GET','/v1/assignments/mine'),assignment);
  const message=await call(pro,'POST','/v1/conversations/'+assignment+'/messages',{body:'Backend owned conversation'});needId(message.id);has(await call(owner,'GET','/v1/conversations/'+assignment+'/messages'),message.id);
  for(const [action,status]of [['check-in','checked_in'],['start','in_progress'],['check-out','checked_out'],['complete','completed']]){const a=await call(pro,'POST','/v1/assignments/'+assignment+'/'+action,{});scalar(a,'id',assignment);scalar(a,'status',status);}
  const rating=await call(owner,'POST','/v1/assignments/'+assignment+'/rating',{score:5,comment:'Owned feedback'});needId(rating.id);
  const companyRating=await call(pro,'POST','/v1/assignments/'+assignment+'/company-rating',{score:4});needId(companyRating.id);
  const ledger=(await db.query('SELECT amount_cents,status FROM earnings_ledger WHERE tenant_id=$1 AND assignment_id=$2',[owner.tenant,assignment])).rows;assert.equal(ledger.length,1);scalar(ledger[0],'amount_cents',2345);scalar(ledger[0],'status','payable');
  const earnings=await call(pro,'GET','/v1/earnings/mine');has(earnings,assignment,'assignmentId');const earning=earnings.find(e=>e.assignmentId===assignment);scalar(earning,'amountCents',2345);scalar(earning,'status','payable');scalar(earning,'tenantId',owner.tenant);
  const notices=await call(pro,'GET','/v1/notifications/mine');assert.ok(notices.length);const count=await call(pro,'GET','/v1/notifications/unread-count');assert.ok(count.count>0);const marked=await call(pro,'POST','/v1/notifications/'+notices[0].id+'/read');scalar(marked,'id',notices[0].id);assert.ok(marked.readAt);
  const passport=await call(pro,'GET','/v1/work-passport/mine');scalar(passport,'professionalId',pro.professionalId);scalar(passport,'completedWorkCount',1);has(passport.verifiedHistory,assignment);scalar(await call(pro,'GET','/v1/career/progress'),'professionalId',pro.professionalId);
  const dashboard=await call(owner,'GET','/v1/company/dashboard');scalar(dashboard,'openJobs',4);scalar(dashboard,'confirmedWorkers',1);scalar(dashboard,'activeWorkers',0);scalar(dashboard,'completedAssignments',1);
  has(await call(owner,'GET','/v1/company/dashboard/assignments'),memberAssignment);const completedRows=await call(owner,'GET','/v1/company/dashboard/completed');has(completedRows,assignment);scalar(completedRows.find(r=>r.id===assignment),'ratingScore',5);
  const analytics=await call(owner,'GET','/v1/company/analytics');scalar(analytics,'jobsCreated',4);scalar(analytics,'completedAssignments',1);scalar(analytics,'jobsWithConfirmation',2);scalar(analytics,'interestToConfirmationRate',100);
  has(await call(owner,'GET','/v1/company/planner'),jobId);
  assert.ok(Array.isArray(await call(sub,'GET','/v1/planner/my-week')));
  stage='teams-matching-and-human-replacement';
  const team=await call(owner,'POST','/v1/company/teams',{name:'Backend team'});needId(team.id);scalar(await call(owner,'POST','/v1/company/teams/'+team.id+'/members',{professionalId:pro.professionalId}),'professionalId',pro.professionalId);has(await call(owner,'GET','/v1/company/teams'),team.id);has(await call(owner,'GET','/v1/company/teams/'+team.id+'/members'),pro.professionalId,'professionalId');
  has(await call(owner,'GET','/v1/company/teams/'+team.id+'/allocation/'+jobId),pro.professionalId,'professionalId');
  const teamPlan=await call(owner,'POST','/v1/company/planner/'+jobId+'/team-plan',{requirements:[{role:'Bartender',count:1}]});assert.ok(Array.isArray(teamPlan.selected));assert.ok(teamPlan.selected.length);
  scalar(await call(owner,'POST','/v1/company/talent-pools',{professionalId:sub.professionalId,pool:'preferred'}),'professionalId',sub.professionalId);has(await call(owner,'GET','/v1/company/talent-pools'),sub.professionalId,'professionalId');
  const original=await confirm(pro,replacementJob),rr=await call(owner,'POST','/v1/company/replacements/'+original,{reason:'Owned manual replacement'});needId(rr.id);has(await call(owner,'GET','/v1/company/replacements'),rr.id);has(await call(owner,'GET','/v1/company/replacements/'+rr.id+'/candidates'),sub.professionalId,'professionalId');
  const beforeRecommendation=(await db.query('SELECT status FROM replacement_requests WHERE id=$1',[rr.id])).rows[0];
  const recommendation=await call(owner,'POST','/v1/company/replacements/'+rr.id+'/auto-match');scalar(recommendation,'recommendedProfessionalId',sub.professionalId);assert.deepEqual((await db.query('SELECT status FROM replacement_requests WHERE id=$1',[rr.id])).rows[0],beforeRecommendation);
  const selected=await call(owner,'POST','/v1/company/replacements/'+rr.id+'/select',{professionalId:sub.professionalId});scalar(selected,'status','matched');needId(selected.assignmentId);has(await call(sub,'GET','/v1/assignments/mine'),selected.assignmentId);
  const cancelled=await confirm(pro,cancelJob);scalar(await call(pro,'POST','/v1/assignments/'+cancelled+'/cancel',{reason:'Owned professional cancellation'}),'status','cancelled');assert.equal((await db.query('SELECT count(*)::int n FROM assignment_cancellations WHERE assignment_id=$1',[cancelled])).rows[0].n,1);
  const graph=await call(owner,'GET','/v1/company/work-graph');has(graph.nodes,team.id);assert.ok(graph.edges.some(e=>e.to===jobId));
  scalar(await call(owner,'DELETE','/v1/company/teams/'+team.id+'/members/'+pro.professionalId),'removed',true);scalar(await call(owner,'DELETE','/v1/company/talent-pools/preferred/'+sub.professionalId),'removed',true);
  stage='trust-safety-support-and-conversion';
  const trust=await call(owner,'POST','/v1/company/trust-events',{professionalId:pro.professionalId,assignmentId:assignment,eventType:'commendation',cause:'professional',notes:'Owned evidence'});needId(trust.id);has(await call(owner,'GET','/v1/company/trust-events/'+pro.professionalId),trust.id);
  const safety=await call(pro,'POST','/v1/safety-cases',{assignmentId:assignment,category:'other',description:'Owned safety report'});needId(safety.id);has(await call(pro,'GET','/v1/safety-cases/mine'),safety.id);has(await call(owner,'GET','/v1/company/safety-cases'),safety.id);
  scalar(await call(owner,'POST','/v1/company/safety-cases/'+safety.id+'/status',{status:'resolved',note:'Owned reviewed evidence'}),'changed',true);assert.equal((await call(owner,'GET','/v1/company/safety-cases/'+safety.id+'/events')).length,1);
  const appeal=await call(pro,'POST','/v1/safety-appeals',{safetyCaseId:safety.id,reason:'Owned appeal'});needId(appeal.id);has(await call(pro,'GET','/v1/safety-appeals/mine'),appeal.id);has(await call(owner,'GET','/v1/company/safety-appeals'),appeal.id);
  scalar(await call(owner,'POST','/v1/company/safety-appeals/'+appeal.id+'/status',{status:'reviewing',note:'Owned review'}),'changed',true);assert.equal((await call(owner,'GET','/v1/company/safety-appeals/'+appeal.id+'/events')).length,1);
  const supportBody={assignmentId:assignment,category:'other',description:'Owned support',priority:'normal'};
  const intent=await call(pro,'POST','/v1/support-cases/intent',supportBody);needId(intent.requestKey);scalar(intent,'reporterIdentityId',pro.id);
  const support=await call(pro,'POST','/v1/support-cases',supportBody,201,{'idempotency-key':intent.requestKey});needId(support.id);scalar(await call(pro,'POST','/v1/support-cases',supportBody,201,{'idempotency-key':intent.requestKey}),'id',support.id);has(await call(pro,'GET','/v1/support-cases/mine'),support.id);has(await call(owner,'GET','/v1/company/exceptions'),support.id);
  scalar(await call(owner,'POST','/v1/company/support-cases/'+support.id+'/status',{status:'resolved',note:'Owned resolution'}),'status','resolved');
  const integrity=await call(owner,'POST','/v1/company/integrity/cases',{assignmentId:assignment,kind:'other',evidence:'Owned integrity evidence'});needId(integrity.id);has(await call(owner,'GET','/v1/company/integrity/cases'),integrity.id);scalar(await call(owner,'POST','/v1/company/integrity/cases/'+integrity.id+'/review',{decision:'unsubstantiated',note:'Owned decision'}),'status','unsubstantiated');
  const conversion=await call(owner,'POST','/v1/company/conversions',{assignmentId:assignment,modality:'temp_to_hire',note:'Owned proposal'});needId(conversion.id);has(await call(owner,'GET','/v1/company/conversions'),conversion.id);scalar(await call(pro,'POST','/v1/career/conversions/'+conversion.id+'/respond',{decision:'accepted'}),'status','accepted');
  stage='verification-terms-copilot-and-simulated-finance';
  const identityCase=await call(pro,'POST','/v1/verification/mine/request');needId(identityCase.id);scalar(identityCase,'status','pending');scalar(await call(pro,'GET','/v1/verification/mine'),'id',identityCase.id);
  const businessCase=await call(owner,'POST','/v1/verification/business/request');needId(businessCase.id);scalar(businessCase,'status','pending');scalar(await call(owner,'GET','/v1/verification/business'),'id',businessCase.id);
  const terms=await call(pro,'GET','/v1/terms/status');assert.ok(Array.isArray(terms.missing));const accepted=await call(pro,'POST','/v1/terms/accept',{termsKey:'backend-fixture',version:stamp});scalar(accepted,'version',stamp);has(await call(pro,'GET','/v1/terms/acceptances'),'backend-fixture','termsKey');
  const interpretation=await call(pro,'POST','/v1/copilot/interpret',{text:'Minha agenda',mode:'assisted'});scalar(interpretation,'providerConfigured',false);scalar(interpretation,'executionAllowed',false);scalar(interpretation,'toolExecution','read_only_explicit');
  const read=await call(pro,'POST','/v1/copilot/read',{tool:'career_progress'});scalar(read,'advisoryOnly',true);scalar(await call(owner,'POST','/v1/copilot/read',{tool:'company_dashboard'}),'openJobs',(await db.query("SELECT count(*)::int n FROM company_jobs WHERE tenant_id=$1 AND status='open'",[owner.tenant])).rows[0].n);
  const event={tenantId:owner.tenant,assignmentId:assignment,eventType:'captured',amountCents:2345,idempotencyKey:'backend-'+stamp,providerReference:'synthetic-'+stamp};const timestamp=String(Math.floor(Date.now()/1000));const signature=createHmac('sha256',process.env.PAYMENT_WEBHOOK_SECRET).update(timestamp+'.'+JSON.stringify(event)).digest('hex');
  const payment=await call(null,'POST','/v1/payments/webhook',event,201,{'x-webhook-timestamp':timestamp,'x-webhook-signature':signature});needId(payment.id);scalar(await call(null,'POST','/v1/payments/webhook',event,201,{'x-webhook-timestamp':timestamp,'x-webhook-signature':signature}),'id',payment.id);has(await call(owner,'GET','/v1/company/payment-events'),payment.id);
  const reconciliationRows=await call(owner,'GET','/v1/company/payment-events/reconciliation');
  const withoutEarning=reconciliationRows.filter(r=>r.reconciliationStatus==='no_earning');assert.ok(withoutEarning.length>0,'Real assignment without ledger must be represented');for(const row of withoutEarning){scalar(row,'payableCents',null);scalar(row,'earningStatus',null);scalar(row.simulatedSplit,'professionalPayableCents',0);}
  console.log('OPENAPI_RECONCILIATION_ABSENT_EARNING_PASS '+JSON.stringify({rows:withoutEarning.length,payableIsNull:true,earningStatusIsNull:true,onlySimulatedArithmeticUsesZero:true}));
  const reconciled=reconciliationRows.find(r=>r.assignmentId===assignment);scalar(reconciled,'capturedCents',2345);scalar(reconciled,'payableCents',2345);scalar(reconciled.simulatedSplit,'platformRemainderCents',0);
  const request=await call(pro,'POST','/v1/privacy/requests',{requestType:'correction',details:'Owned correction'});needId(request.requestId);has(await call(pro,'GET','/v1/privacy/requests'),request.requestId);
  // Synthetic private cases seed only the guarded disposable HTTP database; capability stays false.
  const supportExportOwn=randomUUID(),supportExportForeign=randomUUID();
  for(const [caseId,identityId]of [[supportExportOwn,pro.id],[supportExportForeign,sub.id]]){
   await db.query("INSERT INTO platform_support_intents(request_key,owner_identity_id,payload_hash,submitted_at) VALUES($1,$2,$3,now())",[caseId,identityId,'a'.repeat(64)]);
   await db.query("INSERT INTO platform_support_cases(id,owner_identity_id,category,description) VALUES($1,$2,'other','Synthetic export request')",[caseId,identityId]);
   await db.query("INSERT INTO platform_support_responses(case_id,operator_identity_id,body) VALUES($1,$2,'Synthetic export response')",[caseId,admin.id]);
  }
  const exported=await call(pro,'GET','/v1/privacy/export');assert.ok(exported.identity);scalar(exported.identity,'id',pro.id);assert.deepEqual(exported.preferences,savedPreferences);
  assert.equal(exported.platformSupport.length,1);scalar(exported.platformSupport[0],'id',supportExportOwn);scalar(exported.platformSupport[0],'description','Synthetic export request');scalar(exported.platformSupport[0].responses[0],'body','Synthetic export response');
  assert.ok(!JSON.stringify(exported.platformSupport).includes(supportExportForeign));assert.ok(!JSON.stringify(exported.platformSupport).includes(admin.id));
  assert.deepEqual((await call(owner,'GET','/v1/privacy/export')).platformSupport,[]);
  assert.equal((await db.query("SELECT enabled FROM platform_support_capability WHERE singleton=true")).rows[0].enabled,false);
  console.log('PLATFORM_SUPPORT_PRIVACY_EXPORT_HTTP_PG_PASS '+JSON.stringify({actualHTTPPostgres:true,ownedCasesAndResponses:true,foreignOwnerAndCompanyExcluded:true,operatorIdentityRedacted:true,capabilityRemainsDisabled:true,production:false}));
  scalar(await call(retired,'POST','/v1/privacy/deactivate',undefined,200),'deactivated',true);await negative(retired,'GET','/v1/me/preferences',undefined,401);
  scalar(await call(pro,'DELETE','/v1/professional-capabilities/'+role.id),'ok',true);assert.ok(!(await call(pro,'GET','/v1/professional-capabilities')).some(r=>r.roleId===role.id));
  stage='complete-positive-contract-catalog';
  const missing=catalog.routes.filter(r=>!positives.has(r.method+' '+r.path));console.log('BACKEND_POSITIVE_CONTRACT_CATALOG '+JSON.stringify({controllers:catalog.controllers.length,registeredRoutes:catalog.routes.length,observedPositiveRoutes:positives.size,missing:missing.map(r=>r.method+' '+r.path)}));assert.equal(missing.length,1,'Only final signout is deferred until denial checks');assert.equal(missing[0].path,'/v1/auth/signout');
  stage='invalid-input-and-permission-contracts';
  const ownBefore=await snapshot(owner.tenant);
  const invalid=[
   [pro,'POST','/v1/availability/mine',{startsAt:'2026-02-30T10:00:00Z',endsAt:'2026-03-01T10:00:00Z'}],
   [pro,'PUT','/v1/professional-profile',{displayName:[]}],
   [pro,'PUT','/v1/professional-capabilities/'+role.id,{skills:[1]}],
   [owner,'POST','/v1/company/jobs',{title:'invalid',startsAt:'bad'}],
   [owner,'POST','/v1/company/teams',[]],
   [owner,'POST','/v1/company/planner/'+jobId+'/team-plan',{requirements:[{role:'Bartender',count:0}]}],
   [owner,'POST','/v1/company/talent-pools',{professionalId:pro.professionalId,pool:'invalid'}],
   [owner,'POST','/v1/company/trust-events',{professionalId:pro.professionalId,eventType:'invalid'}],
   [owner,'POST','/v1/company/conversions',{assignmentId:assignment,modality:'invalid'}],
   [owner,'POST','/v1/company/integrity/cases',{assignmentId:assignment,kind:'invalid',evidence:'fixture'}],
   [pro,'POST','/v1/terms/accept',{}],
   [pro,'POST','/v1/copilot/interpret',{text:'fixture',mode:'invalid'}],
   [pro,'POST','/v1/copilot/read',{tool:'mutate_database'}],
   [pro,'POST','/v1/privacy/requests',{requestType:'correction',details:[]}],
   [pro,'POST','/v1/support-cases',{}],
   [pro,'POST','/v1/support-cases/intent',{}],
   [pro,'POST','/v1/safety-cases',{category:'invalid',description:'fixture'}],
   [pro,'POST','/v1/safety-appeals',{safetyCaseId:safety.id,reason:''}],
   [owner,'POST','/v1/company/members/invitations',{email:'invalid',role:'admin'}]
  ];
  for(const row of invalid)await negative(...row);
  const validBodies={
   'CompanyJobsController':{professionalId:pro.professionalId},'PlannerController':{requirements:[{role:'Bartender',count:1}]},
   'TeamsController':{professionalId:pro.professionalId},'RatingsController':{score:5},'ReplacementController':{professionalId:sub.professionalId,reason:'fixture'},
   'SafetyAdminController':{status:'reviewing',note:'fixture'},'SafetyAppealsAdminController':{status:'reviewing',note:'fixture'},
   'SupportController':{status:'resolved',note:'fixture'},'IntegrityController':{decision:'unsubstantiated',note:'fixture'},
   'CareerConversionController':{decision:'accepted'},'CancellationController':{reason:'fixture'}
  };
  for(const r of catalog.routes.filter(r=>r.path.includes(':')&&!['ProfessionalCapabilitiesController','VerticalPacksController','TalentPoolsController','PlatformSupportController'].includes(r.controller))){
   const path=r.path.replace(/:[^/]+/g,'not-a-uuid');const actor=r.path.endsWith('/company-rating')||['JobsController','CareerConversionController','WorkAssignmentsController','NotificationsController','CancellationController'].includes(r.controller)?pro:owner;
   // company/conversions has no path parameter; professional respond is identity-owned.
   await negative(actor,r.method,path,r.method==='GET'||r.method==='DELETE'?undefined:validBodies[r.controller]??{});
  }
  for(const name of ['constructor','__proto__','toString','hasOwnProperty','not-a-pack'])await negative(null,'GET','/v1/vertical-packs/'+name,undefined,404);
  await negative(null,'POST','/v1/payments/webhook',event,403);
  // Foreign and anonymous probes use valid fixture IDs and payloads: authorization, not malformed input, must reject them.
  for(const r of catalog.routes.filter(r=>r.tenantHeader)){
   const path=r.path.replace(/:jobId/g,jobId).replace(/:teamId/g,team.id).replace(/:assignmentId/g,assignment).replace(/:professionalId/g,pro.professionalId).replace(/:pool/g,'preferred').replace(/:id/g,assignment);
   // Copilot decides account type before membership; provide an allowed company tool to reach the tenant boundary.
   const body=r.controller==='CopilotController'?{tool:'company_dashboard'}:validBodies[r.controller]??{};
   await negative({...foreign,tenant:owner.tenant},r.method,path,r.method==='GET'||r.method==='DELETE'?undefined:body,401);
   await negative({tenant:owner.tenant},r.method,path,r.method==='GET'||r.method==='DELETE'?undefined:body,401);
  }
  const publicContracts=new Set(['GET /v1/health/ready','GET /v1/vertical-packs','GET /v1/vertical-packs/:id','GET /v1/taxonomy/roles','POST /v1/auth/signup','POST /v1/auth/signin','POST /v1/payments/webhook']);
  for(const r of catalog.routes.filter(r=>!r.tenantHeader&&!publicContracts.has(r.method+' '+r.path))){const path=r.path.replace(/:roleId/g,role.id).replace(/:[^/]+/g,assignment);await negative(null,r.method,path,r.method==='GET'||r.method==='DELETE'?undefined:{},401);}
  for(const [method,path,body]of [['GET','/v1/company/members'],['GET','/v1/company/payment-events'],['GET','/v1/company/safety-cases'],['POST','/v1/verification/business/request'],['POST','/v1/company/integrity/cases',{assignmentId:assignment,kind:'other',evidence:'fixture'}]])await negative(pro,method,path,body,403);
  assert.deepEqual(await snapshot(owner.tenant),ownBefore,'Rejected commands must not change owned tenant rows');assert.deepEqual(await snapshot(foreign.tenant),foreignBefore,'Other tenant rows must remain byte-equivalent');assert.deepEqual(await security(),policiesBefore,'No security policy changes');
  scalar(await call(pro,'POST','/v1/auth/signout'),'ok',true);await negative(pro,'GET','/v1/me',undefined,401);await negative(retired,'GET','/v1/me',undefined,401);
  assert.equal(positives.size,114);
  console.log('BACKEND_CONTRACT_COVERAGE_OBSERVED '+JSON.stringify({controllers:45,routes:114,positiveRoutes:positives.size,negativeCases:negatives.length,requests,violations,routeContracts:catalog.routes.map(r=>({method:r.method,path:r.path,positiveRequests:positives.get(r.method+' '+r.path)})),controllerGitBlobs:catalog.sources}));
  assert.equal(violations.length,0,'Real HTTP contract violations require correction');
  openapi.finish(requests);
  console.log('BACKEND_INTERNAL_ACCEPTANCE_HTTP_PG_PASS '+JSON.stringify({registeredControllers:45,inventoriedRoutes:114,allRoutesPositive:true,actualHTTPPostgres:true,invalidInputAndAuth:true,allTenantHeaderRoutesDeniedForeignAndAnonymous:true,otherTenantAll27TablesUnchanged:true,policyCatalogUnchanged:true,confirmedCompletedLedgerAndReviews:true,humanReplacementAndCancellation:true,safetySupportAuditAndConversion:true,simulatedSignedWebhookOnly:true,providerKYCStillPending:true,requests,nativeUI:false,externalPentest:false,production:false}));
 }finally{await db.end();}
}
if(require.main===module){if(process.argv.includes('--inventory-only'))console.log(JSON.stringify(inventory()));else main().catch(()=>{console.error('BACKEND_INTERNAL_ACCEPTANCE_FAIL '+JSON.stringify({stage,lastContract,details:'contract_assertion; no response body, identity, token or raw error exported'}));process.exitCode=1;});}
