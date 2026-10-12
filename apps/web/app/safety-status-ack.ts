export type SafetyAcknowledgement={status:'confirmed';changed:boolean}|{status:'rejected'|'unknown';httpStatus?:number};
type Request=(body:Record<string,unknown>)=>Promise<{ok:boolean;status:number;json():Promise<unknown>}>;
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export async function confirmSafetyStatus(request:Request,id:string,body:Record<string,unknown>):Promise<SafetyAcknowledgement>{
 try{
  const r=await request(body);
  if(!r.ok)return {status:r.status>=400&&r.status<500?'rejected':'unknown',httpStatus:r.status};
  const ack:unknown=await r.json();
  return uuid.test(id)&&typeof body.status==='string'&&record(ack)&&ack.id===id&&ack.status===body.status&&typeof ack.changed==='boolean'?{status:'confirmed',changed:ack.changed}:{status:'unknown'};
 }catch{return {status:'unknown'};}
}
