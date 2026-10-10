# MLIVRETRABALHO — Documento da Verdade v1.50

**Status:** NORMATIVO — DELTA SOBRE v1.49
**Data:** 2026-10-09 (UTC 2026-10-10)
Preserva v1.49, desenho original e continuidade v1.30. Visual Truth Gate OPEN.

## Segurança do profissional: fatos e submissão guardada
GET assignments/cases/appeals mine são independentes, por identidade e memberships reais, com loading/erro/vazio/schema/foco/retry15s/generation/cancelamento. Falha de pedidos não significa nenhum pedido nem habilita falso primeiro envio. ReportedByMe é fato boolean validado, não inferido de dado ausente. Associação de caso/recurso usa tenant+caseId.

Rota assignment+tenant só seleciona depois de corresponder à lista validada. Relato exige trabalho atualmente lido, tenant desse trabalho e mesma sessão. Pedido exige caso atualmente lido, tenant do caso e regra de revisão já existente na UI. Ações são manuais, guardadas e controles disabled; texto validado no limite4000 já existente do backend.

Ack de relato usa apenas campos realmente retornados id/category/status/createdAt; não inventa assignmentId/description/tenant no retorno. Ack de pedido confirma case/reason/date/status/created. Created false é pedido existente idempotente: mostra registro existente, não afirma que novo motivo foi salvo. Erro/timeout mantém texto, orienta conferir relatos/pedidos e nunca repete POST automaticamente. Refresh usa signal próprio.

## Provas/limites
Oito testes novos;101/101 UTC/São Paulo. Parcial/vazio/schema/retry/identidade/tenant+case/regrasUI existentes/payload/ack/created false/rejeição/timeout sem duplicar. Controllers reconsultados; backend/roles/RLS/policies/transições humanas/penalidades/dinheiro intactos. Sem envio real de relato/contraditório. CI/APK exatos/revisão/merge/pós-merge/taps obrigatórios; Visual Truth/piloto/pentest separados.

## Fila
#359 head d4567c39e4c113870382fbfcc9d2bc1bff71dcb7 Conversa CI38016694893 sucesso/APK38016694857 em execução; #358 CI38016571399 sucesso/APK38016571422 em execução; #357CI38016412800 sucesso/APK38016412662 em execução; #356CI38016256770 sucesso/APK38016256788 em execução. #343 retry2 ainda smoke no SHA exato; não autoriza merge enquanto pendente.

Próxima ação: integrar e verificar pós-merge com gates exatos/diagnosticar Android. Inspecionar Analytics/Copilot/Privacidade/onboarding e capturas/jornadas contra desenho original antes de definir próxima correção; não presumir concluídos nem inventar atividade.
