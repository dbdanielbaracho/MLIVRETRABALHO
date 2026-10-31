#!/usr/bin/env bash
# Start only the synthetic fixture emulator, without injecting keys into Launcher.
set -euo pipefail

fail() {
  printf 'NATIVE_PREFLIGHT_FAIL check=%s\n' "$1" >&2
  exit 1
}

if test "${CI:-}" != true; then
  fail "ci_environment"
fi
if test "${GITHUB_REPOSITORY:-}" != dbdanielbaracho/MLIVRETRABALHO; then
  fail "repository_scope"
fi

mkdir -p artifacts/platform-support-native
exec > >(tee -a artifacts/platform-support-native/native-preflight.log) 2>&1
printf 'NATIVE_PREFLIGHT_START repo=%s\n' "$GITHUB_REPOSITORY"

sdk_root="${ANDROID_HOME:-}"
if test -z "$sdk_root"; then fail "ANDROID_HOME_unset"; fi
if test "$sdk_root" = /; then fail "ANDROID_HOME_root"; fi

avd_root="${ANDROID_AVD_HOME:-}"
if test -z "$avd_root"; then fail "ANDROID_AVD_HOME_unset"; fi
if test "$avd_root" = /; then fail "ANDROID_AVD_HOME_root"; fi

available_cpus="$(nproc)"
printf 'NATIVE_HOST_CPUS %s\n' "$available_cpus"
if test "$available_cpus" -lt 4; then fail "host_cpu_count_below_4"; fi

fixture_avd=platform-support-fixture
if test -e "$avd_root/$fixture_avd.avd"; then fail "fixture_avd_already_exists"; fi
if test -e "$avd_root/$fixture_avd.ini"; then fail "fixture_avd_ini_already_exists"; fi

if ! test -x "$sdk_root/emulator/emulator"; then fail "emulator_binary_missing_or_not_executable"; fi
if ! test -x "$sdk_root/platform-tools/adb"; then fail "adb_binary_missing_or_not_executable"; fi
if ! test -x "$sdk_root/cmdline-tools/latest/bin/avdmanager"; then fail "avdmanager_missing_or_not_executable"; fi
if ! test -f "$sdk_root/system-images/android-35/default/x86_64/source.properties"; then fail "required_api35_image_missing"; fi

emulator_acceleration=off
if test -c /dev/kvm && test -r /dev/kvm && test -w /dev/kvm; then
  emulator_acceleration=on
  printf 'NATIVE_EMULATOR_ACCELERATION hardware_kvm=available\n'
else
  printf 'NATIVE_EMULATOR_ACCELERATION software_kvm=unavailable\n'
fi

printf 'NATIVE_PREFLIGHT_PASS sdk_root=%s avd_root=%s cpus=%s acceleration=%s\n' "$sdk_root" "$avd_root" "$available_cpus" "$emulator_acceleration"
"$sdk_root/platform-tools/adb" devices > artifacts/platform-support-native/preboot-devices.txt
# Never attach to an existing emulator or physical device.
device_count="$(awk 'NR>1 && NF>=2 {n++} END {print n+0}' artifacts/platform-support-native/preboot-devices.txt)"
printf 'NATIVE_PREBOOT_DEVICE_COUNT %s\n' "$device_count"
if test "$device_count" -ne 0; then fail "preboot_device_present"; fi

sha256sum "$sdk_root/system-images/android-35/default/x86_64/source.properties" > artifacts/platform-support-native/EMULATOR_IMAGE_SHA256.txt
printf 'no\n' | "$sdk_root/cmdline-tools/latest/bin/avdmanager" create avd --name "$fixture_avd" --package 'system-images;android-35;default;x86_64' --device pixel_6
python3 - "$avd_root/$fixture_avd.avd/config.ini" <<'PY'
from pathlib import Path
import sys
p=Path(sys.argv[1]);rows=p.read_text().splitlines()
rows=[r for r in rows if not r.startswith('hw.cpu.ncore=')]
p.write_text('\n'.join(rows+['hw.cpu.ncore=4'])+'\n')
PY
if ! test -f "$sdk_root/emulator/source.properties"; then fail "emulator_source_properties_missing"; fi
if ! grep -Eq '^Pkg[.]Revision[[:space:]]*=[[:space:]]*[0-9]+([.][0-9]+)+[[:space:]]*$' "$sdk_root/emulator/source.properties"; then fail "emulator_revision_metadata_invalid"; fi
cp "$sdk_root/emulator/source.properties" artifacts/platform-support-native/EMULATOR_VERSION.txt
sha256sum "$sdk_root/emulator/source.properties" >> artifacts/platform-support-native/EMULATOR_IMAGE_SHA256.txt

"$sdk_root/emulator/emulator" -port 5554 -avd "$fixture_avd" -accel "$emulator_acceleration" -no-window -gpu swiftshader -noaudio -no-boot-anim -camera-back none -no-snapshot -no-snapshot-save > artifacts/platform-support-native/emulator-host.log 2>&1 &
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
for attempt in $(seq 1 450); do
  kill -0 "$fixture_emulator_pid"
  if test "$("$sdk_root/platform-tools/adb" -s emulator-5554 shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = 1; then booted=true; break; fi
  sleep 2
done
if test "$booted" != true; then fail "emulator_boot_timeout_or_process_exit"; fi
echo "NATIVE_EMULATOR_BOOT_READ_ONLY_PASS noLauncherKeyInjection=true"
# The driver captures original boot logs, fails closed on ANR and only then
# installs/opens the fixture and targets its visible native controls.
python3 scripts/platform-support-native-ui.py
