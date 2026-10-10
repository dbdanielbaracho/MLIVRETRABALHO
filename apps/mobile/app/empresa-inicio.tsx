import { Link, router, useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { authenticatedTenantHeaders, clearSession, clearTenant } from '../lib/session';
import { apiUrl } from '../lib/api';
import { CompanyNav } from '../components/CompanyNav';

import { loadCompanyDashboard,loadingCompany } from '../lib/company-dashboard';

const statusLabel: Record<string, string> = {
  confirmed: 'Confirmado',
  checked_in: 'Check-in realizado',
  in_progress: 'Trabalhando agora',
  checked_out: 'Check-out realizado'
};

export default function EmpresaInicio() {
  const [data,setData]=useState(loadingCompany);
  const [tenantId,setTenantId]=useState('');
  const [message,setMessage]=useState('');
  const pendingActions=useRef(new Set<string>()),requestId=useRef(0),exiting=useRef(false);
  const [pending,setPending]=useState<string[]>([]),[signingOut,setSigningOut]=useState(false);
  const load=useCallback(async(focusSignal?:AbortSignal)=>{
    const id=++requestId.current;setData(loadingCompany());setTenantId('');
    const controller=new AbortController(),cancel=()=>controller.abort();
    focusSignal?.addEventListener('abort',cancel);if(focusSignal?.aborted)controller.abort();
    const timeout=setTimeout(()=>controller.abort(),15000);
    try{
      const headers=await authenticatedTenantHeaders();
      const next=await loadCompanyDashboard(path=>fetch(apiUrl(path),{headers,signal:controller.signal}));
      if(id===requestId.current&&!focusSignal?.aborted){setData(next);setTenantId(headers['x-tenant-id']??'');}
    }catch{
      if(id===requestId.current&&!focusSignal?.aborted)setData({dashboard:{status:'error'},active:{status:'error'},completed:{status:'error'}});
    }finally{clearTimeout(timeout);focusSignal?.removeEventListener('abort',cancel);}
  },[]);
  useFocusEffect(useCallback(()=>{const controller=new AbortController();void load(controller.signal);return()=>{requestId.current++;controller.abort();setData(loadingCompany());setTenantId('');};},[load]));
  const dashboard=data.dashboard.status==='ready'?data.dashboard.data:null;
  const active=data.active.status==='ready'?data.active.data:[];
  const completed=data.completed.status==='ready'?data.completed.data:[];
  async function action(key:string,path:string,body:object,success:string,reload=false){
    if(pendingActions.current.has(key)||exiting.current||!tenantId)return;
    pendingActions.current.add(key);setPending([...pendingActions.current]);setMessage('');
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
    try{
      const headers=await authenticatedTenantHeaders();
      if(headers['x-tenant-id']!==tenantId){setMessage('A empresa ativa mudou. Atualize o painel antes de tentar novamente.');return;}
      const response=await fetch(apiUrl(path),{method:'POST',headers:{...headers,'content-type':'application/json'},body:JSON.stringify(body),signal:controller.signal});
      if(!response.ok){setMessage('Não foi possível confirmar a ação. Tente novamente.');return;}
      setMessage(success);if(reload)await load();
    }catch{setMessage('Falha de conexão. Não foi possível confirmar a ação. Tente novamente.');}
    finally{clearTimeout(timeout);pendingActions.current.delete(key);setPending([...pendingActions.current]);}
  }
  async function signout(){
    if(exiting.current||pendingActions.current.size)return;exiting.current=true;setSigningOut(true);
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
    try{const headers=await authenticatedTenantHeaders();await fetch(apiUrl('/auth/signout'),{method:'POST',headers,signal:controller.signal});}
    catch{ /* Local credentials are cleared even offline. */ }
    finally{clearTimeout(timeout);await Promise.all([clearSession(),clearTenant()]);router.replace('/');}
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
        <Text style={s.brand}>MLIVRE<Text style={s.purple}>TRABALHO</Text></Text><Text style={s.title}>Painel da empresa</Text><Text style={s.subtitle}>Resumo da sua operação</Text>
        {[data.dashboard,data.active,data.completed].some(section=>section.status==='error') ? <Pressable accessibilityRole="button" onPress={()=>void load()}><Text>Falha ao carregar parte do painel. Toque para tentar novamente.</Text></Pressable> : null}
        <View style={s.summaryCard}>
          <Text style={s.summaryLabel}>TRABALHOS ABERTOS</Text>
          <Text style={s.summaryValue}>{dashboard?.openJobs ?? '—'}</Text>
          <Text style={s.summaryText}>{dashboard ? `${dashboard.confirmedWorkers} confirmados · ${dashboard.activeWorkers} trabalhando agora`  : data.dashboard.status==='loading'?'Carregando sua operação…':'Resumo indisponível.'}</Text>
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
        {data.active.status==='loading'?<Text>Carregando trabalhos ativos…</Text>:data.active.status==='error'?<Text>Não foi possível carregar trabalhos ativos.</Text>:active.length===0?<Text>Nenhum profissional confirmado ou trabalhando agora.</Text>:null}
        {active.map(item => (
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
        {message ? <Text accessibilityLiveRegion="polite">{message}</Text> : null}
        {data.completed.status==='loading'?<Text>Carregando trabalhos concluídos…</Text>:data.completed.status==='error'?<Text>Não foi possível carregar trabalhos concluídos.</Text>:completed.length===0?<Text>Nenhum trabalho concluído.</Text>:null}
        {completed.map(item => (
          <View key={item.id} style={s.card}>
            <Text style={s.bold}>{item.professionalName}</Text>
            <Text>{item.title}</Text>
            <Text>{item.location ?? 'Local não informado'}</Text>
            <Text>{item.ratingScore ? `Sua avaliação: ${item.ratingScore} ★` : 'Ainda não avaliado'}</Text>
            <View style={s.ratingRow}>
              {[1, 2, 3, 4, 5].map(score => (
                <Pressable key={score} style={s.ratingButton} accessibilityRole="button" disabled={!tenantId||pending.includes('rating:'+item.id)||signingOut} accessibilityState={{disabled:!tenantId||pending.includes('rating:'+item.id)||signingOut,busy:pending.includes('rating:'+item.id)}} onPress={()=>void action('rating:'+item.id,'/assignments/'+item.id+'/rating',{score},'Avaliação salva.',true)}>
                  <Text style={s.bold}>{score} ★</Text>
                </Pressable>
              ))}
            </View>
            <Pressable style={s.preferredButton} accessibilityRole="button" disabled={!tenantId||pending.includes('preferred:'+item.professionalId)||signingOut} accessibilityState={{disabled:!tenantId||pending.includes('preferred:'+item.professionalId)||signingOut,busy:pending.includes('preferred:'+item.professionalId)}} onPress={()=>void action('preferred:'+item.professionalId,'/company/talent-pools',{professionalId:item.professionalId,pool:'preferred'},'Profissional adicionado aos preferidos.')}>
              <Text style={s.bold}>Adicionar aos preferidos</Text>
            </Pressable>
          </View>
        ))}
        <Pressable style={s.signout} accessibilityRole="button" disabled={signingOut||pending.length>0} accessibilityState={{disabled:signingOut||pending.length>0,busy:signingOut}} onPress={() => void signout()}>
          <Text style={s.bold}>{signingOut?'Saindo…':'Sair da conta'}</Text>
        </Pressable>
      </ScrollView><CompanyNav/>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 20, gap: 12, paddingBottom: 24 },
  eyebrow: { fontSize: 13, fontWeight: '800', color: '#651FFF', letterSpacing: 0.8 }, brand:{fontSize:19,fontWeight:'900',color:'#111A35'},purple:{color:'#651FFF'},
  title: { fontSize: 30, fontWeight: '800', color: '#111A35' },
  subtitle: { fontSize: 16, lineHeight: 23, color: '#62616B' },
  summaryCard: { backgroundColor: '#651FFF', borderRadius: 20, padding: 20, gap: 6, marginVertical: 4 },
  summaryLabel: { color: '#EDE8FF', fontSize: 12, fontWeight: '800', letterSpacing: 0.7 },
  summaryValue: { color: '#FFFFFF', fontSize: 38, fontWeight: '800' },
  summaryText: { color: '#FFFFFF', fontSize: 15, lineHeight: 21 },
  metricsRow: { flexDirection: 'row', gap: 10 },
  metricCard: { flex: 1, borderWidth: 1, borderColor: '#E9E6F2', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14, gap: 4 },
  metricValue: { fontSize: 24, fontWeight: '800', color: '#651FFF' },
  metricLabel: { fontSize: 12, color: '#62616B' },
  primaryActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 4 },
  primaryAction: { backgroundColor: '#651FFF', color: '#FFFFFF', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, fontSize: 16, fontWeight: '800' },
  secondaryAction: { borderWidth: 1, borderColor: '#D8CCFF', backgroundColor: '#F6F3FF', color: '#651FFF', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14, fontSize: 16, fontWeight: '800' },
  heading: { fontSize: 22, fontWeight: '800', marginTop: 10, color: '#111A35' },
  card: { borderWidth: 1, borderColor: '#E9E6F2', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 18, gap: 6 },
  value: { fontSize: 28, fontWeight: '800', color: '#651FFF' },
  bold: { fontWeight: '800' },
  inlineButton: { backgroundColor: '#F6F3FF', borderRadius: 10, padding: 10, alignItems: 'center', marginTop: 4 },
  ratingRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  ratingButton: { borderWidth: 1, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 10 },
  preferredButton: { borderWidth: 1, borderColor: '#D8CCFF', backgroundColor: '#F6F3FF', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, marginTop: 6, alignItems: 'center' },
  signout: { padding: 14, alignItems: 'center', marginTop: 10 }
});
