# MLIVRETRABALHO — Documento da Verdade v1.35

**Status:** NORMATIVO — DELTA SOBRE v1.34  
**Data:** 2026-10-09

Preserva v1.34, referência original rastreável e continuidade v1.30. Visual Truth Gate OPEN.

## Ganhos reais
A tela Ganhos usava “status diferente de reversed” e sem limite superior de data para o total semanal, divergindo do Início (#341); mostrava R$0,00 durante loading/falha e todos os lançamentos como Concluído.

Total e gráfico agora representam **payable/paid de segunda-feira local até agora**, excluindo pending, reversed, status desconhecido e futuro, coerentes com weeklyEarnings do Início, comparados em teste. Histórico mantém os lançamentos reais com status Em processamento/A receber/Pago/Estornado, sem presumir conclusão ou liquidação. Chave tenant/id preserva itens multiempresa.

GET /earnings/mine/autenticação/agregação backend preservados. Loading/erro/vazio/sucesso separados; total é — antes da resposta ou em falha, gráfico só após sucesso; retry, recarga no foco, timeout 15s e resposta antiga ignorada. Sem nova promessa financeira, PSP, custo, backend, dependência ou lockfile.

## Evidência
Quatro testes novos: vazio vs HTTP/rede/schema/date inválido; período/status e total/gráfico; rótulos ledger; identidade multiempresa. **23/23 locais UTC/São Paulo**, somados às fatias anteriores. Não são prova de UI/jornada física. CI/APK sem Metro no SHA exato e pós-merge obrigatórios; integração encadeada após #344. Evidência MOBILE_EARNINGS_STATES_v1.35.md.

## Continuidade
Painel Empresa, lido nesta rodada: vazio aparece durante loading/falha e ações rate/addPreferred sem catch/guard; são próximas pendências internas comprovadas a validar com controladores antes da correção. Layout/dados/estados reais continuam auditados contra referência original; nenhum fechamento global inferido de CI.
