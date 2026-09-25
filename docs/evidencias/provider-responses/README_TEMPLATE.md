# Provider Response Evidence Template — MLIVRETRABALHO

Use one file per provider response/contact cycle. Preserve factual evidence and unresolved items; do not convert sales claims into approved architecture without verification.

Suggested filename:

`YYYY-MM-DD_PROVIDER_CHANNEL_RESPONSE.md`

## 1. Metadata

- Provider:
- Date/time received:
- Channel (email/call/ticket/portal):
- Contact name:
- Contact role/team:
- Related Issue: #228
- Related FIN/TRUST gate:
- Product/package discussed:
- Environment discussed (sandbox/production/both):

## 2. Original evidence

Preserve the original response/attachment/reference when allowed.

- Original message/reference:
- Attachment/quote filename or evidence ref:
- Contract/terms version/date:

Do not commit credentials, API secrets, passwords, access tokens, raw identity documents, biometrics or prohibited confidential data.

## 3. Commercial eligibility

- Workforce/marketplace model explicitly eligible? `yes / no / conditional / unknown`
- Split/multi-recipient product eligible? `yes / no / conditional / unknown`
- Commercial prerequisites:
- Production homologation requirements:

Quote exact provider wording only when needed and keep quotations short; otherwise summarize factually.

## 4. Pricing / unit economics inputs

- Collection percentage fee:
- Collection fixed fee:
- Pix fee:
- Card fees/installment rules:
- Boleto fee:
- Split fee:
- Per-recipient/subaccount fee:
- Payout/withdrawal fee:
- Monthly/fixed fee:
- KYC/KYB fee:
- Antifraud fee:
- Reserve/holdback:
- Other direct fees:
- Pricing validity/volume assumptions:

Feed confirmed values into `FIN_UNIT_ECONOMICS_MODEL_v1.11.md`; never substitute public list prices where a contractual quote is required.

## 5. Recipient onboarding / compliance

- PF recipients allowed:
- PJ recipients allowed:
- Required documents/data:
- Provider performs KYC/KYB:
- PLD/AML responsibility:
- Platform responsibilities:
- Reverification/blocked-account behavior:

## 6. Money flow / settlement

- Customer payer flow:
- Split timing:
- Worker settlement timing:
- Platform fee settlement timing:
- Payout mechanism:
- Refund responsibility:
- Chargeback/dispute responsibility:
- Negative-balance/default responsibility:
- Can provider debit future receivables/reserves?:

## 7. API / sandbox

- Sandbox available:
- Sandbox supports exact split/recipient product:
- Test recipient/subaccount creation:
- API rate limits:
- Outbound idempotency mechanism:
- API authentication method:
- Relevant provider references (`walletId`, `recipient_id`, payment/order IDs, etc.):

## 8. Webhook / callback

- Inbound authentication/signature:
- Event ID / stable dedupe key:
- Delivery semantics:
- Retry behavior:
- Ordering guarantees/limitations:
- Manual redelivery/recovery:
- Retention of failed events:
- Relevant payment/refund/chargeback/payout/account events:

Cross-check with `PROVIDER_ADAPTER_CONTRACT_MATRIX_2026-09-24.md`.

## 9. Privacy / data governance

- Data controller/processor roles:
- Subprocessors:
- Data location/transfer terms:
- Retention:
- Deletion/access mechanisms:
- Security certifications/assurances provided:
- Incident notification terms:

## 10. Support / operations

- Support channel:
- SLA/response target:
- Dedicated account/commercial contact:
- Incident escalation path:
- Sandbox support:
- Production support:

## 11. Factual summary

Summarize only confirmed facts from the response.

## 12. Unresolved questions

- [ ] ...

## 13. Gate assessment

Do **not** mark provider approved unless evidence satisfies all applicable FIN-RISK/TRUST-ARCH requirements.

- Commercial eligibility: `PASS / FAIL / PENDING`
- Pricing completeness: `PASS / FAIL / PENDING`
- PF/PJ/compliance: `PASS / FAIL / PENDING`
- Sandbox: `PASS / FAIL / PENDING`
- Webhook/callback security: `PASS / FAIL / PENDING`
- Settlement/refund/chargeback: `PASS / FAIL / PENDING`
- Privacy/LGPD review: `PASS / FAIL / PENDING`
- Legal/accounting review: `PASS / FAIL / PENDING`

Overall: `PENDING` unless all mandatory external gates pass.

## 14. Evidence references

- Issue #228:
- Issue #215:
- Issue #219:
- Documento da Verdade version:
- Commit/source scope:
