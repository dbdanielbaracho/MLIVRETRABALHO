# MLIVRETRABALHO — Documento da Verdade v1.43

**Status:** NORMATIVO — DELTA SOBRE v1.42  
**Data:** 2026-10-09

Preserva v1.42, desenho original e continuidade v1.30. Visual Truth Gate OPEN.

## Planejamento e reconciliação: leituras reais
GET /company/planner e GET /company/payment-events/reconciliation têm foco/retry, schema, loading/erro/vazio, timeout 15s e cancelamento/geração ao sair. Sem tenant ativo é erro; não usar leitura global como fallback. Resposta antiga não restaura fatos de tela anterior. Roles/RLS/backend/policies preservados; reconciliação mantém mensagem owner/admin em HTTP403.

Valor ausente é Não registrado, distinto de zero real retornado. Capturado/reembolsado/pago são agregados reais; zero só é exibido após resposta válida. no_earning significa Sem lançamento de ganho, conforme SQL amount_cents ausente; não prova ausência de obrigação financeira. Status válidos do backend continuam pending/reconciled/overpaid. Tela segue somente leitura, sem criar eventos financeiros, transferências, PSP ou dinheiro real.

Planejamento mantém ordem do backend, datas/counts reais e regras visuais existentes. Não estima headcount, não confirma automaticamente e não transforma falta de valor em remuneração zero.

## Prova e limites
Seis testes novos; 57/57 locais UTC/São Paulo. Cobrem ausência versus zero, read-only paths, dados reais, 403/rede/JSON/schema/status/datas/counts inválidos e retry. Estilos/rotas/contratos/dependências preservados. CI/APK head exato/pós-merge e taps/Visual Truth ainda obrigatórios. Evidência MOBILE_COMPANY_READONLY_STATES_v1.43.md; encadeada após #352.

## Continuidade
#342 pós-merge CI 38014015303/APK 38014015274 sucesso em main aee58e7776eee0dc211713edcbe29075f841ecb1. #351 CI 38015021179 aprovado, APK 38015021164 acompanhado; #352 CI 38015213524/APK 38015213470 acompanhado. #343 APK 38014252773 em smoke, não tratar espera como conclusão/bloqueio final. Prosseguir integração e pendências internas; Membros e Relatos ainda têm rede/ações sem guards adequados. Gates de decisões/RLS/safety humanas não serão contornados.
