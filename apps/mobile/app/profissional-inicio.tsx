import { Link, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ProfessionalNav } from '../components/ProfessionalNav';
import { authHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';

type Profile = { displayName?: string | null };
type Assignment = { id: string; status: string; title: string; location?: string | null; startsAt?: string | null; endsAt?: string | null };
type Earning = { id: string; amountCents: number; status: string; createdAt: string };
type Availability = { id: string; startsAt: string; endsAt: string };
const money = (cents: number) => 'R$ ' + (cents / 100).toFixed(2).replace('.', ',');
const validTime = (value?: string | null) => value ? Date.parse(value) : NaN;
const jobStatus: Record<string, string> = {
  confirmed: 'Confirmado', checked_in: 'Check-in', in_progress: 'Em andamento',
  checked_out: 'Check-out', completed: 'Concluído'
};

export default function ProfissionalInicio() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const headers = await authHeaders();
      const responses = await Promise.all([
        fetch(apiUrl('/professional-profile'), { headers }),
        fetch(apiUrl('/assignments/mine'), { headers }),
        fetch(apiUrl('/earnings/mine'), { headers }),
        fetch(apiUrl('/availability/mine'), { headers })
      ]);
      if (responses.some(response => !response.ok)) throw new Error('professional_home_load_failed');
      const [p, a, e, v] = await Promise.all(responses.map(response => response.json()));
      if (!Array.isArray(a) || !Array.isArray(e) || !Array.isArray(v)) throw new Error('professional_home_invalid_data');
      setProfile(p && typeof p === 'object' ? p as Profile : null);
      setAssignments(a as Assignment[]);
      setEarnings(e as Earning[]);
      setAvailability(v as Availability[]);
    } catch {
      setProfile(null);
      setAssignments([]);
      setEarnings([]);
      setAvailability([]);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { void load(); }, [load]));

  const now = Date.now();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const tomorrow = new Date(todayStart);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const todayCount = assignments.filter(a => {
    const starts = validTime(a.startsAt);
    return starts >= todayStart.getTime() && starts < tomorrow.getTime();
  }).length;
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
  const weekTotal = earnings.filter(e =>
    e.status !== 'reversed' && validTime(e.createdAt) >= weekStart.getTime()
  ).reduce((sum, e) => sum + (Number.isFinite(e.amountCents) ? e.amountCents : 0), 0);
  const next = assignments.filter(a =>
    a.status !== 'completed' && (Number.isNaN(validTime(a.endsAt)) || validTime(a.endsAt) >= now)
  ).sort((a, b) => (validTime(a.startsAt) || Infinity) - (validTime(b.startsAt) || Infinity))[0];
  const availableNow = availability.some(v => validTime(v.startsAt) <= now && validTime(v.endsAt) >= now);
  const firstName = profile?.displayName?.trim().split(/\s+/)[0];
  const nextTime = next?.startsAt && !Number.isNaN(validTime(next.startsAt))
    ? new Date(next.startsAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
    : 'Horário a confirmar';

  return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}>
    <View style={s.brandRow}><Text style={s.brand}>MLIVRE<Text style={s.purple}>TRABALHO</Text></Text><Link href="/notificacoes" style={s.bell} accessibilityLabel="Notificações">♧</Link></View>
    <Text style={s.greeting}>{firstName ? `Olá, ${firstName}!` : 'Olá!'}</Text>
    <Text style={s.subtitle}>Pronto para novos trabalhos?</Text>
    {loadError ? <Pressable accessibilityRole="button" onPress={() => void load()}><Text style={s.meta}>Não foi possível carregar seus dados. Toque para tentar novamente.</Text></Pressable> : null}
    <View style={s.stats}><View style={s.stat}><Text style={s.statLabel}>Hoje</Text><Text style={s.statValue}>{loading || loadError ? '—' : todayCount}</Text><Text style={s.small}>trabalhos</Text></View><View style={s.stat}><Text style={s.statLabel}>Ganhos registrados</Text><Text style={s.statValue}>{loading || loadError ? '—' : money(weekTotal)}</Text><Text style={s.small}>esta semana</Text></View></View>
    <Link href="/trabalhos" style={s.primary}>VER TRABALHOS  →</Link>
    <Text style={s.heading}>Próximo trabalho</Text>
    {loading ? <Text style={s.meta}>Carregando sua agenda...</Text> : loadError ? null : next ?
      <Link href="/agenda" style={s.card}><Text style={s.cardTitle}>{next.title}</Text><Text style={s.meta}>◷ {nextTime}</Text><Text style={s.meta}>⌾ {next.location || 'Local a confirmar'}</Text><Text style={s.meta}>{jobStatus[next.status] || 'Status a confirmar'}</Text><Text style={s.chevron}>›</Text></Link>
      : <Link href="/trabalhos" style={s.card}><Text style={s.cardTitle}>Nenhum trabalho confirmado no momento</Text><Text style={s.meta}>Veja oportunidades disponíveis.</Text><Text style={s.chevron}>›</Text></Link>}
    <Text style={s.heading}>Sua disponibilidade</Text>
    <Link href="/disponibilidade" style={s.availability}><Text style={s.green}>{!loading && !loadError && availableNow ? '●' : '○'}</Text><Text style={s.availText}>{loading || loadError ? 'Consultar disponibilidade' : availableNow ? 'Disponível para novos trabalhos' : 'Atualize seus horários'}</Text><Text style={s.chev}>›</Text></Link>
  </ScrollView><ProfessionalNav/></SafeAreaView>;
}

const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#FFF'},content:{padding:20,gap:9,paddingBottom:24},brandRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},brand:{fontSize:19,fontWeight:'900',color:'#111A35'},purple:{color:'#651FFF'},bell:{fontSize:24,color:'#651FFF'},greeting:{fontSize:25,fontWeight:'900',color:'#111A35',marginTop:5},subtitle:{fontSize:14,color:'#65708A',marginBottom:8},stats:{flexDirection:'row',gap:10},stat:{flex:1,minHeight:88,padding:14,borderWidth:1,borderColor:'#EEF0F5',borderRadius:12,backgroundColor:'#FFF'},statLabel:{fontSize:13,color:'#111A35'},statValue:{fontSize:22,fontWeight:'900',color:'#111A35',marginTop:4},small:{fontSize:12,color:'#65708A'},primary:{backgroundColor:'#651FFF',color:'#FFF',fontWeight:'900',fontSize:15,textAlign:'center',paddingVertical:15,borderRadius:10,marginVertical:5},heading:{fontSize:15,fontWeight:'800',color:'#111A35',marginTop:8},card:{position:'relative',padding:16,borderWidth:1,borderColor:'#E7EAF0',borderRadius:12,backgroundColor:'#FFF'},cardTitle:{fontSize:17,fontWeight:'900',color:'#111A35',marginBottom:6},meta:{fontSize:13,color:'#53617A',marginTop:3},chevron:{position:'absolute',right:14,top:30,fontSize:28,color:'#111A35'},availability:{flexDirection:'row',alignItems:'center',padding:15,borderWidth:1,borderColor:'#E7EAF0',borderRadius:12},green:{color:'#19C763',fontSize:15,marginRight:8},availText:{flex:1,color:'#53617A',fontSize:13},chev:{fontSize:24,color:'#111A35'}});
