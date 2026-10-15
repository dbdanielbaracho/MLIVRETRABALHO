import test from'node:test';import assert from'node:assert/strict';import{exceptionSla}from'./exception-sla';test('marks overdue exception deterministically',()=>{const x=exceptionSla({id:'1',type:'support',priority:'urgent',status:'open',createdAt:'2026-01-01T00:00:00Z'},Date.parse('2026-01-01T00:20:00Z'));assert.equal(x.overdue,true);assert.equal(x.targetMinutes,15)})
for(const priority of ['__proto__','constructor','toString'])test('SLA unknown inherited priority '+priority+' uses existing numeric fallback without suppressing overdue',()=>{
 const input={id:'fixture',type:'support',priority,status:'open',createdAt:'2026-01-01T00:00:00Z'};
 const x=exceptionSla(input,Date.parse('2026-01-01T05:00:00Z'));
 assert.equal(typeof x.targetMinutes,'number');assert.equal(x.targetMinutes,240);assert.equal(x.ageMinutes,300);
 assert.equal(x.overdue,true);assert.equal(x.escalation,'overdue');assert.equal(x.id,input.id);assert.equal(x.priority,priority);assert.equal(x.status,input.status);
});
test('SLA keeps urgent high normal and future fallback targets and strict overdue escalation boundaries',()=>{
 const start=Date.parse('2026-01-01T00:00:00Z');
 for(const [priority,target] of [['urgent',15],['high',60],['normal',240],['future_priority',240]] as const){
  for(const age of [0,target,target+1,target*2,target*2+1]){
   const x=exceptionSla({id:'fixture',type:'support',priority,status:'open',createdAt:'2026-01-01T00:00:00Z'},start+age*60000);
   assert.equal(x.targetMinutes,target);assert.equal(x.ageMinutes,age);assert.equal(x.overdue,age>target);
   assert.equal(x.escalation,age>target*2?'escalated':age>target?'overdue':'within_sla');
  }
 }
});
