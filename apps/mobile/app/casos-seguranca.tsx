import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { authenticatedTenantHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';

type SafetyCase = {
  id: string;
  assignmentId?: string | null;
  category: string;
  description: string;
  status: string;
  createdAt: string;
  resolvedAt?: string | null;
};

const categoryLabel: Record<string, string> = {
  unsafe_work: 'Trabalho inseguro',
  harassment: 'Assédio',
  violence: 'Violência',
  discrimination: 'Discriminação',
  fraud: 'Fraude',
  other: 'Outro'
};

const statusLabel: Record<string, string> = {
  open: 'Aberto',
  reviewing: 'Em análise',
  resolved: 'Resolvido',
  dismissed: 'Encerrado sem ação'
};

export default function CasosSeguranca() {
  const [items, setItems] = useState<SafetyCase[]>([]);
  const [message, setMessage] = useState('Carregando relatos...');

  useEffect(() => { void load(); }, []);

  async function load() {
    const headers = await authenticatedTenantHeaders();
    const response = await fetch(apiUrl('/company/safety-cases'), { headers });
    if (!response.ok) {
      setMessage(response.status === 403 ? 'Somente proprietário ou administrador pode analisar relatos.' : 'Não foi possível carregar os relatos.');
      return;
    }
    const data = await response.json() as SafetyCase[];
    setItems(data);
    setMessage(data.length ? '' : 'Nenhum relato recebido.');
  }

  async function setStatus(id: string, status: 'reviewing' | 'resolved' | 'dismissed') {
    const headers = await authenticatedTenantHeaders();
    const response = await fetch(apiUrl(`/company/safety-cases/${id}/status`), {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify({ status })
    });
    setMessage(response.ok ? 'Status do relato atualizado.' : 'Não foi possível atualizar o relato.');
    if (response.ok) await load();
  }

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>Relatos de segurança</Text>
        <Text>Atualizar o status organiza a análise do relato. Isto não aplica suspensão, bloqueio ou penalidade automática.</Text>
        {message ? <Text>{message}</Text> : null}
        {items.map(item => (
          <View key={item.id} style={s.card}>
            <Text style={s.name}>{categoryLabel[item.category] ?? item.category}</Text>
            <Text>{item.description}</Text>
            <Text style={s.bold}>Status: {statusLabel[item.status] ?? item.status}</Text>
            <Text>Recebido: {new Date(item.createdAt).toLocaleString()}</Text>
            {item.status !== 'resolved' && item.status !== 'dismissed' ? (
              <View style={s.actions}>
                {item.status !== 'reviewing' ? (
                  <Pressable style={s.button} onPress={() => void setStatus(item.id, 'reviewing')}>
                    <Text style={s.bold}>Marcar em análise</Text>
                  </Pressable>
                ) : null}
                <Pressable style={s.button} onPress={() => void setStatus(item.id, 'resolved')}>
                  <Text style={s.bold}>Marcar resolvido</Text>
                </Pressable>
                <Pressable style={s.button} onPress={() => void setStatus(item.id, 'dismissed')}>
                  <Text style={s.bold}>Encerrar sem ação</Text>
                </Pressable>
              </View>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, gap: 12 },
  title: { fontSize: 30, fontWeight: '800' },
  card: { borderWidth: 1, borderRadius: 14, padding: 16, gap: 7 },
  name: { fontSize: 19, fontWeight: '800' },
  bold: { fontWeight: '800' },
  actions: { gap: 8, marginTop: 4 },
  button: { borderWidth: 1, borderRadius: 10, padding: 11, alignItems: 'center' }
});
