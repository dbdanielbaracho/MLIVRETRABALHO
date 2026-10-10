import { router,useFocusEffect } from 'expo-router';
import { useCallback,useRef,useState } from 'react';
import { Alert,Pressable,SafeAreaView,ScrollView,StyleSheet,Text,TextInput,View } from 'react-native';
import { apiUrl } from '../lib/api';
import { authHeaders,clearSessionForAuthorization } from '../lib/session';

import {loadPrivacyRequests} from '../lib/privacy-requests';
import type {PrivacyRequestResult} from '../lib/privacy-requests';
import {createPrivacyRequest,deactivatePrivacyAccount,exportPrivacyData,samePrivacySession} from '../lib/privacy-actions';
import type {ActionFailure,ActionRequest,ManualPrivacyType} from '../lib/privacy-actions';
const requestLabels:Record<string,string>={correction:'Solicitar correção',erasure:'Solicitar eliminação',restriction:'Solicitar restrição',objection:'Registrar oposição',consent_withdrawal:'Revogar consentimento',automated_decision_review:'Solicitar revisão de decisão automatizada',sharing_information:'Pedir informações de compartilhamento',portability:'Solicitar portabilidade, quando aplicável'};


export default function Privacidade(){
  const[requestState,setRequestState]=useState<PrivacyRequestResult>({status:'loading'}),[message,setMessage]=useState(''),[details,setDetails]=useState(''),[exportText,setExportText]=useState(''),[busy,setBusy]=useState(false),[uncertain,setUncertain]=useState(false);
  const draftAuthorization=useRef<string|null>(null),sequence=useRef(0),epoch=useRef(0),controllers=useRef(new Set<AbortController>()),pending=useRef(false),confirming=useRef(false),unknown=useRef(false),snapshot=useRef<Record<string,string>|null>(null);
  const requests=requestState.status==='ready'?requestState.data:[];
  const disabled=busy||uncertain||requestState.status!=='ready';
  function markUnknown(){unknown.current=true;setUncertain(true);setMessage('Não foi possível confirmar o resultado. Atualize os pedidos e confira o estado antes de tentar outra ação.');}
  function changedContext(){snapshot.current=null;setDetails('');draftAuthorization.current=null;setExportText('');setRequestState({status:'error'});setMessage('A sessão mudou. Atualize os pedidos antes de continuar.');}
  async function load(manual=false,expected?:Record<string,string>){
    const id=++sequence.current,generation=epoch.current,controller=new AbortController();controllers.current.add(controller);snapshot.current=null;setRequestState({status:'loading'});
    const timer=setTimeout(()=>controller.abort(),15000);
    try{
      const headers=await authHeaders();
      if(id!==sequence.current||generation!==epoch.current)return;
      if(controller.signal.aborted){setRequestState({status:'error'});return;}
      if(draftAuthorization.current&&draftAuthorization.current!==headers.Authorization){setDetails('');setExportText('');}draftAuthorization.current=headers.Authorization??null;
      if(expected&&!samePrivacySession(headers,expected)){if(id===sequence.current&&generation===epoch.current)changedContext();return;}
      const result=await loadPrivacyRequests(path=>fetch(apiUrl(path),{headers,signal:controller.signal}));
      const current=await authHeaders();
      if(id!==sequence.current||generation!==epoch.current)return;
      if(controller.signal.aborted){setRequestState({status:'error'});return;}
      if(!samePrivacySession(current,headers)){changedContext();return;}
      setRequestState(result);
      if(result.status==='ready'){snapshot.current=headers;if(manual){unknown.current=false;setUncertain(false);}}
    }catch{if(id===sequence.current&&generation===epoch.current)setRequestState({status:'error'});}
    finally{clearTimeout(timer);controllers.current.delete(controller);}
  }
  useFocusEffect(useCallback(()=>{
    ++epoch.current;void load();
    return ()=>{if(pending.current){unknown.current=true;setUncertain(true);}++epoch.current;++sequence.current;for(const controller of controllers.current)controller.abort();controllers.current.clear();snapshot.current=null;pending.current=false;confirming.current=false;setBusy(false);setExportText('');};
  },[]));
  async function operate<T>(operation:(request:ActionRequest)=>Promise<T>,accept:(result:T,headers:Record<string,string>)=>Promise<void>,expected=snapshot.current){
    if(pending.current||unknown.current||!expected)return;
    pending.current=true;setBusy(true);const generation=epoch.current,controller=new AbortController();controllers.current.add(controller);const timer=setTimeout(()=>controller.abort(),15000);let sent=false;
    try{
      const headers=await authHeaders();if(generation!==epoch.current)return;
      if(!samePrivacySession(headers,expected)){changedContext();return;}
      if(controller.signal.aborted){setMessage('Não foi possível iniciar a ação. Tente novamente.');return;}
      const result=await operation((path,method,body)=>{if(controller.signal.aborted||generation!==epoch.current)throw new Error('inactive');sent=true;return fetch(apiUrl(path),{method,headers:body?{...headers,'content-type':'application/json'}:headers,...(body?{body:JSON.stringify(body)}:{}),signal:controller.signal});});
      const current=await authHeaders();if(generation!==epoch.current)return;
      if(!samePrivacySession(current,expected)){changedContext();if(sent)markUnknown();return;}
      if(controller.signal.aborted){if(sent)markUnknown();return;}
      await accept(result,headers);
    }catch{if(generation===epoch.current){if(sent)markUnknown();else setMessage('Não foi possível iniciar a ação. Atualize os pedidos.');}}
    finally{clearTimeout(timer);controllers.current.delete(controller);if(generation===epoch.current){pending.current=false;setBusy(false);}}
  }
  function failed(result:ActionFailure,fallback:string){if(result.status==='unknown'){markUnknown();return;}setMessage(result.message==='privacy_request_details_required'?'Inclua os detalhes necessários para este pedido.':result.message==='privacy_request_details_too_long'?'O texto do pedido precisa ter até 2.000 caracteres.':fallback);}
  async function createRequest(requestType:ManualPrivacyType){
    const draft=details;
    await operate(request=>createPrivacyRequest(request,requestType,draft),async(result,headers)=>{
      if(result.status==='created'){setDetails('');setMessage(`Pedido registrado: ${result.requestId}`);await load(false,headers);}
      else if(result.status==='invalid')setMessage(result.reason==='required'?'Descreva brevemente o que precisa ser corrigido, restringido, contestado ou revisado.':'O texto do pedido precisa ter até 2.000 caracteres.');
      else failed(result,'Não foi possível registrar o pedido.');
    });
  }
  async function exportData(){
    if(pending.current||unknown.current||!snapshot.current)return;setExportText('');
    await operate(exportPrivacyData,async(result,headers)=>{if(result.status==='generated'){setExportText(JSON.stringify(result.data,null,2));setMessage(`Cópia gerada. Pedido: ${result.data.requestId}`);await load(false,headers);}else failed(result,'Não foi possível gerar a cópia dos dados.');});
  }
  function confirmDeactivate(){
    if(pending.current||unknown.current||confirming.current||!snapshot.current)return;
    confirming.current=true;const generation=epoch.current,headers=snapshot.current;
    const dismiss=()=>{if(generation===epoch.current)confirming.current=false;};
    Alert.alert('Desativar conta','A desativação encerra a sessão e pode ser bloqueada se houver trabalho ativo, valor pendente ou se você for o único proprietário de uma empresa.',[{text:'Cancelar',style:'cancel',onPress:dismiss},{text:'Desativar',style:'destructive',onPress:()=>{dismiss();if(generation===epoch.current)void deactivate(headers);}}],{onDismiss:dismiss});
  }
  async function deactivate(expected:Record<string,string>){
    const generation=epoch.current;
    await operate(deactivatePrivacyAccount,async(result,headers)=>{
      if(result.status==='deactivated'){setExportText('');const cleared=await clearSessionForAuthorization(headers.Authorization);if(generation!==epoch.current)return;if(cleared==='cleared')router.replace('/');else if(cleared==='stale')changedContext();else setMessage('Conta desativada. Não foi possível limpar o acesso neste aparelho. Tente sair da conta.');}
      else if(result.status==='unknown')markUnknown();
      else{setMessage(result.message==='account_deactivation_active_assignment'?'Não é possível desativar com trabalho ativo.':result.message==='account_deactivation_unsettled_earnings'?'Não é possível desativar enquanto houver ganhos pendentes.':result.message==='account_deactivation_sole_tenant_owner'?'Antes de desativar, defina outro proprietário para a empresa.':'Não foi possível desativar a conta.');await load(false,headers);}
    },expected);
  }
  return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}><Text style={s.title}>Privacidade e dados</Text><Text>Você pode acessar seus dados, registrar pedidos e acompanhar o estado de cada solicitação.</Text><View style={s.notice}><Text style={s.bold}>Como usamos seus dados</Text><Text>Usamos dados de conta, perfil, disponibilidade, trabalhos, mensagens, reputação, segurança e informações financeiras necessárias para operar o serviço.</Text><Text>Localização precisa não é rastreada em segundo plano. Quando usada no check-in/out, é episódica e sua precisão é removida conforme a política de retenção, salvo conservação justificada.</Text><Text>Dados são mantidos apenas pelo tempo necessário à finalidade e podem ser compartilhados somente quando necessários para a operação, infraestrutura, pagamentos, verificação ou obrigação aplicável.</Text><Text>Matching e ranking podem usar sinais automatizados, mas efeitos materiais críticos não devem resultar em punição automática sem possibilidade de revisão humana.</Text></View><Pressable disabled={disabled} style={s.primary} onPress={()=>void exportData()}><Text style={s.bold}>Gerar cópia dos meus dados</Text></Pressable><Text style={s.heading}>Registrar outro pedido</Text><TextInput style={s.input} multiline maxLength={2000} placeholder="Detalhes do pedido (necessários para correção, restrição, oposição ou revisão)" value={details} editable={!busy} onChangeText={setDetails}/>{Object.entries(requestLabels).map(([type,label])=><Pressable disabled={disabled} key={type} style={s.button} onPress={()=>void createRequest(type as ManualPrivacyType)}><Text style={s.bold}>{label}</Text></Pressable>)}{message?<Text style={s.message}>{message}</Text>:null}{exportText?<View style={s.exportBox}><Text>Esta cópia é exibida somente nesta tela e não é salva pelo aplicativo.</Text><Text selectable>{exportText}</Text><Pressable style={s.button} onPress={()=>setExportText('')}><Text style={s.bold}>Limpar cópia exibida</Text></Pressable></View>:null}<Text style={s.heading}>Meus pedidos</Text><Pressable disabled={busy} accessibilityRole="button" onPress={()=>{if(!pending.current)void load(true);}}><Text>Atualizar pedidos</Text></Pressable>{requestState.status==='loading'?<Text>Carregando pedidos…</Text>:requestState.status==='error'?<Text>Não foi possível carregar os pedidos. Use Atualizar pedidos para tentar novamente.</Text>:null}{requestState.status==='ready'&&requests.length===0?<Text>Nenhum pedido registrado.</Text>:requests.map(r=><View key={r.id} style={s.card}><Text style={s.bold}>{r.requestType}</Text><Text>Status: {r.status}</Text>{r.requestDetails?<Text>Detalhes: {r.requestDetails}</Text>:null}<Text selectable>ID: {r.id}</Text><Text>{new Date(r.createdAt).toLocaleString()}</Text>{r.resolutionCode?<Text>Resultado: {r.resolutionCode}</Text>:null}</View>)}<Text style={s.heading}>Conta</Text><Pressable disabled={disabled} style={s.danger} onPress={confirmDeactivate}><Text style={s.bold}>Desativar minha conta</Text></Pressable></ScrollView></SafeAreaView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{padding:24,gap:12},title:{fontSize:30,fontWeight:'800'},heading:{fontSize:22,fontWeight:'800',marginTop:8},input:{borderWidth:1,borderRadius:12,padding:14,minHeight:90,textAlignVertical:'top'},primary:{borderWidth:2,borderRadius:12,padding:15,alignItems:'center'},button:{borderWidth:1,borderRadius:12,padding:14,alignItems:'center'},danger:{borderWidth:1,borderRadius:12,padding:14,alignItems:'center',marginBottom:30},bold:{fontWeight:'800'},message:{fontWeight:'700'},card:{borderWidth:1,borderRadius:12,padding:14,gap:4},notice:{borderWidth:1,borderRadius:12,padding:14,gap:8},exportBox:{borderWidth:1,borderRadius:12,padding:12,maxHeight:360,gap:10}});
