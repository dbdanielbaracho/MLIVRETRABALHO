# Evidência — Bootstrap de produção MLIVRETRABALHO — 2026-09-22/23

## Estado confirmado atual

- Projeto Railway: `MLIVRETRABALHO`.
- Environment Railway: `production`.
- Serviço API: `@mlivretrabalho/api`.
- Serviço PostgreSQL: `Postgres`, dentro do mesmo projeto Railway.
- PostgreSQL com volume persistente Railway de 5 GB em `/var/lib/postgresql/data`.
- A API usa `DATABASE_URL=${{Postgres.DATABASE_URL}}` por referência interna do Railway; nenhuma senha é copiada para GitHub ou chat.
- Fonte da API: `dbdanielbaracho/MLIVRETRABALHO`, branch `main`.
- Build: `pnpm --filter @mlivretrabalho/api build`.
- Pre-deploy: `pnpm --filter @mlivretrabalho/api migrate`.
- Start: `pnpm --filter @mlivretrabalho/api start`.
- Healthcheck: `/v1/health/ready`.
- Domínio Railway: `mlivretrabalhoapi-production.up.railway.app`.
- Roteamento do domínio corrigido para a porta runtime `8080`.

## Histórico do bloqueio anterior

As primeiras tentativas de deploy construíram a imagem corretamente, mas falharam no pre-deploy com `DATABASE_URL_required`. Durante esse diagnóstico foi criado temporariamente um PostgreSQL no Neon. Essa alternativa foi **descartada da arquitetura operacional** por decisão do projeto: produção deve permanecer concentrada no Railway. O projeto Neon não é fonte de dados nem dependência da produção atual.

## Correção definitiva — PostgreSQL no Railway

Em 2026-09-23 foi criado o serviço `Postgres` dentro do projeto Railway `MLIVRETRABALHO` e a API passou a referenciar a conexão interna por `${{Postgres.DATABASE_URL}}`.

Deployment API validado: `5b89e3cb-959c-41fb-83a8-b511a40d50ae`.

Resultado:
- Postgres Railway: **SUCCESS**;
- build da API: **SUCCESS**;
- TypeScript compilation: **SUCCESS**;
- pre-deploy migration: **SUCCESS**;
- migration runner aplicou o schema até `0022_payment_event_provider.sql`;
- start da aplicação NestJS: **SUCCESS**;
- Railway healthcheck em `/v1/health/ready`: **HTTP 200**;
- API deployment: **SUCCESS**;
- réplica runtime: **1 running / 0 crashed**.

Logs confirmam a aplicação das migrations `0016` a `0022` no trecho final do runner e, em seguida, `Nest application successfully started`. O healthcheck interno do Railway concluiu com status HTTP `200`.

## Roteamento público

A aplicação recebeu `PORT=8080` no runtime Railway, mas o domínio gerado anteriormente estava associado à porta 3000. A configuração do domínio foi corrigida para `8080` sem alteração da aplicação. O serviço permaneceu online após a mudança.

A ferramenta externa desta sessão não conseguiu resolver o domínio Railway por limitação de rede/DNS do ambiente de execução; portanto, o Production Truth Gate público completo ainda deve ser distinguido do healthcheck interno Railway. O estado comprovado é: banco, migrations, processo da API e healthcheck Railway estão verdes.

## Próximo gate

1. confirmar requisição pública externa ao domínio Railway após a correção da porta;
2. executar `scripts/production-truth-gate.sh` contra a URL pública real com a versão esperada;
3. persistir a evidência da resposta pública e do SHA/versão;
4. somente então marcar o Production Truth Gate público como PASS.

## Segurança

Nenhuma credencial, senha ou connection string é armazenada neste documento ou no repositório. O banco de produção canônico é o PostgreSQL do próprio Railway.
