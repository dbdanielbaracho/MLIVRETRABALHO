import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { ProfessionalNav } from '../components/ProfessionalNav';
import { authHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';
import { loadNotifications, type Notification } from '../lib/notifications';

export default function Notificacoes(){
 const[items,setItems]=useState<Notification[]>([]),[status,setStatus]=useState<'loading'|'error'|'ready'>('loading'),[message,setMessage]=useState(''),[pending,setPending]=useState<string[]>([]);
 const requestId=useRef(0),pendingReads=useRef(new Set<string>());
 async function load(signal?:AbortSignal){
  const id=++requestId.current;setStatus('loading');setItems([]);
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
  const abort=()=>controller.abort();signal?.addEventListener('abort',abort);
  if(signal?.aborted)controller.abort();
  const result=await loadNotifications(async()=>{const headers=await authHeaders();return fetch(apiUrl('/notifications/mine'),{headers,signal:controller.signal});});
  clearTimeout(timeout);signal?.removeEventListener('abort',abort);
  if(id!==requestId.current||signal?.aborted)return;
  setStatus(result.status);if(result.status==='ready')setItems(result.data);
 }
 useFocusEffect(useCallback(()=>{
  const controller=new AbortController();void load(controller.signal);
  return ()=>{requestId.current++;controller.abort();};
 },[]));
 async function read(n:Notification){
  const key=n.tenantId+':'+n.id;
  if(n.readAt||pendingReads.current.has(key))return;
  pendingReads.current.add(key);setPending([...pendingReads.current]);setMessage('');
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
  try{
   const headers=await authHeaders();
   const response=await fetch(apiUrl('/notifications/'+n.id+'/read'),{method:'POST',headers:{...headers,'x-tenant-id':n.tenantId},signal:controller.signal});
   if(!response.ok){setMessage('Não foi possível marcar a notificação como lida. Tente novamente.');return;}
   await load(controller.signal);
  }catch{setMessage('Falha de conexão ao marcar a notificação. Tente novamente.');}
  finally{clearTimeout(timeout);pendingReads.current.delete(key);setPending([...pendingReads.current]);}
 }
 return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}>
 <Text style={s.title}>Notificações</Text>
 {status==='loading'?<Text>Carregando notificações…</Text>:null}
 {status==='error'?<Pressable accessibilityRole="button" onPress={()=>void load()}><Text>Não foi possível carregar notificações. Toque para tentar novamente.</Text></Pressable>:null}
 {status==='ready'&&items.length===0?<Text>Nenhuma novidade por enquanto.</Text>:null}
 {items.map(n=>{const busy=pending.includes(n.tenantId+':'+n.id);return <Pressable key={n.tenantId+':'+n.id} style={s.card} accessibilityRole="button" disabled={busy||!!n.readAt} accessibilityState={{disabled:busy||!!n.readAt,busy}} onPress={()=>void read(n)}><Text style={s.heading}>{n.readAt?'':'● '}{n.title}</Text><Text>{n.body}</Text>{busy?<Text>Marcando como lida…</Text>:null}</Pressable>;})}
 {message?<Text accessibilityLiveRegion="polite">{message}</Text>:null}
 </ScrollView><ProfessionalNav/></SafeAreaView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{padding:24,gap:12,paddingBottom:24},title:{fontSize:30,fontWeight:'800'},card:{borderWidth:1,borderRadius:14,padding:16,gap:6},heading:{fontSize:18,fontWeight:'800'}});

