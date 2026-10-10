# MLIVRETRABALHO — Documento da Verdade v1.70

**Status:** NORMATIVO — DELTA SOBRE v1.69
**Data:** 2026-10-10

## Contexto final dos fluxos da empresa

Interessados captura e verifica Authorization/empresa na carga de trabalhos, nas leituras paralelas de candidatos/recomendações e após o ACK da confirmação. Substituições revalida o par após GET, recomendação, pedido e seleção, antes de aplicar dados/mensagens; motivos antigos são limpos quando uma nova origem é confirmada. Pagamentos usa a mesma verificação antes/depois da consulta somente leitura. Abort, foco e gerações continuam obrigatórios.

IDs vazios/brancos não geram registros acionáveis, rotas mutantes ou ACKs positivos; confirmação exige assignment/job/profissional/tenant reais. Erro de contexto não é sucesso, lista vazia ou valor zero. Preserva falhas parciais no mesmo contexto e dados financeiros nulos distintos de agregados zero comprovados. Não há repetição automática de POST.

Controllers atuais lidos: CompanyJobsController, ReplacementController e PaymentEventsController. Matching/recomendação continua apoio à decisão humana; confirm/selection/pedidos preservam contratos, elegibilidade e idempotência existentes. Roles, tenant/RLS, ledger/PSP, ranking/fórmulas, UI/desenho/rotas, React19.1.4/RN0.81.6 e lockfile intactos. Nenhuma confirmação, substituição ou pagamento real executado.

## Provas e limites

221/221 testes mobile locais passaram em UTC e America/Sao_Paulo, sem falha/cancelamento/skip. Sete regressões novas: IDs de dados/ACKs/rotas, contexto sem Auth e composições reais dos helpers com runForSession simulando troca de conta/empresa durante GET/recomendação. Diff de três telas, três helpers e três testes revisado. Não alega typecheck/build/taps/aparelho local; próprios CI/API/HTTP/APK e pós-merge ainda obrigatórios.

Visual Truth original/dados/estados/cobertura física integral e gates externos permanecem OPEN. Journal0826Z registra main, fila e CI/APKs; código, evidência, requisitos, memória/checkpoint no mesmo commit.
