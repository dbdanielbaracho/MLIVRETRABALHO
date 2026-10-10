type Headers=Record<string,string>;
export type StartupResult={status:'ready';route:'/empresa-inicio'|'/profissional-inicio'}|{status:'signed_out'|'stale'|'error'};
// Each supplied read is a paired queued snapshot. Confirm both fields before
// choosing navigation; this is not server membership or role authorization.
export async function resolveStartupRoute(getHeaders:()=>Promise<Headers>,isCurrent:()=>boolean):Promise<StartupResult>{
 try{
  const origin={...await getHeaders()};if(!isCurrent())return {status:'stale'};
  const current=await getHeaders();
  if(!isCurrent()||current.Authorization!==origin.Authorization||current['x-tenant-id']!==origin['x-tenant-id'])return {status:'stale'};
  if(!origin.Authorization)return {status:'signed_out'};
  return {status:'ready',route:origin['x-tenant-id']?'/empresa-inicio':'/profissional-inicio'};
 }catch{return {status:isCurrent()?'error':'stale'};}
}
