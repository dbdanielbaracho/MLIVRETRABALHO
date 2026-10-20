'use strict';
const assert=require('node:assert/strict');
const {spawn,spawnSync}=require('node:child_process');
const {mkdtempSync,readFileSync}=require('node:fs');
const vm=require('node:vm'),{stripTypeScriptTypes}=require('node:module');
const {tmpdir}=require('node:os');
const {join}=require('node:path');
const {randomUUID,createHash}=require('node:crypto');
const api=new URL(process.env.BROWSER_API_URL||'http://127.0.0.1:3002');
const web=new URL(process.env.BROWSER_WEB_URL||'http://127.0.0.1:3001');
for(const u of [api,web])assert.ok(u.protocol==='http:'&&['127.0.0.1','localhost'].includes(u.hostname)&&u.port&&u.pathname==='/'&&!u.username&&!u.password,'Local disposable origins required');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function actualWireValidator(){
 const clean=s=>stripTypeScriptTypes(s.replace(/import\s[^;]+;/g,''),{mode:'transform'}).replace(/\bexport\s+/g,'');
 return vm.runInNewContext(clean(readFileSync('apps/web/app/web-contract.ts','utf8'))+'\n'+clean(readFileSync('apps/web/app/stored-session.ts','utf8'))+'\nvalidateSigninCompanySession');
}
const validateActualSignin=actualWireValidator();
const password='BrowserFixture123!';
const stamp=Date.now()+'-'+randomUUID().slice(0,8);
let chrome,ws,sessionId,commandId=0,networkViolation;
const pending=new Map(),responses=[],captures=[];
const requestMethods=new Map(),apiPostRequests=[];let teamReadFault=null;
const requestMetadata=new Map(),readFailures=[];
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
 captures.push({label,sha256,bytes:bytes.length});console.log('WEB_BROWSER_CAPTURE '+JSON.stringify({label,sha256,bytes:bytes.length,pngBase64:r.data}));
}
(async()=>{
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
 chrome=spawn(binary,['--headless=new','--disable-background-networking','--disable-component-update','--disable-dev-shm-usage','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:['ignore','pipe','pipe']});
 const endpoint=await waitForBrowserEndpoint(chrome,profile,details=>console.error('WEB_BROWSER_STARTUP_DIAGNOSTIC '+JSON.stringify(details)));
 ws=new WebSocket(endpoint);await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',()=>reject(Error('Debugger connection failed')),{once:true});});
 ws.addEventListener('message',event=>{
  const m=JSON.parse(String(event.data));if(m.id){const p=pending.get(m.id);if(p){clearTimeout(p.timer);pending.delete(m.id);m.error?p.reject(Error('CDP command failed')):p.resolve(m.result);}return;}
  if(m.method==='Fetch.requestPaused'){
   const u=new URL(m.params.request.url),allowed=['data:','about:','blob:'].includes(u.protocol)||[api.origin,web.origin].includes(u.origin);
   if(!allowed)networkViolation='Non-local application request blocked: '+u.origin;
   if(allowed&&teamReadFault&&u.origin===api.origin&&u.pathname==='/v1/company/teams'&&m.params.request.method==='GET'){
    if(teamReadFault.requestId)networkViolation='Unexpected duplicate teams read during single fault fixture';
    teamReadFault.requestId=m.params.requestId;return;
   }
   cdp(allowed?'Fetch.continueRequest':'Fetch.failRequest',{requestId:m.params.requestId,...(!allowed?{errorReason:'BlockedByClient'}:{})}).catch(()=>{});
  }
  if(m.method==='Network.requestWillBeSent'){
   requestMethods.set(m.params.requestId,m.params.request.method);
   const u=new URL(m.params.request.url);if(u.origin===api.origin){requestMetadata.set(m.params.requestId,{path:u.pathname,method:m.params.request.method});if(m.params.request.method==='POST')apiPostRequests.push({path:u.pathname});}
  }
  if(m.method==='Network.loadingFailed'&&requestMetadata.has(m.params.requestId))readFailures.push({...requestMetadata.get(m.params.requestId),error:/^net::ERR_[A-Z_]+$/.test(m.params.errorText)?m.params.errorText:'unclassified',canceled:m.params.canceled===true,corsError:/^[A-Za-z]+$/.test(m.params.corsErrorStatus?.corsError||'')?m.params.corsErrorStatus.corsError:null});
  if(m.method==='Network.responseReceived'){const u=new URL(m.params.response.url);if(u.origin===api.origin)responses.push({path:u.pathname,status:m.params.response.status,method:requestMethods.get(m.params.requestId)});}
 });
 const version=await cdp('Browser.getVersion',{},false);console.log('WEB_BROWSER_VERSION '+JSON.stringify({product:version.product,protocolVersion:version.protocolVersion,jsVersion:version.jsVersion,revision:version.revision}));
 const target=await cdp('Target.createTarget',{url:'about:blank'},false);sessionId=(await cdp('Target.attachToTarget',{targetId:target.targetId,flatten:true},false)).sessionId;
 await cdp('Page.enable');await cdp('Runtime.enable');await cdp('Network.enable');
 await cdp('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});
 await cdp('Emulation.setDeviceMetricsOverride',{width:1365,height:900,deviceScaleFactor:1,mobile:false});
 await cdp('Emulation.setTimezoneOverride',{timezoneId:'UTC'});
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
 // Inject exactly one local read failure, never a mutation or an external request.
 // All other sections must complete against the real disposable API/Postgres.
 const refreshButton='Array.from(document.querySelectorAll("button")).find(x=>x.textContent==="Atualizar dados")';
 const teamCount=card('Equipes')+'.querySelector("b").textContent';
 const noDataWrites=()=>apiPostRequests.length;
 const beforeFault=responses.length,postsBeforeFault=noDataWrites();teamReadFault={requestId:null};
 await click(refreshButton);
 await until(teamCount+'==="—"&&Array.from(document.querySelectorAll(".tableCard")).filter(x=>["Vagas","Assignments ativos","Substituições","Concluídos recentes","Planner"].includes(x.querySelector("h2")?.textContent)).every(x=>x.innerText.includes("Carregando dados…"))','pending reads are not zero or empty');
 const faultWait=Date.now()+10000;while(!teamReadFault.requestId&&Date.now()<faultWait)await sleep(20);
 assert.ok(teamReadFault.requestId,'Exactly one local teams GET must reach the fault fixture');
 await cdp('Fetch.fulfillRequest',{requestId:teamReadFault.requestId,responseCode:503,responseHeaders:[{name:'content-type',value:'application/json'},{name:'access-control-allow-origin',value:web.origin},{name:'cache-control',value:'no-store'}],body:Buffer.from('{"fixture":"teams-read-unavailable"}').toString('base64')});teamReadFault=null;
 console.log('WEB_SECTION_FAULT_CDP_ACCEPTED '+JSON.stringify({method:'GET',path:'/v1/company/teams',injectedStatus:503,meaning:'CDP accepted fixture response, not proof browser consumed HTTP503'}));
 await until(teamCount+'==="—"&&document.querySelector("[role=alert]")?.textContent.startsWith("1 seção")&&!document.body.innerText.includes("Atualizando dados…")&&Array.from(document.querySelectorAll("td")).some(x=>x.textContent==='+JSON.stringify(jobTitle)+')','one unavailable read preserves other real sections');
 const faultResponses=responses.slice(beforeFault),otherReadPaths=new Set(faultResponses.filter(x=>x.method==='GET'&&x.status===200&&x.path!=='/v1/company/teams').map(x=>x.path));
 assert.equal(otherReadPaths.size,11,'Eleven distinct real API reads must succeed');assert.equal(faultResponses.filter(x=>x.method==='GET'&&x.path==='/v1/company/teams'&&x.status===503).length,1);assert.equal(noDataWrites(),postsBeforeFault,'Read failure must not cause a mutation retry');
 await capture('company-a-team-read-unavailable');
 const beforeRecovery=responses.length;await click(refreshButton);await dashboard(accounts[0].email);
 await until(teamCount+'==="1"','explicit refresh recovers the real team count');
 assert.equal(new Set(responses.slice(beforeRecovery).filter(x=>x.method==='GET'&&x.status===200).map(x=>x.path)).size,12,'Recovery requires twelve new real API reads');assert.equal(noDataWrites(),postsBeforeFault);
 assert.ok(await evaluate('document.body.innerText.includes('+JSON.stringify(jobTitle)+')'),'Read recovery must preserve the actual persisted job');await capture('company-a-team-read-recovered');
 console.log('WEB_SECTION_AVAILABILITY_BROWSER_PASS '+JSON.stringify({injection:'one local teams GET503; not a real outage',loadingUnknown:true,unavailableCount:'—',otherRealReadCount:otherReadPaths.size,recoveredRealTeamCount:1,newRecoveryReads:12,extraPosts:0}));
 const signinCount=responses.filter(x=>x.path==='/v1/auth/signin').length;
 const previousTimeOrigin=await evaluate('performance.timeOrigin');
 await cdp('Page.reload',{ignoreCache:true});await until('performance.timeOrigin!=='+JSON.stringify(previousTimeOrigin)+'&&document.readyState==="complete"','new reload document complete');await dashboard(accounts[0].email);
 assert.ok(await evaluate('document.body.innerText.includes('+JSON.stringify(jobTitle)+')'),'Reload lost persisted own data');
 assert.equal(responses.filter(x=>x.path==='/v1/auth/signin').length,signinCount,'Reload must reuse tab session, not invent signin retry');
 const browserToken=await evaluate('JSON.parse(sessionStorage.getItem("mlivre:web:session")).accessToken');
 assert.ok(typeof browserToken==='string'&&browserToken.length>0&&browserToken!==accounts[0].token,'Browser session must be distinct from fixture session');
 await click('Array.from(document.querySelectorAll("button")).find(x=>x.textContent==="Sair")');
 await until('!!document.querySelector("input[name=email]")','local signout');
 const signoutDeadline=Date.now()+20000;while(!responses.some(x=>x.path==='/v1/auth/signout'&&x.method==='POST'&&x.status===201)&&Date.now()<signoutDeadline)await sleep(100);
 assert.ok(responses.some(x=>x.path==='/v1/auth/signout'&&x.method==='POST'&&x.status===201),'Actual POST201 signout required; OPTIONS204 is not an ACK');
 await until('!document.body.innerText.includes('+JSON.stringify(jobTitle)+')','old tenant removed');
 await signin(accounts[1].email);await dashboard(accounts[1].email);
 assert.ok(await evaluate('document.body.innerText.includes("Nenhuma vaga cadastrada.")&&!document.body.innerText.includes('+JSON.stringify(jobTitle)+')&&!document.body.innerText.includes('+JSON.stringify(teamName)+')'),'Foreign identity data leaked into DOM');
 assert.deepEqual(await apiCall('/v1/company/jobs',{token:accounts[1].token,tenant:accounts[1].tenant}),[]);
 assert.deepEqual(await apiCall('/v1/company/teams',{token:accounts[1].token,tenant:accounts[1].tenant}),[]);
 await capture('company-b-isolated');
 assert.ok(responses.some(x=>x.path==='/v1/auth/signout'&&x.status>=200&&x.status<300),'Actual remote signout response required');
 const revoked=await fetch(new URL('/v1/me',api),{headers:{authorization:'Bearer '+browserToken},signal:AbortSignal.timeout(15000)});
 assert.equal(revoked.status,401,'Explicit signout must revoke the actual browser bearer');await revoked.arrayBuffer();
 await apiCall('/v1/me',{token:accounts[0].token});
 if(networkViolation)throw Error(networkViolation);
 console.log('WEB_BROWSER_JOURNEY_PASS '+JSON.stringify({scope:'actual headless Chrome DOM+local API/Postgres, not Android/physical/VisualTruth acceptance',fixtureTenants:accounts.map(x=>x.tenant),fixtureIdentities:accounts.map(x=>x.identity),jobId:job.id,teamId:team.id,revokedBrowserTokenStatus:revoked.status,otherSameIdentitySessionValid:true,captures,checks:['login401-feedback','login-success-empty','create-team-persisted-rendered','create-job-exact-money-dates-persisted-rendered','reload-tab-session','local-and-remote-signout','revoked-browser-token401-other-session-valid','second-identity-isolated'],apiResponses:responses}));
})().catch(async e=>{
 console.error('WEB_BROWSER_JOURNEY_FAIL '+e.message);
 if(ws&&sessionId){
  try{
   const state=await evaluate('({h1:document.querySelector("h1")?.textContent,alert:document.querySelector("[role=alert]")?.textContent,metricValues:Array.from(document.querySelectorAll(".metrics strong")).map(x=>x.textContent),bodyText:document.body.innerText.slice(0,1800)})');
   console.log('WEB_BROWSER_FAILURE_STATE '+JSON.stringify({state,apiResponses:responses,networkViolation,readFailures}));
   await capture('failure');
  }catch{console.error('WEB_BROWSER_FAILURE_STATE unavailable');}
 }
 process.exitCode=1;
}).finally(async()=>{
 for(const p of pending.values()){clearTimeout(p.timer);p.reject(Error('Browser closing'));}pending.clear();if(ws)ws.close();if(chrome){chrome.kill('SIGTERM');}
});

