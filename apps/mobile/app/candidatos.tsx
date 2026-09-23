import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { authenticatedTenantHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';

type Job = { id: string; title: string; status: string; location?: string | null; workCity?: string | null };
type Candidate = { professionalId: string; displayName: string; homeCity?: string; status: string };
type Recommendation = { professionalId: string; score: number; reasons: string[] };

export default function Candidatos() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobId, setJobId] = useState('');
  const [items, setItems] = useState<Candidate[]>([]);
  const [recommendations, setRecommendations] = useState<Record<string, Recommendation>>({});
  const [message, setMessage] = useState('');

  useEffect(() => { void loadJobs(); }, []);

  async function loadJobs() {
    const headers = await authenticatedTenantHeaders();
    const response = await fetch(apiUrl('/company/jobs'), { headers });
    if (response.ok) {
      const data = await response.json() as Job[];
      setJobs(data.filter(item => item.status === 'open'));
    } else {
      setMessage('Não foi possível carregar os trabalhos.');
    }
  }

  async function selectJob(id: string) {
    setJobId(id);
    setItems([]);
    setRecommendations({});
    setMessage('');

    const headers = await authenticatedTenantHeaders();
    const [candidatesResponse, recommendationsResponse] = await Promise.all([
      fetch(apiUrl(`/company/jobs/${id}/candidates`), { headers }),
      fetch(apiUrl(`/company/jobs/${id}/recommendations`), { headers })
    ]);

    if (!candidatesResponse.ok) {
      setMessage('Não foi possível carregar interessados.');
      return;
    }

    const candidates = await candidatesResponse.json() as Candidate[];
    let recommendationMap: Record<string, Recommendation> = {};

    if (recommendationsResponse.ok) {
      const ranked = await recommendationsResponse.json() as Recommendation[];
      recommendationMap = Object.fromEntries(ranked.map(item => [item.professionalId, item]));
      candidates.sort((a, b) => (recommendationMap[b.professionalId]?.score ?? -1) - (recommendationMap[a.professionalId]?.score ?? -1));
    }

    setRecommendations(recommendationMap);
    setItems(candidates);
  }

  async function confirm(professionalId: string) {
    if (!jobId) return;
    const headers = await authenticatedTenantHeaders();
    const response = await fetch(apiUrl(`/company/jobs/${jobId}/confirm`), {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify({ professionalId })
    });
    setMessage(response.ok ? 'Profissional confirmado.' : 'Não foi possível confirmar.');
    if (response.ok) await selectJob(jobId);
  }

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>Interessados</Text>
        <Text style={s.heading}>Escolha um trabalho</Text>
        {jobs.length === 0 ? <Text>Nenhum trabalho aberto.</Text> : jobs.map(job => (
          <Pressable key={job.id} style={[s.jobCard, jobId === job.id && s.selected]} onPress={() => void selectJob(job.id)}>
            <Text style={s.name}>{job.title}</Text>
            <Text>{job.workCity ?? job.location ?? 'Local não informado'}</Text>
          </Pressable>
        ))}

        {jobId ? (
          <>
            <Text style={s.heading}>Profissionais interessados</Text>
            <Text>Os mais compatíveis aparecem primeiro. A recomendação apoia sua decisão, mas não confirma ninguém automaticamente.</Text>
            {items.length === 0 ? <Text>Nenhum interessado ainda.</Text> : items.map(item => {
              const recommendation = recommendations[item.professionalId];
              return (
                <View key={item.professionalId} style={s.card}>
                  <Text style={s.name}>{item.displayName}</Text>
                  <Text>{item.homeCity ?? 'Cidade não informada'}</Text>
                  <Text>{item.status}</Text>
                  {recommendation ? (
                    <View style={s.matchBox}>
                      <Text style={s.score}>Compatibilidade: {recommendation.score}/100</Text>
                      {recommendation.reasons.length > 0 ? <Text>{recommendation.reasons.join(' • ')}</Text> : <Text>Sem sinal adicional de destaque.</Text>}
                    </View>
                  ) : (
                    <Text style={s.muted}>Sem recomendação automática para este trabalho.</Text>
                  )}
                  <Pressable onPress={() => void confirm(item.professionalId)}>
                    <Text style={s.action}>Confirmar profissional</Text>
                  </Pressable>
                </View>
              );
            })}
          </>
        ) : null}
        {message ? <Text>{message}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, gap: 14 },
  title: { fontSize: 30, fontWeight: '800' },
  heading: { fontSize: 20, fontWeight: '800', marginTop: 4 },
  jobCard: { borderWidth: 1, borderRadius: 14, padding: 16, gap: 5 },
  selected: { borderWidth: 2 },
  card: { borderWidth: 1, borderRadius: 14, padding: 16, gap: 7 },
  name: { fontSize: 19, fontWeight: '800' },
  matchBox: { borderWidth: 1, borderRadius: 10, padding: 10, gap: 4, marginTop: 3 },
  score: { fontWeight: '800' },
  muted: { opacity: 0.65 },
  action: { fontSize: 17, fontWeight: '800', marginTop: 6 }
});
