# ADR-MT-001 — Multi-tenancy e isolamento de dados

**Status:** APROVADO  
**Data:** 20/09/2026  
**Gate:** ADR-MT-001  
**Escopo:** persistence/tenancy para dados pertencentes a empresas/workspaces  
**Reabre se:** houver requisito regulatório/contratual de isolamento dedicado, mudança relevante de threat model, mudança de banco principal, incapacidade comprovada de RLS/pooling, ou necessidade enterprise de isolamento físico.

## 1. Problema

O MLIVRETRABALHO terá empresas/workspaces distintos usando a mesma plataforma. O isolamento entre tenants é requisito de segurança e Stop-the-Line: uma empresa não pode ler, alterar ou excluir dados privados de outra empresa.

O Documento da Verdade exigiu comparar quatro alternativas antes de congelar o schema:

1. `tenant_id` + PostgreSQL Row-Level Security (RLS);
2. isolamento apenas na aplicação;
3. schema por tenant;
4. tenant dedicado.

A decisão deve equilibrar threat model, custo, migrations, analytics, backup, connection pooling, performance, complexidade operacional e risco de missing-filter.

## 2. Evidências técnicas verificadas

### PostgreSQL Row Security

A documentação oficial do PostgreSQL define RLS como mecanismo que restringe por política quais linhas podem ser lidas ou modificadas. Com RLS habilitado e sem política aplicável, o comportamento é default-deny. O owner da tabela normalmente ignora RLS, salvo quando `FORCE ROW LEVEL SECURITY` é usado; superusers e roles com `BYPASSRLS` também exigem tratamento especial.

Fonte primária: https://www.postgresql.org/docs/17/ddl-rowsecurity.html

### Modelos de particionamento SaaS

A documentação/arquitetura da AWS descreve os modelos comuns:

- **pool:** banco/schema compartilhados, menor custo e overhead, exige isolamento explícito;
- **bridge:** schema por tenant, mais separação lógica, porém mais complexidade de provisionamento/migrations;
- **silo:** infraestrutura/banco dedicado por tenant, isolamento mais forte e maior custo/overhead.

A orientação da AWS para PostgreSQL recomenda RLS para o modelo pool, centralizando a política de isolamento no banco em vez de depender exclusivamente de filtros no código da aplicação.

Fontes:
- https://docs.aws.amazon.com/prescriptive-guidance/latest/saas-multitenant-managed-postgresql/best-practices.html
- https://docs.aws.amazon.com/whitepapers/latest/saas-architecture-fundamentals/tenant-isolation.html

## 3. Alternativas avaliadas

### A. `tenant_id` + RLS — escolhida como baseline

**Benefícios**
- menor custo operacional para o estágio inicial;
- um único schema/migration path;
- analytics e operações globais mais simples;
- isolamento não depende apenas de lembrar `WHERE tenant_id = ...` em cada query;
- adequado ao PostgreSQL já definido na arquitetura;
- compatível com PostGIS, pgvector e monólito modular.

**Riscos**
- RLS mal configurado pode criar falsa sensação de segurança;
- owner/superuser/BYPASSRLS pode ignorar políticas;
- contexto de tenant precisa ser seguro com connection pooling;
- queries cross-tenant legítimas exigem caminho privilegiado explícito.

**Mitigações obrigatórias**
- `tenant_id NOT NULL` em toda tabela tenant-owned;
- RLS habilitado e `FORCE ROW LEVEL SECURITY` em tabelas tenant-owned;
- runtime da aplicação usa role que não é owner, superuser nem `BYPASSRLS`;
- contexto de tenant definido por transação (`SET LOCAL`) e nunca por variável global de processo;
- ausência de contexto deve falhar/default-deny;
- migrations/admin usam role separada, nunca credencial runtime;
- testes negativos cross-tenant obrigatórios para SELECT/INSERT/UPDATE/DELETE;
- teste específico de connection-pool leakage;
- observabilidade/audit log para acessos privilegiados.

### B. Isolamento apenas na aplicação — rejeitada como barreira única

É simples no início, mas depende de todos os caminhos de código aplicarem corretamente o filtro. Um endpoint/query novo com missing-filter pode expor dados entre empresas. Pode existir como camada adicional de autorização, mas não como única fronteira de isolamento.

### C. Schema por tenant — não escolhido como default

Aumenta separação lógica, porém complica onboarding, migrations, connection management, analytics globais e operação conforme a quantidade de tenants cresce. Pode ser reavaliado para requisitos enterprise específicos, mas não é baseline.

### D. Banco/infra dedicada por tenant — não escolhido como default

Oferece isolamento forte, porém com maior custo e complexidade de provisionamento, observabilidade, migrations, backup e operação. Permanece opção futura para clientes enterprise/regulados se houver justificativa econômica/contratual.

## 4. Decisão

O baseline do MLIVRETRABALHO será **modelo pool híbrido controlado**:

1. **Dados tenant-owned** usam schema compartilhado + `tenant_id` + PostgreSQL RLS obrigatório.
2. **Autorização da aplicação (RBAC/ABAC)** continua obrigatória, mas não substitui RLS.
3. **Dados platform-global ou de marketplace compartilhado** não recebem `tenant_id` artificial. Cada tabela precisa declarar explicitamente seu escopo: `TENANT`, `PLATFORM`, `NETWORK_SHARED` ou `PROFESSIONAL_OWNED`.
4. Acesso cross-tenant legítimo (admin operacional, matching de marketplace, antifraude, analytics controlado) ocorre somente por serviços/roles/funções explicitamente privilegiados, com menor privilégio e auditabilidade.
5. Nenhum endpoint comum de empresa recebe uma role capaz de bypassar RLS.
6. Tenant dedicado continua como extensão futura, não requisito inicial.

## 5. Padrão de implementação

### 5.1 Contexto

O backend resolve `tenant_id` a partir da sessão/token e membership validada. O cliente nunca escolhe livremente um `tenant_id` confiável apenas por header/body.

Por transação, o backend injeta contexto no PostgreSQL e executa queries sob a mesma transação. O mecanismo exato (`SET LOCAL`/função equivalente segura) será coberto por integration tests antes de production.

### 5.2 Política conceitual

Exemplo conceitual, não migration final:

```sql
ALTER TABLE company_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_jobs FORCE ROW LEVEL SECURITY;

CREATE POLICY company_jobs_tenant_isolation
ON company_jobs
USING (tenant_id = current_setting('app.tenant_id', true)::uuid)
WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::uuid);
```

A implementação final deve tratar contexto ausente/ inválido sem permitir acesso e deve ser testada com a role runtime real.

### 5.3 Classificação obrigatória das tabelas

Antes de criar tabela persistente, registrar um dos escopos:

- `TENANT` — pertence a company/workspace; RLS obrigatório;
- `PROFESSIONAL_OWNED` — pertence ao profissional; política de acesso própria;
- `NETWORK_SHARED` — participa do marketplace/rede e possui regras explícitas de visibilidade;
- `PLATFORM` — configuração/metadata global da plataforma.

Nenhuma tabela sensível pode ficar sem classificação.

## 6. Testes de aceitação do gate

O ADR está fechado como decisão arquitetural, porém a implementação de tenancy só fica **DONE** quando existirem testes reproduzíveis que provem:

1. Tenant A não lê dados privados do Tenant B.
2. Tenant A não atualiza/deleta dados do Tenant B.
3. Tenant A não insere linha atribuindo-a ao Tenant B.
4. Query sem contexto de tenant não retorna dados tenant-owned.
5. Troca de requisição em pool de conexões não vaza contexto anterior.
6. Runtime role não é owner/superuser/BYPASSRLS.
7. Caminhos privileged/cross-tenant são explicitamente separados e auditados.
8. Testes rodam em CI com PostgreSQL real/compatível, não apenas mocks.

Falha em qualquer teste de isolamento é **Stop-the-Line**.

## 7. Consequências

- O schema inicial pode avançar usando `tenant_id` + RLS para dados tenant-owned.
- `SEC-001 — tenant isolation` passa a ter arquitetura definida, mas ainda exige implementação e evidência.
- Schema-per-tenant e banco-per-tenant permanecem extensões possíveis, não defaults.
- A arquitetura do marketplace deve separar claramente dados privados de empresa de dados compartilháveis da rede; RLS não pode ser aplicado mecanicamente de forma a impedir matching legítimo.

## 8. Gate

**ADR-MT-001: CLOSED / APROVADO em 20/09/2026.**

Fechamento desta decisão não substitui testes de segurança, pentest ou Production Truth Gate. Mudança material nas premissas listadas no cabeçalho reabre o ADR.
