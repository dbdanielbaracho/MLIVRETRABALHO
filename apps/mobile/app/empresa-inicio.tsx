import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { authenticatedTenantHeaders, clearSession, clearTenant } from '../lib/session';
import { apiUrl } from '../lib/api';

type Dashboard = {
  openJobs: number;
  confirmedWorkers: number;
  activeWorkers: number;
  completedAssignments: number;
};

type CompletedAssignment = {
  id: string;
  professionalId: string;
  title: string;
  location?: string | null;
  professionalName: string;
  completedAt?: string | null;
  ratingScore?: number | null;
};

export default function EmpresaInicio() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [completed, setCompleted] = useState<CompletedAssignment[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => { void load(); }, []);

  async function load() {
    const headers = await authenticatedTenantHeaders();
    const [dashboardResponse, completedResponse] = await Promise.all([
      fetch(apiUrl('/company/dashboard'), { headers }),
      fetch(apiUrl('/company/dashboard/completed'), { headers })
    ]);
    if (dashboardResponse.ok) setDashboard(await dashboardResponse.json());
    if (completedResponse.ok) setCompleted(await completedResponse.json());
  }

  async function rate(assignmentId: string, score: number) {
    const headers = await authenticatedTenantHeaders();
    const response = await fetch(apiUrl(`/assignments/${assignmentId}/rating`), {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify({ score })
    });
    setMessage(response.ok ? 'Avaliação salva.' : 'Não foi possível salvar a avaliação.');
    if (response.ok) await load();
  }

  async function addPreferred(professionalId: string) {
    const headers = await authenticatedTenantHeaders();
    const response = await fetch(apiUrl('/company/talent-pools'), {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify({ professionalId, pool: 'preferred' })
    });
    setMessage(response.ok ? 'Profissional adicionado aos preferidos.' : 'Não foi possível adicionar aos preferidos.');
  }

  async function signout() {
    const headers = await authenticatedTenantHeaders();
    try {
      await fetch(apiUrl('/auth/signout'), { method: 'POST', headers });
    } finally {
      await Promise.all([clearSession(), clearTenant()]);
      router.replace('/');
    }
  }

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>Operação</Text>
        <View style={s.actions}>
          <Link href="/empresa" style={s.action}>+ Publicar trabalho</Link>
          <Link href="/candidatos" style={s.action}>Ver interessados</Link>
          <Link href="/substituicoes" style={s.action}>Substituições</Link>
          <Link href="/talentos" style={s.action}>Talentos</Link>
          <Link href="/pagamentos" style={s.action}>Pagamentos</Link>
        </View>

        {[
          ['Trabalhos abertos', dashboard?.openJobs],
          ['Confirmados', dashboard?.confirmedWorkers],
          ['Trabalhando agora', dashboard?.activeWorkers],
          ['Concluídos', dashboard?.completedAssignments]
        ].map(([label, value]) => (
          <View key={String(label)} style={s.card}>
            <Text style={s.value}>{value ?? '—'}</Text>
            <Text>{label}</Text>
          </View>
        ))}

        <Text style={s.heading}>Trabalhos concluídos</Text>
        <Text>{message}</Text>
        {completed.length === 0 ? <Text>Nenhum trabalho concluído.</Text> : null}
        {completed.map(item => (
          <View key={item.id} style={s.card}>
            <Text style={s.bold}>{item.professionalName}</Text>
            <Text>{item.title}</Text>
            <Text>{item.location ?? 'Local não informado'}</Text>
            <Text>{item.ratingScore ? `Sua avaliação: ${item.ratingScore} ★` : 'Ainda não avaliado'}</Text>
            <View style={s.ratingRow}>
              {[1, 2, 3, 4, 5].map(score => (
                <Pressable key={score} style={s.ratingButton} onPress={() => void rate(item.id, score)}>
                  <Text style={s.bold}>{score} ★</Text>
                </Pressable>
              ))}
            </View>
            <Pressable style={s.preferredButton} onPress={() => void addPreferred(item.professionalId)}>
              <Text style={s.bold}>Adicionar aos preferidos</Text>
            </Pressable>
          </View>
        ))}
        <Pressable style={s.signout} onPress={() => void signout()}>
          <Text style={s.bold}>Sair da conta</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, gap: 12 },
  title: { fontSize: 30, fontWeight: '800' },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 4 },
  action: { borderWidth: 1, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, fontSize: 16, fontWeight: '800' },
  heading: { fontSize: 22, fontWeight: '800', marginTop: 10 },
  card: { borderWidth: 1, borderRadius: 14, padding: 18, gap: 6 },
  value: { fontSize: 28, fontWeight: '800' },
  bold: { fontWeight: '800' },
  ratingRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  ratingButton: { borderWidth: 1, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 10 },
  preferredButton: { borderWidth: 1, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, marginTop: 6, alignItems: 'center' },
  signout: { padding: 14, alignItems: 'center', marginTop: 10 }
});
