import {useCallback,useRef,useState} from 'react';
import {useFocusEffect} from 'expo-router';
import {Pressable,SafeAreaView,ScrollView,StyleSheet,Text,TextInput,View} from 'react-native';
import {authenticatedTenantHeaders} from '../lib/session';
import {apiUrl} from '../lib/api';
import {loadingReplacements,loadReplacements,replaceable,sameReplacementContext,requestReplacement as createRequest,matchReplacement,selectReplacement} from '../lib/company-replacements';
import type {ReplacementData,Request,MatchResult} from '../lib/company-replacements';
export default function Substituicoes(){
 const [data,setData]=useState(loadingReplacements),[reasons,setReasons]=useState<Record<string,string>>({}),[recommendations,setRecommendations]=useState<Record<string,MatchResult>>({}),[message,setMessage]=useState(''),[busy,setBusy]=useState(false);
 const generation=useRef(0),sequence=useRef(0),pending=useRef(false),controllers=useRef(new Set<AbortController>()),snapshot=useRef<{headers:Record<string,string>;data:ReplacementData}|null>(null);
 const assignments=data.assignments.status==='ready'?data.assignments.data:[],replacements=data.replacements.status==='ready'?data.replacements.data:[];
 const openByAssignment=new Map(replacements.filter(x=>x.status==='open').map(x=>[x.assignmentId,x]));
 function operation(){const controller=new AbortController();controllers.current.add(controller);const timer=setTimeout(()=>controller.abort(),15000);return {controller,finish:()=>{clearTimeout(timer);controllers.current.delete(controller);}};}
 function requestWith(headers:Record<string,string>,signal:AbortSignal):Request{return (path,method,body)=>fetch(apiUrl(path),{method,headers:{...headers,...(body?{'content-type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{}),signal});}
 async function load(manual=false,expected?:Record<string,string>){
  if(manual&&pending.current)return;const version=generation.current,seq=++sequence.current,op=operation();snapshot.current=null;setData(loadingReplacements());setRecommendations({});
  try{const headers=await authenticatedTenantHeaders();const result=await loadReplacements((path,method,body)=>{if(!headers['x-tenant-id']||(expected&&!sameReplacementContext(headers,expected)))throw Error('company_context_changed');return requestWith(headers,op.controller.signal)(path,method,body);});
   if(version===generation.current&&seq===sequence.current){setData(result);snapshot.current=result.assignments.status==='ready'&&result.replacements.status==='ready'?{headers,data:result}:null;if(manual)setMessage('');}
  }catch{if(version===generation.current&&seq===sequence.current)setData({assignments:{status:'error'},replacements:{status:'error'}});}
  finally{op.finish();}
 }
 useFocusEffect(useCallback(()=>{++generation.current;setMessage('');setReasons({});void load();return()=>{++generation.current;++sequence.current;for(const c of controllers.current)c.abort();controllers.current.clear();snapshot.current=null;pending.current=false;setBusy(false);setData(loadingReplacements());setRecommendations({});};},[]));
 async function action(kind:'create'|'match'|'select',id:string,professionalId?:string){
  const displayed=snapshot.current;if(pending.current||!displayed||displayed.data.assignments.status!=='ready'||displayed.data.replacements.status!=='ready')return;
  const replacement=displayed.data.replacements.data.find(x=>x.id===id&&x.status==='open');
  const assignment=displayed.data.assignments.data.find(x=>x.id===(kind==='create'?id:replacement?.assignmentId));
  if(!assignment||!replaceable(assignment.status))return;
  if(kind!=='create'&&!replacement)return;
  const recommendation=recommendations[id];if(kind==='select'&&(recommendation?.status!=='ready'||recommendation.data.recommendedProfessionalId!==professionalId))return;
  pending.current=true;setBusy(true);const version=generation.current,op=operation();
  try{const headers=await authenticatedTenantHeaders();if(version!==generation.current)return;if(!sameReplacementContext(headers,displayed.headers)){setMessage('A empresa ou sessão mudou. Atualize as substituições.');return;}
   const request=requestWith(headers,op.controller.signal);
   if(kind==='match'){const result=await matchReplacement(request,id);if(version===generation.current){setRecommendations(current=>({...current,[id]:result}));setMessage(result.status==='ready'?'Substituto recomendado encontrado.':result.status==='empty'?'Nenhum substituto disponível no momento.':'Não foi possível buscar uma recomendação. Tente novamente.');}}
   else {const ok=kind==='create'?await createRequest(request,id,reasons[id]?.trim()||undefined):await selectReplacement(request,replacement!,professionalId!);
    if(version===generation.current){setMessage(ok?(kind==='create'?'Substituição solicitada.':'Substituto confirmado.'):'O resultado não foi confirmado. Atualize as substituições para conferir.');await load(false,displayed.headers);}}
  }catch{if(version===generation.current)setMessage('Falha de conexão. Atualize as substituições para conferir.');}
  finally{op.finish();if(version===generation.current){pending.current=false;setBusy(false);}}
 }
 const requestReplacement=(id:string)=>action('create',id);
 const autoMatch=(id:string)=>action('match',id);
 const confirmReplacement=(id:string,professionalId:string)=>action('select',id,professionalId);
  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>Substituições</Text>
        <Text>Escolha diretamente um trabalho confirmado ou em andamento.</Text>
        <Pressable accessibilityRole="button" disabled={busy} onPress={()=>void load(true)}><Text style={s.bold}>Atualizar substituições</Text></Pressable>
        {message ? <Text accessibilityLiveRegion="polite">{message}</Text> : null}
        {data.assignments.status==='loading'?<Text>Carregando trabalhos…</Text>:data.assignments.status==='error'?<Text>Não foi possível carregar trabalhos. Tente atualizar.</Text>:null}
        {data.replacements.status==='loading'?<Text>Carregando pedidos…</Text>:data.replacements.status==='error'?<Text>Não foi possível carregar os pedidos de substituição. Tente atualizar.</Text>:null}
        {data.assignments.status==='ready'&&assignments.length === 0 ? <Text>Nenhum trabalho disponível para substituição.</Text> : null}
        {assignments.map(item => {
          const replacement = openByAssignment.get(item.id);
          const match = replacement ? recommendations[replacement.id] : undefined;
          const recommendation = match?.status==='ready'?match.data:undefined;
          const canAct=data.replacements.status==='ready'&&replaceable(item.status);
          const blocked=busy||!canAct;
          return (
            <View key={item.id} style={s.card}>
              <Text style={s.name}>{item.professionalName}</Text>
              <Text style={s.bold}>{item.title}</Text>
              <Text>{item.location ?? 'Local não informado'}</Text>
              <Text>Status: {item.status}</Text>
              {item.startsAt ? <Text>Início: {new Date(item.startsAt).toLocaleString()}</Text> : null}
              {!replaceable(item.status)?<Text>Este trabalho não permite substituição no status atual.</Text>:null}
              {replacement ? (
                <>
                  <Text style={s.bold}>Substituição solicitada</Text>
                  {match?.status==='error'?<Text>Não foi possível buscar uma recomendação. Tente novamente.</Text>:match?.status==='empty'?<Text>Nenhum substituto disponível no momento.</Text>:null}
                  {recommendation ? (
                    <View style={s.recommendation}>
                      <Text style={s.bold}>{recommendation.recommendedProfessionalName}</Text>
                      <Text>Compatibilidade: {Math.round(recommendation.score)}%</Text>
                      <Pressable style={s.button} disabled={blocked} accessibilityRole="button" accessibilityState={{disabled:blocked,busy}} onPress={() => void confirmReplacement(replacement.id, recommendation.recommendedProfessionalId)}>
                        <Text style={s.bold}>Confirmar substituto</Text>
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable style={s.button} disabled={blocked} accessibilityRole="button" accessibilityState={{disabled:blocked,busy}} onPress={() => void autoMatch(replacement.id)}>
                      <Text style={s.bold}>Buscar melhor substituto</Text>
                    </Pressable>
                  )}
                </>
              ) : (
                <>
                  <TextInput
                    style={s.input}
                    editable={!blocked}
                    placeholder="Motivo (opcional)"
                    value={reasons[item.id] ?? ''}
                    onChangeText={value => setReasons(current => ({ ...current, [item.id]: value }))}
                  />
                  <Pressable style={s.button} disabled={blocked} accessibilityRole="button" accessibilityState={{disabled:blocked,busy}} onPress={() => void requestReplacement(item.id)}>
                    <Text style={s.bold}>Solicitar substituição</Text>
                  </Pressable>
                </>
              )}
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
  card: { borderWidth: 1, borderRadius: 14, padding: 16, gap: 7 },
  name: { fontSize: 19, fontWeight: '800' },
  bold: { fontWeight: '800' },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, marginTop: 4 },
  button: { borderWidth: 1, borderRadius: 10, padding: 12, alignItems: 'center', marginTop: 4 },
  recommendation: { borderWidth: 1, borderRadius: 10, padding: 12, gap: 6 }
});
