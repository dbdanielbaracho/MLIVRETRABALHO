# MLIVRETRABALHO — Finance Unit Economics Model v1.11

**Data:** 2026-09-24  
**Status:** internal calculation model; no provider pricing assumed.  
**Purpose:** convert real PSP/commercial proposals into comparable economics without inventing fees.

## 1. Unit of analysis

Primary unit for the pilot:

**one completed paid assignment / worker-shift**.

Secondary aggregation levels:
- job/event;
- company/month;
- platform/month.

When one company payment covers multiple professionals, the PSP transaction may be one payment with multiple split recipients, but the internal economics must still be traceable down to each worker assignment.

## 2. Inputs required from a real provider/contract

Do not populate with guesses. Required inputs:

### Payment collection
- payment method (`pix`, card, boleto, other);
- fixed collection fee per transaction, if any;
- percentage collection fee;
- installment cost/rules where applicable;
- anticipation cost/rules, if applicable and explicitly enabled;
- minimum fee, if any.

### Split / recipient
- split fee per transaction, if any;
- fee per recipient/subaccount/wallet, if any;
- recipient onboarding/maintenance cost;
- payout/withdrawal fee;
- settlement timing;
- minimum payout rules.

### Risk / reversal
- refund fee or non-refundable processing fee;
- chargeback fee;
- dispute fee;
- negative-balance/default allocation;
- reserve/holdback requirement, if any;
- fraud/anti-fraud fee, if separate.

### Platform/compliance
- monthly/provider fixed fees;
- KYC/KYB cost per recipient or verification;
- API/BaaS/platform fees;
- tax/accounting treatment of the MLIVRETRABALHO platform fee;
- support/SLA fees if contractually material.

## 3. Product inputs

For each scenario:

- `worker_gross_pay_cents`: amount contractually attributable to worker service;
- `platform_fee_cents` or `platform_take_rate`;
- `workers_per_job`;
- `jobs_per_month`;
- `average_payment_transaction_cents`;
- payment method mix;
- average refunds rate;
- average chargeback rate;
- average failed-payment rate;
- average replacement/cancellation rate when it changes billable flow.

Rates above must come from pilot/provider evidence when available. Until then they remain variables, not assumptions.

## 4. Core formulas

### 4.1 GMV

`GMV = sum(worker_gross_pay + platform_fee + other customer-paid amounts included in the transaction)`

The exact legal/accounting definition must be aligned with the contracted flow. Do not automatically treat all PSP-processed value as platform revenue.

### 4.2 Platform gross revenue

For a percentage model:

`platform_gross_revenue = worker_gross_pay × take_rate`

For a fixed fee model:

`platform_gross_revenue = fixed_platform_fee`

For mixed pricing:

`platform_gross_revenue = fixed_platform_fee + (worker_gross_pay × take_rate)`

### 4.3 PSP variable cost

Conceptual formula:

`psp_variable_cost = collection_percentage_fee + collection_fixed_fee + split_fee + recipient_fee + payout_fee + applicable_antifraud_fee`

Each term must be computed from the contracted provider schedule.

### 4.4 Expected reversal/risk cost

For modeling only after evidence exists:

`expected_reversal_cost = (refund_probability × net_refund_cost) + (chargeback_probability × net_chargeback_cost)`

Do not create a platform guarantee/default assumption unless FIN-RISK is reopened and explicitly approved.

### 4.5 Contribution margin per assignment

`contribution_margin = platform_gross_revenue - allocated_psp_cost - allocated_kyc_cost - expected_reversal_cost - other_direct_transaction_costs`

This is contribution margin before general company overhead unless overhead is explicitly allocated.

### 4.6 Contribution margin percentage

`contribution_margin_pct = contribution_margin / platform_gross_revenue`

Only compute when platform gross revenue is positive.

### 4.7 Break-even transaction count for fixed provider costs

`break_even_assignments = monthly_fixed_provider_cost / average_contribution_margin_before_fixed_provider_cost`

Only meaningful after real provider pricing and realistic transaction mix exist.

## 5. Multi-worker job allocation

If a company pays one transaction covering N professionals:

- collection-level fixed fee is allocated across assignments by an explicit method;
- recommended analysis views:
  1. equal allocation per worker;
  2. proportional allocation by worker gross pay;
- the accounting/reporting view must record the chosen method consistently.

The PSP's actual split does not replace the internal earnings ledger. Provider settlement is reconciled against internal assignment obligations.

## 6. Scenario table template

| Input / Output | Scenario A | Scenario B | Scenario C |
|---|---:|---:|---:|
| PSP/provider | TBD | TBD | TBD |
| Payment method | TBD | TBD | TBD |
| Worker gross pay | input | input | input |
| Platform fee/take rate | input | input | input |
| Collection fee | contract | contract | contract |
| Split/recipient fee | contract | contract | contract |
| Payout fee | contract | contract | contract |
| KYC allocated cost | contract/evidence | contract/evidence | contract/evidence |
| Expected refund/chargeback cost | evidence | evidence | evidence |
| Platform gross revenue | formula | formula | formula |
| Total direct transaction cost | formula | formula | formula |
| Contribution margin | formula | formula | formula |
| Contribution margin % | formula | formula | formula |
| Settlement days | contract | contract | contract |
| Negative-balance owner | contract | contract | contract |

No provider may be scored as economically viable while mandatory cells remain unknown in ways that can materially change margin/liability.

## 7. Decision gates

A commercial proposal is not decision-ready unless it answers at least:

1. exact collection fees for intended payment methods;
2. split/subaccount/recipient fees;
3. payout/settlement fees and timing;
4. PF/PJ onboarding cost/requirements;
5. refund economics;
6. chargeback/dispute economics;
7. negative-balance responsibility;
8. fixed/monthly/commercial fees;
9. KYC/KYB costs/responsibility;
10. tax/accounting treatment reviewed externally where needed.

## 8. Stop-the-line economics rules

Do not:
- use public list price as if it were the contracted marketplace/split price;
- hide PSP fees inside worker earnings;
- assume chargeback/refund/default liability belongs to the provider without contract evidence;
- include credit, worker advance or platform guarantee in pilot economics;
- treat processed GMV as platform revenue;
- select provider on headline transaction percentage alone.

## 9. Evidence package when quotes arrive

For each candidate create a provider-response record and a scenario sheet containing:
- quote/contract date;
- commercial contact/role;
- product/package name;
- eligible business model statement;
- exact fee schedule;
- settlement rules;
- compliance responsibilities;
- refund/chargeback/default clauses;
- calculated unit economics under identical product scenarios;
- unresolved assumptions clearly marked.

## 10. Current conclusion

The unit-economics **calculation model is internally ready**. Actual economics remain **PARADO EXTERNAMENTE** until real provider quotes/contracts and pilot evidence exist. This document closes preparation, not FIN-RISK.
