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

## Repository-side investigation already performed
1. Workflow syntax inspected; normal `runs-on` labels and steps are present.
2. Reproduction created from current `main` with a new workflow file.
3. Standard GitHub-hosted runner labels across Linux VM, Linux slim/container and Windows tested.
4. Repository confirmed public.
5. GitHub official documentation states standard hosted runners are free/unlimited for public repositories; ordinary minute quota therefore does not explain the observed public-repo behavior.
6. GitHub public Status on 2026-09-25 reported Actions operational.
7. Similar current GitHub Community reports exist with the same `runner_id=0` / empty steps / no logs signature.
8. Local alternative execution environment was checked but currently cannot resolve `github.com` or `registry.npmjs.org` and has no cached repo/dependency store, so it cannot provide equivalent reproducible CI.

## Account/repository settings to verify in UI
The connected GitHub API surface available to the project does not expose these private settings. Verify:

1. Repository → **Settings → Actions → General**
   - Actions enabled;
   - allowed actions/workflows not disabled by policy.

2. Repository → **Settings → Actions → Runners**
   - GitHub-hosted runner availability is not restricted.

3. Account → **Settings → Billing and licensing / Budgets**
   - no Actions budget with `Stop usage when budget limit is reached`;
   - no account-level restriction/suspension affecting hosted runners.

For this public repository, ordinary Actions minute quota is not the expected limiting factor, but account policy/restriction still must be ruled out.

## Support request text
> GitHub-hosted Actions jobs in public repository `dbdanielbaracho/MLIVRETRABALHO` fail before runner allocation. Production CI and a new minimal one-step diagnostic workflow reproduce `runner_id=0`, empty runner name, and no steps/logs. Reproduction is cross-OS and cross-runner: `ubuntu-22.04`, `ubuntu-24.04`, `ubuntu-slim`, and `windows-latest` all fail before the first step. Run `36154183174`, jobs `108134575426`, `108134575685`, `108134575775`, `108134575893`. Earlier run `36153551313` reproduced the same Linux/slim behavior. A normal product CI example is run `36096510698`, job `107949791300`. Please inspect Actions hosted-runner entitlement/provisioning/configuration for this repository/account because no workflow code reaches execution.

## Closure criterion
This incident is resolved only when a fresh minimal hosted-runner job receives a functioning runner and executes its first step, followed by the full MLIVRETRABALHO CI completing successfully.

## Related project gate
Issue #214 — Production Truth Gate.
