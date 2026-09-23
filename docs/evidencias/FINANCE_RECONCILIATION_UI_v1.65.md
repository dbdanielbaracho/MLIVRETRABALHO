# Finance Reconciliation UI v1.65 — Evidência

Data: 2026-09-23

## Objetivo

Entregar visibilidade financeira operacional para owner/admin sem fabricar eventos de provedor e sem antecipar decisões ainda bloqueadas pelo FIN-RISK.

## Implementação

- `GET /v1/company/payment-events/reconciliation` permanece read-only e agora usa filtro explícito `tenant_id` além do RLS.
- `GET /v1/company/payment-events` permanece read-only e tenant-scoped.
- A reconciliação inclui título do trabalho e nome do profissional para uso operacional.
- Nova tela mobile `Pagamentos` mostra valor a pagar, capturado, reembolsado, pago ao profissional e status de reconciliação.
- Não existe botão ou rota de empresa que crie manualmente `captured`, `refunded`, `payout_paid` ou outro fato externo.

## Prova automatizada

PR #191 — `Finance v1.65: read-only tenant-isolated reconciliation UI`.

CI #501: SUCCESS.

O E2E `scripts/http-finance-reconciliation-e2e.sh` prova via APIs públicas:

1. profissional e duas empresas independentes são criados;
2. empresa A publica e conclui um trabalho de R$ 250,00;
3. a reconciliação da empresa A mostra `payableCents=25000`, `paidOutCents=0` e `reconciliationStatus=pending`;
4. a empresa B não enxerga o assignment da empresa A;
5. a lista de `payment_events` permanece vazia, comprovando que o teste não inventou fatos de PSP.

## Produção

- merge: `419da7657c6fe18eedf92c06946912e1ebb19829`;
- Railway deployment: `ccc2172c-d820-4011-bddc-f4a5196d2fdc`;
- deployment: SUCCESS;
- Nest application: started;
- `/v1/health/ready`: HTTP 200;
- Postgres Railway: SUCCESS;
- pending work Railway: zero.

## Limite deliberado

Esta entrega **não** fecha o FIN-RISK e **não** significa pagamento real. Continuam pendentes: PSP definitivo, elegibilidade comercial, split, payout, refunds/chargebacks, reservas/garantias, crédito/default, sandbox real, taxas/unit economics e revisão jurídica/fiscal/contábil.
