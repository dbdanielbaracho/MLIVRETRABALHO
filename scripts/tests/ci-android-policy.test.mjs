import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdtempSync,writeFileSync,mkdirSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
const {classify,publication,changedPaths}=createRequire(import.meta.url)('../ci-android-policy.cjs');
test('Android applicability is conservative for every build boundary and new unknown input',()=>{
 for(const p of ['apps/mobile/app/index.tsx','pnpm-lock.yaml','.github/workflows/ci.yml','apps/api/package.json','packages/shared/index.ts','scripts/new-build-helper.sh','turbo.json','scripts/ci-android-policy.cjs'])assert.equal(classify([p]).required,true,p);
 for(const p of ['docs/requirements/note.md','README.md','apps/api/src/jobs.controller.ts','apps/web/app/page.tsx','packages/db/migrations/0099_test.sql'])assert.equal(classify([p]).required,false,p);
 assert.equal(classify(['docs/note.md','apps/mobile/lib/session.ts']).required,true);
 for(const p of [[],['../outside'],['/absolute'],['docs/a\nrequired=false']])assert.throws(()=>classify(p));
});
test('publication refuses failed, cancelled, missing or skipped mandatory jobs; N/A requires explicit successful classification',()=>{
 const state=required=>({foundation:{result:'success'},android_scope:{result:'success',outputs:{required}},android:{result:required==='true'?'success':'skipped'}});
 assert.equal(publication(state('true')).androidRequired,true);assert.equal(publication(state('false')).androidRequired,false);
 for(const result of ['failure','cancelled','skipped',undefined]){assert.throws(()=>publication({...state('true'),foundation:{result}}));assert.throws(()=>publication({...state('true'),android:{result}}));assert.throws(()=>publication({...state('false'),android_scope:{result,outputs:{required:'false'}}}));}
 for(const required of ['',undefined,'unknown'])assert.throws(()=>publication(state(required)));
 assert.throws(()=>publication({...state('false'),android:{result:'success'}}));
});
test('real Git graph and NUL diff include removed mobile paths in renames and bind classification to actual checkout',t=>{
 const dir=mkdtempSync(join(tmpdir(),'mlivre-policy-'));t.after(()=>rmSync(dir,{recursive:true,force:true}));
 const git=args=>execFileSync('git',args,{cwd:dir,encoding:'utf8'});
 git(['init','-q']);git(['config','user.email','fixture@example.test']);git(['config','user.name','Policy fixture']);
 mkdirSync(join(dir,'apps/mobile'),{recursive:true});writeFileSync(join(dir,'apps/mobile/fixture.ts'),'export const fixture=true;\n');git(['add','.']);git(['commit','-qm','fixture base']);const before=git(['rev-parse','HEAD']).trim();
 mkdirSync(join(dir,'docs'));git(['mv','apps/mobile/fixture.ts','docs/fixture.md']);git(['commit','-qm','fixture rename']);const after=git(['rev-parse','HEAD']).trim();
 const env={GITHUB_ACTIONS:'true',GITHUB_REPOSITORY:'dbdanielbaracho/MLIVRETRABALHO',GITHUB_SHA:after,GITHUB_EVENT_NAME:'push'};
 const receipt=changedPaths(env,{before,after},git);assert.equal(receipt.required,true);assert.ok(receipt.paths.includes('apps/mobile/fixture.ts'));assert.ok(receipt.paths.includes('docs/fixture.md'));
 assert.throws(()=>changedPaths({...env,GITHUB_SHA:before},{before,after},git));assert.throws(()=>changedPaths(env,{before:'0'.repeat(40),after},git));
 const pr=changedPaths({...env,GITHUB_EVENT_NAME:'pull_request'},{pull_request:{base:{sha:before},head:{sha:after}}},git);assert.equal(pr.checkout,after);assert.equal(pr.required,true);
});
