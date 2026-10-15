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
 chrome=spawn(binary,['--headless=new','--disable-background-networking','--disable-component-update','--no-first-run','--no-default-browser-check','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:['ignore','ignore','pipe']});
 const endpoint=await new Promise((resolve,reject)=>{let out='';const timer=setTimeout(()=>{console.error('WEB_BROWSER_STARTUP_DIAGNOSTIC '+out.slice(-5000).replace(/DevTools listening on \S+/g,'DevTools endpoint omitted'));reject(Error('Browser startup timeout'));},15000);chrome.stderr.on('data',b=>{out+=b;const m=out.match(/DevTools listening on (ws:\/\/127\.0\.0\.1:[^\s]+)/);if(m){clearTimeout(timer);resolve(m[1]);}});chrome.once('error',reject);chrome.once('exit',()=>{clearTimeout(timer);reject(Error('Browser exited before debugger ready'));});});
 ws=new WebSocket(endpoint);await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',()=>reject(Error('Debugger connection failed')),{once:true});});
 ws.addEventListener('message',event=>{
  const m=JSON.parse(String(event.data));if(m.id){const p=pending.get(m.id);if(p){clearTimeout(p.timer);pending.delete(m.id);m.error?p.reject(Error('CDP command failed')):p.resolve(m.result);}return;}
  if(m.method==='Fetch.requestPaused'){
   const u=new URL(m.params.request.url),allowed=['data:','about:','blob:'].includes(u.protocol)||[api.origin,web.origin].includes(u.origin);
   if(!allowed)networkViolation='Non-local application request blocked: '+u.origin;
   cdp(allowed?'Fetch.continueRequest':'Fetch.failRequest',{requestId:m.params.requestId,...(!allowed?{errorReason:'BlockedByClient'}:{})}).catch(()=>{});
  }
  if(m.method==='Network.responseReceived'){const u=new URL(m.params.response.url);if(u.origin===api.origin)responses.push({path:u.pathname,status:m.params.response.status});}
 });
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
 const signinCount=responses.filter(x=>x.path==='/v1/auth/signin').length;
 await cdp('Page.reload',{ignoreCache:true});await dashboard(accounts[0].email);
 assert.ok(await evaluate('document.body.innerText.includes('+JSON.stringify(jobTitle)+')'),'Reload lost persisted own data');
 assert.equal(responses.filter(x=>x.path==='/v1/auth/signin').length,signinCount,'Reload must reuse tab session, not invent signin retry');
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
   console.log('WEB_BROWSER_FAILURE_STATE '+JSON.stringify({state,apiResponses:responses,networkViolation}));
   await capture('failure');
  }catch{console.error('WEB_BROWSER_FAILURE_STATE unavailable');}
 }
 process.exitCode=1;
}).finally(async()=>{
 for(const p of pending.values()){clearTimeout(p.timer);p.reject(Error('Browser closing'));}pending.clear();if(ws)ws.close();if(chrome){chrome.kill('SIGTERM');}
});
