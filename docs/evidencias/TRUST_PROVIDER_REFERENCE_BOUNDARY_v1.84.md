# TRUST PROVIDER REFERENCE BOUNDARY — v1.84

**Data:** 2026-09-24  
**Status:** internal architecture hardening; no KYC/KYB provider selected or enabled.

## Context

The current product lets a user/company request verification and stores `provider` / `provider_reference` on `verification_cases`, but there is no live external provider callback yet. This is a safe point to define the trust boundary before integrating Datavalid/Serpro, PSP-native KYC/KYB, or another provider.

A real external verification provider is authoritative only for provider-owned facts and references. It must not be trusted to assert MLIVRETRABALHO tenant membership, internal identity/business IDs, final enforcement actions, score changes, suspension, deactivation, or guilt.

## Required boundary for any real provider

Provider input may contain provider-owned facts such as:

- provider event/reference ID;
- provider verification/session/case reference;
- provider subject/account reference;
- provider result/status/evidence flags;
- provider event timestamp;
- authenticated callback metadata/signature.

The backend must bind the external provider reference to an internal verification instruction created server-side before applying the result.

## Prohibited behavior

A real provider callback must never be accepted as authoritative merely because it contains:

- `tenantId`;
- internal `identityId` / business ID;
- company/workspace membership or role;
- internal capability grants;
- score/reliability changes;
- suspension/deactivation decisions;
- Safety-case guilt/conclusion.

Unknown, ambiguous, duplicated or conflicting references must stop in rejection/review/reconciliation, not trigger cross-tenant best-effort lookup.

## Verification state rule

Provider result is evidence for a verification case, not a direct punitive action.

Allowed baseline mapping is limited to verification workflow state such as:

- pending/reviewing;
- verified when provider evidence and server-side binding satisfy the selected policy;
- rejected/expired/needs-human-review according to explicit reason codes and provider contract.

A provider result must not automatically alter reliability score, remove assignments, cancel confirmed work, suspend globally, or deactivate an account while TRUST-ARCH remains OPEN.

## Tenant/RLS rule

`verification_cases` is tenant-scoped under PostgreSQL RLS. Callback routing therefore needs a trusted server-controlled mapping from external provider reference to one internal verification instruction/tenant before entering normal tenant runtime context.

The implementation must not grant general cross-tenant read access to `app_runtime` just to resolve callbacks.

Acceptable patterns to review when a provider is selected:

1. minimal system-owned reference registry with least-privilege lookup of immutable provider reference → verification case/tenant; or
2. server-issued opaque callback/session reference cryptographically or structurally bound to the internal verification instruction.

## Data minimization

Prefer storing:

- provider name;
- provider reference;
- normalized verification state;
- reason/evidence reference;
- timestamps;
- minimum audit facts.

Do not store raw identity documents/biometric payloads by default when the provider can retain them and return only the evidence needed for the product/legal purpose.

## Required tests before sandbox acceptance

- forged internal IDs in callback have no effect;
- authenticated external reference resolves to exactly one verification case/tenant;
- unknown reference is rejected/quarantined;
- cross-tenant reference collision cannot route to another tenant;
- replay/idempotency enforced;
- stale or conflicting provider status does not silently overwrite newer state;
- callback cannot directly change score, assignment, payment, suspension or deactivation;
- retry/review path preserves immutable audit evidence;
- raw document/biometric payload is not persisted unless explicitly approved by policy/legal review.

## Stop-the-line

Do not connect a real KYC/KYB callback directly to `verification_cases` updates until the selected provider's authentication model, event identity, subject/reference model, retry semantics, data-retention terms and sandbox behavior have been verified. TRUST-ARCH remains OPEN.