# Pilot Device E2E Execution Packet — MLIVRETRABALHO

**Data:** 2026-09-24  
**Status:** internal preparation complete; execution on physical Android device remains external.

## Objective

Define exactly what must be executed and captured on a real Android device before Issue #220 can close. This packet does **not** claim device validation has happened.

## Build identity required before testing

Record before install:

- APK filename;
- SHA256;
- `BUILD_INFO.txt` content;
- source commit SHA;
- app version;
- Android package `com.predibeacon.mlivretrabalho.pilot`;
- signing mode/key fingerprint;
- API base URL;
- test device model;
- Android version;
- test start/end timestamp.

If any of these are missing, the execution evidence is incomplete.

## Install / update / rollback

### Fresh install
1. Install the APK outside Expo/development tooling.
2. Launch from Android launcher.
3. Confirm app reaches normal entry/auth flow.
4. Record screenshot + install/build identity.

### Update path
1. Install build A.
2. Create/sign in with test identities and generate non-sensitive test state.
3. Install build B with the same pilot package/signing lineage.
4. Confirm update succeeds without unintended app-data loss.
5. Re-run signin/session and at least one professional + company navigation path.

### Rollback
- Follow `PILOT_ANDROID_DISTRIBUTION_v1.82.md` procedure.
- If Android refuses downgrade because of version/signing constraints, record this as expected platform behavior and execute the documented uninstall/reinstall fallback only for disposable pilot test data.
- Never claim rollback succeeded unless device evidence exists.

## Professional journey — required device cases

1. Signup/signin.
2. Profile create/edit and persistence after app restart.
3. Jobs list loads from official API.
4. Interest in a job in one action.
5. Agenda reflects confirmed assignment.
6. Optional foreground location at check-in:
   - permission allowed;
   - permission denied;
   - location unavailable/failed.
7. Start work.
8. Check-out/conclusion path.
9. Earnings visible and tied to completed work; no real-money claim unless real provider gate is closed.
10. Notifications open the expected in-app destination when deep-link behavior is available.
11. Work Passport/reputation visible.
12. Signout and signin again.

For every failure record: step, device state, screenshot/log, API response if safely obtainable, build SHA and reproducibility.

## Company journey — required device cases

1. Company signup/signin.
2. Publish a valid job with date/time window.
3. Open candidates without entering UUID manually.
4. View recommendation score/reasons.
5. Explicitly confirm professional.
6. Team/planner navigation.
7. Preferred talent pool navigation.
8. Replacement request/select/confirm flow using test assignments.
9. Completion/rating path.
10. Company analytics/indicators load without invented forecasts.
11. Safety cases/appeals surfaces available according to role.
12. Signout/signin persistence behavior.

## Multi-company professional case

Use one professional identity associated operationally with at least two companies through legitimate test assignments.

Pass conditions:

- assignments from both companies appear where product design requires aggregation;
- notifications/earnings/passport behave according to the multi-company contract;
- no manual workspace switching is required for the professional journey;
- no cross-tenant company/admin data becomes visible.

## Location test matrix

| Case | Expected product behavior |
|---|---|
| Permission allowed | foreground coordinates may be captured for check-in/out according to current feature contract |
| Permission denied | user can continue through permitted non-location fallback; app must not crash or silently enable background tracking |
| Service unavailable/error | error is handled; no fabricated coordinates; event remains auditable |
| Background | no continuous/background tracking is introduced by this pilot baseline |

## Notification / deep-link matrix

Validate at minimum:

- app foreground;
- app background;
- app cold start when technically supported by current notification setup;
- notification points to the correct assignment/conversation/action;
- user cannot deep-link into another tenant's protected resource;
- stale/invalid deep link fails safely.

If push credentials/provider are not configured for the pilot environment, mark that sub-gate **BLOCKED EXTERNALLY**, not PASS.

## Device evidence package

Store under `docs/evidencias/device-pilot/` or attached evidence referenced from Issue #220:

- build metadata + SHA256;
- device model/OS;
- sanitized screenshots;
- pass/fail table;
- relevant sanitized logs;
- exact defect references;
- retest evidence after fixes;
- final sign-off stating what was and was not executed.

Do not store passwords, tokens, raw identity documents, biometrics or sensitive real-user data.

## Pass/stop rules

Stop pilot readiness on any of the following until corrected/retested:

- tenant data leak / IDOR;
- auth/session boundary failure;
- wrong-recipient financial binding;
- app crash on primary professional/company journey;
- silent data loss on supported update path;
- location collected contrary to permission/foreground contract;
- deep link bypasses authorization;
- Safety/Trust admin action available to unauthorized role.

## What remains external after this packet

- generation of a real APK in a functioning Android build environment if current CI runner remains unavailable;
- physical device execution;
- notification/push provider credentials where needed;
- release signing/keystore governance for broader distribution;
- independent pentest.
