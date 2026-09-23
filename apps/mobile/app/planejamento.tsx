import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { authenticatedTenantHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';

type PlannerItem = {
  id: string;
  title: string;
  requiredRole?: string | null;
  jobStatus: string;
  location?: string | null;
  workCity?: string | null;
  startsAt?: string | null;
  endsAt?: string | null;
  payCents?: number | null;
  interestCount: number;
  confirmedCount: number;
  activeCount: number;
  completedCount: number;
  cancelledCount: number;
};

const money = (cents?: number | null) => `R$ ${((cents ?? 0) / 100).toFixed(2).replace('.', ',')}`;

function operationLabel(item: PlannerItem) {
  if (item.activeCount > 0) return 'Em andamento';
  if (item.confirmedCount > 0) return 'Profissional confirmado';
  if (item.completedCount > 0) return 'Concluído';
  if (item.interestCount > 0) return 'Com interessados, sem confirmação';
  return 'Sem profissional confirmado';
}

function dateLabel(value?: string | null) {
  if (!value) return 'Horário não informado';
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date.toLocaleString() : 'Horário não informado';
}

export default function Planejamento() {
  const [items, setItems] = useState<PlannerItem[]>([]);
  const [message, setMessage] = useState('Carregando planejamento...');

  useEffect(() => { void load(); }, []);

  async function load() {
    const headers = await authenticatedTenantHeaders();
    const response = await fetch(apiUrl('/company/planner'), { headers });
    if (!response.ok) {
      setMessage('Não foi possível carregar o planejamento agora.');
      return;
    }
    const data = await response.json() as PlannerItem[];
    setItems(data);
    setMessage(data.length ? '' : 'Nenhum trabalho planejado.');
  }

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>Planejamento</Text>
        <Text>Visão cronológica da operação. Os números mostram fatos já registrados; não estimam headcount nem confirmam profissionais automaticamente.</Text>
        {message ? <Text>{message}</Text> : null}
        {items.map(item => {
          const noCurrentProfessional = item.confirmedCount === 0 && item.activeCount === 0 && item.completedCount === 0;
          return (
            <View key={item.id} style={s.card}>
              <Text style={s.name}>{item.title}</Text>
              <Text>{item.requiredRole ?? item.title} · {item.workCity ?? item.location ?? 'Local não informado'}</Text>
              <Text>Início: {dateLabel(item.startsAt)}</Text>
              <Text>Fim: {dateLabel(item.endsAt)}</Text>
              <Text>Valor: {money(item.payCents)}</Text>
              <Text style={s.status}>Situação: {operationLabel(item)}</Text>
              {noCurrentProfessional ? <Text style={s.attention}>Atenção: nenhum profissional confirmado neste trabalho.</Text> : null}
              <View style={s.metrics}>
                <Text>Interessados: {item.interestCount}</Text>
                <Text>Confirmados: {item.confirmedCount}</Text>
                <Text>Em andamento: {item.activeCount}</Text>
                <Text>Concluídos: {item.completedCount}</Text>
                {item.cancelledCount > 0 ? <Text>Cancelados: {item.cancelledCount}</Text> : null}
              </View>
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
  card: { borderWidth: 1, borderRadius: 14, padding: 16, gap: 6 },
  name: { fontSize: 20, fontWeight: '800' },
  status: { fontWeight: '800', marginTop: 3 },
  attention: { fontWeight: '800' },
  metrics: { gap: 3, marginTop: 4 }
});
