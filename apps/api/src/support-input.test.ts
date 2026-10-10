import {test} from 'node:test';
import assert from 'node:assert/strict';
import {supportCaseInput} from './support-input';
const id='11111111-2222-3333-4444-555555555555';
const body={assignmentId:id,category:'schedule',description:'  dúvida sobre o turno  ',priority:'high'};
test('support preserves the existing assignment, category and priority with trimmed description',()=>{
 assert.deepEqual(supportCaseInput(body),{assignmentId:id,category:'schedule',description:'dúvida sobre o turno',priority:'high'});
 assert.deepEqual(supportCaseInput({category:'other',description:'não vinculado'}),{assignmentId:null,category:'other',description:'não vinculado',priority:'normal'});
 assert.equal(supportCaseInput({...body,assignmentId:null})?.assignmentId,null);
});
test('support rejects malformed assignment identifiers instead of sending them to PostgreSQL',()=>{
 for(const assignmentId of ['', ' ', 'not-a-uuid', 42, {}, id+'x'])assert.equal(supportCaseInput({...body,assignmentId}),null);
 assert.equal(supportCaseInput({...body,assignmentId:id.toUpperCase()})?.assignmentId,id.toUpperCase());
});
test('support enforces the database description limit without treating invalid or oversized input as a case',()=>{
 for(const description of [' ', 'x'.repeat(4001), 1, {}])assert.equal(supportCaseInput({...body,description}),null);
 assert.equal(supportCaseInput({...body,description:'x'.repeat(4000)})?.description.length,4000);
 assert.equal(supportCaseInput({...body,description:'😀'.repeat(4000)})?.description,'😀'.repeat(4000));
 assert.equal(supportCaseInput({...body,description:'😀'.repeat(4001)}),null);
 for(const value of [null,[],undefined,'text'])assert.equal(supportCaseInput(value),null);
});
test('support validates known category and priority while retaining all allowed existing choices',()=>{
 for(const category of ['schedule','payment','work_conditions','cancellation','dispute','other'])assert.equal(supportCaseInput({...body,category})?.category,category);
 for(const priority of ['normal','high','urgent'])assert.equal(supportCaseInput({...body,priority})?.priority,priority);
 for(const extra of [{category:'invented'},{priority:'critical'},{category:42},{priority:42}])assert.equal(supportCaseInput({...body,...extra}),null);
});
