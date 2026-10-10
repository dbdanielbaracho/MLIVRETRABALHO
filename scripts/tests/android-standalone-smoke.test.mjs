import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,existsSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
const script=resolve('scripts/android-standalone-smoke.sh');
function fixture(t,mode='healthy'){
 const dir=mkdtempSync(join(tmpdir(),'mlivre-smoke-test-')),bin=join(dir,'bin'),diagnostics=join(dir,'diagnostics');mkdirSync(bin);mkdirSync(join(dir,'artifacts/android-pilot'),{recursive:true});writeFileSync(join(dir,'artifacts/android-pilot/MLivreTrabalho.apk'),'unit-fixture-only');
 writeFileSync(join(bin,'sleep'),'#!/usr/bin/env bash\nexit 0\n',{mode:0o755});
 writeFileSync(join(bin,'adb'),`#!/usr/bin/env bash
if [ "$SMOKE_CASE" = unavailable ]; then echo 'fixture adb unavailable' >&2; exit 1; fi
case "$*" in
  'devices -l') if [ "$SMOKE_CASE" = hung ]; then /bin/sleep 7; fi; echo 'fixture-emulator device' ;;
  'shell getprop sys.boot_completed') echo 1 ;;
  'shell service check package') echo 'Service package: found' ;;
  'shell cmd package list packages') echo 'package:com.predibeacon.mlivretrabalho.pilot' ;;
  'shell settings get global device_provisioned') echo 1 ;;
  install*) echo Success ;;
  'shell monkey '*) if [ "$SMOKE_CASE" = monkey ]; then echo 'fixture ANR com.android.phone before launch' >&2; exit 7; fi ;;
  'shell pidof '*) if [ "$SMOKE_CASE" = missingpid ]; then exit 1; fi; echo 1234 ;;
  'shell dumpsys activity activities') echo 'com.predibeacon.mlivretrabalho.pilot' ;;
  'shell dumpsys activity lastanr') echo 'fixture last ANR context' ;;
  'logcat -d') case "$SMOKE_CASE" in native) echo 'FATAL EXCEPTION: fixture' ;; react) echo 'ReactNativeJS: TypeError fixture' ;; metro) echo 'Unable to load script fixture' ;; monkey) echo 'fixture ANR com.android.phone' ;; *) echo 'fixture Activity displayed' ;; esac ;;
esac
exit 0
`,{mode:0o755});
 const env={...process.env,PATH:bin+':'+process.env.PATH,GITHUB_WORKSPACE:dir,GITHUB_SHA:'unit-fixture-sha',GITHUB_RUN_ID:'unit-fixture-run',GITHUB_RUN_ATTEMPT:'1',SMOKE_CASE:mode,MLIVRE_SMOKE_DIAGNOSTICS_DIR:diagnostics,MLIVRE_SMOKE_LOGCAT_PATH:join(dir,'logcat.txt'),MLIVRE_SMOKE_INSTALL_LOG:join(dir,'install.txt')};
 t.after(()=>rmSync(dir,{recursive:true,force:true}));
 return {dir,diagnostics,run:(args=[])=>spawnSync('bash',[script,...args],{env,encoding:'utf8',timeout:30000}),manifest:()=>readFileSync(join(diagnostics,'manifest.txt'),'utf8')};
}
test('healthy fixture emits gate success only after installation, PID, activity and log checks',t=>{const f=fixture(t),r=f.run();assert.equal(r.status,0,r.stderr);assert.match(r.stdout,/DEVICE_SMOKE_OK .*metro_required=false/);assert.equal(existsSync(f.diagnostics),false);assert.match(readFileSync(join(f.dir,'logcat.txt'),'utf8'),/fixture Activity displayed/);});
test('native fatal log fails and captures diagnostics instead of emitting success',t=>{const f=fixture(t,'native'),r=f.run();assert.notEqual(r.status,0);assert.doesNotMatch(r.stdout,/DEVICE_SMOKE_OK/);assert.match(readFileSync(join(f.diagnostics,'logcat.txt'),'utf8'),/FATAL EXCEPTION/);assert.match(f.manifest(),/sha=unit-fixture-sha/);});
test('React Native error and missing Metro bundle both fail the gate',t=>{for(const mode of ['react','metro']){const f=fixture(t,mode),r=f.run();assert.notEqual(r.status,0);assert.doesNotMatch(r.stdout,/DEVICE_SMOKE_OK/);assert.equal(existsSync(join(f.diagnostics,'logcat.txt')),true);}});
test('failed launch retains original exit and captures logcat before emulator teardown',t=>{const f=fixture(t,'monkey'),r=f.run();assert.equal(r.status,7);assert.doesNotMatch(r.stdout,/DEVICE_SMOKE_OK/);assert.match(readFileSync(join(f.diagnostics,'logcat.txt'),'utf8'),/ANR com.android.phone/);assert.match(f.manifest(),/app-pid_exit=0/);});
test('missing app PID fails even though the pipe also contains tee',t=>{const f=fixture(t,'missingpid'),r=f.run();assert.notEqual(r.status,0);assert.doesNotMatch(r.stdout,/DEVICE_SMOKE_OK/);assert.match(f.manifest(),/app-pid_exit=1/);});
test('diagnostics-only after upstream boot failure records unavailable ADB and never proves smoke',t=>{const f=fixture(t,'unavailable'),r=f.run(['--diagnostics-only']);assert.equal(r.status,0);assert.doesNotMatch(r.stdout,/DEVICE_SMOKE_OK/);assert.match(f.manifest(),/adb-devices_exit=1/);assert.match(f.manifest(),/logcat_exit=1/);});
test('later diagnostics fallback preserves evidence already captured before teardown',t=>{const f=fixture(t,'monkey');assert.equal(f.run().status,7);const first=f.manifest(),log=readFileSync(join(f.diagnostics,'logcat.txt'),'utf8');assert.equal(f.run(['--diagnostics-only']).status,0);assert.equal(f.manifest(),first);assert.equal(readFileSync(join(f.diagnostics,'logcat.txt'),'utf8'),log);});
test('hung diagnostic command is bounded and its timeout is recorded without success claim',t=>{const f=fixture(t,'hung'),start=Date.now(),r=f.run(['--diagnostics-only']);assert.equal(r.status,0);assert.match(f.manifest(),/adb-devices_exit=124/);assert.ok(Date.now()-start<12000);assert.doesNotMatch(r.stdout,/DEVICE_SMOKE_OK/);});
