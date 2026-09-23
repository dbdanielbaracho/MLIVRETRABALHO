import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export function ProfessionalNav() {
  return (
    <View style={s.row}>
      <Link href="/trabalhos" style={s.item}>Trabalhos</Link>
      <Link href="/agenda" style={s.item}>Agenda</Link>
      <Link href="/disponibilidade" style={s.item}>Disponibilidade</Link>
      <Link href="/ganhos" style={s.item}>Ganhos</Link>
      <Link href="/notificacoes" style={s.item}>Notificações</Link>
      <Link href="/perfil" style={s.item}>Perfil</Link>
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  item: { borderWidth: 1, borderRadius: 10, paddingVertical: 9, paddingHorizontal: 11, fontWeight: '700' }
});
