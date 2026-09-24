# Evidência — Signed Payment Webhook v1.75

## Objetivo
Endurecer o baseline financeiro provider-neutral sem ativar dinheiro real nem fechar FIN-RISK.

## Mudança
- webhook financeiro passa a verificar HMAC-SHA256 sobre `timestamp.rawBody`;
- assinatura usa comparação constante (`timingSafeEqual`);
- janela anti-replay permanece em 300 segundos;
- o adapter normaliza e controla `provider`, em vez de aceitar proveniência financeira do cliente;
- corpo bruto preservado pelo Nest/Fastify é usado na verificação;
- payload alterado após assinatura é rejeitado;
- eventos continuam append-only/idempotentes no ledger existente;
- E2E financeiro agora prova `captured` + `payout_paid` assinados, repetição idempotente, reconciliação e isolamento cross-tenant.

## Arquivos
- `apps/api/src/signed-json-payment-provider.ts`
- `apps/api/src/signed-json-payment-provider.test.ts`
- `apps/api/src/payment-webhook.controller.ts`
- `scripts/http-finance-reconciliation-e2e.sh`
- `.github/workflows/ci.yml`

## Segurança
Isto é um adapter HMAC provider-neutral de baseline. Não representa aprovação de PSP, contrato comercial, KYC/KYB financeiro, chargeback/default real, payout real, garantia, adiantamento ou crédito.

## Gate
`FIN-RISK` permanece OPEN/BLOCKING até todos os critérios do `ADR-FIN-001-PROPOSED.md` possuírem evidência externa e sandbox real do provider escolhido.
