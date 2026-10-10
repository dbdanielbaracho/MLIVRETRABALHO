# Ganhos e estados reais do ledger — v1.35

**Data:** 09/10/2026. **Fonte:** main 1f40e9e0bcab3e302b3319652a8f030495d7ccde, ganhos.tsx e EarningsController; implementação parte do head #344 b2f81a5e5c8e7151e16edcaf4345739c1aba4a67.

## Achados e correção
Filtro semanal antigo incluía pending/status desconhecido/futuro. R$0 durante loading/erro podia sugerir inexistência de ganhos; todos os lançamentos recebiam “Concluído”. Total/gráfico passam a payable/paid, segunda-feira local até agora, com total calculado da mesma série do gráfico e comparado ao weeklyEarnings do Início em teste; histórico mostra estado real do lançamento. Resultados loading/error/ready, validação de lista/amount/date, retry/foco/timeout/cancelamento/geração; tenant:id na chave. Layout original e API preservados.

## Testes e limites
Quatro novos testes, total **23/23 UTC/São Paulo**: falha vs vazio, período/status/consistência total-gráfico, estados ledger, multiempresa. Dados de testes são fixtures explícitas, nunca dados de produto. CI/typecheck/export/HTTP/tenant e APK sem Metro pendentes nesta abertura. Unidade não prova UI nem produção autenticada. Integração só após #344 e gates próprios no head exato, pós-merge.

Visual Truth OPEN; FIN-RISK/PSP/dinheiro real não ativados. Pendência seguinte comprovada por leitura: EmpresaInicio ainda apresenta listas vazias antes da resposta e possui ações sem catch/guard. Revalidar controlador e requisitos antes de implementá-la.

## Correção durante CI
CI 38013341406 rejeitou import runtime com extensão .ts (TS5097), antes de Build/testes. Corrigido sem relaxar tsconfig: import apenas de tipos, total deriva da própria série diária e teste compara com weeklyEarnings existente. Nova execução no head corrigido obrigatória; run antigo não habilita merge.
