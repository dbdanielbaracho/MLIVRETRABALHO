# MLIVRETRABALHO — Production Checkpoint — 2026-09-27

## Source of truth
- Integration PR: #245
- CI green run: 36370113823 (CI #841)
- Green foundation job: 108764463747
- Green head: eb9d88a71d90cab22800e3cd922240e8a067fee8
- Merge commit on main: 979ed248bc79eeb7b9f6129b347778396d84a2cd
- Railway deployment: ad77707b-0078-4281-86d0-693bf5df1972
- Railway deployment status: SUCCESS

## Real CI evidence
All workflow gates completed successfully:
- Typecheck
- Build
- Android export
- DB/package tests
- Production migration runner
- Privacy retention and legal hold contract
- HTTP journey, readiness and Production Truth contract

## Production evidence
Railway deployed the exact merge commit from main. Build completed, pre-deploy migrations ran, the API started, and Railway's configured /v1/health/ready healthcheck succeeded on the first attempt.

## CI failures found and corrected before merge
1. Runtime identity reads in talent pool/replacement/team-allocation violated least-privilege grants. Fixed with tenant-bound SECURITY DEFINER boundary functions in migration 0055 rather than granting direct identities access.
2. Safety appeal transition used SELECT ... FOR UPDATE while UPDATE is intentionally revoked. Replaced with transaction advisory locking while preserving append-only semantics.
3. Deterministic Copilot intent did not recognize “próximo turno”. Added normalized phrase coverage and reran the complete CI.

## Integrated stacked PRs
PRs #233–#243 are now integrated by #245. #234–#243 were explicitly closed as completed/superseded after #245 merged; #233 was already closed.

## Cost/safety guardrails
- No TinyFish used.
- No paid EAS build triggered.
- No Railway preview/staging environment created.
- No additional metered infrastructure created.
- Production was changed only after real green CI evidence.

## Current state
PR #245 is merged and the merged application is deployed successfully in Railway production. The integration blocker caused by pre-step GitHub hosted-runner failures is resolved for this delivery.
