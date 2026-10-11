import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadProfessionalHome,loadingHome} from '../lib/professional-home.ts';
import {loadHomeCards,loadingHomeCards} from '../lib/home-cards.ts';
import {loadEarnings} from '../lib/earnings.ts';
import {loadJobs} from '../lib/jobs.ts';
import {loadCompanyDashboard,loadingCompany} from '../lib/company-dashboard.ts';
import {sameCompanyContext} from '../lib/company-dashboard-actions.ts';
import {runForSession} from '../lib/session-context.ts';
// Actual pre-JSX handlers and actual read helpers; hooks/auth/fetch/timer are explicit fixtures.
const profile={displayName:'Actual fixture person'},passport={completedWorkCount:0,ratingCount:0,averageRating:null};
const earnings=[{id:'actual-earning',tenantId:'actual-company',title:'Actual fixture work',amountCents:1200,status:'paid',createdAt:'2026-10-10T00:00:00Z'}];
const jobs=[{id:'actual-job',title:'Actual fixture opportunity',workCity:'Actual fixture city',payCents:10000}];
const dashboard={openJobs:0,confirmedWorkers:0,activeWorkers:0,completedAssignments:0};
const names={home:'ProfissionalInicio',jobs:'Trabalhos',earnings:'Ganhos',company:'EmpresaInicio'},files={home:'profissional-inicio',jobs:'trabalhos',earnings:'ganhos',company:'empresa-inicio'};
const ends={home:'\n const now=',jobs:'\n async function interest(',earnings:'\n const items=',company:'\n  const dashboard='};
const section=data=>({status:'ready',data}),errors=keys=>Object.fromEntries(keys.map(k=>[k,{status:'error'}]));
const expected=kind=>kind==='home'?{profile:section(profile),assignments:section([]),earnings:section(earnings),availability:section([])}:kind==='company'?{dashboard:section(dashboard),active:section([]),completed:section([])}:section(kind==='jobs'?jobs:earnings);
const failure=kind=>kind==='home'?errors(['profile','assignments','earnings','availability']):kind==='company'?errors(['dashboard','active','completed']):{status:'error'};
const cardFacts={opportunities:section(jobs),passport:section(passport)},cardError=errors(['opportunities','passport']);
function deferred(){let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};}
function screen(kind,pause){
 const name=names[kind],source=fs.readFileSync(new URL('../app/'+files[kind]+'.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function '+name+'('),end=source.indexOf(ends[kind],start);assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\nreturn {};\n}',{mode:'strip'});
 const keys=['useState','useRef','useCallback','useFocusEffect','authHeaders','authenticatedTenantHeaders','apiUrl','runForSession','loadProfessionalHome','loadingHome','loadHomeCards','loadingHomeCards','loadEarnings','loadJobs','loadCompanyDashboard','loadingCompany','sameCompanyContext','setTimeout','clearTimeout','fetch'];
 const create=new Function(...keys,prefix+'\nreturn '+name+'();');
 const state=[],refs=[],timers=new Map(),calls=[],gate=deferred();let si=0,ri=0,focus,cleanup,timerId=0,reads=0,paused=true,headers={Authorization:'Bearer actual-owner','x-tenant-id':'actual-company'};
 const auth=async()=>{reads++;if(paused&&((pause==='auth'&&reads===1)||(pause==='final-auth'&&reads===2)))return gate.promise;return {...headers}};
 const fact=path=>path==='/professional-profile'?profile:path==='/work-passport/mine'?passport:path==='/jobs'?jobs:path==='/earnings/mine'?earnings:path==='/company/dashboard'?dashboard:[];
 const fetch=async(path,options)=>{calls.push({path,options});if(paused&&pause==='fetch')await gate.promise;return {ok:true,json:async()=>{if(paused&&pause==='json')await gate.promise;return fact(path)}}};
 function render(){si=0;ri=0;create(initial=>{const i=si++;if(!(i in state))state[i]=typeof initial==='function'?initial():initial;return[state[i],v=>{state[i]=typeof v==='function'?v(state[i]):v}]},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial})},x=>x,x=>{focus=x},auth,auth,x=>x,runForSession,loadProfessionalHome,loadingHome,loadHomeCards,loadingHomeCards,loadEarnings,loadJobs,loadCompanyDashboard,loadingCompany,sameCompanyContext,callback=>{const id=++timerId;timers.set(id,callback);return id},id=>timers.delete(id),fetch);}
 render();cleanup=focus();
 return {state,calls,pump:()=>new Promise(setImmediate),timer:()=>{const callback=[...timers.values()].at(-1);assert.ok(callback);return callback},resume:()=>{paused=false;gate.resolve({...headers})},blur:()=>cleanup(),refocus:()=>{cleanup();render();cleanup=focus()},changeOwner:()=>{headers={Authorization:'Bearer another-owner','x-tenant-id':'another-company'}}};
}
function check(h,kind,value){assert.deepEqual(h.state[0],value);if(kind==='home')assert.deepEqual(h.state[1],value.profile?.status==='error'?cardError:cardFacts);}
for(const kind of Object.keys(names)){
 for(const stage of ['auth','fetch','json','final-auth'])test(kind+' primary read deadline terminates loading while '+stage+' is unresolved and rejects late facts',async()=>{
  const h=screen(kind,stage);await h.pump();h.timer()();check(h,kind,failure(kind));h.resume();await h.pump();check(h,kind,failure(kind));assert.equal(h.calls.length,stage==='auth'?0:kind==='home'?6:kind==='company'?3:1);assert.ok(h.calls.every(x=>!x.options.method||x.options.method==='GET'));h.blur();
 });
 test(kind+' old primary deadline and response after blur cannot replace current focused facts',async()=>{
  const h=screen(kind,'fetch');await h.pump();const oldTimer=h.timer();h.blur();h.resume();h.refocus();await h.pump();check(h,kind,expected(kind));oldTimer();check(h,kind,expected(kind));h.blur();
 });
 test(kind+' explicit primary retry after deadline recovers API facts',async()=>{
  const h=screen(kind,'json');await h.pump();h.timer()();check(h,kind,failure(kind));h.resume();h.refocus();await h.pump();check(h,kind,expected(kind));h.blur();
 });
 test(kind+' primary response from another owner or company is not applied',async()=>{
  const h=screen(kind,'fetch');await h.pump();h.changeOwner();h.resume();await h.pump();check(h,kind,failure(kind));h.blur();
 });
}
