import {useCallback,useRef,useState} from 'react';
import {router,useFocusEffect} from 'expo-router';
import {submitAvailability} from '../lib/availability-submit';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { ProfessionalNav } from '../components/ProfessionalNav';
import { authHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';
import { availabilityWindow } from '../lib/availability-window';

export default function Disponibilidade(){
 const[date,setDate]=useState(''),[start,setStart]=useState(''),[end,setEnd]=useState(''),[msg,setMsg]=useState(''),[saving,setSaving]=useState(false);
 const submitting=useRef(false),epoch=useRef(0),controllerRef=useRef<AbortController|null>(null);
 const[profileRequired,setProfileRequired]=useState(false),[uncertain,setUncertain]=useState(false);
 useFocusEffect(useCallback(()=>{++epoch.current;return()=>{++epoch.current;controllerRef.current?.abort();submitting.current=false;setSaving(false);};},[]));
 async function save(){
  if(submitting.current)return;
  const window=availabilityWindow(date,start,end);
  if(!window){setMsg('Informe data e horários válidos.');return;}
  submitting.current=true;setSaving(true);setMsg('');
  const generation=epoch.current,controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);controllerRef.current=controller;setProfileRequired(false);setUncertain(false);
  try{
   const h=await authHeaders();if(generation!==epoch.current||controller.signal.aborted)return;
   if(!h.Authorization){setMsg('Entre na sua conta antes de salvar a disponibilidade.');return;}
   const result=await submitAvailability((path,body)=>fetch(apiUrl(path),{method:'POST',headers:{...h,'content-type':'application/json'},body:JSON.stringify(body),signal:controller.signal}),window);
   const current=await authHeaders();if(generation!==epoch.current)return;
   if(current.Authorization!==h.Authorization){setMsg('A sessão mudou. Confira a conta antes de salvar. Seu rascunho foi mantido.');return;}
   if(result.status==='saved'){setMsg('Disponibilidade salva.');setDate('');setStart('');setEnd('');}
   else if(result.status==='invalid')setMsg('Informe data e horários válidos.');
   else if(result.status==='rejected'){setProfileRequired(result.profileRequired);setMsg(result.profileRequired?'Complete seus dados no Perfil antes de salvar disponibilidade.':'Não foi possível salvar a disponibilidade. Seus dados foram mantidos.');}
   else{setUncertain(true);setMsg('Não foi possível confirmar o salvamento. Confira sua disponibilidade no Início ou tente novamente. Seu rascunho foi mantido.');}
  }catch{if(generation===epoch.current){setUncertain(true);setMsg('Não foi possível confirmar o salvamento. Seu rascunho foi mantido.');}}
  finally{clearTimeout(timeout);if(generation===epoch.current){submitting.current=false;setSaving(false);}}

 }
 return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}>
 <Text style={s.title}>Quando posso trabalhar</Text><Text style={s.help}>Informe uma janela disponível. Se o fim for menor ou igual ao início, consideramos que termina no dia seguinte.</Text>
 <TextInput style={s.input} placeholder="Data — DD/MM/AAAA" accessibilityLabel="Data da disponibilidade" keyboardType="number-pad" editable={!saving} value={date} onChangeText={setDate}/>
 <TextInput style={s.input} placeholder="Início — HH:MM" accessibilityLabel="Horário de início da disponibilidade" keyboardType="numbers-and-punctuation" editable={!saving} value={start} onChangeText={setStart}/>
 <TextInput style={s.input} placeholder="Fim — HH:MM" accessibilityLabel="Horário de fim da disponibilidade" keyboardType="numbers-and-punctuation" editable={!saving} value={end} onChangeText={setEnd}/>
 <Pressable style={s.button} accessibilityRole="button" disabled={saving} accessibilityState={{disabled:saving,busy:saving}} onPress={()=>void save()}><Text style={s.bold}>{saving?'Salvando…':'Salvar disponibilidade'}</Text></Pressable>
 <Text accessibilityLiveRegion="polite">{msg}</Text>
 {profileRequired?<Pressable accessibilityRole="button" onPress={()=>router.push('/perfil')}><Text style={s.bold}>Completar meus dados</Text></Pressable>:null}
 {uncertain?<Pressable accessibilityRole="button" onPress={()=>router.push('/profissional-inicio')}><Text style={s.bold}>Conferir disponibilidade no Início</Text></Pressable>:null}
 </ScrollView><ProfessionalNav/></SafeAreaView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{padding:24,gap:14,paddingBottom:24},title:{fontSize:30,fontWeight:'800'},help:{fontSize:16},input:{borderWidth:1,borderRadius:12,padding:14,fontSize:17},button:{borderWidth:1,borderRadius:12,padding:15,alignItems:'center'},bold:{fontWeight:'800'}});


