import {test} from 'node:test';
import assert from 'node:assert/strict';
import {preferencesInput} from './preferences-input';
test('preferences normalize labels without inferring geographic equivalence and canonicalize roles',()=>{
 assert.deepEqual(preferencesInput({preferredRoleIds:['hospitality.waiter','hospitality.waiter'],preferredCities:['  Sa\u0303o   Paulo  ','SÃO PAULO','Sao Paulo'],expectedRevision:0}),{preferredRoleIds:['hospitality.waiter'],preferredCities:['São Paulo','Sao Paulo'],expectedRevision:0});
});
test('explicit empty preferences are a valid save, while missing lists are invalid',()=>{
 assert.deepEqual(preferencesInput({preferredRoleIds:[],preferredCities:[],expectedRevision:2}),{preferredRoleIds:[],preferredCities:[],expectedRevision:2});
 assert.equal(preferencesInput({expectedRevision:0}),null);
});
test('invalid shape, revision, limits, controls and ownership fields are rejected',()=>{
 const b={preferredRoleIds:[],preferredCities:[],expectedRevision:0};
 for(const x of [null,[],{}, {...b,identityId:'foreign'}, {...b,expectedRevision:-1},{...b,expectedRevision:0.5},{...b,expectedRevision:Number.MAX_SAFE_INTEGER+1},{...b,preferredRoleIds:['unknown role']},{...b,preferredRoleIds:Array(21).fill('role')},{...b,preferredCities:Array(11).fill('City')},{...b,preferredCities:[' ']},{...b,preferredCities:['city\nother']},{...b,preferredCities:['a\u200bb']},{...b,preferredCities:['😀'.repeat(101)]}])assert.equal(preferencesInput(x),null);
 assert.ok(preferencesInput({...b,preferredCities:['😀'.repeat(100)]}));
});
