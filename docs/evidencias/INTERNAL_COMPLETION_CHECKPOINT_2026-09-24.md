# MLIVRETRABALHO — Internal Completion Checkpoint

**Data:** 2026-09-25  
**Documento normativo vigente:** `DOCUMENTO_DA_VERDADE_v1.12.md`  
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
| Real-KYC/KYB provider boundary | provider externo não é autoridade sobre IDs internos/enforcement; binding server-controlled obrigatório | PR #232; `TRUST_PROVIDER_REFERENCE_BOUNDARY_v1.84.md` |
| Finance security baseline | HMAC, anti-replay, idempotência, recipient integrity | PR #216/#218/#222 |
| Finance pilot scope | split por PSP; guarantee/advance/credit fora do piloto | Documento da Verdade v1.12 |
| Real-PSP trust boundary | provider não é autoridade sobre IDs internos; binding server-controlled obrigatório | PR #231; `PAYMENT_PROVIDER_REFERENCE_BOUNDARY_v1.83.md` |
| PSP technical fit | multi-recipient fit documentado; Asaas/Pagar.me mais próximos do caso; MP 1:N condicional | `PSP_TECHNICAL_FIT_MATRIX_2026-09-24.md` |
| Provider adapter contract | auth/idempotency/retries/reference rules e unknowns documentados por provider sem seleção | `PROVIDER_ADAPTER_CONTRACT_MATRIX_2026-09-24.md` |
| Finance unit economics prep | fórmulas e inputs sem taxas inventadas | `FIN_UNIT_ECONOMICS_MODEL_v1.11.md` |
| Provider response evidence | template auditável preparado | `docs/evidencias/provider-responses/README_TEMPLATE.md` |
| Requirements traceability | ledger base + deltas v1.11/v1.12 | `docs/requirements/` |
| Copilot | provider-neutral, mobile-first, critical actions deny-by-default | PR #223 |
| Android pilot distribution | package piloto, build script, hash/build metadata, workflow, rollback/support | PR #227 |
| Pilot device execution prep | roteiro/evidence contract | `PILOT_DEVICE_E2E_EXECUTION_PACKET_2026-09-24.md` |
| Independent pentest prep | escopo/evidence/stop-the-line | `INDEPENDENT_PENTEST_SCOPE_2026-09-24.md` |
| Web functional architecture | contrato funcional e API/role mapping definidos | `WEB_APP_FUNCTIONAL_CONTRACT_v1.11.md` |
| Legal best-practices baseline | revisão interna por fontes primárias e melhores práticas adotada; parecer externo não é gate obrigatório | `LEGAL_BEST_PRACTICES_REVIEW_v1.12.md` |
| Production deploy v1.81 | Railway SUCCESS | `PRODUCTION_DEPLOY_2026-09-24_v1.81.md` |
| Conversa/memória | continuidade persistida | Registro Integral Partes 1–5 |

## Gate jurídico — NOVO ESTADO

### #221 LEGAL-ARCH — EXECUTÁVEL INTERNAMENTE / PARECER EXTERNO REMOVIDO COMO GATE

Decisão v1.12:
- não haverá profissional jurídico brasileiro como requisito obrigatório;
- o projeto seguirá revisão interna contínua baseada em CLT, STF, LGPD, ANPD, demais fontes oficiais e melhores práticas;
- Tema 725/ADPF 324 não será tratado como blindagem automática;
- Tema 1291 permanecerá em watch até tese final aplicável;
- risco residual será registrado explicitamente;
- quando lei, disputa, fiscalização ou representação exigir profissional habilitado, isso será tratado como obrigação específica e não como gate geral do produto.

## Bloqueios externos reais restantes

### #214 Production Truth / CI — PARADO EXTERNAMENTE
GitHub Actions continua falhando antes dos steps; probe HTTP canônico atual ainda pendente. Railway API/Postgres seguem SUCCESS.

### #215 FIN-RISK — PARADO EXTERNAMENTE
Restam provider elegível/contratado, pricing real, PF/PJ/KYC/KYB/PLD, refund/chargeback/negative balance, sandbox, callback provider-specific e reconciliação real. Parecer jurídico externo não é mais gate obrigatório; revisão interna v1.12 orienta o desenho.

### #219 TRUST-ARCH — PARADO EXTERNAMENTE
Restam provider real/elegível, sandbox/callback autenticado/idempotente, operacionalização LGPD/retention e pentest externo. Parecer jurídico externo não é mais gate obrigatório.

### #220 Device/Pilot/Pentest — PARADO EXTERNAMENTE
Restam APK real, aparelho físico, real-device journeys, localização/notificações/deep links, update/rollback, signing e pentest/retest.

### #224 WEB-ARCH — PARADO POR AMBIENTE
Package resolution e CI funcional continuam necessários; não fabricar lockfile.

### #228 PROVIDER-DUE-DILIGENCE — PARADO EXTERNAMENTE
Restam outreach, respostas comerciais, sandbox, pricing, compliance e homologação. Gmail continua não conectado.

## Requirements traceability atual
- ledger histórico: `docs/requirements/REQUIREMENTS_LEDGER.md`;
- delta v1.11: provider-reference/gates;
- delta v1.12: nova estratégia LEGAL-ARCH;
- Documento da Verdade v1.12 prevalece em conflito posterior.

## Regra para próxima continuação
1. recuperar Documento da Verdade v1.12;
2. recuperar este checkpoint;
3. recuperar Registro Integral Partes 1–5;
4. recuperar ledger base + deltas v1.11/v1.12;
5. revalidar primeiro gates externos;
6. não refazer trabalho concluído sem regressão;
7. não usar TinyFish salvo instrução explícita;
8. continuar automaticamente pelo próximo bloco seguro.

## Conclusão
LEGAL-ARCH deixa de ser bloqueio externo geral. O projeto prossegue com melhores práticas jurídicas internas documentadas. Production-DONE/Pilot-DONE ainda dependem dos demais gates técnicos, operacionais e externos.
