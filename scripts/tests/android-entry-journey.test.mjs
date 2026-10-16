import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
const require=createRequire(import.meta.url);
const {configuration,emulatorSerial,assertOffline,nodes,target,hasText,selected,hasInput,pngMetadata,verifyBuild,PACKAGE}=require('../android-entry-journey.cjs');
const sha='a'.repeat(40),env={CI:'true',GITHUB_ACTIONS:'true',GITHUB_REPOSITORY:'dbdanielbaracho/MLIVRETRABALHO',GITHUB_SHA:sha,MLIVRE_SOURCE_HEAD:'b'.repeat(40),GITHUB_RUN_ID:'123',GITHUB_RUN_ATTEMPT:'1',GITHUB_WORKSPACE:'/fixture/workspace'};
const offline={airplane:'enabled\n',wifi:'0\n',data:'0\n',routes4:'',routes6:'',globalAddresses:''};
const xml=(body)=>'<?xml version="1.0" encoding="UTF-8"?><hierarchy rotation="0">'+body+'</hierarchy>';
const node=(name,extra='')=>'<node text="'+name+'" content-desc="'+name+'" package="'+PACKAGE+'" class="android.widget.Button" enabled="true" clickable="true" bounds="[20,30][120,70]" '+extra+'/>';
test('entry journey refuses non-CI, another repository and missing checkout/source provenance',()=>{
 assert.equal(configuration(env).checkout,sha);
 for(const update of [{CI:'false'},{GITHUB_ACTIONS:'false'},{GITHUB_REPOSITORY:'another/repo'},{GITHUB_SHA:'main'},{MLIVRE_SOURCE_HEAD:''},{GITHUB_RUN_ID:'unknown'},{GITHUB_WORKSPACE:'relative'}])assert.throws(()=>configuration({...env,...update}));
});
test('entry journey requires exactly one authorized emulator and refuses physical or ambiguous devices',()=>{
 assert.equal(emulatorSerial('List of devices attached\nemulator-5554\tdevice\n'),'emulator-5554');
 for(const data of ['List of devices attached\n','R9XT90DL22H\tdevice\n','emulator-5554\tunauthorized\n','emulator-5554\toffline\n','emulator-5554\tdevice\nemulator-5556\tdevice\n'])assert.throws(()=>emulatorSerial(data));
});
test('offline requires disabled radios plus no IPv4/IPv6 default route or global address',()=>{
 assert.doesNotThrow(()=>assertOffline(offline));
 for(const update of [{airplane:'disabled'},{wifi:'1'},{data:'1'},{routes4:'default via 10.0.2.2 dev eth0'},{routes6:'default via fe80::1 dev wlan0'},{globalAddresses:'2: eth0 inet 10.0.2.15/24 scope global eth0'}])assert.throws(()=>assertOffline({...offline,...update}));
});
test('UI targets use the unique actual enabled app node and its bounded observed rectangle',()=>{
 assert.deepEqual(target(xml(node('Entrar')),'Entrar',{width:1080,height:2400}),{x:70,y:50});
 assert.deepEqual(target(xml(node('✓ Sou empresa','selected="true"')),'Sou empresa',{width:1080,height:2400}),{x:70,y:50});
});
test('UI targets refuse system package matches, disabled nodes, ambiguous nodes and offscreen bounds',()=>{
 for(const body of [node('Entrar').replace(PACKAGE,'com.android.permissioncontroller'),node('Entrar').replace('enabled="true"','enabled="false"'),node('Entrar')+node('Entrar').replace('[20,30][120,70]','[200,30][300,70]'),node('Entrar').replace('[20,30][120,70]','[0,0][0,0]'),node('Entrar').replace('[20,30][120,70]','[0,0][1200,2500]')])assert.throws(()=>target(xml(body),'Entrar',{width:1080,height:2400}));
});
test('text states require complete XML and actual app nodes rather than keyboard or system text',()=>{
 assert.equal(hasText(xml(node('Confira seu e-mail e senha')),'Confira seu e-mail e senha'),true);
 assert.equal(hasText(xml(node('Confira seu e-mail e senha').replace(PACKAGE,'keyboard')),'Confira seu e-mail e senha'),false);
 assert.throws(()=>nodes('<hierarchy><node text="truncated"'));assert.throws(()=>nodes(''));
});
test('role and input assertions use selected accessibility state and native EditText rather than text alone',()=>{
 assert.equal(selected(xml(node('✓ Sou empresa','selected="true"')),'Sou empresa'),true);assert.equal(selected(xml(node('Sou empresa','selected="false"')),'Sou empresa'),false);
 assert.equal(hasInput(xml(node('Nome da empresa').replace('android.widget.Button','android.widget.EditText')),'Nome da empresa'),true);assert.equal(hasInput(xml(node('Nome da empresa')),'Nome da empresa'),false);
});
test('build identity requires the exact checkout, standalone package and actual APK bytes digest',()=>{
 const apk=Buffer.from('unit fixture not a real APK'),hash=createHash('sha256').update(apk).digest('hex');
 const info='commit_sha='+sha+'\nandroid_package='+PACKAGE+'\nmetro_required=false\n';assert.equal(verifyBuild(info,{checkout:sha},apk,hash+'  /fixture/MLivreTrabalho.apk\n'),hash);
 assert.throws(()=>verifyBuild(info,{checkout:'c'.repeat(40)},apk,hash+'  MLivreTrabalho.apk'));
 assert.throws(()=>verifyBuild(info.replace('false','true'),{checkout:sha},apk,hash+'  MLivreTrabalho.apk'));
 assert.throws(()=>verifyBuild(info,{checkout:sha},apk,'0'.repeat(64)+'  MLivreTrabalho.apk'));
});
test('PNG metadata validates actual signature and records dimensions and individual image digest',()=>{
 const b=Buffer.alloc(32);Buffer.from('89504e470d0a1a0a','hex').copy(b);b.writeUInt32BE(1080,16);b.writeUInt32BE(2400,20);const m=pngMetadata(b);assert.equal(m.width,1080);assert.equal(m.height,2400);assert.equal(m.sha256,createHash('sha256').update(b).digest('hex'));assert.throws(()=>pngMetadata(Buffer.from('not png')));
});
test('harness requires fresh company validation rather than reusing a prior professional error',()=>{
 const source=readFileSync(new URL('../android-entry-journey.cjs',import.meta.url),'utf8');assert.match(source,/fresh-company-signup-form/);assert.match(source,/stale_company_validation/);assert.match(source,/new_process_required/);assert.match(source,/installed_apk_mismatch/);
});
