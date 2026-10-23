# Área8 — segurança interna: decisão e prova integrada — 23/10/2026 (UTC)

**APROVADO TÉCNICA E FUNCIONALMENTE NO ESCOPO INTERNO pelo assistente, por delegação do usuário.** Produto615 com ownCI+ownAPK+POSTCI+POSTAPK completos SUCCESS e bytes verificados. Publicação documental exige ownCI e POSTliteral; recibos finais no corpo do PR. Não é aceite externo/produção/pentest/físico.



---

## ACEITE TÉCNICO INTERNO — Área 8, segurança interna — 23/10/2026 (UTC)

**Decisão do assistente por delegação expressa do usuário: ÁREA 8 APROVADA TÉCNICA E FUNCIONALMENTE NO ESCOPO INTERNO.** O requisito original — auth, concorrência, PII, rate limit, logs, retries e falhas — está confrontado com implementação, jornada real HTTP/PostgreSQL, CI próprio e CI/APK literais pós-merge. A decisão não depende de confirmação manual. Este capítulo supersede somente a pendência temporal da Área8; o histórico integral e as falhas anteriores permanecem preservados.

Produto PR [#615](https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/615), HEAD75b838fd3333e2d2b58b32c8e09080dd4f0e7368; main literal **fbaec2e7674810b2f5232b0fd0c6673e1aadff29**, árvore643b08f635eaa47f1624d89ebc569324fe2e1839. CI próprio [39882883002](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39882883002)/job120184170938/attempt1 SUCCESS no sintético1471db0663d5fff083f125584b62cf16336f4ff4, pais[23b6,75b], árvore igual ao candidato. CI pós-merge [39885077256](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39885077256)/job120191255226/attempt1 SUCCESS no checkout LITERALfbaec (Gitlog01:38:09.8487562Z). Ambos completos:1936testes[217Web1186mobile519API3CLI11monitor], zero falhas/skip/cancel, tipos/build/exportAndroid/migrações2x/privacidade/HTTPPG/12controlesbrowser+canônico/MATRIX0/ProductionTruth. Sem rerun para obter verde.

A nova jornada real preserva Scrypt e token SHA256 no PostgreSQL;8falhas de senha concorrentes resultam7×401+1×429 e bloqueio real, com recuperação manual após expiração controlada da fixture. Exportações de3identidades preservam conteúdo próprio e retiram mensagens/comentários de terceiros, credenciais e campos de operador. Falha PostgreSQL P0001 na fixture própria retorna500 sem ACK/linha parcial, uma tentativa SQL por chamada e nenhuma repetição automática; CLI compilada real falha sem stdout de sucesso nem vazamento e recuperação HTTP manual retorna201. Logs reais não expõem canários de5categorias e mantêm status200/201/401/404/429/500, reqId e erro sanitizado. Os6warnings do source mobile permanecem sem erro bruto; queue, login, tenant e logout passam com adapter explícito, não SecureStore nativo. Testes acompanhantes reais de auth, atomicidade, RLS e retenção continuam obrigatórios. Fonte/crosswalk/primárias/limites completos: [SECURITY_INTERNAL_ACCEPTANCE_2026-10-23.md](../evidencias/SECURITY_INTERNAL_ACCEPTANCE_2026-10-23.md).

APK APLICÁVEL ao produto615 pela alteração de3warnings em session.ts: próprio [39882882955](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39882882955) SUCCESS no sintético1471; pós-merge [39885077269](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39885077269) SUCCESS no literal fbaec, install01:50:15.8826398Z/DEVICE_SMOKE_OK01:50:28.2457797Z sem Metro. Ambos ZIPs e APKs individuais baixados, CRCs/SHA256/SHA256SUMS/BUILD_INFO conferidos. POST artifact12471849419:ZIP28913870bytes SHAe82d9472c43c6067db11958f2de1673d55dd1312151518b677deb66ae917f35f;APK66162684bytes SHAf7be111824cb0a46bb72250a5008d2b489bcc4d6defcccebe432b32d5b0acdde. Este pacote de aceite altera exclusivamente7docs:184insumos Android/173mobile e todo runtime/workflow/lock são idênticos ao literal fbaec; APK N/A para o delta documental, sem alegar APK do novo SHA. Sua publicação exige CI próprio e pós-merge literal completos; recibos terminais no PR, sem commit de status.

**Matriz vigente:9áreas concluídas internamente — 2,3,4,5,6,7,8,9,10;4pendentes — 1,11,12,13.** Esta é uma decisão baseada no produto validado, não porcentagem de código ou aceite das outras áreas por arrasto. Pentest independente, fornecedores/runtime externo, aparelho físico, Visual Truth, todos os formulários RN/SecureStore nativo, produção, PSP e dinheiro real permanecem fora deste aceite. Não se afirma nova injeção adversarial em cada CLI ou linha de retention_runs: mapper compartilhado auditado e gates reais de retenção passaram; CLI adversarial executada foi privacy-requests-ops. Issues215/219/220/224/228 permanecem abertas e separadas;574/565 drafts. React19.1.4/RN0.81.6/lock/RLS/tenant/LGPD e controles browser/15s/sandbox/CORS/CDP/Fetch/LNA/NetLog preservados. Intermitência histórica do Chrome não tem RCA global declarada.


## Critério original → implementação → prova real no SHA do produto

Critério da matriz original: “Cobrir auth, concorrência, PII, rate limit, logs, retries e falhas; pentest independente/provider privacy EXTERNOS #219/#220.” O critério é tratado integralmente; as provas abaixo não encerram a Área11 nem a Área1.

| Requisito | Implementação | Teste integrado e evidência observada no literal fbaec |
|---|---|---|
| Autenticação e revogação | auth.controller.ts, sesssions no PostgreSQL; session.ts e queue reais | signup/signin4atores; todos password_hash Scrypt com salt e128hex/hash; token_hash SHA256; logout201 e token revogado401. AUTHENTICATION_ACCEPTANCE_JOURNEY_PASS acompanhante verifica convites, expiração e troca de tenant. |
| Concorrência e rate limit | auth_signin_limits com transação/lock existentes |8POST de senha inválida em paralelo:7×401+1×429;PGfailed_count8/locked;senha correta ainda429. Somente fixture local expira lock, login manual201 e row de limiter removida; SECURITY_AUTHENTICATION_CONCURRENCY_PASS01:40:57.9716984Z. Não é prova de DDoS em produção. |
| PII e exportação privada | PrivacyController/export, controle de autoria/tenant | Mensagens e rating realmente persistidos; exportação3atores preserva texto próprio e retira comentário recebido/texto/email alheios, credenciais e campos internos. Anônimo/outsider401; SECURITY_PRIVATE_EXPORT_PASS01:40:58.0589596Z. |
| Logs HTTP e aplicação | privacy-logging.ts + main.ts: Pino hook antes de interpolação, route pattern allowlisted, reqId gerado no servidor, Nestlogger privado | health/ready query/email/token/header/cookie; unmatched404; request body; SQLexception P0001.18028bytes API reais,5categorias,violations[],status200201401404429500+reqId+application_error+safeP0001 presentes; SECURITY_LOG_PRIVACY_OBSERVED01:40:58.3978194Z. Não desliga logger para passar. |
| Diagnósticos operacionais | privateOperationCode/Failure nas4CLIs; retention error_code usa mapper | Processo filho compilado privacy-requests-ops, PGerror real:exit1/stdoutvazio/database_P0001 semcanário; row permanece submitted/evidenceNULL. SECURITY_OPERATION_LOG_OBSERVED01:40:58.1453079Z. Outros3CLIs/mapper retention fonte auditada+gates acompanhantes; não nova injeção individual nem linha de erro retention medida. |
| Retries e falhas | transação real, transporte sem retry automático; recuperação explícita | Trigger pertence só à identidade/detail da fixture; sequência não rollback prova1tentativa na chamada HTTP e1adicional CLI. HTTP500 semrequestId/semrows extras; hookremovido; manualPOST201 persiste detail. SECURITY_FAILURE_RECOVERY_PASS01:40:58.1511134Z. Falha não implica cancelamento físico do servidor. |
| Logs e estado de sessão mobile |3warnings fixos session.ts; verifiedStorage/session-transaction sem alteração | Source completo real+queue, adapterSecureStore explícito que lança Errorcanário:get/set/delete token e tenant=6warnings semcanário. Positivos login/tenant/logout preservados; SECURITY_MOBILE_LOG_OBSERVED01:40:58.4500962Z eSESSIONPASS.4506976Z. Não é SecureStore nativo/RNrender. |
| Isolamento/atomicidade/privacidade acompanhantes | migrações/políticas/ACL e journeys existentes preservados | TENANT_BOUNDARY_ACCEPTANCE_HTTP_PG_PASS01:40:57.1049884Z:44tabelas/27tenant,106rotas inventariadas,74rotas tenant negadas foreign/anônimo,148chamadas negativas,ACLviolations[]. Auth/invites/notification/ledger/retention/holds/concorrência originais continuam executados no mesmoCI. |
| Navegador e diagnóstico funcional |12controles+canônico obrigatórios;failclosed |12/12PASS;canônicoPASS01:42:52.6800486Z/MATRIX0.6801028Z;ProductionTruth01:44:00.4250321Z. Não relaxa sandbox,15s,Fetch/CDP,CORS,LNA,NetLog/dataLoss/asserts. |
| Android alterado | session.ts compilado no APK próprio e literal pós-merge | ZIP+APKverificados,BUILD_INFOliteral fbaec/bundleembarcado/instalação+launch semMetro. Emulador não demonstra todos os fluxos UI ou aparelho físico. |

## Produto final e revisão de escopo

Base de615:23b62c2423c105350e442ebab3b5030619711b35; finalHEAD75b838fd3333e2d2b58b32c8e09080dd4f0e7368; sintéticoCI1471db0663d5fff083f125584b62cf16336f4ff4; merge/mainliteralfbaec2e7674810b2f5232b0fd0c6673e1aadff29. Árvores candidato/sintético/main iguais643b08f635eaa47f1624d89ebc569324fe2e1839, pais ordenados confirmados viaGit API.

```json
[
  {
    "path": "apps/api/src/privacy-logging.ts",
    "sha": "3f0eec1d30f2183cb2c5efb681e414638e8ed6b8",
    "mode": "100644"
  },
  {
    "path": "apps/api/src/main.ts",
    "sha": "3500c1c5d67283c1a7d3a3fe9218c8e93d07f6fc",
    "mode": "100644"
  },
  {
    "path": "apps/api/src/migrate.ts",
    "sha": "b3ebd6ac41a4719327a90f48a037d083d7cc941e",
    "mode": "100644"
  },
  {
    "path": "apps/api/src/privacy-legal-holds-ops.ts",
    "sha": "6082e6523c9e97b49e236977dfe5de4f55d8e1fa",
    "mode": "100644"
  },
  {
    "path": "apps/api/src/privacy-requests-ops.ts",
    "sha": "18bc1c5c30f8ffcef60fe6977f8160ce98735e51",
    "mode": "100644"
  },
  {
    "path": "apps/api/src/privacy-retention.ts",
    "sha": "ec510bc1fef6ae88e2cc3f40023fd686e1199562",
    "mode": "100644"
  },
  {
    "path": "apps/mobile/lib/session.ts",
    "sha": "2be0e1f28380f9b4f8d18e39a48489dbf87fa9f0",
    "mode": "100644"
  },
  {
    "path": "scripts/security-acceptance-e2e.cjs",
    "sha": "6c114658a104aac99766c39abbd78e0629b26426",
    "mode": "100644"
  },
  {
    "path": "scripts/http-journey-e2e.sh",
    "sha": "8ec2ae2f2e2d5ccd732f8b75c512a120180d76bf",
    "mode": "100755"
  }
]
```

Auditoria anterior leu integralmente173fontes runtime Git[85API77mobile11Web], registrada com manifestos nas notas INTERNAL_SECURITY_ACCEPTANCE_JOURNEY_2026-10-22.md e INTERNAL_SECURITY_LOG_PRIVACY_FIX_2026-10-22.md, preservadas integralmente neste produto. Novo logger usa inferência estrutural mínima para compatibilidade das versões Fastify5.12.5direta/5.11.3Nest existentes no lock; não any/cast de opções, mudança de dependências ou passthrough de argumentos brutos. privateErrorMetadata admite somente tipo/SQLSTATE allowlisted; método/rotaREGISTRADA/status/elapsed são allowlisted; mensagens/stack/URLraw/headers/body/SQLdetail não são encaminhados. Erros das4CLIs usam códigos normalizados, mas stdout funcional de operadores privilegiados permanece funcional. Nenhuma políticaSQL/APIauth/retentionrule/PSP/browserguard foi relaxada.

História não apagada:3ed3ff/CI39881170789 confirmou auth/export/fault mas parou por fixture health404 (corrigida para/v1/health/ready), antes de scanfinal/mobile; logprimário independentemente expôs query eSQLcanários. eaa5/39882323962 e4dee/39882633172 falharam SOMENTETypecheck por tiposPino/Fastifyduplos. Posteriores etapas não foram sucesso nessesHEADs. Final75b alterou tipo estrutural real, recebeu novaCI+APK ePOST completos; zero reruns de mesmo SHA. Baseline errado não é bugHealthController nem RCAChrome. O verificador local deSUMS inicialmente selecionou extensão errada (SHA256SUMS em vez deSHA256SUMS.txt), foi corrigido e ambos archives revalidados antes desta decisão; isso não é falha do APK.

## Primária integral selecionada — CI próprio

```text
2026-10-23T01:16:43.1180558Z # tests 217
2026-10-23T01:16:43.1181005Z # fail 0
2026-10-23T01:16:43.1181160Z # cancelled 0
2026-10-23T01:16:43.1181305Z # skipped 0
2026-10-23T01:16:51.1702187Z # tests 1186
2026-10-23T01:16:51.1702744Z # fail 0
2026-10-23T01:16:51.1702880Z # cancelled 0
2026-10-23T01:16:51.1703012Z # skipped 0
2026-10-23T01:16:56.1578379Z # tests 519
2026-10-23T01:16:56.1578628Z # fail 0
2026-10-23T01:16:56.1578712Z # cancelled 0
2026-10-23T01:16:56.1578798Z # skipped 0
2026-10-23T01:16:56.2753606Z # tests 3
2026-10-23T01:16:56.2756486Z # fail 0
2026-10-23T01:16:56.2757084Z # cancelled 0
2026-10-23T01:16:56.2757642Z # skipped 0
2026-10-23T01:16:56.3918833Z # tests 11
2026-10-23T01:16:56.3920621Z # fail 0
2026-10-23T01:16:56.3921386Z # cancelled 0
2026-10-23T01:16:56.3921954Z # skipped 0
2026-10-23T01:17:42.5097977Z SECURITY_AUTHENTICATION_CONCURRENCY_PASS {"realHTTPPostgres":true,"parallelFailures":8,"unauthorized":7,"locked":1,"storedPasswordsScrypt":true,"storedTokensSHA256":true,"explicitRecovery":true}
2026-10-23T01:17:42.5805172Z SECURITY_PRIVATE_EXPORT_PASS {"realPersistedMessagesAndRating":true,"ownContentPreserved":true,"thirdPartyContentRedacted":true,"outsiderEmptyPrivateData":true,"credentialsAndOperatorFieldsAbsent":true}
2026-10-23T01:17:42.6625534Z SECURITY_OPERATION_LOG_OBSERVED {"realChildProcessAndDatabase":true,"exitCode":1,"noSuccessOutput":true,"canaryDisclosed":false}
2026-10-23T01:17:42.6672475Z SECURITY_FAILURE_RECOVERY_PASS {"realDatabaseFault":true,"http500":true,"noSuccessACK":true,"zeroPartialRows":true,"sqlAttempts":1,"automaticRetry":false,"explicitManualRetry201":true,"ownedFaultRemoved":true}
2026-10-23T01:17:42.9125720Z SECURITY_LOG_PRIVACY_OBSERVED {"actualAPILog":true,"scannedBytes":18040,"syntheticCategories":["credentials","query","unmatchedPath","requestBody","databaseError"],"violations":[],"statusDiagnostics":[200,201,401,404,429,500],"requestCorrelation":true}
2026-10-23T01:17:42.9648168Z SECURITY_MOBILE_LOG_OBSERVED {"actualSource":true,"nativeAdapterFixture":true,"warnings":6,"canaryDisclosed":false,"physicalDevice":false}
2026-10-23T01:17:42.9653323Z SECURITY_MOBILE_LOG_AND_SESSION_PASS {"warningsRetained":true,"noRawError":true,"realQueueAndVerifiedStorageCore":true,"nativeSecureStore":false}
2026-10-23T01:17:42.9656620Z SECURITY_INTERNAL_ACCEPTANCE_HTTP_PG_PASS {"authentication":true,"concurrentRateLimit":true,"privateExport":true,"realFaultRecovery":true,"noAutomaticRetry":true,"serverLogPrivacy":true,"requests":43,"disposableLocalOnly":true,"externalPentest":false,"physicalDevice":false,"production":false}
2026-10-23T01:18:24.6206050Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/baseline/concurrent PASS
2026-10-23T01:18:25.9781507Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/baseline/serial PASS
2026-10-23T01:18:32.3022920Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/log-only/concurrent PASS
2026-10-23T01:18:38.6128589Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/log-only/serial PASS
2026-10-23T01:18:44.8914319Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/native-only/concurrent PASS
2026-10-23T01:18:51.2459729Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/native-only/serial PASS
2026-10-23T01:18:57.4850920Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/instrumented/concurrent PASS
2026-10-23T01:18:58.8218978Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/instrumented/serial PASS
2026-10-23T01:19:08.4933503Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/baseline/concurrent PASS
2026-10-23T01:19:17.8592818Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/log-only/concurrent PASS
2026-10-23T01:19:27.0239585Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/native-only/concurrent PASS
2026-10-23T01:19:31.3072649Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/instrumented/concurrent PASS
2026-10-23T01:19:34.1090758Z WEB_BROWSER_CURRENT_MAIN_CASE_RESULT PASS
2026-10-23T01:19:34.1091150Z WEB_BROWSER_DIAGNOSTIC_MATRIX_RESULT status=0
2026-10-23T01:20:38.3224221Z PASS: Production Truth Gate health/readiness contract
```

## Primária selecionada — CI literal pós-merge

```text
2026-10-23T01:38:09.8455743Z [command]/usr/bin/git log -1 --format=%H
2026-10-23T01:38:09.8487562Z fbaec2e7674810b2f5232b0fd0c6673e1aadff29
2026-10-23T01:39:55.6990963Z # tests 217
2026-10-23T01:39:55.6991278Z # pass 217
2026-10-23T01:39:55.6991414Z # fail 0
2026-10-23T01:39:55.6991573Z # cancelled 0
2026-10-23T01:39:55.6991727Z # skipped 0
2026-10-23T01:40:03.7528965Z # tests 1186
2026-10-23T01:40:03.7529289Z # pass 1186
2026-10-23T01:40:03.7529436Z # fail 0
2026-10-23T01:40:03.7529602Z # cancelled 0
2026-10-23T01:40:03.7529761Z # skipped 0
2026-10-23T01:40:09.1082580Z # tests 519
2026-10-23T01:40:09.1082746Z # pass 519
2026-10-23T01:40:09.1082831Z # fail 0
2026-10-23T01:40:09.1082920Z # cancelled 0
2026-10-23T01:40:09.1083002Z # skipped 0
2026-10-23T01:40:09.2348234Z # tests 3
2026-10-23T01:40:09.2351011Z # pass 3
2026-10-23T01:40:09.2361752Z # fail 0
2026-10-23T01:40:09.2362169Z # cancelled 0
2026-10-23T01:40:09.2362320Z # skipped 0
2026-10-23T01:40:09.3499603Z # tests 11
2026-10-23T01:40:09.3500356Z # pass 11
2026-10-23T01:40:09.3511894Z # fail 0
2026-10-23T01:40:09.3512567Z # cancelled 0
2026-10-23T01:40:09.3512728Z # skipped 0
2026-10-23T01:40:34.6890952Z MOBILE_WINDOW_AVAILABILITY_REAL_JSON_PASS actual_API_JSON_consumed=true native_UI=false new_HTTP_POSTs=0
2026-10-23T01:40:34.8082062Z MOBILE_WINDOW_PUBLICATION_REAL_JSON_PASS actual_API_JSON_consumed=true native_UI=false new_HTTP_POSTs=0
2026-10-23T01:40:41.2062029Z MOBILE_CHAT_REAL_JSON_PASS actual_API_JSON_consumed=true native_UI=false new_HTTP_POSTs=0
2026-10-23T01:40:53.6299019Z LEDGER_MOBILE_REAL_JSON_PASS {"actualHTTPJSON":true,"rollbackReadyEmpty":true,"recoveryReadyBoundPayable":true,"tenantId":"5a5e2d1d-de9f-4d62-9eb8-3632b75a0eb8","assignmentId":"89387edc-e709-448b-9230-ba66bcf74ac9","ledgerId":"a6dda53f-25ef-4a99-9740-430c7cc5d2c0","amountCents":23456,"additionalHTTPRequests":0,"androidUIOrProviderOrRealMoney":false}
2026-10-23T01:40:57.9716984Z SECURITY_AUTHENTICATION_CONCURRENCY_PASS {"realHTTPPostgres":true,"parallelFailures":8,"unauthorized":7,"locked":1,"storedPasswordsScrypt":true,"storedTokensSHA256":true,"explicitRecovery":true}
2026-10-23T01:40:58.0589596Z SECURITY_PRIVATE_EXPORT_PASS {"realPersistedMessagesAndRating":true,"ownContentPreserved":true,"thirdPartyContentRedacted":true,"outsiderEmptyPrivateData":true,"credentialsAndOperatorFieldsAbsent":true}
2026-10-23T01:40:58.1511134Z SECURITY_FAILURE_RECOVERY_PASS {"realDatabaseFault":true,"http500":true,"noSuccessACK":true,"zeroPartialRows":true,"sqlAttempts":1,"automaticRetry":false,"explicitManualRetry201":true,"ownedFaultRemoved":true}
2026-10-23T01:40:58.3978194Z SECURITY_LOG_PRIVACY_OBSERVED {"actualAPILog":true,"scannedBytes":18028,"syntheticCategories":["credentials","query","unmatchedPath","requestBody","databaseError"],"violations":[],"statusDiagnostics":[200,201,401,404,429,500],"requestCorrelation":true}
2026-10-23T01:40:58.4506976Z SECURITY_MOBILE_LOG_AND_SESSION_PASS {"warningsRetained":true,"noRawError":true,"realQueueAndVerifiedStorageCore":true,"nativeSecureStore":false}
2026-10-23T01:40:58.4511046Z SECURITY_INTERNAL_ACCEPTANCE_HTTP_PG_PASS {"authentication":true,"concurrentRateLimit":true,"privateExport":true,"realFaultRecovery":true,"noAutomaticRetry":true,"serverLogPrivacy":true,"requests":43,"disposableLocalOnly":true,"externalPentest":false,"physicalDevice":false,"production":false}
2026-10-23T01:42:52.6800486Z WEB_BROWSER_CURRENT_MAIN_CASE_RESULT PASS
2026-10-23T01:42:52.6801028Z WEB_BROWSER_DIAGNOSTIC_MATRIX_RESULT status=0
2026-10-23T01:43:16.8531788Z MOBILE_SUPPORT_REAL_JSON_PASS actual_API_JSON_consumed=true storage_fixture=in_memory native_UI=false new_HTTP_POSTs=0
2026-10-23T01:40:58.1453079Z SECURITY_OPERATION_LOG_OBSERVED {"realChildProcessAndDatabase":true,"exitCode":1,"noSuccessOutput":true,"canaryDisclosed":false}
2026-10-23T01:40:58.4500962Z SECURITY_MOBILE_LOG_OBSERVED {"actualSource":true,"nativeAdapterFixture":true,"warnings":6,"canaryDisclosed":false,"physicalDevice":false}
2026-10-23T01:44:00.4250321Z PASS: Production Truth Gate health/readiness contract
```

## Testemunhas acompanhantes no mesmo CI literal

```text
2026-10-23T01:40:10.6742953Z [36;1mDATABASE_URL="$RETENTION_TEST_URL" pnpm --filter @mlivretrabalho/api migrate[0m
2026-10-23T01:40:10.6743843Z [36;1mDATABASE_URL="$RETENTION_TEST_URL" PRIVACY_OPERATOR_ID="ci:privacy-retention" bash scripts/privacy-retention-e2e.sh[0m
2026-10-23T01:40:10.6744633Z [36;1mDATABASE_URL="$RETENTION_TEST_URL" bash scripts/privacy-retention-concurrency-e2e.sh[0m
2026-10-23T01:40:10.6745392Z [36;1mDATABASE_URL="$RETENTION_TEST_URL" EXPECTED_OPERATOR="ci:privacy-retention" bash scripts/privacy-retention-audit-e2e.sh[0m
2026-10-23T01:40:10.6746131Z [36;1mDATABASE_URL="$RETENTION_TEST_URL" bash scripts/privacy-legal-holds-e2e.sh[0m
2026-10-23T01:40:10.6811630Z   RETENTION_TEST_URL: ***localhost:5432/mlivretrabalho_retention
2026-10-23T01:40:49.6545058Z NOTIFICATION_ATOMICITY_ROLLBACK_PASS {"flow":"company-confirm","http":500,"targetedInsertAttempts":1,"runtime":"app_runtime","tenantRowsUnchanged":true,"otherTenantUnchanged":true,"hookRemoved":true}
2026-10-23T01:40:49.6771996Z NOTIFICATION_ATOMICITY_POSITIVE_PASS company-confirm real ACK, one assignment/membership/notification, exact replay
2026-10-23T01:40:49.7043981Z NOTIFICATION_ATOMICITY_ROLLBACK_PASS {"flow":"chat-new-conversation","http":500,"targetedInsertAttempts":1,"runtime":"app_runtime","tenantRowsUnchanged":true,"otherTenantUnchanged":true,"hookRemoved":true}
2026-10-23T01:40:49.7413563Z NOTIFICATION_ATOMICITY_ROLLBACK_PASS {"flow":"chat-existing-conversation","http":500,"targetedInsertAttempts":1,"runtime":"app_runtime","tenantRowsUnchanged":true,"otherTenantUnchanged":true,"hookRemoved":true}
2026-10-23T01:40:49.7456772Z NOTIFICATION_ATOMICITY_POSITIVE_PASS chat real message ACK/read, one conversation/message/notification, prior history retained
2026-10-23T01:40:49.8648429Z NOTIFICATION_ATOMICITY_ROLLBACK_PASS {"flow":"chat-second-recipient","http":500,"targetedInsertAttempts":2,"bothPendingAlertsSeenBeforeFailure":true,"runtime":"app_runtime","tenantRowsUnchanged":true,"otherTenantUnchanged":true,"hookRemoved":true}
2026-10-23T01:40:49.8894491Z NOTIFICATION_ATOMICITY_POSITIVE_PASS chat-two-recipients one real message ACK, two persisted recipient alerts, both authorized inboxes
2026-10-23T01:40:49.9438130Z NOTIFICATION_ATOMICITY_ROLLBACK_PASS {"flow":"replacement-select","http":500,"targetedInsertAttempts":1,"runtime":"app_runtime","tenantRowsUnchanged":true,"otherTenantUnchanged":true,"hookRemoved":true}
2026-10-23T01:40:49.9567556Z NOTIFICATION_ATOMICITY_POSITIVE_PASS replacement real matched ACK, original cancelled, new confirmed, request resolved, one notification
2026-10-23T01:40:49.9695236Z NOTIFICATION_ATOMICITY_PASS five injected HTTP500 rollbacks including second-recipient failure plus four positive phases; no delivery/provider/outbox claim
2026-10-23T01:40:52.5023730Z AUTHENTICATION_ACCEPTANCE_JOURNEY_PASS {"signupCompanyAndProfessional":true,"normalizedAndDuplicateEmail":true,"invalidClientNoPOST":true,"wrongPasswordRejected":true,"actualOwnerAndMemberships":true,"crossTenantDenied":true,"twoCompanyClientContext":true,"emailBoundSingleUseInvites":true,"revokedInviteRejectedByClientAndAPI":true,"expiredInviteRejectedAndRenewed":true,"expiredSessionRejected":true,"oldLogoutCannotClearNewLogin":true,"remoteRevocation401":true,"verifiedClientClear":true,"mobileCoreBlobs":{"signup":"800faeb27d041108ab7c1c9018f749c32d2a0010","signin":"453de55dfc31d983fc8e279b8c91104913a927b0","company-members":"85c86260e3cecc70df9e8ffe24dd246f5cab9d7a","session-transaction":"d10eb3b0ce05326947aa216d30db2571d1501dc8"},"realHTTPPostgres":true,"storage":"explicit in-memory adapter; NOT native SecureStore","physicalDevice":false,"production":false}
2026-10-23T01:40:53.5998198Z LEDGER_COMPLETION_INSERT_ROLLBACK_PASS {"realHTTP500":true,"completedAndLedgerWitness":2,"nonRollbackWitness":1,"fiveTablesTwoTenantsUnchanged":true,"assignmentStillCheckedOut":true,"noPayableEarning":true,"policiesACLUnchanged":true}
2026-10-23T01:40:53.6304609Z LEDGER_COMPLETION_ATOMICITY_HTTP_PG_PASS {"rollback":true,"explicitRecovery201":true,"oneExactPayableLedger":true,"repeatComplete400":true,"foreignLedgerUnchanged":true,"authIsolation":true,"ownedHookRemoved":true,"providerOrRealMoneyOrNativeUI":false}
2026-10-23T01:40:55.6751838Z MATCHING_ACCEPTANCE_HTTP_PG_PASS {"actualMobileClients":{"company-candidates":"d042f8221b70cca7c984138d941f185d94c89ba5","company-replacements":"7f52f95bcb5ff5b25c30be8d9870014fe1c5ccc6","teams":"eeeab168bfb62c62f2552d28bd6600ae23adada1","jobs":"54d0814ace6e91565e0fa9c8722ea734594b015f"},"realHTTPPostgres":true,"humanLowerRankConfirmation":true,"confirmationReplayExact":true,"availabilityFiltersRecommendationAllocationSelection":true,"allocationAndAutoMatchReadOnly":true,"explicitNonrecommendedReplacement":true,"closedSelectionReplayRejected":true,"selectedProfessionalAgendaBound":true,"sevenTablesTwoTenantsDenialsUnchanged":true,"ACLPoliciesUnchanged":true,"requests":76,"posts":60,"nativeUI":false,"physicalDevice":false,"providerOrRealMoney":false}
2026-10-23T01:40:56.6338691Z TENANT_BOUNDARY_OWNER_WRITE_OBSERVED {"table":"terms_acceptances","method":"INSERT_FOREIGN_IDENTITY","sqlstate":"42501","rowCount":null,"rolledBack":true}
2026-10-23T01:40:56.6340067Z TENANT_BOUNDARY_OWNER_WRITE_OBSERVED {"table":"professional_capabilities","method":"UPDATE_FOREIGN_PROFESSIONAL","sqlstate":"42501","rowCount":null,"rolledBack":true}
2026-10-23T01:40:56.6342250Z TENANT_BOUNDARY_OWNER_WRITE_OBSERVED {"table":"professional_profiles","method":"UPDATE_FOREIGN_PROFILE","sqlstate":"42501","rowCount":null,"rolledBack":true}
2026-10-23T01:40:57.0921272Z TENANT_BOUNDARY_LEAST_PRIVILEGE_CANCELLATION_PASS {"realHTTPPostgres":true,"professionalAndCompany":true,"assignmentAuditPersisted":true,"profilesByteUnchanged":true,"otherTenantAll27TablesUnchanged":true,"profileUpdatePermissionNotRestored":true}
2026-10-23T01:40:57.1045435Z TENANT_BOUNDARY_RUNTIME_ACL_OBSERVED {"violations":[]}
2026-10-23T01:40:57.1049884Z TENANT_BOUNDARY_ACCEPTANCE_HTTP_PG_PASS {"tenantTables":27,"tableScopes":{"tenants":"PLATFORM","identities":"PLATFORM","sessions":"PLATFORM","auth_signin_limits":"PLATFORM","terms_acceptances":"PLATFORM","taxonomy_roles":"PLATFORM","schema_migrations":"PLATFORM","privacy_legal_holds":"PLATFORM","privacy_requests":"PLATFORM","privacy_retention_runs":"PLATFORM","privacy_legal_hold_reviews":"PLATFORM","professional_profiles":"PROFESSIONAL_OWNED","professional_capabilities":"PROFESSIONAL_OWNED","professional_availability_network":"PROFESSIONAL_OWNED","marketplace_jobs":"NETWORK_SHARED","marketplace_interests":"NETWORK_SHARED","marketplace_company_reputation":"NETWORK_SHARED"},"all106RoutesInventoried":true,"all74TenantHeaderRoutesDeniedForeignAndAnonymous":true,"globalAndIdentityRuntimeLeastPrivilege":true,"realPostgreSQL":true,"externalPentest":false,"nativeUI":false,"production":false}
2026-10-23T01:44:00.0301338Z PASS: privacy export is scoped/redacted and DSAR requests are actionable with accountable internal-only operator evidence
2026-10-23T01:44:00.4250321Z PASS: Production Truth Gate health/readiness contract
```

## Recibo final615 integral preservado

## RECIBO TERMINAL — produto de segurança validado em 23/10/2026 (UTC)

PR #615 já integrado em `fbaec2e7674810b2f5232b0fd0c6673e1aadff29`, árvore `643b08f635eaa47f1624d89ebc569324fe2e1839`, pais ordenados [23b62c2423c105350e442ebab3b5030619711b35,75b838fd3333e2d2b58b32c8e09080dd4f0e7368]. Não houve novo merge ou rerun nesta verificação.

| Gate | Run/job/attempt | Resultado e checkout primário |
|---|---|---|
| CI próprio | [39882883002](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39882883002)/120184170938/1 | SUCCESS; sintético1471db0663d5fff083f125584b62cf16336f4ff4, pais[23b6,75b], árvore643b igual ao candidato, não HEAD literal |
| APK próprio | [39882882955](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39882882955)/120184170854/1 | SUCCESS; mesmo sintético1471; build01:26:13.8032026Z/install01:27:42.6065529Z/DEVICE_SMOKE_OK01:27:55.0944208Z sem Metro |
| CI pós-merge | [39885077256](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39885077256)/120191255226/1 | SUCCESS; checkout Gitlog01:38:09.8487562Z LITERALfbaec; Production Truth01:44:00.4250321Z |
| APK pós-merge | [39885077269](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39885077269)/120191254974/1 | SUCCESS; Gitlog01:37:57.1224074Z LITERALfbaec; build01:48:42.3722684Z/install01:50:15.8826398Z/DEVICE_SMOKE_OK01:50:28.2457797Z sem Metro |

Ambos CIs completos:1936 testes[217Web1186mobile519API3CLI11monitor], zero fail/skip/cancel, tipos/build/exportAndroid/migrações2x/privacidade/HTTPPG/12controlesbrowser+canônico/MATRIX0/ProductionTruth. Activity Watch é separado, não build. A nova jornada tem43HTTPrequests integrados, não testes unitários novos. Primária pós-merge: auth concorrente01:40:57.9716984Z; exportação privada01:40:58.0589596Z; CLI real01:40:58.1453079Z; falhaPG/recuperação01:40:58.1511134Z; logs01:40:58.3978194Z(18028bytes,5categorias,0violações,6status+reqId presentes);6warningsmobile semcanário01:40:58.4500962Z; queue/login/tenant/logout01:40:58.4506976Z; wholeSecurity01:40:58.4511046Z. Canônico01:42:52.6800486Z/MATRIX0.6801028Z. Nenhum prazo/segurança/browser/RLS relaxado.

### Artefatos próprios baixados e recalculados independentemente

```json
{
  "own": {
    "zipSize": 28913857,
    "zipSHA256": "a8233907e08d393b021af7955e37b68746fd7df41884b833ace60592121d08ce",
    "apkSize": 66162688,
    "apkSHA256": "0ad120d4db9fb1aebd79e79dbc2b67a1c465a4c63ea924ec15bad09367d45763",
    "metadata": {
      "BUILD_INFO.txt": "product=MLivreTrabalho Pilot\nversion=0.1.0\nandroid_package=com.predibeacon.mlivretrabalho.pilot\ncommit_sha=1471db0663d5fff083f125584b62cf16336f4ff4\nbuild_time_utc=2026-10-23T01:26:14Z\nbuild_variant=release\nmetro_required=false\nsigning=android_release_internal_pilot_only\n",
      "SHA256SUMS.txt": "0ad120d4db9fb1aebd79e79dbc2b67a1c465a4c63ea924ec15bad09367d45763  /home/runner/work/MLIVRETRABALHO/MLIVRETRABALHO/artifacts/android-pilot/MLivreTrabalho.apk\n"
    },
    "manifestSHA256": "ea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480",
    "embeddedBundle": true
  },
  "post": {
    "zipSize": 28913870,
    "zipSHA256": "e82d9472c43c6067db11958f2de1673d55dd1312151518b677deb66ae917f35f",
    "apkSize": 66162684,
    "apkSHA256": "f7be111824cb0a46bb72250a5008d2b489bcc4d6defcccebe432b32d5b0acdde",
    "metadata": {
      "BUILD_INFO.txt": "product=MLivreTrabalho Pilot\nversion=0.1.0\nandroid_package=com.predibeacon.mlivretrabalho.pilot\ncommit_sha=fbaec2e7674810b2f5232b0fd0c6673e1aadff29\nbuild_time_utc=2026-10-23T01:48:42Z\nbuild_variant=release\nmetro_required=false\nsigning=android_release_internal_pilot_only\n",
      "SHA256SUMS.txt": "f7be111824cb0a46bb72250a5008d2b489bcc4d6defcccebe432b32d5b0acdde  /home/runner/work/MLIVRETRABALHO/MLIVRETRABALHO/artifacts/android-pilot/MLivreTrabalho.apk\n"
    },
    "manifestSHA256": "ea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480",
    "embeddedBundle": true
  }
}
```

OWN artifact12472265834,expires2026-11-06T01:27:56Z; POST artifact12471849419,expires2026-11-06T01:50:29Z; ambos não expirados. ZIP SHA/size coincidem com metadados API; CRCs íntegros, APK SHA coincide com SHA256SUMS.txt, BUILD_INFO aponta os checkouts acima/release/pacote pilot/metrofalse, bundle embarcado presente. ZIP não é o APK individual; emulador não é físico, smoke não é teste de todos os formulários/SecureStore nativo.

A entrega resolve exposição factual de canários em logs Fastify/Nest e remove erro bruto em4CLIs/error_code de retenção e3warningsmobile. O erro da fixture inicial health404 e as2falhas Typecheck permanecem históricos, não são Chrome ou sucesso emprestado. Sem rerun do mesmo SHA. O mapper de retenção foi auditado em fonte e os gates reais de retenção passaram; NÃO houve nova injeção de canário em uma linha persistida de privacy_retention_runs. A ação CLI real testada é privacy-requests-ops, não afirmar execução adversarial individual dos4CLIs.

O produto está aprovado por gates próprios e pós-merge. A decisão formal da Área8 será publicada em pacote documental separado, com CI próprio e pós-merge. Antes dessa publicação:8áreas aceitas[2,3,4,5,6,7,9,10],5pendentes[1,8,11,12,13]. Pentest independente/provedores/físico/produção/PSP/dinheiro real não aceitos; issues215/219/220/224/228 separadas.

---

## Corpo de preparação integral preservado (história, não estado corrente)

## CURRENT — hook Pino estrutural; gates deste SHA obrigatórios

HEAD`75b838fd3333e2d2b58b32c8e09080dd4f0e7368`/tree`643b08f635eaa47f1624d89ebc569324fe2e1839`, parent4dee17366d549d7b9c374a85378a5de7da760ef6. CI39882633172FAILonlyTypecheckTS2322:locktemFastify5.12.5direto e5.11.3noNest;tipoamplo carregavaserializers.reqnominalincompatível. Agoraobjeto inferido sólevel/hooks eparâmetrosunknown[]/Function/thisunknown, semcast/any/dependencychange/gateweaken. Dadosenviadosaométodopino continuamapenasallowlist, nenhumpassthrough. Mesmaimplementaçãofuncional/retornos/queues/guardas. PrópriosCI+APKnovos/literalPOSTreaisobrigatórios;APKsdeoutrosHEADsnãoemprestados.

Área8aindaPENDENTE.NenhumretrymesmoSHA/cancel/mergeantecipado. PrimáriaTypecheck/lock/fontescorposFULLappendnanotaexistente;originais6normasFULLpreservados.

---

## História imediata preservada integralmente

## CURRENT — opções de logger corretamente tipadas; novos gates obrigatórios

HEAD`4dee17366d549d7b9c374a85378a5de7da760ef6`/tree`a29b24812e65492383d7738674c2b62880cc627e`, paieaa5f47e19508381c178fc7b1d6dbfccf387b90b, normalFFexpected/forcefalse. Correção de tipo utiliza logger deFastifyServerOptions<any>, que inclui as opçõesPino/hookdogenericserverusadopeloAdaptador. Semcast/gateweaken/runtimeallowlistchange. CI39882323962eaa5FAILsóTypecheckTS2322/2353/7006;posterioresSKIP, semunit/HTTP/browserPASSatribuídos. APK39882323906anteriorinprogress,nãousadoparanovoHEAD.

OwnfullCI+APKpróprioNONOVOSHA+review+expectedmerge+literalPOSTCIAPK continuamobrigatórios. Área8nãoaceitaatéfecharcadeia. NoteexistenteFULLprefix+erro/loggeratual/corpoanteriorappend;6normasFULLprefixpreservadas.

---

## Preparação funcional preservada integralmente

## Segurança interna — diagnóstico privado e jornada completa

Logs reais expuseram canários da URL/query e mensagem de erro PostgreSQL;modelo do storage móvel também expôs Errorbruto. Este pacote mantém status/correlação/códigos seguros, removendo valores privados do Fastify/Nest, CLIserror eerror_coderetenção, além dos três console.warn deSecureStore. Fluxos,retornos,queues,auth,tenant/RLS/ACL,regrasretenção,SQL,códigosHTTP,CORS,15s/browsernão sãoalterados. Nenhumgrants/serviçoexterno/custo/credencial/pentest/PSP/físico/produção.

Jornada integrada realHTTP/PostgreSQL:8falhasloginconcorrentes/7×401+1×429/limiterPG8/resetmanual;passwordscrypt/tokenSHA256;mensagens/ratingreais comexportown/thirdparty;PGfaultAPI500/semACK/0partial/oneSQLattempt eCLIexit1/rollbackownrow/oneadditionalattempt;manualrecovery201;canáriosquery/path/header/body/PGerro/diagnósticosstatus200/201/401/404/429/500+reqId+errorcode;actualmobilequeue/storagefixture6warningssemcanário/login/tenant/logout. ModeloSecureStoreexplícito NÃO nativeproof. Gatescompanheirosauth,roles,PGbarreiras,RLS,notificações,ledger,privacyretention/legalhold,browser12+canonical/ProductionTruthmantidos.

Baseline3ed3CI39881170789/job120178629061FAIL(semretry):1936unit/tipos/build/export/migration/privacyPASS;novajornadaauth/PII/faultPASS. FALHADA FIXTUREusou/v1/health404antesdavarredurafinal, corrigida para /v1/health/ready;NÃObugHealthController. Independentemente, logsprimáriosNest01:00:20.4020922Z eFastify.4032602ZrevelamcanáriosSQL/query. NãoalegarbaselineFULLPASSnemfalhadetestecomoRCAlogger. Fonte173runtimeauditada[85API77mobile11Web];Websemconsoleexposing;stdoutdeCLIprivilegiado éresultadofuncionalcontrolado, nãologpúblico.

NovoHEAD`eaa5f47e19508381c178fc7b1d6dbfccf387b90b`/tree`8f38154b67eb3b4978938fd070675d7e058f8099`, pai3ed3ff7fe44ce6b849e37a565e1bdd92ec20051e, normalFF/forcefalse. **APKAPLICÁVEL**agora poralterar apps/mobile/lib/session.ts (três warnings,nenhum storagecontractchange).183/184protectedinputsbyteiguaisfora sessão; React19.1.4/RN0.81.6/depslock/workflowsintactos. Exigir ownCI+APKstandaloneSUCCESS+review+expectedmergeONCE+literalPOSTCIAPK. NenhumAPKantigousadocomobuildnovo.

Área8PENDENTE,8áreasaceitas/5pendentes[1,8,11,12,13]. FULLprimária/errata/fontes/normas/modeloMobile e173+184manifestos em docs/evidencias/INTERNAL_SECURITY_LOG_PRIVACY_FIX_2026-10-22.md. AnteriorINTERNAL_SECURITY_ACCEPTANCE_JOURNEYpreservadoFULL.6normas append-onlyoriginaisFULL; semnovoPR,zerorerunSAMESHA/cancel/statuscommit.


## Preservação documental e APK N/A para esta formalização

Este delta tem exclusivamente6apêndices de aceite aos originais FULL + este recibo. Não é commit de status: publica decisão técnica delegada e vínculo requisito/código/prova/limites após produto validado. Não incorpora574/565. Não altera1dos1368blobs existentes fora6docs modificados; todos os1362demais blobs/modes devem permanecer iguais, com1nova evidência. CI próprio eCIpós-merge serão verificados sobre este pacote antes de anunciar publicação final. NenhumSHA futuro/resultado deCI é inventado neste arquivo; recibos terminais ficam na metadata do PR para evitar autorreferência.

```json
[
  {
    "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
    "baseBlob": "6d8d30a34c6b6e938988033548b0a069c2f99896",
    "baseUTF16": 3921147,
    "originalFullPrefixPreserved": true,
    "mode": "100644"
  },
  {
    "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
    "baseBlob": "95bd33122f171d53b2394113e6349cccc68c1c84",
    "baseUTF16": 4254793,
    "originalFullPrefixPreserved": true,
    "mode": "100644"
  },
  {
    "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
    "baseBlob": "005678c1d9e921e467008d6ad8f4b1ee5e08ee75",
    "baseUTF16": 3911279,
    "originalFullPrefixPreserved": true,
    "mode": "100644"
  },
  {
    "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
    "baseBlob": "95ffbc199b7b205ec2adb87c197c2a16ea09bc9d",
    "baseUTF16": 3906168,
    "originalFullPrefixPreserved": true,
    "mode": "100644"
  },
  {
    "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
    "baseBlob": "ce069709d7107ca79eef817923042871aab93595",
    "baseUTF16": 3907090,
    "originalFullPrefixPreserved": true,
    "mode": "100644"
  },
  {
    "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
    "baseBlob": "fce0ab7836bb8594775868e9dda4fbeb53a84073",
    "baseUTF16": 3503995,
    "originalFullPrefixPreserved": true,
    "mode": "100644"
  }
]
```

Cada novo texto começa com TODOS os bytes do blobbase acima, acrescidos apenas do capítulo final. Memory acima de1MiB lida por fetch_blob noSHA da árvore, não APIcontents vazio. Todo runtime/API/test/deps/workflows/scripts permanece igual ao produto fbaec. AndroidN/A fundamentado na identidade de184insumos abaixo, incluindo173arquivosmobile,Expo→Gradle/workflows/smoke/depslock; alteração restrita a docs fora do filtroStandalone. Último APK literal medido é39885077269/fbaec, nenhum APK do novoSHA documental é alegado.

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
    "sha": "2be0e1f28380f9b4f8d18e39a48489dbf87fa9f0",
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
    "path": ".github/workflows/ci.yml",
    "sha": "b42bd9e89aa8052e2d1d9e36c63b4dee621b4e25",
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
    "path": "tsconfig.base.json",
    "sha": "616448a7bb986fb1f524e58dc84e115ae330eec1",
    "mode": "100644"
  },
  {
    "path": "apps/api/package.json",
    "sha": "9a4a75a94b50730bbe129c51965b30656605b49d",
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
    "path": ".github/workflows/pilot-android.yml",
    "sha": "d6c9c21d00e8d038211d155085d77af8cad59dff",
    "mode": "100644"
  },
  {
    "path": ".github/workflows/standalone-pilot-apk.yml",
    "sha": "e0fc5f871dc3b498f71a38ff932c83b48716c35f",
    "mode": "100644"
  }
]
```

## Dependências externas e próximos aceites

- [#215](https://github.com/dbdanielbaracho/MLIVRETRABALHO/issues/215) OPEN: FIN-RISK: close provider, compliance, unit economics and sandbox gates.
- [#219](https://github.com/dbdanielbaracho/MLIVRETRABALHO/issues/219) OPEN: TRUST-ARCH: close provider, runtime privacy controls and pentest gates.
- [#220](https://github.com/dbdanielbaracho/MLIVRETRABALHO/issues/220) OPEN: Pilot readiness: physical-device E2E, distribution and independent pentest.
- [#224](https://github.com/dbdanielbaracho/MLIVRETRABALHO/issues/224) OPEN: WEB-ARCH: build the complementary Next.js enterprise web app.
- [#228](https://github.com/dbdanielbaracho/MLIVRETRABALHO/issues/228) OPEN: PROVIDER-DUE-DILIGENCE: contact PSP/KYC shortlist and collect commercial sandbox evidence.

Issues mantidas separadas. Escopo interno não inclui produção/Railway/Neon, custo/credenciais de providers, pentest externo, política de SO/root/grants, aparelho físico, VisualTruth, SecureStore nativo ou dinheiroreal. Retentionmapper auditado+gates não se converte em prova de nova linha fault persistida. Área11 precisa seu próprio inventário por contrato/jornada, Área1 confronto real de telas/estados e Área12/13 reconciliação/proteção completa; quatro pendências reais não encerradas por este pacote. PR574(privacidade calendário) e565(offline) seguem drafts até gates efetivos.
