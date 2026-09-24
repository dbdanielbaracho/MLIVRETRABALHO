# MLIVRETRABALHO — Internal Completion Checkpoint

**Data:** 2026-09-24  
**Documento normativo vigente:** `DOCUMENTO_DA_VERDADE_v1.8.md`  
**Regra:** este checkpoint não declara Production-DONE nem Pilot-DONE.

## Objetivo

Registrar o limite real alcançado pelo trabalho executável internamente nesta rodada e impedir regressão de status por perda de contexto.

## Concluído internamente

| Área | Estado interno | Evidência principal |
|---|---|---|
| Monorepo/API/Postgres | implementado e Railway deployado | Railway + Requirements Ledger |
| Multi-tenancy/RLS/runtime role | baseline implementado | ADR-MT-001 + suites históricas |
| Jornada profissional | implementada em código/mobile + HTTP E2E histórico | PRs #179–#200 e scripts de jornada |
| Jornada empresa | jobs/candidatos/confirmação/teams/planner/replacement/analytics/chat | PRs #184–#212 |
| Matching | sinais reais + ranking explicável | PR #212 |
| Ratings/Reputation | bidirecional + aggregate company reputation | PR #207–#210 |
| Safety reporting | multiempresa + audit trail | PR #209/#213 |
| Trust causality | causa explícita + ator + append-only | PR #217 |
| Appeals/contraditório | API, RLS, immutable audit, mobile profissional/empresa | PR #225/#226 |
| Trust matrix | proposta human-review/deny-by-default | `TRUST_ENFORCEMENT_MATRIX_PROPOSED_2026-09-24.md` |
| Trust incident SLA | baseline operacional proposto | `TRUST_INCIDENT_SLA_PROPOSED_2026-09-24.md` |
| Trust minimização/retencão | proposta preparada para revisão | `TRUST_DATA_MINIMIZATION_RETENTION_PROPOSED_2026-09-24.md` |
| Finance security baseline | webhook HMAC, anti-replay, idempotência, recipient integrity | PR #216/#218/#222 |
| Finance pilot scope | guarantee/advance/credit/default coverage fora do piloto | `FIN_PILOT_SCOPE_DECISION_2026-09-24.md` |
| Copilot | provider-neutral, mobile-first, critical actions deny-by-default | PR #223 |
| Android pilot distribution | package de piloto, APK build script, hash/build metadata, workflow, rollback/support | PR #227 |
| Production deploy v1.81 | Railway SUCCESS | `PRODUCTION_DEPLOY_2026-09-24_v1.81.md` |
| Conversa/memória | continuidade persistida | `docs/conversas/REGISTRO_INTEGRAL_CONTINUACAO_2026-09-24_PARTE_1.md` |

## Bloqueios externos reais

### #214 Production Truth / CI

Necessário:

- GitHub Actions alocar runner e executar o pipeline completo do commit corrente;
- probe HTTP público canônico do commit corrente.

Fato observado repetidamente: jobs `ubuntu-latest` terminam com `runner_id=0`, `runner_name=""`, `steps=[]`.

### #215 FIN-RISK

Necessário:

- PSP comercialmente elegível/contratado para o modelo Brasil;
- fees/unit economics reais;
- responsabilidades PF/PJ/KYC/KYB/PLD;
- política real de chargeback/refund/saldo negativo;
- sandbox real do produto contratado;
- revisão contábil/tributária/jurídica brasileira.

Garantia/adiantamento/crédito estão fora do piloto.

### #219 TRUST-ARCH

Necessário:

- provider KYC/KYB real e sandbox callback;
- revisão jurídica/LGPD com prazos/políticas finais;
- pentest/adversarial externo;
- somente então fechar ADR-TRUST-001.

### #220 Device/Pilot/Pentest

Necessário:

- gerar/obter APK real em ambiente Android funcional;
- instalar e executar em aparelho físico;
- validar localização aceita/negada/indisponível;
- validar notificações/deep links;
- validar jornada profissional/empresa/multiempresa;
- provar update/rollback no aparelho;
- definir release signing/keystore para distribuição pública;
- pentest independente.

### #221 LEGAL-ARCH

Necessário parecer/revisão de profissional jurídico brasileiro identificado sobre o sistema concreto. IA, testes ou benchmark não fecham este gate.

### #224 WEB-ARCH

Necessário ambiente capaz de resolver dependências Next.js e gerar `pnpm-lock.yaml` reproduzível. Não adicionar dependências manualmente nem quebrar frozen lockfile.

## Regra para a próxima continuação

1. recuperar Documento da Verdade v1.8;
2. recuperar este checkpoint;
3. recuperar o Registro Integral da Conversa;
4. verificar primeiro se algum bloqueio externo mudou;
5. não refazer trabalho já concluído sem evidência de regressão;
6. continuar registrando toda a conversa no arquivo integral vigente;
7. não usar TinyFish neste projeto salvo instrução explícita futura do usuário.

## Conclusão

O trabalho interno seguro e reversível disponível no ambiente atual foi levado ao limite. O produto **não é declarado concluído em Production/Pilot** porque os gates acima exigem terceiros, ambientes externos, aparelho físico, contrato/provider ou revisão profissional independente.
