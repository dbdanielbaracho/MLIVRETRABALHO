import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {sameCompanyContext} from '../lib/company-dashboard-actions.ts';
// Real credential-read handler before JSX; no HTTP, publication or React Native rendering.
const first={Authorization:'Bearer first-owner','x-tenant-id':'first-company'},second={Authorization:'Bearer second-owner','x-tenant-id':'second-company'};
function screen(){
 const src=fs.readFileSync(new URL('../app/empresa.tsx',import.meta.url),'utf8'),start=src.indexOf('export default function Empresa('),end=src.indexOf('\n return <',start);assert.ok(start>=0&&end>start);
 const prefix=stripTypeScriptTypes(src.slice(start,end).replace('export default ','')+'\nreturn {loadContext,context,draftContext,uncertain,setTitle};\n}',{mode:'strip'});
 const keys=['useState','useRef','useCallback','useFocusEffect','authenticatedTenantHeaders','sameCompanyContext','setTimeout','clearTimeout'];
 const create=new Function(...keys,prefix+'\nreturn Empresa();');
 const state=[],refs=[],timers=new Map();let si=0,ri=0,focus,cleanup,h,id=0,reads=0,reject=false,current={...second},resolve;
 const gate=new Promise(r=>{resolve=r});
 const auth=async()=>{reads++;if(reads===1)return gate;if(reject)throw Error('secure_store_unavailable');return {...current}};
 function render(){si=0;ri=0;h=create(initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],v=>{state[i]=v}]},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial})},x=>x,x=>{focus=x},auth,sameCompanyContext,callback=>{const n=++id;timers.set(n,callback);return n},n=>timers.delete(n));}
 render();cleanup=focus();
 return {state,pump:()=>new Promise(setImmediate),timer:()=>{const callback=[...timers.values()].at(-1);assert.ok(callback,'context read needs an effective deadline');return callback},late:()=>resolve({...first}),refresh:()=>h.loadContext(),fail:()=>{reject=true},invalid:()=>{current={Authorization:'Bearer second-owner'}},blur:()=>cleanup(),refocus:()=>{cleanup();render();cleanup=focus()},context:()=>h.context.current,uncertain:()=>h.uncertain.current,draft:()=>h.draftContext.current,preserveDraft:()=>{h.uncertain.current=true;h.draftContext.current={...first};h.setTitle('Existing uncertain publication draft')},ready:()=>state[8],message:()=>state[7]};
}
test('company publication context deadline keeps form unauthorized and rejects late credentials',async()=>{
 const h=screen();await h.pump();h.timer()();assert.equal(h.ready(),false);assert.equal(h.context(),null);assert.ok(h.message());h.late();await h.pump();assert.equal(h.ready(),false);assert.equal(h.context(),null);h.blur();
});
test('credential storage rejection is handled as unavailable rather than an unhandled loadContext rejection',async()=>{
 const h=screen();h.fail();await assert.doesNotReject(h.refresh());assert.equal(h.ready(),false);assert.equal(h.context(),null);assert.ok(h.message());h.late();await h.pump();h.blur();
});
test('manual context retry after deadline verifies the current company and rejects the older response',async()=>{
 const h=screen();h.timer()();await h.refresh();assert.equal(h.ready(),true);assert.deepEqual(h.context(),second);h.late();await h.pump();assert.deepEqual(h.context(),second);h.blur();
});
test('deadline from blurred context cannot disable a newly focused verified company',async()=>{
 const h=screen();const old=h.timer();h.blur();h.refocus();await h.pump();assert.equal(h.ready(),true);assert.deepEqual(h.context(),second);old();h.late();await h.pump();assert.equal(h.ready(),true);assert.deepEqual(h.context(),second);h.blur();
});
test('failed context deadline does not erase the uncertain-publication flag or draft contents',async()=>{
 const h=screen();h.preserveDraft();h.timer()();assert.equal(h.state[0],'Existing uncertain publication draft');assert.equal(h.uncertain(),true);assert.deepEqual(h.draft(),first);assert.equal(h.ready(),false);h.late();await h.pump();assert.equal(h.uncertain(),true);assert.equal(h.state[0],'Existing uncertain publication draft');h.blur();
});
test('missing company cannot authorize publication context or fabricate an active company',async()=>{
 const h=screen();h.invalid();await h.refresh();assert.equal(h.ready(),false);assert.equal(h.context(),null);assert.ok(h.message());h.late();await h.pump();h.blur();
});
