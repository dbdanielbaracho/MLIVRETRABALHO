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


## Recibo append-only — PR #535 — 2026-10-15

- **Escopo exclusivo:** `dbdanielbaracho/MLIVRETRABALHO`; esta atualização não pertence ao Creator Commerce OS.
- **Falha corrigida:** o dashboard móvel de empresa aceitava datas ISO impossíveis como `2026-02-30T12:00:00Z` e `2025-02-29T12:00:00Z` porque o JavaScript as normalizava antes da validação.
- **HEAD próprio aprovado:** `f51380249e5f3ebe475ae77652d57afc557bb0be`.
- **CI próprio:** run `38650627518`, job `116148229344`, SUCCESS em todos os passos aplicáveis.
- **APK próprio:** run `38650627423`, job `116148229644`, SUCCESS com build standalone, KVM, instalação e `DEVICE_SMOKE_OK` sem Metro.
- **Merge real:** `e24b0d307f89e84887b09fc2912cf2f9314c9b16`; pais ordenados [`112dc0dc619bb668838f36800628ef1b6eb8596c`, `f51380249e5f3ebe475ae77652d57afc557bb0be`]; árvore `3beabe4b2c6ecb946752b3de856477e3767a5c51`.
- **Pós-merge CI:** run `38656459350`, attempt 2, job `116167566974`, SUCCESS. A tentativa inicial falhou antes dos testes por `toomanyrequests: Data limit exceeded` ao baixar `postgres:17`; somente o job falho foi reexecutado.
- **Pós-merge APK:** run `38656459361`, job `116167288745`, SUCCESS com instalação e `DEVICE_SMOKE_OK` sem Metro.
- **Project Activity Watch:** run `38658218351`, job `116172955555`, SUCCESS no SHA real.
- **Revisão documental:** a correção preservou payload, headers, autorização, tenant/RLS, endpoints, lockfile e os demais inputs mobile/build; este recibo não declara aceite integral das 13 áreas. Emulador/standalone não é aparelho físico e os gates externos #215/#219/#220/#224/#228 permanecem separados.
