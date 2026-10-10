# MLIVRETRABALHO — Documento da Verdade v1.39

**Status:** NORMATIVO — DELTA SOBRE v1.38  
**Data:** 2026-10-09

Preserva v1.38, desenho original e continuidade v1.30. Visual Truth Gate OPEN.

## Trabalhos: catálogo e envio de interesse reais
GET /jobs autenticado é recarregado no foco e no retry, com limite de 15 segundos, cancelamento ao sair e geração para rejeitar resposta atrasada. Loading/falha/vazio são distintos. Payload malformado é erro, não zero nem lista vazia. A ordem do backend e campos reais de remuneração/reputação são preservados; valor ausente segue Valor a confirmar.

POST /jobs/:id/interest continua manual e protegido contra toques simultâneos por trabalho, agora com timeout/cancelamento e confirmação do jobId/professionalId/status devolvidos. Só confirmação válida exibe sucesso. Status confirmed informa confirmação já existente e direciona textualmente à agenda; falhas/timeout não afirmam envio. Endpoint idempotente existente (upsert) permite retry sem criar nova política. Auth por identidade continua sem inventar tenant para catálogo global.

Estrutura/cards/filtros/estilos/navegação canônicos preservados. Categorias atuais continuam busca textual no título; não são tratadas como taxonomia/matching de IA. Vazio informa oportunidades quando publicadas, sem promessa inexistente de matching com perfil.

## Prova e limites
Quatro novos testes; 40/40 locais UTC e São Paulo. Cobrem schema, dados ausentes/ordem real, ack válido e falhas/retry. Não provam taps/render visual. CI/APK no head exato e pós-merge obrigatórios; encadeada após #348 corrigido. Evidência MOBILE_JOBS_STATES_v1.39.md.

## Integração em acompanhamento
Main aee58e7776eee0dc211713edcbe29075f841ecb1; #341 pós-merge CI/APK aprovados. #342 pós-merge CI 38014015303 aprovado/APK 38014015274 aguardando. #343 reconciliado head 4f39c2c92750c3a5c70bae21986d823a1eeff637, CI 38014252721 aprovado/APK 38014252773 executando. #344 CI 38013195821/APK 38013195786 aprovados; depende #343. #348 corrigido head 4b1cb40d093acc578da1629388c260889bedb0f7 após TS18048: novos CI 38014454751/APK 38014454871 em acompanhamento. Gates antigos de heads diferentes não autorizam merge.

Próximos itens independentes verificados: Equipe/Interessados com respostas de seleção concorrente, ausência de estados/catch/guard. Confrontar contratos antes de corrigir. Nenhum gate global fechado por esta fatia.

## Evidência de integração — 2026-10-10 02:32 UTC
#343–#349 integrados com gates pré-merge aprovados no head exato. Estado verificado: main 83872fc1dbfd89165ae45376a08b56f53414c432; pós-merge em acompanhamento. Registro completo em ../conversas/EXECUCAO_VERIFICADA_2026-10-10_0232Z.md. Visual Truth continua OPEN; pendências em PRs até v1.50/101 testes não estão declaradas entregues em main. Reconsultar GitHub antes de agir.
