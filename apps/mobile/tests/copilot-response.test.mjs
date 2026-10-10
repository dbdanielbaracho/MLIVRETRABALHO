import test from 'node:test';
import assert from 'node:assert/strict';
import {interpretRequest,validInterpretation} from '../lib/copilot-response.ts';
const data={accountType:'professional',intent:'show_schedule',confidence:0.88,reasons:['pedido sobre agenda/turnos'],suggestedRoute:'/agenda',mode:'assisted',executionAllowed:false,requiresHumanConfirmation:false,provider:'deterministic_baseline',providerConfigured:false,disclaimer:'Sugestão assistida.'};
const response=(data,ok=true)=>({ok,json:async()=>data});
test('interpretation sends one explicit assisted request, trims text and preserves actual response',async()=>{
 const calls=[];const result=await interpretRequest(async(path,body)=>{calls.push([path,body]);return response(data)},'  meu próximo trabalho  ');
 assert.deepEqual(calls,[['/copilot/interpret',{text:'meu próximo trabalho',mode:'assisted'}]]);assert.deepEqual(result,{status:'ready',data});
});
test('empty and oversized input never makes a request',async()=>{
 let calls=0;const request=async()=>{calls++;return response(data)};
 for(const text of [' ','x'.repeat(2001)])assert.deepEqual(await interpretRequest(request,text),{status:'invalid'});assert.equal(calls,0);
});
test('routes must correspond to a known intent and cannot inject arbitrary navigation',()=>{
 for(const value of [{...data,suggestedRoute:'https://example.com'},{...data,suggestedRoute:'/pagamentos'},{...data,intent:'invented'},{...data,intent:'unknown',suggestedRoute:'/agenda'}])assert.equal(validInterpretation(value),false);
 assert.equal(validInterpretation({...data,intent:'unknown',suggestedRoute:null}),true);
 assert.equal(validInterpretation({...data,accountType:'company',intent:'company_analytics',suggestedRoute:'/analytics'}),true);
});
test('critical suggestions retain human confirmation and reject automatic execution or mode',()=>{
 assert.equal(validInterpretation({...data,requiresHumanConfirmation:true}),true);
 assert.equal(validInterpretation({...data,executionAllowed:true}),false);assert.equal(validInterpretation({...data,mode:'automatic'}),false);
});
test('invalid explanations/confidence/provider facts never become a renderable suggestion',()=>{
 for(const value of [{...data,reasons:null},{...data,reasons:[1]},{...data,confidence:NaN},{...data,confidence:2},{...data,providerConfigured:undefined},{...data,disclaimer:''}])assert.equal(validInterpretation(value),false);
});
test('HTTP, malformed JSON and network failure return error without repeating a request',async()=>{
 for(const request of [async()=>response({},false),async()=>({ok:true,json:async()=>{throw Error('JSON')}}),async()=>{throw Error('offline')},async()=>response({...data,executionAllowed:true})])assert.deepEqual(await interpretRequest(request,'ver agenda'),{status:'error'});
 let count=0;await interpretRequest(async()=>{count++;throw Error('timeout')},'ver agenda');assert.equal(count,1);
});

test('notification route follows the server account type and rejects an opposite or missing navigation context',()=>{
 const professional={...data,intent:'show_notifications',suggestedRoute:'/notificacoes'};
 const company={...professional,accountType:'company',suggestedRoute:'/empresa-notificacoes'};
 assert.equal(validInterpretation(professional),true);assert.equal(validInterpretation(company),true);
 for(const value of [{...company,suggestedRoute:'/notificacoes'},{...professional,suggestedRoute:'/empresa-notificacoes'},{...company,accountType:undefined},{...company,accountType:'admin'},{...data,intent:'company_analytics',suggestedRoute:'/analytics'}])assert.equal(validInterpretation(value),false);
});
