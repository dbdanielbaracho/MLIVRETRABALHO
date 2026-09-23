# Replacement Engine — Real Signals v1.61

## Problema encontrado
O fluxo de substituição ainda usava valores fixos de matching:
- `roleFit: .5`;
- `distanceKm: 20`.

Também consultava disponibilidade da tabela tenant-local antiga em vez da disponibilidade profissional `NETWORK_SHARED` usada pelo Matching Engine principal.

## Correção
`ReplacementController` passa a usar:
- `roleFit(requiredRole/title, professional.primaryRole)`;
- `cityDistanceKm(workCity, homeCity)` apenas quando há sinal válido; nenhuma distância é inventada;
- `professional_availability_network` para cobrir a janela real `startsAt`/`endsAt` da vaga;
- reliability calculada a partir dos eventos/assignments do tenant;
- exclusão do profissional original da lista de substitutos;
- filtros explícitos `tenant_id` em replacement requests, assignments e talent pool, além do RLS/app_runtime.

O endpoint `select` também valida disponibilidade pela tabela global de disponibilidade.

## Escopo do gate
Esta fatia corrige o motor backend. A experiência mobile de substituição e um HTTP E2E dedicado permanecem requisitos separados e não devem ser considerados concluídos apenas por este PR.

## Gate de integração
Typecheck, build, testes existentes, migration runner, jornada HTTP principal e Production Truth contract devem permanecer verdes antes do merge.
