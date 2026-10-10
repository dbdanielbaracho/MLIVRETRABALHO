import { useCallback,useRef,useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { Pressable,SafeAreaView,ScrollView,StyleSheet,Text,View } from 'react-native';
import { authenticatedTenantHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';
import { loadCompanyJobs,loadCandidates,loadingCandidates,orderedCandidates,sameCompanyContext,confirmCandidate } from '../lib/company-candidates';
import type {CompanyJob,Result} from '../lib/company-candidates';
export default function Candidatos(){
 const [jobsState,setJobsState]=useState<Result<CompanyJob[]>>({status:'loading'}),[retry,setRetry]=useState(0),[jobId,setJobId]=useState(''),[data,setData]=useState(loadingCandidates),[message,setMessage]=useState(''),[pendingId,setPendingId]=useState('');
 const generation=useRef(0),selection=useRef({version:0,id:''}),context=useRef<Record<string,string>|null>(null),pending=useRef(false),controllers=useRef(new Set<AbortController>()),selectionController=useRef<AbortController|null>(null);
 const jobs=jobsState.status==='ready'?jobsState.data:[],items=orderedCandidates(data),recommendations=new Map(data.recommendations.status==='ready'?data.recommendations.data.map(x=>[x.professionalId,x] as const):[]);
 useFocusEffect(useCallback(()=>{
  const version=++generation.current,controller=new AbortController();controllers.current.add(controller);const timer=setTimeout(()=>controller.abort(),15000);
  context.current=null;selection.current={version:selection.current.version+1,id:''};setJobId('');setData(loadingCandidates());setJobsState({status:'loading'});setMessage('');
  void (async()=>{let headers:Record<string,string>|null=null;const next=await loadCompanyJobs(async path=>{headers=await authenticatedTenantHeaders();if(!headers['x-tenant-id'])throw Error('tenant_required');return fetch(apiUrl(path),{headers,signal:controller.signal});});if(version===generation.current){context.current=next.status==='ready'?headers:null;setJobsState(next);}})().finally(()=>{clearTimeout(timer);controllers.current.delete(controller);});
  return ()=>{++generation.current;++selection.current.version;for(const c of controllers.current)c.abort();controllers.current.clear();context.current=null;pending.current=false;setPendingId('');setJobId('');setData(loadingCandidates());};
 },[retry]));
 async function selectJob(id:string,refresh=false){
  if((pending.current&&!refresh)||!jobs.some(j=>j.id===id)||!context.current)return;
  const headers=context.current,version=generation.current,selectedVersion=++selection.current.version;
  selection.current.id=id;selectionController.current?.abort();const controller=new AbortController();selectionController.current=controller;controllers.current.add(controller);const timer=setTimeout(()=>controller.abort(),15000);
  setJobId(id);setData(loadingCandidates());if(!refresh)setMessage('');
  try{
   const current=await authenticatedTenantHeaders();
   const result=await loadCandidates(async(path,options)=>{if(!sameCompanyContext(current,headers))throw Error('company_context_changed');return fetch(apiUrl(path),{...options,headers,signal:controller.signal});},id);
   if(version===generation.current&&selectedVersion===selection.current.version){setData(result);if(!sameCompanyContext(current,headers))setMessage('A empresa ou sessão mudou. Atualize a lista de trabalhos.');}
  }catch{if(version===generation.current&&selectedVersion===selection.current.version)setData({candidates:{status:'error'},recommendations:{status:'error'}});}
  finally{clearTimeout(timer);controllers.current.delete(controller);}
 }
 async function confirm(professionalId:string){
  const id=selection.current.id,headers=context.current;if(pending.current||!id||!headers||!items.some(x=>x.professionalId===professionalId&&x.status==='interested'))return;
  pending.current=true;setPendingId(professionalId);const version=generation.current,controller=new AbortController();controllers.current.add(controller);const timer=setTimeout(()=>controller.abort(),15000);
  try{
   const current=await authenticatedTenantHeaders();
   if(!sameCompanyContext(current,headers)){if(version===generation.current)setMessage('A empresa ou sessão mudou. Atualize a lista de trabalhos.');return;}
   const ok=await confirmCandidate(async(path,options)=>fetch(apiUrl(path),{...options,headers:{...headers,'content-type':'application/json'},signal:controller.signal}),id,professionalId,headers['x-tenant-id']);
   if(version===generation.current){setMessage(ok?'Profissional confirmado.':'Não foi possível confirmar o resultado. Atualize os interessados antes de tentar novamente.');await selectJob(id,true);}
  }catch{if(version===generation.current)setMessage('Falha de conexão. Atualize os interessados para conferir o resultado.');}
  finally{clearTimeout(timer);controllers.current.delete(controller);if(version===generation.current){pending.current=false;setPendingId('');}}
 }
  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>Interessados</Text>
        <Text style={s.heading}>Escolha um trabalho</Text>
        <Pressable disabled={!!pendingId} accessibilityRole="button" onPress={()=>setRetry(x=>x+1)}><Text style={s.action}>Atualizar trabalhos</Text></Pressable>
        {jobsState.status==='loading'?<Text>Carregando trabalhos…</Text>:jobsState.status==='error'?<Pressable disabled={!!pendingId} accessibilityRole="button" onPress={()=>setRetry(x=>x+1)}><Text>Não foi possível carregar trabalhos. Tentar novamente.</Text></Pressable>:jobs.length === 0 ? <Text>Nenhum trabalho aberto.</Text> : jobs.map(job => (
          <Pressable key={job.id} style={[s.jobCard, jobId === job.id && s.selected]} disabled={!!pendingId} accessibilityRole="button" accessibilityState={{selected:jobId===job.id,disabled:!!pendingId}} onPress={() => void selectJob(job.id)}>
            <Text style={s.name}>{job.title}</Text>
            <Text>{job.workCity ?? job.location ?? 'Local não informado'}</Text>
          </Pressable>
        ))}

        {jobId ? (
          <>
            <Text style={s.heading}>Profissionais interessados</Text>
            <Text>Os mais compatíveis aparecem primeiro. A recomendação apoia sua decisão, mas não confirma ninguém automaticamente.</Text>
            {data.recommendations.status==='loading'?<Text>Carregando recomendações…</Text>:data.recommendations.status==='error'?<Pressable disabled={!!pendingId} accessibilityRole="button" onPress={()=>void selectJob(jobId)}><Text>Não foi possível carregar recomendações. Tentar novamente.</Text></Pressable>:null}
            {data.candidates.status==='loading'?<Text>Carregando interessados…</Text>:data.candidates.status==='error'?<Pressable disabled={!!pendingId} accessibilityRole="button" onPress={()=>void selectJob(jobId)}><Text>Não foi possível carregar interessados. Tentar novamente.</Text></Pressable>:items.length === 0 ? <Text>Nenhum interessado ainda.</Text> : items.map(item => {
              const recommendation = recommendations.get(item.professionalId);
              return (
                <View key={item.professionalId} style={s.card}>
                  <Text style={s.name}>{item.displayName}</Text>
                  <Text>{item.homeCity ?? 'Cidade não informada'}</Text>
                  <Text>{item.status}</Text>
                  {recommendation ? (
                    <View style={s.matchBox}>
                      <Text style={s.score}>Compatibilidade: {recommendation.score}/100</Text>
                      {recommendation.reasons.length > 0 ? <Text>{recommendation.reasons.join(' • ')}</Text> : <Text>Sem sinal adicional de destaque.</Text>}
                    </View>
                  ) : (
                    <Text style={s.muted}>{data.recommendations.status==='ready'?'Sem recomendação automática para este trabalho.':'Recomendação indisponível no momento.'}</Text>
                  )}
                  <Pressable disabled={!!pendingId||item.status!=='interested'} accessibilityRole="button" accessibilityState={{disabled:!!pendingId||item.status!=='interested',busy:pendingId===item.professionalId}} onPress={() => void confirm(item.professionalId)}>
                    <Text style={s.action}>{pendingId===item.professionalId?'Confirmando…':item.status==='confirmed'?'Profissional confirmado':item.status==='interested'?'Confirmar profissional':'Confirmação indisponível'}</Text>
                  </Pressable>
                </View>
              );
            })}
          </>
        ) : null}
        {message ? <Text>{message}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, gap: 14 },
  title: { fontSize: 30, fontWeight: '800' },
  heading: { fontSize: 20, fontWeight: '800', marginTop: 4 },
  jobCard: { borderWidth: 1, borderRadius: 14, padding: 16, gap: 5 },
  selected: { borderWidth: 2 },
  card: { borderWidth: 1, borderRadius: 14, padding: 16, gap: 7 },
  name: { fontSize: 19, fontWeight: '800' },
  matchBox: { borderWidth: 1, borderRadius: 10, padding: 10, gap: 4, marginTop: 3 },
  score: { fontWeight: '800' },
  muted: { opacity: 0.65 },
  action: { fontSize: 17, fontWeight: '800', marginTop: 6 }
});
