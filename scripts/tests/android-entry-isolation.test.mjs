import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
const actualRequire=createRequire(import.meta.url);
const source=readFileSync(new URL('../android-entry-journey.cjs',import.meta.url),'utf8');
const digest=b=>createHash('sha256').update(b).digest('hex');
const checkout='a'.repeat(40),sourceHead='b'.repeat(40),apk=Buffer.from('owned fixture APK bytes');
const pkg='com.predibeacon.mlivretrabalho.pilot';
async function execute(faultCommand,fault){
 const calls=[],logs=[],writes=new Map(),entry={exports:{}};
 const fs={
  existsSync:()=>false,mkdirSync:()=>{},
  readFileSync(p){
   if(p.endsWith('MLivreTrabalho.apk'))return apk;
   if(p.endsWith('BUILD_INFO.txt'))return 'commit_sha='+checkout+'\nandroid_package='+pkg+'\nmetro_required=false\n';
   if(p.endsWith('SHA256SUMS.txt'))return digest(apk)+'  MLivreTrabalho.apk\n';
   throw Error('unexpected_read');
  },
  writeFileSync:(p,b)=>writes.set(p,String(b))
 };
 const good=stdout=>({status:0,signal:null,stdout,stderr:''});
 function spawnSync(binary,args){
  const command=binary==='adb'?args.slice(2).join(' '):args.join(' ');
  calls.push({binary,command});
  if(command===faultCommand)return fault;
  if(binary==='git')return good(checkout+'\n');
  if(binary==='adb'&&args[0]==='devices')return good('List of devices attached\nemulator-5554 device\n');
  if(command==='shell getprop ro.kernel.qemu')return good('1\n');
  if(command==='shell pm path '+pkg)return good('package:/data/app/fixture/base.apk\n');
  if(command==='shell sha256sum /data/app/fixture/base.apk')return good(digest(apk)+'  /data/app/fixture/base.apk\n');
  if(command==='shell wm size')return good('Physical size: 1080x2400\n');
  if(command.startsWith('shell uiautomator'))return{status:1,stdout:'',stderr:'fixture hierarchy unavailable'};
  if(command==='shell cmd ethernet help')return good('  set-ethernet-enabled <enabled|disabled>\n');
  if(command==='shell am force-stop '+pkg||command==='shell cmd connectivity airplane-mode enable'||command==='shell svc wifi disable'||command==='shell svc data disable')return good('');
  throw Error('unexpected_command_'+command);
 }
 const require=name=>name==='node:fs'?fs:name==='node:child_process'?{spawnSync}:actualRequire(name);
 require.main=entry;
 const process={env:{CI:'true',GITHUB_ACTIONS:'true',GITHUB_REPOSITORY:'dbdanielbaracho/MLIVRETRABALHO',GITHUB_SHA:checkout,MLIVRE_SOURCE_HEAD:sourceHead,GITHUB_RUN_ID:'123',GITHUB_RUN_ATTEMPT:'1',GITHUB_WORKSPACE:'/fixture'},exitCode:0};
 vm.runInNewContext(source,{module:entry,exports:entry.exports,require,process,Buffer,setTimeout,console:{log:x=>logs.push(x),error:x=>logs.push(x)}},{timeout:1000});
 await new Promise(resolve=>setImmediate(resolve));
 const row=[...writes].find(([p])=>p.endsWith('/failure.json'));assert.ok(row,'actual main must persist failure');
 return{calls,logs,receipt:JSON.parse(row[1]),process};
}
test('real entry main records exact late exit20 output without entering forms',async()=>{
 const r=await execute('shell cmd ethernet help',{status:20,signal:null,stdout:'service usage unavailable\n',stderr:'fixture shell diagnostic\n'});
 assert.equal(r.receipt.error,'command_failed_adb_20');assert.equal(r.receipt.stage,'offline-isolation:ethernet-help');
 assert.equal(r.receipt.isolationFailure.status,20);assert.equal(r.receipt.isolationFailure.stderr.text,'fixture shell diagnostic\n');
 assert.equal(r.receipt.permissionStopped,false);assert.deepEqual(r.receipt.checks,[]);assert.deepEqual(r.receipt.captures,[]);
 assert.equal(r.calls.some(x=>/set-ethernet-enabled|pm clear|input tap|input text|monkey/.test(x.command)),false);
 assert.equal(r.process.exitCode,1);
});
test('permission denial in early isolation stops every subsequent ADB call including cleanup',async()=>{
 const fault='shell cmd connectivity airplane-mode enable';
 const r=await execute(fault,{status:20,signal:null,stdout:'',stderr:'SecurityException: Permission Denial\n'});
 assert.equal(r.receipt.error,'permission_denied_stop');assert.equal(r.receipt.stage,'offline-isolation:airplane-mode');
 assert.equal(r.receipt.permissionStopped,true);assert.equal(r.calls.at(-1).command,fault);
 assert.deepEqual(r.receipt.checks,[]);assert.deepEqual(r.receipt.captures,[]);assert.equal(r.process.exitCode,1);
});
test('full stderr is checked before bounded evidence truncation',async()=>{
 const stderr='x'.repeat(20000)+' Permission denied';
 const r=await execute('shell svc data disable',{status:20,signal:null,stdout:'',stderr});
 const e=r.receipt.isolationFailure.stderr;
 assert.equal(r.receipt.error,'permission_denied_stop');assert.equal(r.calls.at(-1).command,'shell svc data disable');
 assert.equal(e.bytes,Buffer.byteLength(stderr));assert.equal(e.sha256,digest(Buffer.from(stderr)));assert.equal(e.truncated,true);assert.equal(Buffer.byteLength(e.text),4096);
 assert.equal(r.logs.some(x=>x.includes('x'.repeat(4097))),false);
});
test('permission denial with zero exit status still fails closed before further commands',async()=>{
 const r=await execute('shell svc wifi disable',{status:0,signal:null,stdout:'not allowed by fixture policy',stderr:''});
 assert.equal(r.receipt.error,'permission_denied_stop');assert.equal(r.receipt.permissionStopped,true);
 assert.equal(r.receipt.isolationFailure.status,0);assert.equal(r.calls.at(-1).command,'shell svc wifi disable');
 assert.equal(r.process.exitCode,1);
});
