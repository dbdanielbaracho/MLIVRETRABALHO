import { apiUrl } from '../lib/api';
import { Link, router,useFocusEffect } from 'expo-router';
import { useCallback,useRef,useState } from 'react';
import {signupAccount} from '../lib/signup';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function CriarConta() {
  const [email, setEmail] = useState(''), [password, setPassword] = useState(''), [accountType, setAccountType] = useState<'professional' | 'company'>('professional'), [workspaceName, setWorkspaceName] = useState(''), [message, setMessage] = useState('');

  const [busy,setBusy]=useState(false),[uncertain,setUncertain]=useState(false);
  const pending=useRef(false),unknown=useRef(false),epoch=useRef(0),controller=useRef<AbortController|null>(null);
  useFocusEffect(useCallback(()=>{
    ++epoch.current;
    return ()=>{if(pending.current){unknown.current=true;setUncertain(true);}++epoch.current;controller.current?.abort();pending.current=false;setBusy(false);setPassword('');};
  },[]));
  async function signup() {
    if(pending.current||unknown.current)return;
    pending.current=true;setBusy(true);setMessage('');const generation=epoch.current,operation=new AbortController();controller.current=operation;
    const timer=setTimeout(()=>operation.abort(),15000);
    try{
      const result=await signupAccount((path,body)=>fetch(apiUrl(path),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body),signal:operation.signal}),{email,password,accountType,workspaceName});
      if(generation!==epoch.current)return;
      if(result.status==='created'){setPassword('');router.replace('/entrar');}
      else if(result.status==='invalid')setMessage('Preencha um e-mail válido, senha de 8 a 128 caracteres e, para empresa, nome de até 120 caracteres.');
      else if(result.status==='rejected')setMessage(result.emailInUse?'Este e-mail já está cadastrado. Entre com sua conta.':'Não foi possível criar a conta. Confira os dados e tente novamente.');
      else{unknown.current=true;setUncertain(true);setMessage('Não foi possível confirmar o cadastro. Tente entrar com este e-mail e senha antes de cadastrar novamente.');}
    }finally{clearTimeout(timer);if(generation===epoch.current){pending.current=false;setBusy(false);}}
  }

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <Text style={s.brand}>MLIVRE<Text style={s.purple}>TRABALHO</Text></Text>
        <Text style={s.eyebrow}>COMECE COM O ESSENCIAL</Text>
        <Text style={s.title}>Criar conta</Text>
        <Text style={s.subtitle}>Escolha como você vai usar o MLIVRETRABALHO.</Text>
        <View style={s.row}>
          <Pressable disabled={busy} onPress={() => setAccountType('professional')} style={[s.choice, accountType === 'professional' && s.choiceActive]} accessibilityRole="button" accessibilityState={{ selected: accountType === 'professional' }}>
            <Text style={[s.choiceText, accountType === 'professional' && s.choiceTextActive]}>{accountType === 'professional' ? '✓ ' : ''}Quero trabalhar</Text>
          </Pressable>
          <Pressable disabled={busy} onPress={() => setAccountType('company')} style={[s.choice, accountType === 'company' && s.choiceActive]} accessibilityRole="button" accessibilityState={{ selected: accountType === 'company' }}>
            <Text style={[s.choiceText, accountType === 'company' && s.choiceTextActive]}>{accountType === 'company' ? '✓ ' : ''}Sou empresa</Text>
          </Pressable>
        </View>
        {accountType === 'company' ? <TextInput accessibilityLabel="Nome da empresa" editable={!busy} maxLength={120} value={workspaceName} onChangeText={setWorkspaceName} placeholder="Nome da empresa" placeholderTextColor="#7A8495" style={s.input} /> : null}
        <TextInput accessibilityLabel="E-mail" autoCapitalize="none" keyboardType="email-address" editable={!busy} maxLength={320} value={email} onChangeText={setEmail} placeholder="E-mail" placeholderTextColor="#7A8495" style={s.input} />
        <TextInput accessibilityLabel="Senha com oito ou mais caracteres" secureTextEntry editable={!busy} maxLength={128} value={password} onChangeText={setPassword} placeholder="Senha (8+ caracteres)" placeholderTextColor="#7A8495" style={s.input} />
        <Pressable disabled={busy||uncertain} accessibilityState={{disabled:busy||uncertain,busy}} onPress={() => void signup()} style={s.button} accessibilityRole="button"><Text style={s.buttonText}>{busy?'Criando conta…':'Criar conta'}</Text></Pressable>
        {message ? <Text style={s.message}>{message}</Text> : null}
        {uncertain||message==='Este e-mail já está cadastrado. Entre com sua conta.' ? <Link href="/entrar" style={s.back}>Entrar com minha conta</Link> : null}
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

