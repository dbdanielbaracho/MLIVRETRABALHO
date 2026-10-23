import test from 'node:test';
import assert from 'node:assert/strict';
import {loadReplacements,replaceable,sameReplacementContext,requestReplacement,matchReplacement,selectReplacement} from '../lib/company-replacements.ts';
const response=(data,ok=true,status=ok?200:500)=>({ok,status,json:async()=>data});
const ID='11111111-2222-3333-4444-555555555555',REPL='66666666-7777-4888-8999-000000000000',PRO='aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee';
const assignment={id:ID,status:'confirmed',title:'Trabalho real',professionalName:'Nome real',replacementOpen:true};
const replacement={id:REPL,assignmentId:ID,status:'open',reason:'Pedido real'};
const recommendation={replacementRequestId:REPL,recommendedProfessionalId:PRO,recommendedProfessionalName:'Substituto real',score:82,reasons:['availability']};
test('replacement reads distinguish verified empty from failure and preserve partial success',async()=>{
 const empty=await loadReplacements(async()=>response([]));assert.deepEqual(empty, {assignments:{status:'ready',data:[]},replacements:{status:'ready',data:[]}});
 const partial=await loadReplacements(async path=>path.endsWith('assignments')?response([assignment]):response({},false));assert.deepEqual(partial.assignments.data,[assignment]);assert.equal(partial.replacements.status,'error');
});
test('replacement schema and forbidden reads fail honestly; successful retry restores actual records',async()=>{
 assert.equal((await loadReplacements(async()=>response([],false,403))).assignments.forbidden,true);
 assert.equal((await loadReplacements(async()=>response([{...replacement,status:'fake'}]))).replacements.status,'error');
 const actual=await loadReplacements(async path=>response(path.endsWith('assignments')?[assignment]:[replacement]));assert.deepEqual(actual.replacements.data,[replacement]);
});
test('only existing backend replaceable states allow actions and context retains displayed company and identity',()=>{
 for(const s of ['confirmed','checked_in','in_progress'])assert.equal(replaceable(s),true);for(const s of ['checked_out','completed','cancelled','unknown'])assert.equal(replaceable(s),false);
 const h={'x-tenant-id':'t',Authorization:'Bearer a'};assert.equal(sameReplacementContext({...h},h),true);assert.equal(sameReplacementContext({...h,'x-tenant-id':'other'},h),false);assert.equal(sameReplacementContext({...h,Authorization:'Bearer b'},h),false);assert.equal(sameReplacementContext({},{}),false);
});
test('request acknowledgement must match the original assignment and preserves reason payload',async()=>{
 const calls=[];assert.equal(await requestReplacement(async(...args)=>{calls.push(args);return response({...replacement,id:'abcdef12-2222-4333-8444-555555555555'})},ID,'Pedido real'),true);assert.deepEqual(calls,[['/company/replacements/'+ID+'','POST',{reason:'Pedido real'}]]);
 assert.equal(await requestReplacement(async()=>response({...replacement,id:'abcdef12-2222-4333-8444-555555555555',assignmentId:'other'}),ID),false);
});
test('only documented no_replacement_available HTTP400 means no substitute; other HTTP or network failures stay error',async()=>{
 assert.deepEqual(await matchReplacement(async()=>response({message:'no_replacement_available'},false,400),REPL),{status:'empty'});
 assert.deepEqual(await matchReplacement(async()=>response({message:'no_replacement_available'},false,500),REPL),{status:'error'});
 assert.equal((await matchReplacement(async()=>{throw Error('timeout')},REPL)).status,'error');
});
test('matching validates the requested replacement and actual score/name without manufacturing a recommendation',async()=>{
 assert.deepEqual(await matchReplacement(async()=>response(recommendation),REPL),{status:'ready',data:recommendation});
 for(const delta of [{replacementRequestId:'other'},{recommendedProfessionalId:''},{score:NaN},{score:101},{reasons:null}])assert.equal((await matchReplacement(async()=>response({...recommendation,...delta}),REPL)).status,'error');
});
test('selection acknowledges the requested replacement, professional and original assignment using existing manual payload',async()=>{
 const ack={replacementRequestId:REPL,assignmentId:'abcdefab-8888-4777-8666-555555555555',replacedAssignmentId:ID,professionalId:PRO,status:'matched'},calls=[];
 assert.equal(await selectReplacement(async(...args)=>{calls.push(args);return response(ack)},replacement,PRO),true);assert.deepEqual(calls,[['/company/replacements/'+REPL+'/select','POST',{professionalId:PRO}]]);
 for(const delta of [{professionalId:'other'},{replacedAssignmentId:'other'},{status:'open'}])assert.equal(await selectReplacement(async()=>response({...ack,...delta}),replacement,PRO),false);
});
test('lost request or selection response cannot imply success or automatically repeat manual operations',async()=>{
 let calls=0;const request=async()=>{calls++;throw Error('lost response')};assert.equal(await requestReplacement(request,ID),false);assert.equal(await selectReplacement(request,replacement,PRO),false);assert.equal(calls,2);
});
import {runForSession} from '../lib/session-context.ts';
test('replacement mutations reject missing IDs before transport and whitespace ACKs remain unconfirmed',async()=>{
 let calls=0;const request=async()=>{calls++;return response({})};assert.equal(await requestReplacement(request,' '),false);assert.equal((await matchReplacement(request,'')).status,'error');assert.equal(await selectReplacement(request,{...replacement,id:' '},PRO),false);assert.equal(await selectReplacement(request,replacement,' '),false);assert.equal(calls,0);
 assert.equal(await requestReplacement(async()=>response({...replacement,id:' '}),ID),false);assert.equal((await matchReplacement(async()=>response({...recommendation,recommendedProfessionalId:' '}),REPL)).status,'error');
 assert.equal((await loadReplacements(async p=>response(p.endsWith('assignments')?[{...assignment,id:' '}]:[{...replacement,assignmentId:' '}]))).replacements.status,'error');
});
test('a matching response cannot be applied after the originating company changes',async()=>{
 let tenant='t',calls=0;const result=await runForSession(async()=>({Authorization:'Bearer a','x-tenant-id':tenant}),headers=>matchReplacement(async()=>{calls++;assert.equal(headers['x-tenant-id'],'t');tenant='other';return response(recommendation)},REPL),()=>true,'Bearer a','t');assert.equal(result.status,'stale');assert.equal('data' in result,false);assert.equal(calls,1);
});


test('replacement identifiers must match the API UUID contract before any transport',async()=>{
 const malformedAssignment={...assignment,id:'assignment-text'};
 const malformedReplacement={...replacement,id:'replacement-text',assignmentId:'assignment-text'};
 assert.equal((await loadReplacements(async p=>response(p.endsWith('assignments')?[malformedAssignment]:[malformedReplacement]))).assignments.status,'error');
 assert.equal((await loadReplacements(async p=>response(p.endsWith('assignments')?[assignment]:[malformedReplacement]))).replacements.status,'error');
 let calls=0;const request=async()=>{calls++;return response({});};
 assert.equal(await requestReplacement(request,'assignment-text'),false);
 assert.deepEqual(await matchReplacement(request,'replacement-text'),{status:'error'});
 assert.equal(await selectReplacement(request,replacement,'professional-text'),false);
 assert.equal(calls,0);
});

test('replacement assignment dates reject impossible calendars without discarding a valid sibling section',async()=>{
 const bad=['2026-02-30T12:00:00Z','2025-02-29T12:00:00+00:00','2026-04-31T09:15:00-03:00'];
 for(const value of bad){
  const result=await loadReplacements(async path=>response(path.endsWith('assignments')?[{...assignment,startsAt:value}]:[replacement]));
  assert.equal(result.assignments.status,'error');assert.deepEqual(result.replacements,{status:'ready',data:[replacement]});
  const badEnd=await loadReplacements(async path=>response(path.endsWith('assignments')?[{...assignment,endsAt:value}]:[replacement]));
  assert.equal(badEnd.assignments.status,'error');
 }
});
test('replacement assignment calendar preserves leap day, timezone and optional timestamps',async()=>{
 for(const value of ['2024-02-29T12:00:00Z','2026-03-01T00:00:00+14:00','1970-01-01T00:00:00Z']){
  const actual={...assignment,startsAt:value,endsAt:value};
  const result=await loadReplacements(async path=>response(path.endsWith('assignments')?[actual]:[replacement]));
  assert.deepEqual(result.assignments,{status:'ready',data:[actual]});
 }
 const empty=await loadReplacements(async path=>response(path.endsWith('assignments')?[{...assignment,startsAt:null,endsAt:null}]:[replacement]));
 assert.equal(empty.assignments.status,'ready');
});
