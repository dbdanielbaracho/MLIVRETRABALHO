import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { CompanyNav } from './CompanyNav';
import { ProfessionalNav } from './ProfessionalNav';
import { authenticatedTenantHeaders, authHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';
import { runForSession } from '../lib/session-context';
import { loadNotifications,markNotificationRead,notificationContextHeaders,type Notification } from '../lib/notifications';

export function NotificationsScreen({company=false}:{company?:boolean}){
 const[items,setItems]=useState<Notification[]>([]),[status,setStatus]=useState<'loading'|'error'|'ready'>('loading'),[message,setMessage]=useState(''),[pending,setPending]=useState<string[]>([]);
 const requestId=useRef(0),epoch=useRef(0),sourceHeaders=useRef<Record<string,string>|null>(null),controllers=useRef(new Set<AbortController>()),pendingReads=useRef(new Map<string,object>());
 function operation(onDeadline?:()=>void){const controller=new AbortController();controllers.current.add(controller);const timer=setTimeout(()=>{controller.abort();onDeadline?.();},15000);return {controller,finish:()=>{clearTimeout(timer);controllers.current.delete(controller);}};}
 async function load(){
  const id=++requestId.current,version=epoch.current,op=operation(()=>{if(id===requestId.current&&version===epoch.current){sourceHeaders.current=null;setItems([]);setStatus('error');}});setStatus('loading');setItems([]);sourceHeaders.current=null;
  let loadedHeaders:Record<string,string>|null=null;
  try{
   const result=await runForSession(notificationContextHeaders(company?authenticatedTenantHeaders:authHeaders,company),headers=>{loadedHeaders=headers;return loadNotifications(()=>fetch(apiUrl('/notifications/mine'),{headers,signal:op.controller.signal}),company?headers['x-tenant-id']:undefined);},()=>id===requestId.current&&version===epoch.current&&!op.controller.signal.aborted);
   if(id!==requestId.current||version!==epoch.current||op.controller.signal.aborted)return;
   if(result.status==='ready'){setStatus(result.data.status);if(result.data.status==='ready'){sourceHeaders.current=loadedHeaders;setItems(result.data.data);}}
   else setStatus('error');
  }finally{op.finish();}
 }
 useFocusEffect(useCallback(()=>{
  ++epoch.current;setMessage('');void load();
  return ()=>{++epoch.current;++requestId.current;for(const c of controllers.current)c.abort();controllers.current.clear();sourceHeaders.current=null;pendingReads.current.clear();setPending([]);setItems([]);setStatus('loading');};
 },[company]));
 async function read(n:Notification){
  const key=n.tenantId+':'+n.id,original=sourceHeaders.current,version=epoch.current;
  if(n.readAt||pendingReads.current.has(key)||!original||status!=='ready'||!items.some(item=>item.id===n.id&&item.tenantId===n.tenantId)||(company&&original['x-tenant-id']!==n.tenantId))return;
  const owner={};pendingReads.current.set(key,owner);setPending([...pendingReads.current.keys()]);setMessage('');
  const owns=()=>version===epoch.current&&pendingReads.current.get(key)===owner;
  const releasePending=()=>{if(owns()){pendingReads.current.delete(key);setPending([...pendingReads.current.keys()]);}};
  const op=operation(()=>{
   op.finish();
   if(!owns())return;
   releasePending();
   if(sourceHeaders.current!==original)return;
   sourceHeaders.current=null;setItems([]);setStatus('error');setMessage('Não foi possível confirmar a leitura. Atualize as notificações para conferir.');
  });
  try{
   const result=await runForSession(notificationContextHeaders(company?authenticatedTenantHeaders:authHeaders,company,company?n.tenantId:undefined),headers=>markNotificationRead((path,tenantId)=>fetch(apiUrl(path),{method:'POST',headers:{...headers,'x-tenant-id':tenantId},signal:op.controller.signal}),n),()=>owns()&&!op.controller.signal.aborted,original.Authorization);
   if(!owns()||op.controller.signal.aborted||sourceHeaders.current!==original)return;
   if(result.status!=='ready'){sourceHeaders.current=null;setItems([]);setStatus('error');setMessage('A sessão, empresa ou conexão mudou. Atualize as notificações para conferir.');return;}
   if(result.data.status==='confirmed'){setMessage('Notificação marcada como lida.');await load();}
   else setMessage(result.data.status==='rejected'?'A atualização não foi aceita. Atualize as notificações.':'Não foi possível confirmar a leitura. Atualize as notificações para conferir.');
  }finally{op.finish();releasePending();}
 }
 return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}>
 <Text style={s.title}>Notificações</Text>
 {status==='loading'?<Text>Carregando notificações…</Text>:null}
 <Pressable accessibilityRole="button" disabled={pending.length>0||status==='loading'} onPress={()=>{setMessage('');void load();}}><Text>{status==='error'?'Não foi possível carregar notificações. Toque para tentar novamente.':'Atualizar notificações'}</Text></Pressable>
 {status==='ready'&&items.length===0?<Text>Nenhuma novidade por enquanto.</Text>:null}
 {items.map(n=>{const busy=pending.includes(n.tenantId+':'+n.id);return <Pressable key={n.tenantId+':'+n.id} style={s.card} accessibilityRole="button" disabled={busy||!!n.readAt} accessibilityState={{disabled:busy||!!n.readAt,busy}} onPress={()=>void read(n)}><Text style={s.heading}>{n.readAt?'':'● '}{n.title}</Text><Text>{n.body}</Text>{busy?<Text>Marcando como lida…</Text>:null}</Pressable>;})}
 {message?<Text accessibilityLiveRegion="polite">{message}</Text>:null}
 </ScrollView>{company?<CompanyNav/>:<ProfessionalNav/>}</SafeAreaView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{padding:24,gap:12,paddingBottom:24},title:{fontSize:30,fontWeight:'800'},card:{borderWidth:1,borderRadius:14,padding:16,gap:6},heading:{fontSize:18,fontWeight:'800'}});

