export type Publication={status:'created';id:string}|{status:'rejected'|'unknown';httpStatus?:number};
type Request=(body:Record<string,unknown>)=>Promise<{ok:boolean;status:number;json():Promise<unknown>}>;
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const nullableText=(x:unknown)=>typeof x==='string'?x.trim()||null:null;
export async function publishCompanyJob(request:Request,body:Record<string,unknown>):Promise<Publication>{
 try{
  const r=await request(body);
  if(!r.ok)return {status:r.status>=400&&r.status<500?'rejected':'unknown',httpStatus:r.status};
  const d:unknown=await r.json();
  const title=typeof body.title==='string'?body.title.trim():null;
  const starts=typeof body.startsAt==='string'?new Date(body.startsAt).getTime():NaN;
  const ends=typeof body.endsAt==='string'?new Date(body.endsAt).getTime():NaN;
  return record(d)&&typeof d.id==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(d.id)&&!!title&&d.title===title&&d.requiredRole===(nullableText(body.requiredRole)||title)&&d.location===nullableText(body.location)&&d.workCity===nullableText(body.workCity)&&d.status==='open'&&d.payCents===(body.payCents??0)&&d.engagementModality===(body.engagementModality??'gig')&&Number.isFinite(starts)&&Number.isFinite(ends)&&typeof d.startsAt==='string'&&typeof d.endsAt==='string'&&new Date(d.startsAt).getTime()===starts&&new Date(d.endsAt).getTime()===ends?{status:'created',id:d.id}:{status:'unknown'};
 }catch{return {status:'unknown'};}
}
