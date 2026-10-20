# Resultado do controle de build e retirada segura


## Experimento Chrome: integridade verificada, sandbox incompatível, configuração retirada — 2026-10-20T18:19Z

A execução CI39472689204/job118800555968a1 no HEADb391731c6b0c6e1e997905ce9d3d215d48bef582/tree66309b5bbf921432352a8c2016783a9d3ac3ff26 terminouFAILURE, ZEROretry.1796units[212/1069/501/3/11]PASS/typebuildexportmigrationprivacyPASS; NOVAjornadaAUTHENTICATION_ACCEPTANCE_JOURNEY_PASS18:15:17.3256297Z e3rollbackHTTPPGPASS17.7708065/8050253/8386343Z mantiveramprovas completas deauth/convite/tenant/sessão semnativeOS. NÃO fullCIverde/merge/aceite.

ProveniênciaREAL18:14:42.1481732Z: ChromeForTesting155.0.8059.84/revisionmetadata1697595, GCSgeneration1792022877437857; ZIP199014491bytes/SHA256cf0f049892dea22e6a6db26d47ed0d7776b7158edcbec4634086633df8bafcbc; executávelSHA256b866a2964538c825538c454de4867973b926650da57ec12dc3328807d768247b;publisherMD5match/ZIPCRC/version--versionexata. NÃOchecksumSHA256vendorinventado/nãoassinaturaforteMD5.

IMPEDIMENTO provado: todos12matrixcases+canônico encerraramANTESDevTools/CDP/Page,exitSIGABRT/flagsstderr sandbox=true,fatal=true,error=true,dbus=false/3120stderrbytes/0stdout/endpointsnone/portfileabsente. Primeiro18:15:55.4948575Zelapsed273ms,últimocanônico18:16:03.3648605Zelapsed305ms. MATRIX1 03.3771340Z/ProductionTruthNÃOexecuted. NÃOtimeout15sconsumido/12GETabort/versionBrowser.getVersion/protocol/runtimeAppArmor-específico/causadosabortosanteriores.NãoalegarChrome.84resolve/.39causa. Falha depermission/sandbox éSTOP: não root/grants/chmodsetuid/policy/flagsnosandbox/timeout/bypass.

RETIRADA FUNCIONAL justificada pela incompatibilidade real: restaurar .github/workflows/ci.ymlBYTEEXATOdeMAIN0fc(a95a58b317af082fc677fe62fd61d305fc41bb6d), removendoSÓstepinstalador;removerSÓnossoarquivoexperimental scripts/install-ci-chrome.cjsfd7bfd913ed8d94bd90e6d9dde9e5c7d6815cce7 doárvorecandidata. Ele permaneceRECUPERÁVELnoGitb391 eFULLnaevidênciaAUTHENTICATION_BROWSER_BUILD_CONTROL_2026-10-20.md7368f31d26c7040ce091f31b3cfd5db0c4e967b7. Nãoexcluirdocumento/histórico/branch;semfallbacksilencioso: configuraçãoanteriorsegurarestauradaexplicitamente. Canonical/probe/helper/12matrix/gates/asserts/CDPFetchguardCORSsandboxLNAflagsdeadlinesinteiramenteinalterados. NãoéretentativadoSHA b391nemdeclaração de rootresolvido;novoSHArealdewithdrawalrequerCInovocompleto.

Área2permanece PENDENTE atéfullown+postliterais ecritérioscompletos;somente10Androidstandaloneinternoaceito/12pendentes. Novo pacotefinal mantémjornadaintegradareal+13guards+3rollbacksemalterarqualquerproduto/API/mobile/migração/deps. APK N/Aintegral:insumosnative/mobile/standalone/depslockexatos eCIworkflowrestauradoMAIN. RegistrarresultadofinalnoPR;nãoinventarPASSnemrerunmesmoSHAparaverde. Próximo: CIfinalsegurodoscriptdeauth ePOSTreal; sefalharbrowser, manterdraft e bloquearaceite semmicrotests/fallbacksegurança. Semgastos/prod/PSP/pentest/aparelhofísico.


## Marcador real de integridade

```text
2026-10-20T18:14:42.1481732Z CHROME_PINNED_ASSET_VERIFIED {"version":"155.0.8059.84","revision":"1697595","bucket":"chrome-for-testing-public","object":"155.0.8059.84/linux64/chrome-linux64.zip","generation":"1792022877437857","bytes":199014491,"archiveSha256":"cf0f049892dea22e6a6db26d47ed0d7776b7158edcbec4634086633df8bafcbc","binarySha256":"b866a2964538c825538c454de4867973b926650da57ec12dc3328807d768247b","publisherMd5Matched":true,"zipIntegrity":true,"versionOutput":"Google Chrome for Testing 155.0.8059.84","sandboxBypass":false,"systemChromeFallback":false,"production":false}
```

## Todos os13diagnósticosreaisdesandbox — semrawstderr/PII

```text
2026-10-20T18:15:55.4948575Z WEB_BROWSER_STARTUP_DIAGNOSTIC {"scenario":"minimal","diagnostic":"baseline","continuation":"concurrent","phase":"startup","timeoutMs":15000,"elapsedMs":273,"binary":"chrome","pid":13982,"spawnObserved":true,"exitObserved":true,"exitCode":null,"signalCode":"SIGABRT","killed":false,"spawnErrorCode":null,"stderrBytes":3120,"stdoutBytes":0,"stderrEndpointSeen":false,"stdoutEndpointSeen":false,"portFile":{"exists":false,"valid":false},"stderrFlags":{"sandbox":true,"fatal":true,"error":true,"dbus":false}}
2026-10-20T18:15:56.1616468Z WEB_BROWSER_STARTUP_DIAGNOSTIC {"scenario":"minimal","diagnostic":"baseline","continuation":"serial","phase":"startup","timeoutMs":15000,"elapsedMs":252,"binary":"chrome","pid":14020,"spawnObserved":true,"exitObserved":true,"exitCode":null,"signalCode":"SIGABRT","killed":false,"spawnErrorCode":null,"stderrBytes":3120,"stdoutBytes":0,"stderrEndpointSeen":false,"stdoutEndpointSeen":false,"portFile":{"exists":false,"valid":false},"stderrFlags":{"sandbox":true,"fatal":true,"error":true,"dbus":false}}
2026-10-20T18:15:56.7978609Z WEB_BROWSER_STARTUP_DIAGNOSTIC {"scenario":"minimal","diagnostic":"log-only","continuation":"concurrent","phase":"startup","timeoutMs":15000,"elapsedMs":245,"binary":"chrome","pid":14058,"spawnObserved":true,"exitObserved":true,"exitCode":null,"signalCode":"SIGABRT","killed":false,"spawnErrorCode":null,"stderrBytes":3120,"stdoutBytes":0,"stderrEndpointSeen":false,"stdoutEndpointSeen":false,"portFile":{"exists":false,"valid":false},"stderrFlags":{"sandbox":true,"fatal":true,"error":true,"dbus":false}}
2026-10-20T18:15:57.4513122Z WEB_BROWSER_STARTUP_DIAGNOSTIC {"scenario":"minimal","diagnostic":"log-only","continuation":"serial","phase":"startup","timeoutMs":15000,"elapsedMs":248,"binary":"chrome","pid":14096,"spawnObserved":true,"exitObserved":true,"exitCode":null,"signalCode":"SIGABRT","killed":false,"spawnErrorCode":null,"stderrBytes":3120,"stdoutBytes":0,"stderrEndpointSeen":false,"stdoutEndpointSeen":false,"portFile":{"exists":false,"valid":false},"stderrFlags":{"sandbox":true,"fatal":true,"error":true,"dbus":false}}
2026-10-20T18:15:58.0936668Z WEB_BROWSER_STARTUP_DIAGNOSTIC {"scenario":"minimal","diagnostic":"native-only","continuation":"concurrent","phase":"startup","timeoutMs":15000,"elapsedMs":254,"binary":"chrome","pid":14134,"spawnObserved":true,"exitObserved":true,"exitCode":null,"signalCode":"SIGABRT","killed":false,"spawnErrorCode":null,"stderrBytes":3120,"stdoutBytes":0,"stderrEndpointSeen":false,"stdoutEndpointSeen":false,"portFile":{"exists":false,"valid":false},"stderrFlags":{"sandbox":true,"fatal":true,"error":true,"dbus":false}}
2026-10-20T18:15:58.7527525Z WEB_BROWSER_STARTUP_DIAGNOSTIC {"scenario":"minimal","diagnostic":"native-only","continuation":"serial","phase":"startup","timeoutMs":15000,"elapsedMs":242,"binary":"chrome","pid":14199,"spawnObserved":true,"exitObserved":true,"exitCode":null,"signalCode":"SIGABRT","killed":false,"spawnErrorCode":null,"stderrBytes":3120,"stdoutBytes":0,"stderrEndpointSeen":false,"stdoutEndpointSeen":false,"portFile":{"exists":false,"valid":false},"stderrFlags":{"sandbox":true,"fatal":true,"error":true,"dbus":false}}
2026-10-20T18:15:59.3870613Z WEB_BROWSER_STARTUP_DIAGNOSTIC {"scenario":"minimal","diagnostic":"instrumented","continuation":"concurrent","phase":"startup","timeoutMs":15000,"elapsedMs":248,"binary":"chrome","pid":14237,"spawnObserved":true,"exitObserved":true,"exitCode":null,"signalCode":"SIGABRT","killed":false,"spawnErrorCode":null,"stderrBytes":3120,"stdoutBytes":0,"stderrEndpointSeen":false,"stdoutEndpointSeen":false,"portFile":{"exists":false,"valid":false},"stderrFlags":{"sandbox":true,"fatal":true,"error":true,"dbus":false}}
2026-10-20T18:16:00.0296166Z WEB_BROWSER_STARTUP_DIAGNOSTIC {"scenario":"minimal","diagnostic":"instrumented","continuation":"serial","phase":"startup","timeoutMs":15000,"elapsedMs":250,"binary":"chrome","pid":14276,"spawnObserved":true,"exitObserved":true,"exitCode":null,"signalCode":"SIGABRT","killed":false,"spawnErrorCode":null,"stderrBytes":3120,"stdoutBytes":0,"stderrEndpointSeen":false,"stdoutEndpointSeen":false,"portFile":{"exists":false,"valid":false},"stderrFlags":{"sandbox":true,"fatal":true,"error":true,"dbus":false}}
2026-10-20T18:16:00.6737076Z WEB_BROWSER_STARTUP_DIAGNOSTIC {"scenario":"journey","diagnostic":"baseline","continuation":"concurrent","phase":"startup","timeoutMs":15000,"elapsedMs":250,"binary":"chrome","pid":14314,"spawnObserved":true,"exitObserved":true,"exitCode":null,"signalCode":"SIGABRT","killed":false,"spawnErrorCode":null,"stderrBytes":3120,"stdoutBytes":0,"stderrEndpointSeen":false,"stdoutEndpointSeen":false,"portFile":{"exists":false,"valid":false},"stderrFlags":{"sandbox":true,"fatal":true,"error":true,"dbus":false}}
2026-10-20T18:16:01.3198775Z WEB_BROWSER_STARTUP_DIAGNOSTIC {"scenario":"journey","diagnostic":"log-only","continuation":"concurrent","phase":"startup","timeoutMs":15000,"elapsedMs":257,"binary":"chrome","pid":14352,"spawnObserved":true,"exitObserved":true,"exitCode":null,"signalCode":"SIGABRT","killed":false,"spawnErrorCode":null,"stderrBytes":3120,"stdoutBytes":0,"stderrEndpointSeen":false,"stdoutEndpointSeen":false,"portFile":{"exists":false,"valid":false},"stderrFlags":{"sandbox":true,"fatal":true,"error":true,"dbus":false}}
2026-10-20T18:16:01.9786799Z WEB_BROWSER_STARTUP_DIAGNOSTIC {"scenario":"journey","diagnostic":"native-only","continuation":"concurrent","phase":"startup","timeoutMs":15000,"elapsedMs":261,"binary":"chrome","pid":14396,"spawnObserved":true,"exitObserved":true,"exitCode":null,"signalCode":"SIGABRT","killed":false,"spawnErrorCode":null,"stderrBytes":3120,"stdoutBytes":0,"stderrEndpointSeen":false,"stdoutEndpointSeen":false,"portFile":{"exists":false,"valid":false},"stderrFlags":{"sandbox":true,"fatal":true,"error":true,"dbus":false}}
2026-10-20T18:16:02.6403566Z WEB_BROWSER_STARTUP_DIAGNOSTIC {"scenario":"journey","diagnostic":"instrumented","continuation":"concurrent","phase":"startup","timeoutMs":15000,"elapsedMs":264,"binary":"chrome","pid":14444,"spawnObserved":true,"exitObserved":true,"exitCode":null,"signalCode":"SIGABRT","killed":false,"spawnErrorCode":null,"stderrBytes":3120,"stdoutBytes":0,"stderrEndpointSeen":false,"stdoutEndpointSeen":false,"portFile":{"exists":false,"valid":false},"stderrFlags":{"sandbox":true,"fatal":true,"error":true,"dbus":false}}
2026-10-20T18:16:03.3648605Z WEB_BROWSER_STARTUP_DIAGNOSTIC {"phase":"startup","timeoutMs":15000,"elapsedMs":305,"binary":"chrome","pid":14482,"spawnObserved":true,"exitObserved":true,"exitCode":null,"signalCode":"SIGABRT","killed":false,"spawnErrorCode":null,"stderrBytes":3120,"stdoutBytes":0,"stderrEndpointSeen":false,"stdoutEndpointSeen":false,"portFile":{"exists":false,"valid":false},"stderrFlags":{"sandbox":true,"fatal":true,"error":true,"dbus":false}}
```

## FULL PR571 anterior — histórico preservado

## Pinned browser control for whole authentication acceptance — 2026-10-20T18:12Z

Current HEAD b391731c6b0c6e1e997905ce9d3d215d48bef582, tree 66309b5bbf921432352a8c2016783a9d3ac3ff26, parent9c9f9414f13cfc037d803ec5867053d5afcb7e20. Same PR, no re-run of failed SHA/no new PR/no ready/merge. ALL prior API/mobile/auth/invitation sources and tests byte-identical. Nine generatedUTF8blobs FULL fetched/readback exact;1289 parent blobs unchanged outside nine targets. APK N/A: no native/mobile/standalone build/deps changes; only web-browser setup step inserted into CI.



## Controle indispensável de versão do navegador — jornada2 — 2026-10-20T18:11Z

Resultado real do pacote anterior9c9f9414f13cfc037d803ec5867053d5afcb7e20/treebb563a5268ffee741f3b8b8c6fccd73b4643d66a: CI39471104340/job118795064230a1FAILbrowser/ZEROretry, checkout0e11799e60b5492383980d891ec22661837e4f62 sintético[MAIN0fc,9c9f]/mesmaárvore.1796unitPASS[212Web1069mobile501API3CLI11monitor]/0fail-skip-cancel/typebuildexportmigrationprivacyPASS. AUTHENTICATION_ACCEPTANCE_JOURNEY_PASS real18:04:19.9187248Z: cadastroempresa/profissional+normalização/duplicata/invalidsemPOST/senhaerrada/owner/membership/duastenantsporclienteAPI/conviteemailbinding/singleuse/revogado/expirado/renovado/sessãoexpirada/logoutantigonãolimpaNOVOlogin/revogaçãoremota401+clearverificado.3rollbackreais renovação18:04:20.2852561Z/aceitação20.3073432Z/promoção20.3593092Z comsnapshots+ACL/policiesintactos ecleanupownedPASS. APIcliente viahelpersreais,storageINMEMORYexplicito,NÃO RN/SecureStore/aparelhofísico.

NÃO éfullCI/aceite:matrix7PASS5FAIL. Falhasminimal/baseline/SERIAL18:05:04.3271458Z;minimal/native-only/concurrent07.1857473Z;minimal/native-only/SERIAL08.1200162Z todasparallel-beforeantesmutação;journey/native-only39.6576940Z e journey/instrumented18:06:02.7346956Zloadeddashboard. CANÔNICO8PASS18:06:05.0477416Z/MATRIX1 05.0507218Z/laterProductionTruthNÃOexecuted. Chrome155.0.8059.39/rev3ff7ac5a9224be9156d7f8703a06e22890aafd34/imagem20261012.334.1. Nenhummerge/ready/rerun9c9f. Área2aindapendente,12áreaspendentes; nenhumaaprovaçãoporisolatedPASS.

Hipótese controlável, NÃO RCA: own596SUCCESS usouChrome155.0.8059.84/rev5869fe313571d75152b77813cf0a4ee26a4e6df0; POST596eown571FAIL usaram.39 eoutraimagem. NãoatribuircausaaChromeversão/API/CORS/vendor/framework;antesdecompararremoverbuildskewsemrelaxarasserts.

NovaentregaMESMOPR571: scripts/install-ci-chrome.cjs +umstepCI antesHTTP. FixaChromeForTesting155.0.8059.84/revision1697595 conformeíndiceOFICIALGoogleChromeLabs timestamp2026-10-20T10:18:26.692Z (https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json eREADME https://github.com/GoogleChromeLabs/chrome-for-testing). Código exigeCI/linux64/pathsRUNNER_TEMP+GITHUB_ENVpróprios;indexindividualVERSION+revision+URLexatos;GCSmetadata bucket/object/generation/size/md5;downloadHTTPSsemredirectsemretryboundgeneration;bytescap350MiB/contentsize/header,MD5publishercoincidente eZIPCRC+paths;SHA256DOARCHIVOEbinárioMEDIDOSsóapósbytesreais;versãoexecutávelexata;entãoCHROME_BIN configuraTODOSprobes+canônico semfallbacksistema. MD5éintegridadetransporteDOpublisher, NÃOassinatura criptográficaforte/checksumSHA256vendorinventado. Nenhumhash/tamanho/instalação localalegado;guardas podemfalharemCIeentãonãoexecutambrowser. Nenhumroot/grant/chmodsetuid/apt/sandboxdisable/flags/timeouts/CDPFetchguardCORSLNA/assertchanges. Quaisquerfaltasdepermission/sandboxSÃOstopconditions,nãobypass. Produto/authAPI/mobile e13oldtest+novajornadainalterados.

PENDENTE novoCI completo+bytesprovenance/12matrix/canonical/ProductionTruth ePOSTliteralantesdeaceite. Contagem1796SÓesperada nesteNOVOSHA;PASS9c9f nãoemprestado. APKN/Ainsumosmobile/native/build/standaloneinalterados;novostepCIéSÓbrowser. #572encerradosemmerge comhistória/branchpreservadas: deltaúnicopostgres17jáMAIN#590, nãoáreaaceita. Próximopasso:examinarCHROME_PINNED_ASSET_VERIFIEDouFAILUREreal; nãorerunproduto9c9fparaverde. Nãoaceitarárea2atéfullown+post ecritérioscompletos. Semcusto/produção/PSP/pentest/physical.


---

## FULL preceding #571 preparation — preserved history

## Pacote de aceite interno: cadastro/autenticação — 2026-10-20T18:03Z

HEAD `9c9f9414f13cfc037d803ec5867053d5afcb7e20`, tree `bb563a5268ffee741f3b8b8c6fccd73b4643d66a`, normal integration parents [old571 `85e9c992b6e7a1568b8ea865e43da63477c5f3a0`, MAIN `0fc45026d217db4ff9ac1c229fb4db52045424e5`]. Same existing PR, ZERO new PR/force/rerun/ready/merge.

User priority: whole acceptance journeys, not micro-fixes. Area2 currently PENDING; assistant holds delegated internal acceptance authority, no human wait. This package must execute real signup/company+professional, actual mobile signup/signin/company-members/session-transaction core against HTTP/PostgreSQL, owner/memberships, duplicate/invalid/wrong password, email-bound/single-use/revoked/expired/renewed invitations, two-company context and isolated job lists, stale context protection, expired session, remote revocation401 and verified clear/new-login isolation. Explicit in-memory SessionAdapter is NOT native SecureStore/physical/RN-render proof.

Mandatory new marker AUTHENTICATION_ACCEPTANCE_JOURNEY_PASS. Existing13 invitation guard tests and3 real late-write rollback cases are byte-identical; their markers remain mandatory. All prior assertions/browser matrix12/canonical8/ProductionTruth remain mandatory. Runtime API/mobile/migrations/deps/lock/workflows/security/flags/deadlines unchanged. No artificial product bug claimed. No local execution environment: syntax inspection only here; actual CI pending.

Review: ALL11 paths/modes exact;1285 existing MAIN blobs unchanged outside targets,511 non-doc blobs unchanged outside root HTTP script;ALL164 mobile and ALL build/native/deps/workflows exact. APK N/A integrally, not borrowed/no built APK. Root HTTP shell mode100755, others100644.9 newly generated UTF8 blobs fetched FULL and verified byte-identical.6 old571 original documents retained FULL prefixes; missing current MAIN tail appended with exact reconstruction manifest, not misleading contiguous MAIN prefix. Old571 evidence notes/images are already MAIN with identical SHAs, not copied.

Whole criteria crosswalk+FULL596 terminal receipt+FULL old571 body+FULL new script: docs/evidencias/AUTHENTICATION_ACCEPTANCE_JOURNEY_2026-10-20.md. New script35480732d0dab5b205a2f1be21b128ce57f03960, HTTP hook25ccd95be7ff90324b483fc820b47d14036ef3d7. Expected1796 units[212/1069/501/3/11] is NOT executed. Only full ownSUCCESS+fresh review permits merge once; literal postmerge CI still required for area acceptance. Current MAIN #596 POST39468684723FAILbrowser/1783unitPASS/8minimalPASS/twojourneyFAIL/canonical12abort after47GET200+1controlled503; no rerun. No new area accepted. Finance split/negative-balance internal proof still missing, not merely PSP external.

---

## FULL original PR571 body, immutable historical record

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


