'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {execFileSync}=require('node:child_process');
function classify(paths){
 assert.ok(Array.isArray(paths)&&paths.length>0&&paths.length<=50000,'complete_nonempty_diff_required');
 for(const p of paths)assert.ok(typeof p==='string'&&p.length>0&&p.length<4096&&!/[\x00-\x1f\x7f]/.test(p)&&!p.startsWith('/')&&!p.split('/').some(x=>x==='..'||x==='.'),'safe_git_path_required');
 const reasons=paths.filter(p=>{
  if(/(?:^|\/)package\.json$/.test(p))return true;
  if(p.startsWith('docs/')||p==='README.md'||p==='LICENSE')return false;
  if(/^apps\/(?:api|web)\/(?:src|app|tests|public)\//.test(p))return false;
  if(/^packages\/db\/migrations\/[^/]+\.sql$/.test(p))return false;
  // Every other input is conservative: workflows, mobile, locks, shared packages,
  // tools and newly introduced build helpers require the canonical native job.
  return true;
 });
 return{required:reasons.length>0,paths,reasons};
}
function publication(needs){
 assert.equal(needs.android_scope?.result,'success','android_scope_must_succeed');
 const required=needs.android_scope?.outputs?.required;
 assert.ok(required==='true'||required==='false','explicit_android_applicability_required');
 assert.equal(needs.foundation?.result,'success','complete_foundation_must_succeed');
 assert.equal(needs.android?.result,required==='true'?'success':'skipped','native_job_must_match_applicability');
 return{foundation:'success',android:needs.android.result,androidRequired:required==='true',scope:'workflow jobs on this checkout; branch protection and external certification are separate'};
}
function changedPaths(env,event,git){
 assert.equal(env.GITHUB_ACTIONS,'true','actions_only');assert.equal(env.GITHUB_REPOSITORY,'dbdanielbaracho/MLIVRETRABALHO','repository_mismatch');
 const valid=x=>assert.match(x||'',/^[a-f0-9]{40}$/,'immutable_commit_required');valid(env.GITHUB_SHA);
 assert.equal(git(['rev-parse','HEAD']).trim(),env.GITHUB_SHA,'actual_checkout_mismatch');
 let base;
 if(env.GITHUB_EVENT_NAME==='pull_request'){
  base=event.pull_request?.base?.sha;const head=event.pull_request?.head?.sha;valid(base);valid(head);
  git(['merge-base','--is-ancestor',head,env.GITHUB_SHA]);
 }else{assert.equal(env.GITHUB_EVENT_NAME,'push','supported_event_required');assert.equal(event.after,env.GITHUB_SHA,'push_checkout_mismatch');base=event.before;}
 valid(base);assert.notEqual(base,'0'.repeat(40),'complete_existing_base_required');git(['merge-base','--is-ancestor',base,env.GITHUB_SHA]);
 const raw=git(['diff','--no-renames','--name-only','-z',base,env.GITHUB_SHA]);assert.ok(raw.endsWith('\0'),'complete_nul_diff_required');
 return{base,checkout:env.GITHUB_SHA,...classify(raw.slice(0,-1).split('\0'))};
}
module.exports={classify,publication,changedPaths};
if(require.main===module){
 try{
  if(process.argv[2]==='classify'){
   const git=args=>execFileSync('git',args,{encoding:'utf8',maxBuffer:8*1024*1024});
   const receipt=changedPaths(process.env,JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH,'utf8')),git);
   fs.appendFileSync(process.env.GITHUB_OUTPUT,'required='+String(receipt.required)+'\n');
   console.log('ANDROID_APPLICABILITY_PASS '+JSON.stringify(receipt));
  }else{assert.equal(process.argv[2],'publish');console.log('MERGE_POLICY_PASS '+JSON.stringify(publication(JSON.parse(process.env.MLIVRE_JOB_RESULTS||'null'))));}
 }catch(error){console.error('MERGE_POLICY_FAIL '+error.message);process.exitCode=1;}
}
