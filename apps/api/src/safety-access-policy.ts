const companyRoles=new Set(['owner','admin','manager','company']);
export function canAccessAssignmentSafetyCase(reporterIdentityId:string,professionalIdentityId:string,role?:string|null){
  return reporterIdentityId===professionalIdentityId || companyRoles.has(role??'');
}
