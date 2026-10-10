#!/usr/bin/env bash
set -euo pipefail

# Diagnostics never convert a failed smoke to success. Capture before the runner
# tears down its emulator; the workflow also invokes this mode after early boot failure.
diagnostics_dir="${MLIVRE_SMOKE_DIAGNOSTICS_DIR:-/tmp/mlivretrabalho-smoke-diagnostics}"
smoke_logcat_path="${MLIVRE_SMOKE_LOGCAT_PATH:-/tmp/mlivretrabalho-logcat.txt}"
smoke_install_log="${MLIVRE_SMOKE_INSTALL_LOG:-/tmp/mlivretrabalho-install.txt}"
collect_diagnostics() (
  set +e
  # Preserve evidence captured while the emulator was alive; the later fallback
  # must not replace it with an empty log after emulator teardown.
  [ ! -f "$diagnostics_dir/manifest.txt" ] || exit 0
  mkdir -p "$diagnostics_dir" || exit 1
  printf 'sha=%s\nrun_id=%s\nattempt=%s\n' "${GITHUB_SHA:-unknown}" "${GITHUB_RUN_ID:-unknown}" "${GITHUB_RUN_ATTEMPT:-unknown}" > "$diagnostics_dir/manifest.txt"
  capture() {
    local label="$1"; shift
    timeout 5s "$@" > "$diagnostics_dir/$label.txt" 2>&1
    local command_status=$?
    printf '%s_exit=%s\n' "$label" "$command_status" >> "$diagnostics_dir/manifest.txt"
    return 0
  }
  capture adb-devices adb devices -l
  capture logcat adb logcat -d
  capture boot-completed adb shell getprop sys.boot_completed
  capture app-pid adb shell pidof com.predibeacon.mlivretrabalho.pilot
  capture activities adb shell dumpsys activity activities
  capture last-anr adb shell dumpsys activity lastanr
  for source in "$smoke_logcat_path" "$smoke_install_log"; do
    if [ -f "$source" ]; then cp "$source" "$diagnostics_dir/$(basename "$source")"; fi
  done
  exit 0
)

if [ "${1:-}" = "--diagnostics-only" ]; then
  collect_diagnostics
  exit 0
fi
if [ "$#" -ne 0 ]; then
  echo "Unknown smoke argument" >&2
  exit 2
fi
trap 'smoke_exit_status=$?; if [ "$smoke_exit_status" -ne 0 ]; then collect_diagnostics || true; fi; exit "$smoke_exit_status"' EXIT

# The runner action already waits for Android to boot. Give Android
# services a short settling period, then reconnect ADB before install.
sleep 10
adb kill-server || true
adb start-server
adb wait-for-device
adb shell getprop sys.boot_completed
test "$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = "1"
# Android can report boot_completed before PackageManager is ready,
# especially after restarting ADB on a cold hosted emulator. Wait for
# the package service before attempting APK installation.
for i in $(seq 1 60); do if timeout 10s adb shell service check package 2>/dev/null | grep -Fq "found" && timeout 10s adb shell cmd package list packages >/dev/null 2>&1 && timeout 10s adb shell settings get global device_provisioned >/dev/null 2>&1; then break; fi; sleep 2; done
timeout 10s adb shell service check package 2>/dev/null | grep -Fq "found"
timeout 10s adb shell cmd package list packages >/dev/null
timeout 10s adb shell settings get global device_provisioned >/dev/null
adb logcat -c
test -f "$GITHUB_WORKSPACE/artifacts/android-pilot/MLivreTrabalho.apk"
# Some hosted emulators expose PackageManager before the backing
# storage service is ready. Retry the exact install for at most one
# minute; persistent app/package failures still fail with full output.
install_log="$smoke_install_log"; install_ok=false; for i in $(seq 1 6); do if adb install -r "$GITHUB_WORKSPACE/artifacts/android-pilot/MLivreTrabalho.apk" >"$install_log" 2>&1; then install_ok=true; break; fi; cat "$install_log"; sleep 10; done; cat "$install_log"; test "$install_ok" = true
adb shell am force-stop "com.predibeacon.mlivretrabalho.pilot"
adb shell monkey -p "com.predibeacon.mlivretrabalho.pilot" -c android.intent.category.LAUNCHER 1
sleep 12
adb shell pidof "com.predibeacon.mlivretrabalho.pilot" | tee /tmp/app.pid
test -s /tmp/app.pid
adb shell dumpsys activity activities | grep -F "com.predibeacon.mlivretrabalho.pilot"
adb logcat -d > "$smoke_logcat_path"
if grep -E "FATAL EXCEPTION|AndroidRuntime.*FATAL|ReactNativeJS:.*(Error|TypeError|ReferenceError)|Unable to load script" "$smoke_logcat_path"; then
  echo "DEVICE_SMOKE_FAILED fatal runtime output" >&2
  exit 1
fi
echo "DEVICE_SMOKE_OK package=com.predibeacon.mlivretrabalho.pilot metro_required=false"
