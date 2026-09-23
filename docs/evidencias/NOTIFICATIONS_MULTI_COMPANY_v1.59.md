# Notifications multi-company v1.59

## Problema
A tela mobile de notificações ainda usava `authenticatedTenantHeaders()`, portanto um profissional com trabalhos em empresas diferentes só enxergava notificações do tenant salvo no aparelho.

## Correção
- `GET /v1/notifications/mine` sem `x-tenant-id` agrega notificações de todos os tenants onde a identidade autenticada possui membership;
- cada item retorna `tenantId`;
- `GET /v1/notifications/unread-count` agrega a contagem entre memberships;
- `POST /v1/notifications/:id/read` permanece tenant-scoped e exige `x-tenant-id`;
- todas as consultas tenant-owned mantêm `tenant_id` explícito além de `SET LOCAL ROLE app_runtime`/RLS;
- mobile deixa de depender do workspace selecionado para listar notificações e usa o `tenantId` do item apenas ao marcar como lida.

## Prova
`scripts/http-notifications-multi-company-e2e.sh` cria um profissional e duas empresas independentes, confirma o profissional nas duas, exige notificações `assignment_confirmed` dos dois tenants sem enviar `x-tenant-id`, valida unread agregado e confirma marcação como lida no tenant correto.

Nenhuma migration é necessária.
