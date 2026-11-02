#!/usr/bin/env bash
# Use the fresh software-mode emulator provisioned by the existing Android action.
set -euo pipefail

fail() {
  printf 'NATIVE_PREFLIGHT_FAIL check=%s\n' "$1" >&2
  exit 1
}

if test "${CI:-}" != true; then fail "ci_environment"; fi
if test "${GITHUB_REPOSITORY:-}" != dbdanielbaracho/MLIVRETRABALHO; then fail "repository_scope"; fi

mkdir -p artifacts/platform-support-native
exec > >(tee -a artifacts/platform-support-native/native-preflight.log) 2>&1
printf 'NATIVE_PREFLIGHT_START repo=%s\n' "$GITHUB_REPOSITORY"

sdk_root="${ANDROID_HOME:-}"
if test -z "$sdk_root"; then fail "ANDROID_HOME_unset"; fi
if test "$sdk_root" = /; then fail "ANDROID_HOME_root"; fi
avd_root="${ANDROID_AVD_HOME:-}"
if test -z "$avd_root"; then fail "ANDROID_AVD_HOME_unset"; fi
if test "$avd_root" = /; then fail "ANDROID_AVD_HOME_root"; fi
if test "$avd_root" != "${RUNNER_TEMP:?RUNNER_TEMP must be set}/mlivre-support-avd"; then fail "avd_namespace_not_isolated"; fi

available_cpus="$(nproc)"
printf 'NATIVE_HOST_CPUS %s\n' "$available_cpus"
if test "$available_cpus" -lt 4; then fail "host_cpu_count_below_4"; fi
if ! test -x "$sdk_root/emulator/emulator"; then fail "emulator_binary_missing_or_not_executable"; fi
if ! test -x "$sdk_root/platform-tools/adb"; then fail "adb_binary_missing_or_not_executable"; fi
if ! test -f "$sdk_root/system-images/android-35/default/x86_64/source.properties"; then fail "required_api35_image_missing"; fi

# The same software-mode action used by the canonical smoke provisions and
# boots one fresh AVD in this job's isolated namespace. Never start a second AVD.
avd_count="$(find "$avd_root" -mindepth 1 -maxdepth 1 -type d -name '*.avd' | wc -l | tr -d ' ')"
ini_count="$(find "$avd_root" -mindepth 1 -maxdepth 1 -type f -name '*.ini' | wc -l | tr -d ' ')"
if test "$avd_count" -ne 1 || test "$ini_count" -ne 1 || ! test -d "$avd_root/test.avd" || ! test -f "$avd_root/test.ini"; then
  fail "software_action_avd_namespace_invalid"
fi
if ! "$sdk_root/emulator/emulator" -accel off -version; then fail "software_emulator_version_probe_failed"; fi
if ! grep -Eq '^Pkg[.]Revision[[:space:]]*=[[:space:]]*[0-9]+([.][0-9]+)+[[:space:]]*$' "$sdk_root/emulator/source.properties"; then fail "emulator_revision_metadata_invalid"; fi

sha256sum "$sdk_root/system-images/android-35/default/x86_64/source.properties" > artifacts/platform-support-native/EMULATOR_IMAGE_SHA256.txt
cp "$sdk_root/emulator/source.properties" artifacts/platform-support-native/EMULATOR_VERSION.txt
sha256sum "$sdk_root/emulator/source.properties" >> artifacts/platform-support-native/EMULATOR_IMAGE_SHA256.txt
printf 'avd_root=%s\navd_name=test\napi_level=35\narchitecture=x86_64\nprofile=pixel_6\nacceleration=software\n' "$avd_root" > artifacts/platform-support-native/EMULATOR_CONFIGURATION.txt

"$sdk_root/platform-tools/adb" devices -l > artifacts/platform-support-native/preboot-devices.txt
device_rows="$(awk 'NR>1 && NF>=2 && $2=="device" {print $1}' artifacts/platform-support-native/preboot-devices.txt)"
printf 'NATIVE_ACTION_DEVICE_SET %s\n' "$device_rows"
if test "$device_rows" != emulator-5554; then fail "unexpected_action_device_set"; fi
booted=false
for attempt in $(seq 1 60); do
  if test "$("$sdk_root/platform-tools/adb" -s emulator-5554 shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = 1; then booted=true; break; fi
  sleep 2
done
if test "$booted" != true; then fail "action_emulator_boot_not_confirmed"; fi
"$sdk_root/platform-tools/adb" -s emulator-5554 logcat -d > artifacts/platform-support-native/emulator-initial-logcat.txt
echo "NATIVE_EMULATOR_BOOT_READ_ONLY_PASS acceleration=software actionManaged=true noLauncherKeyInjection=true"

capture_final_logcat() {
  "$sdk_root/platform-tools/adb" -s emulator-5554 logcat -d > artifacts/platform-support-native/emulator-final-logcat.txt 2>&1 || true
}
trap capture_final_logcat EXIT
# android-emulator-runner owns emulator startup/teardown; the UI driver preserves
# the fail-closed journey, installs the fixture, and captures original PNG/XML.
python3 scripts/platform-support-native-ui.py
