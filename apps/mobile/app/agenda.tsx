import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
export default function Agenda(){return <SafeAreaView style={s.screen}><View style={s.content}><Text style={s.title}>Próximo trabalho</Text><Text style={s.empty}>Quando uma oportunidade for confirmada, ela aparecerá aqui com horário, local e ação de check-in.</Text></View></SafeAreaView>}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{padding:24,gap:16},title:{fontSize:30,fontWeight:'800'},empty:{fontSize:17,lineHeight:25}});
