import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
const assignment={id:'bbbbbbbb-cccc-dddd-eeee-ffffffffffff',tenantId:'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',title:'Trabalho real'};
const authorization='Bearer approved-work-owner',identity='11111111-2222-3333-4444-555555555555',key='cccccccc-dddd-4eee-8fff-aaaaaaaaaaaa';
const pending={version:1,reporterIdentityId:identity,tenantId:assignment.tenantId,requestKey:key,payload:{assignmentId:assignment.id,category:'schedule',description:'Mensagem preservada',priority:'normal'},phase:'pending'};
const confirmed={...pending,phase:'confirmed',acknowledgement:{id:'eeeeeeee-ffff-aaaa-bbbb-cccccccccccc',category:'schedule',priority:'normal',status:'open',createdAt:'2026-10-10T12:00:00Z'}};
const snapshot=record=>({status:record.phase,record,authorization});
const deferred=()=>{let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};};
// Real pre-JSX handlers, explicit React/router/submission fixtures; no Native render or live request.
function panel(initial={status:'empty',authorization}){
 const source=fs.readFileSync(new URL('../components/SupportRequest.tsx',import.meta.url),'utf8'),start=source.indexOf('export function SupportRequest('),end=source.indexOf('\n const record=');
 assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export function','function')+'\nreturn {refresh,send,retry,release};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useMemo','useFocusEffect','createSupportSubmission','authHeaders','apiUrl','fetch','supportIntentStore',prefix+'\nreturn SupportRequest(arguments[10]);');
 const state=[],refs=[],calls=[],memo=[];let si=0,ri=0,mi=0,focus,cleanup,handlers,registered=0,contextChanged=0,nextInspect=initial,nextSend=snapshot(confirmed),nextRetry=snapshot(confirmed),nextRelease={status:'empty',authorization};
 const flow={inspect:async auth=>{calls.push(['inspect',auth]);return await nextInspect;},sendNew:async(...args)=>{calls.push(['sendNew',...args]);return await nextSend;},retry:async(...args)=>{calls.push(['retry',...args]);return await nextRetry;},releaseConfirmed:async(...args)=>{calls.push(['release',...args]);return await nextRelease;},cancel:()=>calls.push(['cancel'])};
 const props={assignment,workItems:[assignment],authorization,onRegistered:()=>{registered++;},onContextChanged:()=>{contextChanged++;}};
 const deps=[initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],v=>{state[i]=v}];},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial});},cb=>cb,cb=>{const i=mi++;return memo[i]??(memo[i]=cb());},cb=>{focus=cb},()=>flow,async()=>({Authorization:authorization}),p=>p,()=>{throw Error('unexpected_raw_transport')},{}];
 function render(){si=0;ri=0;mi=0;handlers=create(...deps,props);}
 render();cleanup=focus();
 return {state,calls,render,pump:()=>new Promise(setImmediate),send:()=>handlers.send(),retry:()=>handlers.retry(),release:()=>handlers.release(),refresh:()=>handlers.refresh(),blur:()=>cleanup(),refocus:()=>{render();cleanup=focus();},setDescription:v=>{state[1]=v;render();},inspectResult:v=>{nextInspect=v},sendResult:v=>{nextSend=v},retryResult:v=>{nextRetry=v},releaseResult:v=>{nextRelease=v},registered:()=>registered,contextChanged:()=>contextChanged};
}
test('opening support only inspects the authenticated persisted slot and cannot automatically create',async()=>{
 const h=panel();await h.pump();h.render();assert.equal(h.state[0].status,'empty');assert.deepEqual(h.calls,[['inspect',authorization]]);h.blur();
});
test('send requires explicit human message and uses the selected real work/tenant and source session',async()=>{
 const h=panel();await h.pump();h.render();await h.send();assert.equal(h.calls.some(c=>c[0]==='sendNew'),false);
 h.setDescription(' Mensagem real ');await h.send();const call=h.calls.find(c=>c[0]==='sendNew');assert.deepEqual(call.slice(1),[assignment.tenantId,assignment.id,{assignmentId:assignment.id,category:'schedule',description:' Mensagem real ',priority:'normal'},authorization]);
 assert.equal(h.state[0].status,'confirmed');assert.equal(h.registered(),1);h.blur();
});
test('stored pending cannot be replaced or released; only explicit retry uses its preserved key',async()=>{
 const h=panel(snapshot(pending));await h.pump();h.render();h.setDescription('Different draft');await h.send();await h.release();
 assert.equal(h.calls.length,1);await h.retry();assert.deepEqual(h.calls.find(c=>c[0]==='retry'),['retry',key,authorization]);assert.equal(h.state[0].status,'confirmed');assert.equal(h.registered(),1);h.blur();
});
test('unknown result inspects the barrier without implicit resend and shows the original pending message',async()=>{
 const h=panel();await h.pump();h.render();h.setDescription('Mensagem real');h.sendResult({status:'unknown'});h.inspectResult(snapshot(pending));await h.send();
 assert.deepEqual(h.calls.map(c=>c[0]),['inspect','sendNew','inspect']);assert.deepEqual(h.state[0].record,pending);assert.match(h.state[4],/Não foi possível confirmar/);assert.equal(h.registered(),0);h.render();await h.send();assert.equal(h.calls.filter(c=>c[0]==='sendNew').length,1);h.blur();
});
test('late completion after blur cannot confirm in UI, refresh history or expose the old draft',async()=>{
 const h=panel(),late=deferred();await h.pump();h.render();h.setDescription('Old draft');h.sendResult(late.promise);const result=h.send();await h.pump();h.blur();late.resolve(snapshot(confirmed));await result;
 assert.deepEqual(h.state[0],{status:'loading'});assert.equal(h.state[1],'');assert.equal(h.registered(),0);assert.equal(h.calls.at(-1)[0],'cancel');
});
test('stale session clears visible draft and requires reloading the authenticated work source',async()=>{
 const h=panel();await h.pump();h.render();h.setDescription('Old draft');h.sendResult({status:'stale'});await h.send();assert.deepEqual(h.state[0],{status:'error'});assert.equal(h.state[1],'');assert.equal(h.contextChanged(),1);assert.equal(h.registered(),0);h.blur();
});
test('confirmed intent remains until human release and successful release clears only the form',async()=>{
 const h=panel(snapshot(confirmed));await h.pump();h.render();h.setDescription('Preserved local form');await h.send();assert.equal(h.calls.some(c=>c[0]==='sendNew'||c[0]==='release'),false);
 await h.release();assert.deepEqual(h.calls.find(c=>c[0]==='release'),['release',key,authorization]);assert.equal(h.state[0].status,'empty');assert.equal(h.state[1],'');h.blur();
});
test('double human action is blocked while the first operation is unresolved',async()=>{
 const h=panel(),late=deferred();await h.pump();h.render();h.setDescription('Message');h.sendResult(late.promise);const first=h.send();await h.pump();await h.send();assert.equal(h.calls.filter(c=>c[0]==='sendNew').length,1);
 late.resolve(snapshot(confirmed));await first;assert.equal(h.registered(),1);h.blur();
});
test('busy or failed initial inspection shows error rather than claiming an empty slot or remaining stuck loading',async()=>{
 for(const initial of [{status:'busy'},{status:'error'}]){const h=panel(initial);await h.pump();h.render();assert.deepEqual(h.state[0],{status:'error'});h.setDescription('Text');await h.send();assert.equal(h.calls.some(c=>c[0]==='sendNew'),false);h.blur();}
});
test('a lost action result with confirmed storage resolves the notice and reloads actual history',async()=>{
 const h=panel();await h.pump();h.render();h.setDescription('Text');h.sendResult({status:'unknown'});h.inspectResult(snapshot(confirmed));await h.send();assert.equal(h.state[0].status,'confirmed');assert.equal(h.state[4],'');assert.equal(h.registered(),1);h.blur();
});
