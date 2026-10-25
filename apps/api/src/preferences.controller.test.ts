import {test} from 'node:test';
import assert from 'node:assert/strict';
import {PreferencesController} from './preferences.controller';
import type {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
function fixture(options:{authorized?:boolean;profile?:boolean;roles?:boolean;conflict?:boolean}={}){
 const calls:{sql:string;values:unknown[]}[]=[];let written=false;
 const row={preferredRoleIds:['hospitality.waiter'],preferredCities:['São Paulo'],revision:1,updatedAt:'2026-10-25T00:00:00.000Z'};
 const client={query:async(sql:string,values:unknown[])=>{calls.push({sql,values});if(sql.startsWith('SELECT id FROM identities'))return {rows:[{id:'owner'}]};if(sql.startsWith('SELECT id FROM professional_profiles'))return {rows:options.profile===false?[]:[{id:'profile'}]};if(sql.startsWith('SELECT id FROM taxonomy_roles'))return {rows:options.roles===false?[]:[{id:'hospitality.waiter'}]};if(sql.includes('INSERT INTO professional_preferences')){written=!options.conflict;return {rows:written?[row]:[]};}if(sql.startsWith('UPDATE'))return {rows:[]};return {rows:written?[row]:[]};}};
 const db={transaction:async(work:(c:unknown)=>unknown)=>work(client)};
 const auth={identityFromAuthorization:async()=>{if(options.authorized===false)throw Error('unauthorized');return{id:'owner'};}};
 return {controller:new PreferencesController(db as unknown as DatabaseService,auth as unknown as AuthService),calls,row};
}
const input={preferredRoleIds:['hospitality.waiter'],preferredCities:['São Paulo'],expectedRevision:0};
test('reads do not create preferences and distinguish absence from saved empty',async()=>{
 const h=fixture();assert.deepEqual(await h.controller.get('Bearer fixture'),{configured:false,preferredRoleIds:[],preferredCities:[],revision:0,updatedAt:null});assert.ok(h.calls.every(c=>!c.sql.includes('INSERT')));
});
test('authentication precedes malformed body and no database operation is attempted',async()=>{
 const h=fixture({authorized:false});await assert.rejects(h.controller.put(null));assert.equal(h.calls.length,0);
});
test('missing profile and inactive taxonomy prevent writes',async()=>{
 for(const options of [{profile:false},{roles:false}]){const h=fixture(options);await assert.rejects(h.controller.put(input));assert.ok(h.calls.every(c=>!c.sql.includes('INSERT')));}
});
test('save binds authenticated owner and expected revision, returning the actual database ACK',async()=>{
 const h=fixture();assert.deepEqual(await h.controller.put(input),{configured:true,...h.row});const call=h.calls.find(c=>c.sql.includes('INSERT INTO'));assert.deepEqual(call?.values,['owner',['hospitality.waiter'],['São Paulo'],0]);
});
test('a failed CAS is a conflict, never a successful save',async()=>{
 const h=fixture({conflict:true});await assert.rejects(h.controller.put(input),(e:unknown)=>e instanceof Error&&e.message==='preferences_revision_conflict');
});
