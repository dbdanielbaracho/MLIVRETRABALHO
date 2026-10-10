export type ManualPrivacyType='correction'|'erasure'|'restriction'|'objection'|'consent_withdrawal'|'automated_decision_review'|'sharing_information'|'portability';
export type ActionRequest=(path:string,method:'GET'|'POST',body?:{requestType:ManualPrivacyType;details?:string})=>Promise<{ok:boolean;status:number;json():Promise<unknown>}>;
export type ActionFailure={status:'rejected'|'unknown';message?:string};
const record=(value:unknown):value is Record<string,unknown>=>!!value&&typeof value==='object'&&!Array.isArray(value);
const id=(value:unknown)=>typeof value==='string'&&value.length>0;
const date=(value:unknown)=>typeof value==='string'&&Number.isFinite(new Date(value).getTime());
const required=new Set<ManualPrivacyType>(['correction','restriction','objection','automated_decision_review']);
export function samePrivacySession(current:Record<string,string>,displayed:Record<string,string>):boolean{return !!displayed.Authorization&&current.Authorization===displayed.Authorization;}
async function rejected(response:{status:number;json():Promise<unknown>}):Promise<ActionFailure>{let message:string|undefined;try{const body:unknown=await response.json();if(record(body)&&typeof body.message==='string')message=body.message;}catch{/* Do not invent a server reason. */}return {status:response.status>=400&&response.status<500?'rejected':'unknown',message};}
export async function createPrivacyRequest(request:ActionRequest,requestType:ManualPrivacyType,details:string):Promise<{status:'created';requestId:string}|{status:'invalid';reason:'required'|'too_long'}|ActionFailure>{
 const value=details.trim();if(value.length>2000)return {status:'invalid',reason:'too_long'};if(required.has(requestType)&&!value)return {status:'invalid',reason:'required'};
 try{const response=await request('/privacy/requests','POST',{requestType,details:value||undefined});if(!response.ok)return rejected(response);const body:unknown=await response.json();return record(body)&&id(body.requestId)&&body.requestType===requestType&&body.status==='submitted'?{status:'created',requestId:body.requestId as string}:{status:'unknown'};}catch{return {status:'unknown'};}
}
export type PrivacyExport=Record<string,unknown>&{requestId:string;generatedAt:string;identity:Record<string,unknown>};
const tenantSections=['assignments','earnings','verifications','notifications','authoredMessages','ratingsReceived','ratingsAuthored','trustEvents','safetyReports','safetyRelated','appeals'];
function validExport(value:unknown):value is PrivacyExport {
 return record(value)&&id(value.requestId)&&date(value.generatedAt)&&record(value.identity)&&id(value.identity.id)&&typeof value.identity.email==='string'&&date(value.identity.createdAt)
  &&Array.isArray(value.memberships)&&value.memberships.every(item=>record(item)&&id(item.tenantId)&&typeof item.role==='string')
  &&(value.professionalProfile===null||record(value.professionalProfile))&&Array.isArray(value.availability)&&value.availability.every(record)
  &&tenantSections.every(key=>Array.isArray(value[key])&&(value[key] as unknown[]).every(item=>record(item)&&id(item.tenantId)&&(value.memberships as Record<string,unknown>[]).some(membership=>membership.tenantId===item.tenantId)))
  &&Array.isArray(value.privacyRequests)&&value.privacyRequests.every(item=>record(item)&&id(item.id)&&typeof item.requestType==='string'&&typeof item.status==='string'&&date(item.createdAt))
  &&record(value.notice)&&typeof value.notice.scope==='string'&&typeof value.notice.redaction==='string'&&Array.isArray(value.notice.excludes)&&value.notice.excludes.every(item=>typeof item==='string');
}
export async function exportPrivacyData(request:ActionRequest):Promise<{status:'generated';data:PrivacyExport}|ActionFailure>{try{const response=await request('/privacy/export','GET');if(!response.ok)return rejected(response);const body:unknown=await response.json();return validExport(body)?{status:'generated',data:body}:{status:'unknown'};}catch{return {status:'unknown'};}}
export async function deactivatePrivacyAccount(request:ActionRequest):Promise<{status:'deactivated';requestId:string}|ActionFailure>{try{const response=await request('/privacy/deactivate','POST');if(!response.ok)return rejected(response);const body:unknown=await response.json();return record(body)&&id(body.requestId)&&body.deactivated===true&&date(body.deactivatedAt)?{status:'deactivated',requestId:body.requestId as string}:{status:'unknown'};}catch{return {status:'unknown'};}}
