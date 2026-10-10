import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {signupAccount} from '../lib/signup.ts';
// Execute the actual screen's pre-JSX handlers with deterministic hooks/transports.
// This is handler behavior coverage, not React Native rendering or physical evidence.
const source=fs.readFileSync(new URL('../app/criar-conta.tsx',import.meta.url),'utf8');
const start=source.indexOf('export default function CriarConta()'),end=source.indexOf('\n  return (\n    <SafeAreaView');
assert.ok(start>=0&&end>start);
const body=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\n return {signup};\n}',{mode:'strip'});
const create=new Function('useState','useRef','useCallback','useFocusEffect','signupAccount','fetch','apiUrl','router','setTimeout','clearTimeout',body+'\n return CriarConta();');
const ack={id:'fixture',email:'fixture@example.test',accountType:'professional'};
const response=()=>({ok:true,status:201,json:async()=>ack});
function deferred(){let resolve;const promise=new Promise(r=>{resolve=r});return {promise,resolve};}
function screen(fetch,password='Password123!',blurOnRoute=false){
 const state=['fixture@example.test',password,'professional','','',false,false],refs=[],routes=[];
 let stateIndex=0,refIndex=0,focus,cleanup,expire,handlers,active=false;
 const hooks=[
  initial=>{const index=stateIndex++;if(!(index in state))state[index]=initial;return [state[index],value=>{state[index]=value}];},
  initial=>{const index=refIndex++;return refs[index]??(refs[index]={current:initial});},
  callback=>callback,
  callback=>{focus=callback}
 ];
 const router={replace:path=>{routes.push(path);if(blurOnRoute)blur()}};
 function render(){stateIndex=0;refIndex=0;handlers=create(...hooks,signupAccount,fetch,path=>path,router,callback=>{expire=callback;return 1},()=>{});}
 function blur(){if(active){active=false;cleanup();}}
 function enter(){active=true;cleanup=focus();}
 render();enter();
 return {signup:()=>handlers.signup(),expire:()=>expire(),blur,enter,routes,state,correctPassword:value=>{state[1]=value;render();}};
}
test('actual signup screen keeps a late HTTP creation uncertain and blocks another non-idempotent POST',async()=>{
 const pending=deferred();let calls=0;const h=screen(async()=>{calls++;return pending.promise});
 const result=h.signup();h.expire();pending.resolve(response());await result;
 assert.deepEqual(h.routes,[]);assert.equal(h.state[1],'Password123!');assert.equal(h.state[6],true);
 await h.signup();assert.equal(calls,1);
});
test('actual signup screen cannot navigate on creation JSON decoded after its deadline',async()=>{
 const pending=deferred();let calls=0;const h=screen(async()=>{calls++;return {ok:true,status:201,json:()=>pending.promise}});
 const result=h.signup();await Promise.resolve();h.expire();pending.resolve(ack);await result;
 assert.deepEqual(h.routes,[]);assert.equal(h.state[6],true);await h.signup();assert.equal(calls,1);
});
test('blur after sending signup keeps the uncertain barrier through refocus and late acknowledgement',async()=>{
 const pending=deferred();let calls=0;const h=screen(async()=>{calls++;return pending.promise});
 const result=h.signup();h.blur();h.enter();await h.signup();assert.equal(calls,1);
 pending.resolve(response());await result;assert.deepEqual(h.routes,[]);assert.equal(h.state[6],true);
});
test('blur during local invalid-input validation does not prevent a corrected signup because no POST started',async()=>{
 let calls=0;const h=screen(async()=>{calls++;return response()},'short');
 const invalid=h.signup();h.blur();await invalid;assert.equal(calls,0);assert.equal(h.state[6],false);
 h.correctPassword('Password123!');h.enter();await h.signup();
 assert.equal(calls,1);assert.deepEqual(h.routes,['/entrar']);assert.equal(h.state[6],false);
});
test('verified creation clears pending before navigation cleanup and does not become falsely uncertain',async()=>{
 let calls=0;const h=screen(async()=>{calls++;return response()},'Password123!',true);
 await h.signup();assert.equal(calls,1);assert.deepEqual(h.routes,['/entrar']);assert.equal(h.state[1],'');assert.equal(h.state[6],false);
});
