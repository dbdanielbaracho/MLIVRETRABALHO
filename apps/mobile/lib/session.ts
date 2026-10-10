import * as SecureStore from 'expo-secure-store';
import {createSessionQueue,persistVerifiedSession} from './session-transaction';
import type {SessionState} from './session-transaction';
const queue=createSessionQueue();

const KEY = 'mlivretrabalho.accessToken';
const TENANT_KEY = 'mlivretrabalho.tenantId';

async function safeGet(key: string): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.warn(`SecureStore read failed for ${key}; continuing without persisted value.`, error);
    return null;
  }
}

async function safeSet(key: string, value: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.warn(`SecureStore write failed for ${key}.`, error);
  }
}

async function safeDelete(key: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.warn(`SecureStore delete failed for ${key}.`, error);
  }
}

export const saveSession = (token: string) => queue.run(()=>safeSet(KEY, token));
export const getSession = () => queue.run(()=>safeGet(KEY));
export const clearSession = () => queue.run(()=>safeDelete(KEY));

export const authHeaders = async (): Promise<Record<string, string>> => {
  const token = await getSession();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const saveTenant = (tenantId: string) => queue.run(()=>safeSet(TENANT_KEY, tenantId));
export const getTenant = () => queue.run(()=>safeGet(TENANT_KEY));
export const clearTenant = () => queue.run(()=>safeDelete(TENANT_KEY));

export const authenticatedTenantHeaders = async (): Promise<Record<string, string>> => {
  const [token, tenantId] = await queue.run(()=>Promise.all([safeGet(KEY), safeGet(TENANT_KEY)]));
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(tenantId ? { 'x-tenant-id': tenantId } : {}),
  };
};

export const saveVerifiedSignin = (next:SessionState,expectedToken:string|null,isCurrent:()=>boolean) => queue.run(()=>persistVerifiedSession({
  read:async()=>{const [token,tenantId]=await Promise.all([SecureStore.getItemAsync(KEY),SecureStore.getItemAsync(TENANT_KEY)]);return {token,tenantId};},
  write:async state=>{await SecureStore.deleteItemAsync(TENANT_KEY);if(state.token)await SecureStore.setItemAsync(KEY,state.token);else await SecureStore.deleteItemAsync(KEY);if(state.tenantId)await SecureStore.setItemAsync(TENANT_KEY,state.tenantId);}
},next,expectedToken,isCurrent));
