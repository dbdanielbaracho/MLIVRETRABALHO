import {useCallback,useRef,useState} from 'react';
import {useFocusEffect} from 'expo-router';
import {Pressable,SafeAreaView,ScrollView,StyleSheet,Text,View} from 'react-native';
import {authenticatedTenantHeaders} from '../lib/session';
import {apiUrl} from '../lib/api';
import {loadingSafety,loadSafety,sameSafetyContext,changeCase,changeAppeal} from '../lib/company-safety';
import type {Request,SafetyData,CaseStatus,AppealStatus} from '../lib/company-safety';
const categoryLabel: Record<string, string> = {
  unsafe_work: 'Trabalho inseguro',
  harassment: 'Assédio',
  violence: 'Violência',
  discrimination: 'Discriminação',
  fraud: 'Fraude',
  other: 'Outro'
};

const statusLabel: Record<string, string> = {
  open: 'Aberto',
  reviewing: 'Em análise',
  resolved: 'Resolvido',
  dismissed: 'Encerrado sem ação'
};

const appealStatusLabel: Record<string, string> = {
  submitted: 'Recebido',
  reviewing: 'Em revisão',
  upheld: 'Decisão mantida',
  modified: 'Decisão modificada',
  reversed: 'Decisão revertida'
};


export default function CasosSeguranca(){
 const [data,setData]=useState(loadingSafety),[message,setMessage]=useState(''),[busy,setBusy]=useState(false);
 const generation=useRef(0),sequence=useRef(0),pending=useRef(false),snapshot=useRef<{headers:Record<string,string>;data:SafetyData}|null>(null),controllers=useRef(new Set<AbortController>());
 const items=data.cases.status==='ready'?data.cases.data:[],appeals=data.appeals.status==='ready'?data.appeals.data:[];
 function operation(){const controller=new AbortController();controllers.current.add(controller);const timer=setTimeout(()=>controller.abort(),15000);return {controller,finish:()=>{clearTimeout(timer);controllers.current.delete(controller);}};}
 function requestWith(headers:Record<string,string>,signal:AbortSignal):Request{return async(path,body)=>fetch(apiUrl(path),{method:body?'POST':'GET',headers:{...headers,...(body?{'content-type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{}),signal});}
 async function load(manual=false,expected?:Record<string,string>){
  if(manual&&pending.current)return;const version=generation.current,seq=++sequence.current,op=operation();snapshot.current=null;setData(loadingSafety());
  try{const headers=await authenticatedTenantHeaders();const result=await loadSafety(async(path,body)=>{if(!headers['x-tenant-id']||(expected&&!sameSafetyContext(headers,expected)))throw Error('company_context_changed');return requestWith(headers,op.controller.signal)(path,body);});
   if(version===generation.current&&seq===sequence.current){setData(result);snapshot.current=result.cases.status==='ready'||result.appeals.status==='ready'?{headers,data:result}:null;if(manual)setMessage('');}
  }catch{if(version===generation.current&&seq===sequence.current)setData({cases:{status:'error'},appeals:{status:'error'}});}
  finally{op.finish();}
 }
 useFocusEffect(useCallback(()=>{++generation.current;setMessage('');void load();return ()=>{++generation.current;++sequence.current;for(const c of controllers.current)c.abort();controllers.current.clear();snapshot.current=null;pending.current=false;setBusy(false);setData(loadingSafety());};},[]));
 async function update(id:string,status:CaseStatus|AppealStatus,appeal:boolean){
  const displayed=snapshot.current;if(pending.current||!displayed)return;const section=appeal?displayed.data.appeals:displayed.data.cases;if(section.status!=='ready'||!section.data.some(x=>x.id===id))return;
  pending.current=true;setBusy(true);const version=generation.current,op=operation();
  try{const headers=await authenticatedTenantHeaders();if(!sameSafetyContext(headers,displayed.headers)){if(version===generation.current)setMessage('A empresa ou sessão mudou. Atualize relatos e pedidos.');return;}
   const request=requestWith(headers,op.controller.signal),ok=appeal?await changeAppeal(request,id,status as AppealStatus):await changeCase(request,id,status as CaseStatus);
   if(version===generation.current){setMessage(ok?(appeal?'Recurso atualizado com trilha de auditoria.':'Status do relato atualizado.'):'Não foi possível confirmar o resultado. Atualize relatos e pedidos para conferir.');await load(false,displayed.headers);}
  }catch{if(version===generation.current)setMessage('Falha de conexão. Atualize relatos e pedidos para conferir o resultado.');}
  finally{op.finish();if(version===generation.current){pending.current=false;setBusy(false);}}
 }
 const setStatus=(id:string,status:CaseStatus)=>update(id,status,false);
 const setAppealStatus=(id:string,status:AppealStatus)=>update(id,status,true);
  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>Relatos de segurança</Text>
        <Text>Atualizar o status organiza a análise do relato. Isto não aplica suspensão, bloqueio ou penalidade automática.</Text>
        <Pressable disabled={busy} accessibilityRole="button" onPress={()=>void load(true)}><Text style={s.bold}>Atualizar relatos e pedidos</Text></Pressable>
        {data.cases.status==='loading'?<Text>Carregando relatos…</Text>:data.cases.status==='error'?<Text>{data.cases.forbidden?'Somente proprietário ou administrador pode analisar relatos.':'Não foi possível carregar relatos. Tente atualizar.'}</Text>:items.length===0?<Text>Nenhum relato recebido.</Text>:null}
        {message ? <Text accessibilityLiveRegion="polite">{message}</Text> : null}
        {items.map(item => (
          <View key={item.id} style={s.card}>
            <Text style={s.name}>{categoryLabel[item.category] ?? item.category}</Text>
            <Text>{item.description}</Text>
            <Text style={s.bold}>Status: {statusLabel[item.status] ?? item.status}</Text>
            <Text>Recebido: {new Date(item.createdAt).toLocaleString()}</Text>
            {item.status !== 'resolved' && item.status !== 'dismissed' ? (
              <View style={s.actions}>
                {item.status !== 'reviewing' ? (
                  <Pressable style={s.button} disabled={busy} accessibilityRole="button" accessibilityState={{disabled:busy,busy}} onPress={() => void setStatus(item.id, 'reviewing')}>
                    <Text style={s.bold}>Marcar em análise</Text>
                  </Pressable>
                ) : null}
                <Pressable style={s.button} disabled={busy} accessibilityRole="button" accessibilityState={{disabled:busy,busy}} onPress={() => void setStatus(item.id, 'resolved')}>
                  <Text style={s.bold}>Marcar resolvido</Text>
                </Pressable>
                <Pressable style={s.button} disabled={busy} accessibilityRole="button" accessibilityState={{disabled:busy,busy}} onPress={() => void setStatus(item.id, 'dismissed')}>
                  <Text style={s.bold}>Encerrar sem ação</Text>
                </Pressable>
              </View>
            ) : null}
          </View>
        ))}

        <Text style={s.heading}>Pedidos de revisão</Text>
        <Text>O contraditório é analisado por uma pessoa. A decisão do recurso não altera score, acesso ou pagamentos automaticamente.</Text>
        {data.appeals.status==='loading'?<Text>Carregando pedidos de revisão…</Text>:data.appeals.status==='error'?<Text>{data.appeals.forbidden?'Somente proprietário ou administrador pode analisar pedidos.':'Não foi possível carregar pedidos. Tente atualizar.'}</Text>:appeals.length === 0 ? <Text>Nenhum pedido de revisão recebido.</Text> : appeals.map(item => {
          const terminal = ['upheld', 'modified', 'reversed'].includes(item.status);
          return (
            <View key={item.id} style={s.card}>
              <Text style={s.name}>Revisão de caso</Text>
              <Text>{item.reason}</Text>
              <Text style={s.bold}>Status: {appealStatusLabel[item.status] ?? item.status}</Text>
              <Text>Recebido: {new Date(item.createdAt).toLocaleString()}</Text>
              {!terminal ? (
                <View style={s.actions}>
                  {item.status === 'submitted' ? (
                    <Pressable style={s.button} disabled={busy} accessibilityRole="button" accessibilityState={{disabled:busy,busy}} onPress={() => void setAppealStatus(item.id, 'reviewing')}>
                      <Text style={s.bold}>Iniciar revisão humana</Text>
                    </Pressable>
                  ) : null}
                  <Pressable style={s.button} disabled={busy} accessibilityRole="button" accessibilityState={{disabled:busy,busy}} onPress={() => void setAppealStatus(item.id, 'upheld')}>
                    <Text style={s.bold}>Manter decisão</Text>
                  </Pressable>
                  <Pressable style={s.button} disabled={busy} accessibilityRole="button" accessibilityState={{disabled:busy,busy}} onPress={() => void setAppealStatus(item.id, 'modified')}>
                    <Text style={s.bold}>Modificar decisão</Text>
                  </Pressable>
                  <Pressable style={s.button} disabled={busy} accessibilityRole="button" accessibilityState={{disabled:busy,busy}} onPress={() => void setAppealStatus(item.id, 'reversed')}>
                    <Text style={s.bold}>Reverter decisão</Text>
                  </Pressable>
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
  content: { padding: 24, gap: 12 },
  title: { fontSize: 30, fontWeight: '800' },
  heading: { fontSize: 22, fontWeight: '800', marginTop: 10 },
  card: { borderWidth: 1, borderRadius: 14, padding: 16, gap: 7 },
  name: { fontSize: 19, fontWeight: '800' },
  bold: { fontWeight: '800' },
  actions: { gap: 8, marginTop: 4 },
  button: { borderWidth: 1, borderRadius: 10, padding: 11, alignItems: 'center' }
});
