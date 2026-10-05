import { Link } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ProfessionalNav } from '../components/ProfessionalNav';

export default function ProfissionalInicio() {
  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <View style={s.header}>
          <View>
            <Text style={s.greeting}>Olá, José! 👋</Text>
            <Text style={s.subtitle}>Quarta, 25 de setembro</Text>
          </View>
          <View style={s.avatar}><Text style={s.avatarText}>J</Text></View>
        </View>

        <Text style={s.sectionLabel}>PRÓXIMO TRABALHO</Text>
        <View style={s.nextCard}>
          <Text style={s.nextRole}>Garçom</Text>
          <Text style={s.nextPlace}>Hotel Blue Star</Text>
          <View style={s.metaRow}><Text style={s.meta}>Quarta · 18:00</Text><Text style={s.meta}>R$ 200</Text></View>
          <Link href="/agenda" style={s.primaryButton}>VER DETALHES</Link>
        </View>

        <View style={s.statsRow}>
          <View style={s.statCard}><Text style={s.statLabel}>Trabalhos este mês</Text><Text style={s.statValue}>—</Text></View>
          <View style={s.statCard}><Text style={s.statLabel}>Ganhos no mês</Text><Text style={s.statValue}>—</Text></View>
        </View>

        <View style={s.earningsCard}>
          <View>
            <Text style={s.earningsLabel}>Ganhos este mês</Text>
            <Text style={s.earningsValue}>Veja seus ganhos</Text>
          </View>
          <Link href="/ganhos" style={s.earningsLink}>ABRIR</Link>
        </View>

        <Text style={s.heading}>Oportunidades para você</Text>
        <View style={s.card}>
          <Text style={s.cardTitle}>Encontre seu próximo trabalho</Text>
          <Text style={s.body}>Veja oportunidades compatíveis e demonstre interesse em uma ação.</Text>
          <Link href="/trabalhos" style={s.action}>VER TRABALHOS</Link>
        </View>
      </ScrollView>
      <ProfessionalNav />
    </SafeAreaView>
  );
}

const s=StyleSheet.create({
  screen:{flex:1,backgroundColor:'#F7F6FB'},
  content:{padding:20,gap:16,paddingBottom:24},
  header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  greeting:{fontSize:26,fontWeight:'800',color:'#20202A'},
  subtitle:{fontSize:14,color:'#77727F',marginTop:4},
  avatar:{width:42,height:42,borderRadius:21,backgroundColor:'#E9E2FF',alignItems:'center',justifyContent:'center'},
  avatarText:{fontSize:18,fontWeight:'800',color:'#5B35D5'},
  sectionLabel:{fontSize:12,fontWeight:'800',color:'#77727F',letterSpacing:.7,marginTop:4},
  nextCard:{padding:20,borderRadius:18,backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#E9E6F2',gap:7},
  nextRole:{fontSize:23,fontWeight:'800',color:'#20202A'},
  nextPlace:{fontSize:16,fontWeight:'700',color:'#5B35D5'},
  metaRow:{flexDirection:'row',justifyContent:'space-between',marginVertical:4},
  meta:{fontSize:15,color:'#62616B'},
  primaryButton:{backgroundColor:'#5B35D5',color:'#FFFFFF',borderRadius:12,paddingVertical:13,textAlign:'center',fontWeight:'800',marginTop:6},
  statsRow:{flexDirection:'row',gap:12},
  statCard:{flex:1,padding:16,borderRadius:16,backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#E9E6F2',gap:6},
  statLabel:{fontSize:13,color:'#77727F'},
  statValue:{fontSize:25,fontWeight:'800',color:'#20202A'},
  earningsCard:{padding:18,borderRadius:18,backgroundColor:'#5B35D5',flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  earningsLabel:{fontSize:13,fontWeight:'700',color:'#EDE8FF'},
  earningsValue:{fontSize:20,fontWeight:'800',color:'#FFFFFF',marginTop:3},
  earningsLink:{color:'#FFFFFF',fontWeight:'800',padding:8},
  heading:{fontSize:21,fontWeight:'800',color:'#20202A',marginTop:2},
  card:{padding:18,borderWidth:1,borderColor:'#E9E6F2',backgroundColor:'#FFFFFF',borderRadius:16,gap:9},
  cardTitle:{fontSize:19,fontWeight:'800',color:'#20202A'},
  body:{fontSize:15,lineHeight:22,color:'#62616B'},
  action:{fontSize:16,fontWeight:'800',paddingVertical:8,color:'#5B35D5'}
});
