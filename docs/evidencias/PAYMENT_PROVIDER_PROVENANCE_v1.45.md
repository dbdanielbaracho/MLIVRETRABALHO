# Evidência — Payment Provider Provenance v1.45

Data: 2026-09-22

## Problema corrigido

O baseline financeiro possuía `provider_reference`, porém não persistia explicitamente qual provider originou cada evento. Além disso, `company/payment-events` permitia que owner/admin criassem manualmente fatos como `captured`, `refunded` ou `payout_paid`, o que poderia falsificar a reconciliação interna.

## Mudanças

- migration `0022_payment_event_provider.sql` adiciona `provider` obrigatório a `payment_events`;
- eventos legados são marcados como `legacy_internal` durante a migration;
- o webhook baseline atual grava provider controlado pelo servidor (`internal_shared_secret`), nunca aceito do body do cliente;
- idempotência compara também o provider;
- listagem administrativa mostra provider, provider reference e idempotency key;
- rota administrativa de criação manual de payment event foi removida; company owner/admin permanecem com consulta/reconciliação somente;
- `VerifiedPaymentEvent` passa a exigir provider para adapters futuros.

## Segurança / limites

- eventos financeiros continuam append-only para `app_runtime` após a migration 0020;
- esta mudança **não transforma o webhook compartilhado atual em integração real com PSP**;
- provider real deverá verificar assinatura/callback segundo a documentação do PSP e normalizar o evento através de `PaymentProviderAdapter`;
- FIN-RISK permanece OPEN: garantia, crédito, antecipação, default e política definitiva de chargeback/refund não são aprovados por esta mudança.

## Gate

Só integrar após CI verde, incluindo teste de idempotência provider-aware e migration runner.
