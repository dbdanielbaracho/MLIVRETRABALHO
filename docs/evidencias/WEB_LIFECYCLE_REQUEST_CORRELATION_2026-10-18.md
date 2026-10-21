# CDP lifecycle/request correlation — functional diagnostic preparation — 2026-10-18

Exclusive repository: dbdanielbaracho/MLIVRETRABALHO. Extends existing draft #558, not a duplicate PR and not a product fix. Fresh main3e098cd51cd2fd84f21e144a600a814a2cb1a150/tree66f89c3ef2902dad6d1d59e0210be7229c3a857c. Old5588793af936a72f260af60894740145c720a5ba649 stays historical FAILURE, no blind retry.

## Specific evidence gap and falsifiable hypothesis

Existing probe records native fetch rejection, API request IDs, loader IDs and main-document navigation separately. It does not record context destruction/clear, frame detach/loading or CDP lifecycle metadata in one ordered sanitized stream. New question: during a failed twelve-request wave, do the SAME requests' frame/loader IDs have an observed document/context lifecycle transition before their loadingFailed events? A matching transition is temporal evidence only, NOT proof it caused cancellation. Missing events, clock differences, collection limits or worker-empty loader IDs must not become a root-cause/absence verdict. A wave failing without a matching recorded transition weakens that narrow observed-transition hypothesis; it does not prove a vendor, CORS, API or React bug.

Main api() source invokes fetch(url,{headers,cache:'no-store'}) without a signal. Local four actual-source callback models in the preceding cycle passed; source/component had no explicit AbortController/abort/signal option. This is not actual browser evidence and excludes neither framework/engine/network/lifecycle cancellation nor code outside that source. Prior558 minimal HTTP/no-app-script failures already prevent attributing this solely to React. Serial continuation ACK was already disproven as a remedy. No permission/security conclusion is inferred.

## Implementation

New scripts/web-browser-lifecycle-trace.cjs accepts only current target-session events. Network.requestWillBeSent binds requestId→frameId/loaderId; loadingFailed/Finished reuses then removes that exact binding. Page.frameNavigated/Detached/StartedLoading/StoppedLoading/lifecycleEvent and Runtime.executionContextCreated/Destroyed/Cleared retain explicit safe IDs only. Numeric context-ID reuse with conflicting unique IDs cannot attach old destruction to the new context. Request/frame/context fields remain nullable/unknown when absent; worker loaderId empty string preserved.

Each observed event gets an explicit received sequence and host epoch milliseconds. Browser monotonic seconds and browser epoch seconds are separate fields, never sorted or subtracted across domains. Buffer4096/request1024/context256 bounds disclose dropped/evicted counts, not false completeness. Snapshots copy rows. Allowlist excludes URLs/origins/querystrings/headers/body/stack/user email/token; unknown lifecycle/error text redacted. Module sends NO CDP/HTTP command and reads no application storage.

Existing probe adds only require+collector creation, one observer call, Page.setLifecycleEventsEnabled({enabled:true}) and one final metadata report WEB_BROWSER_LIFECYCLE_DIAGNOSTIC even on failure. Lifecycle observation is common to the diagnostic cases; baseline/native-only/log-only/instrumented still distinguish the ORIGINAL native/log observers, not a claim of zero CDP observation. No continue/fail/guard/CDP/deadline/Chrome flag/permission/CORS/LNA/sandbox changes. All old requests, bodies, assertions, loopback document guards, five refresh/five reload cases, twelve control cases, current-main503/recovery journey and sticky shell exit1 remain. Removing exactly the additions reconstructs the old probe byte-for-byte. Main Web/API/mobile product remains unchanged relative fresh main; main is incorporated by a normal ordered-parent integration, never force/reset.

## Primary protocol contract checked

ChromeDevTools/devtools-protocol immutable reference a07da3c859be8526571a69be9c1f3c6e91cc0a26, read2026-10-18:

- https://github.com/ChromeDevTools/devtools-protocol/blob/a07da3c859be8526571a69be9c1f3c6e91cc0a26/pdl/domains/Page.pdl — lifecycle event frame/loader/name/MonotonicTime; observation-enable command; frame detach remove/swap.
- https://github.com/ChromeDevTools/devtools-protocol/blob/a07da3c859be8526571a69be9c1f3c6e91cc0a26/pdl/domains/Network.pdl — request frame optional/loader empty for workers; request monotonic+wall clocks; loadingFailed canceled optional and terminal request ID.
- https://github.com/ChromeDevTools/devtools-protocol/blob/a07da3c859be8526571a69be9c1f3c6e91cc0a26/json/js_protocol.json — context created/destroyed/cleared; numeric deprecated/unique experimental IDs.

This is a current schema contract, NOT proof of the exact installed Chrome schema/revision. No unsupported-command result is ignored. Real execution must emit actual Browser.getVersion and own trace; no old revision or result borrowed.

## Local proof and limitations

Eight new tests execute the actual collector and probe integration. Seven collector tests passed before wiring; the integration assertion failed once because the old probe lacked wiring (coverage gap, NOT application defect). After wiring8/8PASS, zero fail/skip/cancel. All25old browser helper/shell controls, unchanged assertions, PASS with the candidate; total33focalPASS. node--check PASS for module/probe. Local Node24.19.0, explicit CDP-shaped fixtures, NOT Chrome/CDP execution, actual HTTP/PG, native UI, SecureStore, process restart, physical Android or production.

No local Chrome binary was available in the prior checked PATH. New own full CI required; any pending/skipped stage is NOT PASS. APK N/A only if integral protected native/dependency/workflow/build/smoke graph comparison to main succeeds. No APK for this diagnostic may be borrowed. Keep draft even an isolated green until justified root resolution and complete gates; no ready/merge in this preparation.

## Normative history and prior final receipts

Six original558 documents remain full prefixes IN PLACE; latest57185 divergent normative tails are appended after their shared line prefix, without summarization. Shared prefix+imported suffix exactly reconstruct latest571 originals; all old558 content remains. Imported historical evidence assets retain their own provenance and are NOT current diagnostic frames. Product changes from other unmerged drafts are NOT copied. Full final57185 receipt and full previous558 body are appended below mechanically; historical PENDING and old results do not become current CI evidence.

## Acceptance / next action

Areas1/2/13: required Web journey→passive request/lifecycle state→8new+25old focal models→own fullCI/realChrome trace PENDING→exact receipt. This advances diagnostic observability only; root still UNRESOLVED. No area closure. Area10 only TECHNICAL INTERNAL accepted; other12 pending, not percent implemented. External215219220224228 remain open. Preserve professional Início/Trabalhos/Ganhos/Perfil and company Início/Trabalhos/Equipe/Conta. No new providers/contracts/services/paiddeploy/credentials/production/PSP/realmoney or automation.

If own CI is blocked by quota/browser, preserve primary log and move immediately to an independent actual acceptance gap. Do not rerun same SHA for green, change registry/workflow to bypass, or claim source-only/fixture data as Chrome proof. Record real final outcome in PR body; consolidate only next functional Git cycle, not a status/activity-only commit.


## Historical complete receipt — PR57185 (not current558 result)

# FINAL factual — promoção preparada, infraestrutura impediu prova PostgreSQL — 2026-10-18 UTC

PR571 DRAFT/NOTMERGED. HEAD `85e9c992b6e7a1568b8ea865e43da63477c5f3a0`, tree `ca88187efb97fbf1f9312ec6494b136a88e57b43`, parent `007aa7dc20d0f7c58e32aae8ddb77a812afd0fbb`, branch test/invitation-insert-rollback-20261017. MAIN/base `3e098cd51cd2fd84f21e144a600a814a2cb1a150`, tree66f89c3ef2902dad6d1d59e0210be7229c3a857c/pais[f98b5f618c5b78772c360b93d17e6028f0021008,3a66a7108cfadf52d8bb50b9bdb903f29c06fa8d]. Ahead3behind0/mergebase3e. Nenhumready/merge/pós571/rerun/cancel/PRduplicado.

## CI próprio: não executou produto

[Run39091663600](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39091663600)/[job117569533700](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39091663600/job/117569533700), attempt1 COMPLETEFAILURE, **ZEROretry**.
Pull public.ecr.aws/docker/library/postgres:17 → `toomanyrequests: Data limit exceeded` primários02:53:19.2135623Z/02:53:25.8915359Z/02:53:29.4210800Z; Dockerpullfailed02:53:29.4290824Z. São3tentativas internas doDocker, NÃO rerun doagente.
InitializecontainersFAIL; Checkout/Node/install/typecheck/build/mobileexport/tests/migrations/privacy/HTTPPG/browser/ProductionTruth **TODOSSKIPPED**.
**NenhumcheckoutACTUAL foi observado**; não atribuir execução a HEADliteral ou syntheticmergeref. NenhumChrome/DOM/PNG/HTTPPG/INVITATION_*PASS novo observado nesteHEAD. **1368=[145Web,765mobile,444API,3CLI,11monitor] SÓESPERADO**, nãoCIcount/PASS. Os dois markersPROMOTION e também os casos antigos NÃOexecutados neste run.
Não retry desteSHA: quota primária já persistia em573, embora575tenha iniciado semmudança; semworkflow/registro/credencial/serviço/custo/bypass para verde. Browserroot antigo não foi observado aqui. Não emprestar007/575/567PASS/frames.

## Entrega real / teste local

CJSexisting571 ganhou caso de promoção EXISTENTEmanager→owner APÓS todosoldcalls/asserts/markers. Targetmanager estabelecido porHTTP na faseanterior; ownerAemite conviteownerporHTTP. UUIDscopephasepromote/priorRoleEXATOmanager/namespaceinv_promote. Binding antesDDL liga convite/id/tenant/ator/email/roleowner/hash/ativo eUMA membershipmanager/subject/identitytenant exatos. HookownedAFTERUPDATEaccepted_at precisa verUMowner+UMconviteaceito na transação antessequence1eHTTP500; snapshotsCOMPLETOS2tabelas2tenants+ACLpoliciesRLSdevemrestaurarmanager/conviteativo. Cleanup eUMAaçãoexplícitaMESMOcódigo201→SÓrole+acceptedpair/semnovamembership;replay400semnovadelta/oldrowsBintactos/hookausente. Tudo isso é PROVAEXIGIDA, ainda **NÃOEXECUTADA em PG**.

4guardmodelsnovos reais(scope/binding/SQLboundedwitness/cleanupnames+flags),9oldbodiesbyteexatos excetoimport→**13PASSlocal/zeroFAILSKIPCANCEL**, NativeTSstrip+Function; node--checkPASS eCLI CI=0 recusouantespgHTTP. NãoProdutoREDinventado, nãoSQLproof. Controller/DatabaseService/prodSQL/auth/roles/migrações/grants/policies intactos. ExistingUPDATEgrantmigrations0001/0004/0039/0047lidos, nenhumaampliaçãodeautoridade/seedrole/root/RLSdisable/CASCADE/ORREPLACE/historydelete. SOMENTEmanager→owner; adminPGpath NÃOcoberto.

Reverse-substitution reconstruiu TODOsourceparent007 BYTEEXATO fora extensão, incluindowhitespacefinal. OldHTTPshell e todosoldcalls/asserts/deadlines/browser/CDP/Fetchguard/CORS/sandbox/LNA/flags/images preservados. Falfutura éexit1sticky,semremovergate/auto businessretry. Semprodução/provider/PSP/dinheiroreal.

## Revisão / APK / documentos

22PRpaths ALLremoteUTF8oubase64normalized BYTEEXATOS, HTTPshell100755/rest100644.19newcyclechanges(8modified11new);1167of1175parentblobs+modesidênticos.1164of1171existingmainblobsiguais/493of494existingnon-docsforaHTTPshelliguais.249protectedmobile/packages/rootdeps/lock/workflows/build/smoke sameSHA/mode+freshcanonicalexpo-mobileprebuild→Gradlegraphunchanged→**APK N/AINTEGRAL**, não[]/ausênciaruns/APK575emprestado. NenhumAPK571construídoatribuído.

Fullmain+571+573+574+575prefix5originais/matriz preservados NO LUGAR porapêndice.6notashistóricas sameblobs (duas jáparent+quatronovas), SEMDatabaseService575/códigosoutrosdrafts. NovaINVITATION_OWNER_PROMOTION_ROLLBACK_2026-10-18.md preserva integralrecibo575FINAL12344 e571007FINAL19179, não apenasresumos. PreparaçãoGitPENDING éHISTÓRIA; esteFINAL seráconsolidado SÓpróximo cicloFUNCIONAL,semmetadataautoref/status/image/activityGitcommit.

5OWN575desktopPNGs+PR575_OWN_PROMOTION_CYCLE_PROVENANCE.json agoraGit desta branch em docs/evidencias/web-browser-2026-10-18/pr575-own-*.png. FonteHEAD89f799914fdcadaa75f7569b78c8483953829295/treed9ca8e85f8f2410474c18c73d85e99adbec66b72/actualcheckoutd3447a773881d73bf358476b2235882d789bcde8SINTÉTICO[main3e,89f799]/run39090990507job117567517336attempt1FAIL. Logs575reobtidosneste ciclo; normalizedbase64readbackremotoexato +PNGsignatureSHAbytes1365x900/Pillowverifynociclofonte. NÃOvisualinspected/NÃO571frames/NÃOAndroid/physical/native/fullaceite. Proveniência individualtimestampSHAbyteslabels noJSON. Semimage-onlycommit.

## Avanço independente após o bloqueio

Não é rodada apenasstatus: fixture nova+4novosPASSlocais+19pathsmodificados/commit85publicados, masPGacceptancependente. DepoisinfraFAIL avançouLOCAL para hipóteseespecífica dos12GETERR_ABORTED:
- Source mainapps/web/app/page.tsx REALapi helper recuperado: fetch(url,{headers,cache:'no-store'}) não recebe signal; componente tem0AbortController/0.abort/0signaloption. Seu prazo de leitura altera estado/current/ignorarespostastardias; não chamaabort.
-4testesLOCAL dafunçãoapiREAL viaNativeTSstrip/Function+callbacks explícitos PASS: formatoGET/headers/cache semsignal;12calls semsignal/retry;HTTP503 rejeitaapós1requestsemJSONfalso;rejeiçãonativa propagadasemretry. Headersfixtureexplícitos, nãoauthreal/HTTP/Chrome/segurançaextra. NÃOparte13/444CI/NÃOpublicados.
- Probe558879lido: jáobservaresposta/rejeiçãonativefetch, NetworkExtraInfo/clientSecurityState econtinue-session/response/errors; isso nãoidentificacausa. BrowserChrome/Chromiumnãoencontrado nos4nomesPATHlocal; nãoalegarprovaBrowsernova.
- **Conclusãolimitada**: hipótese de AbortController explícito destehelper/componente causando12cancelamentos não tem suporte nessa fonte. NÃOexclui browser/framework/frame lifecycle/rede/navegador; nenhumroot/fixprovado. Não alterarFetchguard/CDP/CORS/sandbox/LNA/deadlines/images/flagsporhipótese.
ArquivosLOCALinvitation-promotion-local/next-audit/{web-page.tsx,web-api-request-shape.test.cjs}. Próximo diagnóstico seguro possível: lercontratosCDPprimários antes de estender558 EXISTENTE com somenteobservaçãoordenada/lifecycle/frame-loader/networkid+timestamps, semheaders/tokens/body/relaxamento; distinguircancelamentode contexto de sinalJS em cenáriosjáguardados. Ainda NÃOimplementado/executado/causaprovada; não criarPRduplicado/nãorerun879ou85sóverde.

Main3einalterada.57589f799DRAFT own1379unitPASS/typesetcPASS/browserFAIL pósrecovery/reload,rootUNRESOLVED;DBfix575NÃOintegrado/copiadocurrente.573dfb2infraantescheckout;574/572/570/568/565/560/558separados. Externals215219220224228OPEN. Só10TÉCNICAINTERNAaceita12pendentes,não%decódigo. NenhumActivitymanualwrite/produção/serviço/custo/credencial/provider/PSP/contrato/dinheiroreal/novaautomação. Manterrutinaúnicaenabled/scheduleinalterados,semparcial/transientedisable.

---

## Preparação e recibo anterior integral (HISTÓRIA, NÃO PASS desteHEAD)

# Atualização funcional — rollback de promoção manager→owner — 2026-10-18 UTC

DRAFT/NOTMERGED. NovoHEAD `85e9c992b6e7a1568b8ea865e43da63477c5f3a0`, tree `ca88187efb97fbf1f9312ec6494b136a88e57b43`, parent `007aa7dc20d0f7c58e32aae8ddb77a812afd0fbb`, baseMAIN`3e098cd51cd2fd84f21e144a600a814a2cb1a150`.

Depois de TODOS os casos antigos intactos, novo caso cria ownerinvitation por ownerHTTP real para manager já criado por aceiteHTTP. HookownedAFTERUPDATEaccepted_at deve ver membershipowner+conviteaceito na transação, sequence1+HTTP500; snapshots integrais2tenants devem preservar manager/conviteativo. Cleanup→UMAaçãoexplícita MESMOcódigo201 alteraSÓrole+acceptedpair/replay400semnovamembership. Não seedrole/newgrant/RLSdisable/produtofix inventado. SOMENTEmanager→owner, nãoadminPGproof.

4guardmodelsnovos+9oldbyteidênticos=13PASSlocal/zeroFAILSKIPCANCEL;syntaxPASS/CLI CI=0refusedantespgHTTP. Reverse-substitution sourceparent integral BYTEEXATO fora extensão, TODOSoldHTTPcalls/asserts/browsergates preservados. NovoHTTPPGreal/CI **PENDENTES**, markersINVITATION_PROMOTION_UPDATE_ROLLBACK_PASS/INVITATION_PROMOTION_ATOMICITY_HTTP_PG_PASS nãoPASSemprestado. Esperado1368=[145Web,765mobile,444API,3CLI,11monitor], não resultado.

22PRpathsALLremoteUTF8/base64normalizedbyteexact/modesHTTPshell100755rest100644;19newcyclechanges(8modified11new)/1167otherparentblobs+modesiguais.1164of1171existingmainblobs/493of494mainnon-docsforaHTTPshellsame.249protectedinputs+freshcanonicalAPKgraphsame→APKN/AINTEGRAL/nenhumAPK571atribuído. Fullmain+571+573+574+575prefixoriginais/matrizpreservadosNO LUGAR. 6notashistóricassameblobsSEMDBservice575/códigooutrosdrafts.5OWN575desktopPNGs+manifestagoraGitcomfonte89f799/d344/treed9ca/run39090990507job117567517336attempt1FAIL;NÃOframes571/nativo/VisualTruth/PASS.

Recibosintegrais575FINAL12344chars/571007FINAL19179chars preservados na nova evidência INVITATION_OWNER_PROMOTION_ROLLBACK_2026-10-18.md. MergeONLYfullCIownSUCCESS/reviewfreshHEAD/expectedSHA+pósreal,nenhumready/merge/retrycego. Apenas10TÉCNICAINTERNAaceita12pendentes. Semprod/PSP/serviços/custos/credenciais/grants/root/securityweakening/Activitymanualwrites.

---

## Recibo anterior integral571007 — HISTÓRIA, não resultado do novoHEAD

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




## Historical complete previous PR558 body — 879 (not candidate result)

## FINAL CURRENT — 2026-10-16 UTC — FAILURE, DRAFT, NO MERGE

HEAD8793af936a72f260af60894740145c720a5ba649/tree1c8cfe6b579629829f73ba71ef91553993a63ca3. OwnCI [38842653055](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38842653055), job116786029336, attempt1 COMPLETE **FAILURE**, ZERO retries. 1347unit=[170Web,753mobile,410API,3CLI,11monitor], fail/skipped/cancelled0. Typecheck/build/mobileexport/migrationrunner2x/privacyPASS; HTTP/browserFAIL; PostSetupNodeSKIPPED, laterProductionTruthNOTexecuted. UnitGREEN is NOT CIGREEN.

Checkout21083f147c2a5a460c6ce783ae8b06263088b9ab at02:52:55.3274781Z is SYNTHETIC orderedparents[429dcba6287e95ca4e804d9452a2e7c0b21fedd8,8793af936a72f260af60894740145c720a5ba649], tree1c8c...equalcandidate, NOTliteralHEAD. Normal branch integration parents[48a123aa5abac436c9ed26d148b725e30db79f74,429dc...]; main unchanged429dc, no merge/post558.

### Actual controlled cases — no retries or pass borrowing

| Case | Concurrent ACK | Serial ACK |
|---|---|---|
| Minimal baseline | PASS27JSON+realpersist | PASS27JSON+realpersist |
| Minimal log-only | PASS27JSON+realpersist | FAIL12GETERR_ABORTED, parallel-before |
| Minimal native-only | PASS27JSON+realpersist | FAIL12GETERR_ABORTED, parallel-before |
| Minimal instrumented | PASS27JSON+realpersist | PASS27JSON+realpersist |

All8minimal documents realHTTP200loopback/noSW/cache/scripts0/securecontext, API/PGreal. Serial failures02:55:45.745Z/02:55:47.477Z: initialGET200 then12GETERR_ABORTED/canceledtrue/noCORSerror. Each also recorded3OPTIONS continuation errors code-32602/sessionmatchestrue. Firstprotocolerror preceded firstloadingFailed in receivedlog-onlyeventarray but followed firstloadingFailed in native-onlyarray: NOT enough to infer causality. No redirect event observed in any failedcontrol. Serial ACK scheduling did NOT eliminate cancellation; not a fix, not a production/API/CORS/vendor/rootcause claim.

Four existing concurrent UI controls ALLFAIL: baseline explicitrefresh1; log-only explicitrefresh3 after2PASS; native-only reload4 after5refresh+3newdocreloadPASS; instrumented createdteamrender afterteamPOST201. Each12GETERR_ABORTED/canceledtrue, zero continuation errors/sessionmismatch/observedredirect. No completejourney/logout/BPASS borrowed.

Additional unchanged MAIN driver: login401+realteam/jobpersist/renderPASS; one actualteamsGET503 consumed plus11distinct realGET200 and partialDOM teams—/othercountsreal, captured02:57:20Z. Humanrefresh recovery then12GETERR_ABORTED/canceledtrue/corsnull, timeoutloaded-dashboard02:57:40.7588881Z. Recovery/reload/logout/B NOTcomplete; no WEB_SECTION_AVAILABILITY_BROWSER_PASS. This is partial observed coverage, NOT full journeyPASS.

Total12controls=6PASS6FAIL, plus mainFAIL =>13cases6PASS7FAIL, stickyexit1. ALL13actualbrowsers Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision3ff7ac5a9224be9156d7f8703a06e22890aafd34; zero startup failures thisrun, no inference originalstartupfixed. No security/CORS/Fetchguard/permissions/deadline/browserflag/app/API/SQL changes.

### Review and captures

52PRpaths/17neworupdatedfiles allremoteUTF8/base64bytesexact;35previousassetblobs reused unchanged. Sixdocprefixes558 fullypreserved; main historydelta appended whole fromcommondd715, not lossyreplacement. 1128priorbranchblobs outsidefunctional/mainintegrationpaths identical;486existingmainnon-docblobs outsidewrapper identical. Currentmain page AND mainbrowserdriverBYTE-IDÊNTICOS. ProtectedAndroidinputs/canonicalexpo-mobileprebuild+Gradle graph identical =>APKN/Aintegral, not absent run/borrowedAPK. Ahead12behind0/mergebasemain429dc.

17owncapturePNGsignature/SHA256/bytes/dims1365x900 independentlyverified; actualmainpartial+failure visuallyinspected. Sourcejob116786029336, sameHEAD/checkouts above, overallFAILURE, eachscenario/observer/continuation keptdistinct. These newframes remainprimaryCIlogs/scratchtransport-local/879-own-captures.json; persist in nextFUNCTIONALcycle withprovenance, NOimage-onlymetadataautocommit. Olderpost561FAIL/owne47FAIL5frames AREnowGit withownmanifests, NOTcurrent558frames. PreparationPENDINGdocs remainhistory; this finalreceipt supersedes result only, consolidate nextFUNCTIONALcycle.

Onlyarea10technicalinternalaccepted,12pending. RoottransportUNRESOLVED; KEEP558DRAFT/NOREADY/MERGE/rerunblind. 560e47DRAFTFAIL and main561postFAIL unchanged. No production/cost/provider/externalgate change.

---

## CURRENT 2026-10-16 — controlled continuation scheduling; DRAFT

Head 8793af936a72f260af60894740145c720a5ba649, tree 1c8cfe6b579629829f73ba71ef91553993a63ca3; ordered integration parents [48a123aa5abac436c9ed26d148b725e30db79f74,429dcba6287e95ca4e804d9452a2e7c0b21fedd8]. Normal integration, no force. Main561 product/driver/gates retained byte-identical. Historical558 driver is now web-browser-transport-probe.cjs. Preserve8oldcontrols; add4minimal serial-ACK controls, while actual12browserGETs remainparallel; additionally require unchanged main503/recovery journey. Any casefailure exits1, no retry/passborrowing. Continuation failure now sticky; sanitized redirect status/origin/path and numeric protocol error only. Same15sstartup/CDP deadlines, same sandbox/CORS/Fetchguard/permissions/Chrome flags; structured startuphelperfrommain.

25local actual-helper/wrappermodels PASS, not TypeScriptCI/Chrome/PG. New exactHEAD CI **PENDING**, notGREEN. PR remainsDRAFT even isolatedPASS; no rootcause/remedyclaimed. Priorpost56138838523471attempt2 and560e4738838893368attempt2 remainFAIL; actualold5notificationrollback+4positivephasesPASS distinct from failedbrowser. Finalreceipts and5oldfailurePNGs now preserved with ownprovenance in this FUNCTIONAL cycle. Allhistory originals keptinplace append-only; divergentmain delta addedwhole after prior558prefix. 486existing main non-docblobs outsidewrapper identical; allAndroidinputs/graph unchanged, APKN/Aintegral.

The older receipts below remain history, not the newHEAD result.

---

## RESULTADO CORRENTE VERIFICADO — HEAD48a — CI FAILURE

**DRAFT / NÃO MERGED.** HEAD `48a123aa5abac436c9ed26d148b725e30db79f74`, tree `d577b8c55e24239253f034768018a85b1ce7444f`. Own CI38792613152/job116620750043attempt1 **FAILURE**, semreruns. **1328unit PASS** [151Web,753mobile,410API,3CLI,11monitor], mas HTTP/browser FAIL e ProductionTruth posterior NÃO executado. Não transformar unitverde em CIverde.

**Nova reprodução mínima válida:** documento recebido por HTTP200 REAL de127.0.0.1,securecontext/zeroappscripts/semcache-SW;singleGET200, depois12GETnativosparalelos cancelados ERR_ABORTED/canceled=true+12TypeError/Failed to fetch19:20:41Z. Sem React/Next app scripts neste controle. Não é o LNAdenied anterior da página sintética;nenhumgrant/overrideusado. Ainda mantém CDPguard/observadores, portanto não prova bugChrome/API/CORS/produção nem a causa exata. Campo PermissionBlock descrevepolicy,nãoprova por si denegação;corsErrorStatus dos abortos atual NÃO é LNAdenied.

8casos: minimalbaseline startupFAIL; minimallog-only/native-onlyPASS27respostasJSON(26GET200+1POST201)+persistênciaAPI/PG; minimalinstrumentedFAILnaondaconcorrente. Journeybaseline/instrumentedPASS9checks+5refresh+5reload/logoutPOST201/bearer401+outrasessãoMESMAidentity200/Bisolado;journeylog-onlyFAILapósPOSTteam201+12readabort;journeynative-onlyFAILsegunda recarga após5refresh/1reloadPASS. Agregado1 preservado;4PASSnãoapagam4FAIL. Os7browsersiniciadosregistraramChrome155.0.8059.39,1startupsemversão.

Revisão45paths/11UTF8+13PNGsnovosreadback/21assetsanterioresintactos/6históriasprefixoíntegro/483blobsprotegidosmainidênticos/ahead11behind0/mergebasedd715...;APK N/AporidentidadeINTEGRALinsumos/grafoAndroid. Checkout9e6fb40254ebb076adbe2c7faefa5761e399a81cSINTÉTICOpais[dd715...,48a...]treeigual,NÃOHEADliteral. CapturasOWN48a atuais12 foramdecodificadas/hash/bytes/1365x900verificados;baselineA/Binspecionadasvisualmente,emlogsCI/scratch,não nosarquivosbc3anteriores. Main continua dd715...pós556FAIL;13áreasnãoconcluídas. ManterDRAFT/nãorerunfalhadeproduto/nãomergerdiagnósticoapenasparaesverdear.

---
Histórico integral de preparação (estados antigos não são atuais):

## Estado corrente — fixture HTTP real, sem permissões extras

HEAD `48a123aa5abac436c9ed26d148b725e30db79f74` / tree `d577b8c55e24239253f034768018a85b1ce7444f`; **DRAFT / NÃO MERGED**, CI `38792613152` pendente, não PASS. A fixture mínima agora vem por HTTP do Nextlocalhost real (arquivo temporário exclusivo wx, limpeza só do próprio arquivo); nenhum HTML sintético CDP, grant de permissão, override de IPspace, mudança CORS/sandbox/timeout. Exige documentoHTTP200 TCPloopback,semcache/SW/zeroappscripts/securecontext. Captura campos CDP de contexto/IPspace sem credenciais.20/20modeloslocais,nãoChrome/typecheck;8casos obrigatórios,qualquerFAILpermaneceFAIL.45paths esperados;protegidosapp/API/SQL/mobile/native/deps/lock/workflows intactos.

**Resultado final bc3 anterior:** CI38790924626/job116614947907attempt1 FAILURE,1327unitPASS mas HTTP/browserFAIL. Minimalbaseline/log-onlystartup timeout; minimalnative-only/instrumented **LNA permission denied** (canceled=false), distinto do ERR_ABORTED das jornadas (canceled=true), portanto não é controle válido para atribuir o incidente original a foraReact. A proteção NÃO foi contornada nem atribuída como causa original. Journeylog-only+native-onlyPASS9checks/5refresh/5reload/logout+isolamento;journeybaselinefalhouprimeirarecarga após5refresh,journeyinstrumentedfalhou12GETiniciais. Agregado1 preservado;umInterceptionIderrorposterioraosabortosnãoécausaproveniente.13capturasbc3+manifestopreservadosneste ciclo funcional. Recibo completo bc3 nos docs append-only. Nenhuma correção causal de produto/13aceites declarada.

Histórico integral (não é estado corrente):

## Estado corrente — redução de transporte nativo

HEAD `bc3d1654839781433d9f832dac370bd2fd502aca` / tree `7e946e889a38b060f18ec04893971fc40e4c621d`; **DRAFT / NÃO MERGED**. CI `38790924626` pendente, não PASS. Documento mínimo explicitamente injetado na origem Web local, sem React/Next, para comparar fetch nativo contra jornadas completas;8casos independentes, mesma API/PG/CORS/Chrome/egressguard/sandbox/deadlines, todos obrigatórios. Somente o documento-fixture local é sintetizado; API/PG/proveniência/ACKs não são. Metadata do servidor agora recortada por byteoffset do caso;19/19 modelos locais, não Chrome. Sem correção de produto declarada.31paths esperados, app/API/SQL/native/deps/lock/workflows intactos; verificação integral pendente do novoHEAD.

**Resultado anterior REAL:** head690 CI38789034434attempt2/job116609063762 FAILURE;1322units PASS mas HTTP/browser FAIL. Baseline e log-only: POST de equipe cancelado antes da API observada; native-only:9checks+5refresh+5reload PASS; instrumented:12GETcancelados+12rejeições nativas TypeError/Failed to fetch no painel inicial. Todos Chrome155.0.8059.39. Logo, observador ligado não é reparo suficiente; causa ainda NÃO comprovada. Agregadostatus1 preservado. Nove capturas690/manifesto preservados neste ciclo funcional; não são capturas do novoHEAD. Sem rerun de falha de produto; único retry anterior resolveu ECR antescheckout.

Histórico integral anterior (não é estado atual):

## Estado corrente — matriz controlada (2026-10-15)

HEAD `690154ae25b1872994db39f0703d47cda03d1f0f`, tree `9326c8b03ca4718227b5e96c7eb73fb55a783c27`, **DRAFT / NÃO MERGED**. A matriz baseline/log-only/native-only/instrumented executa a mesma jornada completa em quatro perfis/fixtures novos; apenas dois observadores passivos variam. Falha de qualquer caso permanece no exit final; nenhum sucesso posterior a apaga. Fetch-egressguard, CORS, sandbox, prazos, auth/DOM/ACK e cache no-store intactos. Quatro regressões novas;14/14 modelos locais PASS, não Chrome nem typecheck. CI38789034434 attempt1 falhou ANTES checkout por ECR toomanyrequests/Data limit exceeded; produtos SKIPPED não são PASS/RED. Exatamente UMA repetição limitada do job falho no mesmo HEAD solicitada após comprovação primária; resultado pendente. Não existe correção causal demonstrada nem pós-merge558.

Revisão:21paths totais,11UTF8readback+3PNGnovos readback base64;483blobs não-doc da main fora2harnesses idênticos, originais+matriz íntegros, modos preservados. APK N/A por identidade integral de insumos/grafo Android. Capturas OWN558/aab preservadas com manifesto separado neste ciclo funcional; não são capturas dos quatro novos casos. Somente área10 tem aceite técnico interno;12 pendentes. Main dd715... com pós556 FAILURE permanece fato histórico/current; nenhuma repetição de merge/rerun556.

---
Histórico integral anterior preservado (estados antigos não são o atual):

Current snapshot — 2026-10-15: this draft strengthens real browser verification and diagnoses twelve intermittently canceled dashboard reads. It adds five explicit refresh waves (each requires twelve new GET200 responses after its click), five reloads tied to new complete documents, exact POST201 logout and actual token revocation, safe native/network/server diagnostics, and preserved capture provenance. Product/API/CORS/mobile/dependency code stays unchanged.

Exact current head aab5b8f2ab971cf8969b99b04eb005a64b774f91 has CI38781696446/job116583255788 attempt1 SUCCESS:1318 unit tests, all18steps, real Chrome155 journey9checks,5refreshes+5reloads, no fail/skipped/cancelled tests. This is OWN CI, not post-merge. Main remains dd715c6573bcc6d6e5e3c749cc634e276db83ef0 with its prior post556 browser failure. Earlier cancellations remain unexplained; do not treat successful instrumented runs as a demonstrated product fix. KEEP DRAFT, NOT MERGED. Only area10 technical internal accepted; twelve other areas pending full evidence.

Current exact receipt and preserved historical preparation below. Older PENDING/head/status snapshots are history, not the current state.

## Investigação de falha real pós-556 — não concluída

#556 JÁ merged dd715c6573bcc6d6e5e3c749cc634e276db83ef0. Próprio1308+ChromePASS; pós38753142047/job116484484990 attempt1 FAILURE14:42:00Z após hardreload:12seções indisponíveis. GET200/POST201 anteriores e OPTIONS204 após reload não provam sucesso. Não é startup/ECR; nenhum rerun/merge repetido ou bypass de segurança.

Primeiro diagnóstico head386e800747f378d98fa363a03d131afa7a33bf64/CI38754463700/job116489109517 attempt1SUCCESS1308/todos18steps+Chrome8checks14:50:32Z+ProductionTruth14:51:38Z. Não altera aplicação e não determina causa; não reclassifica pós556.

Head atual c2d61915167ac224eea6d743fb6e1864c51e66cd exige CINCO hardreloads consecutivos (qualquer falha interrompe; não retry) mantendo ignoreCache/asserts/CORS/sandbox/interceptação, instrumenta métodos/headers seguros/loadingFailed+CORS; logout exige POST201 e bearer browser401+outra sessão mesmaidentity200. CI38755422965/job116492445552 EM EXECUÇÃO, NÃO PASS. Sem causa comprovada, manter DRAFT.

## Revisão e evidência

15paths/15bytes UTF8oubase64 remotos verificados; modos100644; cinco originais+matriz preservados por prefixo;484blobs não-doc existentes fora driver idênticos. API/SQL/JSX/CSS/mobile/native/deps/lock/workflows/build/smoke intactos. APK N/A por identidade INTEGRAL dos inputs/grafo, não por[]/artefato emprestado. Ahead2/behind0 a revalidar antes eventual merge. Nenhuma alteração especulativa de CORS ou produto.

Seis PNGs REAIS556 e manifesto em `docs/evidencias/web-browser-2026-10-15/`, Node verificou assinatura/SHA256/bytes/1365x900; GitHub fetch_file encodingbase64 readback exato. Own e pós-falhos têm proveniências distintas, não são capturas558. Evidência `WEB_BROWSER_RELOAD_DIAGNOSTIC_2026-10-15.md`; documentos mestre/memória/checkpoint/ledger/registry/matriz append-only.

Só área10 Androidstandalone aceita TECNICAMENTE INTERNA;12semaceiteintegral, externoss215/219/220/224/228 separados. Desktop não Android/físico/VisualTruth/piloto. Não declarar correção da intermitência sem reprodução e causa.


## RED real posterior e correção candidata (supersede estado do head anterior)

Head7e707f40c64b3618558bc689c45f86965cd3dcaf CI38756284006/job116495471903attempt1FAILURE:1308unitPASS, segunda recarga falhou15:02:45Z e12GETnet::ERR_ABORTED/canceledtrue, semcorsErrorStatus. Primeira recarga mudou timeOrigin, mas gate não aguardava novo documento completo antesdashboard. Não alegar CORSbug/produto/exploit/causalidade total com556.

Novo HEAD40ab0c8017c3e79b43b1bf95e6363cd1d5961b25: reloadDocument aguarda performance.timeOrigin diferente E readyStatecomplete ANTESdashboard, preserva ignoreCache/5reloads/predicados/timeout20000/no signinretry/POST201signout+actualbearer401+sameidentityother200.4novasunit executam helpers reais com modelos explicitamente simulados:4/4localPASS. CI completo/Chrome/exacthead REVIEW/merge/pós PENDENTES; não antecipar contagens. API/CORS/app/deps/lock/Android intactos. Não repetir556merge/rerun. Este PR ainda DRAFT atégates reais.


## Estado MAIS RECENTE — candidato não resolveu; diagnóstico aberto

Head40ab CI38757186986/job116498594996attempt1FAILURE15:08:40.7178294Z created-team-rendered ANTESqualquerreload;1312unitPASSzeroFAILSKIPCANCEL/typecheck/build/migrationsprivacyPASS. TeamPOST201 e12GETabortados. Logo barreiradenovodocumento é integridadedogate,não causa/correção demonstrada doscancelamentos. Não alegar causalidadeprodutopara556.

HEAD ATUAL a524edbf0a8d519eaca176ffceaf43adc97253a5 rastreia Fetch.requestPaused/continueACK/errosCDP seguros/sessionMatches/tempos/loader/navegação, mantendo toda segurança/asserts. CI na criação não consultado: NÃO PASS. Semmerge/ready/reruncego. PR permanece investigação DRAFT atécausaconfirmada+gates own/postreais. Documentos por apêndice explicitamessa correção factual.


## Estado atual head6 — sem causa demonstrada; FAIL preservado

Heada524edbf0a8d519eaca176ffceaf43adc97253a5/CI38758034590/job116501584200attempt1FAILURE15:14:43Zcreated-job-rendered ANTESreload,1312unitPASS. ZeroerrosCDPcontinue/zeromismatchsession/umanavegaçãoinicialsomente,12GETabortadosmesmoloader: não sustenta erroCORS/navegação/recusaCDP como causa.

HEAD e32e8f2aee1c77b40e84973bc886c3ab2ad64d2b CI38758878368 EM EXECUÇÃO. Wrapper agora correlaciona SOMENTEmetadata método/path/status/timing daAPIfixture dedicadaquandodriverfalha;exit1semprepreservado,nãologacredenciais/body/headers/query. Nãoafrouxa segurança nemapp. ManterDRAFT atécausaconfirmada+gates reais. Teste debarreira éintegridadedogate,nãoreparo demonstrado docancelamento.17pathsagora aguardamreviewfinal;6PNG556/manifestopreservados. Nãorepetirmerge556/555.


## Latest functional diagnostic head — 2026-10-15



Main dd715c6573bcc6d6e5e3c749cc634e276db83ef0;PR558DRAFT nowHEAD3afbd79b293f0af031d98ff698a2a61f88272045/treefaa7f713219331a2e988199a2199a1c7e44c13d3. NEWdiagnosticcommitsamebranchpreservesallgates/security/app;creationCIquery[]NOTPASS. FirstcheckexactHEADCI now. NativeLog.network/responseExtraCORS+fetchpassthroughobserverRuntime.bindingCalledlogonlysafephase/path/status/type/errorclassallowlist,redactunclassifiedmessages/Bearer/URLqueries/userinfo;originalPromise/args/receiver/rejectionpreserved,nobodyread/clone,extrarequests0. Fournewmodeltests+fouroriginalhelpermodels8/8localPASSnotChrome/typecheck;Web139/total1316ONLYpredictionuntilCI. 5origdocs+matrix/evidenceappendnewobservedfacts.
OLD e32CI38758878368: attempt1/job116504528610ECRquotaBEFOREcheckoutallproductskipped;exactlyONEfailedjobretrysameSHAaftercompletedresolvedinfra. Attempt2/job116505547703FAILURE:1312unitPASS[135,753,410,3,11],5ACTUALhardreloadsnewtimeOrigins/readycompletePASS15:21:20Z;team/job/initialAreadsactual200+201;actualsignoutPOST201,signinBPOST201;Bdashboardloadedtimeout15:21:40.7693790Z12unavailable. WEB_BROWSER_SERVER_DIAGNOSTICshowsALL12BOPTIONS204butNONEfollowingGETattheAPI;Chrome12GETcancelled. NoCORS/product/exploit/navigation/CDPsessioncauseproven. NORETRYthisproductfailureoroldmerge556;don'tborrowA/ownpassforBgates. Nextinspectnativefetchrejection+browser-network-log+response-extraandcorrelateserver/Networktracesbeforeanyproductfix. KeepDRAFTuntilrealcause/evidence/gates;ifnewheadpasseswithoutrepro,don'tinventrootcauseorfullareaacceptance.
All6PNG556+manifestcommittedsincec2d/readbackSHA/bytes/1365x900;notcaptures558. Priorhead e32full17pathsbytes/modes/prefixdocsreview+483existingnondocblobsoutside2harnessscriptsunchanged,APKN/Aintegralapp/mobile/native/deps/lock/workflows/build/smokegraphidentity. Finalheadreviewagain. Base7docssourcesfreshreadGithubfullstoredsizesDVT535264/memory867834/CP525516/ledger520321/registry521447/matrix118112README3096chars;originalprefixmustremainfull. Onlyarea10technicalinternalaccepted12pending. Externals215/219/220/224/228OPEN,noexpenses/prod/credentials/providers/money. Soleexistingroutineenabledsamehourly,nocreate/disable.

No new merge or readiness requested. Gate remains pending on the exact current head. Native observer models8/8 local are not browser acceptance; historical e32 run is failure.


## Measured green diagnostic and new explicit-refresh regression

Prior head3afbd79b293f0af031d98ff698a2a61f88272045 own COMPLETE SUCCESS:

```json
{
  "head": "3afbd79b293f0af031d98ff698a2a61f88272045",
  "run": 38780501516,
  "job": 116579142286,
  "attempt": 1,
  "counts": {
    "tests": [
      139,
      753,
      410,
      3,
      11
    ],
    "pass": [
      139,
      753,
      410,
      3,
      11
    ],
    "fail": [
      0,
      0,
      0,
      0,
      0
    ],
    "skipped": [
      0,
      0,
      0,
      0,
      0
    ],
    "cancelled": [
      0,
      0,
      0,
      0,
      0
    ]
  },
  "steps": 18,
  "browserAt": "2026-10-15T17:53:06.5636995Z",
  "checkout": {
    "sha": "738e7003e9c331ebfc0d9a4edc3a5eb64de25838",
    "parents": [
      "dd715c6573bcc6d6e5e3c749cc634e276db83ef0",
      "3afbd79b293f0af031d98ff698a2a61f88272045"
    ],
    "tree": "faa7f713219331a2e988199a2199a1c7e44c13d3",
    "kind": "synthetic"
  },
  "checks": [
    "login401-feedback",
    "login-success-empty",
    "create-team-persisted-rendered",
    "create-job-exact-money-dates-persisted-rendered",
    "reload-tab-session",
    "local-and-remote-signout",
    "revoked-browser-token401-other-session-valid",
    "second-identity-isolated"
  ],
  "revokedBrowserStatus": 401,
  "otherSameIdentitySession": true,
  "productionTruthAt": "2026-10-15T17:54:11.6227914Z",
  "captures": [
    {
      "label": "login",
      "sha256": "75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc",
      "bytes": 33686
    },
    {
      "label": "company-a-created",
      "sha256": "af80d44fa4091c8bf4fac1dda54069d8c393302fe237008ff0fe9300bee78f13",
      "bytes": 132345
    },
    {
      "label": "company-b-isolated",
      "sha256": "710cd625e80aa301dc4042082f36067af587f2a5ab0c3cecc120e6486ddc9ffc",
      "bytes": 132494
    }
  ]
}
```

This does NOT establish cause/remedy for earlier intermittent canceled requests; draft remains open. New HEAD aab5b8f2ab971cf8969b99b04eb005a64b774f91 adds five EXPLICIT user button refresh waves. Each requires12 distinct actual GET200 paths observed AFTER its click, valid DOM and persisted own job, no additional POST or signin; OPTIONS204/old responses cannot satisfy gate. Five hard reloads and all prior session/logout/isolation assertions remain. Actual Browser.getVersion metadata recorded. Two new barrier models plus eight previous tests pass10/10 locally, not browser/typecheck. New exact-head CI NOT YET SUCCESS; do not merge or borrow old green. Onlyarea10 technicalinternal accepted, twelve pending; no app/API/CORS/security/dependency/Android changes.


## Current exact-head result — complete own green, no merge

```json
{
  "date": "2026-10-15",
  "repository": "dbdanielbaracho/MLIVRETRABALHO",
  "state": "DRAFT, NOT MERGED; prior intermittent cancellation cause unresolved",
  "main": "dd715c6573bcc6d6e5e3c749cc634e276db83ef0",
  "head": "aab5b8f2ab971cf8969b99b04eb005a64b774f91",
  "tree": "de4efe3c121fa7ccd33b68bc35530e00a6a325d5",
  "ci": {
    "run": 38781696446,
    "job": 116583255788,
    "attempt": 1,
    "conclusion": "success",
    "all18Steps": true,
    "counts": {
      "tests": [
        141,
        753,
        410,
        3,
        11
      ],
      "pass": [
        141,
        753,
        410,
        3,
        11
      ],
      "fail": [
        0,
        0,
        0,
        0,
        0
      ],
      "skipped": [
        0,
        0,
        0,
        0,
        0
      ],
      "cancelled": [
        0,
        0,
        0,
        0,
        0
      ]
    },
    "totalUnitTests": 1318,
    "checkout": {
      "sha": "6126ceee433bfa2cb6ec18f06e6d2bca25114836",
      "parents": [
        "dd715c6573bcc6d6e5e3c749cc634e276db83ef0",
        "aab5b8f2ab971cf8969b99b04eb005a64b774f91"
      ],
      "tree": "de4efe3c121fa7ccd33b68bc35530e00a6a325d5",
      "kind": "synthetic"
    },
    "productionTruth": "2026-10-15T18:02:33.5034753Z"
  },
  "browser": {
    "version": {
      "product": "Chrome/155.0.8059.39",
      "protocolVersion": "1.3",
      "jsVersion": "15.5.35.20",
      "revision": "@3ff7ac5a9224be9156d7f8703a06e22890aafd34"
    },
    "checks": [
      "login401-feedback",
      "login-success-empty",
      "create-team-persisted-rendered",
      "create-job-exact-money-dates-persisted-rendered",
      "reload-tab-session",
      "local-and-remote-signout",
      "revoked-browser-token401-other-session-valid",
      "second-identity-isolated",
      "five-explicit-dashboard-refresh-waves"
    ],
    "refreshWaves": [
      {
        "refresh": 1,
        "actualGet200Paths": 12
      },
      {
        "refresh": 2,
        "actualGet200Paths": 12
      },
      {
        "refresh": 3,
        "actualGet200Paths": 12
      },
      {
        "refresh": 4,
        "actualGet200Paths": 12
      },
      {
        "refresh": 5,
        "actualGet200Paths": 12
      }
    ],
    "reloads": [
      {
        "reload": 1,
        "previousTimeOrigin": 1792087285780.4,
        "currentTimeOrigin": 1792087288293.8
      },
      {
        "reload": 2,
        "previousTimeOrigin": 1792087288293.8,
        "currentTimeOrigin": 1792087288498.5
      },
      {
        "reload": 3,
        "previousTimeOrigin": 1792087288498.5,
        "currentTimeOrigin": 1792087288653.5
      },
      {
        "reload": 4,
        "previousTimeOrigin": 1792087288653.5,
        "currentTimeOrigin": 1792087288811.2
      },
      {
        "reload": 5,
        "previousTimeOrigin": 1792087288811.2,
        "currentTimeOrigin": 1792087289040.7
      }
    ],
    "signout": [
      {
        "path": "/v1/auth/signout",
        "status": 204,
        "method": "OPTIONS"
      },
      {
        "path": "/v1/auth/signout",
        "status": 201,
        "method": "POST"
      }
    ],
    "revokedBrowserTokenStatus": 401,
    "otherSameIdentitySessionValid": true,
    "fixtureTenants": [
      "f5c8515c-d43e-4f50-bae0-ca5d020bd501",
      "ddef7d5c-353d-43ee-baf6-2afb34ff94f6"
    ],
    "jobId": "6c0731f7-6d62-4a8f-9ba2-cd94fcf33b34",
    "teamId": "a34bbe30-2b3d-42b0-8048-f127069bd2a8",
    "captures": [
      {
        "label": "login",
        "sha256": "75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc",
        "bytes": 33686,
        "independentPNGSignatureBytesSHA256DimensionsVerified": true,
        "width": 1365,
        "height": 900
      },
      {
        "label": "company-a-created",
        "sha256": "e9e55e20b313945d1200c9f90fa043c9f0771f0ce3a2a0625ca9cd43f76144e1",
        "bytes": 131542,
        "independentPNGSignatureBytesSHA256DimensionsVerified": true,
        "width": 1365,
        "height": 900
      },
      {
        "label": "company-b-isolated",
        "sha256": "64a3958eb4744f8079361b2d28e7164751b7fff9a36e40a00ba03be5ffd0821e",
        "bytes": 132080,
        "independentPNGSignatureBytesSHA256DimensionsVerified": true,
        "width": 1365,
        "height": 900
      }
    ],
    "scope": "Actual localhost fixture API/Postgres and desktop browser; instrumented native fetch delegates unchanged arguments/promise; not Android/physical/VisualTruth acceptance"
  },
  "review": {
    "base": "dd715c6573bcc6d6e5e3c749cc634e276db83ef0",
    "head": "aab5b8f2ab971cf8969b99b04eb005a64b774f91",
    "tree": "de4efe3c121fa7ccd33b68bc35530e00a6a325d5",
    "paths": [
      {
        "path": "apps/web/app/browser-document-reload.test.ts",
        "mode": "100644"
      },
      {
        "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
        "mode": "100644"
      },
      {
        "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
        "mode": "100644"
      },
      {
        "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/WEB_BROWSER_RELOAD_DIAGNOSTIC_2026-10-15.md",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/web-browser-2026-10-15/PR556_CAPTURE_PROVENANCE.json",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/web-browser-2026-10-15/pr556-own-company-a-created.png",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/web-browser-2026-10-15/pr556-own-company-b-isolated.png",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/web-browser-2026-10-15/pr556-own-login.png",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/web-browser-2026-10-15/pr556-post-failed-company-a-created.png",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/web-browser-2026-10-15/pr556-post-failed-failure.png",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/web-browser-2026-10-15/pr556-post-failed-login.png",
        "mode": "100644"
      },
      {
        "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
        "mode": "100644"
      },
      {
        "path": "scripts/web-browser-journey-e2e.cjs",
        "mode": "100644"
      },
      {
        "path": "scripts/web-browser-journey-e2e.sh",
        "mode": "100755"
      }
    ],
    "all17CurrentBytesOrPreviouslyDecodedImmutableAssetsVerified": true,
    "originalFullPrefixes": true,
    "unchangedNonDocExisting": 483,
    "apkNA": "integral protected Android inputs/dependency graph identity",
    "ancestry": {
      "ahead": 8,
      "behind": 0,
      "mergeBase": "dd715c6573bcc6d6e5e3c749cc634e276db83ef0"
    },
    "state": "DRAFT NOT MERGED, cancellation cause remains undetermined"
  },
  "acceptance": {
    "technicalInternalAcceptedArea": 10,
    "other12": "not integrally accepted",
    "externalOpen": [
      215,
      219,
      220,
      224,
      228
    ]
  },
  "next": "Controlled local diagnostic matrix with passive observers enabled/disabled, all cases required; keep Fetch egress guard/CORS/sandbox/assertions and no real services. Do not infer cause from two successful instrumented heads."
}
```

The 1318 count is the unit suites only; refresh waves and browser checks do not inflate it. The current successful browser result does NOT explain or erase earlier canceled-request failures, including main's post556 failure. The native observer adds observation work/microtasks despite returning the same original Promise; timing effects are an unproved hypothesis, not a fix. Runner image for failing e32 and these successful runs is the SAME ubuntu-24.04 20261012.334.1; do not invent an image/Chrome-upgrade explanation. Literal old browser version was not recorded. Keep DRAFT and do not merge diagnostic changes merely to claim the intermittent problem solved. Final current receipt stays here; consolidate it and current PNGs during the next functional cycle, not a self-referential metadata-only commit.


## Recibo final completo — fontes primárias e resumos verificáveis

```json
{"head":"48a123aa5abac436c9ed26d148b725e30db79f74","tree":"d577b8c55e24239253f034768018a85b1ce7444f","run":38792613152,"job":116620750043,"attempt":1,"result":"failure","tests":[151,753,410,3,11],"total":1328,"unitFailSkipCancel":[{"kind":"fail","count":0},{"kind":"cancelled","count":0},{"kind":"skipped","count":0},{"kind":"fail","count":0},{"kind":"cancelled","count":0},{"kind":"skipped","count":0},{"kind":"fail","count":0},{"kind":"cancelled","count":0},{"kind":"skipped","count":0},{"kind":"fail","count":0},{"kind":"cancelled","count":0},{"kind":"skipped","count":0},{"kind":"fail","count":0},{"kind":"cancelled","count":0},{"kind":"skipped","count":0}],"steps":[{"name":"Set up job","status":"completed","conclusion":"success","number":1},{"name":"Initialize containers","status":"completed","conclusion":"success","number":2},{"name":"Checkout","status":"completed","conclusion":"success","number":3},{"name":"Setup Node.js","status":"completed","conclusion":"success","number":4},{"name":"Enable pnpm","status":"completed","conclusion":"success","number":5},{"name":"Install dependencies","status":"completed","conclusion":"success","number":6},{"name":"Typecheck","status":"completed","conclusion":"success","number":7},{"name":"Build","status":"completed","conclusion":"success","number":8},{"name":"Export mobile Android bundle","status":"completed","conclusion":"success","number":9},{"name":"Install PostgreSQL client","status":"completed","conclusion":"success","number":10},{"name":"Run tests","status":"completed","conclusion":"success","number":11},{"name":"Verify production migration runner","status":"completed","conclusion":"success","number":12},{"name":"Privacy retention and legal hold contract","status":"completed","conclusion":"success","number":13},{"name":"HTTP journey, readiness and Production Truth contract","status":"completed","conclusion":"failure","number":14},{"name":"Post Setup Node.js","status":"completed","conclusion":"skipped","number":26},{"name":"Post Checkout","status":"completed","conclusion":"success","number":27},{"name":"Stop containers","status":"completed","conclusion":"success","number":28},{"name":"Complete job","status":"completed","conclusion":"success","number":29}],"checkout":{"sha":"9e6fb40254ebb076adbe2c7faefa5761e399a81c","kind":"synthetic merge, not literal HEAD","parents":["dd715c6573bcc6d6e5e3c749cc634e276db83ef0","48a123aa5abac436c9ed26d148b725e30db79f74"],"treeEqual":true},"cases":[{"scenario":"minimal","mode":"baseline","native":false,"log":false,"started":"2026-10-15T19:20:14.9295784Z","refreshes":0,"reloads":0,"failure":{"scenario":"minimal","diagnostic":"baseline","error":"Browser startup timeout"},"result":"FAIL"},{"scenario":"minimal","mode":"log-only","native":false,"log":true,"started":"2026-10-15T19:20:35.8499877Z","refreshes":0,"reloads":0,"version":{"scenario":"minimal","diagnostic":"log-only","product":"Chrome/155.0.8059.39","protocolVersion":"1.3","jsVersion":"15.5.35.20","revision":"@3ff7ac5a9224be9156d7f8703a06e22890aafd34"},"context":{"scenario":"minimal","diagnostic":"log-only","documentResponse":{"path":"/__mlivre_transport_fixture.html","status":200,"remoteIPAddress":"127.0.0.1","fromDiskCache":false,"fromServiceWorker":false},"secureContext":true,"appScripts":0},"result":"PASS","minimal":{"scenario":"minimal","diagnostic":"log-only","failedStage":null,"teamId":"52422583-3bd8-46ce-8006-b8f4fac9b7b9","rows":[{"stage":"single","path":"/v1/company/dashboard","status":200,"jsonKind":"object"},{"stage":"parallel-before","path":"/v1/company/dashboard","status":200,"jsonKind":"object"},{"stage":"parallel-before","path":"/v1/company/dashboard/completed","status":200,"jsonKind":"array"},{"stage":"parallel-before","path":"/v1/company/analytics","status":200,"jsonKind":"object"},{"stage":"parallel-before","path":"/v1/company/planner","status":200,"jsonKind":"array"},{"stage":"parallel-before","path":"/v1/company/jobs","status":200,"jsonKind":"array"},{"stage":"parallel-before","path":"/v1/company/teams","status":200,"jsonKind":"array"},{"stage":"parallel-before","path":"/v1/company/replacements","status":200,"jsonKind":"array"},{"stage":"parallel-before","path":"/v1/company/talent-pools","status":200,"jsonKind":"array"},{"stage":"parallel-before","path":"/v1/company/dashboard/assignments","status":200,"jsonKind":"array"},{"stage":"parallel-before","path":"/v1/company/payment-events/reconciliation","status":200,"jsonKind":"array"},{"stage":"parallel-before","path":"/v1/company/safety-cases","status":200,"jsonKind":"array"},{"stage":"parallel-before","path":"/v1/company/safety-appeals","status":200,"jsonKind":"array"},{"stage":"create-team","path":"/v1/company/teams","status":201},{"stage":"read-created","path":"/v1/company/teams","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/dashboard","status":200,"jsonKind":"object"},{"stage":"parallel-after","path":"/v1/company/jobs","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/planner","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/analytics","status":200,"jsonKind":"object"},{"stage":"parallel-after","path":"/v1/company/dashboard/assignments","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/dashboard/completed","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/teams","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/replacements","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/talent-pools","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/safety-cases","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/payment-events/reconciliation","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/safety-appeals","status":200,"jsonKind":"array"}]}},{"scenario":"minimal","mode":"native-only","native":true,"log":false,"started":"2026-10-15T19:20:39.4906415Z","refreshes":0,"reloads":0,"version":{"scenario":"minimal","diagnostic":"native-only","product":"Chrome/155.0.8059.39","protocolVersion":"1.3","jsVersion":"15.5.35.20","revision":"@3ff7ac5a9224be9156d7f8703a06e22890aafd34"},"context":{"scenario":"minimal","diagnostic":"native-only","documentResponse":{"path":"/__mlivre_transport_fixture.html","status":200,"remoteIPAddress":"127.0.0.1","fromDiskCache":false,"fromServiceWorker":false},"secureContext":true,"appScripts":0},"result":"PASS","minimal":{"scenario":"minimal","diagnostic":"native-only","failedStage":null,"teamId":"f22c7011-4814-4e4b-a0ca-868c52fed892","rows":[{"stage":"single","path":"/v1/company/dashboard","status":200,"jsonKind":"object"},{"stage":"parallel-before","path":"/v1/company/dashboard","status":200,"jsonKind":"object"},{"stage":"parallel-before","path":"/v1/company/analytics","status":200,"jsonKind":"object"},{"stage":"parallel-before","path":"/v1/company/jobs","status":200,"jsonKind":"array"},{"stage":"parallel-before","path":"/v1/company/dashboard/assignments","status":200,"jsonKind":"array"},{"stage":"parallel-before","path":"/v1/company/dashboard/completed","status":200,"jsonKind":"array"},{"stage":"parallel-before","path":"/v1/company/planner","status":200,"jsonKind":"array"},{"stage":"parallel-before","path":"/v1/company/teams","status":200,"jsonKind":"array"},{"stage":"parallel-before","path":"/v1/company/replacements","status":200,"jsonKind":"array"},{"stage":"parallel-before","path":"/v1/company/talent-pools","status":200,"jsonKind":"array"},{"stage":"parallel-before","path":"/v1/company/safety-cases","status":200,"jsonKind":"array"},{"stage":"parallel-before","path":"/v1/company/safety-appeals","status":200,"jsonKind":"array"},{"stage":"parallel-before","path":"/v1/company/payment-events/reconciliation","status":200,"jsonKind":"array"},{"stage":"create-team","path":"/v1/company/teams","status":201},{"stage":"read-created","path":"/v1/company/teams","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/dashboard","status":200,"jsonKind":"object"},{"stage":"parallel-after","path":"/v1/company/analytics","status":200,"jsonKind":"object"},{"stage":"parallel-after","path":"/v1/company/planner","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/jobs","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/dashboard/completed","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/replacements","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/dashboard/assignments","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/teams","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/talent-pools","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/payment-events/reconciliation","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/safety-cases","status":200,"jsonKind":"array"},{"stage":"parallel-after","path":"/v1/company/safety-appeals","status":200,"jsonKind":"array"}]}},{"scenario":"minimal","mode":"instrumented","native":true,"log":true,"started":"2026-10-15T19:20:40.5819013Z","refreshes":0,"reloads":0,"version":{"scenario":"minimal","diagnostic":"instrumented","product":"Chrome/155.0.8059.39","protocolVersion":"1.3","jsVersion":"15.5.35.20","revision":"@3ff7ac5a9224be9156d7f8703a06e22890aafd34"},"context":{"scenario":"minimal","diagnostic":"instrumented","documentResponse":{"path":"/__mlivre_transport_fixture.html","status":200,"remoteIPAddress":"127.0.0.1","fromDiskCache":false,"fromServiceWorker":false},"secureContext":true,"appScripts":0},"failure":{"scenario":"minimal","diagnostic":"instrumented","error":"Minimal native browser transport failed; no React/Next scripts run in this fixture document\n+ actual - expected\n\n+ 'parallel-before'\n- null\n"},"result":"FAIL","minimal":{"scenario":"minimal","diagnostic":"instrumented","failedStage":"parallel-before","rows":[{"stage":"single","path":"/v1/company/dashboard","status":200,"jsonKind":"object"},{"stage":"parallel-before","path":"/v1/company/talent-pools","status":null,"errorName":"TypeError"},{"stage":"parallel-before","path":"/v1/company/replacements","status":null,"errorName":"TypeError"},{"stage":"parallel-before","path":"/v1/company/dashboard/assignments","status":null,"errorName":"TypeError"},{"stage":"parallel-before","path":"/v1/company/analytics","status":null,"errorName":"TypeError"},{"stage":"parallel-before","path":"/v1/company/safety-cases","status":null,"errorName":"TypeError"},{"stage":"parallel-before","path":"/v1/company/jobs","status":null,"errorName":"TypeError"},{"stage":"parallel-before","path":"/v1/company/teams","status":null,"errorName":"TypeError"},{"stage":"parallel-before","path":"/v1/company/payment-events/reconciliation","status":null,"errorName":"TypeError"},{"stage":"parallel-before","path":"/v1/company/dashboard","status":null,"errorName":"TypeError"},{"stage":"parallel-before","path":"/v1/company/dashboard/completed","status":null,"errorName":"TypeError"},{"stage":"parallel-before","path":"/v1/company/safety-appeals","status":null,"errorName":"TypeError"},{"stage":"parallel-before","path":"/v1/company/planner","status":null,"errorName":"TypeError"}]}},{"scenario":"journey","mode":"baseline","native":false,"log":false,"started":"2026-10-15T19:20:41.6682288Z","refreshes":5,"reloads":5,"version":{"scenario":"journey","diagnostic":"baseline","product":"Chrome/155.0.8059.39","protocolVersion":"1.3","jsVersion":"15.5.35.20","revision":"@3ff7ac5a9224be9156d7f8703a06e22890aafd34"},"result":"PASS","journey":{"checks":["login401-feedback","login-success-empty","create-team-persisted-rendered","create-job-exact-money-dates-persisted-rendered","reload-tab-session","local-and-remote-signout","revoked-browser-token401-other-session-valid","second-identity-isolated","five-explicit-dashboard-refresh-waves"],"fixtureTenants":["28705397-6043-42d0-b9c9-245f7a3d0b8b","d5087f7d-4604-4745-9fa3-0cb94a17f211"],"fixtureIdentities":["8438064f-7a9e-455d-930e-69b3c1401ce7","4dd76091-d9e2-4c7e-b04f-199785f4856e"],"jobId":"55ecabd8-703b-4f93-8718-e507bdce187b","teamId":"121a36f6-3aba-455b-86b9-5c672b796614","revokedBrowserTokenStatus":401,"otherSameIdentitySessionValid":true}},{"scenario":"journey","mode":"log-only","native":false,"log":true,"started":"2026-10-15T19:20:47.7298106Z","refreshes":0,"reloads":0,"version":{"scenario":"journey","diagnostic":"log-only","product":"Chrome/155.0.8059.39","protocolVersion":"1.3","jsVersion":"15.5.35.20","revision":"@3ff7ac5a9224be9156d7f8703a06e22890aafd34"},"failure":{"scenario":"journey","diagnostic":"log-only","error":"Browser condition timeout: created team rendered"},"result":"FAIL"},{"scenario":"journey","mode":"native-only","native":true,"log":false,"started":"2026-10-15T19:21:09.1925250Z","refreshes":5,"reloads":1,"version":{"scenario":"journey","diagnostic":"native-only","product":"Chrome/155.0.8059.39","protocolVersion":"1.3","jsVersion":"15.5.35.20","revision":"@3ff7ac5a9224be9156d7f8703a06e22890aafd34"},"failure":{"scenario":"journey","diagnostic":"native-only","error":"Browser condition timeout: loaded dashboard"},"result":"FAIL"},{"scenario":"journey","mode":"instrumented","native":true,"log":true,"started":"2026-10-15T19:21:32.3701348Z","refreshes":5,"reloads":5,"version":{"scenario":"journey","diagnostic":"instrumented","product":"Chrome/155.0.8059.39","protocolVersion":"1.3","jsVersion":"15.5.35.20","revision":"@3ff7ac5a9224be9156d7f8703a06e22890aafd34"},"result":"PASS","journey":{"checks":["login401-feedback","login-success-empty","create-team-persisted-rendered","create-job-exact-money-dates-persisted-rendered","reload-tab-session","local-and-remote-signout","revoked-browser-token401-other-session-valid","second-identity-isolated","five-explicit-dashboard-refresh-waves"],"fixtureTenants":["ed8466d3-f512-4d1c-af23-8187ac60f7da","f19367d4-bdb2-45db-b879-bd343f19abc2"],"fixtureIdentities":["a889e050-e748-40c6-ace4-167a2aaf23e4","2b0e1185-7329-4f13-b214-a7eeb80204ec"],"jobId":"29e493fa-bb71-4159-8d7d-989e678392f9","teamId":"7be99cd6-e0d1-428a-bccf-74da1cbd10ba","revokedBrowserTokenStatus":401,"otherSameIdentitySessionValid":true}}],"diagnostics":[{"scenario":"minimal","mode":"instrumented","errors":[{"id":"14274.12","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14274.11","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14274.8","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14274.5","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14274.14","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14274.7","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14274.10","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14274.13","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14274.4","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14274.9","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14274.15","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14274.6","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null}],"nativeRejections":12,"interceptErrors":[],"security":[{"initiatorIPAddressSpace":"Loopback","initiatorIsSecureContext":true,"localNetworkAccessRequestPolicy":"PermissionBlock"}]},{"scenario":"journey","mode":"log-only","errors":[{"id":"14670.33","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14670.37","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14670.34","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14670.44","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14670.41","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14670.38","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14670.40","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14670.43","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14670.39","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14670.35","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14670.42","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"14670.36","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null}],"nativeRejections":0,"interceptErrors":[],"security":[{"initiatorIPAddressSpace":"Loopback","initiatorIsSecureContext":true,"localNetworkAccessRequestPolicy":"PermissionBlock"}]},{"scenario":"journey","mode":"native-only","errors":[{"id":"15042.173","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"15042.163","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"15042.166","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"15042.169","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"15042.165","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"15042.168","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"15042.174","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"15042.164","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"15042.171","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"15042.172","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"15042.170","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null},{"id":"15042.167","method":"GET","errorText":"net::ERR_ABORTED","canceled":true,"corsErrorStatus":null}],"nativeRejections":12,"interceptErrors":[],"security":[{"initiatorIPAddressSpace":"Loopback","initiatorIsSecureContext":true,"localNetworkAccessRequestPolicy":"PermissionBlock"}]}],"server":[{"scenario":"minimal","mode":"baseline","windowScope":"only API bytes after this case started; method/path/status/timing metadata","requestCounts":{"POST /v1/auth/signup":2,"POST /v1/auth/signin":2},"responseStatusCounts":{"201":4},"fullMetadataSource":"Primary workflow job116620750043 WEB_BROWSER_SERVER_DIAGNOSTIC; not copied in full here"},{"scenario":"minimal","mode":"instrumented","windowScope":"only API bytes after this case started; method/path/status/timing metadata","requestCounts":{"POST /v1/auth/signup":2,"POST /v1/auth/signin":2,"OPTIONS /v1/company/dashboard":2,"GET /v1/company/dashboard":1,"OPTIONS /v1/company/analytics":1,"OPTIONS /v1/company/planner":1,"OPTIONS /v1/company/jobs":1,"OPTIONS /v1/company/dashboard/assignments":1,"OPTIONS /v1/company/dashboard/completed":1,"OPTIONS /v1/company/teams":1,"OPTIONS /v1/company/replacements":1,"OPTIONS /v1/company/talent-pools":1,"OPTIONS /v1/company/payment-events/reconciliation":1,"OPTIONS /v1/company/safety-cases":1,"OPTIONS /v1/company/safety-appeals":1},"responseStatusCounts":{"200":1,"201":4,"204":13},"fullMetadataSource":"Primary workflow job116620750043 WEB_BROWSER_SERVER_DIAGNOSTIC; not copied in full here"},{"scenario":"journey","mode":"log-only","windowScope":"only API bytes after this case started; method/path/status/timing metadata","requestCounts":{"POST /v1/auth/signup":2,"POST /v1/auth/signin":4,"OPTIONS /v1/auth/signin":1,"OPTIONS /v1/company/dashboard":2,"OPTIONS /v1/company/analytics":2,"OPTIONS /v1/company/planner":1,"OPTIONS /v1/company/jobs":1,"OPTIONS /v1/company/dashboard/assignments":1,"OPTIONS /v1/company/dashboard/completed":1,"OPTIONS /v1/company/teams":2,"OPTIONS /v1/company/replacements":1,"OPTIONS /v1/company/talent-pools":1,"OPTIONS /v1/company/payment-events/reconciliation":1,"OPTIONS /v1/company/safety-cases":1,"OPTIONS /v1/company/safety-appeals":1,"GET /v1/company/dashboard":1,"GET /v1/company/analytics":1,"GET /v1/company/planner":1,"GET /v1/company/jobs":1,"GET /v1/company/dashboard/assignments":1,"GET /v1/company/dashboard/completed":1,"GET /v1/company/teams":1,"GET /v1/company/replacements":1,"GET /v1/company/talent-pools":1,"GET /v1/company/payment-events/reconciliation":1,"GET /v1/company/safety-cases":1,"GET /v1/company/safety-appeals":1,"POST /v1/company/teams":1},"responseStatusCounts":{"200":12,"201":6,"204":16,"401":1},"fullMetadataSource":"Primary workflow job116620750043 WEB_BROWSER_SERVER_DIAGNOSTIC; not copied in full here"},{"scenario":"journey","mode":"native-only","windowScope":"only API bytes after this case started; method/path/status/timing metadata","requestCounts":{"OPTIONS /v1/company/teams":7,"OPTIONS /v1/company/replacements":7,"OPTIONS /v1/company/talent-pools":7,"OPTIONS /v1/company/payment-events/reconciliation":7,"OPTIONS /v1/company/safety-cases":7,"OPTIONS /v1/company/safety-appeals":7,"GET /v1/company/dashboard":6,"GET /v1/company/analytics":6,"GET /v1/company/planner":6,"GET /v1/company/jobs":6,"GET /v1/company/dashboard/assignments":6,"GET /v1/company/dashboard/completed":6,"GET /v1/company/teams":6,"GET /v1/company/replacements":6,"GET /v1/company/talent-pools":6,"GET /v1/company/payment-events/reconciliation":6,"GET /v1/company/safety-cases":6,"GET /v1/company/safety-appeals":6,"OPTIONS /v1/company/dashboard":6,"OPTIONS /v1/company/analytics":6,"OPTIONS /v1/company/planner":6,"OPTIONS /v1/company/jobs":6,"OPTIONS /v1/company/dashboard/assignments":6,"OPTIONS /v1/company/dashboard/completed":6},"responseStatusCounts":{"200":72,"204":78},"fullMetadataSource":"Primary workflow job116620750043 WEB_BROWSER_SERVER_DIAGNOSTIC; not copied in full here"}],"review":{"head":"48a123aa5abac436c9ed26d148b725e30db79f74","tree":"d577b8c55e24239253f034768018a85b1ce7444f","paths":45,"utf8":11,"newPNGsReadback":13,"previousAssetsUnchanged":21,"docsPreserved":6,"protectedBlobs":483,"ahead":11,"behind":0,"base":"dd715c6573bcc6d6e5e3c749cc634e276db83ef0","apk":"N/A integral mobile/native/deps/lock/workflow/build/smoke plus graph identity; no new native public test file in Git"},"captures":[{"scenario":"minimal","diagnostic":"instrumented","label":"failure","sha256":"050b6043a08877784addeaf706f0304c956e63007ba673516b4119d3e8bcfdc2","bytes":9116,"width":1365,"height":900,"decodedSignatureBytesHashDimensionsVerified":true,"persisted":"CI primary log and transient scratch only for current48a; older bc3/690/aab frames in Git are not current48a frames"},{"scenario":"journey","diagnostic":"baseline","label":"login","sha256":"75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc","bytes":33686,"width":1365,"height":900,"decodedSignatureBytesHashDimensionsVerified":true,"persisted":"CI primary log and transient scratch only for current48a; older bc3/690/aab frames in Git are not current48a frames"},{"scenario":"journey","diagnostic":"baseline","label":"company-a-created","sha256":"e5c2374826d9944cf8a86df5a0e94af8d7ba3746a36606ea76c7abf9b2644fd0","bytes":132205,"width":1365,"height":900,"decodedSignatureBytesHashDimensionsVerified":true,"persisted":"CI primary log and transient scratch only for current48a; older bc3/690/aab frames in Git are not current48a frames"},{"scenario":"journey","diagnostic":"baseline","label":"company-b-isolated","sha256":"e6287ca5441c85c466014cdf7e1b2807e7b1b889276680284307606ae4c88c5c","bytes":132545,"width":1365,"height":900,"decodedSignatureBytesHashDimensionsVerified":true,"persisted":"CI primary log and transient scratch only for current48a; older bc3/690/aab frames in Git are not current48a frames"},{"scenario":"journey","diagnostic":"log-only","label":"login","sha256":"75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc","bytes":33686,"width":1365,"height":900,"decodedSignatureBytesHashDimensionsVerified":true,"persisted":"CI primary log and transient scratch only for current48a; older bc3/690/aab frames in Git are not current48a frames"},{"scenario":"journey","diagnostic":"log-only","label":"failure","sha256":"7917640bbb00d6c401ec6131f490d6bf3ad6add84e9722754302e9a42ede14ef","bytes":138865,"width":1365,"height":900,"decodedSignatureBytesHashDimensionsVerified":true,"persisted":"CI primary log and transient scratch only for current48a; older bc3/690/aab frames in Git are not current48a frames"},{"scenario":"journey","diagnostic":"native-only","label":"login","sha256":"75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc","bytes":33686,"width":1365,"height":900,"decodedSignatureBytesHashDimensionsVerified":true,"persisted":"CI primary log and transient scratch only for current48a; older bc3/690/aab frames in Git are not current48a frames"},{"scenario":"journey","diagnostic":"native-only","label":"company-a-created","sha256":"6dee33ea8bf70c1b794aa81300f87604a855f01494cd2bb5c3733ba5e354aaa5","bytes":132862,"width":1365,"height":900,"decodedSignatureBytesHashDimensionsVerified":true,"persisted":"CI primary log and transient scratch only for current48a; older bc3/690/aab frames in Git are not current48a frames"},{"scenario":"journey","diagnostic":"native-only","label":"failure","sha256":"f47120b8d1bf981ca753770f8300006a632296066be2c823ee0d4b0144d2e01a","bytes":139576,"width":1365,"height":900,"decodedSignatureBytesHashDimensionsVerified":true,"persisted":"CI primary log and transient scratch only for current48a; older bc3/690/aab frames in Git are not current48a frames"},{"scenario":"journey","diagnostic":"instrumented","label":"login","sha256":"75fd151d88601595f208804f64845c07201286708d5eee7e50fe72acb19425dc","bytes":33686,"width":1365,"height":900,"decodedSignatureBytesHashDimensionsVerified":true,"persisted":"CI primary log and transient scratch only for current48a; older bc3/690/aab frames in Git are not current48a frames"},{"scenario":"journey","diagnostic":"instrumented","label":"company-a-created","sha256":"3d9a31bf572c61bd35e7f4bb3e3f90ee52fe26389a038a8db874c87a1ac2c1e7","bytes":132075,"width":1365,"height":900,"decodedSignatureBytesHashDimensionsVerified":true,"persisted":"CI primary log and transient scratch only for current48a; older bc3/690/aab frames in Git are not current48a frames"},{"scenario":"journey","diagnostic":"instrumented","label":"company-b-isolated","sha256":"20ac3cab93884f7d87c7c9753ca718ca1f3a0409f22f08a02a09b3335cd4f6b3","bytes":133004,"width":1365,"height":900,"decodedSignatureBytesHashDimensionsVerified":true,"persisted":"CI primary log and transient scratch only for current48a; older bc3/690/aab frames in Git are not current48a frames"}],"interpretation":{"validNativeReduction":"Same ERR_ABORTED/canceled=true reproduced for all12 direct native concurrent GETs after single GET200 in a real HTTP200 loopback secure document with zero app scripts. React/Next app scripts are not necessary for THIS diagnostic reproduction.","limits":"CDP Fetch egress guard, passive observer and Log remain in this control; this does not prove a vendor bug, API/CORS defect, ordinary uninstrumented-client failure or production incident. No original causal fix established.","permission":"Earlier bc3 synthetic-document LNA denial is a different failure class. No LNA grant/override/security disable was used. PermissionBlock is a reported policy field, not proof of an actual permission denial; current failed requests have no LocalNetworkAccessPermissionDenied corsErrorStatus.","overall":"Four cases PASS, four FAIL (one startup, one native concurrent, two app journeys); no PASS substitutes for the overall FAIL. No reruns, no merge, main unchanged; area10 technical-only,12 areas pending."}}
```
