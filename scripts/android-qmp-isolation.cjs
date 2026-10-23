'use strict';
// Private monitor of this job's one owned emulator. Never a TCP monitor or guest privilege change.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const net=require('node:net');
const os=require('node:os');
function ownedMonitor(env=process.env){
 assert.equal(process.platform,'linux','linux_fixture_required');
 assert.equal(env.GITHUB_ACTIONS,'true','actions_fixture_required');
 assert.equal(env.GITHUB_REPOSITORY,'dbdanielbaracho/MLIVRETRABALHO','repository_mismatch');
 const socket=env.MLIVRE_QMP_SOCKET||'',dir=path.dirname(socket);
 assert.match(socket,/^\/tmp\/mlivre-qmp-[A-Za-z0-9]+\/monitor\.sock$/,'private_monitor_path_required');
 const d=fs.lstatSync(dir),s=fs.lstatSync(socket);
 assert.ok(d.isDirectory()&&!d.isSymbolicLink()&&(d.mode&0o777)===0o700&&d.uid===process.getuid(),'private_monitor_directory_required');
 assert.ok(s.isSocket()&&!s.isSymbolicLink()&&s.uid===process.getuid(),'owned_unix_monitor_required');
 const sdk=fs.realpathSync(path.join(env.ANDROID_HOME||'','emulator'));
 const matches=[],qemuPids=[];
 for(const id of fs.readdirSync('/proc').filter(x=>/^\d+$/.test(x))){
  let args;try{args=fs.readFileSync('/proc/'+id+'/cmdline','utf8').split('\0');}catch{continue;}
  if(!args[0]||!path.basename(args[0]).startsWith('qemu-system-'))continue;
  const exe=fs.realpathSync('/proc/'+id+'/exe');
  // Shell/runner parents can contain this argument too; only count the actual SDK QEMU executable.
  if(!exe.startsWith(sdk+'/qemu/')||path.basename(exe)!=='qemu-system-x86_64')continue;
  qemuPids.push(Number(id));if(!args.includes('unix:'+socket+',server,nowait'))continue;
  assert.equal(fs.statSync('/proc/'+id).uid,process.getuid(),'monitor_process_owner_mismatch');
  const i=args.indexOf('-qmp');assert.ok(i>=0&&args[i+1]==='unix:'+socket+',server,nowait','monitor_argument_mismatch');
  matches.push(Number(id));
 }
 assert.equal(qemuPids.length,1,'one_sdk_qemu_process_required');
 assert.equal(matches.length,1,'one_owned_qemu_monitor_required');return{socket,pid:matches[0]};
}
function monitorClient(socketPath,timeout=3000){
 const socket=net.createConnection(socketPath);let input='',bytes=0,seq=0,failure=null,greeting;
 const replies=new Map(),events=[],waiters=[];
 const ready=new Promise((resolve,reject)=>{greeting={resolve,reject};});
 const fail=error=>{if(failure)return;failure=error;greeting.reject(error);for(const p of replies.values()){clearTimeout(p.timer);p.reject(error);}replies.clear();for(const p of waiters){clearTimeout(p.timer);p.reject(error);}socket.destroy();};
 socket.setTimeout(timeout,()=>fail(Error('qmp_timeout')));
 socket.on('error',fail);socket.on('end',()=>fail(Error('qmp_closed')));
 socket.on('data',b=>{
  try{
   bytes+=b.length;assert.ok(bytes<=262144,'qmp_evidence_budget_exceeded');input+=b.toString('utf8');
   for(let i;(i=input.indexOf('\n'))>=0;){const line=input.slice(0,i);input=input.slice(i+1);if(!line.trim())continue;const row=JSON.parse(line);
    if(row.QMP){greeting.resolve(row.QMP);continue;}
    if(row.event){assert.ok(events.length<64,'qmp_event_budget_exceeded');events.push(row);for(const w of [...waiters])if(w.predicate(row)){clearTimeout(w.timer);waiters.splice(waiters.indexOf(w),1);w.resolve(row);}continue;}
    const p=replies.get(row.id);assert.ok(p,'qmp_unmatched_response');replies.delete(row.id);clearTimeout(p.timer);
    if(row.error)p.reject(Object.assign(Error('qmp_command_rejected'),{qmpError:row.error}));else{assert.ok(Object.hasOwn(row,'return'),'qmp_return_required');p.resolve(row.return);}
   }
  }catch(error){fail(error);}
 });
 return{ready,async request(execute,args){
  assert.ok(['qmp_capabilities','query-version','query-commands','qom-list','qom-get','device_del'].includes(execute),'qmp_command_not_allowed');if(failure)throw failure;
  const id=++seq;return new Promise((resolve,reject)=>{const timer=setTimeout(()=>fail(Error('qmp_reply_timeout')),timeout);replies.set(id,{resolve,reject,timer});socket.write(JSON.stringify({execute,...(args?{arguments:args}:{}),id})+'\n');});
 },event(predicate,ms){
  // The event promise owns this exact deadline; do not race an idle socket timer.
  socket.setTimeout(0);
  const seen=events.find(predicate);if(seen)return Promise.resolve(seen);if(failure)return Promise.reject(failure);
  return new Promise((resolve,reject)=>{const row={predicate,resolve,reject};row.timer=setTimeout(()=>{waiters.splice(waiters.indexOf(row),1);reject(Error('qmp_device_removal_not_confirmed'));},ms);waiters.push(row);});
 },close(){socket.destroy();for(const p of replies.values())clearTimeout(p.timer);for(const p of waiters)clearTimeout(p.timer);}};
}
async function removeGuestEthernet(client,mac,report=()=>{}){
 assert.match(mac,/^(?:[0-9a-f]{2}:){5}[0-9a-f]{2}$/,'observed_guest_mac_required');
 assert.notEqual(mac,'00:00:00:00:00:00','real_guest_mac_required');
 const greeting=await client.ready;await client.request('qmp_capabilities');
 const version=await client.request('query-version'),commands=await client.request('query-commands');
 for(const name of ['qom-list','qom-get','device_del'])assert.ok(commands.some(c=>c.name===name),'qmp_capability_missing_'+name);
 const candidates=[];
 for(const parent of ['/machine/peripheral','/machine/peripheral-anon']){
  const children=await client.request('qom-list',{path:parent});assert.ok(Array.isArray(children)&&children.length<=64,'bounded_qom_children_required');
  for(const row of children){
   if(row.type!=='child<virtio-net-pci>')continue;
   assert.match(row.name,/^[A-Za-z0-9_.\[\]-]+$/,'safe_observed_device_name_required');const qom=parent+'/'+row.name;
   const properties=await client.request('qom-list',{path:qom});assert.ok(Array.isArray(properties)&&properties.length<=256,'bounded_qom_properties_required');
   if(!properties.some(p=>p.name==='mac')||!properties.some(p=>p.name==='netdev'))continue;
   const actualMac=await client.request('qom-get',{path:qom,property:'mac'}),netdev=await client.request('qom-get',{path:qom,property:'netdev'});
   // AOSP Ethernet backend is mynet. Never delete virtio-wifi, arbitrary NICs or non-network devices.
   if(typeof actualMac==='string'&&actualMac.toLowerCase()===mac&&netdev==='mynet')candidates.push({path:qom,mac,netdev});
  }
 }
 assert.equal(candidates.length,1,'one_observed_ethernet_device_required');const target=candidates[0];
 report({stage:'identified',greeting,version,target});
 await client.request('device_del',{id:target.path});report({stage:'removal-requested',target});
 const event=await client.event(e=>(e.event==='DEVICE_DELETED'||e.event==='DEVICE_UNPLUG_GUEST_ERROR')&&e.data?.path===target.path,15000);
 assert.equal(event.event,'DEVICE_DELETED','guest_refused_device_removal');report({stage:'removal-confirmed',target,event});
 return{version,target,event,scope:'owned emulator Ethernet hardware removal; guest offline assertions still required'};
}
async function isolateEthernet(mac,report){
 let client;
 try{const owner=ownedMonitor();report({stage:'monitor-owner-verified',pid:owner.pid});client=monitorClient(owner.socket);return await removeGuestEthernet(client,mac,report);}
 catch(error){report({stage:'failed',error:error.message,code:error.code||null,qmpError:error.qmpError?{class:String(error.qmpError.class||'').slice(0,100),desc:String(error.qmpError.desc||'').slice(0,4096)}:null});if(['EACCES','EPERM'].includes(error.code)||/Permission Denial|Permission denied|SecurityException|not allowed/i.test(JSON.stringify(error.qmpError||{})+error.message))throw Error('permission_denied_stop');throw error;}
 finally{client?.close();}
}
function prepare(){
 assert.equal(process.env.GITHUB_ACTIONS,'true');assert.equal(process.env.GITHUB_REPOSITORY,'dbdanielbaracho/MLIVRETRABALHO');assert.match(process.env.GITHUB_RUN_ID||'',/^\d+$/);
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'mlivre-qmp-'));fs.chmodSync(dir,0o700);
 const socket=path.join(dir,'monitor.sock');assert.match(socket,/^\/tmp\/mlivre-qmp-[A-Za-z0-9]+\/monitor\.sock$/);
 fs.appendFileSync(process.env.GITHUB_ENV,'MLIVRE_QMP_SOCKET='+socket+'\n');
 console.log('ANDROID_QMP_PRIVATE_MONITOR_PREPARED '+JSON.stringify({transport:'unix',directoryMode:'0700',tcp:false,root:false}));
}
module.exports={ownedMonitor,monitorClient,removeGuestEthernet,isolateEthernet};
if(require.main===module){assert.equal(process.argv[2],'prepare');prepare();}
