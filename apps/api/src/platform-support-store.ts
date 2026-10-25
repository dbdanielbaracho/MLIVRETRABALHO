import {randomUUID} from 'node:crypto';
import type {PoolClient} from 'pg';
import {platformSupportInput,platformSupportDigest} from './platform-support-input';
type Transactions={transaction<T>(work:(db:PoolClient)=>Promise<T>):Promise<T>};
export class PlatformSupportStore{
 constructor(private readonly database:Transactions){}
 protected owner<T>(identityId:string,work:(db:PoolClient)=>Promise<T>){return this.database.transaction(async db=>{
  await db.query("SELECT set_config('app.platform_support_identity',$1,true)",[identityId]);
  if(!(await db.query('SELECT id FROM identities WHERE id=$1 AND deactivated_at IS NULL FOR SHARE',[identityId])).rows[0])throw Error('platform_support_identity_required');
  return work(db);
 });}
 private async available(db:PoolClient){
  const capability=(await db.query('SELECT enabled FROM platform_support_capability WHERE singleton=true FOR SHARE')).rows[0];
  if(!capability?.enabled)throw Error('platform_support_unavailable');
  // Lock actual active operators/identities against revocation or deactivation during intake.
  const operators=await db.query('SELECT o.identity_id FROM platform_support_operators o JOIN identities i ON i.id=o.identity_id WHERE o.active AND i.deactivated_at IS NULL ORDER BY o.identity_id FOR SHARE OF o,i');
  if(!operators.rows.length)throw Error('platform_support_unavailable');
 }
 async prepare(identityId:string,value:unknown){
  const input=platformSupportInput(value);if(!input)throw Error('platform_support_input_invalid');
  return this.owner(identityId,async db=>{await this.available(db);return(await db.query('INSERT INTO platform_support_intents(request_key,owner_identity_id,payload_hash) VALUES($1,$2,$3) RETURNING request_key AS "requestKey",expires_at AS "expiresAt"',[randomUUID(),identityId,platformSupportDigest(input)])).rows[0];});
 }
 async submit(identityId:string,key:string,value:unknown){
  const input=platformSupportInput(value);if(!input)throw Error('platform_support_input_invalid');
  if(!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(key))throw Error('platform_support_not_found');
  return this.owner(identityId,async db=>{
   const intent=(await db.query('SELECT payload_hash,submitted_at,expires_at<=clock_timestamp() AS expired FROM platform_support_intents WHERE request_key=$1 AND owner_identity_id=$2 FOR UPDATE',[key,identityId])).rows[0];
   if(!intent)throw Error('platform_support_not_found');if(intent.expired)throw Error('platform_support_intent_expired');
   if(intent.payload_hash!==platformSupportDigest(input))throw Error('platform_support_payload_conflict');
   if(!intent.submitted_at){await this.available(db);
    await db.query('INSERT INTO platform_support_cases(id,owner_identity_id,category,description) VALUES($1,$2,$3,$4)',[key,identityId,input.category,input.description]);
    await db.query('INSERT INTO platform_support_audit(case_id,actor_identity_id,action) VALUES($1,$2,\'submitted\')',[key,identityId]);
    await db.query('UPDATE platform_support_intents SET submitted_at=now() WHERE request_key=$1 AND owner_identity_id=$2',[key,identityId]);
   }
   const row=(await db.query('SELECT id,category,status,created_at AS "createdAt" FROM platform_support_cases WHERE id=$1 AND owner_identity_id=$2',[key,identityId])).rows[0];
   if(!row)throw Error('platform_support_not_found');return row;
  });
 }
 async recover(identityId:string,key:string){
  if(!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(key))throw Error('platform_support_not_found');
  return this.owner(identityId,async db=>{
   const intent=(await db.query('SELECT submitted_at,expires_at<=clock_timestamp() AS expired FROM platform_support_intents WHERE request_key=$1 AND owner_identity_id=$2',[key,identityId])).rows[0];
   if(!intent)throw Error('platform_support_not_found');if(intent.expired)throw Error('platform_support_intent_expired');
   if(!intent.submitted_at)return {status:'prepared'};
   const row=(await db.query('SELECT id,category,status,created_at AS "createdAt" FROM platform_support_cases WHERE id=$1 AND owner_identity_id=$2',[key,identityId])).rows[0];
   if(!row)throw Error('platform_support_not_found');
   await db.query('INSERT INTO platform_support_audit(case_id,actor_identity_id,action) VALUES($1,$2,\'read\')',[key,identityId]);return row;
  });
 }
}
