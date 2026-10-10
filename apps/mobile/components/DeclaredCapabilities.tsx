import {useFocusEffect} from 'expo-router';
import {useCallback,useRef,useState} from 'react';
import {Pressable,StyleSheet,Text,View} from 'react-native';
import {authHeaders} from '../lib/session';
import {apiUrl} from '../lib/api';
import {runForSession} from '../lib/session-context';
import {loadDeclaredCapabilities,capabilityLabel,type CapabilityResult} from '../lib/professional-capabilities';

export function DeclaredCapabilities(){
 const[result,setResult]=useState<CapabilityResult>({status:'loading'}),generation=useRef(0),request=useRef(0),controllers=useRef(new Set<AbortController>());
 const load=useCallback(async()=>{
  const version=generation.current,id=++request.current;
  for(const old of controllers.current)old.abort();controllers.current.clear();
  const controller=new AbortController();controllers.current.add(controller);setResult({status:'loading'});
  const current=()=>version===generation.current&&id===request.current;
  const timer=setTimeout(()=>{controller.abort();if(current())setResult({status:'error'});},15000);
  try{
   const origin=await authHeaders();if(!current()||controller.signal.aborted)return;const authorization=origin.Authorization;if(!authorization)throw Error('session_required');
   const next=await runForSession(authHeaders,()=>loadDeclaredCapabilities(()=>fetch(apiUrl('/professional-capabilities'),{method:'GET',headers:{Authorization:authorization},signal:controller.signal}),()=>current()&&!controller.signal.aborted),()=>current()&&!controller.signal.aborted,authorization);
   if(current())setResult(!controller.signal.aborted&&next.status==='ready'?next.data:{status:'error'});
  }catch{if(current())setResult({status:'error'});}
  finally{clearTimeout(timer);controllers.current.delete(controller);}
 },[]);
 useFocusEffect(useCallback(()=>{++generation.current;void load();return()=>{++generation.current;++request.current;for(const c of controllers.current)c.abort();controllers.current.clear();setResult({status:'loading'});};},[load]));
 const items=result.status==='ready'?result.data:[];
 return <View style={s.section}>
  <Text style={s.heading}>Habilidades e certificações declaradas</Text>
  {result.status==='loading'?<Text style={s.text}>Carregando suas declarações…</Text>:result.status==='error'?<View><Text style={s.text}>Não foi possível carregar suas declarações nesta sessão.</Text><Pressable accessibilityRole="button" onPress={()=>void load()}><Text style={s.action}>Tentar novamente</Text></Pressable></View>:result.status==='profile_required'?<Text style={s.text}>Complete seus dados em Meus dados para consultar suas declarações.</Text>:items.length===0?<Text style={s.text}>Nenhuma função com habilidades declaradas registrada.</Text>:items.map(item=><View key={item.roleId} style={s.row}>
   <Text style={s.heading}>{capabilityLabel(item.role)}</Text>
   <Text style={s.text}>Habilidades declaradas: {item.skills.length?item.skills.map(capabilityLabel).join(', '):'Nenhuma habilidade registrada para esta função.'}</Text>
   <Text style={s.text}>Certificações declaradas: {item.certifications.length?item.certifications.map(capabilityLabel).join(', '):'Nenhuma certificação registrada para esta função.'}</Text>
  </View>)}
 </View>;
}
const s=StyleSheet.create({section:{gap:10},heading:{fontSize:16,fontWeight:'800',color:'#111A35'},text:{fontSize:14,color:'#53617A'},action:{fontSize:14,fontWeight:'700',color:'#651FFF'},row:{gap:4,borderTopWidth:1,borderTopColor:'#E7EAF0',paddingTop:10}});
