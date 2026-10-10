import {test} from 'node:test';
import assert from 'node:assert/strict';
import {conversionProposalInput,conversionDecisionInput,conversionId} from './career-conversion-input';
const assignment='aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
test('conversion proposal rejects malformed roots, UUID references, modality and note shape before PostgreSQL',()=>{
 for(const value of [null,undefined,[],1,'text',{}, {assignmentId:1,modality:'permanent'},{assignmentId:'not-uuid',modality:'permanent'},{assignmentId:assignment,modality:'invented'},{assignmentId:assignment,modality:'permanent',note:1},{assignmentId:assignment,modality:'permanent',note:[]}])assert.equal(conversionProposalInput(value),null);
});
test('conversion proposal preserves both existing modalities and trim/null note behavior without new policy',()=>{
 for(const modality of ['temp_to_hire','permanent']){
  assert.deepEqual(conversionProposalInput({assignmentId:assignment.toUpperCase(),modality,note:' Nota real '}),{assignmentId:assignment.toUpperCase(),modality,note:'Nota real'});
  for(const note of [undefined,null,' '])assert.deepEqual(conversionProposalInput({assignmentId:assignment,modality,note}),{assignmentId:assignment,modality,note:null});
 }
});
test('conversion decision is only the existing explicit accepted or declined choice from an object',()=>{
 for(const decision of ['accepted','declined'])assert.equal(conversionDecisionInput({decision,professionalId:'ignored'}),decision);
 for(const value of [null,[],undefined,'accepted',{}, {decision:'withdrawn'},{decision:1}])assert.equal(conversionDecisionInput(value),null);
});
test('conversion lookup ids use the actual UUID schema rather than arbitrary strings or numeric values',()=>{
 for(const value of [assignment,assignment.toUpperCase()])assert.equal(conversionId(value),true);
 for(const value of [null,undefined,[],1,'', 'opaque.id',assignment+'x'])assert.equal(conversionId(value),false);
});
