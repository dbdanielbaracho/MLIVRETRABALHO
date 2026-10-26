'use strict';
// CI-only loopback surface. No app endpoint, real operator or production provisioning.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {randomUUID,createHash}=require('node:crypto'),{createRequire}=require('node:module');
const {Client}=createRequire(path.resolve('apps/api/package.json'))('pg');
const root=path.resolve('/tmp/mlivre-support-native'),privateFile=path.join(root,'private.json'),modeFile=path.join(root,'fault.json'),trafficFile=path.join(root,'traffic.json');
function guard(){assert.equal(process.env.CI,'true');assert.equal(process.env.GITHUB_REPOSITORY,'dbdanielbaracho/MLIVRETRABALHO');const u=new URL(process.env.DATABASE_URL);assert.ok(['localhost','127.0.0.1'].includes(u.hostname));assert.equal(u.pathname,'/mlivretrabalho_http');return u;}
async function database(){guard();const db=new Client({connectionString:process.env.DATABASE_URL,connectionTimeoutMillis:5000});await db.connect();assert.equal((await db.query('SELECT current_database() name')).rows[0].name,'mlivretrabalho_http');assert.ok(['127.0.0.1','::1','::ffff:127.0.0.1'].includes(db.connection.stream.remoteAddress));return db;}
async function request(origin,actor,method,p,body,status=method==='POST'?201:200){const r=await fetch(origin+p,{method,redirect:'error',signal:AbortSignal.timeout(10000),headers:{...(actor?{authorization:'Bearer '+actor.token}:{}),...(body===undefined?{}:{'content-type':'application/json'})},...(body===undefined?{}:{body:JSON.stringify(body)})});assert.equal(r.status,status,'native fixture '+method+' '+p.replace(/[0-9a-f-]{36}/g,':id'));return r.json();}
async function command(name){
 const info=JSON.parse(fs.readFileSync(privateFile,'utf8')),db=await database();
 try{
  for(const a of Object.values(info.accounts))assert.match(a.email,/^native-[a-z]+-[a-f0-9]+@example\.test$/);
  if(name==='enable')await db.query('UPDATE platform_support_capability SET enabled=true');
  else if(name==='reply'){
   const row=(await db.query('SELECT id FROM platform_support_cases WHERE owner_identity_id=$1 AND description=$2',[info.accounts.pro.id,'Native_first_request'])).rows[0];assert.ok(row);
   await request(info.actual,info.accounts.admin,'POST','/v1/platform-support/admin/cases/'+row.id+'/assignment',{targetOperatorId:info.accounts.operator.id,expectedRevision:0});
   await request(info.actual,info.accounts.operator,'POST','/v1/platform-support/cases/'+row.id+'/responses',{responseKey:randomUUID(),body:'Native platform reply',resolve:false});
  }else if(name==='short-intent')await db.query("ALTER TABLE platform_support_intents ALTER COLUMN expires_at SET DEFAULT (now()+interval '12 seconds')");
  else if(name==='normal-intent')await db.query("ALTER TABLE platform_support_intents ALTER COLUMN expires_at SET DEFAULT (now()+interval '24 hours')");
  else if(name==='check-expired'){
   assert.equal((await db.query('SELECT count(*)::int n FROM platform_support_intents WHERE owner_identity_id=$1 AND submitted_at IS NULL AND expires_at<=now()',[info.accounts.pro.id])).rows[0].n,1);
   assert.equal((await db.query('SELECT count(*)::int n FROM platform_support_cases c JOIN platform_support_intents i ON i.request_key=c.id WHERE i.owner_identity_id=$1 AND i.submitted_at IS NULL',[info.accounts.pro.id])).rows[0].n,0);
  }else if(name==='resolve-minimize'){
   const row=(await db.query('SELECT id FROM platform_support_cases WHERE owner_identity_id=$1 AND description=$2',[info.accounts.pro.id,'Native_retry_request'])).rows[0];assert.ok(row);
   await request(info.actual,info.accounts.admin,'POST','/v1/platform-support/admin/cases/'+row.id+'/assignment',{targetOperatorId:info.accounts.operator.id,expectedRevision:0});
   await request(info.actual,info.accounts.operator,'POST','/v1/platform-support/cases/'+row.id+'/responses',{responseKey:randomUUID(),body:'Synthetic resolved response',resolve:true});
   await db.query('UPDATE platform_support_cases SET description=NULL WHERE id=$1',[row.id]);await db.query('UPDATE platform_support_responses SET body=NULL WHERE case_id=$1',[row.id]);
  }else if(name==='expire')await db.query('DELETE FROM sessions WHERE identity_id=$1',[info.accounts.pro.id]);
  else if(name==='seed-history'){
   for(let i=0;i<21;i++){const body={category:'other',description:'Native_history_'+i},intent=await request(info.actual,info.accounts.pro,'POST','/v1/me/platform-support/intent',body);const r=await fetch(info.actual+'/v1/me/platform-support',{method:'POST',headers:{authorization:'Bearer '+info.accounts.pro.token,'content-type':'application/json','idempotency-key':intent.requestKey},body:JSON.stringify(body),signal:AbortSignal.timeout(10000)});assert.equal(r.status,201);}
  }else if(name==='check-recovery'){
   assert.equal((await db.query('SELECT count(*)::int n FROM platform_support_cases WHERE owner_identity_id=$1 AND description=$2',[info.accounts.pro.id,'Native_recovery_request'])).rows[0].n,1);
   assert.equal((await db.query("SELECT count(*)::int n FROM platform_support_audit a JOIN platform_support_cases c ON c.id=a.case_id WHERE c.owner_identity_id=$1 AND c.description=$2 AND a.action='submitted'",[info.accounts.pro.id,'Native_recovery_request'])).rows[0].n,1);
  }else throw Error('native_command_unknown');
 }finally{await db.end();}
 console.log('NATIVE_FIXTURE_COMMAND_PASS '+name);
}
async function start(){
 guard();fs.mkdirSync(root,{recursive:true,mode:0o700});fs.writeFileSync(modeFile,'{}',{mode:0o600});
 const db=await database(),application=await require('../apps/api/dist/platform-support-application.pg.js').startPlatformSupportApplication({databaseUrl:process.env.DATABASE_URL,origin:'http://127.0.0.1:3000'});
 const accounts={},stamp=randomUUID().replaceAll('-',''),password='NativeFixture123';let server,closing=false;
 const capability=(await db.query('SELECT enabled FROM platform_support_capability WHERE singleton')).rows[0].enabled;
 async function close(){if(closing)return;closing=true;try{await new Promise(resolve=>server?server.close(resolve):resolve());
  await db.query("ALTER TABLE platform_support_intents ALTER COLUMN expires_at SET DEFAULT (now()+interval '24 hours')");await db.query('UPDATE platform_support_capability SET enabled=$1',[capability]);
  const ids=Object.values(accounts).map(a=>a.id);await db.query('DELETE FROM sessions WHERE identity_id=ANY($1::uuid[])',[ids]);
  await db.query('DELETE FROM platform_support_audit WHERE actor_identity_id=ANY($1::uuid[]) OR subject_identity_id=ANY($1::uuid[]) OR case_id IN(SELECT id FROM platform_support_cases WHERE owner_identity_id=ANY($1::uuid[]))',[ids]);
  await db.query('DELETE FROM platform_support_cases WHERE owner_identity_id=ANY($1::uuid[])',[ids]);await db.query('DELETE FROM platform_support_intents WHERE owner_identity_id=ANY($1::uuid[])',[ids]);await db.query('DELETE FROM platform_support_administrators WHERE identity_id=ANY($1::uuid[])',[ids]);await db.query('DELETE FROM platform_support_operators WHERE identity_id=ANY($1::uuid[])',[ids]);
 }finally{await application.close();await db.end();fs.rmSync(privateFile,{force:true});console.log('NATIVE_API_CLEANUP_PASS syntheticPrivateRowsSessionsRolesACLsRemoved=true capabilityRestored=true');}}
 try{
  for(const label of ['pro','company','admin','operator']){const email='native-'+label+'-'+stamp+'@example.test',company=label==='company',created=await request(application.origin,null,'POST','/v1/auth/signup',{email,password,accountType:company?'company':'professional',...(company?{workspaceName:'Native synthetic company'}:{})}),signed=await request(application.origin,null,'POST','/v1/auth/signin',{email,password});accounts[label]={id:created.id,email,password,token:signed.accessToken};}
  await db.query('INSERT INTO platform_support_administrators(identity_id,active) VALUES($1,true)',[accounts.admin.id]);await request(application.origin,accounts.admin,'POST','/v1/platform-support/admin/operators/'+accounts.operator.id,{active:true,expectedRevision:0});await db.query('UPDATE platform_support_capability SET enabled=false');
  const traffic=[];
  server=http.createServer(async(req,res)=>{try{
   const url=new URL(req.url,'http://127.0.0.1');assert.ok(url.pathname.startsWith('/v1/'));assert.ok(['GET','POST','PUT','DELETE'].includes(req.method));let bytes=Buffer.alloc(0);for await(const part of req){bytes=Buffer.concat([bytes,part]);assert.ok(bytes.length<20000);}
   const mode=JSON.parse(fs.readFileSync(modeFile,'utf8')),isList=req.method==='GET'&&url.pathname==='/v1/me/platform-support',isSubmit=req.method==='POST'&&url.pathname==='/v1/me/platform-support';
   const row={...(isSubmit?{keyHash:createHash('sha256').update(String(req.headers['idempotency-key']??'')).digest('hex')}:{}),method:req.method,route:url.pathname.replace(/[a-f0-9-]{36}/g,':id'),cursor:url.searchParams.has('cursor'),at:new Date().toISOString()};traffic.push(row);fs.writeFileSync(trafficFile,JSON.stringify(traffic));
   if(isSubmit&&mode.rejectSubmitOnce){fs.writeFileSync(modeFile,'{}');row.status=503;fs.writeFileSync(trafficFile,JSON.stringify(traffic));res.writeHead(503,{'content-type':'application/json'});res.end(JSON.stringify({statusCode:503,message:'synthetic_network_unavailable',error:'Service Unavailable'}));return;}
   if(isList&&mode.listErrorOnce){fs.writeFileSync(modeFile,'{}');res.writeHead(503,{'content-type':'application/json'});res.end(JSON.stringify({statusCode:503,message:'synthetic_network_unavailable',error:'Service Unavailable'}));return;}
   const headers={};for(const key of ['authorization','content-type','x-tenant-id','idempotency-key'])if(typeof req.headers[key]==='string')headers[key]=req.headers[key];
   const upstream=await fetch(application.origin+url.pathname+url.search,{method:req.method,headers,redirect:'error',signal:AbortSignal.timeout(10000),...(bytes.length?{body:bytes}:{} )}),body=Buffer.from(await upstream.arrayBuffer());
   row.status=upstream.status;fs.writeFileSync(trafficFile,JSON.stringify(traffic));
   const delay=isSubmit&&mode.delaySubmitOnce?18000:isList&&mode.delayListOnce?8000:0;if(delay){fs.writeFileSync(modeFile,'{}');await new Promise(resolve=>setTimeout(resolve,delay));}
   if(!res.destroyed){res.writeHead(upstream.status,{'content-type':'application/json'});res.end(body);}
  }catch{if(!res.destroyed){res.writeHead(502,{'content-type':'application/json'});res.end(JSON.stringify({statusCode:502,message:'synthetic_fixture_failure',error:'Bad Gateway'}));}}});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const port=server.address().port;
  fs.writeFileSync(privateFile,JSON.stringify({actual:application.origin,port,accounts}),{mode:0o600});fs.writeFileSync(path.join(root,'public.json'),JSON.stringify({api:'http://10.0.2.2:'+port+'/v1',package:'com.predibeacon.mlivretrabalho.supportfixture',synthetic:true,production:false}));
  process.on('SIGTERM',()=>void close().then(()=>process.exit(0),()=>process.exit(1)));process.on('SIGINT',()=>void close().then(()=>process.exit(0),()=>process.exit(1)));
  console.log('NATIVE_API_READY localAppModule=true isolatedPackage=true syntheticOnly=true');
 }catch(e){await close();throw e;}
}
if(require.main===module)(process.argv[2]==='command'?command(process.argv[3]):start()).catch(()=>{console.error('NATIVE_API_FAIL privateDetailsHidden=true');process.exitCode=1;});
