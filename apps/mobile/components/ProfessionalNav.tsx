import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export function ProfessionalNav() {
  return (
    <View style={s.row}>
      <Link href="/profissional-inicio" style={s.item}>Início</Link>
      <Link href="/trabalhos" style={s.item}>Trabalhos</Link>
      <Link href="/ganhos" style={s.item}>Ganhos</Link>
      <Link href="/perfil" style={s.item}>Perfil</Link>
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  item: { flex: 1, borderWidth: 1, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 6, textAlign: 'center', fontWeight: '700' }
});
