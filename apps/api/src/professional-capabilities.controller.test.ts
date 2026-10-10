import {test} from 'node:test';
import assert from 'node:assert/strict';
import {ProfessionalCapabilitiesController} from './professional-capabilities.controller';
import type {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
const actualProfile='actual-profile',roleId='hospitality.bartender';
function fixture(){
 const calls:Array<{sql:string;values:unknown[]}>=[];
 const db={query:async(sql:string,values:unknown[]=[])=>{calls.push({sql,values});if(sql.startsWith('SELECT id FROM professional_profiles'))return {rows:[{id:actualProfile}]};if(sql.startsWith('SELECT skills,certifications'))return {rows:[{skills:['drink_preparation','guest_service'],certifications:['actual-cert']}]};return {rows:[{roleId,skills:values[2],certifications:values[3],provenLevel:values[4]}]};}};
 const auth={identityFromAuthorization:async()=>({id:'actual-identity'})};
 return {calls,db,auth,controller:new ProfessionalCapabilitiesController(db as unknown as DatabaseService,auth as unknown as AuthService)};
}
test('capability shape failure is HTTP400 before catalog/write, after actual authenticated profile lookup',async()=>{
 for(const body of [null,[],{skills:1},{skills:'drink_preparation'},{certifications:[null]},{provenLevel:0}]){
  const f=fixture();await assert.rejects(f.controller.put(roleId,body,'Bearer fixture'),(error:unknown)=>error instanceof Error&&'getStatus' in error&&(error as {getStatus():number}).getStatus()===400);
  assert.equal(f.calls.length,1);assert.deepEqual(f.calls[0]?.values,['actual-identity']);assert.equal(f.calls.some(c=>/INSERT|UPDATE|DELETE/.test(c.sql)),false);
 }
});
test('capability authentication precedes validation and unauthorized input cannot query another profile or catalog',async()=>{
 const f=fixture();f.auth.identityFromAuthorization=async()=>{throw Error('unauthorized')};
 await assert.rejects(f.controller.put(roleId,null,'Bearer invalid'),/unauthorized/);assert.equal(f.calls.length,0);
});
test('valid governed text role and exact deduplication bind only the real owner, ignoring injected profile ids',async()=>{
 const f=fixture(),result=await f.controller.put(roleId,{skills:['drink_preparation','drink_preparation'],certifications:['actual-cert'],provenLevel:'entry',professionalId:'someone-else'},'Bearer fixture');
 assert.deepEqual(result,{roleId,skills:['drink_preparation'],certifications:['actual-cert'],provenLevel:'entry'});
 assert.deepEqual(f.calls[1]?.values,[roleId]);assert.deepEqual(f.calls[2]?.values,[actualProfile,roleId,['drink_preparation'],['actual-cert'],'entry']);assert.match(f.calls[1]?.sql??'',/active=true/);
});
test('well-shaped but noncanonical skills and certifications still fail without insertion',async()=>{
 for(const body of [{skills:['not_in_catalog']},{certifications:['invented_certificate']}]){
  const f=fixture();await assert.rejects(f.controller.put(roleId,body,'Bearer fixture'),/noncanonical_capability/);assert.equal(f.calls.length,2);
 }
});
test('a real capability database failure cannot become an empty catalog or fabricated acknowledgement',async()=>{
 const f=fixture();f.db.query=async()=>{throw Error('database_offline')};
 await assert.rejects(f.controller.put(roleId,{skills:[]},'Bearer fixture'),/database_offline/);
});
