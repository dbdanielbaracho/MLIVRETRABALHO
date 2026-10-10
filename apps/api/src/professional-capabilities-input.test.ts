import {test} from 'node:test';
import assert from 'node:assert/strict';
import {professionalCapabilityInput} from './professional-capabilities-input';
test('capability input rejects non-object roots and malformed list fields without iterating them',()=>{
 for(const value of [undefined,null,0,'text',[],{skills:1},{skills:'drink_preparation'},{skills:[null]},{skills:['drink_preparation',1]},{certifications:'cert'},{certifications:[false]}])assert.equal(professionalCapabilityInput(value),null);
});
test('capability input preserves existing missing/null list and level defaults',()=>{
 for(const value of [{},{skills:null,certifications:null,provenLevel:null}])assert.deepEqual(professionalCapabilityInput(value),{skills:[],certifications:[],provenLevel:null});
});
test('capability input deduplicates exact strings without inventing trimming, catalog values or size policy',()=>{
 assert.deepEqual(professionalCapabilityInput({skills:[' drink_preparation ','drink_preparation','drink_preparation'],certifications:['actual-cert','actual-cert'],professionalId:'ignored'}),{skills:[' drink_preparation ','drink_preparation'],certifications:['actual-cert'],provenLevel:null});
});
test('capability input accepts only existing nullable levels without treating them as proof of certification',()=>{
 for(const level of ['entry','proven','advanced','expert'])assert.equal(professionalCapabilityInput({provenLevel:level})?.provenLevel,level);
 for(const level of ['',0,true,[],{},'verified_by_agent'])assert.equal(professionalCapabilityInput({provenLevel:level}),null);
});
