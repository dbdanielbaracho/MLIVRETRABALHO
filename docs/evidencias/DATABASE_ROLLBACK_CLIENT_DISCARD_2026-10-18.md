# DatabaseService: descarte após falha de rollback


## Transações: preservar falha original e descartar cliente após ROLLBACK falho — 2026-10-18 UTC

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c, paisordenados[f98b5f618c5b78772c360b93d17e6028f0021008,3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d]. Nova fatia de produto independente dos fixtures573/571; nenhum PR duplicado e nenhum gate deles importado. README e seis documentos normativos originais foram recuperados completos em refs imutáveis. FULLprefix main+histórias571/573/574/dfb2 nos cinco originais e matriz preservado NO LUGAR, por apêndice. Cinco notas históricas são mantidas pelos mesmos blobs; nenhum script/appfix/workflow de drafts é incorporado.

Defeito reproduzido nas funções REAIS DatabaseService.transaction e tenant: depois de erro em BEGIN, callback, COMMIT ou configuração do tenant, o catch faz ROLLBACK. Se esse ROLLBACK também rejeitar, substitui o erro primário pelo erro de rollback e finally chama release() normal. A reprodução usa objetos Pool/client explícitos, não rede nem banco. Não prova conexão PG real reutilizada, vazamento tenant, exploit ou incidente em produção.

24 regressões novas em apps/api/src/database-rollback-release.test.ts, sobre prototype da classe REAL: baseline14PASS10FAIL/exit1 → candidato24PASS/zeroFAILSKIPCANCEL/exit0 local via NativeTSstrip+Function. Cobrem ambos wrappers: sucessoCOMMIT/valor original; conexão recusada semquery/work/release; falhasBEGIN/WORK/COMMIT com rollback bem-sucedido ou falho; aguardar rollback pendente antes de liberar; ausência de retry de callback; valor rejeitado nãoError preservado. Quatro casos tenant adicionais cobrem falhaSETLOCALROLE e set_config com ambos resultados de rollback, sem executar callback. Anotações de fixtures respeitam strict/noUncheckedIndexedAccess/exactOptionalPropertyTypes; typecheckCI ainda pendente, não é PASS por strip.

Fix mínimo SOMENTE nas duas funções de apps/api/src/database.service.ts: variável rollbackFailed inicialmentefalse; ROLLBACK é aguardado em try/catch e sua rejeição marca descarte; o mesmo erro primário é relançado; finally chama client.release(true) SOMENTE se rollback falhou, caso contrário o release() original. Nenhum retry, novo SQL, log ou credencial. Reverse-substitution integral reconstrói a fonte main byte a byte fora dessas duas mudanças. Pool constructor/query/onModuleDestroy, assinatura, callback/valor/sucessoCOMMIT/BEGIN, SET LOCAL ROLE app_runtime e set_config('app.tenant_id',$1,true) com parâmetros permanecem intactos. Não altera política tenant/RLS/ACL, membership, role, migração, controller, endpoint/payload/auth/session ou negócio.

API oficial node-postgres https://node-postgres.com/apis/pool#releasing-clients consultada2026-10-18: release(true) instrui descarte em vez de devolver ao pool. Lockfile lido: pg8.23.0/pg-pool3.14.0/@typespg8.23.1, sem alteração/instalação de dependência. Não confundir documentação ou fixture de client com teste de banco real. Os testes compilados no CI importarão DatabaseService real com dependências existentes; local usa o mesmo source e fixtures explícitas. Nenhum pressuposto sobre falha de driver específica ou tenantleak.

### Recibo final573dfb2 consolidado neste ciclo funcional (história, não PASS do novo HEAD)

PR573DRAFT HEADdfb2ccf818274e55f348c0640ead9bc58edd7655/tree201e959b6f6762e32e22005bb16f564fe1b5e2f0/parent5852. EntregaCJSconsumeloadEarningsrealinalterado/4novosmodels+6old=10PASS e8oldGanhosPASS; nãoHTTPPG. OwnCI39084499453/job117548129772attempt1COMPLETEFAILURE,ZEROretry: quotaECRpostgres17toomanyrequestsDatalimit00:54:33.8036969Z/00:54:38.7258144Z/00:54:45.9339526Z/Dockerpullfailed00:54:45.9445280Z. InitializecontainersFAIL/Checkout+TODOSprodutosSKIPPED. NenhumcheckoutACTUAL/Chrome/DOM/PNG/HTTPPG/ProductionTruth, nenhum dos3LEDGERmarkers executado;1365 apenasESPERADO, não unitPASS. Old5852attempt1+2tambéminfra, não outroretry/registrychange. Fullfinalbody17133chars preservado integralmente na evidência DATABASE_ROLLBACK_CLIENT_DISCARD_2026-10-18.md. Não copia fixture573 ou seus10tests/HTTPshell para esta branch. APK573N/Aintegral, nenhumAPKatribuído.

### Fecho desta preparação e requisito mais próximo do aceite

Alteração funcional: DatabaseService em duas funções e24 regressões reais. Evidência DATABASE_ROLLBACK_CLIENT_DISCARD_2026-10-18.md; cinco originais+matrizappend, história íntegra. Área7PostgresRLS/tenant→DatabaseService falha de cleanup→erro primário/discard→24testes→CI/PGevidência própria PENDENTES. Áreas8falhas e11API também beneficiadas. Nenhum aceite integral: só10AndroidstandaloneTÉCNICAINTERNOaceita, outras12pendentes.

CI esperado1379=[145Web,765mobile,455API,3CLI,11monitor] (431API+24), não resultado medido. CI completo novoHEAD/revisão/merge/pósreal PENDENTES. APK N/A apenas após identidade integral de insumos mobile/packages/rootdeps/lock/workflows/build/smoke e grafo canônico expo-mobileprebuild→Gradle; não []/ausência de run/APK574emprestado. Não mudou React19.1.4/RN0.81.6/desenho/segurança/CDP/Fetchguard/CORS/sandbox/LNA/deadlines/images; browserERR_ABORTED permanece questão separada não corrigida aqui.

Próximo passo técnico: conferir todosbytes/modes/tree/ancestrais e CI próprio exato. ManterDRAFT se falhar; semrerunproduto para verde ou quota persistente, avançar item independente. Integração somente por expectedSHA/CIcompletoSUCCESS e pósCIreal. Registrar final primário noPR, consolidar em próximo ciclo funcional sem commitmetadados/autorreferência/atividade. Semprodução/Railway/Neon/serviço/custo/credencial/provider/PSP/contrato/dinheiroreal/root/grants/RLSdisable/Activitymanualwrites/novaautomação.


## Recibo integral573dfb2 — HISTÓRICO — fonte https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/573

# FINAL factual — novo consumidor publicado, integração bloqueada antes do checkout — 2026-10-18 UTC

PR573 DRAFT / NOTMERGED. HEAD `dfb2ccf818274e55f348c0640ead9bc58edd7655`, tree `201e959b6f6762e32e22005bb16f564fe1b5e2f0`, parent `5852d5527e347312d473a6fac8cc3a604ff2eb52`. Branch test/ledger-completion-insert-rollback-20261017. Main/base continua `3e098cd51cd2fd84f21e144a600a814a2cb1a150`, tree66f89c3ef2902dad6d1d59e0210be7229c3a857c, pais ordenados[f98b5f618c5b78772c360b93d17e6028f0021008,3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d]. Ahead2behind0/mergebase3e; nenhumready/merge/pós573/rerun/cancel/PRduplicado.

## Entrega concreta / testes realmente executados

- scripts/ledger-completion-atomicity-e2e.cjs agora consome os JSONs das MESMAS chamadas HTTPearnings existentes depois do rollback e da recuperação explícita, por `loadEarnings` REAL da main, carregado por caminho fixo NativeTSstrip+VM. Callback não faz HTTP/SQL/POST. Exige uma chamada/uma leituraJSON, READY e preservação da mesma referência.
- Rollback exige JSON[] autorizado; recuperação exige UMA linha exata idPG/tenantId/assignmentId/23456/payable. Nenhuma linha/saldo/zero inventado. Expectativa forjada, schema incompatível ou data inválida falha sticky.
- Quatro novos testes das funções REAIS, mais seis guardmodels originais com bodiesbyteidênticos exceto importdestructuring: **10PASS/0FAILSKIPCANCEL local**. Oito testesearnings.test.mjs antigos, asserts intactos: **8PASS**. node--checkPASS; CLI CI=0 recusou antes de pg/HTTP. Total focal18PASS NÃO é SQLrollback/fullCI/Android.
- Comparação dos20 comandos awaitcall: expressões/ordem inalteradas. GETpósrollback só ganha variável; nenhum pedidoHTTP extra. Todos asserts/calls/SQLhook/snapshot5tabelas2tenants/ACL/RLS/cleanup/replay400/browser/gates antigos preservados. Marker novo `LEDGER_MOBILE_REAL_JSON_PASS` só pode ser emitido após os DOIS consumos reais e controles finais. Não foi executado neste CI.
- Helpermobile, produtoAPI/controller/DatabaseService/migração/deps/lock/workflow/smoke/React19.1.4/RN0.81.6 intactos. Não há patch de transação/PSP/provider/negócio nem bugPG inventado.

## CI próprio: FAILURE de infraestrutura, não produto RED/PASS

[Run39084499453](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39084499453), attempt1 COMPLETEFAILURE, **ZERO retry**.
[Job117548129772](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39084499453/job/117548129772).
- Pull `public.ecr.aws/docker/library/postgres:17`: `toomanyrequests: Data limit exceeded` primários2026-10-18T00:54:33.8036969Z /00:54:38.7258144Z /00:54:45.9339526Z. Dockerpullfailed00:54:45.9445280Z. São retentativas internas do passoDocker, NÃO rerun de workflow executado pelo agente.
- InitializecontainersFAIL; Checkout, Node, install, typecheck, build, mobileexport, tests, migrations, privacy, HTTP/PG/browser/ProductionTruth TODOSSKIPPED.
- **Nenhum checkoutACTUAL observado**: não atribuir execução a HEADliteral ou mergeSINTÉTICO, mesmoexistindoobjetosGit. Nenhuma versãoChrome/DOM/PNG/captura/jornada executada neste run.
- `LEDGER_COMPLETION_INSERT_ROLLBACK_PASS`, `LEDGER_COMPLETION_ATOMICITY_HTTP_PG_PASS` e `LEDGER_MOBILE_REAL_JSON_PASS` NÃOEXECUTADOS. **1365=[145Web,765mobile,441API,3CLI,11monitor] é SÓESPERADO**, não contagemCIreal.
- Não rerun desteSHA: a quota já persistia nas duas tentativas do antigo5852 e reapareceu primariamente no novoHEAD. Não copiar572registry/workflow/image/credenciais/serviços/custos para verde. Nenhumresultado/checkout/frames574/571/567emprestado.
- BrowserERR_ABORTEDhistórico NÃOobservado neste gateinfra; causaUNRESOLVED. AuditoriaREADONLY do driver main confirma continueRequest.catch vazio, mas controles históricos558 jáfalhavam semcontinueerrors; isso NÃOprova causa nem justifica mexer em CDP/Fetchguard/CORS/sandbox/LNA/flags/deadlines/asserts.

## Revisão integral / APK

14pathsPR ALLremoteUTF8byteexact, HTTPshell100755/rest100644. Novo ciclo10paths(8modificados+2novos);1168outros blobs do parent5852/modesiguais. Fullprefixmain+571+573+574 nos5originais+matriz intacto NO LUGAR; documentoMOBILE_PRIVACY_CALENDAR_2026-10-17.md histórico copiado pelo mesmo blob, sem patchesmobile574. Recibo integral574preservado emLEDGER_MOBILE_REAL_JSON_2026-10-18.md. Nenhuma deleção/truncamento/substituição.

1164of1171mainblobs iguais;493of494existingmainnon-docs foraHTTPshelliguais. Todos249insumos protegidos mobile/packages/rootmetadata/deps/lock/workflows/build/smoke mesmoSHA/mode. Entrypointstandalone fresco: expo-mobileprebuild→GradleassembleRelease eAPKbundle/smokeinalterados; novosAPItest/CJS estão fora desse grafo. **APK N/A INTEGRAL**, não[]/ausênciaruns/APK574emprestado. NENHUMAPK573construído ou atribuído. LatestvalidatedMAINAPK continua567POST3e;574owncandidateAPKnão émain.

## Fecho / avanço após bloqueio

Checkpoint/doc5originais+matriz incluem entrega/caminhos/local18PASS/CIpending de preparação, histórico preservado. Este FINAL é o recibo primário do resultado novo e será consolidado só em próximo ciclo FUNCIONAL, sem commitautorreferente/status/atividade. Requisito área6ledgerSIMULADO→APIrollback/recuperação→loadEarningsreal→4regressões+oldcontrols→CIpróprioPENDENTEporinfra→evidência rastreada. Área7/11/12 também beneficiadas, nenhuma área encerrada; só10TÉCNICAINTERNAaceita12pendentes.

Anti-estagnação: código e4novosPASSlocais publicados, não rodada apenasconsulta; apósinfraFAIL passou IMEDIATO a nova frente LOCALindependente DatabaseService. Fonte atual main e busca codeROLLBACK/client.release lidas; busca não retornou testes e não prova ausência absoluta. Probe8actualsource NativeTSstrip+Function comPool/clientexplicitfixtures: baseline4PASS4FAIL. Emtransactione tenant, quando workfalha E ROLLBACKfalha, o erro retornado é o doROLLBACK e release() é chamado uma vez SEMdestroy. ControlesCOMMITsucesso/ROLLBACKsucessoPASS. Não houve banco/HTTP/pgdriverreal/poolreutilizado/tenantleak/produçãoobservado.
Cópia candidata local SOMENTE2wrappers: guarda rollbackFailed, preserva erroprimário e client.release(true) apenas se rollbackfalhou; normalreleaseinalterado. Mesmos8tests8PASS. Arquivos `ledger-atomicity-local/next-audit/{database.service.ts,database-candidate.ts,transaction-release.test.cjs,transaction-release-candidate.test.cjs}`; NÃOpublicados/NÃOparte10models573/CI. A API oficial node-postgres documenta discard via release(true): https://node-postgres.com/apis/pool#releasing-clients (consultada2026-10-18). Isso não é prova de leak ou permissionbypass.
PRÓXIMO técnico: revalidar fontescontratosnormativos e teste deBEGIN/COMMIT/rollbackfalho/connectfailure/releaseúnico/preservaçãoSETLOCAL app_runtime+tenant antes de qualquerfix mínimo; identificar mudança funcional coerente comregressão+evidência, não rerun dfb2sóverde nem duplicar573. Medir próprioCI e revisãoAPKgraph, mergeexpectedSHAONLYGREEN+pósreal.

#57497aa/#571007/#572a6b6/#5702205/#568b7ef/#565aa0/#560e47/#558879draftsseparados;externos215219220224228OPEN. Maininalterada. SemActivitymanualwrites, commitartificial, produção/Railway/Neon, serviço/custo/credencial/provider/contrato/PSP/dinheiroreal. Rotinaúnica habilitada/scheduleinalterados; não é agente24x7.

---

## Preparação e recibo anterior preservados integralmente (HISTÓRIA, NÃO PASS atual)

# Atualização funcional — consumo real de Ganhos — 2026-10-18 UTC

DRAFT / NÃO MERGED. Novo HEAD `dfb2ccf818274e55f348c0640ead9bc58edd7655`, tree `201e959b6f6762e32e22005bb16f564fe1b5e2f0`, parent `5852d5527e347312d473a6fac8cc3a604ff2eb52`; main/base `3e098cd51cd2fd84f21e144a600a814a2cb1a150`.

Acrescenta 4 testes do consumidor real `loadEarnings` ao fixture573: JSON já recebido após rollback precisa ser READY vazio; após recuperação explícita precisa ser READY com tenant/assignment/ledgerID PG/23456/payable exatos. Nenhum HTTP/SQL/POST extra, helper mobile intocado. Seis controles antigos preservados; local10+8oldGanhos=18PASS, syntaxPASS e CI=0recusado antespg/HTTP. SQL real e fullCI do novoHEAD PENDENTES, não PASS herdado.

14paths de PR todos bytesUTF8/modes re-lidos exatos;1168outros blobs anteriores idênticos;249insumos protegidos mobile/packages/root/workflows/build/smoke iguais àmain; canonicalgrafoAPK preservado→APK N/A integral, nenhumAPK573atribuído. Documentos originais FULLmain+571+573+574prefixpreservados por apêndice. História574 e evidência adicionadas sem seus patchesmobile/gates.

Não rerun5852; ambos attempts antigos falharam quotaECR antescheckout. NovoHEAD tem novo caso funcional. Nenhummerge/ready enquanto CIcompleto nãoSUCCESS. Aceite12áreascontinua pendente, só10técnica. Markers `LEDGER_COMPLETION_INSERT_ROLLBACK_PASS`, `LEDGER_COMPLETION_ATOMICITY_HTTP_PG_PASS`, `LEDGER_MOBILE_REAL_JSON_PASS` precisam logs próprios. Final será atualizado nestePR, sem commitmetadados.

## Recibo anterior integral — HISTÓRICO5852, não resultado do novoHEAD

## FINAL factual — infraestrutura bloqueou execução de produto — 2026-10-17 UTC

PR573 DRAFT/NOTMERGED. HEAD `5852d5527e347312d473a6fac8cc3a604ff2eb52`, tree `ff1d0ec816605367a1a0c0d809391f6c3e98b2d2`, parent/baseMAIN `3e098cd51cd2fd84f21e144a600a814a2cb1a150`. branchtest/ledger-completion-insert-rollback-20261017. Nenhumready/merge/pós573/cancel/novotentativa; apenas UMA repetição específica de jobFAILED-COMPLETED no MESMOSHA por infraestrutura transitória documentada.

### Resultado CI: FAILURE ANTES CHECKOUT, não produto RED/PASS

[Run39076638325](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39076638325), attempt2COMPLETEFAILURE.
- [Attempt1/job117525041067](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39076638325/job/117525041067): public.ecr.aws/docker/library/postgres:17 download falhou `toomanyrequests: Data limit exceeded` primários22:49:56.4661814Z/22:49:58.2571474Z/22:50:02.4917013Z; Docker pull failed22:50:02.4990382Z. InitializecontainersFAIL; Checkout e TODOS gatesprodutoSKIPPED.
- [ÚNICO retry/job117525180707](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39076638325/job/117525180707): mesmafalhaECR22:50:38.6329457Z/22:50:40.0823128Z/22:50:50.2315591Z, Docker pull failed22:50:50.2411551Z. InitializecontainersFAIL; Checkout/Node/install/typecheck/build/mobileexport/tests/migrations/privacy/HTTP/ProductionTruthSKIPPED.
- Nenhum checkoutACTUAL observado em ambas; NÃO inventar hash sintético/literal/árvore executada. SHA candidato e Git parent/tree existem, não são prova de execução.
- NenhumLEDGER_COMPLETION_*PASS / fixture HTTP/PG / browser / Chromeversion / PNG/DOM / jornada foram executados/observados neste HEAD. NÃO emprestar571/567PASS/frames/versões.
- 1361=[145Web,765mobile,437API,3CLI,11monitor] é SOMENTE contagem ESPERADA pela composição main+6novos, NÃO executada/passada.
- Não há segunda repetição, alteração de workflow/registro/image/flags/security/credentials/serviços/custos/bypass para verde. #572 é PR separado aindaDRAFT/CIred, não integrado/copiadoaqui. Root histórico browserERR_ABORTED permanece independente e NÃO foi observado neste run infra.

### Entrega funcional efetivamente publicada e testada localmente

Nova scripts/ledger-completion-atomicity-e2e.cjs +6guardmodels apps/api/src/ledger-completion-atomicity.test.ts +UMAinvocação antesbrowser noHTTPshell. **Local6PASS/0fail-skip-cancel**, NativeTSstrip+Function executandofunçõesreais scope/binding/SQLbounded/cleanup; node--checkPASS e CLI CI=0 recusaantespg/HTTP. Esses são testes dos guardas da fixture, NÃO SQLrollback/produtotypecheck/fullCI/Android.

Lacuna confirmada em fonte main: WorkAssignmentsController.complete atualizaassignmentstatus/completed_at e depoisINSERTearnings_ledger na MESMA DatabaseService.tenant. Atualtest cobreSQL/filter/ACK/errogenérico eHTTPfinance cobreHMAC/replay/totais, não falhaINSERTledgerapósstatusvisible. Produto/controller/DatabaseService/SQLruntime NÃOmudaram; nenhumdefeitotransacionalinventado.

Novo caso REQUER, aindaNÃOexecutado:2companies/pro/outsider/HTTPjobs/interest/confirm/lifecycle; Bcompletedledger34567como controle, Achecked_outsemledger23456. BindUUID/tenant/job/profile/identity/títuloUUID/valor/DateobjectsantesDDL. Auth/crossowner/outsider401+foreignassignment400 não podem escrever. ScopedAFTERINSERTledger SECURITYDEFINER testemunhaassignmentcompleted+payableexato antessequenceown1+raise500. SnapshotsCOMPLETOS5tabelasDOS2tenants+policiesACL/RLSdevemficariguais; GETassignmentchecked_out/earningsvazio. ApóscleanupUMAconclusãoEXPLÍCITA201 produzledgerúnico23456, somente2camposassignmentmudam; repeatcomplete400semledgerduplicado eBinalterado. Consultaausênciaownhookobrigatória. MarkersLEDGER_COMPLETION_INSERT_ROLLBACK_PASS/LEDGER_COMPLETION_ATOMICITY_HTTP_PG_PASS aguardamNOVOcasoCIlegítimo, NÃO alegarPASSagora.

GuardCI/localAPIHTTPexplicitport/PGexactmlivretrabalho_http/socketloopback/pgloadedafterguard; triggerapósbindingowneddata; fixedsearch_path/schemaqualified/EXECUTEPUBLICrevogado; semgrantapp_runtime/RLSdisable/CASCADE/ORREPLACE/root/adminhistorydelete/produção. Cleanupnomesrevalidados/ownershipflags/drainerrorsticky; no businessautoretry/provider/PSP/transferência/dinheiroreal.

### Revisão integral / APK N/A

**12pathsPR ALLremoteUTF8byteexact**, HTTPshell100755/rest100644. NovosCJS/APItest/novaevidênciaLEDGER_COMPLETION_INSERT_ROLLBACK_2026-10-17.md,6docsoriginaisappend;2notas571históricasmesmosblobs/modos (NÃO código571/gatesnãointegrados). Fullprefixmain3e+571007 dos5originais+matrizpreservados NO LUGAR. ReciboFINAL571007consolidado no novoappend; prepPENDINGseguehistória. READMEinalterado;1164othermainblobs/modesintactos/nenhumdeleção;492of493existingmainnon-docsforaHTTPshelliguais.
Todos249protectedinputsmobile/packages/rootmetadata/deps/lock/workflows/build/smoke sameSHA/mode; canonicalexpo-mobileprebuild→GradleassembleReleaseinalterado/newfixture+APItestforaAndroidgraph. **APK N/AporidentidadeINTEGRAL**, NÃO[]/ausênciaruns/emprestado; nenhumAPK573construído/atribuído. Ahead1behind0mergebasemain3e/parentmain3e/treeff1; freshhead/base/mainconfirmados.
TodosoldHTTPcalls/asserts/browser/deadline/Fetchguard/CDP/CORS/sandbox/LNA/securityflags/imagepreservados. Não mover/removergatepara verde. SeCIcompletoalgumdiaPASSlegítimo, revisarHEAD/base/integridade/expectedSHAantesqualquermerge e medirpósreal.

### Fecho e avanço independente após o bloqueio

Rodada produziu código de fixture+6novosPASSlocais+12paths/commit5852; provaSQL/PGeaceite ainda PENDENTES, não rodada apenasstatus. Áreas6/7/11 têm cobertura PREPARADA, não validada no banco. Sóárea10TÉCNICAINTERNAaceita,12semaceiteintegral.

Anti-estagnação aplicada: após2falhasinfra passou-se a frenteLOCALindependente de privacidade (não novaPR/commit/appfix). Freshmain privacy-requests.ts/privacy-actions.ts, testesexistentes e PrivacyController lidos. Probeactualhelpers NativeTSstrip+dataURL, explicitresponsefixtures/noHTTP/realcredenciais:4testes baseline1PASS3FAIL; createdAt/completedAt aceitamtrêsdatasimpossíveis comoREADY e deactivatedAt aceitaasmesmas comoDEACTIVATED apósUMPOSTcallbackinalteradoporcaso; controleleapday2024PASS. Valores2026-02-30T12:00:00Z/2025-02-29T12:00:00-03:00/2026-04-31T12:00:00+02:00. Scratchledger-atomicity-local/next-audit/privacy-calendar-probe.test.mjs +cópiasexactmain dos2helpers. NÃO alterados/publicadosnemincluídosnos6models573/CI. APIrealusaPGtimestamps e generatedAtnewDateISO; nenhumimpossiblePGrow/APIbug/produção/exploit/Android/SecureStore/sessãoapagadafoiobservado. Próximafrente: revalidarcontratos/datebaselineAgenda/oldcontrols e falhareal de ACK antesdequalquerfixmínimo, semmudarpolíticadeDSAR/retention/deactivation/autoretry.

#571007não rerunprodutoFAIL; #558/#560/#565/#568/#570/#572preservados/externos215219220224228OPEN. SemActivityissuewrites/commitartificial/produção/serviço/custo/credencial/provider/contrato/PSP/dinheiroreal. Não bloquear todasfrentesporquotaECR. PreparaçãoGitPENDINGcontinuaHISTÓRIA; consolidar estefinalsomentepróximoCICLOFUNCIONAL, semautorefmetadata/image/statuscommit.


---
## Preparação anterior à execução própria (HISTÓRIA)

## Preparação funcional — ledger simulado

HEAD 5852d5527e347312d473a6fac8cc3a604ff2eb52/treeff1d0ec816605367a1a0c0d809391f6c3e98b2d2/parentmain3e098cd51cd2fd84f21e144a600a814a2cb1a150. DRAFT, ownCI/SQLmarkers PENDENTES. Nenhum produto/controller/SQLruntime alterado ou bug transacional inventado.

Nova prova exigida: AFTERINSERTledger deve observarassignmentcompleted+UMledgerpayable anteserro500/witness1, snapshots5tabelas2tenantsiguais, depoisUMAconclusãoexplícita201/ledger23456único/repeatcomplete400/foreign34567intacto. SeisguardmodelsreaisPASSlocal, nãoSQLproof. Toda segurança/gatesantigos/browser preservados, semworkflow/deps/lock/mobile/nativechange; APK N/A depende revisão integral dosinputs/grafo.

Código scripts/ledger-completion-atomicity-e2e.cjs, API6testes eUMAinvocaçãoHTTPshell;5originais+matrizfullprefixmain+571preservadosappend, novaevidência e2notas571históricasmesmosblobs. Nãoincorporacódigo/gatesnãointegrados571nemduplicaconvites. Só10aceitetécnicointerno,12pendentes. MergeONLYownCIcompletoSUCCESS/reviewfresh/expectedSHA+pósreal, nenhumaReady/Merge/reruncego.

