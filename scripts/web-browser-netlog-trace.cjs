'use strict';
// Passive Chromium tracing only. Raw trace payloads are neither retained nor emitted.
const paths=new Set(['/v1/company/dashboard','/v1/company/analytics','/v1/company/planner','/v1/company/jobs','/v1/company/dashboard/assignments','/v1/company/dashboard/completed','/v1/company/teams','/v1/company/replacements','/v1/company/talent-pools','/v1/company/payment-events/reconciliation','/v1/company/safety-cases','/v1/company/safety-appeals','/v1/auth/signin','/v1/auth/signout']);
const names=new Set(['CANCELLED','FAILED','REQUEST_ALIVE','URL_REQUEST_START_JOB','URL_REQUEST_REDIRECTED','URL_REQUEST_REDIRECT_JOB','NETWORK_DELEGATE_BEFORE_START_TRANSACTION','NETWORK_DELEGATE_BEFORE_URL_REQUEST','NETWORK_DELEGATE_HEADERS_RECEIVED','URL_REQUEST_DELEGATE_CONNECTED','URL_REQUEST_DELEGATE_RESPONSE_STARTED','HTTP_TRANSACTION_SEND_REQUEST','HTTP_TRANSACTION_SEND_REQUEST_HEADERS','HTTP_TRANSACTION_READ_HEADERS','HTTP_TRANSACTION_READ_RESPONSE_HEADERS','HTTP_TRANSACTION_READ_BODY','HTTP_STREAM_REQUEST','HTTP_STREAM_JOB','CORS_REQUEST','CHECK_CORS_PREFLIGHT_REQUIRED','CORS_PREFLIGHT_URL_REQUEST','CORS_PREFLIGHT_RESULT','CORS_PREFLIGHT_CACHED_RESULT','CORS_PREFLIGHT_ERROR','LOCAL_NETWORK_ACCESS_CHECK','LOCAL_NETWORK_ACCESS_PERMISSION_REQUESTED']);
const integer=x=>Number.isSafeInteger(x)?x:null;
const number=x=>typeof x==='number'&&Number.isFinite(x)&&x>=0?x:null;
const traceId=x=>typeof x==='string'&&/^(?:0x)?[0-9a-fA-F]{1,32}$/.test(x)?x:integer(x);
function createNetLogTrace({apiOrigin,maxEvents=128,clock={setTimeout,clearTimeout}}={}){
 const origin=new URL(apiOrigin);
 if(origin.protocol!=='http:'||!['127.0.0.1','localhost'].includes(origin.hostname)||!origin.port||origin.origin!==apiOrigin)throw Error('Disposable loopback API origin required');
 if(!Number.isSafeInteger(maxEvents)||maxEvents<1||maxEvents>128)throw Error('Invalid NetLog event bound');
 const events=[];let received=0,droppedEvents=0,started=false,completed=false,dataLossOccurred=null;
 let finish;const complete=new Promise(resolve=>{finish=resolve;});
 const config={transferMode:'ReportEvents',traceConfig:{recordMode:'recordContinuously',traceBufferSizeInKb:16384,includedCategories:['netlog'],excludedCategories:['*']}};
 function observe(message){
  if(message.method==='Tracing.tracingComplete'){completed=true;dataLossOccurred=typeof message.params?.dataLossOccurred==='boolean'?message.params.dataLossOccurred:null;finish();return;}
  if(message.method!=='Tracing.dataCollected'||!Array.isArray(message.params?.value))return;
  for(const event of message.params.value){
   if(event?.cat!=='netlog')continue;
   received++;
   const params=event.args?.params||{},netError=integer(params.net_error);
   const name=names.has(event.name)?event.name:null;
   // Retain unknown error events only as an explicit unknown, never arbitrary text.
   if(!name&&netError===null)continue;
   let path=null;
   if(typeof params.url==='string'&&params.url.startsWith(apiOrigin)){
    const candidate=params.url.slice(apiOrigin.length);if(paths.has(candidate))path=candidate;
   }
   const phase=['B','E','b','e','n','I','i','X'].includes(event.ph)?event.ph:null;
   const row={sequence:received,name:name||'[other-error]',phase,traceMicroseconds:number(event.ts),pid:integer(event.pid),tid:integer(event.tid),id:traceId(event.id??event.id2?.local??event.id2?.global),netError,path,method:['GET','POST','OPTIONS','HEAD'].includes(params.method)?params.method:null,sourceDependencyId:integer(params.source_dependency?.id),sourceDependencyType:integer(params.source_dependency?.type)};
   if(events.length===maxEvents){events.shift();droppedEvents++;}events.push(row);
  }
 }
 return{
  observe,
  async start(cdp){await cdp('Tracing.start',config,false);started=true;},
  async stop(cdp){
   if(!started)return;
   await cdp('Tracing.end',{},false);
   let timer;
   try{await Promise.race([complete,new Promise((_,reject)=>{timer=clock.setTimeout(()=>reject(Error('NetLog tracing completion timeout')),15000);})]);}
   finally{if(timer!==undefined)clock.clearTimeout(timer);}
   if(dataLossOccurred===true)throw Error('Chromium NetLog trace data loss');
  },
  snapshot(){return{scope:'passive process-wide Chromium netlog; paths are fixed loopback fixtures; timestamps are trace microseconds, NOT host/CDP seconds; no inferred CDP request binding or root cause',started,completed,dataLossOccurred,received,droppedEvents,events:events.map(row=>({...row}))};}
 };
}
module.exports={createNetLogTrace};
