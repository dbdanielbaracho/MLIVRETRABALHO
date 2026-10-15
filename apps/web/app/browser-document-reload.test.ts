import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,writeFileSync,unlinkSync,rmdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import vm from 'node:vm';
import {spawnSync} from 'node:child_process';

const source=readFileSync(new URL('../../../scripts/web-browser-journey-e2e.cjs',import.meta.url),'utf8');
const start=source.indexOf('async function until('),end=source.indexOf('\nasync function click(',start);
assert.ok(start>=0&&end>start,'Actual browser helper source required');

function fixture(mode:'delayed'|'same-document'|'incomplete'|'command-error'){
 let clock=0,origin=100,state='complete',sleeps=0,reloads=0;
 const context=vm.createContext({
  networkViolation:undefined,Date:{now:()=>clock},
  sleep:async()=>{clock+=100;sleeps++;if(mode==='delayed'){origin=200;state=sleeps===1?'loading':'complete';}},
  evaluate:async(expression:string)=>vm.runInNewContext(expression,{performance:{timeOrigin:origin},document:{readyState:state}}),
  cdp:async(method:string,params:{ignoreCache:boolean})=>{assert.equal(method,'Page.reload');assert.equal(params.ignoreCache,true);assert.equal(Object.keys(params).join(','),'ignoreCache');reloads++;if(mode==='command-error')throw Error('reload-command-failed');if(mode==='incomplete'){origin=200;state='loading';}return{};},
 });
 const reload=vm.runInContext(source.slice(start,end)+'\nreloadDocument',context) as ()=>Promise<{previousTimeOrigin:number;currentTimeOrigin:number}>;
 return{reload,metrics:()=>({sleeps,reloads})};
}

test('real browser reload helper waits past old complete DOM and new incomplete DOM',async()=>{
 const f=fixture('delayed');const r=await f.reload();
 assert.equal(r.previousTimeOrigin,100);assert.equal(r.currentTimeOrigin,200);
 assert.deepEqual(f.metrics(),{sleeps:2,reloads:1});
});
test('real browser reload helper rejects a command ACK without document change',async()=>{
 const f=fixture('same-document');await assert.rejects(f.reload(),/new complete reload document/);
 assert.equal(f.metrics().reloads,1);
});
test('real browser reload helper rejects new document that never completes',async()=>{
 const f=fixture('incomplete');await assert.rejects(f.reload(),/new complete reload document/);
 assert.equal(f.metrics().reloads,1);
});
test('real browser reload helper propagates command failure without retry',async()=>{
 const f=fixture('command-error');await assert.rejects(f.reload(),/reload-command-failed/);
 assert.deepEqual(f.metrics(),{sleeps:0,reloads:1});
});

const observerSource=source.slice(source.indexOf('function observeNativeFetch('),source.indexOf('\nasync function click('));
function nativeFixture(nativeFetch:(...args:any[])=>Promise<any>,binding?:(value:string)=>void){
 const events:any[]=[];
 const context=vm.createContext({fetch:nativeFetch,URL,location:{href:'http://127.0.0.1:3001/'},Date,mlivreFixtureFetchTrace:binding||((value:string)=>events.push(JSON.parse(value)))});
 vm.runInContext(observerSource+'\nobserveNativeFetch("http://127.0.0.1:3002","mlivreFixtureFetchTrace")',context);
 return{fetch:vm.runInContext('fetch',context),events};
}
test('native fetch observer preserves exact promise arguments receiver and unread body',async()=>{
 const secret='NEVER_LOG_THIS',url='http://127.0.0.1:3002/v1/company/jobs?secret='+secret,options={headers:{authorization:secret},body:secret},receiver={fixture:true};let calls=0;
 const response={status:200,type:'cors',json(){throw Error('Observer must not read body');}},promise=Promise.resolve(response);
 const f=nativeFixture(function(this:unknown,input:unknown,init:unknown){calls++;assert.equal(this,receiver);assert.equal(input,url);assert.equal(init,options);return promise;});
 assert.equal(f.fetch.call(receiver,url,options),promise);assert.equal(await promise,response);assert.equal(calls,1);
 assert.equal(f.events[0].path,'/v1/company/jobs');assert.equal(f.events[0].status,200);assert.ok(!JSON.stringify(f.events).includes(secret));
});
test('native fetch observer preserves original rejection and redacts unclassified messages',async()=>{
 const error=TypeError('Bearer NEVER_LOG_THIS invalid header'),promise=Promise.reject(error),f=nativeFixture(()=>promise);
 assert.equal(f.fetch('http://127.0.0.1:3002/v1/company/jobs'),promise);await assert.rejects(promise,(x:unknown)=>x===error);
 assert.equal(f.events[0].name,'TypeError');assert.equal(f.events[0].message,'[unclassified native fetch error]');assert.ok(!JSON.stringify(f.events).includes('NEVER_LOG_THIS'));
});
test('native fetch observer binding failure cannot alter transport result',async()=>{
 const promise=Promise.resolve({status:201,type:'cors'}),f=nativeFixture(()=>promise,()=>{throw Error('Observer unavailable');});
 assert.equal(f.fetch('http://127.0.0.1:3002/v1/company/teams'),promise);assert.equal((await promise).status,201);await Promise.resolve();
});
test('native fetch observer does not record unrelated origins',async()=>{
 const promise=Promise.resolve({status:200,type:'basic'}),f=nativeFixture(()=>promise);assert.equal(f.fetch('http://127.0.0.1:3001/'),promise);await promise;assert.deepEqual(f.events,[]);
});

const waveSource=source.slice(source.indexOf('async function waitForReadWave('),source.indexOf('\nfunction observeNativeFetch('));
function waveFixture(rows:any[],append:boolean){
 let clock=0,sleeps=0;
 const context=vm.createContext({responses:rows,networkViolation:undefined,Date:{now:()=>clock},sleep:async()=>{clock+=100;sleeps++;if(append&&sleeps===2)rows.push({path:'/a',method:'GET',status:200},{path:'/b',method:'GET',status:200});}});
 const wait=vm.runInContext(waveSource+'\nwaitForReadWave',context) as (from:number,paths:string[])=>Promise<void>;
 return{wait,sleeps:()=>sleeps};
}
test('current read-wave barrier never accepts matching GETs from before the action',async()=>{
 const f=waveFixture([{path:'/a',method:'GET',status:200},{path:'/b',method:'GET',status:200}],false);
 await assert.rejects(f.wait(2,['/a','/b']),/current dashboard GET200 wave/);
});
test('current read-wave barrier excludes preflight ACKs and waits for all new GET200 paths',async()=>{
 const f=waveFixture([{path:'/a',method:'OPTIONS',status:204},{path:'/b',method:'OPTIONS',status:204}],true);
 await f.wait(0,['/a','/b']);assert.equal(f.sleeps(),2);
});

const configSource=source.slice(source.indexOf('function diagnosticConfiguration('),source.indexOf('\nconst diagnostic='));
test('diagnostic matrix independently controls only the two passive observers',()=>{
 const configure=vm.runInNewContext(configSource+'\ndiagnosticConfiguration',{assert}) as (value?:string)=>unknown;
 for(const [mode,native,log] of [['baseline',false,false],['log-only',false,true],['native-only',true,false],['instrumented',true,true]]){
  assert.equal(JSON.stringify(configure(mode as string)),JSON.stringify({mode,native,log}));
 }
 assert.equal(JSON.stringify(configure()),JSON.stringify({mode:'instrumented',native:true,log:true}));
});
test('diagnostic configuration rejects unknown or inherited case names rather than skipping gates',()=>{
 const configure=vm.runInNewContext(configSource+'\ndiagnosticConfiguration',{assert}) as (value:string)=>unknown;
 for(const mode of ['', '__proto__','constructor','toString','skip'])assert.throws(()=>configure(mode),/Unknown browser diagnostic case/);
});
const wrapper=readFileSync(new URL('../../../scripts/web-browser-journey-e2e.sh',import.meta.url),'utf8');
const matrixSource=wrapper.slice(wrapper.indexOf('BROWSER_MATRIX_STATUS=0'));
function matrixFixture(failed:string){
 // Execute the real shell aggregation; only the child executable is an offline fixture.
 const stub='wc(){ echo 0; }; node(){ if [[ "$1" == scripts/web-browser-journey-e2e.cjs ]]; then echo "FIXTURE_CASE $BROWSER_SCENARIO/$BROWSER_DIAGNOSTIC_MODE"; if [[ "$BROWSER_SCENARIO" == journey && "$BROWSER_DIAGNOSTIC_MODE" == "$FIXTURE_FAILED_CASE" ]]; then return 17; fi; fi; return 0; };\n';
 const folder=mkdtempSync(join(tmpdir(),'mlivre-matrix-unit-')),file=join(folder,'api.log');writeFileSync(file,'');
 try{return spawnSync('bash',['-euc',stub+matrixSource],{encoding:'utf8',env:{...process.env,BROWSER_LOG_DIR:folder,FIXTURE_FAILED_CASE:failed}});}
 finally{unlinkSync(file);rmdirSync(folder);}
}
test('real matrix shell completes minimal and journey controls and returns success only when all eight pass',()=>{
 const result=matrixFixture('none');assert.equal(result.status,0,result.stderr);
 assert.equal((result.stdout.match(/FIXTURE_CASE /g)||[]).length,8);
 assert.equal((result.stdout.match(/DIAGNOSTIC_CASE_RESULT \S+ PASS/g)||[]).length,8);
});
test('real matrix shell retains one case failure even when subsequent independent cases pass',()=>{
 const result=matrixFixture('log-only');assert.equal(result.status,1,result.stderr);
 assert.equal((result.stdout.match(/FIXTURE_CASE /g)||[]).length,8);
 assert.match(result.stdout,/journey\/log-only FAIL exit=17/);
 assert.match(result.stdout,/instrumented PASS/);
 assert.match(result.stdout,/MATRIX_RESULT status=1/);
});

test('transport scenario cannot silently select an unknown or inherited mode',()=>{
 const s=source.slice(source.indexOf('function transportScenario('),source.indexOf('\nconst scenario='));
 const choose=vm.runInNewContext(s+'\ntransportScenario',{assert}) as (s?:string)=>string;
 assert.equal(choose(),'journey');assert.equal(choose('minimal'),'minimal');
 for(const value of ['skip','__proto__','constructor',''])assert.throws(()=>choose(value),/Unknown browser transport scenario/);
});
const documentSource=source.slice(source.indexOf('function isTransportDocument('),source.indexOf('\nasync function browserTransportProbe('));
test('minimal document fixture is restricted to its own explicit GET document URL and scenario',()=>{
 const configure=(scenario:string)=>vm.runInNewContext(documentSource+'\nisTransportDocument',{scenario,web:new URL('http://127.0.0.1:3001')}) as (u:URL,m:string,t:string)=>boolean;
 const isDocument=configure('minimal'),url=new URL('http://127.0.0.1:3001/__mlivre_transport_fixture');
 assert.equal(isDocument(url,'GET','Document'),true);assert.equal(configure('journey')(url,'GET','Document'),false);
 for(const [u,m,t] of [[url.href,'POST','Document'],[url.href,'GET','Fetch'],['http://127.0.0.1:3001/','GET','Document'],[url.href+'?extra=1','GET','Document'],['https://example.invalid/__mlivre_transport_fixture','GET','Document']])assert.equal(isDocument(new URL(u),m,t),false);
});
const probeSource=source.slice(source.indexOf('async function browserTransportProbe('),source.indexOf('\nfunction actualWireValidator('));
function transportFixture(rejectPost:boolean){
 const calls:Array<{method:string;cache?:string}>=[];
 const fetch=async(url:string,options:{method?:string;headers:Record<string,string>;cache?:string})=>{
  const method=options.method||'GET';calls.push({method,cache:options.cache});assert.equal(options.headers.Authorization,'Bearer fixture-private');assert.equal(options.headers['x-tenant-id'],'fixture-tenant');
  if(method==='POST'&&rejectPost)throw new TypeError('private bearer text must not enter metadata');
  return{status:method==='POST'?201:200,json:async()=>method==='POST'?{id:'fixture-team'}:url.endsWith('/teams')?[{id:'fixture-team'}]:{count:0}};
 };
 const probe=vm.runInNewContext(probeSource+'\nbrowserTransportProbe',{fetch}) as (origin:string,token:string,tenant:string,paths:string[],team:string)=>Promise<{failedStage:string|null;rows:unknown[]}>;
 return{calls,run:()=>probe('http://127.0.0.1:3002','fixture-private','fixture-tenant',Array.from({length:12},(_,i)=>'/section/'+i),'fixture-team-name')};
}
test('minimal native transport helper reads JSON and real-shaped ACK once with no-store only on reads',async()=>{
 const f=transportFixture(false),r=await f.run();assert.equal(r.failedStage,null);assert.equal(r.rows.length,27);
 assert.equal(f.calls.filter(x=>x.method==='POST').length,1);assert.ok(f.calls.filter(x=>x.method==='GET').every(x=>x.cache==='no-store'));
 assert.equal(f.calls.find(x=>x.method==='POST')?.cache,undefined);
 assert.ok(!JSON.stringify(r).includes('fixture-private'));
});
test('minimal native transport helper preserves POST rejection as failure without retry or credential text',async()=>{
 const f=transportFixture(true),r=await f.run();assert.equal(r.failedStage,'create-team');assert.equal(f.calls.filter(x=>x.method==='POST').length,1);
 assert.equal(f.calls.length,14);assert.ok(!JSON.stringify(r).includes('private bearer text'));
});
test('actual server diagnostic formatter isolates case byte windows and omits credentials and query strings',()=>{
 const start=wrapper.indexOf("const fs=require('node:fs');const events=[];"),end=wrapper.indexOf('\nNODE',start);
 const formatter=wrapper.slice(start,end),old=JSON.stringify({reqId:'old',time:1,req:{method:'GET',url:'/old?secret=private'},note:'á'})+'\n';
 const bytes=Buffer.from(old+JSON.stringify({reqId:'current',time:2,req:{method:'GET',url:'/current?secret=private',headers:{authorization:'private'}},body:'private'})+'\n');
 const lines:string[]=[];
 vm.runInNewContext(formatter,{require:()=>({readFileSync:()=>bytes}),URL,process:{argv:['node','-', '/fixture','baseline','minimal',String(Buffer.byteLength(old))]},console:{log:(s:string)=>lines.push(s)}});
 const report=JSON.parse(lines[0].slice('WEB_BROWSER_SERVER_DIAGNOSTIC '.length));
 assert.equal(report.scenario,'minimal');assert.equal(report.events.length,1);assert.equal(report.events[0].id,'current');assert.equal(report.events[0].path,'/current');
 assert.ok(!lines[0].includes('private'));assert.ok(!lines[0].includes('headers'));
});


