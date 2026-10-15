import {isCompanyRole} from './web-contract.ts';

export type StoredMembership={tenantId:string;role:string;displayName?:string;slug?:string};
export type StoredSession={accessToken:string;identity:{id:string;email:string};memberships:StoredMembership[]};

export function readStoredCompanySession(raw:string|null):StoredSession|null{
  if(!raw)return null;
  try{
    const value:unknown=JSON.parse(raw);
    if(!value||typeof value!=='object'||Array.isArray(value))return null;
    const s=value as Record<string,unknown>;
    if(typeof s.accessToken!=='string'||!s.accessToken.trim())return null;
    if(!s.identity||typeof s.identity!=='object'||Array.isArray(s.identity))return null;
    const identity=s.identity as Record<string,unknown>;
    if(typeof identity.id!=='string'||!identity.id.trim()||typeof identity.email!=='string'||!identity.email.trim())return null;
    if(!Array.isArray(s.memberships))return null;
    const memberships:StoredMembership[]=[];
    const seenTenantIds=new Set<string>();
    for(const candidate of s.memberships){
      if(!candidate||typeof candidate!=='object'||Array.isArray(candidate))return null;
      const m=candidate as Record<string,unknown>;
      if(typeof m.tenantId!=='string'||!m.tenantId.trim()||typeof m.role!=='string'||!isCompanyRole(m.role))return null;
      if(m.displayName!==undefined&&typeof m.displayName!=='string')return null;
      if(m.slug!==undefined&&typeof m.slug!=='string')return null;
      if(seenTenantIds.has(m.tenantId))return null;
      seenTenantIds.add(m.tenantId);
      memberships.push({tenantId:m.tenantId,role:m.role,...(typeof m.displayName==='string'?{displayName:m.displayName}:{}),...(typeof m.slug==='string'?{slug:m.slug}:{})});
    }
    return memberships.length?{accessToken:s.accessToken,identity:{id:identity.id,email:identity.email},memberships}:null;
  }catch{return null}
}

export function validateSigninCompanySession(value:unknown):StoredSession|null{
  if(!value||typeof value!=='object'||Array.isArray(value))return null;
  const s=value as Record<string,unknown>;
  if(!Array.isArray(s.memberships))return null;
  const enterprise:unknown[]=[];
  for(const item of s.memberships){
    if(!item||typeof item!=='object'||Array.isArray(item))return null;
    const candidate=item as Record<string,unknown>;
    if(typeof candidate.role!=='string')return null;
    if(isCompanyRole(candidate.role)){
      const canonical=candidate.tenantId;const wire=candidate.tenant_id;
      if(canonical!==undefined&&wire!==undefined&&canonical!==wire)return null;
      enterprise.push({...candidate,tenantId:canonical!==undefined?canonical:wire});
    }
  }
  if(!enterprise.length)return null;
  return readStoredCompanySession(JSON.stringify({...s,memberships:enterprise}));
}
