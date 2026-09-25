# GitHub Actions Runner Support Packet — 2026-09-25

## Repository
- `dbdanielbaracho/MLIVRETRABALHO`
- visibility: public
- CI workflow: `.github/workflows/ci.yml`
- expected runner: standard GitHub-hosted Linux

## Problem
GitHub Actions jobs fail before any workflow step is executed. The failure is reproducible with the production CI and with a minimal one-step diagnostic workflow.

Observed signature:
- `runner_id=0`
- `runner_name=""`
- `runner_group_id=0`
- `steps=[]` / `steps=null`
- job completes as `failure` within seconds
- no checkout/install/build/test step starts
- no usable job log is produced

## Product CI example
PR #243 / branch `feat/company-member-invitations`:
- workflow run: `36096510698`
- job `foundation`: `107949791300`
- label: `ubuntu-latest`
- result: failure before steps

## Minimal isolated reproduction
Diagnostic PR #244 (closed without merge after reproduction).

The diagnostic workflow intentionally removed all application dependencies and contained only one shell step per job.

Run: `36153551313`

| job | job id | runner label | result |
|---|---:|---|---|
| ubuntu-slim | `108132494182` | `ubuntu-slim` | failure before steps |
| ubuntu-22 | `108132494444` | `ubuntu-22.04` | failure before steps |
| ubuntu-24 | `108132494497` | `ubuntu-24.04` | failure before steps |

This rules out:
- application code;
- pnpm / Node setup;
- PostgreSQL service;
- migrations;
- HTTP/E2E scripts;
- actions/checkout;
- a specific Ubuntu VM image;
- VM-only provisioning, because `ubuntu-slim` reproduces the same pre-step failure.

## Repository-side investigation already performed
1. Workflow syntax inspected; normal `runs-on` labels and steps are present.
2. Reproduction created from current `main` with a new workflow file.
3. Multiple standard GitHub-hosted runner labels tested.
4. Re-run noise avoided after deterministic reproduction.
5. Repository confirmed public.
6. GitHub official documentation states standard hosted runners are free/unlimited for public repositories; ordinary minute quota therefore does not explain the observed public-repo behavior.
7. GitHub public Status on 2026-09-25 reported Actions operational.
8. Similar current community reports exist with the same `runner_id=0` / empty steps / no logs signature.

## Account/repository settings to verify in UI
Because the connected GitHub API surface available to the project does not expose these private settings, verify:

1. Repository → **Settings → Actions → General**
   - Actions enabled;
   - allowed actions/workflows not disabled by policy.

2. Repository → **Settings → Actions → Runners**
   - GitHub-hosted runner availability is not restricted.

3. Account → **Settings → Billing and licensing / Budgets**
   - no Actions budget with `Stop usage when budget limit is reached`;
   - no account-level restriction/suspension affecting hosted runners.

For this public repository, a normal minutes quota should not be the limiting factor, but an account policy/restriction should still be ruled out.

## Support request text
> GitHub-hosted Actions jobs in public repository `dbdanielbaracho/MLIVRETRABALHO` fail before runner allocation. Production CI and a new minimal one-step diagnostic workflow reproduce `runner_id=0`, empty runner name, and no steps/logs. The diagnostic reproduced across `ubuntu-22.04`, `ubuntu-24.04`, and `ubuntu-slim` in run `36153551313` (jobs `108132494444`, `108132494497`, `108132494182`). A normal CI example is run `36096510698`, job `107949791300`. Please inspect runner entitlement/provisioning for this repository/account because no workflow code reaches execution.

## Closure criterion
This incident is resolved only when a fresh minimal hosted-runner job receives a nonzero runner and executes its first step, followed by the full MLIVRETRABALHO CI completing successfully.

## Related project gate
Issue #214 — Production Truth Gate.
