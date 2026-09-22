# Evidência — Railway Deploy Prep v1.38 / correções v1.39–v1.41

Data: 2026-09-22

## Histórico
A v1.38 adicionou `railway.json` seguindo o antigo Config as Code. Após verificação nas docs atuais do Railway, esse mecanismo foi identificado como **deprecated para novos serviços** e substituído na v1.39 por Railway Infrastructure as Code.

## Estado vigente — v1.41
- removido `railway.json` para evitar duas fontes de configuração;
- adicionada `.railway/railway.ts` usando a DSL oficial `railway/iac`;
- fonte GitHub: `dbdanielbaracho/MLIVRETRABALHO`;
- build da API: `pnpm --filter @mlivretrabalho/api build`;
- pre-deploy: `pnpm --filter @mlivretrabalho/api migrate`;
- start da API: `pnpm --filter @mlivretrabalho/api start`;
- healthcheck: `/v1/health/ready`;
- SDK Railway TypeScript fixado em `3.11.0` no `package.json` raiz;
- IaC compilado no typecheck da CI;
- migration runner em `apps/api/src/migrate.ts` com advisory lock, ledger `schema_migrations`, checksum SHA-256 e execução transacional;
- CI valida o migration runner contra PostgreSQL vazio e executa o runner duas vezes para provar idempotência.

## Operação IaC
A infraestrutura não é aplicada automaticamente pelo deploy do código. Deve ser revisada com `railway config plan` e aplicada com `railway config apply` contra um projeto/environment Railway explicitamente selecionado.

## Variáveis externas obrigatórias
- `DATABASE_URL` para PostgreSQL;
- opcionalmente `APP_VERSION` para expor a versão no healthcheck.

## Não concluído por esta mudança
Esta configuração prepara o repositório, mas **não prova deploy real**. Permanecem pendentes: criação/identificação do projeto e environment Railway do MLIVRETRABALHO, PostgreSQL de produção, `DATABASE_URL` de produção, `railway config plan/apply`, URL pública, smoke tests reais e Production Truth Gate.
