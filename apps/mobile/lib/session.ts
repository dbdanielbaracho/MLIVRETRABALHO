import * as SecureStore from 'expo-secure-store';

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

export const saveSession = (token: string) => safeSet(KEY, token);
export const getSession = () => safeGet(KEY);
export const clearSession = () => safeDelete(KEY);

export const authHeaders = async (): Promise<Record<string, string>> => {
  const token = await getSession();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const saveTenant = (tenantId: string) => safeSet(TENANT_KEY, tenantId);
export const getTenant = () => safeGet(TENANT_KEY);
export const clearTenant = () => safeDelete(TENANT_KEY);

export const authenticatedTenantHeaders = async (): Promise<Record<string, string>> => {
  const [token, tenantId] = await Promise.all([getSession(), getTenant()]);
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(tenantId ? { 'x-tenant-id': tenantId } : {}),
  };
};
