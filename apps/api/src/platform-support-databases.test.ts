import test from 'node:test';
import assert from 'node:assert/strict';
import {PlatformSupportDatabases,supportConfiguration,supportEnvironment,supportScopes} from './platform-support-databases';
const env=()=>Object.fromEntries([['DATABASE_URL','postgresql://authentication:secret@127.0.0.1:5432/local'],...supportScopes.map(scope=>[supportEnvironment(scope),'postgresql://'+scope+':secret@127.0.0.1:5432/local'])]);
test('four explicit distinct credentials on the auth database; no shared fallback',()=>{
 assert.ok(supportConfiguration(env()));
 for(const key of ['DATABASE_URL',...supportScopes.map(supportEnvironment)]){const x=env();delete x[key];assert.equal(supportConfiguration(x),null);}
 for(const value of ['not a URL','postgresql://authentication:secret@127.0.0.1:5432/local','postgresql://operator:secret@127.0.0.1:5432/local','postgresql://owner:secret@elsewhere:5432/local','postgresql://owner:secret@127.0.0.1:5432/other','postgresql://owner:secret@127.0.0.1:5432/local?options=-c%20role%3Dpostgres']){assert.equal(supportConfiguration({...env(),PLATFORM_SUPPORT_OWNER_DATABASE_URL:value}),null);}
});
test('missing configuration rejects all work without a connection, and never includes secrets',async()=>{
 const keys=['DATABASE_URL',...supportScopes.map(supportEnvironment)],saved=Object.fromEntries(keys.map(k=>[k,process.env[k]]));let service:PlatformSupportDatabases;
 try{for(const key of keys)delete process.env[key];process.env.DATABASE_URL='postgresql://privileged:DO_NOT_DISCLOSE@127.0.0.1/db';service=new PlatformSupportDatabases();}
 finally{for(const key of keys){if(saved[key]===undefined)delete process.env[key];else process.env[key]=saved[key];}}
 let callbacks=0;for(const scope of supportScopes)await assert.rejects(service.forScope(scope).transaction(async()=>{++callbacks;}),(error:unknown)=>error instanceof Error&&error.message==='platform_support_unavailable');assert.equal(callbacks,0);await service.onModuleDestroy();
});

test('remote credentials require certificate verification and cannot override connection/search path',()=>{
 const remote=Object.fromEntries(Object.entries(env()).map(([k,v])=>[k,v.replace('127.0.0.1','db.example.test')+'?sslmode=verify-full']));assert.ok(supportConfiguration(remote));
 for(const suffix of ['', '?sslmode=disable','?sslmode=require','?sslmode=verify-full&user=authentication','?sslmode=verify-full&host=elsewhere'])assert.equal(supportConfiguration({...remote,PLATFORM_SUPPORT_OWNER_DATABASE_URL:'postgresql://owner:secret@db.example.test:5432/local'+suffix}),null);
});
