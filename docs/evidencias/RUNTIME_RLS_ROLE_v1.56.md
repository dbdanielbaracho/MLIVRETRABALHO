# Evidência — Runtime RLS Role v1.56

## Problema identificado
A API e o migration runner compartilham `DATABASE_URL` no Railway. O usuário/segredo da conexão é ocultado pela integração, portanto não se deve assumir que a sessão runtime é `NOBYPASSRLS` apenas pelo nome da variável.

O CI HTTP também executa a API com a conexão `postgres`, o que expôs que código de aplicação que dependia exclusivamente de RLS poderia duplicar dados entre tenants em agregações multiempresa. O PR anterior adicionou filtros explícitos de `tenant_id` como defesa em profundidade.

## Hardening desta fatia
- o migration runner já executa `packages/db/infra/roles.sql` antes das migrations e garante a existência de `app_runtime` como `NOLOGIN`, `NOSUPERUSER`, `NOCREATEDB`, `NOCREATEROLE`, `NOINHERIT`, `NOBYPASSRLS`;
- migration `0027_runtime_rls_role.sql` reafirma esses atributos e concede ao `current_user` da conexão apenas a capacidade de assumir `app_runtime`;
- `DatabaseService.tenant(...)` executa `SET LOCAL ROLE app_runtime` imediatamente após `BEGIN`, antes de definir `app.tenant_id` e executar queries tenant-owned;
- os GRANTs continuam sendo os granulares já definidos nas migrations de cada tabela; esta fatia não concede `ALL TABLES` e não reabre UPDATE/DELETE de eventos financeiros ou DELETE em safety/verification.

## Defesa em profundidade
Mesmo com `SET LOCAL ROLE app_runtime`, consultas agregadas e mutações críticas adicionadas em v1.55 mantêm `tenant_id` explícito na SQL. RLS permanece a última linha de defesa, não a única.

## Limite
`DatabaseService.query(...)` para dados globais/autenticação continua usando a sessão base. Esta mudança fortalece especificamente o boundary tenant-owned executado por `db.tenant(...)`. Separação completa em duas connection strings (migration vs runtime) pode ser avaliada futuramente, mas não é necessária para que as transações tenant-owned assumam o role restrito.

## Gate
Antes do merge, CI deve provar typecheck, build, testes, migration runner repetido e jornada HTTP completa sob `SET LOCAL ROLE app_runtime`.
