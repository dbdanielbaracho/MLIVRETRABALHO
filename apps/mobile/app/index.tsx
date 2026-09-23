import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { getSession, getTenant } from '../lib/session';

export default function Home() {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    void (async () => {
      const token = await getSession();
      if (!active) return;
      if (token) {
        const tenantId = await getTenant();
        if (!active) return;
        router.replace(tenantId ? '/empresa-inicio' : '/trabalhos');
        return;
      }
      setChecking(false);
    })();
    return () => { active = false; };
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>MLIVRETRABALHO</Text>
        <Text style={styles.title}>Trabalho certo, na hora certa.</Text>
        {checking ? (
          <Text style={styles.body}>Abrindo sua conta...</Text>
        ) : (
          <>
            <Text style={styles.body}>Entre para encontrar trabalhos ou operar sua equipe. Se ainda não tem conta, o cadastro leva só o necessário.</Text>
            <Link href="/entrar" style={styles.primary}>Entrar</Link>
            <Link href="/criar-conta" style={styles.secondary}>Criar conta</Link>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 24, justifyContent: 'center', gap: 16 },
  eyebrow: { fontSize: 13, fontWeight: '700' },
  title: { fontSize: 36, fontWeight: '800' },
  body: { fontSize: 18, lineHeight: 26 },
  primary: { fontSize: 18, fontWeight: '800', borderWidth: 1, borderRadius: 14, padding: 16, textAlign: 'center' },
  secondary: { fontSize: 18, fontWeight: '700', padding: 16, textAlign: 'center' }
});
