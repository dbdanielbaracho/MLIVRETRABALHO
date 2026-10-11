import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,UnauthorizedException} from '@nestjs/common';
import {TermsController} from './terms.controller';
import type {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
function setup(options:{authorized?:boolean;error?:Error;role?:string}={}){
 const calls:{sql:string;params:unknown[]}[]=[],actors:string[]=[];
 const accepted=[{termsKey:'platform_terms',version:'1.0',acceptedAt:'2026-10-11T00:00:00Z'},{termsKey:'privacy_notice',version:'1.0',acceptedAt:'2026-10-11T00:00:01Z'}];
 const auth={identityFromAuthorization:async()=>{actors.push('auth');if(options.authorized===false)throw new UnauthorizedException();return{id:'trusted-identity'};},memberships:async(id:string)=>{assert.equal(id,'trusted-identity');return[{role:options.role??'owner'}];}};
 const db={query:async(sql:string,params:unknown[]=[])=>{calls.push({sql,params});if(options.error)throw options.error;if(sql.startsWith('INSERT'))return{rows:[{termsKey:params[1],version:params[2],acceptedAt:accepted[0].acceptedAt}]};return{rows:accepted};}};
 return{controller:new TermsController(db as unknown as DatabaseService,auth as unknown as AuthService),calls,actors,accepted};
}
const bad=(e:unknown)=>e instanceof BadRequestException&&e.message==='terms_key_and_version_required';
test('terms accept rejects non-object JSON as bad request without writing acceptance',async()=>{
 for(const body of [undefined,null,false,true,42,'text',[],{}]){const h=setup();await assert.rejects(h.controller.accept(body as never,'Bearer fixture'),bad);assert.equal(h.calls.length,0);}
});
test('terms accept rejects non-text empty and blank keys without coercing JSON values',async()=>{
 for(const termsKey of [undefined,null,false,true,42,[],{},['platform_terms'],'','  ']){const h=setup();await assert.rejects(h.controller.accept({termsKey,version:'1.0'} as never,'Bearer fixture'),bad);assert.equal(h.calls.length,0);}
});
test('terms accept rejects non-text empty and blank versions without coercing JSON values',async()=>{
 for(const version of [undefined,null,false,true,42,[],{},['1.0'],'','  ']){const h=setup();await assert.rejects(h.controller.accept({termsKey:'platform_terms',version} as never,'Bearer fixture'),bad);assert.equal(h.calls.length,0);}
});
test('terms accept preserves trimmed strings existing keys and real ACK from trusted identity',async()=>{
 for(const [key,version] of [['platform_terms','1.0'],['privacy_notice','1.0'],['fixture_future_key','fixture_future_version']]){const h=setup();const row=await h.controller.accept({termsKey:'  '+key+'  ',version:' '+version+' ',identityId:'spoof'} as never,'Bearer fixture');assert.deepEqual(h.calls[0]?.params,['trusted-identity',key,version]);assert.deepEqual(row,{termsKey:key,version,acceptedAt:h.accepted[0].acceptedAt});assert.equal(h.calls.length,1);}
});
test('terms malformed JSON cannot bypass authorization or write acceptance when unauthenticated',async()=>{
 const h=setup({authorized:false});await assert.rejects(h.controller.accept(null as never),(e:unknown)=>e instanceof UnauthorizedException);assert.deepEqual(h.actors,['auth']);assert.equal(h.calls.length,0);
});
test('terms database failure rejects without fabricated acceptance ACK',async()=>{
 const error=new Error('database unavailable'),h=setup({error});await assert.rejects(h.controller.accept({termsKey:'platform_terms',version:'1.0'},'Bearer fixture'),e=>e===error);assert.equal(h.calls.length,1);
});
test('terms list and status retain identity scope and explicit version policy for both account types',async()=>{
 for(const role of ['owner','admin','manager','company','professional']){const h=setup({role});assert.deepEqual(await h.controller.list('Bearer fixture'),h.accepted);const status=await h.controller.status('Bearer fixture');assert.equal(status.accountType,role==='professional'?'professional':'company');assert.equal(status.compliant,true);assert.deepEqual(status.missing,[]);assert.deepEqual(status.accepted,h.accepted);assert.deepEqual(h.calls.map(x=>x.params),[['trusted-identity'],['trusted-identity']]);}
});
