import { useState } from 'react';
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
 async function create(){
  const window=shiftWindow(date,startTime,endTime);
  if(!title.trim()||!workCity.trim()||!window){setMessage('Informe função, cidade, data e horários válidos.');return;}
  const amount=Number(pay.replace(',','.'));
  if(!Number.isFinite(amount)||amount<0){setMessage('Informe um valor válido.');return;}
  const headers=await authenticatedTenantHeaders();
  const r=await fetch(apiUrl('/company/jobs'),{method:'POST',headers:{...headers,'content-type':'application/json'},body:JSON.stringify({title,location,workCity,...window,payCents:Math.round(amount*100)})});
  setMessage(r.ok?'Trabalho publicado.':'Não foi possível publicar.');
  if(r.ok){setTitle('');setLocation('');setWorkCity('');setDate('');setStartTime('');setEndTime('');setPay('');}
 }
 return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}><Text style={s.title}>Publicar trabalho</Text><TextInput style={s.input} placeholder="Função ou trabalho" value={title} onChangeText={setTitle}/><TextInput style={s.input} placeholder="Cidade do trabalho" value={workCity} onChangeText={setWorkCity}/><TextInput style={s.input} placeholder="Local / endereço (opcional)" value={location} onChangeText={setLocation}/><TextInput style={s.input} placeholder="Data — DD/MM/AAAA" keyboardType="number-pad" value={date} onChangeText={setDate}/><TextInput style={s.input} placeholder="Início — HH:MM" keyboardType="numbers-and-punctuation" value={startTime} onChangeText={setStartTime}/><TextInput style={s.input} placeholder="Fim — HH:MM" keyboardType="numbers-and-punctuation" value={endTime} onChangeText={setEndTime}/><Text style={s.hint}>Se o horário final for menor que o inicial, o turno termina no dia seguinte.</Text><TextInput style={s.input} placeholder="Valor em R$" keyboardType="decimal-pad" value={pay} onChangeText={setPay}/><Pressable style={s.button} onPress={()=>void create()}><Text style={s.buttonText}>Publicar</Text></Pressable><Text>{message}</Text></ScrollView></SafeAreaView>}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{padding:24,gap:14},title:{fontSize:30,fontWeight:'800'},input:{borderWidth:1,borderRadius:12,padding:14,fontSize:17},hint:{fontSize:13},button:{padding:16,borderWidth:1,borderRadius:14,alignItems:'center'},buttonText:{fontSize:18,fontWeight:'800'}});
