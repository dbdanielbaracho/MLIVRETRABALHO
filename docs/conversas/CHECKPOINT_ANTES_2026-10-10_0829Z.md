# Checkpoint de execução autônoma — MLIVRETRABALHO

Estado verificado em 2026-10-10 08:25:56 UTC: main 765cb2e834065f6eeaf0262ed9eedca9cbb2d52a (#375/v1.64), árvore c0ce45ba92c04ae69de8271f110d1a6c6c9cc301. #375 já integrado com head CI/APK e árvore/pais comprovados; pós-CI 38037544495 success, pós-APK 38037544424 ainda não concluído no último snapshot. #372/#373 pós-CI/APK e provas efetivas registrados no journal0822Z. #374 pós-CI 38036515564 success / APK 38036515570 em execução.

|PR|Head|Base|CI|APK|
|---|---|---|---|---|
|376|931a9b3c333a0771c5a2237cdd84a249eba14589|main|38036176120 success|38036176113 tentativa2 em execução|
|377|5e3ebf7f1df814d1a6461fb5937c13a01c02d02d|fix/notifications-verified-read-and-context|38036459967 success|38036459975 success|
|378|6492ea1e523c8122bd9966d48b566a2abbda5d30|fix/earnings-conversation-origin-context|38036810382 success tentativa2|38036810418 em smoke|
|379|31ed3bfed81b0bb43b49a7b4a7810d2026a9c44d|fix/company-publication-origin-context|38037026997 success|38037027052 em execução|
|380|cf0812a45e5e594a6839d061ec27e809e41c177b|fix/company-readonly-origin-context|38037706772 success|38037706735 em execução|

#380 publicado e conferido: árvore 2ce77b59d09dc03f2602e29f9f4e1259bd3b6a59, pai 31ed3bfed81b0bb43b49a7b4a7810d2026a9c44d, 15 arquivos no diff. Próprio CI success não aprova APK/físico nem o filho seguinte. #376 retry único continua em execução; não repetir. #378 CI retry único recuperado e falha histórica #370 permanecem registrados sem reclassificação do passado.

## Item atual

Interessados captura e verifica Authorization/empresa na carga de trabalhos, nas leituras paralelas de candidatos/recomendações e após o ACK da confirmação. Substituições revalida o par após GET, recomendação, pedido e seleção, antes de aplicar dados/mensagens; motivos antigos são limpos quando uma nova origem é confirmada. Pagamentos usa a mesma verificação antes/depois da consulta somente leitura. Abort, foco e gerações continuam obrigatórios.

IDs vazios/brancos não geram registros acionáveis, rotas mutantes ou ACKs positivos; confirmação exige assignment/job/profissional/tenant reais. Erro de contexto não é sucesso, lista vazia ou valor zero. Preserva falhas parciais no mesmo contexto e dados financeiros nulos distintos de agregados zero comprovados. Não há repetição automática de POST.

Controllers atuais lidos: CompanyJobsController, ReplacementController e PaymentEventsController. Matching/recomendação continua apoio à decisão humana; confirm/selection/pedidos preservam contratos, elegibilidade e idempotência existentes. Roles, tenant/RLS, ledger/PSP, ranking/fórmulas, UI/desenho/rotas, React19.1.4/RN0.81.6 e lockfile intactos. Nenhuma confirmação, substituição ou pagamento real executado.

221/221 testes mobile locais passaram em UTC e America/Sao_Paulo, sem falha/cancelamento/skip. Sete regressões novas: IDs de dados/ACKs/rotas, contexto sem Auth e composições reais dos helpers com runForSession simulando troca de conta/empresa durante GET/recomendação. Diff de três telas, três helpers e três testes revisado. Não alega typecheck/build/taps/aparelho local; próprios CI/API/HTTP/APK e pós-merge ainda obrigatórios.

## Retomada

Novo filho fix/company-workflow-final-context após #380, v1.70 e nove arquivos de código/testes; próprio SHA/PR/runs consultar após publicação. Snapshot precede o commit. Próximo integrar #376 e sucessores somente com próprios CI/APK success no SHA exato, nova revisão de PR/main/base/merge-base/diff, árvore/pais/main pós-merge e runs reais. Retarget main em ordem; não repetir merges já comprovados nem gates pendentes/retries únicos.

Auditoria independente seguinte: Casos de Segurança e Segurança Profissional ainda carecem de verificações finais após leituras/mutações. Ler controllers/helpers/políticas/rascunhos atuais, corrigir apenas contexto/ACK e não alterar decisão humana ou enforcement. Demais rotas/canônico continuam sujeitas à reconciliação; ausência de PR aberta não significa conclusão.

Visual Truth físico integral OPEN; piloto/pentest, providers/PSP/FIN-RISK e WEB-ARCH separados. Sem conta/DSAR/convite/mensagem/publicação/ação empresarial real, dinheiro/custos/deploy pago. Continuidade permanece ativa até conclusão integral comprovada ou ordem explícita; bloqueio parcial/fim de rodada não encerram o projeto.
