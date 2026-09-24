# Evidência — Trust causal events v1.76

## Objetivo
Aplicar o requisito de causalidade do Documento da Verdade aos fatos operacionais de Trust sem ativar punição ou suspensão automática.

## Controles
- `trust_events` passa a registrar `cause`: `professional | company | force_majeure | platform | undetermined`;
- eventos existentes recebem baseline seguro `undetermined`;
- cada novo evento registra `reported_by_identity_id`;
- runtime perde permissão de `UPDATE` e `DELETE`: fatos ficam append-only;
- tenant isolation por RLS permanece;
- nenhuma causa, inclusive `professional`, gera automaticamente score negativo, suspensão ou culpa definitiva;
- causa inválida é rejeitada pela API;
- E2E cria um incidente de causa `company`, comprova ator/causa, rejeita causa inventada e comprova isolamento entre empresas.

## Arquivos
- `packages/db/migrations/0031_trust_event_causality.sql`
- `apps/api/src/trust-events.controller.ts`
- `scripts/http-trust-causality-e2e.sh`
- `.github/workflows/ci.yml`

## Gate
`TRUST-ARCH` continua OPEN/BLOCKING para enforcement definitivo, provider KYC/KYB, política de recurso, matriz de enforcement, retenção e revisão jurídica/adversarial. Esta fatia apenas impede perda de causalidade e melhora auditabilidade.
