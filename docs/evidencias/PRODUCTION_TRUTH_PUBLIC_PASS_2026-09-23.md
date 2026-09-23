# Evidência — Production Truth público PASS — 2026-09-23

## URL oficial
`https://mlivretrabalho.predibeacon.com`

## Verificação externa independente
Endpoint verificado externamente via HTTPS:

`https://mlivretrabalho.predibeacon.com/v1/health/ready`

Resposta observada:

```json
{
  "status": "ok",
  "service": "api",
  "version": "0.1.0",
  "database": "ok"
}
```

HTTPS carregou com sucesso e a URL final permaneceu no domínio oficial.

## Comparação com o contrato versionado
`scripts/smoke-api.sh` exige:
- `"status":"ok"`;
- `"service":"api"`;
- `"database":"ok"`.

`scripts/production-truth-gate.sh`, quando executado com `EXPECTED_VERSION=0.1.0`, exige também:
- `"version":"0.1.0"`.

A resposta pública observada satisfaz todos esses requisitos.

## Infraestrutura correspondente
- Railway project: `MLIVRETRABALHO`;
- API service: `@mlivretrabalho/api`;
- PostgreSQL: serviço `Postgres` no mesmo projeto Railway;
- custom domain: `mlivretrabalho.predibeacon.com` → porta 8080;
- deployment v1.56: `6fea1e80-6ee2-41f9-b70a-b473c557707d` — SUCCESS;
- migration `0027_runtime_rls_role.sql` aplicada;
- Railway readiness interno também HTTP 200.

## Resultado
**PASS — Production Truth Gate público health/readiness contract.**

Este PASS comprova disponibilidade pública, versão esperada e conectividade do banco pelo endpoint de readiness. Ele não substitui device E2E, pentest, PSP real ou os hard gates FIN-RISK/TRUST-ARCH ainda abertos.
