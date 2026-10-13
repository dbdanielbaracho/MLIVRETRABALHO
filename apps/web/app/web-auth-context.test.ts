import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {stripTypeScriptTypes} from 'node:module';
import {confirmSafetyStatus} from './safety-status-ack.ts';
import {validateSigninCompanySession} from './stored-session.ts';
import {publishCompanyTeam} from './team-publication.ts';
import {publishCompanyJob} from './job-publication.ts';
import {isAdminRole,isCompanyRole,localDateTimeToIso,reaisToCents,tenantHeaders} from './web-contract.ts';

const source=fs.readFileSync(new URL('./page.tsx',import.meta.url),'utf8');
const prefix=source.slice(0,source.indexOf('  if(!session)return <main')).replace(/^import .*;\n/gm,'').replace('export default function Home(){','function Home(){');
const js=stripTypeScriptTypes(prefix+'\n return {signin,signout};\n}\nHome();',{mode:'strip'});

type Session={accessToken:string;identity:{id:string;email:string};memberships:{tenantId:string;role:string;displayName:string}[]};

function session(label:string):Session{
 return {accessToken:'token-'+label,identity:{id:'identity-'+label,email:label+'@example.test'},memberships:[{tenantId:'tenant-'+label,role:'owner',displayName:'Company '+label}]};
}

function harness(initial:Session|null=null,storageBlocked=false){
 const values:any[]=[],pending:{resolve:(value:any)=>void;reject:(reason:any)=>void}[]=[],calls:{url:string;options:any}[]=[];
 const timers=new Map<number,()=>void>();let timerId=0;
 const storage=new Map<string,string>();if(initial)storage.set('mlivre:web:session',JSON.stringify(initial));
 let stateCursor=0,refCursor=0;const refs:{current:any}[]=[],cleanups:(()=>void)[]=[];
 const useState=(value:any)=>{const index=stateCursor++;values[index]=index===0?initial:index===1?(initial?.memberships[0]?.tenantId||''):value;return [values[index],(next:any)=>{values[index]=typeof next==='function'?next(values[index]):next}];};
 const useRef=(value:any)=>{const index=refCursor++;return refs[index]??(refs[index]={current:value})};
 const layouts:(()=>unknown)[]=[];
 const handlers=vm.runInNewContext(js,{
  useState,useRef,useLayoutEffect:(fn:()=>unknown)=>layouts.push(fn),useMemo:(fn:()=>unknown)=>fn(),useEffect(){},
  fetch:(url:string,options:any)=>{calls.push({url,options});return new Promise((resolve,reject)=>pending.push({resolve,reject}))},
  FormData:class{form:any;constructor(form:any){this.form=form}get(key:string){return this.form[key]}},
  sessionStorage:{getItem:(key:string)=>{if(storageBlocked)throw new Error('storage blocked');return storage.get(key)??null;},setItem:(key:string,value:string)=>{if(storageBlocked)throw new Error('storage blocked');storage.set(key,value);},removeItem:(key:string)=>{if(storageBlocked)throw new Error('storage blocked');storage.delete(key);}},
  process:{env:{}},publishCompanyJob,publishCompanyTeam,confirmSafetyStatus,validateSigninCompanySession,isAdminRole,isCompanyRole,localDateTimeToIso,reaisToCents,tenantHeaders
  ,setTimeout:(callback:()=>void,ms:number)=>{assert.equal(ms,15000);const id=++timerId;timers.set(id,callback);return id;},clearTimeout:(id:number)=>timers.delete(id)
 });
 for(const setup of layouts){const cleanup=setup();if(typeof cleanup==='function')cleanups.push(cleanup as ()=>void)}
 const signin=(label:string)=>handlers.signin({currentTarget:{email:label+'@example.test',password:'password-'+label},preventDefault(){}});
 const response=(payload:Session,ok=true)=>({ok,status:ok?200:401,json:async()=>payload});
 return {values,pending,calls,storage,signin,response,timers,expire(){const callbacks=[...timers.values()];timers.clear();for(const callback of callbacks)callback();},signout:()=>handlers.signout(),unmount(){for(const cleanup of cleanups)cleanup()}};
}

test('the newest Web signin attempt owns the session when an older success arrives later',async()=>{
 const h=harness(),older=h.signin('older'),newer=h.signin('newer');
 assert.equal(h.pending.length,2);
 h.pending[1].resolve(h.response(session('newer')));await newer;
 assert.equal(h.values[0].identity.id,'identity-newer');
 h.pending[0].resolve(h.response(session('older')));await older;
 assert.equal(h.values[0].identity.id,'identity-newer');
 assert.equal(JSON.parse(h.storage.get('mlivre:web:session')!).identity.id,'identity-newer');
});

test('Web signin fetch pending at the deadline releases loading and ignores its late success without retry',async()=>{
 const h=harness(),done=h.signin('pending');h.expire();await Promise.resolve();await Promise.resolve();
 assert.equal(h.values[22],false);assert.match(h.values[21],/tempo.*login.*expirou/i);
 assert.equal(h.values[0],null);assert.equal(h.storage.size,0);assert.equal(h.calls.length,1);
 h.pending[0].resolve(h.response(session('pending')));await done;
 assert.equal(h.values[0],null);assert.equal(h.storage.size,0);assert.equal(h.calls.length,1);assert.equal(h.timers.size,0);
});
test('Web signin JSON pending at the deadline releases loading and ignores late decoded session',async()=>{
 const h=harness(),done=h.signin('json');let finish!:(value:Session)=>void;
 h.pending[0].resolve({ok:true,status:200,json:()=>new Promise(resolve=>{finish=resolve})});
 await Promise.resolve();h.expire();await Promise.resolve();await Promise.resolve();
 assert.equal(h.values[22],false);assert.match(h.values[21],/tempo.*login.*expirou/i);
 finish(session('json'));await done;assert.equal(h.values[0],null);assert.equal(h.storage.size,0);assert.equal(h.calls.length,1);assert.equal(h.timers.size,0);
});
test('a Web signin expired response cannot replace an explicitly retried successful session',async()=>{
 const h=harness(),older=h.signin('older');h.expire();await Promise.resolve();await Promise.resolve();
 const newer=h.signin('newer');h.pending[1].resolve(h.response(session('newer')));await newer;
 assert.equal(h.values[0].identity.id,'identity-newer');assert.equal(h.timers.size,0);
 h.pending[0].resolve(h.response(session('older')));await older;
 assert.equal(h.values[0].identity.id,'identity-newer');assert.equal(h.calls.length,2);
});
test('Web signin deadline after unmount cannot publish timeout feedback',async()=>{
 const h=harness(),done=h.signin('unmounted');h.unmount();h.values[21]='unmounted feedback';h.expire();
 h.pending[0].resolve(h.response(session('unmounted')));await done;
 assert.equal(h.values[21],'unmounted feedback');assert.equal(h.values[0],null);assert.equal(h.storage.size,0);assert.equal(h.timers.size,0);
});

test('an older Web signin failure cannot publish over a newer authenticated session',async()=>{
 const h=harness(),older=h.signin('older'),newer=h.signin('newer');
 h.pending[1].resolve(h.response(session('newer')));await newer;
 h.values[21]='feedback from current session';h.values[22]=true;
 h.pending[0].resolve(h.response(session('older'),false));await older;
 assert.equal(h.values[0].identity.id,'identity-newer');
 assert.equal(h.values[21],'feedback from current session');
 assert.equal(h.values[22],true);
});

test('a Web signin response after unmount cannot persist or publish a session',async()=>{
 const h=harness(),done=h.signin('late');h.unmount();
 h.pending[0].resolve(h.response(session('late')));await done;
 assert.equal(h.values[0],null);
 assert.equal(h.storage.has('mlivre:web:session'),false);
});

test('Web signout clears the local session immediately without waiting for transport',async()=>{
 const current=session('current'),h=harness(current),done=h.signout();
 assert.equal(h.calls.length,1);assert.ok(h.calls[0].url.endsWith('/v1/auth/signout'));
 assert.equal(h.calls[0].options.headers.Authorization,'Bearer token-current');
 assert.equal(h.values[0],null);assert.equal(h.values[1],'');
 assert.equal(h.storage.has('mlivre:web:session'),false);
 h.pending[0].resolve({ok:true,status:204});await done;
 assert.equal(h.values[0],null);assert.equal(h.storage.has('mlivre:web:session'),false);
});

test('Web signout remains local when the remote revocation request fails',async()=>{
 const h=harness(session('current')),done=h.signout();
 assert.equal(h.values[0],null);assert.equal(h.storage.has('mlivre:web:session'),false);
 h.pending[0].reject(new Error('offline'));await done;
 assert.equal(h.values[0],null);assert.equal(h.values[21],'');
});

test('Web login remains usable in memory when browser sessionStorage rejects writes',async()=>{
 const h=harness(null,true),login=h.signin('valid');
 h.pending[0].resolve(h.response(session('valid')));await login;
 assert.equal(h.values[0]?.identity.id,'identity-valid');
 assert.equal(h.values[21],'');
 assert.equal(h.storage.size,0);
});
test('Web signout clears session even when browser sessionStorage rejects removal',async()=>{
 const h=harness(session('active'),true),done=h.signout();
 assert.equal(h.values[0],null);
 assert.equal(h.values[1],'');
 h.pending[0].resolve({ok:true,status:204});await done;
});

test('Web sign-in distinguishes non-credential HTTP failures without storing a session or retrying',async()=>{
 for(const status of [400,403,404,500,502,503]){
  const h=harness(),done=h.signin('failure');
  h.pending[0].resolve({...h.response(session('failure'),false),status});await done;
  assert.equal(h.values[0],null);assert.equal(h.storage.size,0);assert.equal(h.values[22],false);assert.match(h.values[21],new RegExp('HTTP '+status));assert.doesNotMatch(h.values[21],/senha inválidos/);assert.equal(h.calls.length,1);
 }
});
test('Web sign-in retains credential rejection only for 401 and the existing throttling message for 429',async()=>{
 for(const [status,message]of [[401,'E-mail ou senha inválidos.'],[429,'Muitas tentativas. Tente novamente mais tarde.']] as const){
  const h=harness(),done=h.signin('rejected');h.pending[0].resolve({...h.response(session('rejected'),false),status});await done;
  assert.equal(h.values[21],message);assert.equal(h.values[0],null);assert.equal(h.storage.size,0);assert.equal(h.calls.length,1);assert.equal(h.values[22],false);
 }
});

