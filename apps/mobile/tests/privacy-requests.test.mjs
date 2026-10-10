import test from 'node:test';
import assert from 'node:assert/strict';
import {loadPrivacyRequests} from '../lib/privacy-requests.ts';
const item={id:'r',requestType:'correction',requestDetails:'Corrigir cidade',status:'submitted',createdAt:'2026-10-10T00:00:00Z',completedAt:null,resolutionCode:null};
const response=(data,ok=true)=>({ok,json:async()=>data});
test('privacy list preserves actual request facts and only a verified list can be empty',async()=>{
 assert.deepEqual(await loadPrivacyRequests(async()=>response([item])),{status:'ready',data:[item]});assert.deepEqual(await loadPrivacyRequests(async()=>response([])),{status:'ready',data:[]});
});
test('HTTP, invalid JSON and network errors never claim that no privacy request exists',async()=>{
 for(const request of [async()=>response([],false),async()=>{throw Error('offline')},async()=>({ok:true,json:async()=>{throw Error('JSON')}})])assert.deepEqual(await loadPrivacyRequests(request),{status:'error'});
});
test('unknown types/statuses, malformed fields and invalid dates remain errors',async()=>{
 for(const value of [{...item,requestType:'invented'},{...item,status:'approved'},{...item,requestDetails:123},{...item,createdAt:'invalid'},{...item,completedAt:'invalid'},{}])assert.deepEqual(await loadPrivacyRequests(async()=>response([value])),{status:'error'});
 for(const status of ['reviewing','completed','partially_completed','rejected'])assert.equal((await loadPrivacyRequests(async()=>response([{...item,status}]))).status,'ready');
});
test('privacy refresh is only the requests GET; it does not export, deactivate or register a DSAR',async()=>{
 const paths=[];await loadPrivacyRequests(async path=>{paths.push(path);return response([])});assert.deepEqual(paths,['/privacy/requests']);
 assert.equal((await loadPrivacyRequests(async()=>response([item]))).status,'ready');
});
