# Integridade tenant de históricos RESTRICT — 2026-10-15

Escopo exclusivo: dbdanielbaracho/MLIVRETRABALHO. Base real `a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29`, árvore `b2bc7e367775bc5f369ec21ead76fa05caaa7499`. Não é documento do Creator Commerce OS.

## Falha reproduzida, antes da correção
- Head somente regressão `a564c53eda2768d10b30b8d7357908a04b92509c`, CI https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38702545056, job116313985152, attempt1.
- Os 1294 testes anteriores passaram ([127 Web,753 mobile,400 API,3 CLI,11 monitor], zero falhas unitárias). Os controles anteriores inclusive optional-assignment549 passaram.
- Log primário 2026-10-15T08:02:12.3669225Z..3678126Z aceitou cinco escritas com tenantT1 e assignmentT2: cancellation INSERT, conversion INSERT/UPDATE, integrity INSERT/UPDATE. Erro esperado às08:02:12.3681907Z: restrict_assignment_tenant_integrity: 5 cross-tenant writes accepted.
- app_runtime com SET LOCAL app.tenant_id=T1; assignmentT2 invisível. Escritas próprias, replay de cancelamento, UPSERT de nota de conversão, revisão de integridade e grants imutáveis foram controles positivos. Nenhum grant foi relaxado para testar UPDATE/DELETE revogados.
- Cada probe aceito é revertido por subtransação; toda fixture termina ROLLBACK. Banco efêmero do CI, não Neon/produção. Não foi reproduzido bypass HTTP nem vazamento; controladores já validam tenant/autoridade/pai.

## Contratos e correção mínima
Todas as migrações até0069 e controladores CancellationController/CareerConversionController/IntegrityController foram confrontados. As três relações são privadas TENANT; identidades/perfis continuam globais. O cancelamento não cria compensação: compensationPolicy continua none_until_fin_risk_policy_approved. Conversão é proposta interna, não contrato externo.

Migration0070 acrescenta três FKs compostas sobre assignment e tenant, reutilizando unique work_assignments(id,tenant_id) de0065:
- assignment_cancellations(assignment_id,tenant_id) → work_assignments(id,tenant_id);
- direct_hire_conversions(source_assignment_id,tenant_id) → work_assignments(id,tenant_id);
- marketplace_integrity_cases(assignment_id,tenant_id) → work_assignments(id,tenant_id).

Todas mantêm ON DELETE RESTRICT e as FKs antigas. NOT VALID + VALIDATE na mesma transação BEGIN/COMMIT rejeita histórico inconsistente atomicamente, sem apagar/reparentar/adivinhar tenant. RLS/FORCE, grants, imutabilidade de cancelamento, unicidades/replay/UPSERT, API/ACK/roles, política financeira, UI/deps/lock/build permanecem intactos. Nenhuma operação de produção foi invocada via ferramentas; ProductionTruth local não prova implantação.

## Regressão e controles de exclusão
O mesmo SQL agora exige rejeição pelas três FKs nomeadas em cinco probes. Há três assignments próprios independentes, um para cada família: DELETE administrativo de cada um deve falhar pela FK original ou composta daquela família específica, evitando que outra família mascare uma regressão. Pais e histórico permanecem. Replay conserva motivo; UPSERT altera somente nota legítima; revisão mantém decisão/nota; tenantT2 permanece intacto. Tudo reverte.

Catálogo real RED105FKs é inteiro idêntico ao próprio/pós549. Esperado após correção108:105 entradas antigas integralmente iguais e3 novas validadas; medir no CI próprio/pós, não presumir PASS. JSON histórico com95 não é catálogo atual. Insumos mobile/native/deps/lock/workflows/build/smoke devem ser integralmente idênticos; APK será N/A somente após revisão de blobs+modes. Testes SQL não incrementam artificialmente unitcount.

## Gates desta preparação
Local bash -n passou no fragmento e script completo. Own CI no novoHEAD, catálogo108/controlesRESTRICT, HTTP/Postgres/ProductionTruth, revisão bytes/modes/ancestrais/tree e pós-merge REAL ainda PENDENTES nesta preparação. Não interpretar este snapshot histórico como aprovação.

## Recibo final do ciclo funcional anterior — PR549
O PR549 foi integrado e o pós-CI real passou. Mantém casos opcionais via SET NULL apenas em assignment_id, histórico/tenant/identidade de intent/replayACK e cascade original de trust. Regressão adicional HTTP fez DELETE real de assignment descartável e verificou retenção por API.
```json
{
  "pr": 549,
  "head": "82862976c449ce0120acf8a96225d432d3249cef",
  "base": "e0fddd7dfde5515115281f106eebf06b9a8e38c6",
  "tree": "b2bc7e367775bc5f369ec21ead76fa05caaa7499",
  "red": {
    "head": "58ae0973d4800c9efbbe034430b376b94ca983b0",
    "run": 38701428451,
    "job": 116310291217,
    "previousTestsPass": 1294,
    "crossWritesAccepted": 5
  },
  "ownCI": {
    "run": 38701899580,
    "job": 116311842256,
    "attempt": 1,
    "sha": "82862976c449ce0120acf8a96225d432d3249cef",
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
    "realAssignmentDeleteAndReplay": true,
    "productionTruth": true
  },
  "checkout": {
    "sha": "fce33db66193fe022e7ca9deb63c51d45f13b948",
    "parents": [
      "e0fddd7dfde5515115281f106eebf06b9a8e38c6",
      "82862976c449ce0120acf8a96225d432d3249cef"
    ],
    "tree": "b2bc7e367775bc5f369ec21ead76fa05caaa7499",
    "synthetic": true,
    "equivalent": true
  },
  "catalog": {
    "before": 102,
    "after": 105,
    "allPreviousUnchanged": true,
    "newValidated": 3,
    "ownPostEntireIdentical": true
  },
  "review": {
    "base": "e0fddd7dfde5515115281f106eebf06b9a8e38c6",
    "head": "82862976c449ce0120acf8a96225d432d3249cef",
    "tree": "b2bc7e367775bc5f369ec21ead76fa05caaa7499",
    "paths": [
      {
        "path": "packages/db/migrations/0069_optional_case_trust_assignment_tenant.sql",
        "mode": "100644"
      },
      {
        "path": "scripts/network-shared-write-boundary-e2e.sh",
        "mode": "100755"
      },
      {
        "path": "scripts/http-support-assignment-boundary-e2e.sh",
        "mode": "100755"
      },
      {
        "path": "docs/evidencias/OPTIONAL_CASE_TRUST_ASSIGNMENT_TENANT_2026-10-15.md",
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
    "oldSQLTestsPreserved": true,
    "oldHTTPTestsPreserved": true,
    "unchangedNonDocs": 478,
    "apk": "N/A complete identity of all mobile/native/dependencies/lock/workflows/build/smoke blobs and modes"
  },
  "postCI": {
    "run": 38702488598,
    "job": 116313793200,
    "attempt": 1,
    "sha": "a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29",
    "checkoutLiteral": "a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29",
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
    "realAssignmentDeleteAndReplay": true,
    "productionTruth": true
  },
  "merge": "a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29",
  "parents": [
    "e0fddd7dfde5515115281f106eebf06b9a8e38c6",
    "82862976c449ce0120acf8a96225d432d3249cef"
  ],
  "monitor": {
    "run": 38702488553,
    "job": 116313793322,
    "event": "push",
    "success": true,
    "marker": "2026-10-15T07:59:35.5414133Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":0,\"openPrs\":0,\"activeRuns\":1,\"event\":\"push\"}"
  }
}
```

## Limites e próxima auditoria
Somente área10 Android standalone tem aceite técnico interno; outras12 SEM aceite integral. SQL/HTTP/1294 testes/catálogo não provam telas/taps/teclado/SecureStore/VisualTruth/físico/piloto nem fecham área7. #215/#219/#220/#224/#228 continuam externos OPEN; não iniciar custos, serviços, credenciais, contratos, PSP/dinheiro real ou produção.

Após esta família, sobram por metadados dois pares candidatos a investigar, NÃO duas falhas comprovadas: job_interests→company_jobs (privado legado, distinto de marketplace_interests NETWORK_SHARED), replacement_requests→work_assignments. Ambos CASCADE: cruzar contratos/migrações/roles e reproduzir controles positivos/negativos antes de qualquer DDL. Não impor tenant a perfis/globais nem declarar segurança total por FKs.

Fontes semânticas primárias: https://www.postgresql.org/docs/17/ddl-constraints.html e https://www.postgresql.org/docs/17/sql-altertable.html. A skill neon-postgres orientou migração versionada e prova isolada, sem criar recurso Neon ou operar produção.
