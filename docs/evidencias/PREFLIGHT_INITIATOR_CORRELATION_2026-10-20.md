# Correlação passiva preflight→request

## APÊNDICE funcional — correlação passiva de preflight, 2026-10-20T09:54Z

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO. Base MAIN d961990d1c55ccc50be094772371c10ca4ff7c1c/árvore ac75e13b68dcfb7a09fe31c5284f511a6ec64fd6, PR558 pai e556d04afd9cfba9b3485e5840e634e327471be0. Não rerun desse pai: ownCI39396817298/job118541479516a1FAIL matriz4casos,1735unitPASS e canônico8journeyPASS08:59:18Z preservados como história, não verde completo.
Requisito de diagnóstico/área11+13: ligar metadata explícita de um preflight ao request iniciador, sem inferir que OPTIONS204 é ACK de GET ou mutação. Network.Initiator oficial consultado2026-10-20 em https://github.com/ChromeDevTools/devtools-protocol/blob/master/pdl/domains/Network.pdl — campos opcionais type/requestId; ausente ou inválido continua null. O protocolo corrente não prova suporte/captura no Chrome deste novo CI até observar dados reais.
ÚNICO helper alterado scripts/web-browser-lifecycle-trace.cjs: type allowlist de sete valores; initiatorRequestId somente para type preflight com ID não vazio validado pelo allowlist/limite128 já existente. Guarda ambos na binding própria e no encerramento failed/finished. Referência explícita não significa parent observado, frame herdado, GET concluído, SQLcommit ou causa. Redirect/reuso substitui binding; sessão divergente ignorada; bounds/eviction/dropped/clocks e escopo de não-causalidade originais mantidos. Duas regiões; reverse reconstrói FULL4495chars do blobd0bf5feefaebd3f1aac306a7051eaa5d128c0d09 BYTE EXATO; candidato4877chars,delta382.
12NOVOS testes APPEND no existente apps/web/app/browser-lifecycle-trace.test.ts; FULLprefix7257chars/8oldcases BYTEEXATO. Baseline20=8PASS12FAIL (lacuna de metadata, NÃO defeito de transporte/RCA)→20PASS. Preflight refs simultâneas/distintas, settlement sem GET/ACKfabricado, target não observado/jásettled, tipos/IDs inválidos e privacy/getters, sessão, reuse/redirect, snapshot detached, eviction bounded. 206FULLWebLOCALPASSUTC/SP[194pai+12],0fail-skip-cancel,Node24.19.0;39sourcesSHA verificados antes/depois por runner único. Uma restauração local de mutante deixou settlement sem fields numa execução SP: REJEITADA, restauradoSHAexato e só206UTC/SP verified posteriores atribuídos. Não produtoRED. MutantesLOCALnão publicados: semtriggerlink10PASS10FAIL;semsettlementlink13PASS7FAIL. node --check PASS.
Probe/canônico/shell/matriz12+canônico obrigatório/FETCHcontinue-fail/CDP/CORS/LNA/sandbox/deadlines/flags/asserts BYTE INALTERADOS frente pai.15regressõesCDPanteriores intactas. Sem novos comandos/sessões/mapas/bypass/autorretry/serialização global. API/SQL/RLS/ACL/mobile/React19.1.4/RN0.81.6/depslock/workflows/buildsmoke intactos. APK N/A INTEGRAL: todos163mobile+inputs standalone e canonicalExpo→Gradle iguais ao pai eMAIN, paths Web/diagnóstico/docs excluídos dos filtros workflow. Nenhum APK novo/emprestado alegado.
CI completo deste novo HEAD PENDENTE;1747unit=[206Web1041mobile486API3CLI11monitor]APENASESPERADO,não executado ainda neste candidato. FullCI obrigatório e revisão freshSHA/base/diff antes de qualquer ready/merge; resultado final metadata+próxima entrega funcional, sem commit artificial.
6originais pai FULLPREFIXINPLACE append. Reconstrução FULLMAIN por manifesto anterior preservada; MAIN não prefixcontíguo quando história divergiu. Nota nova contém FULLFINAL558pai32967chars e fonte12regressões; nada substituído por resumo. >1MiB via TREEpathSHA/fetch_blobFULL, APIcontentsEMPTYnãoemptyfile.
Nenhum novo aceite integral. Delegação assistente já preservada, sem espera humana/CONTINUAR; sóárea10 técnica interna,12pendentes,não percentual código. Sem produção,custos,RailwayNeon,PSP/providers/credenciais/contratos/dinheiroreal/root/grants/RLSdisable/Activitymanual.
Próximo: conferir próprio CI, checkout real/parents/tree e dados iniciator observados; não transformar ausência de evento em causa/globalabsence, não repetir SHAred para verde. Se bloqueado, avançar frente funcional independente existente com prova nova, sem encalhar no browser.

## FINAL558 pai FULL, literal

## FINAL verificado — 2026-10-20T09:03Z
Own CI [39396817298](https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/39396817298), job118541479516, attempt1 COMPLETED FAILURE, ZERO retry. Actual checkout primário 2026-10-20T08:55:08.2642847Z `21d20d610dfcd4c24dbdff30d1ea050ba9a8428a`, SINTÉTICO pais ordenados [MAINd961,HEAD e556d04afd9cfba9b3485e5840e634e327471be0], árvore46ca73ca7d8bba744b0e4a271d787e74fcff1094 IGUAL candidata confirmado em Git. NÃO checkout literalHEAD.
1735 unit PASS [194Web1041mobile486API3CLI11monitor], fail/skip/cancel0;15newcanonicalok1..15 08:56:34.7578063Z..7651580Z. Typecheck/build/exportAndroid/migration2x/privacy/retention/legalhold PASS. HTTP/browser FAIL; ProductionTruth posterior NÃO executada. Sem retry/cancel/ready/merge/POST. APK N/A integral pela identidade já provada; nenhum workflow/APK558novo/emprestado.
8/12 controles PASS,4FAIL preservados: minimal/native-only/concurrent; journey/baseline/concurrent; journey/log-only/concurrent; journey/instrumented/concurrent. 7/8 minimal PASS; journey/native-only/concurrent PASS (5 refresh +5 reloads), mas não substitui os três FAIL. Canônico obrigatório PASS08:59:18.1181928Z/full8/signout201/revokedbrowser401/otherSameIdentityvalid/Bisolation/503+humanrecovery; CURRENT_MAIN_CASE_RESULT PASS08:59:18.1215701Z; MATRIX_RESULT status1 08:59:18.1216149Z. CIRED permanece impedimento de merge, não removida assertiva/caso.
Chrome155.0.8059.39/protocol1.3/JS15.5.35.20/rev3ff7ac5a9224be9156d7f8703a06e22890aafd34. NENHUM diagnóstico novo WEB_BROWSER_CDP_CONTINUATION_FAILURE neste run; zero intercept-error nos4networkdiagnostics capturados. Correção de observabilidade validada por regressões, NÃO causa resolvida nem erroCDP oculto demonstrado neste incidente.
Primária nova minimal/native-only/concurrent: HTTP200documento loopback sem app scripts/semReactNext/serviceworker/cache;14GET200 (single+12before+read-created),ONEteamPOST201;12GETparallel-after rejeitamTypeError/ERR_ABORTED/canceledtrue, semblockedReason/corsError nos12eventos. Trace121eventos/dropped0/evicted0, todos12 ligados ao MESMO frame/loader; nenhum eventoPage/Runtime adicional observado após início desses requests dentro DESTE trace, não ausência global de navegação.2GETs têm intercept+ACKallowed/sessionmatches;10 sem Fetch.pause observado, NÃO alegar que aguardavam continuação rejeitada.6OPTIONS204 pós-read-created observados no recorte servidor; não12. Policy PermissionBlock aparece também nos reads anteriores bem-sucedidos; NÃO prova de causa LNA/CORS/API/vendor/framework/nativeobserver. Serial desse caso PASS é controle independente, não reparo/causalidade. Falha não exclusiva de React; não generalizar causa browser.
Checagem de integridade local39filesSHAexact; a primeira checagem identificou SOMENTE5LF finais ausentes na cópia scratch do shell. Corrigidos ANTES194verifiedUTC/SP posteriores; corpo/asserts sempre iguais. Nenhuma adaptação de config/transport publicada.
Frente independente após bloqueio Ganhos API:4modelsLOCALPASSUTC/SP actual FULL EarningsController f091a1262e2c7a9934358883ea2ef8919ababf97 + REAL compareTimestamp e295b67d49dd47698d7351fc684674c7ec811b1e: identity(with/withouttenant),membershipenum,scopedrequireMembership errorMESMOError/noACK/zeroSQL+positiveprofessionalfilter/trustedSQL/sort. Produto JÁcorreto, NÃO bugfix/NestHTTP/HTTPPG/RLS/provider/RNnative proof/NÃOparte15/194/1735. Imports/decorators removidos SÓadaptadorlocal/explicitfixtures. Fonte e raworiginais FULL abaixo.
4outrosmodelsLOCALPASSUTC/SP actualcdp+observer+until:lateoldACK/error não resolveNEWpending;actualuntil falha ANTESDOMeval após rejeiçãoGET/POST. NÃOChrome/RCA, NÃOparte15/194/1735; fonteFULLabaixo.
PR558DRAFTNOTMERGED, MAINd961 inalterada.6originais FULLpreservados+manifest reconstruçãoFULLMAIN+old558prefix; FINALmetadata consolidar sóNEXTFUNCTIONAL semstatus/image/selfrefcommit. Nenhum novo aceite integral; assistente responsável, não espera humana.
Próximo técnico: correlação passiva mínima preflight→GET/initiator(binding estritamente allowlisted/semstack/URL/headerbody) para explicar os10GETsemFetch.pause, preservando12controles e canônico/flags/deadlines. Ler actualprobe+trace/testes e freshnorm/dupes antes; não modificar CORS/LNA/Fetch/CDP/serialglobal e não rerun e556para verde. Alternar frente funcional existente se bloqueado; Ganhos584/Interesse585 preservados, semcopiarprodutodraft.

## Registro preparatório FULL (histórico)

# Canonical CDP continuation failures: bounded, redacted, fail-closed

DRAFT — no merge/acceptance claimed. New functional integration of existing PR558; all 12 controls + canonical gate remain mandatory, no weakened deadline/security assertion.

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


Evidence: `docs/evidencias/CDP_CONTINUATION_FAILURE_OBSERVABILITY_2026-10-20.md` (FULL old558 body 65296 chars and FULL585 body 25235 chars preserved). HEAD `e556d04afd9cfba9b3485e5840e634e327471be0`, tree `46ca73ca7d8bba744b0e4a271d787e74fcff1094`. All14 changed paths SHA/modes reviewed, 1272 existing MAIN blobs unchanged; 504/506 non-docs unchanged, all163mobile/runtimeAPI/build/workflows/deps inputs identical. New regression SHA fd66a806594f8c0b7573651ee2109667d33ed083. CI pending; actual result follows here, not a status-only Git commit.

## Recibo primário selecionado (sem PNG/body/credenciais)

```json
{
  "run": 39396817298,
  "job": 118541479516,
  "attempt": 1,
  "status": "FAILURE",
  "head": "e556d04afd9cfba9b3485e5840e634e327471be0",
  "actualCheckout": "21d20d610dfcd4c24dbdff30d1ea050ba9a8428a",
  "tree": "46ca73ca7d8bba744b0e4a271d787e74fcff1094",
  "minimalContext": "2026-10-20T08:58:01.1537847Z WEB_BROWSER_MINIMAL_CONTEXT {\"scenario\":\"minimal\",\"diagnostic\":\"native-only\",\"continuation\":\"concurrent\",\"documentResponse\":{\"path\":\"/__mlivre_transport_fixture.html\",\"status\":200,\"remoteIPAddress\":\"127.0.0.1\",\"fromDiskCache\":false,\"fromServiceWorker\":false},\"secureContext\":true,\"appScripts\":0}",
  "minimalObservation": {
    "time": "2026-10-20T08:58:01.3624634Z",
    "scenario": "minimal",
    "diagnostic": "native-only",
    "continuation": "concurrent",
    "failedStage": "parallel-after",
    "rows": [
      {
        "stage": "single",
        "path": "/v1/company/dashboard",
        "status": 200,
        "jsonKind": "object"
      },
      {
        "stage": "parallel-before",
        "path": "/v1/company/dashboard",
        "status": 200,
        "jsonKind": "object"
      },
      {
        "stage": "parallel-before",
        "path": "/v1/company/analytics",
        "status": 200,
        "jsonKind": "object"
      },
      {
        "stage": "parallel-before",
        "path": "/v1/company/jobs",
        "status": 200,
        "jsonKind": "array"
      },
      {
        "stage": "parallel-before",
        "path": "/v1/company/planner",
        "status": 200,
        "jsonKind": "array"
      },
      {
        "stage": "parallel-before",
        "path": "/v1/company/dashboard/assignments",
        "status": 200,
        "jsonKind": "array"
      },
      {
        "stage": "parallel-before",
        "path": "/v1/company/teams",
        "status": 200,
        "jsonKind": "array"
      },
      {
        "stage": "parallel-before",
        "path": "/v1/company/dashboard/completed",
        "status": 200,
        "jsonKind": "array"
      },
      {
        "stage": "parallel-before",
        "path": "/v1/company/replacements",
        "status": 200,
        "jsonKind": "array"
      },
      {
        "stage": "parallel-before",
        "path": "/v1/company/talent-pools",
        "status": 200,
        "jsonKind": "array"
      },
      {
        "stage": "parallel-before",
        "path": "/v1/company/payment-events/reconciliation",
        "status": 200,
        "jsonKind": "array"
      },
      {
        "stage": "parallel-before",
        "path": "/v1/company/safety-cases",
        "status": 200,
        "jsonKind": "array"
      },
      {
        "stage": "parallel-before",
        "path": "/v1/company/safety-appeals",
        "status": 200,
        "jsonKind": "array"
      },
      {
        "stage": "create-team",
        "path": "/v1/company/teams",
        "status": 201
      },
      {
        "stage": "read-created",
        "path": "/v1/company/teams",
        "status": 200,
        "jsonKind": "array"
      },
      {
        "stage": "parallel-after",
        "path": "/v1/company/dashboard/completed",
        "status": null,
        "errorName": "TypeError"
      },
      {
        "stage": "parallel-after",
        "path": "/v1/company/analytics",
        "status": null,
        "errorName": "TypeError"
      },
      {
        "stage": "parallel-after",
        "path": "/v1/company/safety-appeals",
        "status": null,
        "errorName": "TypeError"
      },
      {
        "stage": "parallel-after",
        "path": "/v1/company/talent-pools",
        "status": null,
        "errorName": "TypeError"
      },
      {
        "stage": "parallel-after",
        "path": "/v1/company/planner",
        "status": null,
        "errorName": "TypeError"
      },
      {
        "stage": "parallel-after",
        "path": "/v1/company/dashboard",
        "status": null,
        "errorName": "TypeError"
      },
      {
        "stage": "parallel-after",
        "path": "/v1/company/safety-cases",
        "status": null,
        "errorName": "TypeError"
      },
      {
        "stage": "parallel-after",
        "path": "/v1/company/replacements",
        "status": null,
        "errorName": "TypeError"
      },
      {
        "stage": "parallel-after",
        "path": "/v1/company/dashboard/assignments",
        "status": null,
        "errorName": "TypeError"
      },
      {
        "stage": "parallel-after",
        "path": "/v1/company/teams",
        "status": null,
        "errorName": "TypeError"
      },
      {
        "stage": "parallel-after",
        "path": "/v1/company/payment-events/reconciliation",
        "status": null,
        "errorName": "TypeError"
      },
      {
        "stage": "parallel-after",
        "path": "/v1/company/jobs",
        "status": null,
        "errorName": "TypeError"
      }
    ]
  },
  "networkCounts": {
    "intercept": 46,
    "intercept-ack": 46,
    "response-extra": 38,
    "main-document": 1,
    "client-security-state": 37,
    "request": 54,
    "response": 33,
    "native-fetch-response": 15,
    "failed": 12,
    "native-fetch-rejection": 12
  },
  "failed": [
    {
      "event": "failed",
      "id": "14573.23",
      "method": "GET",
      "errorText": "net::ERR_ABORTED",
      "canceled": true
    },
    {
      "event": "failed",
      "id": "14573.19",
      "method": "GET",
      "errorText": "net::ERR_ABORTED",
      "canceled": true
    },
    {
      "event": "failed",
      "id": "14573.29",
      "method": "GET",
      "errorText": "net::ERR_ABORTED",
      "canceled": true
    },
    {
      "event": "failed",
      "id": "14573.26",
      "method": "GET",
      "errorText": "net::ERR_ABORTED",
      "canceled": true
    },
    {
      "event": "failed",
      "id": "14573.20",
      "method": "GET",
      "errorText": "net::ERR_ABORTED",
      "canceled": true
    },
    {
      "event": "failed",
      "id": "14573.18",
      "method": "GET",
      "errorText": "net::ERR_ABORTED",
      "canceled": true
    },
    {
      "event": "failed",
      "id": "14573.28",
      "method": "GET",
      "errorText": "net::ERR_ABORTED",
      "canceled": true
    },
    {
      "event": "failed",
      "id": "14573.25",
      "method": "GET",
      "errorText": "net::ERR_ABORTED",
      "canceled": true
    },
    {
      "event": "failed",
      "id": "14573.22",
      "method": "GET",
      "errorText": "net::ERR_ABORTED",
      "canceled": true
    },
    {
      "event": "failed",
      "id": "14573.24",
      "method": "GET",
      "errorText": "net::ERR_ABORTED",
      "canceled": true
    },
    {
      "event": "failed",
      "id": "14573.27",
      "method": "GET",
      "errorText": "net::ERR_ABORTED",
      "canceled": true
    },
    {
      "event": "failed",
      "id": "14573.21",
      "method": "GET",
      "errorText": "net::ERR_ABORTED",
      "canceled": true
    }
  ],
  "failureBindings": [
    {
      "requestId": "14573.23",
      "frame": "1DDF9D165C29055E108AB708654D7C95",
      "loader": "A16B43000CA6C163241CF81B68F82D08",
      "binding": true,
      "canceled": true,
      "intercept": false,
      "ack": false
    },
    {
      "requestId": "14573.19",
      "frame": "1DDF9D165C29055E108AB708654D7C95",
      "loader": "A16B43000CA6C163241CF81B68F82D08",
      "binding": true,
      "canceled": true,
      "intercept": true,
      "ack": true,
      "allowed": true,
      "sessionMatches": true
    },
    {
      "requestId": "14573.29",
      "frame": "1DDF9D165C29055E108AB708654D7C95",
      "loader": "A16B43000CA6C163241CF81B68F82D08",
      "binding": true,
      "canceled": true,
      "intercept": false,
      "ack": false
    },
    {
      "requestId": "14573.26",
      "frame": "1DDF9D165C29055E108AB708654D7C95",
      "loader": "A16B43000CA6C163241CF81B68F82D08",
      "binding": true,
      "canceled": true,
      "intercept": false,
      "ack": false
    },
    {
      "requestId": "14573.20",
      "frame": "1DDF9D165C29055E108AB708654D7C95",
      "loader": "A16B43000CA6C163241CF81B68F82D08",
      "binding": true,
      "canceled": true,
      "intercept": false,
      "ack": false
    },
    {
      "requestId": "14573.18",
      "frame": "1DDF9D165C29055E108AB708654D7C95",
      "loader": "A16B43000CA6C163241CF81B68F82D08",
      "binding": true,
      "canceled": true,
      "intercept": true,
      "ack": true,
      "allowed": true,
      "sessionMatches": true
    },
    {
      "requestId": "14573.28",
      "frame": "1DDF9D165C29055E108AB708654D7C95",
      "loader": "A16B43000CA6C163241CF81B68F82D08",
      "binding": true,
      "canceled": true,
      "intercept": false,
      "ack": false
    },
    {
      "requestId": "14573.25",
      "frame": "1DDF9D165C29055E108AB708654D7C95",
      "loader": "A16B43000CA6C163241CF81B68F82D08",
      "binding": true,
      "canceled": true,
      "intercept": false,
      "ack": false
    },
    {
      "requestId": "14573.22",
      "frame": "1DDF9D165C29055E108AB708654D7C95",
      "loader": "A16B43000CA6C163241CF81B68F82D08",
      "binding": true,
      "canceled": true,
      "intercept": false,
      "ack": false
    },
    {
      "requestId": "14573.24",
      "frame": "1DDF9D165C29055E108AB708654D7C95",
      "loader": "A16B43000CA6C163241CF81B68F82D08",
      "binding": true,
      "canceled": true,
      "intercept": false,
      "ack": false
    },
    {
      "requestId": "14573.27",
      "frame": "1DDF9D165C29055E108AB708654D7C95",
      "loader": "A16B43000CA6C163241CF81B68F82D08",
      "binding": true,
      "canceled": true,
      "intercept": false,
      "ack": false
    },
    {
      "requestId": "14573.21",
      "frame": "1DDF9D165C29055E108AB708654D7C95",
      "loader": "A16B43000CA6C163241CF81B68F82D08",
      "binding": true,
      "canceled": true,
      "intercept": false,
      "ack": false
    }
  ],
  "lifecycle": {
    "events": 121,
    "dropped": 0,
    "evictedRequests": 0,
    "evictedContexts": 0,
    "lastRuntimeOrFrameNav": [
      {
        "sequence": 12,
        "receivedAtMs": 1792486681132,
        "event": "Page.frameNavigated",
        "frameId": "1DDF9D165C29055E108AB708654D7C95",
        "parentFrameId": null,
        "loaderId": "A16B43000CA6C163241CF81B68F82D08"
      },
      {
        "sequence": 13,
        "receivedAtMs": 1792486681136,
        "event": "Runtime.executionContextCreated",
        "contextId": 2,
        "frameId": "1DDF9D165C29055E108AB708654D7C95",
        "uniqueId": "946820364492240647.7556379147135115148",
        "isDefault": true
      }
    ],
    "failedWindow": [
      1792486681349,
      1792486681358
    ]
  },
  "serverTail": [
    {
      "at": 1792486681284,
      "id": "req-7j",
      "status": 204,
      "responseTime": 0.1524120000003677
    },
    {
      "at": 1792486681286,
      "id": "req-7k",
      "method": "GET",
      "path": "/v1/company/teams"
    },
    {
      "at": 1792486681289,
      "id": "req-7k",
      "status": 200,
      "responseTime": 2.6384360000001834
    },
    {
      "at": 1792486681296,
      "id": "req-7l",
      "method": "OPTIONS",
      "path": "/v1/company/dashboard"
    },
    {
      "at": 1792486681296,
      "id": "req-7l",
      "status": 204,
      "responseTime": 0.13956700000017008
    },
    {
      "at": 1792486681298,
      "id": "req-7m",
      "method": "OPTIONS",
      "path": "/v1/company/analytics"
    },
    {
      "at": 1792486681298,
      "id": "req-7m",
      "status": 204,
      "responseTime": 0.11129100000016479
    },
    {
      "at": 1792486681300,
      "id": "req-7n",
      "method": "OPTIONS",
      "path": "/v1/company/planner"
    },
    {
      "at": 1792486681301,
      "id": "req-7n",
      "status": 204,
      "responseTime": 0.13701399999990826
    },
    {
      "at": 1792486681301,
      "id": "req-7o",
      "method": "OPTIONS",
      "path": "/v1/company/jobs"
    },
    {
      "at": 1792486681301,
      "id": "req-7o",
      "status": 204,
      "responseTime": 0.10935999999946944
    },
    {
      "at": 1792486681301,
      "id": "req-7p",
      "method": "OPTIONS",
      "path": "/v1/company/dashboard/assignments"
    },
    {
      "at": 1792486681301,
      "id": "req-7p",
      "status": 204,
      "responseTime": 0.1182089999992968
    },
    {
      "at": 1792486681301,
      "id": "req-7q",
      "method": "OPTIONS",
      "path": "/v1/company/dashboard/completed"
    },
    {
      "at": 1792486681301,
      "id": "req-7q",
      "status": 204,
      "responseTime": 0.08983099999932165
    }
  ],
  "matrix": [
    "2026-10-20T08:57:57.3904783Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/baseline/concurrent PASS",
    "2026-10-20T08:57:58.4239982Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/baseline/serial PASS",
    "2026-10-20T08:57:59.4048722Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/log-only/concurrent PASS",
    "2026-10-20T08:58:00.4149520Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/log-only/serial PASS",
    "2026-10-20T08:58:01.4919463Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/native-only/concurrent FAIL exit=1",
    "2026-10-20T08:58:02.5268042Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/native-only/serial PASS",
    "2026-10-20T08:58:03.5381024Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/instrumented/concurrent PASS",
    "2026-10-20T08:58:04.5462950Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT minimal/instrumented/serial PASS",
    "2026-10-20T08:58:28.3715050Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/baseline/concurrent FAIL exit=1",
    "2026-10-20T08:58:50.1098471Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/log-only/concurrent FAIL exit=1",
    "2026-10-20T08:58:53.5091854Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/native-only/concurrent PASS",
    "2026-10-20T08:59:15.4460258Z WEB_BROWSER_DIAGNOSTIC_CASE_RESULT journey/instrumented/concurrent FAIL exit=1",
    "2026-10-20T08:59:18.1215701Z WEB_BROWSER_CURRENT_MAIN_CASE_RESULT PASS",
    "2026-10-20T08:59:18.1216149Z WEB_BROWSER_DIAGNOSTIC_MATRIX_RESULT status=1"
  ]
}
```

## Controle independente CDP — FULL fonte local

```ts
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

// Actual canonical cdp() and message observer. WebSocket/clock are explicit fixtures, NOT Chrome.
const source=fs.readFileSync(new URL('../scripts/web-browser-journey-e2e.cjs',import.meta.url),'utf8');
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

for(const lateError of [false,true]){
 test('LOCAL late old continuation ACK/error cannot settle a newer pending command; error='+lateError,async()=>{
  const h=fixture();h.pause('GET');const old=h.commands[0],timer=[...h.timers.keys()][0];
  h.pause('POST');const current=h.commands[1];assert.equal(h.pending(),2);
  const expired=h.timers.get(timer)!;h.timers.delete(timer);expired();await settle();
  assert.equal(h.pending(),1);assert.equal(h.timers.size,1);
  assert.deepEqual(diagnostic(h),{command:'Fetch.continueRequest',method:'GET',code:null});
  h.reply(old,lateError?{code:-32000,message:'PRIVATE_LATE_ERROR'}:undefined);await settle();
  assert.equal(h.pending(),1);assert.equal(h.timers.size,1);assert.equal(h.logs.length,1);
  h.reply(current);await settle();assert.equal(h.pending(),0);assert.equal(h.timers.size,0);
  assert.equal(h.violation(),'CDP guarded request continuation failed');assert.equal(h.commands.length,2);
 });
}

for(const method of ['GET','POST']){
 test('LOCAL actual until() gate rejects continuation failure before DOM evaluation, method='+method,async()=>{
  const h=fixture();h.pause(method);h.reply(h.commands[0],{code:-32000,message:'PRIVATE_FIXTURE'});await settle();
  let evaluated=0;h.context.evaluate=async()=>{evaluated++;return true;};h.context.sleep=async()=>{throw Error('Unexpected polling');};
  const start=source.indexOf('async function until('),end=source.indexOf('\nasync function',start+1);
  assert.ok(start>=0&&end>start);const until=vm.runInContext(source.slice(start,end)+'\nuntil',h.context);
  await assert.rejects(until('true','fixture'),/CDP guarded request continuation failed/);
  assert.equal(evaluated,0);assert.equal(h.commands.length,1);assert.equal(h.logs.length,1);assert.equal(h.pending(),0);
 });
}

```

## Ganhos autenticação — FULL fonte local

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {stripTypeScriptTypes} from 'node:module';
const raw=JSON.parse(fs.readFileSync(new URL('./earnings-auth-sources.json',import.meta.url),'utf8'));
for(const key of ['controller','helper'])assert.equal(createHash('sha1').update('blob '+Buffer.byteLength(raw[key])+'\0'+raw[key]).digest('hex'),raw[key+'Sha']);
const clean=s=>stripTypeScriptTypes(s.replace(/import\s[^;]+;/g,'').replace(/@(Controller|Get|Headers)\([^)]*\)/g,'').replace(/\bexport\s+/g,''),{mode:'transform'});
const compareTimestamp=new Function(clean(raw.helper)+';return compareTimestamp;')();
const EarningsController=new Function('compareTimestamp',clean(raw.controller)+';return EarningsController;')(compareTimestamp);
function fixture(failure){
 const error=Error('EXPLICIT_AUTH_DEPENDENCY_FIXTURE'),events=[],sql=[];
 const auth={
  identityFromAuthorization:async token=>{events.push(['identity',token]);if(failure==='identity')throw error;return{id:'trusted-professional'};},
  memberships:async actor=>{events.push(['memberships',actor]);if(failure==='memberships')throw error;return[{tenant_id:'a',role:'professional'},{tenant_id:'ignored',role:'owner'},{tenant_id:'b',role:'professional'}];},
  requireMembership:async(actor,tenant)=>{events.push(['requireMembership',actor,tenant]);if(failure==='requireMembership')throw error;return{role:'professional'};},
 };
 const db={tenant:async(tenant,fn)=>{sql.push(['tenant',tenant]);return fn({query:async(query,params)=>{
  assert.match(query,/WHERE e\.tenant_id=\$2 AND wa\.tenant_id=\$2 AND j\.tenant_id=\$2 AND p\.identity_id=\$1/);
  assert.deepEqual(params,['trusted-professional',tenant]);sql.push(['query',params]);return{rows:[{id:tenant,createdAt:new Date(tenant==='a'?'2026-10-19T00:00:00Z':'2026-10-20T00:00:00Z')}]};
 }});}};
 return{controller:new EarningsController(db,auth),error,events,sql};
}
test('LOCAL earnings identity failure with/without explicit tenant preserves exact error and zero SQL',async()=>{
 for(const tenant of [undefined,'a']){const h=fixture('identity');let rows;
  await assert.rejects(async()=>{rows=await h.controller.mine('fixture-private',tenant);},e=>e===h.error);
  assert.equal(rows,undefined);assert.deepEqual(h.events,[['identity','fixture-private']]);assert.deepEqual(h.sql,[]);
 }
});
test('LOCAL earnings membership enumeration failure cannot publish empty or partial result or run tenant SQL',async()=>{
 const h=fixture('memberships');let rows;
 await assert.rejects(async()=>{rows=await h.controller.mine('fixture-private');},e=>e===h.error);
 assert.equal(rows,undefined);assert.deepEqual(h.events,[['identity','fixture-private'],['memberships','trusted-professional']]);assert.deepEqual(h.sql,[]);
});
test('LOCAL earnings scoped membership dependency failure preserves trusted actor/tenant before zero SQL',async()=>{
 const h=fixture('requireMembership');let rows;
 await assert.rejects(async()=>{rows=await h.controller.mine('fixture-private','a');},e=>e===h.error);
 assert.equal(rows,undefined);assert.deepEqual(h.events,[['identity','fixture-private'],['requireMembership','trusted-professional','a']]);assert.deepEqual(h.sql,[]);
});
test('LOCAL earnings positive explicit fixtures preserve professional filter trusted SQL parameters and real timestamp sort',async()=>{
 const h=fixture();const rows=await h.controller.mine('fixture-private');
 assert.deepEqual(rows.map(r=>[r.id,r.tenantId]),[['b','b'],['a','a']]);assert.deepEqual(h.sql.filter(x=>x[0]==='tenant'),[['tenant','a'],['tenant','b']]);
});

```

```json
{
  "controller": "import {compareTimestamp} from './timestamp-order';\nimport { Controller, Get, Headers } from '@nestjs/common';\nimport { AuthService } from './auth.service';\nimport { DatabaseService } from './database.service';\n@Controller('earnings')\nexport class EarningsController {constructor(private readonly db:DatabaseService,private readonly auth:AuthService){} @Get('mine') async mine(@Headers('authorization') a?:string,@Headers('x-tenant-id') tenantId?:string){const identity=await this.auth.identityFromAuthorization(a);const tenantIds=tenantId?[tenantId]:(await this.auth.memberships(identity.id)).filter(m=>m.role==='professional').map(m=>m.tenant_id);if(tenantId)await this.auth.requireMembership(identity.id,tenantId);const all:any[]=[];for(const t of tenantIds){const rows=await this.db.tenant(t,async db=>(await db.query('SELECT e.id,e.assignment_id AS \"assignmentId\",e.amount_cents AS \"amountCents\",e.status,e.created_at AS \"createdAt\",j.title,j.starts_at AS \"startsAt\" FROM earnings_ledger e JOIN professional_profiles p ON p.id=e.professional_id JOIN work_assignments wa ON wa.id=e.assignment_id JOIN company_jobs j ON j.id=wa.job_id WHERE e.tenant_id=$2 AND wa.tenant_id=$2 AND j.tenant_id=$2 AND p.identity_id=$1 ORDER BY e.created_at DESC',[identity.id,t])).rows);all.push(...rows.map((r:any)=>({...r,tenantId:t})));}return all.sort((a,b)=>compareTimestamp(a.createdAt,b.createdAt,'desc'));}}\n",
  "helper": "type Timestamp=Date|string|null|undefined;\n// pg returns Date objects before JSON serialization; weekday strings are not sortable timestamps.\nexport function compareTimestamp(left:Timestamp,right:Timestamp,direction:'asc'|'desc'):number{\n const millis=(value:Timestamp)=>value instanceof Date?value.getTime():typeof value==='string'?Date.parse(value):NaN;\n const a=millis(left),b=millis(right),validA=Number.isFinite(a),validB=Number.isFinite(b);\n if(!validA)return validB?1:0;\n if(!validB)return -1;\n return direction==='asc'?a-b:b-a;\n}\n",
  "controllerSha": "f091a1262e2c7a9934358883ea2ef8919ababf97",
  "helperSha": "e295b67d49dd47698d7351fc684674c7ec811b1e"
}
```


## Novos testes FULL (append)

```ts

// Initiator fixtures are explicit CDP-shaped metadata, not real preflight/RCA proof.
test('passive preflight link retains the explicit triggering request ID without borrowing its frame or loader',()=>{
 const t=createLifecycleTrace();
 t.observe(msg('Network.requestWillBeSent',{requestId:'get.1',frameId:'frame-get',loaderId:'loader-get',initiator:{type:'script'}}),'session-A');
 t.observe(msg('Network.requestWillBeSent',{requestId:'preflight.1',frameId:'frame-options',loaderId:'',initiator:{type:'preflight',requestId:'get.1'}}),'session-A');
 const row=t.snapshot().events[1];assert.equal(row.initiatorType,'preflight');assert.equal(row.initiatorRequestId,'get.1');
 assert.equal(row.requestId,'preflight.1');assert.equal(row.frameId,'frame-options');assert.equal(row.loaderId,'');
});
test('concurrent preflights retain distinct explicit trigger IDs and failed binding is not reassigned to another request',()=>{
 const t=createLifecycleTrace();
 for(const n of [1,2])t.observe(msg('Network.requestWillBeSent',{requestId:'preflight.'+n,frameId:'frame-'+n,loaderId:'loader-'+n,initiator:{type:'preflight',requestId:'get.'+n}}),'session-A');
 for(const n of [2,1])t.observe(msg('Network.loadingFailed',{requestId:'preflight.'+n,errorText:'net::ERR_ABORTED',canceled:true}),'session-A');
 const s=t.snapshot();assert.deepEqual(s.events.slice(2).map((e:any)=>[e.initiatorType,e.initiatorRequestId,e.frameId]),[['preflight','get.2','frame-2'],['preflight','get.1','frame-1']]);assert.equal(s.pendingRequests,0);
});
test('successful preflight settlement retains metadata but cannot fabricate a completed GET or server ACK',()=>{
 const t=createLifecycleTrace();
 t.observe(msg('Network.requestWillBeSent',{requestId:'options',initiator:{type:'preflight',requestId:'get'}}),'session-A');
 t.observe(msg('Network.loadingFinished',{requestId:'options',timestamp:2}),'session-A');
 const s=t.snapshot(),row=s.events[1];assert.equal(row.initiatorType,'preflight');assert.equal(row.initiatorRequestId,'get');
 assert.equal(row.event,'Network.loadingFinished');assert.equal(row.requestId,'options');assert.equal(s.events.length,2);assert.equal(s.pendingRequests,0);assert.equal('status' in row,false);
});
test('explicit preflight link remains a reference even when the triggering request was not observed',()=>{
 const t=createLifecycleTrace();
 t.observe(msg('Network.requestWillBeSent',{requestId:'options',initiator:{type:'preflight',requestId:'unobserved.get'}}),'session-A');
 const row=t.snapshot().events[0];assert.equal(row.initiatorRequestId,'unobserved.get');assert.equal(row.frameId,null);assert.equal(row.loaderId,null);assert.equal(t.snapshot().pendingRequests,1);assert.match(t.snapshot().scope,/no absence or root-cause/);
});
test('initiator type is allowlisted and only an explicit preflight may retain a trigger reference',()=>{
 const t=createLifecycleTrace(),types=['parser','script','preload','SignedExchange','preflight','FedCM','other'];
 for(const [i,type] of types.entries())t.observe(msg('Network.requestWillBeSent',{requestId:String(i),initiator:{type,requestId:'get'}}),'session-A');
 assert.deepEqual(t.snapshot().events.map((r:any)=>[r.initiatorType,r.initiatorRequestId]),types.map(type=>[type,type==='preflight'?'get':null]));
 for(const type of ['constructor','__proto__','SECRET?token','PREFLIGHT',null,3,{}]){
  t.observe(msg('Network.requestWillBeSent',{requestId:'bad',initiator:{type,requestId:'get'}}),'session-A');const r=t.snapshot().events.at(-1);assert.equal(r.initiatorType,null);assert.equal(r.initiatorRequestId,null);
 }
});
test('preflight trigger IDs reject empty overlong non-string URL/query/header-shaped values without logging them',()=>{
 const t=createLifecycleTrace();
 for(const requestId of ['', 'x'.repeat(129),3,{},null,'https://SECRET.invalid','id?token=SECRET','Bearer SECRET','id\nSECRET']){
  t.observe(msg('Network.requestWillBeSent',{requestId:'options',initiator:{type:'preflight',requestId}}),'session-A');
  assert.equal(t.snapshot().events.at(-1).initiatorRequestId,null);
 }
 t.observe(msg('Network.requestWillBeSent',{requestId:'valid',initiator:{type:'preflight',requestId:'x'.repeat(128)}}),'session-A');
 assert.equal(t.snapshot().events.at(-1).initiatorRequestId.length,128);assert.ok(!JSON.stringify(t.snapshot()).includes('SECRET'));
});
test('other sessions and missing initiators cannot supply a trigger binding to the expected session',()=>{
 const t=createLifecycleTrace();
 t.observe(msg('Network.requestWillBeSent',{requestId:'same',initiator:{type:'preflight',requestId:'foreign'}},'session-B'),'session-A');
 t.observe(msg('Network.requestWillBeSent',{requestId:'same'}),'session-A');
 t.observe(msg('Network.loadingFailed',{requestId:'same'}),'session-A');
 const s=t.snapshot();assert.equal(s.events.length,2);for(const r of s.events){assert.equal(r.initiatorType,null);assert.equal(r.initiatorRequestId,null);}assert.ok(!JSON.stringify(s).includes('foreign'));
});
test('collector never reads initiator URL/stack or transport data and does not mutate frozen input metadata',()=>{
 const t=createLifecycleTrace(),initiator:any={type:'preflight',requestId:'get'};
 for(const key of ['url','stack','lineNumber','columnNumber'])Object.defineProperty(initiator,key,{get(){throw Error('Forbidden data access');},enumerable:true});
 Object.freeze(initiator);const params=Object.freeze({requestId:'options',initiator});
 assert.doesNotThrow(()=>t.observe(msg('Network.requestWillBeSent',params),'session-A'));
 const row=t.snapshot().events[0];assert.equal(row.initiatorRequestId,'get');assert.equal(row.initiatorType,'preflight');assert.equal('url' in row,false);assert.equal('stack' in row,false);assert.equal('initiator' in row,false);
});
test('request-ID reuse overwrites an old initiator binding instead of attaching it to a redirected request',()=>{
 const t=createLifecycleTrace();
 t.observe(msg('Network.requestWillBeSent',{requestId:'reused',frameId:'old',initiator:{type:'preflight',requestId:'old.get'}}),'session-A');
 t.observe(msg('Network.requestWillBeSent',{requestId:'reused',frameId:'new',initiator:{type:'script'},redirectResponse:{url:'SECRET'}}),'session-A');
 t.observe(msg('Network.loadingFinished',{requestId:'reused'}),'session-A');
 const row=t.snapshot().events[2];assert.equal(row.frameId,'new');assert.equal(row.initiatorType,'script');assert.equal(row.initiatorRequestId,null);assert.equal(t.snapshot().events[1].redirect,true);
});
test('trigger settlement before preflight failure does not delete the preflight-owned reference',()=>{
 const t=createLifecycleTrace();
 t.observe(msg('Network.requestWillBeSent',{requestId:'get',initiator:{type:'script'}}),'session-A');
 t.observe(msg('Network.requestWillBeSent',{requestId:'options',initiator:{type:'preflight',requestId:'get'}}),'session-A');
 t.observe(msg('Network.loadingFinished',{requestId:'get'}),'session-A');t.observe(msg('Network.loadingFailed',{requestId:'options'}),'session-A');
 assert.equal(t.snapshot().events[3].initiatorRequestId,'get');assert.equal(t.snapshot().pendingRequests,0);
});
test('initiator snapshots are detached and cannot rewrite pending request metadata',()=>{
 const t=createLifecycleTrace();t.observe(msg('Network.requestWillBeSent',{requestId:'options',initiator:{type:'preflight',requestId:'get'}}),'session-A');
 const copy=t.snapshot();copy.events[0].initiatorRequestId='forged';copy.events[0].initiatorType='other';
 t.observe(msg('Network.loadingFinished',{requestId:'options'}),'session-A');
 const row=t.snapshot().events[1];assert.equal(row.initiatorType,'preflight');assert.equal(row.initiatorRequestId,'get');
});
test('bounded request eviction reports unknown initiator rather than borrowing a surviving preflight reference',()=>{
 const t=createLifecycleTrace({maxEvents:2,maxRequests:1,maxContexts:1});
 for(const n of [1,2])t.observe(msg('Network.requestWillBeSent',{requestId:'options.'+n,initiator:{type:'preflight',requestId:'get.'+n}}),'session-A');
 t.observe(msg('Network.loadingFailed',{requestId:'options.1'}),'session-A');
 let s=t.snapshot(),row=s.events.at(-1);assert.equal(s.evictedRequests,1);assert.equal(s.droppedEvents,1);assert.equal(row.requestBindingObserved,false);assert.equal(row.initiatorType,null);assert.equal(row.initiatorRequestId,null);
 t.observe(msg('Network.loadingFinished',{requestId:'options.2'}),'session-A');s=t.snapshot();assert.equal(s.events.at(-1).initiatorRequestId,'get.2');assert.equal(s.pendingRequests,0);assert.equal(s.events.length,2);assert.equal(s.droppedEvents,2);
});

```

## Manifesto de originais preservados

```json
[
  {
    "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
    "parentBlob": "6131549884ee1edf17875b80f9b5cf1d0a2fd30f",
    "parentChars": 1854000,
    "mainBlob": "ca68ed1d3ccf65a7eba3a44db5221d1c4b335f2a",
    "newChars": 1858040
  },
  {
    "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
    "parentBlob": "92ce8d64803d4c07ec7bd7067adf5a5124230d4c",
    "parentChars": 2186574,
    "mainBlob": "a711a3e772b17f865140180ef3f3c500b354c7eb",
    "newChars": 2190614
  },
  {
    "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
    "parentBlob": "f94439000b222ed1c8fc91c08b6e79976ba82d33",
    "parentChars": 1844212,
    "mainBlob": "ce6b3d3fcc04342c4ae80c62bc81880cc75aeca1",
    "newChars": 1848252
  },
  {
    "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
    "parentBlob": "cb2498f51e659d025eb2f651f16eaf59f69ddc8b",
    "parentChars": 1839045,
    "mainBlob": "ff763bbe2dd6521058f4681c1a262e975e446e07",
    "newChars": 1843085
  },
  {
    "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
    "parentBlob": "16d2a23278777fb44cfa6f11a6c088da5dcf73ba",
    "parentChars": 1840103,
    "mainBlob": "2d332200b7072075c37f065f1f4ba3cbc1068ae1",
    "newChars": 1844143
  },
  {
    "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
    "parentBlob": "df4416e4aa0b31424a9075cb6b4e087a5608872f",
    "parentChars": 1436848,
    "mainBlob": "80c5d64d2a2d604d7e2a1eeb833f3fc993a5f29a",
    "newChars": 1440888
  }
]
```

## Mutantes locais, não CI

```json
[
  {
    "label": "no-trigger-link",
    "output": "ℹ tests 20\nℹ pass 10\nℹ fail 10\nℹ cancelled 0\nℹ skipped 0\n"
  },
  {
    "label": "no-settlement-link",
    "output": "ℹ tests 20\nℹ pass 13\nℹ fail 7\nℹ cancelled 0\nℹ skipped 0\n"
  }
]
```
