'use strict';
const assert=require('node:assert/strict');
const {spawn,spawnSync}=require('node:child_process');
const {mkdtempSync,readFileSync}=require('node:fs');
const vm=require('node:vm'),{stripTypeScriptTypes}=require('node:module');
const {tmpdir}=require('node:os');
const {join}=require('node:path');
const {randomUUID,createHash}=require('node:crypto');
function diagnosticConfiguration(value='instrumented'){
 const cases={baseline:{native:false,log:false},'log-only':{native:false,log:true},'native-only':{native:true,log:false},instrumented:{native:true,log:true}};
 assert.ok(Object.prototype.hasOwnProperty.call(cases,value),'Unknown browser diagnostic case');
 return{mode:value,...cases[value]};
}
const diagnostic=diagnosticConfiguration(process.env.BROWSER_DIAGNOSTIC_MODE);
function transportScenario(value='journey'){
 assert.ok(['minimal','journey'].includes(value),'Unknown browser transport scenario');return value;
}
const scenario=transportScenario(process.env.BROWSER_SCENARIO);
function continuationConfiguration(value='concurrent'){
 assert.ok(['concurrent','serial'].includes(value),'Unknown continuation policy');return value;
}
function createContinuationDispatcher(policy,send){
 continuationConfiguration(policy);let tail=Promise.resolve();
 return(method,params)=>{
  if(policy==='concurrent')return send(method,params);
  const result=tail.then(()=>send(method,params));
  // Drain already guarded pauses after rejection; the caller still receives the original failure.
  tail=result.catch(()=>{});return result;
 };
}
const continuation=continuationConfiguration(process.env.BROWSER_CONTINUATION_POLICY);
const api=new URL(process.env.BROWSER_API_URL||'http://127.0.0.1:3002');
const web=new URL(process.env.BROWSER_WEB_URL||'http://127.0.0.1:3001');
for(const u of [api,web])assert.ok(u.protocol==='http:'&&['127.0.0.1','localhost'].includes(u.hostname)&&u.port&&u.pathname==='/'&&!u.username&&!u.password,'Local disposable origins required');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const readPaths=['/v1/company/dashboard','/v1/company/analytics','/v1/company/planner','/v1/company/jobs','/v1/company/dashboard/assignments','/v1/company/dashboard/completed','/v1/company/teams','/v1/company/replacements','/v1/company/talent-pools','/v1/company/payment-events/reconciliation','/v1/company/safety-cases','/v1/company/safety-appeals'];
function requireLoopbackDocument(rows){
 const row=rows.find(x=>x.path==='/__mlivre_transport_fixture.html');
 assert.ok(row&&row.status===200&&['127.0.0.1','::1','[::1]','::ffff:127.0.0.1'].includes(row.remoteIPAddress)&&!row.fromDiskCache&&!row.fromServiceWorker,'Real loopback HTTP fixture document required; synthetic/cache/service-worker document is not a control');
 return row;
}
async function browserTransportProbe(apiOrigin,accessToken,tenantId,paths,teamName){
 const headers={Authorization:'Bearer '+accessToken,'x-tenant-id':tenantId};
 const rows=[];
 const read=async(path,stage)=>{
  try{const r=await fetch(apiOrigin+path,{headers,cache:'no-store'});const body=await r.json();const row={stage,path,status:r.status,jsonKind:Array.isArray(body)?'array':typeof body};rows.push(row);return{ok:r.status===200,body};}
  catch(error){rows.push({stage,path,status:null,errorName:error?.name});return{ok:false};}
 };
 if(!(await read(paths[0],'single')).ok)return{failedStage:'single',rows};
 if(!(await Promise.all(paths.map(path=>read(path,'parallel-before')))).every(x=>x.ok))return{failedStage:'parallel-before',rows};
 let created;
 try{
  const r=await fetch(apiOrigin+'/v1/company/teams',{method:'POST',headers:{...headers,'content-type':'application/json'},body:JSON.stringify({name:teamName})});
  created=await r.json();rows.push({stage:'create-team',path:'/v1/company/teams',status:r.status});
  if(r.status!==201||typeof created?.id!=='string')return{failedStage:'create-team',rows};
 }catch(error){rows.push({stage:'create-team',path:'/v1/company/teams',status:null,errorName:error?.name});return{failedStage:'create-team',rows};}
 const teams=await read('/v1/company/teams','read-created');
 if(!teams.ok||!Array.isArray(teams.body)||!teams.body.some(x=>x.id===created.id))return{failedStage:'read-created',rows};
 if(!(await Promise.all(paths.map(path=>read(path,'parallel-after')))).every(x=>x.ok))return{failedStage:'parallel-after',rows};
 return{failedStage:null,teamId:created.id,rows};
}
function actualWireValidator(){
 const clean=s=>stripTypeScriptTypes(s.replace(/import\s[^;]+;/g,''),{mode:'transform'}).replace(/\bexport\s+/g,'');
 return vm.runInNewContext(clean(readFileSync('apps/web/app/web-contract.ts','utf8'))+'\n'+clean(readFileSync('apps/web/app/stored-session.ts','utf8'))+'\nvalidateSigninCompanySession');
}
const validateActualSignin=actualWireValidator();
const password='BrowserFixture123!';
const stamp=Date.now()+'-'+randomUUID().slice(0,8);
let chrome,ws,sessionId,commandId=0,networkViolation;
const pending=new Map(),responses=[],captures=[],networkEvents=[],requestMethods=new Map(),documentResponses=[];
const dispatchContinuation=createContinuationDispatcher(continuation,(method,params)=>cdp(method,params));
function waitForBrowserEndpoint(child,profile,onDiagnostic,options={}){
 const clock=options.clock||{setTimeout,clearTimeout,now:Date.now};
 const readPort=options.readPort||(()=>readFileSync(join(profile,'DevToolsActivePort'),'utf8'));
 const started=clock.now();let stderr='',stdout='',spawnObserved=false,exitObserved=false,spawnErrorCode=null;
 const validEndpoint=text=>{
  const match=text.match(/DevTools listening on (ws:\/\/127\.0\.0\.1:[^\s]+)/);if(!match)return null;
  try{const u=new URL(match[1]);return u.protocol==='ws:'&&u.hostname==='127.0.0.1'&&Number(u.port)>0&&Number(u.port)<=65535&&!u.username&&!u.password&&!u.search&&!u.hash&&/^\/devtools\/browser\/[A-Za-z0-9-]+$/.test(u.pathname)?u.href:null;}catch{return null;}
 };
 const diagnostic=()=>{
  let portFile={exists:false,valid:false};
  try{const parts=String(readPort()).trim().split(/\r?\n/);portFile={exists:true,valid:parts.length===2&&/^\d+$/.test(parts[0])&&Number(parts[0])>0&&Number(parts[0])<=65535&&/^\/devtools\/browser\/[A-Za-z0-9-]+$/.test(parts[1])};}catch{}
  return {phase:'startup',timeoutMs:15000,elapsedMs:Math.max(0,clock.now()-started),binary:String(child.spawnfile||'').split(/[\\/]/).pop(),pid:Number.isInteger(child.pid)?child.pid:null,spawnObserved,exitObserved,exitCode:child.exitCode??null,signalCode:['SIGTERM','SIGKILL','SIGABRT','SIGSEGV'].includes(child.signalCode)?child.signalCode:null,killed:child.killed===true,spawnErrorCode,stderrBytes:Buffer.byteLength(stderr),stdoutBytes:Buffer.byteLength(stdout),stderrEndpointSeen:!!validEndpoint(stderr),stdoutEndpointSeen:!!validEndpoint(stdout),portFile,stderrFlags:{sandbox:/No usable sandbox|Running as root.*no-sandbox/i.test(stderr),fatal:/FATAL/.test(stderr),error:/ERROR/.test(stderr),dbus:/dbus/i.test(stderr)}};
 };
 return new Promise((resolve,reject)=>{
  const cleanup=()=>{clock.clearTimeout(timer);child.stderr.removeListener('data',onStderr);child.stdout?.removeListener('data',onStdout);child.removeListener('spawn',onSpawn);child.removeListener('error',onError);child.removeListener('exit',onExit);};
  const fail=message=>{const details=diagnostic();cleanup();try{onDiagnostic(details);}finally{reject(Error(message));}};
  const onStderr=b=>{stderr+=String(b);const endpoint=validEndpoint(stderr);if(endpoint){cleanup();resolve(endpoint);}};
  const onStdout=b=>{stdout+=String(b);};
  const onSpawn=()=>{spawnObserved=true;};
  const onError=e=>{spawnErrorCode=['ENOENT','EACCES','ENOMEM','EAGAIN'].includes(e?.code)?e.code:'unclassified';fail('Browser process spawn failed');};
  const onExit=()=>{exitObserved=true;fail('Browser exited before debugger ready');};
  const timer=clock.setTimeout(()=>fail('Browser startup timeout'),15000);
  child.stderr.on('data',onStderr);child.stdout?.on('data',onStdout);child.once('spawn',onSpawn);child.once('error',onError);child.once('exit',onExit);
 });
}
async function apiCall(path,{token,tenant,method='GET',body}={}){
 const r=await fetch(new URL(path,api),{method,headers:{...(token?{authorization:'Bearer '+token}:{}),...(tenant?{'x-tenant-id':tenant}:{}),...(body?{'content-type':'application/json'}:{})},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(15000)});
 assert.ok(r.ok,'Local fixture API failed: '+method+' '+path+' HTTP'+r.status);return r.json();
}
function cdp(method,params={},target=true){
 const id=++commandId;
 return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{pending.delete(id);reject(Error('CDP timeout '+method));},15000);pending.set(id,{resolve,reject,timer});ws.send(JSON.stringify({id,method,params,...(target?{sessionId}:{})}));});
}
async function evaluate(expression){const r=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});assert.ok(!r.exceptionDetails,'Browser evaluation failed');return r.result?.value;}
async function until(expression,label,timeout=20000){
 const end=Date.now()+timeout;while(Date.now()<end){if(networkViolation)throw Error(networkViolation);if(await evaluate(expression))return;await sleep(100);}throw Error('Browser condition timeout: '+label);
}
async function reloadDocument(){
 const previousTimeOrigin=await evaluate('performance.timeOrigin');
 await cdp('Page.reload',{ignoreCache:true});
 await until('performance.timeOrigin!=='+JSON.stringify(previousTimeOrigin)+'&&document.readyState==="complete"','new complete reload document');
 return{previousTimeOrigin,currentTimeOrigin:await evaluate('performance.timeOrigin')};
}
async function waitForReadWave(fromIndex,expectedPaths){
 const end=Date.now()+20000;
 while(Date.now()<end){
  if(networkViolation)throw Error(networkViolation);
  const current=responses.slice(fromIndex).filter(x=>x.method==='GET'&&expectedPaths.includes(x.path));
  if(current.some(x=>x.status!==200))throw Error('Dashboard refresh read returned non-200');
  const completed=new Set(current.map(x=>x.path));
  if(expectedPaths.every(path=>completed.has(path)))return;
  await sleep(100);
 }
 throw Error('Browser condition timeout: current dashboard GET200 wave');
}
function observeNativeFetch(apiOrigin,bindingName){
 const nativeFetch=globalThis.fetch;
 const emit=data=>{try{globalThis[bindingName](JSON.stringify(data));}catch{}};
 globalThis.fetch=function(...args){
  const promise=Reflect.apply(nativeFetch,this,args);
  let path;try{const url=new URL(typeof args[0]==='string'?args[0]:args[0].url,location.href);if(url.origin===apiOrigin)path=url.pathname;}catch{}
  if(path)promise.then(response=>emit({event:'native-fetch-response',path,status:response.status,type:response.type,at:Date.now()}),error=>emit({event:'native-fetch-rejection',path,name:error?.name,message:['Failed to fetch','Load failed','The user aborted a request.','The operation was aborted.','signal is aborted without reason'].includes(error?.message)?error.message:'[unclassified native fetch error]',at:Date.now()}));
  return promise;
 };
}
async function click(expression){
 await until('(()=>{const e='+expression+';return !!e&&!e.disabled})()','enabled click target');
 const p=await evaluate('(()=>{const e='+expression+';if(!e||e.disabled)throw Error("Missing enabled target");e.scrollIntoView({block:"center"});const r=e.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
 await cdp('Input.dispatchMouseEvent',{type:'mousePressed',x:p.x,y:p.y,button:'left',clickCount:1});
 await cdp('Input.dispatchMouseEvent',{type:'mouseReleased',x:p.x,y:p.y,button:'left',clickCount:1});
}
async function fill(selector,text){
 await evaluate('(()=>{const e=document.querySelector('+JSON.stringify(selector)+');if(!e)throw Error("Missing input");e.focus();Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value").set.call(e,"");e.dispatchEvent(new Event("input",{bubbles:true}))})()');
 await cdp('Input.insertText',{text});
}
async function signin(email,pw=password){
 await fill('input[name=email]',email);await fill('input[name=password]',pw);await click('document.querySelector("form button")');
}
async function dashboard(email){
 await until('document.querySelector("h1")?.textContent==="Operação"&&document.body.innerText.includes('+JSON.stringify(email)+')&&!document.body.innerText.includes("Atualizando dados…")&&document.querySelectorAll(".metrics strong").length===4&&Array.from(document.querySelectorAll(".metrics strong")).every(x=>/^\\d+$/.test(x.textContent))','loaded dashboard');
 assert.equal(await evaluate('document.querySelector("[role=alert]")?.textContent||""'),'','No partial/fabricated dashboard success');
}
async function capture(label){
 await evaluate('window.scrollTo(0,0)');const r=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 const bytes=Buffer.from(r.data,'base64'),sha256=createHash('sha256').update(bytes).digest('hex');
 captures.push({label,sha256,bytes:bytes.length});console.log('WEB_BROWSER_CAPTURE '+JSON.stringify({scenario,diagnostic:diagnostic.mode,continuation,label,sha256,bytes:bytes.length,pngBase64:r.data}));
}
(async()=>{
 console.log('WEB_BROWSER_DIAGNOSTIC_CASE_START '+JSON.stringify({scenario,...diagnostic,continuation}));
 const accounts=[];
 for(const label of ['A','B']){
  const email='web-browser-'+label.toLowerCase()+'-'+stamp+'@example.test';
  const signup=await apiCall('/v1/auth/signup',{method:'POST',body:{email,password,accountType:'company',workspaceName:'Browser company '+label+' '+stamp}});
  const auth=await apiCall('/v1/auth/signin',{method:'POST',body:{email,password}});
  console.log('WEB_BROWSER_FIXTURE_AUTH '+JSON.stringify({label,tenantId:signup.tenantId,memberships:auth.memberships}));
  const normalized=validateActualSignin(auth);
  console.log('WEB_BROWSER_WIRE_OBSERVED '+JSON.stringify({label,normalized:!!normalized,membershipKeys:auth.memberships.map(x=>Object.keys(x))}));
  assert.ok(normalized,'Actual API signin response rejected by current Web validator');
  assert.equal(normalized.memberships[0]?.tenantId,signup.tenantId,'Actual signin authority must remain its real tenant');
  accounts.push({email,tenant:signup.tenantId,token:auth.accessToken,identity:auth.identity.id});
 }
 const binary=process.env.CHROME_BIN||['google-chrome','google-chrome-stable','chromium','chromium-browser'].find(p=>spawnSync('which',[p],{stdio:'ignore'}).status===0);
 assert.ok(binary,'Installed browser required; no skipped UI evidence');
 const profile=mkdtempSync(join(tmpdir(),'mlivre-web-browser-'));
 chrome=spawn(binary,['--headless=new','--disable-background-networking','--disable-component-update','--no-first-run','--no-default-browser-check','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:['ignore','pipe','pipe']});
 const endpoint=await waitForBrowserEndpoint(chrome,profile,details=>console.error('WEB_BROWSER_STARTUP_DIAGNOSTIC '+JSON.stringify({scenario,diagnostic:diagnostic.mode,continuation,...details})));
 ws=new WebSocket(endpoint);await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',()=>reject(Error('Debugger connection failed')),{once:true});});
 ws.addEventListener('message',event=>{
  const m=JSON.parse(String(event.data));if(m.id){const p=pending.get(m.id);if(p){clearTimeout(p.timer);pending.delete(m.id);if(m.error){const error=Error('CDP command failed');error.code=m.error.code;error.protocolMessage=m.error.message;p.reject(error);}else p.resolve(m.result);}return;}
  if(m.method==='Runtime.bindingCalled'&&m.params.name==='mlivreFixtureFetchTrace')networkEvents.push(JSON.parse(m.params.payload));
  if(m.method==='Log.entryAdded'&&m.params.entry.source==='network')networkEvents.push({event:'browser-network-log',at:m.params.entry.timestamp,level:m.params.entry.level,text:m.params.entry.text.replace(/https?:\/\/[^\s'"<>]+/g,text=>{try{const u=new URL(text);return u.origin+u.pathname;}catch{return'[url omitted]';}}).replace(/Bearer\s+[^\s'"<>]+/gi,'Bearer [redacted]'),networkRequestId:m.params.entry.networkRequestId});
  if(m.method==='Network.requestWillBeSentExtraInfo'&&m.params.clientSecurityState){
   const s=m.params.clientSecurityState;
   networkEvents.push({event:'client-security-state',at:Date.now(),id:m.params.requestId,initiatorIPAddressSpace:s.initiatorIPAddressSpace,initiatorIsSecureContext:s.initiatorIsSecureContext,localNetworkAccessRequestPolicy:s.localNetworkAccessRequestPolicy});
  }
  if(m.method==='Network.responseReceivedExtraInfo'){
   const corsHeaders=Object.fromEntries(Object.entries(m.params.headers).filter(([key])=>/^access-control-/i.test(key)));
   if(Object.keys(corsHeaders).length||m.params.resourceIPAddressSpace)networkEvents.push({event:'response-extra',at:Date.now(),id:m.params.requestId,status:m.params.statusCode,corsHeaders,resourceIPAddressSpace:m.params.resourceIPAddressSpace});
  }
  if(m.method==='Page.frameNavigated'){const f=m.params.frame;if(!f.parentId){const u=new URL(f.url);networkEvents.push({event:'main-document',at:Date.now(),loaderId:f.loaderId,origin:u.origin,path:u.pathname});}}
  if(m.method==='Fetch.requestPaused'){
   const u=new URL(m.params.request.url),allowed=['data:','about:','blob:'].includes(u.protocol)||[api.origin,web.origin].includes(u.origin);
   if(!allowed)networkViolation='Non-local application request blocked: '+u.origin;
   const trace={event:'intercept',at:Date.now(),id:m.params.requestId,networkId:m.params.networkId,path:u.pathname,origin:u.origin,method:m.params.request.method,allowed,sessionMatches:m.sessionId===sessionId};networkEvents.push(trace);
   dispatchContinuation(allowed?'Fetch.continueRequest':'Fetch.failRequest',{requestId:m.params.requestId,...(!allowed?{errorReason:'BlockedByClient'}:{})}).then(()=>networkEvents.push({...trace,event:'intercept-ack',at:Date.now(),continuation})).catch(error=>{networkViolation='CDP guarded request continuation failed';networkEvents.push({...trace,event:'intercept-error',at:Date.now(),continuation,code:Number.isInteger(error.code)?error.code:null});});
  }
  if(m.method==='Network.requestWillBeSent'){
   if(m.params.redirectResponse){const u=new URL(m.params.redirectResponse.url);networkEvents.push({event:'redirect',at:Date.now(),id:m.params.requestId,status:m.params.redirectResponse.status,origin:u.origin,path:u.pathname});}
   const u=new URL(m.params.request.url);if(u.origin===api.origin){requestMethods.set(m.params.requestId,m.params.request.method);networkEvents.push({event:'request',at:Date.now(),id:m.params.requestId,loaderId:m.params.loaderId,type:m.params.type,path:u.pathname,method:m.params.request.method,headerNames:Object.keys(m.params.request.headers).map(x=>x.toLowerCase()).sort()});}
  }
  if(m.method==='Network.loadingFailed'&&requestMethods.has(m.params.requestId))networkEvents.push({event:'failed',id:m.params.requestId,method:requestMethods.get(m.params.requestId),errorText:m.params.errorText,blockedReason:m.params.blockedReason,corsErrorStatus:m.params.corsErrorStatus,canceled:m.params.canceled});
  if(m.method==='Network.responseReceived'){const u=new URL(m.params.response.url);if(u.origin===web.origin&&m.params.type==='Document')documentResponses.push({path:u.pathname,status:m.params.response.status,remoteIPAddress:m.params.response.remoteIPAddress,fromDiskCache:!!m.params.response.fromDiskCache,fromServiceWorker:!!m.params.response.fromServiceWorker});if(u.origin===api.origin){const h=m.params.response.headers;responses.push({path:u.pathname,status:m.params.response.status,method:requestMethods.get(m.params.requestId)});networkEvents.push({event:'response',id:m.params.requestId,path:u.pathname,status:m.params.response.status,method:requestMethods.get(m.params.requestId),corsHeaders:Object.fromEntries(Object.entries(h).filter(([key])=>/^access-control-/i.test(key)))});}}
 });
 const version=await cdp('Browser.getVersion',{},false);console.log('WEB_BROWSER_VERSION '+JSON.stringify({scenario,diagnostic:diagnostic.mode,continuation,product:version.product,protocolVersion:version.protocolVersion,jsVersion:version.jsVersion,revision:version.revision}));
 const target=await cdp('Target.createTarget',{url:'about:blank'},false);sessionId=(await cdp('Target.attachToTarget',{targetId:target.targetId,flatten:true},false)).sessionId;
 await cdp('Page.enable');await cdp('Runtime.enable');await cdp('Network.enable');
 if(diagnostic.log)await cdp('Log.enable');
 if(diagnostic.native){
  await cdp('Runtime.addBinding',{name:'mlivreFixtureFetchTrace'});
  await cdp('Page.addScriptToEvaluateOnNewDocument',{source:'('+observeNativeFetch.toString()+')('+JSON.stringify(api.origin)+',"mlivreFixtureFetchTrace")'});
 }
 await cdp('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});
 await cdp('Emulation.setDeviceMetricsOverride',{width:1365,height:900,deviceScaleFactor:1,mobile:false});
 await cdp('Emulation.setTimezoneOverride',{timezoneId:'UTC'});
 if(scenario==='minimal'){
  await cdp('Page.navigate',{url:new URL('/__mlivre_transport_fixture.html',web).href});
  await until('!!document.getElementById("transport-fixture")&&document.readyState==="complete"','minimal local fixture document');
  assert.equal(await evaluate('location.origin'),web.origin,'Minimal probe must retain the same real CORS origin');
  assert.equal(await evaluate('document.scripts.length'),0,'Minimal HTTP fixture must not run React/Next/application scripts');
  assert.equal(await evaluate('isSecureContext'),true,'No insecure-context or permission override is allowed');
  const documentResponse=requireLoopbackDocument(documentResponses);
  console.log('WEB_BROWSER_MINIMAL_CONTEXT '+JSON.stringify({scenario,diagnostic:diagnostic.mode,continuation,documentResponse,secureContext:true,appScripts:0}));
  const report=await evaluate('('+browserTransportProbe.toString()+')('+[api.origin,accounts[0].token,accounts[0].tenant,readPaths,'Transport team '+stamp].map(x=>JSON.stringify(x)).join(',')+')');
  console.log('WEB_BROWSER_MINIMAL_TRANSPORT_OBSERVED '+JSON.stringify({scenario,diagnostic:diagnostic.mode,continuation,...report}));
  assert.equal(report.failedStage,null,'Minimal native browser transport failed; no React/Next scripts run in this fixture document');
  const teams=await apiCall('/v1/company/teams',{token:accounts[0].token,tenant:accounts[0].tenant});
  assert.ok(teams.some(x=>x.id===report.teamId),'Minimal browser POST must really persist in the local API/Postgres');
  if(networkViolation)throw Error(networkViolation);
  console.log('WEB_BROWSER_MINIMAL_TRANSPORT_PASS '+JSON.stringify({scenario,diagnostic:diagnostic.mode,continuation,scope:'native browser + real local API/Postgres, explicitly not app UI evidence',tenantId:accounts[0].tenant,teamId:report.teamId,rows:report.rows}));return;
 }
 await cdp('Page.navigate',{url:web.href});
 await until('!!document.querySelector("input[name=email]")','login render');
 await capture('login');
 await signin(accounts[0].email,'WrongFixture123!');
 await until('!!document.querySelector("[role=alert]")&&!document.querySelector("form button").disabled','invalid login feedback');
 assert.ok(responses.some(x=>x.path==='/v1/auth/signin'&&x.status===401),'Actual401 required');
 await signin(accounts[0].email);await dashboard(accounts[0].email);
 assert.ok(await evaluate('document.body.innerText.includes("Nenhuma vaga cadastrada.")'),'Empty jobs state');
 const teamName='Browser team '+stamp,jobTitle='Browser job '+stamp;
 await fill('input[name=name]',teamName);
 const card=title=>'Array.from(document.querySelectorAll("article")).find(x=>x.querySelector("h2")?.textContent==='+JSON.stringify(title)+')';
 await click(card('Nova equipe')+'.querySelector("form button")');
 await until('Array.from(document.querySelectorAll("option")).some(x=>x.textContent.includes('+JSON.stringify(teamName)+'))','created team rendered');
 const start=new Date(Date.now()+86400000).toISOString().slice(0,16),end=new Date(Date.now()+115200000).toISOString().slice(0,16);
 for(const [name,value] of Object.entries({title:jobTitle,requiredRole:'Garçom',location:'Fixture local',workCity:'São Paulo',payReais:'123.45'}))await fill('input[name='+name+']',value);
 for(const [name,value] of Object.entries({startsAt:start,endsAt:end}))await evaluate('(()=>{const e=document.querySelector('+JSON.stringify('input[name='+name+']')+');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value").set.call(e,'+JSON.stringify(value)+');e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}))})()');
 await click(card('Nova vaga')+'.querySelector("form button")');
 await until('Array.from(document.querySelectorAll("td")).some(x=>x.textContent==='+JSON.stringify(jobTitle)+')','created job rendered');
 const jobs=await apiCall('/v1/company/jobs',{token:accounts[0].token,tenant:accounts[0].tenant});
 const teams=await apiCall('/v1/company/teams',{token:accounts[0].token,tenant:accounts[0].tenant});
 const job=jobs.find(x=>x.title===jobTitle),team=teams.find(x=>(x.name||x.displayName)===teamName);
 assert.ok(job?.id&&team?.id,'Real persisted job/team required');assert.equal(job.payCents,12345);assert.equal(job.startsAt,new Date(start+'Z').toISOString());assert.equal(job.endsAt,new Date(end+'Z').toISOString());
 await dashboard(accounts[0].email);await capture('company-a-created');
 const signinCount=responses.filter(x=>x.path==='/v1/auth/signin').length;
 for(let refresh=1;refresh<=5;refresh++){
  const from=responses.length,posts=responses.filter(x=>x.method==='POST').length;
  console.log('WEB_BROWSER_REFRESH_START '+JSON.stringify({refresh}));
  await click('Array.from(document.querySelectorAll("button")).find(x=>x.textContent==="Atualizar dados")');
  await waitForReadWave(from,readPaths);await dashboard(accounts[0].email);
  assert.ok(await evaluate('document.body.innerText.includes('+JSON.stringify(jobTitle)+')'),'Refresh lost persisted own job');
  assert.equal(responses.filter(x=>x.method==='POST').length,posts,'Explicit refresh must not emit mutation or signin retry');
  console.log('WEB_BROWSER_REFRESH_PASS '+JSON.stringify({refresh,actualGet200Paths:readPaths.length}));
 }
 for(let reload=1;reload<=5;reload++){
  console.log('WEB_BROWSER_RELOAD_START '+JSON.stringify({reload}));
  const{previousTimeOrigin,currentTimeOrigin}=await reloadDocument();
  await dashboard(accounts[0].email);
  assert.notEqual(currentTimeOrigin,previousTimeOrigin,'Reload assertion must observe a new document, not the previous dashboard DOM');
  assert.ok(await evaluate('document.body.innerText.includes('+JSON.stringify(jobTitle)+')'),'Reload lost persisted own data');
  assert.equal(responses.filter(x=>x.path==='/v1/auth/signin').length,signinCount,'Reload must reuse tab session, not invent signin retry');
  console.log('WEB_BROWSER_RELOAD_PASS '+JSON.stringify({reload,previousTimeOrigin,currentTimeOrigin}));
 }
 const browserToken=await evaluate('JSON.parse(sessionStorage.getItem("mlivre:web:session")).accessToken');
 assert.ok(typeof browserToken==='string'&&browserToken.length>0&&browserToken!==accounts[0].token,'Browser session must be distinct from fixture session');
 await click('Array.from(document.querySelectorAll("button")).find(x=>x.textContent==="Sair")');
 await until('!!document.querySelector("input[name=email]")','local signout');
 await until('!document.body.innerText.includes('+JSON.stringify(jobTitle)+')','old tenant removed');
 await signin(accounts[1].email);await dashboard(accounts[1].email);
 assert.ok(await evaluate('document.body.innerText.includes("Nenhuma vaga cadastrada.")&&!document.body.innerText.includes('+JSON.stringify(jobTitle)+')&&!document.body.innerText.includes('+JSON.stringify(teamName)+')'),'Foreign identity data leaked into DOM');
 assert.deepEqual(await apiCall('/v1/company/jobs',{token:accounts[1].token,tenant:accounts[1].tenant}),[]);
 assert.deepEqual(await apiCall('/v1/company/teams',{token:accounts[1].token,tenant:accounts[1].tenant}),[]);
 await capture('company-b-isolated');
 assert.ok(responses.some(x=>x.path==='/v1/auth/signout'&&x.method==='POST'&&x.status===201),'Actual POST201 remote signout response required; OPTIONS204 is not acknowledgement');
 const revoked=await fetch(new URL('/v1/me',api),{headers:{authorization:'Bearer '+browserToken},signal:AbortSignal.timeout(15000)});
 assert.equal(revoked.status,401,'Explicit signout must revoke the actual browser bearer');await revoked.arrayBuffer();
 await apiCall('/v1/me',{token:accounts[0].token});
 if(networkViolation)throw Error(networkViolation);
 console.log('WEB_BROWSER_JOURNEY_PASS '+JSON.stringify({scenario,diagnostic:diagnostic.mode,continuation,scope:'actual headless Chrome DOM+local API/Postgres, not Android/physical/VisualTruth acceptance',fixtureTenants:accounts.map(x=>x.tenant),fixtureIdentities:accounts.map(x=>x.identity),jobId:job.id,teamId:team.id,revokedBrowserTokenStatus:revoked.status,otherSameIdentitySessionValid:true,captures,checks:['login401-feedback','login-success-empty','create-team-persisted-rendered','create-job-exact-money-dates-persisted-rendered','reload-tab-session','local-and-remote-signout','revoked-browser-token401-other-session-valid','second-identity-isolated','five-explicit-dashboard-refresh-waves'],apiResponses:responses}));
})().catch(async e=>{
 console.error('WEB_BROWSER_JOURNEY_FAIL '+JSON.stringify({scenario,diagnostic:diagnostic.mode,continuation,error:e.message}));
 if(ws&&sessionId){
  try{
   const state=await evaluate('({h1:document.querySelector("h1")?.textContent,alert:document.querySelector("[role=alert]")?.textContent,metricValues:Array.from(document.querySelectorAll(".metrics strong")).map(x=>x.textContent),bodyText:document.body.innerText.slice(0,1800)})');
   console.log('WEB_BROWSER_FAILURE_STATE '+JSON.stringify({scenario,diagnostic:diagnostic.mode,continuation,state,apiResponses:responses,networkViolation}));
   console.log('WEB_BROWSER_NETWORK_DIAGNOSTIC '+JSON.stringify({scenario,diagnostic:diagnostic.mode,continuation,events:networkEvents}));
   await capture('failure');
  }catch{console.error('WEB_BROWSER_FAILURE_STATE unavailable');}
 }
 process.exitCode=1;
}).finally(async()=>{
 for(const p of pending.values()){clearTimeout(p.timer);p.reject(Error('Browser closing'));}pending.clear();if(ws)ws.close();if(chrome){chrome.kill('SIGTERM');}
});






