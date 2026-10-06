import { Link, usePathname } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
const BLUE='#064A9B',MUTED='#697386',BORDER='#E7EAF0';
const items=[{href:'/empresa-inicio',label:'Início',icon:'⌂'},{href:'/empresa',label:'Trabalhos',icon:'▣'},{href:'/equipes',label:'Equipe',icon:'♧'},{href:'/empresa-conta',label:'Conta',icon:'☻'}] as const;
export function CompanyNav(){const pathname=usePathname();return <View style={s.bar} accessibilityLabel="Navegação principal da empresa">{items.map(item=>{const active=pathname===item.href;return <Link key={item.href} href={item.href} style={s.link} accessibilityState={{selected:active}}><View style={s.item}><Text style={[s.icon,active&&s.active]}>{item.icon}</Text><Text style={[s.label,active&&s.active]}>{item.label}</Text></View></Link>})}</View>}
const s=StyleSheet.create({bar:{height:62,flexDirection:'row',alignItems:'center',backgroundColor:'#FFF',borderTopWidth:1,borderTopColor:BORDER,paddingHorizontal:8},link:{flex:1},item:{alignItems:'center',justifyContent:'center',gap:2},icon:{fontSize:18,fontWeight:'800',color:MUTED},label:{fontSize:10,fontWeight:'700',color:MUTED},active:{color:BLUE}});
