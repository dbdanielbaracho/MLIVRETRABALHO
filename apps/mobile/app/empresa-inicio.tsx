import { Link, router, useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { authenticatedTenantHeaders, clearSessionForAuthorization } from '../lib/session';
import { apiUrl } from '../lib/api';
import { CompanyNav } from '../components/CompanyNav';

import { loadCompanyDashboard,loadingCompany } from '../lib/company-dashboard';
import {sameCompanyContext,rateCompletedAssignment,preferProfessional} from '../lib/company-dashboard-actions';

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
  const pendingActions=useRef(new Set<string>()),requestId=useRef(0),exiting=useRef(false),epoch=useRef(0),controllers=useRef(new Set<AbortController>()),displayedContext=useRef<Record<string,string>|null>(null);
  const [pending,setPending]=useState<string[]>([]),[signingOut,setSigningOut]=useState(false);
  function operation(onDeadline?:()=>void){const controller=new AbortController();controllers.current.add(controller);const timer=setTimeout(()=>{controller.abort();onDeadline?.();},15000);return {controller,finish:()=>{clearTimeout(timer);controllers.current.delete(controller);}};}
  const load=useCallback(async()=>{
    const id=++requestId.current,version=epoch.current,op=operation(()=>{if(id===requestId.current&&version===epoch.current){displayedContext.current=null;setTenantId('');setData({dashboard:{status:'error'},active:{status:'error'},completed:{status:'error'}});}});displayedContext.current=null;setData(loadingCompany());setTenantId('');
    try{
      const headers=await authenticatedTenantHeaders();
      if(id!==requestId.current||version!==epoch.current||op.controller.signal.aborted)return;
      if(!sameCompanyContext(headers,headers))throw Error('company_context_missing');
      const next=await loadCompanyDashboard(path=>fetch(apiUrl(path),{headers,signal:op.controller.signal}),()=>id===requestId.current&&version===epoch.current&&!op.controller.signal.aborted);
      const current=await authenticatedTenantHeaders();
      if(id===requestId.current&&version===epoch.current){
        if(!sameCompanyContext(current,headers)){setData({dashboard:{status:'error'},active:{status:'error'},completed:{status:'error'}});setMessage('A empresa ou sessão mudou. Atualize o painel.');return;}
        if(op.controller.signal.aborted){setData({dashboard:{status:'error'},active:{status:'error'},completed:{status:'error'}});return;}
        displayedContext.current=headers;setData(next);setTenantId(headers['x-tenant-id']);
      }
    }catch{if(id===requestId.current&&version===epoch.current)setData({dashboard:{status:'error'},active:{status:'error'},completed:{status:'error'}});}
    finally{op.finish();}
  },[]);
  useFocusEffect(useCallback(()=>{++epoch.current;setMessage('');void load();return()=>{++epoch.current;++requestId.current;for(const c of controllers.current)c.abort();controllers.current.clear();displayedContext.current=null;pendingActions.current.clear();exiting.current=false;setPending([]);setSigningOut(false);setData(loadingCompany());setTenantId('');};},[load]));
  const dashboard=data.dashboard.status==='ready'?data.dashboard.data:null;
  const active=data.active.status==='ready'?data.active.data:[];
  const completed=data.completed.status==='ready'?data.completed.data:[];
  async function action(kind:'rating'|'preferred',id:string,score?:number){
    const key=kind+':'+id,displayed=displayedContext.current;
    if(pendingActions.current.has(key)||exiting.current||!displayed||!tenantId||!completed.some(item=>kind==='rating'?item.id===id:item.professionalId===id))return;
    pendingActions.current.add(key);setPending([...pendingActions.current]);setMessage('');
    const version=epoch.current,op=operation();
    try{
      const headers=await authenticatedTenantHeaders();if(version!==epoch.current||op.controller.signal.aborted)return;
      if(!sameCompanyContext(headers,displayed)){setMessage('A empresa ou sessão mudou. Atualize o painel antes de tentar novamente.');return;}
      const request=async(path:string,body:Record<string,string|number>)=>fetch(apiUrl(path),{method:'POST',headers:{...headers,'content-type':'application/json'},body:JSON.stringify(body),signal:op.controller.signal});
      const isCurrent=()=>version===epoch.current&&!op.controller.signal.aborted;
      const result=kind==='rating'?await rateCompletedAssignment(request,id,score??NaN,isCurrent):await preferProfessional(request,id,isCurrent);
      const current=await authenticatedTenantHeaders();if(version!==epoch.current)return;
      if(!sameCompanyContext(current,displayed)){setMessage('A empresa ou sessão mudou. Atualize para conferir o resultado.');return;}
      if(op.controller.signal.aborted){setMessage('Não foi possível confirmar a ação. Confira os dados antes de tentar novamente.');return;}
      if(result.status==='confirmed'){setMessage(kind==='rating'?'Avaliação salva.':'Profissional adicionado aos preferidos.');if(kind==='rating')await load();}
      else setMessage(result.status==='rejected'?'A ação não foi aceita. Atualize os dados antes de tentar novamente.':kind==='rating'?'Não foi possível confirmar a avaliação. Atualize o painel para conferir.':'Não foi possível confirmar a inclusão. Confira seus preferidos em Talentos.');
    }catch{if(version===epoch.current)setMessage('Não foi possível confirmar a ação. Confira os dados antes de tentar novamente.');}
    finally{op.finish();if(version===epoch.current){pendingActions.current.delete(key);setPending([...pendingActions.current]);}}
  }
  async function signout(){
    if(exiting.current||pendingActions.current.size)return;exiting.current=true;setSigningOut(true);
    const version=epoch.current,displayed=displayedContext.current,op=operation();let authorization:string|undefined,started=false;
    try{const headers=await authenticatedTenantHeaders();if(version!==epoch.current||op.controller.signal.aborted)return;if(displayed&&!sameCompanyContext(headers,displayed)){setMessage('A empresa ou sessão mudou. Atualize o painel antes de sair.');return;}authorization=headers.Authorization;started=true;await fetch(apiUrl('/auth/signout'),{method:'POST',headers,signal:op.controller.signal});}
    catch{ /* The requested session can still be cleared locally when offline. */ }
    finally{op.finish();if(started){const result=await clearSessionForAuthorization(authorization);if(version===epoch.current){if(result==='cleared')router.replace('/');else setMessage(result==='stale'?'A sessão mudou. A nova conta foi preservada.':'Não foi possível confirmar a saída neste aparelho. Tente sair novamente.');}}if(version===epoch.current){exiting.current=false;setSigningOut(false);}}
  }
  async function openConversation(assignmentId: string) {
    const displayed=displayedContext.current,version=epoch.current;
    if (!tenantId||!displayed||!active.some(item=>item.id===assignmentId)) {
      setMessage('Não foi possível identificar a empresa ativa.');
      return;
    }
    const current=await authenticatedTenantHeaders();if(version!==epoch.current)return;
    if(!sameCompanyContext(current,displayed)){setMessage('A empresa ou sessão mudou. Atualize o painel antes de abrir a conversa.');return;}
    router.push({ pathname: '/conversa', params: { assignmentId, tenantId } });
  }

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.brand}>MLIVRE<Text style={s.purple}>TRABALHO</Text></Text><Text style={s.title}>Painel da empresa</Text><Text style={s.subtitle}>Resumo da sua operação</Text>
        <Pressable accessibilityRole="button" disabled={signingOut||pending.length>0} onPress={()=>void load()}><Text>{[data.dashboard,data.active,data.completed].some(section=>section.status==='error')?'Falha ao carregar parte do painel. Toque para tentar novamente.':'Atualizar painel'}</Text></Pressable>
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
            <Pressable style={s.inlineButton} onPress={() => void openConversation(item.id)}>
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
                <Pressable key={score} style={s.ratingButton} accessibilityRole="button" disabled={!tenantId||pending.includes('rating:'+item.id)||signingOut} accessibilityState={{disabled:!tenantId||pending.includes('rating:'+item.id)||signingOut,busy:pending.includes('rating:'+item.id)}} onPress={()=>void action('rating',item.id,score)}>
                  <Text style={s.bold}>{score} ★</Text>
                </Pressable>
              ))}
            </View>
            <Pressable style={s.preferredButton} accessibilityRole="button" disabled={!tenantId||pending.includes('preferred:'+item.professionalId)||signingOut} accessibilityState={{disabled:!tenantId||pending.includes('preferred:'+item.professionalId)||signingOut,busy:pending.includes('preferred:'+item.professionalId)}} onPress={()=>void action('preferred',item.professionalId)}>
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
