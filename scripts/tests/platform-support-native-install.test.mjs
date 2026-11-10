import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';

test('synthetic fixture install timeout is single-attempt, evidenced, and rethrown', () => {
  const code = String.raw`
import json,subprocess,sys,tempfile,pathlib
sys.path.insert(0,'scripts')
from platform_support_native_install import install_fixture
calls=[]
with tempfile.TemporaryDirectory() as folder:
    def stalled(*args,timeout):
        calls.append([list(args),timeout])
        raise subprocess.TimeoutExpired(['adb','install'],timeout)
    try:
        install_fixture(stalled,'fixture.apk',folder,timeout=120)
        raise AssertionError('timeout must propagate')
    except subprocess.TimeoutExpired:
        pass
    evidence=json.loads((pathlib.Path(folder)/'native-install-timeout.json').read_text())
    assert len(calls)==1 and calls[0]==[['install','fixture.apk'],120]
    assert evidence['retry'] is False
    assert evidence['primaryFailurePreserved'] is True
    assert evidence['uiInputAttempted'] is False
    assert evidence['failure']=='adb_install_timeout'
    print('NATIVE_INSTALL_EVIDENCE_TEST_PASS')
`;
  const result=spawnSync('python3',['-c',code],{encoding:'utf8',timeout:5000});
  assert.equal(result.status,0,result.stderr||result.stdout);
  assert.match(result.stdout,/NATIVE_INSTALL_TIMEOUT/);
  assert.match(result.stdout,/NATIVE_INSTALL_EVIDENCE_TEST_PASS/);
});

test('successful synthetic fixture installation emits no failure evidence', () => {
  const code = String.raw`
import sys,tempfile,pathlib
sys.path.insert(0,'scripts')
from platform_support_native_install import install_fixture
with tempfile.TemporaryDirectory() as folder:
    calls=[]
    def healthy(*args,timeout):
        calls.append((args,timeout))
        return 'Success'
    assert install_fixture(healthy,'fixture.apk',folder)=='Success'
    assert calls==[(('install','fixture.apk'),120)]
    assert not (pathlib.Path(folder)/'native-install-timeout.json').exists()
    print('NATIVE_INSTALL_SUCCESS_TEST_PASS')
`;
  const result=spawnSync('python3',['-c',code],{encoding:'utf8',timeout:5000});
  assert.equal(result.status,0,result.stderr||result.stdout);
  assert.match(result.stdout,/NATIVE_INSTALL_SUCCESS_TEST_PASS/);
});
