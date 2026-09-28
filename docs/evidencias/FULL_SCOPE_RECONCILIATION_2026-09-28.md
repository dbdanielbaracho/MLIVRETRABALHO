# Full Scope Reconciliation — conversations + GitHub — 2026-09-28

## Finding
The v1.15 statement that the internal baseline was exhausted is accurate only for the **implemented pilot baseline**, not for the broader product scope frozen in earlier Documento da Verdade / conversation history. The original product scope is larger. Therefore, project-wide completion must not be represented as blocked only by external gates.

## Sources reconciled
- conversation registers from pre-2026-09-20 through 2026-09-28;
- Documento da Verdade v1.4–v1.15;
- base Requirements Ledger + deltas v1.11–v1.15;
- Plano Mestre de Execução;
- Evidence Registry and evidence documents;
- current API/mobile/web tree and open issues.

## Implemented / substantially implemented
- auth/session/workspaces/multi-tenant RLS;
- company/professional onboarding;
- marketplace jobs/interests/confirmation;
- availability, agenda, assignment lifecycle, check-in/out and optional foreground geo;
- matching baseline with availability, role fit, reliability and optional proximity;
- team allocation ranking baseline;
- replacements, teams and talent pools;
- chat and notifications;
- bidirectional ratings and Work Passport baseline;
- company analytics;
- payment event/ledger security baseline, signed provider-neutral webhook and reconciliation UI;
- Safety cases/appeals, causal trust events and privacy/DSAR/retention/legal-hold controls;
- mobile-first app, complementary Web baseline, APK generation, API production and CI/Production Truth.

## Internal product scope still not complete

### P0 — product-definition gaps from the original scope
1. **Dynamic taxonomy / professional graph:** canonical Vertical → Family → Role → Specialization → Skills → Certifications → Proven Level is not implemented as a governed data model. Current role fields are a baseline only.
2. **Engagement modalities:** explicit support for gig, freelance, temporary, recurring/flexible, temp-to-hire, permanent/CLT, agency/staffing and internal employees is not modeled end-to-end.
3. **Allocation Engine:** current `allocation.ts` ranks individual candidates using MatchInput. It does not yet optimize teams, adjacent schedules, route/agenda constraints, recurrence, preferences, pay, compliance or team compatibility.
4. **Score Engine:** Reliability exists, ratings exist and Match Score exists, but the broader Professional Score + Company Score + contextual per-role confidence/recency model is not complete.
5. **Workforce Planner:** current planner is an operational job/status view; it does not yet implement “Monte minha semana” for the professional or optimization of “Monte minha equipe” for the company.
6. **Work Graph / Team Graph:** no dedicated graph/domain model for relationships among professionals, skills, companies, units, teams, work and outcomes.
7. **Forecast / no-show models:** intentionally deferred until sufficient data; no production model exists.
8. **Career / permanent hiring:** Career Engine, temp-to-hire/permanent opportunity path and Direct Hire/Conversion product are not implemented.

### P1 — marketplace integrity / operational completeness
9. **Leakage / anti-bypass:** Preferred Pool helps retention, but there is no explicit same-job circumvention policy/terms workflow, proportional leakage signals or human-review case flow dedicated to circumvention.
10. **Terms/contracts:** no explicit product-level terms/version acceptance/evidence workflow was found in current application code search.
11. **Support/disputes/work-safety operations:** Safety cases exist, but the broader support/dispute/emergency operational surface described in early scope is not a complete subsystem.
12. **Cancellation policy productization:** assignment cancellation exists and causality safeguards exist, but a fully frozen bilateral cancellation/compensation policy was deliberately not copied from benchmarks and remains a product/business decision.
13. **Vertical Packs:** Hospitality/Events/Cleaning etc. remain architectural candidates rather than deeply configured vertical products.
14. **Operation-by-exception:** baseline dashboards/notifications exist, but a complete exception queue/SLA/escalation model across staffing, attendance, payment and Safety is not implemented.

### P2 — later differentiation
15. **Copilot:** intent routing exists and correctly refuses autonomous critical execution, but full tool-calling orchestration/voice/natural-language operational workflows remain incomplete.
16. **Optimization/ML maturity:** OR-Tools/Python optimization and evidence-driven ML are not part of the current runtime baseline.
17. **Enterprise integrations/APIs:** the original broad integrations ambition is not a completed product surface.

## External/cost/hardware gates still open
- #215/#228 provider commercial contract, exact pricing/responsibilities and authenticated sandbox;
- #219 provider-specific trust proof where applicable + independent pentest;
- #220 physical Android E2E/distribution evidence + pentest/retest;
- #224 separate public Railway Web service/public smoke, cost-gated.

## Correction to completion semantics
- **Pilot baseline internal completion:** substantially complete and CI-proven.
- **Full original product scope:** NOT complete.
- The prior `INTERNAL_EXHAUSTION_PROOF_2026-09-28.md` applies only to the frozen pilot baseline and must not be used as evidence that every original product capability is finished.
- Future autonomous work may continue on the internal P0/P1 scope without waiting for external provider/device/pentest gates, provided it does not enable real-money risk, automatic punitive enforcement or new metered infrastructure.

## Next execution order
1. governed taxonomy + skills/certifications;
2. engagement modalities;
3. richer Score Engine with causal/confidence/recency semantics;
4. Allocation Engine constraints + team optimization;
5. Planner professional/company;
6. Work/Team Graph;
7. Direct Hire/Conversion + leakage integrity with human review;
8. terms/version acceptance and support/dispute operations;
9. Vertical Pack configuration;
10. Copilot tool orchestration over already-safe APIs;
11. forecast/ML only after data sufficiency criteria are met.
