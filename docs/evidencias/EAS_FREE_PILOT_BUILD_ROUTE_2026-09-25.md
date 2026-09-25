# EAS Free Pilot APK Route — 2026-09-25

## Objective
Reduce the MLIVRETRABALHO Android pilot build blocker without depending on the currently broken GitHub-hosted Actions runner and without introducing a paid plan by default.

## Current official Expo facts
- Expo EAS Free is currently `$0/month`.
- The current Free allowance includes up to 15 Android and 15 iOS builds per billing period, with a low-priority queue and a 45-minute build timeout.
- EAS Build supports installable Android APKs.
- An EAS build profile can generate an APK by setting `distribution: internal` and/or `android.buildType: apk`.
- In a monorepo, EAS commands must be run from the app directory and `eas.json` belongs in that app directory.
- EAS can generate/manage Android signing credentials, or credentials can be supplied explicitly.

Official references:
- https://expo.dev/pricing
- https://docs.expo.dev/build-reference/apk/
- https://docs.expo.dev/build-reference/build-with-monorepos/
- https://docs.expo.dev/build/introduction/

## Repository preparation
A stacked branch/PR prepares:

`apps/mobile/eas.json`

with a `pilot` profile:

```json
{
  "cli": {
    "appVersionSource": "local"
  },
  "build": {
    "pilot": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "env": {
        "EXPO_PUBLIC_API_URL": "https://mlivretrabalho.predibeacon.com/v1"
      }
    }
  }
}
```

The profile contains no password, API token, signing secret or fabricated Expo project ID.

## External/user authorization still required
The project must be linked/authenticated to an Expo account before a cloud build can actually start. Do not fabricate `extra.eas.projectId`; let Expo create/link the real project through the authenticated EAS flow.

Expected command from the mobile app directory after authentication/linking:

```bash
cd apps/mobile
eas build --platform android --profile pilot
```

If EAS prompts to configure/generate Android credentials for the first build, that is an external credential/account action and must be recorded with the resulting signing provenance. Do not commit private keystore material to the repository.

## Evidence required from an actual build
When a build succeeds, record:
- EAS project/account reference;
- build ID and URL/reference;
- source commit SHA;
- APK filename;
- SHA256 of the downloaded APK;
- signing provenance (EAS-managed or user-managed; never the private key itself);
- API base URL/profile used;
- build timestamp/status.

Then continue with the physical-device packet under Issue #220.

## What this resolves / does not resolve
This route can resolve the **APK generation** dependency without a GitHub-hosted runner if Expo EAS is authorized and available.

It does **not** by itself resolve:
- physical-device installation/E2E;
- notification credentials and device behavior;
- broader release signing governance;
- independent pentest;
- GitHub CI / Production Truth gate #214.

## Cost guardrail
Remain on the EAS Free plan unless the user explicitly authorizes a paid plan. If the free build allowance is exhausted, stop rather than incurring a paid subscription/usage automatically.
