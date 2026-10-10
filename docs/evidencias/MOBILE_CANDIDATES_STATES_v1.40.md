# Interessados: rede, seleção e contexto — v1.40

**Data:** 09/10/2026. **Base:** #349 edfdfb569aa232e82b34834548e4cc77b5408a39.

## Fontes/requisito
CompanyJobCreateController GET /company/jobs, CompanyJobsController candidates/recommendations/confirm e company-confirmation-policy.ts lidos. Tela anterior aceitava payload sem schema, confundia loading com vazio, não tratava rejeição, permitia respostas de vagas anteriores na seleção atual e toques simultâneos de confirmação.

## Correção/revisão
Leituras independentes + schema, foco/retry, 15s, cancelamento/generação por foco e seleção. Ranking exclusivamente API validada; falha de recomendações não elimina interessados nem aparenta ausência. Snapshot tenant+Authorization de dados exibidos comparado com contexto atual antes de agir. Atualizar trabalhos permite recarregar contexto. Confirmação manual seriada, ack exato e releitura própria, feedback desconhecido em falha/timeout. Estilos/cards/rotas existentes e contratos/backend/RLS intactos.

## Provas
5 testes novos; **45/45 UTC/São Paulo**. Lista open/vazio/erro, partial success, ranking sem mutar, rejeição de tenant/identidade diferentes, ack com job/profissional/tenant/status corretos versus timeout/HTTP. Revisão estática dos guards de seleção/generation feita; não alegar prova de interação física ou ausência universal de races. CI/APK no SHA exato e pós-merge pendentes. Visual Truth OPEN.

## Gates predecessores
#349 CI 38014598006/APK 38014598041 em acompanhamento; #348 corrigido CI 38014454751 sucesso/APK 38014454871 em execução. #343 reconciliado CI 38014252721 aprovado/APK 38014252773 aguardando. Retarget main/revisar árvore/gates/merge em ordem, preservando ancestrais.
