import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
export default function Ganhos(){return <SafeAreaView style={s.screen}><View style={s.content}><Text style={s.title}>Ganhos</Text><Text style={s.value}>R$ 0,00</Text><Text style={s.meta}>Seus trabalhos concluídos e pagamentos aparecerão aqui.</Text></View></SafeAreaView>}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{padding:24,gap:14},title:{fontSize:30,fontWeight:'800'},value:{fontSize:36,fontWeight:'800'},meta:{fontSize:16}});
