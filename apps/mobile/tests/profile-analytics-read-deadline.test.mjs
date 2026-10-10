import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadProfessionalProfile,loadWorkPassport} from '../lib/professional-profile.ts';
import {loadAnalytics} from '../lib/company-analytics.ts';
import {runForSession} from '../lib/session-context.ts';
// Real read handlers before JSX. Hooks/auth/fetch/timer are fixtures; no RN rendering.
function deferred(){let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};}
const headers={Authorization:'Bearer owner','x-tenant-id':'actual-company'};
const profile={id:'actual-profile',displayName:'Actual person',homeCity:null,primaryRole:null},passport={displayName:'Actual person',completedWorkCount:0,averageRating:null,ratingCount:0};
const analytics={jobsCreated:0,openJobs:0,jobsWithInterest:0,jobsWithConfirmation:0,completedAssignments:0,cancelledAssignments:0,interestToConfirmationRate:null,assignmentCompletionRate:null};
const fact=path=>path==='/professional-profile'?profile:path==='/work-passport/mine'?passport:analytics;
function screen(kind,pause){
 const name=kind==='profile'?'Perfil':'Analytics',file=kind==='profile'?'perfil.tsx':'analytics.tsx',source=fs.readFileSync(new URL('../app/'+file,import.meta.url),'utf8');
 const start=source.indexOf('export default function '+name+'('),end=source.indexOf(kind==='profile'?'\n const rows=':'\n  return (\n    <SafeAreaView',start);assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\nreturn {load};\n}',{mode:'strip'});
 const keys=['useState','useRef','useCallback','useFocusEffect','authHeaders','authenticatedTenantHeaders','apiUrl','runForSession','loadAnalytics','loadProfessionalProfile','loadWorkPassport','setTimeout','clearTimeout','fetch'];
 const create=new Function(...keys,prefix+'\nreturn '+name+'();');
 const state=[],refs=[],timers=new Map(),calls=[],gate=deferred();let si=0,ri=0,focus,cleanup,handlers,timerId=0,reads=0,paused=true;
 const auth=async()=>{reads++;if(paused&&((pause==='auth'&&reads===1)||(pause==='final-auth'&&reads===(kind==='profile'?2:3))))return gate.promise;return {...headers};};
 const fetch=async(path,options)=>{calls.push({path,options});if(paused&&pause==='fetch')await gate.promise;return {ok:true,json:async()=>{if(paused&&pause==='json')await gate.promise;return fact(path)}}};
 function render(){si=0;ri=0;handlers=create(initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],value=>{state[i]=value}]},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial})},x=>x,x=>{focus=x},auth,auth,x=>x,runForSession,loadAnalytics,loadProfessionalProfile,loadWorkPassport,callback=>{const id=++timerId;timers.set(id,callback);return id},id=>timers.delete(id),fetch);}
 render();cleanup=focus();
 return {state,calls,pump:()=>new Promise(setImmediate),timer:()=>{const callback=[...timers.values()].at(-1);assert.ok(callback);return callback},resume:()=>{paused=false;gate.resolve({...headers})},blur:()=>cleanup(),refocus:()=>{cleanup();render();cleanup=focus()}};
}
for(const kind of ['profile','analytics']) {
 for(const stage of ['auth','fetch','json','final-auth'])test(kind+' read deadline shows error while '+stage+' is unresolved and withholds late data',async()=>{
  const h=screen(kind,stage);await h.pump();h.timer()();assert.deepEqual(h.state[0],{status:'error'});if(kind==='profile')assert.deepEqual(h.state[1],{status:'error'});
  h.resume();await h.pump();assert.deepEqual(h.state[0],{status:'error'});if(kind==='profile')assert.deepEqual(h.state[1],{status:'error'});
  assert.equal(h.calls.length,stage==='auth'?0:kind==='profile'?2:1);h.blur();
 });
 test(kind+' old deadline and response after blur cannot alter a newly focused snapshot',async()=>{
  const h=screen(kind,'fetch');await h.pump();const oldTimer=h.timer();h.blur();h.resume();h.refocus();await h.pump();
  const expected={status:'ready',data:kind==='profile'?profile:analytics};assert.deepEqual(h.state[0],expected);oldTimer();assert.deepEqual(h.state[0],expected);h.blur();
 });
 test(kind+' retry after read deadline can recover actual API facts',async()=>{
  const h=screen(kind,'json');await h.pump();h.timer()();assert.deepEqual(h.state[0],{status:'error'});h.refocus();h.resume();await h.pump();
  assert.deepEqual(h.state[0],{status:'ready',data:kind==='profile'?profile:analytics});if(kind==='profile')assert.deepEqual(h.state[1],{status:'ready',data:passport});h.blur();
 });
}
