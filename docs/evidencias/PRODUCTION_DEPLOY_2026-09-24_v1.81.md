# Production deploy evidence — v1.81

**Data:** 2026-09-24
**Merge:** `3c086b7d3a11f2bdbd0783b13f853f52c9352a4a`
**PR:** #226 — Mobile v1.81: expose safety appeals end to end

## Railway

Projeto: `MLIVRETRABALHO`  
Ambiente: `production`  
Serviço API: `@mlivretrabalho/api`  
Deployment: `849dd047-c70f-4a16-8624-9a3a01bd8098`

Resultado observado:

- API deployment: **SUCCESS**;
- PostgreSQL: **SUCCESS**;
- pending work: zero após conclusão.

## GitHub Actions

CI do PR #226: run `36031146150`.

Resultado:

- workflow terminou `failure`;
- job `foundation` tinha `labels=[ubuntu-latest]`;
- `runner_id=0`;
- `runner_name=""`;
- `steps=[]`;
- duração aproximada de 1 segundo.

Isso reproduz o bloqueio externo de runner rastreado no Issue #214 e não fornece evidência de falha de código/teste.

## Probe público

O probe público independente havia passado na v1.79 (`PRODUCTION_PUBLIC_PROBE_2026-09-24_v1.79.md`). Após v1.81, a tentativa de probe no ambiente atual não conseguiu resolver o host público, portanto **não é usada como PASS nem FAIL do serviço**.

## Conclusão

v1.81 possui evidência de build/deploy Railway SUCCESS, porém Production Truth permanece OPEN até:

1. full CI corrente executar em runner real;
2. probe HTTP público canônico ser executado contra o commit/deploy corrente;
3. gates de device/provider aplicáveis serem comprovados quando correspondentes.
