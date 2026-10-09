import { apiUrl } from '../lib/api';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { clearTenant, saveSession, saveTenant } from '../lib/session';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from 'react-native';

export default function Entrar() {
  const [email, setEmail] = useState(''), [password, setPassword] = useState(''), [message, setMessage] = useState('');

  async function signin() {
    const r = await fetch(apiUrl('/auth/signin'), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password }) });
    if (!r.ok) { setMessage('Confira seu e-mail e senha'); return; }
    const data = await r.json();
    await saveSession(data.accessToken);
    const companyMembership = (data.memberships ?? []).find((m: { tenant_id: string; role: string }) => ['owner', 'admin', 'manager', 'company'].includes(m.role));
    if (companyMembership) {
      await saveTenant(companyMembership.tenant_id);
      router.replace('/empresa-inicio');
      return;
    }
    await clearTenant();
    router.replace('/trabalhos');
  }

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <Text style={s.brand}>MLIVRE<Text style={s.purple}>TRABALHO</Text></Text>
        <Text style={s.eyebrow}>BEM-VINDO DE VOLTA</Text>
        <Text style={s.title}>Entrar</Text>
        <Text style={s.subtitle}>Acesse seus trabalhos, sua equipe e as próximas ações.</Text>
        <TextInput accessibilityLabel="E-mail" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} placeholder="E-mail" placeholderTextColor="#7A8495" style={s.input} />
        <TextInput accessibilityLabel="Senha" secureTextEntry value={password} onChangeText={setPassword} placeholder="Senha" placeholderTextColor="#7A8495" style={s.input} />
        <Pressable onPress={() => void signin()} style={s.button} accessibilityRole="button"><Text style={s.buttonText}>Entrar</Text></Pressable>
        {message ? <Text style={s.message}>{message}</Text> : null}
        <Link href="/" style={s.back}>Voltar</Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flexGrow: 1, justifyContent: 'center', padding: 24, gap: 14 },
  brand: { fontSize: 20, fontWeight: '900', color: '#111A35', marginBottom: 8 },
  purple: { color: '#651FFF' },
  eyebrow: { fontSize: 12, fontWeight: '800', letterSpacing: 0.8, color: '#651FFF' },
  title: { fontSize: 34, fontWeight: '900', color: '#111A35' },
  subtitle: { fontSize: 15, lineHeight: 22, color: '#53617A', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#DCD8E8', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 14, fontSize: 17, color: '#111A35' },
  button: { padding: 16, backgroundColor: '#651FFF', borderRadius: 12, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '900' },
  message: { color: '#B42318', fontSize: 14 },
  back: { color: '#651FFF', fontSize: 15, fontWeight: '800', textAlign: 'center', padding: 10 }
});
