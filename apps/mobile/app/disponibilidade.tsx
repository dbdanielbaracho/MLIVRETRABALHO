import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ProfessionalNav } from '../components/ProfessionalNav';
import { authHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';

function availabilityWindow(dateText:string,startText:string,endText:string){
  const date=dateText.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  const start=startText.trim().match(/^(\d{2}):(\d{2})$/);
  const end=endText.trim().match(/^(\d{2}):(\d{2})$/);
  if(!date||!start||!end)return null;
  const day=Number(date[1]),month=Number(date[2]),year=Number(date[3]);
  const sh=Number(start[1]),sm=Number(start[2]),eh=Number(end[1]),em=Number(end[2]);
  if(month<1||month>12||day<1||day>31||sh>23||eh>23||sm>59||em>59)return null;
  const startsAt=new Date(year,month-1,day,sh,sm,0,0);
  if(startsAt.getFullYear()!==year||startsAt.getMonth()!==month-1||startsAt.getDate()!==day)return null;
  const endsAt=new Date(year,month-1,day,eh,em,0,0);
  if(endsAt<=startsAt)endsAt.setDate(endsAt.getDate()+1);
  return {startsAt:startsAt.toISOString(),endsAt:endsAt.toISOString()};
}

export default function Disponibilidade(){
  const[date,setDate]=useState(''),[start,setStart]=useState(''),[end,setEnd]=useState(''),[msg,setMsg]=useState('');
  async function save(){
    const window=availabilityWindow(date,start,end);
    if(!window){setMsg('Informe data e horários válidos.');return;}
    const h=await authHeaders();
    const r=await fetch(apiUrl('/availability/mine'),{method:'POST',headers:{...h,'content-type':'application/json'},body:JSON.stringify(window)});
    setMsg(r.ok?'Disponibilidade salva.':'Não foi possível salvar a disponibilidade.');
    if(r.ok){setDate('');setStart('');setEnd('');}
  }
  return <SafeAreaView style={s.screen}><View style={s.content}><ProfessionalNav/><Text style={s.title}>Quando posso trabalhar</Text><Text style={s.help}>Informe uma janela disponível. Se o fim for menor que o início, consideramos que termina no dia seguinte.</Text><TextInput style={s.input} placeholder="Data — DD/MM/AAAA" keyboardType="number-pad" value={date} onChangeText={setDate}/><TextInput style={s.input} placeholder="Início — HH:MM" keyboardType="numbers-and-punctuation" value={start} onChangeText={setStart}/><TextInput style={s.input} placeholder="Fim — HH:MM" keyboardType="numbers-and-punctuation" value={end} onChangeText={setEnd}/><Pressable style={s.button} onPress={()=>void save()}><Text style={s.bold}>Salvar disponibilidade</Text></Pressable><Text>{msg}</Text></View></SafeAreaView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{padding:24,gap:14},title:{fontSize:30,fontWeight:'800'},help:{fontSize:16},input:{borderWidth:1,borderRadius:12,padding:14,fontSize:17},button:{borderWidth:1,borderRadius:12,padding:15,alignItems:'center'},bold:{fontWeight:'800'}});
