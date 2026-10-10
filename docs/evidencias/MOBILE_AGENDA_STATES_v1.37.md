# Agenda: ciclo e dados reais — v1.37

**Data:** 09/10/2026. **Base:** #346 head ea36faf73c22a533cb5461cb561c248412d9a0b0. Agenda/WorkAssignmentsController lidos em main antes de implementar.

## Achados e mudança
Loading/falha pareciam ausência; badge confirmado fixo e bloco de rating em qualquer ausência de próxima ação, inclusive cancelled. GET com estados distintos/schema/retry/foco/timeout/geração; badge e ação pelo status real, rating apenas completed; horário real com helper existente. POST/tenant/ciclo intactos, catch/guard por tenant:id, refresh sem atualização otimista. GPS continua opcional, permissão intacta, localização limitada em tempo após permissão; sem promise rejeitada na falha.

## Testes
Quatro testes novos: falha vs vazio, registros multiempresa, próximas ações existentes, completed/cancelled/desconhecido e rating elegível. **31/31 totais locais UTC/São Paulo**. Não provam UI/taps/GPS/backend; CI/HTTP/RLS/APK/dispositivo separados. Layout/ProfessionalNav/React/RN/lockfile preservados. PR encadeado após #346; gates próprios pendentes na abertura, integrar somente com aprovação no head exato e pós-merge.

## Prova já entregue
#341 main 1f40e9e0bcab3e302b3319652a8f030495d7ccde: pós-merge CI 38012421142 e APK 38012421105 sucesso. APK log 01:35:06Z em 10/10 (22:35:06 São Paulo em 09/10): DEVICE_SMOKE_OK metro_required=false; artefato 11654492684, zip SHA256 c22b0032a59f168460c3853545b33aee1364a327debd8cfadffa3277d53021b5. Não substitui captura/jornada autenticada completa. Visual Truth OPEN.
