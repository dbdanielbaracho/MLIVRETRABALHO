type Headers=Record<string,string>;
export type SessionResult<T>={status:'ready';data:T;authorization:string}|{status:'stale'|'error'};
// Transport authority stays on the server. This only prevents an old operation
// from mixing/applying results after the displayed identity or focus changes.
export async function runForSession<T>(getHeaders:()=>Promise<Headers>,operation:(headers:Headers)=>Promise<T>,isCurrent:()=>boolean,expectedAuthorization?:string,expectedTenantId?:string):Promise<SessionResult<T>>{
 try{
  const headers=Object.freeze({...await getHeaders()}),authorization=headers.Authorization;
  if(!isCurrent())return {status:'stale'};
  if(!authorization)return {status:'error'};
  if(expectedAuthorization!==undefined&&authorization!==expectedAuthorization)return {status:'stale'};
  if(expectedTenantId!==undefined&&(!expectedTenantId.trim()||headers['x-tenant-id']!==expectedTenantId))return {status:'stale'};
  const data=await operation(headers);if(!isCurrent())return {status:'stale'};
  const current=await getHeaders();if(!isCurrent()||current.Authorization!==authorization||(expectedTenantId!==undefined&&current['x-tenant-id']!==expectedTenantId))return {status:'stale'};
  return {status:'ready',data,authorization};
 }catch{return {status:isCurrent()?'error':'stale'};}
}
