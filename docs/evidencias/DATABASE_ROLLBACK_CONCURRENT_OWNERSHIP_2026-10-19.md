# DATABASE ROLLBACK — concurrent operation ownership

## DATABASE_ROLLBACK_CONCURRENT_OWNERSHIP — 2026-10-19T05:50Z
Entrega funcional no PR #575 existente: integração normal de main 148e23dc396ef2bca98b1814a621d3eeebf9620c no HEAD histórico 89f799914fdcadaa75f7569b78c8483953829295, sem force/nova PR. Mantém BYTE EXATO DatabaseService 371c1615e95271f5484de3e8bca883481d4e845f e os 24 testes eb2c2b90389b9374b5c9e954dbe95a612614f0f9; adiciona apps/api/src/database-rollback-concurrency.test.ts (4 casos).
Requisito→código: erro primário deve sobreviver ao ROLLBACK que também falha, e somente o cliente da operação defeituosa deve receber release(true). transaction/tenant concorrentes na MESMA instância, dois clientes explícitos, duas ordens de settlement; erro original/valor do saudável/tenant SQL e parâmetros/número de consultas/callbacks/liberações exatos, sem retry automático. MAIN baseline 0 PASS/4 FAIL; candidato575 28 PASS (24 anteriores+4 novos) UTC e America/Sao_Paulo, Node24.19.0, zero fail/skip/cancel. Mutante LOCAL de flag compartilhada na instância: 24 controles anteriores PASS; 4 novos=2 PASS/2 FAIL. Mutante não publicado.
Adaptador LOCAL executa classe e corpos de testes reais com imports/decorators Nest removidos e Pool explícito; não é typecheck/Nest bootstrap/HTTPPG/RLS enforcement/pool real/rollback SQL/produção. CI completo obrigatório no NOVO HEAD; esperado 1549=[145Web,913mobile,477API,3CLI,11monitor], NÃO executado nem PASS nesta preparação. Não repetir CI da main148 após browser FAIL nem do antigo575.
APK N/A INTEGRAL: único runtime delta DatabaseService da API; TODOS insumos mobile/deps/lock/workflows/scripts build/smoke idênticos à main, canonical Expo mobile→Gradle e filtro Standalone inalterados. Nenhum APK novo construído/emprestado; não prova formulários nativos/SecureStore/aparelho físico.
Histórico preservado: FULL575 prefixo no lugar + FULLmain missing tail após fronteira de linha comum (manifesto na nota); main reconstruível BYTE EXATO por prefixo comum+tail, NÃO alegar main prefixo contíguo quando divergiu. FULLFINAL575(12344chars) e FULLFINAL587(22682chars) na nova nota docs/evidencias/DATABASE_ROLLBACK_CONCURRENT_OWNERSHIP_2026-10-19.md. Delegação de aceite já contida integralmente no tailMAIN; nenhuma espera por aceite humano. Área10 técnico interno,12 sem aceite integral; esta entrega aproxima confiabilidade transacional/tenant, NÃO aceita área só por testes.
Próximo: observar CI real/checkout exato/candidato e árvore sintética, revisar todos paths/modos/fresh main+head e APK N/A; só ALL SUCCESS permite ready/merge expectedSHA uma vez e pós-merge real. Se browser/produto falhar, registrar primária e avançar frente independente sem retry para verde. Sem alteração API SQL/RLS/ACL/payload/deadline/React19.1.4/RN0.81.6/deps/lock/workflows/segurança; sem produção/custos/credenciais/root/grants/RLSdisable.
PREPARAÇÃO histórica: CI PENDING, draft NÃO MERGED; resultados terminais serão metadados PR e consolidados só na próxima entrega funcional, sem commit artificial de status.

## Manifesto preservação integral

```json
[
  {
    "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
    "oldChars": 640343,
    "mainChars": 1113590,
    "common": 606903,
    "appendTail": 506687,
    "oldSHA": "3659bcd0a951c357ad74cb5d1d38a03b89058e96",
    "mainSHA": "78218396d998fd9e5a9b54d4cd24589cdc4f0815",
    "tailStart": 640465,
    "tailLength": 506687,
    "newChars": 1150156,
    "reconstructMainExact": true,
    "oldPrefixExact": true
  },
  {
    "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
    "oldChars": 972913,
    "mainChars": 1446162,
    "common": 939473,
    "appendTail": 506689,
    "oldSHA": "4c31de202cefc11c5040078710a6e718c8eef9da",
    "mainSHA": "dd2c1b8cdf82cf0e3e3aa6de77a9c0c98ff75279",
    "tailStart": 973035,
    "tailLength": 506689,
    "newChars": 1482728,
    "reconstructMainExact": true,
    "oldPrefixExact": true
  },
  {
    "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
    "oldChars": 630595,
    "mainChars": 1103822,
    "common": 597155,
    "appendTail": 506667,
    "oldSHA": "f450a7df5b9a08d091a88a288a1f3147bf9cab55",
    "mainSHA": "e884acde6d8b8b8e794e440bd8f06a77144fe288",
    "tailStart": 630717,
    "tailLength": 506667,
    "newChars": 1140388,
    "reconstructMainExact": true,
    "oldPrefixExact": true
  },
  {
    "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
    "oldChars": 625400,
    "mainChars": 1098641,
    "common": 591960,
    "appendTail": 506681,
    "oldSHA": "1531e3f3f528e739a383f2dd6a1e0fb8641e3337",
    "mainSHA": "19a55d1e2de04b636f6ee08ae567c7f072fb0bc6",
    "tailStart": 625522,
    "tailLength": 506681,
    "newChars": 1135207,
    "reconstructMainExact": true,
    "oldPrefixExact": true
  },
  {
    "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
    "oldChars": 626526,
    "mainChars": 1099733,
    "common": 593086,
    "appendTail": 506647,
    "oldSHA": "e70599e70393154b655e622b3ec64f626488cb33",
    "mainSHA": "1475788439a48f0222c9925989c4484408ef785c",
    "tailStart": 626648,
    "tailLength": 506647,
    "newChars": 1136299,
    "reconstructMainExact": true,
    "oldPrefixExact": true
  },
  {
    "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
    "oldChars": 223191,
    "mainChars": 696438,
    "common": 189751,
    "appendTail": 506687,
    "oldSHA": "71b5a004827ceab5585db5e0a8048dbd2ac28406",
    "mainSHA": "c931875ed0ea9e8312162a1f142e719a5e3379b5",
    "tailStart": 223313,
    "tailLength": 506687,
    "newChars": 733004,
    "reconstructMainExact": true,
    "oldPrefixExact": true
  }
]
```

## FULL FINAL PR575 histórico

# FINAL factual — correção testada, CI geral ainda bloqueado — 2026-10-18 UTC

PR575 DRAFT/NOTMERGED. HEAD `89f799914fdcadaa75f7569b78c8483953829295`, tree `d9ca8e85f8f2410474c18c73d85e99adbec66b72`, parent/base main `3e098cd51cd2fd84f21e144a600a814a2cb1a150`, branch `fix/database-rollback-client-discard-20261018`. Main continua3e/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c/paisordenados[f98b5f618c5b78772c360b93d17e6028f0021008,3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d]. Nenhumready/merge/pós575/rerun/cancel. Ahead1behind0/mergebase3e.

## Resultado próprio

[CI39090990507](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39090990507) / [job117567517336](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39090990507/job/117567517336), attempt1 COMPLETEFAILURE, ZEROretry.

**1379=[145Web,765mobile,455API,3CLI,11monitor] unitPASS/zeroFAILSKIPCANCEL.** Typecheck/build/mobileexport/migrationrunner2x/privacyretention+legalholdsPASS. Todos24novos casos compilados com import da classe real e fixturesclient foram explicitamente `ok121..144` em02:43:39.8196025Z..8242367Z; não apenas contagem inferida. HTTP/browserFAIL; PostSetupNodeSKIPPED; ProductionTruth posterior NÃOexecutado. **CI NÃO éGREEN.**

CheckoutACTUAL primário2026-10-18T02:41:50.5247148Z: `d3447a773881d73bf358476b2235882d789bcde8`, SINTÉTICO com paisordenados[main3e,HEAD89f799] e tree`d9ca8e85f8f2410474c18c73d85e99adbec66b72` igualcandidato; nãoHEADliteral. Pais/treeGitconferidos independentemente. PostgreSQL container iniciou neste run, sem alteração de imagem/registry/workflow; isso NÃO torna575remédio de quota nem resolve573histórico. Nenhumretry575.

## Correção / limites

Falha reproduzida na fonte real: se operação e ROLLBACK rejeitam, o erro doROLLBACK substituía o primário e release()normal devolvia o cliente. Fix SÓduasfunções transaction/tenant: rollbackFailedflag, ROLLBACK aguardado try/catch, mesmo erro primário relançado, release(true)SÓse rollbackfalhou; normalreleaseinalterado. Reverse-substitution fonte integral fora dessas mudanças byteexata. Poolconstructor/query/onModuleDestroy, BEGIN/COMMIT/SETLOCALapp_runtime/set_configtenant+parâmetros, callback/result, auth/roles/RLS/ACL/controllers/migrações/HTTPcalls/negócio/retryintactos. Nenhum novo log/SQL/credencial/PSP/provider/produção.

24regressões actualclass/prototype+explicitPoolclient: LOCALbaseline14PASS10FAIL/exit1 →24GREEN/exit0, zeroFAILSKIPCANCEL. Sucesso, connectfailure sem work/query/release, BEGIN/work/COMMITerror com rollbackok/falho, aguardar rollbackpendente, ausênciaretrycallback, rejeiçãonãoError, configuraçãoROLE/tenantfail. Não são PGreal/poolrealreutilizado/leaktenant/produção. Localmutação preserva erroMASomite descarte →mesmos24tests14PASS10FAIL, demonstrando que preservar erro sozinho não falsifica cobertura de descarte; esse é experimentoLOCALfora455CIcount, não arquivo publicado.

API oficial release(true) documentada em https://node-postgres.com/apis/pool#releasing-clients; lockpg8.23.0/pg-pool3.14.0/@typespg8.23.1 inalterado. Nenhumupgrade/custo/novo serviço. HTTPPGnormal/chronology novoHEADexecutousourceatual: PROFESSIONAL_CHRONOLOGY_PASS02:44:20.0825692Z eSAFETY_CHRONOLOGY_PASS02:44:20.7684076Z, não prova fault-injection PG doROLLBACKfalho nem Android.

## Falha do navegador — proveniência própria

Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 actual02:44:58.9839611Z. A login401/201/vazio, teamPOST201 ejobPOST201/render/persist/12345cents/datas passaram pelo fluxo sequencial anterior às capturascreated.
ONEteamsGET503 REALmenteconsumido +11outrosGET200 DISTINTOS/unknownloading/—/humanrefresh12NEWGET200/team1/zeroextraPOSTfromSEND: WEB_SECTION_AVAILABILITY_BROWSER_PASS02:45:01.0243014Z. CDPACK02:45:00.5472648Zsozinho não éprova deconsumo; response503/DOMasserts/captura+marker posteriores équeprovam.

FAIL02:45:20.8951636Z `loaded dashboard` APÓS Page.reload e guarda de novo documento completo no driver sequencial inalterado. FailureDOMownerA/12unavailable/counts/rates—CORRETO, nãofalsezero. Exatamente12GETnetERR_ABORTED/canceledTRUE/corsErrornull em paths distintos. Não completou dashboardreload/dadospersistidos apósreload/logout/B/revokedbearer401/otherSAMEidentitysession200/full8journeys. NENHUMWEB_BROWSER_JOURNEY_PASS.
NãoECR/startup/novoerropermissão/causaAPI-CORS-vendorprovada. Causa antigaUNRESOLVED; fonte/navegador/CDP/Fetchguard/CORS/sandbox/LNA/deadlines/flags/images/assertsinalterados. Não rerun para verde ou emprestar567/574PASS.

5OWNdesktopPNGs de log117567517336, source89f799/checkoutd344/tree d9ca8/run39090990507attempt1FAIL. IndependentPNGsignature/SHA256/bytes/dims1365x900+PillowverifyPASS; NÃOvisualinspected/NÃOAndroid/native/físico/NÃOassetsGit. Scratch rollback-discard-local/575-own-captures.json. Preservar proveniência em próximo ciclo funcional, nunca image-onlycommit.
```json
[
  {
    "label": "login",
    "sha256": "75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc",
    "bytes": 33686,
    "width": 1365,
    "height": 900,
    "signatureSHABytesVerified": true,
    "PillowVerify": true,
    "visuallyInspected": false,
    "platform": "desktop Web"
  },
  {
    "label": "company-a-created",
    "sha256": "a7c88473f99d90a48c864c5d39e9f802673e94d88154b238c3389a3bf7651baa",
    "bytes": 132317,
    "width": 1365,
    "height": 900,
    "signatureSHABytesVerified": true,
    "PillowVerify": true,
    "visuallyInspected": false,
    "platform": "desktop Web"
  },
  {
    "label": "company-a-team-read-unavailable",
    "sha256": "ed2dd66ce4879321335cd0f187d7ee2327cd93d510e59722e12e806c3e381c32",
    "bytes": 141157,
    "width": 1365,
    "height": 900,
    "signatureSHABytesVerified": true,
    "PillowVerify": true,
    "visuallyInspected": false,
    "platform": "desktop Web"
  },
  {
    "label": "company-a-team-read-recovered",
    "sha256": "d94c2d05cfb9b4f801de393e3d8987ab56d6b2f26d1c05a47ccc15e5f3923bea",
    "bytes": 132553,
    "width": 1365,
    "height": 900,
    "signatureSHABytesVerified": true,
    "PillowVerify": true,
    "visuallyInspected": false,
    "platform": "desktop Web"
  },
  {
    "label": "failure",
    "sha256": "1b58ef5ef0752f3211735665a1f35cddac1b304a5561b575cde94b580560f326",
    "bytes": 133142,
    "width": 1365,
    "height": 900,
    "signatureSHABytesVerified": true,
    "PillowVerify": true,
    "visuallyInspected": false,
    "platform": "desktop Web"
  }
]
```

## Revisão / APK / histórico

14PRpaths ALLremoteUTF8byteexact/modes100644,1164of1171priorblobsiguais/493of494existingnon-docsoutsideDatabaseServiceiguais; nenhumdeleted.249protectedmobile/packages/rootdeps/lock/workflows/build/smoke sameSHA/mode e freshcanonicalexpo-mobileprebuild→Gradlegraphunchanged→**APK N/A INTEGRAL**, não[]/ausênciaruns/APK574emprestado. NenhumAPK575construídoatribuído. Test/CJSde573NÃOcopiados; cinco notas históricas sameblobs. FULLmain+571+573+574+dfb2prefixoriginais+matriz preservados NO LUGAR, apêndicefuncionalnovo. READMEintacto. DVT/ledger/checkpoint/registry/memória/matriz preparationPENDING éHISTÓRIA; esteFINAL seráconsolidado só em próximo cicloFUNCIONAL, semcommitautorreferente/status/atividade.

## Anti-estagnação / próxima frente independente

Apósbloqueio, auditoria actualCompanyMembersController.accept +7oldtests +571fixture +migrations0039/0047: caminho manager/admin→owner faz UPDATErole e depoisUPDATEaccepted_at. 571007 cobreINSERTmembership, NÃOrollback de promoção. QuatroLOCALtestsactualcontrollerNativeTSstrip/explicitDBauthfixturesPASS: manager/admin UPDATEroleantesaccepted_at/erroúltimaescritapropagado; existingownerconsome semroleUPDATE; professionalrolechange400semDML. Primeirocontrolelocal confundiu SELECT FOR UPDATE comDML por substring; matcherancoradoSQLcorrigido e4GREEN, NÃOprodutoRED. NãoPGrollback/HTTP/autorizaçãoampliada/não parte24/455CI, não publicados. Scratch rollback-discard-local/next-audit/{company-members.controller.ts,invitation-promotion-order.test.cjs}.
Próxima fatia possível em571existente, sefreshgapconfirmada: criar membershipmanager viaHTTPautorizado, invitationowner viaownerreal, hookownedAFTERUPDATEaccepted_at exigeverroleowner+invitationaceita anteswitness500; snapshotintegral2tenants deve restaurarmanager/conviteativo; cleanup eUMAaçãoexplícita201promoveowner/replay400. Nenhumseedpapel/grant/policy/RLSdisable. Isto é PLANO, NÃOimplementado/PGprovado; não duplicar571/575 ou rerunmesmoSHAsemcausanova.

Sóárea10AndroidstandaloneTÉCNICAINTERNAaceita;12semaceiteintegral, não%decódigo. Este fix aproxima7/8/11 mas nãofechaárea. Maininalterada ePRs558/560/565/568/570/571/572/573/574 separados. Externos215/219/220/224/228OPEN. Semprodução/Railway/Neon/serviços/custos/credenciais/providers/PSP/contratos/dinheiroreal/Activitymanualwrites/automaçãoextra. Rotinaexistentehabilitada/scheduleinalterados.

---

## Preparação anterior à execução própria — HISTÓRIA

Quando uma operação e seu ROLLBACK falham, DatabaseService substituía o erro original pelo erro de rollback e devolvia o cliente ao pool com release() normal. transaction() e tenant() agora preservam o erro primário e pedem descarte com release(true) somente quando o ROLLBACK falha; os caminhos de sucesso e rollback bem-sucedido mantêm release().

DRAFT / NÃO MERGED. HEAD `89f799914fdcadaa75f7569b78c8483953829295`, tree `d9ca8e85f8f2410474c18c73d85e99adbec66b72`, parent/base `3e098cd51cd2fd84f21e144a600a814a2cb1a150`. Branch `fix/database-rollback-client-discard-20261018`.

## Validação funcional

24 regressões das funções REAIS: **baseline14PASS10FAIL → GREEN24/24**, zeroFAILSKIPCANCEL local (NativeTSstrip+Function, fixtures Pool/client explícitas). Cobrem sucesso, connect recusado, BEGIN/callback/COMMIT com rollback bem-sucedido ou falho, aguardar rollback pendente antes de liberar, ausência de retry, rejeição nãoError preservada, SETLOCALROLE/set_config com seus dois resultados. Não são prova de PostgreSQL real, pool real reutilizado, leak tenant, HTTP, produção ou Android.

Reverse-substitution integral reconstrói a fonte main fora dos dois wrappers byte a byte. Pool/query/onModuleDestroy, SQL/parametrização de BEGIN/COMMIT/SETLOCALapp_runtime/set_configtenant, callback/valor/sucesso, controllers/roles/RLS/ACL/migrações/HTTPgates e retry de negócio intocados. API oficial https://node-postgres.com/apis/pool#releasing-clients documenta discard; lock fresco pg8.23.0/pg-pool3.14.0/@typespg8.23.1 inalterado. Nenhum novo log/credencial/serviço/grant/root/produção.

**CI próprio completo PENDENTE**. Esperado1379=[145Web,765mobile,455API,3CLI,11monitor], não resultado. Typecheck/build/mobileexport/migrationrunner2x/privacy/HTTP/Postgres/browser/ProductionTruth antigos intactos, sem weakening CDP/Fetchguard/CORS/sandbox/LNA/deadlines/imagem/registry. MergeONLYfullCI SUCCESS/freshHEADreview/expectedSHA e pósCI real. Não rerun de produto para verde.

## Revisão e rastreabilidade

14PRpaths todos remoteUTF8bytes exact/modes100644.1164of1171oldmainblobs idênticos,493of494existingnon-docs foraDatabaseServiceiguais; novoAPItestforaAndroidgraph.249protectedmobile/packages/rootdeps/lock/workflows/build/smoke sameSHA/mode e canonicalexpo-mobileprebuild→Gradle unchanged→**APK N/A integral**, não[]/ausênciaruns/APKemprestado; nenhumAPK destePRatribuído.

FULLmain+571+573+574+573dfb2prefix dos5originais/matriz preservados NO LUGAR por apêndice. Cinco notas históricas sameblobs, sem copiar código/gatesdosdrafts. Nova evidência DATABASE_ROLLBACK_CLIENT_DISCARD_2026-10-18.md inclui recibo integral573dfb2 FINAL. HistóricoPENDING não é PASS atual. Sóárea10TÉCNICAINTERNOaceita12pendentes; esta fatia aproxima7/8/11 e não fechaárea.

## Bloqueios históricos separados

573dfb2 ownCI39084499453/job117548129772attempt1FAIL quotaECRantescheckout/todosprodutosSKIPPED, zero retry;3LEDGERmarkersNOTEXECUTED/1365sóESPERADO. Não emprestarPASS.57497aaunit1378PASS/APKSUCCESS masbrowserFAIL;571007rollbacksREAISPASS masbrowserFAIL;572registrydraftCIredNÃOcopiado.558/560/565/568/570 separados/ext215219220224228OPEN. NenhumaReady/Merge/rerun/cancel dessesPRs.

Próximo: medirCIpróprio doHEAD acima; sebloquear, manterDRAFT, registrar log e avançar frente independente sem loop/commitatividade. Recibo final nestePR e em próximo ciclo funcional nos originais, sem metadataautorreferente.



## FULL FINAL PR587 histórico main

PR587JÁMERGED2026-10-19T04:57:41Z. MAIN148e23dc396ef2bca98b1814a621d3eeebf9620c/treeb937037a3008d504d2ce5836ad9a8b4d664d4204/orderedparents[4dbdd40481478c11f7f39127b3dfc1bc4d7261fb,94d3e372e029d658b65a9dd4aca22cdb47e21734]. READYONCE/MERGEEXPECTED94d3ONCE apósownCI39201568120a1SUCCESS1521+HTTPbrowser8journey+ProductionTruth/fresh8paths+modes/basehead/APKN/A. Não repetirmerge/ownGREENrerun.

POSTCI39202084305/job117897007159attempt1COMPLETEDFAILURE/ZEROretry. ActualcheckoutLITERAL148e23dc396ef2bca98b1814a621d3eeebf9620cprimary04:58:04.5071703Z.1521=[145Web913mobile449API3CLI11monitor]unitPASS/fail-skip-cancel0/typesbuildexportAndroid/migration2x/privacyPASS. HTTPbrowserFAIL/PostSetupNodeSKIP/laterProductionTruthNOTexecuted; NÃOPOSTCI GREEN. ECRiniciounestePOST, nãoquota global resolvida. Nãorerun148porfalhabrowser/produto para obterverde.

BrowserprimárioChrome155.0.8059.39/protocol1.3/JS15.5.35.20/rev3ff7ac5a9224be9156d7f8703a06e22890aafd34at05:01:14.7570689Z. FAIL05:01:37.1833045Zcreatedteamrendered;failurestate05:01:37.1898812Z. ACTUAL12initialGET200→teamPOST201→11OPTIONS204observadosapósACK+12GETERR_ABORTED/canceledTRUE/corsErrornull. UI12unavailable/métricas—,nãozero. Não generalizar para12OPTIONS quando esteestado contém11 apósPOST. Jobcreate/503consumed+11GET/humanrecovery/reload/logout/B/full8/ProductionTruthNÃOcompletadosnestePOST. SameTREEb937 ownGREENsynthetic5df95ccc versusPOSTREDliteral148 éobservação,nãocausaAPI/CORS/vendor/framework/ausênciaSQLcommitprovada;semtrace558nesteHEAD,nãoatribuir0Nav/context. Hipóteseestreitaparaauditoriafutura: cancelamento nestaexecuçãoafetaaondadeleiturapós-mutação,e não a leitura inicial bem-sucedida; não causalidade demonstrada. ControlesCDPFetchguardCORSsandboxLNAflags/deadlines/assertsintactos.

APK N/A integral candidata+merge por498non-docsforaúnicoAPItest/ALL159mobile/depslock/workflows/buildsmoke/Expo→Gradle idênticos àbase. NenhumAPK587construído/emprestado/prebuildnovoprova. MAINstandalone técnico último literalmente75105/582POST39143802991 permaneceprovenancehistórica; nãoAPKliteral148. Watch39202084471SUCCESS nãoCIproduto. SeisoriginaisFULLprefixappend e nota61723charscomFULLFINAL58611484/fontes/reprodutores;GitprepPENDINGhistórico,consolidarFINALsomentepróximaentregaFUNCIONALsemstatus/selfref/image/activitycommit.

Novaentrega2canonicaltests+33localUTCSP+1521ownCI+merge; nenhuma área recebe aceiteintegral. Aceite interno é do assistente, nãoaguarda humano. Após bloqueio, frente independente Support.mine:4LOCALmodelsPASS(identity/membership/querysameError+positiveSQLparams/rows),produtobyteinalterado. Nova prova de mutante LOCALONLY: readminecapturaerro genérico→[];4oldcanonicalCREATEdoSupportControllercontinuamPASS,4novosreadmodels1PASS3FAIL. Isso demonstra lacuna nesses quatro testes decreate,nãoausência global nemBUGproduto. Fonte adicional integral abaixo; NÃOparte33/449/1521/canonicalNest/HTTPPG/RLS/rollback/provider/native. Existingintent7,status9,contexts5jácoveroutrosmethods/falhas,semSQLfixtureduplicada.

Próximo: freshALLnorm/main/PRs/matriz; avaliar3faultcases+positivecontrole noEXISTENTEsupport.controller.test.ts (4oldCREATEbodiesintactos),semampliarharnessgenérico/alterarpolicy/payload/schema/deadline/inventarbug. Testesmine são método distinto deexceptions; conferirALL13openPRfilesantesdepublicar. Como587jáMERGED,nãoestenderbranchmergedporresumo. Podepriorizaroutra pendênciafuncional deaceiteemPRexistentecomnewprooftreeintegraçãoREAL,sóownfullCIGREEN/reviewfresh/mergeexpectedSHA+POSTreais. Nãoencalharbrowser nemrerunproduto148.

### Reprodutor integral adicional do mutante LOCAL e controles

HISTORY_PRODUCT_MUTANT=1 HISTORY_OLD_ONLY=1 node --test support-history-mutant-audit.test.mjs →4PASS. HISTORY_PRODUCT_MUTANT=1 node --test support-history-mutant-audit.test.mjs →1PASS3FAIL. Semmutante,os4novosmodelosPASS. sources.json está integralmente na nota; support-controller-original.json é stringJSON do blob6cf39699879e12d8dd010d6ccbe3cd3f610938b6 apps/api/src/support.controller.test.ts da main.

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createHash,randomUUID} from 'node:crypto';
import {stripTypeScriptTypes} from 'node:module';
// Local fixture adapter only; committed canonical test retains all original real Nest imports.
const sources=JSON.parse(fs.readFileSync(new URL('./sources.json',import.meta.url),'utf8'));
const read=name=>sources[name].content;
const compile=source=>stripTypeScriptTypes(source,{mode:'transform'});
const helper=source=>source.replace(/^import .*$/gm,'').replace(/export /g,'');
const supportCaseInput=new Function(compile(helper(read('support-input.ts')))+';return supportCaseInput;')();
const {supportRequestKey,supportRequestDigest}=new Function('createHash',compile(helper(read('support-idempotency.ts')))+';return {supportRequestKey,supportRequestDigest};')(createHash);
class FixtureBadRequest extends Error {}
class FixtureConflict extends Error {}
class FixtureForbidden extends Error {}
let source=read('support.controller.ts').replace(/^import .*$/gm,'').replace(/@(Controller|Get|Post|Headers|Param|Body)\([^)]*\)/g,'').replace('export class SupportController','class SupportController');
const unused=()=>{throw Error('unexecuted helper');};

if(process.env.HISTORY_PRODUCT_MUTANT==='1'){
 const start=source.indexOf('async mine('),stop=source.indexOf('private async admin(',start),method=source.slice(start,stop),end=method.lastIndexOf('}');
 if(start<0||stop<0||end<0)throw Error('mine method marker missing');
 const mutated=method.slice(0,end).replace('){const i=','){try{const i=').replace('return this.db.tenant(', 'return await this.db.tenant(')+"}catch(error){if(error.constructor!==Error)throw error;return[];}}"+method.slice(end+1);
 source=source.slice(0,start)+mutated+source.slice(stop);
}
const Controller=new Function('supportCaseInput','supportRequestKey','supportRequestDigest','BadRequestException','ConflictException','ForbiddenException','randomUUID','compareTimestamp','exceptionSla',compile(source)+';return SupportController;')(supportCaseInput,supportRequestKey,supportRequestDigest,FixtureBadRequest,FixtureConflict,FixtureForbidden,randomUUID,unused,unused);

const SupportController=Controller;
if(process.env.HISTORY_OLD_ONLY==='1'){
const old=JSON.parse(fs.readFileSync(new URL('./support-controller-original.json',import.meta.url),'utf8'));
new Function('test','assert','SupportController',compile(old.replace(/^import .*$/gm,'')))(test,assert,SupportController);
}else{
for(const phase of ['identity','membership','query'])test('support history propagates '+phase+' failure without acknowledgement or later tenant work',async()=>{
 const failure=new Error('explicit history '+phase),events=[],queries=[],tenants=[];let result;
 const auth={
  identityFromAuthorization:async authorization=>{events.push(['identity',authorization]);if(phase==='identity')throw failure;return{id:'trusted-reporter'};},
  requireMembership:async(id,tenant)=>{events.push(['membership',id,tenant]);if(phase==='membership')throw failure;return{role:'professional'};}
 };
 const db={tenant:async(tenant,work)=>{tenants.push(tenant);return work({query:async(sql,params)=>{queries.push({sql,params});throw failure;}});}};
 const controller=new SupportController(db,auth);
 await assert.rejects(async()=>{result=await controller.mine('Bearer fixture','tenant-a');},e=>e===failure);
 assert.equal(result,undefined);
 assert.deepEqual(events,phase==='identity'?[['identity','Bearer fixture']]:[['identity','Bearer fixture'],['membership','trusted-reporter','tenant-a']]);
 assert.deepEqual(tenants,phase==='query'?['tenant-a']:[]);
 assert.equal(queries.length,phase==='query'?1:0);
 if(queries.length){assert.deepEqual(queries[0].params,['tenant-a','trusted-reporter']);assert.match(queries[0].sql,/WHERE tenant_id=\$1 AND reporter_identity_id=\$2 ORDER BY created_at DESC$/);assert.doesNotMatch(queries[0].sql,/INSERT|UPDATE|DELETE/);}
});
test('support history legitimate read preserves trusted reporter tenant binding and real-shaped database rows',async()=>{
 const rows=[{id:'explicit-fixture',status:'reviewing',description:'Original description',createdAt:new Date('2026-10-15T12:00:00Z')}],events=[],queries=[];
 const auth={identityFromAuthorization:async authorization=>{events.push(['identity',authorization]);return{id:'trusted-reporter'};},requireMembership:async(id,tenant)=>{events.push(['membership',id,tenant]);return{role:'professional'};}};
 const db={tenant:async(tenant,work)=>{events.push(['tenant',tenant]);return work({query:async(sql,params)=>{queries.push({sql,params});return{rows};}});}};
 const controller=new SupportController(db,auth);
 assert.strictEqual(await controller.mine('Bearer fixture','tenant-a'),rows);
 assert.deepEqual(events,[['identity','Bearer fixture'],['membership','trusted-reporter','tenant-a'],['tenant','tenant-a']]);
 assert.equal(queries.length,1);assert.deepEqual(queries[0].params,['tenant-a','trusted-reporter']);
 assert.match(queries[0].sql,/WHERE tenant_id=\$1 AND reporter_identity_id=\$2 ORDER BY created_at DESC$/);assert.doesNotMatch(queries[0].sql,/INSERT|UPDATE|DELETE/);
});
// Explicit local auth/query fixtures. Not Nest HTTP, identity provider, PostgreSQL transaction/RLS, native or production evidence.

}

```

### Histórico integral do recibo intermediário, preservado

PR587MERGED2026-10-19T04:57:41Z apósREADYONCE/MERGEEXPECTED94d3e372e029d658b65a9dd4aca22cdb47e21734ONCE. MAIN148e23dc396ef2bca98b1814a621d3eeebf9620c/treeb937037a3008d504d2ce5836ad9a8b4d664d4204/orderedparents[4dbdd40481478c11f7f39127b3dfc1bc4d7261fb,94d3e372e029d658b65a9dd4aca22cdb47e21734]. OwnCI39201568120a1SUCCESS1521+HTTPbrowser8journey+ProductionTruth,full8pathsreview/freshbasehead+APKN/A integral. Não repetir merge/ownGREENrerun.

POSTCI39202084305attempt1 AINDAIN_PROGRESS na consulta04:57:59Z; nenhumPOSTPASSatribuído/actualcheckoutPOSTaindaemconsulta. Não emprestar1521ownaoPOST. APK N/A permanece por identidade dos insumosAPItest/docs; nenhumAPK587built/borrowed/nativoproof. ActivityWatch39202084471SUCCESS≠CIproduto. Somente área10técnicointernoaceita,12pending; nenhumaáreaespera confirmaçãohumana.

Registro integral pré-merge e4novosmodeloslocaisindependentes:
OwnCI39201568120/job117895444683attempt1COMPLETEDSUCCESS1521=[145Web913mobile449API3CLI11monitor],fail/skip/cancel0/typebuildexportmigration2xprivacyHTTPPG/ProductionTruthPASS2026-10-19T04:56:30.5646368Z. Os2novos casos foram compilados e executados canonicamente em API; prova local33UTC/SP é adicional e limitada conforme abaixo.

Actualcheckout5df95ccc234f8458b01e83de7970afa9fea4bbbf SINTÉTICOorderedparents[4dbdd40481478c11f7f39127b3dfc1bc4d7261fb,94d3e372e029d658b65a9dd4aca22cdb47e21734]/treeb937037a3008d504d2ce5836ad9a8b4d664d4204 igual à candidata, Gitconfirmado, não literalHEAD. Checkoutprimário: 2026-10-19T04:51:46.0374588Z 5df95ccc234f8458b01e83de7970afa9fea4bbbf. Chrome155.0.8059.39/protocol1.3/rev3ff7ac5a9224be9156d7f8703a06e22890aafd34;8browserjourneyPASS04:55:18.7996638Zinclnewdocreload/signout201/revokedbrowser401/otherSAMEidentityvalid/Bisolated.503controlled e recuperaçãohumana preservados. Root558intermitente NÃOresolvido por esteGREEN/semguardsCDPFetchCORSsandboxLNAflagsdeadlineassertchange.

Fresh review MAIN4dbd/base4dbd/head94d3e372e029d658b65a9dd4aca22cdb47e21734,ALL8pathsSHA100644+fullreadback8files,foundationSUCCESS/ownCIcompletoSUCCESS.498non-docsforaúnicoAPItest+ALL159mobile/depslock/workflows/buildsmoke/Expo→Gradle iguaisbase→APK N/A integral; nenhumAPKnovo/prebuildemprestado. Pode ready/mergeexpectedHEADuma vez conforme delegação do aceite técnico ao assistente; exigirPOSTCIreal e revalidarAPKN/A depois. Nenhuma área recebe aceiteintegral.

Entrega2novoscasos/19old+12create preservados/33localUTCSP;mainruntimeSupportControllerb7418f9c3473b15ee32a488b7b354816c80acf28inalterado, nãoBUGproduto.6FULLMAINnormprefixappend+FULLFINAL58611484/reprodutores/fontesexatasna nota EXCEPTION_AUTH_FAILURE_BOUNDARIES_2026-10-19.md. GitprepPENDINGhistórico;FINALnosnormativossópróximaentregaFUNCIONAL,semstatus/selfrefcommit. MAIN4dbdPOSTCI39196163454a2redquota/ONEretryCONSUMIDA éhistória, não repetirnememprestarownGREEN aoPOST.

Recibo intermediário e fonteintegral dos4modeloslocaisindependentes preservados:
Publicados dois novos casos canônicos em apps/api/src/safety-support-chronology.test.ts, commit94d3e372e029d658b65a9dd4aca22cdb47e21734/treeb937037a3008d504d2ce5836ad9a8b4d664d4204/paiMAIN4dbdd40481478c11f7f39127b3dfc1bc4d7261fb. PR587DRAFTNOTMERGED.33focalLOCALPASSUTC/SP=[21chronology+12create],19old+12createbodiesassertsbyteintactosfora4extensõesfixture+append. ReverseFULL10095→11592bytes;8deliverypathsFULLUTF8readbackEXACTSHA100644/1256of1263MAINblobs+modesiguaisfora7modificados. Todo runtime/controllerSQLRLSACL/native/depslock/workflow/buildsmoke igual;APK N/A integral.

CI próprio39201568120/job117895444683attempt1AINDAIN_PROGRESS. ContainerPostgreSQL/checkout/instalação/typecheckjáSUCCESS,buildemcurso na consulta04:52Z;1521SÓESPERADO,nãoexecutadoainda. Nova recuperação infra observada neste run não é quota global resolvida. Nãorerunrunning/ownGREEN;seproduto/browserfalhar,nãorerunparaverde. MAIN4dbdPOST39196163454a2FAILquota/ONEretryCONSUMIDA, nenhumunitPOST/Chrome/HTTPPG/ProductionTruth, não emprestarown5861519.

Quatro novos modelos INDEPENDENTESLOCAISSupportController.mine passaram: identityerror,membershiperror,queryerror propagamMESMOError/noACK/noposteriorSQL/retry;positivo preservaSQLread-only/trustedreporter+tenant/rowsPG-shaped explícitos. NÃOAPPpatch/testescanônicospublicados/NÃOparte33/449/1521/HTTPPG/NestHTTP/RLS/provider/nativeproof. Existing support.controller4casos sãocreate;support-intent7jácoverprepareauth/membership/DBfail,status9jácovermutations/ACL econtexts5covermetadataqueryerror: não alegar ausência global nemduplicar essasfixtures. Fonte integral para reprodução:

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import {stripTypeScriptTypes} from 'node:module';
// Explicit local adapter only; canonical published test preserves original Nest imports.
const sources=JSON.parse(fs.readFileSync(new URL('./sources.json',import.meta.url),'utf8'));
const read=name=>name==='safety-support-chronology.test.ts'?fs.readFileSync(new URL('./safety-support-chronology.test.ts',import.meta.url),'utf8'):sources[name].content;
const imports=source=>source.replace(/^import[\s\S]*?from\s+['"][^'"]+['"];[ \t]*\n?/gm,'');
const compile=source=>stripTypeScriptTypes(source,{mode:'transform'});
const compareTimestamp=new Function(compile(imports(read('timestamp-order.ts')).replace(/export /g,''))+';return compareTimestamp;')();
const exceptionSla=new Function(compile(imports(read('exception-sla.ts')).replace(/export /g,''))+';return exceptionSla;')();
class FixtureUnauthorized extends Error {}
class FixtureForbidden extends Error {}
class FixtureBadRequest extends Error {}
function controller(file,name){
 let source=imports(read(file)).replace(/@(Controller|Get|Post|Headers|Param|Body)\([^)]*\)/g,'').replace(/export class /g,'class ');
 if(process.env.EXCEPTION_AUTH_PRODUCT_MUTANT==='1'&&name==='SupportController'){
  const start=source.indexOf('private async admin(');
  const stop=source.indexOf('async exceptions(',start);
  const authority=source.slice(start,stop).replace('await this.auth.identityFromAuthorization(a);',"await this.auth.identityFromAuthorization(a).catch(error=>{if(error.constructor!==Error)throw error;return{id:'owner'};});").replace('await this.auth.requireMembership(i.id,t);',"await this.auth.requireMembership(i.id,t).catch(error=>{if(error.constructor!==Error)throw error;return{role:'owner'};});");
  if(authority===source.slice(start,stop))throw Error('mutant replacement missing');
  source=source.slice(0,start)+authority+source.slice(stop);
 }
 if(process.env.MINE_AUTH_PRODUCT_MUTANT==='1'&&name!=='SupportController'){
  const start=source.indexOf('async mine('),end=source.indexOf('const all:',start);
  const authority=source.slice(start,end).replace('const identity = await this.auth.identityFromAuthorization(authorization);',"let identity;try{identity=await this.auth.identityFromAuthorization(authorization);}catch{return[];}").replace('const tenantIds = tenantId',"let tenantIds;try{tenantIds = tenantId").replace('membership => membership.tenant_id))];',"membership => membership.tenant_id))];}catch{return[];}");
  if(authority===source.slice(start,end))throw Error('mutant replacement missing');
  source=source.slice(0,start)+authority+source.slice(end);
 }
 if(name==='SupportController'&&process.env.EXCEPTION_PRODUCT_MUTANT==='1')source=source.replaceAll('[c.t])).rows','[c.t]).catch(()=>({rows:[]}))).rows');
 if(name==='SafetyCasesController'||name==='SafetyAppealsController'){if(process.env.MINE_PRODUCT_MUTANT==='1')source=source.replace(').rows);\n      all.push',').rows).catch(()=>[]);\n      all.push');}
 return new Function('compareTimestamp','exceptionSla','BadRequestException','ForbiddenException',compile(source)+';return '+name+';')(compareTimestamp,exceptionSla,FixtureBadRequest,FixtureForbidden);
}
const SafetyCasesController=controller('safety-cases.controller.ts','SafetyCasesController');
const SafetyAppealsController=controller('safety-appeals.controller.ts','SafetyAppealsController');
const SupportController=controller('support.controller.ts','SupportController');

for(const phase of ['identity','membership','query'])test('support history propagates '+phase+' failure without acknowledgement or later tenant work',async()=>{
 const failure=new Error('explicit history '+phase),events=[],queries=[],tenants=[];let result;
 const auth={
  identityFromAuthorization:async authorization=>{events.push(['identity',authorization]);if(phase==='identity')throw failure;return{id:'trusted-reporter'};},
  requireMembership:async(id,tenant)=>{events.push(['membership',id,tenant]);if(phase==='membership')throw failure;return{role:'professional'};}
 };
 const db={tenant:async(tenant,work)=>{tenants.push(tenant);return work({query:async(sql,params)=>{queries.push({sql,params});throw failure;}});}};
 const controller=new SupportController(db,auth);
 await assert.rejects(async()=>{result=await controller.mine('Bearer fixture','tenant-a');},e=>e===failure);
 assert.equal(result,undefined);
 assert.deepEqual(events,phase==='identity'?[['identity','Bearer fixture']]:[['identity','Bearer fixture'],['membership','trusted-reporter','tenant-a']]);
 assert.deepEqual(tenants,phase==='query'?['tenant-a']:[]);
 assert.equal(queries.length,phase==='query'?1:0);
 if(queries.length){assert.deepEqual(queries[0].params,['tenant-a','trusted-reporter']);assert.match(queries[0].sql,/WHERE tenant_id=\$1 AND reporter_identity_id=\$2 ORDER BY created_at DESC$/);assert.doesNotMatch(queries[0].sql,/INSERT|UPDATE|DELETE/);}
});
test('support history legitimate read preserves trusted reporter tenant binding and real-shaped database rows',async()=>{
 const rows=[{id:'explicit-fixture',status:'reviewing',description:'Original description',createdAt:new Date('2026-10-15T12:00:00Z')}],events=[],queries=[];
 const auth={identityFromAuthorization:async authorization=>{events.push(['identity',authorization]);return{id:'trusted-reporter'};},requireMembership:async(id,tenant)=>{events.push(['membership',id,tenant]);return{role:'professional'};}};
 const db={tenant:async(tenant,work)=>{events.push(['tenant',tenant]);return work({query:async(sql,params)=>{queries.push({sql,params});return{rows};}});}};
 const controller=new SupportController(db,auth);
 assert.strictEqual(await controller.mine('Bearer fixture','tenant-a'),rows);
 assert.deepEqual(events,[['identity','Bearer fixture'],['membership','trusted-reporter','tenant-a'],['tenant','tenant-a']]);
 assert.equal(queries.length,1);assert.deepEqual(queries[0].params,['tenant-a','trusted-reporter']);
 assert.match(queries[0].sql,/WHERE tenant_id=\$1 AND reporter_identity_id=\$2 ORDER BY created_at DESC$/);assert.doesNotMatch(queries[0].sql,/INSERT|UPDATE|DELETE/);
});
// Explicit local auth/query fixtures. Not Nest HTTP, identity provider, PostgreSQL transaction/RLS, native or production evidence.

```

Descrição preparada preservada integralmente:
O painel company/exceptions precisa propagar uma falha na consulta de identidade ou vínculo sem iniciar trabalho de tenant nem devolver sucesso vazio/parcial. O controlador já cumpre esse contrato; este PR acrescenta dois casos de regressão ao teste existente, preservando os19anteriores de cronologia e12de criação de suporte.

Commit 94d3e372e029d658b65a9dd4aca22cdb47e21734; árvore b937037a3008d504d2ce5836ad9a8b4d664d4204; paiMAIN4dbdd40481478c11f7f39127b3dfc1bc4d7261fb. Conjunto focal33=[21chronology+12create]PASSUTC/SP,0fail-skip-cancelNode24.19.0. MutanteLOCAL que fornece owner após ocultar erro genérico de dependência:19antigosPASS;21expanded=19PASS2FAIL. Fixtureoriginalcomnovoscasos19PASS2FAIL é lacuna do mock, nãoBUGproduto. FULLreverse das4mudançasfixture+apêndice recompõe10095bytes6459fb23cf7a24d915bb8fb44b2538cec92e5b23; candidato11592bytes05ac7a46a3e54ef952eab8f4a2c6023869bca294.

Local usa classes/helpers/corpos reais por adaptador explícito, com imports/decoratorsNest removidos SOMENTEnoadaptador/FixtureExceptions. Publicado mantém NestimportsREAIS. Nest/TypeScriptlocaisausentes: não é typecheckcanônico/fullAPI/HTTPPG/RLS/provider/nativePASS. CI completo próprio obrigatório, pendente;1521=[145Web913mobile449API3CLI11monitor] somente esperado.

Revisão de8pathsSHA100644+FULLUTF8remoteReadbackEXACT;1256/1263blobsMAIN+modesiguaisfora7modified;498non-docsforaúnicoAPItestiguaisinclALL159mobile/depslock/workflows/buildsmoke e canonicalExpo mobile→Gradle→APK N/A integral. NenhumAPKnovofoiconstruído/emprestado.6originaisFULLMAINprefixINPLACEappend,memória>1MiBTREEpathSHA→fetch_blobFULL,nãoarquivoempty. Delegação de aceite ao assistente já preservada; nenhuma confirmação humana pendente/nenhuma área nova aceita.

[Provas, fontes e reprodutores integrais, FULLFINAL58611484chars](https://github.com/dbdanielbaracho/MLIVRETRABALHO/blob/94d3e372e029d658b65a9dd4aca22cdb47e21734/docs/evidencias/EXCEPTION_AUTH_FAILURE_BOUNDARIES_2026-10-19.md). #586JÁMERGED/não repetir. MAIN4dbdPOSTCI39196163454a2quotaANTEScheckout/ONEretryCONSUMIDA. Own5861519SUCCESSéhistórico,nãoPASSdesteSHA. Semrerunparaverde ouregistry/workflow/credencialbypass; sóownCIcompletoSUCCESS+freshmain/head/diff/modes/APKN/A ainda válida permite integraçãoSHAesperado+POSTreal. GitprepPENDINGhistória;consolidarFINALsópróximaentregaFUNCIONAL,semstatus/autorefcommit.

## Reprodução LOCAL: sources.json

```json
{
  "main": "import { Injectable, OnModuleDestroy } from '@nestjs/common';\nimport { Pool, PoolClient, QueryResultRow } from 'pg';\n@Injectable()\nexport class DatabaseService implements OnModuleDestroy {\n private readonly pool=new Pool({connectionString:process.env.DATABASE_URL});\n query<T extends QueryResultRow=QueryResultRow>(text:string,values:unknown[]=[]){return this.pool.query<T>(text,values);}\n async transaction<T>(work:(client:PoolClient)=>Promise<T>):Promise<T>{\n  const client=await this.pool.connect();try{await client.query('BEGIN');const value=await work(client);await client.query('COMMIT');return value;}catch(e){await client.query('ROLLBACK');throw e;}finally{client.release();}\n }\n async tenant<T>(tenantId:string,work:(client:PoolClient)=>Promise<T>):Promise<T>{\n  const client=await this.pool.connect(); try{await client.query('BEGIN');await client.query('SET LOCAL ROLE app_runtime');await client.query(\"SELECT set_config('app.tenant_id',$1,true)\",[tenantId]);const value=await work(client);await client.query('COMMIT');return value;}catch(e){await client.query('ROLLBACK');throw e;}finally{client.release();}\n }\n async onModuleDestroy(){await this.pool.end();}\n}\n",
  "candidate": "import { Injectable, OnModuleDestroy } from '@nestjs/common';\nimport { Pool, PoolClient, QueryResultRow } from 'pg';\n@Injectable()\nexport class DatabaseService implements OnModuleDestroy {\n private readonly pool=new Pool({connectionString:process.env.DATABASE_URL});\n query<T extends QueryResultRow=QueryResultRow>(text:string,values:unknown[]=[]){return this.pool.query<T>(text,values);}\n async transaction<T>(work:(client:PoolClient)=>Promise<T>):Promise<T>{\n  const client=await this.pool.connect();let rollbackFailed=false;try{await client.query('BEGIN');const value=await work(client);await client.query('COMMIT');return value;}catch(e){try{await client.query('ROLLBACK');}catch{rollbackFailed=true;}throw e;}finally{if(rollbackFailed)client.release(true);else client.release();}\n }\n async tenant<T>(tenantId:string,work:(client:PoolClient)=>Promise<T>):Promise<T>{\n  const client=await this.pool.connect();let rollbackFailed=false; try{await client.query('BEGIN');await client.query('SET LOCAL ROLE app_runtime');await client.query(\"SELECT set_config('app.tenant_id',$1,true)\",[tenantId]);const value=await work(client);await client.query('COMMIT');return value;}catch(e){try{await client.query('ROLLBACK');}catch{rollbackFailed=true;}throw e;}finally{if(rollbackFailed)client.release(true);else client.release();}\n }\n async onModuleDestroy(){await this.pool.end();}\n}\n",
  "oldTests": "import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport {DatabaseService} from './database.service';\n\nconst tenantId='00000000-0000-4000-8000-000000000001';\nconst roleSQL='SET LOCAL ROLE app_runtime';\nconst tenantSQL=\"SELECT set_config('app.tenant_id',$1,true)\";\ntype Method='transaction'|'tenant';\ntype Options={fail?:string;rollbackFails?:boolean;connectFails?:boolean;rollbackWait?:Promise<void>;onRollback?:()=>void};\nfunction fixture(options:Options={}){\n const primary=Error('fixture_primary'),secondary=Error('fixture_rollback');\n const trace={connects:0,callbacks:0,queries:[] as {text:string;values:unknown[]|undefined}[],releases:[] as unknown[]};\n const value={unchanged:true};\n const client={query:async(text:string,values?:unknown[])=>{\n  trace.queries.push({text,values});\n  if(text==='ROLLBACK'){options.onRollback?.();await options.rollbackWait;if(options.rollbackFails)throw secondary;}\n  else if(text===options.fail)throw primary;\n  return{rows:[]};\n },release:(destroy?:unknown)=>{trace.releases.push(destroy);}};\n const service=Object.create(DatabaseService.prototype) as DatabaseService;\n Object.defineProperty(service,'pool',{value:{connect:async()=>{trace.connects++;if(options.connectFails)throw primary;return client;}}});\n const work=async(actual:unknown)=>{assert.equal(actual,client);trace.callbacks++;if(options.fail==='WORK')throw primary;return value;};\n const invoke=(method:Method)=>method==='tenant'?service.tenant(tenantId,work):service.transaction(work);\n return{service,client,trace,primary,secondary,value,invoke};\n}\nfor(const method of ['transaction','tenant'] as Method[]){\n const setup=method==='tenant'?['BEGIN',roleSQL,tenantSQL]:['BEGIN'];\n test(method+' commits once and returns callback value with normal release',async()=>{\n  const f=fixture();assert.equal(await f.invoke(method),f.value);\n  assert.deepEqual(f.trace.queries.map(q=>q.text),[...setup,'COMMIT']);assert.equal(f.trace.callbacks,1);assert.equal(f.trace.connects,1);assert.deepEqual(f.trace.releases,[undefined]);\n  if(method==='tenant')assert.deepEqual(f.trace.queries[2]!.values,[tenantId]);\n });\n test(method+' connect rejection does not query invoke work or release a missing client',async()=>{\n  const f=fixture({connectFails:true});await assert.rejects(f.invoke(method),e=>e===f.primary);\n  assert.equal(f.trace.connects,1);assert.equal(f.trace.callbacks,0);assert.deepEqual(f.trace.queries,[]);assert.deepEqual(f.trace.releases,[]);\n });\n for(const stage of ['BEGIN','WORK','COMMIT'])for(const rollbackFails of [false,true])test(method+' '+stage+' failure with rollback '+(rollbackFails?'failure discards client':'success reuses client'),async()=>{\n  const f=fixture({fail:stage,rollbackFails});let caught:unknown;\n  try{await f.invoke(method);}catch(e){caught=e;}\n  assert.equal(caught,f.primary,'Rollback must not replace primary transaction error');\n  const before=stage==='BEGIN'?['BEGIN']:stage==='COMMIT'?[...setup,'COMMIT']:setup;\n  assert.deepEqual(f.trace.queries.map(q=>q.text),[...before,'ROLLBACK']);\n  assert.equal(f.trace.callbacks,stage==='BEGIN'?0:1);assert.equal(f.trace.connects,1);\n  assert.deepEqual(f.trace.releases,[rollbackFails?true:undefined],'Exactly one release, discard only after failed rollback');\n  if(method==='tenant'&&stage!=='BEGIN')assert.deepEqual(f.trace.queries[2]!.values,[tenantId]);\n });\n test(method+' awaits rollback before releasing and never retries callback',async()=>{\n  let unblock!:()=>void,entered!:()=>void;\n  const wait=new Promise<void>(resolve=>{unblock=resolve;}),started=new Promise<void>(resolve=>{entered=resolve;});\n  const f=fixture({fail:'WORK',rollbackWait:wait,onRollback:entered});\n  const pending=assert.rejects(f.invoke(method),e=>e===f.primary);await started;\n  assert.deepEqual(f.trace.releases,[]);assert.equal(f.trace.callbacks,1);unblock();await pending;\n  assert.deepEqual(f.trace.releases,[undefined]);assert.equal(f.trace.callbacks,1);\n });\n test(method+' preserves a non-Error thrown value and discards after failed rollback',async()=>{\n  const f=fixture({rollbackFails:true}),primary={fixture:'non-error-primary'};let caught:unknown;\n  const work=async()=>{throw primary;};\n  try{if(method==='tenant')await f.service.tenant(tenantId,work);else await f.service.transaction(work);}catch(e){caught=e;}\n  assert.equal(caught,primary);assert.deepEqual(f.trace.releases,[true]);assert.equal(f.trace.queries.at(-1)?.text,'ROLLBACK');\n });\n}\nfor(const stage of [roleSQL,tenantSQL])for(const rollbackFails of [false,true])test('tenant setup failure at '+stage+' rollbackFails='+rollbackFails,async()=>{\n const f=fixture({fail:stage,rollbackFails});let caught:unknown;\n try{await f.invoke('tenant');}catch(e){caught=e;}\n assert.equal(caught,f.primary);assert.equal(f.trace.callbacks,0);assert.equal(f.trace.connects,1);\n assert.deepEqual(f.trace.queries.map(q=>q.text),stage===roleSQL?['BEGIN',roleSQL,'ROLLBACK']:['BEGIN',roleSQL,tenantSQL,'ROLLBACK']);\n if(stage===tenantSQL)assert.deepEqual(f.trace.queries[2]!.values,[tenantId]);\n assert.deepEqual(f.trace.releases,[rollbackFails?true:undefined]);\n});\n"
}
```

## Novo teste canônico (imports reais publicados)

```ts
import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseService} from './database.service';

type Method='transaction'|'tenant';
function deferred(){
 let release!:()=>void;
 const promise=new Promise<void>(resolve=>{release=resolve;});
 return{promise,release};
}
for(const failedMethod of ['transaction','tenant'] as Method[])for(const first of ['failed','healthy'] as const)test(failedMethod+' failed rollback owns its discard while '+first+' settles first across concurrent wrappers',async()=>{
 const primary=Error('explicit failed operation'),secondary=Error('explicit rollback failure'),value={healthy:true};
 const rollback=deferred(),commit=deferred(),rollbackEntered=deferred(),commitEntered=deferred();
 const queries:Array<Array<{text:string;values:unknown[]|undefined}>>=[[],[]],releases:unknown[][]=[[],[]];
 let connects=0,failedCalls=0,healthyCalls=0;
 const clients=[0,1].map(index=>({
  query:async(text:string,values?:unknown[])=>{
   queries[index]!.push({text,values});
   if(index===0&&text==='ROLLBACK'){rollbackEntered.release();await rollback.promise;throw secondary;}
   if(index===1&&text==='COMMIT'){commitEntered.release();await commit.promise;}
   return{rows:[]};
  },
  release:(destroy?:unknown)=>{releases[index]!.push(destroy);}
 }));
 const service=Object.create(DatabaseService.prototype) as DatabaseService;
 Object.defineProperty(service,'pool',{value:{connect:async()=>{const client=clients[connects++];assert.ok(client,'exactly two explicit clients');return client;}}});
 const tenantA='00000000-0000-4000-8000-000000000001',tenantB='00000000-0000-4000-8000-000000000002';
 const healthyMethod:Method=failedMethod==='transaction'?'tenant':'transaction';
 const invoke=(method:Method,tenant:string,work:(client:unknown)=>Promise<unknown>)=>method==='tenant'?service.tenant(tenant,work):service.transaction(work);
 const failed=invoke(failedMethod,tenantA,async client=>{assert.equal(client,clients[0]);failedCalls++;throw primary;});
 // Attach the rejection observer immediately, before either controlled operation settles.
 let caught:unknown;
 const rejected=failed.then(()=>assert.fail('failed operation must not acknowledge'),error=>{caught=error;});
 const healthy=invoke(healthyMethod,tenantB,async client=>{assert.equal(client,clients[1]);healthyCalls++;return value;});
 try{
 await Promise.all([rollbackEntered.promise,commitEntered.promise]);
 assert.deepEqual(releases,[[],[]],'neither client may be released while its own settlement waits');
 assert.equal(connects,2);assert.equal(failedCalls,1);assert.equal(healthyCalls,1);
 if(first==='failed'){
  rollback.release();await rejected;
  assert.deepEqual(releases,[[true],[]],'failed rollback discards only its own client');
  commit.release();assert.strictEqual(await healthy,value);
 }else{
  commit.release();assert.strictEqual(await healthy,value);
  assert.deepEqual(releases,[[],[undefined]],'healthy commit cannot retire the pending rollback client');
  rollback.release();await rejected;
 }
 assert.strictEqual(caught,primary,'rollback rejection cannot mask the original operation error');
 assert.deepEqual(releases,[[true],[undefined]],'one discard and one ordinary release, each exactly once');
 assert.equal(connects,2);assert.equal(failedCalls,1);assert.equal(healthyCalls,1,'no automatic callback retry');
 const expected=(method:Method,end:string)=>method==='tenant'?['BEGIN','SET LOCAL ROLE app_runtime',"SELECT set_config('app.tenant_id',$1,true)",end]:['BEGIN',end];
 assert.deepEqual(queries[0]!.map(q=>q.text),expected(failedMethod,'ROLLBACK'));
 assert.deepEqual(queries[1]!.map(q=>q.text),expected(healthyMethod,'COMMIT'));
 if(failedMethod==='tenant')assert.deepEqual(queries[0]![2]!.values,[tenantA]);
 if(healthyMethod==='tenant')assert.deepEqual(queries[1]![2]!.values,[tenantB]);
 }finally{
  rollback.release();commit.release();await Promise.allSettled([failed,healthy]);
 }
 // Explicit pool/client scheduling fixture; this is not live PostgreSQL pool reuse or RLS proof.
});

```

## run-tests.cjs (somente adaptador LOCAL)

```js
const fs=require('node:fs'),{stripTypeScriptTypes}=require('node:module');
const sources=JSON.parse(fs.readFileSync(__dirname+'/sources.json','utf8'));
const clean=s=>stripTypeScriptTypes(s.replace(/^import .*$/gm,'').replace(/@Injectable\(\)/g,''),{mode:'transform'}).replace(/\bexport\s+/g,'');
let source=process.env.DB_BASELINE==='1'?sources.main:sources.candidate;
if(process.env.DB_SHARED_FLAG_MUTANT==='1')source=source.replaceAll('let rollbackFailed=false;','this.rollbackFailed=false;').replaceAll('rollbackFailed=true','this.rollbackFailed=true').replaceAll('if(rollbackFailed)','if(this.rollbackFailed)');
const DatabaseService=Function('Pool',clean(source)+';return DatabaseService;')(class ExplicitUnusedPool{});
const execute=s=>Function('test','assert','DatabaseService',clean(s))(require('node:test'),require('node:assert/strict'),DatabaseService);
if(process.env.DB_NEW_ONLY!=='1')execute(sources.oldTests);
if(process.env.DB_OLD_ONLY!=='1')execute(fs.readFileSync(__dirname+'/database-rollback-concurrency.test.ts','utf8'));

```

Comandos: node --test run-tests.cjs; TZ=America/Sao_Paulo node --test run-tests.cjs; DB_BASELINE=1 DB_NEW_ONLY=1 node --test run-tests.cjs; DB_SHARED_FLAG_MUTANT=1 DB_OLD_ONLY=1 node --test run-tests.cjs; DB_SHARED_FLAG_MUTANT=1 DB_NEW_ONLY=1 node --test run-tests.cjs. Os dois últimos não modificam produto publicado. Falhas esperadas baseline/mutante têm exit1; 28 focais exit0. Nenhum teste Nest/PG/fullAPI local alegado.
