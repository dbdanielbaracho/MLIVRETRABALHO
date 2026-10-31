import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {createHash} from 'node:crypto';
test('native fixture refuses non-CI, other repository, remote and non-disposable databases before connecting',()=>{
 const base={...process.env,CI:'true',GITHUB_REPOSITORY:'dbdanielbaracho/MLIVRETRABALHO',DATABASE_URL:'postgresql://fixture:DO_NOT_LOG_THIS_SECRET@127.0.0.1:1/mlivretrabalho_http'};
 for(const patch of [{CI:'false'},{GITHUB_REPOSITORY:'other/repository'},{DATABASE_URL:'postgresql://fixture:DO_NOT_LOG_THIS_SECRET@remote.example:1/mlivretrabalho_http'},{DATABASE_URL:'postgresql://fixture:DO_NOT_LOG_THIS_SECRET@127.0.0.1:1/production'}]){
  const r=spawnSync(process.execPath,['scripts/platform-support-native-api.cjs'],{env:{...base,...patch},encoding:'utf8',timeout:5000});assert.equal(r.status,1);assert.match(r.stderr,/NATIVE_API_FAIL privateDetailsHidden=true/);assert.ok(!(r.stdout+r.stderr).includes('DO_NOT_LOG_THIS_SECRET'));assert.ok(!r.stdout.includes('NATIVE_API_READY'));
 }
});

test('native emulator uses software acceleration when KVM is unavailable without changing host permissions',()=>{
 const source=readFileSync('scripts/run-platform-support-native-fixture.sh','utf8');
 assert.match(source,/emulator_acceleration=off/);
 assert.match(source,/NATIVE_EMULATOR_ACCELERATION software_kvm=unavailable/);
 assert.match(source,/ -accel "\$emulator_acceleration"/);
 assert.match(source,/for attempt in \$\(seq 1 450\)/);
 assert.doesNotMatch(source,/kvm_device_missing|kvm_device_not_readable|kvm_device_not_writable/);
 assert.doesNotMatch(source,/sudo .*kvm|chmod .*kvm/i);
});

test('native launcher selects its available acceleration mode before starting the emulator',t=>{
 const root=mkdtempSync(join(tmpdir(),'mlivre-native-accel-')),sdk=join(root,'sdk'),avd=join(root,'avd'),bin=join(root,'bin');
 for(const dir of [join(sdk,'emulator'),join(sdk,'platform-tools'),join(sdk,'cmdline-tools/latest/bin'),join(sdk,'system-images/android-35/default/x86_64'),avd,bin])mkdirSync(dir,{recursive:true});
 const argsPath=join(root,'emulator-args.txt');
 writeFileSync(join(sdk,'emulator/source.properties'),'Pkg.Revision=37.2.12\n');
 writeFileSync(join(sdk,'system-images/android-35/default/x86_64/source.properties'),'Pkg.Revision=1\n');
 writeFileSync(join(sdk,'platform-tools/adb'),'#!/usr/bin/env bash\nif [ "$1" = devices ]; then echo "List of devices attached"; fi\nexit 0\n',{mode:0o755});
 writeFileSync(join(sdk,'cmdline-tools/latest/bin/avdmanager'),'#!/usr/bin/env bash\nmkdir -p "$ANDROID_AVD_HOME/platform-support-fixture.avd"\nprintf "hw.cpu.ncore=2\\n" > "$ANDROID_AVD_HOME/platform-support-fixture.avd/config.ini"\n',{mode:0o755});
 writeFileSync(join(sdk,'emulator/emulator'),'#!/usr/bin/env bash\nprintf "%s\\n" "$*" > "$NATIVE_TEST_EMULATOR_ARGS"\nexit 0\n',{mode:0o755});
 writeFileSync(join(bin,'nproc'),'#!/usr/bin/env bash\necho 4\n',{mode:0o755});
 t.after(()=>rmSync(root,{recursive:true,force:true}));
 const r=spawnSync('bash',[resolve('scripts/run-platform-support-native-fixture.sh')],{cwd:root,env:{...process.env,PATH:bin+':'+process.env.PATH,CI:'true',GITHUB_REPOSITORY:'dbdanielbaracho/MLIVRETRABALHO',ANDROID_HOME:sdk,ANDROID_AVD_HOME:avd,NATIVE_TEST_EMULATOR_ARGS:argsPath},encoding:'utf8',timeout:10000});
 assert.notEqual(r.status,0);assert.match(r.stdout,/NATIVE_PREFLIGHT_PASS .* acceleration=(on|off)/);assert.match(readFileSync(argsPath,'utf8'),/ -accel (on|off) /);assert.doesNotMatch(r.stdout,/NATIVE_EMULATOR_BOOT_READ_ONLY_PASS|DEVICE_SMOKE_OK/);
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
