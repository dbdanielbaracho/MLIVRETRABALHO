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
| Trust enforcement baseline | case-first, human-review, appeal/contraditório, incident SLA | ADR-TRUST-001 + evidências Trust |
| Real-KYC/KYB provider boundary | provider externo não é autoridade sobre IDs internos/enforcement | PR #232 |
| LGPD retention baseline | política operacional interna por classe/finalidade | `TRUST_DATA_RETENTION_OPERATIONAL_BASELINE_v1.13.md` |
| DSAR baseline | confirmação/acesso/correção/exclusão tenant-safe + SLA | `DSAR_RUNBOOK_v1.13.md` |
| Privacy notice baseline | transparência sincronizada com classes/providers/retention | `PRIVACY_NOTICE_BASELINE_v1.13.md` |
| Privacy runtime implementation | série preparada, ainda não provada/mesclada | PRs #233–#240 |
| Finance security baseline | HMAC, anti-replay, idempotência, recipient integrity | PR #216/#218/#222 |
| Finance pilot scope | split por PSP; guarantee/advance/credit fora do piloto | Documento da Verdade v1.13 |
| Real-PSP trust boundary | provider não é autoridade sobre IDs internos | PR #231 |
| PSP technical fit | multi-recipient fit documentado | `PSP_TECHNICAL_FIT_MATRIX_2026-09-24.md` |
| Provider adapter contract | auth/idempotency/retries/reference rules e unknowns | `PROVIDER_ADAPTER_CONTRACT_MATRIX_2026-09-24.md` |
| Finance unit economics prep | fórmulas e inputs sem taxas inventadas | `FIN_UNIT_ECONOMICS_MODEL_v1.11.md` |
| Provider response evidence | template auditável preparado | `provider-responses/README_TEMPLATE.md` |
| Requirements traceability | ledger base + deltas v1.11/v1.12/v1.13 | `docs/requirements/` |
| Copilot | provider-neutral, mobile-first, critical actions deny-by-default | PR #223 |
| Android pilot distribution | package piloto, build script, hash/build metadata, workflow, rollback/support | PR #227 |
| Pilot device execution prep | roteiro/evidence contract | `PILOT_DEVICE_E2E_EXECUTION_PACKET_2026-09-24.md` |
| Independent pentest prep | escopo/evidence/stop-the-line | `INDEPENDENT_PENTEST_SCOPE_2026-09-24.md` |
| Web functional architecture | contrato funcional e API/role mapping definidos | `WEB_APP_FUNCTIONAL_CONTRACT_v1.11.md` |
| Legal best-practices baseline | revisão interna adotada; #221 CLOSED | `LEGAL_BEST_PRACTICES_REVIEW_v1.12.md` |
| Production deploy v1.81 | Railway SUCCESS | `PRODUCTION_DEPLOY_2026-09-24_v1.81.md` |
| Conversa/memória | continuidade persistida | Registro Integral Partes 1–5 |

## Privacy runtime — implementação preparada / Definition of Done ainda NÃO atingida

Série empilhada atual:
- #233: restaura binding `professional_profiles.identity_id`, grants e teste DB;
- #234: `GET /v1/privacy/export` tenant-safe/redacted + E2E;
- #235: desativação fail-closed, revogação de sessões e exclusão de identities desativadas de novos fluxos;
- #236: legal hold, purge/anonymization, expiração de geolocalização precisa;
- #237: `privacy_requests`, `requestId` e acompanhamento de DSAR;
- #238: retenção de chat de assignment >730 dias com legal hold;
- #239: tela mobile `Privacidade e dados` para profissional e empresa;
- #240: bloqueio de desativação do único owner ativo de tenant.

Todos permanecem OPEN/NÃO MESCLADOS porque GitHub Actions não executa os steps. Exemplos recentes:
- #238 run `36094756341`, job `107944546741`, `steps=null`;
- #239 run `36094927150`, job `107945062991`, `steps=null`;
- #240 run `36095156863`, job `107945767450`, `steps=null`.

Não usar exceção documental para esses PRs de código/schema.

## Bloqueios reais restantes

### #214 Production Truth / CI — PARADO EXTERNAMENTE
- GitHub Actions continua falhando antes dos steps (`runner_id=0`/`steps=null`).
- `.github/workflows/ci.yml` já foi auditado; não há defeito óbvio que explique ausência total de steps.
- probe HTTP canônico atual ainda precisa ser registrado quando acessível.
- Railway API/Postgres seguem SUCCESS, pending work zero.

### #215 FIN-RISK — PARADO EXTERNAMENTE
Restam provider elegível/contratado, pricing real, PF/PJ/KYC/KYB/PLD, refund/chargeback/negative balance, sandbox, callback provider-specific, reconciliação real e tratamento contábil/fiscal operacional. Parecer jurídico externo não é gate obrigatório.

### #219 TRUST-ARCH — PARCIALMENTE FECHADO INTERNAMENTE / RESTANTE BLOQUEADO
Concluído internamente: provider-reference boundary, appeals/human review, minimização, retenção operacional, DSAR/privacy notice e preparação da série runtime #233–#240.

Restam:
- execução real/green + merge da série #233–#240;
- provider KYC/KYB real/elegível quando necessário;
- sandbox/callback autenticado/idempotente + binding provider-specific;
- propagation para processor/provider quando aplicável;
- pentest/adversarial externo.

### #220 Device/Pilot/Pentest — PARADO EXTERNAMENTE
Restam APK real, aparelho físico, real-device journeys, localização/notificações/deep links, update/rollback, signing e pentest/retest.

### #221 LEGAL-ARCH — CLOSED INTERNAMENTE
Parecer externo removido como gate geral. Reabrir apenas pelos gatilhos v1.12.

### #224 WEB-ARCH — PARADO POR AMBIENTE
Package resolution e CI funcional continuam necessários; não fabricar lockfile.

### #228 PROVIDER-DUE-DILIGENCE — PARADO EXTERNAMENTE
Restam outreach, respostas comerciais, sandbox, pricing, compliance e homologação. Conector de e-mail segue não autorizado/conectado.

## Requirements traceability atual
- ledger histórico: `docs/requirements/REQUIREMENTS_LEDGER.md`;
- delta v1.11: provider-reference/gates;
- delta v1.12: LEGAL-ARCH interno;
- delta v1.13: LGPD/retention/DSAR/privacy + status preparado em #233–#240;
- Documento da Verdade v1.13 prevalece em conflito posterior.

## Regra de continuação
1. recuperar v1.13 + este checkpoint + Registro Integral Parte 5;
2. revalidar primeiro gates externos;
3. continuar por qualquer bloco interno seguro;
4. não fabricar teste/evidência;
5. não usar TinyFish salvo instrução explícita;
6. manter toda conversa no Registro Integral;
7. não mesclar PR code/schema sem execução real de testes.

## Conclusão
LEGAL-ARCH e a política interna LGPD foram avançados internamente e a maior parte dos controles runtime foi preparada em código. Production-DONE/Pilot-DONE ainda dependem de CI/probe, teste/merge da série privacy, providers/sandbox, device/signing, pentest e Web quando o ambiente permitir.