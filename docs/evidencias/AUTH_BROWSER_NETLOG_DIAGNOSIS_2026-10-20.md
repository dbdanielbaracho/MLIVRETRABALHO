# Jornada completa de autenticação: evidência interna de rede do Chromium

## Jornada de autenticação — diagnóstico interno do bloqueio de transporte — 2026-10-20 18:52 UTC

Escopo exclusivo MLIVRETRABALHO. Prioridade atual: fechar jornadas/aceites internos, não contar microcorreções. A delegação de aceite pelo usuário permanece; nenhuma confirmação humana é aguardada. Estado: **ÁREA 2 AINDA PENDENTE**, não APROVADO; área10 mantém somente o aceite técnico standalone anteriormente comprovado e as outras12 não recebem aceite por este diagnóstico.

Base revalidada: main `0fc45026d217db4ff9ac1c229fb4db52045424e5`, árvore `7ef3d403383f51c1ba09a0a3cbee9ae4f6783c8d`; PR571 DRAFT HEAD anterior `f0ad85bc534626b44253da3fdc08e8f5008892fd`, árvore `e0e2092b8b949c19727e2823491b234edbb35eeb`. Main POST CI39468684723 e próprio571 CI39473842688 estão FAILURE de browser, não quota, sem nova retentativa. Jornada HTTP/PostgreSQL de autenticação e três rollbacks passaram no próprio571 anterior (18:22:56.3653454Z/56.7119459Z/56.7348488Z/56.8511510Z); isso NÃO empresta CI completo a um novo SHA nem fecha a área.

Nova análise das duas falhas do próprio571 anterior:24GETs cancelados aproximadamente30–40ms após início, depois de pausas/ACKs OPTIONS observados, antes de pausas dos GETs alvos observadas. Exemplos em docs/evidencias/AUTH_BROWSER_NETLOG_DIAGNOSIS_2026-10-20.md. Esta duração não justifica aumentar15s. Não comprova causa CORS/API/React/vendor/framework ou ausência global de navegação. A captura existente expõe ERR_ABORTED, mas não a sequência interna de erro do Chromium.

Entrega vinculada ao impedimento: coletor passivo de categoria Chromium `netlog` via CDP Tracing no probe existente. Sem categoria sensível, arquivo/raw trace, URL arbitrária, query, header, bearer, cookie, corpo ou stack persistidos/emitidos. Só eventos allowlisted/erro numérico, IDs numéricos/hex, relógio próprio e caminhos exatos da fixture loopback; buffer/browser e retenção limitados, perda explícita. Não infere vínculo com IDs CDP nem causa. Start/end browser-level não alteram continuação/guardas Fetch; conclusão/perda/erro não podem virar captura bem-sucedida silenciosa. Quatro verificações de contrato de privacidade/limite/lifecycle/integração acompanham a instrumentação indispensável; NÃO são aceite funcional.

Preservados shell12casos+canônico/MATRIX sticky, callbacks/fluxos de auth, control503/recovery, sandbox/CORS/LNA/Fetchguard/CDP, todos prazos/asserts/flags, API SQL/RLS/ACL/React19.1.4/RN0.81.6/deps/lock/workflows/mobile/build/smoke. Experimento CfT incompatível com sandbox continua retirado; nenhuma política/privilégio/bypass/instalador reativado. APK N/A por identidade integral dos insumos nativos e filtro standalone; não se alega APK novo/literal. Originais permanecem prefixos integrais, apêndice apenas.

Ambiente local de execução indisponível; somente preflight de sintaxe V8/adaptação explícita e exemplo puro com FakeURL, NÃO Node/tsc/Chrome/PG/local canonical PASS. CI completo no novo HEAD é PENDENTE nesta preparação; resultado terminal ficará no PR e será consolidado numa próxima entrega legítima, sem commit de status para verde. Só full ownCI SUCCESS + revisão fresh + gates aplicáveis permitem merge expectedSHA único, depois POST literal completo antes de aceite. Evidência/crosswalk e recibo final anterior preservados em docs/evidencias/AUTH_BROWSER_NETLOG_DIAGNOSIS_2026-10-20.md.

## Lacuna comprovada e experimento

O CI anterior 39473842688/job118804565029/a1 foi consultado integralmente.1796unitPASS; dez controles da matriz passaram, dois falharam; canônico8PASS mas MATRIX1 reteve as falhas. ProductionTruth posterior não executou. Não repetir esse SHA para verde.

Exemplos selecionados, não conclusão causal:
| Caso | GET | Duração host / monotônico | Preflight associado | Observação |
|---|---|---|---|---|
| journey/baseline |15131.74 assignments|41ms /38.328ms|1206E97804D1DBC92BF10FC7B28E097C|OPTIONS pause/ACK; targetGET pause não observado|
| journey/baseline |15131.71 analytics|41ms /39.412ms|CDC2B70195B7A70BD5C85B9784A1B04E|OPTIONS204 allow-origin loopback e headers esperados, depois aborto|
| journey/native-only |15711.112 teams|31ms /29.536ms|7049286DB1BD344D5237489CBC8A6F08|OPTIONS pause/ACK; targetGET pause não observado|
| journey/native-only |15711.109 jobs|33ms /30.543ms|BB90ADAA07CBDE1B5462AD9FD24BC58E|OPTIONS pause/ACK; targetGET pause não observado|

Frames/loaders mantidos dentro dos traces capturados; drops/evictions0, sem generalizar ausência global. Todos24alvos ERR_ABORTED/canceledtrue/sem blockedReason/corsError. Houve falhas anteriores em documento minimal sem React e antes de mutação; não restringir problema ao código de dashboard nem ao cenário pós-mutation.

Hipótese estrita: a sequência interna NetLog pode distinguir cancelamento/restart/preflight de mero sintoma de rede no CDP. É diagnóstico, não reparo antecipado. Tracing no probe pode afetar timing; resultado deve ser interpretado com esse limite e nunca substituir a obrigatoriedade dos12controles originais e canônico intacto. Sem serializar global/retry/fallback/browseroverride. Categoria sensível não habilitada. Exportação process-wide só de metadados allowlisted; relógios não são convertidos/mesclados sem prova.

Fontes primárias consultadas em20/10/2026:
- https://chromium.googlesource.com/chromium/src/+/HEAD/net/log/trace_net_log_observer.cc (blob e94dde5d2d5df1a1ecb65d6e9a771481ad68f7dd): categoria netlog e parâmetros/track internos. HEAD fonte não é garantia de schema exato do binário CI155; validar captura real.
- https://chromium.googlesource.com/chromium/src/+/HEAD/net/log/net_log_event_type_list.h (blob7833769b4262e48e6cc001d94b4aaa8687c7d58f): eventos de cancelamento e net_error inteiro.
- https://chromedevtools.github.io/devtools-protocol/tot/Tracing/ : start/end/dataCollected/tracingComplete/ReportEvents/TraceConfig.
- Regressão pública https://github.com/microsoft/playwright/issues/43242 descreve redirecionamento cross-origin preflighted com Fetch.enable. Nosso trace atual NÃO comprova redirect correspondente, portanto NÃO aplicar seu disable-features, NÃO assumir mesma causa.

## Crosswalk de aceite

| Critério | Implementação/teste real já existente | Estado neste novo candidato |
|---|---|---|
| Signup/login/convite/tenant/expiração/revogação | scripts/authentication-acceptance-e2e.cjs, actual helpers mobile contra HTTP/PG, três SQL faults de convite | script/fixtures preservados; evidência do novo CI ainda pendente |
| Browser Web, transporte, isolamento,503/recovery,logout |12controles + canônico obrigatórios, guards/deadlines intactos | coleta interna adicionada para explicar bloqueio; sem aceite |
| Rastreio de diagnóstico sem vazamento | novo helper +4contratos Node reais em CI | PENDENTE no novo SHA; exemplo puro V8 não substitui Node/Chrome |
| Integração/aceite formal | CI completo próprio + POST literal + matriz/DVT | PENDENTE, não ready/merge com vermelho |
| Android/físico/PSP/pentest | insumos nativos inalterados; provas externas separadas | APK N/A, nenhuma prova externa inventada |

## Manifesto de entradas preservadas
```json
[
  {
    "path": ".github/workflows/ci.yml",
    "sha": "a95a58b317af082fc677fe62fd61d305fc41bb6d",
    "mode": "100644"
  },
  {
    "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
    "sha": "f9d1a3d6d0da62845c1a05be45da0ebf39a3e520",
    "mode": "100644"
  },
  {
    "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
    "sha": "d09b176a75cf19c3bdb08418db0a02d00a8a6c84",
    "mode": "100644"
  },
  {
    "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
    "sha": "d797c3df8c3919cc54f06f1935fda4b92ab701bc",
    "mode": "100644"
  },
  {
    "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
    "sha": "3071d038cb197d7ad2674662654d8ccc6a384f14",
    "mode": "100644"
  },
  {
    "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
    "sha": "324f20cd3bde3ee8938a15a0e20f858b511dad77",
    "mode": "100644"
  },
  {
    "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
    "sha": "66640c3e7aa07e9acbb4211ae7ea5c06cc80717e",
    "mode": "100644"
  },
  {
    "path": "scripts/authentication-acceptance-e2e.cjs",
    "sha": "35480732d0dab5b205a2f1be21b128ce57f03960",
    "mode": "100644"
  },
  {
    "path": "scripts/http-journey-e2e.sh",
    "sha": "25ccd95be7ff90324b483fc820b47d14036ef3d7",
    "mode": "100755"
  },
  {
    "path": "scripts/web-browser-journey-e2e.cjs",
    "sha": "0abdd11f9e91c9d4b3e9b4ca1febb67243d5f698",
    "mode": "100644"
  },
  {
    "path": "scripts/web-browser-transport-probe.cjs",
    "sha": "e77474dff0e3a33336c0440450447ed4d03de60b",
    "mode": "100644"
  }
]
```

## Recibo terminal anterior integral — #571 HEADf0ad
O texto abaixo é histórico, não resultado do novo candidato.
## Safe final authentication package — experiment withdrawn — 2026-10-20T18:20Z

CURRENT HEAD f0ad85bc534626b44253da3fdc08e8f5008892fd/treee0e2092b8b949c19727e2823491b234edbb35eeb/parentb391731c6b0c6e1e997905ce9d3d215d48bef582. Same existing PR; no force/ready/merge/SAME-SHA reruns. Incompatible experimental installer removed (recoverable in b391, full source in committed evidence). CI workflow restored byte-exact MAIN a95a58b317af082fc677fe62fd61d305fc41bb6d. All original guards/matrix/security/deadlines/assertions remain mandatory, not a fallback or sandbox bypass.



## Experimento Chrome: integridade verificada, sandbox incompatível, configuração retirada — 2026-10-20T18:19Z

A execução CI39472689204/job118800555968a1 no HEADb391731c6b0c6e1e997905ce9d3d215d48bef582/tree66309b5bbf921432352a8c2016783a9d3ac3ff26 terminouFAILURE, ZEROretry.1796units[212/1069/501/3/11]PASS/typebuildexportmigrationprivacyPASS; NOVAjornadaAUTHENTICATION_ACCEPTANCE_JOURNEY_PASS18:15:17.3256297Z e3rollbackHTTPPGPASS17.7708065/8050253/8386343Z mantiveramprovas completas deauth/convite/tenant/sessão semnativeOS. NÃO fullCIverde/merge/aceite.

ProveniênciaREAL18:14:42.1481732Z: ChromeForTesting155.0.8059.84/revisionmetadata1697595, GCSgeneration1792022877437857; ZIP199014491bytes/SHA256cf0f049892dea22e6a6db26d47ed0d7776b7158edcbec4634086633df8bafcbc; executávelSHA256b866a2964538c825538c454de4867973b926650da57ec12dc3328807d768247b;publisherMD5match/ZIPCRC/version--versionexata. NÃOchecksumSHA256vendorinventado/nãoassinaturaforteMD5.

IMPEDIMENTO provado: todos12matrixcases+canônico encerraramANTESDevTools/CDP/Page,exitSIGABRT/flagsstderr sandbox=true,fatal=true,error=true,dbus=false/3120stderrbytes/0stdout/endpointsnone/portfileabsente. Primeiro18:15:55.4948575Zelapsed273ms,últimocanônico18:16:03.3648605Zelapsed305ms. MATRIX1 03.3771340Z/ProductionTruthNÃOexecuted. NÃOtimeout15sconsumido/12GETabort/versionBrowser.getVersion/protocol/runtimeAppArmor-específico/causadosabortosanteriores.NãoalegarChrome.84resolve/.39causa. Falha depermission/sandbox éSTOP: não root/grants/chmodsetuid/policy/flagsnosandbox/timeout/bypass.

RETIRADA FUNCIONAL justificada pela incompatibilidade real: restaurar .github/workflows/ci.ymlBYTEEXATOdeMAIN0fc(a95a58b317af082fc677fe62fd61d305fc41bb6d), removendoSÓstepinstalador;removerSÓnossoarquivoexperimental scripts/install-ci-chrome.cjsfd7bfd913ed8d94bd90e6d9dde9e5c7d6815cce7 doárvorecandidata. Ele permaneceRECUPERÁVELnoGitb391 eFULLnaevidênciaAUTHENTICATION_BROWSER_BUILD_CONTROL_2026-10-20.md7368f31d26c7040ce091f31b3cfd5db0c4e967b7. Nãoexcluirdocumento/histórico/branch;semfallbacksilencioso: configuraçãoanteriorsegurarestauradaexplicitamente. Canonical/probe/helper/12matrix/gates/asserts/CDPFetchguardCORSsandboxLNAflagsdeadlinesinteiramenteinalterados. NãoéretentativadoSHA b391nemdeclaração de rootresolvido;novoSHArealdewithdrawalrequerCInovocompleto.

Área2permanece PENDENTE atéfullown+postliterais ecritérioscompletos;somente10Androidstandaloneinternoaceito/12pendentes. Novo pacotefinal mantémjornadaintegradareal+13guards+3rollbacksemalterarqualquerproduto/API/mobile/migração/deps. APK N/Aintegral:insumosnative/mobile/standalone/depslockexatos eCIworkflowrestauradoMAIN. RegistrarresultadofinalnoPR;nãoinventarPASSnemrerunmesmoSHAparaverde. Próximo: CIfinalsegurodoscriptdeauth ePOSTreal; sefalharbrowser, manterdraft e bloquearaceite semmicrotests/fallbacksegurança. Semgastos/prod/PSP/pentest/aparelhofísico.


Detailed full records are immutable Git notes: AUTHENTICATION_ACCEPTANCE_JOURNEY_2026-10-20.md; AUTHENTICATION_BROWSER_BUILD_CONTROL_2026-10-20.md; CHROME_BUILD_CONTROL_SANDBOX_RESULT_2026-10-20.md (the last contains FULL previous PR body35735 + all13 primary startup diagnostics). Original571body is preserved in full below and in first note. Final newSHA ownCI+post remain PENDING; only area10 technical standalone accepted/12pending. No human approval wait.

---

## FULL original571 body — preserved historical record

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




## FINAL exact-SHA receipt — 2026-10-20T18:28Z

Current PR571 remains DRAFT/NOT MERGED at f0ad85bc534626b44253da3fdc08e8f5008892fd, tree e0e2092b8b949c19727e2823491b234edbb35eeb. MAIN remains0fc45026d217db4ff9ac1c229fb4db52045424e5. Own CI39473842688/job118804565029 attempt1 COMPLETED FAILURE, ZEROretry. Actual checkout c2c2c26a6172af96ba3ecf8b85b9a23103264db1 at18:20:43.0700475Z is SYNTHETIC orderedparents[MAIN0fc,HEADf0ad], tree e0e identical, Gitverified; not literalHEAD.

1796 units[212Web1069mobile501API3CLI11monitor]PASS,0fail/skipped/cancelled. Type/build/Androidexport/migration2x/privacyretentionlegalholdPASS. New integrated authentication journey PASS18:22:56.3653454Z; all3 real invitation transactional faults/recovery/scope/cleanupPASS below. Runtime/controller/client helpers unchanged; this proves actual API/PostgreSQL + actual client core, with explicit INMEMORY storage, NOT native SecureStore/device/RNrender. Existing13 invitation guards reused, NOT13 newlycreated tests.

Full CI remainsRED: all8minimal casesPASS18:23:36.2001304Z..43.7478601Z; journeybaselineFAILcurrentdashboardGET200wave18:24:06.3560923Z, native-onlyFAILsamecondition32.0418714Z; log-only+instrumentedPASS. Matrix10PASS2FAIL. Baseline failure state48GET200/52OPTIONS204/3POST201+1expectedPOST401→12GETERR_ABORTED/canceledtrue; native-only84GET200/89OPTIONS204/3POST201+1expectedPOST401→12GETERR_ABORTED/canceledtrue; UI12unavailable/metrics—. Canonical8PASS18:24:38.3783848Z DOES NOT erase failedcases;MATRIX1 38.3784139Z/laterProductionTruthNOTexecuted/PostSetupNodeSKIP. Real Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/rev3ff7ac5a9224be9156d7f8703a06e22890aafd34/image20261012.334.1. No startupfailure in this final run. No CORS/API/vendor/framework/nativeobserver/navigation rootcause inferred. Earlier minimal failures show it is not restricted to React or postmutation. Do NOT rerun this SHA for green.

Review ALL13 cumulative PRpaths/modes: shellhttpjourney100755, others100644. CIworkflow and ALL164mobile/native/depslock/workflows/buildsmoke inputs are byte-identical MAIN. APK N/A integrally, no APK571built/borrowed. All generated blobs FULL readback exact; all6 original571norms FULL prefixes plus reconstructible FULLMAINtail preserved, subsequentchapters appendinplace; memory3894738chars viafullblob, not emptyContentsAPI. Three committed evidence notes retain originals/manifests/script/fullpreviousPRmetadata/experiment source+all13sandboxdiagnostics. Final receipt lives here until next legitimate functional/acceptance delivery; no status/self-reference commit to rerunCI.

Experiment b391 CI39472689204 FAILURE is not active configuration: actualCfTZIP199014491/SHA256cf0f049892dea22e6a6db26d47ed0d7776b7158edcbec4634086633df8bafcbc, binarySHAb866a2964538c825538c454de4867973b926650da57ec12dc3328807d768247b, generation1792022877437857/metadata1697595/version155.0.8059.84 verified, then13startupSIGABRT/sandbox+fatal beforeCDP. Sourceinstaller removed ONLY from candidate tree (recoverable in Gitb391 and FULLnote7368); workflow restored MAIN exact. No sandbox/privilege policy weakened, no fallback claim, no mainmerge. Experiment does NOT establish transportRCA or that .84 repairs .39.

Formal acceptance: ZERO new areas closed; area2 remains PENDING because full mandatory CI and literal postmerge chain are incomplete. Still only area10 technicalstandalone accepted/12pending, no%code; not humanapproval wait. No ready/merge/postCI/rerun/cancel/newPR/production/provider/PSP/cost/rootgrant/RLSdisable. #572 was closed ONLY as duplicated registry delta already inMAIN590, preserving originalbody+branch; not areaacceptance.

Next indispensable package: resolve sandbox-compatible, controlled browser transport execution with evidence, or narrow actual failing GETwave cause without changing assertions/Fetchguard/CDP/CORS/LNA/deadlines/security. Do not add indefinite microtests, copy other drafts, silently reinstate incompatible CfT override, or bypass sandbox/permissions. If new authority is needed, state exact external blocker. Area6 has internal split/negativebalance proof gaps, not only PSP external. Internal wholeauth contract evidence is now in primaryCI, but not a substitute for fullgates.

### Exact primary integrated markers

```text
2026-10-20T18:22:56.3653454Z AUTHENTICATION_ACCEPTANCE_JOURNEY_PASS {"signupCompanyAndProfessional":true,"normalizedAndDuplicateEmail":true,"invalidClientNoPOST":true,"wrongPasswordRejected":true,"actualOwnerAndMemberships":true,"crossTenantDenied":true,"twoCompanyClientContext":true,"emailBoundSingleUseInvites":true,"revokedInviteRejectedByClientAndAPI":true,"expiredInviteRejectedAndRenewed":true,"expiredSessionRejected":true,"oldLogoutCannotClearNewLogin":true,"remoteRevocation401":true,"verifiedClientClear":true,"mobileCoreBlobs":{"signup":"800faeb27d041108ab7c1c9018f749c32d2a0010","signin":"453de55dfc31d983fc8e279b8c91104913a927b0","company-members":"55d431da21ae03722ec210e15ed1128f0dffdd8d","session-transaction":"d10eb3b0ce05326947aa216d30db2571d1501dc8"},"realHTTPPostgres":true,"storage":"explicit in-memory adapter; NOT native SecureStore","physicalDevice":false,"production":false}
2026-10-20T18:22:56.7119459Z INVITATION_INSERT_ROLLBACK_PASS {"realHTTP500":true,"priorRevocationAndNewRowWitness":2,"nonRollbackWitness":1,"allTwoTenantInvitationsMembershipsUnchanged":true,"policiesACLUnchanged":true}
2026-10-20T18:22:56.7348488Z INVITATION_ACCEPT_UPDATE_ROLLBACK_PASS {"realHTTP500":true,"membershipInsertAndAcceptedUpdateWitness":2,"nonRollbackWitness":1,"allTwoTenantRowsUnchanged":true,"invitationStillActive":true,"policiesACLUnchanged":true}
2026-10-20T18:22:56.8355007Z INVITATION_ACCEPT_ATOMICITY_HTTP_PG_PASS {"lateUpdateRollback":true,"explicitSameCodeRecovery201":true,"exactlyOneManagerMembership":true,"consumedCodeRejected400":true,"foreignUnchanged":true,"bothOwnedHooksRemoved":true,"productionOrNativeUI":false}
2026-10-20T18:22:56.8357321Z INVITATION_ATOMICITY_HTTP_PG_PASS {"rollback":true,"explicitRecoveryACK201":true,"oneNewInvitation":true,"oldCodeRejected400":true,"newCodeAccepted201":true,"actualManagerMembership":true,"foreignUnchanged":true,"ownedHookRemoved":true,"productionOrNativeUI":false}
2026-10-20T18:22:56.8511510Z INVITATION_PROMOTION_UPDATE_ROLLBACK_PASS {"realHTTP500":true,"ownerAndAcceptedUpdateWitness":2,"nonRollbackWitness":1,"allTwoTenantRowsUnchanged":true,"managerRoleRestored":true,"ownerInvitationStillActive":true,"policiesACLUnchanged":true}
2026-10-20T18:22:57.0701624Z INVITATION_PROMOTION_ATOMICITY_HTTP_PG_PASS {"existingManagerPromotionRollback":true,"explicitSameCodeRecovery201":true,"oneMembershipRoleDelta":true,"consumedCodeRejected400":true,"foreignAndOldRowsUnchanged":true,"ownedHookRemoved":true,"adminPathOrNativeUIOrProduction":false}
```

