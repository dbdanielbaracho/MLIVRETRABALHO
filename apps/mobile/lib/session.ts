import * as SecureStore from 'expo-secure-store';
const KEY='mlivretrabalho.accessToken';
export const saveSession=(token:string)=>SecureStore.setItemAsync(KEY,token);
export const getSession=()=>SecureStore.getItemAsync(KEY);
export const clearSession=()=>SecureStore.deleteItemAsync(KEY);
export const authHeaders=async()=>{const token=await getSession();return token?{Authorization:`Bearer ${token}`}:{};};
