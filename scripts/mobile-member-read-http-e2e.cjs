'use strict';
// CURRENT mobile modules over real disposable localhost HTTP. No Android UI/storage.
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {stripTypeScriptTypes}=require('node:module');
const {localConfiguration}=require('./professional-chronology-e2e.cjs');
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
async function moduleFrom(name){
 const source=readFileSync('apps/mobile/lib/'+name+'.ts','utf8');
 return import('data:text/javascript;base64,'+Buffer.from(stripTypeScriptTypes(source,{mode:'strip'})).toString('base64'));
}
async function verifyMemberReads(context){
 const config=localConfiguration(process.env);
 assert.equal(typeof context.witnessInvitation,'function','Read-only local PG witness required');
 for(const key of ['tenantId','ownerIdentity','assignmentId','otherAssignmentId'])assert.match(context[key],uuid);
 const {loadManagement,generateInvitation,revokeInvitation}=await moduleFrom('company-members');
 const {loadSupportCases}=await moduleFrom('professional-support');
 const {loadReplacements}=await moduleFrom('company-replacements');
 const calls=[],tenant=context.tenantId,email=context.email;
 let ownInvitation=null;
 const actors={owner:context.ownerToken,professional:context.professionalToken,outsider:context.outsiderToken,foreignOwner:context.otherOwnerToken};
 async function live(actor,path,body,method){
  const actualMethod=method||(body===undefined?'GET':'POST');
  const readPaths=['/company/members','/company/members/invitations','/support-cases/mine','/company/dashboard/assignments','/company/replacements'];
  const allowed=actualMethod==='GET'&&readPaths.includes(path)||actor==='owner'&&actualMethod==='POST'&&(path==='/company/members/invitations'||ownInvitation&&path==='/company/members/invitations/'+ownInvitation+'/revoke');
  assert.ok(allowed,'Only defined local fixture routes permitted');
  assert.ok(actors[actor]&&typeof actors[actor]==='string');
  if(actualMethod==='POST'&&path==='/company/members/invitations')assert.deepEqual(body,{email,role:'manager'});
  else assert.equal(body,undefined);
  const response=await fetch(config.origin+'/v1'+path,{method:actualMethod,redirect:'error',signal:AbortSignal.timeout(15000),headers:{Authorization:'Bearer '+actors[actor],'x-tenant-id':tenant,...(body===undefined?{}:{'Content-Type':'application/json'})},...(body===undefined?{}:{body:JSON.stringify(body)})});
  const expected=actor==='owner'||actor==='professional'&&path==='/support-cases/mine'?(actualMethod==='GET'?200:201):actor==='professional'?403:401;
  assert.equal(response.status,expected,'Actual role/tenant HTTP contract');
  calls.push({actor,path,method:actualMethod,status:response.status});
  return response;
 }
 const owner=(path,body,method)=>live('owner',path,body,method);
 const initial=await loadManagement(owner);
 assert.equal(initial.members.status,'ready');assert.equal(initial.invitations.status,'ready');
 assert.equal(initial.invitations.data.length,0,'Fresh fixture must not contain prior invitations');
 assert.ok(initial.members.data.some(x=>x.identityId===context.ownerIdentity&&x.role==='owner'));
 assert.ok(!initial.members.data.some(x=>x.identityId===context.otherOwnerIdentity));
 const created=await generateInvitation(owner,tenant,email,'manager');
 assert.equal(created.status,'created');assert.equal(created.email,email);assert.ok(created.inviteCode.startsWith(tenant+'.'));
 const beforeRevoke=await loadManagement(owner);
 assert.deepEqual(beforeRevoke.members,initial.members);assert.equal(beforeRevoke.invitations.status,'ready');
 assert.equal(beforeRevoke.invitations.data.length,1);
 const invitation=beforeRevoke.invitations.data[0];
 assert.match(invitation.id,uuid);assert.equal(invitation.email,email);assert.equal(invitation.role,'manager');
 assert.equal(invitation.acceptedAt,null);assert.equal(invitation.revokedAt,null);
 ownInvitation=invitation.id;
 await context.witnessInvitation({invitation,inviteCode:created.inviteCode,phase:'created'});
 assert.equal(await revokeInvitation(owner,ownInvitation),true);
 const afterRevoke=await loadManagement(owner);
 assert.deepEqual(afterRevoke.members,initial.members);assert.equal(afterRevoke.invitations.status,'ready');assert.equal(afterRevoke.invitations.data.length,1);
 const revoked=afterRevoke.invitations.data[0];
 assert.equal(revoked.id,ownInvitation);assert.equal(revoked.expiresAt,invitation.expiresAt);assert.equal(revoked.acceptedAt,null);assert.ok(typeof revoked.revokedAt==='string');
 await context.witnessInvitation({invitation:revoked,inviteCode:created.inviteCode,phase:'revoked'});
 const professionalRead=()=>live('professional','/support-cases/mine');
 const assigned=await loadSupportCases(professionalRead,context.assignmentId);
 const general=await loadSupportCases(professionalRead,null);
 assert.equal(assigned.status,'ready');assert.equal(general.status,'ready');
 assert.deepEqual(assigned.data.map(x=>x.id).sort(),[...context.expectedAssignedSupportIds].sort());
 assert.deepEqual(general.data.map(x=>x.id).sort(),[...context.expectedGeneralSupportIds].sort());
 const replacements=await loadReplacements((path,method,body)=>live('owner',path,body,method));
 assert.equal(replacements.assignments.status,'ready');assert.equal(replacements.replacements.status,'ready');
 assert.deepEqual(replacements.assignments.data.map(x=>x.id),[context.assignmentId]);
 assert.deepEqual(replacements.replacements.data,[]);
 assert.ok(!replacements.assignments.data.some(x=>x.id===context.otherAssignmentId));
 for(const actor of ['professional','outsider','foreignOwner']){
  const result=await loadManagement((path,body,method)=>live(actor,path,body,method));
  const forbidden=actor==='professional';
  assert.deepEqual(result,{members:{status:'error',forbidden},invitations:{status:'error',forbidden}});
 }
 assert.equal(calls.filter(x=>x.method==='POST').length,2,'One create and one explicit revoke only');
 assert.equal(calls.filter(x=>x.method==='GET').length,16);
 assert.equal(calls.filter(x=>x.status===403).length,2);assert.equal(calls.filter(x=>x.status===401).length,4);
 return {assigned:assigned.data,general:general.data,assignment:replacements.assignments.data[0],invitationId:ownInvitation,calls};
}
module.exports={verifyMemberReads};
