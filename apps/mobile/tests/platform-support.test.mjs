import test from 'node:test';
import assert from 'node:assert/strict';
import {createPlatformIntentStore,createPlatformSupportFlow,platformInput,platformCase,platformPage,platformDetail} from '../lib/platform-support.ts';
const a='11111111-1111-4111-8111-111111111111',b='22222222-2222-4222-8222-222222222222',key='33333333-3333-4333-8333-333333333333';
const ack={id:key,category:'other',status:'open',createdAt:'2026-10-25T12:00:00.000Z'},input={category:'other',description:'Private draft'},prepared={requestKey:key,expiresAt:'2099-01-01T00:00:00.000Z'};
const response=(data,status=200)=>({ok:status>=200&&status<300,status,json:async()=>data});
function harness({storage,timeout=50}={}){
 const map=storage??new Map(),calls=[];let auth='Bearer a',actor=a,handler=async()=>response({items:[],nextCursor:null,acceptingRequests:true}),current=true,failWrite=false;
 const store=createPlatformIntentStore({read:async id=>map.get(id)??null,write:async(id,raw)=>{if(failWrite)throw Error('disk');map.set(id,raw);},remove:async id=>map.delete(id)});
 const options={getHeaders:async()=>auth?{Authorization:auth,'x-tenant-id':'MUST_NOT_BE_SENT'}:{},store,isCurrent:()=>current,timeoutMs:timeout,transport:async(path,init)=>{calls.push({path,init});return path==='/me'?response({id:actor}):handler(path,init);}};
 const flow=createPlatformSupportFlow(options);return {flow,map,calls,store,options,handler:f=>{handler=f;},identity:id=>{actor=id;auth='Bearer '+id;},fail:()=>{failWrite=true;},current:value=>{current=value;}};
}
async function ready(h){assert.equal((await h.flow.load()).status,'ready');}
const responses=(path,init)=>path.endsWith('/intent')?response(prepared,201):init.method==='POST'?response(ack,201):response(ack);
test('strict Unicode input and server parsers reject malformed data, discard private extra fields',()=>{
 assert.equal(platformInput('other','\ud800'),null);assert.equal(platformInput('other','\0'),null);assert.equal(platformInput('unknown','test'),null);assert.equal(platformInput('other','😀'.repeat(4001)),null);assert.ok(platformInput('other','😀'.repeat(4000)));
 assert.equal(platformCase({...ack,createdAt:'2026-02-30T00:00:00Z'}),null);assert.equal(platformCase({...ack,status:'success'}),null);
 assert.deepEqual(platformPage({items:[{...ack,description:'secret'}],nextCursor:null,acceptingRequests:false}).items,[ack]);assert.equal(platformPage({items:[ack,ack],nextCursor:null,acceptingRequests:true}),null);
 assert.equal(platformDetail({...ack,updatedAt:ack.createdAt,description:null,closedAt:null,responses:[{}]}),null);
});
test('send stages only metadata with verified readback before a single POST; exact key binds ACK',async()=>{
 const h=harness();await ready(h);h.handler((p,i)=>{if(p==='/me/platform-support'&&i.method==='POST'){const stored=JSON.parse(h.map.get(a));assert.equal(stored.requestKey,key);assert.equal(Object.hasOwn(stored,'description'),false);assert.equal(Object.hasOwn(stored,'token'),false);assert.ok(!h.map.get(a).includes(input.description));}return responses(p,i);});
 const r=await h.flow.send('other',input.description);assert.equal(r.status,'confirmed');assert.equal(r.data.id,key);assert.equal(h.calls.filter(x=>x.path==='/me/platform-support'&&x.init.method==='POST').length,1);assert.ok(h.calls.every(x=>!('x-tenant-id' in x.init.headers)));
});
test('lost ACK restores across a new flow through GET only and permits clear only after confirmation',async()=>{
 const h=harness();await ready(h);h.handler(async(p,i)=>{if(p.endsWith('/intent'))return response(prepared,201);throw Error('lost');});assert.equal((await h.flow.send('other',input.description)).status,'unknown');
 const before=h.calls.filter(x=>x.init.method==='POST').length;h.handler(()=>response(ack));const fresh=createPlatformSupportFlow(h.options);assert.equal((await fresh.load()).status,'confirmed');assert.equal(h.calls.filter(x=>x.init.method==='POST').length,before);assert.equal((await fresh.release()).status,'cleared');assert.equal(h.map.has(a),false);
});
test('bad ACK never confirms, and preparation does not cause automatic retry',async()=>{
 const h=harness();await ready(h);h.handler((p,i)=>p.endsWith('/intent')?response(prepared,201):response({...ack,id:b},201));assert.equal((await h.flow.send('other',input.description)).status,'unknown');
 h.handler(()=>response({status:'prepared'}));const n=h.calls.length;assert.equal((await h.flow.load()).status,'prepared');assert.ok(h.calls.slice(n).every(x=>x.init.method==='GET'));assert.equal((await h.flow.release()).status,'prepared');assert.ok(h.map.has(a));
});
test('only explicit retry after GET prepared reuses the same durable key; payload conflict keeps metadata',async()=>{
 const h=harness();await ready(h);h.handler((p,i)=>p.endsWith('/intent')?response(prepared,201):response({},500));await h.flow.send('other',input.description);
 h.handler((p,i)=>i.method==='GET'?response({status:'prepared'}):response({},409));assert.equal((await h.flow.retry('Different description')).status,'conflict');assert.equal(h.calls.at(-1).init.headers['idempotency-key'],key);assert.ok(h.map.has(a));
});
test('new identity cannot send the previous identity draft, access its slot or apply delayed responses',async()=>{
 const h=harness();await ready(h);h.identity(b);const n=h.calls.length;assert.equal((await h.flow.send('other',input.description)).status,'stale');assert.ok(h.calls.slice(n).every(x=>x.init.method==='GET'));
 h.handler(()=>response({items:[],nextCursor:null,acceptingRequests:true}));await h.flow.load();h.handler(responses);assert.equal((await h.flow.send('other',input.description)).status,'confirmed');assert.ok(h.map.has(b));assert.equal(h.map.has(a),false);
 let release;h.handler(()=>new Promise(r=>{release=r;}));const pending=h.flow.detail(key);await new Promise(r=>setImmediate(r));h.identity(a);release(response({...ack,updatedAt:ack.createdAt,description:'Secret',closedAt:null,responses:[]}));assert.equal((await pending).status,'stale');
});
test('storage failure blocks submit, uncertain reads do not erase pending descriptor',async()=>{
 const h=harness();await ready(h);h.fail();h.handler(responses);assert.equal((await h.flow.send('other',input.description)).status,'unknown');assert.equal(h.calls.some(x=>x.path==='/me/platform-support'&&x.init.method==='POST'),false);
});
test('deadline covers auth, transport and JSON; late results cannot trigger POST after cancellation',async()=>{
 const h=harness({timeout:5});await ready(h);let release;h.handler(()=>new Promise(r=>{release=r;}));const p=h.flow.send('other',input.description);assert.equal((await p).status,'error');release(response(prepared,201));await new Promise(r=>setImmediate(r));assert.equal(h.calls.some(x=>x.path==='/me/platform-support'&&x.init.method==='POST'),false);
 const flow=createPlatformSupportFlow({...h.options,getHeaders:()=>new Promise(()=>{}),timeoutMs:5});assert.equal((await flow.load()).status,'error');
 const json=createPlatformSupportFlow({...h.options,transport:async()=>({ok:true,status:200,json:()=>new Promise(()=>{})}),timeoutMs:5});assert.equal((await json.load()).status,'error');
});
test('default unavailable prevents intake on server503 and preserves draft outside recovery metadata',async()=>{
 const h=harness();await ready(h);h.handler(()=>response({},503));assert.equal((await h.flow.send('other',input.description)).status,'unavailable');assert.equal(h.map.size,0);
});
test('expired descriptor requires terminal GET plus missing detail, releases without creating a case',async()=>{
 const h=harness();await ready(h);h.map.set(a,JSON.stringify({version:1,identityId:a,requestKey:key,category:'other',expiresAt:'2026-01-01T00:00:00.000Z'}));h.handler(p=>response({},p.includes('/recovery/')?409:404));assert.equal((await h.flow.load()).status,'expired');const n=h.calls.length;assert.equal((await h.flow.release()).status,'cleared');assert.ok(h.calls.slice(n).every(x=>x.init.method==='GET'));assert.equal(h.map.has(a),false);
});
