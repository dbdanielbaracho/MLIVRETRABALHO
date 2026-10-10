export type CanonicalRole={vertical:string;family:string;role:string;specializations:string[];skills:string[];certifications:string[]};
export const CANONICAL_ROLES:CanonicalRole[]=[
{vertical:'hospitality',family:'service',role:'waiter',specializations:['banquet','restaurant'],skills:['table_service','guest_service','order_accuracy'],certifications:[]},
{vertical:'hospitality',family:'beverage',role:'bartender',specializations:['events','bar'],skills:['drink_preparation','guest_service','bar_setup'],certifications:[]},
{vertical:'cleaning_facilities',family:'cleaning',role:'cleaner',specializations:['commercial','events'],skills:['sanitation','room_reset','waste_handling'],certifications:[]},
{vertical:'hospitality',family:'kitchen',role:'kitchen_assistant',specializations:['prep','service'],skills:['food_prep','station_setup','cleaning'],certifications:[]},
{vertical:'logistics_warehouse',family:'warehouse',role:'warehouse_associate',specializations:['picking','packing'],skills:['picking','packing','inventory_handling'],certifications:[]},
{vertical:'retail',family:'store',role:'store_associate',specializations:['sales_floor','stock'],skills:['customer_service','stocking','checkout'],certifications:[]}
];
export function searchRoles<T extends CanonicalRole>(roles:T[],q?:string):T[]{const n=typeof q==='string'?q.trim().toLowerCase():'';return n?roles.filter(x=>JSON.stringify(x).toLowerCase().includes(n)):roles}
export function taxonomySearch(q?:string){return searchRoles(CANONICAL_ROLES,q)}
