import { router,useFocusEffect } from 'expo-router';
import { useCallback,useRef,useState } from 'react';
import { Pressable,SafeAreaView,ScrollView,StyleSheet,Text,TextInput,View } from 'react-native';
import { ProfessionalNav } from '../components/ProfessionalNav';
import { authHeaders,clearSessionForAuthorization } from '../lib/session';
import { apiUrl } from '../lib/api';
import {passportHistory,completionDate} from '../lib/passport-history';
import {submitProfile} from '../lib/profile-submit';
import { loadProfessionalProfile,loadWorkPassport,type Profile,type Passport,type Resource } from '../lib/professional-profile';

export default function Perfil(){
 const[profile,setProfile]=useState<Resource<Profile|null>>({status:'loading'});
 const[passport,setPassport]=useState<Resource<Passport|null>>({status:'loading'});
 const[displayName,setDisplayName]=useState(''),[city,setCity]=useState(''),[role,setRole]=useState('');
 const[expanded,setExpanded]=useState<string|null>(null),[notice,setNotice]=useState('');
 const[saving,setSaving]=useState(false),[signingOut,setSigningOut]=useState(false);
 const dirty=useRef(false),submitting=useRef(false),exiting=useRef(false),requestId=useRef(0),epoch=useRef(0),controllers=useRef(new Set<AbortController>()),sourceHeaders=useRef<Record<string,string>|null>(null),draftOwner=useRef<string|undefined>(undefined);
 function changedContext(){sourceHeaders.current=null;dirty.current=false;setDisplayName('');setCity('');setRole('');setProfile({status:'error'});setPassport({status:'error'});setNotice('A sessão mudou. Atualize seus dados antes de continuar.');}
 const load=useCallback(async(focusSignal?:AbortSignal)=>{
  const id=++requestId.current,generation=epoch.current;sourceHeaders.current=null;setProfile({status:'loading'});setPassport({status:'loading'});
  const controller=new AbortController(),cancel=()=>controller.abort();controllers.current.add(controller);
  focusSignal?.addEventListener('abort',cancel);if(focusSignal?.aborted)controller.abort();
  const timeout=setTimeout(()=>controller.abort(),15000);
  try{
   const h=await authHeaders();if(generation!==epoch.current||controller.signal.aborted)return;if(!h.Authorization){changedContext();throw Error('session_required');}
   if(draftOwner.current!==h.Authorization){dirty.current=false;setDisplayName('');setCity('');setRole('');setNotice('');}draftOwner.current=h.Authorization;
   const isCurrent=()=>id===requestId.current&&generation===epoch.current&&!controller.signal.aborted;
   const [nextProfile,nextPassport]=await Promise.all([
    loadProfessionalProfile(()=>fetch(apiUrl('/professional-profile'),{headers:h,signal:controller.signal}),isCurrent),
    loadWorkPassport(()=>fetch(apiUrl('/work-passport/mine'),{headers:h,signal:controller.signal}),isCurrent)
   ]);
   const current=await authHeaders();if(id!==requestId.current||generation!==epoch.current||focusSignal?.aborted)return;
   if(current.Authorization!==h.Authorization){changedContext();return;}
   if(controller.signal.aborted){setProfile({status:'error'});setPassport({status:'error'});return;}
   if(nextProfile.status==='ready')sourceHeaders.current=h;
   setProfile(nextProfile);setPassport(nextPassport);
   if(nextProfile.status==='ready'&&!dirty.current){
    setDisplayName(nextProfile.data?.displayName??'');setCity(nextProfile.data?.homeCity??'');setRole(nextProfile.data?.primaryRole??'');
   }
  }catch{
   if(id===requestId.current&&generation===epoch.current&&!focusSignal?.aborted){setProfile({status:'error'});setPassport({status:'error'});}
  }finally{clearTimeout(timeout);controllers.current.delete(controller);focusSignal?.removeEventListener('abort',cancel);}
 },[]);
 useFocusEffect(useCallback(()=>{++epoch.current;const controller=new AbortController();void load(controller.signal);return()=>{++epoch.current;++requestId.current;controller.abort();for(const c of controllers.current)c.abort();controllers.current.clear();sourceHeaders.current=null;submitting.current=false;exiting.current=false;setSaving(false);setSigningOut(false);};},[load]));
 async function saveProfile(){
  const original=sourceHeaders.current;if(submitting.current||exiting.current||profile.status!=='ready'||!original)return;
  const input={displayName,homeCity:city,primaryRole:role},expectedId=profile.data?.id;
  if(!displayName.trim()){setNotice('Informe seu nome antes de salvar.');return;}
  submitting.current=true;setSaving(true);setNotice('');const generation=epoch.current;
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);controllers.current.add(controller);
  try{
   const h=await authHeaders();if(generation!==epoch.current||controller.signal.aborted)return;
   if(h.Authorization!==original.Authorization){changedContext();return;}
   const result=await submitProfile((path,body)=>fetch(apiUrl(path),{method:'PUT',headers:{...h,'content-type':'application/json'},body:JSON.stringify(body),signal:controller.signal}),input,expectedId,()=>generation===epoch.current&&!controller.signal.aborted);
   const current=await authHeaders();if(generation!==epoch.current)return;
   if(current.Authorization!==original.Authorization){changedContext();return;}
   if(controller.signal.aborted||result.status!=='saved'){setNotice('Não foi possível confirmar o salvamento. Seus dados foram mantidos para tentar novamente.');return;}
   ++requestId.current;dirty.current=false;setProfile({status:'ready',data:result.data});setDisplayName(result.data.displayName);setCity(result.data.homeCity??'');setRole(result.data.primaryRole??'');setNotice('Dados salvos.');void load();
  }catch{if(generation===epoch.current)setNotice('Não foi possível confirmar o salvamento. Seus dados foram mantidos para tentar novamente.');}
  finally{clearTimeout(timeout);controllers.current.delete(controller);if(generation===epoch.current){submitting.current=false;setSaving(false);}}
 }
 async function signout(){
  if(exiting.current||submitting.current)return;
  exiting.current=true;setSigningOut(true);const generation=epoch.current;
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);controllers.current.add(controller);let authorization:string|undefined,started=false;
  try{const h=await authHeaders();if(generation!==epoch.current||controller.signal.aborted)return;authorization=h.Authorization;started=true;await fetch(apiUrl('/auth/signout'),{method:'POST',headers:h,signal:controller.signal});}
  catch{ /* Clear the requested local session even when offline. */ }
  finally{
   clearTimeout(timeout);controllers.current.delete(controller);
   if(started){const cleared=await clearSessionForAuthorization(authorization);if(generation===epoch.current){if(cleared==='cleared')router.replace('/');else{setNotice(cleared==='stale'?'A sessão mudou. Atualize seus dados antes de sair novamente.':'Não foi possível limpar o acesso neste aparelho. Tente novamente.');void load();}}}
   if(generation===epoch.current){exiting.current=false;setSigningOut(false);}
  }
 }
 const rows=[['👤','Meus dados'],['▣','Experiência profissional'],['♡','Preferências'],['◷','Disponibilidade'],['♢','Notificações'],['?','Ajuda e suporte'],['▤','Termos e privacidade']];
 const history=passportHistory(passport);
 const p=passport.status==='ready'?passport.data:null;
 const canEdit=profile.status==='ready'&&!saving&&!signingOut;
 return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}>
 <View style={s.top}><Text style={s.title}>Perfil</Text><Text style={s.gear}>⚙</Text></View>
 <View style={s.identity}><View style={s.avatar}><Text style={s.avatarText}>{(profile.status==='ready'&&displayName?displayName:'?').charAt(0).toUpperCase()}</Text></View>
 <Text style={s.profileName}>{profile.status==='loading'?'Carregando perfil…':profile.status==='error'?'Perfil indisponível':displayName||'Nome não informado'}</Text>
 <Text style={s.profileRating}>{passport.status==='loading'?'Carregando avaliações…':passport.status==='error'?'Avaliações indisponíveis':!p?'Complete seus dados para criar seu passaporte.':p.ratingCount===0?'Sem avaliações registradas':p.averageRating?.toFixed(1)+' ★ ('+p.ratingCount+' avaliações)'}</Text>
 {profile.status==='error'||passport.status==='error'?<Pressable accessibilityRole="button" onPress={()=>void load()}><Text style={s.close}>Tentar novamente</Text></Pressable>:null}
 </View>
 <View style={s.menu}>{rows.map(([icon,label])=><Pressable key={label} style={s.row} accessibilityRole="button" onPress={()=>{
  if(label==='Disponibilidade'){router.push('/disponibilidade');return;}
  if(label==='Notificações'){router.push('/notificacoes');return;}
  if(label==='Termos e privacidade'){router.push('/privacidade');return;}
  setExpanded(expanded===label?null:label);
 }}><Text style={s.icon}>{icon}</Text><Text style={s.label}>{label}</Text><Text style={s.chevron}>›</Text></Pressable>)}</View>
 {expanded?<View style={s.panel}><Text style={s.panelTitle}>{expanded}</Text>{expanded==='Meus dados'?<View>
 {profile.status==='loading'?<Text style={s.panelText}>Carregando seus dados…</Text>:profile.status==='error'?<Text style={s.panelText}>Não foi possível carregar seus dados. Tente novamente acima.</Text>:null}
 <TextInput style={s.field} value={displayName} editable={canEdit} onChangeText={value=>{dirty.current=true;setDisplayName(value);}} placeholder="Nome"/>
 <TextInput style={s.field} value={city} editable={canEdit} onChangeText={value=>{dirty.current=true;setCity(value);}} placeholder="Cidade"/>
 <TextInput style={s.field} value={role} editable={canEdit} onChangeText={value=>{dirty.current=true;setRole(value);}} placeholder="Atuação principal"/>
 <Pressable accessibilityRole="button" disabled={!canEdit} accessibilityState={{disabled:!canEdit,busy:saving}} onPress={()=>void saveProfile()}><Text style={s.close}>{saving?'Salvando…':'Salvar dados'}</Text></Pressable>
 <Pressable accessibilityRole="button" onPress={()=>router.push('/membros')}><Text style={s.close}>Aceitar convite</Text></Pressable>
 <Pressable accessibilityRole="button" disabled={saving||signingOut} accessibilityState={{disabled:saving||signingOut,busy:signingOut}} onPress={()=>void signout()}><Text style={s.close}>{signingOut?'Saindo…':'Sair da conta'}</Text></Pressable>
 {notice?<Text accessibilityLiveRegion="polite">{notice}</Text>:null}
 </View>:expanded==='Experiência profissional'?<View style={{gap:10}}>
 <Text style={s.panelText}>{passport.status==='loading'?'Carregando histórico…':passport.status==='error'?'Não foi possível carregar seu histórico. Tente novamente acima.':!p?'Complete seus dados para criar seu passaporte.':p.completedWorkCount===0?'Nenhum trabalho concluído registrado no passaporte profissional.':p.completedWorkCount+' trabalhos concluídos registrados no passaporte profissional.'}</Text>
 {history.status==='unavailable'?<Text style={s.panelText}>Histórico detalhado não fornecido nesta resposta.</Text>:history.status==='empty'?<Text style={s.panelText}>Nenhum registro disponível no histórico verificado.</Text>:history.status==='ready'?<View style={{gap:12}}><Text style={s.panelText}>Histórico verificado recente</Text>{history.data.map(work=><View key={work.tenantId+':'+work.id} style={{gap:4}}><Text style={s.panelTitle}>{work.title}</Text><Text style={s.panelText}>{work.location?.trim()?work.location:'Local não informado'}</Text><Text style={s.panelText}>{completionDate(work.completedAt)}</Text></View>)}</View>:null}
 </View>:<Text style={s.panelText}>Esta área ainda não está disponível nesta versão do aplicativo.</Text>}
 <Pressable accessibilityRole="button" onPress={()=>setExpanded(null)}><Text style={s.close}>Fechar</Text></Pressable></View>:null}
 </ScrollView><ProfessionalNav/></SafeAreaView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#FFF'},content:{padding:20,paddingBottom:24},top:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},title:{fontSize:28,fontWeight:'900',color:'#111A35'},gear:{fontSize:22,color:'#53617A'},identity:{alignItems:'center',paddingVertical:22},avatar:{width:82,height:82,borderRadius:41,backgroundColor:'#E8E0FF',alignItems:'center',justifyContent:'center',marginBottom:10},avatarText:{fontSize:30,fontWeight:'900',color:'#651FFF'},profileName:{fontSize:20,fontWeight:'900',color:'#111A35'},profileRating:{fontSize:12,fontWeight:'700',color:'#65708A',marginTop:5},menu:{borderTopWidth:1,borderColor:'#EDF0F4'},row:{height:58,flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderColor:'#EDF0F4'},icon:{width:34,fontSize:18,color:'#651FFF'},label:{flex:1,fontSize:15,fontWeight:'700',color:'#111A35'},chevron:{fontSize:26,color:'#9AA3B4'},panel:{padding:16,marginTop:14,backgroundColor:'#F6F3FF',borderRadius:12,gap:10},panelTitle:{fontSize:16,fontWeight:'800',color:'#111A35'},panelText:{fontSize:14,color:'#53617A'},close:{fontSize:14,fontWeight:'700',color:'#651FFF'},field:{borderWidth:1,borderColor:'#DDD',borderRadius:10,padding:12,marginBottom:8}});

