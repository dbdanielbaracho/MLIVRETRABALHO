import test from 'node:test';import assert from 'node:assert/strict';import {roleFit} from './role-fit';
test('exact role match scores 1',()=>assert.equal(roleFit('Bartender','bartender'),1));
test('accent and punctuation normalize',()=>assert.equal(roleFit('Auxiliar de Cozinha','auxiliar de cozinha'),1));
test('partial required terms score proportionally',()=>assert.equal(roleFit('auxiliar cozinha','cozinha'),.5));
test('missing or unrelated role scores zero',()=>{assert.equal(roleFit('bartender','garçom'),0);assert.equal(roleFit('bartender',null),0);});
