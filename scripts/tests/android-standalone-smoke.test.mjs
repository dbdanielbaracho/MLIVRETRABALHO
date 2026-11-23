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
  'shell cmd package resolve-activity --brief -a android.intent.action.MAIN -c android.intent.category.LAUNCHER com.predibeacon.mlivretrabalho.pilot') if [ "$SMOKE_CASE" = noactivity ]; then echo 'No activity found'; else echo 'com.predibeacon.mlivretrabalho.pilot/.MainActivity'; fi ;;
  'shell am start -W -n com.predibeacon.mlivretrabalho.pilot/.MainActivity') if [ "$SMOKE_CASE" = launchfail ]; then echo 'Error: Activity not started' >&2; exit 7; fi; echo 'Status: ok' ;;
  'shell pidof '*) if [ "$SMOKE_CASE" = missingpid ]; then exit 1; fi; echo 1234 ;;
  'shell dumpsys activity activities') echo 'com.predibeacon.mlivretrabalho.pilot' ;;
  'shell dumpsys activity lastanr') echo 'fixture last ANR context' ;;
  'logcat -d') case "$SMOKE_CASE" in native) echo 'FATAL EXCEPTION: fixture' ;; react) echo 'ReactNativeJS: TypeError fixture' ;; metro) echo 'Unable to load script fixture' ;; launchfail) echo 'fixture ANR com.android.phone' ;; *) echo 'fixture Activity displayed' ;; esac ;;
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
test('failed ActivityManager launch retains original exit and captures logcat before emulator teardown',t=>{const f=fixture(t,'launchfail'),r=f.run();assert.equal(r.status,7);assert.doesNotMatch(r.stdout,/DEVICE_SMOKE_OK/);assert.match(readFileSync(join(f.diagnostics,'logcat.txt'),'utf8'),/ANR com.android.phone/);assert.match(f.manifest(),/app-pid_exit=0/);});
test('missing exported launcher fails closed before any launch',t=>{const f=fixture(t,'noactivity'),r=f.run();assert.notEqual(r.status,0);assert.match(r.stderr,/launcher_component_not_resolved/);assert.doesNotMatch(r.stdout,/DEVICE_SMOKE_OK/);});
test('bounded app launch wait accepts a late PID only after confirming the activity',t=>{const f=fixture(t,'latepid'),r=f.run();assert.equal(r.status,0,r.stderr);assert.match(r.stdout,/DEVICE_SMOKE_OK .*metro_required=false/);assert.match(readFileSync(join(f.dir,'logcat.txt'),'utf8'),/fixture Activity displayed/);});
test('missing app PID fails after bounded polling and never emits smoke success',t=>{const f=fixture(t,'missingpid'),r=f.run();assert.notEqual(r.status,0);assert.doesNotMatch(r.stdout,/DEVICE_SMOKE_OK/);assert.match(f.manifest(),/app-pid_exit=1/);});
test('diagnostics-only after upstream boot failure records unavailable ADB and never proves smoke',t=>{const f=fixture(t,'unavailable'),r=f.run(['--diagnostics-only']);assert.equal(r.status,0);assert.doesNotMatch(r.stdout,/DEVICE_SMOKE_OK/);assert.match(f.manifest(),/adb-devices_exit=1/);assert.match(f.manifest(),/logcat_exit=1/);});
test('later diagnostics fallback preserves evidence already captured before teardown',t=>{const f=fixture(t,'launchfail');assert.equal(f.run().status,7);const first=f.manifest(),log=readFileSync(join(f.diagnostics,'logcat.txt'),'utf8');assert.equal(f.run(['--diagnostics-only']).status,0);assert.equal(f.manifest(),first);assert.equal(readFileSync(join(f.diagnostics,'logcat.txt'),'utf8'),log);});
test('hung diagnostic command is bounded and its timeout is recorded without success claim',t=>{const f=fixture(t,'hung'),start=Date.now(),r=f.run(['--diagnostics-only']);assert.equal(r.status,0);assert.match(f.manifest(),/adb-devices_exit=124/);assert.ok(Date.now()-start<12000);assert.doesNotMatch(r.stdout,/DEVICE_SMOKE_OK/);});

test('canonical Android smoke uses software acceleration while keeping install and launch gates',()=>{
 const source=readFileSync(resolve('.github/workflows/standalone-pilot-apk.yml'),'utf8');
 assert.equal(source.includes('/dev/kvm'),false);
 assert.equal(source.includes('Verify KVM'),false);
 assert.match(source,/INPUT_DISABLE-LINUX-HW-ACCEL: 'true'/);
 assert.match(source,/INPUT_EMULATOR-BOOT-TIMEOUT: '1200'/);
 assert.match(source,/INPUT_EMULATOR-OPTIONS: .*swiftshader_indirect/);
 assert.ok(source.includes('run: node scripts/android-emulator-adb-readiness.cjs canonical'));
 assert.match(source,/Device smoke test — install and launch without Metro/);
 assert.ok(source.includes("steps.device_smoke.outcome == 'failure'"));
});

test('smoke launches via bounded ActivityManager and never uses Monkey',()=>{
 const source=readFileSync(script,'utf8');
 assert.match(source,/cmd package resolve-activity --brief -a android.intent.action.MAIN -c android.intent.category.LAUNCHER/);
 assert.match(source,/timeout 90s adb shell am start -W -n/);
 assert.doesNotMatch(source,/adb shell monkey/);
 assert.match(source,/test "\$launch_ready" = true/);
 assert.match(source,/adb shell dumpsys activity activities/);
});

test('launcher resolution script parses and has exactly one complete launch gate',()=>{
 const syntax=spawnSync('bash',['-n',script],{encoding:'utf8'});
 assert.equal(syntax.status,0,syntax.stderr);
 const source=readFileSync(script,'utf8');
 assert.equal((source.match(/launcher_component="/g)||[]).length,1);
 assert.equal((source.match(/DEVICE_SMOKE_OK package=/g)||[]).length,1);
 assert.equal((source.match(/timeout 90s adb shell am start -W -n/g)||[]).length,1);
 assert.match(source,/launcher_component="\$\(printf[\s\S]*?awk [\s\S]*?END \{if \(component != ""\) print component\}\)"/);
});
