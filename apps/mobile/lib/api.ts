declare const process:{env:Record<string,string|undefined>};
const configured=process.env.EXPO_PUBLIC_API_URL?.trim();
export const API_BASE_URL=(configured||'https://mlivretrabalho.predibeacon.com/v1').replace(/\/$/,'');
export const apiUrl=(path:string)=>`${API_BASE_URL}${path.startsWith('/')?path:`/${path}`}`;
