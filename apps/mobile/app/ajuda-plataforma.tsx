import {router,useFocusEffect} from 'expo-router';
import {useCallback,useMemo,useRef,useState} from 'react';
import {Platform,Pressable,StatusBar,ScrollView,StyleSheet,Text,TextInput,View,useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {authHeaders} from '../lib/session';
import {apiUrl} from '../lib/api';
import {platformIntentStore} from '../lib/platform-support-storage';
import {createPlatformSupportFlow,platformCategories,platformInput,type PlatformResult,type PlatformPage,type PlatformCase} from '../lib/platform-support';
const statusLabel:Record<string,string>={open:'Aberta',reviewing:'Em análise',resolved:'Resolvida',withdrawn:'Retirada',expired:'Expirada'};
export default function AjudaPlataforma(){
 const {fontScale}=useWindowDimensions();
 const [view,setView]=useState<PlatformResult|{status:'loading'}>({status:'loading'}),[page,setPage]=useState<PlatformPage|null>(null),[detail,setDetail]=useState<PlatformCase|null>(null);
 const [category,setCategory]=useState('other'),[description,setDescription]=useState(''),[notice,setNotice]=useState(''),[busy,setBusy]=useState(false);
 const active=useRef(false),epoch=useRef(0),running=useRef(false),owner=useRef<string|null>(null);
 const flow=useMemo(()=>createPlatformSupportFlow({getHeaders:authHeaders,transport:(path,init)=>fetch(apiUrl(path),init),store:platformIntentStore,isCurrent:()=>active.current}),[]);
 function reset(){setPage(null);setDetail(null);setDescription('');setCategory('other');setNotice('');owner.current=null;}
 async function act(work:()=>Promise<PlatformResult>,more=false){
  if(running.current||!active.current)return;const generation=epoch.current;running.current=true;setBusy(true);setView({status:'loading'});setNotice('');
  try{
   const result=await work();if(!active.current||generation!==epoch.current)return;
   if(result.status==='stale'||result.status==='session'){reset();setView({status:'session'});return;}
   let sameOwner=true;
   if('identityId' in result){sameOwner=owner.current===result.identityId;if(owner.current&& !sameOwner)reset();owner.current=result.identityId;}
   if(result.status==='ready'){setPage(previous=>more&&sameOwner&&previous?{...result.page,items:[...previous.items,...result.page.items.filter(x=>!previous.items.some(y=>y.id===x.id))]}:result.page);setDetail(null);}
   if(result.status==='detail')setDetail(result.data);
   if(result.status==='confirmed'){setPage(null);setDescription('');setDetail(null);setNotice('Solicitação confirmada na plataforma.');}
   if(result.status==='prepared')setCategory(result.record.category);
   if(result.status==='cleared'){setDescription('');setDetail(null);setPage(null);setNotice('Tentativa encerrada neste aparelho. Atualize para iniciar outra solicitação.');}
   if(result.status==='withdrawn'){setPage(previous=>previous?{...previous,items:previous.items.map(row=>row.id===result.id?{...row,status:'withdrawn'}:row)}:previous);setDetail(null);setNotice('Retirada confirmada. Atualize o histórico para consultar o estado atual.');}
   if(result.status==='unavailable')setNotice('O atendimento da plataforma está indisponível. Seu rascunho nesta conta foi mantido. Consulte a tentativa antes de tentar novamente.');
   if(result.status==='error')setNotice('Não foi possível confirmar a operação. Atualize ou consulte o protocolo; nenhum reenvio foi feito.');
   if(result.status==='invalid')setNotice('Escolha um assunto e escreva de 1 a 4.000 caracteres válidos.');
   setView(result);
  }finally{if(active.current&&generation===epoch.current){running.current=false;setBusy(false);}}
 }
 useFocusEffect(useCallback(()=>{active.current=true;++epoch.current;running.current=false;void act(()=>flow.load());return()=>{active.current=false;++epoch.current;running.current=false;flow.cancel();};},[flow]));
 async function send(){if(view.status!=='ready'||!page?.acceptingRequests||!platformInput(category,description))return;return act(()=>flow.send(category,description));}
 async function retry(){if(view.status!=='prepared'||!platformInput(view.record.category,description))return;return act(()=>flow.retry(description));}
 const pending='record' in view?view.record:null;
 const visible=['ready','detail','confirmed','prepared','withdrawn','cleared','expired'].includes(view.status)&&'identityId' in view&&owner.current===view.identityId;
 const editable=!busy&&(view.status==='ready'||view.status==='prepared');
 const sendDisabled=!editable||!platformInput(category,description)||(view.status==='ready'&&!page?.acceptingRequests);
 return <SafeAreaView edges={['bottom']} style={s.screen}><ScrollView key={fontScale} keyboardShouldPersistTaps="handled" contentContainerStyle={s.content}>
  <Pressable accessibilityRole="button" onPress={()=>router.replace('/perfil')}><Text style={s.action}>Voltar ao perfil</Text></Pressable>
  <Text style={s.title}>Ajuda à plataforma</Text>
  <Text style={s.text}>Para problemas do aplicativo, mesmo sem vínculo com empresa ou perfil profissional. Sua solicitação não é enviada à empresa.</Text>
  <Text style={s.text}>Não informe senhas, tokens ou documentos pessoais. Não é chat ao vivo e não há prazo de resposta prometido.</Text>
  {view.status==='loading'?<Text accessibilityLiveRegion="polite" style={s.text}>Verificando a conta e as solicitações…</Text>:null}
  {view.status==='session'?<Text style={s.text}>A sessão mudou ou expirou. Entre na conta atual e atualize esta tela.</Text>:null}
  {notice?<Text accessibilityLiveRegion="polite" style={s.text}>{notice}</Text>:null}
  {view.status==='unknown'||view.status==='conflict'?<View style={s.card}><Text style={s.heading}>Resultado não confirmado</Text><Text style={s.text}>A chave desta tentativa foi preservada. Consulte o resultado antes de qualquer novo envio. Nenhuma nova solicitação será criada automaticamente.</Text></View>:null}
  {view.status==='expired'?<Text style={s.text}>A janela de recuperação expirou e nenhum protocolo foi encontrado. Não houve reenvio. Você pode encerrar esta tentativa antes de iniciar outra.</Text>:null}
  {view.status==='prepared'?<Text style={s.text}>Esta chave está preparada, mas o registro ainda não foi confirmado. Consulte novamente ou informe a mensagem original e escolha explicitamente reenviar a mesma tentativa. Conteúdo diferente será recusado pelo servidor.</Text>:null}
  {(view.status==='ready'||view.status==='prepared')?<View style={s.card}>
   {view.status==='ready'&&!page?.acceptingRequests?<Text style={s.text}>Atendimento da plataforma indisponível para novas solicitações. Você pode consultar seu histórico; o rascunho fica nesta tela.</Text>:null}
   <Text style={s.heading}>Assunto</Text><View style={s.choices}>{platformCategories.map(([value,label])=><Pressable key={value} accessibilityRole="button" accessibilityState={{selected:category===value,disabled:!editable||view.status==='prepared'}} disabled={!editable||view.status==='prepared'} onPress={()=>setCategory(value)} style={[s.choice,category===value?s.selected:null]}><Text style={[s.text,s.choiceLabel]}>{label}</Text></Pressable>)}</View>
   <Text style={s.heading}>Mensagem</Text><TextInput accessibilityLabel="Mensagem para a plataforma" multiline textAlignVertical="top" style={s.field} value={description} editable={editable} onChangeText={setDescription}/><Text style={s.text}>{Array.from(description.trim()).length}/4.000 caracteres</Text>
   <Pressable accessibilityRole="button" accessibilityState={{disabled:sendDisabled}} disabled={sendDisabled} style={[s.button,sendDisabled?s.buttonDisabled:null]} onPress={()=>void(view.status==='prepared'?retry():send())}><Text style={[s.buttonText,sendDisabled?s.buttonTextDisabled:null]}>{view.status==='prepared'?'Reenviar a mesma tentativa':'Enviar à plataforma'}</Text></Pressable>
  </View>:null}
  {view.status==='confirmed'?<View style={s.card}><Text style={s.heading}>Solicitação confirmada</Text><Text selectable style={s.text}>Protocolo: {view.data.id}</Text><Text style={s.text}>{statusLabel[view.data.status]}</Text><Pressable accessibilityRole="button" onPress={()=>void act(()=>flow.detail(view.data.id))}><Text style={s.action}>Consultar protocolo confirmado</Text></Pressable></View>:null}
  {visible&&pending?<Text selectable style={s.text}>Chave da tentativa: {pending.requestKey}</Text>:null}
  {view.status==='confirmed'||view.status==='expired'?<Pressable accessibilityRole="button" disabled={busy} onPress={()=>void act(()=>flow.release())}><Text style={s.action}>Encerrar tentativa neste aparelho</Text></Pressable>:null}
  {visible&&detail?<View style={s.card}><Text style={s.heading}>Detalhe da solicitação</Text><Text selectable style={s.text}>{detail.id}</Text><Text style={s.text}>{statusLabel[detail.status]}</Text><Text style={s.text}>{detail.description??'Conteúdo minimizado conforme a política de retenção.'}</Text>
   {!detail.responses?.length?<Text style={s.text}>Nenhuma resposta registrada.</Text>:detail.responses.map(r=><View key={r.id} style={s.response}><Text style={s.heading}>Resposta da plataforma</Text><Text style={s.text}>{r.body??'Conteúdo minimizado conforme a política de retenção.'}</Text><Text style={s.text}>{r.createdAt}{r.resolvesCase?' · Encerramento explícito':''}</Text></View>)}
   {['open','reviewing'].includes(detail.status)?<Pressable accessibilityRole="button" disabled={busy} onPress={()=>void act(()=>flow.withdraw(detail.id))}><Text style={s.action}>Retirar esta solicitação</Text></Pressable>:null}
  </View>:null}
  {visible&&page?<View style={s.card}><Text style={s.heading}>Seu histórico na plataforma</Text>{!page.items.length?<Text style={s.text}>Nenhuma solicitação registrada nesta conta.</Text>:page.items.map(row=><Pressable key={row.id} accessibilityRole="button" disabled={busy} style={s.response} onPress={()=>void act(()=>flow.detail(row.id))}><Text selectable style={s.text}>{row.id}</Text><Text style={s.text}>{statusLabel[row.status]} · {row.createdAt}</Text></Pressable>)}
   {page.nextCursor?<Pressable accessibilityRole="button" disabled={busy} onPress={()=>void act(()=>flow.load(page.nextCursor!),true)}><Text style={s.action}>Carregar mais solicitações</Text></Pressable>:null}
  </View>:null}
  {!busy?<Pressable accessibilityRole="button" onPress={()=>void act(()=>flow.load())}><Text style={s.action}>{pending?'Consultar resultado da tentativa':'Atualizar solicitações'}</Text></Pressable>:null}
 </ScrollView></SafeAreaView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#FFF',paddingTop:Platform.OS==='android'?(StatusBar.currentHeight??0):0},content:{padding:20,gap:16,paddingBottom:40},title:{fontSize:28,fontWeight:'900',color:'#111A35'},heading:{fontSize:17,fontWeight:'800',color:'#111A35'},text:{fontSize:15,lineHeight:23,color:'#53617A'},action:{fontSize:15,fontWeight:'700',color:'#651FFF',paddingVertical:10},card:{padding:16,gap:12,borderWidth:1,borderColor:'#E7EAF0',borderRadius:12},choices:{flexDirection:'row',flexWrap:'wrap',gap:8},choiceLabel:{flexShrink:1},choice:{maxWidth:'100%',padding:10,borderWidth:1,borderColor:'#E7EAF0',borderRadius:8},selected:{borderColor:'#651FFF',backgroundColor:'#F4EEFF'},field:{minHeight:140,borderWidth:1,borderColor:'#9AA3B4',borderRadius:10,padding:12,color:'#111A35'},button:{backgroundColor:'#651FFF',borderRadius:10,padding:14},buttonDisabled:{backgroundColor:'#E7EAF0'},buttonTextDisabled:{color:'#53617A'},buttonText:{color:'#FFF',fontWeight:'800',textAlign:'center'},response:{paddingVertical:12,borderTopWidth:1,borderColor:'#E7EAF0',gap:6}});
