import { useState } from 'react';
import { router } from 'expo-router';
import { saveSession } from '../lib/session';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
const API='http://localhost:3000/v1';
export default function Entrar(){
 const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[message,setMessage]=useState('');
 async function signin(){const r=await fetch(`${API}/auth/signin`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email,password})});if(!r.ok){setMessage('Confira seu e-mail e senha');return;}const data=await r.json();await saveSession(data.accessToken);router.replace('/trabalhos');}
 return <SafeAreaView style={s.screen}><View style={s.content}><Text style={s.title}>Entrar</Text><TextInput accessibilityLabel="E-mail" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} placeholder="E-mail" style={s.input}/><TextInput accessibilityLabel="Senha" secureTextEntry value={password} onChangeText={setPassword} placeholder="Senha" style={s.input}/><Pressable onPress={signin} style={s.button}><Text style={s.buttonText}>Entrar</Text></Pressable><Text>{message}</Text></View></SafeAreaView>}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{padding:24,gap:16},title:{fontSize:32,fontWeight:'800'},input:{borderWidth:1,borderRadius:12,padding:14,fontSize:17},button:{padding:16},buttonText:{fontSize:18,fontWeight:'800'}});
