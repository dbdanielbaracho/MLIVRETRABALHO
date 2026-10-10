import test from 'node:test';
import assert from 'node:assert/strict';
import {signupAccount} from '../lib/signup.ts';
const input={email:'  PERSON@EXAMPLE.TEST  ',password:'Password123!',accountType:'professional',workspaceName:''};
const response=(data,ok=true,status=ok?201:500)=>({ok,status,json:async()=>data});
const professional={id:'i',email:'person@example.test',accountType:'professional'};
test('professional signup uses normalized email and preserves the actual independent-account contract',async()=>{
 const calls=[];assert.deepEqual(await signupAccount(async(...args)=>{calls.push(args);return response(professional)},input),{status:'created',id:'i'});assert.deepEqual(calls,[['/auth/signup',{email:'person@example.test',password:'Password123!',accountType:'professional'}]]);
});
test('company signup needs the matching identity and real owner workspace acknowledgement',async()=>{
 const calls=[];assert.deepEqual(await signupAccount(async(...args)=>{calls.push(args);return response({...professional,accountType:'company',tenantId:'t',role:'owner'})},{...input,accountType:'company',workspaceName:'  Empresa  '}),{status:'created',id:'i',tenantId:'t'});assert.equal(calls[0][1].workspaceName,'Empresa');
 for(const data of [{...professional,accountType:'company'},{...professional,accountType:'company',tenantId:'t',role:'professional'}])assert.deepEqual(await signupAccount(async()=>response(data),{...input,accountType:'company',workspaceName:'Empresa'}),{status:'unknown'});
});
test('invalid email/password/workspace boundaries prevent signup before sending anything',async()=>{
 let calls=0;const request=async()=>{calls++;return response(professional)};
 for(const change of [{email:''},{email:'a b@c'},{email:'x'.repeat(321)+'@'},{password:'short'},{password:'x'.repeat(129)},{accountType:'invented'},{accountType:'company',workspaceName:' '},{accountType:'company',workspaceName:'x'.repeat(121)}])assert.deepEqual(await signupAccount(request,{...input,...change}),{status:'invalid'});assert.equal(calls,0);
});
test('malformed or unrelated signup acknowledgement never claims that an account was created',async()=>{
 for(const data of [{...professional,id:''},{...professional,email:'other@example.test'},{...professional,accountType:'company'},{...professional,tenantId:'invented'},null])assert.deepEqual(await signupAccount(async()=>response(data),input),{status:'unknown'});
});
test('email already in use is distinct from other actual rejections and uncertain server failure',async()=>{
 assert.deepEqual(await signupAccount(async()=>response({message:'email_in_use'},false,401),input),{status:'rejected',emailInUse:true});assert.deepEqual(await signupAccount(async()=>response({},false,400),input),{status:'rejected',emailInUse:false});assert.deepEqual(await signupAccount(async()=>response({},false,500),input),{status:'unknown'});
});
test('lost signup response is unknown and never automatically creates another identity or workspace',async()=>{
 let calls=0;assert.deepEqual(await signupAccount(async()=>{calls++;throw Error('timeout')},input),{status:'unknown'});assert.equal(calls,1);
});
test('invalid success JSON remains unknown while client rejection keeps its HTTP meaning',async()=>{
 assert.deepEqual(await signupAccount(async()=>({ok:true,status:201,json:async()=>{throw Error('JSON')}}),input),{status:'unknown'});assert.deepEqual(await signupAccount(async()=>({ok:false,status:401,json:async()=>{throw Error('JSON')}}),input),{status:'rejected',emailInUse:false});
});
