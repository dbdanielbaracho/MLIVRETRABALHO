# Evidência — Runtime Role Enforcement v1.53

## Problema
O ADR-MT-001 exige que queries tenant-owned sejam executadas com uma role runtime que não seja owner, superuser nem `BYPASSRLS`. O migration runner já cria `app_runtime` com essas restrições, mas `DatabaseService.tenant()` apenas definia `app.tenant_id`; não fazia a troca explícita de role.

## Correção
Toda transação `DatabaseService.tenant()` agora executa, nesta ordem:
1. `BEGIN`;
2. `set_config('app.tenant_id', ..., true)`;
3. `SET LOCAL ROLE app_runtime`;
4. queries da operação tenant-scoped;
5. `COMMIT` ou `ROLLBACK`.

`SET LOCAL ROLE` fica limitado à transação e não permanece na conexão devolvida ao pool.

## Validação esperada
- suite RLS existente;
- unit/typecheck/build;
- migration runner;
- HTTP E2E completo do PR #176, que atravessa profile/job/interest/recommendation/confirmation/lifecycle/earnings/rating/passport;
- Production Truth contract de CI.

Qualquer GRANT ausente deve aparecer como falha no HTTP E2E em vez de ser mascarado pela role de conexão privilegiada.

## Limite
Queries platform-global/professional-owned que usam `DatabaseService.query()` não são convertidas automaticamente para `app_runtime` nesta fatia; o objetivo aqui é fechar explicitamente o caminho tenant-owned definido pelo ADR.
