import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadTalents,sameTalentContext,removeTalent} from '../lib/company-talents.ts';
import {loadingSafety,loadSafety,safetyKey,canRequestReview,sameSafetySession,submitSafetyCase,submitSafetyAppeal} from '../lib/professional-safety.ts';
// Real read handlers before JSX; explicit hooks/auth/transport/timer fixtures, no native render.
const original={Authorization:'Bearer actual-owner','x-tenant-id':'actual-company'};
const talents=[{professionalId:'actual-professional',pool:'network',displayName:'Actual fixture person'}];
const assignments=[{id:'actual-assignment',tenantId:'actual-company',title:'Actual fixture work',status:'confirmed',location:null}];
const cases=[{id:'actual-case',tenantId:'actual-company',assignmentId:'actual-assignment',category:'unsafe_work',description:'Actual fixture account',status:'open',createdAt:'2026-10-10T00:00:00Z',reportedByMe:true}];
const readySafety={assignments:{status:'ready',data:assignments},cases:{status:'ready',data:cases},appeals:{status:'ready',data:[]}};
const errorSafety={assignments:{status:'error'},cases:{status:'error'},appeals:{status:'error'}};
function deferred(){let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};}
function screen(kind,pause){
 const name=kind==='talents'?'Talentos':'Seguranca',file=kind==='talents'?'talentos.tsx':'seguranca.tsx';
 const source=fs.readFileSync(new URL('../app/'+file,import.meta.url),'utf8'),start=source.indexOf('export default function '+name+'('),end=source.indexOf(kind==='talents'?'\n return <':'\n  return (\n',start);assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\nreturn {load,pending};\n}',{mode:'strip'});
 const names=['useState','useRef','useCallback','useMemo','useFocusEffect','useLocalSearchParams','routeId','authenticatedTenantHeaders','authHeaders','apiUrl','loadTalents','sameTalentContext','removeTalent','loadingSafety','loadSafety','safetyKey','canRequestReview','sameSafetySession','submitSafetyCase','submitSafetyAppeal','setTimeout','clearTimeout','fetch'];
 const create=new Function(...names,prefix+'\nreturn '+name+'();');
 const state=[],refs=[],timers=new Map(),calls=[],gate=deferred();let si=0,ri=0,focus,cleanup,handlers,timerId=0,reads=0,paused=true,context={...original};
 const auth=async()=>{reads++;if(paused&&((pause==='auth'&&reads===1)||(pause==='final-auth'&&reads===2)))return gate.promise;return {...context};};
 const fact=path=>path==='/company/talent-pools'?talents:path==='/assignments/mine'?assignments:path==='/safety-cases/mine'?cases:[];
 const fetch=async(path,options)=>{calls.push({path,options});if(paused&&pause==='fetch')await gate.promise;return {ok:true,json:async()=>{if(paused&&pause==='json')await gate.promise;return fact(path)}};};
 function render(){si=0;ri=0;handlers=create(initial=>{const i=si++;if(!(i in state))state[i]=typeof initial==='function'?initial():initial;return[state[i],v=>{state[i]=v}]},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial})},x=>x,f=>f(),x=>{focus=x},()=>({}),()=>null,auth,auth,x=>x,loadTalents,sameTalentContext,removeTalent,loadingSafety,loadSafety,safetyKey,canRequestReview,sameSafetySession,submitSafetyCase,submitSafetyAppeal,callback=>{const id=++timerId;timers.set(id,callback);return id},id=>timers.delete(id),fetch);}
 render();cleanup=focus();
 return {state,calls,pump:()=>new Promise(setImmediate),timer:()=>{const callback=[...timers.values()].at(-1);assert.ok(callback);return callback},resume:()=>{paused=false;gate.resolve({...context})},blur:()=>cleanup(),refocus:()=>{cleanup();render();cleanup=focus()},changeContext:()=>{context={Authorization:'Bearer another-owner','x-tenant-id':'another-company'}},manual:()=>handlers.load(true),setPending:()=>{handlers.pending.current=true},pending:()=>handlers.pending.current};
}
const expected=kind=>kind==='talents'?{status:'ready',data:talents}:readySafety;
const error=kind=>kind==='talents'?{status:'error'}:errorSafety;
for(const kind of ['talents','safety']){
 for(const stage of ['auth','fetch','json','final-auth'])test(kind+' read deadline reports error while '+stage+' hangs and does not publish late data',async()=>{
  const h=screen(kind,stage);await h.pump();h.timer()();assert.deepEqual(h.state[0],error(kind));h.resume();await h.pump();assert.deepEqual(h.state[0],error(kind));assert.equal(h.calls.length,stage==='auth'?0:kind==='talents'?1:3);assert.ok(h.calls.every(x=>x.options.method==='GET'));h.blur();
 });
 test(kind+' response and deadline from a blurred request cannot replace current focused facts',async()=>{
  const h=screen(kind,'fetch');await h.pump();const oldTimer=h.timer();h.blur();h.resume();h.refocus();await h.pump();assert.deepEqual(h.state[0],expected(kind));oldTimer();assert.deepEqual(h.state[0],expected(kind));h.blur();
 });
 test(kind+' explicit read retry after deadline recovers real facts',async()=>{
  const h=screen(kind,'json');await h.pump();h.timer()();assert.deepEqual(h.state[0],error(kind));h.resume();await h.manual();assert.deepEqual(h.state[0],expected(kind));assert.ok(h.calls.every(x=>x.options.method==='GET'));h.blur();
 });
 test(kind+' owner or company change during read cannot display old facts',async()=>{
  const h=screen(kind,'fetch');await h.pump();h.changeContext();h.resume();await h.pump();assert.deepEqual(h.state[0],error(kind));h.blur();
 });
 test(kind+' manual refresh does not clear an existing mutation guard or start transport',async()=>{
  const h=screen(kind,'none');await h.pump();h.setPending();const before=h.calls.length;await h.manual();assert.equal(h.calls.length,before);assert.equal(h.pending(),true);h.blur();
 });
}
