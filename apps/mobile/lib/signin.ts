export type SigninData={accessToken:string;tenantId:string|null};
export type SigninResult={status:'ready';data:SigninData}|{status:'invalid'|'unknown'|'rejected'|'limited'};
type Request=(path:string,body:{email:string;password:string})=>Promise<{ok:boolean;status:number;json():Promise<unknown>}>;
const record=(value:unknown):value is Record<string,unknown>=>!!value&&typeof value==='object'&&!Array.isArray(value);
const text=(value:unknown):value is string=>typeof value==='string'&&value.length>0;
const companyRoles=new Set(['owner','admin','manager','company']);
export async function signinAccount(request:Request,emailInput:string,password:string):Promise<SigninResult>{
 const email=emailInput.trim().toLowerCase();if(email.length<3||email.length>320||!email.includes('@')||/\s/.test(email)||!password||password.length>128)return {status:'invalid'};
 try{
  const response=await request('/auth/signin',{email,password});if(!response.ok)return {status:response.status===429?'limited':response.status>=400&&response.status<500?'rejected':'unknown'};
  const data:unknown=await response.json();if(!record(data)||!text(data.accessToken)||!record(data.identity)||!text(data.identity.id)||data.identity.email!==email||!Array.isArray(data.memberships)||!data.memberships.every(m=>record(m)&&text(m.tenant_id)&&text(m.role)))return {status:'unknown'};
  const company=data.memberships.find(m=>companyRoles.has(m.role));return {status:'ready',data:{accessToken:data.accessToken,tenantId:company?.tenant_id??null}};
 }catch{return {status:'unknown'};}
}
