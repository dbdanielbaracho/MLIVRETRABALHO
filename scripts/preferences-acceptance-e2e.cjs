'use strict';
const assert=require('node:assert/strict');
const {randomUUID}=require('node:crypto');
async function preferencesJourney({db,call,negative,pro,sub,owner,role}){
 const path='/v1/me/preferences',empty={configured:false,preferredRoleIds:[],preferredCities:[],revision:0,updatedAt:null};
 const input=(city,expectedRevision=0)=>({preferredRoleIds:[role.id],preferredCities:[city],expectedRevision});
 assert.deepEqual(await call(pro,'GET',path),empty);
 assert.equal((await db.query('SELECT count(*)::int n FROM professional_preferences WHERE identity_id=$1',[pro.id])).rows[0].n,0,'GET cannot create a record');
 await negative(owner,'GET',path,undefined,400);await negative(owner,'PUT',path,input('City'),400);
 const created=await Promise.all(['São Paulo','Campinas'].map(city=>call(pro,'PUT',path,input(city),[200,409])));
 const winner=created.filter(r=>r.configured===true);assert.equal(winner.length,1);
 assert.equal(created.filter(r=>r.message==='preferences_revision_conflict').length,1);assert.equal(winner[0].revision,1);
 assert.deepEqual(await call(pro,'GET',path),winner[0]);assert.deepEqual(await call(sub,'GET',path),empty);
 const updates=await Promise.all(['Recife','Curitiba'].map(city=>call(pro,'PUT',path,input(city,1),[200,409])));
 assert.equal(updates.filter(r=>r.configured===true).length,1);assert.equal(updates.filter(r=>r.message==='preferences_revision_conflict').length,1);
 const current=await call(pro,'GET',path);assert.equal(current.revision,2);
 const normalized=await call(pro,'PUT',path,{preferredRoleIds:[role.id,role.id],preferredCities:['  Sa\u0303o   Paulo ','SÃO PAULO','Sao Paulo'],expectedRevision:2});
 assert.deepEqual(normalized.preferredRoleIds,[role.id]);assert.deepEqual(normalized.preferredCities,['São Paulo','Sao Paulo']);assert.equal(normalized.revision,3);assert.ok(Number.isFinite(Date.parse(normalized.updatedAt)));
 for(const body of [null,[],{},input('x\ncity',3),{...input('City',3),identityId:sub.id},{...input('City',3),preferredRoleIds:['not.in.catalog']},{...input('City',3),preferredCities:Array(11).fill('City')},{...input('City',3),expectedRevision:0.5}])await negative(pro,'PUT',path,body,400);
 assert.deepEqual(await call(pro,'GET',path),normalized,'Invalid writes cannot alter the persisted choice');
 await negative(pro,'PUT',path,input('stale',2),409);
 const fault='preferences_fixture_'+randomUUID().replaceAll('-','');
 try{
  await db.query(`CREATE FUNCTION public.${fault}() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.identity_id='${pro.id}'::uuid THEN RAISE EXCEPTION 'synthetic_preferences_failure' USING ERRCODE='P0001'; END IF; RETURN NEW; END $$`);
  await db.query(`CREATE TRIGGER ${fault} BEFORE UPDATE ON professional_preferences FOR EACH ROW EXECUTE FUNCTION public.${fault}()`);
  await negative(pro,'PUT',path,input('Failed draft',3),500);
  assert.deepEqual(await call(pro,'GET',path),normalized,'Database failure must roll back revision and contents');
 }finally{await db.query(`DROP TRIGGER IF EXISTS ${fault} ON professional_preferences`);await db.query(`DROP FUNCTION IF EXISTS public.${fault}()`);}
 const cleared=await call(sub,'PUT',path,{preferredRoleIds:[],preferredCities:[],expectedRevision:0});
 assert.equal(cleared.configured,true);assert.equal(cleared.revision,1);assert.deepEqual(cleared.preferredCities,[]);assert.deepEqual(await call(sub,'GET',path),cleared);
 assert.deepEqual(await call({...pro,tenant:owner.tenant},'GET',path),normalized,'Tenant header cannot select a different owner');
 assert.equal((await db.query('SELECT count(*)::int n FROM professional_preferences WHERE identity_id=$1',[owner.id])).rows[0].n,0);
 const security=(await db.query("SELECT relrowsecurity,relforcerowsecurity FROM pg_class WHERE oid='professional_preferences'::regclass")).rows[0];assert.deepEqual(security,{relrowsecurity:true,relforcerowsecurity:true});
 await db.query('BEGIN');try{await db.query('SET LOCAL ROLE app_runtime');await db.query("SELECT set_config('app.tenant_id',$1,true)",[owner.tenant]);await assert.rejects(db.query('SELECT * FROM professional_preferences'),e=>e.code==='42501');}finally{await db.query('ROLLBACK');}
 console.log('PREFERENCES_IDENTITY_CAS_HTTP_PG_PASS '+JSON.stringify({actualHTTPPostgres:true,firstWriteRace:true,updateRace:true,distinctIdentity:true,companyHeaderCannotSelectOwner:true,tenantRuntimeDenied:true,rlsForced:true,normalizedACK:true,explicitEmpty:true,realDatabaseFailureRollback:true,automaticRetry:false,production:false}));
 const {configured,...exported}=normalized;return exported;
}
module.exports={preferencesJourney};
