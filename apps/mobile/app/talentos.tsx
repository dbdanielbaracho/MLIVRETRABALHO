import {useCallback,useMemo,useRef,useState} from 'react';
import {useFocusEffect} from 'expo-router';
import {Pressable,SafeAreaView,ScrollView,StyleSheet,Text,View} from 'react-native';
import {authenticatedTenantHeaders} from '../lib/session';
import {apiUrl} from '../lib/api';
import {loadTalents,sameTalentContext,removeTalent} from '../lib/company-talents';
import type {Talent,Talents,Request} from '../lib/company-talents';
const labels:Record<Talent['pool'],string>={preferred:'Preferidos',network:'Rede',open:'Abertos'};
export default function Talentos(){
 const [data,setData]=useState<Talents>({status:'loading'}),[message,setMessage]=useState(''),[busy,setBusy]=useState(false);
 const generation=useRef(0),sequence=useRef(0),pending=useRef(false),controllers=useRef(new Set<AbortController>()),snapshot=useRef<{headers:Record<string,string>;items:Talent[]}|null>(null);
 const items=data.status==='ready'?data.data:[];
 const grouped=useMemo(()=>({preferred:items.filter(x=>x.pool==='preferred'),network:items.filter(x=>x.pool==='network'),open:items.filter(x=>x.pool==='open')}),[items]);
 function operation(onDeadline?:()=>void){const controller=new AbortController();controllers.current.add(controller);const timer=setTimeout(()=>{controller.abort();onDeadline?.();},15000);return {controller,finish:()=>{clearTimeout(timer);controllers.current.delete(controller);}};}
 const requestWith=(headers:Record<string,string>,signal:AbortSignal):Request=>(path,method)=>fetch(apiUrl(path),{method,headers,signal});
 async function load(manual=false,expected?:Record<string,string>){
  if(manual&&pending.current)return;const version=generation.current,seq=++sequence.current,op=operation(()=>{if(version===generation.current&&seq===sequence.current){snapshot.current=null;setData({status:'error'});}});snapshot.current=null;setData({status:'loading'});
  try{const headers=await authenticatedTenantHeaders();if(op.controller.signal.aborted||version!==generation.current||seq!==sequence.current)return;const result=await loadTalents((path,method)=>{if(!headers['x-tenant-id']||(expected&&!sameTalentContext(headers,expected)))throw Error('company_context_changed');return requestWith(headers,op.controller.signal)(path,method);});
   const current=await authenticatedTenantHeaders();if(op.controller.signal.aborted||!sameTalentContext(current,headers))throw Error('company_context_changed');
   if(version===generation.current&&seq===sequence.current){setData(result);snapshot.current=result.status==='ready'?{headers,items:result.data}:null;if(manual)setMessage('');}
  }catch{if(version===generation.current&&seq===sequence.current)setData({status:'error'});}
  finally{op.finish();}
 }
 useFocusEffect(useCallback(()=>{++generation.current;setMessage('');void load();return()=>{++generation.current;++sequence.current;for(const controller of controllers.current)controller.abort();controllers.current.clear();snapshot.current=null;pending.current=false;setBusy(false);setData({status:'loading'});};},[]));
 async function remove(item:Talent){
  const displayed=snapshot.current;if(pending.current||!displayed||!displayed.items.some(x=>x.professionalId===item.professionalId&&x.pool===item.pool))return;
  pending.current=true;setBusy(true);const version=generation.current,op=operation();
  try{const headers=await authenticatedTenantHeaders();if(version!==generation.current||op.controller.signal.aborted)return;if(!sameTalentContext(headers,displayed.headers)){setMessage('A empresa ou sessão mudou. Atualize seus talentos.');return;}
   const ok=await removeTalent(requestWith(headers,op.controller.signal),item);
   const current=await authenticatedTenantHeaders();if(op.controller.signal.aborted||!sameTalentContext(current,displayed.headers))throw Error('company_context_changed');
   if(version===generation.current){setMessage(ok?'Profissional removido da lista.':'Não foi possível confirmar a remoção. Atualize a lista para conferir.');await load(false,displayed.headers);}
  }catch{if(version===generation.current)setMessage('Falha de conexão. Atualize a lista para conferir a remoção.');}
  finally{op.finish();if(version===generation.current){pending.current=false;setBusy(false);}}
 }
 return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}><Text style={s.title}>Talentos</Text><Text>Profissionais que sua empresa já conhece e pode chamar novamente.</Text><Pressable accessibilityRole="button" disabled={busy} onPress={()=>void load(true)}><Text style={s.bold}>Atualizar talentos</Text></Pressable>{message?<Text accessibilityLiveRegion="polite">{message}</Text>:null}{data.status==='loading'?<Text>Carregando talentos…</Text>:data.status==='error'?<Text>{data.forbidden?'Seu acesso não permite consultar os talentos desta empresa.':'Não foi possível carregar seus talentos. Tente atualizar.'}</Text>:(['preferred','network','open'] as const).map(pool=><View key={pool} style={s.section}><Text style={s.heading}>{labels[pool]}</Text>{grouped[pool].length===0?<Text>Nenhum profissional nesta lista.</Text>:grouped[pool].map(item=><View key={pool+'-'+item.professionalId} style={s.card}><Text style={s.name}>{item.displayName}</Text><Pressable style={s.button} disabled={busy} accessibilityRole="button" accessibilityState={{disabled:busy,busy}} onPress={()=>void remove(item)}><Text style={s.bold}>Remover da lista</Text></Pressable></View>)}</View>)}</ScrollView></SafeAreaView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{padding:24,gap:14},title:{fontSize:30,fontWeight:'800'},section:{gap:8,marginTop:8},heading:{fontSize:22,fontWeight:'800'},card:{borderWidth:1,borderRadius:14,padding:16,gap:8},name:{fontSize:18,fontWeight:'800'},button:{borderWidth:1,borderRadius:10,padding:10,alignItems:'center'},bold:{fontWeight:'800'}});
