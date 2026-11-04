import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {readFileSync, mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const {BOOT_UNLOCK_COMMAND,MAX_ATTEMPTS,UPSTREAM_RUNNER_SHA,installBoundedBootUnlockRetry,configureRunnerInputs,RUNNER_INPUTS} = require('../android-emulator-adb-readiness.cjs');
test('native fixture refuses non-CI, other repository, remote and non-disposable databases before connecting',()=>{
 const base={...process.env,CI:'true',GITHUB_REPOSITORY:'dbdanielbaracho/MLIVRETRABALHO',DATABASE_URL:'postgresql://fixture:DO_NOT_LOG_THIS_SECRET@127.0.0.1:1/mlivretrabalho_http'};
 for(const patch of [{CI:'false'},{GITHUB_REPOSITORY:'other/repository'},{DATABASE_URL:'postgresql://fixture:DO_NOT_LOG_THIS_SECRET@remote.example:1/mlivretrabalho_http'},{DATABASE_URL:'postgresql://fixture:DO_NOT_LOG_THIS_SECRET@127.0.0.1:1/production'}]){
  const r=spawnSync(process.execPath,['scripts/platform-support-native-api.cjs'],{env:{...base,...patch},encoding:'utf8',timeout:5000});assert.equal(r.status,1);assert.match(r.stderr,/NATIVE_API_FAIL privateDetailsHidden=true/);assert.ok(!(r.stdout+r.stderr).includes('DO_NOT_LOG_THIS_SECRET'));assert.ok(!r.stdout.includes('NATIVE_API_READY'));
 }
});

test('native emulator launcher reports named scope refusals before SDK or device access',()=>{
 const cases=[
  {patch:{CI:'false',GITHUB_REPOSITORY:'dbdanielbaracho/MLIVRETRABALHO'},diagnostic:'NATIVE_PREFLIGHT_FAIL check=ci_environment'},
  {patch:{CI:'true',GITHUB_REPOSITORY:'other/repository'},diagnostic:'NATIVE_PREFLIGHT_FAIL check=repository_scope'}
 ];
 for(const {patch,diagnostic} of cases){
  const r=spawnSync('bash',['scripts/run-platform-support-native-fixture.sh'],{env:{...process.env,...patch},encoding:'utf8',timeout:3000});assert.equal(r.status,1);assert.equal(r.stdout,'');assert.equal(r.stderr.trim(),diagnostic);
 }
});

test('UIAutomator dump failure retains exact output and fails closed',()=>{
 const dir=mkdtempSync(join(tmpdir(),'native-dump-'));
 const py=String.raw`import sys;sys.path.insert(0,'scripts');from platform_support_native_dump import record_dump_failure;record_dump_failure(sys.stdin.buffer.read(),'/data/local/tmp/unique.xml',sys.argv[1],255)`;
 const raw=Buffer.from('ERROR: UI hierarchy is empty\\n');
 const r=spawnSync('python3',['-c',py,dir],{input:raw});
 assert.equal(r.status,0);
 assert.deepEqual(readFileSync(join(dir,'native-hierarchy-dump-failure.txt')),raw);
 const meta=JSON.parse(readFileSync(join(dir,'native-hierarchy-dump-failure.json'),'utf8'));
 assert.equal(meta.returncode,255);assert.equal(meta.retry,false);assert.equal(meta.staleHierarchyRead,false);
 assert.equal(meta.outputSHA256,createHash('sha256').update(raw).digest('hex'));
});

test('font 130 native fixture records a second screen only after scrolling the submit control above Android navigation',()=>{
 const ui=readFileSync(new URL('../platform-support-native-ui.py',import.meta.url),'utf8');
 const helper=ui.slice(ui.indexOf('def scroll_fully_into_view('),ui.indexOf('def input_text('));
 assert.match(helper,/y>=APP_TOP and b<=APP_BOTTOM/);
 assert.match(helper,/swipe\(y<APP_TOP\)/);
 const stage=ui.slice(ui.indexOf("stage='large-font'"),ui.indexOf("settings','put','system','font_scale','1.0'",ui.indexOf("stage='large-font'")));
 assert.ok(stage.indexOf("screenshot('12-large-font')")<stage.indexOf("scroll_fully_into_view('Enviar à plataforma')"));
 assert.ok(stage.indexOf("scroll_fully_into_view('Enviar à plataforma')")<stage.indexOf("screenshot('12-large-font-submit-visible'"));
 assert.ok(!helper.includes("'input','tap'"),'visibility proof must not change native tap coordinates');
});

test('pre-install native failure preserves the first cause without a second UI/device probe',()=>{
 const ui=readFileSync(new URL('../platform-support-native-ui.py',import.meta.url),'utf8');
 const handler=ui.slice(ui.indexOf('except BaseException as error:'),ui.indexOf('finally:'));
 const deviceGuard=handler.indexOf("if stage=='device':");
 const screenshotProbe=handler.indexOf("screenshot('failure-'+stage,True)");
 const bareRaise=handler.indexOf("        raise",deviceGuard);
 assert.ok(deviceGuard>=0&&deviceGuard<screenshotProbe);
 assert.ok(bareRaise>deviceGuard&&bareRaise<screenshotProbe);
 assert.match(handler,/NATIVE_PRE_UI_FAILURE_NO_FOLLOWUP_PROBE/);
 assert.match(handler,/primaryFailurePreserved':True/);
});

test('native fixture uses the same real software-emulator action without a KVM precondition',()=>{
 const workflow=readFileSync('.github/workflows/standalone-pilot-apk.yml','utf8');
 const runner=readFileSync('scripts/run-platform-support-native-fixture.sh','utf8');
 const nativeJob=workflow.slice(workflow.indexOf('  native-support-fixture:'),workflow.indexOf('      - name: Close local fixture and verify cleanup'));
 const namespacePrep=nativeJob.slice(nativeJob.indexOf('- name: Prepare action-owned empty AVD namespace'),nativeJob.indexOf('- name: Require a fresh isolated AVD namespace and four host CPUs'));
 const namespaceCheck=nativeJob.slice(nativeJob.indexOf('- name: Require a fresh isolated AVD namespace and four host CPUs'),nativeJob.indexOf('- name: Render native support states and recovery with real local sessions'));
 assert.ok(namespacePrep.includes('avd_root="$HOME/.android/avd"'));
 assert.ok(namespacePrep.includes('test -z "$(find "$avd_root" -mindepth 1 -maxdepth 1 -print -quit)"'));
 assert.ok(namespaceCheck.includes('test "$avd_root" = "$HOME/.android/avd"'));
 assert.equal(nativeJob.includes('RUNNER_TEMP/mlivre-support-avd'),false);
 assert.ok(runner.includes('${HOME:?HOME must be set}/.android/avd'));
 assert.equal(workflow.includes('/dev/kvm'),false);
 const canonicalJob=workflow.slice(workflow.indexOf('  build-standalone-pilot-apk:'),workflow.indexOf('  native-support-fixture:'));
 const adapter=readFileSync('scripts/android-emulator-adb-readiness.cjs','utf8');
 assert.equal(workflow.includes('uses: reactivecircus/android-emulator-runner@v2'),false);
 assert.equal(workflow.includes('/dev/kvm'),false);
 assert.ok(canonicalJob.includes('ref: a421e43855164a8197daf9d8d40fe71c6996bb0d'));
 assert.ok(nativeJob.includes('ref: a421e43855164a8197daf9d8d40fe71c6996bb0d'));
 assert.ok(canonicalJob.includes('run: node scripts/android-emulator-adb-readiness.cjs canonical'));
 assert.ok(nativeJob.includes('run: node scripts/android-emulator-adb-readiness.cjs native'));
 assert.ok(canonicalJob.includes("INPUT_DISABLE-LINUX-HW-ACCEL: 'true'"));
 assert.ok(nativeJob.includes("INPUT_DISABLE-LINUX-HW-ACCEL: 'true'"));
 assert.match(canonicalJob,/INPUT_EMULATOR-OPTIONS: .*swiftshader_indirect/);
 assert.match(nativeJob,/INPUT_EMULATOR-OPTIONS: .*swiftshader_indirect/);
 assert.match(adapter,/const UPSTREAM_RUNNER_SHA = 'a421e43855164a8197daf9d8d40fe71c6996bb0d'/);
 assert.match(adapter,/MAX_ATTEMPTS = 6/);
 assert.match(adapter,/Failure calling service input: Broken pipe/);
 assert.ok(adapter.includes("path.join(runnerRoot, 'lib', 'main.js')"));
 assert.ok(adapter.includes('installBoundedBootUnlockRetry(execModule)'));
 assert.ok(nativeJob.includes("INPUT_SCRIPT: 'bash scripts/run-platform-support-native-fixture.sh'"));
 assert.match(nativeJob,/INPUT_DISABLE-LINUX-HW-ACCEL: 'true'/);
 assert.match(nativeJob,/INPUT_EMULATOR-OPTIONS: .*swiftshader_indirect/);

 assert.doesNotMatch(nativeJob,/NATIVE_SOFTWARE_EMULATOR_MISSING/);
 assert.doesNotMatch(runner,/-accel off -version/);
 assert.match(runner,/Pkg\[.]Revision/);
 assert.equal(runner.includes('/dev/kvm'),false);
 assert.equal(runner.includes('-accel on'),false);
 assert.doesNotMatch(runner,/avdmanager.*create avd/);
 assert.doesNotMatch(runner,/emulator" -port 5554/);
 assert.ok(runner.includes('device_rows="$(awk'));
 assert.ok(runner.includes('if test "$device_rows" != emulator-5554'));
 assert.match(runner,/acceleration=software/);
});


test('pinned runner receives literal hyphenated action input names',()=>{
 const keys=[...Object.keys(RUNNER_INPUTS),'SCRIPT'].map(name=>`INPUT_${name.replaceAll('_','-')}`);
 const previous=new Map(keys.map(key=>[key,process.env[key]]));
 const underscoreApi=process.env.INPUT_API_LEVEL;
 try{
  for(const [name,value] of Object.entries({...RUNNER_INPUTS,SCRIPT:'bash scripts/run-platform-support-native-fixture.sh'})){
   process.env[`INPUT_${name.replaceAll('_','-')}`]=value;
  }
  assert.doesNotThrow(()=>configureRunnerInputs('bash scripts/run-platform-support-native-fixture.sh'));
  delete process.env['INPUT_API-LEVEL'];
  process.env.INPUT_API_LEVEL='35';
  assert.throws(()=>configureRunnerInputs('bash scripts/run-platform-support-native-fixture.sh'),/API_LEVEL/);
 }finally{
  for(const [key,value] of previous){if(value===undefined)delete process.env[key];else process.env[key]=value;}
  if(underscoreApi===undefined)delete process.env.INPUT_API_LEVEL;else process.env.INPUT_API_LEVEL=underscoreApi;
 }
});

test('boot unlock readiness retries only the observed transient Broken pipe and then resumes the real runner',async()=>{
 let calls=0;const sleeps=[],messages=[];
 const module={exec:async(command,args,options)=>{
  calls++;assert.equal(command,'timeout');assert.deepEqual(args,['15s','adb','-s','emulator-5554','shell','input','keyevent','82']);
  if(calls<3){options.listeners.stderr(Buffer.from('cmd: Failure calling service input: Broken pipe (32)\\n'));return 224;}
  return 0;
 }};
 installBoundedBootUnlockRetry(module,{sleep:async ms=>sleeps.push(ms),log:line=>messages.push(line)});
 assert.equal(await module.exec(BOOT_UNLOCK_COMMAND),0);
 assert.equal(calls,3);assert.deepEqual(sleeps,[2000,2000]);assert.equal(messages.length,2);
});
test('boot unlock retries one exact-command timeout and resumes the real runner when the second attempt succeeds',async()=>{
 let calls=0;const sleeps=[],messages=[];
 const module={exec:async(command,args)=>{
  calls++;assert.equal(command,'timeout');assert.deepEqual(args,['15s','adb','-s','emulator-5554','shell','input','keyevent','82']);
  if(calls===1)return 124;
  return 0;
 }};
 installBoundedBootUnlockRetry(module,{sleep:async ms=>sleeps.push(ms),log:line=>messages.push(line)});
 assert.equal(await module.exec(BOOT_UNLOCK_COMMAND),0);
 assert.equal(calls,2);assert.deepEqual(sleeps,[2000]);assert.match(messages[0],/cause=command_timeout/);
});
test('repeated boot unlock timeouts fail closed after one bounded retry',async()=>{
 let calls=0;const sleeps=[];
 const module={exec:async()=>{calls++;return 124;}};
 installBoundedBootUnlockRetry(module,{sleep:async ms=>sleeps.push(ms),log:()=>{}});
 await assert.rejects(module.exec(BOOT_UNLOCK_COMMAND),/timed out 2 times; bounded readiness retry exhausted/);
 assert.equal(calls,2);assert.deepEqual(sleeps,[2000]);
});
test('timeout readiness retry never wraps unrelated adb commands',async()=>{
 let calls=0;
 const module={exec:async()=>{calls++;return 124;}};
 installBoundedBootUnlockRetry(module,{sleep:async()=>assert.fail('unrelated command must not retry')});
 assert.equal(await module.exec('adb -s emulator-5554 shell getprop sys.boot_completed'),124);
 assert.equal(calls,1);
});

test('boot unlock permanent failures and exhausted retries stay fail-closed',async()=>{
 let calls=0;
 const permanent={exec:async(_command,_args,options)=>{calls++;options.listeners.stderr(Buffer.from('Failure calling service input: SecurityException\\n'));return 224;}};
 installBoundedBootUnlockRetry(permanent,{sleep:async()=>assert.fail('permanent error must not retry')});
 await assert.rejects(permanent.exec(BOOT_UNLOCK_COMMAND),/readiness retry does not apply/);assert.equal(calls,1);
 calls=0;let sleeps=0;
 const broken={exec:async(_command,_args,options)=>{calls++;options.listeners.stderr(Buffer.from('Failure calling service input: Broken pipe (32)\\n'));return 224;}};
 installBoundedBootUnlockRetry(broken,{sleep:async()=>{sleeps++;},log:()=>{}});
 await assert.rejects(broken.exec(BOOT_UNLOCK_COMMAND),new RegExp('stayed unavailable after '+MAX_ATTEMPTS+' bounded attempts'));
 assert.equal(calls,MAX_ATTEMPTS);assert.equal(sleeps,MAX_ATTEMPTS-1);
});
