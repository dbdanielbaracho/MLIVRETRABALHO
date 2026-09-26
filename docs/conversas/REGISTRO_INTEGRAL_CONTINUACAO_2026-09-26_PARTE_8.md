# Registro Integral da Conversa — Continuação — 2026-09-26 — Parte 8

> Continuação sequencial de `REGISTRO_INTEGRAL_CONTINUACAO_2026-09-25_PARTE_7.md`. As Partes 1–7 permanecem preservadas integralmente. Esta Parte 8 torna-se o arquivo ativo do Registro Integral a partir deste ponto.

## Usuário
Continuar

## Assistente — continuação autônoma e auditoria de retenção
- Continuação executada sem pedir confirmação, conforme regra permanente.
- PR #245 continua sendo a única integração code/schema final-state; não mesclar sem execução real green.

## Retention execution accountability
- Criada migration `0045_privacy_retention_runs.sql`.
- `privacy-retention --apply` passa a exigir `PRIVACY_MAINTENANCE_DATABASE_URL` e `PRIVACY_OPERATOR_ID`.
- Cada execução destrutiva cria `privacy_retention_runs` com operator, status, candidate counts e timestamps.
- Criado `scripts/privacy-retention-audit-e2e.sh` para provar operador/status/completed_at/counts.
- CI passa `PRIVACY_OPERATOR_ID="ci:privacy-retention"` para o retention E2E e roda audit E2E em seguida.

## Bug transacional real encontrado e corrigido
- Auditoria descobriu que `privacy-retention.ts` usava `pool.query('BEGIN')` seguido de outras `pool.query(...)`.
- Em `pg`, isso não garante uso da mesma conexão e portanto não garante transação real.
- Correção aplicada: `const client=await pool.connect()` e todas as mutações + update do audit run usam o mesmo `PoolClient` até COMMIT/ROLLBACK; client é liberado em `finally`.
- O status `completed` do retention run é gravado dentro da mesma transação das mutações, antes do COMMIT, evitando purge concluído com audit run ainda `running` por falha posterior.
- Em erro: ROLLBACK no client + best-effort update externo do run para `failed/error_code`.

## Concorrência de retention runs
- Risco identificado: dois `--apply` simultâneos poderiam executar purge em paralelo.
- Solução escolhida no banco: migration `0046_privacy_retention_single_run.sql` cria índice único parcial sobre constante `(1)` quando `status='running'`.
- Resultado: no máximo um retention run destrutivo pode ficar `running`; segunda execução falha no INSERT antes das mutações.

## Finance integrity
- Migration `0044_earnings_ledger_no_delete.sql` revoga DELETE de `earnings_ledger` para `app_runtime`.
- Teste `finance-ledger-no-delete.sh` comprova que runtime tenant-scoped não consegue apagar fato financeiro e o registro permanece.
- Trust/payment/Safety já possuíam revogações históricas equivalentes.

## Legal hold operations
- Migrations 0042/0043 + CLI `privacy-legal-holds-ops.ts` materializam create/review/release auditáveis.
- Create exige reason, evidence_ref, operator e future review_at.
- Review registra reviewed_at/by/note e next review date.
- Release registra released_at/by/reason.
- E2E dedicado cobre fail-closed e lifecycle.

## Requirements/checkpoint
- `REQUIREMENTS_LEDGER_DELTA_v1.13.md` reconciliado para #245 final-state e migrations 0034–0045; 0046 passa a complementar o single-run guard.
- `INTERNAL_COMPLETION_CHECKPOINT_2026-09-24.md` reescrito/reconciliado em 2026-09-26 para o estado atual, mantendo Production-DONE/Pilot-DONE abertos.

## CI/root cause — revalidação
- Head revalidado antes da migration 0046: `06b88bf6482bb2241801aa794a5273556db9cb32`.
- Run `36249264276`, foundation job `108424112610`, `steps=null`.
- Nenhum checkout/typecheck/build/migration/E2E executou.
- Issue #214 e #219 receberam comentários com o novo hardening e o run atual.
- O blocker continua hosted-runner provisioning antes do workflow; não é tratado como falha funcional nem PASS.

## Estado ativo
- Migrations no PR #245 agora alcançam 0046.
- #245 permanece NÃO MESCLADO.
- Próxima continuação deve partir do Documento da Verdade v1.13 + checkpoint atualizado + esta Parte 8.
