import {useCallback,useRef,useState} from 'react';
import {useFocusEffect,useLocalSearchParams} from 'expo-router';
import {Pressable,SafeAreaView,ScrollView,StyleSheet,Text,TextInput,View} from 'react-native';
import {authHeaders} from '../lib/session';
import {apiUrl} from '../lib/api';
import {routeId,loadMessages,sameConversationSession,sendMessage} from '../lib/conversation';
import type {Messages,Request} from '../lib/conversation';
export default function Conversa(){
 const params=useLocalSearchParams<{assignmentId?:string|string[];tenantId?:string|string[]}>();
 const assignmentId=routeId(params.assignmentId),tenantId=routeId(params.tenantId);
 const [data,setData]=useState<Messages>({status:'loading'}),[body,setBody]=useState(''),[message,setMessage]=useState(''),[busy,setBusy]=useState(false);
 const generation=useRef(0),sequence=useRef(0),pending=useRef(false),controllers=useRef(new Set<AbortController>()),snapshot=useRef<{headers:Record<string,string>;assignmentId:string;tenantId:string}|null>(null);
 function operation(){const controller=new AbortController();controllers.current.add(controller);const timer=setTimeout(()=>controller.abort(),15000);return {controller,finish:()=>{clearTimeout(timer);controllers.current.delete(controller);}};}
 function requestWith(headers:Record<string,string>,signal:AbortSignal):Request{return (path,payload)=>fetch(apiUrl(path),{method:payload?'POST':'GET',headers:{...headers,'x-tenant-id':tenantId,...(payload?{'content-type':'application/json'}:{})},...(payload?{body:JSON.stringify(payload)}:{}),signal});}
 async function load(manual=false,expected?:Record<string,string>){
  if(manual&&pending.current)return;const version=generation.current,seq=++sequence.current,op=operation();snapshot.current=null;setData({status:'loading'});
  try{const headers=await authHeaders();const result=await loadMessages((path,payload)=>{if(!assignmentId||!tenantId||!headers.Authorization||(expected&&!sameConversationSession(headers,expected)))throw Error('conversation_context_changed');return requestWith(headers,op.controller.signal)(path,payload);},assignmentId);
   if(version===generation.current&&seq===sequence.current){setData(result);snapshot.current=result.status==='ready'?{headers,assignmentId,tenantId}:null;if(manual)setMessage('');}
  }catch{if(version===generation.current&&seq===sequence.current)setData({status:'error'});}
  finally{op.finish();}
 }
 useFocusEffect(useCallback(()=>{++generation.current;setBody('');setMessage('');void load();return()=>{++generation.current;++sequence.current;for(const c of controllers.current)c.abort();controllers.current.clear();snapshot.current=null;pending.current=false;setBusy(false);setData({status:'loading'});};},[assignmentId,tenantId]));
 async function send(){
  const displayed=snapshot.current,text=body.trim();if(pending.current||!text||!displayed||displayed.assignmentId!==assignmentId||displayed.tenantId!==tenantId)return;
  pending.current=true;setBusy(true);const version=generation.current,op=operation();
  try{const headers=await authHeaders();if(version!==generation.current)return;if(!sameConversationSession(headers,displayed.headers)){setMessage('A sessão mudou. Atualize as mensagens antes de enviar.');return;}
   const result=await sendMessage(requestWith(headers,op.controller.signal),assignmentId,text);
   if(version===generation.current){setMessage(result.status==='sent'?'Mensagem enviada.':result.status==='rejected'?'Não foi possível enviar. Seu texto foi mantido.':'O envio não foi confirmado. Confira as mensagens antes de enviar novamente.');if(result.status==='sent')setBody('');await load(false,displayed.headers);}
  }catch{if(version===generation.current)setMessage('Falha de conexão. Confira as mensagens antes de enviar novamente.');}
  finally{op.finish();if(version===generation.current){pending.current=false;setBusy(false);}}
 }
 const blocked=busy||data.status!=='ready'||!assignmentId||!tenantId;
 return <SafeAreaView style={s.screen}><View style={s.content}><Text style={s.title}>Conversa do trabalho</Text><Pressable disabled={busy} accessibilityRole="button" onPress={()=>void load(true)}><Text style={s.bold}>Atualizar mensagens</Text></Pressable>{data.status==='loading'?<Text>Carregando mensagens…</Text>:data.status==='error'?<Text>{!assignmentId||!tenantId?'Abra a conversa a partir de um trabalho válido.':data.forbidden?'Você não tem acesso a esta conversa.':data.missing?'Trabalho não encontrado nesta empresa.':'Não foi possível carregar mensagens. Tente atualizar.'}</Text>:data.data.length===0?<Text>Nenhuma mensagem nesta conversa.</Text>:null}<ScrollView style={s.messages} contentContainerStyle={s.messageList}>{data.status==='ready'?data.data.map(m=><View key={m.id} style={s.message}><Text>{m.body}</Text></View>):null}</ScrollView><TextInput style={s.input} editable={!busy} accessibilityLabel="Mensagem para a conversa do trabalho" placeholder="Escreva uma mensagem" value={body} onChangeText={setBody}/><Pressable style={s.button} disabled={blocked} accessibilityRole="button" accessibilityState={{disabled:blocked,busy}} onPress={()=>void send()}><Text style={s.bold}>{busy?'Enviando…':'Enviar'}</Text></Pressable>{message?<Text accessibilityLiveRegion="polite">{message}</Text>:null}</View></SafeAreaView>
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{flex:1,padding:20,gap:12},title:{fontSize:26,fontWeight:'800'},messages:{flex:1,gap:8},messageList:{gap:8},message:{borderWidth:1,borderRadius:12,padding:12},input:{borderWidth:1,borderRadius:12,padding:14},button:{borderWidth:1,borderRadius:12,padding:14,alignItems:'center'},bold:{fontWeight:'800'}});
