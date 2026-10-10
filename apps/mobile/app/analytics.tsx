import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { authenticatedTenantHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';
import {runForSession} from '../lib/session-context';

import { loadAnalytics, percentOrMissing as percent } from '../lib/company-analytics';
import type { AnalyticsResult } from '../lib/company-analytics';

export default function Analytics() {
  const [state,setState]=useState<AnalyticsResult>({status:'loading'});
  const sequence=useRef(0),controllers=useRef(new Set<AbortController>());
  const data=state.status==='ready'?state.data:null;
  async function load(signal?:AbortSignal) {
    const id=++sequence.current,controller=new AbortController();
    controllers.current.add(controller);setState({status:'loading'});
    const timer=setTimeout(()=>{controller.abort();if(id===sequence.current&&!signal?.aborted)setState({status:'error'});},15000),abort=()=>controller.abort();
    signal?.addEventListener('abort',abort);if(signal?.aborted)controller.abort();
    try {
      const origin=await authenticatedTenantHeaders();
      if(id!==sequence.current||controller.signal.aborted||signal?.aborted)return;
      const result=await runForSession(authenticatedTenantHeaders,headers=>loadAnalytics(path=>fetch(apiUrl(path),{headers,signal:controller.signal})),()=>id===sequence.current&&!controller.signal.aborted&&!signal?.aborted,origin.Authorization,origin['x-tenant-id']??'');
      if(id===sequence.current&&!signal?.aborted)setState(!controller.signal.aborted&&result.status==='ready'?result.data:{status:'error'});
    } catch {if(id===sequence.current&&!signal?.aborted)setState({status:'error'});} finally {
      clearTimeout(timer);controllers.current.delete(controller);signal?.removeEventListener('abort',abort);
    }
  }
  useFocusEffect(useCallback(()=>{
    const controller=new AbortController();void load(controller.signal);
    return ()=>{++sequence.current;controller.abort();for(const pending of controllers.current)pending.abort();controllers.current.clear();};
  },[]));

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>Indicadores</Text>
        <Text>Visão factual da operação. As taxas abaixo usam somente eventos já registrados e não são previsões.</Text>
        <Pressable accessibilityRole="button" onPress={()=>void load()}><Text>Atualizar indicadores</Text></Pressable>
        {state.status==='loading'?<Text>Carregando indicadores…</Text>:null}
        {state.status==='error'?<Text>{state.forbidden?'Seu acesso não permite consultar indicadores desta empresa.':'Não foi possível carregar indicadores. Use Atualizar indicadores para tentar novamente.'}</Text>:null}
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
