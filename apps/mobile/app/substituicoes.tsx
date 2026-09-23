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

type Recommendation = {
  replacementRequestId: string;
  recommendedProfessionalId: string;
  recommendedProfessionalName: string;
  score: number;
  reasons: string[];
};

export default function Substituicoes() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [replacements, setReplacements] = useState<Replacement[]>([]);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<Record<string, Recommendation>>({});
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

  async function autoMatch(replacementId: string) {
    const headers = await authenticatedTenantHeaders();
    const response = await fetch(apiUrl(`/company/replacements/${replacementId}/auto-match`), { method: 'POST', headers });
    if (!response.ok) {
      setMessage('Nenhum substituto disponível no momento.');
      return;
    }
    const recommendation = await response.json() as Recommendation;
    setRecommendations(current => ({ ...current, [replacementId]: recommendation }));
    setMessage('Substituto recomendado encontrado.');
  }

  async function confirmReplacement(replacementId: string, professionalId: string) {
    const headers = await authenticatedTenantHeaders();
    const response = await fetch(apiUrl(`/company/replacements/${replacementId}/select`), {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify({ professionalId })
    });
    setMessage(response.ok ? 'Substituto confirmado.' : 'Não foi possível confirmar o substituto.');
    if (response.ok) {
      setRecommendations(current => {
        const next = { ...current };
        delete next[replacementId];
        return next;
      });
      await load();
    }
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
          const replacement = openByAssignment.get(item.id);
          const recommendation = replacement ? recommendations[replacement.id] : undefined;
          return (
            <View key={item.id} style={s.card}>
              <Text style={s.name}>{item.professionalName}</Text>
              <Text style={s.bold}>{item.title}</Text>
              <Text>{item.location ?? 'Local não informado'}</Text>
              <Text>Status: {item.status}</Text>
              {item.startsAt ? <Text>Início: {new Date(item.startsAt).toLocaleString()}</Text> : null}
              {replacement ? (
                <>
                  <Text style={s.bold}>Substituição solicitada</Text>
                  {recommendation ? (
                    <View style={s.recommendation}>
                      <Text style={s.bold}>{recommendation.recommendedProfessionalName}</Text>
                      <Text>Compatibilidade: {Math.round(recommendation.score * 100)}%</Text>
                      <Pressable style={s.button} onPress={() => void confirmReplacement(replacement.id, recommendation.recommendedProfessionalId)}>
                        <Text style={s.bold}>Confirmar substituto</Text>
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable style={s.button} onPress={() => void autoMatch(replacement.id)}>
                      <Text style={s.bold}>Buscar melhor substituto</Text>
                    </Pressable>
                  )}
                </>
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
  button: { borderWidth: 1, borderRadius: 10, padding: 12, alignItems: 'center', marginTop: 4 },
  recommendation: { borderWidth: 1, borderRadius: 10, padding: 12, gap: 6 }
});
