#!/usr/bin/env bash
set -euo pipefail
test "${CI:-}" = true
test "${GITHUB_REPOSITORY:-}" = dbdanielbaracho/MLIVRETRABALHO
ROOT="$(pwd)"
OUT="$ROOT/artifacts/platform-support-native"
mkdir -p "$OUT"
STAGE="$(mktemp -d /tmp/mlivre-support-build.XXXXXX)"
trap 'rm -rf "$STAGE"' EXIT
# A separate checkout overlay: never overwrite canonical mobile config/output.
git archive HEAD | tar -x -C "$STAGE"
# Preserve pnpm's relative dependency layout inside this checkout. External
# symlink targets become absolute resource names and fail Android AAPT.
cp -a "$ROOT/node_modules" "$STAGE/node_modules"
cp -a "$ROOT/apps/mobile/node_modules" "$STAGE/apps/mobile/node_modules"
test "$#" -le 1
if test "${1:-}" = --bundle-probe; then
  PROBE=true
  export EXPO_PUBLIC_API_URL=http://10.0.2.2:1/v1
else
  test "$#" = 0
  PROBE=false
  CANONICAL="$(sha256sum artifacts/android-pilot/MLivreTrabalho.apk | cut -d ' ' -f1)"
  export EXPO_PUBLIC_API_URL="$(node -p "require('/tmp/mlivre-support-native/public.json').api")"
fi
[[ "$EXPO_PUBLIC_API_URL" =~ ^http://10\.0\.2\.2:[0-9]+/v1$ ]]
export NODE_ENV=production
node - "$STAGE" <<'JS'
const fs=require('node:fs'),p=process.argv[2]+'/apps/mobile/app.json',x=JSON.parse(fs.readFileSync(p));x.expo.name='MLivreTrabalho Support Fixture';x.expo.slug='mlivre-support-fixture';x.expo.scheme='mlivre-support-fixture';x.expo.android.package='com.predibeacon.mlivretrabalho.supportfixture';fs.writeFileSync(p,JSON.stringify(x,null,2));
JS
cd "$STAGE/apps/mobile"
cat > metro.config.js <<'METRO'
const {getDefaultConfig}=require('expo/metro-config');
module.exports=getDefaultConfig(__dirname);
METRO
if test "$PROBE" = true; then
  pnpm exec expo export --platform android --output-dir "$STAGE/bundle-probe"
  echo 'NATIVE_FIXTURE_MODULE_CLOSURE_PASS probeOnly=true UI=false production=false'
  exit 0
fi
pnpm exec expo prebuild --platform android --clean
mkdir -p android/app/src/main/res/xml android/app/src/main/res/raw
# The fixture trusts only its ephemeral CA; external production HTTPS is not trusted.
# Cleartext is confined to the emulator's documented host-loopback alias.
openssl req -x509 -newkey rsa:2048 -nodes -days 1 -subj '/CN=MLivre Support Local Fixture' -keyout "$STAGE/fixture.key" -out android/app/src/main/res/raw/platform_support_fixture_ca.pem >/dev/null 2>&1
cat > android/app/src/main/res/xml/platform_support_fixture_network.xml <<'XML'
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
 <base-config cleartextTrafficPermitted="false"><trust-anchors><certificates src="@raw/platform_support_fixture_ca"/></trust-anchors></base-config>
 <domain-config cleartextTrafficPermitted="true"><domain includeSubdomains="false">10.0.2.2</domain></domain-config>
</network-security-config>
XML
python3 - <<'PY'
from pathlib import Path
p=Path('android/app/src/main/AndroidManifest.xml');s=p.read_text();s=s.replace('<application ', '<application android:networkSecurityConfig="@xml/platform_support_fixture_network" ',1);p.write_text(s)
PY
cd android
./gradlew assembleRelease
APK=app/build/outputs/apk/release/app-release.apk
unzip -l "$APK" | grep -Eq 'assets/(index\.android\.bundle|expo-root/.*\.js|.*\.bundle)'
cp "$APK" "$OUT/SupportFixture.apk"
cp app/src/main/AndroidManifest.xml "$OUT/FIXTURE_MANIFEST.xml"
cp app/src/main/res/xml/platform_support_fixture_network.xml "$OUT/FIXTURE_NETWORK.xml"
cd "$ROOT"
test "$(sha256sum artifacts/android-pilot/MLivreTrabalho.apk | cut -d ' ' -f1)" = "$CANONICAL"
sha256sum "$OUT/SupportFixture.apk" > "$OUT/FIXTURE_SHA256.txt"
printf 'checkout=%s\npackage=com.predibeacon.mlivretrabalho.supportfixture\napi=%s\nmetro_required=false\ncanonical_unchanged=%s\nsynthetic=true\nproduction=false\n' "$GITHUB_SHA" "$EXPO_PUBLIC_API_URL" "$CANONICAL" > "$OUT/BUILD_INFO.txt"
echo 'NATIVE_FIXTURE_BUILD_PASS separatePackage=true separateOutput=true localAPI=true canonicalUnchanged=true metro_required=false'
