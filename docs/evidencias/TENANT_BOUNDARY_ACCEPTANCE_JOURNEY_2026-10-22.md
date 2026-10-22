# Área 7 — prova integrada de fronteiras — 22/10/2026

Estado: CANDIDATA, não aceita. Base main e88f8d4ff9f11b92e82b4c9510c50c4607ca09a8, árvore4240cf171ebe069fe28eda498221ea6dd642f21a. Critério: ADR-MT-001 e matriz7 requerem inventário integral, RLS/ACL, contexto por transação, negação cruzada e caminhos privilegiados explícitos. Não é aceite global de segurança8/backend11 nem pentest externo.

Esta entrega executa um teste integrado real no PostgreSQL e HTTP descartáveis da CI, usando somente a configuração loopback já guardada por professional-chronology-e2e. Todas as 44 tabelas públicas têm classificação explícita:27 TENANT e17 exceções PLATFORM/NETWORK_SHARED/PROFESSIONAL_OWNED. Os escopos globais/de identidade seguem ADR e migrações; não recebem tenant artificial. A declaração de ACL é exigência a verificar, não resultado presumido.

Dois tenants e dois profissionais são criados por HTTP. Dados sintéticos válidos populam cada uma das27 tabelas dentro de uma transação revertida. App_runtime real tenta SELECT sem filtro, INSERT estrangeiro e reatribuição de tenant; UPDATE/DELETE cruzados devem filtrar zero ou negar por ACL imutável. Falhas de FK/unique não contam como prova de autorização. Contexto ausente e inválido falham fechados. Snapshots das duas empresas e metadata ACL/policies devem ficar idênticos. Sem DDL/TRUNCATE/grants/ALTER ROLE/bypass na fixture.

A classe DatabaseService compilada real roda com Pool PostgreSQL real de uma conexão, verificando PID idêntico, alternânciaA/B, COMMIT e callback com erro/ROLLBACK, role/contexto limpos. Não é mock, nem prova de rollback SQL falho.

Inventário real das43 classes registradas/106 rotas, derivado dos decoradores e confrontado com AppModule. Cada uma das74 rotas com header tenant recebe sessão de owner estrangeiro e ausência de sessão: exige401. As32 rotas restantes são inventariadas, não convertidas em tenant por aproximação; auth/publicação pública/taxonomia, identidades e webhook têm contratos próprios. Não alegar que148 negativas são jornadas positivas completas de106 rotas. Auth/empresa/profissional/matching/ledger/alertas já têm jornadas próprias obrigatórias na mesma CI.

Suspeitas a reproduzir, SEM defeito afirmado antecipadamente:0056 concede SELECT/INSERT em terms_acceptances a app_runtime, embora TermsController opere por identidade em conexão base;0058 concede IUD em professional_capabilities, embora seus writes sejam pela identidade e Planner só precise SELECT. O teste registra INSERT real para outra identidade e UPDATE real de outro profissional, sempre revertidos, e exige42501. Se a CI provar a permissão excessiva, corrigir em migração aditiva mínima, mantendo os mesmos asserts. Não inventar falha de API nem exploração em produção.

Gates: Node syntax/local guard apenas localmente; PostgreSQL/Nest/HTTP reais somente CI. APK N/A para scripts/testes/docs/migração fora do grafoExpo→Gradle; nenhum mobile/deps/lock/workflow/buildsmoke é modificado. Exigir comparação integral dos insumos antes de integrar. CI completa própria e literal pós-merge obrigatórias. Não rerodar mesmoSHA para verde. Áreas aceitas2,3,4,5,6,9,10; pendentes1,7,8,11,12,13 até decisão com cadeia completa.

Preservar React19.1.4/RN0.81.6/lock, tenant/RLS/LGPD, 12controles de browser+canonical/NetLog failclosed/CDPFetchCORSsandboxLNA/15s/asserts. Sem produção/PSP/dinheiro/serviço externo/credenciais/pentest/aparelho físico. #574/#565 continuam drafts. #605 e aceite6 já integrados; #584 já redundante, sem reabertura.

## Inventário das rotas na base auditada

|Método|Rota|Fronteira desta prova|
|---|---|---|
|POST|`/v1/auth/signup`|Contrato global/identidade/operador separado; apenas inventário aqui|
|POST|`/v1/auth/signin`|Contrato global/identidade/operador separado; apenas inventário aqui|
|POST|`/v1/auth/signout`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/availability/mine`|Contrato global/identidade/operador separado; apenas inventário aqui|
|POST|`/v1/availability/mine`|Contrato global/identidade/operador separado; apenas inventário aqui|
|POST|`/v1/assignments/:id/cancel`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/conversions`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/conversions`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/career/conversions/:id/respond`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/career/progress`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/company/analytics`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/dashboard`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/dashboard/assignments`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/dashboard/completed`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/jobs`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/jobs`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/jobs/:jobId/candidates`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/jobs/:jobId/recommendations`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/jobs/:jobId/confirm`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/members`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/members/invitations`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/members/invitations`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/members/invitations/:id/revoke`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/members/invitations/accept`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/conversations/:assignmentId/messages`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/conversations/:assignmentId/messages`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/copilot/read`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/copilot/interpret`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/earnings/mine`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/health/ready`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/company/integrity/cases`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/integrity/cases`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/integrity/cases/:id/review`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/jobs`|Contrato global/identidade/operador separado; apenas inventário aqui|
|POST|`/v1/jobs/:jobId/interest`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/jobs/:jobId/interest`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/me`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/me/support-contexts`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/notifications/unread-count`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/notifications/mine`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/notifications/:id/read`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/payment-events/reconciliation`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/payment-events`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/payments/webhook`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/company/planner`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/planner/:jobId/team-plan`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/privacy/requests`|Contrato global/identidade/operador separado; apenas inventário aqui|
|POST|`/v1/privacy/requests`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/privacy/export`|Contrato global/identidade/operador separado; apenas inventário aqui|
|POST|`/v1/privacy/deactivate`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/professional-capabilities`|Contrato global/identidade/operador separado; apenas inventário aqui|
|PUT|`/v1/professional-capabilities/:roleId`|Contrato global/identidade/operador separado; apenas inventário aqui|
|DELETE|`/v1/professional-capabilities/:roleId`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/planner/my-week`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/professional-profile`|Contrato global/identidade/operador separado; apenas inventário aqui|
|PUT|`/v1/professional-profile`|Contrato global/identidade/operador separado; apenas inventário aqui|
|POST|`/v1/assignments/:id/rating`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/assignments/:id/company-rating`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/replacements`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/replacements/:id/candidates`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/replacements/:id/auto-match`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/replacements/:id/select`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/replacements/:assignmentId`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/safety-cases`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/safety-cases/:id/events`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/safety-cases/:id/status`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/safety-appeals/mine`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/safety-appeals`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/safety-appeals`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/safety-appeals/:id/events`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/safety-appeals/:id/status`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/safety-cases/mine`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/safety-cases`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/support-cases/intent`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/support-cases`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/support-cases/mine`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/exceptions`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/support-cases/:id/status`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/talent-pools`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/talent-pools`|Tenant: owner estrangeiro e anônimo401|
|DELETE|`/v1/company/talent-pools/:pool/:professionalId`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/taxonomy/roles`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/company/teams/:teamId/allocation/:jobId`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/teams`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/teams/:id/members`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/teams`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/teams/:id/members`|Tenant: owner estrangeiro e anônimo401|
|DELETE|`/v1/company/teams/:id/members/:professionalId`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/terms/status`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/terms/acceptances`|Contrato global/identidade/operador separado; apenas inventário aqui|
|POST|`/v1/terms/accept`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/company/trust-events/:professionalId`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/company/trust-events`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/verification/mine`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/verification/mine/request`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/verification/business`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/verification/business/request`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/vertical-packs`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/vertical-packs/:id`|Contrato global/identidade/operador separado; apenas inventário aqui|
|GET|`/v1/assignments/mine`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/assignments/:id/check-in`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/assignments/:id/start`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/assignments/:id/check-out`|Tenant: owner estrangeiro e anônimo401|
|POST|`/v1/assignments/:id/complete`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/company/work-graph`|Tenant: owner estrangeiro e anônimo401|
|GET|`/v1/work-passport/mine`|Tenant: owner estrangeiro e anônimo401|

## Fonte integral da prova

```js
'use strict';
// Whole-schema adversarial fixture. Only the disposable loopback CI database is eligible.
const assert=require('node:assert/strict');
const {readFileSync,readdirSync}=require('node:fs');
const {resolve}=require('node:path');
const {createRequire}=require('node:module');
const {randomUUID,createHash}=require('node:crypto');
const {localConfiguration,requireLocalDatabasePeer}=require('./professional-chronology-e2e.cjs');
const tenantTables=['assignment_cancellations','company_jobs','company_member_invitations','company_work_ratings','conversation_messages','conversations','direct_hire_conversions','earnings_ledger','job_interests','marketplace_integrity_cases','notifications','payment_events','professional_availability','replacement_requests','safety_case_appeal_events','safety_case_appeals','safety_case_events','safety_cases','support_cases','talent_pool_members','tenant_memberships','trust_events','verification_cases','work_assignments','work_ratings','workforce_team_members','workforce_teams'];
// Explicit exceptions to TENANT, per ADR-MT-001 and the introducing migrations.
// These are not assigned an artificial tenant: authentication/identity APIs enforce their owner.
const otherScopes={
 tenants:'PLATFORM',identities:'PLATFORM',sessions:'PLATFORM',auth_signin_limits:'PLATFORM',terms_acceptances:'PLATFORM',taxonomy_roles:'PLATFORM',schema_migrations:'PLATFORM',
 privacy_legal_holds:'PLATFORM',privacy_requests:'PLATFORM',privacy_retention_runs:'PLATFORM',privacy_legal_hold_reviews:'PLATFORM',
 professional_profiles:'PROFESSIONAL_OWNED',professional_capabilities:'PROFESSIONAL_OWNED',professional_availability_network:'PROFESSIONAL_OWNED',
 marketplace_jobs:'NETWORK_SHARED',marketplace_interests:'NETWORK_SHARED',marketplace_company_reputation:'NETWORK_SHARED'
};
const readable=new Set(['professional_profiles','professional_capabilities','professional_availability_network','marketplace_jobs','marketplace_interests','marketplace_company_reputation','taxonomy_roles']);
let stage='local-configuration';
function check(value,label){if(!value)throw Error(label);}
const hash=s=>createHash('sha1').update('blob '+Buffer.byteLength(s)+'\0').update(s).digest('hex');
function inventory(){
 const directory=resolve('apps/api/src'),controllers=[],routes=[],sources={};
 for(const file of readdirSync(directory).filter(x=>x.endsWith('controller.ts')).sort()){
  const source=readFileSync(resolve(directory,file),'utf8');sources[file]=hash(source);
  const classes=[...source.matchAll(/@Controller\((?:'([^']*)')?\)\s*export class (\w+)/g)];
  for(let i=0;i<classes.length;i++){
   const current=classes[i];controllers.push(current[2]);const span=source.slice(current.index+current[0].length,classes[i+1]?.index??source.length);
   const methods=[...span.matchAll(/@(Get|Post|Put|Patch|Delete)\((?:'([^']*)')?\)/g)];
   for(let j=0;j<methods.length;j++){
    const method=methods[j],body=span.slice(method.index+method[0].length,methods[j+1]?.index??span.length);
    routes.push({controller:current[2],method:method[1].toUpperCase(),path:'/v1/'+[current[1],method[2]].filter(Boolean).map(x=>x.replace(/^\/|\/$/g,'')).join('/'),tenantHeader:body.includes("@Headers('x-tenant-id')")});
   }
  }
 }
 const module=readFileSync(resolve(directory,'app.module.ts'),'utf8');
 const registered=module.match(/controllers:\s*\[([^\]]+)\]/s)?.[1].match(/\w+Controller/g);
 assert.deepEqual([...controllers].sort(),[...registered].sort(),'Every registered controller must be inventoried');
 check(new Set(routes.map(r=>r.method+' '+r.path)).size===routes.length,'unique_routes');
 check(controllers.length===43&&routes.length===106&&routes.filter(r=>r.tenantHeader).length===74,'review_scope_drift_requires_explicit_reconciliation');
 return{controllers,routes,sources};
}
async function main(){
 const config=localConfiguration(process.env),routeInventory=inventory();
 const {Client,Pool}=createRequire(resolve('apps/api/package.json'))('pg');
 const db=new Client({connectionString:config.databaseUrl,connectionTimeoutMillis:5000});await db.connect();
 const tokens=new Set(),violations=[],results=[];let requests=0,transaction=false;
 try{
  requireLocalDatabasePeer((await db.query('SELECT current_database() name')).rows[0],db.connection.stream.remoteAddress);
  const stamp=randomUUID(),password='TenantBoundary-'+randomUUID()+'!';
  async function call(actor,tenant,path,method='GET',body,status=200){
   check(/^\/v1\/[a-zA-Z0-9/_.-]+$/.test(path),'local_route_only');requests++;
   const r=await fetch(config.origin+path,{method,redirect:'error',signal:AbortSignal.timeout(15000),headers:{...(actor?{authorization:'Bearer '+actor.token}:{}),...(tenant?{'x-tenant-id':tenant}:{}),...(body===undefined?{}:{'content-type':'application/json'})},...(body===undefined?{}:{body:JSON.stringify(body)})});
   check(r.status===status,'http_'+method+'_'+path.replace(/[0-9a-f]{8}-[0-9a-f-]{27}/g,'UUID')+'_'+r.status+'_expected_'+status);return r.json();
  }
  async function account(label,type){
   const email='tenant-boundary-'+label+'-'+stamp+'@example.test';
   const signup=await call(null,null,'/v1/auth/signup','POST',{email,password,accountType:type,...(type==='company'?{workspaceName:'Boundary '+label}:{})},201);
   const auth=await call(null,null,'/v1/auth/signin','POST',{email,password},201);check(auth.identity.id===signup.id,'real_identity_binding');tokens.add(auth.accessToken);
   return{id:signup.id,tenant:signup.tenantId,token:auth.accessToken};
  }
  stage='fresh-http-owners-and-professionals';
  const owners=[await account('company-a','company'),await account('company-b','company')],pros=[await account('professional-a','professional'),await account('professional-b','professional')];
  const iso=h=>new Date(Date.now()+h*3600000).toISOString();
  for(let i=0;i<2;i++){
   pros[i].profile=(await call(pros[i],null,'/v1/professional-profile','PUT',{displayName:'Boundary '+i,homeCity:'São Paulo',primaryRole:'Bartender'})).id;
   await call(pros[i],null,'/v1/terms/accept','POST',{termsKey:'boundary-fixture',version:stamp,identityId:pros[1-i].id},201);
   await call(pros[i],null,'/v1/professional-capabilities/hospitality.bartender','PUT',{skills:['bar_setup'],certifications:[],provenLevel:'entry',professionalId:pros[1-i].profile});
   owners[i].job=(await call(owners[i],owners[i].tenant,'/v1/company/jobs','POST',{title:'Boundary committed '+i,requiredRole:'Bartender',workCity:'São Paulo',startsAt:iso(72),endsAt:iso(80),payCents:1234},201)).id;
  }
  const catalog=async()=>({tables:(await db.query("SELECT c.relname,c.relrowsecurity,c.relforcerowsecurity,c.relowner::regrole::text owner,c.relacl::text FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='public' AND c.relkind IN('r','p') ORDER BY c.relname")).rows,policies:(await db.query("SELECT * FROM pg_policies WHERE schemaname='public' ORDER BY tablename,policyname")).rows});
  stage='explicit-whole-schema-scope-and-role';const beforeSecurity=await catalog();
  assert.deepEqual(beforeSecurity.tables.map(x=>x.relname),[...tenantTables,...Object.keys(otherScopes)].sort(),'Unclassified table is a hard failure');
  const role=(await db.query("SELECT rolsuper,rolbypassrls,rolcreatedb,rolcreaterole FROM pg_roles WHERE rolname='app_runtime'")).rows[0];check(role&&Object.values(role).every(x=>x===false),'runtime_nonprivileged_role');
  check((await db.query("SELECT count(*)::int count FROM pg_auth_members m JOIN pg_roles r ON r.oid=m.member WHERE r.rolname='app_runtime'")).rows[0].count===0,'no_inherited_role_escalation');
  for(const table of tenantTables){
   const entry=beforeSecurity.tables.find(x=>x.relname===table);check(entry.relrowsecurity&&entry.relforcerowsecurity&&entry.owner!=='app_runtime','forced_RLS_'+table);
   check((await db.query("SELECT attnotnull FROM pg_attribute WHERE attrelid=$1::regclass AND attname='tenant_id' AND NOT attisdropped",[table])).rows[0]?.attnotnull,'not_null_tenant_'+table);
   check(beforeSecurity.policies.some(x=>x.tablename===table&&x.qual&&x.with_check),'read_and_write_policy_'+table);
  }
  // Seed one valid row per TENANT table per company. This is not an API-positive
  // witness for these business states. Every seed/probe below is rolled back.
  stage='rollback-only-valid-fixture-graph';await db.query('BEGIN');transaction=true;
  const seedRows={};
  async function insert(table,row){
   check(tenantTables.includes(table),'explicit_seed_table');const keys=Object.keys(row);
   const r=await db.query('INSERT INTO public.'+table+'('+keys.join(',')+') VALUES('+keys.map((_,i)=>'$'+(i+1)).join(',')+') RETURNING to_jsonb('+table+') row',Object.values(row));
   (seedRows[table]??=[]).push(r.rows[0].row);
  }
  for(let i=0;i<2;i++){
   const tenant=owners[i].tenant,identity=pros[i].id,professional=pros[i].profile,job=randomUUID(),assignment=randomUUID(),team=randomUUID(),conversation=randomUUID(),safety=randomUUID(),appeal=randomUUID();
   await insert('tenant_memberships',{id:randomUUID(),tenant_id:tenant,subject_id:identity,identity_id:identity,role:'professional'});
   await insert('company_jobs',{id:job,tenant_id:tenant,title:'Boundary rollback fixture',status:'open',required_role:'Bartender',work_city:'São Paulo',starts_at:iso(96),ends_at:iso(104),pay_cents:1000});
   await insert('work_assignments',{id:assignment,tenant_id:tenant,job_id:job,professional_id:professional,status:'confirmed'});
   await insert('job_interests',{id:randomUUID(),tenant_id:tenant,job_id:job,professional_id:professional,status:'interested'});
   await insert('earnings_ledger',{id:randomUUID(),tenant_id:tenant,assignment_id:assignment,professional_id:professional,amount_cents:1000,status:'payable'});
   await insert('work_ratings',{id:randomUUID(),tenant_id:tenant,assignment_id:assignment,rater_identity_id:owners[i].id,professional_id:professional,score:4});
   await insert('company_work_ratings',{id:randomUUID(),tenant_id:tenant,assignment_id:assignment,rater_identity_id:identity,professional_id:professional,score:4});
   await insert('professional_availability',{id:randomUUID(),tenant_id:tenant,professional_id:professional,starts_at:iso(90),ends_at:iso(110)});
   await insert('talent_pool_members',{id:randomUUID(),tenant_id:tenant,professional_id:professional,pool:'preferred'});
   await insert('replacement_requests',{id:randomUUID(),tenant_id:tenant,assignment_id:assignment,status:'open',reason:'Synthetic boundary fixture'});
   await insert('workforce_teams',{id:team,tenant_id:tenant,name:'Synthetic boundary team'});
   await insert('workforce_team_members',{team_id:team,professional_id:professional,tenant_id:tenant});
   await insert('notifications',{id:randomUUID(),tenant_id:tenant,identity_id:identity,type:'boundary_fixture',title:'Synthetic boundary fixture',body:'Synthetic boundary fixture'});
   await insert('conversations',{id:conversation,tenant_id:tenant,assignment_id:assignment});
   await insert('conversation_messages',{id:randomUUID(),tenant_id:tenant,conversation_id:conversation,sender_identity_id:identity,body:'Synthetic boundary fixture'});
   await insert('trust_events',{id:randomUUID(),tenant_id:tenant,assignment_id:assignment,professional_id:professional,event_type:'incident'});
   await insert('payment_events',{id:randomUUID(),tenant_id:tenant,assignment_id:assignment,event_type:'authorized',amount_cents:1000,idempotency_key:randomUUID(),provider:'internal_fixture'});
   await insert('safety_cases',{id:safety,tenant_id:tenant,reporter_identity_id:identity,assignment_id:assignment,category:'other',description:'Synthetic boundary fixture',status:'open'});
   await insert('verification_cases',{id:randomUUID(),tenant_id:tenant,subject_type:'identity',identity_id:identity,status:'pending'});
   await insert('safety_case_events',{id:randomUUID(),tenant_id:tenant,safety_case_id:safety,actor_identity_id:owners[i].id,from_status:'open',to_status:'reviewing'});
   await insert('safety_case_appeals',{id:appeal,tenant_id:tenant,safety_case_id:safety,appellant_identity_id:identity,reason:'Synthetic boundary fixture'});
   await insert('safety_case_appeal_events',{id:randomUUID(),tenant_id:tenant,appeal_id:appeal,actor_identity_id:owners[i].id,from_status:'submitted',to_status:'reviewing'});
   await insert('company_member_invitations',{id:randomUUID(),tenant_id:tenant,email:'boundary-invite-'+i+'-'+stamp+'@example.test',role:'manager',token_hash:createHash('sha256').update(randomUUID()).digest('hex'),invited_by_identity_id:owners[i].id,expires_at:iso(24)});
   await insert('direct_hire_conversions',{id:randomUUID(),tenant_id:tenant,professional_id:professional,source_assignment_id:assignment,modality:'permanent',proposed_by_identity_id:owners[i].id,status:'proposed'});
   await insert('marketplace_integrity_cases',{id:randomUUID(),tenant_id:tenant,assignment_id:assignment,kind:'other',evidence:'Synthetic boundary fixture',status:'open',created_by_identity_id:owners[i].id});
   await insert('support_cases',{id:randomUUID(),tenant_id:tenant,reporter_identity_id:identity,assignment_id:assignment,category:'other',description:'Synthetic boundary fixture',priority:'normal',status:'open'});
   await insert('assignment_cancellations',{id:randomUUID(),tenant_id:tenant,assignment_id:assignment,initiator_identity_id:owners[i].id,reason:'Synthetic boundary fixture',initiator_kind:'company'});
  }
  assert.deepEqual(Object.keys(seedRows).sort(),tenantTables);
  const tenantSnapshot=async()=>{const rows={};for(const table of tenantTables)rows[table]=(await db.query('SELECT to_jsonb(t) row FROM public.'+table+' t WHERE tenant_id=ANY($1::uuid[]) ORDER BY to_jsonb(t)::text',[owners.map(x=>x.tenant)])).rows;return rows;};
  const beforeRows=await tenantSnapshot();
  async function probe(sql,values=[]){
   await db.query('SAVEPOINT boundary_probe');let outcome;
   try{const r=await db.query(sql,values);outcome={code:null,rowCount:r.rowCount,rows:r.rows};}catch(e){outcome={code:e.code??null,rowCount:null};}
   await db.query('ROLLBACK TO SAVEPOINT boundary_probe');await db.query('RELEASE SAVEPOINT boundary_probe');return outcome;
  }
  stage='all-tenant-RLS-negative-operations';await db.query('SET LOCAL ROLE app_runtime');
  for(let index=0;index<2;index++){
   const own=owners[index].tenant,foreign=owners[1-index].tenant;await db.query("SELECT set_config('app.tenant_id',$1,true)",[own]);
   for(const table of tenantTables){
    const visible=await db.query('SELECT DISTINCT tenant_id FROM public.'+table);check(visible.rows.length===1&&visible.rows[0].tenant_id===own,'select_isolation_'+table);
    for(const method of ['UPDATE','DELETE']){
     const sql=method==='UPDATE'?'UPDATE public.'+table+' SET tenant_id=tenant_id WHERE tenant_id=$1':'DELETE FROM public.'+table+' WHERE tenant_id=$1';const p=await probe(sql,[foreign]);
     check(p.code==='42501'||(p.code===null&&p.rowCount===0),'foreign_'+method+'_'+table);results.push({table,method,result:p.code==='42501'?'ACL_DENIED':'RLS_FILTERED'});
    }
    const foreignRow=seedRows[table][1-index],columns=Object.keys(foreignRow);
    const insertion=await probe('INSERT INTO public.'+table+'('+columns.join(',')+') SELECT '+columns.join(',')+' FROM jsonb_populate_record(NULL::public.'+table+',$1::jsonb)',[JSON.stringify(foreignRow)]);
    check(insertion.code==='42501','foreign_insert_requires_authorization_denial_not_constraint_'+table);
    const move=await probe('UPDATE public.'+table+' SET tenant_id=$1 WHERE tenant_id=$2',[foreign,own]);check(move.code==='42501','tenant_rebind_rejected_'+table);
   }
  }
  await db.query("SELECT set_config('app.tenant_id','',true)");
  for(const table of tenantTables)check((await db.query('SELECT 1 FROM public.'+table)).rowCount===0,'missing_context_deny_'+table);
  await db.query("SELECT set_config('app.tenant_id','not-a-uuid',true)");
  for(const table of tenantTables)check((await probe('SELECT 1 FROM public.'+table)).code==='22P02','invalid_context_deny_'+table);
  await db.query("SELECT set_config('app.tenant_id',$1,true)",[owners[0].tenant]);
  stage='explicit-global-and-professional-runtime-ACL';
  for(const table of Object.keys(otherScopes).sort()){
   const selected=await probe('SELECT 1 FROM public.'+table+' LIMIT 1');
   if(readable.has(table))check(selected.code===null,'required_read_permission_'+table);
   else if(selected.code!=='42501')violations.push({table,method:'SELECT',code:selected.code});
   for(const method of ['INSERT','UPDATE','DELETE']){
    // Catalog-derived real column avoids relying on a constraint failure as an ACL denial.
    const name=(await db.query('SELECT attname FROM pg_attribute WHERE attrelid=$1::regclass AND attnum>0 AND NOT attisdropped ORDER BY attnum LIMIT 1',[table])).rows[0].attname;
    const sql=method==='INSERT'?'INSERT INTO public.'+table+' DEFAULT VALUES':method==='UPDATE'?'UPDATE public.'+table+' SET '+name+'='+name+' WHERE false':'DELETE FROM public.'+table+' WHERE false';
    const p=await probe(sql);if(p.code!=='42501')violations.push({table,method,code:p.code,rowCount:p.rowCount});
   }
  }
  // Concrete owner-forgery probes, not permission metadata alone; both are always rolled back.
  const forged=await probe('INSERT INTO terms_acceptances(identity_id,terms_key,version) VALUES($1,$2,$3)',[pros[1].id,'forged-by-tenant-a',stamp]);
  const tampered=await probe("UPDATE professional_capabilities SET skills=ARRAY['guest_service'] WHERE professional_id=$1 AND role_id='hospitality.bartender'",[pros[1].profile]);
  for(const [table,method,p]of [['terms_acceptances','INSERT_FOREIGN_IDENTITY',forged],['professional_capabilities','UPDATE_FOREIGN_PROFESSIONAL',tampered]]){
   console.log('TENANT_BOUNDARY_OWNER_WRITE_OBSERVED '+JSON.stringify({table,method,sqlstate:p.code,rowCount:p.rowCount,rolledBack:true}));if(p.code!=='42501')violations.push({table,method,code:p.code,rowCount:p.rowCount});
  }
  await db.query('RESET ROLE');assert.deepEqual(await tenantSnapshot(),beforeRows,'All adversarial tenant operations preserve both graphs byte-for-byte in JSON');
  await db.query('ROLLBACK');transaction=false;assert.deepEqual(await catalog(),beforeSecurity,'No policy/ACL/schema changes from fixture');
  console.log('TENANT_BOUNDARY_ALL_TABLES_PASS '+JSON.stringify({classifiedTables:beforeSecurity.tables.length,tenantTables:tenantTables.length,validTenantGraphs:2,readBothDirections:true,insertAndTenantRebindDenied:true,updateDeleteResults:results,missingAndInvalidContextDenied:true,fixtureGraphRolledBack:true}));
  stage='actual-DatabaseService-single-connection-reuse';
  const {DatabaseService}=require(resolve('apps/api/dist/database.service.js'));
  const pool=new Pool({connectionString:config.databaseUrl,max:1,connectionTimeoutMillis:5000});
  const service=Object.create(DatabaseService.prototype);service.pool=pool;
  try{
   const initial=(await service.query("SELECT pg_backend_pid() pid,current_user role,COALESCE(current_setting('app.tenant_id',true),'') tenant")).rows[0];
   for(const company of [...owners,...owners].reverse()){
    await service.tenant(company.tenant,async client=>{
     const current=(await client.query("SELECT pg_backend_pid() pid,current_user role,current_setting('app.tenant_id',true) tenant")).rows[0];check(current.pid===initial.pid&&current.role==='app_runtime'&&current.tenant===company.tenant,'same_connection_scoped_role');
     const jobs=(await client.query('SELECT tenant_id FROM company_jobs')).rows;check(jobs.length>0&&jobs.every(x=>x.tenant_id===company.tenant),'actual_service_RLS');
    });
    const failure=Error('fixture callback rollback');await assert.rejects(service.tenant(company.tenant,async()=>{throw failure;}),e=>e===failure);
    const reset=(await service.query("SELECT pg_backend_pid() pid,current_user role,COALESCE(current_setting('app.tenant_id',true),'') tenant")).rows[0];check(reset.pid===initial.pid&&reset.role===initial.role&&reset.tenant==='','commit_and_rollback_reset_role_context');
   }
  }finally{await service.onModuleDestroy();}
  stage='every-tenant-header-endpoint-denies-foreign-membership';
  const beforeHTTP=await db.query('SELECT count(*)::int count FROM tenant_memberships WHERE tenant_id=$1 AND identity_id=$2',[owners[1].tenant,owners[0].id]);check(beforeHTTP.rows[0].count===0,'foreign_owner_has_no_membership');
  let denied=0;
  for(const route of routeInventory.routes.filter(x=>x.tenantHeader)){
   const path=route.path.replace(/:pool\b/g,'preferred').replace(/:[A-Za-z]+/g,randomUUID());
   for(const actor of [owners[0],null]){await call(actor,owners[1].tenant,path,route.method,['POST','PUT','PATCH'].includes(route.method)?{}:undefined,401);denied++;}
  }
  // Owner-resolved APIs remain operational; client-supplied identity fields never redirect writes.
  for(const pro of pros){
   const terms=await call(pro,null,'/v1/terms/acceptances');check(terms.filter(x=>x.termsKey==='boundary-fixture'&&x.version===stamp).length===1,'terms_identity_scoped');
   const capabilities=await call(pro,null,'/v1/professional-capabilities');check(capabilities.some(x=>x.roleId==='hospitality.bartender'&&x.skills.length===1&&x.skills[0]==='bar_setup'),'capabilities_owner_unchanged');
  }
  for(const token of tokens)await call({token},null,'/v1/auth/signout','POST',{},201);tokens.clear();
  console.log('TENANT_BOUNDARY_ENDPOINTS_PASS '+JSON.stringify({registeredControllers:routeInventory.controllers.length,inventoriedRoutes:routeInventory.routes.length,tenantHeaderRoutes:denied/2,negativeHTTPRequests:denied,controllerSourceGitBlobs:routeInventory.sources,actualDatabaseServicePoolSize:1,commitAndRollbackReuse:true,identityAPIsRemainOperational:true,requests}));
  console.log('TENANT_BOUNDARY_RUNTIME_ACL_OBSERVED '+JSON.stringify({violations}));check(violations.length===0,'runtime_permissions_exceed_declared_scope');
  console.log('TENANT_BOUNDARY_ACCEPTANCE_HTTP_PG_PASS '+JSON.stringify({tenantTables:27,tableScopes:otherScopes,all106RoutesInventoried:true,all74TenantHeaderRoutesDeniedForeignAndAnonymous:true,globalAndIdentityRuntimeLeastPrivilege:true,realPostgreSQL:true,externalPentest:false,nativeUI:false,production:false}));
 }finally{
  if(transaction)await db.query('ROLLBACK');
  for(const token of tokens)await fetch(config.origin+'/v1/auth/signout',{method:'POST',redirect:'error',signal:AbortSignal.timeout(15000),headers:{authorization:'Bearer '+token}}).catch(()=>{});
  await db.end();
 }
}
main().catch(error=>{console.error('TENANT_BOUNDARY_ACCEPTANCE_HTTP_PG_FAIL '+JSON.stringify({stage,reason:/^[a-zA-Z0-9_ -]{1,160}$/.test(error.message)?error.message:'assertion_or_local_transport_failed',sqlstate:/^[A-Z0-9]{5}$/.test(error.code||'')?error.code:null}));process.exitCode=1;});
```
