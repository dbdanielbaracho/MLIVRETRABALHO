import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
export default function Perfil(){return <SafeAreaView style={s.screen}><View style={s.content}><Text style={s.title}>Seu perfil</Text><Text style={s.name}>Profissional</Text><Text style={s.meta}>Complete suas habilidades e experiência para receber oportunidades mais compatíveis.</Text></View></SafeAreaView>}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{padding:24,gap:14},title:{fontSize:30,fontWeight:'800'},name:{fontSize:24,fontWeight:'700'},meta:{fontSize:16,lineHeight:24}});
