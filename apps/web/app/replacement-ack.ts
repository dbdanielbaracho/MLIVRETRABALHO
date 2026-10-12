const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const uuid=(x:unknown):x is string=>typeof x==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(x);
export function confirmsReplacementCreation(ack:unknown,assignmentId:string):ack is {id:string;assignmentId:string;status:'open'}{
 return record(ack)&&uuid(ack.id)&&uuid(assignmentId)&&ack.assignmentId===assignmentId&&ack.status==='open';
}
export function confirmsReplacementSelection(ack:unknown,replacementId:string,originalAssignmentId:unknown,professionalId:string):boolean{
 return record(ack)&&uuid(replacementId)&&uuid(originalAssignmentId)&&uuid(professionalId)&&ack.replacementRequestId===replacementId&&ack.replacedAssignmentId===originalAssignmentId&&ack.professionalId===professionalId&&uuid(ack.assignmentId)&&ack.assignmentId.toLowerCase()!==originalAssignmentId.toLowerCase()&&ack.status==='matched';
}
