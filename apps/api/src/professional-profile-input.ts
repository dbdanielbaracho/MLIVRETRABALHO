export type ProfessionalProfileInput={displayName:string;homeCity:string|null;primaryRole:string|null};
// Preserve the existing trim/null contract without adding size or role policy.
export function professionalProfileInput(value:unknown):ProfessionalProfileInput|null{
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const body=value as Record<string,unknown>;
 if(typeof body.displayName!=='string'||!body.displayName.trim())return null;
 for(const key of ['homeCity','primaryRole'])if(body[key]!=null&&typeof body[key]!=='string')return null;
 return {displayName:body.displayName.trim(),homeCity:typeof body.homeCity==='string'?body.homeCity.trim()||null:null,primaryRole:typeof body.primaryRole==='string'?body.primaryRole.trim()||null:null};
}
