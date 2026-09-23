import test from 'node:test';import assert from 'node:assert/strict';import {cityDistanceKm} from './city-proximity';
test('same city is treated as near without precise location',()=>assert.equal(cityDistanceKm('São Paulo','sao paulo'),0));
test('unknown or different city does not invent distance',()=>{assert.equal(cityDistanceKm('São Paulo','Campinas'),undefined);assert.equal(cityDistanceKm(null,'Campinas'),undefined);});
