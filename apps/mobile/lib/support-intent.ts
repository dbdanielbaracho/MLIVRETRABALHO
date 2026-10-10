export type SupportPayload={assignmentId:string|null;category:string;description:string;priority:string};
export type SupportAcknowledgement={id:string;category:string;priority:string;status:string;createdAt:string};
export type SupportIntent={version:1;reporterIdentityId:string;tenantId:string;requestKey:string;payload:SupportPayload;phase:'pending'}|{version:1;reporterIdentityId:string;tenantId:string;requestKey:string;payload:SupportPayload;phase:'confirmed';acknowledgement:SupportAcknowledgement};
export type SupportIntentAdapter={read(identityId:string):Promise<string|null>;write(identityId:string,value:string):Promise<void>;remove(identityId:string):Promise<void>};
export type SupportIntentResult={status:'saved'|'existing';record:SupportIntent}|{status:'empty'}|{status:'failed'};
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const categories=new Set(['schedule','payment','work_conditions','cancellation','dispute','other']);
const priorities=new Set(['normal','high','urgent']);
const object=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const id=(v:unknown):v is string=>typeof v==='string'&&uuid.test(v);
export function supportPayload(value:unknown):SupportPayload|null{
 if(!object(value))return null;
 const description=typeof value.description==='string'?value.description.trim():'',priority=value.priority??'normal';
 if(!description||Array.from(description).length>4000||typeof value.category!=='string'||!categories.has(value.category)||typeof priority!=='string'||!priorities.has(priority))return null;
 if(value.assignmentId!=null&&!id(value.assignmentId))return null;
 return {assignmentId:typeof value.assignmentId==='string'?value.assignmentId.toLowerCase():null,category:value.category,description,priority};
}
export function supportAcknowledgement(value:unknown,payload:SupportPayload):SupportAcknowledgement|null{
 if(!object(value)||!id(value.id)||value.category!==payload.category||value.priority!==payload.priority||typeof value.status!=='string'||!value.status.trim()||typeof value.createdAt!=='string'||!Number.isFinite(new Date(value.createdAt).getTime()))return null;
 return {id:value.id.toLowerCase(),category:payload.category,priority:payload.priority,status:value.status,createdAt:value.createdAt};
}
export function pendingSupportIntent(reporterIdentityId:unknown,tenantId:unknown,requestKey:unknown,value:unknown):SupportIntent|null{
 const payload=supportPayload(value);
 return id(reporterIdentityId)&&id(tenantId)&&id(requestKey)&&payload?{version:1,reporterIdentityId:reporterIdentityId.toLowerCase(),tenantId:tenantId.toLowerCase(),requestKey:requestKey.toLowerCase(),payload,phase:'pending'}:null;
}
function recordFromJSON(raw:string,identityId:string):SupportIntent{
 const value:unknown=JSON.parse(raw);
 if(!object(value)||value.version!==1)throw Error('support_intent_storage_invalid');
 const pending=pendingSupportIntent(value.reporterIdentityId,value.tenantId,value.requestKey,value.payload);
 if(!pending||pending.reporterIdentityId!==identityId||JSON.stringify(value.payload)!==JSON.stringify(pending.payload))throw Error('support_intent_storage_invalid');
 if(value.phase==='pending')return pending;
 if(value.phase!=='confirmed')throw Error('support_intent_storage_invalid');
 const acknowledgement=supportAcknowledgement(value.acknowledgement,pending.payload);
 if(!acknowledgement)throw Error('support_intent_storage_invalid');
 return {...pending,phase:'confirmed',acknowledgement};
}
// One shared store instance serializes every read/write/delete. This is a local
// durability barrier, not authentication; callers must verify identity via the API.
export function createSupportIntentStore(adapter:SupportIntentAdapter){
 let tail:Promise<void>=Promise.resolve();
 function queued<T>(work:()=>Promise<T>):Promise<T>{const result=tail.then(work);tail=result.then(()=>undefined,()=>undefined);return result;}
 async function read(identityId:string):Promise<SupportIntent|null>{
  const raw=await adapter.read(identityId);return raw===null?null:recordFromJSON(raw,identityId);
 }
 async function persist(record:SupportIntent):Promise<SupportIntentResult>{
  await adapter.write(record.reporterIdentityId,JSON.stringify(record));
  const actual=await read(record.reporterIdentityId);
  return actual&&JSON.stringify(actual)===JSON.stringify(record)?{status:'saved',record:actual}:{status:'failed'};
 }
 return {
  load(identity:unknown):Promise<SupportIntentResult>{return queued(async()=>{
   try{if(!id(identity))return {status:'failed'};const record=await read(identity.toLowerCase());return record?{status:'existing',record}:{status:'empty'};}catch{return {status:'failed'};}
  });},
  stage(candidate:unknown):Promise<SupportIntentResult>{return queued(async()=>{
   try{
    if(!object(candidate)||candidate.phase!=='pending'||candidate.version!==1)return {status:'failed'};
    const record=pendingSupportIntent(candidate.reporterIdentityId,candidate.tenantId,candidate.requestKey,candidate.payload);
    if(!record)return {status:'failed'};
    const existing=await read(record.reporterIdentityId);
    if(existing)return {status:'existing',record:existing};
    return await persist(record);
   }catch{return {status:'failed'};}
  });},
  confirm(identity:unknown,requestKey:unknown,value:unknown):Promise<SupportIntentResult>{return queued(async()=>{
   try{
    if(!id(identity)||!id(requestKey))return {status:'failed'};
    const existing=await read(identity.toLowerCase());
    if(!existing||existing.requestKey!==requestKey.toLowerCase())return {status:'failed'};
    const acknowledgement=supportAcknowledgement(value,existing.payload);
    if(!acknowledgement)return {status:'failed'};
    if(existing.phase==='confirmed')return acknowledgement.id===existing.acknowledgement.id?{status:'existing',record:existing}:{status:'failed'};
    return await persist({...existing,phase:'confirmed',acknowledgement});
   }catch{return {status:'failed'};}
  });},
  releaseConfirmed(identity:unknown,requestKey:unknown):Promise<SupportIntentResult>{return queued(async()=>{
   try{
    if(!id(identity)||!id(requestKey))return {status:'failed'};
    const existing=await read(identity.toLowerCase());
    if(!existing||existing.phase!=='confirmed'||existing.requestKey!==requestKey.toLowerCase())return {status:'failed'};
    await adapter.remove(existing.reporterIdentityId);
    return await adapter.read(existing.reporterIdentityId)===null?{status:'empty'}:{status:'failed'};
   }catch{return {status:'failed'};}
  });}
 };
}
