import test from 'node:test';
import assert from 'node:assert/strict';
import { loadNotifications } from '../lib/notifications.ts';

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
