# Correção de menor privilégio por identidade — 22/10/2026

Prova primária da própria CI39868876663/job120137968240/attempt1FAIL, HEAD e97c4b4c87698c75f56002482f2c41aed1913568. Checkout23:00:38.1648987Z sintético fd51980a49c99d1a492eb264e2cf8a03cf8e20d9, pais[e88f,e97c], árvorec05f4f0f287ebc48eab87c306c122f105883bc68 idêntica ao candidato.1936unit[217/1186/519/3/11]PASS0fail/skip/cancel, tipos/build/export/migrações2x/privacyPASS. Browser/ProductionTruth não executados porque o novo HTTPgate falhou antes deles. Zero rerun/cancel.

Dois defeitos comprovados sob SET LOCAL ROLE app_runtime e tenantA: INSERT de termos atribuído a outra identidade e UPDATE de habilidade de outro profissional tiveram rowCount1/SQLSTATEnull. Ambos em savepoints revertidos; nenhuma alteração persistente nem exploração de API/produção foi alegada. As27tabelasTENANT já passaram leitura bidirecional/insert/rebind/UPDATEDELETE/contexto ausente e inválido, com54linhas sintéticas válidas e snapshots/policies/ACL preservados. O pool real de uma conexão executou os asserts de alternância/COMMIT/ROLLBACK e chegou à etapaHTTP; não havia marcador separado naquele ponto.

O baseline falhou na etapa de negativas HTTP, com razão redigida e sem identificar qual rota. Não atribuir precisamente essa falha a uma rota como se fosse observação. A revisão de fonte identificou dois pré-requisitos da fixture: copilot/read valida tool antes de membership, portanto usar company_dashboard válido; work-passport resolve perfil antes de membership, portanto criar perfil real para o owner estrangeiro. Nenhum comportamento desses dois endpoints é alterado nem declarado defeito. A instrumentação de mismatch agora imprime somente método/caminhoUUID-redigido/status esperado/atual, sem sessão/headers/body/stack. Todos os74asserts401 e todas as expectativas42501 ficam obrigatórios; snapshots dos tenants passam também a cercar as chamadas HTTP.

Correção de produto: migração0072 revoga ALL de terms_acceptances paraapp_runtime e somente INSERT/UPDATE/DELETE deprofessional_capabilities, preservando SELECT necessário ao Planner. Nenhum novoGRANT/DDLdeRLS/ALTERROLE/credencial/bypass; as APIs identidade de TermsController eProfessionalCapabilitiesController continuam usando o caminho base explicitamente autenticado e filtrado, testado por JSON real. Não alterar migrações antigas, funçõesprivilegiadas, dadoshistóricos ou políticas. A mesma jornada permanece vermelha se um write indevido voltar.

Esta é correção de bloqueio indispensável à jornada de isolamento7, não aceite antecipado: áreas2,3,4,5,6,9,10 aceitas;1,7,8,11,12,13 pendentes. All44tabelas e106rotas inventariadas;74negativas tenant não substituem32contratos globais/identidade nem pentest8. No próximo SHA exigir CI completa própria + literal pós-merge, sem emprestar PASS de base. APK N/A comprovado:184insumosprotegidos/173mobile idênticos ao APK literal1b85403cafd9e17bceeb3ea47ce27fdf03c1496e; workflowfiltra mudançasAndroid e novoCJS/SQLnão é importado pelo grafoExpo→Gradle. Artifact12396378712unexpired/digest2f1b75... revalidado; não há APK desteSHA. Nada de produção/PSP/dinheiro/serviçoexterno/pentest/aparelhofísico/root/grants/bypass.

## Recortes primários integrais desta prova

```text
2026-10-22T23:03:22.2724558Z TENANT_BOUNDARY_OWNER_WRITE_OBSERVED {"table":"terms_acceptances","method":"INSERT_FOREIGN_IDENTITY","sqlstate":null,"rowCount":1,"rolledBack":true}
2026-10-22T23:03:22.2727365Z TENANT_BOUNDARY_OWNER_WRITE_OBSERVED {"table":"professional_capabilities","method":"UPDATE_FOREIGN_PROFESSIONAL","sqlstate":null,"rowCount":1,"rolledBack":true}
2026-10-22T23:03:22.2910038Z TENANT_BOUNDARY_ALL_TABLES_PASS {"classifiedTables":44,"tenantTables":27,"validTenantGraphs":2,"readBothDirections":true,"insertAndTenantRebindDenied":true,"updateDeleteResults":[{"table":"assignment_cancellations","method":"UPDATE","result":"ACL_DENIED"},{"table":"assignment_cancellations","method":"DELETE","result":"ACL_DENIED"},{"table":"company_jobs","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_jobs","method":"DELETE","result":"RLS_FILTERED"},{"table":"company_member_invitations","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_member_invitations","method":"DELETE","result":"ACL_DENIED"},{"table":"company_work_ratings","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_work_ratings","method":"DELETE","result":"ACL_DENIED"},{"table":"conversation_messages","method":"UPDATE","result":"RLS_FILTERED"},{"table":"conversation_messages","method":"DELETE","result":"RLS_FILTERED"},{"table":"conversations","method":"UPDATE","result":"RLS_FILTERED"},{"table":"conversations","method":"DELETE","result":"RLS_FILTERED"},{"table":"direct_hire_conversions","method":"UPDATE","result":"RLS_FILTERED"},{"table":"direct_hire_conversions","method":"DELETE","result":"ACL_DENIED"},{"table":"earnings_ledger","method":"UPDATE","result":"RLS_FILTERED"},{"table":"earnings_ledger","method":"DELETE","result":"ACL_DENIED"},{"table":"job_interests","method":"UPDATE","result":"RLS_FILTERED"},{"table":"job_interests","method":"DELETE","result":"RLS_FILTERED"},{"table":"marketplace_integrity_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"marketplace_integrity_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"notifications","method":"UPDATE","result":"RLS_FILTERED"},{"table":"notifications","method":"DELETE","result":"RLS_FILTERED"},{"table":"payment_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"payment_events","method":"DELETE","result":"ACL_DENIED"},{"table":"professional_availability","method":"UPDATE","result":"RLS_FILTERED"},{"table":"professional_availability","method":"DELETE","result":"RLS_FILTERED"},{"table":"replacement_requests","method":"UPDATE","result":"RLS_FILTERED"},{"table":"replacement_requests","method":"DELETE","result":"RLS_FILTERED"},{"table":"safety_case_appeal_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_appeal_events","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_case_appeals","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_appeals","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_case_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_events","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"safety_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"support_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"support_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"talent_pool_members","method":"UPDATE","result":"RLS_FILTERED"},{"table":"talent_pool_members","method":"DELETE","result":"RLS_FILTERED"},{"table":"tenant_memberships","method":"UPDATE","result":"RLS_FILTERED"},{"table":"tenant_memberships","method":"DELETE","result":"RLS_FILTERED"},{"table":"trust_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"trust_events","method":"DELETE","result":"ACL_DENIED"},{"table":"verification_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"verification_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"work_assignments","method":"UPDATE","result":"RLS_FILTERED"},{"table":"work_assignments","method":"DELETE","result":"RLS_FILTERED"},{"table":"work_ratings","method":"UPDATE","result":"RLS_FILTERED"},{"table":"work_ratings","method":"DELETE","result":"RLS_FILTERED"},{"table":"workforce_team_members","method":"UPDATE","result":"RLS_FILTERED"},{"table":"workforce_team_members","method":"DELETE","result":"RLS_FILTERED"},{"table":"workforce_teams","method":"UPDATE","result":"RLS_FILTERED"},{"table":"workforce_teams","method":"DELETE","result":"RLS_FILTERED"},{"table":"assignment_cancellations","method":"UPDATE","result":"ACL_DENIED"},{"table":"assignment_cancellations","method":"DELETE","result":"ACL_DENIED"},{"table":"company_jobs","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_jobs","method":"DELETE","result":"RLS_FILTERED"},{"table":"company_member_invitations","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_member_invitations","method":"DELETE","result":"ACL_DENIED"},{"table":"company_work_ratings","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_work_ratings","method":"DELETE","result":"ACL_DENIED"},{"table":"conversation_messages","method":"UPDATE","result":"RLS_FILTERED"},{"table":"conversation_messages","method":"DELETE","result":"RLS_FILTERED"},{"table":"conversations","method":"UPDATE","result":"RLS_FILTERED"},{"table":"conversations","method":"DELETE","result":"RLS_FILTERED"},{"table":"direct_hire_conversions","method":"UPDATE","result":"RLS_FILTERED"},{"table":"direct_hire_conversions","method":"DELETE","result":"ACL_DENIED"},{"table":"earnings_ledger","method":"UPDATE","result":"RLS_FILTERED"},{"table":"earnings_ledger","method":"DELETE","result":"ACL_DENIED"},{"table":"job_interests","method":"UPDATE","result":"RLS_FILTERED"},{"table":"job_interests","method":"DELETE","result":"RLS_FILTERED"},{"table":"marketplace_integrity_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"marketplace_integrity_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"notifications","method":"UPDATE","result":"RLS_FILTERED"},{"table":"notifications","method":"DELETE","result":"RLS_FILTERED"},{"table":"payment_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"payment_events","method":"DELETE","result":"ACL_DENIED"},{"table":"professional_availability","method":"UPDATE","result":"RLS_FILTERED"},{"table":"professional_availability","method":"DELETE","result":"RLS_FILTERED"},{"table":"replacement_requests","method":"UPDATE","result":"RLS_FILTERED"},{"table":"replacement_requests","method":"DELETE","result":"RLS_FILTERED"},{"table":"safety_case_appeal_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_appeal_events","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_case_appeals","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_appeals","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_case_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_events","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"safety_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"support_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"support_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"talent_pool_members","method":"UPDATE","result":"RLS_FILTERED"},{"table":"talent_pool_members","method":"DELETE","result":"RLS_FILTERED"},{"table":"tenant_memberships","method":"UPDATE","result":"RLS_FILTERED"},{"table":"tenant_memberships","method":"DELETE","result":"RLS_FILTERED"},{"table":"trust_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"trust_events","method":"DELETE","result":"ACL_DENIED"},{"table":"verification_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"verification_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"work_assignments","method":"UPDATE","result":"RLS_FILTERED"},{"table":"work_assignments","method":"DELETE","result":"RLS_FILTERED"},{"table":"work_ratings","method":"UPDATE","result":"RLS_FILTERED"},{"table":"work_ratings","method":"DELETE","result":"RLS_FILTERED"},{"table":"workforce_team_members","method":"UPDATE","result":"RLS_FILTERED"},{"table":"workforce_team_members","method":"DELETE","result":"RLS_FILTERED"},{"table":"workforce_teams","method":"UPDATE","result":"RLS_FILTERED"},{"table":"workforce_teams","method":"DELETE","result":"RLS_FILTERED"}],"missingAndInvalidContextDenied":true,"fixtureGraphRolledBack":true}
2026-10-22T23:03:22.4848096Z TENANT_BOUNDARY_ACCEPTANCE_HTTP_PG_FAIL {"stage":"every-tenant-header-endpoint-denies-foreign-membership","reason":"assertion_or_local_transport_failed","sqlstate":null}
```

## Migração integral

```sql
BEGIN;

-- Terms are resolved by authenticated identity on the explicit platform path,
-- never by a tenant-scoped runtime query. Do not permit runtime identity forgery.
REVOKE ALL ON terms_acceptances FROM app_runtime;

-- Owner-bound capability writes use the explicit identity path. Tenant planners
-- still need SELECT for matching; retain that read permission without widening it.
REVOKE INSERT, UPDATE, DELETE ON professional_capabilities FROM app_runtime;

COMMIT;
```

## Jornada integral após correção da fixture

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
   if(r.status!==status){console.log('TENANT_BOUNDARY_HTTP_STATUS_MISMATCH '+JSON.stringify({method,path:path.replace(/[0-9a-f]{8}-[0-9a-f-]{27}/g,'UUID'),actual:r.status,expected:status}));throw Error('unexpected_http_status');}return r.json();
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
  // Passport resolves a professional profile before membership. Provide a real
  // profile for the foreign company owner, so the probe reaches that boundary.
  await call(owners[0],null,'/v1/professional-profile','PUT',{displayName:'Boundary foreign owner profile'});
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
  const beforeHTTPRows=await tenantSnapshot();let denied=0;
  for(const route of routeInventory.routes.filter(x=>x.tenantHeader)){
   const path=route.path.replace(/:pool\b/g,'preferred').replace(/:[A-Za-z]+/g,randomUUID());
   // Copilot validates its tool before checking company membership. An allowed
   // read-only tool is required to test authorization rather than input shape.
   const body=route.path==='/v1/copilot/read'?{tool:'company_dashboard'}:['POST','PUT','PATCH'].includes(route.method)?{}:undefined;
   for(const actor of [owners[0],null]){await call(actor,owners[1].tenant,path,route.method,body,401);denied++;}
  }
  assert.deepEqual(await tenantSnapshot(),beforeHTTPRows,'All denied HTTP calls preserve both tenant graphs');
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

## Insumos protegidos Android

```json
[
  {
    "path": "apps/mobile/app.json",
    "sha": "77f1007b792ee4fa2d10dd5e5a8316762467ef8e",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/_layout.tsx",
    "sha": "d75f4a26218d1c1fdfacef46b08fd2d2babaa05a",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/agenda.tsx",
    "sha": "764dcb964bdf79ae0337d6ae5a59cdc030e48a77",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/analytics.tsx",
    "sha": "aff479659db2976acd7b3e0923e991b36273fce7",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/candidatos.tsx",
    "sha": "e5f68ec17a307d71d0c115e191c3be480e24cd6b",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/casos-seguranca.tsx",
    "sha": "b4e3ccafaa50d4cfad34733f12820008289b68ec",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/conversa.tsx",
    "sha": "25e6191e1664ee0f98c96d026ff3aed96faa2798",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/copilot.tsx",
    "sha": "ecc9ca4ecafbdd5131c30e130ba0075c6d8d5526",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/criar-conta.tsx",
    "sha": "fba0cb3416b9cb538867fd7d542d3b9c118ce169",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/disponibilidade.tsx",
    "sha": "b4eb4736896148baec684b1b4ea6a5009919696e",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/empresa-conta.tsx",
    "sha": "20c37cc92957e7bdb245e494d240dfcd40ebab80",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/empresa-inicio.tsx",
    "sha": "714095ed78b6669a42750d0ac54fbb861e354501",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/empresa-notificacoes.tsx",
    "sha": "f42c24a684a943e4b3f07dfa0e6c7c533aa36b11",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/empresa.tsx",
    "sha": "b34777148cfab0b167f1d4d6b61777e44a087900",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/entrar.tsx",
    "sha": "ec7c7914f5f2f310e905bff8b81103c4be433357",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/equipes.tsx",
    "sha": "f7c6eacb4d951d37487473fc6572271ccefd31cb",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/ganhos.tsx",
    "sha": "79ae7e2b6225da08eac0d100ee71ab8639165755",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/index.tsx",
    "sha": "51d033d5ece17312b141da28ead40ecdfdf56705",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/membros.tsx",
    "sha": "4b6140a7349049dd704bbb079f16de06d6be7589",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/notificacoes.tsx",
    "sha": "5b92e71991bfa02a0be73bfd3dd1debf31a446c1",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/pagamentos.tsx",
    "sha": "e2b3b16937945d11c0d45c31c9eff13a2cf0b96f",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/perfil.tsx",
    "sha": "c492039ee8542f513e6a148ba18a94671f54332c",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/planejamento.tsx",
    "sha": "356460ad4b0a546fbd6b7ca5cf9650568e973c02",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/privacidade.tsx",
    "sha": "c3ac45ef5005aac68491f117e48b9af104748fa9",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/profissional-inicio.tsx",
    "sha": "a71b7c6ba11bf4cd35a6996448dda71ee598e731",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/seguranca.tsx",
    "sha": "bbd76fdb4dfa7d764b4e29942b47d58368be2223",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/substituicoes.tsx",
    "sha": "e2cf5a9af0d4cfc6755fd857cf6de91f30c45b80",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/talentos.tsx",
    "sha": "87872556f34ee09519f739c33a404322f1e677db",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/app/trabalhos.tsx",
    "sha": "65c0de5b1b9a390eb403a1a01695038c30180928",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/components/CompanyNav.tsx",
    "sha": "8f54ab81505b317b8d64a7d1ea301d4c8ee2cc12",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/components/DeclaredCapabilities.tsx",
    "sha": "8086dc0d623e6d1137fb821c9f5f9c1a07c70b67",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/components/GeneralSupport.tsx",
    "sha": "344b2d82c2172af1f164649fdf2c9fa69400e265",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/components/NotificationsScreen.tsx",
    "sha": "ea7dd8efc958c28730675ad8d6cc2bddc45067f2",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/components/ProfessionalNav.tsx",
    "sha": "5c09010eea757e92c7dfc42bd7adeff1119c7380",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/components/SupportHistory.tsx",
    "sha": "e99f37d6bdda66825e346f23b2f2c2fa2f6ee0f8",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/components/SupportRecovery.tsx",
    "sha": "919d24e9a2548703d4991f5c68a437ed9041e219",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/components/SupportRequest.tsx",
    "sha": "73827cddcfb0192f5fbd38f6b215cfc9c32f47bd",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/eas.json",
    "sha": "fb64fcbd42deff7361ad26d1b7cd2fd06fd6a15f",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/agenda.ts",
    "sha": "48d3e08ae4e5ac1f4948c20549a330cc042a01ce",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/api.ts",
    "sha": "46cf48a5fb37257af90aceb816b3791e6b1c3c7a",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/availability-submit.ts",
    "sha": "beccad934ab8d187f8cfddfba28b4526e2bb41b1",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/availability-window.ts",
    "sha": "7b46379568f19b2c13b32df292685af647463534",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/bootstrap.ts",
    "sha": "7aaecdbc168f9486500afc91d045b5ca881806fd",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-analytics.ts",
    "sha": "28f59c89ccf1d35e114daa93cb3ef39da418c6a9",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-candidates.ts",
    "sha": "d042f8221b70cca7c984138d941f185d94c89ba5",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-dashboard-actions.ts",
    "sha": "42419db9d1971ba02b46047a572c79b3f8eef041",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-dashboard.ts",
    "sha": "a865a546c903520964a807f488a5ec4114e9bbe8",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-job-publication.ts",
    "sha": "45fb20b6b1b55447fe83207d4ac3806db7e7dca5",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-members.ts",
    "sha": "85c86260e3cecc70df9e8ffe24dd246f5cab9d7a",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-readonly.ts",
    "sha": "4ec7f5151134f4ea11b09f2ce55dfd2a5cdd22d0",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-replacements.ts",
    "sha": "7f52f95bcb5ff5b25c30be8d9870014fe1c5ccc6",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-safety.ts",
    "sha": "5ab736715ffd3dc5ff83decc0739bf8c95276089",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/company-talents.ts",
    "sha": "55f07c1e950a5f13036238ac6e1579e971a6aaba",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/conversation.ts",
    "sha": "565a19b60e1c0a3aa244df92dbfb09dc9b27d718",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/copilot-response.ts",
    "sha": "856d4d5210972be202e7502f6c9c3281b50adc43",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/earnings.ts",
    "sha": "9afe1a24109c42ad4825eeda40ff1dcef164e84c",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/home-cards.ts",
    "sha": "d6e4ccf9d71ab072e01e3b2915558a6586edec36",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/jobs.ts",
    "sha": "54d0814ace6e91565e0fa9c8722ea734594b015f",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/notifications.ts",
    "sha": "3928db3607370a459eca506a1610671d6c655bee",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/passport-history.ts",
    "sha": "e72f0ce1df88d4624ba78295b87ff861493fdda6",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/privacy-actions.ts",
    "sha": "e116dec3da68da1e41b666c7d3e8739a6d4ac5a7",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/privacy-requests.ts",
    "sha": "3f69d87acd77d803bc0394ce412b3e85213d8b97",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/professional-capabilities.ts",
    "sha": "e3ef307eaaa4a3755eda2f9f30b652bca1d5550b",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/professional-home.ts",
    "sha": "ca9e396fceec67ad5b9fe99965a1479bc9a9d0f0",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/professional-profile.ts",
    "sha": "c33dce25b0de5ab42512c846b2418895b92178de",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/professional-safety.ts",
    "sha": "123e637dc1019e9fece11a64d5f5257bb4d6e3c9",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/professional-support.ts",
    "sha": "865f1b87195d5860cc7f8f03d20c00c48b92fd1b",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/profile-submit.ts",
    "sha": "7ff33c6e83c858577f6d0a31aa1fd6914b4cd609",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/session-context.ts",
    "sha": "8a23f577cf222016694d6995822b632c0a71434f",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/session-transaction.ts",
    "sha": "d10eb3b0ce05326947aa216d30db2571d1501dc8",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/session.ts",
    "sha": "d99f5ad3cf53331aa55be0a2d38ac9a2fc4004a7",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/signin.ts",
    "sha": "453de55dfc31d983fc8e279b8c91104913a927b0",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/signup.ts",
    "sha": "800faeb27d041108ab7c1c9018f749c32d2a0010",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/startup-route.ts",
    "sha": "b8cbb6fcbb50b3d592d077b5c31db3f155ec8fff",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/support-contexts.ts",
    "sha": "61df65a69aca6acae2d1575304f5ed4191470ca7",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/support-intent-storage.ts",
    "sha": "b266454649a7658b5231207edaec7e269e9da8b9",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/support-intent.ts",
    "sha": "190926f412bb22ccf556899f6ae93dfe523c77ff",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/support-submission.ts",
    "sha": "be61cef11a2033fc0bca2899b518efcd56022839",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/teams.ts",
    "sha": "eeeab168bfb62c62f2552d28bd6600ae23adada1",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/package.json",
    "sha": "e1646b540a738daa81828a71f00617a7714fad6f",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/agenda-actions.test.mjs",
    "sha": "1e1964cc18cbabe419c8b70a5b4e9c8f2a9ed366",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/agenda-read-deadline.test.mjs",
    "sha": "9419980016590846a43daeb7c9ebc719ed8231e9",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/agenda-support-screen.test.mjs",
    "sha": "ff7f91eb8ae8d15aa440707a6909ae9c97a3308d",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/agenda.test.mjs",
    "sha": "934aa0350620a8e0b85fc63db9bbed110c2b4854",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/availability-calendar-screen.test.mjs",
    "sha": "b0c5cb20f354400db0c4dc934779ec800d321dbd",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/availability-screen-deadline.test.mjs",
    "sha": "0f5607ef3750c788a7657dbac299bc6afd3e8777",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/availability-submit.test.mjs",
    "sha": "340ceb0dbb8a7f5e0e502514279997df0fc9cc9c",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/availability-window.test.mjs",
    "sha": "8796c551a1db8fc8ea9687e6cab57542ec750d73",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/candidate-confirm-deadline.test.mjs",
    "sha": "1da09eeb72786d7553c2caf8828f6ef4d56bd108",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/candidate-confirm-session-guard.test.mjs",
    "sha": "81e44156aa9630e3842b92af33428a686b1a7928",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/candidates-expired-read.test.mjs",
    "sha": "6ea6740b371d48521829c2b3c003bfa7887b9391",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/candidates-read-deadline.test.mjs",
    "sha": "0bc2846acc7dad856994cdfdacf583b07b5d8f89",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-analytics.test.mjs",
    "sha": "1ea2952808f7aa44731918bca8f4554ac26fee5a",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-candidates.test.mjs",
    "sha": "e37d04a92b8df9999369d2c984419141541c762b",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-dashboard-actions.test.mjs",
    "sha": "01cd94d601274d78940c7cc30003830ca9ca8a53",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-dashboard.test.mjs",
    "sha": "6c5a7a3c1dc0df2bc505756a88991e7ad4e6ac9a",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-job-publication.test.mjs",
    "sha": "0f4437a3555309b6599976aec9c31a5b692d97b0",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-members.test.mjs",
    "sha": "9897a83bd52a3a19c3bdf4f940a787edc397253a",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-publication-context-deadline.test.mjs",
    "sha": "010543d05c7716ad3cb4cfc48567f220086c4ae3",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-readonly.test.mjs",
    "sha": "1b1d09278a6b6321a90852bccd20582037e7b2ed",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-replacement-ack-uuid.test.mjs",
    "sha": "a53cd57ec830d2c6faf7667c954c5dbf267f7776",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-replacements.test.mjs",
    "sha": "456bdc4dd6a3ca86e36e7289b1d39eb960342833",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-safety.test.mjs",
    "sha": "570bea7965d597a837a1cf1835a93f4fc87f1f19",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/company-talents.test.mjs",
    "sha": "155d414d3aef54db23dc8eedb7c854d8a45e0525",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/conversation-calendar.test.mjs",
    "sha": "403aa9317aa7f82b3042b56ae758cdfe5c9f0176",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/conversation-controller-cleanup.test.mjs",
    "sha": "9c3cdbf55372ec8387e5bfcadfb8d7dd2f175297",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/conversation-read-deadline.test.mjs",
    "sha": "fd83e07ff77f5c4ef84f4eca771fe81df99e435c",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/conversation-send-screen-deadline.test.mjs",
    "sha": "580ab20f9914bf4d6ca8f1adf9beb0fe4cd43eb6",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/conversation.test.mjs",
    "sha": "457e155044d518faaee0650cef135468a02838e6",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/copilot-response.test.mjs",
    "sha": "ed2136aee8c40a466a8dc51530a104015ef4b2b7",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/copilot-screen-deadline.test.mjs",
    "sha": "fc55d439d39f25d1ed3bbc76c2a8ae6b1e736850",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/declared-capabilities.test.mjs",
    "sha": "81be22f88f1842ea449589b88b4545a27dbc009b",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/earnings-controller-cleanup.test.mjs",
    "sha": "6cbf6645bfd2b7e36eda1e260c67a9ec1905f43f",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/earnings.test.mjs",
    "sha": "d886827477cf1a7e111eb7cb4ad24a3f3c1394cd",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/general-support.test.mjs",
    "sha": "97073823b6ea06ab8a72a8f72b9fe7eb68b88dcb",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/home-cards.test.mjs",
    "sha": "d60371e0bcb12e97b8af1d2c50a4cd3944241d56",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/interest-screen-deadline.test.mjs",
    "sha": "009ed1bd4db47b102223474e16bcdbbac5bd00f0",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/invitation-accept-deadline.test.mjs",
    "sha": "b276e85f116dccca5fb6f800d9a4cb7e2e5a9ade",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/invitation-create-deadline.test.mjs",
    "sha": "52973e05433b4f4cdb602d0fbbbfd8d02b982265",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/jobs-read-controller-cleanup.test.mjs",
    "sha": "c39715bb7f543cee59eef58b4be351a13ee3ed91",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/jobs.test.mjs",
    "sha": "5ed8e51d785af4c54de11e3a61bca09426b7a95e",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/member-support-calendar.test.mjs",
    "sha": "6dd1fe043e2822357c5e9f090ea197b2b924c4e4",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/notifications-read-deadline.test.mjs",
    "sha": "508bb7c7778d868a2c21b7059dd10c10bc0ae86f",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/notifications-write-deadline.test.mjs",
    "sha": "ffcd9625f56d5af2a394db0da37f1a993b80a6de",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/notifications.test.mjs",
    "sha": "bd21ae0efa3fa6c8f99a1e573490f745de48b98e",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/operations-deadline-screen.test.mjs",
    "sha": "ddadf21ddd0895fe35d9c4df9d6ccfe8d3b53710",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/passport-history.test.mjs",
    "sha": "67c1c472ef9292e984bdbfb716813068473af5de",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/passport-safety-calendar.test.mjs",
    "sha": "5ad0bde5ee19381be2115ba5687c428585580e85",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/planner-screen-deadline.test.mjs",
    "sha": "5bb08d09cc4af4b37c37a63de68273719a2c43a2",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/primary-read-deadline.test.mjs",
    "sha": "ee297621b25e80f12f203837c1d2b42f23df242d",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/privacy-actions.test.mjs",
    "sha": "0a69cc2358b1ed13b87f84baf11b8a8eab9447e4",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/privacy-requests.test.mjs",
    "sha": "e5095d9047542a5414519422efd5e891e906fcd2",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/privacy-write-deadline.test.mjs",
    "sha": "f9783551999b68589bdbbff2d9f03db6a9d6808d",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/professional-home.test.mjs",
    "sha": "d87761c9e81a48a6a3bb89f72563efee514a4ad4",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/professional-profile.test.mjs",
    "sha": "7898ada26ea546fc3137a688e86478fb10332430",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/professional-safety.test.mjs",
    "sha": "8fc94c9216dbad9b5fc483e0837f5d69a1881443",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/professional-support.test.mjs",
    "sha": "b2c5967bf7e4cdc270d68205b2d0e96009b4109c",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/profile-analytics-read-deadline.test.mjs",
    "sha": "2df00828279c9660a8ed365f1a3be149169cae7e",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/profile-save-screen-deadline.test.mjs",
    "sha": "bb11da6d351fa2026fba12eec293e63e42b103cd",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/profile-submit.test.mjs",
    "sha": "3e3dd073d8c642ffabbd325cc34350bac8d33164",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/publication-screen-uncertain-deadline.test.mjs",
    "sha": "9d11388afedbbe01e6ac15be0d9558e5d5328513",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/replacement-create-screen-deadline.test.mjs",
    "sha": "d0423c9b93767886251470009fede3a8ad0e34c3",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/replacement-match-screen-deadline.test.mjs",
    "sha": "a297f51ec3aa52a2ce3e08fb6351c9cc1fe80e76",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/replacement-read-controller-cleanup.test.mjs",
    "sha": "3a0f44b631e6a0cce8cb74e22ea7607e4db87a3c",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/replacement-select-screen-deadline.test.mjs",
    "sha": "747753e9f044c02377a149a815211e5117ea58bc",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/response-calendar-contract.test.mjs",
    "sha": "630e26b4037cd59c17713451c2d34aa98b4917ba",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/revoke-screen-deadline.test.mjs",
    "sha": "a64a7963d655e4e1d706f3455ee5d96f92fc2849",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/secondary-read-deadline.test.mjs",
    "sha": "cc641c6180ad8ce624220e41bb5da3f980f2b466",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/session-clear.test.mjs",
    "sha": "ac626a1e1e2b3f5873da15c129e0b5f7101ad454",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/session-context.test.mjs",
    "sha": "f36b32432e8cd4654954445e1359812c4ed098af",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/session-tenant.test.mjs",
    "sha": "e40e2d1932c825cd61c8ebe489fc05e317293813",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/session-transaction.test.mjs",
    "sha": "6b60b6e08030e12a55ea002996caee7929341ae6",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/signin-screen-deadline.test.mjs",
    "sha": "3d188e71b180978bf900edcff96b32c4df1de41b",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/signin.test.mjs",
    "sha": "a580a51b608116701024ff5c102d76b0bb1712a4",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/signout-screen-deadline.test.mjs",
    "sha": "07f5b11eb3dfeea58a271c8caf027aade76ed359",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/signup-screen-deadline.test.mjs",
    "sha": "4f92e840adb8dfa6eb1c6fb941fd8061c1257093",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/signup-screen.test.mjs",
    "sha": "eace3ff93514dd1d182006e598136a057d352509",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/signup.test.mjs",
    "sha": "483ace20f18b2cd7053be06a50c91004ec15545f",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/startup-route.test.mjs",
    "sha": "242d7516e9c090a817ad8ae88a6daf9497e77a8b",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/startup-screen-deadline.test.mjs",
    "sha": "ae28131f4a72e5c71a6603d5ba31464c9f3e988b",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/support-calendar.test.mjs",
    "sha": "26e4c07812c7b020c68c7f3c1d2f9483e327c978",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/support-history-read-deadline.test.mjs",
    "sha": "408c4a5458e3baa4b23554cc2bfde807071db8cd",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/support-history-screen.test.mjs",
    "sha": "537f3e97b1cbcfbe8ac9efaf7a90adcb6ecc685f",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/support-intent.test.mjs",
    "sha": "bce844ae4c40f452c4d9db3961beaccff97d2108",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/support-recovery-screen.test.mjs",
    "sha": "9c041fff637ecf15064c828805cef36dad133786",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/support-request-screen.test.mjs",
    "sha": "c833939e03e63a17abbd9b195f631c6675871e64",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/support-submission-calendar.test.mjs",
    "sha": "7783fea5e432339b8cf4cc417c2fad6ff9fe6949",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/support-submission.test.mjs",
    "sha": "35845a334a6e271a976fd8ea1dc935833dc8ad58",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/talents-safety-read-deadline.test.mjs",
    "sha": "547ae928eda25b2ab28ac64f90b3028d275fe653",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/teams-read-deadline.test.mjs",
    "sha": "fa39a5639095d53b0e9f6491c4a926e47eeb9236",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/teams.test.mjs",
    "sha": "b202b682a7fbd4977fd99d49156bb7802aadb2f7",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tests/window-ack-calendar.test.mjs",
    "sha": "1bb7956ba411c2e93c03f5c0e2fe2addfff6cb1a",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/tsconfig.json",
    "sha": "aee4c01aa16c5c63c241fe3d76cbff8d020081ca",
    "mode": "100644"
  },
  {
    "path": ".github/workflows/standalone-pilot-apk.yml",
    "sha": "e0fc5f871dc3b498f71a38ff932c83b48716c35f",
    "mode": "100644"
  },
  {
    "path": "package.json",
    "sha": "936bb3649f5bb1b9810039ba35d339189f0a530c",
    "mode": "100644"
  },
  {
    "path": "pnpm-lock.yaml",
    "sha": "c1a67de447f42375a02a05a03661037262f9cd8d",
    "mode": "100644"
  },
  {
    "path": "pnpm-workspace.yaml",
    "sha": "b98f8b436f1d0dc6f3c11a4f905bdeb06fed9c65",
    "mode": "100644"
  },
  {
    "path": "scripts/android-standalone-smoke.sh",
    "sha": "7d7dac1cdd906cd40515c23bab54cdf59376553c",
    "mode": "100644"
  },
  {
    "path": "scripts/build-android-pilot.sh",
    "sha": "5f4f95c64a8c43f9744b1bfd5fbb9ec1180a2f42",
    "mode": "100644"
  },
  {
    "path": "scripts/tests/android-standalone-smoke.test.mjs",
    "sha": "56d89b19623b5ad07adb4c31632d6019fabc5e9c",
    "mode": "100644"
  },
  {
    "path": ".github/workflows/ci.yml",
    "sha": "b42bd9e89aa8052e2d1d9e36c63b4dee621b4e25",
    "mode": "100644"
  },
  {
    "path": ".github/workflows/pilot-android.yml",
    "sha": "d6c9c21d00e8d038211d155085d77af8cad59dff",
    "mode": "100644"
  },
  {
    "path": "tsconfig.base.json",
    "sha": "616448a7bb986fb1f524e58dc84e115ae330eec1",
    "mode": "100644"
  },
  {
    "path": "apps/api/package.json",
    "sha": "9a4a75a94b50730bbe129c51965b30656605b49d",
    "mode": "100644"
  }
]
```
