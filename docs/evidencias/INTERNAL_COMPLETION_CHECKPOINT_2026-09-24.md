# MLIVRETRABALHO — Internal Completion Checkpoint

**Data:** 2026-09-24  
**Documento normativo vigente:** `DOCUMENTO_DA_VERDADE_v1.11.md`  
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
| Real-KYC/KYB provider boundary | provider externo não é autoridade sobre IDs internos/enforcement; binding server-controlled obrigatório | PR #232; `TRUST_PROVIDER_REFERENCE_BOUNDARY_v1.84.md`; Documento da Verdade v1.11 |
| Finance security baseline | HMAC, anti-replay, idempotência, recipient integrity | PR #216/#218/#222 |
| Finance pilot scope | split por PSP; guarantee/advance/credit fora do piloto | Documento da Verdade v1.10/v1.11 |
| Real-PSP trust boundary | provider não é autoridade sobre IDs internos; binding server-controlled obrigatório | PR #231; `PAYMENT_PROVIDER_REFERENCE_BOUNDARY_v1.83.md` |
| PSP technical fit | multi-recipient fit documentado; Asaas/Pagar.me mais próximos do caso; MP 1:N condicional | `PSP_TECHNICAL_FIT_MATRIX_2026-09-24.md` |
| PSP pricing preliminary | snapshot público apenas indicativo; não substitui proposta comercial | `PSP_PUBLIC_PRICING_SNAPSHOT_2026-09-24.md` |
| Provider adapter contract | auth/idempotency/retries/reference rules e unknowns documentados por provider sem seleção | `PROVIDER_ADAPTER_CONTRACT_MATRIX_2026-09-24.md` |
| Finance unit economics prep | fórmulas, inputs obrigatórios, multi-worker allocation e stop-the-line preparados sem inventar taxas | `FIN_UNIT_ECONOMICS_MODEL_v1.11.md` |
| Provider response evidence | template auditável para respostas/quotes/contratos/sandbox preparado | `docs/evidencias/provider-responses/README_TEMPLATE.md` |
| Provider due diligence | shortlist, questionário e outreach packet preparados | Issue #228 |
| Requirements traceability v1.11 | delta explícito para FIN-REF/TRUST-REF/gates sem apagar ledger histórico | `docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.11.md` |
| Copilot | provider-neutral, mobile-first, critical actions deny-by-default | PR #223 |
| Android pilot distribution | package piloto, build script, hash/build metadata, workflow, rollback/support | PR #227 |
| Pilot device execution prep | roteiro/evidence contract para instalação, update, jornadas, localização, notificações/deep links | `PILOT_DEVICE_E2E_EXECUTION_PACKET_2026-09-24.md` |
| Independent pentest prep | escopo mínimo, evidence contract e stop-the-line preparados | `INDEPENDENT_PENTEST_SCOPE_2026-09-24.md` |
| Web functional architecture | contrato funcional e API/role mapping definidos sem fabricar lockfile | `WEB_APP_FUNCTIONAL_CONTRACT_v1.11.md` |
| Legal review preparation | pacote pronto para revisão externa | `LEGAL_REVIEW_PACKET_2026-09-24.md` |
| Production deploy v1.81 | Railway SUCCESS | `PRODUCTION_DEPLOY_2026-09-24_v1.81.md` |
| Conversa/memória | continuidade persistida | Registro Integral Partes 1, 2, 3 e Parte 4 vigente |

## Bloqueios externos reais

### #214 Production Truth / CI — PARADO EXTERNAMENTE

- GitHub Actions precisa alocar runner e executar pipeline completo;
- probe HTTP público canônico do estado corrente ainda precisa ser registrado.

Última evidência confirmada nesta rodada:
- main `e7a50d7223ed9bb3efd6cad0585c8f8a42d8c67e`;
- run `36085326849`;
- job `107915820888`;
- `failure`;
- `steps=[]`;
- `runner_id=0`;
- `runner_name=""`;
- `runner_group_id=0`.

Nenhum step executou. Railway permanece sem regressão conhecida: API e Postgres `SUCCESS`.

Novo probe público direto foi tentado sem TinyFish; a ferramenta web informou que `https://mlivretrabalho.predibeacon.com/v1/health/ready` não estava acessível por esse tool. Isso não é interpretado como falha da API; current canonical probe permanece pendente.

### #215 FIN-RISK — FECHAMENTO PARADO EXTERNAMENTE

Baseline interno:

`Empresa → PSP → split/repasses → profissional + fee da plataforma → webhook/eventos → ledger/reconciliação`.

Preparação interna adicional concluída nesta rodada:
- provider adapter contract matrix;
- unit economics model sem taxas inventadas;
- provider response evidence template;
- Issue #215 reconciliado com v1.11 e estado real.

Restam externamente:
- provider elegível/contratado;
- pricing/unit economics reais a partir de quote/contract;
- PF/PJ/KYC/KYB/PLD;
- refund/chargeback/negative balance;
- sandbox real;
- callback/provider-specific authentication comprovada;
- binding de referência externa comprovado;
- revisão contábil/tributária/jurídica brasileira.

### #219 TRUST-ARCH — FECHAMENTO PARADO EXTERNAMENTE

Fronteira interna v1.84 concluída: provider real não pode impor tenant/identity IDs internos nem enforcement material; provider reference precisa ser resolvida por binding server-controlled antes do contexto RLS.

Restam externamente:
- provider KYC/KYB real/elegível;
- callback sandbox autenticado/idempotente;
- provider-reference resolution comprovada no sandbox real;
- política LGPD/retention final;
- revisão jurídica brasileira;
- pentest/adversarial externo.

### #220 Device/Pilot/Pentest — EXECUÇÃO PARADA EXTERNAMENTE

Preparação interna inclui roteiro físico e escopo de pentest.

Restam:
- APK real em ambiente Android funcional quando runner/build estiver disponível;
- aparelho físico;
- jornadas real-device;
- localização/notificações/deep links reais;
- update/rollback real;
- release signing/keystore;
- pentest/retest independente.

### #221 LEGAL-ARCH — PARADO EXTERNAMENTE

Preparação interna concluída. Falta parecer/revisão externa de profissional jurídico brasileiro identificado.

### #224 WEB-ARCH — IMPLEMENTAÇÃO PARADA POR AMBIENTE

Preparação interna:
- contrato funcional em `docs/evidencias/WEB_APP_FUNCTIONAL_CONTRACT_v1.11.md`;
- API/role mapping auditado;
- critérios de auth/tenant, caching, acessibilidade, errors, build/CI/deploy e stop-the-line definidos.

Última rechecagem local:
- DNS de `github.com` indisponível;
- DNS de `registry.npmjs.org` indisponível;
- probes HTTPS retornaram `000`.

Não criar Next dependencies nem fabricar `pnpm-lock.yaml`. Implementação `apps/web` retoma apenas com package resolution reproduzível e CI funcional.

### #228 PROVIDER-DUE-DILIGENCE — PARADO EXTERNAMENTE

Internamente concluído:
- shortlist;
- questionnaire;
- outreach packet;
- technical fit matrix;
- public pricing snapshot;
- FIN/TRUST provider-reference boundaries;
- provider adapter contract matrix;
- unit economics model;
- response evidence template.

Restam externamente:
- contato/outreach real;
- confirmação comercial escrita;
- preços/fees reais;
- PF/PJ e compliance;
- sandbox;
- webhook/callback/retries/idempotência reais;
- settlement/refund/chargeback/negative balance;
- privacidade/retenção;
- homologação/produção.

Gmail foi descoberto como plugin disponível para viabilizar o envio dos outreach packets, mas não está conectado/instalado. A opção de conexão foi apresentada ao usuário; envio por e-mail permanece bloqueado até ação explícita de conexão/autorização.

## Requirements traceability atual

- ledger histórico: `docs/requirements/REQUIREMENTS_LEDGER.md`;
- delta vigente: `docs/requirements/REQUIREMENTS_LEDGER_DELTA_v1.11.md`;
- em conflito de estado posterior às fronteiras v1.83/v1.84, Documento da Verdade v1.11 + delta v1.11 prevalecem sem apagar histórico.

## Regra para a próxima continuação

1. recuperar Documento da Verdade v1.11;
2. recuperar este checkpoint;
3. recuperar Registro Integral Partes 1, 2, 3 e Parte 4 vigente;
4. recuperar ledger base + `REQUIREMENTS_LEDGER_DELTA_v1.11.md`;
5. verificar primeiro se algum bloqueio externo mudou;
6. não refazer trabalho concluído sem regressão;
7. registrar toda conversa do projeto;
8. não usar TinyFish salvo instrução explícita futura;
9. avisar claramente quando um gate estiver parado;
10. continuar automaticamente por outro bloco interno quando apenas um gate estiver bloqueado;
11. quando todos os blocos internos seguros estiverem esgotados, declarar claramente que o projeto está parado nos gates externos e listar os gatilhos de retomada.

## Conclusão

O produto **não é declarado Production-DONE nem Pilot-DONE**. A preparação interna segura foi levada ao limite atual em CI/Production Truth preparation, FIN/PSP architecture and economics, Trust/KYC boundary, provider due diligence, device/pentest packet, web functional contract e legal review packet. Os próximos avanços materiais dependem agora de fatores externos: runner/package resolution, provider outreach/contract/sandbox, conexão de e-mail, aparelho físico/signing, revisão profissional brasileira e pentest independente.
