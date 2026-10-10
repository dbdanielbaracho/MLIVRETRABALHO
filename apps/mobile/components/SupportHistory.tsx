import {useFocusEffect} from 'expo-router';
import {useCallback,useRef,useState} from 'react';
import {Pressable,StyleSheet,Text,View} from 'react-native';
import {authHeaders} from '../lib/session';
import {apiUrl} from '../lib/api';
import {loadAgenda,type Assignment} from '../lib/agenda';
import {assignmentSchedule,type Section} from '../lib/professional-home';
import {loadSupportCases,supportStatus,type SupportResult} from '../lib/professional-support';

// This panel only reads existing requests; it never creates or updates a support case.
export function SupportHistory(){
 const[work,setWork]=useState<Section<Assignment[]>>({status:'loading'}),[selected,setSelected]=useState<Assignment|null>(null),[cases,setCases]=useState<SupportResult>({status:'loading'});
 const epoch=useRef(0),workRequest=useRef(0),caseRequest=useRef(0),owner=useRef<string|null>(null),controllers=useRef(new Set<AbortController>());
 function operation(){const controller=new AbortController();controllers.current.add(controller);const timeout=setTimeout(()=>controller.abort(),15000);return {controller,finish:()=>{clearTimeout(timeout);controllers.current.delete(controller);}};}
 function changedContext(){owner.current=null;++workRequest.current;++caseRequest.current;for(const controller of controllers.current)controller.abort();setSelected(null);setCases({status:'error'});setWork({status:'error'});}
 const loadWork=useCallback(async()=>{
  const id=++workRequest.current,generation=epoch.current,op=operation();++caseRequest.current;owner.current=null;setSelected(null);setCases({status:'loading'});setWork({status:'loading'});
  const isCurrent=()=>id===workRequest.current&&generation===epoch.current&&!op.controller.signal.aborted;
  try{
   const headers=await authHeaders();if(id!==workRequest.current||generation!==epoch.current)return;if(op.controller.signal.aborted)throw Error('deadline');if(!headers.Authorization)throw Error('session_required');
   const next=await loadAgenda(()=>fetch(apiUrl('/assignments/mine'),{method:'GET',headers,signal:op.controller.signal}),isCurrent);
   const current=await authHeaders();if(id!==workRequest.current||generation!==epoch.current)return;
   if(current.Authorization!==headers.Authorization){changedContext();return;}
   if(op.controller.signal.aborted){setWork({status:'error'});return;}
   setWork(next);owner.current=next.status==='ready'?headers.Authorization:null;
  }catch{if(id===workRequest.current&&generation===epoch.current)setWork({status:'error'});}
  finally{op.finish();}
 },[]);
 useFocusEffect(useCallback(()=>{++epoch.current;void loadWork();return()=>{++epoch.current;++workRequest.current;++caseRequest.current;owner.current=null;for(const controller of controllers.current)controller.abort();controllers.current.clear();setSelected(null);setCases({status:'loading'});setWork({status:'loading'});};},[loadWork]));
 async function selectWork(assignment:Assignment){
  const authorization=owner.current;
  if(!authorization||work.status!=='ready'||!work.data.some(a=>a.id===assignment.id&&a.tenantId===assignment.tenantId))return;
  const id=++caseRequest.current,generation=epoch.current,op=operation();setSelected(assignment);setCases({status:'loading'});
  const isCurrent=()=>id===caseRequest.current&&generation===epoch.current&&!op.controller.signal.aborted;
  try{
   const headers=await authHeaders();if(id!==caseRequest.current||generation!==epoch.current)return;if(op.controller.signal.aborted)throw Error('deadline');
   if(headers.Authorization!==authorization){changedContext();return;}
   const next=await loadSupportCases(()=>fetch(apiUrl('/support-cases/mine'),{method:'GET',headers:{...headers,'x-tenant-id':assignment.tenantId},signal:op.controller.signal}),assignment.id,isCurrent);
   const current=await authHeaders();if(id!==caseRequest.current||generation!==epoch.current)return;
   if(current.Authorization!==authorization){changedContext();return;}
   if(op.controller.signal.aborted){setCases({status:'error'});return;}setCases(next);
  }catch{if(id===caseRequest.current&&generation===epoch.current)setCases({status:'error'});}
  finally{op.finish();}
 }
 const items=work.status==='ready'?work.data:[];
 return <View style={s.section}>
 <Text style={s.text}>Consulte as solicitações já registradas para um trabalho. Selecione o trabalho para carregar seus registros.</Text>
 {work.status==='loading'?<Text style={s.text}>Carregando seus trabalhos…</Text>:work.status==='error'?<View><Text style={s.text}>Não foi possível carregar seus trabalhos nesta sessão.</Text><Pressable accessibilityRole="button" onPress={()=>void loadWork()}><Text style={s.action}>Tentar novamente</Text></Pressable></View>:items.length===0?<Text style={s.text}>Nenhum trabalho disponível para consultar solicitações vinculadas.</Text>:items.map(assignment=>{const active=selected?.id===assignment.id&&selected?.tenantId===assignment.tenantId;return <Pressable key={assignment.tenantId+':'+assignment.id} style={s.choice} accessibilityRole="button" accessibilityState={{selected:active}} onPress={()=>void selectWork(assignment)}><Text style={s.heading}>{assignment.title}</Text><Text style={s.text}>{assignment.location?.trim()?assignment.location:'Local não informado'}</Text><Text style={s.text}>{assignmentSchedule(assignment)}</Text><Text style={s.action}>{active?'Trabalho selecionado':'Consultar solicitações deste trabalho'}</Text></Pressable>;})}
 {selected?<View style={s.section}><Text style={s.heading}>Solicitações de {selected.title}</Text>
 {cases.status==='loading'?<Text style={s.text}>Carregando solicitações…</Text>:cases.status==='error'?<View><Text style={s.text}>Não foi possível carregar as solicitações. Nenhuma ausência de registros foi confirmada.</Text><Pressable accessibilityRole="button" onPress={()=>void selectWork(selected)}><Text style={s.action}>Tentar novamente</Text></Pressable></View>:cases.data.length===0?<Text style={s.text}>Nenhuma solicitação registrada para este trabalho.</Text>:cases.data.map(c=><View key={c.id} style={s.choice}><Text style={s.heading}>{supportStatus(c.status)}</Text><Text style={s.text}>{c.description}</Text><Text style={s.text}>{new Date(c.createdAt).toLocaleString('pt-BR')}</Text>{c.resolutionNote?.trim()?<View><Text style={s.heading}>Resposta registrada</Text><Text style={s.text}>{c.resolutionNote}</Text></View>:null}</View>)}
 </View>:null}
 <Text style={s.text}>O envio de novas solicitações ainda não está disponível nesta área.</Text>
 </View>;
}
const s=StyleSheet.create({section:{gap:10},text:{fontSize:14,color:'#53617A'},heading:{fontSize:16,fontWeight:'800',color:'#111A35'},action:{fontSize:14,fontWeight:'700',color:'#651FFF'},choice:{gap:4,borderTopWidth:1,borderTopColor:'#E7EAF0',paddingTop:10}});

