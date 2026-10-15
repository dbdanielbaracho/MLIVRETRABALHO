# Interesses privados legados e substituições — integridade tenant — 2026-10-15

Escopo exclusivo dbdanielbaracho/MLIVRETRABALHO, não Creator Commerce OS. Base real `aa729a09ce708fa722e1844ccff8052fd7cb1cf6`, árvore `e3716184d72cb975bcfd9e2572ec778515d775ac`.

## RED real antes da correção
Head somente regressão `c97940aefb1c93630663e33d3368c6a58e7c9f48`, CI https://github.com/dbdanielbaracho/MLIVRETRABALHO/actions/runs/38703682519, job116317712294, attempt1. Os1294 testes anteriores ([127Web,753mobile,400API,3CLI,11monitor], zero falhas unitárias) e todas as negativas/positivas anteriores inclusive549/550 passaram.

Log primário 2026-10-15T08:11:54.5737826Z..5746490Z aceitou quatro escritas cruzadas: INSERT/UPDATE job_interests(jobT2) e INSERT/UPDATE replacement_requests(assignmentT2), com tenantT1 e app_runtime/SETLOCAL. Erro às08:11:54.5748133Z: workforce_cascade_tenant_integrity: 4 cross-tenant writes accepted. Pais privados T2 invisíveis; marketplaceT2 compartilhado permaneceu legivelmente disponível por contrato.

Todos os privilégios SELECT/INSERT/UPDATE/DELETE de ambas tabelas são conferidos individualmente. Own CRUD e UPSERT/reason foram exercitados antes das negativas. Cada probe aceito reverte por subtransação e a fixture inteira por ROLLBACK. Não há vazamento/bypassHTTP demonstrado; API usa marketplace_interests compartilhado, não job_interests privado legado. ReplacementController já valida tenant, role, pai e locks. Nada em produção foi invocado.

## Contrato, classificação e correção
Migrações0002,0011,0026 e todas as posteriores até0070, JobsController, CompanyJobsController e ReplacementController foram confrontados. job_interests é TENANT privado legado; marketplace_jobs/interests são NETWORK_SHARED; professional_availability_network é PROFESSIONAL_OWNED; identidades/perfis são globais. tenant_id ou flagsRLS não são classificação automática.

Migration0071 adiciona apenas:
- job_interests(job_id,tenant_id) → company_jobs(id,tenant_id), ON DELETE CASCADE, reutilizando unique0064;
- replacement_requests(assignment_id,tenant_id) → work_assignments(id,tenant_id), ON DELETE CASCADE, reutilizando unique0065.

Preserva FKs antigas/cascades, RLS/FORCE/grants, unicidades/status/razões/replay/UPSERT, referência global replacement_professional_id e SETNULL original, dados compartilhados/projection trigger, contratos HTTP/ACK/authority/roles/locks/replacement serialization, seleção humana e nenhuma política financeira nova. NOTVALID+VALIDATE dentroBEGIN/COMMIT falha/rollback com histórico inconsistente, sem apagar/reparentar/adivinhar tenant. Não é migração executada em produção.

## Regressão GREEN exigida
O mesmo script requer quatro rejeições pelas FKs nomeadas, own CRUD/UPSERT e privilégios intactos. DELETE administrativo real da contratação própria remove sua substituição mas mantém interesse privado; DELETE da vaga remove interesse privado e sua projeção/interest compartilhados como antes. Vaga/assignment e marketplaceT2, perfil e identidade globais precisam permanecer. O bloco inteiro reverte, inclusive exclusões.

Catálogo RED108FKs inteiro igual ao próprio/pós550; esperado110FKs com108 entradas antigas idênticas e2 novas validadas. Medir próprio e pós-merge, não presumir. Um filtro de metadados pode então ter zero pares candidatos anteriores, mas isso NÃO é classificação total, segurança completa nem aceite da área7. Não fecha nenhum dos12 aceites pendentes.

Local bash-n do fragmento e script completo passou. OwnCI no novoHEAD, catálogo/SQL/HTTPPostgres/ProductionTruth, revisão de9paths/bytes/modes/histórico/ancestrais/árvore e pós-CI REAL estão PENDENTES nesta preparação. APK N/A somente após identidade INTEGRAL dos insumos mobile/native/deps/lock/workflows/build/smoke, nunca por[] ou APK de outroSHA.

## Recibo final anterior consolidado no ciclo funcional — PR550
```json
{
  "pr": 550,
  "head": "6c14ec905727215ab942463ebc6fae3b73ee407a",
  "base": "a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29",
  "tree": "e3716184d72cb975bcfd9e2572ec778515d775ac",
  "red": {
    "head": "a564c53eda2768d10b30b8d7357908a04b92509c",
    "run": 38702545056,
    "job": 116313985152,
    "previousTestsPass": 1294,
    "crossWritesAccepted": 5
  },
  "ownCI": {
    "run": 38703129362,
    "job": 116315898751,
    "attempt": 1,
    "sha": "6c14ec905727215ab942463ebc6fae3b73ee407a",
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
    "independentRestrictDeletes": true,
    "productionTruth": true
  },
  "checkout": {
    "sha": "e6cd595132e701071a5a0f0292fad1cd8e6c2fc4",
    "parents": [
      "a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29",
      "6c14ec905727215ab942463ebc6fae3b73ee407a"
    ],
    "tree": "e3716184d72cb975bcfd9e2572ec778515d775ac",
    "synthetic": true,
    "equivalent": true
  },
  "catalog": {
    "before": 105,
    "after": 108,
    "allPreviousUnchanged": true,
    "newValidated": 3,
    "ownPostEntireIdentical": true
  },
  "review": {
    "base": "a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29",
    "head": "6c14ec905727215ab942463ebc6fae3b73ee407a",
    "tree": "e3716184d72cb975bcfd9e2572ec778515d775ac",
    "paths": [
      {
        "path": "packages/db/migrations/0070_restricted_assignment_tenant.sql",
        "mode": "100644"
      },
      {
        "path": "scripts/network-shared-write-boundary-e2e.sh",
        "mode": "100755"
      },
      {
        "path": "docs/evidencias/RESTRICTED_ASSIGNMENT_TENANT_INTEGRITY_2026-10-15.md",
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
    "unchangedNonDocs": 480,
    "apk": "N/A full identity of all mobile/native/dependency/lock/workflow/build/smoke blobs and modes",
    "ancestry": {
      "ahead": 2,
      "behind": 0,
      "mergeBase": "a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29"
    },
    "diff": {
      "files": 9,
      "additions": 1398,
      "deletions": 0
    }
  },
  "postCI": {
    "run": 38703640881,
    "job": 116317920049,
    "attempt": 2,
    "sha": "aa729a09ce708fa722e1844ccff8052fd7cb1cf6",
    "checkoutLiteral": "aa729a09ce708fa722e1844ccff8052fd7cb1cf6",
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
    "independentRestrictDeletes": true,
    "productionTruth": true
  },
  "merge": "aa729a09ce708fa722e1844ccff8052fd7cb1cf6",
  "parents": [
    "a1cfd05cfa1df2fd0b29eaa4d2e1beb53e12bc29",
    "6c14ec905727215ab942463ebc6fae3b73ee407a"
  ],
  "infra": {
    "attempt": 1,
    "job": 116317579915,
    "cause": "ECR public quota before checkout; all product gates skipped, not PASS",
    "retryCount": 1
  },
  "monitor": {
    "run": 38703640882,
    "job": 116317580000,
    "event": "push",
    "success": true,
    "marker": "2026-10-15T08:09:20.6848578Z ACTIVITY_WATCH_OBSERVED {\"sha\":\"aa729a09ce708fa722e1844ccff8052fd7cb1cf6\",\"state\":\"CI/ACTIONS EM EXECUÇÃO\",\"ageMinutes\":0,\"openPrs\":0,\"activeRuns\":1,\"event\":\"push\"}"
  }
}
```
O attempt1 pós550 falhou antes decheckout por ECR toomanyrequests/Data limit exceeded, todos os gates de produto skipped (nãoPASS). Uma única repetição limitada do job falho no mesmoSHA concluiu attempt2 SUCCESS; nenhum workflow/imagem/credencial/infra/custo foi alterado. Recibo549 final já está nos apêndices de550. Não repetir merges/reruns concluídos.

## Limites e próxima auditoria independente
Somente área10 Android standalone tem aceite TÉCNICO INTERNO. Outras12 áreas SEM aceite integral. SQL/HTTP/1294 unitários/catálogo não são jornadas de tela/taps/render/teclado/SecureStore/VisualTruth/físico/piloto. React19.1.4/RN0.81.6/frozenlock/desenho/tenantRLSPostgres/standalone semMetro preservados. #215/#219/#220/#224/#228 seguem externos OPEN; sem gastos, serviços novos, produção, credenciais, contratos ou dinheiro real.

Após estes pares, confrontar matriz/13áreas e ampliar testes comportamentais por contratos, não inferir aceite por zero candidatosFK/PRs. Auditoria estática aponta uma hipótese para investigar em outro ciclo funcional: IntegrityController.create limita evidence apenas por trim/não-vazio, enquanto migration0059 exige comprimento1..4000; testar HTTP autenticado com4000/4001 e estados antes/depois antes de alegar defeito ou alterar. Não é falha reproduzida nesta evidência. Também priorizar jornadas de emulador quando houver ambiente real, sem fingir físico ou UI a partir de testes de dados.

Semântica primária: https://www.postgresql.org/docs/17/ddl-constraints.html e https://www.postgresql.org/docs/17/sql-altertable.html. Skill neon-postgres aplicada a migrações versionadas e prova isolada, sem provisionar Neon ou operar produção.
