# Samsung physical-device validation — 2026-10-02

## Scope

Validation of the closed Android pilot after the real Samsung startup crash.

## Root cause

The real-device log showed a React runtime mismatch:
- `react`: 19.3.0
- `react-native-renderer`: 19.1.4

The mobile dependency was pinned to React 19.1.4 with React Native 0.81.6 and the pnpm lockfile was regenerated reproducibly.

## Automated evidence

Commit tested: `d19552c8bf184bb774232f63f0a91343051255f8`.

- GitHub Actions CI run `36935508892`: SUCCESS.
- Standalone Pilot APK run `36935508990`: SUCCESS.
- Artifact: `MLivreTrabalho-standalone-apk`, artifact id `11206361088`.
- Artifact digest: `sha256:dcf71acc85612f8f10d6ac2c9322845a9f6effafff305f2f4b9219c45620c7f5`.
- Standalone gate installs and launches the release APK without Metro and scans logcat for fatal/runtime JS startup errors.

## Physical-device evidence

The user installed the newly generated APK on the same Samsung device that had reproduced the prior crash and reported on 2026-10-02 that it worked.

This closes the specific Samsung startup-crash/device-launch validation for this build. It does **not** claim an independent pentest, Play Store readiness, production signing readiness, or broad device-matrix certification.

## Merge

PR #289 was merged after the physical-device confirmation.

Merge commit: `ff6ef34870b61242e50cd0dd34d11936dd40833d`.

## Governance consequence

The previous Documento da Verdade statement that physical Android execution itself was still unproven is superseded for this Samsung pilot build. Independent pentest and broader distribution/signing gates remain separate.
