import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,UnauthorizedException,ForbiddenException,NotFoundException} from '@nestjs/common';
import {ConversationsController} from './conversations.controller';
import type {DatabaseService} from './database.service';
import type {AuthService} from './auth.service';
const ID='11111111-1111-4111-8111-111111111111';
function setup(authorized=true,found=true,access=true,existing=true){
 const contexts:string[]=[],queries:{sql:string;params:unknown[]}[]=[];const row={id:'fixture-message',body:'Hello',createdAt:'2026-10-11T00:00:00Z'};
 const auth={identityFromAuthorization:async()=>{if(!authorized)throw new UnauthorizedException();return {id:'trusted'}},requireMembership:async()=>({role:'owner'})};
 const db={tenant:async(tenant:string,op:(db:{query:(sql:string,params?:unknown[])=>Promise<{rows:unknown[]}>})=>Promise<unknown>)=>{contexts.push(tenant);return op({query:async(sql:string,params:unknown[]=[])=>{queries.push({sql,params});if(sql.startsWith('SELECT 1 FROM work_assignments wa JOIN'))return {rows:access?[{found:1}]:[]};if(sql.startsWith('SELECT 1 FROM work_assignments WHERE'))return {rows:found?[{found:1}]:[]};if(sql.startsWith('SELECT id FROM conversations'))return {rows:existing?[{id:'fixture-conversation'}]:[]};if(sql.startsWith('INSERT INTO conversations'))return {rows:[{id:'fixture-conversation'}]};if(sql.startsWith('INSERT INTO conversation_messages'))return {rows:[row]};if(sql.startsWith('SELECT DISTINCT p.identity_id'))return {rows:[{identityId:'trusted'},{identityId:'fixture-recipient'}]};return {rows:[]};}});}};
 return {controller:new ConversationsController(db as unknown as DatabaseService,auth as unknown as AuthService),contexts,queries,row};
}
async function invalid(body:unknown){const h=setup();await assert.rejects(h.controller.send(ID,body as never,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException);assert.equal(h.contexts.length,0);assert.equal(h.queries.length,0);}
test('conversation send rejects non-object JSON before accessing body or tenant SQL',async()=>{for(const b of [null,[],true,42,'text',{}])await invalid(b);});
test('conversation message requires text rather than coercing arrays or objects',async()=>{for(const body of [42,true,false,[],{},['Hello']])await invalid({body});});
test('conversation blank messages retain required-message rejection before writes',async()=>{for(const body of ['', '   ',null,undefined])await invalid({body});});
test('conversation GET and POST reject malformed assignment UUID before tenant reads or writes',async()=>{for(const id of ['bad','42',''])for(const send of [false,true]){const h=setup();await assert.rejects(send?h.controller.send(id,{body:'Hello'},'Bearer fixture','trusted-tenant'):h.controller.messages(id,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException);assert.equal(h.contexts.length,0);assert.equal(h.queries.length,0);}});
test('conversation authentication still precedes body and path validation',async()=>{const h=setup(false);await assert.rejects(h.controller.send('bad',null as never,undefined,'trusted-tenant'),(e:unknown)=>e instanceof UnauthorizedException);await assert.rejects(h.controller.messages('bad',undefined,'trusted-tenant'),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(h.contexts.length,0);});
test('conversation requires real assignment and participant ACL before messages or notifications',async()=>{for(const [h,kind] of [[setup(true,false),NotFoundException],[setup(true,true,false),ForbiddenException]] as const){await assert.rejects(h.controller.send(ID,{body:'Hello'},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof kind);assert.equal(h.queries.filter(q=>q.sql.startsWith('INSERT')).length,0);}});
test('valid conversation send preserves trusted tenant, trimmed message and real recipient notifications',async()=>{const h=setup();assert.deepEqual(await h.controller.send(ID,{body:' Hello ',tenantId:'untrusted',senderIdentityId:'untrusted'} as never,'Bearer fixture','trusted-tenant'),h.row);assert.deepEqual(h.contexts,['trusted-tenant']);const msg=h.queries.find(q=>q.sql.startsWith('INSERT INTO conversation_messages'))!;assert.deepEqual(msg.params,['trusted-tenant','fixture-conversation','trusted','Hello']);const alerts=h.queries.filter(q=>q.sql.startsWith('INSERT INTO notifications'));assert.equal(alerts.length,1);assert.equal(alerts[0]!.params[0],'trusted-tenant');assert.equal(alerts[0]!.params[1],'fixture-recipient');assert.ok(h.queries.some(q=>q.sql.includes('wa.tenant_id=$4')));});
test('valid conversation creation retains actual assignment bind and database acknowledgement',async()=>{const h=setup(true,true,true,false);assert.deepEqual(await h.controller.send(ID,{body:'Hello'},'Bearer fixture','trusted-tenant'),h.row);assert.deepEqual(h.queries.find(q=>q.sql.startsWith('INSERT INTO conversations'))!.params,['trusted-tenant',ID]);assert.equal(h.queries.filter(q=>q.sql.startsWith('INSERT INTO conversation_messages')).length,1);});
test('conversation database errors stay uncertain without inventing ACK or input failure',async()=>{const e=new Error('fixture_db'),auth={identityFromAuthorization:async()=>({id:'fixture'}),requireMembership:async()=>({role:'owner'})},db={tenant:async()=>{throw e}},c=new ConversationsController(db as unknown as DatabaseService,auth as unknown as AuthService);await assert.rejects(c.send(ID,{body:'Hello'},'Bearer fixture','trusted-tenant'),x=>x===e);});


test('concurrent first messages use one conversation row for the assignment',async()=>{
 const conversations:{id:string}[]=[],messages:{conversationId:string;body:string}[]=[];
 let selects=0,releaseReads!:()=>void;
 const bothReads=new Promise<void>(resolve=>{releaseReads=resolve;});
 const auth={identityFromAuthorization:async()=>({id:'trusted'}),requireMembership:async()=>({role:'owner'})};
 const db={tenant:async(_tenant:string,op:(db:{query:(sql:string,params?:unknown[])=>Promise<{rows:any[]}>})=>Promise<unknown>)=>op({query:async(sql:string,params:unknown[]=[])=>{
  if(sql.startsWith('SELECT 1 FROM work_assignments wa JOIN'))return {rows:[{found:1}]};
  if(sql.startsWith('SELECT 1 FROM work_assignments WHERE'))return {rows:[{found:1}]};
  if(sql.startsWith('SELECT id FROM conversations')){
   selects+=1;if(selects===2)releaseReads();await bothReads;return {rows:[]};
  }
  if(sql.startsWith('INSERT INTO conversations')){
   const existing=conversations[0];
   if(existing&&sql.includes('ON CONFLICT'))return {rows:[existing]};
   const row={id:'conversation-'+(conversations.length+1)};conversations.push(row);return {rows:[row]};
  }
  if(sql.startsWith('INSERT INTO conversation_messages')){
   messages.push({conversationId:String(params[1]),body:String(params[3])});
   return {rows:[{id:'message-'+messages.length,body:params[3],createdAt:'2026-10-13T00:00:00Z'}]};
  }
  if(sql.startsWith('SELECT DISTINCT p.identity_id'))return {rows:[]};
  return {rows:[]};
 }})};
 const controller=new ConversationsController(db as unknown as DatabaseService,auth as unknown as AuthService);
 const [first,second]=await Promise.all([
  controller.send(ID,{body:'Primeira'},'Bearer fixture','trusted-tenant'),
  controller.send(ID,{body:'Segunda'},'Bearer fixture','trusted-tenant')
 ]);
 assert.equal(conversations.length,1,'two overlapping first sends must share one conversation row');
 assert.equal(messages.length,2);
 assert.equal(messages[0]!.conversationId,messages[1]!.conversationId);
 assert.deepEqual([first.body,second.body].sort(),['Primeira','Segunda']);
});

test('conversation rejects more than4000 database Unicode characters before tenant SQL',async()=>{
 for(const body of ['a'.repeat(4001),'😀'.repeat(4001),'e\u0301'.repeat(2001)])await invalid({body});
});
test('conversation retains trimmed4000 Unicode codepoints trusted parameters and database ACK',async()=>{
 for(const text of ['a'.repeat(4000),'😀'.repeat(4000),'e\u0301'.repeat(2000)]){
  const h=setup();assert.deepEqual(await h.controller.send(ID,{body:' \n'+text+'\t ',tenantId:'spoof',senderIdentityId:'spoof'},'Bearer fixture','trusted-tenant'),h.row);
  assert.deepEqual(h.contexts,['trusted-tenant']);
  assert.deepEqual(h.queries.find(q=>q.sql.startsWith('INSERT INTO conversation_messages'))!.params,['trusted-tenant','fixture-conversation','trusted',text]);
  const alerts=h.queries.filter(q=>q.sql.startsWith('INSERT INTO notifications'));assert.equal(alerts.length,1);assert.equal(alerts[0]!.params[1],'fixture-recipient');
 }
});
test('conversation oversized input preserves authentication and membership precedence',async()=>{
 const h=setup(false);await assert.rejects(h.controller.send(ID,{body:'a'.repeat(4001)},undefined,'trusted-tenant'),e=>e instanceof UnauthorizedException);assert.equal(h.contexts.length,0);
 const error=new UnauthorizedException(),auth={identityFromAuthorization:async()=>({id:'trusted'}),requireMembership:async()=>{throw error}},db={tenant:async()=>{throw Error('must not access tenant SQL')}},c=new ConversationsController(db as unknown as DatabaseService,auth as unknown as AuthService);
 await assert.rejects(c.send(ID,{body:'😀'.repeat(4001)},'Bearer fixture','foreign-tenant'),e=>e===error);
});
