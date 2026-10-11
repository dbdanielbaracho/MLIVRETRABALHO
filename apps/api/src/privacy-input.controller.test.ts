import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,UnauthorizedException} from '@nestjs/common';
import {PrivacyController} from './privacy.controller';
import type {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
const types=['correction','erasure','restriction','objection','consent_withdrawal','automated_decision_review','sharing_information','portability'];
const required=new Set(['correction','restriction','objection','automated_decision_review']);
function setup(options:{authorized?:boolean;missing?:boolean;error?:Error}={}){
 const calls:{sql:string;params:unknown[]}[]=[],authority:string[]=[];
 const auth={identityFromAuthorization:async()=>{authority.push('auth');if(options.authorized===false)throw new UnauthorizedException();return{id:'trusted-identity'};}};
 const query=async(sql:string,params:unknown[]=[])=>{calls.push({sql,params});if(options.error)throw options.error;return{rows:sql.startsWith('INSERT')?(options.missing?[]:[{id:'real-request-id'}]):[{id:'actual-own-row',status:'submitted'}]};};
 return{controller:new PrivacyController({query} as unknown as DatabaseService,auth as unknown as AuthService),calls,authority};
}
const bad=(message:string)=>(e:unknown)=>e instanceof BadRequestException&&e.message===message;
test('privacy manual request rejects non-object JSON and missing or non-string type before creating a request',async()=>{
 for(const body of [undefined,null,false,true,42,'correction',[],{}, {requestType:null},{requestType:false},{requestType:42},{requestType:{}},{requestType:['correction']},{requestType:['erasure']}]){const h=setup();await assert.rejects(h.controller.request(body as never,'Bearer fixture'),bad('privacy_request_type_invalid'));assert.deepEqual(h.authority,['auth']);assert.equal(h.calls.length,0);}
});
test('privacy manual requests preserve the allowlist and do not accept access or deactivation as manual types',async()=>{
 for(const requestType of ['','unknown','access','deactivation',' Correction','CORRECTION']){const h=setup();await assert.rejects(h.controller.request({requestType,details:'text'},'Bearer fixture'),bad('privacy_request_type_invalid'));assert.equal(h.calls.length,0);}
});
test('privacy details reject booleans numbers arrays and objects for every manual request without coercion or writes',async()=>{
 for(const requestType of types)for(const details of [false,true,42,[],['text'],{}]){const h=setup();await assert.rejects(h.controller.request({requestType,details} as never,'Bearer fixture'),bad('privacy_request_details_invalid'));assert.equal(h.calls.length,0);}
});
test('privacy optional details preserve omitted null empty or blank as database NULL',async()=>{
 for(const requestType of types.filter(x=>!required.has(x)))for(const details of [undefined,null,'','  ']){const h=setup();const row=await h.controller.request({requestType,details} as never,'Bearer fixture');assert.deepEqual(row,{requestId:'real-request-id',requestType,status:'submitted'});assert.deepEqual(h.calls[0]?.params,['trusted-identity',requestType,'submitted',null]);}
});
test('privacy required details preserve required errors for the exact original four request types',async()=>{
 for(const requestType of required)for(const details of [undefined,null,'','  ']){const h=setup();await assert.rejects(h.controller.request({requestType,details} as never,'Bearer fixture'),bad('privacy_request_details_required'));assert.equal(h.calls.length,0);}
});
test('privacy text details preserve trimming 2000-character boundary and trusted identity with real request ACK',async()=>{
 for(const requestType of types){const h=setup();const row=await h.controller.request({requestType,details:'  '+'x'.repeat(2000)+'  ',identityId:'untrusted-identity'} as never,'Bearer fixture');assert.equal(row.requestId,'real-request-id');assert.deepEqual(h.calls[0]?.params,['trusted-identity',requestType,'submitted','x'.repeat(2000)]);assert.match(h.calls[0]!.sql,/^INSERT INTO privacy_requests\(identity_id,request_type,status,request_details\)/);
 const long=setup();await assert.rejects(long.controller.request({requestType,details:'x'.repeat(2001)},'Bearer fixture'),bad('privacy_request_details_too_long'));assert.equal(long.calls.length,0);}
});
test('privacy auth precedes malformed input and type validation precedes details validation',async()=>{
 const auth=setup({authorized:false});await assert.rejects(auth.controller.request(null as never,undefined),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(auth.calls.length,0);
 const h=setup();await assert.rejects(h.controller.request({requestType:[],details:false} as never,'Bearer fixture'),bad('privacy_request_type_invalid'));assert.equal(h.calls.length,0);
});
test('privacy manual request propagates missing insert or database failure without synthetic request success',async()=>{
 const h=setup({missing:true});await assert.rejects(h.controller.request({requestType:'erasure'},'Bearer fixture'),/privacy_request_insert_missing/);assert.equal(h.calls.length,1);
 const error=new Error('database unavailable'),db=setup({error});await assert.rejects(db.controller.request({requestType:'erasure'},'Bearer fixture'),e=>e===error);
});
test('privacy requests list retains trusted authenticated identity and real rows without operator metadata or writes',async()=>{
 const h=setup();const rows=await h.controller.requests('Bearer fixture');assert.deepEqual(rows,[{id:'actual-own-row',status:'submitted'}]);assert.deepEqual(h.calls[0]?.params,['trusted-identity']);assert.match(h.calls[0]!.sql,/WHERE identity_id=\$1 ORDER BY created_at DESC/);assert.doesNotMatch(h.calls[0]!.sql,/handled_by|operator_note|evidence_ref/);
});
