import {useFocusEffect} from 'expo-router';
import {useCallback,useMemo,useRef,useState} from 'react';
import {Pressable,StyleSheet,Text,TextInput,View} from 'react-native';
import {authHeaders} from '../lib/session';
import {apiUrl} from '../lib/api';
import {supportIntentStore} from '../lib/support-intent-storage';
import {createSupportSubmission,type SupportSubmissionResult} from '../lib/support-submission';
import type {Assignment} from '../lib/agenda';
import type {SupportContext} from '../lib/support-contexts';
const categories=[['schedule','Horários'],['payment','Pagamento'],['work_conditions','Condições de trabalho'],['cancellation','Cancelamento'],['dispute','Conflito'],['other','Outro assunto']] as const;
const priorities=[['normal','Normal'],['high','Alta'],['urgent','Urgente']] as const;
type Props=({assignment:Assignment;generalContext?:never}|{assignment?:never;generalContext:SupportContext})&{workItems:Assignment[];authorization:string;onRegistered():void;onContextChanged():void};
export function SupportRequest({assignment,generalContext,workItems,authorization,onRegistered,onContextChanged}:Props){
 const[view,setView]=useState<SupportSubmissionResult|{status:'loading'}>({status:'loading'}),[description,setDescription]=useState(''),[category,setCategory]=useState<string>('schedule'),[priority,setPriority]=useState<string>('normal'),[notice,setNotice]=useState(''),[busy,setBusy]=useState(false);
 const active=useRef(false),epoch=useRef(0),running=useRef(false),callbacks=useRef({onRegistered,onContextChanged});callbacks.current={onRegistered,onContextChanged};
 const flow=useMemo(()=>createSupportSubmission({getHeaders:authHeaders,transport:(path,options)=>fetch(apiUrl(path),options),store:supportIntentStore,isCurrent:()=>active.current}),[]);
 const current=(generation:number)=>active.current&&epoch.current===generation;
 function apply(result:SupportSubmissionResult,generation:number){
  if(!current(generation))return;
  if(result.status==='stale'){setDescription('');setView({status:'error'});callbacks.current.onContextChanged();return;}
  setView(result.status==='busy'?{status:'error'}:result);
 }
 const refresh=useCallback(async()=>{
  if(running.current||!active.current)return;
  const generation=epoch.current;running.current=true;setBusy(true);setView({status:'loading'});
  try{const result=await flow.inspect(authorization);apply(result,generation);if(result.status==='confirmed'&&current(generation))setNotice('');}
  finally{if(current(generation)){running.current=false;setBusy(false);}}
 },[flow,authorization]);
 useFocusEffect(useCallback(()=>{
  ++epoch.current;active.current=true;running.current=false;setNotice('');void refresh();
  return()=>{active.current=false;++epoch.current;running.current=false;flow.cancel();setDescription('');setNotice('');setBusy(false);setView({status:'loading'});};
 },[flow,refresh]));
 async function act(operation:()=>Promise<SupportSubmissionResult>,clearDraft=false){
  if(running.current||!active.current)return;
  const generation=epoch.current;running.current=true;setBusy(true);setNotice('');
  try{
   const result=await operation();if(!current(generation))return;
   if(result.status==='invalid'){setNotice('Revise o trabalho, o assunto e a mensagem antes de enviar.');return;}
   if(result.status==='unknown'||result.status==='error'){
    setNotice(result.status==='unknown'?'Não foi possível confirmar o registro. Consulte a tentativa preservada abaixo antes de tentar novamente.':'Não foi possível concluir esta operação. Nenhum registro foi confirmado.');
    const restored=await flow.inspect(authorization);apply(restored,generation);
    if(restored.status==='confirmed'&&current(generation)){setNotice('');callbacks.current.onRegistered();}return;
   }
   apply(result,generation);
   if(result.status==='confirmed'&&current(generation))callbacks.current.onRegistered();
   if(result.status==='empty'&&clearDraft&&current(generation))setDescription('');
  }finally{if(current(generation)){running.current=false;setBusy(false);}}
 }
 async function send(){
  if(view.status!=='empty'||!description.trim()||Array.from(description.trim()).length>4000)return;
  const tenantId=assignment?.tenantId??generalContext?.tenantId,assignmentId=assignment?.id??null;
  if(!tenantId)return;
  return act(()=>flow.sendNew(tenantId,assignmentId,{assignmentId,category,description,priority},authorization));
 }
 async function retry(){
  if(view.status!=='pending'||view.record.phase!=='pending')return;
  const requestKey=view.record.requestKey;return act(()=>flow.retry(requestKey,authorization));
 }
 async function release(){
  if(view.status!=='confirmed'||view.record.phase!=='confirmed')return;
  const requestKey=view.record.requestKey;return act(()=>flow.releaseConfirmed(requestKey,authorization),true);
 }
 const record='record' in view?view.record:null,ack=record?.phase==='confirmed'?record.acknowledgement:null;
 const originalWork=record?workItems.find(w=>w.tenantId.toLowerCase()===record.tenantId&&w.id.toLowerCase()===record.payload.assignmentId):undefined;
 const generalName=record&&record.payload.assignmentId===null&&generalContext&&generalContext.tenantId.toLowerCase()===record.tenantId?generalContext.displayName:null;
 const length=Array.from(description.trim()).length,canSend=view.status==='empty'&&length>0&&length<=4000&&!busy;
 return <View style={s.section}>
 <Text style={s.heading}>Solicitar ajuda</Text>
 {notice?<Text accessibilityLiveRegion="polite" style={s.text}>{notice}</Text>:null}
 {view.status==='loading'?<Text style={s.text}>Verificando suas solicitações…</Text>:view.status==='empty'?<View style={s.section}>
 <Text style={s.text}>{assignment?'Sua mensagem será vinculada a '+assignment.title+'.':'Sua mensagem será enviada no espaço '+generalContext?.displayName+', sem vínculo com um trabalho.'} Escolha o assunto e descreva o que aconteceu.</Text>
 <Text style={s.label}>Assunto</Text><View style={s.choices}>{categories.map(([value,label])=><Pressable key={value} style={[s.choice,category===value?s.selected:null]} accessibilityRole="button" accessibilityState={{selected:category===value,disabled:busy}} disabled={busy} onPress={()=>setCategory(value)}><Text style={s.text}>{label}</Text></Pressable>)}</View>
 <Text style={s.label}>Prioridade</Text><View style={s.choices}>{priorities.map(([value,label])=><Pressable key={value} style={[s.choice,priority===value?s.selected:null]} accessibilityRole="button" accessibilityState={{selected:priority===value,disabled:busy}} disabled={busy} onPress={()=>setPriority(value)}><Text style={s.text}>{label}</Text></Pressable>)}</View>
 <Text style={s.label}>Mensagem</Text><TextInput style={s.input} multiline editable={!busy} maxLength={8000} value={description} onChangeText={setDescription} accessibilityLabel="Mensagem da solicitação de suporte" placeholder="Descreva o que aconteceu" placeholderTextColor="#6D7A91"/>
 <Text style={s.text}>{length}/4000 caracteres</Text>
 <Pressable style={[s.button,!canSend?s.disabled:null]} accessibilityRole="button" accessibilityState={{disabled:!canSend}} disabled={!canSend} onPress={()=>void send()}><Text style={s.buttonText}>{busy?'Verificando envio…':'Enviar solicitação'}</Text></Pressable>
 </View>:record?<View style={s.section}>
 <Text style={s.label}>{originalWork?originalWork.title:generalName?'Suporte geral em '+generalName:'Solicitação anterior'}</Text><Text style={s.text}>Assunto: {categories.find(([value])=>value===record.payload.category)?.[1]??record.payload.category}</Text><Text style={s.text}>Prioridade: {priorities.find(([value])=>value===record.payload.priority)?.[1]??record.payload.priority}</Text><Text style={s.text}>{record.payload.description}</Text>
 {record.phase==='pending'?<View style={s.section}><Text style={s.text}>O registro desta solicitação ainda está sem confirmação. A mensagem continua preservada no contexto em que foi iniciada. A nova tentativa pode registrar o chamado se a anterior não foi concluída.</Text><Pressable style={[s.button,busy?s.disabled:null]} accessibilityRole="button" accessibilityState={{disabled:busy}} disabled={busy} onPress={()=>void retry()}><Text style={s.buttonText}>{busy?'Verificando solicitação…':'Tentar confirmar esta solicitação'}</Text></Pressable></View>:ack?<View style={s.section}><Text accessibilityLiveRegion="polite" style={s.label}>Solicitação registrada</Text><Text style={s.text}>{new Date(ack.createdAt).toLocaleString('pt-BR')}</Text><Text style={s.text}>Consulte o histórico para acompanhar as respostas registradas.</Text><Pressable accessibilityRole="button" accessibilityState={{disabled:busy}} disabled={busy} onPress={()=>void release()}><Text style={s.action}>Escrever outra solicitação</Text></Pressable></View>:null}
 </View>:<View style={s.section}><Text style={s.text}>Não foi possível verificar as solicitações preservadas nesta sessão. O envio permanece indisponível até essa verificação.</Text><Pressable accessibilityRole="button" accessibilityState={{disabled:busy}} disabled={busy} onPress={()=>void refresh()}><Text style={s.action}>Verificar novamente</Text></Pressable></View>}
 </View>;
}
const s=StyleSheet.create({section:{gap:10},heading:{fontSize:16,fontWeight:'800',color:'#111A35'},label:{fontSize:14,fontWeight:'700',color:'#111A35'},text:{fontSize:14,color:'#53617A'},action:{fontSize:14,fontWeight:'700',color:'#651FFF'},choices:{flexDirection:'row',flexWrap:'wrap',gap:8},choice:{borderWidth:1,borderColor:'#E7EAF0',borderRadius:12,padding:10},selected:{borderColor:'#651FFF',backgroundColor:'#F1EBFF'},input:{borderWidth:1,borderColor:'#E7EAF0',borderRadius:12,padding:12,minHeight:100,textAlignVertical:'top',fontSize:14,color:'#111A35'},button:{backgroundColor:'#651FFF',borderRadius:12,padding:12,alignItems:'center'},buttonText:{color:'#FFF',fontSize:14,fontWeight:'700'},disabled:{opacity:0.5}});
