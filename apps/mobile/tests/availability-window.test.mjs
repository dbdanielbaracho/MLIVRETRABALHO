import test from 'node:test';
import assert from 'node:assert/strict';
import { availabilityWindow } from '../lib/availability-window.ts';

test('human local date and time retain their actual instant in the API payload',()=>{
 const window=availabilityWindow(' 09/10/2026 ','08:30','17:45');
 assert.deepEqual(window,{startsAt:new Date(2026,9,9,8,30).toISOString(),endsAt:new Date(2026,9,9,17,45).toISOString()});
});
test('overnight and equal-hour windows end the next local calendar day',()=>{
 const overnight=availabilityWindow('31/12/2026','23:00','02:00');
 assert.equal(overnight.endsAt,new Date(2027,0,1,2,0).toISOString());
 const fullDay=availabilityWindow('09/10/2026','08:00','08:00');
 assert.equal(fullDay.endsAt,new Date(2026,9,10,8).toISOString());
});
test('impossible dates, invalid clock values and malformed inputs cannot be submitted',()=>{
 for(const [date,start,end] of [['31/02/2026','08:00','10:00'],['29/02/2026','08:00','10:00'],['01/13/2026','08:00','10:00'],['00/10/2026','08:00','10:00'],['09/10/2026','24:00','10:00'],['09/10/2026','08:60','10:00'],['09/10/2026','08:00','10:60'],['2026-10-09','08:00','10:00'],['09/10/2026','8:00','10:00'],['','08:00','10:00']])assert.equal(availabilityWindow(date,start,end),null);
 assert.ok(availabilityWindow('29/02/2028','08:00','10:00'));
});
