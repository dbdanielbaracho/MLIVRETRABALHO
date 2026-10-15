# Evidência de integridade — limite de caracteres antes da escrita — 2026-10-15

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO, não Creator Commerce OS. Base real `b05b51152da242160614f55b0022313e33500bea`, árvore `3398d6fa1c931569d7459d3e5469255bd12d42e8`.

## Contrato existente, sem política nova
Migration0059 já exige CHECK(char_length(evidence) BETWEEN1 AND4000). IntegrityController.create já exige texto não vazio após trim e responde integrity_case_invalid nos demais inputs inválidos, com auth/membership/owner-admin antes da validação. Nenhuma nova regra de comprimento foi criada.

## Reprodução HTTP/PostgreSQL real
Head somente regressão `3429168da0e81c05ff352da3a347f4c089296c52`, CI https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38705046563, attempt2/job116322760476. Attempt1/job116322270006 falhou antes decheckout por ECR toomanyrequests/Data limit exceeded; todos os gates de produto skipped (nãoRED/PASS). Um único retry do job falho MESMOSHA permitiu a reprodução real.

Os1294 testes anteriores ([127Web,753mobile,400API,3CLI,11monitor], zero falhas) e SQLs anteriores inclusive551 passaram. A fixture local-only criou/persistiu casos com4000ASCII e4000emoji, comparou conteúdo real e assignment/status, e PostgreSQL confirmou char_length4000/octet_length16000 para4000emoji.

Logs primários:
- 2026-10-15T08:25:21.5968712Z:4001ASCII → HTTP500;
- 2026-10-15T08:25:21.6802130Z:4001Unicode → HTTP500;
- 2026-10-15T08:25:21.6977564Z:FAIL integrity evidence oversized HTTP contract:2 responses were not400.
O log da API identificou marketplace_integrity_cases_evidence_check, não erro de autoridade. GETs reais após cada negativa permaneceram iguais, empresaB intacta; invalidtoken401 e profissional403 precederam input. Isso é erro de contrato de entrada, não bypass HTTP/vazamento/produção. Banco/servidor descartáveis do CI, nenhum recurso Neon ou produção invocado.

## Correção mínima e regressões
Acrescentar somente Array.from(evidence).length>4000 ao predicado de entrada após o trim existente e após ctx. Reutiliza integrity_case_invalid/BadRequestException, antes de entrar na transação de negócio/consultar assignment/inserir. SQL/params/headers/payload/endpoint/ACK/list/review/roles/RLS/tenant/transações intactos; auth pode consultar suas fontes como antes.

Array.from conta por iteração de string, sem impor erroneamente limite por unidadesUTF16: localmente4000emoji têm8000unidades mas4000elementos; a fixture PostgreSQL real acima confirmou o contrato Unicode. Não é truncamento/normalização/reinterpretação de evidence. Espaços externos continuam sujeitos ao trim existente. Schema/migrations e limite do banco não mudam.

Três regressões unitárias novas, com todos os testes anteriores preservados por prefixo:
1. rejeitar4001ASCII/emoji e4001codepoints combinantes antes de SQL de negócio;
2. aceitar1..4000ASCII/emoji/codepoints combinantes, manter trim, params confiáveis e ACK real para owner/admin;
3. manter auth401/membership/owner-admin403/tenant_required antes do limite.
O mesmo E2E HTTP que falhou exige400 em ambos excessos, sem novas linhas ou alterações emB, com4000 Unicode válidos. Não somar casos de loop/SQL ao unitcount; esperado403API/1297total SOMENTE após medir no CI.

Preparação local: bash-n fragmento/scriptHTTP completo passou; mudança de controlador é um único predicado, auth/list/review e SQL byte-idênticos. OwnCI do novoHEAD, revisão de bytes/modes/tree/ancestrais e pós-CI REAL ainda PENDENTES nesta preparação. APK N/A somente após identidade INTEGRAL dos insumos mobile/native/deps/lock/workflows/build/smoke; nunca por[] ou APK emprestado.

## Recibo final anterior consolidado no mesmo ciclo funcional — PR551
```json
{
  "pr": 551,
  "head": "a4a038394ba11d0bdf4cc397bc3a03ec548f5012",
  "base": "aa729a09ce708fa722e1844ccff8052fd7cb1cf6",
  "tree": "3398d6fa1c931569d7459d3e5469255bd12d42e8",
  "red": {
    "head": "c97940aefb1c93630663e33d3368c6a58e7c9f48",
    "run": 38703682519,
    "job": 116317712294,
    "previousTestsPass": 1294,
    "crossWritesAccepted": 4
  },
  "ownCI": {
    "run": 38704350741,
    "job": 116319932018,
    "attempt": 1,
    "sha": "a4a038394ba11d0bdf4cc397bc3a03ec548f5012",
    "counts": [
      127,
      753,
      400,
      3,
      11
    ],
    "success": true,
    "allSteps": true,
    "httpPostgres": true,
    "privateCascadesAndSharedGlobalPreserved": true,
    "productionTruth": true
  },
  "checkout": {
    "sha": "44e71d99a040f7854b11d6c99f6788a000cfcd82",
    "parents": [
      "aa729a09ce708fa722e1844ccff8052fd7cb1cf6",
      "a4a038394ba11d0bdf4cc397bc3a03ec548f5012"
    ],
    "tree": "3398d6fa1c931569d7459d3e5469255bd12d42e8",
    "synthetic": true,
    "equivalent": true
  },
  "catalog": {
    "before": 108,
    "after": 110,
    "allPreviousUnchanged": true,
    "newValidated": 2,
    "remainingMetadataPairs": 0,
    "notAreaAcceptance": true,
    "ownPostEntireIdentical": true
  },
  "review": {
    "base": "aa729a09ce708fa722e1844ccff8052fd7cb1cf6",
    "head": "a4a038394ba11d0bdf4cc397bc3a03ec548f5012",
    "tree": "3398d6fa1c931569d7459d3e5469255bd12d42e8",
    "paths": [
      {
        "path": "packages/db/migrations/0071_private_workforce_cascade_tenant.sql",
        "mode": "100644"
      },
      {
        "path": "scripts/network-shared-write-boundary-e2e.sh",
        "mode": "100755"
      },
      {
        "path": "docs/evidencias/PRIVATE_WORKFORCE_CASCADE_TENANT_INTEGRITY_2026-10-15.md",
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
    "bytesVerified": 9,
    "modes": true,
    "history": true,
    "oldSQLTestsPreserved": true,
    "unchangedNonDocs": 481,
    "apk": "N/A full identity of all mobile/native/dependency/lock/workflow/build/smoke blobs and modes",
    "ancestry": {
      "ahead": 2,
      "behind": 0,
      "mergeBase": "aa729a09ce708fa722e1844ccff8052fd7cb1cf6"
    },
    "diff": {
      "files": 9,
      "additions": 1438,
      "deletions": 0
    }
  },
  "postCI": {
    "run": 38704904134,
    "job": 116321788800,
    "attempt": 1,
    "sha": "b05b51152da242160614f55b0022313e33500bea",
    "checkoutLiteral": "b05b51152da242160614f55b0022313e33500bea",
    "counts": [
      127,
      753,
      400,
      3,
      11
    ],
    "success": true,
    "allSteps": true,
    "httpPostgres": true,
    "privateCascadesAndSharedGlobalPreserved": true,
    "productionTruth": true
  },
  "merge": "b05b51152da242160614f55b0022313e33500bea",
  "parents": [
    "aa729a09ce708fa722e1844ccff8052fd7cb1cf6",
    "a4a038394ba11d0bdf4cc397bc3a03ec548f5012"
  ],
  "monitor": {
    "run": 38704904005,
    "job": 116321788671,
    "event": "push",
    "success": true,
    "marker": "2026-10-15T08:20:10.9893109Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"b05b51152da242160614f55b0022313e33500bea\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":0,\"openPrs\":0,\"activeRuns\":1,\"event\":\"push\"}"
  }
}
```
Final550 já está nos apêndices551, final549 nos550, final548 nos549. Não repetir merges/reruns nem criar commit metadados autorreferente para fechar este próprio recibo. SnapshotsPENDENTES históricos preservam preparação, não estado final.

## Aceites e próximas provas
Somente área10 Androidstandalone tem aceite TÉCNICO INTERNO; outras12 SEMaceiteintegral. Catálogo110FKs com zero pares no filtro anterior não prova classificação total, autorização correta em todos os endpoints ou aceiteárea7. Unit/HTTP/SQL não são render/taps/teclado/SecureStore/VisualTruth/físico/piloto. Externos215/219/220/224/228 continuamOPEN, sem gastos/serviços/credenciais/contratos/PSP/dinheiroreal/produção.

Auditoria paralela executou a fonte real exception-sla.ts usando stripTypeScriptTypes do Node24 +vm, sem reescrever fórmula: urgent15/high60/normal240/future_priority240 funcionaram; __proto__ retornou objeto e constructor/toString funções, convertendo atraso300min em within_sla em vez do fallback240 já existente. Isso é função dados→SLA; não é exploitHTTP/prototype pollution/render ou uso observado de prioridade inválida em produção. Próximo: verificar contrato/callers e reproduzir com regressões da função real antes de corrigir own-property fallback, preservando15/60/240 e limites estritos de overdue/escalation; não criar política nova.

Fontes semânticas primárias: https://www.postgresql.org/docs/17/functions-string.html e https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype-@@iterator. Fonte local e HTTP real prevalecem sobre inferência de tipos.
