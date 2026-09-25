# Provider Adapter Contract Matrix — MLIVRETRABALHO

**Data:** 2026-09-24  
**Status:** internal technical preparation; does not select/approve a provider and does not prove sandbox behavior.  
**Scope:** inbound provider events + outbound idempotency/reference rules for the future PSP adapter layer.

## Goal

Translate public provider documentation into a provider-neutral integration contract without weakening the v1.83 real-PSP trust boundary.

Mandatory MLIVRETRABALHO sequence remains:

`authenticate provider event → identify provider-owned event/reference → deduplicate/idempotency → resolve server-controlled external binding → derive tenant/assignment/professional internally → enter tenant RLS → normalize event → reconcile ledger/provider facts`

No provider is authoritative for MLIVRETRABALHO `tenantId`, `assignmentId`, `professionalId` or payout recipient identity.

## Matrix

| Capability | Asaas | Pagar.me v5 | Mercado Pago | MLIVRETRABALHO contract |
|---|---|---|---|---|
| Inbound event identifier | Webhook `id`; same ID is retained on redelivery | Webhook object has `id` (`hook_...`); event/resource data also contains provider IDs | Notification includes `id`, `type/action`, `data.id`; product docs also expose `x-request-id` for signature validation | Persist provider + provider event ID (or documented stable notification ID) under a uniqueness rule before side effects |
| Delivery semantics | `at least once`; duplicates expected | Webhooks can be retried/resubmitted; hook status/attempts exposed | Webhook notification delivery; product-specific retry behavior must be confirmed in sandbox/docs for selected product | Inbound handling must always be idempotent; duplicate delivery never duplicates ledger/payment effects |
| Inbound authentication | Configurable auth token sent in `asaas-access-token`; docs also recommend official IP allowlisting | **Not confirmed from current public v5 webhook docs inspected.** Do not inherit v2 `X-Hub-Signature` behavior without v5 confirmation | `x-signature` secret signature; documented HMAC validation incorporates timestamp and request/resource identifiers | Adapter refuses production activation until authentication is provider-specific, documented and sandbox-proven |
| Webhook response behavior | HTTP 200 is documented as successful receipt; process asynchronously after persistence | Hook tracks response status/raw and retries can be configured; exact acceptance/retry contract must be proven for selected account/product | Product docs use standard Webhook receiver flow; exact retry/ack behavior must be tested for selected integration | Persist/auth/dedupe first, acknowledge promptly, move slow reconciliation to async processing |
| Retry / failure recovery | Progressive retries; queue can pause after 15 consecutive failures; events retained up to 14 days | Configurable resend behavior; failed hooks can be queried and manually resent | Product-specific retry/replay operational behavior remains sandbox evidence | Monitor dead/paused queues; reconciliation job must detect missing external facts without manufacturing events |
| Outbound API idempotency | Provider docs emphasize webhook idempotency; outbound endpoint-specific idempotency must be checked when adapter is implemented | `Idempotency-key` supported for order creation; documented 24h in production, 5 min sandbox | `X-Idempotency-Key` mandatory for payments/refunds APIs in current developer guidance | Generate MLIVRETRABALHO operation idempotency key server-side; store it with internal payment instruction and provider request/response refs |
| Recipient/external binding | `walletId`, payment/subaccount/provider IDs | `recipient_id`, order/charge/hook/resource IDs | seller/account/payment/order IDs depending on product | External recipient/reference is mapped server-side to exactly one internal instruction/recipient; no external internal-ID authority |
| Chargeback/refund events | Payment event catalog must be narrowed when contracted | v5 event catalog includes `charge.refunded`; current docs are migrating from `charge.chargedback` to `chargeback.received` | Payment/refund/claims events vary by integration/product | Normalize into provider-neutral event taxonomy without silently mutating prior immutable facts |
| Sandbox | Documented Asaas sandbox and subaccounts | test keys/sandbox documented; exact PSP/split access depends on commercial eligibility | test credentials/accounts and webhook test configuration documented for supported flows | No adapter accepted until the exact contracted split/recipient product is tested, not just generic payment sandbox |

## Provider-specific notes

### Asaas

Public documentation currently confirms:
- Webhooks use an **at-least-once** delivery model.
- The event `id` remains the same on redelivery and is the recommended deduplication key.
- A configured Webhook authentication token is delivered in the `asaas-access-token` header.
- Long processing should occur asynchronously after the event is persisted/acknowledged.
- Delivery failures trigger retries; after repeated failures the queue can be paused, with events retained for a limited period.

Implementation consequence:
- adapter can define `providerEventId = webhook.id`;
- authentication must validate the configured Webhook token before any binding lookup;
- unknown external payment/wallet references stop in reconciliation/review.

Official sources consulted:
- https://docs.asaas.com/docs/sobre-os-webhooks
- https://docs.asaas.com/docs/como-implementar-idempotencia-em-webhooks
- https://docs.asaas.com/docs/faq-de-webhooks

### Pagar.me v5

Public documentation currently confirms:
- webhook objects expose a hook `id`, event, status, attempts, last attempt, account and data;
- event catalog includes payment/order/recipient lifecycle events and chargeback/refund-related events;
- failed webhooks can be inspected/resubmitted;
- API requests can use `Idempotency-key`; current docs describe 24h production and 5 min sandbox behavior for the documented order flow;
- API authentication uses Basic Auth with the v5 secret key.

Important unresolved item:
- The public v5 webhook pages inspected in this round did **not** establish a current inbound signature/header contract comparable to Mercado Pago's `x-signature` or Asaas's configured Webhook token.
- Older Pagar.me v2 documentation describes `X-Hub-Signature` HMAC-SHA1 for POSTbacks, but this must **not** be assumed valid for v5.

Stop-the-line consequence:
- Pagar.me production adapter cannot be enabled until the v5/contracted-product webhook authentication mechanism is confirmed in writing and demonstrated in sandbox.

Official sources consulted:
- https://docs.pagar.me/reference/vis%C3%A3o-geral-sobre-webhooks
- https://docs.pagar.me/reference/eventos-de-webhook-1
- https://docs.pagar.me/docs/o-que-%C3%A9
- https://docs.pagar.me/reference/autentica%C3%A7%C3%A3o-2

### Mercado Pago

Public documentation currently confirms:
- Webhook origin validation uses the `x-signature` header and a secret configured for the application.
- The documented validation flow uses HMAC and combines values including timestamp plus request/resource identifiers according to the product-specific Webhook documentation.
- Webhook examples include notification ID, action/type and `data.id` resource reference.
- Mercado Pago developer guidance makes `X-Idempotency-Key` mandatory for payment/refund API calls.

Implementation consequence:
- signature validation must use the selected product's exact documented template and cannot be replaced by merely trusting `data.id`;
- server-generated outbound idempotency key is mandatory for applicable payment/refund calls;
- marketplace seller/payment references remain external identifiers and must be bound server-side before tenant/RLS processing.

Official sources consulted:
- https://www.mercadopago.com.br/developers/pt/docs/links-and-debts/additional-content/your-integrations/notifications/webhooks
- https://www.mercadopago.com.br/developers/pt/news/2023/01/04/Idempotency-key-usage-will-be-mandatory

## Provider-neutral adapter contract

A real adapter must expose normalized facts, not internal authority. Suggested conceptual output:

- `provider`;
- `providerEventId`;
- `providerEventType`;
- `providerOccurredAt` when supplied;
- `providerResourceType`;
- `providerResourceId`;
- optional external recipient/account reference;
- amount/currency when part of the event;
- authenticated=true only after provider-specific verification;
- raw payload/evidence reference subject to minimization/retention policy.

The adapter must **not** output trusted internal tenant/assignment/professional IDs directly from provider payload fields.

## Required adapter tests before real sandbox acceptance

1. invalid/missing authentication rejects before binding lookup;
2. duplicate provider event produces one normalized effect;
3. replay/stale event cannot overwrite newer reconciled state silently;
4. unknown provider resource reference stops in reconciliation/review;
5. cross-tenant collision cannot route an event to another tenant;
6. forged internal IDs inside metadata/payload have no authority;
7. wrong external recipient binding cannot pay/reconcile to another professional;
8. outbound duplicate operation reuses/obeys provider idempotency semantics;
9. refund/chargeback is append-only fact + reconciliation, not destructive rewrite;
10. adapter tolerates additional unknown provider fields without crashing the queue;
11. secrets/tokens/signatures are never logged in plaintext;
12. sandbox replay/retry behavior matches the documented/contracted provider behavior.

## Gate impact

This matrix advances internal preparation for Issues #215 and #228 but does **not** close either one.

Still required:
- written commercial eligibility;
- contracted pricing/fees;
- exact PF/PJ onboarding/compliance responsibilities;
- real split/recipient sandbox;
- provider-specific authentication evidence;
- settlement/refund/chargeback/negative-balance evidence;
- accounting/legal review.
