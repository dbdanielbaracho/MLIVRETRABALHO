import { Link } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Home() {
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
