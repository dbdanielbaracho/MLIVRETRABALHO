import test from 'node:test';
import assert from 'node:assert/strict';
import {ProfessionalPlannerController} from './professional-planner.controller';
import type {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
const tuesday={id:'tuesday',title:'Actual Tuesday fixture',requiredRole:'Bartender',startsAt:new Date('2026-10-13T12:00:00Z'),endsAt:new Date('2026-10-13T13:00:00Z'),payCents:10000,workCity:null};
const thursday={...tuesday,id:'thursday',title:'Actual Thursday fixture',startsAt:new Date('2026-10-15T12:00:00Z'),endsAt:new Date('2026-10-15T13:00:00Z')};
function fixture(rows:unknown[]=[tuesday,thursday]){
 const calls:Array<{sql:string;values:unknown[]}>=[];let hasProfile=true;
 const auth={identityFromAuthorization:async()=>({id:'actual-identity'})};
 const db={query:async(sql:string,values:unknown[]=[])=>{calls.push({sql,values});return {rows:sql.startsWith('SELECT id,')?(hasProfile?[{id:'actual-profile',primaryRole:'Bartender'}]:[]):rows};}};
 return {auth,db,calls,controller:new ProfessionalPlannerController(db as unknown as DatabaseService,auth as unknown as AuthService),setProfile:(v:boolean)=>{hasProfile=v}};
}
test('professional week keeps Date-valued Tuesday before Thursday instead of ordering weekday text',async()=>{
 const f=fixture(),rows=await f.controller.week('Bearer fixture');assert.deepEqual(rows.map((x:any)=>x.id),['tuesday','thursday']);assert.equal(rows[0]?.startsAt,tuesday.startsAt);assert.equal(rows[1]?.startsAt,thursday.startsAt);
});
test('professional week sorts timestamp instants rather than lexical local times with offsets',async()=>{
 const first={...tuesday,id:'first',startsAt:'2026-10-13T15:00:00+03:00',endsAt:'2026-10-13T15:30:00+03:00'},second={...tuesday,id:'second',startsAt:'2026-10-13T13:00:00Z',endsAt:'2026-10-13T13:30:00Z'};
 const f=fixture([first,second]),rows=await f.controller.week('Bearer fixture');assert.deepEqual(rows.map((x:any)=>x.id),['first','second']);assert.equal(rows[0]?.startsAt,first.startsAt);
});
test('professional week keeps actual profile binding, availability and existing role selection',async()=>{
 const f=fixture([tuesday,{...thursday,requiredRole:'Unrelated fixture occupation'}]),rows=await f.controller.week('Bearer fixture');assert.deepEqual(rows.map((x:any)=>x.id),['tuesday']);assert.equal(rows[0]?.score,100);
 assert.deepEqual(f.calls[0]?.values,['actual-identity']);assert.deepEqual(f.calls[1]?.values,['actual-profile']);assert.match(f.calls[1]?.sql??'',/pa.professional_id=\$1/);assert.match(f.calls[1]?.sql??'',/mj.status='open'/);assert.match(f.calls[1]?.sql??'',/ORDER BY mj.starts_at LIMIT 100/);
 assert.equal(f.calls.some(x=>/^(INSERT|UPDATE|DELETE)/.test(x.sql)),false);
});
test('unauthorized or missing-profile professional week cannot read marketplace candidates',async()=>{
 const f=fixture();f.auth.identityFromAuthorization=async()=>{throw Error('unauthorized')};await assert.rejects(f.controller.week('Bearer bad'),/unauthorized/);assert.equal(f.calls.length,0);
 const g=fixture();g.setProfile(false);await assert.rejects(g.controller.week('Bearer fixture'),/professional_profile_required/);assert.equal(g.calls.length,1);
});
test('professional week query failure does not fabricate an empty week',async()=>{
 const f=fixture();f.db.query=async()=>{throw Error('database_offline')};await assert.rejects(f.controller.week('Bearer fixture'),/database_offline/);
});
