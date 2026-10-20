import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadJobs,sendInterest} from '../lib/jobs.ts';
import {runForSession} from '../lib/session-context.ts';
// Actual pre-JSX Trabalhos and real helpers; hooks/auth/JSON transport/clock are
// explicit fixtures, not React Native rendering, HTTP/PG or server cancellation.
const job={id:'00000000-0000-4000-8000-000000000001',title:'Actual work',payCents:1200};
const other={...job,id:'00000000-0000-4000-8000-000000000003'},jobs=[job,other];
const stages=['auth','fetch','json','final-auth'];
function slot(stage='none',ack='interested',overrides={}){let resolve;const gate=new Promise(r=>{resolve=r});return {stage,ack,overrides,gate,resolve,auth:0,timer:null,blocked:false};}
function screen(){
 const source=fs.readFileSync(new URL('../app/trabalhos.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function Trabalhos('),end=source.indexOf('\n return <SafeAreaView',start);assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\nreturn {interest};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','authHeaders','apiUrl','runForSession','loadJobs','sendInterest','setTimeout','clearTimeout','fetch',prefix+'\nreturn Trabalhos();');
 const state=[],refs=[],calls=[],timers=new Map();let si=0,ri=0,focus,cleanup,handlers,tid=0,current=slot(),headers={Authorization:'Bearer actual-professional'};
 const wait=async(s,at)=>{if(s.stage===at){s.blocked=true;await s.gate;}};
 const auth=async()=>{const s=current;s.auth++;await wait(s,s.auth===1?'auth':'final-auth');return {...headers}};
 const fetch=async(path,options)=>{const s=current;calls.push({path,options});if(options.method==='POST')await wait(s,'fetch');return {ok:true,json:async()=>{if(options.method==='POST'){await wait(s,'json');return {jobId:path.split('/')[2],professionalId:'00000000-0000-4000-8000-000000000002',status:s.ack,...s.overrides}}return jobs}}};
 function render(){si=0;ri=0;handlers=create(initial=>{const i=si++;if(!(i in state))state[i]=typeof initial==='function'?initial():initial;return[state[i],v=>{state[i]=typeof v==='function'?v(state[i]):v}]},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial})},x=>x,x=>{focus=x},auth,x=>x,runForSession,loadJobs,sendInterest,(callback,ms)=>{assert.equal(ms,15000);const id=++tid;const fire=()=>{timers.delete(id);callback()};timers.set(id,fire);current.timer=fire;return id},id=>timers.delete(id),fetch);}
 render();cleanup=focus();
 return {state,refs,calls,timers,pump:()=>new Promise(setImmediate),registry:()=>refs[2].current,
  start:(stage='none',id=job.id,ack='interested',overrides={})=>{render();current=slot(stage,ack,overrides);const op=current;op.promise=handlers.interest(id);return op},
  resume:op=>{op.stage='none';op.resolve()},blur:()=>cleanup(),
  refocus:()=>{cleanup();current=slot();render();cleanup=focus()},
  // Adversarial fixture installs a newly validated snapshot without changing
  // generation, to test old-finally ownership; NOT evidence of a real GET/render.
  installSameEpochSnapshot:()=>{state[0]={status:'ready',data:jobs};refs[3].current=headers.Authorization;render()},
  changeOwner:()=>{headers={Authorization:'Bearer other-professional'}}};
}
const posts=h=>h.calls.filter(c=>c.options.method==='POST');
function pending(h,ids){assert.deepEqual([...h.state[5]].sort(),[...ids].sort());assert.deepEqual([...h.refs[0].current].sort(),[...ids].sort());}
function unknown(h){assert.deepEqual(h.state[0],{status:'error'});assert.equal(h.refs[3].current,null);assert.match(h.state[2],/Não foi possível confirmar/);}
for(const ack of ['interested','confirmed'])test('interest timely '+ack+' ACK preserves one bodyless POST and releases pending',async()=>{
 const h=screen();await h.pump();const op=h.start('none',job.id,ack);await op.promise;pending(h,[]);assert.equal(posts(h).length,1);assert.equal(h.calls.length,2);assert.equal(posts(h)[0].path,'/jobs/'+job.id+'/interest');assert.equal(posts(h)[0].options.body,undefined);assert.deepEqual(posts(h)[0].options.headers,{Authorization:'Bearer actual-professional'});assert.match(h.state[2],ack==='interested'?/Interesse enviado/:/já está confirmado/);assert.equal(h.registry().size,0);h.blur();
});
for(const stage of stages)test('interest deadline ends visible pending while '+stage+' remains unresolved',async()=>{
 const h=screen();await h.pump();h.state[3]='Busca preservada';h.state[4]='Eventos';const op=h.start(stage);await h.pump();assert.equal(op.blocked,true);pending(h,[job.id]);op.timer();pending(h,[]);unknown(h);assert.equal(h.registry().size,0);assert.equal(posts(h).length,stage==='auth'?0:1);assert.equal(h.state[3],'Busca preservada');assert.equal(h.state[4],'Eventos');h.resume(op);await op.promise;pending(h,[]);unknown(h);assert.equal(posts(h).length,stage==='auth'?0:1);assert.equal(h.calls.length,stage==='auth'?1:2);h.blur();
});
for(const stage of stages)test('interest old '+stage+' finally cannot unlock a new same-job same-epoch operation',async()=>{
 const h=screen();await h.pump();const old=h.start(stage);await h.pump();old.timer();h.installSameEpochSnapshot();const fresh=h.start('fetch');await h.pump();const controller=[...h.registry()].at(-1);h.resume(old);await old.promise;pending(h,[job.id]);assert.equal(h.registry().has(controller),true);assert.equal(controller.signal.aborted,false);h.resume(fresh);await fresh.promise;pending(h,[]);assert.match(h.state[2],/Interesse enviado/);assert.equal(posts(h).length,stage==='auth'?1:2);h.blur();
});
for(const stage of stages)test('interest old '+stage+' timer cannot invalidate a new same-job same-epoch operation or ACK',async()=>{
 const h=screen();await h.pump();const old=h.start(stage);await h.pump();old.timer();h.installSameEpochSnapshot();const fresh=h.start('fetch');await h.pump();const controller=[...h.registry()].at(-1);old.timer();pending(h,[job.id]);assert.equal(h.refs[3].current,'Bearer actual-professional');assert.equal(controller.signal.aborted,false);h.resume(fresh);await fresh.promise;old.timer();assert.match(h.state[2],/Interesse enviado/);h.resume(old);await old.promise;assert.match(h.state[2],/Interesse enviado/);pending(h,[]);h.blur();
});
for(const stage of ['auth','json'])test('interest old '+stage+' response and timer cannot affect a newly focused operation',async()=>{
 const h=screen();await h.pump();const old=h.start(stage);await h.pump();h.refocus();await h.pump();const fresh=h.start('fetch');await h.pump();old.timer();h.resume(old);await old.promise;pending(h,[job.id]);const controller=[...h.registry()].at(-1);assert.equal(controller.signal.aborted,false);h.resume(fresh);await fresh.promise;pending(h,[]);assert.match(h.state[2],/Interesse enviado/);h.blur();
});
test('interest old deadline cannot invalidate a newly focused read',async()=>{
 const h=screen();await h.pump();const old=h.start('json');await h.pump();h.refocus();await h.pump();old.timer();assert.deepEqual(h.state[0],{status:'ready',data:jobs});h.resume(old);await old.promise;assert.deepEqual(h.state[0],{status:'ready',data:jobs});pending(h,[]);h.blur();
});
for(const stage of ['auth','json'])test('interest expired source rejects concurrent other-job late '+stage+' without clearing its ownership early',async()=>{
 const h=screen();await h.pump();const a=h.start('fetch');await h.pump();const b=h.start(stage,other.id);await h.pump();pending(h,[job.id,other.id]);a.timer();pending(h,[other.id]);unknown(h);h.resume(b);await b.promise;pending(h,[]);unknown(h);h.resume(a);await a.promise;unknown(h);assert.equal(posts(h).length,stage==='auth'?1:2);h.blur();
});
test('interest two current different-job operations each retain and retire their own pending entry',async()=>{
 const h=screen();await h.pump();const a=h.start('fetch');await h.pump();const b=h.start('json',other.id);await h.pump();pending(h,[job.id,other.id]);h.resume(a);await a.promise;pending(h,[other.id]);h.resume(b);await b.promise;pending(h,[]);assert.equal(posts(h).length,2);assert.match(h.state[2],/Interesse enviado/);h.blur();
});
for(const stage of ['auth','json'])test('interest changed owner during '+stage+' cannot accept the old ACK',async()=>{
 const h=screen();await h.pump();const op=h.start(stage);await h.pump();h.changeOwner();h.resume(op);await op.promise;pending(h,[]);unknown(h);assert.equal(posts(h).length,stage==='auth'?0:1);h.blur();
});
for(const overrides of [{jobId:other.id},{professionalId:''},{status:'future-status'}])test('interest incompatible ACK '+Object.keys(overrides)[0]+' remains unconfirmed without automatic retry',async()=>{
 const h=screen();await h.pump();await h.start('none',job.id,'interested',overrides).promise;pending(h,[]);assert.match(h.state[2],/Não foi possível confirmar/);assert.equal(posts(h).length,1);assert.equal(h.calls.length,2);h.blur();
});
test('interest human refresh permits the existing explicit retry without replaying an old operation',async()=>{
 const h=screen();await h.pump();const old=h.start('json');await h.pump();old.timer();unknown(h);h.refocus();await h.pump();await h.start().promise;h.resume(old);await old.promise;assert.match(h.state[2],/Interesse enviado/);pending(h,[]);assert.equal(posts(h).length,2);assert.equal(h.calls.length,4);h.blur();
});
test('interest duplicate click is blocked both during dispatch and after expiry until explicit refresh',async()=>{
 const h=screen();await h.pump();const old=h.start('fetch');await h.pump();await h.start().promise;assert.equal(posts(h).length,1);old.timer();unknown(h);await h.start().promise;assert.equal(posts(h).length,1);pending(h,[]);h.resume(old);await old.promise;unknown(h);h.blur();
});
test('interest twenty explicit refresh and write deadlines retire expired resources without automatic requests',async()=>{
 const h=screen();await h.pump();for(let i=0;i<20;i++){const op=h.start('fetch');await h.pump();op.timer();pending(h,[]);unknown(h);assert.equal(h.registry().size,0);if(i<19){h.refocus();await h.pump();}}assert.equal(posts(h).length,20);assert.equal(h.calls.length,40);h.blur();
});
