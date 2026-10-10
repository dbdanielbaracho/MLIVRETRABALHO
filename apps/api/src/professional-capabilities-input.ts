export type ProfessionalCapabilityInput={skills:string[];certifications:string[];provenLevel:string|null};
const levels=['entry','proven','advanced','expert'];
// Validate shape only; governed catalog membership remains the controller/database authority.
export function professionalCapabilityInput(value:unknown):ProfessionalCapabilityInput|null{
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const body=value as Record<string,unknown>,skills=body.skills??[],certifications=body.certifications??[],provenLevel=body.provenLevel??null;
 if(!Array.isArray(skills)||!skills.every(x=>typeof x==='string')||!Array.isArray(certifications)||!certifications.every(x=>typeof x==='string'))return null;
 if(provenLevel!==null&&(typeof provenLevel!=='string'||!levels.includes(provenLevel)))return null;
 return {skills:[...new Set(skills)],certifications:[...new Set(certifications)],provenLevel};
}
