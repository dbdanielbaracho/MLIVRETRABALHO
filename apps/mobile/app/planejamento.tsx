import {useCallback,useRef,useState} from 'react';
import {useFocusEffect} from 'expo-router';
import {Pressable,SafeAreaView,ScrollView,StyleSheet,Text,View} from 'react-native';
import {authenticatedTenantHeaders} from '../lib/session';
import {apiUrl} from '../lib/api';
import {loadPlanner,moneyOrMissing} from '../lib/company-readonly';
import type {PlannerItem,ReadResult} from '../lib/company-readonly';
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


export default function Planejamento(){
 const [result,setResult]=useState<ReadResult<PlannerItem>>({status:'loading'}),[retry,setRetry]=useState(0),generation=useRef(0);
 const items=result.status==='ready'?result.data:[];
 useFocusEffect(useCallback(()=>{
  const version=++generation.current,controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);setResult({status:'loading'});
  void (async()=>{const next=await loadPlanner(async path=>{const headers=await authenticatedTenantHeaders();if(!headers['x-tenant-id'])throw Error('tenant_required');return fetch(apiUrl(path),{headers,signal:controller.signal});});if(version===generation.current)setResult(next);})().finally(()=>clearTimeout(timer));
  return ()=>{++generation.current;clearTimeout(timer);controller.abort();setResult({status:'loading'});};
 },[retry]));
  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>Planejamento</Text>
        <Text>Visão cronológica da operação. Os números mostram fatos já registrados; não estimam headcount nem confirmam profissionais automaticamente.</Text>
        {result.status==='loading'?<Text>Carregando planejamento…</Text>:result.status==='error'?<><Text>Não foi possível carregar o planejamento agora.</Text><Pressable accessibilityRole="button" onPress={()=>setRetry(x=>x+1)}><Text>Tentar novamente</Text></Pressable></>:items.length===0?<Text>Nenhum trabalho planejado.</Text>:null}
        {items.map(item => {
          const noCurrentProfessional = item.confirmedCount === 0 && item.activeCount === 0 && item.completedCount === 0;
          return (
            <View key={item.id} style={s.card}>
              <Text style={s.name}>{item.title}</Text>
              <Text>{item.requiredRole ?? item.title} · {item.workCity ?? item.location ?? 'Local não informado'}</Text>
              <Text>Início: {dateLabel(item.startsAt)}</Text>
              <Text>Fim: {dateLabel(item.endsAt)}</Text>
              <Text>Valor: {moneyOrMissing(item.payCents)}</Text>
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
