import test from 'node:test';
import assert from 'node:assert/strict';
import net from 'node:net';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {monitorClient,removeGuestEthernet,ownedMonitor}=require('../android-qmp-isolation.cjs');
const mac='52:54:00:12:34:56',target='/machine/peripheral-anon/device[3]';
async function fixture(t,variant='normal'){
 const dir=mkdtempSync(join(tmpdir(),'mlivre-qmp-test-')),socket=join(dir,'q.sock'),calls=[];let connection;
 const server=net.createServer(s=>{connection=s;s.write(JSON.stringify({QMP:{version:{qemu:{major:2,minor:12,micro:0}},capabilities:[]}})+'\r\n');let input='';
  s.on('data',b=>{input+=b.toString();for(let i;(i=input.indexOf('\n'))>=0;){const row=JSON.parse(input.slice(0,i));input=input.slice(i+1);calls.push(row);let result={};
   if(row.execute==='query-version')result={qemu:{major:2,minor:12,micro:0}};
   if(row.execute==='query-commands')result=(variant==='unsupported'?['qom-list','qom-get']:['qom-list','qom-get','device_del']).map(name=>({name}));
   if(row.execute==='qom-list'){
    const p=row.arguments.path;
    result=p==='/machine/peripheral'?[]:p==='/machine/peripheral-anon'?[{name:'device[3]',type:'child<virtio-net-pci>'},{name:'device[4]',type:'child<virtio-wifi-pci>'},{name:'disk',type:'child<virtio-blk-pci>'},...(variant==='ambiguous'?[{name:'device[5]',type:'child<virtio-net-pci>'}]:[])]:[{name:'mac',type:'str'},{name:'netdev',type:'str'}];
   }
   if(row.execute==='qom-get')result=row.arguments.property==='mac'?(variant==='wrong-mac'?'52:54:00:00:00:01':mac):'mynet';
   if(row.execute==='device_del'){
    assert.equal(row.arguments.id,target);if(variant==='denied'){s.write(JSON.stringify({id:row.id,error:{class:'GenericError',desc:'Permission denied'}})+'\n');continue;}
    if(variant==='normal')s.write(JSON.stringify({event:'DEVICE_DELETED',data:{path:target}})+'\n');
   }
   const text=JSON.stringify({id:row.id,return:result})+'\n';s.write(text.slice(0,5));s.write(text.slice(5));
  }});
 });
 let client;t.after(async()=>{client?.close();connection?.destroy();if(server.listening)await new Promise(resolve=>server.close(resolve));rmSync(dir,{recursive:true,force:true});});
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(socket,resolve);});client=monitorClient(socket,1000);
 // Bound a deliberately absent event in the transport fixture; production remains 15000ms.
 if(variant==='ack-only'){const event=client.event;client.event=(p)=>event(p,20);}
 return{client,calls};
}
test('Unix QMP exchange removes only Ethernet matched by guest MAC and backend; matching completion event required',async t=>{
 const {client,calls}=await fixture(t),reports=[];
 const r=await removeGuestEthernet(client,mac,row=>reports.push(row));
 assert.equal(r.target.path,target);assert.equal(r.event.event,'DEVICE_DELETED');assert.deepEqual(reports.map(x=>x.stage),['identified','removal-requested','removal-confirmed']);
 assert.equal(calls.filter(x=>x.execute==='device_del').length,1);assert.equal(calls.some(x=>/wifi|disk/.test(x.arguments?.path||'')),false);
});
test('QMP acknowledgement without guest completion cannot authorize UI',async t=>{
 const {client,calls}=await fixture(t,'ack-only');await assert.rejects(removeGuestEthernet(client,mac),/qmp_device_removal_not_confirmed/);assert.equal(calls.filter(x=>x.execute==='device_del').length,1);
});
for(const variant of ['unsupported','wrong-mac','ambiguous'])test('QMP '+variant+' refuses hardware mutation',async t=>{
 const {client,calls}=await fixture(t,variant);await assert.rejects(removeGuestEthernet(client,mac));assert.equal(calls.some(x=>x.execute==='device_del'),false);
});
test('denied hardware request returns original QMP error and never retries or changes privileges',async t=>{
 const {client,calls}=await fixture(t,'denied');await assert.rejects(removeGuestEthernet(client,mac),e=>e.qmpError?.desc==='Permission denied');assert.equal(calls.filter(x=>x.execute==='device_del').length,1);
});
test('monitor ownership rejects arbitrary endpoints before connecting',()=>{
 for(const value of ['tcp:127.0.0.1:4444','/tmp/unowned.sock','/tmp/mlivre-qmp-x/../monitor.sock'])assert.throws(()=>ownedMonitor({GITHUB_ACTIONS:'true',GITHUB_REPOSITORY:'dbdanielbaracho/MLIVRETRABALHO',MLIVRE_QMP_SOCKET:value}));
});
