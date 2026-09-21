import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Trabalhos() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>Trabalhos para você</Text>
        <View style={styles.card}>
          <Text style={styles.role}>Garçom</Text>
          <Text style={styles.meta}>Hoje · 18:00–23:00</Text>
          <Text style={styles.meta}>Local e valor aparecem aqui quando a API estiver conectada.</Text>
          <Text style={styles.action}>Quero trabalhar</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{padding:24,gap:20},title:{fontSize:30,fontWeight:'800'},card:{padding:20,borderWidth:1,borderRadius:16,gap:10},role:{fontSize:24,fontWeight:'800'},meta:{fontSize:16},action:{fontSize:18,fontWeight:'800',marginTop:8}});
