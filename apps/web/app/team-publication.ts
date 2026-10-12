export type TeamPublication={status:'created';id:string}|{status:'rejected'|'unknown';httpStatus?:number};
type Request=(body:Record<string,unknown>)=>Promise<{ok:boolean;status:number;json():Promise<unknown>}>;
export async function publishCompanyTeam(request:Request,body:Record<string,unknown>):Promise<TeamPublication>{
 try{
  const r=await request(body);
  if(!r.ok)return {status:r.status>=400&&r.status<500?'rejected':'unknown',httpStatus:r.status};
  const d:unknown=await r.json(),name=typeof body.name==='string'?body.name.trim():'';
  return !!d&&typeof d==='object'&&!Array.isArray(d)&&typeof (d as Record<string,unknown>).id==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test((d as Record<string,unknown>).id as string)&&!!name&&(d as Record<string,unknown>).name===name?{status:'created',id:(d as Record<string,unknown>).id as string}:{status:'unknown'};
 }catch{return {status:'unknown'};}
}
