import { useCallback, useState } from 'react';
import { Link, useFocusEffect } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ProfessionalNav } from '../components/ProfessionalNav';
import { authHeaders } from '../lib/session';
import { apiUrl } from '../lib/api';
import { loadHomeCards,loadingHomeCards } from '../lib/home-cards';
import { assignmentSchedule, assignmentsToday, availabilityState, loadProfessionalHome, loadingHome, nextAssignment, weeklyEarnings } from '../lib/professional-home';

export default function ProfissionalInicio(){
 const [data,setData]=useState(loadingHome),[cards,setCards]=useState(loadingHomeCards),[retry,setRetry]=useState(0);
 useFocusEffect(useCallback(()=>{
  let active=true;
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),15000);
  setData(loadingHome());setCards(loadingHomeCards());
  const request=async(path:string)=>{const headers=await authHeaders();return fetch(apiUrl(path),{headers,signal:controller.signal});};
  void Promise.all([loadProfessionalHome(request),loadHomeCards(request)]).then(([result,nextCards])=>{clearTimeout(timeout);if(active){setData(result);setCards(nextCards);}});
  return ()=>{active=false;clearTimeout(timeout);controller.abort();};
 },[retry]));
 const now=new Date();
 const name=data.profile.status==='ready'?data.profile.data?.displayName?.trim():'';
 const next=data.assignments.status==='ready'?nextAssignment(data.assignments.data,now):null;
 const available=data.availability.status==='ready'?availabilityState(data.availability.data,now):null;
 const failed=[...Object.values(data),...Object.values(cards)].some(section=>section.status==='error');
 const money=(cents:number)=>'R$ '+(cents/100).toFixed(2).replace('.',',');
 return <SafeAreaView style={s.screen}><ScrollView contentContainerStyle={s.content}>
 <View style={s.brandRow}><Text style={s.brand}>MLIVRE<Text style={s.purple}>TRABALHO</Text></Text><Link href="/notificacoes" asChild><Pressable accessibilityRole="button" accessibilityLabel="Abrir notificações"><Text style={s.bell}>♧</Text></Pressable></Link></View>
 <Text style={s.greeting}>{name?'Olá, '+name+'!':'Olá!'}</Text><Text style={s.subtitle}>{now.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'})}</Text>
 {data.profile.status==='loading'&&<Text style={s.small}>Carregando perfil…</Text>}
 {data.profile.status==='error'&&<Text style={s.error}>Não foi possível carregar seu perfil.</Text>}
 {data.assignments.status==='ready'?<Text style={s.small}>{assignmentsToday(data.assignments.data,now)} trabalhos hoje</Text>:null}
 {failed&&<View accessibilityLiveRegion="polite"><Text style={s.error}>Alguns dados não puderam ser carregados.</Text><Pressable accessibilityRole="button" onPress={()=>setRetry(value=>value+1)} style={s.retry}><Text style={s.purple}>Tentar novamente</Text></Pressable></View>}
 <Text style={s.heading}>Próximo trabalho</Text>
 {data.assignments.status==='ready'?<Link href="/agenda" asChild><Pressable style={s.card} accessibilityRole="button" accessibilityLabel={next?'Abrir agenda: '+next.title:'Abrir agenda'}>
  <Text style={s.cardTitle}>{next?.title??'Nenhum trabalho agendado'}</Text>
  {next?<><Text style={s.meta}>◷ {assignmentSchedule(next)}</Text><Text style={s.meta}>⌾ {next.location?.trim()||'Local não informado'}</Text><Text style={s.opportunityValue}>{next.payCents!=null?money(next.payCents):'Valor a confirmar'}</Text></>:<Text style={s.meta}>Confira sua agenda e encontre novos trabalhos.</Text>}
  <Text style={s.chevron}>›</Text>
 </Pressable></Link>:<View style={s.card}><Text style={data.assignments.status==='error'?s.error:s.meta}>{data.assignments.status==='loading'?'Carregando agenda…':'Não foi possível carregar seu próximo trabalho.'}</Text></View>}
 <View style={s.sectionHead}><Text style={s.heading}>Oportunidades para você</Text><Link href="/trabalhos" style={s.seeAll}>Ver todas</Link></View>
 {cards.opportunities.status==='loading'?<Text style={s.small}>Carregando oportunidades…</Text>:cards.opportunities.status==='error'?<Text style={s.error}>Não foi possível carregar oportunidades.</Text>:cards.opportunities.status==='ready'&&(cards.opportunities.data.length===0?<View style={s.card}><Text style={s.cardTitle}>Nenhuma oportunidade disponível agora</Text><Link href="/trabalhos" style={s.purple}>Ver trabalhos</Link></View>:cards.opportunities.data.slice(0,2).map(job=><Link key={job.id} href="/trabalhos" asChild><Pressable style={s.card} accessibilityRole="button" accessibilityLabel={'Ver trabalhos: '+job.title}><Text style={s.cardTitle}>{job.title}</Text><Text style={s.meta}>{assignmentSchedule({...job,status:'open'})}</Text><Text style={s.meta}>{job.location?.trim()||job.workCity?.trim()||'Local a confirmar'}</Text><Text style={s.opportunityValue}>{job.payCents!=null?money(job.payCents):'Valor a confirmar'}</Text></Pressable></Link>))}
 <Link href="/perfil" asChild><Pressable style={s.passport} accessibilityRole="button" accessibilityLabel="Abrir Work Passport no Perfil"><Text style={s.cardTitle}>Work Passport</Text>{cards.passport.status==='loading'?<Text style={s.small}>Carregando reputação…</Text>:cards.passport.status==='error'?<Text style={s.error}>Não foi possível carregar sua reputação.</Text>:!cards.passport.data?<Text style={s.meta}>Complete seus dados no Perfil.</Text>:<View style={s.stats}><View style={s.stat}><Text style={s.statValue}>{cards.passport.data.completedWorkCount}</Text><Text style={s.small}>trabalhos concluídos</Text></View><View style={s.stat}><Text style={s.statValue}>{cards.passport.data.averageRating!=null?cards.passport.data.averageRating.toFixed(1)+' ★':'—'}</Text><Text style={s.small}>{cards.passport.data.ratingCount===0?'Sem avaliações':cards.passport.data.ratingCount+' avaliações'}</Text></View></View>}</Pressable></Link>
 <Link href="/ganhos" asChild><Pressable style={s.earningsCard} accessibilityRole="button" accessibilityLabel="Abrir ganhos da semana"><Text style={s.earningsLabel}>Ganhos desta semana</Text><Text style={s.earningsValue}>{data.earnings.status==='ready'?money(weeklyEarnings(data.earnings.data,now)):data.earnings.status==='loading'?'Carregando…':'Ganhos indisponíveis'}</Text><Text style={s.earningsLabel}>A receber e pagos</Text></Pressable></Link>
 <Text style={s.heading}>Sua disponibilidade</Text>
 <Link href="/disponibilidade" asChild><Pressable style={s.availability} accessibilityRole="button" accessibilityLabel="Abrir disponibilidade">
  <Text style={available==='current'?s.green:s.muted}>●</Text>
  <Text style={s.availText}>{data.availability.status==='loading'?'Carregando disponibilidade…':data.availability.status==='error'?'Disponibilidade não carregada':available==='current'?'Disponível no período cadastrado':available==='scheduled'?'Disponibilidade futura cadastrada':'Cadastre sua disponibilidade'}</Text><Text style={s.chev}>›</Text>
 </Pressable></Link>
 </ScrollView><ProfessionalNav/></SafeAreaView>
}
const s=StyleSheet.create({sectionHead:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},seeAll:{color:'#651FFF',fontSize:12,fontWeight:'800'},opportunityValue:{fontSize:17,fontWeight:'900',color:'#651FFF',textAlign:'right',marginTop:5},passport:{paddingVertical:10,gap:8},earningsCard:{backgroundColor:'#651FFF',padding:18,borderRadius:12,gap:5,marginTop:8},earningsLabel:{color:'#FFF',fontSize:12},earningsValue:{color:'#FFF',fontSize:24,fontWeight:'900'},screen:{flex:1,backgroundColor:'#FFF'},content:{padding:20,gap:9,paddingBottom:24},brandRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},brand:{fontSize:19,fontWeight:'900',color:'#111A35'},purple:{color:'#651FFF'},bell:{fontSize:24,color:'#651FFF'},greeting:{fontSize:25,fontWeight:'900',color:'#111A35',marginTop:5},subtitle:{fontSize:14,color:'#65708A',marginBottom:8},stats:{flexDirection:'row',gap:10},stat:{flex:1,minHeight:88,padding:14,borderWidth:1,borderColor:'#EEF0F5',borderRadius:12,backgroundColor:'#FFF'},statLabel:{fontSize:13,color:'#111A35'},statValue:{fontSize:22,fontWeight:'900',color:'#111A35',marginTop:4},small:{fontSize:12,color:'#65708A'},primary:{backgroundColor:'#651FFF',color:'#FFF',fontWeight:'900',fontSize:15,textAlign:'center',paddingVertical:15,borderRadius:10,marginVertical:5},heading:{fontSize:15,fontWeight:'800',color:'#111A35',marginTop:8},card:{position:'relative',padding:16,borderWidth:1,borderColor:'#E7EAF0',borderRadius:12,backgroundColor:'#FFF'},cardTitle:{fontSize:17,fontWeight:'900',color:'#111A35',marginBottom:6},meta:{fontSize:13,color:'#53617A',marginTop:3},chevron:{position:'absolute',right:14,top:30,fontSize:28,color:'#111A35'},availability:{flexDirection:'row',alignItems:'center',padding:15,borderWidth:1,borderColor:'#E7EAF0',borderRadius:12},error:{color:'#A32323',fontSize:12,marginTop:6},retry:{paddingVertical:10},muted:{color:'#65708A',fontSize:15,marginRight:8},green:{color:'#19C763',fontSize:15,marginRight:8},availText:{flex:1,color:'#53617A',fontSize:13},chev:{fontSize:24,color:'#111A35'}});
