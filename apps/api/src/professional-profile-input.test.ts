import {test} from 'node:test';
import assert from 'node:assert/strict';
import {professionalProfileInput} from './professional-profile-input';
test('profile input requires an object and actual nonblank display name',()=>{
 for(const value of [null,undefined,[],42,'name',{}, {displayName:null},{displayName:42},{displayName:{}},{displayName:[]},{displayName:''},{displayName:' \n\t '}])assert.equal(professionalProfileInput(value),null);
});
test('profile optional fields accept only strings, null or absence',()=>{
 for(const key of ['homeCity','primaryRole'])for(const value of [42,false,{},[]])assert.equal(professionalProfileInput({displayName:'Name',[key]:value}),null);
});
test('profile preserves existing trimmed names and nullable optional values without mutating the payload',()=>{
 const body={displayName:'  José 😀  ',homeCity:' São Paulo ',primaryRole:' Bartender ',identityId:'ignored',id:'ignored'};
 assert.deepEqual(professionalProfileInput(body),{displayName:'José 😀',homeCity:'São Paulo',primaryRole:'Bartender'});
 assert.equal(body.displayName,'  José 😀  ');
 for(const extra of [{},{homeCity:null,primaryRole:null},{homeCity:' ',primaryRole:' '}])assert.deepEqual(professionalProfileInput({displayName:'Name',...extra}),{displayName:'Name',homeCity:null,primaryRole:null});
});
test('profile validation introduces no arbitrary name, location or role length policy',()=>{
 const input={displayName:'N'.repeat(5000),homeCity:'C'.repeat(5000),primaryRole:'R'.repeat(5000)};
 assert.deepEqual(professionalProfileInput(input),input);
});
