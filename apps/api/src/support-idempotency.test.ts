import {test} from 'node:test';
import assert from 'node:assert/strict';
import {supportRequestKey,supportRequestDigest} from './support-idempotency';
import {supportCaseInput} from './support-input';
const key='AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE';
test('support intent key is optional for legacy calls and validates UUID without coercion',()=>{
 assert.equal(supportRequestKey(undefined),undefined);assert.equal(supportRequestKey(key),key.toLowerCase());
 for(const value of [null,'',' ',key+'x',42,[],{},'not-a-uuid'])assert.equal(supportRequestKey(value),null);
});
test('support request digest represents the normalized logical input rather than UUID case or defaults',()=>{
 const a=supportCaseInput({assignmentId:key,category:'other',description:'  fixture  '});
 const b=supportCaseInput({assignmentId:key.toLowerCase(),category:'other',description:'fixture',priority:'normal'});
 assert.ok(a);assert.ok(b);assert.match(supportRequestDigest(a),/^[0-9a-f]{64}$/);assert.equal(supportRequestDigest(a),supportRequestDigest(b));
});
test('support digest changes for each meaningful payload field and cannot alias different tuple boundaries',()=>{
 const original={assignmentId:null,category:'other',description:'fixture',priority:'normal'};
 const digest=supportRequestDigest(original);
 for(const changed of [{...original,assignmentId:key},{...original,category:'schedule'},{...original,description:'different'},{...original,priority:'high'}])assert.notEqual(supportRequestDigest(changed),digest);
 assert.notEqual(supportRequestDigest({...original,description:'a,b',priority:'c'}),supportRequestDigest({...original,description:'a',priority:'b,c'}));
});
