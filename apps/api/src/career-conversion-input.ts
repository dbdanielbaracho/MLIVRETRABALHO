export type ConversionProposalInput={assignmentId:string;modality:'temp_to_hire'|'permanent';note:string|null};
const object=(value:unknown):value is Record<string,unknown>=>!!value&&typeof value==='object'&&!Array.isArray(value);
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const conversionId=(value:unknown):value is string=>typeof value==='string'&&uuid.test(value);
export function conversionProposalInput(value:unknown):ConversionProposalInput|null{
 if(!object(value)||!conversionId(value.assignmentId)||(value.modality!=='temp_to_hire'&&value.modality!=='permanent')||(value.note!=null&&typeof value.note!=='string'))return null;
 return {assignmentId:value.assignmentId,modality:value.modality,note:typeof value.note==='string'?value.note.trim()||null:null};
}
export function conversionDecisionInput(value:unknown):'accepted'|'declined'|null{
 if(!object(value))return null;
 return value.decision==='accepted'||value.decision==='declined'?value.decision:null;
}
