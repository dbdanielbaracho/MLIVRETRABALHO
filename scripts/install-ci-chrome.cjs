'use strict';
// Control browser build skew without changing sandbox, transport guards, flags or deadlines.
// Publisher HTTPS metadata supplies object generation, size and MD5 integrity.
// SHA256 below is measured from actual bytes, NOT an invented vendor signature/checksum.
const fs=require('node:fs');
const fsp=require('node:fs/promises');
const path=require('node:path');
const {createHash}=require('node:crypto');
const {Readable,Transform}=require('node:stream');
const {pipeline}=require('node:stream/promises');
const {execFileSync}=require('node:child_process');
const VERSION='155.0.8059.84',REVISION='1697595',BUCKET='chrome-for-testing-public';
const OBJECT=VERSION+'/linux64/chrome-linux64.zip';
const ASSET='https://storage.googleapis.com/'+BUCKET+'/'+OBJECT;
const INDEX='https://googlechromelabs.github.io/chrome-for-testing/'+VERSION+'.json';
const METADATA='https://storage.googleapis.com/storage/v1/b/'+BUCKET+'/o/'+encodeURIComponent(OBJECT);
const MAX_BYTES=350*1024*1024;
let stage='configuration';
function check(value,label){if(!value){const e=Error(label);e.safeReason=label;throw e;}}
async function json(url){
 const r=await fetch(url,{redirect:'error',signal:AbortSignal.timeout(30000)});
 check(r.ok,'publisher_metadata_status');
 const text=await r.text();check(text.length<250000,'publisher_metadata_bound');return JSON.parse(text);
}
async function main(){
 check(['true','1'].includes(process.env.CI)&&process.platform==='linux'&&process.arch==='x64','ci_linux64_required');
 const temp=process.env.RUNNER_TEMP,envFile=process.env.GITHUB_ENV;
 check(typeof temp==='string'&&path.isAbsolute(temp)&&typeof envFile==='string'&&path.isAbsolute(envFile),'runner_paths_required');
 const tempReal=await fsp.realpath(temp);
 check(tempReal!=='/'&&envFile.startsWith(tempReal+path.sep),'runner_owned_paths_required');
 stage='publisher-release-index';
 const index=await json(INDEX);
 check(index.version===VERSION&&index.revision===REVISION,'exact_publisher_release_required');
 const linux=index.downloads?.chrome?.filter(x=>x.platform==='linux64');
 check(Array.isArray(linux)&&linux.length===1&&linux[0].url===ASSET,'exact_publisher_asset_required');
 stage='publisher-object-integrity';
 const meta=await json(METADATA);
 check(meta.bucket===BUCKET&&meta.name===OBJECT&&typeof meta.generation==='string'&&/^[0-9]{1,30}$/.test(meta.generation),'exact_publisher_object_required');
 check(typeof meta.size==='string'&&/^[0-9]+$/.test(meta.size),'publisher_size_required');
 const expectedSize=Number(meta.size);
 check(Number.isSafeInteger(expectedSize)&&expectedSize>1000000&&expectedSize<=MAX_BYTES,'publisher_size_bound');
 check(typeof meta.md5Hash==='string'&&/^[A-Za-z0-9+/]{22}==$/.test(meta.md5Hash)&&Buffer.from(meta.md5Hash,'base64').length===16,'publisher_integrity_required');
 const dir=await fsp.mkdtemp(path.join(tempReal,'mlivre-chrome-verified-'));
 const archive=path.join(dir,'chrome-linux64.zip');
 stage='generation-bound-download';
 const download=await fetch(ASSET+'?generation='+meta.generation,{redirect:'error',signal:AbortSignal.timeout(180000)});
 check(download.ok&&download.body,'archive_status');
 const declared=download.headers.get('content-length');
 check(declared!==null&&Number(declared)===expectedSize,'archive_size_header');
 const sha=createHash('sha256'),md5=createHash('md5');let size=0;
 await pipeline(Readable.fromWeb(download.body),new Transform({transform(chunk,encoding,callback){
  size+=chunk.length;if(size>expectedSize||size>MAX_BYTES){callback(Error('archive_size_overrun'));return;}
  sha.update(chunk);md5.update(chunk);callback(null,chunk);
 }}),fs.createWriteStream(archive,{flags:'wx',mode:0o600}));
 check(size===expectedSize&&(await fsp.stat(archive)).size===size,'archive_size_complete');
 const archiveSha256=sha.digest('hex');check(md5.digest('base64')===meta.md5Hash,'publisher_integrity_mismatch');
 stage='archive-integrity-and-owned-extraction';
 execFileSync('unzip',['-tq',archive],{stdio:'pipe',timeout:30000,maxBuffer:1024*1024});
 const names=execFileSync('unzip',['-Z','-1',archive],{encoding:'utf8',timeout:15000,maxBuffer:1024*1024}).trim().split('\n');
 check(names.length>0&&names.every(n=>n.startsWith('chrome-linux64/')&&!n.includes('\\')&&!n.split('/').includes('..')&&!n.includes('\0')),'owned_archive_entries_required');
 execFileSync('unzip',['-q',archive,'-d',dir],{stdio:'pipe',timeout:30000,maxBuffer:1024*1024});
 const binary=path.join(dir,'chrome-linux64','chrome'),realBinary=await fsp.realpath(binary);
 check(realBinary===binary&&realBinary.startsWith(dir+path.sep),'owned_binary_required');
 const binarySha256=createHash('sha256').update(await fsp.readFile(binary)).digest('hex');
 stage='exact-binary-version';
 const version=execFileSync(binary,['--version'],{encoding:'utf8',timeout:15000,maxBuffer:10000}).trim();
 check(version==='Google Chrome for Testing '+VERSION,'exact_binary_version_required');
 // Existing canonical and probe both honor CHROME_BIN. No fallback to another build.
 await fsp.appendFile(envFile,'CHROME_BIN='+binary+'\n');
 console.log('CHROME_PINNED_ASSET_VERIFIED '+JSON.stringify({version:VERSION,revision:REVISION,bucket:BUCKET,object:OBJECT,generation:meta.generation,bytes:size,archiveSha256,binarySha256,publisherMd5Matched:true,zipIntegrity:true,versionOutput:version,sandboxBypass:false,systemChromeFallback:false,production:false}));
}
main().catch(error=>{console.error('CHROME_PINNED_ASSET_FAILURE '+JSON.stringify({stage,reason:typeof error.safeReason==='string'&&/^[a-z_]{1,80}$/.test(error.safeReason)?error.safeReason:null}));process.exitCode=1;});
