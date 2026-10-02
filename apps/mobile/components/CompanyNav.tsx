import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export function CompanyNav() {
  return (
    <View style={s.row}>
      <Link href="/empresa-inicio" style={s.item}>Início</Link>
      <Link href="/empresa" style={s.item}>Trabalhos</Link>
      <Link href="/equipes" style={s.item}>Equipe</Link>
      <Link href="/empresa-conta" style={s.item}>Conta</Link>
    </View>
  );
}

const s=StyleSheet.create({
  row:{flexDirection:'row',gap:8},
  item:{flex:1,borderWidth:1,borderRadius:10,paddingVertical:10,paddingHorizontal:6,textAlign:'center',fontWeight:'700'}
});
