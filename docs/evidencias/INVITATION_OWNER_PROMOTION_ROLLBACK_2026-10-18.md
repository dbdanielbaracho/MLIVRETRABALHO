# Convites: promoção manager para owner e falha tardia


## Convites: rollback da promoção de manager para owner — ciclo funcional — 2026-10-18 UTC

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Estende PR571 existente na branch test/invitation-insert-rollback-20261017; parent007aa7dc20d0f7c58e32aae8ddb77a812afd0fbb/tree49f043f544cf0a9bae2299bb686ece458a8293b1; base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. README, originais completos, código/controller/testes/migrações/grants e CI/APK consultados em GitHub vivo. FULLprefixmain+571+573+574+575 dos5originais/matriz preservados NO LUGAR por apêndice, não resumos substitutivos. Notas históricas preservadas pelos mesmos blobs; DatabaseService575 aindaDRAFT NÃOcopiado ou integrado.

Lacuna concreta: CompanyMembersController.accept atual suporta promoção de membership existente manager/admin→owner por conviteowner emitido por ownerreal, fazendo UPDATErole antes de UPDATEaccepted_at. PR571007 provou rollback de INSERTmembership, não promoção. Migrations0001/0004/0039/0047 autorizam UPDATEruntime já existente e mantêm RLS/FORCE, unicidade tenant/subject/identity e paraccepted_at/by; nenhum novo grant/política inventado. Esta fatia testa SOMENTE manager→owner. Não altera controller/DatabaseService/SQLproduto/auth/roles/migrações ou presume bug transacional.

Extensão scripts/invitation-atomicity-e2e.cjs DEPOIS de todos comandos/asserts/markers antigos: targetmanager já foi criado por aceiteHTTP real da etapa anterior. OwnerA emite novo conviteowner porHTTP (não seedrole). Scopephasepromote exigeUUIDtarget/priorRoleEXATOmanager e namespaceinv_promote separado. BindingHTTP↔PG comprova invitationId/tenant/ownerator/email/roleowner/hashdocódigo/ativo e UMAmembershipmanager comtenant/identity/subject exatos ANTESDDL.

HooktemporárioownedAFTERUPDATEaccepted_at exige ver simultaneamente membershipowner+conviteowneraceito exatos na transação; só então sequenceprópria1 não rollback e errocontrolado→HTTP500. Deve preservar snapshots integrais detodaslinhas invitations/memberships dosDOIStenants+RLS/policies/ACL; GETmembros autorizado continua manager e conviteowner continuaativo. Apóscleanupapenasobjetospróprios, UMAaçãoEXPLÍCITA comMESMOcódigo201 deve alterarSÓrolemanager→owner eparaccepted_at/by, semnovamembership, preservartodosoldrows/tenantB; replay400semnovadelta; PGconfirmaownhookausente. NÃOretryautomático, transferênciadeownershipinferida, emaildelivery/provider/native/produção.

Reusa todas guardasCI/localAPIportaexplícita/DBEXATOmlivretrabalho_http/socketloopback; carrega pg sóapósconfigguard. NomesrederivadosUUID/boundedemail, SECDEFsówitnessowned/search_pathfixo/schemaqualified/EXECUTEPUBLICrevogado, cleanupflags/priornamespacesinalterados/semCASCADE/ORREPLACE/grantapp_runtime/RLSdisable/root/historydelete. Osmesmos9tests antigos eTODOsourceparent fora extensão reconstruídosBYTEEXATOSporreverse-substitution, inclusivewhitespacefinal. Quatro guardmodelsNOVOS reais scope/binding/SQLwitness/cleanupPASS; total13PASS/zeroFAILSKIPCANCELlocal NativeTSstrip+Function; node--checkPASS/CLI CI=0recusouantespgHTTP. Modelos NÃOprovaHTTPPG.

Novosmarkers INVITATION_PROMOTION_UPDATE_ROLLBACK_PASS e INVITATION_PROMOTION_ATOMICITY_HTTP_PG_PASS PENDENTES até logs próprios. CI novo esperado1368=[145Web,765mobile,444API,3CLI,11monitor] (431main+13), NÃOresultadojámedido. TodosoldHTTPshell/browser/gates/asserts/deadlines/CDP/Fetchguard/CORS/sandbox/LNA/flags/imagesinalterados. APKN/A SÓapósrevisãointegralinputs/grafoexpo-mobileprebuild→Gradle, não[]/ausênciaruns/APKemprestado.

### Recibo575 FINAL consolidado (história, não resultado deste novo571)

PR575DRAFT HEAD89f799914fdcadaa75f7569b78c8483953829295/treed9ca8e85f8f2410474c18c73d85e99adbec66b72/parentmain3e. Fix2wrappersDBrollback,24regressõesbaseline14PASS10FAIL→24GREEN;mutaçãoomitirdiscard14PASS10FAILLOCAL. OwnCI39090990507/job117567517336attempt1COMPLETEFAILURE,ZEROretry:1379=[145,765,455,3,11]unitPASS/fail-skip-cancel0/typebuildexportmigrationrunner2xprivacyPASS/HTTPbrowserFAIL/PostSetupNodeSKIP/laterProductionTruthNOTexecuted. Actualcheckoutd3447a773881d73bf358476b2235882d789bcde8primary02:41:50.5247148ZSINTÉTICO[main3e,89f799]/treed9caequivalente,nãoHEADliteral.

Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/rev@3ff7ac5a9224be9156d7f8703a06e22890aafd34actual02:44:58.9839611Z. ActualONEteams503CONSUMED+11distinctGET200/unknown—/humanrefresh12NEWGET200/team1/noextraPOSTPASS02:45:01.0243014Z;Ateamjob201/render/persist12345centsdatesPASS. FAIL02:45:20.8951636Zloaded-dashboard apósPage.reload/newdocumentcompleteguard;12GETERR_ABORTED/canceledtrue/corsnull/UIunavailable—correta. Reloadsuccess/logout/B/revokedbearer/fulljourneyNOTcompleted; rootUNRESOLVED/nãoECRstartuppermissionAPI-CORS-vendorcausa. 14pathsremotebyteexact/249protectedinputsiguais→APKN/Aintegral,nãoAPK575. FINALbody12344charsreadbackexato preservadointegral na nova evidência deste ciclo. Seus5OWNdesktopPNGs+manifest agora preservados nesteCICLOFUNCIONAL com fontehead/tree/checkout/run/job/attemptFAIL próprios sob web-browser-2026-10-18; NÃOframes571/nativo/PASS emprestado. SignatureSHAbytes1365x900/Pillowverify do ciclofonte e normalizedbase64readback atuais exigidos; sem inspeção visual alegada.

### Fecho desta preparação e próximo passo

ArquivosfuncionaisCJS+APItest;5origdocs/matrizappend+INVITATION_OWNER_PROMOTION_ROLLBACK_2026-10-18.md e evidênciashistóricas vinculadas, semstatuscommitartificial. Requisitoárea4equipes/7PostgresRLS/11API→conviteownerautorizado/managerexistente→falhaúltimaescrita→rollbackrole+convite→13guardmodels+NOVOHTTPPG PENDENTE→CIpróprio/recibo. Nenhumaceiteintegral; só10AndroidstandaloneTÉCNICAINTERNOaceita12pendentes. Externos215219220224228OPEN.

CI/review/integração/pósreal aindaPENDENTES nesta preparação. ConferirnovoHEAD/tree/pais/bytes/modes/fullprefix/ownCI; mergeúnicoexpectedSHA SÓcompletoSUCCESS e pósCIreal. Se falhar manterDRAFT, registrarprimário e avançar outrafrente, sem rerunmesmoSHAparaverde. Não ready/merge/retry575/571007/573/anteriores. Semprodução/Railway/Neon/serviços/custos/credenciais/providers/PSP/contratos/dinheiroreal/Activitymanualwrites/novaautomação. Recibofinal seráPRbody e consolidado sópróximocicloFUNCIONAL, semmetadataautorreferente.


## Recibo575 FINAL integral — histórico — fonte https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/575

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



## Recibo571007 FINAL integral — histórico — fonte https://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/571

## FINAL próprio — aceite com falha tardia — 2026-10-17 UTC

PR571 DRAFT/NOTMERGED. HEAD `007aa7dc20d0f7c58e32aae8ddb77a812afd0fbb`, tree `49f043f544cf0a9bae2299bb686ece458a8293b1`, parent `67e3b8fc389162a186c4899d4c0b117a906c2d42`, base MAIN `3e098cd51cd2fd84f21e144a600a814a2cb1a150`. ZEROready/merge/post571/rerun/cancel. Nova fase funcional, não repetição do mesmo SHA para verde. API/controller/DatabaseService/SQLproduto NÃOalterados; nenhum defeito transacional inventado.

### Nova prova REAL HTTP/Postgres PASS

[OwnCI39072426685/job117512606508](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39072426685/job/117512606508), attempt1:

**INVITATION_ACCEPT_UPDATE_ROLLBACK_PASS2026-10-17T21:50:13.4912912Z**: AFTER UPDATE accepted_at observou UMA membershipmanager/subject=identity e UM convite aceito por identidade exata simultaneamente antes da sequência própria não transacional avançar1 e gerarHTTP500. Snapshots completos invitations/memberships de DOIS tenants exatamente iguais ao pré-aceite; convite continuou ativo via GET autorizado; ACL/policies/RLS intactos.

**INVITATION_ACCEPT_ATOMICITY_HTTP_PG_PASS21:50:13.5048641Z**: apóscleanup, UMA ação EXPLÍCITA usando MESMO código201 criou exatamenteuma membershipmanager; somenteaccepted_at/by mudou no convite. Replaycódigoconsumido400 não criou vínculo. Demaislinhas/tenantestrangeiro intactos; ausência dos DOIS conjuntos trigger/function/sequence consultada emPG.

Prova original renovação executada novamente NO NOVO HEAD: INVITATION_INSERT_ROLLBACK_PASS21:50:13.4679747Z / INVITATION_ATOMICITY_HTTP_PG_PASS21:50:13.5051887Z. Sem PASSemprestado.

Rastreabilidade: CompanyMembersController.accept + DatabaseService.tenant BEGIN/SETLOCALapp_runtime/tenant/COMMIT/catchROLLBACK →membershipINSERT+accepted_atUPDATE →500/snapshotigual/conviteativo →recuperaçãoexplícita201/replay400 →scripts/invitation-atomicity-e2e.cjs →markers próprios acima. SOMENTEINSERTmembershipnova, NÃO promoçãoadmin/manager→owner; nãoAndroid/SecureStore/email/provider/produção/retentativaautomática.

### CI geral FAILURE, não verde

Own39072426685/job117512606508attempt1COMPLETEFAILURE, ZEROretry.
**1364=[145Web,765mobile,440API,3CLI,11monitor]PASS/fail-skip-cancel0**. Typecheck/build/mobileexport/migrationrunner2x/privacyPASS. HTTPbrowserFAIL/PostSetupNodeSKIPPED/laterProductionTruthNOTexecuted. UnitGREEN+SQLproofGREEN≠CIGREEN.

Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34actual21:50:52.8196851Z. Fail21:51:15.4245332Zcreatedteamrendered: teamPOST201real seguido12GETERR_ABORTED/canceledTRUE/corsnull. UI12unavailable/counts/rates—correta, nãofalsezero. Job/vaga/503/recovery/reload/logout/B/fulljourneyNOTcompleted. NãoECR/startup/novapermissiondenial/causaAPI-CORS-vendorprovada. RootantigoUNRESOLVED. Nenhumflag/imagem/security/driver/Fetchguard/CDP/CORS/sandbox/LNA/deadline/assertalterado. NÃO rerun007 para verde.

### Checkout e capturas próprias

Primarycheckout2026-10-17T21:48:00.6701256Z `e364e571a9d208be2c6ed215d12cfd8847ccd739` SINTÉTICO orderedparents[`3e098cd51cd2fd84f21e144a600a814a2cb1a150`,`007aa7dc20d0f7c58e32aae8ddb77a812afd0fbb`], tree `49f043f544cf0a9bae2299bb686ece458a8293b1` igualcandidata, NÃOHEADliteral. Gitcommit/pais/treeconfirmados. Nenhummerge/pós571existe.

DuasPNGdesktop próprias, independentemente decodificadasPNGsignature/SHA/bytes/dims1365x900PASS, NÃOvisualmenteinspecionadas/nãonativas/nãoGitassets:
- login: 75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc/33686bytes
- failure: 4d25511d5a01f3afb096a28244556f342892651e61005c07d37745797459e6f9/133250bytes
Fonte39072426685attempt1/job117512606508FAIL/HEAD007/checkoute364/tree49f; scratchinvitation-atomicity-local/571-007-own-captures.json. Nãoemprestarframes/PASSanteriores.

### Review integral / APK N/A

ALL11PRpathsremoteUTF8byteexact/modes100755HTTPshell100644rest:9novociclo(CJS/APItest/5originais+matrizappend/evidênciaINVITATION_ACCEPT_UPDATE_ROLLBACK_2026-10-17.md)+2priorinalterados. PrefixosINTEGRAISmain3e e predecessor67e dos5originais+matrizintactos NO LUGAR. Recibo67eFINALconsolidado no apêndicefuncional, preparaçõesPENDINGhistóricas preservadas.
1166outrospriorblobs/modesintactos;492of493existingmainnon-docsforaHTTPshelliguais/READMEinalterado. **249protected inputs** na seleção integral mobile/packages/rootmetadata/deps/lock/workflows/build/smoke sameSHA/mode; canonicalexpo prebuild→GradleassembleReleaseinalterado. NovosfixtureAPItestforaAndroiddependency/import/buildgraph. **APK N/AINTEGRAL**, NÃOausênciaruns/[]/APKemprestado; NENHUMAPK571construído/atribuído. Ahead2behind0mergebasemain3e, parent67e.

9guardmodels locaisPASS(5originais+4novos), incluídos440APIown. Primeira execução diretaNodeTS local falhou por require emESmodule; NativeTSstrip+Function comrequirecontext passou9/9, não produtoRED. CLI CI=0refusedantespg/HTTP/node--checkPASS. Old5testbodiesbyteidentical; HTTPshell571inalterado e todosoldgatesmantidos.
CI/localAPIexplicitport/PGexactmlivretrabalho_http/socketloopbackantesDDL; HTTPPGid/actor/tenant/email/targetUUID/hash/noPriorMembershipbinding. Scopeacceptseparado. HookSECURITYDEFINER sówitnessbounded/search_pathfixo/schemaqualified/EXECUTEPUBLICrevogado; semapp_runtimegrant/CASCADE/ORREPLACE/root/RLSdisable/prod. Cleanupownership/nomesrevalidados/flags/falhasticky.

### Fecho / próxima frente independente

Entrega REAL:4novosguardtests+provaSQLHTTPde500/rollback/conviteativo/201explícito/replay400;9arquivosnociclo/commit007/semnovaPRduplicada. Áreas4/7/11 maispróximas doaceite, nenhumafechada; apenas10AndroidstandaloneTÉCNICAINTERNOaceita/12pendentes. CIred impedeintegração; manterDRAFT.

Apósbloqueio passou-se à auditoriaREADONLY independente da área6ledgerSIMULADO: WorkAssignmentsController.complete alteraassignment/completed_at e insereearnings_ledger na MESMAtransaction. Testeslifecycle/work-assignments-input cobremfiltros/ACK/SQL/errogenérico; HTTPfinance cobreHMAC/replay/recipient/totais, não demonstrafalhaSQLtardiaINSERTledger comstatusvisible. Migrations0007/0044/0065exigemRLS/noDELETEruntime/FKassignmenttenant. Próximaprovapequena possível: erroLOCALescopadoAFTERINSERTledgercomwitnesscompleted+ledger/snapshots2tenants/HTTP500 eUMAconclusãoexplícita+ledgerúnico. SOMENTElacunaidentificada, NÃOimplementado/provado/defeitofinanceiro/provider. Revalidarfreshcontratos/testesantesdeagir, semseedpapel/grant/policy/dinheiroreal.

#572infraregistry separadoDRAFTCIred,nãointegrado/copiadona571; #568/#570/#565/#560/#558preservados/ext215219220224228OPEN. SemmanualActivitywrites/commitatividade/produção/serviços/custos/credenciais/providers/PSP/contratos/dinheiroreal. GitprepPENDINGéHISTÓRIA; consolidar esteFINALsóPRÓXIMOCICLOFUNCIONAL, semautorefmetadata/image/statuscommit.


---
## Recibos e preparação anteriores (HISTÓRIA, não resultado do HEAD007)

## FINAL own evidence — DRAFT / NOTMERGED — 2026-10-17 UTC

HEAD `67e3b8fc389162a186c4899d4c0b117a906c2d42`, tree `c431b86c2e9876a788b74745348801bcdccd9020`, ordered parent/base main`3e098cd51cd2fd84f21e144a600a814a2cb1a150`. Prova nova de atomicidade, NÃO correção de defeito presumido no produto. Sem ready/merge/post571/rerun/cancel. Não emprestar qualquer PASS568/570/567.

### Resultado próprio: CI FAILURE; 1360 unidades PASS
[CI39068354509/job117500598324](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39068354509/job/117500598324), attempt1 COMPLETEFAILURE, ZEROretry.
1360=[145Web,765mobile,436API,3CLI,11monitor]PASS/fail-skip-cancel0; types/build/mobileexport/migrationrunner2x/privacyPASS. HTTP/browserFAIL, PostSetupNodeSKIPPED/laterProductionTruthNOTexecuted. UnitPASS não é CIGREEN.

### Prova nova REAL HTTP/PostgreSQL, independente do navegador
**INVITATION_INSERT_ROLLBACK_PASS20:52:28.3424395Z**: HTTP500 real, witness AFTERINSERT exigiu ver simultaneamente antigo convite revogado e novo convite inserido dentro da transação. Sequência própria não transacional avançou exatamente1 antes da exceção. Após resposta500, snapshots completos de invitations/memberships dos DOIS tenants eram exatamente os anteriores; policies/ACL/RLS intactos. Convite antigo continuou ativo, sem aceitação ou revogação indevida. Não é estado simulado de banco.

**INVITATION_ATOMICITY_HTTP_PG_PASS20:52:28.3603093Z**: após cleanup do hook próprio, UMA solicitação explícita de recuperação retornou201, criou exatamenteumconvite e revogou anterior. Código antigo400, novo201aceito; membershipmanager real única, registros anteriores e tenant estrangeiro intactos. Sequência/função/trigger próprios removidos e ausência consultada; nenhum histórico de aplicação apagado. Não é retry automático/outbox/provider/emailentregue/nativeUI/produção.

Ligação requisito→código→estado→teste→CI: CompanyMembersController.invite + DatabaseService.tenant BEGIN/SETLOCALapp_runtime/tenant/COMMIT/catchROLLBACK → anteriorativo/renovação500/snapshotidêntico/recuperação201/aceitação → scripts/invitation-atomicity-e2e.cjs → dois markers primários acima. API e DatabaseService NÃO mudaram. Testes prévios de concorrência só provavam renovações bem-sucedidas; esta entrega fecha uma lacuna de observação do erro SQL, sem afirmar defeito transacional existente ou aceite integral.

### Bloqueio geral de navegador
Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34 real20:53:04.2812605Z.
FAIL20:53:25.1342704Z created-team-rendered: teamPOST201 observado, seguido12GETnetERR_ABORTED/canceledTRUE/corsErrorNULL. UI12unavailable/—, não falsozero. Criação/render de vaga, 503/recovery/reload/logout/B/fulljourney NÃO concluídos nesta execução. Não é startup/ECR, não causa API/CORS/vendor provada. Nenhuma flag/imagem/prazo/Fetchguard/CDP/CORS/sandbox/LNA/assertiva reduzida. Não repetir mesmoSHA para verde.

Duas capturas desktop do próprio job (não Android), independentlydecodedPNGsignature/SHA/bytes1365x900/PillowverifyPASS; não inspecionadas visualmente nesta rodada e NÃO publicadas como novo asset Git:
- login 75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc / 33686bytes
- failure 178df4a248a9756ef86c81af4e35ef1150574322413c5b095f3b8d807f46b11d / 133442bytes
Scratchinvitation-atomicity-local/571-own-captures.json; fonte run39068354509attempt1/job117500598324FAIL/HEAD67e3/checkoutcec5/treec431. Não usar como prova de UI nativa ou prova visual aprovada.

### Checkout, review, APK applicability
Primarycheckout20:50:06.9014017Z `cec5e3e46cebfa29e8dcc9e6f56531c87aacb7b6` SYNTHETIC orderedparents[`3e098cd51cd2fd84f21e144a600a814a2cb1a150`,`67e3b8fc389162a186c4899d4c0b117a906c2d42`], treec431b86c2e9876a788b74745348801bcdccd9020 exactlycandidate, NOTliteralHEAD. Gitcommit/parents/tree reread.

ALL10remoteUTF8filesbyteEXACT, modes100755HTTPshell+100644rest; full5originaldocs+matrixmainprefix preserved INPLACE byappend.492of493existingmainnon-docblobs outsideHTTPshell unchanged. All246protected mobile/sharedpackages/rootdeps/lock/workflows/build/smoke inputs sameSHA/mode; all other oldblobs unchanged, no deletion. CanonicalAPKentry remains pnpm --filter @mlivretrabalho/mobile expo prebuild→apps/mobile/android Gradle assembleRelease. NewAPItest and localCJSfixture are outside that dependency/import/build graph; existingrootworkspace and allmodules unchanged. **APK N/A por identidade integral dos insumos/grafo**, NÃO por ausência de runs/[]/APK emprestado. Nenhum APK foi construído ou atribuído a571. Ahead1behind0/mergebasemain3e.

Cinco guardmodels novos executam funções reais de scope/binding/cleanup: local5PASS e incluídos436API emCI, não SQL/HTTP. Probe CLI CI=0 saiu1 com CI disposable fixture only antes de pg/HTTP. Segurança fixture: CI/localexplicitports/exactDB/socketloopback; UUID/email/HTTPPGbindingantesDDL; SECURITYDEFINER SOMENTE witness limitado, search_pathfixo/objetoqualificado/EXECUTEPUBLICrevogado; sem grant/RLS/policy/runtimealterados, nunca productiontrigger/migração. Ownershipflags impedem cleanup de objetos preexistentes/forjados e falha permanece sticky.

### Fecho e próxima frente
Alterados fixtureCJS,5guardtestsAPI,UMAinvocaçãoHTTPshell, cincooriginais+matrizappend, evidência INVITATION_RENEWAL_INSERT_ROLLBACK_2026-10-17.md. Áreas4/7/11: nova prova de rollback e recuperação observada; integração e aceite integral continuam pendentes pelo CIfalhado. Sóárea10técnica interna aceita, outras12pendentes; externos215219220224228separados. Semprodução/custos/serviços/credenciais/provider/contratos/PSP/dinheiroreal.

Conforme anti-estagnação, passou-se imediatamente a outra operação: auditoria READONLY do consumo de convite em CompanyMembersController.accept. Escreve membership INSERT/upgrade e depois accepted_at; testes atuais cobrem entradas/auth/ACK e propagação genérica de erro, não uma falha SQL tardia com rollback real da membership. Próxima entrega delimitada: fixture LOCAL/guardada de falha no UPDATE accepted_at após INSERTmembership, provar rollback integral e código ainda utilizável, sem novo papel por seed/grant/policy e sem repetir571/browser. É lacuna identificada, NÃO bug/rollback provado ainda. Nenhum patch extra ou teste dessa futura operação foi alegado.

Preparações PENDING abaixo são história; resultado final é este recibo e logs próprios. Consolidar o final em novo ciclo funcional por apêndice, sem commit autorreferente/artificial de status. Continuar trabalho autorizado; não desligar rotina por bloqueio parcial.

---

## Preparação histórica deste ciclo — anterior à execução própria
Prova independente da atomicidade de renovação de convite: falha AFTER INSERT deve desfazer tanto o novo convite quanto a revogação anterior. Não é correção de defeito transacional presumido. Fixtures HTTP/PG locais guardadas, witness não transacional antes de erro500, snapshots de dois tenants/policies/ACL e cleanup de objetos próprios. Recuperação explícita201/código antigo400/novoaceito201/membershipmanager única requerida. Nenhum app/controller/SQL/migração/grant/runtime alterado.

HEAD 67e3b8fc389162a186c4899d4c0b117a906c2d42 / tree c431b86c2e9876a788b74745348801bcdccd9020 / parent main3e098cd51cd2fd84f21e144a600a814a2cb1a150. 5guardmodelsPASS local; CI esperado1360=[145Web,765mobile,436API,3CLI,11monitor] PENDENTE. Markers SQL/HTTP aindaNÃOEXECUTADOS, não PASS. Todos gates antigos incluindobrowser mantidos; sem CORS/Fetchguard/CDP/sandbox/deadline relaxados. APK N/A requer conferência integral de inputs, não ausência de run.

Cinco originais+matriz preservados por apêndice, evidência docs/evidencias/INVITATION_RENEWAL_INSERT_ROLLBACK_2026-10-17.md. DRAFT até ownCIcompletoSUCCESS+revisãofresh/expectedSHA, pósrealobrigatório. Bloqueios568/570datas e browser independentes sem rerun cego. Sóárea10técnica aceita;12pendentes. Semprodução/provider/PSP/serviços/custos/dinheiroreal.


---

## Entrega funcional — atomicidade da renovação de convites — 2026-10-17

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Base main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. Originais completos mantidos NO LUGAR como prefixos integrais. Área4equipes/convites, área7RLS/tenant e área11API ficam mais próximas do aceite; nenhuma área é declarada concluída.

Lacuna comprovada por leitura dos testes existentes: http-company-invitation-concurrency-e2e.sh comprova serialização de duas renovações bem-sucedidas e aceitação de apenas um código; http-company-members-e2e.sh cobre papéis/criação/aceitação/revogação. Nenhum injeta falha SQL no INSERT posterior à revogação do convite anterior. Controller.invite executa ambas as escritas dentro de DatabaseService.tenant BEGIN/SET LOCAL app_runtime/tenant/COMMIT/catchROLLBACK. Não foi reproduzido defeito no produto; a entrega é prova adicional do contrato transacional, sem alterar controller/SQL/runtime.

Novo scripts/invitation-atomicity-e2e.cjs: guarda CI+APIlocalhostHTTPporta explícita+PGlocalhostporta/DBEXATOmlivretrabalho_http; carrega pg somente após guarda e exige socket REALloopback antes de criar fixtures/DDL. Identidades/duasempresas/profissional/convites são criados por HTTP real, IDs/tenant/ator/email/role/expiry/tokenhash vinculados ao PG antes do hook. Nenhuma credencial/código de convite é logado, nenhuma requisição externa/prod/provider.

Uma sequência e função/trigger AFTER INSERT com nomes derivados de UUID próprio são criados APENAS no banco descartável. Função SECURITYDEFINER com search_path fixo/tabela+sequência qualificadas/EXECUTE PUBLIC revogado limita-se ao tenant/email/ator próprios. Exige ver os dois fatos dentro da transação (convite anterior revogado + novo inserido) antes de avançar sequência não transacional e levantar erro controlado. HTTP deve retornar500, witness deve ser1, snapshots integrais das invitations/memberships dos dois tenants devem ser exatamente iguais aos anteriores, RLS/policies/ACL intactos.

Cleanup remove SOMENTE objetos criados com flags próprias, em ordem trigger/function/sequence, não sobrescreve objetos existentes nem usa CASCADE. Guardas contra nomes forjados e cleanup parcial com falha têm teste real. Depois, uma solicitação explícita de recuperação201 deve criar exatamenteumconvite e revogar anterior; código antigo400/novo201aceito e exatamenteuma membershipmanager nova, demaisregistros/tenantestrangeiro intactos. Não é retry automático de negócio, outbox, email entregue ou prova Android/produção. Markers INVITATION_INSERT_ROLLBACK_PASS e INVITATION_ATOMICITY_HTTP_PG_PASS só serão aceitos por logs novos; nesta preparação PENDENTES.

Cinco guardmodels novos em apps/api/src/invitation-atomicity.test.ts PASS5/5 local via NativeTSstrip e funções reais, sem pg/HTTP local. Cobrem IDs/email do escopo, vinculação do registro, recusa de cleanup não próprio/forjado, ordem/flags e drenagem após falha. Não são prova SQL/HTTP. CI esperado1360=[145Web,765mobile,436API,3CLI,11monitor], ainda PENDENTE. Uma invocação foi adicionada antes do navegador no HTTPjourney; TODOS asserts/gates antigos/navegador/CORS/Fetchguard/CDP/sandbox/LNA/deadlines preservados. Nenhum app/controller/migração/dependência/lock/workflow/build/smoke/native alterado. APK N/A somente após revisão integral da árvore de insumos nativos; não por ausência de run ou APK emprestado.

Revalidação inicial: #568b7ef e #5702205 são DRAFT e CIbrowserFAIL/APKSUCCESS, sem merge/retry cego nesta rodada; os snapshots PENDING dos corpos não são PASS. Não duplicar reparo de datas já abrangido nesses PRs. #558/#560/#565 mantêm bloqueios independentes. Apenas área10Androidstandalone TÉCNICO interno aceita, demais12pendentes; externos215/219/220/224/228abertos. Sem produção/serviços/custos/providers/PSP/credenciais/contratos/dinheiroreal. Nenhum commit artificial/alerta manual.

Fecho desta preparação: código fixture+guardtests/documentação/evidência acima preparados, 5modelsPASS, execuçãoCI/HTTPPG/revisão/merge/pós-gates PENDENTES. Próximo passo: conferir bytes/modes/ancestrais e log primário próprio; manter DRAFT se qualquer gate falhar e avançar em item independente em vez de rerun de falha de produto. Recibo final será vinculado ao PR e consolidado em novo ciclo funcional sem commit autorreferente de status.

