# Cancelamento com menor privilégio e lock da alocação — 22/10/2026

MesmoPR613, continuação funcional após CI39870499567/job120143431301/attempt1FAIL/HEAD3071f8c8672dfb48934c0b058274d8e9697742af. Checkout23:15:05.5269581Z sintético60d12b5040185067a5a863720efc151567429acb/pais[e88f,3071]/árvore72d6cfa9b7c8116776c60c346016e5b8f19520d0 exata.1936unit[217Web1186mobile519API3CLI11monitor]PASS0fail/skip/cancel/typesbuildexport/migração2x/privacyPASS. PROVA NOVA INTEGRAL7 PASS23:17:48.2540803Z:27TENANT/44tabelas,8funçõesprivilegiadas,148negativas74rotas,SQLSTATE42501 termos/capacidades/perfis,ACLviolations[],Poolreal e identidadesJSON.12matrixPASS/canonicalPASS23:19:34.5448678Z/MATRIX0. Portanto NÃO browserfalhou nesta run e NÃO atribuir rootChrome ao3071.

Falha restante depois do browser: requisição válida de cancelamento recebeu500, primária23:19:37.3352835Z permission denied professional_profiles/42501, stackCancellationController/DatabaseService. O SELECT juntava work_assignments wa eprofessional_profiles p com FOR NO KEY UPDATE sem OF; PostgreSQL tenta bloquear ambas e exigeUPDATEtambém no perfil. A política menorprivilégio de0072 removeesseUPDATE. Não restaurarprivilégio global para corrigir compatibilidade.

Correção mínima: só acrescentar OF wa à cláusula de lock deCancellationController. Preserva lock da mesma alocação, ordem das operações, WHEREtenant/id/status, membership/ator, INSERTaudit, cancelamentorequests, ACL/RLS e retorno. Não altera matching/lifecycle/compensação. FonteMAINe5cd5274b0ce7d02ebd7865897f7d4d2c278d295 FULL reversível removendo6caracteres' OF wa'. Privacidadedeperfil não depende degrantUPDATE; readsSELECTsão mantidos. Busca de todosFORUPDATE/FORNOKEYUPDATE em42controllers identificou estaúnicajunção com perfil; privacyFORUPDATEé caminho plataforma autenticado separado, nãoalargado.

A mesma jornada integra agora confirmação real→cancelamento profissional e confirmação real→cancelamento empresa, contra Nest/HTTP/PostgreSQL com0072ativa. Exige201/assignmentcancelled/umauditrecord/perfisJSONBYTEiguais e27tabelasdooutrotenantintactas emcadaoperação. SemmockSQL/novaunitmirrortest/semrestaurarIUD. Gates existentes http-replacement-e2e.sh debarreiras concorrentes create/cancel/select permanecem integrais eobrigatórios no mesmoCI, sem substituir por esta prova sequencial. Não alegar que a prova sequencial é prova de corrida.

Gateestrito: CIcompleta própria + literalpósmerge antesintegração/aceite. NenhumSAMESHArerun, cancel, commitstatus, restauração degrant ou alteração deChrome. APK N/A: APIbackendSQL/CJS/docs fora deExpo→Gradle,184insumosprotegidos173mobileintactos; nãoAPKliteralnovo. Áreas2,3,4,5,6,9,10 aceitas;1,7,8,11,12,13 pendentes atécadeiafechada. Sem produção/PSP/dinheiro/pentest/physical/serviçoexterno/root/bypass.

## Recortes primários integrais selecionados

```text
2026-10-22T23:17:47.7595229Z TENANT_BOUNDARY_PRIVILEGED_FUNCTIONS_PASS {"functions":[{"name":"active_marketplace_professional","publicExecute":false,"runtimeExecute":true,"fixedSearchPath":true,"definitionSHA256":"6ba44cf9b5811777400ee972a9860be5eb019176711f8a6faee1241527cc38ea"},{"name":"active_marketplace_professional_identity","publicExecute":false,"runtimeExecute":true,"fixedSearchPath":true,"definitionSHA256":"81b865441978c5da4c77c2b6f6e645fbc5b31e4b9e0e6e322a0f57f68b23f2f8"},{"name":"active_tenant_professional","publicExecute":false,"runtimeExecute":true,"fixedSearchPath":true,"definitionSHA256":"36a6d8c098aa513e5ea05ce6c8d267fc73fc0fd3ec3a9bf416434c00465853bf"},{"name":"active_tenant_professional_identity","publicExecute":false,"runtimeExecute":true,"fixedSearchPath":true,"definitionSHA256":"aa79b84b4a1e14a093df44ba3bf55b32a3d0e416bc5f556e4130759b651b7e75"},{"name":"confirm_marketplace_interest","publicExecute":false,"runtimeExecute":true,"fixedSearchPath":true,"definitionSHA256":"9cba54a88998ef837f455ca1926e688bd5524c49e13156e1c4c51bc3ec23129d"},{"name":"list_company_members","publicExecute":false,"runtimeExecute":true,"fixedSearchPath":true,"definitionSHA256":"307a0432bd2bfe87527d2b7be3ee0906389f1ab829f73f18a1b21d829f7ff39a"},{"name":"refresh_marketplace_company_reputation","publicExecute":false,"runtimeExecute":false,"fixedSearchPath":true,"definitionSHA256":"72bec6d7aec9bb6938e5384510fdc01b4e4f2d79f30eb378be64e635094e2213"},{"name":"sync_marketplace_job_projection","publicExecute":false,"runtimeExecute":false,"fixedSearchPath":true,"definitionSHA256":"461937c5bfe59bbfb4b569180798cbc4834fd21f829c1b43691797ffa657b7a4"}],"ownAndForeignBothDirections":true,"missingContextDenied":true,"confirmationWritesRolledBack":true}
2026-10-22T23:17:47.8820698Z TENANT_BOUNDARY_OWNER_WRITE_OBSERVED {"table":"terms_acceptances","method":"INSERT_FOREIGN_IDENTITY","sqlstate":"42501","rowCount":null,"rolledBack":true}
2026-10-22T23:17:47.8822263Z TENANT_BOUNDARY_OWNER_WRITE_OBSERVED {"table":"professional_capabilities","method":"UPDATE_FOREIGN_PROFESSIONAL","sqlstate":"42501","rowCount":null,"rolledBack":true}
2026-10-22T23:17:47.8823746Z TENANT_BOUNDARY_OWNER_WRITE_OBSERVED {"table":"professional_profiles","method":"UPDATE_FOREIGN_PROFILE","sqlstate":"42501","rowCount":null,"rolledBack":true}
2026-10-22T23:17:47.9001918Z TENANT_BOUNDARY_ALL_TABLES_PASS {"classifiedTables":44,"tenantTables":27,"validTenantGraphs":2,"readBothDirections":true,"insertAndTenantRebindDenied":true,"updateDeleteResults":[{"table":"assignment_cancellations","method":"UPDATE","result":"ACL_DENIED"},{"table":"assignment_cancellations","method":"DELETE","result":"ACL_DENIED"},{"table":"company_jobs","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_jobs","method":"DELETE","result":"RLS_FILTERED"},{"table":"company_member_invitations","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_member_invitations","method":"DELETE","result":"ACL_DENIED"},{"table":"company_work_ratings","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_work_ratings","method":"DELETE","result":"ACL_DENIED"},{"table":"conversation_messages","method":"UPDATE","result":"RLS_FILTERED"},{"table":"conversation_messages","method":"DELETE","result":"RLS_FILTERED"},{"table":"conversations","method":"UPDATE","result":"RLS_FILTERED"},{"table":"conversations","method":"DELETE","result":"RLS_FILTERED"},{"table":"direct_hire_conversions","method":"UPDATE","result":"RLS_FILTERED"},{"table":"direct_hire_conversions","method":"DELETE","result":"ACL_DENIED"},{"table":"earnings_ledger","method":"UPDATE","result":"RLS_FILTERED"},{"table":"earnings_ledger","method":"DELETE","result":"ACL_DENIED"},{"table":"job_interests","method":"UPDATE","result":"RLS_FILTERED"},{"table":"job_interests","method":"DELETE","result":"RLS_FILTERED"},{"table":"marketplace_integrity_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"marketplace_integrity_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"notifications","method":"UPDATE","result":"RLS_FILTERED"},{"table":"notifications","method":"DELETE","result":"RLS_FILTERED"},{"table":"payment_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"payment_events","method":"DELETE","result":"ACL_DENIED"},{"table":"professional_availability","method":"UPDATE","result":"RLS_FILTERED"},{"table":"professional_availability","method":"DELETE","result":"RLS_FILTERED"},{"table":"replacement_requests","method":"UPDATE","result":"RLS_FILTERED"},{"table":"replacement_requests","method":"DELETE","result":"RLS_FILTERED"},{"table":"safety_case_appeal_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_appeal_events","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_case_appeals","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_appeals","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_case_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_events","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"safety_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"support_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"support_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"talent_pool_members","method":"UPDATE","result":"RLS_FILTERED"},{"table":"talent_pool_members","method":"DELETE","result":"RLS_FILTERED"},{"table":"tenant_memberships","method":"UPDATE","result":"RLS_FILTERED"},{"table":"tenant_memberships","method":"DELETE","result":"RLS_FILTERED"},{"table":"trust_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"trust_events","method":"DELETE","result":"ACL_DENIED"},{"table":"verification_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"verification_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"work_assignments","method":"UPDATE","result":"RLS_FILTERED"},{"table":"work_assignments","method":"DELETE","result":"RLS_FILTERED"},{"table":"work_ratings","method":"UPDATE","result":"RLS_FILTERED"},{"table":"work_ratings","method":"DELETE","result":"RLS_FILTERED"},{"table":"workforce_team_members","method":"UPDATE","result":"RLS_FILTERED"},{"table":"workforce_team_members","method":"DELETE","result":"RLS_FILTERED"},{"table":"workforce_teams","method":"UPDATE","result":"RLS_FILTERED"},{"table":"workforce_teams","method":"DELETE","result":"RLS_FILTERED"},{"table":"assignment_cancellations","method":"UPDATE","result":"ACL_DENIED"},{"table":"assignment_cancellations","method":"DELETE","result":"ACL_DENIED"},{"table":"company_jobs","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_jobs","method":"DELETE","result":"RLS_FILTERED"},{"table":"company_member_invitations","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_member_invitations","method":"DELETE","result":"ACL_DENIED"},{"table":"company_work_ratings","method":"UPDATE","result":"RLS_FILTERED"},{"table":"company_work_ratings","method":"DELETE","result":"ACL_DENIED"},{"table":"conversation_messages","method":"UPDATE","result":"RLS_FILTERED"},{"table":"conversation_messages","method":"DELETE","result":"RLS_FILTERED"},{"table":"conversations","method":"UPDATE","result":"RLS_FILTERED"},{"table":"conversations","method":"DELETE","result":"RLS_FILTERED"},{"table":"direct_hire_conversions","method":"UPDATE","result":"RLS_FILTERED"},{"table":"direct_hire_conversions","method":"DELETE","result":"ACL_DENIED"},{"table":"earnings_ledger","method":"UPDATE","result":"RLS_FILTERED"},{"table":"earnings_ledger","method":"DELETE","result":"ACL_DENIED"},{"table":"job_interests","method":"UPDATE","result":"RLS_FILTERED"},{"table":"job_interests","method":"DELETE","result":"RLS_FILTERED"},{"table":"marketplace_integrity_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"marketplace_integrity_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"notifications","method":"UPDATE","result":"RLS_FILTERED"},{"table":"notifications","method":"DELETE","result":"RLS_FILTERED"},{"table":"payment_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"payment_events","method":"DELETE","result":"ACL_DENIED"},{"table":"professional_availability","method":"UPDATE","result":"RLS_FILTERED"},{"table":"professional_availability","method":"DELETE","result":"RLS_FILTERED"},{"table":"replacement_requests","method":"UPDATE","result":"RLS_FILTERED"},{"table":"replacement_requests","method":"DELETE","result":"RLS_FILTERED"},{"table":"safety_case_appeal_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_appeal_events","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_case_appeals","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_appeals","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_case_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"safety_case_events","method":"DELETE","result":"ACL_DENIED"},{"table":"safety_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"safety_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"support_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"support_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"talent_pool_members","method":"UPDATE","result":"RLS_FILTERED"},{"table":"talent_pool_members","method":"DELETE","result":"RLS_FILTERED"},{"table":"tenant_memberships","method":"UPDATE","result":"RLS_FILTERED"},{"table":"tenant_memberships","method":"DELETE","result":"RLS_FILTERED"},{"table":"trust_events","method":"UPDATE","result":"ACL_DENIED"},{"table":"trust_events","method":"DELETE","result":"ACL_DENIED"},{"table":"verification_cases","method":"UPDATE","result":"RLS_FILTERED"},{"table":"verification_cases","method":"DELETE","result":"ACL_DENIED"},{"table":"work_assignments","method":"UPDATE","result":"RLS_FILTERED"},{"table":"work_assignments","method":"DELETE","result":"RLS_FILTERED"},{"table":"work_ratings","method":"UPDATE","result":"RLS_FILTERED"},{"table":"work_ratings","method":"DELETE","result":"RLS_FILTERED"},{"table":"workforce_team_members","method":"UPDATE","result":"RLS_FILTERED"},{"table":"workforce_team_members","method":"DELETE","result":"RLS_FILTERED"},{"table":"workforce_teams","method":"UPDATE","result":"RLS_FILTERED"},{"table":"workforce_teams","method":"DELETE","result":"RLS_FILTERED"}],"missingAndInvalidContextDenied":true,"fixtureGraphRolledBack":true}
2026-10-22T23:17:48.2521351Z TENANT_BOUNDARY_ENDPOINTS_PASS {"registeredControllers":43,"inventoriedRoutes":106,"tenantHeaderRoutes":74,"negativeHTTPRequests":148,"controllerSourceGitBlobs":{"auth.controller.ts":"c432aa1e28e02c8064144e913168cc64e8a38e97","availability.controller.ts":"fc225952e5063d65b344046d77dc1f8062026b3c","cancellation.controller.ts":"e5cd5274b0ce7d02ebd7865897f7d4d2c278d295","career-conversion.controller.ts":"b05d7094db192ec5613219dc4b9c64e4e8d8679b","career.controller.ts":"fe8f6cadb28617c896883622be9fac305172ea1a","company-analytics.controller.ts":"9d4aea6ba5f51260dd7b9f298837be9cb806b4ba","company-dashboard.controller.ts":"46e0a2847dcfe9655979a405b29cffdac2f8026e","company-job-create.controller.ts":"50acee5e5f13731101bc77abcb29d5e21c946206","company-jobs.controller.ts":"e888c6a6db28bd3f48223f150a5895ffc6c26d9c","company-members.controller.ts":"b63fedb082c0b8ed20b1b9f7daebe5045705ab4d","conversations.controller.ts":"05f479c1ab3a2350c8bcd1fd32b1bdd574e62ec3","copilot.controller.ts":"a78315b38e7b9d018a6d47e0f300a377a5d84071","earnings.controller.ts":"f091a1262e2c7a9934358883ea2ef8919ababf97","health.controller.ts":"35afec02ee6dcf41c6d9bc7809f91e660cff44ff","integrity.controller.ts":"6004fa00460b9fc9466b343400371e07adaeaefb","jobs.controller.ts":"185be30435f34dc270461fefce284a37ac7a3b5e","me.controller.ts":"5e655898870718c4644998d76e1524c4af6d2c15","notifications.controller.ts":"dfe072e660b41060ff809eeefc489ae9aeb3981a","payment-events.controller.ts":"3030f292e35b5fbeb7c1c1bc0cd74149ea6d6313","payment-webhook.controller.ts":"81d39a81a9a93d556a8651d3492abc937f65a0f9","planner.controller.ts":"ceae97178b4f9b7fe9cf819e47d328bfcd09c790","privacy.controller.ts":"4c9427c20213a838fda51adc2547014f31ef5456","professional-capabilities.controller.ts":"6325906dea732851d6ed8f75be11c7baecbc7c5e","professional-planner.controller.ts":"5220558e1f5610607134b497bf95e16cecf39edb","professional-profile.controller.ts":"c7333a3d6b8b63d074885c5df9cc707482cc3949","ratings.controller.ts":"d4e41af53698b1658e620e717cafd1ec129a260a","replacement.controller.ts":"809c27f1551c103adc9e6950f79555eb42d3b7db","safety-admin.controller.ts":"baf0a51aae1c2cae598dbf3e7bdb7660b6b1f7f7","safety-appeals.controller.ts":"f9425e7357c8e6af17c866d1eb7803a19e430fff","safety-cases.controller.ts":"aa62c24959e927e896b041b744c4c154a58591b0","support.controller.ts":"b7418f9c3473b15ee32a488b7b354816c80acf28","talent-pools.controller.ts":"3e4156f6d582028101c06c5c21e6a2a7c6bc5ab4","taxonomy.controller.ts":"9552ffc4ddb96ebfe1db760cc104bcd23416bb5a","team-allocation.controller.ts":"a316e0362c7d4de75bcf8cf0c347b6d21bfcac7f","teams.controller.ts":"40ffb43f9200d79e60262d3f9005155cce64b7fc","terms.controller.ts":"597e5fbda7337046452e4e8542df00face09a416","trust-events.controller.ts":"ac760f24611da21d0b67f4b5ec5174915f07b73e","verification.controller.ts":"e43b5f95d05a505b5146a0c0ea2281d5d0dee63f","vertical-packs.controller.ts":"98a2b07f18f277c19220d588d1e44c945b11c8f4","work-assignments.controller.ts":"3c4c1c7023fb9fcbdfd84a4e594a67bbb491a6a8","work-graph.controller.ts":"5bed24a5999a66290a3eb058b09d70948e8c17f6","work-passport.controller.ts":"af621fe5009ff08f37d51ef49257b16293ceb5b7"},"actualDatabaseServicePoolSize":1,"commitAndRollbackReuse":true,"identityAPIsRemainOperational":true,"requests":173}
2026-10-22T23:17:48.2536094Z TENANT_BOUNDARY_RUNTIME_ACL_OBSERVED {"violations":[]}
2026-10-22T23:17:48.2540803Z TENANT_BOUNDARY_ACCEPTANCE_HTTP_PG_PASS {"tenantTables":27,"tableScopes":{"tenants":"PLATFORM","identities":"PLATFORM","sessions":"PLATFORM","auth_signin_limits":"PLATFORM","terms_acceptances":"PLATFORM","taxonomy_roles":"PLATFORM","schema_migrations":"PLATFORM","privacy_legal_holds":"PLATFORM","privacy_requests":"PLATFORM","privacy_retention_runs":"PLATFORM","privacy_legal_hold_reviews":"PLATFORM","professional_profiles":"PROFESSIONAL_OWNED","professional_capabilities":"PROFESSIONAL_OWNED","professional_availability_network":"PROFESSIONAL_OWNED","marketplace_jobs":"NETWORK_SHARED","marketplace_interests":"NETWORK_SHARED","marketplace_company_reputation":"NETWORK_SHARED"},"all106RoutesInventoried":true,"all74TenantHeaderRoutesDeniedForeignAndAnonymous":true,"globalAndIdentityRuntimeLeastPrivilege":true,"realPostgreSQL":true,"externalPentest":false,"nativeUI":false,"production":false}
2026-10-22T23:18:25.1848332Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/baseline/concurrent PASS
2026-10-22T23:18:31.5006035Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/baseline/serial PASS
2026-10-22T23:18:37.8167321Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/log-only/concurrent PASS
2026-10-22T23:18:44.1151092Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/log-only/serial PASS
2026-10-22T23:18:50.4396376Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/native-only/concurrent PASS
2026-10-22T23:18:51.7997728Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/native-only/serial PASS
2026-10-22T23:18:53.1528182Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/instrumented/concurrent PASS
2026-10-22T23:18:59.4418030Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/instrumented/serial PASS
2026-10-22T23:19:03.9364817Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/baseline/concurrent PASS
2026-10-22T23:19:13.1745843Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/log-only/concurrent PASS
2026-10-22T23:19:22.3727716Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/native-only/concurrent PASS
2026-10-22T23:19:31.7549112Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/instrumented/concurrent PASS
2026-10-22T23:19:34.5448678Z WEB_BROWSER_CURRENT_MAIN_CASE_RESULT PASS
2026-10-22T23:19:34.5449072Z WEB_BROWSER_DIAGNOSTIC_MATRIX_RESULT status=0
2026-10-22T23:19:34.5450020Z PASS: HTTP journey multi-company + company jobs/chat/notifications/replacements/talent-pool
2026-10-22T23:19:35.0721498Z PASS: recommendation ranking uses real role/city/availability signals and explainable reasons
2026-10-22T23:19:37.3352835Z [31m[Nest] 6718  - [39m10/22/2026, 11:19:36 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39merror: permission denied for table professional_profiles
2026-10-22T23:19:37.3354506Z     at async [90m/home/runner/work/MLIVRETRABALHO/MLIVRETRABALHO/apps/api/[39mdist/cancellation.controller.js:31:124
2026-10-22T23:19:37.6116579Z  2026-10-22 23:17:47.849 UTC [479] ERROR:  permission denied for table professional_profiles
2026-10-22T23:19:37.6117202Z  2026-10-22 23:17:47.852 UTC [479] ERROR:  permission denied for table professional_profiles
2026-10-22T23:19:37.6117667Z  2026-10-22 23:17:47.853 UTC [479] ERROR:  permission denied for table professional_profiles
2026-10-22T23:19:37.6127236Z  2026-10-22 23:17:47.881 UTC [479] ERROR:  permission denied for table professional_profiles
2026-10-22T23:19:37.6127709Z  2026-10-22 23:19:36.913 UTC [667] ERROR:  permission denied for table professional_profiles
```

## Controller integral após correção

```ts
import{BadRequestException,Body,Controller,Headers,Param,Post}from'@nestjs/common';import{AuthService}from'./auth.service';import{DatabaseService}from'./database.service';@Controller('assignments')export class CancellationController{constructor(private readonly db:DatabaseService,private readonly auth:AuthService){}@Post(':id/cancel')async cancel(@Param('id')id:string,@Body()b:unknown,@Headers('authorization')a?:string,@Headers('x-tenant-id')t?:string){const i=await this.auth.identityFromAuthorization(a);if(!t)throw new BadRequestException('tenant_required');const m=await this.auth.requireMembership(i.id,t);if(!b||typeof b!=='object'||Array.isArray(b))throw new BadRequestException('cancellation_reason_required');const input=b as Record<string,unknown>;if(typeof input.reason!=='string')throw new BadRequestException('cancellation_reason_required');const reason=input.reason.trim();if(!reason||reason.length>1000)throw new BadRequestException('cancellation_reason_required');if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id))throw new BadRequestException('assignment_invalid');return this.db.tenant(t,async db=>{const wa=(await db.query<any>('SELECT wa.id,wa.status,p.identity_id AS "professionalIdentityId" FROM work_assignments wa JOIN professional_profiles p ON p.id=wa.professional_id WHERE wa.tenant_id=$1 AND wa.id=$2 FOR NO KEY UPDATE OF wa',[t,id])).rows[0];if(!wa)throw new BadRequestException('assignment_not_found');if(!['confirmed','checked_in'].includes(wa.status))throw new BadRequestException('assignment_not_cancellable');const professional=wa.professionalIdentityId===i.id;const company=['owner','admin','manager','company'].includes(m.role);if(!professional&&!company)throw new BadRequestException('cancellation_not_allowed');const kind=professional?'professional':'company';await db.query('INSERT INTO assignment_cancellations(tenant_id,assignment_id,initiator_identity_id,reason,initiator_kind) VALUES($1,$2,$3,$4,$5) ON CONFLICT(assignment_id) DO NOTHING',[t,id,i.id,reason,kind]);const r=(await db.query("UPDATE work_assignments SET status='cancelled' WHERE tenant_id=$1 AND id=$2 AND status=ANY($3::text[]) RETURNING id,status",[t,id,['confirmed','checked_in']])).rows[0];if(!r)throw new BadRequestException('cancellation_conflict');await db.query("UPDATE replacement_requests SET status='cancelled',resolved_at=COALESCE(resolved_at,now()) WHERE tenant_id=$1 AND assignment_id=$2 AND status='open'",[t,id]);return{...r,initiatorKind:kind,compensationPolicy:'none_until_fin_risk_policy_approved'}})}}
```

## Prova integrada integral atual

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
  const catalog=async()=>({tables:(await db.query("SELECT c.relname,c.relrowsecurity,c.relforcerowsecurity,c.relowner::regrole::text owner,c.relacl::text FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='public' AND c.relkind IN('r','p') ORDER BY c.relname")).rows,policies:(await db.query("SELECT * FROM pg_policies WHERE schemaname='public' ORDER BY tablename,policyname")).rows,privilegedFunctions:(await db.query("SELECT p.proname,p.proowner::regrole::text owner,p.proconfig,pg_get_functiondef(p.oid) definition,has_function_privilege('app_runtime',p.oid,'EXECUTE') runtime_execute,EXISTS(SELECT 1 FROM aclexplode(COALESCE(p.proacl,acldefault('f',p.proowner))) a WHERE a.grantee=0 AND a.privilege_type='EXECUTE') public_execute FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace WHERE n.nspname='public' AND p.prosecdef ORDER BY p.proname")).rows});
  stage='explicit-whole-schema-scope-and-role';const beforeSecurity=await catalog();
  assert.deepEqual(beforeSecurity.tables.map(x=>x.relname),[...tenantTables,...Object.keys(otherScopes)].sort(),'Unclassified table is a hard failure');
  const role=(await db.query("SELECT rolsuper,rolbypassrls,rolcreatedb,rolcreaterole FROM pg_roles WHERE rolname='app_runtime'")).rows[0];check(role&&Object.values(role).every(x=>x===false),'runtime_nonprivileged_role');
  check((await db.query("SELECT count(*)::int count FROM pg_auth_members m JOIN pg_roles r ON r.oid=m.member WHERE r.rolname='app_runtime'")).rows[0].count===0,'no_inherited_role_escalation');
  for(const table of tenantTables){
   const entry=beforeSecurity.tables.find(x=>x.relname===table);check(entry.relrowsecurity&&entry.relforcerowsecurity&&entry.owner!=='app_runtime','forced_RLS_'+table);
   check((await db.query("SELECT attnotnull FROM pg_attribute WHERE attrelid=$1::regclass AND attname='tenant_id' AND NOT attisdropped",[table])).rows[0]?.attnotnull,'not_null_tenant_'+table);
   check(beforeSecurity.policies.some(x=>x.tablename===table&&x.qual&&x.with_check),'read_and_write_policy_'+table);
  }
  const callable=['active_marketplace_professional','active_marketplace_professional_identity','active_tenant_professional','active_tenant_professional_identity','confirm_marketplace_interest','list_company_members'];
  const triggerOnly=['refresh_marketplace_company_reputation','sync_marketplace_job_projection'];
  assert.deepEqual(beforeSecurity.privilegedFunctions.map(x=>x.proname),[...callable,...triggerOnly].sort(),'Every privileged project function must be explicitly audited');
  for(const f of beforeSecurity.privilegedFunctions)check(!f.public_execute&&f.owner!=='app_runtime'&&f.runtime_execute===callable.includes(f.proname)&&f.proconfig?.some(x=>x.replace(/\s/g,'')==='search_path=public,pg_temp'),'least_privileged_definer_'+f.proname);
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
   await db.query("INSERT INTO marketplace_interests(job_id,professional_id,status) VALUES($1,$2,'interested')",[job,professional]);
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
  stage='explicit-privileged-function-boundaries';
  for(let i=0;i<2;i++){
   await db.query("SELECT set_config('app.tenant_id',$1,true)",[owners[i].tenant]);
   const ownJob=seedRows.company_jobs[i].id,foreignJob=seedRows.company_jobs[1-i].id;
   for(const [name,identityResult]of [['active_marketplace_professional',false],['active_marketplace_professional_identity',true]]){
    check((await db.query('SELECT '+name+'($1,$2) value',[ownJob,pros[i].profile])).rows[0].value===(identityResult?pros[i].id:true),'own_marketplace_definer_'+name);
    check((await db.query('SELECT '+name+'($1,$2) value',[foreignJob,pros[1-i].profile])).rows[0].value===(identityResult?null:false),'foreign_marketplace_definer_'+name);
   }
   for(const [name,identityResult]of [['active_tenant_professional',false],['active_tenant_professional_identity',true]]){
    check((await db.query('SELECT '+name+'($1) value',[pros[i].profile])).rows[0].value===(identityResult?pros[i].id:true),'own_tenant_definer_'+name);
    check((await db.query('SELECT '+name+'($1) value',[pros[1-i].profile])).rows[0].value===(identityResult?null:false),'foreign_tenant_definer_'+name);
   }
   const members=(await db.query('SELECT identity_id FROM list_company_members()')).rows;
   check(members.length===2&&members.every(x=>[owners[i].id,pros[i].id].includes(x.identity_id)),'definer_identity_list_stays_in_tenant');
   check((await probe('SELECT confirm_marketplace_interest($1,$2)',[ownJob,pros[i].profile])).code===null,'own_confirmation_definer');
   check((await probe('SELECT confirm_marketplace_interest($1,$2)',[foreignJob,pros[1-i].profile])).code==='P0001','foreign_confirmation_definer_denied');
  }
  await db.query("SELECT set_config('app.tenant_id','',true)");
  for(const name of callable){
   const values=name.startsWith('active_marketplace')||name==='confirm_marketplace_interest'?[seedRows.company_jobs[0].id,pros[0].profile]:name.startsWith('active_tenant')?[pros[0].profile]:[];
   check((await probe('SELECT * FROM '+name+'('+values.map((_,i)=>'$'+(i+1)).join(',')+')',values)).code==='P0001','missing_context_definer_denied_'+name);
  }
  console.log('TENANT_BOUNDARY_PRIVILEGED_FUNCTIONS_PASS '+JSON.stringify({functions:beforeSecurity.privilegedFunctions.map(f=>({name:f.proname,publicExecute:f.public_execute,runtimeExecute:f.runtime_execute,fixedSearchPath:true,definitionSHA256:createHash('sha256').update(f.definition).digest('hex')})),ownAndForeignBothDirections:true,missingContextDenied:true,confirmationWritesRolledBack:true}));
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
  const profileTampered=await probe('UPDATE professional_profiles SET display_name=$1 WHERE id=$2',['Synthetic unauthorized profile change',pros[1].profile]);
  for(const [table,method,p]of [['terms_acceptances','INSERT_FOREIGN_IDENTITY',forged],['professional_capabilities','UPDATE_FOREIGN_PROFESSIONAL',tampered],['professional_profiles','UPDATE_FOREIGN_PROFILE',profileTampered]]){
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
  stage='least-privilege-professional-and-company-cancellation';
  for(let i=0;i<2;i++){
   const beforeForeign=await tenantSnapshot(),profilesBefore=(await db.query('SELECT to_jsonb(p) row FROM professional_profiles p WHERE id=ANY($1::uuid[]) ORDER BY id',[pros.map(x=>x.profile)])).rows;
   await call(pros[i],null,'/v1/jobs/'+owners[i].job+'/interest','POST',undefined,201);
   const assignment=await call(owners[i],owners[i].tenant,'/v1/company/jobs/'+owners[i].job+'/confirm','POST',{professionalId:pros[i].profile},201);
   const cancelled=await call(i===0?pros[i]:owners[i],owners[i].tenant,'/v1/assignments/'+assignment.id+'/cancel','POST',{reason:'Explicit synthetic boundary cancellation'},201);
   check(cancelled.status==='cancelled'&&cancelled.initiatorKind===(i===0?'professional':'company'),'real_cancellation_under_readonly_profile_permission');
   check((await db.query('SELECT status FROM work_assignments WHERE id=$1 AND tenant_id=$2',[assignment.id,owners[i].tenant])).rows[0]?.status==='cancelled','actual_assignment_cancelled');
   check((await db.query('SELECT count(*)::int count FROM assignment_cancellations WHERE assignment_id=$1 AND tenant_id=$2',[assignment.id,owners[i].tenant])).rows[0].count===1,'one_cancellation_audit_record');
   assert.deepEqual((await db.query('SELECT to_jsonb(p) row FROM professional_profiles p WHERE id=ANY($1::uuid[]) ORDER BY id',[pros.map(x=>x.profile)])).rows,profilesBefore,'Cancellation never writes profiles');
   const afterOwn=await tenantSnapshot();
   for(const table of tenantTables)assert.deepEqual(afterOwn[table].filter(x=>x.row.tenant_id===owners[1-i].tenant),beforeForeign[table].filter(x=>x.row.tenant_id===owners[1-i].tenant),'Other tenant unchanged by cancellation');
  }
  console.log('TENANT_BOUNDARY_LEAST_PRIVILEGE_CANCELLATION_PASS '+JSON.stringify({realHTTPPostgres:true,professionalAndCompany:true,assignmentAuditPersisted:true,profilesByteUnchanged:true,otherTenantAll27TablesUnchanged:true,profileUpdatePermissionNotRestored:true}));
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


## Reconciliação da expectativa existente de lock — 22/10/2026

CI39871529373/job120146860918attempt1FAIL doHEADa464e6347379b704393bc85674659882c2bf200a: tipos/build/exportPASS; RunTestsFAIL no caso43 de cancellation-input.controller.test, que ainda exigia o sufixo antigo `/FOR NO KEY UPDATE$/`. Migração/privacy/HTTP/browser/ProductionTruth SKIPPED nesta execução; não atribuir resultados3071 aesteSHA. Nenhumrerun.

Faltou atualizar a expectativa existente junto da mudança SQL; isto é uma falha de reconciliação do teste, não evidência nova de produto ou um motivo para restaurar grant. Alteração estrita de6caracteres no regex para `/FOR NO KEY UPDATE OF wa$/`, exigindo exatamente o lock da alocação. Sem alternância, regexmaisfraco, remoçãodeassert, novoscasos ou mudanças nas outras9cases. Todos os asserts de ordem/audit/WHEREcondicional/fechamentorequest/erros continuam BYTE-EXATOS; código de produto e nova jornada HTTP ficam idênticos aoHEADa464. O teste unitário observa SQL e usa mocks, NÃO substitui PostgreSQL real/barreirasconcorrentes. NovoSHA deve executar os gates completos, sememprestarPASS.

```text
2026-10-22T23:26:28.3534051Z not ok 43 - cancellation locks the assignment before writes and terminally closes only its open replacement request
2026-10-22T23:26:28.3534642Z   ---
2026-10-22T23:26:28.3534839Z   duration_ms: 1.156759
2026-10-22T23:26:28.3535059Z   type: 'test'
2026-10-22T23:26:28.3535651Z   location: '/home/runner/work/MLIVRETRABALHO/MLIVRETRABALHO/apps/api/.test-dist/cancellation-input.controller.test.js:89:22'
2026-10-22T23:26:28.3536279Z   failureType: 'testCodeFailure'
2026-10-22T23:26:28.3536545Z   error: |-
2026-10-22T23:26:28.3536898Z     The input did not match the regular expression /FOR NO KEY UPDATE$/. Input:
2026-10-22T23:26:28.3537278Z     
2026-10-22T23:26:28.3538147Z     'SELECT wa.id,wa.status,p.identity_id AS "professionalIdentityId" FROM work_assignments wa JOIN professional_profiles p ON p.id=wa.professional_id WHERE wa.tenant_id=$1 AND wa.id=$2 FOR NO KEY UPDATE OF wa'
2026-10-22T23:26:28.3538965Z     
2026-10-22T23:26:28.3539148Z   code: 'ERR_ASSERTION'
2026-10-22T23:26:28.3539376Z   name: 'AssertionError'
2026-10-22T23:26:28.3539591Z   expected:
2026-10-22T23:26:28.3540478Z   actual: 'SELECT wa.id,wa.status,p.identity_id AS "professionalIdentityId" FROM work_assignments wa JOIN professional_profiles p ON p.id=wa.professional_id WHERE wa.tenant_id=$1 AND wa.id=$2 FOR NO KEY UPDATE OF wa'
2026-10-22T23:26:28.3541326Z   operator: 'match'
2026-10-22T23:26:28.3541529Z   stack: |-
2026-10-22T23:26:28.3542181Z     TestContext.<anonymous> (/home/runner/work/MLIVRETRABALHO/MLIVRETRABALHO/apps/api/.test-dist/cancellation-input.controller.test.js:92:22)
2026-10-22T23:26:28.3543062Z     async Test.run (node:internal/test_runner/test:1054:7)
2026-10-22T23:26:28.3543554Z     async Test.processPendingSubtests (node:internal/test_runner/test:744:7)
2026-10-22T23:26:28.3544168Z   ...
2026-10-22T23:26:28.3544592Z # Subtest: cancellation missing assignment retains existing error without writes
2026-10-22T23:26:28.3545209Z ok 44 - cancellation missing assignment retains existing error without writes
2026-10-22T23:26:28.3545595Z   ---
2026-10-22T23:26:28.3545783Z   duration_ms: 0.609969
```

### Fonte integral do teste existente atualizado

```ts
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,UnauthorizedException} from '@nestjs/common';
import {CancellationController} from './cancellation.controller';
import type {DatabaseService} from './database.service';
import type {AuthService} from './auth.service';
const ID='11111111-2222-3333-4444-555555555555';
function setup(options:{authorized?:boolean;membership?:boolean;role?:string;professional?:boolean;found?:boolean;status?:string;conflict?:boolean;error?:Error}={}){
 const queries:{sql:string;params:unknown[]}[]=[],contexts:string[]=[],memberships:unknown[][]=[];
 const auth={identityFromAuthorization:async()=>{if(options.authorized===false)throw new UnauthorizedException();return{id:'trusted-identity'};},requireMembership:async(...args:unknown[])=>{memberships.push(args);if(options.membership===false)throw new UnauthorizedException();return{role:options.role??'owner'};}};
 const db={tenant:async(tenant:string,op:(db:unknown)=>Promise<unknown>)=>{contexts.push(tenant);if(options.error)throw options.error;return op({query:async(sql:string,params:unknown[]=[])=>{queries.push({sql,params});if(sql.startsWith('SELECT wa.id'))return{rows:options.found===false?[]:[{id:ID,status:options.status??'confirmed',professionalIdentityId:options.professional?'trusted-identity':'other-professional'}]};if(sql.startsWith('UPDATE work_assignments'))return{rows:options.conflict?[]:[{id:ID,status:'cancelled'}]};return{rows:[]};}});}};
 return{controller:new CancellationController(db as unknown as DatabaseService,auth as unknown as AuthService),queries,contexts,memberships};
}
async function invalid(body:unknown,message='cancellation_reason_required'){const h=setup();await assert.rejects(h.controller.cancel(ID,body as never,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message===message);assert.equal(h.contexts.length,0);}
test('cancellation rejects malformed JSON and non-text, blank or oversized reasons before SQL',async()=>{
 for(const body of [null,undefined,[],true,42,'text'])await invalid(body);
 for(const reason of [undefined,null,true,42,{},[],['Fixture'],'','  ','x'.repeat(1001)])await invalid({reason});
});
test('cancellation keeps trimmed maximum reason and authenticated tenant, actor and no-compensation policy',async()=>{
 const h=setup();assert.deepEqual(await h.controller.cancel(ID,{reason:'  '+'x'.repeat(1000)+'  ',tenantId:'forged',initiator_identity_id:'forged'} as never,'Bearer fixture','trusted-tenant'),{id:ID,status:'cancelled',initiatorKind:'company',compensationPolicy:'none_until_fin_risk_policy_approved'});
 assert.deepEqual(h.contexts,['trusted-tenant']);assert.deepEqual(h.memberships,[['trusted-identity','trusted-tenant']]);
 assert.deepEqual(h.queries[0]?.params,['trusted-tenant',ID]);
 assert.deepEqual(h.queries.find(q=>q.sql.startsWith('INSERT INTO assignment_cancellations'))?.params,['trusted-tenant',ID,'trusted-identity','x'.repeat(1000),'company']);
 assert.deepEqual(h.queries.find(q=>q.sql.startsWith('UPDATE work_assignments'))?.params,['trusted-tenant',ID,['confirmed','checked_in']]);
 assert.deepEqual(h.queries.find(q=>q.sql.startsWith('UPDATE replacement_requests'))?.params,['trusted-tenant',ID]);
});
test('cancellation rejects malformed assignment UUID before SQL',async()=>{
 for(const id of ['bad','',ID+'x']){const h=setup();await assert.rejects(h.controller.cancel(id,{reason:'Fixture'},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='assignment_invalid');assert.equal(h.contexts.length,0);}
});
test('cancellation authentication, tenant and membership precede payload and path validation',async()=>{
 const a=setup({authorized:false});await assert.rejects(a.controller.cancel('bad',null as never,undefined,'trusted-tenant'),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(a.memberships.length,0);assert.equal(a.contexts.length,0);
 const t=setup();await assert.rejects(t.controller.cancel('bad',null as never,'Bearer fixture'),(e:unknown)=>e instanceof BadRequestException&&e.message==='tenant_required');assert.equal(t.memberships.length,0);
 const m=setup({membership:false});await assert.rejects(m.controller.cancel('bad',null as never,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(m.contexts.length,0);
});
test('cancellation preserves own-professional permission, company roles and denied unrelated member',async()=>{
 const own=setup({role:'member',professional:true});const result=await own.controller.cancel(ID,{reason:'Fixture'},'Bearer fixture','trusted-tenant');assert.equal(result.initiatorKind,'professional');assert.equal(own.queries[1]?.params[4],'professional');
 for(const role of ['owner','admin','manager','company']){const h=setup({role});assert.equal((await h.controller.cancel(ID,{reason:'Fixture'},'Bearer fixture','trusted-tenant')).initiatorKind,'company');}
 const other=setup({role:'member'});await assert.rejects(other.controller.cancel(ID,{reason:'Fixture'},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='cancellation_not_allowed');assert.equal(other.queries.length,1);
});
test('cancellation preserves confirmed and checked_in scope and refuses completed or already cancelled assignments',async()=>{
 for(const status of ['confirmed','checked_in']){const h=setup({status});assert.equal((await h.controller.cancel(ID,{reason:'Fixture'},'Bearer fixture','trusted-tenant')).status,'cancelled');}
 for(const status of ['completed','cancelled','in_progress','no_show']){const h=setup({status});await assert.rejects(h.controller.cancel(ID,{reason:'Fixture'},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='assignment_not_cancellable');assert.equal(h.queries.length,1);}
});
test('cancellation keeps durable ON CONFLICT record and conditional update conflict without invented ACK',async()=>{
 const h=setup({conflict:true});await assert.rejects(h.controller.cancel(ID,{reason:'Fixture'},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='cancellation_conflict');
 assert.match(h.queries[1]!.sql,/ON CONFLICT\(assignment_id\) DO NOTHING/);assert.match(h.queries[2]!.sql,/status=ANY\(\$3::text\[\]\)/);assert.equal(h.queries.length,3);
});
test('cancellation locks the assignment before writes and terminally closes only its open replacement request',async()=>{
 const h=setup();await h.controller.cancel(ID,{reason:'Fixture'},'Bearer fixture','trusted-tenant');
 assert.match(h.queries[0]!.sql,/FOR NO KEY UPDATE OF wa$/);
 const close=h.queries.find(q=>q.sql.startsWith('UPDATE replacement_requests'));assert.ok(close);
 assert.match(close.sql,/status='cancelled'/);assert.match(close.sql,/resolved_at=COALESCE\(resolved_at,now\(\)\)/);
 assert.match(close.sql,/assignment_id=\$2 AND status='open'/);assert.deepEqual(close.params,['trusted-tenant',ID]);
});
test('cancellation missing assignment retains existing error without writes',async()=>{
 const h=setup({found:false});await assert.rejects(h.controller.cancel(ID,{reason:'Fixture'},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='assignment_not_found');assert.equal(h.queries.length,1);
});
test('cancellation database error propagates instead of fabricating cancellation',async()=>{
 const error=new Error('fixture DB unavailable'),h=setup({error});await assert.rejects(h.controller.cancel(ID,{reason:'Fixture'},'Bearer fixture','trusted-tenant'),(e:unknown)=>e===error);
});

```
