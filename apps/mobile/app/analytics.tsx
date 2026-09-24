import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { authenticatedTenantHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';

type Analytics = {
  jobsCreated: number;
  openJobs: number;
  jobsWithInterest: number;
  jobsWithConfirmation: number;
  completedAssignments: number;
  cancelledAssignments: number;
  interestToConfirmationRate: number | null;
  assignmentCompletionRate: number | null;
};

const percent = (value: number | null) => value == null ? 'Sem base suficiente' : `${value}%`;

export default function Analytics() {
  const [data, setData] = useState<Analytics | null>(null);
  const [message, setMessage] = useState('Carregando indicadores...');

  useEffect(() => { void load(); }, []);

  async function load() {
    const headers = await authenticatedTenantHeaders();
    const response = await fetch(apiUrl('/company/analytics'), { headers });
    if (!response.ok) {
      setMessage('Não foi possível carregar os indicadores agora.');
      return;
    }
    setData(await response.json());
    setMessage('');
  }

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>Indicadores</Text>
        <Text>Visão factual da operação. As taxas abaixo usam somente eventos já registrados e não são previsões.</Text>
        {message ? <Text>{message}</Text> : null}
        {data ? (
          <>
            <View style={s.grid}>
              {[
                ['Trabalhos criados', data.jobsCreated],
                ['Trabalhos abertos', data.openJobs],
                ['Com interessados', data.jobsWithInterest],
                ['Com confirmação', data.jobsWithConfirmation],
                ['Assignments concluídos', data.completedAssignments],
                ['Assignments cancelados', data.cancelledAssignments]
              ].map(([label, value]) => (
                <View key={String(label)} style={s.card}>
                  <Text style={s.value}>{value}</Text>
                  <Text>{label}</Text>
                </View>
              ))}
            </View>

            <View style={s.card}>
              <Text style={s.heading}>Interesse → confirmação</Text>
              <Text style={s.value}>{percent(data.interestToConfirmationRate)}</Text>
              <Text>Trabalhos com pelo menos uma confirmação ÷ trabalhos com pelo menos um interessado.</Text>
            </View>

            <View style={s.card}>
              <Text style={s.heading}>Conclusão dos assignments resolvidos</Text>
              <Text style={s.value}>{percent(data.assignmentCompletionRate)}</Text>
              <Text>Concluídos ÷ (concluídos + cancelados). Trabalhos ainda ativos não entram nesta taxa.</Text>
            </View>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, gap: 12 },
  title: { fontSize: 30, fontWeight: '800' },
  grid: { gap: 10 },
  card: { borderWidth: 1, borderRadius: 14, padding: 16, gap: 5 },
  value: { fontSize: 28, fontWeight: '800' },
  heading: { fontSize: 18, fontWeight: '800' }
});
