const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const uuid=(x:unknown):x is string=>typeof x==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(x);
export function confirmsTeamMemberAddition(ack:unknown,teamId:string,professionalId:string):boolean{
 return record(ack)&&uuid(teamId)&&uuid(professionalId)&&ack.teamId===teamId&&ack.professionalId===professionalId;
}
export function confirmsTeamMemberRemoval(ack:unknown):boolean{return record(ack)&&ack.removed===true;}
