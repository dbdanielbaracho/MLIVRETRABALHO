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

function harness(initial:Session|null=null){
 const values:any[]=[],pending:{resolve:(value:any)=>void;reject:(reason:any)=>void}[]=[],calls:{url:string;options:any}[]=[];
 const storage=new Map<string,string>();if(initial)storage.set('mlivre:web:session',JSON.stringify(initial));
 let stateCursor=0,refCursor=0;const refs:{current:any}[]=[],cleanups:(()=>void)[]=[];
 const useState=(value:any)=>{const index=stateCursor++;values[index]=index===0?initial:index===1?(initial?.memberships[0]?.tenantId||''):value;return [values[index],(next:any)=>{values[index]=typeof next==='function'?next(values[index]):next}];};
 const useRef=(value:any)=>{const index=refCursor++;return refs[index]??(refs[index]={current:value})};
 const layouts:(()=>unknown)[]=[];
 const handlers=vm.runInNewContext(js,{
  useState,useRef,useLayoutEffect:(fn:()=>unknown)=>layouts.push(fn),useMemo:(fn:()=>unknown)=>fn(),useEffect(){},
  fetch:(url:string,options:any)=>{calls.push({url,options});return new Promise((resolve,reject)=>pending.push({resolve,reject}))},
  FormData:class{form:any;constructor(form:any){this.form=form}get(key:string){return this.form[key]}},
  sessionStorage:{getItem:(key:string)=>storage.get(key)??null,setItem:(key:string,value:string)=>storage.set(key,value),removeItem:(key:string)=>storage.delete(key)},
  process:{env:{}},publishCompanyJob,publishCompanyTeam,confirmSafetyStatus,validateSigninCompanySession,isAdminRole,isCompanyRole,localDateTimeToIso,reaisToCents,tenantHeaders
 });
 for(const setup of layouts){const cleanup=setup();if(typeof cleanup==='function')cleanups.push(cleanup as ()=>void)}
 const signin=(label:string)=>handlers.signin({currentTarget:{email:label+'@example.test',password:'password-'+label},preventDefault(){}});
 const response=(payload:Session,ok=true)=>({ok,status:ok?200:401,json:async()=>payload});
 return {values,pending,calls,storage,signin,response,signout:()=>handlers.signout(),unmount(){for(const cleanup of cleanups)cleanup()}};
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
