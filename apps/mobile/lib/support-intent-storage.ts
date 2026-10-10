import * as SecureStore from 'expo-secure-store';
import {createSupportIntentStore} from './support-intent';
// Keep uncertain intents across logout; only the same API-authenticated identity
// may resume its slot. Do not silently treat SecureStore errors as an empty slot.
const key=(identityId:string)=>'mlivretrabalho.supportIntent.'+identityId;
export const supportIntentStore=createSupportIntentStore({
 read:identityId=>SecureStore.getItemAsync(key(identityId)),
 write:(identityId,value)=>SecureStore.setItemAsync(key(identityId),value),
 remove:identityId=>SecureStore.deleteItemAsync(key(identityId))
});
