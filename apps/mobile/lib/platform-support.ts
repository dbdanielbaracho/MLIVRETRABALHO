export const platformCategories=[['app_access','Acesso ao aplicativo'],['profile','Perfil'],['preferences','Preferências'],['notifications','Notificações'],['privacy','Privacidade'],['other','Outro assunto']] as const;
export type PlatformInput={category:string;description:string};
export type PlatformIntent={version:1;identityId:string;requestKey:string;category:string;expiresAt:string};
export type PlatformCase={id:string;category:string;status:string;createdAt:string;updatedAt?:string;closedAt?:string|null;description?:string|null;responses?:{id:string;body:string|null;createdAt:string;resolvesCase:boolean}[]};
export type PlatformPage={items:PlatformCase[];nextCursor:string|null;acceptingRequests:boolean};
const object=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const uuid=(x:unknown):x is string=>typeof x==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(x);
const category=(x:unknown):x is string=>typeof x==='string'&&platformCategories.some(c=>c[0]===x);
const date=(x:unknown):x is string=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(x)&&Number.isFinite(Date.parse(x))&&new Date(x).toISOString().slice(0,19)===x.slice(0,19);
export function platformInput(categoryValue:unknown,description:unknown):PlatformInput|null{
 if(!category(categoryValue)||typeof description!=='string'||description.includes('\0'))return null;
 const text=description.trim();if(!text||Array.from(text).length>4000)return null;
 for(const c of text){const n=c.codePointAt(0)!;if(n>=0xd800&&n<=0xdfff)return null;}
 return {category:categoryValue,description:text};
}
export function platformCase(x:unknown):PlatformCase|null{
 if(!object(x)||!uuid(x.id)||!category(x.category)||!['open','reviewing','resolved','withdrawn','expired'].includes(x.status as string)||!date(x.createdAt))return null;
 return {id:x.id.toLowerCase(),category:x.category,status:x.status as string,createdAt:x.createdAt};
}
export function platformDetail(x:unknown):PlatformCase|null{
 const header=platformCase(x);if(!header||!object(x)||!date(x.updatedAt)||!(x.closedAt===null||date(x.closedAt))||!(x.description===null||typeof x.description==='string')||!Array.isArray(x.responses))return null;
 if(!x.responses.every(r=>object(r)&&uuid(r.id)&&(r.body===null||typeof r.body==='string')&&date(r.createdAt)&&typeof r.resolvesCase==='boolean'))return null;
 return {...header,updatedAt:x.updatedAt,closedAt:x.closedAt as string|null,description:x.description as string|null,responses:x.responses.map(r=>({id:r.id as string,body:r.body as string|null,createdAt:r.createdAt as string,resolvesCase:r.resolvesCase as boolean}))};
}
export function platformPage(x:unknown):PlatformPage|null{
 if(!object(x)||!Array.isArray(x.items)||x.items.length>100||typeof x.acceptingRequests!=='boolean'||!(x.nextCursor===null||typeof x.nextCursor==='string'&&/^[A-Za-z0-9_-]{1,256}$/.test(x.nextCursor)))return null;
 const rows=x.items.map(platformCase);if(rows.some(x=>x===null)||new Set(rows.map(x=>x?.id)).size!==rows.length)return null;
 return {items:rows as PlatformCase[],nextCursor:x.nextCursor as string|null,acceptingRequests:x.acceptingRequests};
}
function intent(x:unknown):PlatformIntent|null{return object(x)&&x.version===1&&uuid(x.identityId)&&uuid(x.requestKey)&&category(x.category)&&date(x.expiresAt)?{version:1,identityId:x.identityId.toLowerCase(),requestKey:x.requestKey.toLowerCase(),category:x.category,expiresAt:x.expiresAt}:null;}
export function createPlatformIntentStore(adapter:{read(id:string):Promise<string|null>;write(id:string,raw:string):Promise<void>;remove(id:string):Promise<void>}){
 let tail:Promise<unknown>=Promise.resolve();
 function queue<T>(work:()=>Promise<T>):Promise<T>{const p=tail.then(work);tail=p.catch(()=>undefined);return p;}
 async function read(id:string){const raw=await adapter.read(id);if(raw===null)return null;const row=intent(JSON.parse(raw));if(!row||row.identityId!==id)throw Error('storage_invalid');return row;}
 return {
  load(id:string){return queue(()=>read(id));},
  stage(row:PlatformIntent){return queue(async()=>{const old=await read(row.identityId);if(old)return old;await adapter.write(row.identityId,JSON.stringify(row));const actual=await read(row.identityId);if(!actual||JSON.stringify(actual)!==JSON.stringify(row))throw Error('storage_unconfirmed');return actual;});},
  clear(id:string,key:string){return queue(async()=>{const row=await read(id);if(!row||row.requestKey!==key)throw Error('storage_changed');await adapter.remove(id);if(await adapter.read(id)!==null)throw Error('storage_unconfirmed');});}
 };
}
type Response={ok:boolean;status:number;json():Promise<unknown>};
type Options={getHeaders():Promise<Record<string,string>>;transport(path:string,init:{method:'GET'|'POST';headers:Record<string,string>;body?:string;signal:AbortSignal}):Promise<Response>;store:ReturnType<typeof createPlatformIntentStore>;isCurrent():boolean;timeoutMs?:number};
export type PlatformResult={status:'ready';identityId:string;page:PlatformPage}|{status:'prepared'|'unknown'|'conflict'|'expired';identityId:string;record:PlatformIntent}|{status:'confirmed';identityId:string;record:PlatformIntent;data:PlatformCase}|{status:'detail';identityId:string;data:PlatformCase}|{status:'withdrawn';identityId:string;id:string}|{status:'cleared';identityId:string}|{status:'error'|'session'|'stale'|'busy'|'invalid'|'unavailable'};
export function createPlatformSupportFlow(options:Options){
 let busy=false,active:AbortController|null=null,boundIdentity:string|null=null;
 async function run(work:(c:{id:string;request(path:string,method?:'GET'|'POST',body?:unknown,key?:string):Promise<Response>;guard():Promise<void>;pending(row:PlatformIntent):void})=>Promise<PlatformResult>,rebind=false):Promise<PlatformResult>{
  if(busy)return {status:'busy'};busy=true;
  const controller=new AbortController();active=controller;const pending:{current:PlatformIntent|null}={current:null};let timer:ReturnType<typeof setTimeout>|undefined,timedOut=false;
  const current=()=>options.isCurrent()&&!controller.signal.aborted;
  const interrupted=new Promise<PlatformResult>(resolve=>{controller.signal.addEventListener('abort',()=>resolve(timedOut?(pending.current?{status:'unknown',identityId:pending.current.identityId,record:pending.current}:{status:'error'}):{status:'stale'}),{once:true});timer=setTimeout(()=>{timedOut=true;controller.abort();},options.timeoutMs&&options.timeoutMs>0&&options.timeoutMs<=15000?options.timeoutMs:15000);});
  const operation=(async():Promise<PlatformResult>=>{
   try{
    const h=await options.getHeaders(),authorization=h.Authorization;if(!current())return {status:'stale'};if(!authorization)return {status:'session'};
    const guard=async()=>{if(!current())throw Error('stale');const latest=await options.getHeaders();if(!current()||latest.Authorization!==authorization)throw Error('stale');};
    const request=async(path:string,method:'GET'|'POST'='GET',body?:unknown,key?:string)=>{await guard();const r=await options.transport(path,{method,headers:{Authorization:authorization,...(body===undefined?{}:{'content-type':'application/json'}),...(key?{'idempotency-key':key}:{})},...(body===undefined?{}:{body:JSON.stringify(body)}),signal:controller.signal});await guard();return r;};
    const meResponse=await request('/me'),me:unknown=await meResponse.json();await guard();if(meResponse.status===401)return {status:'session'};if(!meResponse.ok||!object(me)||!uuid(me.id))return {status:'error'};
    const identityId=me.id.toLowerCase();if(rebind)boundIdentity=identityId;else if(boundIdentity!==identityId)return {status:'stale'};
    const result=await work({id:identityId,request,guard,pending:r=>{pending.current=r;}});await guard();return result;
   }catch(e){if(e instanceof Error&&e.message==='stale'||!current())return {status:'stale'};return pending.current?{status:'unknown',identityId:pending.current.identityId,record:pending.current}:{status:'error'};}
  })();
  try{return await Promise.race([operation,interrupted]);}finally{if(timer!==undefined)clearTimeout(timer);if(active===controller){active=null;busy=false;}}
 }
 type Context=Parameters<Parameters<typeof run>[0]>[0];
 const path='/me/platform-support';
 async function recover(c:Context,row:PlatformIntent):Promise<PlatformResult>{
  c.pending(row);const r=await c.request(path+'/recovery/'+row.requestKey),value:unknown=await r.json();await c.guard();
  if(r.status===401)return {status:'session'};
  if(r.ok&&object(value)&&value.status==='prepared')return {status:'prepared',identityId:c.id,record:row};
  const ack=r.ok?platformCase(value):null;if(ack&&ack.id===row.requestKey&&ack.category===row.category)return {status:'confirmed',identityId:c.id,record:row,data:ack};
  if(r.status===409||r.status===404){const d=await c.request(path+'/'+row.requestKey),v:unknown=await d.json();await c.guard();const detail=d.ok?platformDetail(v):null;if(detail&&detail.id===row.requestKey&&detail.category===row.category)return {status:'confirmed',identityId:c.id,record:row,data:detail};if(d.status===404&&Date.parse(row.expiresAt)<=Date.now())return {status:'expired',identityId:c.id,record:row};}
  return {status:'unknown',identityId:c.id,record:row};
 }
 async function post(c:Context,row:PlatformIntent,input:PlatformInput):Promise<PlatformResult>{
  c.pending(row);const r=await c.request(path,'POST',input,row.requestKey),value:unknown=await r.json();await c.guard();
  if(r.status===401)return {status:'session'};if(r.status===503)return {status:'unavailable'};if(r.status===409)return {status:'conflict',identityId:c.id,record:row};
  const ack=r.ok&&r.status===201?platformCase(value):null;return ack&&ack.id===row.requestKey&&ack.category===row.category?{status:'confirmed',identityId:c.id,record:row,data:ack}:{status:'unknown',identityId:c.id,record:row};
 }
 return {
  cancel(){const previous=active;active=null;busy=false;previous?.abort();},
  load(cursor?:string){return run(async c=>{const row=await options.store.load(c.id);await c.guard();if(row)return recover(c,row);const r=await c.request(path+(cursor?'?cursor='+encodeURIComponent(cursor):'')),v:unknown=await r.json();await c.guard();if(r.status===401)return {status:'session'};const page=r.ok?platformPage(v):null;return page?{status:'ready',identityId:c.id,page}:{status:'error'};},true);},
  send(categoryValue:string,description:string){const input=platformInput(categoryValue,description);if(!input)return Promise.resolve<PlatformResult>({status:'invalid'});return run(async c=>{
   const previous=await options.store.load(c.id);await c.guard();if(previous)return recover(c,previous);
   const r=await c.request(path+'/intent','POST',input),v:unknown=await r.json();await c.guard();if(r.status===401)return {status:'session'};if(r.status===503)return {status:'unavailable'};
   if(!r.ok||r.status!==201||!object(v)||!uuid(v.requestKey)||!date(v.expiresAt)||Date.parse(v.expiresAt)<=Date.now())return {status:'error'};
   const candidate:PlatformIntent={version:1,identityId:c.id,requestKey:v.requestKey.toLowerCase(),category:input.category,expiresAt:v.expiresAt};c.pending(candidate);
   const stored=await options.store.stage(candidate);await c.guard();if(stored.requestKey!==candidate.requestKey)return recover(c,stored);
   return post(c,stored,input);
  });},
  retry(description:string){return run(async c=>{const row=await options.store.load(c.id);await c.guard();if(!row)return {status:'error'};const known=await recover(c,row);if(known.status!=='prepared')return known;const input=platformInput(row.category,description);return input?post(c,row,input):{status:'invalid'};});},
  release(){return run(async c=>{const row=await options.store.load(c.id);await c.guard();if(!row)return {status:'error'};const known=await recover(c,row);if(known.status!=='confirmed'&&known.status!=='expired')return known;await options.store.clear(c.id,row.requestKey);await c.guard();return {status:'cleared',identityId:c.id};});},
  detail(id:string){return run(async c=>{if(!uuid(id))return {status:'invalid'};const r=await c.request(path+'/'+id),v:unknown=await r.json();await c.guard();if(r.status===401)return {status:'session'};const detail=r.ok?platformDetail(v):null;return detail&&detail.id===id?{status:'detail',identityId:c.id,data:detail}:{status:'error'};});},
  withdraw(id:string){return run(async c=>{if(!uuid(id))return {status:'invalid'};const r=await c.request(path+'/'+id+'/withdraw','POST'),v:unknown=await r.json();await c.guard();if(r.status===401)return {status:'session'};return r.ok&&r.status===201&&object(v)&&v.id===id&&v.status==='withdrawn'&&date(v.closedAt)?{status:'withdrawn',identityId:c.id,id}:{status:'error'};});}
 };
}
