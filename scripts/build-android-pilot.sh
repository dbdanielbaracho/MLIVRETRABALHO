#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

export CI=1
export NODE_ENV=production
export EXPO_PUBLIC_API_URL="${EXPO_PUBLIC_API_URL:-https://mlivretrabalho.predibeacon.com/v1}"

pnpm --filter @mlivretrabalho/mobile exec expo prebuild --platform android --clean

cd apps/mobile/android
./gradlew assembleRelease

APK="app/build/outputs/apk/release/app-release.apk"
test -f "$APK"

# A pilot APK must be standalone: release builds must embed the Expo/React Native
# production bundle instead of requiring Metro on port 8081.
if ! unzip -l "$APK" | grep -Eq 'assets/(index\.android\.bundle|expo-root/.*\.js|.*\.bundle)'; then
  echo "ERROR: standalone JavaScript bundle was not packaged in the release APK." >&2
  unzip -l "$APK" | grep 'assets/' | head -100 >&2 || true
  exit 1
fi

OUT="$ROOT/artifacts/android-pilot"
mkdir -p "$OUT"
cp "$APK" "$OUT/MLivreTrabalho.apk"
sha256sum "$OUT/MLivreTrabalho.apk" > "$OUT/SHA256SUMS.txt"

VERSION="$(node -p "require('$ROOT/apps/mobile/app.json').expo.version")"
COMMIT_SHA="${GITHUB_SHA:-$(git -C "$ROOT" rev-parse HEAD 2>/dev/null || printf unknown)}"
BUILD_TIME="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
cat > "$OUT/BUILD_INFO.txt" <<EOF
product=MLivreTrabalho Pilot
version=$VERSION
android_package=com.predibeacon.mlivretrabalho.pilot
commit_sha=$COMMIT_SHA
build_time_utc=$BUILD_TIME
build_variant=release
metro_required=false
signing=android_release_internal_pilot_only
EOF

printf 'Standalone pilot APK created: %s\n' "$OUT/MLivreTrabalho.apk"
printf 'Build metadata: %s\n' "$OUT/BUILD_INFO.txt"
