import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadNotifications,markNotificationRead,notificationContextHeaders} from '../lib/notifications.ts';
import {runForSession} from '../lib/session-context.ts';

// Actual pre-JSX component and domain helpers; hooks/auth/transport/timers are explicit fixtures.
// This does not render React Native or execute SecureStore, Android or an HTTP service.
const tenantA='407053f1-f363-4cd9-a47e-c1d5f32b1a9b',tenantB='52a1eccb-757b-41ec-b9c4-620305fe7ab4';
const rowA={id:'6eb4a022-3d04-4c8d-b145-305db4366cee',tenantId:tenantA,title:'A',body:'Fixture A',createdAt:'2026-10-18T00:00:00Z',readAt:null};
const rowB={...rowA,id:'6a070513-4b9b-4b22-815c-8e827c741b03',tenantId:tenantB,title:'B'};
const at='2026-10-18T00:01:00Z';
const pump=()=>new Promise(setImmediate);
function deferred(){let resolve;const promise=new Promise(r=>{resolve=r;});return{promise,resolve};}
function screen(company=false){
 const src=fs.readFileSync(new URL('../components/NotificationsScreen.tsx',import.meta.url),'utf8');
 const start=src.indexOf('export function NotificationsScreen('),end=src.indexOf('\n return <',start);assert.ok(start>=0&&end>start);
 const code=stripTypeScriptTypes(src.slice(start,end).replace('export ','')+'\nreturn {load,read};\n}',{mode:'strip'});
 const make=new Function('useState','useRef','useFocusEffect','useCallback','authHeaders','authenticatedTenantHeaders','apiUrl','runForSession','loadNotifications','markNotificationRead','notificationContextHeaders','fetch','setTimeout','clearTimeout','company',code+'\nreturn NotificationsScreen({company});');
 const state=[],refs=[],calls=[],timers=new Map(),blocks=new Map();let si=0,ri=0,id=0,focus,cleanup,h,authPlan,authorization='Bearer fixture-owner',selected=tenantA,rows=[rowA,rowB],outcome='confirmed';
 const auth=async scoped=>{const plan=authPlan,headers={Authorization:authorization,...(scoped?{'x-tenant-id':selected}:{})};if(plan){const n=++plan.calls;if(plan.stage==='auth'&&n===1||plan.stage==='final-auth'&&n===2)await plan.gate.promise;}return headers;};
 const fetch=async(path,options)=>{
  const method=options.method||'GET';calls.push({path,method,options});
  if(method==='GET')return{ok:true,json:async()=>rows.filter(x=>!company||x.tenantId===options.headers['x-tenant-id'])};
  const notification=rows.find(x=>path==='/notifications/'+encodeURIComponent(x.id)+'/read');assert.ok(notification,'POST must use a displayed actual fixture ID');
  assert.equal(options.headers['x-tenant-id'],notification.tenantId);assert.equal(options.body,undefined);assert.deepEqual(Object.keys(options).sort(),['headers','method','signal']);
  const block=blocks.get(notification.id),result=outcome;if(block?.stage==='fetch')await block.gate.promise;
  return{ok:result!=='rejected',status:result==='rejected'?403:201,json:async()=>{if(block?.stage==='json')await block.gate.promise;return result==='unknown'?null:{id:notification.id,readAt:at};}};
 };
 function render(){si=ri=0;h=make(initial=>{const n=si++;if(!(n in state))state[n]=typeof initial==='function'?initial():initial;return[state[n],value=>{state[n]=typeof value==='function'?value(state[n]):value;}];},initial=>{const n=ri++;return refs[n]??(refs[n]={current:initial});},fn=>{focus=fn;},fn=>fn,()=>auth(false),()=>auth(true),path=>path,runForSession,loadNotifications,markNotificationRead,notificationContextHeaders,fetch,(fn,ms)=>{assert.equal(ms,15000);const n=++id;timers.set(n,{id:n,fn,ms});return n;},n=>timers.delete(n),company);}
 render();
 return{state,refs,calls,render,timers,
  async mount(){cleanup=focus();await pump();render();assert.equal(state[1],'ready');},
  async refresh(){authPlan=undefined;await h.load();render();},
  read(n=rowA){return h.read(n);},
  arm(stage,n=rowA){const block={stage,gate:deferred(),calls:0};if(stage==='auth'||stage==='final-auth')authPlan=block;else{authPlan=undefined;blocks.set(n.id,block);}return{resolve:()=>block.gate.resolve(),gate:block.gate};},
  timer(){const timer=[...timers.values()].at(-1);assert.ok(timer);return timer;},
  expire(timer){timers.delete(timer.id);timer.fn();},
  blur(){cleanup();},async refocus(){cleanup();authPlan=undefined;render();cleanup=focus();await pump();render();},
  owner(value='Bearer other-owner'){authorization=value;},tenant(value=tenantB){selected=value;},rows(value){rows=value;},outcome(value){outcome=value;},
  posts(){return calls.filter(x=>x.method==='POST');},gets(){return calls.filter(x=>x.method==='GET');},
 };
}
for(const company of [false,true]){
 const role=company?'company':'professional';
 for(const stage of ['auth','fetch','json','final-auth'])test(role+' read deadline immediately settles unresolved '+stage+' as uncertainty, with no implicit POST retry',async()=>{
  const h=screen(company);await h.mount();const gate=h.arm(stage),work=h.read();await pump();assert.equal(h.state[3].length,1);const timer=h.timer();
  h.expire(timer);assert.equal(h.state[1],'error');assert.deepEqual(h.state[0],[]);assert.equal(h.refs[2].current,null);assert.deepEqual(h.state[3],[]);assert.match(h.state[2],/Não foi possível confirmar/);assert.equal(h.refs[3].current.size,0,'An unresolved expired read must release its own controller registration');
  const message=h.state[2],posts=stage==='auth'?0:1;assert.equal(h.posts().length,posts);gate.resolve();await work;assert.equal(h.posts().length,posts);assert.equal(h.state[2],message);assert.equal(h.state[1],'error');assert.equal(h.gets().length,1);h.blur();
 });
 for(const stage of ['auth','json','final-auth'])test(role+' expired '+stage+' completion cannot clear a new same-key operation after explicit refresh',async()=>{
  const h=screen(company);await h.mount();const oldGate=h.arm(stage),oldWork=h.read();await pump();const oldTimer=h.timer();h.expire(oldTimer);assert.equal(h.state[3].length,0);
  await h.refresh();const currentHeaders=h.refs[2].current,newGate=h.arm('json'),newWork=h.read();await pump();assert.equal(h.state[3].length,1);const posts=h.posts().length;
  oldGate.resolve();await oldWork;h.expire(oldTimer);assert.equal(h.state[3].length,1,'Old finally/timer must not delete new same-key pending');assert.equal(h.refs[2].current,currentHeaders);assert.equal(h.state[1],'ready');assert.equal(h.posts().length,posts);assert.equal(h.refs[3].current.size,1,'Old cleanup must not remove the new operation controller');
  newGate.resolve();await newWork;assert.equal(h.state[2],'Notificação marcada como lida.');assert.equal(h.state[3].length,0);assert.equal(h.posts().length,posts);h.blur();
 });
 test(role+' queued old timer after confirmed completion cannot expire a newer same-key read',async()=>{
  const h=screen(company);await h.mount();const oldGate=h.arm('json'),oldWork=h.read();await pump();const oldTimer=h.timer();oldGate.resolve();await oldWork;h.render();
  const currentHeaders=h.refs[2].current,newGate=h.arm('json'),newWork=h.read();await pump();h.expire(oldTimer);assert.equal(h.state[3].length,1);assert.equal(h.refs[2].current,currentHeaders);assert.equal(h.state[1],'ready');newGate.resolve();await newWork;h.blur();
 });
 test(role+' blur and refocus isolate old read timer and late ACK from the new focused list',async()=>{
  const h=screen(company);await h.mount();const gate=h.arm('json'),work=h.read();await pump();const timer=h.timer();await h.refocus();const currentHeaders=h.refs[2].current;h.expire(timer);gate.resolve();await work;
  assert.equal(h.state[1],'ready');assert.equal(h.refs[2].current,currentHeaders);assert.equal(h.state[2],'');assert.deepEqual(h.state[3],[]);assert.equal(h.posts().length,1);h.blur();
 });
 test(role+' identity change during POST invalidates old rows and cannot confirm or retry',async()=>{
  const h=screen(company);await h.mount();const gate=h.arm('fetch'),work=h.read();await pump();h.owner();gate.resolve();await work;assert.equal(h.state[1],'error');assert.deepEqual(h.state[0],[]);assert.equal(h.refs[2].current,null);assert.notEqual(h.state[2],'Notificação marcada como lida.');assert.equal(h.posts().length,1);h.blur();
 });
 test(role+' duplicate pending click sends only one bodyless tenant-bound POST and confirmed ACK refreshes once',async()=>{
  const h=screen(company);await h.mount();const gate=h.arm('json'),work=h.read();await pump();await h.read();assert.equal(h.posts().length,1);gate.resolve();await work;assert.equal(h.state[2],'Notificação marcada como lida.');assert.deepEqual(h.calls.map(x=>x.method),['GET','POST','GET']);assert.deepEqual(h.state[3],[]);h.blur();
 });
 for(const outcome of ['rejected','unknown'])test(role+' '+outcome+' ACK keeps existing feedback semantics after exactly one POST and no auto-refresh',async()=>{
  const h=screen(company);await h.mount();h.outcome(outcome);await h.read();assert.equal(h.state[1],'ready');assert.match(h.state[2],outcome==='rejected'?/não foi aceita/:/Não foi possível confirmar/);assert.deepEqual(h.calls.map(x=>x.method),['GET','POST']);assert.deepEqual(h.state[3],[]);h.blur();
 });
}
test('one professional notification timeout cannot let a sibling late ACK restore the invalidated list',async()=>{
 const h=screen();await h.mount();const a=h.arm('json',rowA),workA=h.read(rowA);await pump();const timerA=h.timer();const b=h.arm('json',rowB),workB=h.read(rowB);await pump();assert.equal(h.state[3].length,2);
 h.expire(timerA);const message=h.state[2];assert.equal(h.state[1],'error');assert.equal(h.state[3].length,1);b.resolve();await workB;assert.equal(h.state[1],'error');assert.equal(h.state[2],message);assert.equal(h.refs[2].current,null);assert.deepEqual(h.state[0],[]);assert.deepEqual(h.state[3],[]);a.resolve();await workA;assert.equal(h.posts().length,2);assert.equal(h.gets().length,1);h.blur();
});
test('stale sibling timeout clears only its own pending entry, not a newer list or another notification operation',async()=>{
 const h=screen();await h.mount();const a=h.arm('json',rowA),workA=h.read(rowA);await pump();const timerA=h.timer();await h.refresh();const currentHeaders=h.refs[2].current,b=h.arm('json',rowB),workB=h.read(rowB);await pump();
 h.expire(timerA);assert.equal(h.state[1],'ready');assert.equal(h.refs[2].current,currentHeaders);assert.deepEqual(h.state[3],[rowB.tenantId+':'+rowB.id]);a.resolve();await workA;assert.equal(h.state[3].length,1);b.resolve();await workB;h.blur();
});
test('company switch with unchanged bearer rejects old mark-read ACK; professional selection remains independent',async()=>{
 for(const company of [true,false]){const h=screen(company);await h.mount();const gate=h.arm('json'),work=h.read();await pump();h.tenant();gate.resolve();await work;assert.equal(h.posts().length,1);assert.equal(h.posts()[0].options.headers['x-tenant-id'],tenantA);assert.equal(h.state[1],company?'error':'ready');assert.equal(h.state[2]==='Notificação marcada como lida.',!company);h.blur();}
});
test('expired displayed row cannot be clicked again before an explicit successful refresh',async()=>{
 const h=screen();await h.mount();const gate=h.arm('json'),work=h.read();await pump();h.expire(h.timer());await h.read();assert.equal(h.posts().length,1);assert.equal(h.gets().length,1);gate.resolve();await work;h.blur();
});
