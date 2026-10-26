import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
test('native fixture refuses non-CI, other repository, remote and non-disposable databases before connecting',()=>{
 const base={...process.env,CI:'true',GITHUB_REPOSITORY:'dbdanielbaracho/MLIVRETRABALHO',DATABASE_URL:'postgresql://fixture:DO_NOT_LOG_THIS_SECRET@127.0.0.1:1/mlivretrabalho_http'};
 for(const patch of [{CI:'false'},{GITHUB_REPOSITORY:'other/repository'},{DATABASE_URL:'postgresql://fixture:DO_NOT_LOG_THIS_SECRET@remote.example:1/mlivretrabalho_http'},{DATABASE_URL:'postgresql://fixture:DO_NOT_LOG_THIS_SECRET@127.0.0.1:1/production'}]){
  const r=spawnSync(process.execPath,['scripts/platform-support-native-api.cjs'],{env:{...base,...patch},encoding:'utf8',timeout:5000});assert.equal(r.status,1);assert.match(r.stderr,/NATIVE_API_FAIL privateDetailsHidden=true/);assert.ok(!(r.stdout+r.stderr).includes('DO_NOT_LOG_THIS_SECRET'));assert.ok(!r.stdout.includes('NATIVE_API_READY'));
 }
});
