import test from 'node:test';
import assert from 'node:assert/strict';
import {loadAgenda,submitAgendaAction} from '../lib/agenda.ts';
import {loadEarnings} from '../lib/earnings.ts';
import {loadNotifications,markNotificationRead} from '../lib/notifications.ts';
import {rateCompletedAssignment} from '../lib/company-dashboard-actions.ts';

const impossible=['2026-02-30T12:00:00Z','2025-02-29T12:00:00-03:00','2026-04-31T12:00:00+02:00'];
const valid=['2024-02-29T12:00:00Z','2024-02-29T23:30:00-03:00','2026-04-30T12:00:00+02:00'];
const assignment={id:'work',tenantId:'tenant',title:'Actual work',status:'confirmed',startsAt:null,endsAt:null};
const earning={id:'entry',tenantId:'tenant',title:'Actual work',status:'paid',amountCents:1000,createdAt:valid[0]};
const notification={id:'notice',tenantId:'tenant',title:'Actual notice',body:'Actual body',createdAt:valid[0],readAt:null};
const response=data=>async()=>({ok:true,json:async()=>data});

for(const field of ['startsAt','endsAt'])test(`agenda rejects calendar normalization in ${field}`,async()=>{
 for(const at of impossible)assert.deepEqual(await loadAgenda(response([{...assignment,[field]:at}])),{status:'error'});
});
test('earnings rejects calendar normalization instead of displaying an entry on another day',async()=>{
 for(const at of impossible)assert.deepEqual(await loadEarnings(response([{...earning,createdAt:at}])),{status:'error'});
});
for(const field of ['createdAt','readAt'])test(`notification list rejects calendar normalization in ${field}`,async()=>{
 for(const at of impossible)assert.deepEqual(await loadNotifications(response([{...notification,[field]:at}]),notification.tenantId),{status:'error'});
});
for(const [before,after,stamp] of [['confirmed','checked_in','checkedInAt'],['in_progress','checked_out','checkedOutAt'],['checked_out','completed','completedAt']])test(`lifecycle ${stamp} impossible ACK remains unknown after exactly one POST`,async()=>{
 for(const at of impossible){let calls=0;const result=await submitAgendaAction(async()=>{calls++;return {ok:true,json:async()=>({id:assignment.id,status:after,[stamp]:at})}},{...assignment,status:before});assert.deepEqual(result,{status:'unknown'});assert.equal(calls,1);}
});
test('professional company-rating impossible ACK stays unknown without retry',async()=>{
 for(const at of impossible){let calls=0;const result=await submitAgendaAction(async()=>{calls++;return {ok:true,json:async()=>({id:'rating',score:4,comment:null,createdAt:at})}},{...assignment,status:'completed'},4);assert.deepEqual(result,{status:'unknown'});assert.equal(calls,1);}
});
test('company professional-rating impossible ACK stays unknown without retry',async()=>{
 for(const at of impossible){let calls=0;const result=await rateCompletedAssignment(async()=>{calls++;return {ok:true,json:async()=>({id:'rating',score:4,comment:null,createdAt:at})}},assignment.id,4);assert.deepEqual(result,{status:'unknown'});assert.equal(calls,1);}
});
test('notification read impossible ACK stays unknown and keeps its original item and tenant',async()=>{
 for(const at of impossible){let calls=0;const original={...notification};const result=await markNotificationRead(async(path,tenant)=>{calls++;assert.equal(path,'/notifications/notice/read');assert.equal(tenant,notification.tenantId);return {ok:true,json:async()=>({id:notification.id,readAt:at})}},notification);assert.deepEqual(result,{status:'unknown'});assert.equal(calls,1);assert.deepEqual(notification,original);}
});
test('real leap days and explicit offsets remain byte-identical in reads and confirmations',async()=>{
 for(const at of valid){
  const a={...assignment,startsAt:at,endsAt:at},e={...earning,createdAt:at},n={...notification,createdAt:at,readAt:at};
  assert.deepEqual(await loadAgenda(response([a])),{status:'ready',data:[a]});
  assert.deepEqual(await loadEarnings(response([e])),{status:'ready',data:[e]});
  assert.deepEqual(await loadNotifications(response([n]),n.tenantId),{status:'ready',data:[n]});
  assert.deepEqual(await markNotificationRead(response({id:n.id,readAt:at}),n),{status:'confirmed',readAt:at});
  assert.deepEqual(await submitAgendaAction(response({id:a.id,status:'checked_in',checkedInAt:at}),a),{status:'confirmed',endpoint:'check-in',coordinatesSent:false});
  assert.deepEqual(await submitAgendaAction(response({id:'rating',score:4,comment:null,createdAt:at}),{...a,status:'completed'},4),{status:'confirmed',endpoint:'company-rating',coordinatesSent:false});
  assert.deepEqual(await rateCompletedAssignment(response({id:'rating',score:4,comment:null,createdAt:at}),a.id,4),{status:'confirmed'});
 }
});
