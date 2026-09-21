import { apiUrl } from '../lib/api';
import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
export default function CriarConta(){
 const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[message,setMessage]=useState('');
 async function signup(){const r=await fetch(apiUrl('/auth/signup'),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email,password})});setMessage(r.ok?'Conta criada. Agora você pode entrar.':'Não foi possível criar a conta');}
 return <SafeAreaView style={s.screen}><View style={s.content}><Text style={s.title}>Criar conta</Text><TextInput autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} placeholder="E-mail" style={s.input}/><TextInput secureTextEntry value={password} onChangeText={setPassword} placeholder="Senha (8+ caracteres)" style={s.input}/><Pressable onPress={signup} style={s.button}><Text style={s.buttonText}>Criar conta</Text></Pressable><Text>{message}</Text></View></SafeAreaView>}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{padding:24,gap:16},title:{fontSize:32,fontWeight:'800'},input:{borderWidth:1,borderRadius:12,padding:14,fontSize:17},button:{padding:16},buttonText:{fontSize:18,fontWeight:'800'}});
