import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';

function deferred(){let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};}
function fixture(stage){
 const src=fs.readFileSync(new URL('../app/equipes.tsx',import.meta.url),'utf8');
 const start=src.indexOf('export default function Equipes()'),end=src.indexOf('\n  return (',start);
 assert.ok(start>=0&&end>start,'extract the actual pre-JSX Equipes handlers');
 const code=stripTypeScriptTypes(src.slice(start,end).replace('export default ','')+'\nreturn {loadBase,selectTeam,selectAllocation};\n}',{mode:'strip'});
 const keys=['useState','useRef','useFocusEffect','useCallback','Link','authenticatedTenantHeaders','apiUrl','CompanyNav','loadingTeamBase','loadTeamBase','knownProfessionals','loadMembers','loadAllocation','createTeam','changeTeamMember','sameTeamContext','fetch','setTimeout','clearTimeout'];
 const make=new Function(...keys,code+'\nreturn Equipes();');
 let state=[],si=0,ri=0,refs=[],focus,timers=new Map(),id=0,authReads=0;
 const gate=deferred(),headers={Authorization:'Bearer current','x-tenant-id':'tenant-a'};
 const base={teams:{status:'ready',data:[]},active:{status:'ready',data:[]},completed:{status:'ready',data:[]},jobs:{status:'ready',data:[]}};
 let paused=true;
 const auth=async()=>{authReads++;if(paused&&stage==='auth')return gate.promise;if(paused&&stage==='final-auth'&&authReads>1)return gate.promise;return headers;};
 const fetch=async()=>{if(paused&&stage==='fetch')await gate.promise;return {ok:true,json:async()=>{if(paused&&stage==='json')await gate.promise;return []}}};
 const load=async request=>{await request('/v1/teams');return base;};
 const equal=(a,b)=>a.Authorization===b.Authorization&&a['x-tenant-id']===b['x-tenant-id'];
 const h=make(initial=>{const n=si++;if(!(n in state))state[n]=typeof initial==='function'?initial():initial;return[state[n],v=>{state[n]=v;}];},initial=>{const n=ri++;return refs[n]??(refs[n]={current:initial});},callback=>{focus=callback;},x=>x,null,auth,x=>x,null,()=>({teams:{status:'loading'},active:{status:'loading'},completed:{status:'loading'},jobs:{status:'loading'}}),load,()=>[],async()=>[],async()=>[],async()=>{},async()=>{},equal,fetch,fn=>{const n=++id;timers.set(n,fn);return n;},n=>timers.delete(n));
 const cleanup=focus();
 return {h,state,deadline:()=>{const fn=[...timers.values()].at(-1);assert.ok(fn);fn();},resume:()=>{paused=false;gate.resolve(headers);},pump:()=>new Promise(setImmediate),blur:()=>cleanup()};
}
for(const stage of ['auth','fetch','final-auth']){
 test('Equipes loadBase exits loading on deadline with unresolved '+stage,async()=>{
  const t=fixture(stage);await t.pump();t.deadline();assert.equal(t.state[0].teams.status,'error');
  t.resume();await t.pump();assert.equal(t.state[0].teams.status,'error','late result must not restore stale teams');
  t.blur();
 });
}
