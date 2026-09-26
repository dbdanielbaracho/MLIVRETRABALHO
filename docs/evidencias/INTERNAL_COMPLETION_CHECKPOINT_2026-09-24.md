# MLIVRETRABALHO — Internal Completion Checkpoint

**Atualizado:** 2026-09-26  
**Documento normativo vigente:** `DOCUMENTO_DA_VERDADE_v1.13.md`  
**Regra:** este checkpoint não declara Production-DONE nem Pilot-DONE.

## Objetivo
Registrar o limite real alcançado pelo trabalho executável internamente e impedir regressão de status por perda de contexto.

## Baseline já concluída/mesclada historicamente
- monorepo/API/Postgres e Railway baseline;
- multi-tenancy/RLS/runtime role;
- jornadas profissional/empresa;
- matching, ratings/reputation, teams/planner/replacement/chat/analytics;
- Safety/Trust baseline, causality, appeals e audit trail;
- finance security baseline: signed webhook, anti-replay, idempotência, recipient integrity e duplicate-payout stop-the-line;
- Copilot provider-neutral e critical deny-by-default;
- Android pilot distribution baseline;
- provider reference boundaries FIN/TRUST;
- legal best-practices baseline v1.12; #221 CLOSED internamente;
- Documento da Verdade v1.13 + retention/DSAR/privacy notice/runbook.

## PR #245 — integração final-state ainda NÃO mesclada

**#245 — `feat(integration): privacy runtime, owner handoff and EAS pilot route`** é a única porta code/schema para o conjunto anteriormente empilhado em #233–#243.

### Migrations preparadas no PR
`0034` até `0045`, incluindo:
- 0034 professional profile identity binding;
- 0035 identity deactivation;
- 0036 privacy legal holds;
- 0037 privacy requests;
- 0038 portability;
- 0039 company member invitations;
- 0040 DSAR details/evidence/operator notes;
- 0041 DSAR `handled_by`;
- 0042 legal-hold create/release accountability;
- 0043 legal-hold review accountability;
- 0044 `REVOKE DELETE` de `earnings_ledger` para `app_runtime`;
- 0045 audit de execuções destrutivas de retention.

### Privacy/DSAR
Preparado no #245:
- export tenant-safe/redacted;
- `request_id` persistente;
- detalhes acionáveis para correction/restriction/objection/automated-decision review;
- maintenance CLI `privacy-requests-ops.ts`;
- mutações exigem `PRIVACY_MAINTENANCE_DATABASE_URL` + `PRIVACY_OPERATOR_ID`;
- evidence/operator metadata permanecem internos;
- mobile `Privacidade e dados` para profissional/empresa;
- portabilidade/transparência;
- account deactivation fail-closed + session revocation;
- sole-owner guard + advisory locks contra corrida de dois owners;
- owner handoff por convite seguro.

Evidência: `DSAR_RUNTIME_OPERATIONS_PR245_2026-09-25.md`.

### Retention/legal hold
Preparado no #245:
- precise geo expiry = 30 dias;
- profile anonymization pós-conta = 30 dias;
- assignment chat = 730 dias;
- legal hold bloqueia purge conforme scope;
- legal hold CLI `list/create/review/release`;
- create exige reason/evidence/future review date;
- review registra reviewed_at/by/note + next review;
- release registra released_at/by/reason;
- mutations exigem maintenance DB + operator;
- retention `--apply` exige maintenance DB + operator;
- cada apply gera `privacy_retention_runs` com operator/status/candidate counts/timestamps;
- purge usa `PoolClient` dedicado para garantir transação real;
- status `completed` é gravado na mesma transação das mutações antes do COMMIT;
- em erro, rollback + best-effort `failed/error_code`.

Evidência: `LEGAL_HOLD_OPERATIONS_PR245_2026-09-26.md` + baseline v1.13.

### Finance integrity adicional
- `earnings_ledger` não pode mais ser deletado por `app_runtime` (migration 0044);
- teste dedicado prepara prova de que DELETE runtime falha e o fato permanece;
- trust_events/payment_events/safety_cases já possuíam proteções equivalentes nas migrations históricas.

### KYC/KYB storage audit
`verification_cases` armazena status/provider/provider_reference/reason_code/timestamps, sem campos default de documento ou biometria brutos. Isso permanece coerente com TRUST-KYC-DATA-001.

### EAS pilot route
`apps/mobile/eas.json` prepara APK interno via EAS sem token, senha, keystore ou projectId inventado. Não autorizar upgrade pago automaticamente.

## #214 — CI / Production Truth
Root cause isolada até settings privados do GitHub:
- workflows mínimos falham antes do primeiro step;
- reproduzido em ubuntu-22.04, ubuntu-24.04, ubuntu-slim e windows-latest;
- `runner_id=0`, runner vazio, `steps=null`;
- application code/pnpm/Postgres/checkout não chegam a executar.

Support packet: `GITHUB_ACTIONS_RUNNER_SUPPORT_PACKET_2026-09-25.md`.

Último head conhecido do #245 antes desta atualização documental: `57061590add1a267db0022c7c6f5807f5b06c26c`, run `36249069223`, job `108423573951`, `steps=null`. Novos commits de hardening posteriores também continuam sujeitos ao mesmo gate até revalidação.

Ações externas remanescentes para #214:
- Repo Settings → Actions → General;
- Repo Settings → Actions → Runners;
- Account Settings → Billing/Budgets;
- se normais, GitHub Support com support packet.

Não mesclar #245 até CI/equivalente reproduzível executar typecheck/build/migrations/E2Es green.

## #215 / #228 — FIN-RISK + provider
Internamente pronto: provider boundaries, technical-fit matrix, adapter contract, unit economics model, pricing público indicativo, questionnaires, response template e canais de outreach.

Externamente faltam: provider eligibility/contract/pricing real, PF/PJ/KYC/KYB/PLD, liabilities, sandbox/homologação e comportamento do produto contratado. Nenhum provider foi selecionado sem evidência.

## #219 — TRUST-ARCH
Internamente consolidado no PR #245: privacy/DSAR/retention/legal-hold/owner controls. Externamente ainda faltam:
- CI/equivalente green + merge/deploy;
- provider-specific callback/binding quando houver provider real;
- processor propagation quando aplicável;
- pentest independente.

## #220 — Device/Pilot/Pentest
Internamente: build script histórico + EAS Free route + device execution packet + pentest scope. Externamente:
- autenticar/vincular conta Expo real ou restaurar runner;
- gerar APK real;
- aparelho Android físico e matrix E2E;
- release signing/push credentials quando aplicável;
- pentest/retest independente.

## #224 — WEB-ARCH
Root cause provada:
- lockfile sem importer `apps/web` e sem Next.js;
- ambiente atual sem package resolution GitHub/npm;
- GitHub Actions sem runner.
Não fabricar lockfile. Retomar quando existir package environment reproduzível.

## Regras permanentes de continuação
1. recuperar Documento v1.13 + este checkpoint + Registro Integral Parte 7;
2. para qualquer blocker: sintoma → causa raiz → tentativa segura → revalidação → evidência;
3. só classificar externo após esgotar ações internas razoáveis;
4. continuar outros blocos independentes;
5. não fabricar teste/evidência/provider/device/pentest;
6. não usar TinyFish salvo instrução explícita;
7. manter toda conversa no Registro Integral;
8. não mesclar code/schema sem execução real green;
9. não assumir custo/plano pago sem autorização explícita;
10. #245 é a única integração final-state; #233–#243 serão fechados como superseded após #245 green/merged.

## Conclusão
O trabalho interno foi levado até hardenings adicionais de DSAR, legal hold, finance ledger integrity e retention-run accountability. O PR #245 continua PREPARADO, NÃO PROVADO e NÃO MESCLADO. Os blockers restantes estão explicitamente mapeados por causa e dependência externa; Production-DONE e Pilot-DONE permanecem abertos.
