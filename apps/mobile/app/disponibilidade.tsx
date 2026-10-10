import { useRef, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { ProfessionalNav } from '../components/ProfessionalNav';
import { authHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';
import { availabilityWindow } from '../lib/availability-window';

export default function Disponibilidade(){
 const[date,setDate]=useState(''),[start,setStart]=useState(''),[end,setEnd]=useState(''),[msg,setMsg]=useState(''),[saving,setSaving]=useState(false);
 const submitting=useRef(false);
 async function save(){
  if(submitting.current)return;
  const window=availabilityWindow(date,start,end);
  if(!window){setMsg('Informe data e horários válidos.');return;}
  submitting.current=true;setSaving(true);setMsg('');
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
  try{
   const h=await authHeaders();
   const r=await fetch(apiUrl('/availability/mine'),{method:'POST',headers:{...h,'content-type':'application/json'},body:JSON.stringify(window),signal:controller.signal});
   setMsg(r.ok?'Disponibilidade salva.':'Não foi possível salvar a disponibilidade. Seus dados foram mantidos.');
   if(r.ok){setDate('');setStart('');setEnd('');}
  }catch{setMsg('Falha de conexão. Seus dados foram mantidos para tentar novamente.');}
  finally{clearTimeout(timeout);submitting.current=false;setSaving(false);}
 }
 return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}>
 <Text style={s.title}>Quando posso trabalhar</Text><Text style={s.help}>Informe uma janela disponível. Se o fim for menor ou igual ao início, consideramos que termina no dia seguinte.</Text>
 <TextInput style={s.input} placeholder="Data — DD/MM/AAAA" accessibilityLabel="Data da disponibilidade" keyboardType="number-pad" editable={!saving} value={date} onChangeText={setDate}/>
 <TextInput style={s.input} placeholder="Início — HH:MM" accessibilityLabel="Horário de início da disponibilidade" keyboardType="numbers-and-punctuation" editable={!saving} value={start} onChangeText={setStart}/>
 <TextInput style={s.input} placeholder="Fim — HH:MM" accessibilityLabel="Horário de fim da disponibilidade" keyboardType="numbers-and-punctuation" editable={!saving} value={end} onChangeText={setEnd}/>
 <Pressable style={s.button} accessibilityRole="button" disabled={saving} accessibilityState={{disabled:saving,busy:saving}} onPress={()=>void save()}><Text style={s.bold}>{saving?'Salvando…':'Salvar disponibilidade'}</Text></Pressable>
 <Text accessibilityLiveRegion="polite">{msg}</Text>
 </ScrollView><ProfessionalNav/></SafeAreaView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{padding:24,gap:14,paddingBottom:24},title:{fontSize:30,fontWeight:'800'},help:{fontSize:16},input:{borderWidth:1,borderRadius:12,padding:14,fontSize:17},button:{borderWidth:1,borderRadius:12,padding:15,alignItems:'center'},bold:{fontWeight:'800'}});

