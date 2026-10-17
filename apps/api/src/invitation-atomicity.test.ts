import test from 'node:test';
import assert from 'node:assert/strict';
const {scopeFor,requireBinding,cleanupHook,requireAcceptanceBinding,acceptanceFunctionSQL}=require('../../../scripts/invitation-atomicity-e2e.cjs');
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

const targetId='00000000-0000-4000-8000-000000000005';
const acceptInput={...input,phase:'accept',targetId};
test('late accept hook has a separate UUID namespace and refuses unknown phase or acceptor',()=>{
 const scope=scopeFor(acceptInput);assert.notEqual(scope.fn,scopeFor(input).fn);
 for(const key of ['sequence','fn','trigger']){assert.match(scope[key],/^inv_accept_[a-f0-9]{32}_(seq|fn|trg)$/);assert.ok(scope[key].length<63);}
 for(const targetId of [undefined,'foreign',stamp+"';--"])assert.throws(()=>scopeFor({...acceptInput,targetId}));
 for(const phase of ['insert','revoke',true])assert.throws(()=>scopeFor({...acceptInput,phase}));
});
test('accept INSERT case requires unconsumed bound invitation and no target membership',()=>{
 const scope=scopeFor(acceptInput),row={...binding,accepted_by_identity_id:null};
 assert.doesNotThrow(()=>requireAcceptanceBinding(scope,row,[]));
 assert.throws(()=>requireAcceptanceBinding(scope,{...row,accepted_by_identity_id:targetId},[]));
 assert.throws(()=>requireAcceptanceBinding(scope,row,[{identity_id:targetId,role:'manager'}]));
 assert.throws(()=>requireAcceptanceBinding(scopeFor(input),row,[]));
 for(const key of ['id','tenant_id','invited_by_identity_id','email','role'])assert.throws(()=>requireAcceptanceBinding(scope,{...row,[key]:'foreign'},[]));
});
test('accept witness SQL binds both writes before sequence and failure, with no runtime grant',()=>{
 const scope=scopeFor(acceptInput),sql=acceptanceFunctionSQL(scope);
 for(const text of ["NEW.id='"+oldId,"NEW.tenant_id='"+tenantId,"NEW.invited_by_identity_id='"+ownerId,"NEW.accepted_by_identity_id='"+targetId,'OLD.accepted_at IS NULL','NEW.accepted_at IS NOT NULL','public.tenant_memberships','public.company_member_invitations',"role='manager'",'visible_members<>1 OR visible_invitations<>1','SECURITY DEFINER SET search_path=pg_catalog,public'])assert.ok(sql.includes(text));
 assert.ok(sql.indexOf('visible_members<>1')<sql.indexOf('pg_catalog.nextval'));
 assert.ok(sql.indexOf('pg_catalog.nextval')<sql.indexOf("RAISE EXCEPTION 'fixture_invitation_accept_update_failure'"));
 assert.doesNotMatch(sql,/GRANT|BYPASSRLS|DISABLE ROW LEVEL|CASCADE|CREATE OR REPLACE/i);
 for(const key of ['sequence','fn','trigger'])assert.throws(()=>acceptanceFunctionSQL({...scope,[key]:'foreign'}));
});
test('accept cleanup preserves ownership guards and never targets the renewal namespace',async()=>{
 const scope=scopeFor(acceptInput),calls:string[]=[],owned={sequence:true,fn:true,trigger:true};
 await cleanupHook({query:async(sql:string)=>{calls.push(sql);}},scope,owned);
 assert.equal(calls.length,3);assert.ok(calls.every(sql=>sql.includes('inv_accept_')&&!sql.includes('inv_atomicity_')));
 assert.deepEqual(owned,{sequence:false,fn:false,trigger:false});
 await assert.rejects(cleanupHook({query:async()=>{throw Error('must not query');}},{...scope,sequence:scopeFor(input).sequence},{sequence:true,fn:false,trigger:false}),/Owned cleanup identifier/);
});

