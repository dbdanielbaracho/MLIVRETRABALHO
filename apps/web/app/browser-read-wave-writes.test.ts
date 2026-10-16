import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

test('read-wave gate counts actual POST requests even when their responses never arrive',()=>{
 const source=fs.readFileSync(new URL('../../../scripts/web-browser-journey-e2e.cjs',import.meta.url),'utf8');
 const start=source.indexOf("  if(m.method==='Network.requestWillBeSent')");
 const end=source.indexOf("  if(m.method==='Network.responseReceived')",start);
 assert.ok(start>=0&&end>start,'Actual network request observer required');
 const counter=source.match(/const noDataWrites=\(\)=>([^;]+);/);assert.ok(counter,'Actual read-wave mutation counter required');
 const api=new URL('http://127.0.0.1:3002'),apiPostRequests:{path:string}[]=[],requestMethods=new Map(),requestMetadata=new Map();
 const observe=(method:string,url:string)=>vm.runInNewContext(source.slice(start,end),{m:{method:'Network.requestWillBeSent',params:{requestId:String(requestMethods.size),request:{method,url}}},URL,api,apiPostRequests,requestMethods,requestMetadata});
 const writes=()=>vm.runInNewContext(counter[1],{apiPostRequests,responses:[]});
 assert.equal(writes(),0);
 observe('OPTIONS',api.origin+'/v1/company/teams');observe('GET',api.origin+'/v1/company/teams');observe('POST','http://127.0.0.1:3001/local');
 assert.equal(writes(),0);
 observe('POST',api.origin+'/v1/company/teams');
 assert.equal(writes(),1,'An unacknowledged POST must already fail the no-extra-writes gate');
 assert.deepEqual(apiPostRequests.map(x=>x.path),['/v1/company/teams']);
});
