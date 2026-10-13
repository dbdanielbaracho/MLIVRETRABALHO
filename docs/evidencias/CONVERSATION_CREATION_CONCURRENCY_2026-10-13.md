# Evidência — unicidade atômica da conversa por trabalho (2026-10-13)

## Falha reproduzida

O envio inicial usava duas operações separadas: leitura de conversa existente e inserção quando a leitura retornava vazia. Duas primeiras mensagens sobrepostas podiam observar ausência simultaneamente e criar duas linhas em `conversations` para o mesmo `tenant_id + assignment_id`.

A primeira execução de preparação (`38386450072`) foi descartada como evidência porque o fixture tinha erro sintático e parou no typecheck.

O fixture corrigido no head `218df1d25acea2a530fb32a12d8563d60429700a` compilou, preservou build e export Android e falhou somente na nova regressão:

- CI `38386686705`, job `115260103485`;
- 385 testes API anteriores aprovados;
- nova regressão: esperado 1, observado 2 conversas;
- 731 testes mobile aprovados;
- nenhum gate posterior foi tratado como aprovado após a falha.

## Correção

- Migração `0063_conversation_assignment_uniqueness.sql`: mensagens de duplicatas históricas são movidas para a conversa canônica, duplicatas são removidas e um índice único parcial protege `tenant_id + assignment_id`.
- O endpoint passa a obter a conversa por `INSERT ... ON CONFLICT ... RETURNING id`, eliminando a janela entre leitura e inserção.
- O contrato de mensagem, autorização, tenant/RLS, corpo, ACK e notificações permanece inalterado.
- E2E local CI bloqueia a tabela até os dois HTTP POSTs reais alcançarem o INSERT e exige dois ACKs, uma conversa, duas mensagens e duas notificações.

## Escopo e gates

Mudanças funcionais limitadas a controller API, teste API, migração, fixture HTTP/Postgres e chamada no journey. Mobile, React Native, dependências, lockfile, Android build e standalone smoke permanecem idênticos. CI próprio, revisão final, merge e pós-CI ainda são pendentes neste snapshot.
