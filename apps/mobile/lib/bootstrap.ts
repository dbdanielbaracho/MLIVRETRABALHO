import { apiUrl } from './api';
import { authHeaders, saveTenant } from './session';
export async function bootstrapTenant(){const headers=await authHeaders();const r=await fetch(apiUrl('/me'),{headers});if(!r.ok)return null;const me=await r.json();const tenantId=me.memberships?.[0]?.tenant_id??null;if(tenantId)await saveTenant(tenantId);return tenantId;}
