'use strict';
// Passive CDP metadata collector. No commands, URLs, headers, bodies or causal verdicts.
function createLifecycleTrace({now=Date.now,maxEvents=4096,maxRequests=1024,maxContexts=256}={}){
 for(const n of [maxEvents,maxRequests,maxContexts])if(!Number.isSafeInteger(n)||n<1||n>65536)throw Error('Invalid trace bound');
 const events=[],requests=new Map(),contexts=new Map();let sequence=0,droppedEvents=0,evictedRequests=0,evictedContexts=0;
 const id=value=>typeof value==='string'&&value.length<=128&&/^[A-Za-z0-9_.:-]*$/.test(value)?value:null;
 const number=value=>typeof value==='number'&&Number.isFinite(value)&&value>=0?value:null;
 const contextId=value=>Number.isSafeInteger(value)&&value>=0?value:null;
 const put=(map,key,value,limit,evicted)=>{if(key===null)return;if(!map.has(key)&&map.size===limit){map.delete(map.keys().next().value);evicted();}map.set(key,value);};
 const push=row=>{const event={sequence:++sequence,receivedAtMs:number(now()),...row};if(events.length===maxEvents){events.shift();droppedEvents++;}events.push(event);};
 function observe(message,expectedSession){
  if(!expectedSession||message?.sessionId!==expectedSession)return;
  const p=message.params||{},method=message.method;
  if(method==='Network.requestWillBeSent'){
   const initiator=p.initiator||{},initiatorType=['parser','script','preload','SignedExchange','preflight','FedCM','other'].includes(initiator.type)?initiator.type:null;
   const requestId=id(p.requestId),binding={frameId:id(p.frameId),loaderId:id(p.loaderId),initiatorType,initiatorRequestId:initiatorType==='preflight'&&initiator.requestId!==''?id(initiator.requestId):null};
   put(requests,requestId,binding,maxRequests,()=>evictedRequests++);
   push({event:method,requestId,...binding,cdpMonotonicSeconds:number(p.timestamp),cdpWallSeconds:number(p.wallTime),redirect:p.redirectResponse!==undefined});return;
  }
  if(method==='Network.loadingFailed'||method==='Network.loadingFinished'){
   const requestId=id(p.requestId),binding=requests.get(requestId);
   push({event:method,requestId,requestBindingObserved:!!binding,frameId:binding?.frameId??null,loaderId:binding?.loaderId??null,initiatorType:binding?.initiatorType??null,initiatorRequestId:binding?.initiatorRequestId??null,cdpMonotonicSeconds:number(p.timestamp),...(method==='Network.loadingFailed'?{canceled:typeof p.canceled==='boolean'?p.canceled:null,netError:p.errorText==='net::ERR_ABORTED'?'net::ERR_ABORTED':'[other or missing]',hasBlockedReason:p.blockedReason!==undefined,hasCorsError:p.corsErrorStatus!==undefined}:{})});
   requests.delete(requestId);return;
  }
  if(method==='Page.frameNavigated'){
   const f=p.frame||{};push({event:method,frameId:id(f.id),parentFrameId:id(f.parentId),loaderId:id(f.loaderId)});return;
  }
  if(method==='Page.frameDetached'||method==='Page.frameStartedLoading'||method==='Page.frameStoppedLoading'){
   push({event:method,frameId:id(p.frameId),...(method==='Page.frameDetached'?{reason:['remove','swap'].includes(p.reason)?p.reason:null}:{})});return;
  }
  if(method==='Page.lifecycleEvent'){
   const names=['init','DOMContentLoaded','load','networkAlmostIdle','networkIdle','firstPaint','firstContentfulPaint','firstMeaningfulPaintCandidate','firstMeaningfulPaint'];
   push({event:method,frameId:id(p.frameId),loaderId:id(p.loaderId),name:names.includes(p.name)?p.name:'[other]',cdpMonotonicSeconds:number(p.timestamp)});return;
  }
  if(method==='Runtime.executionContextCreated'){
   const c=p.context||{},key=contextId(c.id),binding={frameId:id(c.auxData?.frameId),uniqueId:id(c.uniqueId)};
   put(contexts,key,binding,maxContexts,()=>evictedContexts++);
   push({event:method,contextId:key,...binding,isDefault:typeof c.auxData?.isDefault==='boolean'?c.auxData.isDefault:null});return;
  }
  if(method==='Runtime.executionContextDestroyed'){
   const key=contextId(p.executionContextId),uniqueId=id(p.executionContextUniqueId);
   // Numeric context IDs may be reused after process swaps. Never bind conflicting unique IDs.
   const prior=contexts.get(key),binding=prior&&(!uniqueId||!prior.uniqueId||prior.uniqueId===uniqueId)?prior:undefined;
   push({event:method,contextId:key,uniqueId,contextBindingObserved:!!binding,frameId:binding?.frameId??null});
   if(binding)contexts.delete(key);return;
  }
  if(method==='Runtime.executionContextsCleared'){push({event:method,knownContexts:contexts.size});contexts.clear();}
 }
 return{observe,snapshot:()=>({scope:'passive CDP metadata; received order is not causal order; no absence or root-cause verdict',clockDomains:{receivedAtMs:'host epoch milliseconds',cdpMonotonicSeconds:'browser monotonic seconds',cdpWallSeconds:'browser epoch seconds'},droppedEvents,evictedRequests,evictedContexts,pendingRequests:requests.size,knownContexts:contexts.size,events:events.map(row=>({...row}))})};
}
module.exports={createLifecycleTrace};
