# Trabalhos: estados de rede e interesse — v1.39

**Data:** 09/10/2026. **Base:** #348 corrigido 4b1cb40d093acc578da1629388c260889bedb0f7.

## Fontes e divergência
JobsController atual lido: GET /jobs retorna marketplace aberto ordenado pelo backend com campos/avaliações reais; POST interest devolve jobId/professionalId/status e usa ON CONFLICT(job_id,professional_id) com preservação de confirmed. Tela anterior só carregava na montagem, não limitava fetch e aceitava JSON sem schema. Retorno à tela mostrava catálogo antigo; interesse podia ficar busy indefinidamente.

## Implementação e revisão
useFocusEffect, retry, geração/cancelamento/15s, schema para campos renderizados. Resposta velha não substitui lista/feedback atual. Sair cancela operações desta tela; não há submissão automática. Guard por id preservado, timeout tratado como envio não confirmado, ack validado incluindo confirmed existente. Nenhum backend/RLS/dependência/rota/layout alterado; auth por identidade como contrato original. Valores faltantes continuam faltantes.

## Testes e limites
Quatro novos testes; **40/40** UTC e America/Sao_Paulo. Falha HTTP/rede/JSON/schema versus vazio, campos ausentes/ordem/valores reais, ack do job correto/status conhecido, timeout e retry. CI/APK obrigatórios no head exato, depois main. Fidelidade/jornadas visuais continuam OPEN, sem considerar teste de unidade como prova de toque.

## Continuidade
#343 head reconciliado 4f39c2c92750c3a5c70bae21986d823a1eeff637 exige CI 38014252721/APK 38014252773 novos. #348 TS18048 corrigido 4b1cb40d093acc578da1629388c260889bedb0f7 exige CI 38014454751/APK 38014454871. Gates ainda em execução não são blockers finais; esta branch depende #348, integrar em ordem preservando ancestrais e conferir pós-merge.
