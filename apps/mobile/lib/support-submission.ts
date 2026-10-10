import {pendingSupportIntent,supportPayload,supportAcknowledgement} from './support-intent';
import type {SupportIntent,SupportIntentResult,createSupportIntentStore} from './support-intent';
type Headers=Record<string,string>;
type Response={ok:boolean;json():Promise<unknown>};
type Transport=(path:string,options:{method:'GET'|'POST';headers:Headers;body?:string;signal:AbortSignal})=>Promise<Response>;
type Store=ReturnType<typeof createSupportIntentStore>;
export type SupportSubmissionResult={status:'empty';authorization:string}|{status:'pending'|'confirmed';record:SupportIntent;authorization:string}|{status:'error'|'invalid'|'unknown'|'stale'|'busy'};
type Options={getHeaders():Promise<Headers>;transport:Transport;store:Store;isCurrent():boolean;timeoutMs?:number};
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const keyUUID=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const object=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
export function createSupportSubmission(options:Options){
 let busy=false,active:AbortController|null=null;
 async function run(expectedAuthorization:string,work:(context:{authorization:string;identityId:string;guard():Promise<void>;request(path:string,method:'GET'|'POST',tenantId?:string,body?:unknown,key?:string):Promise<unknown>;markSent():void})=>Promise<SupportSubmissionResult>):Promise<SupportSubmissionResult>{
  if(busy)return {status:'busy'};
  busy=true;const controller=new AbortController();active=controller;let sent=false,expired=false;
  const stale=Error('stale_context');
  let timeout:ReturnType<typeof setTimeout>|undefined;
  const interrupted=new Promise<SupportSubmissionResult>(resolve=>{
   controller.signal.addEventListener('abort',()=>resolve({status:expired?(sent?'unknown':'error'):'stale'}),{once:true});
   timeout=setTimeout(()=>{expired=true;controller.abort();},typeof options.timeoutMs==='number'&&Number.isFinite(options.timeoutMs)&&options.timeoutMs>0&&options.timeoutMs<=15000?options.timeoutMs:15000);
  });
  const operation=(async():Promise<SupportSubmissionResult>=>{
   try{
    const headers=await options.getHeaders(),authorization=headers.Authorization;
    if(!options.isCurrent()||controller.signal.aborted||authorization!==expectedAuthorization)throw stale;
    if(!authorization||!authorization.startsWith('Bearer ')||!authorization.slice(7))return {status:'error'};
    const guard=async()=>{
     if(!options.isCurrent()||controller.signal.aborted)throw stale;
     const current=await options.getHeaders();
     if(!options.isCurrent()||controller.signal.aborted||current.Authorization!==authorization)throw stale;
    };
    const request=async(path:string,method:'GET'|'POST',tenantId?:string,body?:unknown,key?:string)=>{
     await guard();
     const response=await options.transport(path,{method,headers:{Authorization:authorization,...(tenantId?{'x-tenant-id':tenantId}:{}),...(body!==undefined?{'Content-Type':'application/json'}:{}),...(key?{'idempotency-key':key}:{})},...(body!==undefined?{body:JSON.stringify(body)}:{}),signal:controller.signal});
     await guard();if(!response.ok)throw Error('http_unconfirmed');
     const value=await response.json();await guard();return value;
    };
    const me=await request('/me','GET');
    if(!object(me)||typeof me.id!=='string'||!uuid.test(me.id))return {status:'error'};
    const identityId=me.id.toLowerCase();
    const result=await work({authorization,identityId,guard,request,markSent:()=>{sent=true;}});
    await guard();return result;
   }catch(error){
    if(error===stale||controller.signal.aborted||!options.isCurrent())return {status:expired?(sent?'unknown':'error'):'stale'};
    return {status:sent?'unknown':'error'};
   }
  })();
  try{return await Promise.race([operation,interrupted]);}
  finally{if(timeout!==undefined)clearTimeout(timeout);if(active===controller)active=null;busy=false;}
 }
 const display=(result:SupportIntentResult,authorization:string):SupportSubmissionResult=>{
  if(result.status==='failed')return {status:'error'};
  if(result.status==='empty')return {status:'empty',authorization};
  return {status:result.record.phase,record:result.record,authorization};
 };
 async function post(record:SupportIntent,context:Parameters<Parameters<typeof run>[1]>[0]):Promise<SupportSubmissionResult>{
  if(record.phase==='confirmed')return {status:'confirmed',record,authorization:context.authorization};
  await context.guard();context.markSent();
  const raw=await context.request('/support-cases','POST',record.tenantId,record.payload,record.requestKey);
  const ack=supportAcknowledgement(raw,record.payload);if(!ack)return {status:'unknown'};
  await context.guard();const result=await options.store.confirm(context.identityId,record.requestKey,ack);await context.guard();
  if(result.status==='failed'||result.status==='empty')return {status:'unknown'};
  if(result.record.phase!=='confirmed')return {status:'unknown'};
  return {status:'confirmed',record:result.record,authorization:context.authorization};
 }
 return {
  cancel(){active?.abort();},
  inspect(expectedAuthorization:string){return run(expectedAuthorization,async context=>{const result=await options.store.load(context.identityId);await context.guard();return display(result,context.authorization);});},
  sendNew(tenantId:string,assignmentId:string|null,value:unknown,expectedAuthorization:string):Promise<SupportSubmissionResult>{
   const payload=supportPayload(value);
   if(typeof tenantId!=='string'||!uuid.test(tenantId)||!payload||(assignmentId!==null&&(typeof assignmentId!=='string'||!uuid.test(assignmentId)))||payload.assignmentId!==(assignmentId===null?null:assignmentId.toLowerCase()))return Promise.resolve({status:'invalid'});
   return run(expectedAuthorization,async context=>{
    const previous=await options.store.load(context.identityId);await context.guard();
    if(previous.status!=='empty')return display(previous,context.authorization);
    const prepared=await context.request('/support-cases/intent','POST',tenantId.toLowerCase(),payload);
    if(!object(prepared)||typeof prepared.requestKey!=='string'||!keyUUID.test(prepared.requestKey)||typeof prepared.reporterIdentityId!=='string'||prepared.reporterIdentityId.toLowerCase()!==context.identityId)return {status:'error'};
    const candidate=pendingSupportIntent(context.identityId,tenantId,prepared.requestKey,payload);if(!candidate)return {status:'error'};
    await context.guard();const staged=await options.store.stage(candidate);await context.guard();
    if(staged.status!=='saved')return display(staged,context.authorization);
    return post(staged.record,context);
   });
  },
  retry(requestKey:string,expectedAuthorization:string){return run(expectedAuthorization,async context=>{
   const loaded=await options.store.load(context.identityId);await context.guard();
   if(loaded.status==='failed'||loaded.status==='empty')return {status:'error'};
   if(loaded.record.requestKey!==requestKey.toLowerCase())return {status:'error'};
   return post(loaded.record,context);
  });},
  releaseConfirmed(requestKey:string,expectedAuthorization:string){return run(expectedAuthorization,async context=>{
   const result=await options.store.releaseConfirmed(context.identityId,requestKey);await context.guard();return display(result,context.authorization);
  });}
 };
}
