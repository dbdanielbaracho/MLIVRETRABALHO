# Área5 — jornada real candidata — 22/10/2026


---

## Jornada candidata da Área5 — matching, alocação e substituição — 22/10/2026

Base viva main `dd696b16c56c8d623e572ce080be3d7823e5438a`, árvore `e3b3e97f00cbc8bf4af3a422e666448c4d6f44bb`. #605 e os aceites6/4 já integrados; CI literal60939838084574SUCCESS. **Áreas2,3,4,6,9,10 aceitas; sete pendentes:1,5,7,8,11,12,13. Nenhum aceite5 é antecipado.** Todos os aceites internos cabem ao assistente; sem consulta humana.

Lacuna de evidência selecionada: testes HTTP existentes provam confirmação concorrente por barreira PG, seleção concorrente/substituição e corrida cancelamento, mas a jornada selecionada não ligava simultaneamente os clientes reais company-candidates/company-replacements/teams/jobs à recomendação, escolha humana, agenda e snapshots do banco. Novo scripts/matching-acceptance-e2e.cjs executa essa composição real em API/PostgreSQL descartáveis locais, sem alterar produto/política/ranking. O root HTTP recebe só a invocação adicional antes do browser; todos os gates e asserts anteriores permanecem.

Duas empresas/quatro profissionais reais: recomendação por função/cidade, indisponível ausente do ranking e allocation; escolha humana de candidato disponível de ranking inferior; uma confirmação explícita + replay explícito com snapshots idênticos; membership criada por confirmação real e pools/equipe reais; alocação somente leitura; pedido de substituição com replay do aberto sem duplicar; auto-match somente recomenda, sem cancelar/alocar; original e indisponível rejeitados; seleção humana explícita de outro candidato disponível pelo SDK/API, ACK/assignment/agenda/notificação vinculados; segundo SELECT explícito recebe rejeição, sem afirmar ACK idempotente nesse endpoint. Snapshots de sete tabelas/dois tenants, tenantB e ACL/policies inalterados. Confirmação atual não impõe disponibilidade: a disponibilidade aqui é verificada nos endpoints que a exigem (ranking/allocation/select), sem inventar regra. A tela Substituições oferece o recomendado e exige confirmação explícita; seleção não recomendada é contrato SDK/API, não opção de UI alegada.

Prova nova ainda PENDENTE em CI real. Local: node --check PASS; CI=0 recusa em local-configuration antes de PG/rede. Não é PASS HTTPPG local nem RNrender/SecureStore/physical. Evidência/crosswalk/manifesto em docs/evidencias/MATCHING_ACCEPTANCE_JOURNEY_2026-10-22.md; recibo final do PR deve registrar SHA/tree/checkout próprio, CI completo e literal pós-merge, sem commit artificial autorreferente. Resultados antigos não aprovam novo SHA.

APK N/A por mudança exclusivamente teste/scripts/docs fora do grafo Expo→Gradle; todos173mobile/workflows/build/smoke/deps/lock permanecem byte-idênticos à main e devem ser conferidos novamente antes de merge. Último standalone medido literal1b854/39708675307, não APK literal deste novo candidato. React mobile19.1.4/RN0.81.6, LGPD/auth/tenant/RLS/ACL, CDP/Fetch/CORS/sandbox/LNA/15s/deadlines/asserts intactos. Sem produção, PSP/contrato/dinheiro real, custos, serviços/credenciais externas, root/grants/bypass/pentest ou aparelho físico. #574/#565 continuam drafts; externos215/219/220/224/228 separados. Se CI falhar, preservar falha e diagnosticar causa real; não rerun mesmo SHA para verde.


| Critério matriz5 | Implementação original | Prova funcional |
|---|---|---|
| Idempotência | confirm retorna existingconfirmed; create UPSERT; select exige open | replayconfirm snapshotexato, replaycreate um pedido, replayselect rejeitado sem duplicação |
| Concorrência | locks job/assignment/request, transação tenant | fixtures PGbarrier existentes íntegros e obrigatórios na mesma CI; novo teste NÃO inventa concorrência |
| Disponibilidade/ranking | rankCandidates/scoreMatch/replacement.ranked/allocation | cliente real lê melhor função/cidade; indisponível excluído; select indisponível400; allocation fora da janela vazio |
| Escolha humana | confirm/select só por POST explícito | leituras/allocation/auto-match sem mutation; escolha inferior confirmada e seleção SDK/API explícita de alternativo |
| Empresa/profissional | active_marketplace/tenant_professional e sessão/membership | confirma membership real/agenda própria, nega foreign e profissional, snapshots completos7tabelas2tenants |
| Contexto/prazo/ACK | telas atuais + helpers company/session | guards de contexto; testes de handler/clock/unknown existentes no mesmo CI, não RN nativo |

## Manifestos dos originais preservados
```json
[
  {
    "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
    "sha": "a81790d27559acce6b542267d7189109f2d083c2",
    "utf16Length": 3893254
  },
  {
    "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
    "sha": "8c984a524150ba70d34efb6eb7ee0e2db062ed8f",
    "utf16Length": 4226900
  },
  {
    "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
    "sha": "cf0a0253dc4532403b574c144cdfe48ccffbd726",
    "utf16Length": 3883386
  },
  {
    "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
    "sha": "c0fdb1af13dcf65e6154fdeada52de8ba04e5b4c",
    "utf16Length": 3878275
  },
  {
    "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
    "sha": "45e4a64d714e80309e6a6df50f2ff084aa7d317c",
    "utf16Length": 3879197
  },
  {
    "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
    "sha": "f212aa22b8949fc2bd9744592799b42902f81931",
    "utf16Length": 3476102
  }
]
```
## Fontes auditadas Git
```json
[
  {
    "path": "apps/mobile/lib/company-candidates.ts",
    "sha": "d042f8221b70cca7c984138d941f185d94c89ba5"
  },
  {
    "path": "apps/mobile/lib/company-replacements.ts",
    "sha": "7f52f95bcb5ff5b25c30be8d9870014fe1c5ccc6"
  },
  {
    "path": "apps/mobile/lib/teams.ts",
    "sha": "eeeab168bfb62c62f2552d28bd6600ae23adada1"
  },
  {
    "path": "apps/mobile/lib/jobs.ts",
    "sha": "54d0814ace6e91565e0fa9c8722ea734594b015f"
  },
  {
    "path": "apps/api/src/company-jobs.controller.ts",
    "sha": "e888c6a6db28bd3f48223f150a5895ffc6c26d9c"
  },
  {
    "path": "apps/api/src/team-allocation.controller.ts",
    "sha": "a316e0362c7d4de75bcf8cf0c347b6d21bfcac7f"
  },
  {
    "path": "apps/api/src/replacement.controller.ts",
    "sha": "809c27f1551c103adc9e6950f79555eb42d3b7db"
  },
  {
    "path": "scripts/http-replacement-e2e.sh",
    "sha": "f1025db62e0e534d874fa7252123f29e749f07a0"
  },
  {
    "path": "scripts/replacement-selection-concurrency-e2e.cjs",
    "sha": "e96d0d8b6755d75829095da0435805f9b5dbe7a6"
  },
  {
    "path": "scripts/company-confirmation-concurrency-e2e.cjs",
    "sha": "ec5e6e8e08390d5cbd67f845f9fda0da3a607ff0"
  },
  {
    "path": "apps/mobile/tests/candidate-confirm-deadline.test.mjs",
    "sha": "1da09eeb72786d7553c2caf8828f6ef4d56bd108"
  },
  {
    "path": "apps/mobile/tests/replacement-create-screen-deadline.test.mjs",
    "sha": "d0423c9b93767886251470009fede3a8ad0e34c3"
  },
  {
    "path": "apps/mobile/tests/replacement-match-screen-deadline.test.mjs",
    "sha": "a297f51ec3aa52a2ce3e08fb6351c9cc1fe80e76"
  },
  {
    "path": "apps/mobile/tests/replacement-select-screen-deadline.test.mjs",
    "sha": "747753e9f044c02377a149a815211e5117ea58bc"
  }
]
```
## Código completo do novo teste
```js
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

```
## Recibo terminal anterior609 preservado integralmente como história
Formaliza o aceite técnico/funcional interno da Área4, empresas/equipes, após jornada real com quatro papéis e gates próprios/pós-merge do #608. Estado: áreas2,3,4,6,9,10 aceitas; sete pendentes. Não aceita Matching5/RLS7/Security8/Backend11 por arrasto, nem produção/provider/aparelho físico.

Sete caminhos: capítulos finais nos seis normativos originais (prefixos integrais/readbackexato) e docs/evidencias/COMPANY_INTERNAL_ACCEPTANCE_2026-10-22.md com requisito→código→teste→CI→SHA. Registra métodos/ACK, owner/admin/manager/company, convites owner-only, contexto, prazos/unknown e empty/error, HTTPPG/SDK e WebDOM. Company legado tem UMA membershipSQL de fixture local, não convite/provisionamento público.

Gates já concluídos: próprio608 CI39834842796/job120020313103SUCCESS/sintético906d87.../tree30d1; pós-CI39835939458/job120024168013SUCCESS/literalb5c77478619765e2ea6b115f8674a64c7a7e156b/mesmatree. Marker novo141requests/60POSTtotais/5vagas/4equipes/4roles; isolamento de oito tabelas/dois tenants e ACL/policies,1936cases e browser12/12+canonical/ProductionTruth PASS. APK N/A por184inputs protegidos idênticos/173mobile e grafoExpoGradle intacto.

Base `b5c77478619765e2ea6b115f8674a64c7a7e156b`; HEAD `e86f39b16ce56a1c1ad7e168b73b272f8b3c4c09`; árvore `e3b3e97f00cbc8bf4af3a422e666448c4d6f44bb`. Nenhum delta runtime/teste/workflow/deps/lock/build/smoke. CI completo próprio e literal pós-merge desta formalização ainda obrigatórios; não se inventa resultado futuro nem usa ActivityWatch como build. #574/#565 permanecem drafts; externos215219220224228 separados.

## Gate próprio verificado — 22/10/2026
CI39837044151/job120027969709/attempt1 COMPLETED SUCCESS. Checkout19:05:48.5145421Z sintético86b1805fa465764a3ec4d417bc2fd10612e843f6, pais[b5c7747,e86f39b], árvoree3b3e97f00cbc8bf4af3a422e666448c4d6f44bb idêntica ao candidato.1936=[217/1186/519/3/11] PASS, zero fail/skip/cancel; todosfoundationstepsSUCCESS. COMPANY_ACCEPTANCE_HTTP_PG_PASS19:08:42.9965635Z com4roles/141requests/60POSTtotais/5vagas/4equipes/8tabelas2tenants/ACLpolicies; matriz12/12+canonical19:10:26Z; ProductionTruth19:11:34.6375846Z.
Revisão fresh main/baseb5c7747 e HEADe86f39b inalterados;7paths100644/276adições/zero remoções; seis originais prefixo integral/readbackexato;534blobs não documentais incluindo173mobile iguais e184inputs protegidos idênticos ao APK medido1b854. APK N/A, não APK literal novo. Merge normal expectedHEAD e pós-CI literal obrigatórios; resultados futuros não antecipados.

## Recibo terminal pós-merge — 22/10/2026

PR609 integrado uma única vez por merge normal com expected HEAD e86f39b16ce56a1c1ad7e168b73b272f8b3c4c09. Main literal `dd696b16c56c8d623e572ce080be3d7823e5438a`, árvore `e3b3e97f00cbc8bf4af3a422e666448c4d6f44bb`, pais ordenados [b5c77478619765e2ea6b115f8674a64c7a7e156b, e86f39b16ce56a1c1ad7e168b73b272f8b3c4c09]. Revalidação final da main mantém esse SHA/árvore.

[CI literal pós-merge 39838084574](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39838084574), job120031582802, attempt1 COMPLETED SUCCESS, zero reruns. Checkout literal confirmado no log19:13:13.0080929Z. Todos os passos foundation SUCCESS, incluindo typecheck/build/exportAndroid/migration/privacy e HTTP journey/Production Truth. 1936 testes executados=[217Web/1186mobile/519API/3CLI/11monitor], todos PASS e zero fail/skip/cancel.

COMPANY_ACCEPTANCE_HTTP_PG_PASS19:15:12.0021118Z confirma a jornada real de quatro papéis com os quatro SDKs versionados: convite HTTP admin/manager; company legado com UMA membership de fixture SQL CI explícita, sem alegação de provisionamento público; uma publicação POST por papel, cinco vagas persistidas contando setup; quatro equipes com add/replay/remove; gestão owner-only; estados vazios/erro/contexto; snapshots de oito tabelas/dois tenants nas negativas e policies/ACL inalteradas. 141requests/60POSTs são TOTAIS da fixture incluindo auth/setup/negativas, não60publicações.

12 casos de diagnóstico browser PASS e canônico obrigatório PASS19:17:07.7741581Z; MATRIX status=0 19:17:07.7741791Z. Production Truth PASS19:17:59.6393972Z. Não se atribui RCA global à intermitência histórica do Chrome.

Decisão terminal: **Área4 empresas/equipes APROVADA TÉCNICA/FUNCIONAL INTERNAMENTE**, formalizada nos seis normativos originais por apêndice e no recibo COMPANY_INTERNAL_ACCEPTANCE_2026-10-22.md. Agora áreas2,3,4,6,9,10 aceitas; **sete pendentes:1,5,7,8,11,12,13**. Pendências de preparação acima são história, não resultado atual.

APK N/A para este delta exclusivamente documental e para608 exclusivamente testes/scripts:534blobs não documentais idênticos entre609/base,173mobile inalterados e184inputs protegidos idênticos ao produto literal1b854 já medido. Não há APK literal dd696/b5c novo. Instalação/launch standalone não representa formulários RN, SecureStore nativo, aparelho físico ou VisualTruth. Sem produção, provider/PSP/dinheiro real/pentest/contratos, alteração paga, root/grants/bypass. #574/#565 permanecem drafts até gates efetivos; externos215/219/220/224/228 separados. Nenhuma outra área recebe aceite por arrasto.

### Frente seguinte delimitada
Leitura estática preparatória da Área5 (nenhum novo aceite): http-replacement-e2e.sh f1025db62e0e534d874fa7252123f29e749f07a0, company-confirmation-concurrency-e2e.cjs ec5e6e8e08390d5cbd67f845f9fda0da3a607ff0 e replacement-selection-concurrency-e2e.cjs e96d0d8b6755d75829095da0435805f9b5dbe7a6 foram lidos. Há barreiraPG, confirmação concorrente com dois ACKs/um assignment/uma notification, seleção concorrente com um matched/outro request fechado, e corrida criação/cancelamento. Em http-replacement, auto-match devolve recommendedProfessionalId; SÓ a chamada explícita select posterior altera assignment. O echo final antigo resume isso de forma imprecisa; não atribuir cancelamento/seleção ao auto-match nem inferir RCA ou aceite5. Próximo passo: confrontar requisito5 e SDKs reais de escolha/ACK/contexto/disponibilidade com esses testes e o CI literal da nova main; executar a prova integrada que faltar, não repetir status/microtestes ou importar drafts574565.

