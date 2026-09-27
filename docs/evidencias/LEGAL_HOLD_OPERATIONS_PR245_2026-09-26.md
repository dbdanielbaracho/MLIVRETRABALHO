# MLIVRETRABALHO — Legal Hold Operations — PR #245

**Data:** 2026-09-26  
**Status:** IMPLEMENTAÇÃO PREPARADA / NÃO MESCLADA / PROVA DE RUNTIME PENDENTE  
**PR:** #245

## Objetivo
Materializar o requisito v1.13 de legal hold explícito, escopado, auditável e revisável sem expor operações de retenção em endpoint administrativo público.

## Implementação preparada
- migration `0036_privacy_legal_holds.sql`: tabela e escopos `identity`, `assignment`, `safety_case`, `financial_record`;
- migration `0042_privacy_legal_hold_operations.sql`: `created_by`, `released_by`, `release_reason`;
- migration `0043_privacy_legal_hold_review.sql`: `reviewed_at`, `reviewed_by`, `review_note`;
- `apps/api/src/privacy-legal-holds-ops.ts`: CLI privilegiada para `list`, `create`, `review`, `release`;
- `apps/api/package.json`: script `privacy:legal-holds:ops`;
- `scripts/privacy-legal-holds-e2e.sh`: contrato E2E dedicado;
- CI preparado para executar o E2E no banco isolado de retenção.

## Guardrails
- mutações exigem `PRIVACY_MAINTENANCE_DATABASE_URL`;
- mutações exigem `PRIVACY_OPERATOR_ID`;
- criação exige `reason`, `evidence_ref` e data futura de revisão;
- assignment/Safety/financial record resolvem tenant a partir do objeto server-side;
- scope inexistente é rejeitado;
- revisão registra timestamp, operador, nota e próxima data de revisão;
- liberação registra timestamp, operador e motivo;
- `app_runtime` permanece sem acesso direto à tabela de legal hold;
- legal hold não amplia acesso nem finalidade dos dados.

## E2E preparado
O teste deve provar:
1. criação falha sem maintenance DB;
2. criação falha sem operador;
3. criação falha sem data de revisão;
4. criação válida registra owner/capability e escopo;
5. revisão válida registra `reviewed_at`, `reviewed_by`, nota e próxima revisão;
6. hold ativo aparece na listagem operacional;
7. liberação registra `released_at`, `released_by` e motivo;
8. hold liberado deixa de ser ativo.

O teste de retenção existente continua provando que holds ativos bloqueiam purge de geolocalização/perfil/chat nas classes cobertas.

## Gate
Este documento não declara PASS. O GitHub Actions continua falhando antes do primeiro step (`runner_id=0`, `steps=null`). A implementação só satisfaz Definition of Done após typecheck/build/migrations/E2Es reais executarem green e o PR #245 ser mesclado/deployado.
