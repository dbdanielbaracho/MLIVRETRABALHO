import {test} from 'node:test';
import assert from 'node:assert/strict';
import {platformSupportInput,platformSupportDigest} from './platform-support-input';
test('platform support has a distinct strict identity-owned contract',()=>{
 for(const category of ['app_access','profile','preferences','notifications','privacy','other'])assert.deepEqual(platformSupportInput({category,description:'  Text  '}),{category,description:'Text'});
 for(const value of [null,[],{}, {category:'payment',description:'Text'},{category:'other',description:''},{category:'other',description:'x',tenantId:'foreign'},{category:'other',description:'x',priority:'urgent'},{category:'other',description:'\0'},{category:'other',description:'\ud800'},{category:'other',description:'\udfff'}])assert.equal(platformSupportInput(value),null);
});
test('platform support counts codepoints and hashes only canonical payload',()=>{
 assert.ok(platformSupportInput({category:'other',description:'😀'.repeat(4000)}));assert.equal(platformSupportInput({category:'other',description:'😀'.repeat(4001)}),null);
 const a=platformSupportInput({category:'other',description:'Text'})!,b=platformSupportInput({description:' Text ',category:'other'})!;
 assert.equal(platformSupportDigest(a),platformSupportDigest(b));assert.notEqual(platformSupportDigest(a),platformSupportDigest({...a,description:'Different'}));
});
