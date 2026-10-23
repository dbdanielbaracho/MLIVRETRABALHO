'use strict';
// Deliberately bounded JSON Schema subset used by this document, not a general OAS validator.
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {resolve}=require('node:path');
const schemaKeys=new Set(['$ref','type','properties','required','additionalProperties','items','enum','const','anyOf','minimum','maximum','minLength','minItems','pattern','format','description']);
const methods=new Set(['get','post','put','patch','delete']);
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function contract(catalog,spec=JSON.parse(readFileSync(resolve(__dirname,'../docs/api/openapi.json'),'utf8'))){
 const fail=(label,pointer)=>{throw new Error('OpenAPI_'+label+'_'+pointer);};
 const deref=ref=>{
  assert.match(ref,/^#\/components\/schemas\/[A-Za-z][A-Za-z0-9]*$/,'Local schema references only');
  const s=spec.components.schemas[ref.slice('#/components/schemas/'.length)];assert.ok(s,'Referenced schema exists');return s;
 };
 function shape(s,pointer,refs=new Set()){
  assert.ok(object(s),'Schema object required: '+pointer);
  for(const k of Object.keys(s))assert.ok(schemaKeys.has(k),'Unsupported schema keyword: '+k);
  if(s.$ref){assert.equal(Object.keys(s).length,1);assert.ok(!refs.has(s.$ref),'Recursive refs unsupported');shape(deref(s.$ref),pointer,new Set([...refs,s.$ref]));return;}
  if(s.type)assert.ok(['object','array','string','number','integer','boolean','null'].includes(s.type));
  if(s.properties){assert.equal(s.type,'object');assert.ok(object(s.properties));for(const [k,v]of Object.entries(s.properties))shape(v,pointer+'/'+k,refs);}
  if(s.required){assert.equal(s.type,'object');assert.equal(new Set(s.required).size,s.required.length);for(const k of s.required)assert.ok(Object.hasOwn(s.properties??{},k));}
  if(Object.hasOwn(s,'additionalProperties'))assert.equal(s.additionalProperties,true,'Current schemas allow additive fields explicitly');
  if(s.type==='array'){assert.ok(s.items);shape(s.items,pointer+'/items',refs);}
  if(s.anyOf){assert.ok(s.anyOf.length>0);for(const x of s.anyOf)shape(x,pointer+'/anyOf',refs);}
  if(s.enum)assert.ok(Array.isArray(s.enum)&&s.enum.length>0);
  if(s.pattern)new RegExp(s.pattern);
  if(s.format)assert.equal(s.format,'date-time');
 }
 function validate(s,value,pointer){
  if(s.$ref)return validate(deref(s.$ref),value,pointer);
  if(s.anyOf){let valid=false;for(const choice of s.anyOf){try{validate(choice,value,pointer);valid=true;break;}catch{}}if(!valid)fail('anyOf',pointer);}
  const t=s.type;
  if(t&&!(t==='object'?object(value):t==='array'?Array.isArray(value):t==='null'?value===null:t==='integer'?Number.isSafeInteger(value):t==='number'?typeof value==='number'&&Number.isFinite(value):typeof value===t))fail('type',pointer);
  if(Object.hasOwn(s,'const')&&!equal(value,s.const))fail('const',pointer);
  if(s.enum&&!s.enum.some(x=>equal(value,x)))fail('enum',pointer);
  if(typeof value==='number'&&((s.minimum!==undefined&&value<s.minimum)||(s.maximum!==undefined&&value>s.maximum)))fail('range',pointer);
  if(typeof value==='string'){
   if(s.minLength!==undefined&&Array.from(value).length<s.minLength)fail('minLength',pointer);
   if(s.pattern&&!new RegExp(s.pattern).test(value))fail('pattern',pointer);
   if(s.format==='date-time'){
    const m=value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|([+-])(\d{2}):(\d{2}))$/);
    if(!m||!Number.isFinite(Date.parse(value))||+m[2]<1||+m[2]>12||+m[3]<1||+m[3]>new Date(Date.UTC(+m[1],+m[2],0)).getUTCDate()||+m[4]>23||+m[5]>59||+m[6]>59||+(m[8]??0)>23||+(m[9]??0)>59)fail('date-time',pointer);
   }
  }
  if(Array.isArray(value)){if(s.minItems!==undefined&&value.length<s.minItems)fail('minItems',pointer);if(s.items)for(const row of value)validate(s.items,row,pointer+'/items');}
  if(object(value)){for(const k of s.required??[])if(!Object.hasOwn(value,k))fail('required',pointer+'/'+k);for(const [k,child]of Object.entries(s.properties??{}))if(Object.hasOwn(value,k))validate(child,value[k],pointer+'/'+k);}
 }
 assert.equal(spec.openapi,'3.1.0');assert.ok(spec.info?.title&&spec.info.version);assert.deepEqual(spec.servers,[{url:'/',description:'Relative to the API host; choose your authorized environment explicitly.'}]);
 assert.deepEqual(spec.security,[{session:[]}]);assert.equal(spec.components.securitySchemes.session.type,'http');assert.equal(spec.components.securitySchemes.session.scheme,'bearer');assert.ok(!spec.components.securitySchemes.session.bearerFormat,'Opaque session is not JWT');
 assert.deepEqual(spec['x-contract-source'].controllerBlobs,catalog.sources,'Controller source drift requires contract review');
 for(const [name,s]of Object.entries(spec.components.schemas))shape(s,name);
 const ops=new Map(),ids=new Set();
 for(const [path,item]of Object.entries(spec.paths))for(const [method,op]of Object.entries(item)){
  assert.ok(methods.has(method));const nest=path.replace(/\{(\w+)\}/g,':$1'),key=method.toUpperCase()+' '+nest;
  assert.ok(!ops.has(key));ops.set(key,op);assert.ok(op.operationId&&!ids.has(op.operationId));ids.add(op.operationId);
  const row=catalog.routes.find(r=>r.method===method.toUpperCase()&&r.path===nest);assert.ok(row,'Undeclared runtime operation');assert.equal(op['x-nest-controller'],row.controller);
  const params=op.parameters??[];assert.equal(new Set(params.map(p=>p.in+' '+p.name)).size,params.length);
  assert.deepEqual(params.filter(p=>p.in==='path').map(p=>p.name).sort(),[...path.matchAll(/\{(\w+)\}/g)].map(m=>m[1]).sort());
  for(const p of params){assert.ok(['path','query','header'].includes(p.in));if(p.in==='path')assert.equal(p.required,true);shape(p.schema,key+'/parameter');}
  assert.equal(params.some(p=>p.in==='header'&&p.name==='x-tenant-id'),row.tenantHeader,'Tenant parameter drift');
  if(row.tenantHeader){const optional=['GET /v1/assignments/mine','GET /v1/earnings/mine','GET /v1/notifications/mine','GET /v1/notifications/unread-count','GET /v1/safety-cases/mine','GET /v1/safety-appeals/mine','GET /v1/work-passport/mine','POST /v1/copilot/read'];assert.equal(params.find(p=>p.name==='x-tenant-id'&&p.in==='header').required,!optional.includes(key),'Tenant requiredness drift');}
  const anonymous=['GET /v1/health/ready','GET /v1/vertical-packs','GET /v1/vertical-packs/:id','GET /v1/taxonomy/roles','POST /v1/auth/signup','POST /v1/auth/signin'].includes(key);
  const expected=anonymous?[]:key==='POST /v1/payments/webhook'?[{webhookSignature:[],webhookTimestamp:[]}]:[{session:[]}];assert.deepEqual(op.security??spec.security,expected,'Authentication contract drift');
  const success=method==='post'&&nest!=='/v1/privacy/deactivate'?'201':'200';assert.ok(op.responses[success]?.content?.['application/json']?.schema,'Successful JSON contract required');
  for(const [status,res]of Object.entries(op.responses)){assert.ok(status==='default'||/^[1-5]\d{2}$/.test(status));assert.ok(res.description);shape(res.content['application/json'].schema,key+'/response/'+status);}
  if(op.requestBody)shape(op.requestBody.content['application/json'].schema,key+'/body');
 }
 assert.deepEqual([...ops.keys()].sort(),catalog.routes.map(r=>r.method+' '+r.path).sort(),'Every registered operation has a contract');
 let requests=0,responses=0;const observed=new Set(),positive=new Set();
 function operation(route){const k=route.method+' '+route.path,op=ops.get(k);assert.ok(op,'Missing operation');return [k,op];}
 const checked=fn=>{try{return fn();}catch(error){if(typeof error?.message==='string'&&/^OpenAPI_[A-Za-z0-9_/:. -]+$/.test(error.message)&&error.message.length<=250)console.error('OPENAPI_CONTRACT_MISMATCH '+JSON.stringify({contract:error.message}));throw error;}};
 return {
  request(route,path,headers,body){return checked(()=>{const [key,op]=operation(route);const names=route.path.split('/'),values=path.split('?')[0].split('/');
   for(const p of op.parameters){let value;if(p.in==='path')value=decodeURIComponent(values[names.indexOf(':'+p.name)]);else if(p.in==='header')value=headers[p.name];else value=new URL(path,'http://127.0.0.1').searchParams.get(p.name)??undefined;if(value===undefined){if(p.required)fail('parameter_required',key+'/'+p.name);}else validate(p.schema,value,key+'/parameter/'+p.name);}
   const security=op.security??spec.security;if(security.some(x=>Object.hasOwn(x,'session'))&&!/^Bearer \S+$/.test(headers.authorization??''))fail('session_required',key);
   if(security.some(x=>Object.hasOwn(x,'webhookSignature'))&&(!headers['x-webhook-signature']||!headers['x-webhook-timestamp']))fail('signature_required',key);
   if(body===undefined){if(op.requestBody?.required)fail('body_required',key);}else if(op.requestBody)validate(op.requestBody.content['application/json'].schema,body,key+'/body');requests++;
   });
  },
  response(route,status,value){return checked(()=>{const [key,op]=operation(route),res=op.responses[String(status)]??op.responses.default;assert.ok(res);validate(res.content['application/json'].schema,value,key+'/response/'+status);responses++;observed.add(key);if(status>=200&&status<300)positive.add(key);});},
  finish(expectedRequests){assert.equal(responses,expectedRequests,'Every real HTTP response validated');assert.equal(observed.size,ops.size);assert.equal(positive.size,ops.size);const receipt={operations:ops.size,positiveOperations:positive.size,validatedPositiveRequests:requests,validatedResponses:responses,schemas:Object.keys(spec.components.schemas).length,unsupportedKeywords:0,scope:'documented JSON Schema subset; business-state assertions remain in the real journey'};console.log('OPENAPI_REAL_HTTP_JSON_CONTRACT_PASS '+JSON.stringify(receipt));return receipt;},
  validate,document:spec,operationCount:ops.size
 };
}
module.exports={contract};
