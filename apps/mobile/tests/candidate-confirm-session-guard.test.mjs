import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import {loadCompanyJobs,loadCandidates,loadingCandidates,orderedCandidates,sameCompanyContext,confirmCandidate} from '../lib/company-candidates.ts';
import {runForSession} from '../lib/session-context.ts';
// Execute actual pre-JSX handlers, production parsers and confirmCandidate.
// Hook/auth/transport/clock fixtures are explicit; no RN render, real write or physical evidence.
const origin={Authorization:'Bearer fixture-a','x-tenant-id':'tenant-a'};
const job={id:'job-a',title:'Fixture',status:'open'},person={professionalId:'person-a',displayName:'Fixture person',status:'interested'};
function panel(){
 const source=fs.readFileSync(new URL('../app/candidatos.tsx',import.meta.url),'utf8'),start=source.indexOf('export default function Candidatos()'),end=source.indexOf('\n  return (\n',start);assert.ok(start>=0&&end>start);
 const code=stripTypeScriptTypes(source.slice(start,end).replace('export default ','')+'\nreturn {selectJob,confirm};\n}',{mode:'strip'});
 const create=new Function('useState','useRef','useCallback','useFocusEffect','authenticatedTenantHeaders','runForSession','apiUrl','loadCompanyJobs','loadCandidates','loadingCandidates','orderedCandidates','sameCompanyContext','confirmCandidate','fetch','setTimeout','clearTimeout',code+'\nreturn Candidatos();');
 const state=[],refs=[],calls=[],timers=new Map();let si=0,ri=0,focus,cleanup,h,nextTimer=0,headers={...origin},mode=null,reads=0,blocked=null;
 const auth=async()=>{const snapshot={...headers},n=++reads;if(mode==='tenant'&&n===1)queueMicrotask(()=>{headers={...headers,'x-tenant-id':'tenant-b'}});if(mode==='session'&&n===1)queueMicrotask(()=>{headers={...headers,Authorization:'Bearer fixture-b'}});if(mode==='pause'&&n===2)return new Promise(resolve=>{blocked={resolve,snapshot}});return snapshot;};
 const fetch=async(path,options)=>{calls.push({path,options});return {ok:true,json:async()=>options.method==='POST'?{id:'assignment-a',jobId:job.id,professionalId:person.professionalId,tenantId:origin['x-tenant-id'],status:'confirmed'}:path==='/company/jobs'?[job]:path.endsWith('/candidates')?[{...person,status:calls.some(c=>c.options.method==='POST')?'confirmed':'interested'}]:[]};};
 function render(){si=ri=0;h=create(initial=>{const n=si++;if(!(n in state))state[n]=typeof initial==='function'?initial():initial;return[state[n],v=>{state[n]=typeof v==='function'?v(state[n]):v}]},initial=>{const n=ri++;return refs[n]??(refs[n]={current:initial})},cb=>cb,cb=>{focus=cb},auth,runForSession,p=>p,loadCompanyJobs,loadCandidates,loadingCandidates,orderedCandidates,sameCompanyContext,confirmCandidate,fetch,cb=>{const n=++nextTimer;timers.set(n,cb);return n},n=>timers.delete(n));}
 render();cleanup=focus();return {state,calls,render,pump:()=>new Promise(setImmediate),select:()=>h.selectJob(job.id),confirm:()=>h.confirm(person.professionalId),arm:m=>{mode=m;reads=0},timer:()=>{const fn=[...timers.values()].at(-1);assert.ok(fn);return fn},blur:()=>cleanup(),release:()=>{assert.ok(blocked);const b=blocked;blocked=null;b.resolve(b.snapshot)},get blocked(){return !!blocked},get posts(){return calls.filter(c=>c.options.method==='POST')}};
}
async function ready(){const h=panel();await h.pump();h.render();await h.select();h.render();return h;}
test('changed tenant or session after the displayed snapshot cannot dispatch candidate confirmation with old headers',async()=>{
 for(const mode of ['tenant','session']){const h=await ready();h.arm(mode);await h.confirm();assert.equal(h.posts.length,0);assert.doesNotMatch(h.state[4],/^Profissional confirmado/);assert.equal(h.state[5],'');h.blur();}
});
test('deadline or real blur while transport context is unresolved prevents a non-cancellable candidate POST',async()=>{
 for(const mode of ['deadline','blur']){const h=await ready();h.arm('pause');const pending=h.confirm();await h.pump();assert.ok(h.blocked);if(mode==='deadline')h.timer()();else h.blur();h.release();await pending;assert.equal(h.posts.length,0);assert.doesNotMatch(h.state[4],/^Profissional confirmado/);assert.equal(h.state[5],'');h.blur();}
});
test('unchanged displayed company confirms exactly once with origin headers and actual acknowledgement then refreshes',async()=>{
 const h=await ready();h.arm(null);await h.confirm();assert.equal(h.posts.length,1);assert.equal(h.posts[0].path,'/company/jobs/job-a/confirm');assert.deepEqual(h.posts[0].options.headers,{...origin,'content-type':'application/json'});assert.deepEqual(JSON.parse(h.posts[0].options.body),{professionalId:person.professionalId});assert.equal(h.state[4],'Profissional confirmado.');assert.equal(h.state[5],'');assert.equal(h.state[3].candidates.status,'ready');assert.equal(h.state[3].candidates.data[0].status,'confirmed');h.render();await h.confirm();assert.equal(h.posts.length,1);h.blur();
});
