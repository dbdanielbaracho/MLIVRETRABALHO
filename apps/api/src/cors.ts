export function parseCorsOrigins(raw?: string): string[] {
  const value = raw?.trim();
  if (!value) return [];

  const origins = [...new Set(value.split(',').map((item) => item.trim()).filter(Boolean))];
  if (origins.includes('*')) throw new Error('cors_wildcard_forbidden');

  for (const origin of origins) {
    let url: URL;
    try {
      url = new URL(origin);
    } catch {
      throw new Error('cors_origin_invalid');
    }
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('cors_origin_invalid_protocol');
    if (url.origin !== origin) throw new Error('cors_origin_must_be_origin_only');
  }

  return origins;
}
