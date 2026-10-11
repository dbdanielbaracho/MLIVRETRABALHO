# MLIVRETRABALHO — Documento da Verdade v1.105

**Status:** NORMATIVO — DELTA SOBRE v1.104  
**Data:** 2026-10-10

## Equipes: deadline das leituras de base, membros e alocação

Em `apps/mobile/app/equipes.tsx`, o timer de `operation()` só abortava o `AbortController`: autenticação, transporte ou leitura que não resolvessem podiam manter a tela carregando. Esta versão acrescenta callback opcional de prazo às três leituras (`loadBase`, `selectTeam`, `selectAllocation`), publicando erro exclusivamente na geração/seleção/sequência corrente. `loadBase` rejeita também resultados posteriores ao abort. Ações de escrita usam `operation()` sem callback e não são repetidas automaticamente; resultado incerto de criação/alteração continua exigindo conferência.

## Evidência e limites

Issue #416 e PR #417. Testes de regressão dos handlers pré-JSX foram incluídos em `apps/mobile/tests/teams-read-deadline.test.mjs`; eles usam fixtures de hooks/serviços, não render real, Android real nem validação física. O primeiro CI detectou erro na fixture de lazy `useState` e ele foi corrigido no commit `22045a14`. CI desse commit aprovado no run `38103335279`; APK standalone desse commit run `38103335320` estava em andamento ao redigir esta versão. Como esta atualização documental altera o head, **ambos os gates do commit final devem ser executados e comprovados novamente**, seguidos pelos gates pós-merge aplicáveis. Nenhum PASS não observado pode ser inferido.

## Pendente

Completar os testes de regressão de seleção de equipe/alocação, foco e tenant para a mesma classe de defeito, conferir resultado final de CI/APK e efetuar merge só com gates concluídos. Validar visualmente no Android físico e preservar os demais bloqueios externos (pentest, PSP/KYC, Web Railway) como separados. A continuidade automática não substitui provas físicas nem autorização de despesas.
