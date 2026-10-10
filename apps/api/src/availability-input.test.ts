import {test} from 'node:test';
import assert from 'node:assert/strict';
import {availabilityInput} from './availability-input';
const valid={startsAt:'2026-10-10T18:00:00-03:00',endsAt:'2026-10-11T01:00:00Z'};
test('availability accepts actual string timestamps and preserves original offsets literally',()=>{assert.deepEqual(availabilityInput({...valid,professionalId:'ignored',tenantId:'ignored'}),valid);});
test('availability rejects nonobject and nonstring timestamps instead of epoch coercion or trim crashes',()=>{
 for(const value of [null,undefined,[],42,{}, {...valid,startsAt:0},{...valid,startsAt:{}},{...valid,endsAt:42},{...valid,endsAt:null}])assert.equal(availabilityInput(value),null);
});
test('availability rejects malformed dates and empty strings',()=>{
 for(const key of ['startsAt','endsAt'])for(const value of ['',' ','bad-date'])assert.equal(availabilityInput({...valid,[key]:value}),null);
});
test('availability retains the existing positive interval rule across timezone offsets',()=>{
 assert.equal(availabilityInput({...valid,endsAt:'2026-10-10T21:00:00Z'}),null);
 assert.equal(availabilityInput({...valid,endsAt:'2026-10-10T20:00:00Z'}),null);
 assert.deepEqual(availabilityInput(valid),valid);
});
