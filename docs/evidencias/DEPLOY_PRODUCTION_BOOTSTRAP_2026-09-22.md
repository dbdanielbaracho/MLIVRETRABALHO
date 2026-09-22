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
- Domínio Railway reservado: `mlivretrabalhoapi-production.up.railway.app`.

## Primeira tentativa real de deploy

Deployment Railway: `2fe062d6-78d5-48b4-8f08-8b712458989d`.

Resultado:
- build da imagem: **SUCCESS**;
- TypeScript/API build: **SUCCESS**;
- imagem publicada pelo Railway: **SUCCESS**;
- pre-deploy migration: **FAILED** com `DATABASE_URL_required`;
- aplicação não chegou ao healthcheck público.

## Segunda confirmação após hardening financeiro e raw-body readiness

Deployment Railway: `0565e310-0af9-4cec-a52c-98a00e9f8c1f`.

Resultado confirmado nos logs do pre-deploy:
- migration command iniciado: `pnpm --filter @mlivretrabalho/api migrate`;
- runner executado: `node dist/migrate.js`;
- falha: `Error: DATABASE_URL_required`;
- container interrompido antes da aplicação entrar em serviço.

Isso confirma que o bloqueio atual não é TypeScript, build da API, migration runner ou configuração de start. O serviço não recebe a variável secreta `DATABASE_URL` no ambiente Railway.

## Causa raiz

O segredo `DATABASE_URL` ainda não está associado ao serviço Railway. A tentativa de transferir automaticamente o segredo obtido do Neon para o Railway foi bloqueada pela camada de segurança da integração. O segredo não foi exposto no chat nem persistido no GitHub.

## Próximo gate

1. adicionar `DATABASE_URL` no serviço Railway `@mlivretrabalho/api` apontando para o banco Neon `mlivretrabalho` / branch `production`;
2. disparar novo deploy;
3. confirmar execução idempotente do migration runner e ledger `schema_migrations`;
4. confirmar healthcheck público em `/v1/health/ready` e `/v1/health`;
5. executar `scripts/production-truth-gate.sh` contra o domínio real e SHA/versão esperada;
6. só então promover o estado para Production Truth parcial/atingido conforme os demais critérios.

## Segurança

Nenhuma credencial, senha ou connection string é armazenada neste documento ou no repositório.
