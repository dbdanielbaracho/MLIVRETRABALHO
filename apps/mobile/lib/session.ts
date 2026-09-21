import * as SecureStore from 'expo-secure-store';
const KEY='mlivretrabalho.accessToken';
export const saveSession=(token:string)=>SecureStore.setItemAsync(KEY,token);
export const getSession=()=>SecureStore.getItemAsync(KEY);
export const clearSession=()=>SecureStore.deleteItemAsync(KEY);
export const authHeaders=async()=>{const token=await getSession();return token?{Authorization:`Bearer ${token}`}:{};};

const TENANT_KEY='mlivretrabalho.tenantId';
export const saveTenant=(tenantId:string)=>SecureStore.setItemAsync(TENANT_KEY,tenantId);
export const getTenant=()=>SecureStore.getItemAsync(TENANT_KEY);
export const clearTenant=()=>SecureStore.deleteItemAsync(TENANT_KEY);
export const authenticatedTenantHeaders=async()=>{const [token,tenantId]=await Promise.all([getSession(),getTenant()]);return {...(token?{Authorization:`Bearer ${token}`}:{}),...(tenantId?{'x-tenant-id':tenantId}:{})};};
