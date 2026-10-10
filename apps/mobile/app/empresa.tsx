import { useCallback, useRef, useState } from 'react';
import { router,useFocusEffect } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { authenticatedTenantHeaders } from '../lib/session';
import { CompanyNav } from '../components/CompanyNav';
import { apiUrl } from '../lib/api';
import { publishJob } from '../lib/company-job-publication';
import {runForSession} from '../lib/session-context';
import {sameCompanyContext} from '../lib/company-dashboard-actions';

function shiftWindow(dateText:string,startText:string,endText:string){
 const dateMatch=dateText.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/),startMatch=startText.trim().match(/^(\d{2}):(\d{2})$/),endMatch=endText.trim().match(/^(\d{2}):(\d{2})$/);
 if(!dateMatch||!startMatch||!endMatch)return null;
 const day=Number(dateMatch[1]),month=Number(dateMatch[2]),year=Number(dateMatch[3]);
 const startHour=Number(startMatch[1]),startMinute=Number(startMatch[2]),endHour=Number(endMatch[1]),endMinute=Number(endMatch[2]);
 if(month<1||month>12||day<1||day>31||startHour>23||endHour>23||startMinute>59||endMinute>59)return null;
 const starts=new Date(year,month-1,day,startHour,startMinute,0,0);
 if(starts.getFullYear()!==year||starts.getMonth()!==month-1||starts.getDate()!==day)return null;
 const ends=new Date(year,month-1,day,endHour,endMinute,0,0);
 if(ends<=starts)ends.setDate(ends.getDate()+1);
 return {startsAt:starts.toISOString(),endsAt:ends.toISOString()};
}

export default function Empresa(){
 const [title,setTitle]=useState(''),[location,setLocation]=useState(''),[workCity,setWorkCity]=useState(''),[date,setDate]=useState(''),[startTime,setStartTime]=useState(''),[endTime,setEndTime]=useState(''),[pay,setPay]=useState(''),[message,setMessage]=useState('');
 const submittingRef=useRef(false),generation=useRef(0),contextRequest=useRef(0),active=useRef(false),controllers=useRef(new Set<AbortController>()),context=useRef<Record<string,string>|null>(null),draftContext=useRef<Record<string,string>|null>(null),uncertain=useRef(false);
 const [contextReady,setContextReady]=useState(false);
 const [submitting,setSubmitting]=useState(false);
 function clearDraft(){setTitle('');setLocation('');setWorkCity('');setDate('');setStartTime('');setEndTime('');setPay('');}
 async function loadContext(){
  const version=generation.current,seq=++contextRequest.current;context.current=null;setContextReady(false);
  const headers=await authenticatedTenantHeaders();if(!active.current||version!==generation.current||seq!==contextRequest.current)return;
  if(!sameCompanyContext(headers,headers)){setMessage('Não foi possível identificar a empresa ativa. Atualize antes de publicar.');return;}
  if(draftContext.current&&!sameCompanyContext(headers,draftContext.current)){clearDraft();uncertain.current=false;}
  draftContext.current={...headers};context.current={...headers};setContextReady(true);setMessage(uncertain.current?'Publicação anterior sem confirmação. Confira o Planejamento antes de tentar novamente.':'');
 }
 useFocusEffect(useCallback(()=>{active.current=true;++generation.current;void loadContext();return()=>{active.current=false;++generation.current;++contextRequest.current;for(const c of controllers.current)c.abort();controllers.current.clear();context.current=null;setContextReady(false);submittingRef.current=false;setSubmitting(false);};},[]));
 async function create(){
  const displayed=context.current,version=generation.current;
  if(submittingRef.current||!contextReady||!displayed||!active.current)return;
  const window=shiftWindow(date,startTime,endTime);
  if(!title.trim()||!workCity.trim()||!window){setMessage('Informe função, cidade, data e horários válidos.');return;}
  const payText=pay.trim();
  if(!/^\d+(?:[,.]\d{1,2})?$/.test(payText)){setMessage('Informe um valor em reais com até duas casas decimais.');return;}
  const amount=Number(payText.replace(',','.'));
  if(!Number.isFinite(amount)||amount<0||!Number.isSafeInteger(Math.round(amount*100))){setMessage('Informe um valor válido.');return;}
  submittingRef.current=true;
  setSubmitting(true);
  setMessage('');
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);controllers.current.add(controller);
  try {
   const body={title,location,workCity,...window,payCents:Math.round(amount*100)};
   const result=await runForSession(authenticatedTenantHeaders,headers=>{uncertain.current=true;return publishJob(payload=>fetch(apiUrl('/company/jobs'),{method:'POST',headers:{...headers,'content-type':'application/json'},body:JSON.stringify(payload),signal:controller.signal}),body);},()=>active.current&&version===generation.current&&!controller.signal.aborted,displayed.Authorization,displayed['x-tenant-id']);
   if(!active.current||version!==generation.current)return;
   if(result.status!=='ready'){context.current=null;setContextReady(false);setMessage('A publicação não foi confirmada na empresa ou sessão atual. Atualize a empresa e confira o Planejamento antes de tentar novamente.');return;}
   setMessage(result.data.status==='created'?'Trabalho publicado.':result.data.status==='rejected'?'Não foi possível publicar. Seus dados foram mantidos.':'O resultado da publicação não foi confirmado. Confira seus trabalhos no Planejamento antes de tentar novamente.');
   uncertain.current=result.data.status==='unknown';if(result.data.status==='created')clearDraft();
  } finally {clearTimeout(timer);controllers.current.delete(controller);if(version===generation.current){submittingRef.current=false;setSubmitting(false);}}

 }
 return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}><Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={()=>router.back()}><Text style={s.back}>‹ Voltar</Text></Pressable><Text style={s.title}>Criar novo trabalho</Text>{!contextReady?<Pressable accessibilityRole="button" disabled={submitting} onPress={()=>void loadContext()}><Text style={s.hint}>Atualizar empresa ativa</Text></Pressable>:null}<TextInput style={s.input} editable={!submitting&&contextReady} placeholder="Título do trabalho" accessibilityLabel="Título do trabalho" value={title} onChangeText={setTitle}/><TextInput style={s.input} editable={!submitting&&contextReady} placeholder="Cidade do trabalho" accessibilityLabel="Cidade do trabalho" value={workCity} onChangeText={setWorkCity}/><TextInput style={s.input} editable={!submitting&&contextReady} placeholder="Local" accessibilityLabel="Local do trabalho" value={location} onChangeText={setLocation}/><TextInput style={s.input} editable={!submitting&&contextReady} placeholder="Data — DD/MM/AAAA" accessibilityLabel="Data do trabalho no formato dia mês ano" keyboardType="number-pad" value={date} onChangeText={setDate}/><TextInput style={s.input} editable={!submitting&&contextReady} placeholder="Início — HH:MM" accessibilityLabel="Horário de início" keyboardType="numbers-and-punctuation" value={startTime} onChangeText={setStartTime}/><TextInput style={s.input} editable={!submitting&&contextReady} placeholder="Fim — HH:MM" accessibilityLabel="Horário de término" keyboardType="numbers-and-punctuation" value={endTime} onChangeText={setEndTime}/><Text style={s.hint}>Se o horário final for menor ou igual ao inicial, o turno termina no dia seguinte.</Text><TextInput style={s.input} editable={!submitting&&contextReady} placeholder="Valor do trabalho em R$" accessibilityLabel="Valor do trabalho em reais" keyboardType="decimal-pad" value={pay} onChangeText={setPay}/><Pressable style={s.button} disabled={submitting||!contextReady} accessibilityRole="button" accessibilityState={{disabled:submitting||!contextReady,busy:submitting}} onPress={()=>void create()}><Text style={s.buttonText}>{submitting?'PUBLICANDO...':'PUBLICAR TRABALHO'}</Text></Pressable><Text accessibilityLiveRegion="polite">{message}</Text><Pressable accessibilityRole="button" disabled={submitting} onPress={()=>router.push('/planejamento')}><Text style={s.hint}>Conferir trabalhos no Planejamento</Text></Pressable></ScrollView><CompanyNav/></SafeAreaView>}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#FFF'},content:{padding:20,gap:13,paddingBottom:24},back:{fontSize:30,color:'#111A35'},title:{fontSize:26,fontWeight:'900',color:'#111A35'},heading:{fontSize:22,fontWeight:'800',color:'#111A35'},input:{borderWidth:1,borderColor:'#DCD8E8',backgroundColor:'#FFFFFF',borderRadius:12,padding:14,fontSize:17},hint:{fontSize:13,color:'#62616B'},button:{padding:16,backgroundColor:'#651FFF',borderRadius:14,alignItems:'center'},buttonText:{fontSize:18,fontWeight:'800',color:'#FFFFFF'}});
