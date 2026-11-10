"""Fail-closed evidence for a synthetic Android fixture installation timeout."""
import json
import subprocess
from pathlib import Path


def install_fixture(adb, apk_path, output_dir, timeout=120):
    """Install exactly once; retain the first timeout without retry or UI input."""
    try:
        return adb('install', str(apk_path), timeout=timeout)
    except subprocess.TimeoutExpired:
        artifact_dir = Path(output_dir)
        artifact_dir.mkdir(parents=True, exist_ok=True)
        evidence = {
            'failure': 'adb_install_timeout',
            'stage': 'device',
            'timeoutSeconds': timeout,
            'retry': False,
            'uiInputAttempted': False,
            'packageType': 'synthetic-support-fixture',
            'primaryFailurePreserved': True,
        }
        (artifact_dir / 'native-install-timeout.json').write_text(
            json.dumps(evidence, sort_keys=True) + '\n', encoding='utf-8'
        )
        print('NATIVE_INSTALL_TIMEOUT ' + json.dumps(evidence, sort_keys=True), flush=True)
        raise
