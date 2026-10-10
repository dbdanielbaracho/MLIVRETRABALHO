export type SignupInput={email:string;password:string;accountType:'professional'|'company';workspaceName:string};
export type SignupBody={email:string;password:string;accountType:'professional'|'company';workspaceName?:string};
export type SignupResult={status:'created';id:string;tenantId?:string}|{status:'invalid'}|{status:'rejected';emailInUse:boolean}|{status:'unknown'};
type Request=(path:string,body:SignupBody)=>Promise<{ok:boolean;status:number;json():Promise<unknown>}>;
const record=(value:unknown):value is Record<string,unknown>=>!!value&&typeof value==='object'&&!Array.isArray(value);
const id=(value:unknown):value is string=>typeof value==='string'&&value.length>0;
export async function signupAccount(request:Request,input:SignupInput,isCurrent:()=>boolean=()=>true):Promise<SignupResult>{
 const email=input.email.trim().toLowerCase(),workspaceName=input.workspaceName.trim();
 if(email.length<3||email.length>320||!email.includes('@')||/\s/.test(email)||input.password.length<8||input.password.length>128||(input.accountType!=='professional'&&input.accountType!=='company')||(input.accountType==='company'&&(!workspaceName||workspaceName.length>120)))return {status:'invalid'};
 const body:SignupBody={email,password:input.password,accountType:input.accountType};if(input.accountType==='company')body.workspaceName=workspaceName;
 try{
  if(!isCurrent())return {status:'unknown'};const response=await request('/auth/signup',body);if(!isCurrent())return {status:'unknown'};
  if(!response.ok){if(response.status>=400&&response.status<500){let emailInUse=false;try{const error:unknown=await response.json();emailInUse=record(error)&&error.message==='email_in_use';}catch{/* Keep the actual HTTP rejection without inventing a reason. */}if(!isCurrent())return {status:'unknown'};return {status:'rejected',emailInUse};}return {status:'unknown'};}
  const data:unknown=await response.json();if(!isCurrent())return {status:'unknown'};
  if(!record(data)||!id(data.id)||data.email!==email||data.accountType!==input.accountType)return {status:'unknown'};
  if(input.accountType==='company')return id(data.tenantId)&&data.role==='owner'?{status:'created',id:data.id,tenantId:data.tenantId}:{status:'unknown'};
  return data.tenantId==null&&data.role==null?{status:'created',id:data.id}:{status:'unknown'};
 }catch{return {status:'unknown'};}
}
