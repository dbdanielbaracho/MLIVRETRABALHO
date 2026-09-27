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

**#245 — `feat(integration): privacy runtime, owner handoff and EAS pilot route`** é a única porta code/schema para o conjunto anteriormente empilhado em #233–#243 e hardenings posteriores.

### Migrations preparadas no PR
`0034` até `0052`, incluindo:
- 0034 professional profile identity binding;
- 0035 identity deactivation;
- 0036 privacy legal holds;
- 0037 privacy requests;
- 0038 portability;
- 0039 company member invitations;
- 0040 DSAR details/evidence/operator notes;
- 0041 DSAR `handled_by`;
- 0042 legal-hold create/release accountability;
- 0043 legal-hold current review projection;
- 0044 `REVOKE DELETE` de `earnings_ledger` para `app_runtime`;
- 0045 audit de execuções destrutivas de retention;
- 0046 remove estratégia persistente de singleton e retention usa advisory lock crash-safe em runtime;
- 0047 integridade/concorrência de company invitations;
- 0048 histórico imutável append-only de revisões de legal hold;
- 0049 limiter de signin/brute-force;
- 0050 integridade de session token hash + índice para cap de sessões;
- 0051 invariantes DB de email/expiração de sessão;
- 0052 boundary de escrita NETWORK_SHARED com confirmação tenant-bound server-controlled.

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

### Retention/legal hold
Preparado no #245:
- precise geo expiry = 30 dias;
- profile anonymization pós-conta = 30 dias;
- assignment chat = 730 dias;
- legal hold bloqueia purge conforme scope;
- legal hold CLI `list/create/history/review/release`;
- create exige reason/evidence/future review date;
- revisão gera evento append-only imutável e atualiza projeção corrente;
- release registra released_at/by/reason sem apagar histórico;
- mutations exigem maintenance DB + operator;
- retention `--apply` exige maintenance DB + operator;
- cada apply gera `privacy_retention_runs` com operator/status/candidate counts/timestamps;
- purge usa `PoolClient` dedicado para garantir transação real;
- status `completed` é gravado na mesma transação das mutações antes do COMMIT;
- single-run usa PostgreSQL advisory lock crash-safe;
- audit rows `running` abandonados são recuperados como failed na execução seguinte.

### Finance integrity adicional
- `earnings_ledger` não pode ser deletado por `app_runtime` (0044);
- teste dedicado prepara prova de que DELETE runtime falha e o fato permanece;
- trust_events/payment_events/safety_cases já possuíam proteções equivalentes nas migrations históricas.

### Auth/session hardening
Preparado no #245:
- dummy scrypt para identidade inexistente/desativada;
- 8 falhas de login em 15 min → lock de 15 min;
- limiter transacional e limpeza no sucesso;
- input bounds: email 320, password 128, workspace 120;
- no máximo 10 sessões ativas por identidade; expiradas são limpas no login e antigas removidas;
- PostgreSQL exige email com shape mínimo/sem whitespace e `sessions.expires_at > created_at`;
- E2E `http-auth-rate-limit-e2e.sh` + `auth-db-invariants-e2e.sh` preparados.

### NETWORK_SHARED least privilege
Auditoria encontrou escrita direta excessiva de `app_runtime` em sinais compartilhados. Preparado no #245:
- `app_runtime` mantém SELECT, mas perde INSERT/UPDATE/DELETE diretos em `marketplace_interests` e `professional_availability_network`;
- empresa confirma interesse por `confirm_marketplace_interest(job,professional)` SECURITY DEFINER;
- função exige `app.tenant_id` e só confirma interesse cujo `marketplace_jobs.tenant_id` coincide com o tenant atual;
- E2E adversarial com dois tenants prova escrita direta negada, confirmação own-tenant permitida e cross-tenant rejeitada.

### API/Web boundary
Preparado sem dependência nova:
- `CORS_ORIGINS` é allowlist explícita;
- CORS permanece desativado quando variável está vazia;
- wildcard é rejeitado;
- só origens HTTP/HTTPS origin-only são aceitas;
- sem cookie credentials; auth Web permanece Bearer-token;
- headers permitidos: authorization/content-type/x-tenant-id;
- teste unitário de parser preparado.

### KYC/KYB storage audit
`verification_cases` armazena status/provider/provider_reference/reason_code/timestamps, sem campos default de documento ou biometria brutos. Isso permanece coerente com TRUST-KYC-DATA-001.

### EAS pilot route
`apps/mobile/eas.json` prepara APK interno via EAS sem token, senha, keystore ou projectId inventado. Não autorizar upgrade pago automaticamente.

## #214 — CI / Production Truth
Root cause agora isolada além do repositório:
- workflows mínimos MLIVRETRABALHO falham antes do primeiro step em ubuntu-22.04, ubuntu-24.04, ubuntu-slim e windows-latest;
- `runner_id=0`, runner vazio, `steps=null`;
- `GROWTH-OS`, mesma conta, teve CI hosted-runner SUCCESS em 2026-09-21 (run `35558675913`);
- `MARKETPULSE`, mesma conta, reproduziu em 2026-09-26 o mesmo `runner_id=0`/`steps=[]` (run `36272180476`, job `108488110231`);
- GitHub Status público reporta Actions operacional.

Conclusão de causa: não é código/YAML específico do MLIVRETRABALHO. A fronteira restante é entitlement/billing/policy de hosted runners no nível da conta ou incidente parcial/não reportado de provisioning.

Support packet: `GITHUB_ACTIONS_RUNNER_SUPPORT_PACKET_2026-09-25.md`.

Último run validado nesta atualização: head #245 `27278c14bd2eae8d140257703d946863fbf4e461`, run `36283553659`, foundation job `108519897133`, `steps=null`.

Ações externas remanescentes para #214:
- Account Settings → Billing/Budgets / Actions entitlement;
- Repo Settings → Actions → General/Runners se necessário;
- se normais, GitHub Support com support packet.

O conector atual não expõe essas configurações administrativas privadas. Não mesclar #245 até CI/equivalente reproduzível executar typecheck/build/migrations/E2Es green.

## #215 / #228 — FIN-RISK + provider
Internamente pronto: provider boundaries, technical-fit matrix, adapter contract, unit economics model, pricing público indicativo, questionnaires, response template e canais de outreach.

Externamente faltam: provider eligibility/contract/pricing real, PF/PJ/KYC/KYB/PLD, liabilities, sandbox/homologação e comportamento do produto contratado. Nenhum provider foi selecionado sem evidência. E-mail connector ainda não está instalado/conectado; nenhum outreach foi falsamente marcado como enviado.

## #219 — TRUST-ARCH
Internamente consolidado no PR #245: privacy/DSAR/retention/legal-hold/owner controls + NETWORK_SHARED least-privilege hardening. Externamente ainda faltam:
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
- ambiente atual sem package resolution GitHub/npm (`HTTP 000` revalidado em 2026-09-26);
- GitHub Actions sem runner.
Não fabricar lockfile. Backend CORS restritivo já preparado no #245. Retomar `apps/web` quando existir package environment reproduzível.

## Regras permanentes de continuação
1. recuperar Documento v1.13 + este checkpoint + Registro Integral ativo;
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
O trabalho interno executável foi levado até hardening de auth/session, privacy/legal hold/retention, finance integrity, owner handoff, CORS seguro e boundary NETWORK_SHARED. O PR #245 continua PREPARADO, NÃO PROVADO e NÃO MESCLADO. Os blockers restantes estão mapeados por causa e dependência externa; Production-DONE e Pilot-DONE permanecem abertos.
