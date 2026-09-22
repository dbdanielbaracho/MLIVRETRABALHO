# Evidência — Production Truth Gate v1.44

Data: 2026-09-22

## Contrato versionado
`scripts/production-truth-gate.sh` exige uma `BASE_URL` explícita e valida:
- `/v1/health/ready` acessível por HTTP;
- `status=ok`;
- `service=api`;
- `database=ok`, portanto readiness depende do PostgreSQL;
- quando `EXPECTED_VERSION` é informado, a versão reportada deve corresponder exatamente.

## Prova em CI
A CI sobe a API compilada contra PostgreSQL real e executa o mesmo script que será utilizado contra a URL pública futura.

## O que ainda NÃO é Production Truth
Executar o contrato contra localhost no CI prova o teste, não a produção. O gate de produção só pode ser marcado PASS quando houver projeto/environment Railway identificado, IaC aplicado, banco de produção, URL pública e execução deste script contra essa URL com a versão esperada.
