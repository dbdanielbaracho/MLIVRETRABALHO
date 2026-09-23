# Replacement Operation v1.64 — Evidência

Data: 2026-09-23

## Objetivo

Fechar a jornada operacional de substituição sem criar inferência automática de culpa ou punição.

## Fatias integradas

- PR #187 — Matching real para substituições: remove placeholders fixos e usa disponibilidade, role fit, confiabilidade e proximidade conhecida.
- PR #188 — Operação mobile: empresa enxerga assignments operacionais e solicita substituição sem digitar UUID.
- PR #189 — Talent Pool: após trabalho concluído, empresa pode adicionar profissional ao pool `preferred` em um toque; consultas possuem filtro explícito de tenant além do RLS.
- PR #190 — Swap completo: auto-match apresenta profissional recomendado, empresa confirma substituto, novo assignment é criado como `confirmed` e o assignment original é marcado `cancelled`.

## Prova automatizada

CI #497 executou com sucesso:

1. typecheck;
2. build;
3. testes;
4. migration runner oficial em banco limpo e segunda execução idempotente;
5. onboarding HTTP;
6. jornada HTTP principal;
7. `scripts/http-replacement-e2e.sh` com dois profissionais reais;
8. smoke readiness;
9. Production Truth contract.

O E2E dedicado de substituição prova via APIs públicas do produto:

- criação de dois profissionais e uma empresa;
- disponibilidade real dos dois profissionais;
- assignment original para o profissional A;
- assignment prévio para o profissional B, permitindo inclusão em Talent Pool;
- inclusão do profissional B no pool `preferred`;
- abertura do pedido de substituição do profissional A;
- auto-match recomenda o profissional B;
- seleção confirma o profissional B;
- assignment original do profissional A passa para `cancelled`;
- novo assignment do profissional B fica `confirmed` no mesmo tenant;
- replacement request passa para `matched` e registra `replacementProfessionalId`.

## Limite deliberado de Trust

A substituição operacional **não** cria automaticamente evento de no-show, culpa, suspensão ou punição. Causalidade pode ser profissional, empresa, força maior, plataforma ou indeterminada. O enforcement definitivo permanece bloqueado pelo `TRUST-ARCH` até fechamento jurídico/político/provedor e regras de apelação.

## Resultado

- CI #497: SUCCESS.
- PR #190: merge `273f730cdf6524a9f6990740787e34c0fd824a08`.
- Deploy Railway pós-merge: registrar no Requirements Ledger somente após estado terminal `SUCCESS`.
