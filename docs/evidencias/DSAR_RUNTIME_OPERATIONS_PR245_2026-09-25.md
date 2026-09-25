# MLIVRETRABALHO — DSAR Runtime Operations — PR #245

**Data:** 2026-09-25  
**Status:** PREPARADO EM CÓDIGO / NÃO MESCLADO / NÃO DEPLOYADO  
**Norma:** Documento da Verdade v1.13 + `DSAR_RUNBOOK_v1.13.md`

## Problema identificado
O baseline anterior já registrava `request_id`, tipo e estado, porém pedidos como correção, restrição, oposição e revisão automatizada não carregavam contexto suficiente para um operador saber o que o titular queria corrigir/contestar. Também não existia uma ferramenta operacional explícita para mover pedidos entre triagem e conclusão sem SQL improvisado.

## Solução preparada no PR #245

### Dados mínimos do pedido
Migration `0040_privacy_request_details.sql` acrescenta:
- `request_details` — texto fornecido pelo titular, limitado a 2.000 caracteres;
- `evidence_ref` — referência operacional interna;
- `operator_note` — nota operacional interna, limitada a 2.000 caracteres.

`app_runtime` continua sem acesso à tabela global `privacy_requests`.

### API do titular
`POST /v1/privacy/requests` aceita `details`.

Detalhes são obrigatórios para pedidos que não são acionáveis sem contexto:
- `correction`;
- `restriction`;
- `objection`;
- `automated_decision_review`.

Outros tipos podem ser registrados sem texto livre quando o escopo padrão é suficiente.

O titular pode ver:
- request id;
- tipo;
- os próprios detalhes;
- estado;
- código de resultado;
- timestamps.

Não são expostos pela API do titular:
- `evidence_ref`;
- `operator_note`.

### Ferramenta de manutenção
Novo comando compilado: `privacy:requests:ops` / `dist/privacy-requests-ops.js`.

Requer obrigatoriamente `PRIVACY_MAINTENANCE_DATABASE_URL` e não é endpoint HTTP público.

Operações:
- `list` — lista até 100 pedidos `submitted/reviewing`;
- `start <requestId> <evidenceRef>` — `submitted → reviewing`;
- `complete <requestId> <resolutionCode> <evidenceRef> [operator note]`;
- `partial ...`;
- `reject ...`.

Estados finais gravam `completed_at`, `resolution_code`, evidence reference e nota interna quando fornecida.

## Teste preparado
`scripts/http-privacy-export-e2e.sh` passa a provar:
1. correção sem detalhes é rejeitada;
2. correção com detalhes é registrada;
3. ferramenta de manutenção sem `PRIVACY_MAINTENANCE_DATABASE_URL` falha fechada;
4. pedido passa `submitted → reviewing → completed`;
5. `resolution_code` volta para o titular;
6. `request_details` do próprio titular volta para ele;
7. `evidence_ref` e `operator_note` permanecem somente no canal operacional;
8. portabilidade continua podendo ser registrada sem detalhes;
9. export não contém segredos técnicos nem evidência interna do operador.

## Guardrail
Esta evidência descreve código preparado no PR #245. Não afirmar que o fluxo está em produção até CI/equivalente executar a migration 0040, build, E2E e o PR ser mesclado/deployado.
