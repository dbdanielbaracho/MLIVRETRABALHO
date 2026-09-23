import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { authenticatedTenantHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';

type Assignment = {
  id: string;
  status: string;
  title: string;
  location?: string | null;
  startsAt?: string | null;
  endsAt?: string | null;
  professionalName: string;
  replacementOpen: boolean;
};

type Replacement = {
  id: string;
  assignmentId: string;
  status: string;
  reason?: string | null;
};

export default function Substituicoes() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [replacements, setReplacements] = useState<Replacement[]>([]);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');

  useEffect(() => { void load(); }, []);

  async function load() {
    const headers = await authenticatedTenantHeaders();
    const [a, r] = await Promise.all([
      fetch(apiUrl('/company/dashboard/assignments'), { headers }),
      fetch(apiUrl('/company/replacements'), { headers })
    ]);
    if (a.ok) setAssignments(await a.json());
    if (r.ok) setReplacements(await r.json());
  }

  async function requestReplacement(assignmentId: string) {
    const headers = await authenticatedTenantHeaders();
    const response = await fetch(apiUrl(`/company/replacements/${assignmentId}`), {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify({ reason: reasons[assignmentId]?.trim() || undefined })
    });
    setMessage(response.ok ? 'Substituição solicitada.' : 'Não foi possível solicitar a substituição.');
    if (response.ok) await load();
  }

  const openByAssignment = new Map(replacements.filter(x => x.status === 'open').map(x => [x.assignmentId, x]));

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>Substituições</Text>
        <Text>Escolha diretamente um trabalho confirmado ou em andamento.</Text>
        {message ? <Text>{message}</Text> : null}
        {assignments.length === 0 ? <Text>Nenhum trabalho disponível para substituição.</Text> : null}
        {assignments.map(item => {
          const open = item.replacementOpen || openByAssignment.has(item.id);
          return (
            <View key={item.id} style={s.card}>
              <Text style={s.name}>{item.professionalName}</Text>
              <Text style={s.bold}>{item.title}</Text>
              <Text>{item.location ?? 'Local não informado'}</Text>
              <Text>Status: {item.status}</Text>
              {item.startsAt ? <Text>Início: {new Date(item.startsAt).toLocaleString()}</Text> : null}
              {open ? (
                <Text style={s.bold}>Substituição já solicitada</Text>
              ) : (
                <>
                  <TextInput
                    style={s.input}
                    placeholder="Motivo (opcional)"
                    value={reasons[item.id] ?? ''}
                    onChangeText={value => setReasons(current => ({ ...current, [item.id]: value }))}
                  />
                  <Pressable style={s.button} onPress={() => void requestReplacement(item.id)}>
                    <Text style={s.bold}>Solicitar substituição</Text>
                  </Pressable>
                </>
              )}
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
  card: { borderWidth: 1, borderRadius: 14, padding: 16, gap: 7 },
  name: { fontSize: 19, fontWeight: '800' },
  bold: { fontWeight: '800' },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, marginTop: 4 },
  button: { borderWidth: 1, borderRadius: 10, padding: 12, alignItems: 'center' }
});
