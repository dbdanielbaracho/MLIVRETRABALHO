# Web public deployment runbook — 2026-09-28

This runbook prepares #224 without provisioning a metered Railway service.

## Preconditions
- explicit authorization for the new Railway Web service/cost;
- source: `dbdanielbaracho/MLIVRETRABALHO`, branch `main`;
- build already CI-proven;
- production API remains `https://mlivretrabalho.predibeacon.com`.

## Railway service settings
- Build: `pnpm --filter @mlivretrabalho/web build`
- Start: `pnpm --filter @mlivretrabalho/web start -- -H 0.0.0.0 -p $PORT`
- No database migration/pre-deploy command.
- Watch paths: `apps/web/**`, `pnpm-lock.yaml`, root package/workspace/turbo config as applicable.
- Public domain only after successful build/start.
- Configure the API CORS allowlist with the exact Web origin; do not use wildcard credentials CORS.

## Acceptance
Run:
```bash
WEB_BASE_URL=https://<public-web-origin> \
API_BASE_URL=https://mlivretrabalho.predibeacon.com \
bash scripts/web-public-smoke.sh
```

Then manually validate authenticated boundaries with a test account:
1. signin/signout;
2. tenant switch and stale-state clearing;
3. jobs/candidates/explicit confirmation;
4. teams/talent pools;
5. replacements with explicit human selection;
6. Finance remains read-only and owner/admin-only;
7. Safety/Appeals review remains owner/admin + explicit human action.

## Stop-the-line
Do not close #224 on build alone. Public root, API readiness, exact-origin CORS and authenticated tenant/role checks must all be evidenced.
