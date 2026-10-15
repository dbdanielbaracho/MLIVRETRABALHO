# SLA — fallback numérico para propriedades herdadas — 2026-10-15

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO, não Creator Commerce OS. Base real `79ccfe7b9e2ff2d3661bddb23bb63c8ea14ecc35`, árvore `d7d0b447eb6a070744918bf57774bf1cf6e53def`.

## Contrato e alcance
exceptionSla recebe priority:string, usa urgent15/high60/normal240 e fallback240 para prioridades desconhecidas. SupportController.company/exceptions usa a função; migration0060 já restringe priority do suporte a normal/high/urgent, safety usa urgente e integrity normal. Essa restrição de entrada continua intacta. Não adicionar enum/prioridade, relaxar CHECK ou alegar que API/produção aceitou prioridades herdadas.

## Reprodução local da fonte real
Fonte exception-sla.ts desta base, executada com Node24.19 stripTypeScriptTypes+vm, sem reescrever a fórmula (somente tipos/export para carregar função). Acesso direto mins[x.priority]??240 aceita propriedades herdadas:

| priority desconhecida | targetMinutes anterior | resultado com atraso300min | alvo já esperado |
|---|---|---|---|
| __proto__ | objeto herdado | overduefalse/within_sla | 240,overduetrue |
| constructor | função herdada | overduefalse/within_sla | 240,overduetrue |
| toString | função herdada | overduefalse/within_sla | 240,overduetrue |

urgent15/high60/normal240/future_priority240 permaneceram positivos. Sem prototype pollution, exploitHTTP, render/crash ou ocorrência observada de prioridade inválida em produção: falha reproduzida foi a função dados→SLA retornando tipo/atraso incompatíveis com o fallback existente.

Regressões executadas com o teste original e quatro novos testes: três chaves herdadas e uma matriz de limites. RED2PASS/3FAIL→GREEN5/5, sem skipped. Matriz preserva targets15/60/240/fallback240 e os comparadores estritos em0,target,target+1,2target,2target+1. Loops/asserts não viram novos testes na contagem. O carregador local stripTypeScriptTypes não é typecheck nem substitui fullCI Node22/tsc.

## Correção mínima
Somente a expressão de lookup usa Object.prototype.hasOwnProperty.call(mins,x.priority) antes de ler mins; desconhecida mantém240. Mapa/valores, Date/Math/floor/clamp, timestamp recebido/defaultnow, spread dos campos e comparadores overdue/escalation byte-idênticos. Sem alteração no controlador/SQL/auth/roles/payload/API/migrations/RLS/grants/notificações/estado persistido, nem política de SLA nova.

Todos os testes originais são prefixo integral preservado. Previsão407API/1301total apenas após medirCI; GREEN5local não é suitecompleta ou aceite de área. Próprios gates exatos, revisão bytes/modes/tree/ancestrais e pós-CI REAL ainda PENDENTES nesta preparação. APK N/A somente pela identidade INTEGRAL de mobile/native/deps/lock/workflows/build/smoke; não por[]/APK alheio.

## Recibo final anterior consolidado no ciclo funcional — PR552
```json
{
  "pr": 552,
  "head": "d7643fd727e3b0adb42cfe8f787dc57934010b5f",
  "base": "b05b51152da242160614f55b0022313e33500bea",
  "tree": "d7d0b447eb6a070744918bf57774bf1cf6e53def",
  "red": {
    "head": "3429168da0e81c05ff352da3a347f4c089296c52",
    "run": 38705046563,
    "attempt": 2,
    "job": 116322760476,
    "previousTestsPass": 1294,
    "http500InsteadOf400": 2,
    "valid4000UnicodeAndIsolation": true,
    "infra": {
      "run": 38705046563,
      "sha": "3429168da0e81c05ff352da3a347f4c089296c52",
      "attempt1Job": 116322270006,
      "cause": "ECR quota before checkout, product tests skipped, NOT real RED",
      "failedJobRetries": 1
    }
  },
  "ownCI": {
    "run": 38705843349,
    "job": 116324935286,
    "attempt": 1,
    "sha": "d7643fd727e3b0adb42cfe8f787dc57934010b5f",
    "counts": [
      127,
      753,
      403,
      3,
      11
    ],
    "success": true,
    "allSteps": true,
    "httpPostgres": true,
    "evidence4000Accepted4001Rejected400": true,
    "productionTruth": true
  },
  "checkout": {
    "sha": "443dbf73bf65d0e732cbff4c0a40834760025ef2",
    "parents": [
      "b05b51152da242160614f55b0022313e33500bea",
      "d7643fd727e3b0adb42cfe8f787dc57934010b5f"
    ],
    "tree": "d7d0b447eb6a070744918bf57774bf1cf6e53def",
    "synthetic": true,
    "equivalent": true
  },
  "catalog": {
    "foreignKeys": 110,
    "entireUnchanged": true,
    "ownPostEntireIdentical": true
  },
  "review": {
    "base": "b05b51152da242160614f55b0022313e33500bea",
    "head": "d7643fd727e3b0adb42cfe8f787dc57934010b5f",
    "tree": "d7d0b447eb6a070744918bf57774bf1cf6e53def",
    "paths": [
      {
        "path": "apps/api/src/integrity.controller.ts",
        "mode": "100644"
      },
      {
        "path": "apps/api/src/integrity-input.controller.test.ts",
        "mode": "100644"
      },
      {
        "path": "scripts/http-support-assignment-boundary-e2e.sh",
        "mode": "100755"
      },
      {
        "path": "docs/evidencias/INTEGRITY_EVIDENCE_CHARACTER_LIMIT_2026-10-15.md",
        "mode": "100644"
      },
      {
        "path": "docs/documento-da-verdade/DOCUMENTO_DA_VERDADE_v1.104.md",
        "mode": "100644"
      },
      {
        "path": "docs/conversas/MEMORIA_CONSOLIDADA_CHATGPT_2026-10-05.md",
        "mode": "100644"
      },
      {
        "path": "docs/conversas/CHECKPOINT_EXECUCAO_AUTONOMA.md",
        "mode": "100644"
      },
      {
        "path": "docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.104.md",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/EVIDENCE_REGISTRY.md",
        "mode": "100644"
      },
      {
        "path": "docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md",
        "mode": "100644"
      }
    ],
    "bytesVerified": 10,
    "modes": true,
    "history": true,
    "oldHTTPTestsPreserved": true,
    "oldUnitTestsPreserved": true,
    "onlyOneControllerPredicateChanged": true,
    "unchangedNonDocs": 480,
    "apk": "N/A full identity of all mobile/native/dependency/lock/workflow/build/smoke blobs and modes",
    "ancestry": {
      "ahead": 2,
      "behind": 0,
      "mergeBase": "b05b51152da242160614f55b0022313e33500bea"
    },
    "diff": {
      "files": 10,
      "additions": 1361,
      "deletions": 1
    }
  },
  "postCI": {
    "run": 38706432003,
    "job": 116326881560,
    "attempt": 1,
    "sha": "79ccfe7b9e2ff2d3661bddb23bb63c8ea14ecc35",
    "checkoutLiteral": "79ccfe7b9e2ff2d3661bddb23bb63c8ea14ecc35",
    "counts": [
      127,
      753,
      403,
      3,
      11
    ],
    "success": true,
    "allSteps": true,
    "httpPostgres": true,
    "evidence4000Accepted4001Rejected400": true,
    "productionTruth": true
  },
  "merge": "79ccfe7b9e2ff2d3661bddb23bb63c8ea14ecc35",
  "parents": [
    "b05b51152da242160614f55b0022313e33500bea",
    "d7643fd727e3b0adb42cfe8f787dc57934010b5f"
  ],
  "monitor": {
    "run": 38706431860,
    "job": 116326881477,
    "event": "push",
    "success": true,
    "marker": "2026-10-15T08:32:53.9230245Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"79ccfe7b9e2ff2d3661bddb23bb63c8ea14ecc35\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":0,\"openPrs\":0,\"activeRuns\":1,\"event\":\"push\"}"
  }
}
```
Final551 nos apêndices552, final550 nos551, final549 nos550 e final548 nos549. SnapshotsPENDENTES são história de preparação, não estadofinal. Recibo deste próprio ciclo será consolidado no próximo cicloFUNCIONAL, sem commit autorreferente de metadados.

## Aceites e próximos trabalhos
Somente área10 Androidstandalone mantém aceite TÉCNICO INTERNO; outras12 áreas SEM aceite integral. Catálogo110FKs/0pares do filtro não prova segurança total/classificação automática/aceiteárea7; unit/SQL/HTTP não provam jornadas/taps/render/teclado/SecureStore/VisualTruth/físico/piloto. React19.1.4/RN0.81.6/frozenlock/desenho/tenantRLSPostgres/standalone semMetro preservados. #215/#219/#220/#224/#228 externos OPEN; sem gastos/serviços/produção/credenciais/contratos/PSP/dinheiroreal.

Depois dos gates, revalidar matriz/rotas/contratos e escolher próxima lacuna factual por testes. A auditoria de entradas integrity e a família de vínculos privados anteriores estão concluídas nos respectivos recibos; não repetir classes sem nova reprodução. Priorizar jornadas reais de emulador quando houver ambiente; não converter install/launch/smoke em prova de telas. Preferências/help sem vínculo/previsão/integrações precisam contratos/dados, sem política inventada.
