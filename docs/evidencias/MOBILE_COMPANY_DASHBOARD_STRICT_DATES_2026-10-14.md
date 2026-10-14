# MOBILE_COMPANY_DASHBOARD_STRICT_DATES — 2026-10-14

## Escopo

Correção exclusiva do MLIVRETRABALHO em `apps/mobile/lib/company-dashboard.ts`. Não pertence ao Creator Commerce OS.

## Falha reproduzida

O validador anterior aceitava qualquer string com `new Date(value).getTime()` finito. No runtime JavaScript:

- entrada: `2026-02-30T12:00:00Z`;
- resultado de `new Date(...).toISOString()`: `2026-03-02T12:00:00.000Z`;
- consequência: `startsAt` ou `completedAt` impossível podia ser apresentado como outro dia.

A mesma classe ocorre em `2025-02-29T12:00:00Z`, que não é dia válido de ano não bissexto.

## Correção

A leitura do dashboard agora verifica os componentes ano/mês/dia ISO com round-trip de calendário UTC antes de aceitar o timestamp. Datas opcionais nulas continuam válidas; datas reais com calendário válido permanecem aceitas. Não houve mudança em payload, headers, endpoints, tenant/RLS, autorização, mutações ou retry.

## Regressões

`apps/mobile/tests/company-dashboard.test.mjs` cobre entradas impossíveis em `startsAt` e `completedAt`, exigindo erro somente na seção afetada e preservando as demais seções válidas.

## Estado dos gates

Branch: `fix/mobile-company-dashboard-strict-dates-20261014`.

Neste registro inicial, CI/APK, revisão final, merge e pós-gates ainda não foram declarados. Se os insumos mobile/build/smoke mudarem, o APK próprio no SHA exato será obrigatório. Emulador/standalone não é aparelho físico. As 13 áreas continuam sem aceite integral comprovado e os gates externos #215/#219/#220/#224/#228 permanecem separados.
