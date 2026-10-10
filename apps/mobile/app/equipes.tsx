import {useCallback,useRef,useState} from 'react';
import {Link,useFocusEffect} from 'expo-router';
import {Pressable,SafeAreaView,ScrollView,StyleSheet,Text,TextInput,View} from 'react-native';
import {authenticatedTenantHeaders} from '../lib/session';
import {apiUrl} from '../lib/api';
import {CompanyNav} from '../components/CompanyNav';
import {loadingTeamBase,loadTeamBase,knownProfessionals,loadMembers,loadAllocation,createTeam,changeTeamMember,sameTeamContext} from '../lib/teams';
import type {Result,TeamMember,Allocation,TeamBase,Request} from '../lib/teams';
export default function Equipes(){
 const [base,setBase]=useState(loadingTeamBase),[selectedTeamId,setSelectedTeamId]=useState(''),[membersState,setMembersState]=useState<Result<TeamMember[]>>({status:'loading'}),[selectedJobId,setSelectedJobId]=useState(''),[allocationState,setAllocationState]=useState<Result<Allocation[]>>({status:'loading'}),[teamName,setTeamName]=useState(''),[message,setMessage]=useState(''),[busy,setBusy]=useState(false),[createUncertain,setCreateUncertain]=useState(false);
 const generation=useRef(0),baseSequence=useRef(0),teamSelection=useRef({id:'',version:0}),allocationSequence=useRef(0),snapshot=useRef<{headers:Record<string,string>;base:TeamBase}|null>(null),pending=useRef(false),controllers=useRef(new Set<AbortController>()),memberController=useRef<AbortController|null>(null),allocationController=useRef<AbortController|null>(null);
 const teams=base.teams.status==='ready'?base.teams.data:[],members=membersState.status==='ready'?membersState.data:[],jobs=base.jobs.status==='ready'?base.jobs.data:[],allocation=allocationState.status==='ready'?allocationState.data:[];
 const memberIds=new Set(members.map(m=>m.professionalId)),availableToAdd=knownProfessionals(base).filter(p=>!memberIds.has(p.professionalId)),selectedTeam=teams.find(t=>t.id===selectedTeamId);
 function operation(){const controller=new AbortController();controllers.current.add(controller);const timer=setTimeout(()=>controller.abort(),15000);return {controller,finish:()=>{clearTimeout(timer);controllers.current.delete(controller);}};}
 async function requestFor(headers:Record<string,string>,signal:AbortSignal):Promise<Request>{
  const current=await authenticatedTenantHeaders();if(!sameTeamContext(current,headers))throw Error('company_context_changed');
  return async(path,options)=>fetch(apiUrl(path),{...options,headers:{...headers,...(options?.method==='POST'?{'content-type':'application/json'}:{})},signal});
 }
 function resetSelection(){memberController.current?.abort();allocationController.current?.abort();teamSelection.current={id:'',version:teamSelection.current.version+1};++allocationSequence.current;setSelectedTeamId('');setSelectedJobId('');setMembersState({status:'loading'});setAllocationState({status:'loading'});}
 async function loadBase(selectId?:string,manual=false,expectedHeaders?:Record<string,string>){
  if(manual&&pending.current)return;
  const version=generation.current,seq=++baseSequence.current,op=operation();snapshot.current=null;resetSelection();setBase(loadingTeamBase());
  try{
   const headers=await authenticatedTenantHeaders();
   const next=await loadTeamBase(async(path,options)=>{if(!headers['x-tenant-id']||(expectedHeaders&&!sameTeamContext(headers,expectedHeaders)))throw Error('company_context_changed');return fetch(apiUrl(path),{...options,headers,signal:op.controller.signal});});
   if(version===generation.current&&seq===baseSequence.current){setBase(next);snapshot.current=next.teams.status==='ready'?{headers,base:next}:null;if(manual&&next.teams.status==='ready'){setCreateUncertain(false);setMessage('');}if(selectId&&snapshot.current?.base.teams.status==='ready'&&snapshot.current.base.teams.data.some(t=>t.id===selectId))await selectTeam(selectId,true);}
  }catch{if(version===generation.current&&seq===baseSequence.current)setBase({teams:{status:'error'},active:{status:'error'},completed:{status:'error'},jobs:{status:'error'}});}
  finally{op.finish();}
 }
 useFocusEffect(useCallback(()=>{++generation.current;void loadBase();return ()=>{++generation.current;++baseSequence.current;for(const c of controllers.current)c.abort();controllers.current.clear();snapshot.current=null;pending.current=false;setBusy(false);resetSelection();};},[]));
 async function selectTeam(id:string,refresh=false){
  const data=snapshot.current;if((pending.current&&!refresh)||!data||data.base.teams.status!=='ready'||!data.base.teams.data.some(t=>t.id===id))return;
  memberController.current?.abort();allocationController.current?.abort();const version=generation.current,seq=teamSelection.current.version+1,op=operation();memberController.current=op.controller;teamSelection.current={id,version:seq};++allocationSequence.current;setSelectedTeamId(id);setSelectedJobId('');setMembersState({status:'loading'});setAllocationState({status:'loading'});if(!refresh)setMessage('');
  try{const request=await requestFor(data.headers,op.controller.signal),result=await loadMembers(request,id);if(version===generation.current&&seq===teamSelection.current.version)setMembersState(result);}
  catch{if(version===generation.current&&seq===teamSelection.current.version){setMembersState({status:'error'});setMessage('Não foi possível carregar membros. Se a empresa ou sessão mudou, atualize equipes.');}}
  finally{op.finish();}
 }
 async function selectAllocation(id:string){
  const data=snapshot.current,teamId=teamSelection.current.id;if(pending.current||!data||!teamId||selectedTeamId!==teamId||membersState.status!=='ready'||data.base.jobs.status!=='ready'||!data.base.jobs.data.some(j=>j.id===id))return;
  allocationController.current?.abort();const version=generation.current,teamVersion=teamSelection.current.version,seq=++allocationSequence.current,op=operation();allocationController.current=op.controller;setSelectedJobId(id);setAllocationState({status:'loading'});
  try{const request=await requestFor(data.headers,op.controller.signal),result=await loadAllocation(request,teamId,id);if(version===generation.current&&teamVersion===teamSelection.current.version&&seq===allocationSequence.current)setAllocationState(result);}
  catch{if(version===generation.current&&teamVersion===teamSelection.current.version&&seq===allocationSequence.current){setAllocationState({status:'error'});setMessage('Não foi possível carregar alocação. Se a empresa ou sessão mudou, atualize equipes.');}}
  finally{op.finish();}
 }
 async function create(){
  const data=snapshot.current,name=teamName.trim();if(pending.current||createUncertain||!data)return;if(!name){setMessage('Informe o nome da equipe.');return;}
  pending.current=true;setBusy(true);const version=generation.current,op=operation();
  try{const request=await requestFor(data.headers,op.controller.signal),result=await createTeam(request,name);if(version!==generation.current)return;
   if(result.status==='created'){setTeamName('');setMessage('Equipe criada.');await loadBase(result.team.id,false,data.headers);}
   else if(result.status==='rejected')setMessage('Não foi possível criar a equipe.');
   else{setCreateUncertain(true);setMessage('O resultado da criação não foi confirmado. Atualize equipes e confira a lista antes de criar novamente.');}
  }catch{if(version===generation.current)setMessage('A empresa ou sessão mudou, ou houve falha de conexão. Atualize equipes.');}
  finally{op.finish();if(version===generation.current){pending.current=false;setBusy(false);}}
 }
 async function changeMember(professionalId:string,remove:boolean){
  const data=snapshot.current,id=teamSelection.current.id;if(pending.current||!data||!id||selectedTeamId!==id||membersState.status!=='ready'||(remove?!members.some(m=>m.professionalId===professionalId):!availableToAdd.some(p=>p.professionalId===professionalId)))return;
  pending.current=true;setBusy(true);const version=generation.current,op=operation();
  try{const request=await requestFor(data.headers,op.controller.signal),ok=await changeTeamMember(request,id,professionalId,remove);if(version!==generation.current)return;setMessage(ok?(remove?'Profissional removido da equipe.':'Profissional adicionado à equipe.'):'Não foi possível confirmar o resultado. Atualize equipes para conferir os membros.');await loadBase(id,false,data.headers);}
  catch{if(version===generation.current)setMessage('Falha de conexão ou contexto alterado. Atualize equipes para conferir os membros.');}
  finally{op.finish();if(version===generation.current){pending.current=false;setBusy(false);}}
 }
 function memberName(professionalId:string){return members.find(m=>m.professionalId===professionalId)?.displayName??'Profissional';}
  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>Equipe</Text>
        <Text>Monte grupos com profissionais que já trabalharam ou estão confirmados com sua empresa. Sem IDs técnicos.</Text>
        <View style={s.contextActions}><Link href="/talentos" style={s.contextAction}>Talentos</Link><Link href="/substituicoes" style={s.contextAction}>Substituições</Link></View>

        <View style={s.row}>
          <TextInput style={[s.input, s.flex]} placeholder="Nome da nova equipe" value={teamName} editable={!busy} onChangeText={setTeamName} />
          <Pressable style={s.button} accessibilityRole="button" disabled={busy||createUncertain||base.teams.status!=='ready'} accessibilityState={{disabled:busy||createUncertain||base.teams.status!=='ready',busy}} onPress={() => void create()} ><Text style={s.bold}>Criar</Text></Pressable>
        </View>

        <Text style={s.heading}>Suas equipes</Text>
        <Pressable accessibilityRole="button" disabled={busy} onPress={()=>void loadBase(undefined,true)}><Text style={s.action}>Atualizar equipes</Text></Pressable>
        {createUncertain?<Text>O resultado da criação não foi confirmado. Atualize as equipes e confira a lista antes de criar novamente.</Text>:null}
        {base.teams.status==='loading'?<Text>Carregando equipes…</Text>:base.teams.status==='error'?<Text>Não foi possível carregar equipes. Use Atualizar equipes.</Text>:teams.length === 0 ? <Text>Nenhuma equipe criada.</Text> : teams.map(team => (
          <Pressable key={team.id} style={[s.card, selectedTeamId === team.id && s.selected]} disabled={busy} accessibilityRole="button" accessibilityState={{selected:selectedTeamId===team.id,disabled:busy}} onPress={() => void selectTeam(team.id)}>
            <Text style={s.name}>{team.name}</Text>
            <Text>{team.memberCount} membro(s)</Text>
          </Pressable>
        ))}

        {selectedTeam ? (
          <>
            <Text style={s.heading}>Membros — {selectedTeam.name}</Text>
            {membersState.status==='loading'?<Text>Carregando membros…</Text>:membersState.status==='error'?<Pressable disabled={busy} accessibilityRole="button" onPress={()=>void selectTeam(selectedTeamId)}><Text>Não foi possível carregar membros. Tentar novamente.</Text></Pressable>:members.length === 0 ? <Text>Esta equipe ainda não tem membros.</Text> : members.map(member => (
              <View key={member.professionalId} style={s.card}>
                <Text style={s.name}>{member.displayName}</Text>
                <Text>{member.primaryRole ?? 'Função não informada'} · {member.homeCity ?? 'Cidade não informada'}</Text>
                <Pressable disabled={busy} accessibilityRole="button" accessibilityState={{disabled:busy,busy}} onPress={() => void changeMember(member.professionalId,true)}><Text style={s.action}>Remover da equipe</Text></Pressable>
              </View>
            ))}

            <Text style={s.heading}>Adicionar profissional conhecido</Text>
            {base.active.status==='loading'||base.completed.status==='loading'?<Text>Carregando profissionais conhecidos…</Text>:null}
            {base.active.status==='error'||base.completed.status==='error'?<Text>Parte dos profissionais conhecidos não pôde ser carregada. Atualize as equipes para tentar novamente.</Text>:null}
            {membersState.status!=='ready'?<Text>Carregue os membros antes de adicionar profissionais.</Text>:availableToAdd.length === 0 ? <Text>{base.active.status==='ready'&&base.completed.status==='ready'?'Nenhum outro profissional conhecido disponível para adicionar.':'Não foi possível confirmar todos os profissionais conhecidos. Atualize equipes.'}</Text> : availableToAdd.map(professional => (
              <Pressable key={professional.professionalId} style={s.card} disabled={busy} accessibilityRole="button" onPress={() => void changeMember(professional.professionalId,false)}>
                <Text style={s.name}>{professional.professionalName}</Text>
                <Text style={s.action}>Adicionar à equipe</Text>
              </Pressable>
            ))}

            <Text style={s.heading}>Alocação recomendada</Text>
            <Text>Escolha uma vaga aberta. O ranking usa disponibilidade, função, confiabilidade e proximidade quando houver dado suficiente.</Text>
            {base.jobs.status==='loading'?<Text>Carregando vagas…</Text>:base.jobs.status==='error'?<Text>Não foi possível carregar vagas. Atualize as equipes.</Text>:jobs.length === 0 ? <Text>Nenhuma vaga aberta.</Text> : jobs.map(job => (
              <Pressable key={job.id} style={[s.jobCard, selectedJobId === job.id && s.selected]} disabled={busy||membersState.status!=='ready'} accessibilityRole="button" accessibilityState={{selected:selectedJobId===job.id,disabled:busy||membersState.status!=='ready'}} onPress={() => void selectAllocation(job.id)}>
                <Text style={s.name}>{job.title}</Text>
                <Text>{job.workCity ?? job.location ?? 'Local não informado'}</Text>
              </Pressable>
            ))}

            {selectedJobId ? (
              allocationState.status==='loading'?<Text>Carregando alocação…</Text>:allocationState.status==='error'?<Pressable disabled={busy} accessibilityRole="button" onPress={()=>void selectAllocation(selectedJobId)}><Text>Não foi possível carregar a alocação. Tentar novamente.</Text></Pressable>:allocation.length === 0 ? <Text>Nenhum membro disponível/recomendado para esta vaga.</Text> : allocation.map(item => (
                <View key={item.professionalId} style={s.card}>
                  <Text style={s.name}>{memberName(item.professionalId)}</Text>
                  <Text style={s.bold}>Compatibilidade: {item.score}/100</Text>
                  <Text>{item.reasons.length ? item.reasons.join(' • ') : 'Sem sinal adicional de destaque.'}</Text>
                </View>
              ))
            ) : null}
          </>
        ) : null}

        {message ? <Text>{message}</Text> : null}
      </ScrollView><CompanyNav/>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 20, gap: 12, paddingBottom: 24 },
  title: { fontSize: 27, fontWeight: '900', color: '#111A35' },
  heading: { fontSize: 21, fontWeight: '800', marginTop: 8, color: '#111A35' },
  row: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  flex: { flex: 1 },
  input: { borderWidth: 1, borderColor: '#DCD8E8', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 13, fontSize: 16 },
  button: { backgroundColor: '#651FFF', borderRadius: 12, padding: 14 },
  card: { borderWidth: 1, borderColor: '#E9E6F2', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14, gap: 5 },
  jobCard: { borderWidth: 1, borderColor: '#E9E6F2', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14, gap: 5 },
  selected: { borderWidth: 2, borderColor: '#651FFF', backgroundColor: '#F6F3FF' },
  name: { fontSize: 18, fontWeight: '800' },
  bold: { fontWeight: '800' },
  action: { fontWeight: '800', marginTop: 4, color: '#651FFF' },
  contextActions: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  contextAction: { borderWidth: 1, borderColor: '#D8CCFF', backgroundColor: '#F6F3FF', color: '#651FFF', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14, fontWeight: '800' }
});
