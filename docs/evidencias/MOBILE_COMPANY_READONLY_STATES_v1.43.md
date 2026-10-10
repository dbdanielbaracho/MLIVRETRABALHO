# Planejamento/Pagamentos: leitura real — v1.43

**Data:** 09/10/2026. **Base:** #352 953bdcf9426d66b0e25bc054dbfa56b83dbf2f8e.

## Fontes e divergências
PlannerController GET e PaymentEventsController GET reconciliation lidos. Reconciliação exige owner/admin, usa RLS/tenant e agregados de eventos; amount_cents NULL produz no_earning. Tela anterior exibia NULL como R$0 e label Sem valor a pagar, confundindo ausência de lançamento com obrigação inexistente. Ambas telas só montavam, sem catch/retry/timeout, podendo manter loading/dados antigos em falha.

## Correção/revisão
Foco/retry/15s/schema/loading/erro/vazio e geração/cancelamento/limpeza no blur. Tenant obrigatório; 403 reconciliação explícito. Ausente → Não registrado, zero válido preservado; no_earning → Sem lançamento de ganho. Contratos/queries/RLS/roles/score/policies/styles intactos. APIs exclusivamente GET; não acrescenta eventos/transferências/pagamentos/provider/PSP/custo.

## Provas e limites
Seis novos testes; **57/57 UTC/São Paulo**. Paths read-only/ordem real, ausência/zero, 403, falhas/retry e schema financeiro/planejamento. CI/APK no head exato e pós-merge obrigatórios; não equivale a navegação física, Visual Truth ou FIN-RISK fechado.

## Resultados predecessores
#342 pós-merge CI 38014015303/APK 38014015274 sucesso no SHA aee58e7776eee0dc211713edcbe29075f841ecb1. #343 em smoke 38014252773; aguardando gate novo exato antes de integrar. #351 CI 38015021179 aprovado/APK 38015021164 em execução; #352 novos gates 38015213524/38015213470 acompanhados. Próxima ação integrar em ordem e registrar provas/jobs/artefatos; Membros/Relatos são pendências internas independentes.
