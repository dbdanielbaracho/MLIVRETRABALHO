import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { authenticatedTenantHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';

type Job={id:string;title:string;status:string;location?:string|null;workCity?:string|null};
type Candidate={professionalId:string;displayName:string;homeCity?:string;status:string};

export default function Candidatos(){
 const [jobs,setJobs]=useState<Job[]>([]),[jobId,setJobId]=useState(''),[items,setItems]=useState<Candidate[]>([]),[message,setMessage]=useState('');
 useEffect(()=>{void loadJobs();},[]);
 async function loadJobs(){const h=await authenticatedTenantHeaders();const r=await fetch(apiUrl('/company/jobs'),{headers:h});if(r.ok){const data=await r.json() as Job[];setJobs(data.filter(x=>x.status==='open'));}else setMessage('Não foi possível carregar os trabalhos.');}
 async function selectJob(id:string){setJobId(id);setItems([]);setMessage('');const h=await authenticatedTenantHeaders();const r=await fetch(apiUrl('/company/jobs/'+id+'/candidates'),{headers:h});if(r.ok)setItems(await r.json());else setMessage('Não foi possível carregar interessados.');}
 async function confirm(id:string){if(!jobId)return;const h=await authenticatedTenantHeaders();const r=await fetch(apiUrl('/company/jobs/'+jobId+'/confirm'),{method:'POST',headers:{...h,'content-type':'application/json'},body:JSON.stringify({professionalId:id})});setMessage(r.ok?'Profissional confirmado.':'Não foi possível confirmar.');if(r.ok)await selectJob(jobId);}
 return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}><Text style={s.title}>Interessados</Text><Text style={s.heading}>Escolha um trabalho</Text>{jobs.length===0?<Text>Nenhum trabalho aberto.</Text>:jobs.map(j=><Pressable key={j.id} style={[s.jobCard,jobId===j.id&&s.selected]} onPress={()=>void selectJob(j.id)}><Text style={s.name}>{j.title}</Text><Text>{j.workCity??j.location??'Local não informado'}</Text></Pressable>)}{jobId?<><Text style={s.heading}>Profissionais interessados</Text>{items.length===0?<Text>Nenhum interessado ainda.</Text>:items.map(x=><View key={x.professionalId} style={s.card}><Text style={s.name}>{x.displayName}</Text><Text>{x.homeCity??'Cidade não informada'}</Text><Text>{x.status}</Text><Pressable onPress={()=>void confirm(x.professionalId)}><Text style={s.action}>Confirmar profissional</Text></Pressable></View>)}</>:null}<Text>{message}</Text></ScrollView></SafeAreaView>}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{padding:24,gap:14},title:{fontSize:30,fontWeight:'800'},heading:{fontSize:20,fontWeight:'800',marginTop:4},jobCard:{borderWidth:1,borderRadius:14,padding:16,gap:5},selected:{borderWidth:2},card:{borderWidth:1,borderRadius:14,padding:16,gap:7},name:{fontSize:19,fontWeight:'800'},action:{fontSize:17,fontWeight:'800',marginTop:6}});
