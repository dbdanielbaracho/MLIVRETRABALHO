# Evidência — Professional Multi-Company v1.55

## Objetivo
Eliminar a troca manual de workspace para o profissional confirmado por mais de uma empresa, preservando isolamento por tenant/RLS em cada operação sensível.

## Regra de segurança
Não existe bypass cross-tenant. Para endpoints agregados, a API:
1. autentica a identity;
2. enumera apenas memberships com role `professional`;
3. executa uma consulta separada via `db.tenant(tenantId, ...)` para cada tenant autorizado;
4. agrega somente os resultados já filtrados pela RLS;
5. anexa `tenantId` a cada item operacional.

Transições de assignment, conversa e outras mutações continuam exigindo `x-tenant-id` do item específico.

## Implementação
- `GET /v1/assignments/mine`: sem header de tenant, agrega assignments de todos os memberships profissionais; com header preserva comportamento tenant-specific.
- `GET /v1/earnings/mine`: agrega ganhos de todos os tenants profissionais.
- `GET /v1/work-passport/mine`: soma trabalhos e avaliações em todos os tenants; média global é calculada por `sum(score) / count(*)`, evitando média de médias; histórico é mesclado, ordenado e limitado globalmente a 50 itens.
- Agenda mobile carrega todos os assignments sem tenant selecionado e usa o `tenantId` do próprio item para check-in/start/check-out/complete.
- Conversa recebe `tenantId` junto do assignment e continua tenant-bound.
- Ganhos e Perfil/Work Passport usam apenas autenticação e mostram visão global.

## E2E multiempresa
`scripts/http-journey-e2e.sh` cria:
- 1 profissional independente;
- 2 empresas/workspaces independentes;
- 2 vagas, uma em cada tenant;
- interesse e confirmação do mesmo profissional nas duas vagas.

O teste exige que `/v1/assignments/mine` sem `x-tenant-id` contenha ambos os assignments e ambos os tenants. Em seguida conclui um assignment, valida ganhos globais, avaliação e Work Passport global.

## Limites
- notificações globais entre múltiplos tenants permanecem fatia separada;
- cada mutação continua tenant-specific por desenho;
- device E2E permanece necessário antes de Production-Done mobile.
