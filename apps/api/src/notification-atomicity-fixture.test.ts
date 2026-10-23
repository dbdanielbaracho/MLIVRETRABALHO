import {test} from 'node:test';
import assert from 'node:assert/strict';
const {validateFixtureEnvironment,failureDDL}=require('../../../scripts/notification-atomicity-e2e.cjs');
const local={CI:'true',DATABASE_URL:'postgresql://fixture:fixture@127.0.0.1:5432/mlivretrabalho_http',BASE_URL:'http://127.0.0.1:3000'};
test('notification failure fixture accepts only explicit local disposable CI origins',()=>{
 const x=validateFixtureEnvironment(local);assert.equal(x.database.pathname,'/mlivretrabalho_http');assert.equal(x.base.origin,local.BASE_URL);
 for(const CI of ['','false','production'])assert.throws(()=>validateFixtureEnvironment({...local,CI}));
});
test('notification batch fixture fails only the second of two exact chat recipients without changing grants',()=>{
 const tenant='11111111-1111-4111-8111-111111111111',first='22222222-2222-4222-8222-222222222222',second='33333333-3333-4333-8333-333333333333',suffix='1234567890abcdef12345678';
 const ddl=failureDDL(suffix,tenant,first,'new_message',second);
 assert.equal(ddl.expectedAttempts,2);assert.ok(ddl.create.includes('IF attempted=2 THEN'));assert.ok(ddl.create.includes('RETURN NEW;'));
 assert.ok(ddl.create.includes('SELECT count(*) FROM public.notifications WHERE tenant_id='));assert.ok(ddl.create.includes('ci_notification_batch_rows_missing'));
 assert.ok(ddl.create.includes("NEW.identity_id='"+first+"'::uuid OR NEW.identity_id='"+second+"'::uuid"));
 assert.ok(!/GRANT |ALTER ROLE|DISABLE ROW|CASCADE/i.test(ddl.create+ddl.drop));
 for(const args of [[suffix,tenant,first,'new_message',first],[suffix,tenant,first,'new_message','invalid'],[suffix,tenant,first,'assignment_confirmed',second],[suffix,tenant,first,'replacement_confirmed',second]])assert.throws(()=>failureDDL(...args));
});
test('notification failure fixture refuses foreign databases query overrides and wrong database names before connecting',()=>{
 for(const DATABASE_URL of ['postgresql://fixture:fixture@db.example:5432/mlivretrabalho_http','postgresql://fixture:fixture@localhost/mlivretrabalho_http','postgresql://fixture:fixture@localhost:5432/production','postgresql://fixture:fixture@localhost:5432/mlivretrabalho_http?host=elsewhere','postgresql://fixture:fixture@localhost:5432/mlivretrabalho_http#ignored','https://localhost:5432/mlivretrabalho_http'])assert.throws(()=>validateFixtureEnvironment({...local,DATABASE_URL}));
});
test('notification failure fixture refuses external credentialed or non-origin HTTP targets',()=>{
 for(const BASE_URL of ['https://localhost:3000','http://api.example:3000','http://localhost','http://secret@localhost:3000','http://localhost:3000/v1','http://localhost:3000/?override=1','http://localhost:3000/#fragment'])assert.throws(()=>validateFixtureEnvironment({...local,BASE_URL}));
});
test('notification injection DDL is restricted to exact tenant recipient and three existing notification types',()=>{
 const tenant='11111111-1111-4111-8111-111111111111',recipient='22222222-2222-4222-8222-222222222222',suffix='1234567890abcdef12345678';
 for(const type of ['assignment_confirmed','new_message','replacement_confirmed']){
  const ddl=failureDDL(suffix,tenant,recipient,type);
  assert.ok(ddl.create.includes("NEW.tenant_id='"+tenant+"'::uuid AND NEW.identity_id='"+recipient+"'::uuid AND NEW.type='"+type+"'"));
  assert.ok(ddl.create.includes('AFTER INSERT'));assert.ok(ddl.create.includes("current_setting('role') <> 'app_runtime'"));
  assert.ok(ddl.create.includes('pg_catalog.nextval'));assert.ok(ddl.create.includes('REVOKE ALL ON FUNCTION'));
  assert.ok(!/GRANT |DISABLE ROW|ALTER ROLE|CASCADE/i.test(ddl.create+ddl.drop));
  assert.ok(ddl.drop.includes('DROP TRIGGER '+ddl.name+'_trigger ON public.notifications;'));
 }
 for(const args of [[suffix,tenant,recipient,'unknown'],['bad;',tenant,recipient,'new_message'],[suffix,"bad';--",recipient,'new_message'],[suffix,tenant,'bad','new_message']])assert.throws(()=>failureDDL(...args));
});
