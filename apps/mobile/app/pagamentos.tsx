import {useCallback,useRef,useState} from 'react';
import {useFocusEffect} from 'expo-router';
import {Pressable,SafeAreaView,ScrollView,StyleSheet,Text,View} from 'react-native';
import {authenticatedTenantHeaders} from '../lib/session';
import {apiUrl} from '../lib/api';
import {loadReconciliation,moneyOrMissing} from '../lib/company-readonly';
import type {Reconciliation,ReadResult} from '../lib/company-readonly';
const statusLabel: Record<Reconciliation['reconciliationStatus'], string> = {
  no_earning: 'Sem lançamento de ganho',
  pending: 'Pendente',
  reconciled: 'Reconciliado',
  overpaid: 'Pago acima do devido'
};


export default function Pagamentos(){
 const [result,setResult]=useState<ReadResult<Reconciliation>>({status:'loading'}),[retry,setRetry]=useState(0),generation=useRef(0);
 const items=result.status==='ready'?result.data:[];
 useFocusEffect(useCallback(()=>{
  const version=++generation.current,controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);setResult({status:'loading'});
  void (async()=>{const next=await loadReconciliation(async path=>{const headers=await authenticatedTenantHeaders();if(!headers['x-tenant-id'])throw Error('tenant_required');return fetch(apiUrl(path),{headers,signal:controller.signal});});if(version===generation.current)setResult(next);})().finally(()=>clearTimeout(timer));
  return ()=>{++generation.current;clearTimeout(timer);controller.abort();setResult({status:'loading'});};
 },[retry]));
  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>Pagamentos</Text>
        <Text>Visão somente leitura. Os fatos financeiros são recebidos pelo backend/provedor e não podem ser criados manualmente nesta tela.</Text>
        {result.status==='loading'?<Text>Carregando reconciliação…</Text>:result.status==='error'?<><Text>{result.forbidden?'Somente proprietário ou administrador pode ver a reconciliação.':'Não foi possível carregar a reconciliação.'}</Text><Pressable accessibilityRole="button" onPress={()=>setRetry(x=>x+1)}><Text>Tentar novamente</Text></Pressable></>:items.length===0?<Text>Nenhum trabalho financeiro para reconciliar.</Text>:null}
        {items.map(item => (
          <View key={item.assignmentId} style={s.card}>
            <Text style={s.name}>{item.professionalName}</Text>
            <Text style={s.bold}>{item.title}</Text>
            <Text>A pagar: {moneyOrMissing(item.payableCents)}</Text>
            <Text>Capturado: {moneyOrMissing(item.capturedCents)}</Text>
            <Text>Reembolsado: {moneyOrMissing(item.refundedCents)}</Text>
            <Text>Pago ao profissional: {moneyOrMissing(item.paidOutCents)}</Text>
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
