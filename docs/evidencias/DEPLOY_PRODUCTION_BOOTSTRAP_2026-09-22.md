# Evidência — Bootstrap de produção MLIVRETRABALHO — 2026-09-22

## Estado confirmado

- Projeto Railway criado: `MLIVRETRABALHO`.
- Environment Railway: `production`.
- Serviço Railway: `@mlivretrabalho/api`.
- Fonte: `dbdanielbaracho/MLIVRETRABALHO`, branch `main`.
- Build: `pnpm --filter @mlivretrabalho/api build`.
- Pre-deploy: `pnpm --filter @mlivretrabalho/api migrate`.
- Start: `pnpm --filter @mlivretrabalho/api start`.
- Healthcheck: `/v1/health/ready`.
- Variáveis não secretas configuradas: `NODE_ENV=production` e `APP_VERSION=0.1.0`.
- Projeto PostgreSQL de produção criado no Neon com nome `mlivretrabalho`, branch `production`.

## Primeira tentativa real de deploy

Deployment Railway: `2fe062d6-78d5-48b4-8f08-8b712458989d`.

Resultado:
- build da imagem: **SUCCESS**;
- TypeScript/API build: **SUCCESS**;
- imagem publicada pelo Railway: **SUCCESS**;
- pre-deploy migration: **FAILED** com `DATABASE_URL_required`;
- aplicação não chegou ao healthcheck público.

## Causa raiz

O segredo `DATABASE_URL` ainda não está associado ao serviço Railway. A tentativa de transferir automaticamente o segredo obtido do Neon para o Railway foi bloqueada pela camada de segurança da integração. O segredo não foi exposto no chat nem persistido no GitHub.

## Próximo gate

1. adicionar `DATABASE_URL` no serviço Railway `@mlivretrabalho/api` apontando para o banco Neon `mlivretrabalho`;
2. disparar novo deploy;
3. confirmar execução idempotente do migration runner e ledger `schema_migrations`;
4. gerar domínio público Railway;
5. executar smoke real em `/v1/health/ready` e `/v1/health`;
6. só então promover o estado para Production Truth parcial/atingido conforme os demais critérios.

## Segurança

Nenhuma credencial, senha ou connection string é armazenada neste documento ou no repositório.
