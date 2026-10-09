import { useRef, useState } from 'react';
import { router } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { authenticatedTenantHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';

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
 const submittingRef=useRef(false);
 const [submitting,setSubmitting]=useState(false);
 async function create(){
  if(submittingRef.current)return;
  const window=shiftWindow(date,startTime,endTime);
  if(!title.trim()||!workCity.trim()||!window){setMessage('Informe função, cidade, data e horários válidos.');return;}
  const payText=pay.trim();
  if(!/^\d+(?:[,.]\d{1,2})?$/.test(payText)){setMessage('Informe um valor em reais com até duas casas decimais.');return;}
  const amount=Number(payText.replace(',','.'));
  if(!Number.isFinite(amount)||amount<0||!Number.isSafeInteger(Math.round(amount*100))){setMessage('Informe um valor válido.');return;}
  submittingRef.current=true;
  setSubmitting(true);
  setMessage('');
  try {
   const headers=await authenticatedTenantHeaders();
   const r=await fetch(apiUrl('/company/jobs'),{method:'POST',headers:{...headers,'content-type':'application/json'},body:JSON.stringify({title,location,workCity,...window,payCents:Math.round(amount*100)})});
   setMessage(r.ok?'Trabalho publicado.':'Não foi possível publicar.');
   if(r.ok){setTitle('');setLocation('');setWorkCity('');setDate('');setStartTime('');setEndTime('');setPay('');}
  } catch {setMessage('Falha de conexão. Confira seus trabalhos antes de tentar novamente.');}
  finally {submittingRef.current=false;setSubmitting(false);}
 }
 return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}><Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={()=>router.back()}><Text style={s.back}>‹ Voltar</Text></Pressable><Text style={s.title}>Criar novo trabalho</Text><TextInput style={s.input} placeholder="Título do trabalho" accessibilityLabel="Título do trabalho" value={title} onChangeText={setTitle}/><TextInput style={s.input} placeholder="Cidade do trabalho" accessibilityLabel="Cidade do trabalho" value={workCity} onChangeText={setWorkCity}/><TextInput style={s.input} placeholder="Local" accessibilityLabel="Local do trabalho" value={location} onChangeText={setLocation}/><TextInput style={s.input} placeholder="Data — DD/MM/AAAA" accessibilityLabel="Data do trabalho no formato dia mês ano" keyboardType="number-pad" value={date} onChangeText={setDate}/><TextInput style={s.input} placeholder="Início — HH:MM" accessibilityLabel="Horário de início" keyboardType="numbers-and-punctuation" value={startTime} onChangeText={setStartTime}/><TextInput style={s.input} placeholder="Fim — HH:MM" accessibilityLabel="Horário de término" keyboardType="numbers-and-punctuation" value={endTime} onChangeText={setEndTime}/><Text style={s.hint}>Se o horário final for menor que o inicial, o turno termina no dia seguinte.</Text><TextInput style={s.input} placeholder="Valor do trabalho em R$" accessibilityLabel="Valor do trabalho em reais" keyboardType="decimal-pad" value={pay} onChangeText={setPay}/><Pressable style={s.button} disabled={submitting} accessibilityRole="button" accessibilityState={{disabled:submitting,busy:submitting}} onPress={()=>void create()}><Text style={s.buttonText}>{submitting?'PUBLICANDO...':'PUBLICAR TRABALHO'}</Text></Pressable><Text>{message}</Text></ScrollView></SafeAreaView>}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#FFF'},content:{padding:20,gap:13,paddingBottom:24},back:{fontSize:30,color:'#111A35'},title:{fontSize:26,fontWeight:'900',color:'#111A35'},heading:{fontSize:22,fontWeight:'800',color:'#111A35'},input:{borderWidth:1,borderColor:'#DCD8E8',backgroundColor:'#FFFFFF',borderRadius:12,padding:14,fontSize:17},hint:{fontSize:13,color:'#62616B'},button:{padding:16,backgroundColor:'#064A9B',borderRadius:14,alignItems:'center'},buttonText:{fontSize:18,fontWeight:'800',color:'#FFFFFF'}});
