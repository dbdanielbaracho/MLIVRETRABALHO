import test from 'node:test';
import assert from 'node:assert/strict';
const {scopeFor,requireBinding,cleanupHook}=require('../../../scripts/invitation-atomicity-e2e.cjs');
const stamp='00000000-0000-4000-8000-000000000001',tenantId='00000000-0000-4000-8000-000000000002',ownerId='00000000-0000-4000-8000-000000000003',oldId='00000000-0000-4000-8000-000000000004';
const input={stamp,tenantId,ownerId,oldId,email:'invitation-atomicity-target-'+stamp+'@example.test'};
const binding={id:oldId,tenant_id:tenantId,invited_by_identity_id:ownerId,email:input.email,role:'manager',accepted_at:null,revoked_at:null,expires_at:new Date('2026-10-24T12:00:00Z')};
test('invitation failure scope derives bounded unique names only from UUID-bound fresh fixture',()=>{
 const scope=scopeFor(input);for(const key of ['sequence','fn','trigger']){assert.match(scope[key],/^[a-z0-9_]+$/);assert.ok(scope[key].length<63);}
 for(const key of ['stamp','tenantId','ownerId','oldId'])for(const invalid of [undefined,'foreign',stamp+"';DROP TABLE x;--"])assert.throws(()=>scopeFor({...input,[key]:invalid}));
 for(const email of ['person@example.com',input.email+"';--",'other@example.test'])assert.throws(()=>scopeFor({...input,email}));
});
test('invitation row must bind exact HTTP tenant actor id email role and active state before hook',()=>{
 const scope=scopeFor(input);assert.doesNotThrow(()=>requireBinding(scope,binding));
 for(const key of ['id','tenant_id','invited_by_identity_id','email','role'])assert.throws(()=>requireBinding(scope,{...binding,[key]:'foreign'}));
 for(const key of ['accepted_at','revoked_at'])assert.throws(()=>requireBinding(scope,{...binding,[key]:new Date()}));
 assert.throws(()=>requireBinding(scope,{...binding,expires_at:'2026-10-24T12:00:00Z'}));
});
test('cleanup never drops unowned or forged objects',async()=>{
 const scope=scopeFor(input),calls:string[]=[];const db={query:async(sql:string)=>{calls.push(sql);}};
 await cleanupHook(db,scope,{sequence:false,fn:false,trigger:false});assert.deepEqual(calls,[]);
 for(const key of ['sequence','fn','trigger'])await assert.rejects(cleanupHook(db,{...scope,[key]:'foreign_object'},{sequence:true,fn:true,trigger:true}));
 assert.deepEqual(calls,[]);
});
test('cleanup follows trigger function sequence order and clears only successful ownership flags',async()=>{
 const scope=scopeFor(input),calls:string[]=[],owned={sequence:true,fn:true,trigger:true};
 await cleanupHook({query:async(sql:string)=>{calls.push(sql);}},scope,owned);
 assert.deepEqual(calls,['DROP TRIGGER '+scope.trigger+' ON public.company_member_invitations','DROP FUNCTION public.'+scope.fn+'()','DROP SEQUENCE public.'+scope.sequence]);
 assert.deepEqual(owned,{sequence:false,fn:false,trigger:false});
});
test('cleanup still drains independent owned objects after a drop failure and fails closed',async()=>{
 const scope=scopeFor(input),calls:string[]=[],owned={sequence:true,fn:true,trigger:true};
 await assert.rejects(cleanupHook({query:async(sql:string)=>{calls.push(sql);if(sql.startsWith('DROP TRIGGER'))throw Error('fixture failure');}},scope,owned),/Owned hook cleanup failed/);
 assert.equal(calls.length,3);assert.deepEqual(owned,{sequence:false,fn:false,trigger:true});
});
