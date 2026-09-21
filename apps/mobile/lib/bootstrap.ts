import { authHeaders, saveTenant } from './session';
const API='http://localhost:3000/v1';
export async function bootstrapTenant(){const headers=await authHeaders();const r=await fetch(`${API}/me`,{headers});if(!r.ok)return null;const me=await r.json();const tenantId=me.memberships?.[0]?.tenant_id??null;if(tenantId)await saveTenant(tenantId);return tenantId;}
