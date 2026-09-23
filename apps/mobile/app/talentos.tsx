import { useEffect, useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { authenticatedTenantHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';

type Talent = { professionalId:string; pool:'preferred'|'network'|'open'; displayName:string };
const labels:Record<Talent['pool'],string>={preferred:'Preferidos',network:'Rede',open:'Abertos'};

export default function Talentos(){
 const [items,setItems]=useState<Talent[]>([]),[message,setMessage]=useState('');
 useEffect(()=>{void load();},[]);
 async function load(){const headers=await authenticatedTenantHeaders();const r=await fetch(apiUrl('/company/talent-pools'),{headers});if(r.ok)setItems(await r.json());else setMessage('Não foi possível carregar seus talentos.');}
 async function remove(item:Talent){const headers=await authenticatedTenantHeaders();const r=await fetch(apiUrl(`/company/talent-pools/${item.pool}/${item.professionalId}`),{method:'DELETE',headers});setMessage(r.ok?'Profissional removido da lista.':'Não foi possível remover.');if(r.ok)await load();}
 const grouped=useMemo(()=>({preferred:items.filter(x=>x.pool==='preferred'),network:items.filter(x=>x.pool==='network'),open:items.filter(x=>x.pool==='open')}),[items]);
 return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}><Text style={s.title}>Talentos</Text><Text>Profissionais que sua empresa já conhece e pode chamar novamente.</Text>{message?<Text>{message}</Text>:null}{(['preferred','network','open'] as const).map(pool=><View key={pool} style={s.section}><Text style={s.heading}>{labels[pool]}</Text>{grouped[pool].length===0?<Text>Nenhum profissional nesta lista.</Text>:grouped[pool].map(item=><View key={`${pool}-${item.professionalId}`} style={s.card}><Text style={s.name}>{item.displayName}</Text><Pressable style={s.button} onPress={()=>void remove(item)}><Text style={s.bold}>Remover da lista</Text></Pressable></View>)}</View>)}</ScrollView></SafeAreaView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{padding:24,gap:14},title:{fontSize:30,fontWeight:'800'},section:{gap:8,marginTop:8},heading:{fontSize:22,fontWeight:'800'},card:{borderWidth:1,borderRadius:14,padding:16,gap:8},name:{fontSize:18,fontWeight:'800'},button:{borderWidth:1,borderRadius:10,padding:10,alignItems:'center'},bold:{fontWeight:'800'}});
