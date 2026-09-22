# Evidência — Railway Deploy Prep v1.38

Data: 2026-09-22

## Implementado
- `railway.json` com builder `RAILPACK`;
- build da API via `pnpm --filter @mlivretrabalho/api build`;
- start via `pnpm --filter @mlivretrabalho/api start`;
- healthcheck em `/v1/health/ready` com timeout de 300s.

## Variáveis externas obrigatórias
- `DATABASE_URL` para PostgreSQL;
- opcionalmente `APP_VERSION` para expor a versão no healthcheck.

## Não concluído por esta mudança
Esta configuração prepara o repositório, mas **não prova deploy real**. Permanecem pendentes: criação/identificação do serviço Railway do MLIVRETRABALHO, banco de produção, execução de migrations, domínio/URL pública, smoke tests reais e Production Truth Gate.
