# Continuação CDP canônica — prova e integração preservada

## Entrega funcional — continuação CDP canônica observável, 2026-10-20T08:54Z

Requisito: diagnóstico de transporte confiável, preservando fail-closed, segurança e gates. Área 11/validação browser mais próxima; NENHUM novo aceite integral.
Base revalidada main d961990d1c55ccc50be094772371c10ca4ff7c1c, árvore ac75e13b68dcfb7a09fe31c5284f511a6ec64fd6. PR existente 558, antigo HEAD a8ba96517135f1f1d3851f78b001f8fee39ce447. Integração NORMAL sem force e sem PR duplicada; pais ordenados [antigo558,MAIN].
Correção somente no observador canônico scripts/web-browser-journey-e2e.cjs: rejeição do comando mantém mensagem genérica e código inteiro seguro, sem protocolo bruto; catch de continuação preserva primeiro networkViolation e falha fechado; apenas um diagnóstico com command/method allowlisted e code numérico/null, limitado independentemente do volume. Não registra URL, query, requestId, token, cabeçalho, corpo, stack ou mensagem bruta. Sem retry.
15 testes novos executam cdp()+callback REAIS via VM, WebSocket/clock explicitamente simulados. Baseline exata MAIN 4 PASS/11 FAIL → 15 PASS; suíte Web COMPLETA 194 PASS UTC e America/Sao_Paulo [146 MAIN + 33 testes históricos 558 + 15 novos], fail/skip/cancel 0, Node 24.19.0. Mutantes apenas LOCAIS: retirar failclosed 8 PASS/7 FAIL; retirar limite de log 14 PASS/1 FAIL. Não publicados/não contagens CI. node --check e bash -n PASS.
33 testes antigos 558 e probe/lifecycle helpers BYTE EXATOS. Matriz histórica 12 controles (8 minimal +4 journey), falha sticky e canônico obrigatório preservados BYTE EXATOS; não reruns substitutivos. Canonical mantém startup 592 e suas duas flags de recursos; probe antigo preservado BYTE EXATO, sem importar novas flags indiscriminadamente. API/SQL/RLS/ACL/mobile/deps/lockfiles/workflows inalterados frente MAIN.
CI completo obrigatório PENDENTE deste novo commit, sem atribuir 194 locais ao CI. Total unit esperado 1735=[194 Web1041mobile486API3CLI11monitor], NÃO executado ainda neste candidato. Resultado final será registrado na metadata do PR e consolidado nos originais somente na próxima entrega funcional, sem commit artificial de status.
APK N/A integral: todos os insumos mobile, deps/lockfiles/build entrypoint Expo→Gradle/smoke/workflow standalone idênticos a MAIN; filtros standalone excluem paths Web/scripts browser/docs. Nenhum APK novo/emprestado/Gradle ou install novo alegado.
Limites: não Chrome real/local, não prova de net::ERR_ABORTED/RCA/CORS/API/vendor/framework/startup fix/navegação/produção. Incidente anterior58539389545431 falhou no STARTUP antes DevTools/CDP/Page, não causado/provado por este gap; não rerun desse SHA. Controles Fetch guard/CORS/CDP/sandbox/LNA/15s/deadlines/asserts intocados.
Aceite técnico/funcional interno delegado ao assistente, não espera humana/CONTINUAR; 1 área técnica interna (10), 12 pendentes; não percentual de código. Sem produção, custos, provedores, PSP, credenciais, contratos, dinheiro real, root/grants/RLSdisable. Sem Activity manual.
Próximo: observar own fullCI deste HEAD, inspecionar checkout real/árvore e diagnóstico redigido; não merge se red. Em bloqueio passar imediatamente a prova independente, sem relaxar matriz nem repetir produto para verde.

## Manifesto de preservação FULL

```json
[
  {
    "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
    "oldSha": "3257dc2e4cd781901f40b5a837c5e4048d13190e",
    "mainSha": "ca68ed1d3ccf65a7eba3a44db5221d1c4b335f2a",
    "oldChars": 710831,
    "mainChars": 1675110,
    "commonPrefixChars": 535266,
    "tailChars": 1139844,
    "newChars": 1854000,
    "literalTailStart": 710931
  },
  {
    "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
    "oldSha": "be799ad1b9477fecb62aab26026de567f8566093",
    "mainSha": "a711a3e772b17f865140180ef3f3c500b354c7eb",
    "oldChars": 1043401,
    "mainChars": 2007684,
    "commonPrefixChars": 867836,
    "tailChars": 1139848,
    "newChars": 2186574,
    "literalTailStart": 1043501
  },
  {
    "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
    "oldSha": "cca29c01f12861916c3024820a9b9f9d8fbc37fa",
    "mainSha": "ce6b3d3fcc04342c4ae80c62bc81880cc75aeca1",
    "oldChars": 701083,
    "mainChars": 1665322,
    "commonPrefixChars": 525518,
    "tailChars": 1139804,
    "newChars": 1844212,
    "literalTailStart": 701183
  },
  {
    "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
    "oldSha": "c27071aea37d0fe6a75cf2ce038a9aa06c29f576",
    "mainSha": "ff763bbe2dd6521058f4681c1a262e975e446e07",
    "oldChars": 695888,
    "mainChars": 1660155,
    "commonPrefixChars": 520323,
    "tailChars": 1139832,
    "newChars": 1839045,
    "literalTailStart": 695988
  },
  {
    "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
    "oldSha": "0643b25f7013a4b8d7c154042bc4fe1b1f9f554d",
    "mainSha": "2d332200b7072075c37f065f1f4ba3cbc1068ae1",
    "oldChars": 697014,
    "mainChars": 1661213,
    "commonPrefixChars": 521449,
    "tailChars": 1139764,
    "newChars": 1840103,
    "literalTailStart": 697114
  },
  {
    "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
    "oldSha": "d8c6194ef89a80f42db54905b2810e2ed77656d6",
    "mainSha": "80c5d64d2a2d604d7e2a1eeb833f3fc993a5f29a",
    "oldChars": 293679,
    "mainChars": 1257958,
    "commonPrefixChars": 118114,
    "tailChars": 1139844,
    "newChars": 1436848,
    "literalTailStart": 293779
  }
]
```

## PR558 anterior FULL, literal

## FINAL CURRENT — 2026-10-18 — FAILURE, DRAFT, NO MERGE

HEAD a8ba96517135f1f1d3851f78b001f8fee39ce447/tree7e8aecfa397f52e2528e596001e512de39396c1c/orderedparents[8793af936a72f260af60894740145c720a5ba649,main3e098cd51cd2fd84f21e144a600a814a2cb1a150]. Main3e unchanged; ahead13behind0/mergebase3e. ZEROready/merge/post/rerun/cancel.

OWNCI[39095060696](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39095060696)/job117579674681attempt1 COMPLETEFAILURE,ZEROretry.1388=[178Web,765mobile,431API,3CLI,11monitor]unitPASS/fail-skip-cancel0/typesbuildmobileexportmigrationrunner2xprivacyPASS. New8actualcollector/wiringtests ok26..33 at03:52:57.6984Z..7023Z. HTTP/browserFAIL/PostSetupNodeSKIP/laterProductionTruthNOTexecuted. ECR initialized normally here, no quota workaround/global-resolution claim.

ACTUALcheckoutfae18570e8f563f49a7bea9de72954e4d81f99e4 at03:51:24.6359052Z SYNTHETICorderedparents[main3e,a8ba965]/tree7e8equalcandidate, NOTliteralHEAD; Gitparents/tree independently confirmed.

13actualChrome155.0.8059.39/protocol1.3/JS15.5.35.20/revision@3ff7ac5a9224be9156d7f8703a06e22890aafd34;12newlifecycle reports. Controls below are distinct cases, not retries:

| Case | Concurrent | Serial |
|---|---|---|
| Minimal baseline | PASS27JSON+persist | FAILparallel-after |
| Minimal log-only | PASS27JSON+persist | PASS27JSON+persist |
| Minimal native-only | FAILparallel-before | PASS27JSON+persist |
| Minimal instrumented | PASS27JSON+persist | FAILparallel-before |

All8minimal realHTTP200loopback/secure/scripts0/noSW-cache. UIbaselinePASS9checks+5refresh+5newdocumentreload/logoutPOST201/bearer401/otherSAMEidentity200/Bisolated03:54:39.3435853Z. UIlog-only5refresh+5reloadPASS then Bsignin201/12GETabort/loaded-dashboardFAIL03:55:02.4579302Z, finalBisolation/revokedbearerNOTcompleted. UInative-onlyteamPOST201→createdteamrenderFAIL03:55:24.2702797Z. UIinstrumentedcreatejobPASS/refresh1PASS→refresh2waveFAIL03:55:46.4982326Z. ThreefailedUIs correctlyshow12unavailable/—, notfalsezero.

UNCHANGEDcurrentMAINjourney ownPASS8checks03:55:49.7620711Z; actualONEteams503CONSUMED+11distinctGET200/unknown—/HUMANrefresh12NEWGET200/team1/zeroextraPOSTPASS03:55:49.1143674Z. Fullreload/logoutPOST201/browserbearer401/otherSAMEidentity200/Bisolated measured in THIScase only. Total13cases7PASS6FAIL, stickyexit1; success never erases failures. No laterProductionTruth.

NEW temporal evidence: sixfailedwaves×12GET=72ERR_ABORTED/canceledtrue/noCORSblockedReason. EACH12requests+12failures correlate toONEframe/loader; receive-sequence intervals86..119/27..65/29..65/863..893/110..137/259..285 respectively (minimalbaseline-serial/native-concurrent/instrumented-serial;journeylog/native/instrumented). ZERO recorded frameNav/detach/loading/contextdestroy-clear/lifecycle events WITHIN those intervals; all12reports dropped/evicted0. This weakens ONLY the observed-transition-during-wave hypothesis, NOT proof browser/framework/network cancellation absent or causal/vendor/API/CORS/React fix. No redirects/sessionmismatch;5failedcaseszero continuationerrors;minimalinstrumentedserial3OPTIONS-32602. OldrootUNRESOLVED. No security/flags/CDPFetchguard/CORS/sandbox/LNA/deadline weakening.

8new+25oldLOCAL33PASS; scope instrumentation gap, not productRED. Reverse-substitution oldprobeFULLBYTEEXACT. ReviewALL68PRpathsSHA/modesexact:10newUTF8fullblobreadback+58samecontent-addressedsourceblobs;1148of1165oldblobs/1164of1171mainblobsunchanged. ExistingmainproductoutsideHTTPwrapper same.252protectedinputs+freshcanonicalexpo-mobileprebuild→Gradlegraphsame→APKN/AINTEGRAL;NOAPK558built/borrowed. Sixold558prefixes/full571divergenttails preservedINPLACE. NoteWEB_LIFECYCLE_REQUEST_CORRELATION_2026-10-18.md contains fullprior55860388chars+5718528782chars. Memory>1MiB: contentsAPIempty was rejected; fetch_blob fullreadbackEXACT.

19OWNdesktopPNGs primaryjob117579674681 independentlysignature/SHA/bytes1365x900/Pillowverified; no visual/native/Gitasset claim. Fullmetadata+base64 at browser-lifecycle-local/558-a8-own-captures.json; traces/IDs/analysis in558-a8-own-traces.json, ownprovenance. Preserve nextFUNCTIONAL only, noimage/statuscommit. GitprepPENDINGisHISTORY, consolidate final nextFUNCTIONAL. Onlyarea10technicalinternalaccepted12pending.

Moved to independentLOCALnotifications audit: actualNotificationsScreen.read timer abort-only;5newactualhandler models baseline1PASS4FAIL(auth/fetch/JSON/finalauth hang). Deadlineleavesready/pending1; onlydependencyresolutionclearserror/pending0;0POST(auth),1otherwise/noautoretry. NOTpublished/notpart178/765/CI/HTTP/native. Nextsafe fix must settle uncertainty without stale timers/finally deleting a newer same-key operation; audit per-operation ownership before unlocking. No productpatch yet. No newcost/provider/production/credentials/automation.

---

## COMPLETE HISTORICAL BODY — 879 and earlier; labels below are NOT current result

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


## FINAL585 anterior FULL, literal

# Interesse em trabalhos — integração funcional com a main atual

DRAFT, NÃO MERGED. Candidato `6440dc8c530cc024816e4532c5eb039ba2953c38`, árvore `3cbbfcbfd52e0b96eeb9c06cabb4d401b775c860`, pais ordenados `[f3e3d9f1b43968edebc888a1a86866ff0ced0163,d961990d1c55ccc50be094772371c10ca4ff7c1c]`. CI completo e APK próprios PENDENTES. Não ready/merge enquanto não forem SUCCESS; depois exigir pós-merge reais.

## INTEREST_MAIN_INTEGRATION — 2026-10-20T07:52Z

Entrega FUNCIONAL no MESMO PR585: integração normal de MAINd961990d1c55ccc50be094772371c10ca4ff7c1c/treeac75e13b68dcfb7a09fe31c5284f511a6ec64fd6 no antigo585f3e3d9f1b43968edebc888a1a86866ff0ced0163/tree76d9db2ab29fcc2d2f1951c0cdb1d51ab8c8fd7e. Pais ordenados[old585,MAIN], semforce/novaPR. Traz matching570/DatabaseService575/contratos586587/Web590/Chrome592 jáMAIN; NÃO introduz nova mudança registry/flags/workflows. Ganhos584DRAFT produto/testes NÃO copiados. ALL11openPRfiles lidos, só585 altera Trabalhos e teste interesse.
Requisito áreas3/5/1/11/13: interesse deixa ENVIANDO/pending e aposenta apenas seus recursos no prazo15s mesmo se auth/fetch/JSON/authfinal não resolvem; oldtimer/finally não limpam NEWop MESMOjob/MESMOepoch, foco/owner/contexto antigos não autorizamPOST/ACK, filtros/draft mantidos. FonteMAINa0f7fab92434aa1d7e8d8fb22e8766991b5f04d4 atual ainda8254chars; candidato5856b1fee44c7365ae796064d2eeed6f68b30585906 mantém8818chars BYTE EXATOS old585. FULLreverse6regiões reconstrói8254MAINchars BYTEEXATO (diff564chars); oldmanifest5regiões é agrupamento histórico, não redução de revisão.
Mapjob→controller criado APÓS4refs originais; owns por geração+controller, current tambémAuthorization original+!aborted; finishownMap/Set/pendingANTESunlock e idempotente. Prazo invalida snapshot+mensagem UNKNOWN somente operação atual; retry exige atualização humana original. Nenhumtimer disparaGET/POST extra/novaidempotênciadurável/barreiraservidor/cancelamentoSQL. Helperjobs54d0814ace6e91565e0fa9c8722ea734594b015f/sessioncontext8a23f577cf222016694d6995822b632c0a71434f/JSXstyles/headers/bodylessPOST/UUIDACK/query/category/15s/focusread/sessionqueue/API SQLRLSACL/React19.1.4RN0.81.6/depslock/workflows/buildsmoke intactos.
APIJobsController185be30435f34dc270461fefce284a37ac7a3b5e FULL+5oldcanonicaljobs-input44ad107487d02053c88e3951a68cf71c9d9b45ae FULLlidos: identidade→perfil→jobUUID→marketplaceopen→UPSERTinteresse guarda statusconfirmed original; GETinterest autenticado por identidade. Nenhum contrato ampliado, autoPOST ou permissão nova. APItest/runtime não alterados. Não inventar BUGbackend.
28regressões EXISTENTES009ed1bd4db47b102223474e16bcdbbac5bd00f0(10218chars) BYTE EXATAS reutilizadas com SHA/escopo, NÃO28novas criadas nesta integração. Reexecuçãoagora MAIN11PASS17FAIL→candidate28GREEN;62focal=[28interest+28primary-read-deadline+6jobs]PASS;FULL1069mobileLOCALUTC/SP=[1041MAIN+28old585]PASS,0fail-skip-cancel,Node24.19.0.163mobileGitblobs:162scratchBYTEEXATOS incluindoúnicoAPPdelta+LOCALtsconfigadaptado semExpoextendsNÃOPUBLICADO; newtestBYTEEXATO. Nenhuma cópia draft568/584/outros testglob. Fixture préJSX/hooks/auth/fetchJSON/timers explícitos; SAMEepochnewSnapshot é adversarialinstalado, nãoGET/RNrender. Não SecureStore/native/HTTPPG/RLSenforcement/heap/servercancellationproof. TypecheckLOCAL/depsNestExpo ausentes, CI obrigatório.
NOVOHEAD CI/APK PENDENTES nesta preparação:1715=[146Web1069mobile486API3CLI11monitor] somenteESPERADO, nãoexecutado. APK APLICÁVEL mobilealterado; onlyfullownCISUCCESS+ownAPKSUCCESS+freshMAIN/base/head/fullpathsmodos antesready/expectedSHAmergeONCE; depoisCI/APKreaisnomerge. Nãoemprestarold585APK/CI nemGanhos584GREENparcial. ZEROready/merge/rerun/cancelatual, nunca rerunproduto para verde.
Bloqueio anterior584PRhttps://github.com/dbdanielbaracho/MLIVRETRABALHO/pull/584 HEAD0c310c2e0ad80956145e178c24a75000ad3d27a6 DRAFTNOTMERGED:CI39382863493/job118495747555a1FAILbrowser06:55:33.1345101Zdepois1705unitPASS+typesbuildexportmigrationprivacyPASS; SINTÉTICOdc636e6a6652d89fba1cd68a4ec1c497a9147492[MAINd961,0c310]/tree85b8451443bbbaf089b787e8a13751d46793ce41igualcandidate. ControlledONEteams503+11GET/human12NEWGETrecoveryPASS06:55:13.0183745Z e reloadposterior; POSTsignoutsem201ACK/OPTIONS204+POSTERR_ABORTED/canceledtrue/corsnull/71GET200+1controlled503/ZEROGETfailed. UIlogin≠revogaçãoremota/B/full8/ProductionTruth. ZEROretryproduto, não repetir0c310CI. Nova frente independente játesteLOCALvalidadaagora intégrada semcopiarGanhos.
584OWNAPK39382863528/job118495747839a1SUCCESS actualdc636syntheticmesmaárvore;checkout06:51:49.3259163Z/build07:02:53.6451624Z/install07:04:13.3732926Z/DEVICE_SMOKE_OK07:04:25.7591250ZsemMetro. Artifact12246428732expiresNov3T07:04:27Z ZIP28913515SHAce7c599c211c51ca953191ae07c7d2ec2be45cf296b29452a3ee536572f9c8e9/individualAPK66162644SHA5da37428a6fd4e446f7bd74495ec36d2d04a0ed110ac73175cde257ee15bd6f7/SUMSBUILDINFOdc636metrofalse/release/build07:02:54Z/manifestbaselineea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480. Receiptbytes/hash REALvalidadoexecuçãoanterior desteSHA; APIartefactdigest/status/expiryrevalidadosagoraEXATOS, NÃO novo download/build585. ZIP≠APK/installlaunch≠forms/SecureStore/físico/VisualTruth/prod. Mainstandalone último MEDIDO literal e06b570POST39216769289, nãoAPKMAINd961 nem585candidate.
MAINCI39356876276a1FAILbrowser12GETabortapós47GET200+controlled503história;592startupflagsnãoresolveramroot. NenhumnovoChrome585 nesta preparação; Root558UNRESOLVED, falha tambémPOSTsignout584 ePOSTjobs568, não exclusivamente12GET/nãoAPI/CORS/vendor/frameworkcausa demonstrada/nãoemprestar5580Nav. NenhumCDPFetchguardCORSsandboxLNAdeadlineassert/securitychange. MainregistryDockerHub17/Chrome2flags jáMAIN590592, não duplicar572nem bypass.
6FULL585originaisPREFIXINPLACE+FULLMAINmissingtailappenddesdecommonline; manifesto na nota reconstrói FULLMAINBYTEEXATO, MAINnãoéprefixcontíguoquandodivergiu. FULL585FINAL26798 inclCORREÇÃOold570(ONLYcalendarvalidator+2tests,nãotenantACK) eFULL584FINAL20439+28testsource/163manifest preservadosINTEGRAISna nova nota. Terminalhistórias old5851531CIunitPASS/browserFAIL+APKSUCCESS jábodyFULL, nãoatribuirnovoHEAD. PrepPENDINGregistrohistórico, resultados terminais PRmetadata+NEXTFUNCTIONALconsolidação, semstatus/selfref/image/Activitycommit.
Aceite interno delegado expressamente pelo usuário jáFULL noMAINtail dos6originais, nãoaguardarhumano/CONTINUAR. Área10standalone apenasTÉCNICAINTERNO;12semaceiteintegral,não%code/nenhumaceiteporcontagem. Requisito interesse seaproxima doaceite, área3/5 inteira exige demais fluxos e evidências completas. Externos215219220224228 separados; semprodução/serviçoscustos/credenciais/PSP/providers/contratos/dinheiroreal/root/grants/RLSdisable. Únicarotina/scheduleinalterados/nenhumanovaautomação.
Próximo: publicarFFnormalexpectedOLD585, ownCI/APKcheckoutGit/tree/bytes; seALLSUCCESSfreshdiffrevieweexpectedSHAmergeONCE+POSTreais. SeCI/browserinfra bloqueia, registrarprimária e avançar imediatamente outroitemindependente da matriz, nãoencalharmesmolog nem inventarcommits.


Todos9pathsSHA/mode100644 revisados;7novosUTF8FULLcreate/fetch_blobreadbackEXATOS. FULLbody anterior58526798+FINAL58420439+manifestos+28testsource preservados na nota `docs/evidencias/INTEREST_MAIN_INTEGRATION_2026-10-20.md`116109chars. Os6originais não foram substituídos por resumos. Resultados terminais serão anexados aqui, consolidando Git só na próxima entrega funcional.


## Auditoria independente de observabilidade CDP — LOCAL, 2026-10-20T07:56Z

10NOVOS modelos PASSUTC/SP Node24.19.0 executam callbackmessageREAL extraído FULLcanonicalMAIN scripts/web-browser-journey-e2e.cjs35691ecf5261c2295f185b4436a06c8c7ecfb26e versus FULLprobeexistente558 scripts/web-browser-transport-probe.cjsdd4e145cce98e40e18b23be256bc86fcd00389b4. SHA Git de ambos verificado antes executar. Fixtures EXPLÍCITAS ws/CDP resolve/reject:2observers×GET/POST×ACK/reject=8+2external-guard=10. Canonical.catch(()=>{}) de continuação rejeitada silencia erro; probe558 JÁ reporta intercept-error/código numérico e networkViolation, sem retry. BOTH mantêm Fetch.failRequest BlockedByClient paraoriginexterna. Snapshot não inclui token/query privada nemmensagemErrorinjetada. Nenhum código produto/CI/workflow/source558alterado; NÃOimplementação realCDP/Fetch/Chromium/CORS/navegação/Network.loadingFailed/RCAproof. Chrome indisponívellocal. Não inferir que erroCDPreal ocorreu nos logs585/584/main; isso NÃO é causa comprovada dos12GET ou POSTabort. TestPASS caracteriza observabilidade atual, não conserto/rootfix.
Dedupe:558 já tem continuationdispatcher/failclosederror e lifecycletrace passivo, portanto NÃO duplicarhelper/probe/trace nem declarar ausênciaglobal. Lacuna específica é callbackcanonicalMAIN que descarta a rejeição. Próximo diagnóstico funcional possível APÓS freshnorm/558scope: preservarFetchguard/deadlines/asserts e adicionar somente erro de continuação redigido/bounded/failclosed no canonical, com regressão do callback real; normalintegração noPRexistente apropriado seescopo confirmado, não novaPRduplicada/não bypass nem prometerrootresolvido.
Scope deste audit NÃO parte28/1069/1715 nemCI/browserprod/nativePASS. Fonte integral abaixo; reprodução requer arquivos RAW dos2Gitblobs acima nos nomes canonical-browser.cjs/probe-browser.cjs (ambos jápermanentes noGit, não depender scratch). Modelo local salvointerest-integration-k8sHma/cdp-continuation-observer-audit.test.mjs.

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
// Actual message-observer source; explicit ws/CDP/rejection fixtures. No browser,
// network, Fetch continuation implementation, CORS, navigation or root-cause proof.
const sources={
 canonical:fs.readFileSync(new URL('./canonical-browser.cjs',import.meta.url),'utf8'),
 probe:fs.readFileSync(new URL('./probe-browser.cjs',import.meta.url),'utf8')
},hashes={canonical:'35691ecf5261c2295f185b4436a06c8c7ecfb26e',probe:'dd4e145cce98e40e18b23be256bc86fcd00389b4'};
for(const [name,source]of Object.entries(sources))assert.equal(createHash('sha1').update('blob '+Buffer.byteLength(source)+'\0').update(source).digest('hex'),hashes[name]);
function observer(name,reject=false){
 const source=sources[name],start=source.indexOf("ws.addEventListener('message',event=>{"),end=source.indexOf('\n });',start);
 assert.ok(start>=0&&end>start);const actual=source.slice(start,end+'\n });'.length);
 let callback;const calls=[],fixtureError=Object.assign(new Error('PRIVATE-FIXTURE-ERROR'),{code:-32000});
 const send=async(method,params)=>{calls.push({method,params});if(reject)throw fixtureError;return{};};
 const ws={addEventListener:(event,fn)=>{assert.equal(event,'message');callback=fn;}};
 const body="let networkViolation;const pending=new Map(),responses=[],captures=[],networkEvents=[],requestMethods=new Map(),documentResponses=[],apiPostRequests=[],requestMetadata=new Map(),readFailures=[];let teamReadFault=null;\n"+actual+"\nreturn()=>({networkViolation,networkEvents});";
 const snapshot=new Function('ws','api','web','cdp','dispatchContinuation','lifecycleTrace','sessionId','continuation',body)(ws,new URL('http://127.0.0.1:3002'),new URL('http://127.0.0.1:3001'),send,send,{observe(){}},'fixture-session','concurrent');
 return {calls,snapshot,pause:(method,url='http://127.0.0.1:3002/v1/company/dashboard')=>callback({data:JSON.stringify({sessionId:'fixture-session',method:'Fetch.requestPaused',params:{requestId:'fixture-request',networkId:'fixture-network',request:{url,method,headers:{authorization:'Bearer PRIVATE-FIXTURE-TOKEN'}}}})})};
}
for(const name of ['canonical','probe'])for(const method of ['GET','POST'])for(const rejected of [false,true])test(name+' actual observer '+method+' '+(rejected?'rejected':'acknowledged')+' continuation metadata behavior',async()=>{
 const h=observer(name,rejected);h.pause(method,method==='POST'?'http://127.0.0.1:3002/v1/auth/signout':undefined);await new Promise(setImmediate);
 assert.equal(h.calls.length,1);assert.deepEqual(h.calls[0],{method:'Fetch.continueRequest',params:{requestId:'fixture-request'}});
 const state=h.snapshot();assert.equal(state.networkViolation,name==='probe'&&rejected?'CDP guarded request continuation failed':undefined);
 if(name==='probe'){const done=state.networkEvents.filter(x=>x.event===(rejected?'intercept-error':'intercept-ack'));assert.equal(done.length,1);if(rejected)assert.equal(done[0].code,-32000);}
 else assert.deepEqual(state.networkEvents,[]);
 const json=JSON.stringify(state);assert.equal(json.includes('PRIVATE-FIXTURE-TOKEN'),false);assert.equal(json.includes('PRIVATE-FIXTURE-ERROR'),false);
});
for(const name of ['canonical','probe'])test(name+' actual observer retains external-request guard and never retries',async()=>{
 const h=observer(name);h.pause('GET','https://blocked.invalid/path?private=PRIVATE-FIXTURE-QUERY');await new Promise(setImmediate);
 assert.equal(h.calls.length,1);assert.deepEqual(h.calls[0],{method:'Fetch.failRequest',params:{requestId:'fixture-request',errorReason:'BlockedByClient'}});
 assert.equal(h.snapshot().networkViolation,'Non-local application request blocked: https://blocked.invalid');assert.equal(JSON.stringify(h.snapshot()).includes('PRIVATE-FIXTURE-QUERY'),false);
});

```


## CI próprio FINAL — 2026-10-20T07:58Z
CI39389545431/job118517454907 attempt1 COMPLETEDFAILURE/ZEROretry. Actualcheckoutbdc249fad6b452e8a6288a7bae7d57617f3e8a25 primário07:53:53.5241574Z SINTÉTICO orderedparents[MAINd961990d1c55ccc50be094772371c10ca4ff7c1c,585candidate6440dc8c530cc024816e4532c5eb039ba2953c38]/tree3cbbfcbfd52e0b96eeb9c06cabb4d401b775c860 IGUALcandidata Gitconfirmed,NÃOliteralHEAD.
1715unit=[146Web1069mobile486API3CLI11monitor]PASS/fail-skip-cancel0/typecheckbuildmobileexport/migrationrunner2x/privacyretentionlegalholdPASS. HTTP/browserFAIL/laterProductionTruthNOTexecuted/PostSetupNodeSKIP. FalhaESPECÍFICA é STARTUP antesWebSocket/DevTools/Page/CDPjourney, NÃO12GETabortnemsignoutPOST nestaexecução. FixtureAPIauthdeA/B ocorreu, masNÃOsigninaçõesdoDOM; nãoatribuirisolamento/8browserjourney/Chromeversion/ProductionTruthposteriores.
07:57:17.7629511Z WEB_BROWSER_STARTUP_DIAGNOSTIC:timeoutMs15000/elapsedMs15001/binarygoogle-chrome/pid13813/spawnObservedtrue/exitObservedfalse/exitCodenull/signalCodenull/killedfalse/spawnErrornull/stderr965bytes/stdout0/endpointstderrstdoutfalse/DevToolsActivePortausente; stderrflags sandboxfalse/fatalfalse/errortrue/dbustrue.07:57:17.7632496Z Browserstartup timeout. Isso NÃOprovaDBuscausa/processovivoindefinidamente/sandboxausente; não aumentar15s/flags/asserts/bypass e não rerun6440para verde. CIredproíbemerge585mesmoAPKSUCCESS;ZEROready/merge/rerun/cancel.
APK39389545522/job118517455354attempt1 aindaBUILD, nãoPASS/N/A neste reciboparcial. Recibo próprioexigiractualcheckoutGitparents/tree/REALZIPvsAPK/SHA256SUMS/BUILDINFO/DEVICE_SMOKE; sememprestarf3e3/584.

## Avanço independente APÓS bloqueio: extensão protocolo CDP real — LOCALsomente
Mais2modelosGET/POSTcompõemfunçãoCDP()REAL canonical com callbackmessageREAL, não só send-rejectionstub. FakeWebSocket explícito devolve errorprotocolcode-32000/fixtureMessage:1Fetch.continueRequest/comIDsessionexatos, pendingconsumido/timerclear, networkViolationcontinuaundefined noactualcatchcanonical. Total12LOCALPASSUTC/SP (10anteriores+2novos),zero fail-skip-cancel. NenhumChrome/network/browserstartup/CORS/Navigation/actualERR_ABORTEDproof/causaprova; nãoatribuir esta hipótese ao startupFAILatual, que nem conectouCDP. Nenhumruntime/558script/canonicalprodpatch/publicação/testCI/NÃOparte28/1069/1715. AuditPASS caracteriza BLINDSPOTexistente,nãotestequeaprovaoufixaproduto; futura regressão deve exigir diagnóstico/failclosed, não congelar o silêncio atual como desejado.
Dedupe558probe jáfazfailclosed+intercept-error, nãoimplementarprobe/helperparalelo. Próximofuncionaldiagnóstico seescopoconfirmado: noPR558existente integrarMAINsemforce, preservarstartup592/guardsCORSFetchCDP/deadlinesasserts, tornar continuaçãoCANONICALrejeitada observávelcomcamposnuméricos/enumredigidosbounded e failclosed, usando teste realdoobserver. NÃOprovarrootatécapturaChromerealcomerrocorrelacionado; nãobrowserretryparaverde. Outrosrequisitosindependentessepreferirintegraçãofuncionalnãoespeculativa.
FonteFULL12models abaixo supersede apenasrunner10 anterior, que ficaFULLcomo história; raw2scriptspermanentes nosGitSHAsverificados35691ecf5261c2295f185b4436a06c8c7ecfb26e e dd4e145cce98e40e18b23be256bc86fcd00389b4. A reprodução faz cópia RAWpara canonical-browser.cjs/probe-browser.cjs no mesmo diretório.
```js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
// Actual message-observer source; explicit ws/CDP/rejection fixtures. No browser,
// network, Fetch continuation implementation, CORS, navigation or root-cause proof.
const sources={
 canonical:fs.readFileSync(new URL('./canonical-browser.cjs',import.meta.url),'utf8'),
 probe:fs.readFileSync(new URL('./probe-browser.cjs',import.meta.url),'utf8')
},hashes={canonical:'35691ecf5261c2295f185b4436a06c8c7ecfb26e',probe:'dd4e145cce98e40e18b23be256bc86fcd00389b4'};
for(const [name,source]of Object.entries(sources))assert.equal(createHash('sha1').update('blob '+Buffer.byteLength(source)+'\0').update(source).digest('hex'),hashes[name]);
function observer(name,reject=false){
 const source=sources[name],start=source.indexOf("ws.addEventListener('message',event=>{"),end=source.indexOf('\n });',start);
 assert.ok(start>=0&&end>start);const actual=source.slice(start,end+'\n });'.length);
 let callback;const calls=[],fixtureError=Object.assign(new Error('PRIVATE-FIXTURE-ERROR'),{code:-32000});
 const send=async(method,params)=>{calls.push({method,params});if(reject)throw fixtureError;return{};};
 const ws={addEventListener:(event,fn)=>{assert.equal(event,'message');callback=fn;}};
 const body="let networkViolation;const pending=new Map(),responses=[],captures=[],networkEvents=[],requestMethods=new Map(),documentResponses=[],apiPostRequests=[],requestMetadata=new Map(),readFailures=[];let teamReadFault=null;\n"+actual+"\nreturn()=>({networkViolation,networkEvents});";
 const snapshot=new Function('ws','api','web','cdp','dispatchContinuation','lifecycleTrace','sessionId','continuation',body)(ws,new URL('http://127.0.0.1:3002'),new URL('http://127.0.0.1:3001'),send,send,{observe(){}},'fixture-session','concurrent');
 return {calls,snapshot,pause:(method,url='http://127.0.0.1:3002/v1/company/dashboard')=>callback({data:JSON.stringify({sessionId:'fixture-session',method:'Fetch.requestPaused',params:{requestId:'fixture-request',networkId:'fixture-network',request:{url,method,headers:{authorization:'Bearer PRIVATE-FIXTURE-TOKEN'}}}})})};
}
for(const name of ['canonical','probe'])for(const method of ['GET','POST'])for(const rejected of [false,true])test(name+' actual observer '+method+' '+(rejected?'rejected':'acknowledged')+' continuation metadata behavior',async()=>{
 const h=observer(name,rejected);h.pause(method,method==='POST'?'http://127.0.0.1:3002/v1/auth/signout':undefined);await new Promise(setImmediate);
 assert.equal(h.calls.length,1);assert.deepEqual(h.calls[0],{method:'Fetch.continueRequest',params:{requestId:'fixture-request'}});
 const state=h.snapshot();assert.equal(state.networkViolation,name==='probe'&&rejected?'CDP guarded request continuation failed':undefined);
 if(name==='probe'){const done=state.networkEvents.filter(x=>x.event===(rejected?'intercept-error':'intercept-ack'));assert.equal(done.length,1);if(rejected)assert.equal(done[0].code,-32000);}
 else assert.deepEqual(state.networkEvents,[]);
 const json=JSON.stringify(state);assert.equal(json.includes('PRIVATE-FIXTURE-TOKEN'),false);assert.equal(json.includes('PRIVATE-FIXTURE-ERROR'),false);
});

for(const method of ['GET','POST'])test('canonical actual CDP error response is consumed without surfacing '+method+' continuation failure',async()=>{
 const source=sources.canonical,cs=source.indexOf('function cdp(method,'),ce=source.indexOf('\nasync function evaluate',cs),ms=source.indexOf("ws.addEventListener('message',event=>{"),me=source.indexOf('\n });',ms);
 assert.ok(cs>=0&&ce>cs&&ms>=0&&me>ms);
 let callback;const sent=[],sessionId='fixture-session',ws={addEventListener:(name,fn)=>{assert.equal(name,'message');callback=fn;},send:text=>{const command=JSON.parse(text);sent.push(command);queueMicrotask(()=>callback({data:JSON.stringify({id:command.id,error:{code:-32000,message:'PRIVATE-PROTOCOL-FIXTURE'}})}));}};
 const actualCDP=source.slice(cs,ce),actualObserver=source.slice(ms,me+'\n });'.length);
 const body="let networkViolation,commandId=0;const pending=new Map(),responses=[],captures=[],networkEvents=[],requestMethods=new Map(),documentResponses=[],apiPostRequests=[],requestMetadata=new Map(),readFailures=[];let teamReadFault=null;\n"+actualCDP+"\n"+actualObserver+"\nreturn()=>({networkViolation,pending:pending.size,commandId});";
 const state=new Function('ws','api','web','sessionId',body)(ws,new URL('http://127.0.0.1:3002'),new URL('http://127.0.0.1:3001'),sessionId);
 callback({data:JSON.stringify({sessionId,method:'Fetch.requestPaused',params:{requestId:'fixture-id',request:{url:method==='GET'?'http://127.0.0.1:3002/v1/company/dashboard':'http://127.0.0.1:3002/v1/auth/signout',method}}})});
 await new Promise(setImmediate);
 assert.deepEqual(sent,[{id:1,method:'Fetch.continueRequest',params:{requestId:'fixture-id'},sessionId}]);
 assert.deepEqual(state(),{networkViolation:undefined,pending:0,commandId:1});
});

for(const name of ['canonical','probe'])test(name+' actual observer retains external-request guard and never retries',async()=>{
 const h=observer(name);h.pause('GET','https://blocked.invalid/path?private=PRIVATE-FIXTURE-QUERY');await new Promise(setImmediate);
 assert.equal(h.calls.length,1);assert.deepEqual(h.calls[0],{method:'Fetch.failRequest',params:{requestId:'fixture-request',errorReason:'BlockedByClient'}});
 assert.equal(h.snapshot().networkViolation,'Non-local application request blocked: https://blocked.invalid');assert.equal(JSON.stringify(h.snapshot()).includes('PRIVATE-FIXTURE-QUERY'),false);
});

```


## APK próprio FINAL verificado — 2026-10-20T08:04Z
Run39389545522/job118517455354attempt1 COMPLETEDSUCCESS/ZEROretry. Actualcheckoutbdc249fad6b452e8a6288a7bae7d57617f3e8a25 primário07:53:40.8302841Z SINTÉTICO orderedparents[MAINd961,585HEAD6440]/tree3cbbfcbfd52e0b96eeb9c06cabb4d401b775c860 Gitconfirmed IGUALcandidata,NÃOliteralHEAD. BuildSUCCESS08:02:15.1915259Z/installSuccess08:03:31.7857486Z/DEVICE_SMOKE_OK08:03:44.2492329ZsemMetro.
Artifact12249870272expires2026-11-03T08:03:45Z REALdownloadZIP28913553bytes SHA2562672803b184036b832c32d36b785cbb02b5f7a6bb6a73788201f583f70e5a3a8=APIhash/tamanho. APKindividual66162560bytes SHA2561532b25b35acbd87748893f707cf6cd16f85bcffce593408e027d060a5c8f59b=SHA256SUMS. BUILD_INFOliteralbdc249/release/fixedpackage/metrofalse/build2026-10-20T08:02:15Z. AndroidManifest.xmlSHA256ea3ab2fd942be3c401ac98b107dea8bb54e854a13139f5bafcb7be1afdda1480igualbaseline(min24target36poridentidade,nãoextraçãoSDKnova). Downloadnormalexit0/hash/tamanhoAPIvalidado; nenhuma parcial aceita. ZIP≠APK/installlaunch≠Trabalhosform/RNrender/SecureStore/nativequeue/físico/VisualTruth/produção; nãoAPKMAINd961nemHEADliteral6440.
CI1715unitPASS inclui28interestok311..338 primários07:55:37.4215395Z..4245367Z; o outrotestehelperinterestok394 não pertenceaos28novosdoPR. 28 são regressõesEXISTENTESreutilizadas, não criadas nesta rodada. CIcompletoFAILstartupChrome07:57:17.7632496Z continuaGATEBLOCKED, sem atribuir12GETfail/ChromeversionondeWebSocketnemconectou. ZEROready/merge/rerun/cancel;POSTCI/APK inexistentes porqueNÃOhouvemerge. MAINfreshd961inalterada/585DRAFTHEAD6440. Nenhumaáreanovarecebeaceiteintegral.
Próximaentrega: revalidarfreshGit/normas/matriz/dupes; preferirlacunafuncionaloudiagnósticamínimacomprova. FULL558shell2bc65cb412013add901893966832b228e150a14b lido: 12controlesdistintosminimal/journey×4modes×concurrent/serial(sóminimalserial), mantémFAILEDmesmooutroPASS e currentmaincanonicalnofim. NÃOcopiarfullmatrixindiscriminadamentenumafixmínimocanonical/nãoremoverassertsnemsubstituircanonical; reavaliarscoporuntimeantesintegrar558. Probe558errofailclosedjáexiste, nãohelperduplicado.
SeoptarcanonicalCDPdiagnóstico: erro-protocoloreal/comando ecallback foram exercitadospor2dos12LOCALmodels, massemChromereal/RCA. Futura regressão exigirvisibilidade/failclosed/primeiroerropreservado/redação/bounds; NÃOcongelarausênciadeerrocomoestadonormativo. Nãoimportar código/logsmassivossemrevisão,nãoreduzirasserts/Fetchguard/CDP/CORS/sandbox/LNA/deadlines,nãoautorizarretrydo585startupou584signoutpara verde.
Fecho: entregaFUNCIONALlegítima6440 integraMAINe28regressões/62focal1069LOCALUTCSP+1715canonicalunit+APKpróprioverificado;12NEWprovaslocaisindependentesCDP apósbloqueio preservadasacima. Semestagnação, semprodução/custos/providersPSP/credenciais/contratos/dinheiroreal/root/grants/RLSdisable.6normsFULLappendnocommitfuncional;finalmetadataFULLconsolidaSÓnextFUNCTIONAL,nãocommitstatus/selfref/image/Activity.


## Regressões novas FULL

```ts
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

// Actual canonical cdp() and message observer. WebSocket/clock are explicit fixtures, NOT Chrome.
const source=fs.readFileSync(new URL('../../../scripts/web-browser-journey-e2e.cjs',import.meta.url),'utf8');
const commandStart=source.indexOf('function cdp(method,'),commandEnd=source.indexOf('\nasync function evaluate',commandStart);
const observerStart=source.indexOf("ws.addEventListener('message',event=>{"),observerEnd=source.indexOf('\n });',observerStart);
assert.ok(commandStart>=0&&commandEnd>commandStart&&observerStart>=0&&observerEnd>observerStart);
function fixture(){
 const commands:any[]=[],logs:string[]=[],timers=new Map<number,()=>void>();let callback:(event:any)=>void=()=>{},nextTimer=0;
 const context=vm.createContext({
  URL,Promise,Number,Error,JSON,Set,Map,
  api:new URL('http://127.0.0.1:3002'),web:new URL('http://127.0.0.1:3001'),
  sessionId:'session-fixture',commandId:0,networkViolation:undefined,continuationFailureReported:false,
  pending:new Map(),responses:[],captures:[],requestMethods:new Map(),apiPostRequests:[],teamReadFault:null,requestMetadata:new Map(),readFailures:[],
  setTimeout:(fn:()=>void,ms:number)=>{assert.equal(ms,15000);timers.set(++nextTimer,fn);return nextTimer;},
  clearTimeout:(id:number)=>timers.delete(id),
  console:{error:(...parts:unknown[])=>logs.push(parts.join(' '))},
  ws:{send:(data:string)=>commands.push(JSON.parse(data)),addEventListener:(name:string,fn:(event:any)=>void)=>{assert.equal(name,'message');callback=fn;}},
 });
 vm.runInContext(source.slice(commandStart,commandEnd)+'\n'+source.slice(observerStart,observerEnd+'\n });'.length),context);
 const receive=(message:object)=>callback({data:JSON.stringify(message)});
 return{context,commands,logs,timers,receive,
  pause(method='GET',url='http://127.0.0.1:3002/v1/company/jobs?secret=PRIVATE_FIXTURE'){
   receive({method:'Fetch.requestPaused',params:{requestId:'PRIVATE_REQUEST_ID',request:{method,url,headers:{authorization:'PRIVATE_FIXTURE'},postData:'PRIVATE_FIXTURE'}}});
  },
  reply(command:any,error?:object){receive({id:command.id,...(error?{error}:{result:{}})});},
  violation:()=>vm.runInContext('networkViolation',context),
  pending:()=>vm.runInContext('pending.size',context),
 };
}
const settle=async()=>{await Promise.resolve();await Promise.resolve();};
const diagnostic=(h:ReturnType<typeof fixture>)=>{
 assert.equal(h.logs.length,1);
 assert.ok(h.logs[0].startsWith('WEB_BROWSER_CDP_CONTINUATION_FAILURE '));
 return JSON.parse(h.logs[0].slice('WEB_BROWSER_CDP_CONTINUATION_FAILURE '.length));
};
for(const method of ['GET','POST']){
 test('canonical guarded '+method+' success preserves one continuation and leaves no failure',async()=>{
  const h=fixture();h.pause(method);assert.equal(h.commands.length,1);
  assert.equal(h.commands[0].method,'Fetch.continueRequest');assert.equal(h.commands[0].sessionId,'session-fixture');
  assert.equal(h.commands[0].params.requestId,'PRIVATE_REQUEST_ID');h.reply(h.commands[0]);await settle();
  assert.equal(h.violation(),undefined);assert.deepEqual(h.logs,[]);assert.equal(h.pending(),0);assert.equal(h.timers.size,0);
 });
 test('canonical guarded '+method+' protocol rejection fails closed with sanitized code and no retry',async()=>{
  const h=fixture();h.pause(method);h.reply(h.commands[0],{code:-32000,message:'PRIVATE_FIXTURE token=PRIVATE_FIXTURE',data:{headers:'PRIVATE_FIXTURE'}});await settle();
  assert.equal(h.violation(),'CDP guarded request continuation failed');
  assert.deepEqual(diagnostic(h),{command:'Fetch.continueRequest',method,code:-32000});
  assert.ok(!JSON.stringify(h.logs).includes('PRIVATE'));assert.equal(h.commands.length,1);assert.equal(h.pending(),0);assert.equal(h.timers.size,0);
 });
}
for(const code of [null,'PRIVATE_FIXTURE',1.5,Number.MAX_SAFE_INTEGER+1]){
 test('untrusted protocol code is reduced to null: '+String(code),async()=>{
  const h=fixture();h.pause('PRIVATE_FIXTURE');h.reply(h.commands[0],{code,message:'PRIVATE_FIXTURE'});await settle();
  assert.equal(h.violation(),'CDP guarded request continuation failed');
  assert.deepEqual(diagnostic(h),{command:'Fetch.continueRequest',method:'[other]',code:null});
 });
}
test('canonical continuation deadline stays 15000ms and timeout fails closed without retry',async()=>{
 const h=fixture();h.pause();assert.equal(h.timers.size,1);
 for(const callback of [...h.timers.values()])callback();await settle();
 assert.equal(h.violation(),'CDP guarded request continuation failed');
 assert.deepEqual(diagnostic(h),{command:'Fetch.continueRequest',method:'GET',code:null});assert.equal(h.pending(),0);assert.equal(h.commands.length,1);
});
test('first primary network violation survives a subsequent continuation rejection',async()=>{
 const h=fixture();vm.runInContext('networkViolation="Existing primary failure"',h.context);
 h.pause();h.reply(h.commands[0],{code:-1,message:'PRIVATE_FIXTURE'});await settle();
 assert.equal(h.violation(),'Existing primary failure');assert.equal(diagnostic(h).code,-1);
});
test('error storm emits one bounded first diagnostic while every pending command drains',async()=>{
 const h=fixture();for(let i=0;i<64;i++)h.pause(i===0?'POST':'GET');
 for(const [i,c] of h.commands.entries())h.reply(c,{code:-32000-i,message:'PRIVATE_FIXTURE'.repeat(10000)});await settle();
 assert.deepEqual(diagnostic(h),{command:'Fetch.continueRequest',method:'POST',code:-32000});
 assert.ok(h.logs[0].length<200);assert.equal(h.pending(),0);assert.equal(h.timers.size,0);assert.equal(h.commands.length,64);
});
for(const reject of [false,true]){
 test('external origin remains blocked without continue or retry, rejection='+reject,async()=>{
  const h=fixture();h.pause('POST','https://outside.invalid/v1/write?secret=PRIVATE_FIXTURE');
  assert.equal(h.commands[0].method,'Fetch.failRequest');assert.equal(h.commands[0].params.errorReason,'BlockedByClient');
  const primary=h.violation();assert.match(primary,/Non-local application request blocked/);
  h.reply(h.commands[0],reject?{code:-32000,message:'PRIVATE_FIXTURE'}:undefined);await settle();
  assert.equal(h.violation(),primary);assert.equal(h.commands.length,1);assert.equal(h.pending(),0);
  if(reject)assert.deepEqual(diagnostic(h),{command:'Fetch.failRequest',method:'POST',code:-32000});else assert.deepEqual(h.logs,[]);
 });
}
test('controlled one-read fault remains held for explicit fulfillment, not continued or silently failed',async()=>{
 const h=fixture();vm.runInContext('teamReadFault={}',h.context);
 h.pause('GET','http://127.0.0.1:3002/v1/company/teams');await settle();
 assert.equal(h.commands.length,0);assert.equal(h.violation(),undefined);assert.deepEqual(h.logs,[]);
 assert.equal(vm.runInContext('teamReadFault.requestId',h.context),'PRIVATE_REQUEST_ID');
});
test('actual cdp rejects generic error with numeric code only and consumes its pending timer',async()=>{
 const h=fixture(),promise=vm.runInContext('cdp("Fixture.command",{},false)',h.context) as Promise<unknown>;
 const failed=assert.rejects(promise,(error:any)=>error.message==='CDP command failed'&&error.code===-32001&&!JSON.stringify(error).includes('PRIVATE'));
 h.reply(h.commands[0],{code:-32001,message:'PRIVATE_FIXTURE',data:'PRIVATE_FIXTURE'});await failed;
 assert.equal(h.commands[0].sessionId,undefined);assert.equal(h.pending(),0);assert.equal(h.timers.size,0);assert.deepEqual(h.logs,[]);
});

```

## Mutantes locais (não publicados)

```json
[
  {
    "label": "no-failclosed",
    "result": "ℹ tests 15\nℹ pass 8\nℹ fail 7\nℹ cancelled 0\nℹ skipped 0\n"
  },
  {
    "label": "unbounded-log",
    "result": "ℹ tests 15\nℹ pass 14\nℹ fail 1\nℹ cancelled 0\nℹ skipped 0\n"
  }
]
```
