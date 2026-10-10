import {useFocusEffect} from 'expo-router';
import {useCallback,useRef,useState} from 'react';
import {Pressable,StyleSheet,Text,View} from 'react-native';
import {authHeaders} from '../lib/session';
import {apiUrl} from '../lib/api';
import {loadSupportContexts,type SupportContext,type ContextResult} from '../lib/support-contexts';
import {loadSupportCases,supportStatus,type SupportResult} from '../lib/professional-support';
import {SupportRequest} from './SupportRequest';
import {SupportRecovery} from './SupportRecovery';

export function GeneralSupport(){
 const[contexts,setContexts]=useState<ContextResult>({status:'loading'}),[selected,setSelected]=useState<SupportContext|null>(null),[cases,setCases]=useState<SupportResult>({status:'loading'});
 const epoch=useRef(0),contextRequest=useRef(0),caseRequest=useRef(0),owner=useRef<string|null>(null),controllers=useRef(new Set<AbortController>());
 function operation(onTimeout:()=>void){const controller=new AbortController();controllers.current.add(controller);const timeout=setTimeout(()=>{controller.abort();onTimeout();},15000);return {controller,finish:()=>{clearTimeout(timeout);controllers.current.delete(controller);}};}
 function changedContext(){owner.current=null;++contextRequest.current;++caseRequest.current;for(const c of controllers.current)c.abort();setSelected(null);setCases({status:'error'});setContexts({status:'error'});}
 const loadContexts=useCallback(async()=>{
  const id=++contextRequest.current,generation=epoch.current;++caseRequest.current;owner.current=null;setSelected(null);setCases({status:'loading'});setContexts({status:'loading'});
  const current=()=>id===contextRequest.current&&generation===epoch.current;
  const op=operation(()=>{if(current())setContexts({status:'error'});}),isCurrent=()=>current()&&!op.controller.signal.aborted;
  try{
   const headers=await authHeaders();if(!current())return;if(op.controller.signal.aborted)throw Error('deadline');if(!headers.Authorization)throw Error('session_required');
   const authorization=headers.Authorization;
   const next=await loadSupportContexts(()=>fetch(apiUrl('/me/support-contexts'),{method:'GET',headers:{Authorization:authorization},signal:op.controller.signal}),isCurrent);
   const latest=await authHeaders();if(!current())return;
   if(latest.Authorization!==authorization){changedContext();return;}
   if(op.controller.signal.aborted){setContexts({status:'error'});return;}
   setContexts(next);owner.current=next.status==='ready'?authorization:null;
  }catch{if(current())setContexts({status:'error'});}
  finally{op.finish();}
 },[]);
 useFocusEffect(useCallback(()=>{++epoch.current;void loadContexts();return()=>{++epoch.current;++contextRequest.current;++caseRequest.current;owner.current=null;for(const c of controllers.current)c.abort();controllers.current.clear();setSelected(null);setCases({status:'loading'});setContexts({status:'loading'});};},[loadContexts]));
 async function selectContext(context:SupportContext){
  const authorization=owner.current;
  if(!authorization||contexts.status!=='ready')return;
  const row=contexts.data.find(c=>c.tenantId===context.tenantId);if(!row)return;
  const id=++caseRequest.current,generation=epoch.current;
  const current=()=>id===caseRequest.current&&generation===epoch.current;
  const op=operation(()=>{if(current())setCases({status:'error'});}),isCurrent=()=>current()&&!op.controller.signal.aborted;
  setSelected(null);setCases({status:'loading'});
  try{
   const headers=await authHeaders();if(!current())return;if(op.controller.signal.aborted)throw Error('deadline');
   if(headers.Authorization!==authorization){changedContext();return;}
   setSelected(row);
   const next=await loadSupportCases(()=>fetch(apiUrl('/support-cases/mine'),{method:'GET',headers:{Authorization:authorization,'x-tenant-id':row.tenantId},signal:op.controller.signal}),null,isCurrent);
   const latest=await authHeaders();if(!current())return;
   if(latest.Authorization!==authorization){changedContext();return;}
   if(op.controller.signal.aborted){setCases({status:'error'});return;}setCases(next);
  }catch{if(current())setCases({status:'error'});}
  finally{op.finish();}
 }
 const items=contexts.status==='ready'?contexts.data:[];
 return <View style={s.section}>
 {!selected?<SupportRecovery/>:null}
 <Text style={s.heading}>Ajuda geral</Text><Text style={s.text}>Escolha um espaço com vínculo autorizado para enviar uma mensagem sem associá-la a um trabalho.</Text>
 {contexts.status==='loading'?<Text style={s.text}>Carregando seus espaços…</Text>:contexts.status==='error'?<View><Text style={s.text}>Não foi possível verificar seus espaços nesta sessão.</Text><Pressable accessibilityRole="button" onPress={()=>void loadContexts()}><Text style={s.action}>Tentar novamente</Text></Pressable></View>:items.length===0?<Text style={s.text}>Sua conta ainda não tem um espaço autorizado para enviar uma solicitação de suporte. O envio geral sem vínculo ainda não está disponível.</Text>:items.map(context=><Pressable key={context.tenantId} style={s.choice} accessibilityRole="button" accessibilityState={{selected:selected?.tenantId===context.tenantId}} onPress={()=>void selectContext(context)}><Text style={s.heading}>{context.displayName}</Text><Text style={s.action}>{selected?.tenantId===context.tenantId?'Espaço selecionado':'Selecionar este espaço'}</Text></Pressable>)}
 {selected&&owner.current?<View style={s.section}>
 <Text style={s.heading}>Solicitações gerais de {selected.displayName}</Text>
 {cases.status==='loading'?<Text style={s.text}>Carregando solicitações…</Text>:cases.status==='error'?<View><Text style={s.text}>Não foi possível carregar as solicitações. Nenhuma ausência de registros foi confirmada.</Text><Pressable accessibilityRole="button" onPress={()=>void selectContext(selected)}><Text style={s.action}>Tentar novamente</Text></Pressable></View>:cases.data.length===0?<Text style={s.text}>Nenhuma solicitação sem vínculo com trabalho registrada neste espaço.</Text>:cases.data.map(c=><View key={c.id} style={s.choice}><Text style={s.heading}>{supportStatus(c.status)}</Text><Text style={s.text}>{c.description}</Text><Text style={s.text}>{new Date(c.createdAt).toLocaleString('pt-BR')}</Text>{c.resolutionNote?.trim()?<View><Text style={s.heading}>Resposta registrada</Text><Text style={s.text}>{c.resolutionNote}</Text></View>:null}</View>)}
 <SupportRequest key={selected.tenantId} generalContext={selected} workItems={[]} authorization={owner.current} onRegistered={()=>void selectContext(selected)} onContextChanged={()=>void loadContexts()}/>
 </View>:null}
 </View>;
}
const s=StyleSheet.create({section:{gap:10},text:{fontSize:14,color:'#53617A'},heading:{fontSize:16,fontWeight:'800',color:'#111A35'},action:{fontSize:14,fontWeight:'700',color:'#651FFF'},choice:{gap:4,borderTopWidth:1,borderTopColor:'#E7EAF0',paddingTop:10}});
