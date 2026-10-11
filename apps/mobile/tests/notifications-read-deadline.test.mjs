import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadNotifications,markNotificationRead,notificationContextHeaders} from '../lib/notifications.ts';
import {runForSession} from '../lib/session-context.ts';
const row=tenantId=>({id:'fixture-'+tenantId,tenantId,title:'Fixture title',body:'Fixture body',createdAt:'2026-10-11T00:00:00Z'});
function deferred(){let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};}
function screen(company,stage){
 const src=fs.readFileSync(new URL('../components/NotificationsScreen.tsx',import.meta.url),'utf8');
 const start=src.indexOf('export function NotificationsScreen('),end=src.indexOf('\n return <',start);assert.ok(start>=0&&end>start);
 const code=stripTypeScriptTypes(src.slice(start,end).replace('export ','')+'\nreturn {load};\n}',{mode:'strip'});
 const make=new Function('useState','useRef','useFocusEffect','useCallback','authHeaders','authenticatedTenantHeaders','apiUrl','runForSession','loadNotifications','markNotificationRead','notificationContextHeaders','fetch','setTimeout','clearTimeout','company',code+'\nreturn NotificationsScreen({company});');
 const state=[],refs=[],timers=new Map(),calls=[],gate=deferred();let si=0,ri=0,timerId=0,reads=0,focus,cleanup,h,paused=true,headers={Authorization:'Bearer fixture-owner','x-tenant-id':'tenant-a'};
 const auth=async()=>{const n=++reads;if(paused&&((stage==='auth'&&n===1)||(stage==='final-auth'&&n===2)))return gate.promise;return {...headers}};
 const fetch=async(path,options)=>{calls.push({path,options});if(paused&&stage==='fetch')await gate.promise;return {ok:true,json:async()=>{if(paused&&stage==='json')await gate.promise;return company?[row(options.headers['x-tenant-id'])]:[row('tenant-a'),row('tenant-b')]}};};
 function render(){si=ri=0;h=make(initial=>{const n=si++;if(!(n in state))state[n]=typeof initial==='function'?initial():initial;return[state[n],v=>{state[n]=typeof v==='function'?v(state[n]):v}]},initial=>{const n=ri++;return refs[n]??(refs[n]={current:initial})},x=>{focus=x},x=>x,auth,auth,x=>x,runForSession,loadNotifications,markNotificationRead,notificationContextHeaders,fetch,fn=>{const n=++timerId;timers.set(n,fn);return n},n=>timers.delete(n),company);}
 render();cleanup=focus();
 return {state,refs,calls,pump:()=>new Promise(setImmediate),timer:()=>{const fn=[...timers.values()].at(-1);assert.ok(fn);return fn},resume:()=>{paused=false;gate.resolve({...headers})},blur:()=>cleanup(),refocus:()=>{cleanup();reads=0;render();cleanup=focus()},load:()=>h.load(),changeOwner:()=>{headers={...headers,Authorization:'Bearer different-owner'}},changeCompany:()=>{headers={...headers,'x-tenant-id':'tenant-b'}}};
}
for(const company of [false,true]){
 const name=company?'company':'professional',expected=company?[row('tenant-a')]:[row('tenant-a'),row('tenant-b')];
 for(const stage of ['auth','fetch','json','final-auth'])test(name+' notifications deadline exposes retry error during unresolved '+stage+' and withholds late facts',async()=>{
  const t=screen(company,stage);await t.pump();t.timer()();assert.equal(t.state[1],'error');assert.deepEqual(t.state[0],[]);assert.equal(t.refs[2].current,null);t.resume();await t.pump();assert.equal(t.state[1],'error');assert.deepEqual(t.state[0],[]);assert.equal(t.calls.length,stage==='auth'?0:1);assert.ok(t.calls.every(x=>!x.options.method||x.options.method==='GET'));t.blur();
 });
 test(name+' old notification timer and late facts after blur cannot replace a new focused list',async()=>{
  const t=screen(company,'json');await t.pump();const old=t.timer();t.resume();t.refocus();await t.pump();assert.equal(t.state[1],'ready');assert.deepEqual(t.state[0],expected);old();assert.equal(t.state[1],'ready');assert.deepEqual(t.state[0],expected);t.blur();
 });
 test(name+' explicit notification retry restores actual rows after deadline',async()=>{
  const t=screen(company,'json');await t.pump();t.timer()();assert.equal(t.state[1],'error');t.resume();await t.pump();await t.load();assert.equal(t.state[1],'ready');assert.deepEqual(t.state[0],expected);t.blur();
 });
 test(name+' an old notification deadline cannot replace a newer read in the same focus',async()=>{
  const t=screen(company,'fetch');await t.pump();const old=t.timer();t.resume();await t.load();old();assert.equal(t.state[1],'ready');assert.deepEqual(t.state[0],expected);t.blur();
 });
 test(name+' notifications withhold previous owner rows after identity changes during transport',async()=>{
  const t=screen(company,'fetch');await t.pump();t.changeOwner();t.resume();await t.pump();assert.equal(t.state[1],'error');assert.deepEqual(t.state[0],[]);assert.equal(t.refs[2].current,null);t.blur();
 });
}
test('company notification read rejects previous company facts after company changes with the same owner',async()=>{
 const t=screen(true,'json');await t.pump();t.changeCompany();t.resume();await t.pump();assert.equal(t.state[1],'error');assert.deepEqual(t.state[0],[]);assert.equal(t.refs[2].current,null);t.blur();
});
test('professional multi-company notification read stays independent of the selected company',async()=>{
 const t=screen(false,'json');await t.pump();t.changeCompany();t.resume();await t.pump();assert.equal(t.state[1],'ready');assert.deepEqual(t.state[0],[row('tenant-a'),row('tenant-b')]);t.blur();
});
