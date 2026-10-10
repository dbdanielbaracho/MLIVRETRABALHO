import { useFocusEffect } from 'expo-router';
import { useCallback,useRef,useState } from 'react';
import { Pressable,SafeAreaView,ScrollView,StyleSheet,Text,View } from 'react-native';
import { ProfessionalNav } from '../components/ProfessionalNav';
import { authHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';
import {runForSession} from '../lib/session-context';
import {loadEarnings,earningsWeek,earningStatus,type Earning} from '../lib/earnings';
import type {Section} from '../lib/professional-home';
const money=(v:number)=>'R$ '+(v/100).toFixed(2).replace('.',',');
export default function Ganhos(){
 const[result,setResult]=useState<Section<Earning[]>>({status:'loading'}),[showAll,setShowAll]=useState(false);
 const requestId=useRef(0),generation=useRef(0),controllers=useRef(new Set<AbortController>());
 const load=useCallback(async(focusSignal?:AbortSignal)=>{
  const id=++requestId.current,version=generation.current;setResult({status:'loading'});
  const controller=new AbortController(),cancel=()=>controller.abort();controllers.current.add(controller);
  focusSignal?.addEventListener('abort',cancel);if(focusSignal?.aborted)controller.abort();
  const timeout=setTimeout(()=>{controller.abort();if(id===requestId.current&&version===generation.current&&!focusSignal?.aborted)setResult({status:'error'});},15000);
  try{
   const next=await runForSession(authHeaders,headers=>loadEarnings(()=>fetch(apiUrl('/earnings/mine'),{headers,signal:controller.signal})),()=>id===requestId.current&&version===generation.current&&!controller.signal.aborted&&!focusSignal?.aborted);
   if(id===requestId.current&&version===generation.current&&!controller.signal.aborted&&!focusSignal?.aborted)setResult(next.status==='ready'?next.data:{status:'error'});
  }catch{if(id===requestId.current&&version===generation.current&&!focusSignal?.aborted)setResult({status:'error'});}
  finally{controllers.current.delete(controller);clearTimeout(timeout);focusSignal?.removeEventListener('abort',cancel);}
 },[]);
 useFocusEffect(useCallback(()=>{++generation.current;const controller=new AbortController();void load(controller.signal);return()=>{++generation.current;++requestId.current;controller.abort();for(const c of controllers.current)c.abort();controllers.current.clear();setResult({status:'loading'});};},[load]));
 const items=result.status==='ready'?result.data:[],week=earningsWeek(items),max=Math.max(...week.daily,1);
 return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}>
 <Text style={s.title}>Ganhos</Text><View style={s.summary}>
 <Text style={s.summaryLabel}>Total da semana</Text><Text style={s.value}>{result.status==='ready'?money(week.total):'—'}</Text>
 {result.status==='ready'?<><Text style={s.meta}>A receber e pagos, de segunda-feira até agora.</Text><View style={s.chart}>{week.daily.map((v,i)=><View key={i} style={s.day}><View style={[s.bar,{height:Math.max(5,64*v/max)}]}/><Text style={s.dayLabel}>{['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'][i]}</Text></View>)}</View></>:null}
 </View><View style={s.sectionHead}><Text style={s.heading}>Últimos trabalhos</Text><Pressable onPress={()=>setShowAll(v=>!v)} accessibilityRole="button"><Text style={s.seeAll}>{showAll?'Ver menos':'Ver todos'}</Text></Pressable></View>
 {result.status==='loading'?<Text style={s.meta}>Carregando ganhos…</Text>:null}
 {result.status==='error'?<Pressable accessibilityRole="button" onPress={()=>void load()}><Text style={s.meta}>Não foi possível carregar seus ganhos. Toque para tentar novamente.</Text></Pressable>:null}
 {result.status==='ready'&&items.length===0?<View style={s.card}><Text style={s.job}>Nenhum ganho registrado</Text><Text style={s.meta}>Seus trabalhos concluídos aparecerão aqui.</Text></View>:null}
 {(showAll?items:items.slice(0,6)).map(x=><View key={x.tenantId+':'+x.id} style={s.card}><View style={s.thumb}><Text style={s.thumbText}>{x.status==='paid'?'✓':x.status==='reversed'?'↩':'◷'}</Text></View><View style={s.jobInfo}><Text style={s.job}>{x.title}</Text><Text style={s.meta}>{new Date(x.createdAt).toLocaleDateString('pt-BR')}</Text><Text style={s.done}>{earningStatus(x.status)}</Text></View><Text style={s.amount}>{money(x.amountCents)}</Text></View>)}
 </ScrollView><ProfessionalNav/></SafeAreaView>;
}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#FFF'},content:{padding:20,gap:13,paddingBottom:24},title:{fontSize:28,fontWeight:'900',color:'#111A35'},summary:{padding:20,borderRadius:14,backgroundColor:'#FFF',borderWidth:1,borderColor:'#E7EAF0',gap:5},summaryLabel:{fontSize:13,fontWeight:'700',color:'#65708A'},value:{fontSize:34,fontWeight:'900',color:'#111A35'},chart:{height:92,flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between',marginTop:10},day:{flex:1,alignItems:'center',justifyContent:'flex-end',gap:5},bar:{width:18,borderRadius:5,backgroundColor:'#651FFF'},dayLabel:{fontSize:9,fontWeight:'700',color:'#65708A'},sectionHead:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:6},heading:{fontSize:16,fontWeight:'900',color:'#111A35'},seeAll:{fontSize:12,fontWeight:'800',color:'#651FFF'},card:{padding:13,borderWidth:1,borderColor:'#E7EAF0',backgroundColor:'#FFF',borderRadius:12,flexDirection:'row',alignItems:'center',gap:11},thumb:{width:42,height:42,borderRadius:9,backgroundColor:'#F0EBFF',alignItems:'center',justifyContent:'center'},thumbText:{fontWeight:'900',color:'#651FFF'},jobInfo:{flex:1},job:{fontSize:14,fontWeight:'800',color:'#111A35'},amount:{fontSize:15,fontWeight:'900',color:'#651FFF'},meta:{fontSize:11,color:'#65708A',marginTop:2},done:{fontSize:10,fontWeight:'800',color:'#218A4B',marginTop:3}});
