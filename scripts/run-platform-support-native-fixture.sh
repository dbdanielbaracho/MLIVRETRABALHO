#!/usr/bin/env bash
# Start only the synthetic fixture emulator, without injecting keys into Launcher.
set -euo pipefail
if test "${CI:-}" != true || test "${GITHUB_REPOSITORY:-}" != dbdanielbaracho/MLIVRETRABALHO; then
  echo "NATIVE_EMULATOR_REFUSED scope=ci-repository" >&2
  exit 1
fi
test "${ANDROID_HOME:?}" != /
test "${ANDROID_AVD_HOME:?}" != /
test -r /dev/kvm
test -w /dev/kvm
test "$(nproc)" -ge 4
sdk_root="$ANDROID_HOME"
avd_root="$ANDROID_AVD_HOME"
fixture_avd=platform-support-fixture
test ! -e "$avd_root/$fixture_avd.avd"
test ! -e "$avd_root/$fixture_avd.ini"
test -x "$sdk_root/emulator/emulator"
test -x "$sdk_root/platform-tools/adb"
test -x "$sdk_root/cmdline-tools/latest/bin/avdmanager"
test -f "$sdk_root/system-images/android-35/default/x86_64/source.properties"
mkdir -p artifacts/platform-support-native
"$sdk_root/platform-tools/adb" devices > artifacts/platform-support-native/preboot-devices.txt
# Never attach to an existing emulator or physical device.
test "$(awk 'NR>1 && NF>=2 {n++} END {print n+0}' artifacts/platform-support-native/preboot-devices.txt)" -eq 0
sha256sum "$sdk_root/system-images/android-35/default/x86_64/source.properties" > artifacts/platform-support-native/EMULATOR_IMAGE_SHA256.txt
printf 'no\n' | "$sdk_root/cmdline-tools/latest/bin/avdmanager" create avd --name "$fixture_avd" --package 'system-images;android-35;default;x86_64' --device pixel_6
python3 - "$avd_root/$fixture_avd.avd/config.ini" <<'PY'
from pathlib import Path
import sys
p=Path(sys.argv[1]);rows=p.read_text().splitlines()
rows=[r for r in rows if not r.startswith('hw.cpu.ncore=')]
p.write_text('\n'.join(rows+['hw.cpu.ncore=4'])+'\n')
PY
test -f "$sdk_root/emulator/source.properties"
grep -Eq '^Pkg[.]Revision[[:space:]]*=[[:space:]]*[0-9]+([.][0-9]+)+[[:space:]]*$' "$sdk_root/emulator/source.properties"
cp "$sdk_root/emulator/source.properties" artifacts/platform-support-native/EMULATOR_VERSION.txt
sha256sum "$sdk_root/emulator/source.properties" >> artifacts/platform-support-native/EMULATOR_IMAGE_SHA256.txt
"$sdk_root/emulator/emulator" -port 5554 -avd "$fixture_avd" -accel on -no-window -gpu swiftshader -noaudio -no-boot-anim -camera-back none -no-snapshot -no-snapshot-save > artifacts/platform-support-native/emulator-host.log 2>&1 &
fixture_emulator_pid=$!
close_fixture_emulator() {
  "$sdk_root/platform-tools/adb" -s emulator-5554 logcat -d > artifacts/platform-support-native/emulator-final-logcat.txt 2>&1 || true
  if kill -0 "$fixture_emulator_pid" 2>/dev/null; then
    kill -TERM "$fixture_emulator_pid"
    wait "$fixture_emulator_pid" || true
  fi
}
trap close_fixture_emulator EXIT
booted=false
for attempt in $(seq 1 180); do
  kill -0 "$fixture_emulator_pid"
  if test "$("$sdk_root/platform-tools/adb" -s emulator-5554 shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = 1; then booted=true; break; fi
  sleep 2
done
test "$booted" = true
echo "NATIVE_EMULATOR_BOOT_READ_ONLY_PASS noLauncherKeyInjection=true"
# The driver captures original boot logs, fails closed on ANR and only then
# installs/opens the fixture and targets its visible native controls.
python3 scripts/platform-support-native-ui.py
