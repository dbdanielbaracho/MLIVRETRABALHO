import { router } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CompanyNav } from '../components/CompanyNav';
import { authenticatedTenantHeaders, clearSession, clearTenant } from '../lib/session';
import { apiUrl } from '../lib/api';

export default function EmpresaConta(){
  async function signout(){
    const headers=await authenticatedTenantHeaders();
    try{await fetch(apiUrl('/auth/signout'),{method:'POST',headers});}
    finally{await Promise.all([clearSession(),clearTenant()]);router.replace('/');}
  }
  return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}>
    <CompanyNav/>
    <Text style={s.title}>Conta</Text>
    <Text style={s.body}>Configurações e administração ficam organizadas aqui, sem aumentar a navegação principal.</Text>
    <View style={s.card}><Text style={s.heading}>Empresa</Text><Pressable onPress={()=>router.push('/membros')}><Text style={s.action}>Membros e convites</Text></Pressable></View>
    <View style={s.card}><Text style={s.heading}>Proteção</Text><Pressable onPress={()=>router.push('/casos-seguranca')}><Text style={s.action}>Segurança</Text></Pressable><Pressable onPress={()=>router.push('/privacidade')}><Text style={s.action}>Privacidade e dados</Text></Pressable></View>
    <Pressable style={s.signout} onPress={()=>void signout()}><Text style={s.bold}>Sair da conta</Text></Pressable>
  </ScrollView></SafeAreaView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{padding:24,gap:16},title:{fontSize:30,fontWeight:'800'},body:{fontSize:16,lineHeight:23},card:{borderWidth:1,borderRadius:16,padding:18,gap:12},heading:{fontSize:20,fontWeight:'800'},action:{fontSize:16,fontWeight:'800',paddingVertical:8},signout:{padding:15,alignItems:'center'},bold:{fontWeight:'800'}});
