# Chat + Notifications Tenant E2E v1.57

## Objetivo
Fechar MOB-008 com prova HTTP real de conversa vinculada ao assignment, notificações e isolamento entre empresas independentes.

## Bug encontrado
`ConversationsController` consultava a tabela inexistente/legada `memberships`; o schema canônico usa `tenant_memberships`.

## Correções
- autorização do chat usa `tenant_memberships`;
- consultas de assignment/conversa/mensagens incluem `tenant_id` explícito além do RLS;
- notificações também filtram `tenant_id` explicitamente;
- mantém `DatabaseService.tenant(...)` sob `app_runtime`/RLS como primeira barreira e predicados SQL como defesa adicional.

## Prova E2E
`scripts/http-journey-e2e.sh` agora cria duas empresas independentes e um profissional, confirma dois assignments e valida:
1. empresa A envia mensagem no assignment A;
2. profissional lê a mensagem e recebe `new_message`;
3. profissional responde;
4. empresa A recebe `new_message`;
5. empresa B, usando seu próprio tenant, tenta ler a conversa do assignment A e recebe HTTP 404;
6. a jornada segue até conclusão, earnings, rating e Work Passport.

## Gate
Somente integrar após typecheck, build, testes, migration runner, jornada HTTP e Production Truth contract ficarem verdes no CI.
