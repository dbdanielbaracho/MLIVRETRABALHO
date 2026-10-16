import test from 'node:test';
import assert from 'node:assert/strict';
import {loadSupportCases} from '../lib/professional-support.ts';
import {loadManagement,generateInvitation} from '../lib/company-members.ts';
import {loadReplacements} from '../lib/company-replacements.ts';
const id='00000000-0000-4000-8000-000000000001',assignment='00000000-0000-4000-8000-000000000002',good='2026-03-02T12:00:00.000Z';
const response=data=>({ok:true,status:200,json:async()=>data});
const support=d=>({id,assignmentId:assignment,category:'schedule',priority:'normal',status:'open',description:'Local fixture',createdAt:d});
const member={identityId:id,email:'fixture@example.test',role:'manager',createdAt:good,deactivatedAt:null};
const invitation={id,email:'fixture@example.test',role:'manager',expiresAt:good,acceptedAt:null,revokedAt:null};
const ack={invitationId:assignment,email:'fixture@example.test',role:'manager',expiresAt:good,inviteCode:id+'.fixture'};
const shift={id:assignment,status:'confirmed',title:'Fixture',professionalName:'Fixture',replacementOpen:false,startsAt:good,endsAt:'2027-01-01T00:00:00Z'};
for(const bad of ['2026-02-30T12:00:00Z','2025-02-29T12:00:00-03:00','2026-04-31T12:00:00+02:00']){
 test('support rejects impossible createdAt even on a different assignment '+bad,async()=>{
  for(const assignmentId of [assignment,'different']){
   assert.deepEqual(await loadSupportCases(async()=>response([{...support(bad),assignmentId}]),assignment),{status:'error'});
  }
 });
 for(const field of ['createdAt','deactivatedAt'])test('members '+field+' rejects impossible date independently '+bad,async()=>{
  const result=await loadManagement(async path=>response(path==='/company/members'?[{...member,[field]:bad}]:[invitation]));
  assert.deepEqual(result.members,{status:'error'});assert.deepEqual(result.invitations,{status:'ready',data:[invitation]});
 });
 for(const field of ['expiresAt','acceptedAt','revokedAt'])test('invitations '+field+' rejects impossible date independently '+bad,async()=>{
  const result=await loadManagement(async path=>response(path==='/company/members'?[member]:[{...invitation,[field]:bad}]));
  assert.deepEqual(result.members,{status:'ready',data:[member]});assert.deepEqual(result.invitations,{status:'error'});
 });
 test('invitation ACK with impossible expiry stays unknown after one unchanged POST '+bad,async()=>{
  let calls=0;const result=await generateInvitation(async(path,body,method)=>{
   calls++;assert.equal(path,'/company/members/invitations');assert.deepEqual(body,{email:ack.email,role:ack.role});assert.equal(method,undefined);
   return response({...ack,expiresAt:bad});
  },id,ack.email,ack.role);assert.deepEqual(result,{status:'unknown'});assert.equal(calls,1);
 });
 for(const field of ['startsAt','endsAt'])test('replacement assignment '+field+' rejects impossible date while other section stays ready '+bad,async()=>{
  const result=await loadReplacements(async(path,method,body)=>{
   assert.equal(method,'GET');assert.equal(body,undefined);return response(path==='/company/dashboard/assignments'?[{...shift,[field]:bad}]:[]);
  });
  assert.deepEqual(result,{assignments:{status:'error'},replacements:{status:'ready',data:[]}});
 });
}
test('legitimate leapday offset crossing UTC, epoch zero and pre1970 preserve exact strings and server order',async()=>{
 for(const d of ['2024-02-29T23:30:00-03:00','1970-01-01T00:00:00Z','1969-12-31T23:59:59Z']){
  const cases=[{...support(d),id:'second'},support(d)];
  assert.deepEqual(await loadSupportCases(async()=>response(cases),assignment),{status:'ready',data:cases});
  const members=[{...member,createdAt:d,deactivatedAt:d}],invitations=[{...invitation,expiresAt:d,acceptedAt:d,revokedAt:d}];
  assert.deepEqual(await loadManagement(async path=>response(path==='/company/members'?members:invitations)),{members:{status:'ready',data:members},invitations:{status:'ready',data:invitations}});
  assert.deepEqual(await generateInvitation(async()=>response({...ack,expiresAt:d}),id,ack.email,ack.role),{status:'created',inviteCode:ack.inviteCode,email:ack.email});
  const assignments=[{...shift,startsAt:d,endsAt:d}];
  assert.deepEqual((await loadReplacements(async path=>response(path==='/company/dashboard/assignments'?assignments:[]))).assignments,{status:'ready',data:assignments});
 }
});
test('optional absent or null dates and real empty sections retain their contracts',async()=>{
 for(const optional of [{},{deactivatedAt:null}]){
  const {deactivatedAt,...required}=member,m={...required,...optional};
  const {acceptedAt,revokedAt,...invitationRequired}=invitation,i={...invitationRequired,...('deactivatedAt' in optional?{acceptedAt:null,revokedAt:null}:{})};
  const result=await loadManagement(async path=>response(path==='/company/members'?[m]:[i]));
  assert.deepEqual(result,{members:{status:'ready',data:[m]},invitations:{status:'ready',data:[i]}});
 }
 const {startsAt,endsAt,...required}=shift;
 for(const optional of [{},{startsAt:null,endsAt:null}]){
  const row={...required,...optional};const result=await loadReplacements(async path=>response(path==='/company/dashboard/assignments'?[row]:[]));
  assert.deepEqual(result.assignments,{status:'ready',data:[row]});
 }
 assert.deepEqual(await loadSupportCases(async()=>response([]),null),{status:'ready',data:[]});
});
