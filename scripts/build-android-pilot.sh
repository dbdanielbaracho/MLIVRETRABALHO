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

mkdir -p "$ROOT/artifacts/android-pilot"
cp "$APK" "$ROOT/artifacts/android-pilot/MLivreTrabalho-Pilot-debug.apk"
sha256sum "$ROOT/artifacts/android-pilot/MLivreTrabalho-Pilot-debug.apk" > "$ROOT/artifacts/android-pilot/SHA256SUMS.txt"

printf 'Pilot APK created: %s\n' "$ROOT/artifacts/android-pilot/MLivreTrabalho-Pilot-debug.apk"
