import { useEffect, useMemo, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ProfessionalNav } from '../components/ProfessionalNav';
import { authHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';

const categories = [
  ['unsafe_work', 'Trabalho inseguro'],
  ['harassment', 'Assédio'],
  ['violence', 'Violência'],
  ['discrimination', 'Discriminação'],
  ['fraud', 'Fraude'],
  ['other', 'Outro']
] as const;

const appealStatusLabel: Record<string, string> = {
  submitted: 'Recurso enviado',
  reviewing: 'Recurso em análise',
  upheld: 'Decisão mantida',
  modified: 'Decisão modificada',
  reversed: 'Decisão revertida'
};

type Assignment = {
  id: string;
  tenantId: string;
  title: string;
  status: string;
  location?: string | null;
  startsAt?: string | null;
};

type SafetyCase = {
  id: string;
  tenantId: string;
  assignmentId?: string | null;
  category: string;
  description: string;
  status: string;
  createdAt: string;
  reportedByMe?: boolean;
};

type SafetyAppeal = {
  id: string;
  tenantId: string;
  safetyCaseId: string;
  reason: string;
  status: string;
  createdAt: string;
};

export default function Seguranca() {
  const params = useLocalSearchParams<{ assignmentId?: string; tenantId?: string }>();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [cases, setCases] = useState<SafetyCase[]>([]);
  const [appeals, setAppeals] = useState<SafetyAppeal[]>([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(params.assignmentId ?? '');
  const [selectedTenantId, setSelectedTenantId] = useState(params.tenantId ?? '');
  const [description, setDescription] = useState('');
  const [appealCaseId, setAppealCaseId] = useState('');
  const [appealReason, setAppealReason] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<(typeof categories)[number][0]>('unsafe_work');

  const appealByCase = useMemo(() => new Map(appeals.map(item => [item.safetyCaseId, item])), [appeals]);

  useEffect(() => { void load(); }, []);

  async function load() {
    const headers = await authHeaders();
    const [assignmentsResponse, casesResponse, appealsResponse] = await Promise.all([
      fetch(apiUrl('/assignments/mine'), { headers }),
      fetch(apiUrl('/safety-cases/mine'), { headers }),
      fetch(apiUrl('/safety-appeals/mine'), { headers })
    ]);

    if (assignmentsResponse.ok) {
      const data = await assignmentsResponse.json() as Assignment[];
      setAssignments(data);
      if (params.assignmentId && params.tenantId && data.some(item => item.id === params.assignmentId && item.tenantId === params.tenantId)) {
        setSelectedAssignmentId(params.assignmentId);
        setSelectedTenantId(params.tenantId);
      }
    }
    if (casesResponse.ok) setCases(await casesResponse.json());
    if (appealsResponse.ok) setAppeals(await appealsResponse.json());
  }

  function selectAssignment(assignment: Assignment) {
    setSelectedAssignmentId(assignment.id);
    setSelectedTenantId(assignment.tenantId);
    setMessage('');
  }

  async function send() {
    const text = description.trim();
    if (!selectedAssignmentId || !selectedTenantId) {
      setMessage('Escolha o trabalho relacionado ao relato.');
      return;
    }
    if (!text) {
      setMessage('Descreva o que aconteceu.');
      return;
    }

    const headers = await authHeaders();
    const response = await fetch(apiUrl('/safety-cases'), {
      method: 'POST',
      headers: { ...headers, 'x-tenant-id': selectedTenantId, 'content-type': 'application/json' },
      body: JSON.stringify({ assignmentId: selectedAssignmentId, category, description: text })
    });
    setMessage(response.ok ? 'Relato enviado para análise.' : 'Não foi possível enviar o relato.');
    if (response.ok) {
      setDescription('');
      await load();
    }
  }

  async function sendAppeal(item: SafetyCase) {
    const reason = appealReason.trim();
    if (!reason) {
      setMessage('Explique por que você solicita revisão.');
      return;
    }
    const headers = await authHeaders();
    const response = await fetch(apiUrl('/safety-appeals'), {
      method: 'POST',
      headers: { ...headers, 'x-tenant-id': item.tenantId, 'content-type': 'application/json' },
      body: JSON.stringify({ safetyCaseId: item.id, reason })
    });
    setMessage(response.ok ? 'Pedido de revisão registrado para análise humana.' : 'Não foi possível registrar o pedido de revisão.');
    if (response.ok) {
      setAppealCaseId('');
      setAppealReason('');
      await load();
    }
  }

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <ProfessionalNav />
        <Text style={s.title}>Segurança</Text>
        <Text>Relate uma situação relacionada a um trabalho confirmado. O registro não aplica penalidade automaticamente.</Text>
        <Text style={s.alert}>Se houver risco imediato à vida ou à integridade física, procure primeiro o serviço de emergência local. Este canal não substitui atendimento de emergência.</Text>

        <Text style={s.heading}>Escolha o trabalho</Text>
        {assignments.length === 0 ? <Text>Nenhum trabalho disponível para vincular ao relato.</Text> : assignments.map(assignment => (
          <Pressable
            key={`${assignment.tenantId}:${assignment.id}`}
            style={[s.card, selectedAssignmentId === assignment.id && selectedTenantId === assignment.tenantId && s.selected]}
            onPress={() => selectAssignment(assignment)}
          >
            <Text style={s.bold}>{assignment.title}</Text>
            <Text>{assignment.location ?? 'Local não informado'}</Text>
            <Text>Status: {assignment.status}</Text>
          </Pressable>
        ))}

        <Text style={s.heading}>Categoria</Text>
        <View style={s.categories}>
          {categories.map(([value, label]) => (
            <Pressable key={value} style={[s.choice, category === value && s.selected]} onPress={() => setCategory(value)}>
              <Text style={category === value ? s.bold : undefined}>{label}</Text>
            </Pressable>
          ))}
        </View>

        <TextInput
          style={s.input}
          multiline
          placeholder="Descreva o que aconteceu"
          value={description}
          onChangeText={setDescription}
        />
        <Pressable style={s.button} onPress={() => void send()}><Text style={s.bold}>Enviar relato</Text></Pressable>
        {message ? <Text>{message}</Text> : null}

        <Text style={s.heading}>Casos relacionados a mim</Text>
        <Text>Você vê relatos que enviou e também casos ligados ao seu trabalho. Se discordar de uma decisão ou precisar registrar seu contraditório, peça revisão humana.</Text>
        {cases.length === 0 ? <Text>Nenhum caso relacionado a você.</Text> : cases.map(item => {
          const appeal = appealByCase.get(item.id);
          const canRequestReview = !appeal && (!item.reportedByMe || item.status === 'resolved' || item.status === 'dismissed');
          return (
            <View key={`${item.tenantId}:${item.id}`} style={s.card}>
              <Text style={s.bold}>{categories.find(([value]) => value === item.category)?.[1] ?? item.category}</Text>
              <Text>{item.description}</Text>
              <Text>Status do caso: {item.status}</Text>
              <Text>{item.reportedByMe ? 'Relato enviado por você.' : 'Caso relacionado ao seu trabalho.'}</Text>
              {appeal ? (
                <View style={s.reviewBox}>
                  <Text style={s.bold}>{appealStatusLabel[appeal.status] ?? appeal.status}</Text>
                  <Text>{appeal.reason}</Text>
                  <Text>A revisão é humana e não altera score ou acesso automaticamente.</Text>
                </View>
              ) : null}
              {canRequestReview && appealCaseId !== item.id ? (
                <Pressable style={s.button} onPress={() => { setAppealCaseId(item.id); setAppealReason(''); setMessage(''); }}>
                  <Text style={s.bold}>Solicitar revisão</Text>
                </Pressable>
              ) : null}
              {appealCaseId === item.id ? (
                <View style={s.reviewBox}>
                  <Text style={s.bold}>Seu contraditório</Text>
                  <TextInput
                    style={s.appealInput}
                    multiline
                    placeholder="Explique o que deve ser revisto"
                    value={appealReason}
                    onChangeText={setAppealReason}
                  />
                  <Pressable style={s.button} onPress={() => void sendAppeal(item)}><Text style={s.bold}>Enviar para revisão humana</Text></Pressable>
                  <Pressable style={s.button} onPress={() => { setAppealCaseId(''); setAppealReason(''); }}><Text>Cancelar</Text></Pressable>
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
  content: { padding: 24, gap: 14 },
  title: { fontSize: 30, fontWeight: '800' },
  heading: { fontSize: 20, fontWeight: '800', marginTop: 4 },
  input: { borderWidth: 1, borderRadius: 12, padding: 14, minHeight: 140, textAlignVertical: 'top' },
  appealInput: { borderWidth: 1, borderRadius: 10, padding: 12, minHeight: 100, textAlignVertical: 'top' },
  button: { borderWidth: 1, borderRadius: 12, padding: 14, alignItems: 'center' },
  bold: { fontWeight: '800' },
  alert: { fontWeight: '700' },
  categories: { gap: 8 },
  choice: { borderWidth: 1, borderRadius: 10, padding: 10 },
  card: { borderWidth: 1, borderRadius: 12, padding: 12, gap: 7 },
  reviewBox: { borderWidth: 1, borderRadius: 10, padding: 12, gap: 7 },
  selected: { borderWidth: 2 }
});
