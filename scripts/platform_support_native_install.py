"""Fail-closed evidence for a synthetic Android fixture installation timeout."""
import hashlib
import json
import subprocess
from pathlib import Path


def install_fixture(adb, apk_path, output_dir, timeout=120):
    """Install exactly once; retain the first timeout without retry or UI input."""
    try:
        return adb('install', str(apk_path), timeout=timeout)
    except subprocess.TimeoutExpired as error:
        artifact_dir = Path(output_dir)
        artifact_dir.mkdir(parents=True, exist_ok=True)
        # Collect local-only metadata. Do not probe an unresponsive emulator,
        # print ADB output or disclose any environment/session credentials.
        raw_output = error.output or b''
        if isinstance(raw_output, str):
            raw_output = raw_output.encode('utf-8', errors='replace')
        apk = Path(apk_path)
        evidence = {
            'failure': 'adb_install_timeout',
            'stage': 'device',
            'timeoutSeconds': timeout,
            'retry': False,
            'uiInputAttempted': False,
            'packageType': 'synthetic-support-fixture',
            'primaryFailurePreserved': True,
            'installMode': 'default',
            'capturedOutputBytes': len(raw_output),
            'capturedOutputSHA256': hashlib.sha256(raw_output).hexdigest(),
            'apkBytes': apk.stat().st_size if apk.is_file() else None,
        }
        (artifact_dir / 'native-install-timeout.json').write_text(
            json.dumps(evidence, sort_keys=True) + '\n', encoding='utf-8'
        )
        print('NATIVE_INSTALL_TIMEOUT ' + json.dumps(evidence, sort_keys=True), flush=True)
        raise
