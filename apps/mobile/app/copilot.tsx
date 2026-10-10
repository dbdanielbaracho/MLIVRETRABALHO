import { useCallback, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { authHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';

import {interpretRequest} from '../lib/copilot-response';
import type {Interpretation} from '../lib/copilot-response';

export default function Copilot() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [result, setResult] = useState<Interpretation | null>(null);
  const [message, setMessage] = useState('');

  const pending=useRef(false),epoch=useRef(0),suggestion=useRef(0),controller=useRef<AbortController|null>(null),sourceAuthorization=useRef<string|undefined>(undefined);
  const [busy,setBusy]=useState(false);
  useFocusEffect(useCallback(()=>{
    ++epoch.current;setResult(null);sourceAuthorization.current=undefined;
    return ()=>{++epoch.current;controller.current?.abort();pending.current=false;setBusy(false);sourceAuthorization.current=undefined;setResult(null);};
  },[]));
  async function interpret() {
    if(pending.current)return;
    pending.current=true;++suggestion.current;setBusy(true);setResult(null);setMessage('Entendendo seu pedido…');
    const version=epoch.current,operation=new AbortController();controller.current=operation;
    const timer=setTimeout(()=>operation.abort(),15000);
    try{
      const headers=await authHeaders();
      if(version!==epoch.current||operation.signal.aborted)return;
      const next=await interpretRequest((path,body)=>fetch(apiUrl(path),{method:'POST',headers:{...headers,'content-type':'application/json'},body:JSON.stringify(body),signal:operation.signal}),text);
      if(version!==epoch.current)return;
      if(next.status==='ready'){sourceAuthorization.current=headers.Authorization;setResult(next.data);setMessage('');}
      else setMessage(next.status==='invalid'?'Escreva um pedido de até 2000 caracteres.':'Não foi possível interpretar o pedido. Tente novamente.');
    }catch{if(version===epoch.current)setMessage('Não foi possível interpretar o pedido. Tente novamente.');}
    finally{clearTimeout(timer);if(version===epoch.current){pending.current=false;setBusy(false);}}
  }
  async function nextStep(){
    const route=result?.suggestedRoute,version=epoch.current,selection=suggestion.current;if(!route||pending.current)return;
    try{
      const current=await authHeaders();
      if(version!==epoch.current||selection!==suggestion.current)return;
      if(current.Authorization!==sourceAuthorization.current){setResult(null);setMessage('A sessão mudou. Interprete o pedido novamente.');return;}
      router.push(route);
    }catch{if(version===epoch.current)setMessage('Não foi possível abrir o próximo passo. Tente novamente.');}
  }

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <Text style={s.title}>Assistente</Text>
        <Text style={s.subtitle}>Diga o que você precisa em linguagem simples. O assistente orienta e sugere o próximo passo, mas não confirma trabalho, paga, bloqueia ou pune ninguém sozinho.</Text>
        <TextInput
          value={text}
          onChangeText={value=>{++suggestion.current;setText(value);setResult(null);setMessage('');}}
          editable={!busy}
          maxLength={2000}
          placeholder="Ex.: Quero ver meu próximo trabalho"
          multiline
          style={s.input}
        />
        <TouchableOpacity style={s.primary} accessibilityRole="button" disabled={busy} accessibilityState={{disabled:busy,busy}} onPress={() => void interpret()}>
          <Text style={s.primaryText}>{busy?'Interpretando…':'Continuar'}</Text>
        </TouchableOpacity>
        {message ? <Text>{message}</Text> : null}
        {result ? (
          <View style={s.card}>
            <Text style={s.heading}>Entendi</Text>
            <Text>{result.reasons[0] ?? 'Pedido interpretado.'}</Text>
            {result.suggestedRoute ? (
              <TouchableOpacity style={s.secondary} accessibilityRole="button" onPress={() => void nextStep()}>
                <Text style={s.secondaryText}>Ir para o próximo passo</Text>
              </TouchableOpacity>
            ) : (
              <Text>Não encontrei uma ação segura para sugerir. Tente dizer o objetivo de outra forma.</Text>
            )}
            {result.requiresHumanConfirmation ? <Text style={s.warning}>Esta solicitação exige decisão/confirmação humana.</Text> : null}
            <Text style={s.note}>{result.disclaimer}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, gap: 14 },
  title: { fontSize: 30, fontWeight: '800' },
  subtitle: { fontSize: 16, lineHeight: 23 },
  input: { minHeight: 120, borderWidth: 1, borderRadius: 14, padding: 14, textAlignVertical: 'top', fontSize: 16 },
  primary: { padding: 16, borderRadius: 14, backgroundColor: '#111' },
  primaryText: { color: '#fff', fontWeight: '800', textAlign: 'center' },
  card: { borderWidth: 1, borderRadius: 14, padding: 16, gap: 10 },
  heading: { fontSize: 20, fontWeight: '800' },
  secondary: { padding: 14, borderRadius: 12, borderWidth: 1 },
  secondaryText: { fontWeight: '700', textAlign: 'center' },
  warning: { fontWeight: '700' },
  note: { fontSize: 12, opacity: 0.7 }
});
