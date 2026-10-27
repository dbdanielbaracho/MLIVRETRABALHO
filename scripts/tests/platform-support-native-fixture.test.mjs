import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {readFileSync, mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
test('native fixture refuses non-CI, other repository, remote and non-disposable databases before connecting',()=>{
 const base={...process.env,CI:'true',GITHUB_REPOSITORY:'dbdanielbaracho/MLIVRETRABALHO',DATABASE_URL:'postgresql://fixture:DO_NOT_LOG_THIS_SECRET@127.0.0.1:1/mlivretrabalho_http'};
 for(const patch of [{CI:'false'},{GITHUB_REPOSITORY:'other/repository'},{DATABASE_URL:'postgresql://fixture:DO_NOT_LOG_THIS_SECRET@remote.example:1/mlivretrabalho_http'},{DATABASE_URL:'postgresql://fixture:DO_NOT_LOG_THIS_SECRET@127.0.0.1:1/production'}]){
  const r=spawnSync(process.execPath,['scripts/platform-support-native-api.cjs'],{env:{...base,...patch},encoding:'utf8',timeout:5000});assert.equal(r.status,1);assert.match(r.stderr,/NATIVE_API_FAIL privateDetailsHidden=true/);assert.ok(!(r.stdout+r.stderr).includes('DO_NOT_LOG_THIS_SECRET'));assert.ok(!r.stdout.includes('NATIVE_API_READY'));
 }
});

test('native emulator launcher refuses non-CI and another repository before SDK or device access',()=>{
 for(const patch of [{CI:'false',GITHUB_REPOSITORY:'dbdanielbaracho/MLIVRETRABALHO'},{CI:'true',GITHUB_REPOSITORY:'other/repository'}]){
  const r=spawnSync('bash',['scripts/run-platform-support-native-fixture.sh'],{env:{...process.env,...patch},encoding:'utf8',timeout:3000});assert.equal(r.status,1);assert.equal(r.stdout,'');assert.equal(r.stderr.trim(),'NATIVE_EMULATOR_REFUSED scope=ci-repository');
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
