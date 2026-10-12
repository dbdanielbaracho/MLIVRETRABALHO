import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const source=readFileSync(new URL('./page.tsx',import.meta.url),'utf8');
const match=source.match(/onChange=\{e=>\{(const nextTenantId=e\.target\.value;[\s\S]*?setTenantId\(nextTenantId\);)\}\}/);
assert.ok(match,'company selector must have an explicit context-reset handler');

function runChange(previous:string,next:string){
  const changes:Record<string,unknown[]>= {};
  const names=['setSelectedJobId','setCandidates','setRecommendations','setSelectedTeamId','setTeamMembers','setSelectedReplacementId','setReplacementCandidates','setTenantId'];
  const setters=names.map(name=>(value:unknown)=>{(changes[name]??=[]).push(value)});
  const callback=new Function('e','tenantId',...names,match![1]);
  callback({target:{value:next}},previous,...setters);
  return changes;
}

test('switching companies clears all tenant-owned selections and dependent records before changing tenant',()=>{
  const events=runChange('company-a','company-b');
  assert.deepEqual(Object.keys(events),['setSelectedJobId','setCandidates','setRecommendations','setSelectedTeamId','setTeamMembers','setSelectedReplacementId','setReplacementCandidates','setTenantId']);
  for(const name of ['setSelectedJobId','setSelectedTeamId','setSelectedReplacementId'])assert.deepEqual(events[name],['']);
  for(const name of ['setCandidates','setRecommendations','setTeamMembers','setReplacementCandidates'])assert.deepEqual(events[name],[[]]);
  assert.deepEqual(events.setTenantId,['company-b']);
});
test('reselecting same company does not clear active work',()=>assert.deepEqual(runChange('company-a','company-a'),{}));
