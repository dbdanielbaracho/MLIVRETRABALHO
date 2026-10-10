import {useFocusEffect} from 'expo-router';
import {useCallback,useRef,useState} from 'react';
import {Pressable,StyleSheet,Text,View} from 'react-native';
import {authHeaders} from '../lib/session';
import {SupportRequest} from './SupportRequest';
type Source={status:'loading'}|{status:'error'}|{status:'ready';authorization:string;generation:number};
export function SupportRecovery(){
 const[source,setSource]=useState<Source>({status:'loading'}),request=useRef(0),active=useRef(false),controllers=useRef(new Set<AbortController>());
 const load=useCallback(async()=>{
  const generation=++request.current;setSource({status:'loading'});
  const controller=new AbortController();controllers.current.add(controller);
  const current=()=>active.current&&request.current===generation;
  const timeout=setTimeout(()=>{controller.abort();if(current())setSource({status:'error'});},15000);
  try{
   const headers=await authHeaders();if(!current()||controller.signal.aborted)return;
   if(!headers.Authorization||!headers.Authorization.startsWith('Bearer ')||!headers.Authorization.slice(7))throw Error('session_required');
   setSource({status:'ready',authorization:headers.Authorization,generation});
  }catch{if(current()&&!controller.signal.aborted)setSource({status:'error'});}
  finally{clearTimeout(timeout);controllers.current.delete(controller);}
 },[]);
 useFocusEffect(useCallback(()=>{active.current=true;void load();return()=>{active.current=false;++request.current;for(const c of controllers.current)c.abort();controllers.current.clear();setSource({status:'loading'});};},[load]));
 return <View style={s.section}>
 {source.status==='ready'?<SupportRequest key={source.generation} recoveryOnly workItems={[]} authorization={source.authorization} onRegistered={()=>{}} onContextChanged={()=>void load()}/>:source.status==='loading'?<Text style={s.text}>Verificando a sessão para consultar solicitações preservadas…</Text>:<View style={s.section}><Text style={s.text}>Não foi possível verificar a sessão para consultar suas solicitações preservadas.</Text><Pressable accessibilityRole="button" onPress={()=>void load()}><Text style={s.action}>Verificar novamente</Text></Pressable></View>}
 </View>;
}
const s=StyleSheet.create({section:{gap:10},text:{fontSize:14,color:'#53617A'},action:{fontSize:14,fontWeight:'700',color:'#651FFF'}});
