import test from 'node:test';
import assert from 'node:assert/strict';
import {runForSession} from '../lib/session-context.ts';
import { loadNotifications,markNotificationRead,notificationContextHeaders } from '../lib/notifications.ts';

test('successful empty notifications differ from HTTP/network/JSON/schema failures',async()=>{
 assert.deepEqual(await loadNotifications(async()=>({ok:true,json:async()=>[]})),{status:'ready',data:[]});
 for(const request of [async()=>({ok:false,json:async()=>[]}),async()=>{throw Error('offline');},async()=>({ok:true,json:async()=>{throw Error('bad json');}}),async()=>({ok:true,json:async()=>({error:'not_an_array'})}),async()=>({ok:true,json:async()=>[null]}),async()=>({ok:true,json:async()=>[{id:'n',title:'No tenant'}]})])assert.deepEqual(await loadNotifications(request),{status:'error'});
});
test('multiple company notifications preserve the exact tenant of each item, including read status',async()=>{
 const rows=[{id:'a',tenantId:'company-a',title:'A',body:'text-a',createdAt:'2026-10-09T15:00:00Z',readAt:null},{id:'b',tenantId:'company-b',title:'B',body:'text-b',createdAt:'2026-10-09T14:00:00Z',readAt:'2026-10-09T14:30:00Z'}];
 const result=await loadNotifications(async()=>({ok:true,json:async()=>rows}));
 assert.deepEqual(result,{status:'ready',data:rows});
});
test('retry recovers actual notification data after a failure',async()=>{
 const failed=await loadNotifications(async()=>{throw Error('offline');});assert.equal(failed.status,'error');
 const row={id:'real',tenantId:'tenant-real',title:'Confirmed',body:'Real work',createdAt:'2026-10-09T15:00:00Z'};
 assert.deepEqual(await loadNotifications(async()=>({ok:true,json:async()=>[row]})),{status:'ready',data:[row]});
});

test('invalid notification IDs or dates never become a ready list',async()=>{
 const row={id:'real',tenantId:'company-a',title:'Real',body:'body',createdAt:'2026-10-10T07:00:00Z',readAt:null};
 for(const data of [{...row,id:' '},{...row,tenantId:''},{...row,createdAt:'invalid'},{...row,readAt:''},{...row,readAt:'invalid'}])assert.equal((await loadNotifications(async()=>({ok:true,json:async()=>[data]}))).status,'error');
});
test('company lists reject a payload from another tenant while professional lists preserve multi-company items',async()=>{
 const rows=[{id:'a',tenantId:'company-a',title:'A',body:'a',createdAt:'2026-10-10T07:00:00Z'},{id:'b',tenantId:'company-b',title:'B',body:'b',createdAt:'2026-10-10T07:00:00Z'}];
 const request=async()=>({ok:true,json:async()=>rows});
 assert.equal((await loadNotifications(request,'company-a')).status,'error');assert.deepEqual(await loadNotifications(request),{status:'ready',data:rows});
});
test('company header reader requires the selected tenant and rejects a switch before or after requests',async()=>{
 let selected='company-a';const read=notificationContextHeaders(async()=>({Authorization:'Bearer a','x-tenant-id':selected}),true,'company-a');
 assert.equal((await read())['x-tenant-id'],'company-a');selected='company-b';await assert.rejects(read,/tenant_changed/);
 await assert.rejects(notificationContextHeaders(async()=>({Authorization:'Bearer a'}),true),/tenant_required/);
 await assert.rejects(notificationContextHeaders(async()=>({Authorization:'Bearer a','x-tenant-id':'company-b'}),true,'company-a'),/tenant_changed/);
});
test('professional notification context does not depend on an unrelated selected company',async()=>{
 let tenant='company-a';const read=notificationContextHeaders(async()=>({Authorization:'Bearer pro','x-tenant-id':tenant}),false);
 await read();tenant='company-b';assert.equal((await read()).Authorization,'Bearer pro');
});
test('read sends the exact notification tenant and validates backend ID and actual read timestamp',async()=>{
 let calls=0;const n={id:'real/id',tenantId:'company-b'};const at='2026-10-10T07:00:00Z';
 const result=await markNotificationRead(async(path,tenant)=>{calls++;assert.equal(path,'/notifications/real%2Fid/read');assert.equal(tenant,'company-b');return {ok:true,json:async()=>({id:n.id,readAt:at})}},n);
 assert.deepEqual(result,{status:'confirmed',readAt:at});assert.equal(calls,1);
 for(const data of [null,{}, {id:'other',readAt:at},{id:n.id,readAt:null},{id:n.id,readAt:'invalid'}])assert.equal((await markNotificationRead(async()=>({ok:true,json:async()=>data}),n)).status,'unknown');
});
test('invalid read identifiers avoid POST and uncertain outcomes do not repeat it',async()=>{
 let calls=0;const request=async()=>{calls++;throw Error('offline')};
 for(const n of [{id:'',tenantId:'company-a'},{id:'real',tenantId:' '}])assert.equal((await markNotificationRead(request,n)).status,'rejected');
 assert.equal(calls,0);assert.equal((await markNotificationRead(request,{id:'real',tenantId:'company-a'})).status,'unknown');assert.equal(calls,1);
 for(const [status,want] of [[403,'rejected'],[500,'unknown']])assert.equal((await markNotificationRead(async()=>({ok:false,status,json:async()=>{throw Error('not used')}}),{id:'real',tenantId:'company-a'})).status,want);
 assert.equal((await markNotificationRead(async()=>({ok:true,json:async()=>{throw Error('JSON')}}),{id:'real',tenantId:'company-a'})).status,'unknown');
});
test('company switch during a read rejects acknowledgement even if Authorization remains unchanged',async()=>{
 let tenant='company-a',calls=0;const headers=notificationContextHeaders(async()=>({Authorization:'Bearer owner','x-tenant-id':tenant}),true,'company-a');
 const result=await runForSession(headers,async()=>{calls++;tenant='company-b';return {status:'confirmed',readAt:'2026-10-10T07:00:00Z'}},()=>true,'Bearer owner');
 assert.equal(result.status,'error');assert.equal(calls,1);assert.equal('data' in result,false);
});
