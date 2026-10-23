'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {spawnSync}=require('node:child_process');
const PACKAGE='com.predibeacon.mlivretrabalho.pilot';
const digest=b=>crypto.createHash('sha256').update(b).digest('hex');
function configuration(env){
 assert.ok(['true','1'].includes(env.CI)&&env.GITHUB_ACTIONS==='true','ci_only');
 assert.equal(env.GITHUB_REPOSITORY,'dbdanielbaracho/MLIVRETRABALHO','repository_mismatch');
 assert.match(env.GITHUB_SHA||'',/^[a-f0-9]{40}$/,'checkout_sha_required');
 assert.match(env.MLIVRE_SOURCE_HEAD||'',/^[a-f0-9]{40}$/,'source_head_required');
 assert.match(env.GITHUB_RUN_ID||'',/^\d+$/,'run_required');
 assert.match(env.GITHUB_RUN_ATTEMPT||'',/^\d+$/,'attempt_required');
 assert.ok(env.GITHUB_WORKSPACE&&path.isAbsolute(env.GITHUB_WORKSPACE),'workspace_required');
 return{checkout:env.GITHUB_SHA,sourceHead:env.MLIVRE_SOURCE_HEAD,run:env.GITHUB_RUN_ID,attempt:Number(env.GITHUB_RUN_ATTEMPT),workspace:env.GITHUB_WORKSPACE};
}
function emulatorSerial(devices){
 const rows=devices.split(/\r?\n/).map(x=>x.trim()).filter(x=>x&&!x.startsWith('List of devices')&&!x.startsWith('*'));
 assert.equal(rows.length,1,'one_fresh_emulator_required');
 const match=/^(emulator-\d+)\s+device(?:\s|$)/.exec(rows[0]);assert.ok(match,'physical_or_unauthorized_device_refused');return match[1];
}
function assertOffline(state){
 assert.equal(state.airplane.trim(),'enabled','airplane_not_enabled');
 assert.equal(state.wifi.trim(),'0','wifi_not_disabled');assert.equal(state.data.trim(),'0','mobile_data_not_disabled');
 assert.ok(!/^\s*default\b/m.test(state.routes4)&&!/^\s*default\b/m.test(state.routes6),'default_route_present');
 assert.equal(state.globalAddresses.trim(),'','global_address_present');
}
function decode(s){return s.replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');}
function nodes(xml){
 assert.ok(typeof xml==='string'&&xml.includes('<hierarchy')&&xml.includes('</hierarchy>')&&xml.length<2000000,'complete_ui_hierarchy_required');
 return Array.from(xml.matchAll(/<node\b([^>]*?)\/?\s*>/g),m=>Object.fromEntries(Array.from(m[1].matchAll(/([\w-]+)="([^"]*)"/g),a=>[a[1],decode(a[2])])));
}
const label=n=>(n['content-desc']||n.text||'').replace(/^✓\s*/,'');
function point(n,size){
 const m=/^\[(\d+),(\d+)\]\[(\d+),(\d+)\]$/.exec(n.bounds||'');assert.ok(m,'invalid_bounds');const [x1,y1,x2,y2]=m.slice(1).map(Number);
 assert.ok(x2>x1&&y2>y1&&x2<=size.width&&y2<=size.height,'out_of_screen_bounds');return{x:Math.floor((x1+x2)/2),y:Math.floor((y1+y2)/2)};
}
function target(xml,name,size,input=false){
 const matches=nodes(xml).filter(n=>n.package===PACKAGE&&label(n)===name&&n.enabled==='true'&&n.clickable==='true'&&(!input||n.class==='android.widget.EditText'));
 const unique=[...new Map(matches.map(n=>[n.bounds,n])).values()];assert.equal(unique.length,1,'unique_enabled_target_required');return point(unique[0],size);
}
function hasText(xml,text){return nodes(xml).some(n=>n.package===PACKAGE&&(n.text===text||n['content-desc']===text));}
function selected(xml,text){return nodes(xml).some(n=>n.package===PACKAGE&&label(n)===text&&n.selected==='true');}
function hasInput(xml,text){return nodes(xml).some(n=>n.package===PACKAGE&&label(n)===text&&n.class==='android.widget.EditText');}
function pngMetadata(b){
 assert.ok(b.length>24&&b.subarray(0,8).toString('hex')==='89504e470d0a1a0a','invalid_png');
 return{sha256:digest(b),bytes:b.length,width:b.readUInt32BE(16),height:b.readUInt32BE(20)};
}
function verifyBuild(info,config,apk,hashes){
 const fields=Object.fromEntries(info.trim().split(/\r?\n/).map(l=>{const i=l.indexOf('=');return[l.slice(0,i),l.slice(i+1)];}));
 assert.equal(fields.commit_sha,config.checkout,'apk_checkout_mismatch');assert.equal(fields.android_package,PACKAGE,'apk_package_mismatch');assert.equal(fields.metro_required,'false','standalone_required');
 const sha=digest(apk);assert.match(hashes,new RegExp('^'+sha+'\\s+.*MLivreTrabalho\\.apk\\s*$','m'),'apk_hash_mismatch');return sha;
}
module.exports={configuration,emulatorSerial,assertOffline,nodes,target,hasText,selected,hasInput,pngMetadata,verifyBuild,PACKAGE};
async function main(){
 const config=configuration(process.env),out=path.join(config.workspace,'artifacts/android-entry-journey');
 assert.ok(!fs.existsSync(out),'fresh_artifact_directory_required');fs.mkdirSync(out,{recursive:true});
 let serial,stage='configuration';const captures=[],checks=[];
 function run(binary,args,{binaryOutput=false,timeout=10000}={}){
  const r=spawnSync(binary,args,{encoding:binaryOutput?null:'utf8',timeout,maxBuffer:binaryOutput?12000000:2000000});
  if(r.error||r.status!==0)throw Error('command_failed_'+binary+'_'+(r.error?.code||r.status));
  if(!binaryOutput&&/SecurityException|Permission Denial|Permission denied|not allowed/i.test(r.stdout+'\n'+r.stderr))throw Error('permission_denied_stop');
  return r.stdout;
 }
 const adb=(...args)=>run('adb',['-s',serial,...args]);
 const pause=()=>new Promise(resolve=>setTimeout(resolve,300));
 function offline(){const s={airplane:adb('shell','cmd','connectivity','airplane-mode'),wifi:adb('shell','settings','get','global','wifi_on'),data:adb('shell','settings','get','global','mobile_data'),routes4:adb('shell','ip','route','show'),routes6:adb('shell','ip','-6','route','show'),globalAddresses:adb('shell','ip','-o','addr','show','scope','global')};assertOffline(s);return{airplane:true,wifi:false,mobileData:false,defaultRoutes:false,globalAddresses:0};}
 function hierarchy(){adb('shell','uiautomator','dump','/sdcard/mlivre-entry-fixture.xml');return adb('shell','cat','/sdcard/mlivre-entry-fixture.xml');}
 async function wait(name,predicate){stage=name;const end=Date.now()+20000;let xml='';while(Date.now()<end){xml=hierarchy();if(predicate(xml))return xml;await pause();}throw Error('ui_condition_timeout_'+name);}
 function tap(xml,name,input=false){offline();const p=target(xml,name,size,input);adb('shell','input','tap',String(p.x),String(p.y));}
 function capture(name,xml){
  offline();const b=run('adb',['-s',serial,'exec-out','screencap','-p'],{binaryOutput:true});const meta=pngMetadata(b);assert.equal(meta.width,size.width);assert.equal(meta.height,size.height);
  fs.writeFileSync(path.join(out,name+'.png'),b,{flag:'wx'});fs.writeFileSync(path.join(out,name+'.xml'),xml,{flag:'wx'});const row={label:name,...meta};captures.push(row);console.log('ANDROID_ENTRY_CAPTURE '+JSON.stringify({...row,pngBase64:b.toString('base64')}));
 }
 function pass(name){checks.push(name);console.log('ANDROID_ENTRY_CASE_PASS '+JSON.stringify({name,stage,scope:'native emulator offline input validation; not authenticated or physical E2E'}));}
 let size;
 try{
  serial=emulatorSerial(run('adb',['devices']));assert.equal(adb('shell','getprop','ro.kernel.qemu').trim(),'1','emulator_property_required');
  assert.equal(run('git',['-C',config.workspace,'rev-parse','HEAD']).trim(),config.checkout,'actual_checkout_mismatch');
  const apkDir=path.join(config.workspace,'artifacts/android-pilot'),apk=fs.readFileSync(path.join(apkDir,'MLivreTrabalho.apk'));
  const apkSHA=verifyBuild(fs.readFileSync(path.join(apkDir,'BUILD_INFO.txt'),'utf8'),config,apk,fs.readFileSync(path.join(apkDir,'SHA256SUMS.txt'),'utf8'));
  const installed=adb('shell','pm','path',PACKAGE).trim();assert.match(installed,/^package:\/data\/app\/[A-Za-z0-9_+./=~\-]+\/base\.apk$/,'single_installed_apk_required');
  assert.equal(adb('shell','sha256sum',installed.slice(8)).trim().split(/\s/)[0],apkSHA,'installed_apk_mismatch');
  const screen=adb('shell','wm','size').match(/Physical size: (\d+)x(\d+)/);assert.ok(screen,'physical_size_required');size={width:Number(screen[1]),height:Number(screen[2])};
  stage='offline-isolation';adb('shell','am','force-stop',PACKAGE);adb('shell','cmd','connectivity','airplane-mode','enable');adb('shell','svc','wifi','disable');adb('shell','svc','data','disable');
  // Use only the Ethernet command advertised by this exact emulator; no root or permission changes.
  const ethernetHelp=adb('shell','cmd','ethernet','help');
  console.log('ANDROID_ENTRY_ETHERNET_HELP '+JSON.stringify({text:ethernetHelp.slice(0,16000),sha256:digest(Buffer.from(ethernetHelp))}));
  assert.ok(ethernetHelp.length<16000&&/^\s*set-ethernet-enabled\s+<enabled\|disabled>\s*$/m.test(ethernetHelp),'supported_ethernet_disable_required');
  adb('shell','cmd','ethernet','set-ethernet-enabled','disabled');
  console.log('ANDROID_ENTRY_ETHERNET_DISABLE_REQUESTED '+JSON.stringify({command:'cmd ethernet set-ethernet-enabled disabled',authority:'existing emulator shell',root:false,permissionChanges:false}));
  const end=Date.now()+15000;while(Date.now()<end){try{offline();break;}catch(error){if(!/airplane_not_enabled|wifi_not_disabled|mobile_data_not_disabled|default_route_present|global_address_present/.test(error.message))throw error;await pause();}}offline();
  console.log('ANDROID_ENTRY_PROVENANCE '+JSON.stringify({...config,workspace:undefined,serial,apkSHA256:apkSHA,tree:run('git',['-C',config.workspace,'show','-s','--format=%T','HEAD']).trim(),sdk:adb('shell','getprop','ro.build.version.sdk').trim(),offline:offline()}));
  stage='fresh-owned-app';assert.equal(adb('shell','pm','clear',PACKAGE).trim(),'Success','fresh_app_clear_failed');
  adb('shell','monkey','-p',PACKAGE,'-c','android.intent.category.LAUNCHER','1');
  let xml=await wait('signed-out-landing',x=>hasText(x,'Trabalho certo, na hora certa.')&&hasText(x,'Entrar')&&hasText(x,'Criar conta'));
  const firstPid=adb('shell','pidof',PACKAGE).trim();assert.match(firstPid,/^\d+$/,'single_app_pid_required');
  capture('landing',xml);pass('signed-out-landing');tap(xml,'Entrar');
  xml=await wait('signin-form',x=>hasInput(x,'E-mail')&&hasInput(x,'Senha'));tap(xml,'E-mail',true);
  const ime=adb('shell','dumpsys','input_method');assert.ok(/(?:mInputShown|isInputViewShown)=true/.test(ime),'native_keyboard_not_observed');
  adb('shell','input','text','invalid');adb('shell','input','keyevent','4');
  xml=await wait('signin-invalid-typed',x=>nodes(x).some(n=>n.package===PACKAGE&&n.class==='android.widget.EditText'&&n.text==='invalid'));tap(xml,'Entrar');
  xml=await wait('signin-validation',x=>hasText(x,'Confira seu e-mail e senha'));assert.ok(hasInput(xml,'E-mail'));capture('signin-invalid',xml);pass('native-keyboard-invalid-signin');tap(xml,'Voltar');
  xml=await wait('landing-before-signup',x=>hasText(x,'Trabalho certo, na hora certa.'));tap(xml,'Criar conta');
  xml=await wait('professional-signup',x=>hasInput(x,'E-mail')&&hasInput(x,'Senha com oito ou mais caracteres')&&selected(x,'Quero trabalhar')&&!hasInput(x,'Nome da empresa'));
  assert.equal(hasText(xml,'Preencha um e-mail válido, senha de 8 a 128 caracteres e, para empresa, nome de até 120 caracteres.'),false,'stale_professional_validation');
  tap(xml,'Criar conta');xml=await wait('professional-signup-validation',x=>hasText(x,'Preencha um e-mail válido, senha de 8 a 128 caracteres e, para empresa, nome de até 120 caracteres.'));capture('professional-signup-invalid',xml);pass('empty-professional-signup-validation');tap(xml,'Voltar');
  xml=await wait('landing-before-company-signup',x=>hasText(x,'Trabalho certo, na hora certa.'));tap(xml,'Criar conta');
  xml=await wait('fresh-company-signup-form',x=>hasInput(x,'E-mail')&&selected(x,'Quero trabalhar')&&!hasText(x,'Preencha um e-mail válido, senha de 8 a 128 caracteres e, para empresa, nome de até 120 caracteres.'));tap(xml,'Sou empresa');
  xml=await wait('company-signup-selection',x=>hasInput(x,'Nome da empresa')&&selected(x,'Sou empresa'));assert.equal(hasText(xml,'Preencha um e-mail válido, senha de 8 a 128 caracteres e, para empresa, nome de até 120 caracteres.'),false,'stale_company_validation');capture('company-signup-selected',xml);pass('company-choice-accessibility');tap(xml,'Criar conta');
  xml=await wait('company-signup-validation',x=>hasText(x,'Preencha um e-mail válido, senha de 8 a 128 caracteres e, para empresa, nome de até 120 caracteres.'));assert.ok(hasInput(xml,'Nome da empresa'));capture('company-signup-invalid',xml);pass('empty-company-signup-validation');tap(xml,'Quero trabalhar');
  xml=await wait('professional-signup-reselected',x=>selected(x,'Quero trabalhar')&&!hasInput(x,'Nome da empresa'));pass('professional-choice-removes-company-field');tap(xml,'Voltar');
  await wait('landing-after-signup',x=>hasText(x,'Trabalho certo, na hora certa.'));
  stage='relaunch-signed-out';adb('shell','am','force-stop',PACKAGE);offline();adb('shell','monkey','-p',PACKAGE,'-c','android.intent.category.LAUNCHER','1');
  xml=await wait('relaunch-signed-out-landing',x=>hasText(x,'Trabalho certo, na hora certa.')&&hasText(x,'Entrar'));capture('relaunch-signed-out',xml);pass('relaunch-remains-signed-out');
  const relaunchedPid=adb('shell','pidof',PACKAGE).trim();assert.match(relaunchedPid,/^\d+$/,'relaunched_pid_required');assert.notEqual(relaunchedPid,firstPid,'new_process_required');
  const log=adb('logcat','-d');assert.ok(!/FATAL EXCEPTION|AndroidRuntime.*FATAL|ReactNativeJS:.*(?:Error|TypeError|ReferenceError)|Unable to load script/.test(log),'native_fatal_after_journey');offline();
  const receipt={...config,workspace:undefined,serial,apkSHA256:apkSHA,result:'success',checks,captures,firstPid,relaunchedPid,offline:offline(),scope:'native standalone emulator entry/invalid-input only; no successful auth, API/PG UI, SecureStore persistence, physical/VisualTruth or area acceptance'};
  fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});console.log('ANDROID_ENTRY_JOURNEY_PASS '+JSON.stringify(receipt));
 }catch(error){
  const receipt={...config,workspace:undefined,result:'failure',stage,error:String(error.message).slice(0,180),checks,captures};
  if(serial&&size)try{capture('failure',hierarchy());}catch{/* Diagnostics cannot convert failure to success. */}
  fs.writeFileSync(path.join(out,'failure.json'),JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});
  console.error('ANDROID_ENTRY_JOURNEY_FAIL '+JSON.stringify(receipt));throw error;
 }finally{if(serial)try{adb('shell','am','force-stop',PACKAGE);}catch{/* Original result remains authoritative. */}}
}
if(require.main===module)main().catch(error=>{console.error('ANDROID_ENTRY_PROCESS_FAIL '+JSON.stringify({name:error.name,code:error.code||null}));process.exitCode=1;});
