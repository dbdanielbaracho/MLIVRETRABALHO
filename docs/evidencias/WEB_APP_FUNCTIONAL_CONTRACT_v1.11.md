# MLIVRETRABALHO — Web App Functional Contract v1.11

**Data:** 2026-09-24  
**Status:** internal architecture contract; implementation remains blocked by reproducible dependency resolution / lockfile generation.  
**Authority:** Documento da Verdade v1.11 + existing API/domain behavior.  

## 1. Purpose

The web application is a complementary enterprise/admin surface. The mobile app remains the primary operational product. The web app must consume existing API/domain rules and must not create a second source of business logic.

## 2. Implementation gate

Do not add Next.js/React dependencies or hand-edit `pnpm-lock.yaml` while package resolution is unavailable. `apps/web` implementation resumes only in an environment that can resolve dependencies and generate a reproducible lockfile under the monorepo frozen-install discipline.

Latest environment recheck in this work session:
- `github.com` DNS/HTTPS unavailable from the execution container;
- `registry.npmjs.org` DNS/HTTPS unavailable;
- HTTPS probes returned `000`;
- GitHub Actions also remains blocked before steps under Issue #214.

This is an environment blocker, not evidence that Next.js or repository code is broken.

## 3. Web information architecture

Proposed primary navigation:

1. Overview
2. Jobs / Candidates
3. Planner / Assignments
4. Teams
5. Replacements
6. Talent Pools
7. Analytics
8. Finance / Reconciliation
9. Safety / Appeals
10. Settings / Session

The web surface should optimize dense company/admin workflows and review tasks. Worker field operations remain mobile-first.

## 4. Authentication / tenant context

The web client must use the existing authentication/session model and API authorization rules.

Required rules:
- no bypass of API authorization;
- every tenant-scoped company request sends the active tenant context expected by the API (`x-tenant-id`);
- client-side route hiding is convenience only, never authorization;
- role restrictions are enforced by the API;
- tenant switching must not cache or display data from the previous tenant after context changes;
- no direct database access from web.

## 5. Verified API mapping

### 5.1 Overview

`GET /v1/company/dashboard`

Use for:
- open jobs;
- confirmed workers;
- active workers;
- completed assignments.

`GET /v1/company/dashboard/assignments`

Use for active/confirmed assignment table including replacement-open indication.

`GET /v1/company/dashboard/completed`

Use for recent completed work and rating state.

Source: `apps/api/src/company-dashboard.controller.ts`.

### 5.2 Analytics

`GET /v1/company/analytics`

Use for factual/descriptive metrics only:
- jobs created;
- open jobs;
- jobs with interest;
- jobs with confirmation;
- completed assignments;
- cancelled assignments;
- interest→confirmation rate when denominator exists;
- completion rate when denominator exists.

Do not invent forecasts or fill missing denominators with fabricated percentages.

Source: `apps/api/src/company-analytics.controller.ts`.

### 5.3 Planner

`GET /v1/company/planner`

Use for the operational timeline/table of jobs with:
- role;
- status;
- city/location;
- starts/ends;
- pay;
- interest count;
- confirmed/active/completed/cancelled counts.

Source: `apps/api/src/planner.controller.ts`.

### 5.4 Teams

Existing API:
- `GET /v1/company/teams`
- `GET /v1/company/teams/:id/members`
- `POST /v1/company/teams`
- `POST /v1/company/teams/:id/members`
- `DELETE /v1/company/teams/:id/members/:professionalId`

Web behavior:
- list teams and member count;
- create team;
- inspect members;
- add only eligible professionals returned/accepted by backend rules;
- remove member through API;
- never infer cross-tenant membership client-side.

Source: `apps/api/src/teams.controller.ts`.

### 5.5 Replacements

Existing API:
- `GET /v1/company/replacements`
- `GET /v1/company/replacements/:id/candidates`
- `POST /v1/company/replacements/:id/auto-match`
- `POST /v1/company/replacements/:id/select`
- `POST /v1/company/replacements/:assignmentId`

Web behavior:
- show open/resolved replacement requests;
- expose backend-ranked candidates and reasons;
- keep recommendation separate from explicit human selection;
- do not convert replacement events into automatic guilt/no-show conclusions.

Source: `apps/api/src/replacement.controller.ts`.

### 5.6 Talent pools

Existing API:
- `GET /v1/company/talent-pools`
- `POST /v1/company/talent-pools`
- `DELETE /v1/company/talent-pools/:pool/:professionalId`

Pools currently include `preferred`, `network`, `open`.

The web must treat pool membership as operational preference/history, not employment classification or punitive status.

Source: `apps/api/src/talent-pools.controller.ts`.

### 5.7 Finance / reconciliation

Existing read/admin API:
- `GET /v1/company/payment-events`
- `GET /v1/company/payment-events/reconciliation`

Web behavior while FIN-RISK is OPEN:
- read-only reconciliation/admin visibility;
- display provider reference, event type, amounts, recipient provenance and reconciliation state;
- highlight `pending`, `overpaid`, `no_earning`, `reconciled` without silently rewriting ledger/provider facts;
- no button for real-money transfer, manual operational PIX, guarantee, advance or credit;
- future PSP actions only after FIN-RISK closure and explicit backend capability.

Source: `apps/api/src/payment-events.controller.ts`.

### 5.8 Safety / Trust

Existing admin API includes:
- `GET /v1/company/safety-cases`
- `GET /v1/company/safety-cases/:id/events`
- `POST /v1/company/safety-cases/:id/status`

Current API restricts Safety admin operations to owner/admin roles.

Web behavior:
- show case facts and immutable history;
- status transitions only through API;
- show appeals/review surfaces using existing appeals endpoints when wired;
- never label a report as guilt by existence alone;
- no automatic score/suspension/deactivation from case UI;
- provider verification result is evidence/state, not direct enforcement;
- respect v1.84 provider-reference boundary.

Source: `apps/api/src/safety-admin.controller.ts`, ADR-TRUST-001 and Trust v1.84 evidence.

## 6. Role and authorization contract

Observed company role baselines:
- dashboard / analytics / planner / teams / replacements / talent pools: API accepts company operational roles according to each controller;
- finance reconciliation: owner/admin;
- Safety admin: owner/admin.

The web must not broaden these permissions. UI capability visibility should be derived from authenticated membership, but API remains authoritative.

## 7. UX baseline

- responsive desktop-first enterprise layout, still usable on tablet;
- keyboard-operable navigation and actions;
- visible focus states;
- semantic labels for forms/tables;
- loading/empty/error states for every API panel;
- preserve backend `null`/unknown instead of fabricating values;
- destructive/material actions require explicit user intent and server confirmation;
- no UUID typing in normal workflows;
- names/statuses surfaced in human-readable form, with IDs only for diagnostics/support when needed.

## 8. Data freshness / caching

Operational data should favor correctness over stale cache.

Rules:
- tenant-scoped cache keys must include tenant;
- clear tenant-specific cache on tenant switch/signout;
- mutation success invalidates related lists/dashboard;
- do not persist sensitive admin/Safety/finance payloads in long-lived browser storage by default;
- session/token storage must follow the existing auth security model, not a new web-only credential system.

## 9. Error contract

The web should map backend authorization/not-found/domain errors into clear user states without exposing stack traces or sensitive data.

Security-relevant errors such as tenant mismatch, forbidden role, unknown provider binding, invalid assignment/replacement state and cross-tenant object access must not be retried by guessing alternate IDs.

## 10. Build / CI acceptance when dependency gate reopens

Before merge/deploy:

1. create `apps/web` with Next.js + React + TypeScript;
2. generate `pnpm-lock.yaml` through real package resolution;
3. `pnpm install --frozen-lockfile` passes from clean checkout;
4. web typecheck passes;
5. web production build passes;
6. tests cover auth/tenant switch/role visibility and critical data transforms;
7. root monorepo build/CI remains green;
8. no mobile/API regression;
9. deploy web as a separate Railway service only after CI evidence;
10. public smoke test must prove login/session + tenant-scoped dashboard without bypassing API authorization.

## 11. Stop-the-line

Do not merge/deploy the web implementation if any of the following is true:
- lockfile was manually fabricated or dependency resolution was not reproducible;
- client duplicates business/security rules instead of relying on API;
- tenant switch can leak prior-tenant data;
- finance UI can trigger real-money behavior before FIN-RISK closure;
- Safety/Trust UI can impose punishment automatically;
- owner/admin-only data is exposed to lower roles;
- build/typecheck/critical tests have not executed successfully.

## 12. Current conclusion

The functional/API contract for WEB-ARCH is internally prepared. Actual `apps/web` code remains **PARADO by environment dependency resolution** until GitHub/npm package access or a functioning CI runner becomes available. This preparation reduces future implementation ambiguity without violating frozen-lockfile discipline.
