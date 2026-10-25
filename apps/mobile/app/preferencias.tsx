import {router,useFocusEffect} from 'expo-router';
import {useCallback,useRef,useState} from 'react';
import {Pressable,SafeAreaView,ScrollView,StyleSheet,Text,TextInput,View} from 'react-native';
import {authHeaders} from '../lib/session';
import {apiUrl} from '../lib/api';
import {capabilityLabel} from '../lib/professional-capabilities';
import {confirmsPreferences,preferencesDraft,readPreferences,writePreferences,type Preferences,type PreferencesWrite} from '../lib/preferences';
type Phase='loading'|'ready'|'error'|'profile'|'session'|'saving'|'unknown'|'conflict';
type Role={id:string;role:string};
export default function Preferencias(){
 const [phase,setPhase]=useState<Phase>('loading'),[saved,setSaved]=useState<Preferences|null>(null),[catalog,setCatalog]=useState<Role[]|null>(null);
 const [roles,setRoles]=useState<string[]>([]),[cities,setCities]=useState(''),[notice,setNotice]=useState('');
 const owner=useRef<string|undefined>(undefined),generation=useRef(0),requestId=useRef(0),active=useRef<AbortController|null>(null),dirty=useRef(false),pending=useRef<PreferencesWrite|null>(null),writing=useRef(false);
 const reset=useCallback(()=>{dirty.current=false;pending.current=null;setSaved(null);setRoles([]);setCities('');setCatalog(null);setNotice('A sessão mudou. Carregue os dados da conta atual.');},[]);
 const load=useCallback(async()=>{
  const epoch=generation.current,id=++requestId.current;active.current?.abort();const controller=new AbortController();active.current=controller;setPhase('loading');
  const current=()=>generation.current===epoch&&id===requestId.current;
  const timer=setTimeout(()=>{controller.abort();if(current())setPhase('error');},15000);
  try{
   const headers=await authHeaders();if(!current()||controller.signal.aborted)return;
   if(owner.current!==headers.Authorization){const first=owner.current===undefined;reset();if(first)setNotice('');owner.current=headers.Authorization;}
   if(!headers.Authorization){setPhase('session');return;}
   const [response,choices]=await Promise.all([fetch(apiUrl('/me/preferences'),{headers,signal:controller.signal}),fetch(apiUrl('/taxonomy/roles'),{signal:controller.signal})]);
   const value:unknown=await response.json(),items:unknown=choices.ok?await choices.json():null;
   const latest=await authHeaders();if(!current()||controller.signal.aborted)return;
   if(latest.Authorization!==headers.Authorization){reset();owner.current=latest.Authorization;setPhase('session');return;}
   if(response.status===401){reset();setPhase('session');return;}
   if(response.status===400&&value&&typeof value==='object'&&'message' in value&&value.message==='professional_profile_required'){setPhase('profile');return;}
   const data=readPreferences(value);if(!response.ok||!data)throw Error('preferences_unavailable');
   const catalogValid=Array.isArray(items)&&items.length>0&&items.every(x=>x&&typeof x==='object'&&typeof x.id==='string'&&typeof x.role==='string')&&new Set(items.map(x=>x.id)).size===items.length;
   setSaved(data);setCatalog(catalogValid?items as Role[]:null);
   if(pending.current){
    if(confirmsPreferences(data,pending.current)){dirty.current=false;setNotice('Conteúdo salvo confirmado no perfil.');}
    else setNotice('Estado atual consultado. Compare os dados salvos abaixo com seu rascunho antes de salvar novamente.');
    pending.current=null;
   }
   if(!dirty.current){setRoles(data.preferredRoleIds);setCities(data.preferredCities.join('\n'));}
   setPhase('ready');
  }catch{if(current()&&!controller.signal.aborted)setPhase('error');}
  finally{clearTimeout(timer);if(active.current===controller)active.current=null;}
 },[reset]);
 useFocusEffect(useCallback(()=>{++generation.current;void load();return()=>{++generation.current;++requestId.current;active.current?.abort();active.current=null;writing.current=false;};},[load]));
 async function save(){
  if(writing.current||phase!=='ready'||!catalog||!saved||pending.current)return;
  const input=preferencesDraft(roles,cities.trim()?cities.split('\n'):[],saved.revision);
  if(!input){setNotice('Escolha até 20 funções e informe até 10 cidades, uma por linha, com até 100 caracteres cada.');return;}
  if(input.preferredRoleIds.some(id=>!catalog.some(role=>role.id===id))){setNotice('Há uma função indisponível. Remova-a ou atualize o catálogo antes de salvar.');return;}
  writing.current=true;setPhase('saving');setNotice('');const epoch=generation.current,original=owner.current;
  const controller=new AbortController();active.current=controller;const current=()=>generation.current===epoch&&active.current===controller;
  const timer=setTimeout(()=>{controller.abort();if(current()){writing.current=false;setPhase('unknown');setNotice('O prazo de 15 segundos terminou. Consulte o estado salvo antes de tentar outra gravação.');}},15000);
  try{
   const headers=await authHeaders();if(!current()||controller.signal.aborted)return;
   if(!original||headers.Authorization!==original){reset();owner.current=headers.Authorization;setPhase('session');return;}
   pending.current=input;
   const result=await writePreferences(()=>fetch(apiUrl('/me/preferences'),{method:'PUT',headers:{...headers,'content-type':'application/json'},body:JSON.stringify(input),signal:controller.signal}),input,()=>current()&&!controller.signal.aborted);
   const latest=await authHeaders();if(!current()||controller.signal.aborted)return;
   if(latest.Authorization!==original){reset();owner.current=latest.Authorization;setPhase('session');return;}
   if(result.status==='saved'){pending.current=null;dirty.current=false;setSaved(result.data);setRoles(result.data.preferredRoleIds);setCities(result.data.preferredCities.join('\n'));setPhase('ready');setNotice('Preferências salvas.');}
   else if(result.status==='rejected'){pending.current=null;setPhase('ready');setNotice('Os dados foram recusados. Revise as funções e cidades antes de tentar novamente.');}
   else if(result.status==='session'){reset();setPhase('session');}
   else{setPhase(result.status==='conflict'?'conflict':'unknown');setNotice(result.status==='conflict'?'As preferências foram alteradas em outra gravação. Consulte a versão atual. Seu rascunho foi mantido.':'Não foi possível confirmar a gravação. Consulte o estado salvo. Seu rascunho foi mantido.');}
  }catch{if(current()&&!controller.signal.aborted){setPhase('unknown');setNotice('Consulte o estado salvo antes de tentar outra gravação.');}}
  finally{clearTimeout(timer);if(current()){active.current=null;writing.current=false;}}
 }
 const editable=phase==='ready'&&catalog!==null&&!pending.current;
 return <SafeAreaView style={s.screen}><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={s.content}>
  <Pressable accessibilityRole="button" onPress={()=>router.back()}><Text style={s.action}>Voltar ao perfil</Text></Pressable>
  <Text style={s.title}>Preferências</Text><Text style={s.text}>Estas preferências ficam salvas no seu perfil e ainda não alteram as recomendações.</Text>
  {phase==='loading'?<Text accessibilityLiveRegion="polite">Carregando preferências…</Text>:null}
  {phase==='profile'?<View><Text style={s.text}>Complete seus dados profissionais antes de definir preferências.</Text><Pressable accessibilityRole="button" onPress={()=>router.push('/perfil')}><Text style={s.action}>Abrir Meus dados no perfil</Text></Pressable></View>:null}
  {phase==='session'?<Text style={s.text}>Entre na conta atual e carregue novamente as preferências.</Text>:null}
  {phase==='error'?<Text style={s.text}>Não foi possível consultar as preferências. Seu rascunho nesta conta foi mantido.</Text>:null}
  {saved?<View style={s.card}><Text style={s.heading}>Estado salvo</Text><Text style={s.text}>{!saved.configured?'Ainda não configurado':!saved.preferredRoleIds.length&&!saved.preferredCities.length?'Sem preferência':`Funções: ${saved.preferredRoleIds.map(id=>capabilityLabel(catalog?.find(r=>r.id===id)?.role??id)).join(', ')||'Sem preferência'}\nCidades: ${saved.preferredCities.join(', ')||'Sem preferência'}`}</Text></View>:null}
  {saved?<View style={s.card}><Text style={s.heading}>Funções de interesse</Text>{catalog===null?<Text style={s.text}>Catálogo de funções indisponível. Atualize antes de editar.</Text>:catalog.map(role=><Pressable key={role.id} accessibilityRole="checkbox" accessibilityLabel={capabilityLabel(role.role)} accessibilityState={{checked:roles.includes(role.id),disabled:!editable}} disabled={!editable} style={s.choice} onPress={()=>{dirty.current=true;setRoles(old=>old.includes(role.id)?old.filter(id=>id!==role.id):old.length<20?[...old,role.id]:old);}}><Text style={s.text}>{roles.includes(role.id)?'☑':'☐'} {capabilityLabel(role.role)}</Text></Pressable>)}
  {roles.filter(id=>!catalog?.some(r=>r.id===id)).map(id=><Pressable key={id} accessibilityRole="button" disabled={!editable} onPress={()=>{dirty.current=true;setRoles(old=>old.filter(x=>x!==id));}}><Text style={s.action}>Remover função indisponível: {id}</Text></Pressable>)}
  <Text style={s.heading}>Cidades de interesse</Text><Text style={s.text}>Até 10 cidades, uma por linha. Deixe vazio para não indicar preferência.</Text>
  <TextInput accessibilityLabel="Cidades de interesse, uma por linha" multiline textAlignVertical="top" value={cities} editable={editable} style={s.field} onChangeText={value=>{dirty.current=true;setCities(value);}}/>
  <Pressable accessibilityRole="button" disabled={!editable} accessibilityState={{disabled:!editable}} onPress={()=>{dirty.current=true;setRoles([]);setCities('');}}><Text style={s.action}>Limpar escolhas do rascunho</Text></Pressable>
  <Pressable accessibilityRole="button" disabled={!editable} accessibilityState={{disabled:!editable,busy:phase==='saving'}} style={s.button} onPress={()=>void save()}><Text style={s.buttonText}>{phase==='saving'?'Salvando…':'Salvar preferências'}</Text></Pressable></View>:null}
  {notice?<Text accessibilityLiveRegion="polite" style={s.text}>{notice}</Text>:null}
  {phase!=='saving'&&phase!=='loading'?<Pressable accessibilityRole="button" onPress={()=>void load()}><Text style={s.action}>{phase==='unknown'||phase==='conflict'?'Consultar estado salvo':'Atualizar preferências e catálogo'}</Text></Pressable>:null}
 </ScrollView></SafeAreaView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#FFF'},content:{padding:20,gap:16,paddingBottom:40},title:{fontSize:28,fontWeight:'900',color:'#111A35'},heading:{fontSize:17,fontWeight:'800',color:'#111A35'},text:{fontSize:15,lineHeight:23,color:'#53617A'},action:{fontSize:15,fontWeight:'700',color:'#651FFF',paddingVertical:10},card:{padding:16,gap:12,borderWidth:1,borderColor:'#E7EAF0',borderRadius:12},choice:{paddingVertical:10},field:{minHeight:120,borderWidth:1,borderColor:'#9AA3B4',borderRadius:10,padding:12,color:'#111A35'},button:{backgroundColor:'#651FFF',borderRadius:10,padding:14},buttonText:{color:'#FFF',fontWeight:'800',textAlign:'center'}});
