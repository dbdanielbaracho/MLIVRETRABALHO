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

## Concorrência de retention runs — primeira abordagem substituída
- Risco identificado: dois `--apply` simultâneos poderiam executar purge em paralelo.
- A primeira abordagem usou migration `0046_privacy_retention_single_run.sql` com índice único parcial para `status='running'`.
- Nova auditoria encontrou falha nessa estratégia: crash do processo depois de criar o audit row poderia deixá-lo `running` indefinidamente e bloquear toda manutenção futura.
- A migration 0046 foi corrigida para remover o índice parcial caso exista; a exclusão mútua deixou de depender de estado persistente incompleto.

## Concorrência crash-safe — solução atual
- `privacy-retention.ts` agora usa `pg_try_advisory_lock(hashtextextended('privacy-retention',0))` na conexão privilegiada dedicada.
- Se outra execução estiver ativa, a segunda falha fechado com `privacy_retention_already_running` antes de qualquer mutação/audit run.
- Advisory lock é liberado em `finally` e também desaparece automaticamente quando a conexão/processo morre.
- Após adquirir o lock, uma nova execução válida marca audit rows `running` abandonados como `failed` com `abandoned_before_completion` antes de iniciar o novo run.
- Mantida a transação real com um único `PoolClient` para purge + status `completed`.
- Criado `scripts/privacy-retention-concurrency-e2e.sh`:
  - segura o advisory lock em outra sessão e exige rejeição da segunda execução;
  - simula audit row abandonado;
  - prova que execução subsequente marca o stale row como failed e conclui normalmente.
- `privacy-retention-audit-e2e.sh` encadeia automaticamente o novo concurrency/recovery E2E.

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
- `REQUIREMENTS_LEDGER_DELTA_v1.13.md` reconciliado para #245 final-state e migrations 0034–0045; 0046 passa a complementar a política de concorrência do retention job sem persistir lock órfão.
- `INTERNAL_COMPLETION_CHECKPOINT_2026-09-24.md` reescrito/reconciliado em 2026-09-26 para o estado atual, mantendo Production-DONE/Pilot-DONE abertos.

## CI/root cause — revalidação e tentativa ativa de desbloqueio
- Head após o concurrency E2E: `28f2f1c491b4c5f0b50b911374e12a76e5d3d739`.
- Run `36251378411`, foundation job inicial `108429927581`, `steps=null`.
- Foi executado manualmente `rerun failed jobs` para tentar remover hipótese de falha transitória.
- GitHub aceitou a reexecução, mas o novo foundation job `108429995114` terminou novamente `failure` com `steps=null`.
- Portanto nenhum checkout/typecheck/build/migration/E2E executou e a reexecução manual não removeu o blocker.
- O sintoma continua hosted-runner provisioning antes do workflow; não é tratado como falha funcional nem PASS.
- Issue #214 atualizado com head/run/rerun e estado Railway atual.
- Issue #219 atualizado com o hardening Trust/Data atual e o mesmo gate de CI.

## Divergência main x #245
- `main` avançou para `a41e28311032880783a17a76a14dafbf77a11c6a` apenas com documentação/evidências.
- Comparação `#245 head → main` mostrou arquivos do avanço de main todos em `docs/...`; nenhum arquivo code/schema/test do PR #245 foi sobreposto.
- `mergeable=false` observado após o avanço de main voltou posteriormente para `mergeable=true`, confirmando recálculo transitório, não conflito de código.

## Auditoria de conta desativada
- Auth signin e session authorization bloqueiam identities com `deactivated_at`.
- Candidate/recommendation, talent pools, replacement e team allocation filtram `identities.deactivated_at IS NULL`.
- Deactivation revoga sessions, apaga disponibilidade e retira interesses abertos, preservando assignments/finance/Trust históricos.
- Não foi identificado nesta rodada novo caminho operacional do PR que selecionasse profissional desativado sem filtro.

## Railway production revalidation
- Projeto `MLIVRETRABALHO`, environment production revalidado.
- API `@mlivretrabalho/api`: deployment `849dd047-c70f-4a16-8624-9a3a01bd8098` = SUCCESS.
- Postgres: deployment `b7718c66-745f-4027-889c-42b52f1c6a63` = SUCCESS.
- `pendingWork=[]`.
- Esta evidência confirma a saúde do deploy já existente, mas não substitui deploy/Production Truth do head #245 ainda não mesclado.
- Probe público `https://mlivretrabalho.predibeacon.com/v1/health/ready` continuou inacessível pela ferramenta web atual; não interpretar isso como API failure.

## WEB-ARCH revalidation
- Probes locais repetidos em 2026-09-26:
  - `https://github.com` -> HTTP 000 / `Could not resolve host: github.com`;
  - `https://registry.npmjs.org` -> HTTP 000 / `Could not resolve host: registry.npmjs.org`.
- Como o GitHub Actions também não provisiona runner, ainda não há ambiente reproduzível capaz de resolver a dependency graph web/Next.js e gerar lockfile real.
- Issue #224 atualizado.
- Não fabricar `pnpm-lock.yaml`; WEB-ARCH permanece PARADO POR AMBIENTE.

## Estado ativo
- Migrations no PR #245 continuam numeradas até 0046, com 0046 agora removendo a estratégia de índice persistente incompatível com crash recovery.
- #245 permanece OPEN e NÃO MESCLADO.
- Railway produção existente permanece saudável.
- CI continua bloqueado externamente antes do primeiro step mesmo após reexecução manual.
- WEB-ARCH continua bloqueado por DNS/package resolution + ausência de runner.
- Próxima continuação deve partir do Documento da Verdade v1.13 + checkpoint atualizado + esta Parte 8.
