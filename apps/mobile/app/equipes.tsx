import { useEffect, useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { authenticatedTenantHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';

type Team = { id: string; name: string; memberCount: number };
type KnownProfessional = { professionalId: string; professionalName: string };
type TeamMember = { professionalId: string; displayName: string; primaryRole?: string | null; homeCity?: string | null };
type Job = { id: string; title: string; status: string; workCity?: string | null; location?: string | null };
type Allocation = { professionalId: string; score: number; reasons: string[] };

export default function Equipes() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [knownProfessionals, setKnownProfessionals] = useState<KnownProfessional[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [allocation, setAllocation] = useState<Allocation[]>([]);
  const [teamName, setTeamName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => { void loadBase(); }, []);

  const memberIds = useMemo(() => new Set(members.map(member => member.professionalId)), [members]);
  const availableToAdd = knownProfessionals.filter(professional => !memberIds.has(professional.professionalId));
  const selectedTeam = teams.find(team => team.id === selectedTeamId);

  async function loadBase() {
    const headers = await authenticatedTenantHeaders();
    const [teamsResponse, activeResponse, completedResponse, jobsResponse] = await Promise.all([
      fetch(apiUrl('/company/teams'), { headers }),
      fetch(apiUrl('/company/dashboard/assignments'), { headers }),
      fetch(apiUrl('/company/dashboard/completed'), { headers }),
      fetch(apiUrl('/company/jobs'), { headers })
    ]);

    if (teamsResponse.ok) setTeams(await teamsResponse.json());
    if (jobsResponse.ok) {
      const data = await jobsResponse.json() as Job[];
      setJobs(data.filter(job => job.status === 'open'));
    }

    const known = new Map<string, KnownProfessional>();
    if (activeResponse.ok) {
      const active = await activeResponse.json() as Array<{ professionalId: string; professionalName: string }>;
      for (const item of active) if (item.professionalId) known.set(item.professionalId, item);
    }
    if (completedResponse.ok) {
      const completed = await completedResponse.json() as Array<{ professionalId: string; professionalName: string }>;
      for (const item of completed) if (item.professionalId) known.set(item.professionalId, item);
    }
    setKnownProfessionals([...known.values()].sort((a, b) => a.professionalName.localeCompare(b.professionalName)));
  }

  async function selectTeam(teamId: string) {
    setSelectedTeamId(teamId);
    setAllocation([]);
    setSelectedJobId('');
    const headers = await authenticatedTenantHeaders();
    const response = await fetch(apiUrl(`/company/teams/${teamId}/members`), { headers });
    if (response.ok) {
      setMembers(await response.json());
      setMessage('');
    } else {
      setMessage('Não foi possível carregar os membros da equipe.');
    }
  }

  async function createTeam() {
    const name = teamName.trim();
    if (!name) {
      setMessage('Informe o nome da equipe.');
      return;
    }
    const headers = await authenticatedTenantHeaders();
    const response = await fetch(apiUrl('/company/teams'), {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (!response.ok) {
      setMessage('Não foi possível criar a equipe.');
      return;
    }
    const team = await response.json() as { id: string; name: string };
    setTeamName('');
    setMessage('Equipe criada.');
    await loadBase();
    await selectTeam(team.id);
  }

  async function addMember(professionalId: string) {
    if (!selectedTeamId) return;
    const headers = await authenticatedTenantHeaders();
    const response = await fetch(apiUrl(`/company/teams/${selectedTeamId}/members`), {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify({ professionalId })
    });
    setMessage(response.ok ? 'Profissional adicionado à equipe.' : 'Não foi possível adicionar o profissional.');
    if (response.ok) {
      await loadBase();
      await selectTeam(selectedTeamId);
    }
  }

  async function removeMember(professionalId: string) {
    if (!selectedTeamId) return;
    const headers = await authenticatedTenantHeaders();
    const response = await fetch(apiUrl(`/company/teams/${selectedTeamId}/members/${professionalId}`), {
      method: 'DELETE',
      headers
    });
    setMessage(response.ok ? 'Profissional removido da equipe.' : 'Não foi possível remover o profissional.');
    if (response.ok) {
      await loadBase();
      await selectTeam(selectedTeamId);
    }
  }

  async function loadAllocation(jobId: string) {
    if (!selectedTeamId) return;
    setSelectedJobId(jobId);
    const headers = await authenticatedTenantHeaders();
    const response = await fetch(apiUrl(`/company/teams/${selectedTeamId}/allocation/${jobId}`), { headers });
    if (!response.ok) {
      setAllocation([]);
      setMessage('Não foi possível calcular a alocação para este trabalho.');
      return;
    }
    setAllocation(await response.json());
    setMessage('');
  }

  function memberName(professionalId: string) {
    return members.find(member => member.professionalId === professionalId)?.displayName ?? 'Profissional';
  }

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>Equipes</Text>
        <Text>Monte grupos com profissionais que já trabalharam ou estão confirmados com sua empresa. Sem IDs técnicos.</Text>

        <View style={s.row}>
          <TextInput style={[s.input, s.flex]} placeholder="Nome da nova equipe" value={teamName} onChangeText={setTeamName} />
          <Pressable style={s.button} onPress={() => void createTeam()}><Text style={s.bold}>Criar</Text></Pressable>
        </View>

        <Text style={s.heading}>Suas equipes</Text>
        {teams.length === 0 ? <Text>Nenhuma equipe criada.</Text> : teams.map(team => (
          <Pressable key={team.id} style={[s.card, selectedTeamId === team.id && s.selected]} onPress={() => void selectTeam(team.id)}>
            <Text style={s.name}>{team.name}</Text>
            <Text>{team.memberCount} membro(s)</Text>
          </Pressable>
        ))}

        {selectedTeam ? (
          <>
            <Text style={s.heading}>Membros — {selectedTeam.name}</Text>
            {members.length === 0 ? <Text>Esta equipe ainda não tem membros.</Text> : members.map(member => (
              <View key={member.professionalId} style={s.card}>
                <Text style={s.name}>{member.displayName}</Text>
                <Text>{member.primaryRole ?? 'Função não informada'} · {member.homeCity ?? 'Cidade não informada'}</Text>
                <Pressable onPress={() => void removeMember(member.professionalId)}><Text style={s.action}>Remover da equipe</Text></Pressable>
              </View>
            ))}

            <Text style={s.heading}>Adicionar profissional conhecido</Text>
            {availableToAdd.length === 0 ? <Text>Nenhum outro profissional conhecido disponível para adicionar.</Text> : availableToAdd.map(professional => (
              <Pressable key={professional.professionalId} style={s.card} onPress={() => void addMember(professional.professionalId)}>
                <Text style={s.name}>{professional.professionalName}</Text>
                <Text style={s.action}>Adicionar à equipe</Text>
              </Pressable>
            ))}

            <Text style={s.heading}>Alocação recomendada</Text>
            <Text>Escolha uma vaga aberta. O ranking usa disponibilidade, função, confiabilidade e proximidade quando houver dado suficiente.</Text>
            {jobs.length === 0 ? <Text>Nenhuma vaga aberta.</Text> : jobs.map(job => (
              <Pressable key={job.id} style={[s.jobCard, selectedJobId === job.id && s.selected]} onPress={() => void loadAllocation(job.id)}>
                <Text style={s.name}>{job.title}</Text>
                <Text>{job.workCity ?? job.location ?? 'Local não informado'}</Text>
              </Pressable>
            ))}

            {selectedJobId ? (
              allocation.length === 0 ? <Text>Nenhum membro disponível/recomendado para esta vaga.</Text> : allocation.map(item => (
                <View key={item.professionalId} style={s.card}>
                  <Text style={s.name}>{memberName(item.professionalId)}</Text>
                  <Text style={s.bold}>Compatibilidade: {item.score}/100</Text>
                  <Text>{item.reasons.length ? item.reasons.join(' • ') : 'Sem sinal adicional de destaque.'}</Text>
                </View>
              ))
            ) : null}
          </>
        ) : null}

        {message ? <Text>{message}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, gap: 12 },
  title: { fontSize: 30, fontWeight: '800' },
  heading: { fontSize: 21, fontWeight: '800', marginTop: 8 },
  row: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  flex: { flex: 1 },
  input: { borderWidth: 1, borderRadius: 12, padding: 13, fontSize: 16 },
  button: { borderWidth: 1, borderRadius: 12, padding: 14 },
  card: { borderWidth: 1, borderRadius: 14, padding: 14, gap: 5 },
  jobCard: { borderWidth: 1, borderRadius: 14, padding: 14, gap: 5 },
  selected: { borderWidth: 2 },
  name: { fontSize: 18, fontWeight: '800' },
  bold: { fontWeight: '800' },
  action: { fontWeight: '800', marginTop: 4 }
});
