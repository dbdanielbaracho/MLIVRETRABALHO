import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { authHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';

type Result = {
  intent: string;
  confidence: number;
  reasons: string[];
  suggestedRoute: string | null;
  executionAllowed: false;
  requiresHumanConfirmation: boolean;
  provider: string;
  providerConfigured: boolean;
  disclaimer: string;
};

export default function Copilot() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [message, setMessage] = useState('');

  async function interpret() {
    const value = text.trim();
    if (!value) {
      setMessage('Escreva o que você quer fazer.');
      return;
    }
    setMessage('Entendendo seu pedido...');
    const headers = await authHeaders();
    const response = await fetch(apiUrl('/copilot/interpret'), {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify({ text: value, mode: 'assisted' })
    });
    if (!response.ok) {
      setResult(null);
      setMessage('Não foi possível interpretar o pedido agora.');
      return;
    }
    setResult(await response.json());
    setMessage('');
  }

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <Text style={s.title}>Assistente</Text>
        <Text style={s.subtitle}>Diga o que você precisa em linguagem simples. O assistente orienta e sugere o próximo passo, mas não confirma trabalho, paga, bloqueia ou pune ninguém sozinho.</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Ex.: Quero ver meu próximo trabalho"
          multiline
          style={s.input}
        />
        <TouchableOpacity style={s.primary} onPress={() => void interpret()}>
          <Text style={s.primaryText}>Continuar</Text>
        </TouchableOpacity>
        {message ? <Text>{message}</Text> : null}
        {result ? (
          <View style={s.card}>
            <Text style={s.heading}>Entendi</Text>
            <Text>{result.reasons[0] ?? 'Pedido interpretado.'}</Text>
            {result.suggestedRoute ? (
              <TouchableOpacity style={s.secondary} onPress={() => router.push(result.suggestedRoute as never)}>
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
