# PAYMENT PROVIDER REFERENCE BOUNDARY — v1.83

**Data:** 2026-09-24  
**Status:** internal architecture hardening; no real-money provider enabled.

## Context

The current reversible finance baseline accepts signed simulated webhook payloads containing internal identifiers such as `tenantId`, `assignmentId` and `recipientProfessionalId`. That is acceptable for the internal HMAC simulator used in tests, but it must **not** become the contract with a real PSP.

A real external payment provider is authoritative only for provider-owned facts and references. It must not be trusted to assert MLIVRETRABALHO tenant, assignment or professional IDs.

## Required boundary for any real PSP adapter

External/provider input may contain only provider-owned facts such as:

- provider event ID / idempotency reference;
- provider payment/order/charge/payout reference;
- provider recipient/account reference;
- event type/status;
- amount/currency;
- provider event timestamp;
- authenticated webhook metadata/signature.

The backend must resolve those external references to internal objects through a server-controlled binding that was created before processing the event.

## Prohibited behavior

A real PSP adapter must never accept any of the following as authoritative merely because they are present in the webhook body:

- `tenantId`;
- `assignmentId`;
- `professionalId` / `recipientProfessionalId`;
- workspace/company authorization;
- platform fee allocation that conflicts with the server-created payment instruction.

Unknown, ambiguous or conflicting external references must be rejected or sent to reconciliation/review. They must not trigger a best-effort cross-tenant lookup.

## Tenant/RLS rule

`DatabaseService.tenant(...)` requires a trusted tenant before entering `app_runtime` RLS context. Therefore webhook resolution must not be implemented by allowing arbitrary runtime cross-tenant access.

The eventual provider integration must use one of these explicitly reviewed patterns:

1. a minimal system-owned provider-reference registry with least-privilege read access to resolve the immutable external reference to a single tenant/internal payment instruction; or
2. a provider/reference routing design where the tenant is derived from server-issued metadata that is cryptographically or structurally bound to the payment instruction and cannot be supplied freely by the external caller.

Whichever pattern is selected must preserve tenant isolation and be covered by adversarial tests.

## Provider-selection implications

Before implementing Asaas, Pagar.me, Mercado Pago or another PSP, confirm the exact provider-native references available for:

- payment/order/charge;
- split recipient/subaccount/wallet;
- payout/settlement;
- refund/chargeback;
- webhook event identity and replay handling.

The provider adapter then maps provider-native payloads into the normalized internal event only **after** trusted reference resolution.

## Required tests before sandbox acceptance

- forged internal IDs in provider payload have no effect;
- valid provider reference resolves to exactly one tenant/payment instruction;
- unknown reference is rejected/quarantined;
- cross-tenant reference collision cannot route to another tenant;
- recipient reference is bound to the expected professional;
- replay/idempotency remains enforced;
- amount mismatch creates reconciliation failure rather than silent overwrite;
- refund/chargeback cannot be applied to a different payment instruction.

## Stop-the-line

Do not adapt the current `SignedJsonPaymentProviderAdapter` payload shape directly to a production PSP. It remains an internal simulator contract until a provider is selected and this boundary is implemented with provider-specific sandbox evidence.
