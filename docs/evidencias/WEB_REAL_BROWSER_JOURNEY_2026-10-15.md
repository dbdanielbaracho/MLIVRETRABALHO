# Web — jornada real de navegador contra API/PostgreSQL isolados


---

## Jornada Web em navegador real — preparação verificável — 2026-10-15

Escopo exclusivo MLIVRETRABALHO. Base real `d0754b848e5bb780d3f3707001b8c49b802fd0f5`, árvore `78bbca3e834335cef8c09e9ab398beb87eb8302c`; PR555 JÁ MERGED e próprios/pósCI reais aprovados. DVT ORIGINAL/memória/checkpoint/ledger/registry/matriz integrais preservados como prefixos; não é documento Creator Commerce OS.

## Lacuna e limite da prova atual
Matriz áreas1/2/4 ainda exigem prova real do cliente: hooks/unit/HTTP servidor e Androidinstall/launch não provam DOM/sessão/formulários da Web. A imagem do RED555 declarou ubuntu24/20261004.327; inventário primário https://github.com/actions/runner-images/blob/ubuntu24/20261004.327/images/ubuntu/Ubuntu2404-Readme.md lista Chrome154.0.8037.97/Chromium154.0.8037.0. Isso NÃO equivale a executar navegador neste projeto. Localmente não há navegador instalado; node--check e bash-n são apenas verificações de sintaxe, NÃO testes UI.

## Novo teste, sem alteração no produto
scripts/web-browser-journey-e2e.sh reconstrói Next apenas para fixture com NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:3002, inicia backend isolado3002/CORSexplícitoWeb3001 e Next3001 sobre o PostgreSQL efêmero já existente. Wrapper e driver recusam origens/DB não-local; navegador usa perfil novo e intercepta/bloqueia requests de aplicação foraAPI/Weblocal. Não desabilita sandbox/CORS/web-security, não lê sessão pessoal, não cria serviços/deps/lock/credenciais/produção e não muda URL do APK canônico.

Driver Node22/WebSocket/CDP usa Chrome instalado (falha em vez de pular se ausente), DOM real e entrada/cliques browser para: login401+feedback; loginválido/estado vazio; criaçãoequipe/vaga peloformulário; GETAPI realconfirmaIDs/tenant/valor12345cents/datas; recarga usa sessão da aba sem signin automático; signout local+resposta remota; novaidentidadeB com tela/API sem dadosA. CapturasPNG do viewport1365x900 comSHA256/base64 no log primário e relatório fixtureIDs/statuses semtokens/senhas. DATETIMEinputs usam setterDOM+eventos; não é prova de teclado móvel. O HTTPjourney anterior é integralmente preservado; só acrescenta chamada a wrapper antes dos signouts.

Código funcional/JSX/CSS/API/SQL/migrations/auth/roles/RLS/notificações/desenho/deps/lock/native/workflows/buildAPK/smoke canônico permanecem intactos. Teste acrescenta evidência a comportamento existente, não alega defeito de produto sem reprodução. Caso falhe, primeiro classificar harness/ambiente/contrato e corrigir apenas o que os logs provarem; não relaxar teste para fabricar sucesso.

## Estado desta preparação
O navegador REAL AINDA NÃO FOI EXECUTADO no SHA desta fatia; próprioCI/capturas/revisão/merge/pósREAL PENDENTES. Unitcount continua1304 previstoinalterado, sem somar assertions/etapasUI como novos unit tests. Nenhum aceiteintegral novo: sóárea10standaloneTÉCNICOINTERNO, outras12 ainda SEM aceite completo. Webdesktop≠Android/físico/VisualTruth/SecureStore/piloto. Externos215/219/220/224/228 OPEN, semgastos/produção/PSP/dinheiroreal. APK N/A só poridentidadeINTEGRALinsumos protegidos, não[].

## Recibo FINAL anterior consolidado — PR555
```json
{
  "pr": 555,
  "base": "704ffea11cff6985849c775097b952bf81c26f77",
  "head": "6c0986c0f5aab0d1de5f340fc18d50c9ebfbdb6f",
  "merge": "d0754b848e5bb780d3f3707001b8c49b802fd0f5",
  "tree": "78bbca3e834335cef8c09e9ab398beb87eb8302c",
  "parents": [
    "704ffea11cff6985849c775097b952bf81c26f77",
    "6c0986c0f5aab0d1de5f340fc18d50c9ebfbdb6f"
  ],
  "red": {
    "head": "092563fc1b4519e7a1d027e1b897ebd0af4e6016",
    "run": 38746255453,
    "attempt": 3,
    "job": 116461647119,
    "previousTestsPass": 1301,
    "summary": {
      "tests": [
        127,
        753,
        407,
        3,
        11
      ],
      "pass": [
        127,
        753,
        407,
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
    "http500InsteadOf400": 4,
    "valid4000AsciiAndUnicodePersisted": true,
    "negativeWritesPreserved": true,
    "authenticationMembership401": true,
    "primaryMarkers": [
      "2026-10-15T13:56:10.2951588Z OBSERVED chat body characters=4001 encoding=ascii actor=pro HTTP=500",
      "2026-10-15T13:56:10.4486468Z OBSERVED chat body characters=4001 encoding=ascii actor=company HTTP=500",
      "2026-10-15T13:56:10.6026224Z OBSERVED chat body characters=4001 encoding=unicode actor=pro HTTP=500",
      "2026-10-15T13:56:10.7515821Z OBSERVED chat body characters=4001 encoding=unicode actor=company HTTP=500",
      "2026-10-15T13:56:11.0129025Z OBSERVED chat persisted characters=4000 encoding=ascii octets=4000",
      "2026-10-15T13:56:11.1238479Z OBSERVED chat persisted characters=4000 encoding=unicode octets=16000",
      "2026-10-15T13:56:11.2253680Z FAIL: chat_character_limit 4 oversized requests were not HTTP400"
    ],
    "infra": {
      "run": 38746255453,
      "attempt1Job": 116460573392,
      "attempt2Job": 116461005441,
      "cause": "Both ECR quota before checkout, all product gates skipped, NOT real RED/PASS",
      "failedJobRetries": 2,
      "secondRetryTime": "2026-10-15 13:53:24 UTC"
    }
  },
  "ownCI": {
    "run": 38747253808,
    "job": 116464035645,
    "attempt": 1,
    "sha": "6c0986c0f5aab0d1de5f340fc18d50c9ebfbdb6f",
    "summary": {
      "tests": [
        127,
        753,
        410,
        3,
        11
      ],
      "pass": [
        127,
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
    "success": true,
    "all18Steps": true,
    "httpPostgres": true,
    "chat4000Accepted4001Rejected400": true,
    "productionTruth": true,
    "checkout": {
      "sha": "8f045f634a8d2bf79785b5bc9d0d47976a334496",
      "synthetic": true,
      "parents": [
        "704ffea11cff6985849c775097b952bf81c26f77",
        "6c0986c0f5aab0d1de5f340fc18d50c9ebfbdb6f"
      ],
      "tree": "78bbca3e834335cef8c09e9ab398beb87eb8302c",
      "equivalent": true
    },
    "catalog": {
      "foreignKeys": 110,
      "entireUnchangedFromRed": true
    }
  },
  "review": {
    "base": "704ffea11cff6985849c775097b952bf81c26f77",
    "head": "6c0986c0f5aab0d1de5f340fc18d50c9ebfbdb6f",
    "tree": "78bbca3e834335cef8c09e9ab398beb87eb8302c",
    "paths": [
      {
        "path": "apps/api/src/conversations.controller.test.ts",
        "mode": "100644"
      },
      {
        "path": "apps/api/src/conversations.controller.ts",
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
        "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
        "mode": "100644"
      },
      {
        "path": "scripts/http-journey-e2e.sh",
        "mode": "100755"
      },
      {
        "path": "docs/evidencias/CHAT_BODY_CHARACTER_LIMIT_2026-10-15.md",
        "mode": "100644"
      }
    ],
    "bytesVerified": 10,
    "history": true,
    "oldUnitFullPrefix": true,
    "oldHttpRestoredExactly": true,
    "onlyPredicate": true,
    "unchangedNonDocs": 480,
    "apk": "N/A full identity of ALL mobile/native/dependency/lock/workflow/build/smoke blobs and modes",
    "ancestry": {
      "ahead": 2,
      "behind": 0,
      "mergeBase": "704ffea11cff6985849c775097b952bf81c26f77"
    }
  },
  "postCI": {
    "run": 38747908223,
    "job": 116466304518,
    "attempt": 1,
    "sha": "d0754b848e5bb780d3f3707001b8c49b802fd0f5",
    "checkoutLiteral": "d0754b848e5bb780d3f3707001b8c49b802fd0f5",
    "summary": {
      "tests": [
        127,
        753,
        410,
        3,
        11
      ],
      "pass": [
        127,
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
    "success": true,
    "all18Steps": true,
    "httpPostgres": true,
    "chat4000Accepted4001Rejected400": true,
    "productionTruth": true,
    "catalogForeignKeys": 110,
    "catalogOwnPostEntireIdentical": true
  },
  "monitor": {
    "run": 38747908353,
    "job": 116466304284,
    "success": true,
    "event": "push",
    "marker": "2026-10-15T14:02:54.2316028Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"d0754b848e5bb780d3f3707001b8c49b802fd0f5\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":0,\"openPrs\":0,\"activeRuns\":1,\"event\":\"push\"}"
  },
  "remainingExternal": [
    228,
    224,
    220,
    219,
    215
  ],
  "acceptance": "Only area10 TECHNICAL INTERNAL accepted;12other areas pending."
}
```

PENDENTES nos apêndices555 eram preparação, não estadofinal; reciboFINALacima inclui1304PASS/todos18steps/HTTPunicode400/PGpersistência/ProductionTruth/mergeREAL. Não repetir555/553/anteriores. Recibo deste teste será consolidado no próximo cicloFUNCIONAL, semcommit sóparaatividade/metadados. Jornada parcial não fecha áreas1/2/4 nem13; ampliar depois porcontratos loading/erro/vazio/acessibilidade e navegaçãoreal seminventarpolítica.


---

## Correção funcional — resposta REAL de login tenant_id→tenantId — 2026-10-15

Este apêndice supersede somente a preparação anterior que não alegava defeito de produto. A nova reprodução é integração REAL API→Web; não repete antigos testes de mock/canonical-session como se fossem jornada de cliente.

### Falha comprovada
AuthController.signin devolve AuthService.memberships com colunas SQL tenant_id/role, sem alterar o formato. validateSigninCompanySession exigia tenantId via parser de sessão armazenada. A primeira execução Chrome renderizou login e feedback401, mas não chegou ao dashboard após credenciais válidas; a execução diagnóstica subsequente capturou shape tenant_id/owner mas teve timeout de startupChrome, separado de falha do produto. A regressão seguinte passa resposta HTTP REAL, com PostgreSQL real, pelo módulo Web REAL carregado por nativeTSstrip+VM, sem stubs Auth/DB/transporte: normalized=false. Assim confirma incompatibilidade antes de alterar produto; não é prova de exploit, vazamento, Android/físico ou jornada completa.

```json
{
  "head": "97bb04b4e3619f721b6cbd48a93876f0693cb9d7",
  "run": 38751252527,
  "job": 116477925459,
  "attempt": 1,
  "previousTestsPass": 1304,
  "summary": {
    "tests": [
      127,
      753,
      410,
      3,
      11
    ],
    "pass": [
      127,
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
  "scope": "REAL local HTTP/Postgres signin envelope fed unchanged into ACTUAL Web validator via nativeTSstrip+VM; no auth/transport mock",
  "observed": [
    "2026-10-15T14:27:41.1939343Z WEB_BROWSER_FIXTURE_AUTH {\"label\":\"A\",\"tenantId\":\"4815332a-ab7c-462d-9b4a-588bcf39eaa5\",\"memberships\":[{\"tenant_id\":\"4815332a-ab7c-462d-9b4a-588bcf39eaa5\",\"role\":\"owner\"}]}",
    "2026-10-15T14:27:41.1940306Z WEB_BROWSER_WIRE_OBSERVED {\"label\":\"A\",\"normalized\":false,\"membershipKeys\":[[\"tenant_id\",\"role\"]]}",
    "2026-10-15T14:27:41.1944235Z WEB_BROWSER_JOURNEY_FAIL Actual API signin response rejected by current Web validator"
  ],
  "browserAttempt": {
    "head": "d31253d2987e644d1d8641b445999c8c931a3fa0",
    "run": 38749130483,
    "attempt": 2,
    "job": 116471435561,
    "actualLoginRendered": true,
    "actual401Feedback": true,
    "validLoginDashboardTimeout": true,
    "scope": "No valid dashboard completion claimed"
  },
  "infra": {
    "firstAttemptEcr": {
      "attempt1Job": 116470558210,
      "run": 38749130483,
      "cause": "ECR quota before checkout, browser/product gates not executed",
      "failedJobRetries": 1
    },
    "diagnosticChromeStartup": {
      "head": "1219d965829ab153478a87ec6c5d26b58394eee7",
      "run": 38750284144,
      "job": 116474585407,
      "observedApiRaw": true,
      "startupTimeout": true,
      "scope": "NOT product RED/root proof by startup"
    }
  },
  "localRegression": {
    "previous6Pass": 6,
    "new4Fail": 4,
    "candidate10Pass": 10,
    "typecheck": false,
    "browser": false
  }
}
```

### Mudança mínima de fronteira, sem mudar API ou autoridade
Somente validateSigninCompanySession adapta tenant_id da resposta de rede para o tenantId canônico já usado pela aba. tenantId canônico anterior continua suportado; se as duas chaves existem e divergem, rejeita em vez de escolher autoridade ambígua. O parser readStoredCompanySession permanece BYTE-IDÊNTICO/estrito e continua rejeitando storage em formato wire. Allowlist de papéis, filtro profissional, identidade/token, tipos/campos estáveis, Set que rejeita empresas duplicadas e dados opcionais validados não mudam. IDs não são inventados, normalizados por trim ou inferidos de headers. A API e mobile continuam recebendo tenant_id como antes; SQL/migrations/RLS/auth/header/payload/contratos/JSX/CSS/layout/deps/lock/standalone preservados.

Quatro testes novos da função real, mantendo os6 originais como prefixo integral: rawAPI válido→canonical; combinação wire/canonical+filtro de papéis+duplicados; aliases conflitantes/malformados; roundtrip canonical sem alargar storagewire. RED6PASS/4FAIL→GREEN10/10 local com nativeTSstrip+web-contract reais (sem reescrever fórmula), NÃO typecheck ou render. Web131/total1308 são somente previsão até fullCI.

### Prova Web real ainda exigida
O MESMO navegador/teste mantém todas as condições DOM/UI/API originais, sem relaxar a espera de dashboard (controle DOM conhecido local PASS). Driver também exige token real do navegador revogado401 após signout explícito e outro token da MESMA identidade ainda200; esse token de fixture fica privado e não é impresso. Não há retryPOST, alteração na política de revogação, cancelamento de signin ou limpeza fictícia de sessão tardia. Chrome startup segue15s com stderr seguro para diagnosticar ambiente; não desabilitar sandbox/security/CORS para passar.

OwnCI no novo HEAD/capturas completas/revisão13paths/merge/pósREAL AINDA PENDENTES nesta preparação. Falhas de startup/driver não são declaradas falhas de produto. Precisam haver WEB_BROWSER_WIRE_OBSERVED true para A/B, WEB_BROWSER_JOURNEY_PASS com persistência e isolamento, três capturasPNGhash+bytes e todos gates antigos. AssertUI não soma unitcount. BrowserWebdesktop não é Android/nativo/tecladofísico/VisualTruth nem aceite integral de áreas1/2/4. Sóárea10 tem aceite TÉCNICO INTERNO; outras12 pendentes. Recibo555final jáconsolidado no apêndice anterior deste ciclo; não criar commit só de metadados para si. Externos215/219/220/224/228OPEN, semgastos/serviços/produção/credenciais/contratos/PSP/dinheiroreal.
