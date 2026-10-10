import { Link, router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { authenticatedTenantHeaders } from '../lib/session';
import { resolveStartupRoute } from '../lib/startup-route';

export default function Home() {
  const [checking, setChecking] = useState(true);

  useFocusEffect(useCallback(() => {
    let active = true;
    setChecking(true);
    void (async () => {
      const result = await resolveStartupRoute(authenticatedTenantHeaders, () => active);
      if (!active) return;
      if (result.status === 'ready') {
        router.replace(result.route);
        return;
      }
      setChecking(false);
    })();
    return () => { active = false; };
  }, []));

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.brand}>MLIVRE<Text style={styles.purple}>TRABALHO</Text></Text>
        <Text style={styles.eyebrow}>AI WORKFORCE NETWORK</Text>
        <Text style={styles.title}>Trabalho certo, na hora certa.</Text>
        {checking ? (
          <View style={styles.card}>
            <Text style={styles.body}>Abrindo sua conta...</Text>
          </View>
        ) : (
          <>
            <Text style={styles.body}>Entre para encontrar trabalhos ou operar sua equipe. Se ainda não tem conta, o cadastro leva só o necessário.</Text>
            <Link href="/entrar" style={styles.primary} accessibilityRole="button">Entrar</Link>
            <Link href="/criar-conta" style={styles.secondary} accessibilityRole="button">Criar conta</Link>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, padding: 24, justifyContent: 'center', gap: 14 },
  brand: { fontSize: 20, fontWeight: '900', color: '#111A35', marginBottom: 8 },
  purple: { color: '#651FFF' },
  eyebrow: { fontSize: 12, fontWeight: '800', letterSpacing: 0.8, color: '#651FFF' },
  title: { fontSize: 36, lineHeight: 42, fontWeight: '900', color: '#111A35' },
  body: { fontSize: 17, lineHeight: 25, color: '#53617A' },
  card: { padding: 18, borderWidth: 1, borderColor: '#E7EAF0', borderRadius: 14, backgroundColor: '#F6F3FF' },
  primary: { fontSize: 17, fontWeight: '900', color: '#FFFFFF', backgroundColor: '#651FFF', borderRadius: 12, padding: 16, textAlign: 'center', marginTop: 8 },
  secondary: { fontSize: 17, fontWeight: '800', color: '#651FFF', borderWidth: 1, borderColor: '#D8CCFF', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 15, textAlign: 'center' }
});
