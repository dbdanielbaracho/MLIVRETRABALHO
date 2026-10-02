import { Link } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ProfessionalNav } from '../components/ProfessionalNav';

export default function ProfissionalInicio() {
  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={s.content}>
        <ProfessionalNav />
        <Text style={s.eyebrow}>MLIVRETRABALHO</Text>
        <Text style={s.title}>Seu próximo trabalho</Text>
        <Text style={s.body}>O essencial para trabalhar agora, sem menus desnecessários.</Text>

        <View style={s.primaryCard}>
          <Text style={s.cardTitle}>Oportunidades para você</Text>
          <Text style={s.body}>Veja trabalhos compatíveis e demonstre interesse em uma ação.</Text>
          <Link href="/trabalhos" style={s.primaryAction}>Ver trabalhos</Link>
        </View>

        <Text style={s.heading}>Hoje</Text>
        <View style={s.card}>
          <Text style={s.cardTitle}>Próximo trabalho e check-in</Text>
          <Text style={s.body}>Acompanhe o trabalho confirmado e avance conforme o estado da jornada.</Text>
          <Link href="/agenda" style={s.action}>Abrir próximo trabalho</Link>
        </View>

        <View style={s.card}>
          <Text style={s.cardTitle}>Disponibilidade</Text>
          <Text style={s.body}>Informe quando pode trabalhar. Seus dados conhecidos não serão pedidos novamente.</Text>
          <Link href="/disponibilidade" style={s.action}>Atualizar disponibilidade</Link>
        </View>

        <View style={s.card}>
          <Text style={s.cardTitle}>Avisos importantes</Text>
          <Text style={s.body}>Notificações levam diretamente ao que precisa da sua atenção.</Text>
          <Link href="/notificacoes" style={s.action}>Ver avisos</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s=StyleSheet.create({
  screen:{flex:1,backgroundColor:'#F7F6FA'},
  content:{padding:24,gap:16},
  eyebrow:{fontSize:13,fontWeight:'800',marginTop:4,color:'#5B35D5'},
  title:{fontSize:32,fontWeight:'800',color:'#20202A'},
  heading:{fontSize:22,fontWeight:'800',marginTop:4,color:'#20202A'},
  body:{fontSize:16,lineHeight:23,color:'#55545E'},
  primaryCard:{padding:20,borderRadius:20,gap:10,backgroundColor:'#5B35D5'},
  card:{padding:18,borderWidth:1,borderColor:'#E9E6F2',borderRadius:18,gap:9,backgroundColor:'#FFFFFF'},
  cardTitle:{fontSize:20,fontWeight:'800',color:'#20202A'},
  primaryAction:{fontSize:18,fontWeight:'800',paddingVertical:12,paddingHorizontal:14,borderRadius:12,backgroundColor:'#FFFFFF',color:'#5B35D5',textAlign:'center'},
  action:{fontSize:16,fontWeight:'800',paddingVertical:8,color:'#5B35D5'}
});
