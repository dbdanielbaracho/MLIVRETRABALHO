export type WebRole='owner'|'admin'|'manager'|'company'|string;
export const companyRoles=['owner','admin','manager','company'];
export function isCompanyRole(role:string){return companyRoles.includes(role);}
export function isAdminRole(role?:string){return role==='owner'||role==='admin';}
export function tenantHeaders(accessToken:string,tenantId?:string){
 const headers:Record<string,string>={Authorization:`Bearer ${accessToken}`};
 if(tenantId)headers['x-tenant-id']=tenantId;
 return headers;
}
export function clearTenantData<T>(empty:T):T{return empty;}
