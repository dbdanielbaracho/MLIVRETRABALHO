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

type SafetyAppeal = {
  id: string;
  safetyCaseId: string;
  appellantIdentityId: string;
  reason: string;
  status: string;
  createdAt: string;
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

const appealStatusLabel: Record<string, string> = {
  submitted: 'Recebido',
  reviewing: 'Em revisão',
  upheld: 'Decisão mantida',
  modified: 'Decisão modificada',
  reversed: 'Decisão revertida'
};

export default function CasosSeguranca() {
  const [items, setItems] = useState<SafetyCase[]>([]);
  const [appeals, setAppeals] = useState<SafetyAppeal[]>([]);
  const [message, setMessage] = useState('Carregando relatos...');

  useEffect(() => { void load(); }, []);

  async function load() {
    const headers = await authenticatedTenantHeaders();
    const [casesResponse, appealsResponse] = await Promise.all([
      fetch(apiUrl('/company/safety-cases'), { headers }),
      fetch(apiUrl('/company/safety-appeals'), { headers })
    ]);
    if (!casesResponse.ok) {
      setMessage(casesResponse.status === 403 ? 'Somente proprietário ou administrador pode analisar relatos.' : 'Não foi possível carregar os relatos.');
      return;
    }
    const data = await casesResponse.json() as SafetyCase[];
    setItems(data);
    if (appealsResponse.ok) setAppeals(await appealsResponse.json() as SafetyAppeal[]);
    setMessage(data.length || appealsResponse.ok ? '' : 'Nenhum relato recebido.');
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

  async function setAppealStatus(id: string, status: 'reviewing' | 'upheld' | 'modified' | 'reversed') {
    const headers = await authenticatedTenantHeaders();
    const notes: Record<string, string> = {
      reviewing: 'Revisão humana iniciada pelo administrador.',
      upheld: 'Decisão mantida após revisão humana.',
      modified: 'Decisão modificada após revisão humana.',
      reversed: 'Decisão revertida após revisão humana.'
    };
    const response = await fetch(apiUrl(`/company/safety-appeals/${id}/status`), {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify({ status, note: notes[status] })
    });
    setMessage(response.ok ? 'Recurso atualizado com trilha de auditoria.' : 'Não foi possível atualizar o recurso.');
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

        <Text style={s.heading}>Pedidos de revisão</Text>
        <Text>O contraditório é analisado por uma pessoa. A decisão do recurso não altera score, acesso ou pagamentos automaticamente.</Text>
        {appeals.length === 0 ? <Text>Nenhum pedido de revisão recebido.</Text> : appeals.map(item => {
          const terminal = ['upheld', 'modified', 'reversed'].includes(item.status);
          return (
            <View key={item.id} style={s.card}>
              <Text style={s.name}>Revisão de caso</Text>
              <Text>{item.reason}</Text>
              <Text style={s.bold}>Status: {appealStatusLabel[item.status] ?? item.status}</Text>
              <Text>Recebido: {new Date(item.createdAt).toLocaleString()}</Text>
              {!terminal ? (
                <View style={s.actions}>
                  {item.status === 'submitted' ? (
                    <Pressable style={s.button} onPress={() => void setAppealStatus(item.id, 'reviewing')}>
                      <Text style={s.bold}>Iniciar revisão humana</Text>
                    </Pressable>
                  ) : null}
                  <Pressable style={s.button} onPress={() => void setAppealStatus(item.id, 'upheld')}>
                    <Text style={s.bold}>Manter decisão</Text>
                  </Pressable>
                  <Pressable style={s.button} onPress={() => void setAppealStatus(item.id, 'modified')}>
                    <Text style={s.bold}>Modificar decisão</Text>
                  </Pressable>
                  <Pressable style={s.button} onPress={() => void setAppealStatus(item.id, 'reversed')}>
                    <Text style={s.bold}>Reverter decisão</Text>
                  </Pressable>
                </View>
              ) : null}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, gap: 12 },
  title: { fontSize: 30, fontWeight: '800' },
  heading: { fontSize: 22, fontWeight: '800', marginTop: 10 },
  card: { borderWidth: 1, borderRadius: 14, padding: 16, gap: 7 },
  name: { fontSize: 19, fontWeight: '800' },
  bold: { fontWeight: '800' },
  actions: { gap: 8, marginTop: 4 },
  button: { borderWidth: 1, borderRadius: 10, padding: 11, alignItems: 'center' }
});
