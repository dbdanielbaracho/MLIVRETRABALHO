export type PrivacyRequest={id:string;requestType:string;requestDetails?:string|null;status:string;resolutionCode?:string|null;createdAt:string;completedAt?:string|null};
export type PrivacyRequestResult={status:'loading'}|{status:'error'}|{status:'ready';data:PrivacyRequest[]};
type Request=(path:string)=>Promise<{ok:boolean;json():Promise<unknown>}>;
const record=(value:unknown):value is Record<string,unknown>=>!!value&&typeof value==='object'&&!Array.isArray(value);
const types=new Set(['access','deactivation','correction','erasure','restriction','objection','consent_withdrawal','automated_decision_review','sharing_information','portability']);
const statuses=new Set(['submitted','reviewing','completed','partially_completed','rejected']);
const date=(value:unknown)=>typeof value==='string'&&Number.isFinite(new Date(value).getTime());
const text=(value:unknown)=>value==null||typeof value==='string';
function validRequest(value:unknown):value is PrivacyRequest{return record(value)&&typeof value.id==='string'&&value.id.length>0&&typeof value.requestType==='string'&&types.has(value.requestType)&&typeof value.status==='string'&&statuses.has(value.status)&&text(value.requestDetails)&&text(value.resolutionCode)&&date(value.createdAt)&&(value.completedAt==null||date(value.completedAt));}
export async function loadPrivacyRequests(request:Request):Promise<PrivacyRequestResult>{try{const response=await request('/privacy/requests');if(!response.ok)return {status:'error'};const data:unknown=await response.json();return Array.isArray(data)&&data.every(validRequest)?{status:'ready',data}:{status:'error'};}catch{return {status:'error'};}}
