# MLIVRETRABALHO — Internal Completion Checkpoint

**Data:** 2026-09-25  
**Documento normativo vigente:** `DOCUMENTO_DA_VERDADE_v1.13.md`  
**Regra:** este checkpoint não declara Production-DONE nem Pilot-DONE.

## Objetivo
Registrar o limite real alcançado pelo trabalho executável internamente e impedir regressão de status por perda de contexto.

## Concluído internamente

| Área | Estado interno | Evidência principal |
|---|---|---|
| Monorepo/API/Postgres | implementado e Railway deployado | Railway + Requirements Ledger |
| Multi-tenancy/RLS/runtime role | baseline implementado | ADR-MT-001 + suites históricas |
| Jornada profissional | implementada em código/mobile + HTTP E2E histórico | PRs #179–#200 |
| Jornada empresa | jobs/candidatos/confirmação/teams/planner/replacement/analytics/chat | PRs #184–#212 |
| Matching | sinais reais + ranking explicável | PR #212 |
| Ratings/Reputation | bidirecional + reputação de empresa | PR #207–#210 |
| Safety/Trust | reporting, causality, appeals e audit trail | PRs #209/#213/#217/#225/#226 |
| Trust enforcement baseline | case-first, human-review, appeal/contraditório | ADR-TRUST-001 + evidências Trust |
| Real-KYC/KYB provider boundary | provider não é autoridade sobre IDs internos/enforcement | PR #232 |
| LGPD retention/DSAR/privacy baseline | política v1.13 + runbook + notice | evidências v1.13 |
| Privacy runtime implementation | série preparada, ainda não provada/mesclada | PRs #233–#243 |
| Finance security baseline | HMAC, anti-replay, idempotência, recipient integrity | PR #216/#218/#222 |
| Finance pilot scope | split por PSP; guarantee/advance/credit fora do piloto | Documento da Verdade v1.13 |
| Real-PSP trust boundary | provider não é autoridade sobre IDs internos | PR #231 |
| PSP technical fit / adapter contract / unit economics | preparação concluída sem taxas inventadas | evidências FIN/PSP |
| Provider outreach preparation | templates + canais concretos atuais | `PROVIDER_OUTREACH_PACKET_2026-09-24.md` |
| Requirements traceability | ledger base + deltas v1.11/v1.12/v1.13 | `docs/requirements/` |
| Copilot | provider-neutral, mobile-first, critical actions deny-by-default | PR #223 |
| Android pilot distribution | package piloto, build script, metadata, rollback | PR #227 |
| Alternate free APK route | EAS Free profile preparado, sem segredo/projectId falso | PR #245 + `EAS_FREE_PILOT_BUILD_ROUTE_2026-09-25.md` |
| Pilot device execution prep | roteiro/evidence contract | `PILOT_DEVICE_E2E_EXECUTION_PACKET_2026-09-24.md` |
| Independent pentest prep | escopo/evidence/stop-the-line | `INDEPENDENT_PENTEST_SCOPE_2026-09-24.md` |
| Web functional architecture | contrato funcional + API/role mapping | `WEB_APP_FUNCTIONAL_CONTRACT_v1.11.md` |
| Legal best-practices baseline | revisão interna adotada; #221 CLOSED | `LEGAL_BEST_PRACTICES_REVIEW_v1.12.md` |
| CI root-cause diagnosis | cross-OS hosted-runner failure isolated before steps | `GITHUB_ACTIONS_RUNNER_SUPPORT_PACKET_2026-09-25.md` |
| Blocker governance | root-cause/unblock matrix formalizada | `BLOCKER_ROOT_CAUSE_MATRIX_2026-09-25.md` |
| Production deploy v1.81 | Railway SUCCESS | `PRODUCTION_DEPLOY_2026-09-24_v1.81.md` |
| Conversa/memória | continuidade persistida | Registro Integral Partes 1–6 |

## Série code/schema preparada — Definition of Done ainda NÃO atingida

Stack atual:
- #233: binding `professional_profiles.identity_id`, grants e teste DB;
- #234: `GET /v1/privacy/export` tenant-safe/redacted + E2E;
- #235: desativação fail-closed, revogação de sessões e exclusão de identities desativadas de novos fluxos;
- #236: legal hold, purge/anonymization e expiração de geolocalização precisa;
- #237: `privacy_requests`, `requestId` e acompanhamento de DSAR;
- #238: retenção de chat >730 dias com legal hold;
- #239: mobile `Privacidade e dados`;
- #240: bloqueio de desativação do único owner ativo;
- #241: portabilidade + aviso de transparência mobile;
- #242: export ampliado/redacted de dados do titular;
- #243: convites seguros de membros + owner handoff;
- #245: profile EAS Free para APK interno, empilhado sobre #243.

PRs code/schema permanecem não mesclados sem execução real de testes. Não usar exceção documental.

## #214 Production Truth / CI — CAUSA RAIZ ISOLADA ATÉ SETTINGS PRIVADOS

Sintoma histórico: jobs encerram em segundos com `runner_id=0`, runner vazio e `steps=[]/null`.

Diagnóstico mínimo PR #244 removeu aplicação, pnpm, PostgreSQL e checkout. Falha foi reproduzida antes do primeiro step em:
- `ubuntu-22.04`;
- `ubuntu-24.04`;
- `ubuntu-slim`;
- `windows-latest`.

Run cross-OS: `36154183174`.

Conclusão: o defeito está na camada de entitlement/provisionamento/configuração de GitHub-hosted runners, antes do workflow. PR #244 foi fechado sem merge após diagnóstico.

Evidência/suporte: `GITHUB_ACTIONS_RUNNER_SUPPORT_PACKET_2026-09-25.md`.

Ações restantes que o conector não consegue executar por serem settings privados:
- Repo Settings → Actions → General;
- Repo Settings → Actions → Runners;
- Account Settings → Billing and licensing / Budgets;
- se normais, GitHub Support com o pacote já preparado.

Railway continua SUCCESS e pending work zero. Probe HTTP atual continua inacessível a partir da ferramenta atual, sem ser interpretado como falha da API.

## #215 / #228 FIN-RISK + Provider — LIMITE INTERNO ATINGIDO

Concluído internamente: arquitetura split-by-PSP, provider boundaries, adapter contract, unit economics model, pricing público indicativo, questionnaires, response template e canais atuais.

Canais revalidados incluem:
- Asaas: `contato@asaas.com.br`, `0800 009 0037`;
- Pagar.me: `comercial@pagar.me`;
- Serpro/Datavalid: `comercial@serpro.gov.br`;
- Mercado Pago: contato comercial/formulário obrigatório para produto marketplace/facilitator relevante.

Restam fatos que pertencem ao provider: elegibilidade, contrato, pricing real, PF/PJ/KYC/KYB/PLD, liabilities, sandbox, homologação e comportamento exato do produto contratado.

AgentMail foi disponibilizado como opção de caixa dedicada para outreach; conexão/autorização depende do usuário. Gmail também permanece não conectado. Nenhum e-mail foi falsamente marcado como enviado.

## #219 TRUST-ARCH — PREPARAÇÃO INTERNA COMPLETA / PROVAS EXTERNAS PENDENTES

Baseline + runtime privacy stack #233–#243 preparados. Restam:
- CI/equivalente green + merge da stack;
- provider real somente se PSP-native onboarding deixar gap;
- callback/binding provider-specific em sandbox;
- processor propagation quando aplicável;
- pentest independente.

## #220 Device/Pilot/Pentest — APK BLOCKER REDUZIDO

Além do build script/GitHub workflow histórico, PR #245 prepara Expo EAS Free:
- `apps/mobile/eas.json`;
- `pilot` = internal distribution + APK;
- URL pública da API somente;
- nenhum token, keystore ou Expo projectId inventado.

A documentação oficial atual do Expo informa plano Free de $0 com até 15 builds Android e 15 iOS por ciclo e suporte a APK internal. Política do projeto: não fazer upgrade pago automaticamente.

Restam:
- autenticar/vincular conta/projeto Expo real e executar build, ou restaurar GitHub runner;
- aparelho Android físico e matrix E2E;
- push credentials quando necessárias;
- signing de release além do piloto fechado;
- pentest/retest independente.

## #224 WEB-ARCH — ROOT CAUSE PROVADA

Lockfile auditado:
- sem importer `apps/web`;
- sem pacote Next.js;
- `react-dom` apenas transitivo do Expo Router.

Ambiente atual:
- não resolve `github.com`;
- não resolve `registry.npmjs.org`;
- sem checkout/cache pnpm local.

GitHub Actions também não provisiona runner (#214). Logo não existe atualmente um ambiente reproduzível capaz de resolver a nova dependency graph. Não fabricar lockfile. Retomar quando #214 voltar ou outro ambiente autorizado com npm/GitHub for conectado.

## #221 LEGAL-ARCH — CLOSED INTERNAMENTE
Parecer externo removido como gate geral. Revisão interna contínua por fontes primárias e melhores práticas; reabrir pelos gatilhos v1.12.

## Matriz causal de bloqueios
Fonte vigente: `docs/evidencias/BLOCKER_ROOT_CAUSE_MATRIX_2026-09-25.md`.

Prioridade de desbloqueio:
1. hosted runner/settings GitHub #214;
2. canal outbound para providers #228;
3. conta/projeto Expo Free para APK #220;
4. device físico;
5. pentest independente após build estável;
6. Web assim que existir package environment reproduzível.

## Regra de continuação
1. recuperar v1.13 + este checkpoint + Registro Integral Parte 6;
2. para todo blocker: diagnosticar causa → tentar correção → revalidar → documentar;
3. só chamar de externo quando ações internas estiverem esgotadas;
4. continuar por outros blocos independentes;
5. não fabricar teste/evidência;
6. não usar TinyFish salvo instrução explícita;
7. manter toda conversa no Registro Integral;
8. não mesclar PR code/schema sem execução real de testes;
9. não assumir custo/plano pago sem autorização explícita.

## Conclusão
O trabalho interno foi levado além da preparação documental: root causes foram isoladas, a stack privacy/ownership foi materializada em código, a rota gratuita EAS foi preparada e os canais provider foram concretizados. Os gates remanescentes dependem de settings/serviços/credenciais/hardware/independência externa identificados explicitamente; não há evidência de um bloco interno esquecido fora da matriz atual.