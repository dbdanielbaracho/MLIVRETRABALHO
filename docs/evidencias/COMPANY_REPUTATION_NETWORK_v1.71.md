# Company Reputation Network v1.71

## Objetivo
Permitir que o profissional veja a reputação agregada da empresa antes de demonstrar interesse em uma vaga, sem expor avaliações individuais nem usar reputação como enforcement automático.

## Implementação
- nova projeção NETWORK_SHARED `marketplace_company_reputation`;
- somente `tenant_id`, média, quantidade e timestamp são compartilhados;
- comentários e avaliações individuais permanecem em `company_work_ratings`, sob RLS tenant-owned;
- trigger SECURITY DEFINER recalcula a projeção após INSERT/UPDATE/DELETE em avaliações;
- `/v1/jobs` faz LEFT JOIN da projeção e retorna `companyAverageRating` e `companyRatingCount`;
- mobile exibe média e quantidade ou informa que a empresa ainda não possui avaliações.

## Limites
- reputação não altera Matching Engine;
- reputação não bloqueia empresa, vaga ou profissional;
- nenhuma interpretação automática de fraude, culpa ou risco;
- Trust & Safety definitivo continua em gate separado.

## Validação requerida
- frozen lockfile;
- typecheck/build;
- Expo Android export;
- migration runner idempotente incluindo `0029_marketplace_company_reputation.sql`;
- testes existentes;
- jornadas HTTP/readiness/Production Truth contract.
