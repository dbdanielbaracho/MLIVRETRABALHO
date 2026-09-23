function normalizeCity(value?:string|null){return (value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
export function cityDistanceKm(jobCity?:string|null,professionalCity?:string|null):number|undefined{const a=normalizeCity(jobCity),b=normalizeCity(professionalCity);if(!a||!b)return undefined;return a===b?0:undefined;}
