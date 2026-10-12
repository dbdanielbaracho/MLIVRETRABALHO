const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const uuid=(x:unknown):x is string=>typeof x==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(x);
export function confirmsCandidateAssignment(ack:unknown,jobId:string,professionalId:string,tenantId:string):boolean{
 return record(ack)&&uuid(ack.id)&&uuid(jobId)&&uuid(professionalId)&&uuid(tenantId)&&ack.jobId===jobId&&ack.professionalId===professionalId&&ack.tenantId===tenantId&&ack.status==='confirmed';
}
export function confirmsTalentAddition(ack:unknown,professionalId:unknown,pool:unknown):boolean{
 return record(ack)&&uuid(professionalId)&&typeof pool==='string'&&ack.professionalId===professionalId&&ack.pool===pool;
}
export function confirmsTalentRemoval(ack:unknown):boolean{return record(ack)&&ack.removed===true;}
