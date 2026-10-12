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
    for(const candidate of s.memberships){
      if(!candidate||typeof candidate!=='object'||Array.isArray(candidate))return null;
      const m=candidate as Record<string,unknown>;
      if(typeof m.tenantId!=='string'||!m.tenantId.trim()||typeof m.role!=='string'||!isCompanyRole(m.role))return null;
      if(m.displayName!==undefined&&typeof m.displayName!=='string')return null;
      if(m.slug!==undefined&&typeof m.slug!=='string')return null;
      memberships.push({tenantId:m.tenantId,role:m.role,...(typeof m.displayName==='string'?{displayName:m.displayName}:{}),...(typeof m.slug==='string'?{slug:m.slug}:{})});
    }
    return memberships.length?{accessToken:s.accessToken,identity:{id:identity.id,email:identity.email},memberships}:null;
  }catch{return null}
}
