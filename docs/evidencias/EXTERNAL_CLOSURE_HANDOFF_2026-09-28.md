# MLIVRETRABALHO — External Closure Handoff — 2026-09-28

## Purpose
Single executable handoff for the remaining project gates after internal baseline completion. This file does not convert external work into internal PASS evidence.

## Current production anchor
- Railway API latest successful deployment: `f2914f8b-57f9-41b3-b7cd-43a741edec7f`.
- Production Truth is already proven separately in canonical public run `36372097656`.
- Later Web/docs-only main commits are correctly `SKIPPED` for the API service because they do not alter its watched backend scope.

## Gate A — Provider / FIN-RISK (#228 → #215)
Use the already prepared:
- `PROVIDER_OUTREACH_PACKET_2026-09-24.md`
- `PROVIDER_DUE_DILIGENCE_QUESTIONNAIRE_2026-09-24.md`
- `provider-responses/README_TEMPLATE.md`
- `FIN_UNIT_ECONOMICS_MODEL_v1.11.md`

Required external inputs: written commercial eligibility, exact contracted fees, PF/PJ/KYC/KYB/PLD responsibility, liability/refund/default rules, exact-product authenticated sandbox and provider-native references.

Closure sequence:
1. preserve original response/contract evidence;
2. populate response template;
3. run exact-product sandbox;
4. prove idempotency/reference binding/reconciliation;
5. populate unit economics with real fees;
6. close ADR-FIN-001 only if evidence supports it.

## Gate B — TRUST provider-specific (#219)
Only if PSP-native onboarding leaves a verification gap:
1. select the minimum necessary KYC/KYB provider;
2. authenticate callback;
3. bind provider reference server-side;
4. derive tenant/subject internally;
5. prove idempotency and correction/deletion propagation in sandbox;
6. retain human review for material enforcement.

Do not store raw identity/biometric material by default when provider reference/status is sufficient.

## Gate C — Android physical-device matrix (#220)
Artifact already generated: `10949985331`, digest `sha256:ab726632c942ffe9e9ff62e7cf5bc80f06e6c88f292a4ac088c42be77572d81c`.

Execute `PILOT_DEVICE_E2E_EXECUTION_PACKET_2026-09-24.md` on a real Android device:
- fresh install outside development tooling;
- supported update/fallback;
- professional journey;
- company journey;
- multi-company aggregation;
- location allowed/denied/unavailable;
- notification/deep-link including invalid/cross-tenant;
- sanitized screenshots/logs/device/build evidence.

Any tenant leak, takeover, wrong-recipient binding, unauthorized Safety action, primary crash, silent update data loss or deep-link authorization bypass is stop-the-line.

## Gate D — Independent pentest (#220/#219)
Use `INDEPENDENT_PENTEST_SCOPE_2026-09-24.md`. Required independent coverage includes auth/session, IDOR/tenant/RLS, admin/Safety, financial Webhook replay/tampering/idempotency, rate limiting/abuse. Preserve report, remediation and retest.

## Gate E — Public Web (#224)
Internal Web code/build/tests are complete through #262. Closure requires:
1. explicit authorization for a new metered Railway Web service;
2. provision service from existing repo/main;
3. configure production API origin and CORS;
4. public domain;
5. smoke login/tenant switch/operations/read-only Finance/Safety role boundaries;
6. record public Production Truth evidence.

Do not provision before cost authorization.

## Definition of project completion
Project closure requires all applicable external gates above to carry original evidence. A checklist edit, public documentation, simulated device, self-pentest or provider assumption is not equivalent evidence.
