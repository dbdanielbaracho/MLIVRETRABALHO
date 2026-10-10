export type SessionState={token:string|null;tenantId:string|null};
export type SessionAdapter={read():Promise<SessionState>;write(state:SessionState):Promise<void>};
export function createSessionQueue(){let tail:Promise<void>=Promise.resolve();return {run<T>(operation:()=>Promise<T>):Promise<T>{const result=tail.then(operation);tail=result.then(()=>undefined,()=>undefined);return result;}};}
// Called within the same queue as every session read/write. Rollback cannot erase
// a later queued login or logout. This does not promise atomic storage on OS crash.
export async function persistVerifiedSession(adapter:SessionAdapter,next:SessionState,expectedToken:string|null,isCurrent:()=>boolean):Promise<'saved'|'stale'|'failed'>{
 let previous:SessionState|undefined,wrote=false;
 try{
  previous=await adapter.read();if(previous.token!==expectedToken||!isCurrent())return 'stale';
  wrote=true;await adapter.write(next);const actual=await adapter.read();
  if(isCurrent()&&actual.token===next.token&&actual.tenantId===next.tenantId)return 'saved';
  await adapter.write(previous);return isCurrent()?'failed':'stale';
 }catch{if(wrote&&previous){try{await adapter.write(previous);}catch{/* Caller receives failure, never claimed persistence. */}}return 'failed';}
}
export async function clearExpectedSession(adapter:SessionAdapter,expectedToken:string|null):Promise<'cleared'|'stale'|'failed'>{
 try{const previous=await adapter.read();if(previous.token!==expectedToken)return 'stale';await adapter.write({token:null,tenantId:null});const actual=await adapter.read();return actual.token===null&&actual.tenantId===null?'cleared':'failed';}catch{return 'failed';}
}
// Membership acknowledgement may select a company only while its original
// token AND company selection still apply. Run within the shared session queue.
export async function persistExpectedTenant(adapter:SessionAdapter,tenantId:string,expected:SessionState,isCurrent:()=>boolean):Promise<'saved'|'stale'|'failed'>{
 if(!expected.token||!tenantId.trim())return 'failed';
 try{const current=await adapter.read();if(current.token!==expected.token||current.tenantId!==expected.tenantId||!isCurrent())return 'stale';return await persistVerifiedSession(adapter,{token:expected.token,tenantId},expected.token,isCurrent);}catch{return 'failed';}
}
