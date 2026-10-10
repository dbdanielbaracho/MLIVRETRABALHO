import {useCallback,useMemo,useRef,useState} from 'react';
import {useFocusEffect,useLocalSearchParams} from 'expo-router';
import {Pressable,SafeAreaView,ScrollView,StyleSheet,Text,TextInput,View} from 'react-native';
import {ProfessionalNav} from '../components/ProfessionalNav';
import {authHeaders} from '../lib/session';
import {apiUrl} from '../lib/api';
import {routeId} from '../lib/conversation';
import {loadingSafety,loadSafety,safetyKey,canRequestReview,sameSafetySession,submitSafetyCase,submitSafetyAppeal} from '../lib/professional-safety';
import type {Assignment,SafetyCase,SafetyData,Request} from '../lib/professional-safety';
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


export default function Seguranca(){
 const params=useLocalSearchParams<{assignmentId?:string|string[];tenantId?:string|string[]}>();
 const paramAssignment=routeId(params.assignmentId),paramTenant=routeId(params.tenantId);
 const [data,setData]=useState(loadingSafety),[selectedAssignmentId,setSelectedAssignmentId]=useState(''),[selectedTenantId,setSelectedTenantId]=useState(''),[description,setDescription]=useState(''),[appealCaseId,setAppealCaseId]=useState(''),[appealReason,setAppealReason]=useState(''),[message,setMessage]=useState(''),[category,setCategory]=useState<(typeof categories)[number][0]>('unsafe_work'),[busy,setBusy]=useState(false);
 const draftAuthorization=useRef<string|null>(null),generation=useRef(0),sequence=useRef(0),pending=useRef(false),controllers=useRef(new Set<AbortController>()),snapshot=useRef<{headers:Record<string,string>;data:SafetyData}|null>(null);
 const assignments=data.assignments.status==='ready'?data.assignments.data:[],cases=data.cases.status==='ready'?data.cases.data:[],appeals=data.appeals.status==='ready'?data.appeals.data:[];
 const appealByCase=useMemo(()=>new Map(appeals.map(item=>[safetyKey(item.tenantId,item.safetyCaseId),item])),[appeals]);
 function operation(onDeadline?:()=>void){const controller=new AbortController();controllers.current.add(controller);const timer=setTimeout(()=>{controller.abort();onDeadline?.();},15000);return {controller,finish:()=>{clearTimeout(timer);controllers.current.delete(controller);}};}
 function requestWith(headers:Record<string,string>,signal:AbortSignal):Request{return(path,tenantId,body)=>fetch(apiUrl(path),{method:body?'POST':'GET',headers:{...headers,...(tenantId?{'x-tenant-id':tenantId}:{}),...(body?{'content-type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{}),signal});}
 async function load(manual=false,expected?:Record<string,string>){
  if(manual&&pending.current)return;const version=generation.current,seq=++sequence.current,op=operation(()=>{if(version===generation.current&&seq===sequence.current){snapshot.current=null;setData({assignments:{status:'error'},cases:{status:'error'},appeals:{status:'error'}});}});snapshot.current=null;setData(loadingSafety());
  try{const headers=await authHeaders();if(op.controller.signal.aborted||version!==generation.current||seq!==sequence.current)return;const result=await loadSafety((path,tenantId,body)=>{if(!headers.Authorization||(expected&&!sameSafetySession(headers,expected)))throw Error('session_changed');return requestWith(headers,op.controller.signal)(path,tenantId,body);});
   const current=await authHeaders();if(op.controller.signal.aborted||!sameSafetySession(current,headers))throw Error('session_changed');
   if(version===generation.current&&seq===sequence.current){if(draftAuthorization.current&&draftAuthorization.current!==headers.Authorization){setDescription('');setAppealReason('');setAppealCaseId('');setSelectedAssignmentId('');setSelectedTenantId('');}draftAuthorization.current=headers.Authorization;setData(result);snapshot.current={headers,data:result};if(result.assignments.status==='ready'&&paramAssignment&&paramTenant&&result.assignments.data.some(x=>x.id===paramAssignment&&x.tenantId===paramTenant)){setSelectedAssignmentId(paramAssignment);setSelectedTenantId(paramTenant);}if(manual)setMessage('');}
  }catch{if(version===generation.current&&seq===sequence.current)setData({assignments:{status:'error'},cases:{status:'error'},appeals:{status:'error'}});}
  finally{op.finish();}
 }
 useFocusEffect(useCallback(()=>{++generation.current;setSelectedAssignmentId('');setSelectedTenantId('');setAppealCaseId('');setAppealReason('');setDescription('');setMessage('');void load();return()=>{++generation.current;++sequence.current;for(const c of controllers.current)c.abort();controllers.current.clear();snapshot.current=null;pending.current=false;setBusy(false);setData(loadingSafety());};},[paramAssignment,paramTenant]));
 function selectAssignment(assignment:Assignment){if(pending.current)return;setSelectedAssignmentId(assignment.id);setSelectedTenantId(assignment.tenantId);setMessage('');}
 async function submit(item?:SafetyCase){
  const displayed=snapshot.current;if(pending.current||!displayed)return;
  const text=(item?appealReason:description).trim();if(!text||text.length>4000){setMessage(item?'Explique o pedido em até 4000 caracteres.':'Descreva o relato em até 4000 caracteres.');return;}
  const assignment=displayed.data.assignments.status==='ready'?displayed.data.assignments.data.find(x=>x.id===selectedAssignmentId&&x.tenantId===selectedTenantId):undefined;
  if(item){if(displayed.data.cases.status!=='ready'||!displayed.data.cases.data.some(x=>x.id===item.id&&x.tenantId===item.tenantId)||!canRequestReview(item,displayed.data.appeals))return;}
  else if(!assignment){setMessage('Escolha um trabalho válido após atualizar a lista.');return;}
  pending.current=true;setBusy(true);const version=generation.current,op=operation();
  try{const headers=await authHeaders();if(version!==generation.current||op.controller.signal.aborted)return;if(!sameSafetySession(headers,displayed.headers)){setMessage('A sessão mudou. Atualize os trabalhos, relatos e pedidos.');return;}
   const request=requestWith(headers,op.controller.signal),result=item?await submitSafetyAppeal(request,item,text):await submitSafetyCase(request,assignment!,category,text);
   const current=await authHeaders();if(op.controller.signal.aborted||!sameSafetySession(current,displayed.headers))throw Error('session_changed');
   if(version===generation.current){setMessage(result.status==='created'?(item?'Pedido de revisão registrado para análise humana.':'Relato enviado para análise.'):result.status==='existing'?'Já existe um pedido de revisão. Consulte o motivo e status registrados.':result.status==='rejected'?'Não foi possível registrar. Seu texto foi mantido.':'O registro não foi confirmado. Confira seus relatos e pedidos antes de tentar novamente.');
    if(result.status==='created'||result.status==='existing'){if(item){setAppealCaseId('');if(result.status==='created')setAppealReason('');}else setDescription('');}await load(false,displayed.headers);}
  }catch{if(version===generation.current)setMessage('Falha de conexão. Confira seus relatos e pedidos antes de tentar novamente.');}
  finally{op.finish();if(version===generation.current){pending.current=false;setBusy(false);}}
 }
 const send=()=>submit();
 const sendAppeal=(item:SafetyCase)=>submit(item);
  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <ProfessionalNav />
        <Text style={s.title}>Segurança</Text>
        <Text>Relate uma situação relacionada a um trabalho confirmado. O registro não aplica penalidade automaticamente.</Text>
        <Text style={s.alert}>Se houver risco imediato à vida ou à integridade física, procure primeiro o serviço de emergência local. Este canal não substitui atendimento de emergência.</Text>

        <Pressable disabled={busy} accessibilityRole="button" onPress={()=>void load(true)}><Text style={s.bold}>Atualizar trabalhos, relatos e pedidos</Text></Pressable>
        <Text style={s.heading}>Escolha o trabalho</Text>
        {data.assignments.status==='loading'?<Text>Carregando trabalhos…</Text>:data.assignments.status==='error'?<Text>Não foi possível carregar trabalhos. Tente atualizar.</Text>:null}
        {data.assignments.status==='ready'&&assignments.length === 0 ? <Text>Nenhum trabalho disponível para vincular ao relato.</Text> : assignments.map(assignment => (
          <Pressable
            disabled={busy} accessibilityRole="button"
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
            <Pressable disabled={busy} accessibilityRole="button" key={value} style={[s.choice, category === value && s.selected]} onPress={() => setCategory(value)}>
              <Text style={category === value ? s.bold : undefined}>{label}</Text>
            </Pressable>
          ))}
        </View>

        <TextInput
          style={s.input}
          editable={!busy}
          multiline
          placeholder="Descreva o que aconteceu"
          value={description}
          onChangeText={setDescription}
        />
        <Pressable style={s.button} disabled={busy||data.assignments.status!=='ready'} accessibilityRole="button" onPress={() => void send()}><Text style={s.bold}>Enviar relato</Text></Pressable>
        {message ? <Text accessibilityLiveRegion="polite">{message}</Text> : null}

        <Text style={s.heading}>Casos relacionados a mim</Text>
        <Text>Você vê relatos que enviou e também casos ligados ao seu trabalho. Se discordar de uma decisão ou precisar registrar seu contraditório, peça revisão humana.</Text>
        {data.cases.status==='loading'?<Text>Carregando relatos…</Text>:data.cases.status==='error'?<Text>Não foi possível carregar relatos. Tente atualizar.</Text>:cases.length === 0 ? <Text>Nenhum caso relacionado a você.</Text> : cases.map(item => {
          const itemKey=safetyKey(item.tenantId,item.id);
          const appeal = appealByCase.get(itemKey);
          const canReview = canRequestReview(item,data.appeals);
          return (
            <View key={`${item.tenantId}:${item.id}`} style={s.card}>
              <Text style={s.bold}>{categories.find(([value]) => value === item.category)?.[1] ?? item.category}</Text>
              <Text>{item.description}</Text>
              <Text>Status do caso: {item.status}</Text>
              <Text>{item.reportedByMe ? 'Relato enviado por você.' : 'Caso relacionado ao seu trabalho.'}</Text>
              {data.appeals.status==='loading'?<Text>Carregando pedidos…</Text>:data.appeals.status==='error'?<Text>Não foi possível carregar pedidos de revisão. Tente atualizar.</Text>:null}
              {appeal ? (
                <View style={s.reviewBox}>
                  <Text style={s.bold}>{appealStatusLabel[appeal.status] ?? appeal.status}</Text>
                  <Text>{appeal.reason}</Text>
                  <Text>A revisão é humana e não altera score ou acesso automaticamente.</Text>
                </View>
              ) : null}
              {canReview && appealCaseId !== itemKey ? (
                <Pressable style={s.button} disabled={busy} accessibilityRole="button" onPress={() => { setAppealCaseId(itemKey); setAppealReason(''); setMessage(''); }}>
                  <Text style={s.bold}>Solicitar revisão</Text>
                </Pressable>
              ) : null}
              {appealCaseId === itemKey && canReview ? (
                <View style={s.reviewBox}>
                  <Text style={s.bold}>Seu contraditório</Text>
                  <TextInput
                    style={s.appealInput}
                    editable={!busy}
                    multiline
                    placeholder="Explique o que deve ser revisto"
                    value={appealReason}
                    onChangeText={setAppealReason}
                  />
                  <Pressable style={s.button} disabled={busy} accessibilityRole="button" onPress={() => void sendAppeal(item)}><Text style={s.bold}>Enviar para revisão humana</Text></Pressable>
                  <Pressable style={s.button} disabled={busy} accessibilityRole="button" onPress={() => { setAppealCaseId(''); setAppealReason(''); }}><Text>Cancelar</Text></Pressable>
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
