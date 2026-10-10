import {useCallback,useRef,useState} from 'react';
import {useFocusEffect,useLocalSearchParams} from 'expo-router';
import {Pressable,SafeAreaView,ScrollView,StyleSheet,Text,TextInput,View} from 'react-native';
import {authHeaders} from '../lib/session';
import {apiUrl} from '../lib/api';
import {runForSession} from '../lib/session-context';
import {routeId,loadMessages,sendMessage} from '../lib/conversation';
import type {Messages,Request} from '../lib/conversation';
export default function Conversa(){
 const params=useLocalSearchParams<{assignmentId?:string|string[];tenantId?:string|string[]}>();
 const assignmentId=routeId(params.assignmentId),tenantId=routeId(params.tenantId);
 const [data,setData]=useState<Messages>({status:'loading'}),[body,setBody]=useState(''),[message,setMessage]=useState(''),[busy,setBusy]=useState(false);
 const draftAuthorization=useRef<string|null>(null),generation=useRef(0),sequence=useRef(0),pending=useRef(false),controllers=useRef(new Set<AbortController>()),snapshot=useRef<{headers:Record<string,string>;assignmentId:string;tenantId:string}|null>(null);
 function operation(){const controller=new AbortController();controllers.current.add(controller);const timer=setTimeout(()=>controller.abort(),15000);return {controller,finish:()=>{clearTimeout(timer);controllers.current.delete(controller);}};}
 function requestWith(headers:Record<string,string>,signal:AbortSignal):Request{return (path,payload)=>fetch(apiUrl(path),{method:payload?'POST':'GET',headers:{...headers,'x-tenant-id':tenantId,...(payload?{'content-type':'application/json'}:{})},...(payload?{body:JSON.stringify(payload)}:{}),signal});}
 async function load(manual=false,expected?:Record<string,string>){
  if(manual&&pending.current)return;const version=generation.current,seq=++sequence.current,op=operation();snapshot.current=null;setData({status:'loading'});
  try{
   if(!assignmentId||!tenantId){setData({status:'error'});return;}
   let originatingHeaders:Record<string,string>|null=null;
   const result=await runForSession(authHeaders,headers=>{originatingHeaders=headers;return loadMessages(requestWith(headers,op.controller.signal),assignmentId);},()=>version===generation.current&&seq===sequence.current&&!op.controller.signal.aborted,expected?.Authorization);
   if(version!==generation.current||seq!==sequence.current)return;
   if(result.status==='ready'){
    if(draftAuthorization.current&&draftAuthorization.current!==result.authorization)setBody('');
    draftAuthorization.current=result.authorization;setData(result.data);
    snapshot.current=result.data.status==='ready'&&originatingHeaders?{headers:originatingHeaders,assignmentId,tenantId}:null;if(manual)setMessage('');
   }else{const current=await authHeaders();if(version!==generation.current||seq!==sequence.current)return;setData({status:'error'});if(draftAuthorization.current&&current.Authorization!==draftAuthorization.current){setBody('');draftAuthorization.current=null;}setMessage('A sessão ou conexão mudou. Atualize as mensagens antes de agir.');}
  }finally{op.finish();}
 }
 useFocusEffect(useCallback(()=>{++generation.current;draftAuthorization.current=null;setBody('');setMessage('');void load();return()=>{++generation.current;++sequence.current;for(const c of controllers.current)c.abort();controllers.current.clear();snapshot.current=null;draftAuthorization.current=null;pending.current=false;setBusy(false);setBody('');setData({status:'loading'});};},[assignmentId,tenantId]));
 async function send(){
  const displayed=snapshot.current,text=body.trim();if(pending.current||!text||!displayed||displayed.assignmentId!==assignmentId||displayed.tenantId!==tenantId)return;
  pending.current=true;setBusy(true);const version=generation.current,op=operation();
  try{
   const result=await runForSession(authHeaders,headers=>sendMessage(requestWith(headers,op.controller.signal),assignmentId,text),()=>version===generation.current&&!op.controller.signal.aborted,displayed.headers.Authorization);
   if(version!==generation.current)return;
   if(result.status!=='ready'){const current=await authHeaders();if(version!==generation.current)return;snapshot.current=null;setData({status:'error'});if(current.Authorization!==displayed.headers.Authorization){draftAuthorization.current=null;setBody('');}setMessage('O envio não foi confirmado na sessão atual. Atualize para conferir antes de agir.');return;}
   setMessage(result.data.status==='sent'?'Mensagem enviada.':result.data.status==='rejected'?'Não foi possível enviar. Seu texto foi mantido.':'O envio não foi confirmado. Confira as mensagens antes de enviar novamente.');
   if(result.data.status==='sent')setBody('');await load(false,displayed.headers);
  }finally{op.finish();if(version===generation.current){pending.current=false;setBusy(false);}}
 }
 const blocked=busy||data.status!=='ready'||!assignmentId||!tenantId;
 return <SafeAreaView style={s.screen}><View style={s.content}><Text style={s.title}>Conversa do trabalho</Text><Pressable disabled={busy} accessibilityRole="button" onPress={()=>void load(true)}><Text style={s.bold}>Atualizar mensagens</Text></Pressable>{data.status==='loading'?<Text>Carregando mensagens…</Text>:data.status==='error'?<Text>{!assignmentId||!tenantId?'Abra a conversa a partir de um trabalho válido.':data.forbidden?'Você não tem acesso a esta conversa.':data.missing?'Trabalho não encontrado nesta empresa.':'Não foi possível carregar mensagens. Tente atualizar.'}</Text>:data.data.length===0?<Text>Nenhuma mensagem nesta conversa.</Text>:null}<ScrollView style={s.messages} contentContainerStyle={s.messageList}>{data.status==='ready'?data.data.map(m=><View key={m.id} style={s.message}><Text>{m.body}</Text></View>):null}</ScrollView><TextInput style={s.input} editable={!busy} accessibilityLabel="Mensagem para a conversa do trabalho" placeholder="Escreva uma mensagem" value={body} onChangeText={setBody}/><Pressable style={s.button} disabled={blocked} accessibilityRole="button" accessibilityState={{disabled:blocked,busy}} onPress={()=>void send()}><Text style={s.bold}>{busy?'Enviando…':'Enviar'}</Text></Pressable>{message?<Text accessibilityLiveRegion="polite">{message}</Text>:null}</View></SafeAreaView>
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{flex:1,padding:20,gap:12},title:{fontSize:26,fontWeight:'800'},messages:{flex:1,gap:8},messageList:{gap:8},message:{borderWidth:1,borderRadius:12,padding:12},input:{borderWidth:1,borderRadius:12,padding:14},button:{borderWidth:1,borderRadius:12,padding:14,alignItems:'center'},bold:{fontWeight:'800'}});
