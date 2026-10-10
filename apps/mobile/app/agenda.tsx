import { router,useFocusEffect } from 'expo-router';
import { useCallback,useRef,useState } from 'react';
import { Pressable,SafeAreaView,ScrollView,StyleSheet,Text,View } from 'react-native';
import * as Location from 'expo-location';
import { ProfessionalNav } from '../components/ProfessionalNav';
import { authHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';
import {loadAgenda,assignmentState,submitAgendaAction,type Assignment} from '../lib/agenda';
import {assignmentSchedule,type Section} from '../lib/professional-home';
type Coordinates={lat:number;lng:number};
async function optionalCoordinates():Promise<Coordinates|null>{
 let timeout:ReturnType<typeof setTimeout>|undefined;
 try{
  const permission=await Location.requestForegroundPermissionsAsync();if(permission.status!=='granted')return null;
  const current=await Promise.race([Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Balanced}),new Promise<null>(resolve=>{timeout=setTimeout(()=>resolve(null),15000);})]);
  return current?{lat:current.coords.latitude,lng:current.coords.longitude}:null;
 }catch{return null;}
 finally{if(timeout)clearTimeout(timeout);}
}
export default function Agenda(){
 const[data,setData]=useState<Section<Assignment[]>>({status:'loading'}),[message,setMessage]=useState('');
 const requestId=useRef(0),epoch=useRef(0),displayedAuthorization=useRef<string|null>(null),controllers=useRef(new Set<AbortController>()),pendingActions=useRef(new Set<string>()),[pending,setPending]=useState<string[]>([]);
 function operation(){const controller=new AbortController();controllers.current.add(controller);const timer=setTimeout(()=>controller.abort(),15000);return {controller,finish:()=>{clearTimeout(timer);controllers.current.delete(controller);}};}
 const load=useCallback(async()=>{
  const id=++requestId.current,version=epoch.current,op=operation();displayedAuthorization.current=null;setData({status:'loading'});
  try{
   const headers=await authHeaders();if(version!==epoch.current||id!==requestId.current||op.controller.signal.aborted)return;
   if(!headers.Authorization)throw Error('session_missing');
   const next=await loadAgenda(()=>fetch(apiUrl('/assignments/mine'),{headers,signal:op.controller.signal}),()=>id===requestId.current&&version===epoch.current&&!op.controller.signal.aborted),current=await authHeaders();
   if(id===requestId.current&&version===epoch.current){if(current.Authorization!==headers.Authorization){setData({status:'error'});setMessage('A sessão mudou. Atualize seus trabalhos.');return;}if(op.controller.signal.aborted){setData({status:'error'});return;}setData(next);displayedAuthorization.current=next.status==='ready'?headers.Authorization:null;}
  }catch{if(id===requestId.current&&version===epoch.current)setData({status:'error'});}
  finally{op.finish();}
 },[]);
 useFocusEffect(useCallback(()=>{++epoch.current;setMessage('');void load();return()=>{++epoch.current;++requestId.current;for(const c of controllers.current)c.abort();controllers.current.clear();displayedAuthorization.current=null;pendingActions.current.clear();setPending([]);setData({status:'loading'});};},[load]));
 async function action(assignment:Assignment,score?:number){
  const key=assignment.tenantId+':'+assignment.id,state=assignmentState(assignment.status),authorization=displayedAuthorization.current,version=epoch.current;
  const endpoint=score!=null?(state.canRate?'company-rating':null):state.endpoint;
  if(!endpoint||!authorization||pendingActions.current.has(key)||data.status!=='ready'||!data.data.some(item=>item.id===assignment.id&&item.tenantId===assignment.tenantId&&item.status===assignment.status))return;
  pendingActions.current.add(key);setPending([...pendingActions.current]);setMessage('');
  const op=operation();
  try{
   const before=await authHeaders();if(version!==epoch.current||op.controller.signal.aborted)return;
   if(before.Authorization!==authorization){setMessage('A sessão mudou. Atualize seus trabalhos antes de agir.');return;}
   const coordinates=endpoint==='check-in'||endpoint==='check-out'?await optionalCoordinates():null;
   const headers=await authHeaders();if(version!==epoch.current)return;if(op.controller.signal.aborted){setMessage('Não foi possível enviar a atualização a tempo. Atualize os trabalhos antes de tentar novamente.');return;}
   if(headers.Authorization!==authorization){setMessage('A sessão mudou. Atualize seus trabalhos antes de agir.');return;}
   const result=await submitAgendaAction(async(path,body)=>fetch(apiUrl(path),{method:'POST',headers:{...headers,'x-tenant-id':assignment.tenantId,...(body!==undefined?{'content-type':'application/json'}:{})},...(body!==undefined?{body:JSON.stringify(body)}:{}),signal:op.controller.signal}),assignment,score,coordinates,()=>version===epoch.current&&!op.controller.signal.aborted);
   const current=await authHeaders();if(version!==epoch.current)return;
   if(current.Authorization!==authorization){setMessage('A sessão mudou. Atualize para conferir o resultado.');return;}
   if(op.controller.signal.aborted){setMessage('Não foi possível confirmar o resultado. Atualize os trabalhos antes de tentar novamente.');return;}
   if(result.status!=='confirmed'){setMessage(result.status==='rejected'?'A atualização não foi aceita. Atualize os trabalhos antes de tentar novamente.':'Não foi possível confirmar o resultado. Atualize os trabalhos antes de tentar novamente.');return;}
   if(result.endpoint==='check-in')setMessage(result.coordinatesSent?'Check-in confirmado. Localização enviada.':'Check-in confirmado. Localização não foi compartilhada.');
   else if(result.endpoint==='check-out')setMessage(result.coordinatesSent?'Check-out confirmado. Localização enviada.':'Check-out confirmado. Localização não foi compartilhada.');
   else setMessage(score!=null?'Avaliação da empresa salva.':'Status atualizado.');
   await load();
  }catch{if(version===epoch.current)setMessage('Não foi possível confirmar o resultado. Atualize os trabalhos antes de tentar novamente.');}
  finally{op.finish();if(version===epoch.current){pendingActions.current.delete(key);setPending([...pendingActions.current]);}}
 }
 async function openAssignment(assignment:Assignment,pathname:'/conversa'|'/seguranca'){
  const authorization=displayedAuthorization.current,version=epoch.current;if(!authorization)return;
  const current=await authHeaders();if(version!==epoch.current)return;if(current.Authorization!==authorization){setMessage('A sessão mudou. Atualize seus trabalhos.');return;}
  router.push({pathname,params:{assignmentId:assignment.id,tenantId:assignment.tenantId}});
 }
 const items=data.status==='ready'?data.data:[];
 return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}><Text style={s.title}>Meus trabalhos</Text>
 {data.status==='loading'?<Text style={s.empty}>Carregando seus trabalhos…</Text>:null}
 {data.status==='error'?<Pressable accessibilityRole="button" onPress={()=>void load()}><Text style={s.message}>Não foi possível carregar seus trabalhos. Toque para tentar novamente.</Text></Pressable>:null}
 {data.status==='ready'&&items.length===0?<Text style={s.empty}>Quando uma oportunidade for confirmada, ela aparecerá aqui.</Text>:null}
 {items.map(assignment=>{const state=assignmentState(assignment.status),busy=pending.includes(assignment.tenantId+':'+assignment.id);return <View key={assignment.tenantId+':'+assignment.id} style={s.card}>
 <Text style={s.role}>{assignment.title}</Text><Text style={s.meta}>{assignment.location??'Local a confirmar'}</Text><Text style={s.meta}>{assignmentSchedule(assignment)}</Text>
 <View style={s.confirmed}><Text style={s.confirmedText}>{state.label}</Text></View>
 <View style={s.steps}><Text style={s.step}>Confirmado</Text><Text style={s.step}>Check-in</Text><Text style={s.step}>Em andamento</Text><Text style={s.step}>Check-out</Text><Text style={s.step}>Concluído</Text></View>
 {state.action?<Pressable style={s.primaryButton} accessibilityRole="button" disabled={busy} accessibilityState={{disabled:busy,busy}} onPress={()=>void action(assignment)}><Text style={s.primaryAction}>{busy?'Atualizando…':state.action}</Text></Pressable>:null}
 {state.canRate?<View style={s.ratingBlock}><Text style={s.ratingTitle}>{assignment.companyRatingScore?'Sua avaliação da empresa: '+assignment.companyRatingScore+' ★':'Avalie a empresa'}</Text><View style={s.ratingRow}>{[1,2,3,4,5].map(score=><Pressable key={score} style={s.ratingButton} accessibilityRole="button" disabled={busy} accessibilityState={{disabled:busy,busy}} onPress={()=>void action(assignment,score)}><Text style={s.ratingText}>{score} ★</Text></Pressable>)}</View></View>:null}
 <View style={s.secondaryRow}><Pressable accessibilityRole="button" onPress={()=>void openAssignment(assignment,'/conversa')}><Text style={s.secondaryAction}>Conversar</Text></Pressable><Pressable accessibilityRole="button" onPress={()=>void openAssignment(assignment,'/seguranca')}><Text style={s.secondaryAction}>Segurança</Text></Pressable></View>
 </View>;})}
 {message?<View><Text style={s.message} accessibilityLiveRegion="polite">{message}</Text><Pressable accessibilityRole="button" onPress={()=>void load()}><Text style={s.secondaryAction}>Atualizar trabalhos</Text></Pressable></View>:null}
 </ScrollView><ProfessionalNav/></SafeAreaView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#FFF'},content:{padding:20,gap:14,paddingBottom:24},eyebrow:{fontSize:13,fontWeight:'800',color:'#651FFF'},title:{fontSize:27,fontWeight:'900',color:'#111A35'},empty:{fontSize:17,color:'#62616B'},card:{padding:20,borderWidth:1,borderColor:'#E9E6F2',backgroundColor:'#FFFFFF',borderRadius:18,gap:12},role:{fontSize:21,fontWeight:'900',color:'#111A35'},meta:{fontSize:16,color:'#62616B'},status:{fontSize:15,fontWeight:'700',color:'#651FFF'},confirmed:{alignSelf:'flex-start',backgroundColor:'#E9F8EF',borderRadius:20,paddingVertical:7,paddingHorizontal:11},confirmedText:{fontSize:12,fontWeight:'800',color:'#218A4B'},steps:{flexDirection:'row',justifyContent:'space-between',gap:4,paddingVertical:8},step:{flex:1,fontSize:9,textAlign:'center',fontWeight:'700',color:'#68748A'},primaryButton:{backgroundColor:'#651FFF',borderRadius:12,padding:14,marginTop:4},primaryAction:{fontSize:18,fontWeight:'800',color:'#FFFFFF',textAlign:'center'},secondaryRow:{flexDirection:'row',flexWrap:'wrap',gap:18,marginTop:4},secondaryAction:{fontSize:15,fontWeight:'800',color:'#651FFF'},message:{color:'#62616B'},ratingBlock:{gap:8,marginTop:4},ratingTitle:{fontSize:16,fontWeight:'800',color:'#20202A'},ratingRow:{flexDirection:'row',flexWrap:'wrap',gap:8},ratingButton:{borderWidth:1,borderColor:'#D8CFFF',backgroundColor:'#F0EBFF',borderRadius:10,paddingVertical:8,paddingHorizontal:10},ratingText:{fontWeight:'800',color:'#651FFF'}});
