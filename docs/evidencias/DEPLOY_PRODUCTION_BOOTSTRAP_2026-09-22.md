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
- Domínio técnico Railway: `mlivretrabalhoapi-production.up.railway.app`.
- Domínio externo oficial: `https://mlivretrabalho.predibeacon.com`.
- Custom domain Railway associado à porta runtime `8080`.

## Histórico do bloqueio anterior

As primeiras tentativas de deploy construíram a imagem corretamente, mas falharam no pre-deploy com `DATABASE_URL_required`. Durante esse diagnóstico foi criado temporariamente um PostgreSQL no Neon. Essa alternativa foi **descartada da arquitetura operacional** por decisão do projeto: produção permanece concentrada no Railway. O projeto Neon não é fonte de dados nem dependência da produção atual.

## Correção definitiva — PostgreSQL no Railway

Foi criado o serviço `Postgres` dentro do projeto Railway `MLIVRETRABALHO` e a API passou a referenciar a conexão interna por `${{Postgres.DATABASE_URL}}`.

Deployment base validado: `5b89e3cb-959c-41fb-83a8-b511a40d50ae`.

Resultado:
- Postgres Railway: **SUCCESS**;
- build da API: **SUCCESS**;
- TypeScript compilation: **SUCCESS**;
- pre-deploy migration: **SUCCESS**;
- migration runner aplicou o schema até `0022_payment_event_provider.sql`;
- start da aplicação NestJS: **SUCCESS**;
- Railway healthcheck em `/v1/health/ready`: **HTTP 200**;
- réplica runtime: **1 running / 0 crashed**.

## Deploy Trust v1.47

Merge de produção: `418a1dcc2c991b6a231fad4990003bda8111e3f0` (PR #171).
Deployment Railway: `fcbfa2d5-1155-4eba-b469-f85081d48789`.

Resultado confirmado:
- deployment: **SUCCESS**;
- migrations `0013`–`0022`: reconhecidas e ignoradas como já aplicadas;
- migration nova: **`0023_verification_cases.sql` aplicada com sucesso**;
- `VerificationController` registrado no runtime;
- aplicação NestJS iniciou com sucesso;
- Railway healthcheck `GET /v1/health/ready`: **HTTP 200** (~38,6 ms).

O baseline KYC/KYB está, portanto, implantado no PostgreSQL e na API de produção. Isso **não** significa que KYC/KYB real esteja concluído: não há provider real, callback autenticado ou enforcement automático ativo.

## Roteamento público

O endereço externo oficial do projeto é `https://mlivretrabalho.predibeacon.com`, anexado no Railway à porta `8080`.

A ferramenta externa desta sessão ainda não conseguiu acessar o domínio oficial. Portanto, o **Production Truth Gate público completo permanece pendente** até existir uma requisição externa reproduzível e bem-sucedida contra esse endereço. Essa limitação não altera a evidência interna do Railway: banco, migrations, processo da API e readiness estão verdes.

## Próximo gate

1. confirmar resolução DNS/HTTPS pública de `https://mlivretrabalho.predibeacon.com`;
2. executar `scripts/production-truth-gate.sh` contra o domínio oficial e versão/SHA esperados;
3. persistir a evidência da resposta pública;
4. somente então marcar o Production Truth Gate público como PASS.

## Segurança

Nenhuma credencial, senha ou connection string é armazenada neste documento ou no repositório. O banco de produção canônico é o PostgreSQL do próprio Railway.
