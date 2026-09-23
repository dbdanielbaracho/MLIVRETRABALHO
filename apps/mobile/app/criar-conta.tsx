import { apiUrl } from '../lib/api';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function CriarConta(){
 const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[accountType,setAccountType]=useState<'professional'|'company'>('professional'),[workspaceName,setWorkspaceName]=useState(''),[message,setMessage]=useState('');
 async function signup(){
  setMessage('');
  if(!email.trim()||password.length<8||(accountType==='company'&&!workspaceName.trim())){setMessage('Preencha os dados obrigatórios.');return;}
  const body:any={email:email.trim(),password,accountType};if(accountType==='company')body.workspaceName=workspaceName.trim();
  const r=await fetch(apiUrl('/auth/signup'),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
  if(!r.ok){setMessage('Não foi possível criar a conta. Confira os dados e tente novamente.');return;}
  router.replace('/entrar');
 }
 return <SafeAreaView style={s.screen}><View style={s.content}><Text style={s.title}>Criar conta</Text><View style={s.row}><Pressable onPress={()=>setAccountType('professional')} style={s.choice}><Text style={s.buttonText}>{accountType==='professional'?'✓ ':''}Quero trabalhar</Text></Pressable><Pressable onPress={()=>setAccountType('company')} style={s.choice}><Text style={s.buttonText}>{accountType==='company'?'✓ ':''}Sou empresa</Text></Pressable></View>{accountType==='company'?<TextInput value={workspaceName} onChangeText={setWorkspaceName} placeholder="Nome da empresa" style={s.input}/>:null}<TextInput autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} placeholder="E-mail" style={s.input}/><TextInput secureTextEntry value={password} onChangeText={setPassword} placeholder="Senha (8+ caracteres)" style={s.input}/><Pressable onPress={()=>void signup()} style={s.button}><Text style={s.buttonText}>Criar conta</Text></Pressable><Text>{message}</Text></View></SafeAreaView>}
const s=StyleSheet.create({screen:{flex:1,backgroundColor:'#fff'},content:{padding:24,gap:16},title:{fontSize:32,fontWeight:'800'},row:{flexDirection:'row',gap:8},choice:{flex:1,borderWidth:1,borderRadius:12,padding:12,alignItems:'center'},input:{borderWidth:1,borderRadius:12,padding:14,fontSize:17},button:{padding:16},buttonText:{fontSize:16,fontWeight:'800'}});
