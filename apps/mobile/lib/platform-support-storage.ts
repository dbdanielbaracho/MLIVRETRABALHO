import * as SecureStore from 'expo-secure-store';
import {createPlatformIntentStore} from './platform-support';
// Minimal recovery descriptor only. No message, tenant or token is persisted here.
const key=(id:string)=>'mlivretrabalho.platformSupportIntent.'+id;
export const platformIntentStore=createPlatformIntentStore({read:id=>SecureStore.getItemAsync(key(id)),write:(id,raw)=>SecureStore.setItemAsync(key(id),raw),remove:id=>SecureStore.deleteItemAsync(key(id))});
