import test from 'node:test';
import assert from 'node:assert/strict';
import {loadManagement,sameManagementContext,generateInvitation,acceptInvitation,revokeInvitation} from '../lib/company-members.ts';
const response=(data,ok=true,status=ok?200:400)=>({ok,status,json:async()=>data});
const member={identityId:'owner',email:'owner@example.test',role:'owner',createdAt:'2026-10-09T12:00:00Z'};
const invitation={id:'i',email:'manager@example.test',role:'manager',expiresAt:'2026-10-16T12:00:00Z'};
test('management uses actual members and invitations with independent failures, including owner-only forbidden',async()=>{
 const d=await loadManagement(async path=>path.endsWith('/invitations')?response([],false,403):response([member]));assert.deepEqual(d.members.data,[member]);assert.deepEqual(d.invitations,{status:'error',forbidden:true});
 const empty=await loadManagement(async()=>response([]));assert.deepEqual(empty.members,{status:'ready',data:[]});assert.deepEqual(empty.invitations,{status:'ready',data:[]});
});
test('malformed member/invitation dates and network failure stay errors rather than implying no participation',async()=>{
 assert.equal((await loadManagement(async()=>{throw Error('offline')})).members.status,'error');
 assert.equal((await loadManagement(async()=>response([{...member,createdAt:'invalid'}]))).members.status,'error');
 assert.equal((await loadManagement(async()=>response([{...invitation,expiresAt:'invalid'}]))).invitations.status,'error');
});
test('management context rejects another company or identity before operating on displayed invitations',()=>{
 const h={'x-tenant-id':'t',Authorization:'Bearer one'};assert.equal(sameManagementContext({...h},h),true);assert.equal(sameManagementContext({...h,'x-tenant-id':'other'},h),false);assert.equal(sameManagementContext({...h,Authorization:'Bearer other'},h),false);
});
test('generating an invitation requires matching email, role, tenant-bound code and valid expiry; timeout never retries itself',async()=>{
 let calls=0;const ack={invitationId:'i',email:invitation.email,role:'manager',expiresAt:invitation.expiresAt,inviteCode:'t.example-test-code'};
 assert.deepEqual(await generateInvitation(async(path,body)=>{calls++;assert.equal(path,'/company/members/invitations');assert.deepEqual(body,{email:invitation.email,role:'manager'});return response(ack)},'t',invitation.email,'manager'),{status:'created',inviteCode:ack.inviteCode,email:ack.email});assert.equal(calls,1);
 for(const data of [{...ack,inviteCode:'other.code'},{...ack,role:'owner'},{...ack,email:'other@example.test'}])assert.deepEqual(await generateInvitation(async()=>response(data),'t',invitation.email,'manager'),{status:'unknown'});
 assert.deepEqual(await generateInvitation(async()=>{throw Error('timeout')},'t',invitation.email,'manager'),{status:'unknown'});
 assert.deepEqual(await generateInvitation(async()=>response({},false,403),'t',invitation.email,'manager'),{status:'rejected'});
});
test('acceptance updates local workspace only from a verified tenant and management-role acknowledgement',async()=>{
 assert.deepEqual(await acceptInvitation(async()=>response({accepted:true,tenantId:'t',role:'manager'}),'t.code'),{status:'accepted',tenantId:'t',role:'manager'});
 for(const data of [{accepted:false,tenantId:'t',role:'owner'},{accepted:true,tenantId:'other',role:'owner'},{accepted:true,tenantId:'t',role:'unknown'}])assert.equal((await acceptInvitation(async()=>response(data),'t.code')).status,'error');
 assert.deepEqual(await acceptInvitation(async()=>response({message:'invitation_email_mismatch'},false,403),'t.code'),{status:'error',message:'invitation_email_mismatch'});
});
test('revocation preserves bodyless POST and requires acknowledgement for the actual invitation',async()=>{
 const calls=[];assert.equal(await revokeInvitation(async(path,body,method)=>{calls.push([path,body,method]);return response({revoked:true,invitationId:'i'})},'i'),true);assert.deepEqual(calls,[['/company/members/invitations/i/revoke',undefined,'POST']]);
 assert.equal(await revokeInvitation(async()=>response({revoked:true,invitationId:'other'}),'i'),false);assert.equal(await revokeInvitation(async()=>{throw Error('offline')},'i'),false);
});
