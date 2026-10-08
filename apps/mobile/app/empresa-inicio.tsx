import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { authenticatedTenantHeaders, clearSession, clearTenant, getTenant } from '../lib/session';
import { apiUrl } from '../lib/api';
import { CompanyNav } from '../components/CompanyNav';

type Dashboard = {
  openJobs: number;
  confirmedWorkers: number;
  activeWorkers: number;
  completedAssignments: number;
};

type ActiveAssignment = {
  id: string;
  professionalId: string;
  status: string;
  title: string;
  location?: string | null;
  startsAt?: string | null;
  professionalName: string;
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

const statusLabel: Record<string, string> = {
  confirmed: 'Confirmado',
  checked_in: 'Check-in realizado',
  in_progress: 'Trabalhando agora',
  checked_out: 'Check-out realizado'
};

export default function EmpresaInicio() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [active, setActive] = useState<ActiveAssignment[]>([]);
  const [completed, setCompleted] = useState<CompletedAssignment[]>([]);
  const [tenantId, setTenantId] = useState('');
  const [message, setMessage] = useState('');
  const [loadError, setLoadError] = useState(false);

  useEffect(() => { void load(); }, []);

  async function load() {
    setLoadError(false);
    try {
      const headers = await authenticatedTenantHeaders();
      const currentTenant = await getTenant();
      if (currentTenant) setTenantId(currentTenant);
      const [dashboardResponse, activeResponse, completedResponse] = await Promise.all([
        fetch(apiUrl('/company/dashboard'), { headers }),
        fetch(apiUrl('/company/dashboard/assignments'), { headers }),
        fetch(apiUrl('/company/dashboard/completed'), { headers })
      ]);
      if (dashboardResponse.ok) setDashboard(await dashboardResponse.json());
      else setDashboard(null);
      if (activeResponse.ok) setActive(await activeResponse.json());
      else setActive([]);
      if (completedResponse.ok) setCompleted(await completedResponse.json());
      else setCompleted([]);
      if (!dashboardResponse.ok || !activeResponse.ok || !completedResponse.ok) setLoadError(true);
    } catch {
      setDashboard(null);
      setActive([]);
      setCompleted([]);
      setLoadError(true);
    }
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

  function openConversation(assignmentId: string) {
    if (!tenantId) {
      setMessage('Não foi possível identificar a empresa ativa.');
      return;
    }
    router.push({ pathname: '/conversa', params: { assignmentId, tenantId } });
  }

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.brand}>MLIVRE<Text style={s.blue}>TRABALHO</Text></Text><Text style={s.title}>Painel da empresa</Text><Text style={s.subtitle}>Resumo da sua operação hoje</Text>
        {loadError ? <Pressable accessibilityRole="button" onPress={() => void load()}><Text>Falha ao carregar dados. Tocar para tentar novamente.</Text></Pressable> : null}
        <View style={s.summaryCard}>
          <Text style={s.summaryLabel}>TRABALHOS ABERTOS</Text>
          <Text style={s.summaryValue}>{dashboard?.openJobs ?? '—'}</Text>
          <Text style={s.summaryText}>{dashboard ? `${dashboard.confirmedWorkers} confirmados · ${dashboard.activeWorkers} trabalhando agora` : 'Carregando sua operação...'}</Text>
        </View>
        <View style={s.primaryActions}>
          <Link href="/empresa" style={s.primaryAction}>+ Publicar trabalho</Link>
          <Link href="/candidatos" style={s.secondaryAction}>Ver interessados</Link>
          <Link href="/copilot" style={s.secondaryAction}>Assistente</Link>
        </View>

        <View style={s.metricsRow}>
          <View style={s.metricCard}><Text style={s.metricValue}>{dashboard?.confirmedWorkers ?? '—'}</Text><Text style={s.metricLabel}>Confirmados</Text></View>
          <View style={s.metricCard}><Text style={s.metricValue}>{dashboard?.activeWorkers ?? '—'}</Text><Text style={s.metricLabel}>Agora</Text></View>
          <View style={s.metricCard}><Text style={s.metricValue}>{dashboard?.completedAssignments ?? '—'}</Text><Text style={s.metricLabel}>Concluídos</Text></View>
        </View>

        <Text style={s.heading}>Trabalhos ativos</Text>
        {active.length === 0 ? <Text>Nenhum profissional confirmado ou trabalhando agora.</Text> : active.map(item => (
          <View key={item.id} style={s.card}>
            <Text style={s.bold}>{item.professionalName}</Text>
            <Text>{item.title}</Text>
            <Text>{item.location ?? 'Local não informado'}</Text>
            <Text>Status: {statusLabel[item.status] ?? item.status}</Text>
            {item.startsAt ? <Text>Início: {new Date(item.startsAt).toLocaleString()}</Text> : null}
            <Pressable style={s.inlineButton} onPress={() => openConversation(item.id)}>
              <Text style={s.bold}>Abrir conversa</Text>
            </Pressable>
          </View>
        ))}

        <Text style={s.heading}>Trabalhos concluídos</Text>
        {message ? <Text>{message}</Text> : null}
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
      </ScrollView><CompanyNav/>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 20, gap: 12, paddingBottom: 24 },
  eyebrow: { fontSize: 13, fontWeight: '800', color: '#064A9B', letterSpacing: 0.8 }, brand:{fontSize:19,fontWeight:'900',color:'#111A35'},blue:{color:'#064A9B'},
  title: { fontSize: 30, fontWeight: '800', color: '#111A35' },
  subtitle: { fontSize: 16, lineHeight: 23, color: '#62616B' },
  summaryCard: { backgroundColor: '#064A9B', borderRadius: 20, padding: 20, gap: 6, marginVertical: 4 },
  summaryLabel: { color: '#DCEBFA', fontSize: 12, fontWeight: '800', letterSpacing: 0.7 },
  summaryValue: { color: '#FFFFFF', fontSize: 38, fontWeight: '800' },
  summaryText: { color: '#FFFFFF', fontSize: 15, lineHeight: 21 },
  metricsRow: { flexDirection: 'row', gap: 10 },
  metricCard: { flex: 1, borderWidth: 1, borderColor: '#E9E6F2', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14, gap: 4 },
  metricValue: { fontSize: 24, fontWeight: '800', color: '#064A9B' },
  metricLabel: { fontSize: 12, color: '#62616B' },
  primaryActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 4 },
  primaryAction: { backgroundColor: '#064A9B', color: '#FFFFFF', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, fontSize: 16, fontWeight: '800' },
  secondaryAction: { borderWidth: 1, borderColor: '#C9DDF3', backgroundColor: '#EEF5FC', color: '#064A9B', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, fontSize: 16, fontWeight: '800' },
  heading: { fontSize: 22, fontWeight: '800', marginTop: 10, color: '#111A35' },
  card: { borderWidth: 1, borderColor: '#E9E6F2', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 18, gap: 6 },
  value: { fontSize: 28, fontWeight: '800', color: '#064A9B' },
  bold: { fontWeight: '800' },
  inlineButton: { backgroundColor: '#EEF5FC', borderRadius: 10, padding: 10, alignItems: 'center', marginTop: 4 },
  ratingRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  ratingButton: { borderWidth: 1, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 10 },
  preferredButton: { borderWidth: 1, borderColor: '#C9DDF3', backgroundColor: '#EEF5FC', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, marginTop: 6, alignItems: 'center' },
  signout: { padding: 14, alignItems: 'center', marginTop: 10 }
});
