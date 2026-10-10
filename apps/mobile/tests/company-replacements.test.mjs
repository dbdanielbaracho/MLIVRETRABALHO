import test from 'node:test';
import assert from 'node:assert/strict';
import {loadReplacements,replaceable,sameReplacementContext,requestReplacement,matchReplacement,selectReplacement} from '../lib/company-replacements.ts';
const response=(data,ok=true,status=ok?200:500)=>({ok,status,json:async()=>data});
const assignment={id:'a',status:'confirmed',title:'Trabalho real',professionalName:'Nome real',replacementOpen:true};
const replacement={id:'r',assignmentId:'a',status:'open',reason:'Pedido real'};
const recommendation={replacementRequestId:'r',recommendedProfessionalId:'p',recommendedProfessionalName:'Substituto real',score:82,reasons:['availability']};
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
 const calls=[];assert.equal(await requestReplacement(async(...args)=>{calls.push(args);return response(replacement)},'a','Pedido real'),true);assert.deepEqual(calls,[['/company/replacements/a','POST',{reason:'Pedido real'}]]);
 assert.equal(await requestReplacement(async()=>response({...replacement,assignmentId:'other'}),'a'),false);
});
test('only documented no_replacement_available HTTP400 means no substitute; other HTTP or network failures stay error',async()=>{
 assert.deepEqual(await matchReplacement(async()=>response({message:'no_replacement_available'},false,400),'r'),{status:'empty'});
 assert.deepEqual(await matchReplacement(async()=>response({message:'no_replacement_available'},false,500),'r'),{status:'error'});
 assert.equal((await matchReplacement(async()=>{throw Error('timeout')},'r')).status,'error');
});
test('matching validates the requested replacement and actual score/name without manufacturing a recommendation',async()=>{
 assert.deepEqual(await matchReplacement(async()=>response(recommendation),'r'),{status:'ready',data:recommendation});
 for(const delta of [{replacementRequestId:'other'},{recommendedProfessionalId:''},{score:NaN},{score:101},{reasons:null}])assert.equal((await matchReplacement(async()=>response({...recommendation,...delta}),'r')).status,'error');
});
test('selection acknowledges the requested replacement, professional and original assignment using existing manual payload',async()=>{
 const ack={replacementRequestId:'r',assignmentId:'new-a',replacedAssignmentId:'a',professionalId:'p',status:'matched'},calls=[];
 assert.equal(await selectReplacement(async(...args)=>{calls.push(args);return response(ack)},replacement,'p'),true);assert.deepEqual(calls,[['/company/replacements/r/select','POST',{professionalId:'p'}]]);
 for(const delta of [{professionalId:'other'},{replacedAssignmentId:'other'},{status:'open'}])assert.equal(await selectReplacement(async()=>response({...ack,...delta}),replacement,'p'),false);
});
test('lost request or selection response cannot imply success or automatically repeat manual operations',async()=>{
 let calls=0;const request=async()=>{calls++;throw Error('lost response')};assert.equal(await requestReplacement(request,'a'),false);assert.equal(await selectReplacement(request,replacement,'p'),false);assert.equal(calls,2);
});
import {runForSession} from '../lib/session-context.ts';
test('replacement mutations reject missing IDs before transport and whitespace ACKs remain unconfirmed',async()=>{
 let calls=0;const request=async()=>{calls++;return response({})};assert.equal(await requestReplacement(request,' '),false);assert.equal((await matchReplacement(request,'')).status,'error');assert.equal(await selectReplacement(request,{...replacement,id:' '},'p'),false);assert.equal(await selectReplacement(request,replacement,' '),false);assert.equal(calls,0);
 assert.equal(await requestReplacement(async()=>response({...replacement,id:' '}),'a'),false);assert.equal((await matchReplacement(async()=>response({...recommendation,recommendedProfessionalId:' '}),'r')).status,'error');
 assert.equal((await loadReplacements(async p=>response(p.endsWith('assignments')?[{...assignment,id:' '}]:[{...replacement,assignmentId:' '}]))).replacements.status,'error');
});
test('a matching response cannot be applied after the originating company changes',async()=>{
 let tenant='t',calls=0;const result=await runForSession(async()=>({Authorization:'Bearer a','x-tenant-id':tenant}),headers=>matchReplacement(async()=>{calls++;assert.equal(headers['x-tenant-id'],'t');tenant='other';return response(recommendation)},'r'),()=>true,'Bearer a','t');assert.equal(result.status,'stale');assert.equal('data' in result,false);assert.equal(calls,1);
});
