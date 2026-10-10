import test from 'node:test';import assert from 'node:assert/strict';import {taxonomySearch,searchRoles} from './taxonomy';test('taxonomy is governed and searchable',()=>{const r=taxonomySearch('bartender');assert.equal(r.length,1);assert.equal(r[0]?.vertical,'hospitality');assert.ok(r[0]?.skills.includes('drink_preparation'))});
test('search retains opaque governed IDs and uses the supplied catalog rather than the static seed',()=>{
 const row={id:'governed.custom',vertical:'fixture',family:'service',role:'custom_role',specializations:[],skills:['custom_skill'],certifications:[]};
 assert.deepEqual(searchRoles([row],'  CUSTOM_SKILL  '),[row]);
 assert.deepEqual(searchRoles([row],'governed.custom'),[row]);
 assert.deepEqual(searchRoles([row],'bartender'),[]);
 assert.deepEqual(searchRoles([]),[]);
});
