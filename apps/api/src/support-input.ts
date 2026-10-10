export type SupportInput={assignmentId:string|null;category:string;description:string;priority:string};
const categories=new Set(['schedule','payment','work_conditions','cancellation','dispute','other']);
const priorities=new Set(['normal','high','urgent']);
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
// Validate only the existing support contract. Assignment ownership is checked
// by the controller inside the actual tenant/RLS transaction, not inferred here.
export function supportCaseInput(value:unknown):SupportInput|null{
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const body=value as Record<string,unknown>;
 const description=typeof body.description==='string'?body.description.trim():'';
 const priority=body.priority??'normal';
 if(!description||Array.from(description).length>4000||typeof body.category!=='string'||!categories.has(body.category)||typeof priority!=='string'||!priorities.has(priority))return null;
 if(body.assignmentId!=null&&(typeof body.assignmentId!=='string'||!uuid.test(body.assignmentId)))return null;
 return {assignmentId:typeof body.assignmentId==='string'?body.assignmentId:null,category:body.category,description,priority};
}
