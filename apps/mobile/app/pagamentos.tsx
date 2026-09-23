import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { authenticatedTenantHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';

type Reconciliation = {
  assignmentId: string;
  title: string;
  professionalName: string;
  payableCents?: number | null;
  earningStatus?: string | null;
  capturedCents: number;
  refundedCents: number;
  paidOutCents: number;
  reconciliationStatus: 'no_earning' | 'pending' | 'reconciled' | 'overpaid';
};

const money = (cents?: number | null) => `R$ ${((cents ?? 0) / 100).toFixed(2).replace('.', ',')}`;
const statusLabel: Record<Reconciliation['reconciliationStatus'], string> = {
  no_earning: 'Sem valor a pagar',
  pending: 'Pendente',
  reconciled: 'Reconciliado',
  overpaid: 'Pago acima do devido'
};

export default function Pagamentos() {
  const [items, setItems] = useState<Reconciliation[]>([]);
  const [message, setMessage] = useState('Carregando...');

  useEffect(() => { void load(); }, []);

  async function load() {
    const headers = await authenticatedTenantHeaders();
    const response = await fetch(apiUrl('/company/payment-events/reconciliation'), { headers });
    if (!response.ok) {
      setMessage(response.status === 403 ? 'Somente proprietário ou administrador pode ver a reconciliação.' : 'Não foi possível carregar a reconciliação.');
      return;
    }
    const data = await response.json() as Reconciliation[];
    setItems(data);
    setMessage(data.length ? '' : 'Nenhum trabalho financeiro para reconciliar.');
  }

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>Pagamentos</Text>
        <Text>Visão somente leitura. Os fatos financeiros são recebidos pelo backend/provedor e não podem ser criados manualmente nesta tela.</Text>
        {message ? <Text>{message}</Text> : null}
        {items.map(item => (
          <View key={item.assignmentId} style={s.card}>
            <Text style={s.name}>{item.professionalName}</Text>
            <Text style={s.bold}>{item.title}</Text>
            <Text>A pagar: {money(item.payableCents)}</Text>
            <Text>Capturado: {money(item.capturedCents)}</Text>
            <Text>Reembolsado: {money(item.refundedCents)}</Text>
            <Text>Pago ao profissional: {money(item.paidOutCents)}</Text>
            <Text style={s.bold}>Status: {statusLabel[item.reconciliationStatus]}</Text>
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
  card: { borderWidth: 1, borderRadius: 14, padding: 16, gap: 6 },
  name: { fontSize: 19, fontWeight: '800' },
  bold: { fontWeight: '800' }
});
