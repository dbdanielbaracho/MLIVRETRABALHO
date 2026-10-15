# Chat — limite de caracteres PostgreSQL e HTTP — 2026-10-15


---

## Conversas — limite existente de caracteres antes do SQL — 2026-10-15

Escopo exclusivo MLIVRETRABALHO; base `704ffea11cff6985849c775097b952bf81c26f77`, árvore `afa704de025465de2a3cd32adfbed5e45aa151eb`. Todos os documentos originais completos recuperados e preservados em lugar por apêndice; não corresponde ao Creator Commerce OS.

Migration0015 exige body text NOT NULL CHECK(length(body) BETWEEN1 AND4000). A auditoria das73 migrations da base não encontrou remoção ou alteração desse limite:0063 consolida conversas duplicadas;0066 acrescenta integridade tenant. ConversationsController.send já exige trim/não-vazio e usa message_required/BadRequestException; não há nova política de limite ou mudança de schema.

Regressão local da fonte REAL atual com Node24.19 stripTypeScriptTypes+vm, removendo apenas tipos/decorators/imports e fornecendo stubs explícitos Nest/Auth/DB: teste original completo+três testes novos, RED12PASS/1FAIL→candidataGREEN13/13. Isso não substitui Nest HTTP/PostgreSQL/typecheck. Cobre mais4000ASCII/emoji/caracteres combinantes antes db.tenant;4000codepoints válidos/trim/params tenant+sender confiáveis/ACKreal/recipient real; auth/membership antes do input. Os10 testes anteriores da conversa, inclusive concorrência, permanecem prefixo integral. Loops/asserts não aumentam unitcount.

Candidata altera SOMENTE predicado !text para !text||Array.from(text).length>4000, após ctx e trim, reutilizando message_required400 antes do SQL de negócio. Os8 SQLs, argumentos, UPSERT/ACK, ACL, sender/recipient, tenant/RLS/transações, política não idempotente de envio e ausência de retry automático permanecem byte-idênticos. JS.length não serve para rejeitar4000emoji válidos: estes têm8000unidadesUTF16, mas4000caracteres PostgreSQL. Sem truncamento ou normalização de texto.

O HTTP journey existente mantém todos os assertions originais e acrescenta controles localAPI+Postgres, negativos4001ASCII/emoji por profissional/empresa, snapshots completos mensagens/notificaçõesA/B, auth401/membership401, positivos4000comtrim/ACK/lengthPG/octet_length e preservação de histórico/B. A prova HTTP RED real foi obtida e está registrada abaixo; os próprios/pós gates da correção continuam PENDENTES neste snapshot de preparação.

## Recibo FINAL anterior consolidado — PR553
```json
{
  "pr": 553,
  "base": "79ccfe7b9e2ff2d3661bddb23bb63c8ea14ecc35",
  "head": "c32ee702144238821378a582e0abd8837e1b28b7",
  "merge": "704ffea11cff6985849c775097b952bf81c26f77",
  "tree": "afa704de025465de2a3cd32adfbed5e45aa151eb",
  "parents": [
    "79ccfe7b9e2ff2d3661bddb23bb63c8ea14ecc35",
    "c32ee702144238821378a582e0abd8837e1b28b7"
  ],
  "red": {
    "scope": "actual function source+original and4new tests via native TS stripping/vm, not HTTP/typecheck/production",
    "pass": 2,
    "fail": 3,
    "greenPass": 5,
    "greenFail": 0
  },
  "ownCI": {
    "run": 38707092951,
    "attempt": 2,
    "job": 116330711818,
    "head": "c32ee702144238821378a582e0abd8837e1b28b7",
    "success": true,
    "all18Steps": true,
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
      "cancelled": [
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
      ]
    },
    "checkout": {
      "sha": "ca4683b3a3de44a64f92a6aea455751081fc051e",
      "parents": [
        "79ccfe7b9e2ff2d3661bddb23bb63c8ea14ecc35",
        "c32ee702144238821378a582e0abd8837e1b28b7"
      ],
      "tree": "afa704de025465de2a3cd32adfbed5e45aa151eb",
      "synthetic": true,
      "equivalent": true
    },
    "httpPostgres": true,
    "productionTruth": true,
    "infra": "Attempt1 ECR quota BEFORE checkout, product skipped; exactly one retry of failed jobs, attempt2 full success. No further rerun."
  },
  "review": {
    "checks": [
      {
        "path": "apps/api/src/exception-sla.test.ts",
        "blob": true,
        "mode": "100644",
        "prefix": true,
        "chars": 1665
      },
      {
        "path": "apps/api/src/exception-sla.ts",
        "blob": true,
        "mode": "100644",
        "prefix": false,
        "chars": 526
      },
      {
        "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
        "blob": true,
        "mode": "100644",
        "prefix": true,
        "chars": 498647
      },
      {
        "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
        "blob": true,
        "mode": "100644",
        "prefix": true,
        "chars": 840965
      },
      {
        "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
        "blob": true,
        "mode": "100644",
        "prefix": true,
        "chars": 508395
      },
      {
        "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
        "blob": true,
        "mode": "100644",
        "prefix": true,
        "chars": 91243
      },
      {
        "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
        "blob": true,
        "mode": "100644",
        "prefix": true,
        "chars": 494578
      },
      {
        "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
        "blob": true,
        "mode": "100644",
        "prefix": true,
        "chars": 493452
      },
      {
        "path": "docs/evidencias/EXCEPTION_SLA_OWN_PRIORITY_2026-10-15.md",
        "blob": true,
        "mode": "100644",
        "prefix": null,
        "chars": 8325
      }
    ],
    "onlyLookupExpression": true,
    "unchangedNonDocs": 481,
    "apk": "N/A full protected input blob/mode identity",
    "tree": "afa704de025465de2a3cd32adfbed5e45aa151eb"
  },
  "postCI": {
    "run": 38737341120,
    "attempt": 1,
    "job": 116429886035,
    "sha": "704ffea11cff6985849c775097b952bf81c26f77",
    "checkoutLiteral": "704ffea11cff6985849c775097b952bf81c26f77",
    "success": true,
    "all18Steps": true,
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
      "cancelled": [
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
      ]
    },
    "httpPostgres": true,
    "productionTruth": true,
    "catalogForeignKeys": 110,
    "catalogOwnPostEntireIdentical": true
  },
  "monitor": {
    "scheduleRun": 38713095475,
    "scheduleJob": 116349094163,
    "success": true,
    "pushRun": 38737341187,
    "pushJob": 116429886696,
    "pushSuccess": true,
    "marker": "2026-10-15T12:47:34.8570842Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"704ffea11cff6985849c775097b952bf81c26f77\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":0,\"openPrs\":0,\"activeRuns\":1,\"event\":\"push\"}",
    "issue554": {
      "state": "closed",
      "closedAt": "2026-10-15T12:47:35Z",
      "botComment": 6192416713,
      "sha": "704ffea11cff6985849c775097b952bf81c26f77",
      "manualIssueWrites": false
    }
  },
  "acceptance": "Only area10 Android standalone TECHNICAL INTERNAL accepted;12 others not fully accepted.",
  "remainingExternal": [
    228,
    224,
    220,
    219,
    215
  ],
  "openPRs": 0
}
```

Este recibo553 é final, incluindo CI próprio e pós-merge real; os PENDENTES nos apêndices de preparação553 são históricos. Não repetir ready/merge/rerun553 nem anteriores. O recibo do próprio ciclo será consolidado no próximo ciclo FUNCIONAL, sem commit autorreferente só de metadados.

## Aceites e limites
Só área10 Android standalone tem aceite TÉCNICO INTERNO; outras12 ainda SEM aceite integral. Esta fatia pertence às áreas8/9/11 e não as encerra. Unit/SQL/HTTP não provam tela/taps/render/teclado/VisualTruth/físico/SecureStore/piloto. Catálogo110FKs/0pares não é classificação automática nem segurança total. APK N/A apenas pela identidade INTEGRAL de mobile/native/deps/lock/workflows/build/smoke; nenhum APK de outroSHA atribuído aqui.

React19.1.4/RN0.81.6/frozenlock/desenho canônico preservados. Externos215/219/220/224/228 OPEN separados; sem produção/Railway/Neon/novosserviços/gastos/credenciais/contratos/PSP/dinheiroreal. Priorizar também jornadas reais de cliente/estados e testes de falhas notificações conforme contrato, sem inventar outbox/provider/ajuda sem vínculo. Auditoria estática42controllers localizou3sites INSERTnotifications(company-jobs,replacement,conversations), todos em DatabaseService.tenant BEGIN/COMMIT/catchROLLBACK; isso não é prova comportamental de falha na inserção de notificação.

## RED HTTP/PostgreSQL REAL — confirmado antes do fix
```json
{
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
}
```
O log primário mostra conversation_messages_body_check para cada4001. As4000Unicode foram persistidas comlength4000/octet16000. Snapshots completos mensagens/notificações A/B e auth/membership401 passaram. Não é bypassHTTP/vazamento/produção/tela. Attempts1/2 falharamANTEScheckout porECRquota e NÃO contam como RED; a tentativa3 executou1301 anteriores PASS e falhou apenas no novo marcador esperado4HTTP500.

Todos próprios gates do novo HEAD, revisão final e pós-merge REAL continuam PENDENTES neste snapshot de preparação. API previsto410/total1304 somente após medirCI, nunca por projeção.
