# Production deployment evidence — 2026-09-24 — v1.74

## Scope
Evidence for the production deployment after merging:

- PR #212 — real recommendation ranking HTTP E2E;
- PR #213 — immutable tenant-scoped Safety case status audit;
- PR #211 — factual company operations analytics.

## Git state
Final main commit for this deployment sequence:

- `8a187867e3c8c88646d539e383d336fe4d32f17c`
- commit message: `analytics: add factual company operations metrics (#211)`

Intermediate merged commits:

- `498df5e802fd3554846d42f6d797fdb8034c69d8` — recommendation E2E (#212)
- `dcee06adb9dac2b3f97dfce7db728d9eff36e25a` — Safety audit (#213)

## Railway production evidence
Project: `MLIVRETRABALHO`

Environment: `production`

API service: `@mlivretrabalho/api`

Latest deployment:

- deployment id: `29773f1e-16d9-4b1f-9f92-72545356fbf0`
- commit: `8a187867e3c8c88646d539e383d336fe4d32f17c`
- status observed: `SUCCESS`
- region: `sfo`
- pending Railway work after deployment: none

PostgreSQL service status observed: `SUCCESS` with persistent volume attached.

Public Railway domain configured:

- `mlivretrabalhoapi-production.up.railway.app` → port 3000

Custom domain configured:

- `mlivretrabalho.predibeacon.com` → configured in Railway

## Production Truth Gate status
**NOT CLOSED by this evidence alone.**

Railway deployment success proves that the platform accepted and started the latest deployment, but the canonical gate also requires the HTTP smoke/readiness contract in `scripts/production-truth-gate.sh`.

An external HTTP probe from the current execution environment could not resolve/reach the public domain, so no artificial PASS is recorded.

Required final proof:

```bash
BASE_URL=https://mlivretrabalho.predibeacon.com EXPECTED_VERSION=0.1.0 bash scripts/production-truth-gate.sh
```

or equivalent against the canonical production URL.

## GitHub Actions external blocker
Recent PR workflows failed before any workflow step executed. The job showed no allocated runner (`runner_id: 0` / empty step list), so these failures are not evidence of a code/test assertion failure.

The canonical CI workflow remains configured to run frozen dependency installation, typecheck, build, Android export, tests, migration runner, HTTP journeys and the Production Truth contract.

## Conclusion
Deployment: **SUCCESS**.

Database service: **SUCCESS**.

Production Truth HTTP contract: **PENDING EXTERNAL PROBE**.

GitHub Actions: **BLOCKED BEFORE STEP EXECUTION / RUNNER AVAILABILITY**, pending restoration and green rerun.
