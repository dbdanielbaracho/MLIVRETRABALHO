import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
const asModule=s=>'data:text/javascript;base64,'+Buffer.from(stripTypeScriptTypes(s,{mode:'strip'})).toString('base64');
const {loadSupportContexts}=await import(asModule(fs.readFileSync(new URL('../lib/support-contexts.ts',import.meta.url),'utf8')));
const {loadSupportCases}=await import(asModule(fs.readFileSync(new URL('../lib/professional-support.ts',import.meta.url),'utf8')));
const tenantA='aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',tenantB='bbbbbbbb-cccc-dddd-eeee-ffffffffffff';
const a={tenantId:tenantA,displayName:'Empresa A real'},b={tenantId:tenantB,displayName:'Empresa B real'},authorization='Bearer actual-owner';
const ok=x=>({ok:true,json:async()=>x}),deferred=()=>{let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};};
test('authorized support contexts preserve literal names and validated ids, including actual empty membership',async()=>{
 assert.deepEqual(await loadSupportContexts(async()=>ok([a,b])),{status:'ready',data:[a,b]});
 assert.deepEqual(await loadSupportContexts(async()=>ok([])),{status:'ready',data:[]});
 assert.deepEqual(await loadSupportContexts(async()=>ok([{...a,tenantId:tenantA.toUpperCase()}])),{status:'ready',data:[a]});
});
test('invalid or duplicate context facts cannot turn into a partial or invented authorized space',async()=>{
 for(const rows of [null,{},[a,{tenantId:'bad',displayName:'Name'}],[{...a,displayName:' '}],[a,a],[a,{...a,tenantId:tenantA.toUpperCase()}]]){
  assert.deepEqual(await loadSupportContexts(async()=>ok(rows)),{status:'error'});
 }
});
test('context read failures and late JSON never confirm empty membership or an authorized space',async()=>{
 for(const request of [async()=>({ok:false,json:async()=>[]}),async()=>{throw Error('offline')},async()=>({ok:true,json:async()=>{throw Error('bad-json')}})]){
  assert.deepEqual(await loadSupportContexts(request),{status:'error'});
 }
 let current=true;assert.deepEqual(await loadSupportContexts(async()=>({ok:true,json:async()=>{current=false;return [a]}}),()=>current),{status:'error'});
});
test('expired context cannot start transport',async()=>{
 let requests=0;assert.deepEqual(await loadSupportContexts(async()=>{requests++;return ok([a])},()=>false),{status:'error'});assert.equal(requests,0);
});
const generalCase={id:'case-real',assignmentId:null,category:'other',priority:'normal',status:'open',description:'Actual unlinked message',createdAt:'2026-10-10T12:00:00Z'};
test('general case history includes only actual null-assignment records and preserves their real response',async()=>{
 const withWork={...generalCase,id:'work-case',assignmentId:tenantB};
 assert.deepEqual(await loadSupportCases(async()=>ok([withWork,{...generalCase,resolutionNote:'Resposta real'}]),null),{status:'ready',data:[{...generalCase,resolutionNote:'Resposta real'}]});
 assert.deepEqual(await loadSupportCases(async()=>ok([withWork]),null),{status:'ready',data:[]});
});
test('general case errors and malformed work rows never confirm empty history',async()=>{
 assert.deepEqual(await loadSupportCases(async()=>ok([generalCase,{...generalCase,assignmentId:undefined}]),null),{status:'error'});
 assert.deepEqual(await loadSupportCases(async()=>({ok:false,json:async()=>[]}),null),{status:'error'});
});
// Actual pre-JSX handlers with explicit React/router/auth/fetch fixtures; no Native render.
function panel(){
 const source=fs.readFileSync(new URL('../components/GeneralSupport.tsx',import.meta.url),'utf8'),start=source.indexOf('export function GeneralSupport('),end=source.indexOf('\n const items=');
 assert.ok(start>=0&&end>start);const prefix=stripTypeScriptTypes(source.slice(start,end).replace('export function','function')+'\nreturn {loadContexts,selectContext};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','authHeaders','apiUrl','fetch','loadSupportContexts','loadSupportCases','setTimeout','clearTimeout',prefix+'\nreturn GeneralSupport();');
 const state=[],refs=[],calls=[],timers=new Map();let si=0,ri=0,focus,cleanup,handlers,auth=authorization,authRead=async()=>({Authorization:auth,'x-tenant-id':'must-not-use-default'}),rows=[a,b],handler=async path=>ok(path==='/me/support-contexts'?rows:[]);
 const deps=[initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],v=>{state[i]=v}];},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial});},cb=>cb,cb=>{focus=cb},()=>authRead(),p=>p,async(path,options)=>{calls.push({path,options});return handler(path,options)},loadSupportContexts,loadSupportCases,cb=>{const id=timers.size+1;timers.set(id,cb);return id},id=>timers.delete(id)];
 function render(){si=0;ri=0;handlers=create(...deps);}
 render();cleanup=focus();
 return {state,calls,render,pump:()=>new Promise(setImmediate),select:c=>handlers.selectContext(c),reload:()=>handlers.loadContexts(),blur:()=>cleanup(),setRows:v=>{rows=v},setAuth:v=>{auth=v},setAuthRead:v=>{authRead=v},setHandler:v=>{handler=v},expire:()=>{for(const cb of [...timers.values()])cb()}};
}
test('opening general support only reads self memberships and does not pick a default tenant or send',async()=>{
 const h=panel();await h.pump();h.render();assert.deepEqual(h.state[0],{status:'ready',data:[a,b]});assert.equal(h.state[1],null);
 assert.deepEqual(h.calls.map(x=>[x.path,x.options.method,x.options.headers]),[['/me/support-contexts','GET',{Authorization:authorization}]]);h.blur();
});
test('human selection uses the real named row and exact tenant, ignoring injected names and filtering general history',async()=>{
 const h=panel();await h.pump();h.render();h.setHandler(async()=>ok([generalCase,{...generalCase,id:'work',assignmentId:tenantB}]));
 await h.select({...a,displayName:'Injected fake'});assert.deepEqual(h.state[1],a);assert.deepEqual(h.state[2],{status:'ready',data:[generalCase]});
 assert.deepEqual(h.calls.at(-1).options.headers,{Authorization:authorization,'x-tenant-id':tenantA});assert.equal(h.calls.every(c=>c.options.method==='GET'),true);
 h.render();const n=h.calls.length;await h.select({tenantId:'not-authorized',displayName:'Injected'});assert.equal(h.calls.length,n);h.blur();
});
test('actual no-membership and offline membership remain distinct and cannot select or send',async()=>{
 for(const mode of ['empty','offline']){
  const h=panel();h.setHandler(async()=>mode==='empty'?ok([]):Promise.reject(Error('offline')));await h.reload();await h.pump();h.render();
  assert.equal(h.state[0].status,mode==='empty'?'ready':'error');if(mode==='empty')assert.deepEqual(h.state[0].data,[]);
  await h.select(a);assert.equal(h.state[1],null);assert.equal(h.calls.some(c=>c.path==='/support-cases/mine'),false);h.blur();
 }
});
test('session replacement prevents selecting prior memberships and clears visible context/history',async()=>{
 const h=panel();await h.pump();h.render();h.setAuth('Bearer other');await h.select(a);
 assert.equal(h.state[0].status,'error');assert.equal(h.state[1],null);assert.equal(h.calls.some(c=>c.path==='/support-cases/mine'),false);h.blur();
});
test('a late case response cannot overwrite a newer chosen tenant',async()=>{
 const h=panel(),late=deferred();await h.pump();h.render();h.setHandler(async(path,options)=>options.headers['x-tenant-id']===tenantA?late.promise:ok([{...generalCase,id:'actual-b'}]));
 const first=h.select(a);await h.pump();await h.select(b);late.resolve(ok([{...generalCase,id:'old-a'}]));await first;
 assert.deepEqual(h.state[1],b);assert.equal(h.state[2].data[0].id,'actual-b');h.blur();
});
test('deadline ends loading even when auth ignores abort and its late result cannot issue HTTP',async()=>{
 const h=panel();await h.pump();h.render();const late=deferred();h.setAuthRead(()=>late.promise);const prior=h.calls.length,result=h.reload();h.expire();
 assert.deepEqual(h.state[0],{status:'error'});late.resolve({Authorization:authorization});await result;assert.equal(h.calls.length,prior);assert.equal(h.state[0].status,'error');h.blur();
});
test('blur and reloading invalidate old case responses without exposing old context',async()=>{
 for(const invalidate of [h=>h.blur(),h=>h.reload()]){
  const h=panel(),late=deferred();await h.pump();h.render();h.setHandler(async path=>path==='/support-cases/mine'?late.promise:ok([a,b]));
  const result=h.select(a);await h.pump();await invalidate(h);late.resolve(ok([generalCase]));await result;
  assert.equal(h.state[1],null);assert.equal(h.state[2].status,'loading');h.blur();
 }
});
