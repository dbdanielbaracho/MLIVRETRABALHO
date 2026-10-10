import test from 'node:test';
import assert from 'node:assert/strict';
import {TaxonomyController} from './taxonomy.controller';
import type {DatabaseService} from './database.service';
const row={id:'cleaning.cleaner',vertical:'cleaning_facilities',family:'cleaning',role:'cleaner',specializations:['commercial'],skills:['sanitation'],certifications:[]};
function fixture(rows:typeof row[],error?:Error){
 const calls:string[]=[];
 const db={query:async(sql:string)=>{calls.push(sql);if(error)throw error;return {rows};}};
 return {controller:new TaxonomyController(db as unknown as DatabaseService),calls};
}
test('catalog reads active governed database records and preserves their real IDs and fields',async()=>{
 const f=fixture([row]);assert.deepEqual(await f.controller.roles(),[row]);
 assert.equal(f.calls.length,1);assert.match(f.calls[0]!,/FROM taxonomy_roles WHERE active=true/);
 assert.equal((await f.controller.roles())[0]?.id,'cleaning.cleaner');
});
test('catalog search reads current records and preserves IDs for capabilities, including new non-seed roles',async()=>{
 const current={...row,id:'catalog.new_role',role:'new_role',skills:['current_skill']};
 const f=fixture([row,current]);
 assert.deepEqual(await f.controller.roles('  CURRENT_SKILL  '),[current]);
 assert.deepEqual(await f.controller.roles('no_matching_role'),[]);
});
test('an empty catalog has no invented seed fallback',async()=>{
 assert.deepEqual(await fixture([]).controller.roles(),[]);
 assert.deepEqual(await fixture([]).controller.roles('bartender'),[]);
});
test('database errors are propagated without pretending the seed is current data',async()=>{
 await assert.rejects(fixture([],Error('catalog_unavailable')).controller.roles(),/catalog_unavailable/);
});
