import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { ProfessionalNav } from '../components/ProfessionalNav';
import { authHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';

type Assignment = { id:string; tenantId:string; status:string; title:string; location?:string; startsAt?:string; payCents?:number; companyRatingScore?:number|null };
type Coordinates = { lat:number; lng:number };

async function optionalCoordinates():Promise<Coordinates|null>{
  try{
    const permission=await Location.requestForegroundPermissionsAsync();
    if(permission.status!=='granted')return null;
    const current=await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Balanced});
    return {lat:current.coords.latitude,lng:current.coords.longitude};
  }catch{return null;}
}

export default function Agenda(){
  const[items,setItems]=useState<Assignment[]>([]),[message,setMessage]=useState('');
  useEffect(()=>{void load();},[]);
  async function load(){const headers=await authHeaders();const response=await fetch(apiUrl('/assignments/mine'),{headers});if(response.ok)setItems(await response.json());else setMessage('Quando uma empresa confirmar você, sua agenda aparecerá aqui.');}
  async function action(assignment:Assignment){
    const endpoint=assignment.status==='confirmed'?'check-in':assignment.status==='checked_in'?'start':assignment.status==='in_progress'?'check-out':assignment.status==='checked_out'?'complete':null;
    if(!endpoint)return;
    const headers=await authHeaders();
    const wantsLocation=endpoint==='check-in'||endpoint==='check-out';
    const coordinates=wantsLocation?await optionalCoordinates():null;
    const response=await fetch(apiUrl(`/assignments/${assignment.id}/${endpoint}`),{method:'POST',headers:{...headers,'x-tenant-id':assignment.tenantId,...(wantsLocation?{'content-type':'application/json'}:{})},...(wantsLocation?{body:JSON.stringify(coordinates??{})}:{})});
    if(!response.ok){setMessage('Não foi possível atualizar agora.');return;}
    if(endpoint==='check-in')setMessage(coordinates?'Check-in realizado com localização.':'Check-in realizado. Localização não foi compartilhada.');
    else if(endpoint==='check-out')setMessage(coordinates?'Check-out realizado com localização.':'Check-out realizado. Localização não foi compartilhada.');
    else setMessage('Status atualizado.');
    await load();
  }
  async function rateCompany(assignment:Assignment,score:number){
    const headers=await authHeaders();
    const response=await fetch(apiUrl(`/assignments/${assignment.id}/company-rating`),{method:'POST',headers:{...headers,'x-tenant-id':assignment.tenantId,'content-type':'application/json'},body:JSON.stringify({score})});
    setMessage(response.ok?'Avaliação da empresa salva.':'Não foi possível salvar sua avaliação.');
    if(response.ok)await load();
  }
  return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}><ProfessionalNav/><Text style={s.eyebrow}>PRÓXIMO TRABALHO</Text><Text style={s.title}>Minha agenda</Text>{items.length===0?<Text style={s.empty}>Quando uma oportunidade for confirmada, ela aparecerá aqui.</Text>:items.map(assignment=>{const actionLabel=assignment.status==='confirmed'?'Fazer check-in':assignment.status==='checked_in'?'Iniciar trabalho':assignment.status==='in_progress'?'Fazer check-out':assignment.status==='checked_out'?'Concluir trabalho':null;return <View key={assignment.id} style={s.card}><Text style={s.role}>{assignment.title}</Text><Text style={s.meta}>{assignment.location??'Local a confirmar'}</Text><Text style={s.status}>Status: {assignment.status}</Text>{actionLabel?<Pressable style={s.primaryButton} onPress={()=>void action(assignment)}><Text style={s.primaryAction}>{actionLabel}</Text></Pressable>:<View style={s.ratingBlock}><Text style={s.ratingTitle}>{assignment.companyRatingScore?`Sua avaliação da empresa: ${assignment.companyRatingScore} ★`:'Avalie a empresa'}</Text><View style={s.ratingRow}>{[1,2,3,4,5].map(score=><Pressable key={score} style={s.ratingButton} onPress={()=>void rateCompany(assignment,score)}><Text style={s.ratingText}>{score} ★</Text></Pressable>)}</View></View>}<View style={s.secondaryRow}><Pressable onPress={()=>router.push({pathname:'/conversa',params:{assignmentId:assignment.id,tenantId:assignment.tenantId}})}><Text style={s.secondaryAction}>Abrir conversa</Text></Pressable><Pressable onPress={()=>router.push({pathname:'/seguranca',params:{assignmentId:assignment.id,tenantId:assignment.tenantId}})}><Text style={s.secondaryAction}>Segurança</Text></Pressable></View></View>})}{message?<Text style={s.message}>{message}</Text>:null}</ScrollView></SafeAreaView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#F7F6FB'},content:{padding:24,gap:16},eyebrow:{fontSize:13,fontWeight:'800',color:'#5B35D5'},title:{fontSize:30,fontWeight:'800',color:'#20202A'},empty:{fontSize:17,color:'#62616B'},card:{padding:20,borderWidth:1,borderColor:'#E9E6F2',backgroundColor:'#FFFFFF',borderRadius:18,gap:12},role:{fontSize:22,fontWeight:'800',color:'#20202A'},meta:{fontSize:16,color:'#62616B'},status:{fontSize:15,fontWeight:'700',color:'#5B35D5'},primaryButton:{backgroundColor:'#5B35D5',borderRadius:12,padding:14,marginTop:4},primaryAction:{fontSize:18,fontWeight:'800',color:'#FFFFFF',textAlign:'center'},secondaryRow:{flexDirection:'row',flexWrap:'wrap',gap:18,marginTop:4},secondaryAction:{fontSize:15,fontWeight:'800',color:'#5B35D5'},message:{color:'#62616B'},ratingBlock:{gap:8,marginTop:4},ratingTitle:{fontSize:16,fontWeight:'800',color:'#20202A'},ratingRow:{flexDirection:'row',flexWrap:'wrap',gap:8},ratingButton:{borderWidth:1,borderColor:'#D8CFFF',backgroundColor:'#F0EBFF',borderRadius:10,paddingVertical:8,paddingHorizontal:10},ratingText:{fontWeight:'800',color:'#5B35D5'}});
