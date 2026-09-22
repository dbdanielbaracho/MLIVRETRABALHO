import { Link } from 'expo-router';
import { useEffect,useState } from 'react';
import { authenticatedTenantHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  const [unread,setUnread]=useState(0);useEffect(()=>{void (async()=>{try{const h=await authenticatedTenantHeaders();const r=await fetch(apiUrl('/notifications/unread-count'),{headers:h});if(r.ok)setUnread((await r.json()).count??0);}catch{}})();},[]);
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>MLIVRETRABALHO</Text>
        <Text style={styles.title}>Trabalho certo, na hora certa.</Text>
        <Text style={styles.body}>Encontre oportunidades compatíveis com seu perfil e acompanhe tudo pelo celular.</Text>
        <Link href="/trabalhos" style={styles.primary}>Ver trabalhos</Link>
        <View style={styles.nav}>
          <Text style={styles.active}>Início</Text>
          <Link href="/trabalhos">Trabalhos</Link>
          <Link href="/ganhos">Ganhos</Link>
          <Link href="/perfil">Perfil</Link>
          <Link href="/notificacoes">Avisos{unread?` (${unread})`:``}</Link>\n          <Link href="/seguranca">Segurança</Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen:{flex:1,backgroundColor:'#fff'}, content:{flex:1,padding:24,justifyContent:'center',gap:16},
  eyebrow:{fontSize:13,fontWeight:'700'}, title:{fontSize:36,fontWeight:'800'}, body:{fontSize:18,lineHeight:26},
  primary:{fontSize:18,fontWeight:'700',paddingVertical:16}, nav:{marginTop:32,flexDirection:'row',justifyContent:'space-between'},
  active:{fontWeight:'800'}
});
