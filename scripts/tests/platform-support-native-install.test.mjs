import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';

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

test('timeout evidence reports only local APK size and output digest, never captured private output', () => {
  const code=String.raw`
import hashlib,json,subprocess,sys,tempfile,pathlib
sys.path.insert(0,'scripts')
from platform_support_native_install import install_fixture
secret=b'PRIVATE_SESSION_TOKEN_DO_NOT_LOG'
with tempfile.TemporaryDirectory() as folder:
    apk=pathlib.Path(folder)/'SupportFixture.apk'
    apk.write_bytes(b'synthetic-apk-test-bytes')
    calls=[]
    def stalled(*args,timeout):
        calls.append((args,timeout))
        raise subprocess.TimeoutExpired(['adb','install'],timeout,output=secret)
    try:
        install_fixture(stalled,apk,folder)
        raise AssertionError('timeout must propagate')
    except subprocess.TimeoutExpired:
        pass
    assert calls==[(('install',str(apk)),120)]
    contents=(pathlib.Path(folder)/'native-install-timeout.json').read_text()
    evidence=json.loads(contents)
    assert evidence['apkBytes']==len(b'synthetic-apk-test-bytes')
    assert evidence['installMode']=='default'
    assert evidence['capturedOutputBytes']==len(secret)
    assert evidence['capturedOutputSHA256']==hashlib.sha256(secret).hexdigest()
    assert evidence['retry'] is False and evidence['uiInputAttempted'] is False
    assert evidence['primaryFailurePreserved'] is True
    assert secret.decode() not in contents
    print('NATIVE_INSTALL_SANITIZED_EVIDENCE_PASS')
`;
  const result=spawnSync('python3',['-c',code],{encoding:'utf8',timeout:5000});
  assert.equal(result.status,0,result.stderr||result.stdout);
  assert.doesNotMatch(result.stdout,/PRIVATE_SESSION_TOKEN_DO_NOT_LOG/);
  assert.match(result.stdout,/NATIVE_INSTALL_SANITIZED_EVIDENCE_PASS/);
});


test('software-only native journey permits one bounded 300-second fixture install without retries', () => {
  const ui=readFileSync(new URL('../platform-support-native-ui.py',import.meta.url),'utf8');
  assert.match(ui,/install_fixture\(adb, OUT\/'SupportFixture\.apk', OUT, timeout=300\)/);
  const installer=readFileSync(new URL('../platform_support_native_install.py',import.meta.url),'utf8');
  assert.match(installer,/return adb\('install', str\(apk_path\), timeout=timeout\)/);
  assert.doesNotMatch(installer,/while\s+True|for\s+attempt/);
});
