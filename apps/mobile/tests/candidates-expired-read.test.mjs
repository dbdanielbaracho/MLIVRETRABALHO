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
function deferred(){let resolve,reject;const promise=new Promise((r,j)=>{resolve=r;reject=j});return {promise,resolve,reject};}
function screen(initialStage){
 const src=fs.readFileSync(new URL('../app/candidatos.tsx',import.meta.url),'utf8');
 const start=src.indexOf('export default function Candidatos()'),end=src.indexOf('\n  return (\n',start);
 assert.ok(start>=0&&end>start);
 const code=stripTypeScriptTypes(src.slice(start,end).replace('export default ','')+'\nreturn {selectJob};\n}',{mode:'strip'});
 const make=new Function('useState','useRef','useCallback','useFocusEffect','authenticatedTenantHeaders','runForSession','apiUrl','loadCompanyJobs','loadCandidates','loadingCandidates','orderedCandidates','sameCompanyContext','confirmCandidate','fetch','setTimeout','clearTimeout',code+'\nreturn Candidatos();');
 const state=[],refs=[],timers=new Map(),calls=[],writes=[];let si=0,ri=0,focus,cleanup,h,timerId=0,stage=initialStage,phase='jobs',reads=0,paused=!!stage,gate=deferred(),headers={Authorization:'Bearer fixture-a','x-tenant-id':'tenant-a'};
 const auth=async()=>{const n=++reads;const target=stage==='auth'?1:stage==='origin-auth'||stage==='transport-auth'?2:stage==='final-auth'?(phase==='jobs'?3:4):0;if(paused&&n===target)return gate.promise;return {...headers};};
 const fetch=async(path,options)=>{calls.push({path,options});if(paused&&stage==='fetch')await gate.promise;return {ok:true,json:async()=>{if(paused&&stage==='json')await gate.promise;if(path==='/company/jobs')return jobs;const id=path.includes('/job-a/')?'job-a':'job-b';return path.endsWith('/candidates')?facts(id).candidates.data:facts(id).recommendations.data;}};};
 function render(){si=ri=0;h=make(initial=>{const n=si++;if(!(n in state))state[n]=typeof initial==='function'?initial():initial;return[state[n],v=>{state[n]=typeof v==='function'?v(state[n]):v;writes.push({index:n,value:state[n]})}]},initial=>{const n=ri++;return refs[n]??(refs[n]={current:initial})},x=>x,x=>{focus=x},auth,runForSession,x=>x,loadCompanyJobs,loadCandidates,loadingCandidates,orderedCandidates,sameCompanyContext,confirmCandidate,fetch,fn=>{const n=++timerId;timers.set(n,fn);return n},n=>timers.delete(n));}
 render();cleanup=focus();
 return {state,refs,calls,writes,pump:()=>new Promise(setImmediate),timer:()=>{const fn=[...timers.values()].at(-1);assert.ok(fn);return fn;},pauseSelection:value=>{phase='selection';reads=0;stage=value;paused=true;gate=deferred();render();},select:id=>h.selectJob(id),resume:()=>{paused=false;gate.resolve({...headers});},reject:()=>{paused=false;gate.reject(Error('offline'))},blur:()=>cleanup(),refocus:()=>{cleanup();phase='jobs';reads=0;render();cleanup=focus();},changeOwner:()=>{headers={Authorization:'Bearer fixture-b','x-tenant-id':'tenant-b'}}};
}

test('expired selection auth rejection does not commit another error after the actual deadline state',async()=>{
 const h=screen();await h.pump();h.pauseSelection('auth');const pending=h.select('job-a');await h.pump();h.timer()();assert.deepEqual(h.state[3],error);const writes=h.writes.filter(x=>x.index===3).length,snapshot=h.state[3];h.reject();await pending;assert.equal(h.writes.filter(x=>x.index===3).length,writes);assert.equal(h.state[3],snapshot);assert.ok(h.calls.every(x=>x.options.method!=='POST'));h.blur();
});
test('current non-aborted selection rejection still leaves loading and shows a real retryable error',async()=>{
 const h=screen();await h.pump();h.pauseSelection('auth');const pending=h.select('job-a');await h.pump();assert.deepEqual(h.state[3],loadingCandidates());const writes=h.writes.filter(x=>x.index===3).length;h.reject();await pending;assert.deepEqual(h.state[3],error);assert.equal(h.writes.filter(x=>x.index===3).length,writes+1);assert.ok(h.calls.every(x=>x.options.method!=='POST'));h.blur();
});
