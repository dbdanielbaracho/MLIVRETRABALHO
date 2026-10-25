import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {confirmsPreferences,preferencesDraft,readPreferences,writePreferences} from '../lib/preferences.ts';
// Execute the actual pre-JSX screen hooks; this is not a rendered/native-device assertion.
function harness(){
 const source=fs.readFileSync(new URL('../app/preferencias.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function Preferencias('),end=source.indexOf('\n const editable=',start);
 const code=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\nreturn {load,save};\n}',{mode:'strip'});
 const state=[],refs=[],timers=new Map(),calls=[];let si=0,ri=0,focus,handlers,authorization='Bearer first',handler=async()=>{throw Error('offline')},nextTimer=0;
 const create=new Function('useState','useRef','useCallback','useFocusEffect','authHeaders','apiUrl','fetch','confirmsPreferences','preferencesDraft','readPreferences','writePreferences','setTimeout','clearTimeout',code+';return Preferencias();');
 function render(){si=0;ri=0;handlers=create(initial=>{const i=si++;if(!(i in state))state[i]=initial;return[state[i],value=>{state[i]=typeof value==='function'?value(state[i]):value;}];},initial=>{const i=ri++;return refs[i]??(refs[i]={current:initial});},cb=>cb,cb=>{focus=cb;},async()=>authorization?{Authorization:authorization}:{},p=>p,async(path,init={})=>{calls.push({path,init});return handler(path,init);},confirmsPreferences,preferencesDraft,readPreferences,writePreferences,cb=>{const id=++nextTimer;timers.set(id,cb);return id;},id=>timers.delete(id));return handlers;}
 return {state,refs,calls,render,setHandler:fn=>{handler=fn;},session:value=>{authorization=value;},expire:()=>{for(const cb of [...timers.values()])cb();},edit:(roles,cities)=>{state[3]=roles;state[4]=cities;refs[4].current=true;render();},focus:()=>{render();return focus();}};
}
const empty={configured:false,preferredRoleIds:[],preferredCities:[],revision:0,updatedAt:null},catalog=[{id:'hospitality.waiter',role:'waiter'}],ack={configured:true,preferredRoleIds:['hospitality.waiter'],preferredCities:['São Paulo'],revision:1,updatedAt:'2026-10-25T12:00:00.000Z'};
const response=(data,status=200)=>({ok:status>=200&&status<300,status,json:async()=>data});
async function ready(h){h.setHandler(async path=>response(path==='/taxonomy/roles'?catalog:empty));await h.render().load();h.render();assert.equal(h.state[0],'ready');}
test('screen loads absence without writing, and confirms exact persisted save',async()=>{
 const h=harness();await ready(h);assert.equal(h.calls.some(x=>x.init.method==='PUT'),false);
 h.edit(['hospitality.waiter'],'São Paulo');h.setHandler(async()=>response(ack));await h.render().save();assert.equal(h.state[0],'ready');assert.equal(h.state[1].revision,1);assert.equal(h.state[5],'Preferências salvas.');
});
test('conflict preserves draft, blocks another PUT and requires GET reconciliation first',async()=>{
 const h=harness();await ready(h);h.edit(['hospitality.waiter'],'São Paulo');h.setHandler(async()=>response({message:'preferences_revision_conflict'},409));await h.render().save();assert.equal(h.state[0],'conflict');const writes=()=>h.calls.filter(x=>x.init.method==='PUT').length;
 await h.render().save();assert.equal(writes(),1);assert.equal(h.state[4],'São Paulo');
 h.setHandler(async path=>response(path==='/taxonomy/roles'?catalog:{...ack,preferredCities:['Recife']}));await h.render().load();assert.equal(writes(),1);assert.equal(h.state[4],'São Paulo');assert.equal(h.state[1].preferredCities[0],'Recife');
});
test('lost response reconciles through GET and never automatically reposts',async()=>{
 const h=harness();await ready(h);h.edit(['hospitality.waiter'],'São Paulo');h.setHandler(async()=>{throw Error('response_lost');});await h.render().save();assert.equal(h.state[0],'unknown');
 h.setHandler(async path=>response(path==='/taxonomy/roles'?catalog:ack));await h.render().load();assert.equal(h.state[5],'Conteúdo salvo confirmado no perfil.');assert.equal(h.calls.filter(x=>x.init.method==='PUT').length,1);assert.equal(h.refs[5].current,null);
});
test('deadline releases UI but leaves uncertain write blocked until a successful read',async()=>{
 const h=harness();await ready(h);h.edit(['hospitality.waiter'],'São Paulo');let settle;
 h.setHandler(()=>new Promise(resolve=>{settle=resolve;}));const write=h.render().save();await new Promise(resolve=>setImmediate(resolve));h.expire();assert.equal(h.state[0],'unknown');await h.render().save();assert.equal(h.calls.filter(x=>x.init.method==='PUT').length,1);settle(response(ack));await write;assert.equal(h.state[0],'unknown');
});
test('new identity clears old draft and stale response cannot repopulate it',async()=>{
 const h=harness();await ready(h);h.edit(['hospitality.waiter'],'Private draft');let settle;
 h.setHandler(async path=>path==='/taxonomy/roles'?response(catalog):new Promise(resolve=>{settle=resolve;}));const old=h.render().load();await new Promise(resolve=>setImmediate(resolve));h.session('Bearer second');settle(response(ack));await old;assert.equal(h.state[0],'session');assert.equal(h.state[1],null);assert.equal(h.state[4],'');assert.deepEqual(h.state[3],[]);
});
test('catalog failure permits a saved-state read but prevents a write',async()=>{
 const h=harness();h.setHandler(async path=>path==='/taxonomy/roles'?response({},503):response(ack));await h.render().load();assert.equal(h.state[1].revision,1);assert.equal(h.state[2],null);await h.render().save();assert.equal(h.calls.filter(x=>x.init.method==='PUT').length,0);
});
