import {useCallback,useRef,useState} from 'react';
import {router,useFocusEffect} from 'expo-router';
import {Pressable,SafeAreaView,ScrollView,StyleSheet,Text,View} from 'react-native';
import {CompanyNav} from '../components/CompanyNav';
import {authenticatedTenantHeaders,clearSessionForAuthorization} from '../lib/session';
import {apiUrl} from '../lib/api';
export default function EmpresaConta(){
 const pending=useRef(false),epoch=useRef(0),controllerRef=useRef<AbortController|null>(null),[signingOut,setSigningOut]=useState(false),[message,setMessage]=useState('');
 useFocusEffect(useCallback(()=>{++epoch.current;return()=>{++epoch.current;controllerRef.current?.abort();pending.current=false;setSigningOut(false);};},[]));
 async function signout(){
  if(pending.current)return;pending.current=true;setSigningOut(true);setMessage('');const generation=epoch.current;
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);controllerRef.current=controller;let authorization:string|undefined,started=false;
  try{const headers=await authenticatedTenantHeaders();if(generation!==epoch.current||controller.signal.aborted)return;authorization=headers.Authorization;started=true;await fetch(apiUrl('/auth/signout'),{method:'POST',headers,signal:controller.signal});}
  catch{/* The requested local session can still end offline. */}
  finally{clearTimeout(timer);if(started){const cleared=await clearSessionForAuthorization(authorization);if(generation===epoch.current){if(cleared==='cleared')router.replace('/');else setMessage(cleared==='stale'?'A sessão mudou. Saia novamente se desejar encerrar a conta atual.':'Não foi possível limpar o acesso neste aparelho. Tente novamente.');}}if(generation===epoch.current){pending.current=false;setSigningOut(false);}}
 }
 const row=(label:string,path:string)=><Pressable style={s.row} accessibilityRole="button" disabled={signingOut} onPress={()=>router.push(path as never)}><Text style={s.icon}>○</Text><Text style={s.label}>{label}</Text><Text style={s.chev}>›</Text></Pressable>;
 return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}><Text style={s.title}>Conta</Text><View style={s.company}><View style={s.logo}><Text style={s.logoText}>E</Text></View><View><Text style={s.companyName}>Conta da empresa</Text><Text style={s.meta}>Membros, pagamentos e notificações</Text></View></View><Text style={s.section}>Empresa</Text><View style={s.card}>{row('Membros da empresa','/membros')}{row('Pagamentos','/pagamentos')}{row('Notificações','/empresa-notificacoes')}</View><Text style={s.section}>Suporte</Text><View style={s.card}>{row('Relatos de segurança','/casos-seguranca')}{row('Termos e privacidade','/privacidade')}</View><Pressable style={s.signout} accessibilityRole="button" disabled={signingOut} accessibilityState={{disabled:signingOut,busy:signingOut}} onPress={()=>void signout()}><Text style={s.signoutText}>{signingOut?'Saindo…':'Sair da conta'}</Text></Pressable>{message?<Text accessibilityLiveRegion="polite">{message}</Text>:null}</ScrollView><CompanyNav/></SafeAreaView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#FFF'},content:{padding:20,gap:10,paddingBottom:24},title:{fontSize:27,fontWeight:'900',color:'#111A35'},company:{flexDirection:'row',alignItems:'center',gap:12,paddingVertical:8},logo:{width:48,height:48,borderRadius:24,backgroundColor:'#F0EBFF',alignItems:'center',justifyContent:'center'},logoText:{fontWeight:'900',color:'#651FFF'},companyName:{fontSize:17,fontWeight:'900',color:'#111A35'},meta:{fontSize:12,color:'#788399'},section:{fontSize:13,fontWeight:'900',color:'#111A35',marginTop:8},card:{borderWidth:1,borderColor:'#E7EAF0',borderRadius:12,overflow:'hidden'},row:{minHeight:48,flexDirection:'row',alignItems:'center',paddingHorizontal:13,borderBottomWidth:1,borderBottomColor:'#EEF0F4'},icon:{width:25,color:'#651FFF',fontSize:18},label:{flex:1,fontSize:13,color:'#26344D',fontWeight:'700'},chev:{fontSize:22,color:'#7A8495'},signout:{marginTop:8,padding:14,alignItems:'center'},signoutText:{color:'#D83434',fontWeight:'800'}});

