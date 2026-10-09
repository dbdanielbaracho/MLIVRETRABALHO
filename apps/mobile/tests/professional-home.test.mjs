import test from 'node:test';
import assert from 'node:assert/strict';
import { assignmentsToday, nextAssignment, weeklyEarnings, availabilityState, assignmentSchedule, loadProfessionalHome } from '../lib/professional-home.ts';

const now = new Date(2026,9,9,12,0);
const iso = (day,hour=12) => new Date(2026,9,day,hour).toISOString();
const assignment = (id,day,status='confirmed',hour=14) => ({id,title:id,status,startsAt:iso(day,hour),endsAt:iso(day,hour+2)});

test('today uses local calendar boundaries, excludes cancelled and counts completed work',()=>{
 assert.equal(assignmentsToday([assignment('yesterday',8),assignment('morning',9,'completed',0),assignment('today',9),assignment('cancelled',9,'cancelled'),assignment('tomorrow',10),{...assignment('missing',9),startsAt:null}],now),2);
});
test('next assignment sorts across companies and keeps an ongoing shift, without mutating input',()=>{
 const rows=[assignment('future',10),assignment('earlier',9,'completed',8),assignment('cancelled',9,'cancelled'),assignment('ongoing',9,'in_progress',11),assignment('later',9)];
 assert.equal(nextAssignment(rows,now)?.id,'ongoing'); assert.equal(rows[0].id,'future');
 assert.equal(nextAssignment([assignment('ended',9,'confirmed',8),assignment('done',10,'completed')],now),null);
 assert.equal(nextAssignment([{...assignment('unknown',10),startsAt:'invalid'}],now),null);
});
test('weekly earnings start Monday and exclude reversals, unknown status, prior and future entries',()=>{
 const entries=[{amountCents:12000,status:'payable',createdAt:iso(5,0)},{amountCents:8000,status:'paid',createdAt:iso(9,10)},{amountCents:999,status:'payable',createdAt:iso(4,23)},{amountCents:999,status:'reversed',createdAt:iso(9)},{amountCents:999,status:'unknown',createdAt:iso(9)},{amountCents:999,status:'payable',createdAt:iso(9,13)},{amountCents:999,status:'paid',createdAt:'invalid'}];
 assert.equal(weeklyEarnings(entries,now),20000); assert.equal(weeklyEarnings([],now),0);
});
test('availability distinguishes current, future, empty, expired and invalid windows at boundaries',()=>{
 assert.equal(availabilityState([{startsAt:iso(9,12),endsAt:iso(9,13)}],now),'current');
 assert.equal(availabilityState([{startsAt:iso(10),endsAt:iso(10,13)}],now),'scheduled');
 assert.equal(availabilityState([{startsAt:iso(9,11),endsAt:iso(9,12)},{startsAt:'invalid',endsAt:iso(10)},{startsAt:iso(10),endsAt:iso(9)}],now),'empty');
 assert.equal(availabilityState([],now),'empty');
});
test('overnight schedules show both dates and missing hours are not invented',()=>{
 const text=assignmentSchedule({startsAt:iso(9,23),endsAt:iso(10,2)});
 assert.match(text,/09\/10\/2026/); assert.match(text,/10\/10\/2026/);
 assert.equal(assignmentSchedule({startsAt:null}),'Horário não informado');
});
test('existing APIs are read without a tenant filter and empty responses are successful',async()=>{
 const paths=[];
 const result=await loadProfessionalHome(async path=>{paths.push(path);return {ok:true,json:async()=>path==='/professional-profile'?null:[]};});
 assert.deepEqual(paths,['/professional-profile','/assignments/mine','/earnings/mine','/availability/mine']);
 assert.deepEqual(result.profile,{status:'ready',data:null});
 for(const key of ['assignments','earnings','availability']) assert.deepEqual(result[key],{status:'ready',data:[]});
});
test('HTTP, network and malformed JSON failures stay errors; successful sections survive',async()=>{
 const result=await loadProfessionalHome(async path=>{
  if(path==='/professional-profile')return {ok:false,json:async()=>null};
  if(path==='/assignments/mine')return {ok:true,json:async()=>[assignment('real',10)]};
  if(path==='/earnings/mine')throw new Error('offline');
  return {ok:true,json:async()=>({error:'bad_shape'})};
 });
 assert.equal(result.profile.status,'error'); assert.equal(result.assignments.status,'ready');
 assert.equal(result.earnings.status,'error'); assert.equal(result.availability.status,'error');
});
test('a retry replaces failed states with actual results; malformed items never look like zero',async()=>{
 const first=await loadProfessionalHome(async()=>({ok:true,json:async()=>[null]}));
 assert.equal(first.earnings.status,'error');
 const retry=await loadProfessionalHome(async path=>({ok:true,json:async()=>path==='/professional-profile'?{displayName:' Nome real '}:[]}));
 assert.equal(retry.profile.data.displayName,' Nome real '); assert.equal(retry.earnings.status,'ready');
 const broken=await loadProfessionalHome(async()=>({ok:true,json:async()=>{throw new Error('invalid json');}}));
 assert.ok(Object.values(broken).every(section=>section.status==='error'));
});
