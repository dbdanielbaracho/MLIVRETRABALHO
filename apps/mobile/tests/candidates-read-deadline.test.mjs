import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadCompanyJobs,loadCandidates,loadingCandidates,orderedCandidates,sameCompanyContext,confirmCandidate} from '../lib/company-candidates.ts';
import {runForSession} from '../lib/session-context.ts';

// Actual pre-JSX handlers and read parsers; only hooks, auth, transport and timers are fixtures.
const ready=data=>({status:'ready',data});
const error={candidates:{status:'error'},recommendations:{status:'error'}};
const jobs=[{id:'job-a',title:'Fixture A',status:'open'},{id:'job-b',title:'Fixture B',status:'open'}];
const facts=id=>({candidates:ready([{professionalId:'person-'+id,displayName:'Fixture '+id,status:'interested'}]),recommendations:ready([{professionalId:'person-'+id,score:70,reasons:[]}])});
function deferred(){let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};}
function screen(initialStage){
 const src=fs.readFileSync(new URL('../app/candidatos.tsx',import.meta.url),'utf8');
 const start=src.indexOf('export default function Candidatos()'),end=src.indexOf('\n  return (\n',start);
 assert.ok(start>=0&&end>start);
 const code=stripTypeScriptTypes(src.slice(start,end).replace('export default ','')+'\nreturn {selectJob};\n}',{mode:'strip'});
 const make=new Function('useState','useRef','useCallback','useFocusEffect','authenticatedTenantHeaders','runForSession','apiUrl','loadCompanyJobs','loadCandidates','loadingCandidates','orderedCandidates','sameCompanyContext','confirmCandidate','fetch','setTimeout','clearTimeout',code+'\nreturn Candidatos();');
 const state=[],refs=[],timers=new Map(),calls=[];let si=0,ri=0,focus,cleanup,h,timerId=0,stage=initialStage,phase='jobs',reads=0,paused=!!stage,gate=deferred(),headers={Authorization:'Bearer fixture-a','x-tenant-id':'tenant-a'};
 const auth=async()=>{const n=++reads;const target=stage==='auth'?1:stage==='origin-auth'||stage==='transport-auth'?2:stage==='final-auth'?(phase==='jobs'?3:4):0;if(paused&&n===target)return gate.promise;return {...headers};};
 const fetch=async(path,options)=>{calls.push({path,options});if(paused&&stage==='fetch')await gate.promise;return {ok:true,json:async()=>{if(paused&&stage==='json')await gate.promise;if(path==='/company/jobs')return jobs;const id=path.includes('/job-a/')?'job-a':'job-b';return path.endsWith('/candidates')?facts(id).candidates.data:facts(id).recommendations.data;}};};
 function render(){si=ri=0;h=make(initial=>{const n=si++;if(!(n in state))state[n]=typeof initial==='function'?initial():initial;return[state[n],v=>{state[n]=typeof v==='function'?v(state[n]):v}]},initial=>{const n=ri++;return refs[n]??(refs[n]={current:initial})},x=>x,x=>{focus=x},auth,runForSession,x=>x,loadCompanyJobs,loadCandidates,loadingCandidates,orderedCandidates,sameCompanyContext,confirmCandidate,fetch,fn=>{const n=++timerId;timers.set(n,fn);return n},n=>timers.delete(n));}
 render();cleanup=focus();
 return {state,refs,calls,pump:()=>new Promise(setImmediate),timer:()=>{const fn=[...timers.values()].at(-1);assert.ok(fn);return fn;},pauseSelection:value=>{phase='selection';reads=0;stage=value;paused=true;gate=deferred();render();},select:id=>h.selectJob(id),resume:()=>{paused=false;gate.resolve({...headers});},blur:()=>cleanup(),refocus:()=>{cleanup();phase='jobs';reads=0;render();cleanup=focus();},changeOwner:()=>{headers={Authorization:'Bearer fixture-b','x-tenant-id':'tenant-b'}}};
}
for(const stage of ['auth','origin-auth','fetch','json','final-auth']){
 test('candidate jobs deadline exits loading during unresolved '+stage+' and rejects late jobs',async()=>{
  const t=screen(stage);await t.pump();t.timer()();assert.deepEqual(t.state[0],{status:'error'});assert.equal(t.refs[2].current,null);
  t.resume();await t.pump();assert.deepEqual(t.state[0],{status:'error'});assert.equal(t.calls.length,['auth','origin-auth'].includes(stage)?0:1);t.blur();
 });
 test('old candidate jobs deadline and response cannot change a newly focused screen during '+stage,async()=>{
  const t=screen(stage);await t.pump();const old=t.timer();t.resume();t.refocus();await t.pump();assert.deepEqual(t.state[0],ready(jobs));old();assert.deepEqual(t.state[0],ready(jobs));t.blur();
 });
}
for(const stage of ['auth','transport-auth','fetch','json','final-auth']){
 test('candidate selection deadline exits loading during unresolved '+stage+' and rejects late people',async()=>{
  const t=screen();await t.pump();t.pauseSelection(stage);const result=t.select('job-a');await t.pump();t.timer()();assert.deepEqual(t.state[3],error);
  t.resume();await result;assert.deepEqual(t.state[3],error);assert.ok(t.calls.every(x=>!x.options.method||x.options.method==='GET'));t.blur();
 });
}
test('candidate selection old deadline and late response cannot replace newer selected work',async()=>{
 const t=screen();await t.pump();t.pauseSelection('json');const first=t.select('job-a');await t.pump();const old=t.timer();t.resume();const second=t.select('job-b');await Promise.all([first,second]);assert.deepEqual(t.state[3],facts('job-b'));old();assert.deepEqual(t.state[3],facts('job-b'));t.blur();
});
test('candidate selection deadline after blur does not publish an error into a newly focused company list',async()=>{
 const t=screen();await t.pump();t.pauseSelection('fetch');const first=t.select('job-a');await t.pump();const old=t.timer();t.resume();t.refocus();await first;await t.pump();assert.deepEqual(t.state[0],ready(jobs));assert.deepEqual(t.state[3],loadingCandidates());old();assert.deepEqual(t.state[3],loadingCandidates());t.blur();
});
test('explicit candidate selection retry restores actual people after deadline',async()=>{
 const t=screen();await t.pump();t.pauseSelection('json');const first=t.select('job-a');await t.pump();t.timer()();assert.deepEqual(t.state[3],error);t.resume();await first;await t.select('job-a');assert.deepEqual(t.state[3],facts('job-a'));t.blur();
});
test('explicit jobs retry restores actual open works after deadline',async()=>{
 const t=screen('json');await t.pump();t.timer()();assert.deepEqual(t.state[0],{status:'error'});t.resume();t.refocus();await t.pump();assert.deepEqual(t.state[0],ready(jobs));t.blur();
});
test('candidate selection cannot apply people from a different identity or company',async()=>{
 const t=screen();await t.pump();t.pauseSelection('fetch');const first=t.select('job-a');await t.pump();t.changeOwner();t.resume();await first;assert.deepEqual(t.state[3],error);t.blur();
});
test('candidate jobs cannot authorize the list after the company changes during transport',async()=>{
 const t=screen('fetch');await t.pump();t.changeOwner();t.resume();await t.pump();assert.deepEqual(t.state[0],{status:'error'});assert.equal(t.refs[2].current,null);t.blur();
});
