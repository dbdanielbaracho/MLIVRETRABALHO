import { apiUrl } from '../lib/api';
import { useCallback,useRef,useState } from 'react';
import {signinAccount} from '../lib/signin';
import { Link, router,useFocusEffect } from 'expo-router';
import {getSession,saveVerifiedSignin} from '../lib/session';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from 'react-native';

export default function Entrar() {
  const [email, setEmail] = useState(''), [password, setPassword] = useState(''), [message, setMessage] = useState('');

  const [busy,setBusy]=useState(false);
  const pending=useRef(false),epoch=useRef(0),controller=useRef<AbortController|null>(null);
  useFocusEffect(useCallback(()=>{++epoch.current;return ()=>{++epoch.current;controller.current?.abort();pending.current=false;setBusy(false);setPassword('');};},[]));
  async function signin() {
    if(pending.current)return;
    pending.current=true;setBusy(true);setMessage('');const generation=epoch.current,operation=new AbortController();controller.current=operation;
    const timer=setTimeout(()=>operation.abort(),15000);
    try{
      const expectedToken=await getSession();if(generation!==epoch.current||operation.signal.aborted)return;
      const result=await signinAccount((path,body)=>fetch(apiUrl(path),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body),signal:operation.signal}),email,password);
      if(generation!==epoch.current)return;
      if(result.status!=='ready'){setMessage(result.status==='limited'?'Muitas tentativas. Aguarde antes de entrar novamente.':result.status==='invalid'||result.status==='rejected'?'Confira seu e-mail e senha':'Não foi possível confirmar o acesso. Tente novamente.');return;}
      const saved=await saveVerifiedSignin({token:result.data.accessToken,tenantId:result.data.tenantId},expectedToken,()=>generation===epoch.current&&!operation.signal.aborted);
      if(generation!==epoch.current)return;
      if(saved!=='saved'){setMessage(saved==='stale'?'A sessão mudou. Entre novamente.':'Não foi possível salvar o acesso neste aparelho. Tente novamente.');return;}
      setPassword('');router.replace(result.data.tenantId?'/empresa-inicio':'/trabalhos');
    }catch{if(generation===epoch.current)setMessage('Não foi possível confirmar o acesso. Tente novamente.');}
    finally{clearTimeout(timer);if(generation===epoch.current){pending.current=false;setBusy(false);}}
  }

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <Text style={s.brand}>MLIVRE<Text style={s.purple}>TRABALHO</Text></Text>
        <Text style={s.eyebrow}>BEM-VINDO DE VOLTA</Text>
        <Text style={s.title}>Entrar</Text>
        <Text style={s.subtitle}>Acesse seus trabalhos, sua equipe e as próximas ações.</Text>
        <TextInput accessibilityLabel="E-mail" autoCapitalize="none" keyboardType="email-address" editable={!busy} maxLength={320} value={email} onChangeText={setEmail} placeholder="E-mail" placeholderTextColor="#7A8495" style={s.input} />
        <TextInput accessibilityLabel="Senha" secureTextEntry editable={!busy} maxLength={128} value={password} onChangeText={setPassword} placeholder="Senha" placeholderTextColor="#7A8495" style={s.input} />
        <Pressable disabled={busy} accessibilityState={{disabled:busy,busy}} onPress={() => void signin()} style={s.button} accessibilityRole="button"><Text style={s.buttonText}>{busy?'Entrando…':'Entrar'}</Text></Pressable>
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

