# MLIVRETRABALHO — Evidência parcial de Equipes #416

Data: 2026-10-10. Referência normativa: Documento da Verdade v1.104.

## Problema observado na análise estática
Na tela `apps/mobile/app/equipes.tsx`, o timer de `operation()` somente chamava `AbortController.abort()`. Se `authenticatedTenantHeaders`, `fetch`, parsing JSON ou checagem final de sessão não resolvessem, `loadBase`, `selectTeam` e `selectAllocation` permaneceriam aguardando sem entrar no `catch` ou `finally`.

## Correção proposta
- Callback opcional `onTimeout` em `operation`; o timer cancela o controller e publica erro na leitura.
- `loadBase` verifica geração e sequência; `selectTeam` verifica geração e seleção; `selectAllocation` verifica geração, seleção da equipe e sequência de alocação.
- Resultado tardio de `loadBase` não pode republicar dados após abort.
- As escritas `create` e `changeMember` continuam chamando `operation()` sem callback, mantendo a semântica existente de resultado incerto; sem reenvio automático.
- Isolamento por tenant e autorizações permanecem no request existente.

## Evidência e limites
Implementação no PR #417. A revisão do código não é prova de teste em runtime. CI e APK standalone no commit do PR, teste de regressão que simule promises não resolvidas, validação pós-merge e Visual Truth físico **ainda precisam ser comprovados**. Não declarar concluído com apenas esta evidência.

Próxima ação: criar regressões automatizadas reais para autenticação inicial/final, transporte, JSON, troca de foco/empresa/equipe/vaga e dados tardios; conferir gates completos antes de merge.