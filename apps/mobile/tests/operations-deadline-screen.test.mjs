import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadAgenda,assignmentState,submitAgendaAction} from '../lib/agenda.ts';
import {loadCompanyDashboard,loadingCompany} from '../lib/company-dashboard.ts';
import {sameCompanyContext,rateCompletedAssignment,preferProfessional} from '../lib/company-dashboard-actions.ts';
// Run actual pre-JSX handlers; hooks/auth/fetch/timer are fixtures, not RN rendering.
function deferred(){let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};}
const headers={Authorization:'Bearer fixture','x-tenant-id':'company'};
const assignment={id:'a',tenantId:'company',status:'checked_in',title:'Fixture'};
const completed={id:'a',professionalId:'p',title:'Fixture',professionalName:'Fixture',ratingScore:null};
const fixtureData=path=>path==='/assignments/mine'?[assignment]:path==='/company/dashboard'?{openJobs:0,confirmedWorkers:0,activeWorkers:0,completedAssignments:1}:path.endsWith('/completed')?[completed]:[];
function screen(kind,pauseLoad=false){
 const file=kind==='agenda'?'agenda.tsx':'empresa-inicio.tsx',name=kind==='agenda'?'Agenda':'EmpresaInicio';
 const source=fs.readFileSync(new URL('../app/'+file,import.meta.url),'utf8');
 const start=source.indexOf('export default function '+name+'('),anchor=kind==='agenda'?'\n return <SafeAreaView':'\n  return (\n    <SafeAreaView',end=source.indexOf(anchor);
 assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\n return {load,action};\n}',{mode:'strip'});
 const keys=['useState','useRef','useCallback','useFocusEffect','authHeaders','authenticatedTenantHeaders','clearSessionForAuthorization','apiUrl','router','optionalCoordinates','loadAgenda','assignmentState','submitAgendaAction','loadCompanyDashboard','loadingCompany','sameCompanyContext','rateCompletedAssignment','preferProfessional','setTimeout','clearTimeout','fetch'];
 const create=new Function(...keys,prefix+'\n return '+name+'();');
 const state=[],refs=[],calls=[],timers=new Map();let si=0,ri=0,focus,cleanup,handlers,timerId=0,pause=false;
 const gate=deferred();
 const readHeaders=async()=>pause?gate.promise:{...headers};
 const hooks=[initial=>{const index=si++;if(!(index in state))state[index]=typeof initial==='function'?initial():initial;return [state[index],value=>{state[index]=value}];},initial=>{const index=ri++;return refs[index]??(refs[index]={current:initial});},callback=>callback,callback=>{focus=callback}];
 const fetch=async(path,options={})=>{
  calls.push({path,options});
  if(options.method==='POST'){
   assert.equal(options.headers.Authorization,headers.Authorization);assert.equal(options.headers['x-tenant-id'],headers['x-tenant-id']);
   return {ok:true,status:200,json:async()=>{pause=true;return kind==='agenda'?{id:'a',status:'in_progress'}:{id:'r',score:4,comment:null,createdAt:'2026-10-10T07:00:00Z'};}};
  }
  return {ok:true,json:async()=>{if(pauseLoad&&(kind==='agenda'||path.endsWith('/completed')))pause=true;return fixtureData(path);}};
 };
 const dependencies=[...hooks,readHeaders,readHeaders,async()=>{throw Error('unexpected signout')},path=>path,{push:()=>{},replace:()=>{}},async()=>null,loadAgenda,assignmentState,submitAgendaAction,loadCompanyDashboard,loadingCompany,sameCompanyContext,rateCompletedAssignment,preferProfessional,callback=>{const id=++timerId;timers.set(id,callback);return id},id=>timers.delete(id),fetch];
 function render(){si=0;ri=0;handlers=create(...dependencies);}
 render();cleanup=focus();
 return {state,calls,pump:()=>new Promise(setImmediate),render,expire:()=>{const callback=[...timers.values()].at(-1);assert.ok(callback);callback();},resume:()=>{pause=false;gate.resolve({...headers})},action:()=>kind==='agenda'?handlers.action(assignment):handlers.action('rating','a',4),cleanup};
}
for(const kind of ['agenda','company']){
 test(kind+' screen rejects a previously valid write ACK when its final auth read crosses the deadline',async()=>{
  const h=screen(kind);await h.pump();h.render();assert.equal(h.state[0].dashboard?.status??h.state[0].status,'ready');
  const action=h.action();await h.pump();h.expire();h.resume();await action;
  const message=kind==='agenda'?h.state[1]:h.state[2];
  assert.match(message,/Não foi possível confirmar/);assert.equal(h.calls.filter(c=>c.options.method==='POST').length,1);assert.equal(h.calls.length,kind==='agenda'?2:4);
  h.cleanup();
 });
 test(kind+' screen cannot expose a ready snapshot when the final auth read crosses its deadline',async()=>{
  const h=screen(kind,true);await h.pump();h.expire();h.resume();await h.pump();
  assert.deepEqual(h.state[0],kind==='agenda'?{status:'error'}:{dashboard:{status:'error'},active:{status:'error'},completed:{status:'error'}});
  assert.equal(h.calls.filter(c=>c.options.method==='POST').length,0);h.cleanup();
 });
}
