#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

export CI=1

pnpm --filter @mlivretrabalho/mobile exec expo prebuild --platform android --clean

cd apps/mobile/android
./gradlew assembleDebug

APK="app/build/outputs/apk/debug/app-debug.apk"
test -f "$APK"

OUT="$ROOT/artifacts/android-pilot"
mkdir -p "$OUT"
cp "$APK" "$OUT/MLivreTrabalho-Pilot-debug.apk"
sha256sum "$OUT/MLivreTrabalho-Pilot-debug.apk" > "$OUT/SHA256SUMS.txt"

VERSION="$(node -p "require('$ROOT/apps/mobile/app.json').expo.version")"
COMMIT_SHA="${GITHUB_SHA:-$(git -C "$ROOT" rev-parse HEAD 2>/dev/null || printf unknown)}"
BUILD_TIME="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
cat > "$OUT/BUILD_INFO.txt" <<EOF
product=MLivreTrabalho Pilot
version=$VERSION
android_package=com.predibeacon.mlivretrabalho.pilot
commit_sha=$COMMIT_SHA
build_time_utc=$BUILD_TIME
signing=android_debug_internal_pilot_only
EOF

printf 'Pilot APK created: %s\n' "$OUT/MLivreTrabalho-Pilot-debug.apk"
printf 'Build metadata: %s\n' "$OUT/BUILD_INFO.txt"
