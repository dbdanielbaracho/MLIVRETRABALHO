import { apiUrl } from '../lib/api';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function CriarConta() {
  const [email, setEmail] = useState(''), [password, setPassword] = useState(''), [accountType, setAccountType] = useState<'professional' | 'company'>('professional'), [workspaceName, setWorkspaceName] = useState(''), [message, setMessage] = useState('');

  async function signup() {
    setMessage('');
    if (!email.trim() || password.length < 8 || (accountType === 'company' && !workspaceName.trim())) { setMessage('Preencha os dados obrigatórios.'); return; }
    const body: { email: string; password: string; accountType: 'professional' | 'company'; workspaceName?: string } = { email: email.trim(), password, accountType };
    if (accountType === 'company') body.workspaceName = workspaceName.trim();
    const r = await fetch(apiUrl('/auth/signup'), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    if (!r.ok) { setMessage('Não foi possível criar a conta. Confira os dados e tente novamente.'); return; }
    router.replace('/entrar');
  }

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <Text style={s.brand}>MLIVRE<Text style={s.purple}>TRABALHO</Text></Text>
        <Text style={s.eyebrow}>COMECE COM O ESSENCIAL</Text>
        <Text style={s.title}>Criar conta</Text>
        <Text style={s.subtitle}>Escolha como você vai usar o MLIVRETRABALHO.</Text>
        <View style={s.row}>
          <Pressable onPress={() => setAccountType('professional')} style={[s.choice, accountType === 'professional' && s.choiceActive]} accessibilityRole="button" accessibilityState={{ selected: accountType === 'professional' }}>
            <Text style={[s.choiceText, accountType === 'professional' && s.choiceTextActive]}>{accountType === 'professional' ? '✓ ' : ''}Quero trabalhar</Text>
          </Pressable>
          <Pressable onPress={() => setAccountType('company')} style={[s.choice, accountType === 'company' && s.choiceActive]} accessibilityRole="button" accessibilityState={{ selected: accountType === 'company' }}>
            <Text style={[s.choiceText, accountType === 'company' && s.choiceTextActive]}>{accountType === 'company' ? '✓ ' : ''}Sou empresa</Text>
          </Pressable>
        </View>
        {accountType === 'company' ? <TextInput accessibilityLabel="Nome da empresa" value={workspaceName} onChangeText={setWorkspaceName} placeholder="Nome da empresa" placeholderTextColor="#7A8495" style={s.input} /> : null}
        <TextInput accessibilityLabel="E-mail" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} placeholder="E-mail" placeholderTextColor="#7A8495" style={s.input} />
        <TextInput accessibilityLabel="Senha com oito ou mais caracteres" secureTextEntry value={password} onChangeText={setPassword} placeholder="Senha (8+ caracteres)" placeholderTextColor="#7A8495" style={s.input} />
        <Pressable onPress={() => void signup()} style={s.button} accessibilityRole="button"><Text style={s.buttonText}>Criar conta</Text></Pressable>
        {message ? <Text style={s.message}>{message}</Text> : null}
        <Link href="/" style={s.back}>Voltar</Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flexGrow: 1, justifyContent: 'center', padding: 24, gap: 14 },
  brand: { fontSize: 20, fontWeight: '900', color: '#111A35', marginBottom: 4 },
  purple: { color: '#651FFF' },
  eyebrow: { fontSize: 12, fontWeight: '800', letterSpacing: 0.8, color: '#651FFF' },
  title: { fontSize: 34, fontWeight: '900', color: '#111A35' },
  subtitle: { fontSize: 15, lineHeight: 22, color: '#53617A', marginBottom: 4 },
  row: { flexDirection: 'row', gap: 8 },
  choice: { flex: 1, borderWidth: 1, borderColor: '#DCD8E8', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, alignItems: 'center' },
  choiceActive: { borderColor: '#651FFF', backgroundColor: '#F6F3FF' },
  choiceText: { color: '#53617A', fontSize: 14, fontWeight: '800' },
  choiceTextActive: { color: '#651FFF' },
  input: { borderWidth: 1, borderColor: '#DCD8E8', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 14, fontSize: 17, color: '#111A35' },
  button: { padding: 16, backgroundColor: '#651FFF', borderRadius: 12, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '900' },
  message: { color: '#B42318', fontSize: 14 },
  back: { color: '#651FFF', fontSize: 15, fontWeight: '800', textAlign: 'center', padding: 10 }
});
