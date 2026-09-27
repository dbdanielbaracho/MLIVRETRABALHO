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

## Product CI examples
PR #243 / branch `feat/company-member-invitations`:
- workflow run: `36096510698`
- job `foundation`: `107949791300`
- label: `ubuntu-latest`
- result: failure before steps

PR #245 current integration state, after auth/session hardening:
- workflow run: `36280437123`
- job `foundation`: `108511097230`
- result: failure before steps (`steps=null`)

## Minimal isolated reproduction
Diagnostic PR #244. The workflow intentionally removed all application dependencies and contained only one shell/PowerShell step per job.

### Linux/container reproduction
Run `36153551313`:

| job | job id | runner label | result |
|---|---:|---|---|
| ubuntu-slim | `108132494182` | `ubuntu-slim` | failure before steps |
| ubuntu-22 | `108132494444` | `ubuntu-22.04` | failure before steps |
| ubuntu-24 | `108132494497` | `ubuntu-24.04` | failure before steps |

### Cross-OS reproduction
Run `36154183174`:

| job | job id | runner label | result |
|---|---:|---|---|
| ubuntu-22 | `108134575426` | `ubuntu-22.04` | failure before steps |
| ubuntu-slim | `108134575685` | `ubuntu-slim` | failure before steps |
| ubuntu-24 | `108134575775` | `ubuntu-24.04` | failure before steps |
| windows | `108134575893` | `windows-latest` | failure before steps |

This rules out:
- application code;
- pnpm / Node setup;
- PostgreSQL service;
- migrations;
- HTTP/E2E scripts;
- actions/checkout;
- a specific Ubuntu image;
- Linux-only runner capacity;
- VM-only provisioning (`ubuntu-slim` reproduces it);
- OS-specific workflow behavior (`windows-latest` reproduces it before PowerShell starts).

The failure boundary is before GitHub provides a functioning hosted runner to the workflow.

## Cross-repository evidence — important narrowing
The failure is not specific to MLIVRETRABALHO code or workflow syntax.

### Same account worked previously
`dbdanielbaracho/GROWTH-OS` had normal GitHub-hosted execution on 2026-09-21:
- CI run `35558675913` on commit `4d111b6b4df1e3fbc13252c8619d1ef262a6ffc9`;
- conclusion: `success`.

This proves the account historically had functioning GitHub-hosted runner access.

### Same account fails now in another repository
`dbdanielbaracho/MARKETPULSE` scheduled workflow on 2026-09-26 reproduced the same signature:
- run `36272180476` (`Production quality gate`);
- job `production-audit`: `108488110231`;
- `labels=["ubuntu-latest"]`;
- `runner_id=0`;
- `runner_name=""`;
- `steps=[]`;
- failure in roughly 2 seconds before execution.

Therefore the current failure is cross-repository on the same GitHub account. This materially narrows root cause to an account-level hosted-runner entitlement/billing/policy condition or an unreported/partial GitHub Actions provisioning incident, rather than MLIVRETRABALHO repository code.

GitHub public Status currently reports Actions operational, so an account-level entitlement/billing/policy condition must be explicitly ruled out even though the repository is public.

## Repository-side investigation already performed
1. Workflow syntax inspected; normal `runs-on` labels and steps are present.
2. Reproduction created from current `main` with a new workflow file.
3. Standard GitHub-hosted runner labels across Linux VM, Linux slim/container and Windows tested.
4. Repository confirmed public.
5. GitHub official documentation states standard hosted runners are free/unlimited for public repositories; ordinary minute quota therefore does not explain the observed public-repo behavior.
6. GitHub public Status reports Actions operational.
7. Similar current GitHub reports exist with runner-less jobs / empty steps signatures.
8. Local alternative execution environment was checked but cannot resolve `github.com` or `registry.npmjs.org` and has no cached repo/dependency store, so it cannot provide equivalent reproducible CI.
9. Cross-repository control now proves same-account MARKETPULSE is affected while GROWTH-OS worked normally five days earlier.

## Account settings to verify in UI
The connected GitHub API surface does not expose these private account settings. Verify:

1. Account → **Settings → Billing and licensing / Budgets**
   - no Actions budget with `Stop usage when budget limit is reached`;
   - no payment/account restriction affecting Actions hosted runners.

2. Repository → **Settings → Actions → General**
   - Actions enabled;
   - allowed actions/workflows not disabled by policy.

3. Repository → **Settings → Actions → Runners**
   - no unusual runner restriction.

Because MARKETPULSE reproduces the same failure, account-level billing/entitlement is now higher priority than repository-specific settings.

## Support request text
> GitHub-hosted Actions jobs fail before runner allocation across at least two public repositories on the same account. In `dbdanielbaracho/MLIVRETRABALHO`, production CI and a minimal diagnostic workflow reproduce `runner_id=0`, empty runner name and no steps/logs across `ubuntu-22.04`, `ubuntu-24.04`, `ubuntu-slim`, and `windows-latest` (run `36154183174`, jobs `108134575426`, `108134575685`, `108134575775`, `108134575893`). Current MLIVRETRABALHO run `36280437123`, job `108511097230`, also has `steps=null`. Cross-repository control: `dbdanielbaracho/MARKETPULSE` run `36272180476`, job `108488110231`, failed on `ubuntu-latest` with `runner_id=0`, empty runner name and `steps=[]` before execution on 2026-09-26. The same account successfully ran `dbdanielbaracho/GROWTH-OS` CI run `35558675913` on 2026-09-21. GitHub Status reports Actions operational. Please inspect account-level Actions hosted-runner entitlement/billing/policy/provisioning because no workflow code reaches execution.

## Closure criterion
This incident is resolved only when a fresh hosted-runner job receives a functioning runner and executes its first step, followed by the full MLIVRETRABALHO CI completing successfully.

## Related project gate
Issue #214 — Production Truth Gate.
