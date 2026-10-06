import { Link, usePathname } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
const PURPLE='#5B21F3',MUTED='#697386',BORDER='#E7EAF0';
const items=[{href:'/profissional-inicio',label:'Início',icon:'⌂'},{href:'/trabalhos',label:'Trabalhos',icon:'▣'},{href:'/ganhos',label:'Ganhos',icon:'ⓢ'},{href:'/perfil',label:'Perfil',icon:'♙'}] as const;
export function ProfessionalNav(){const pathname=usePathname();return <View style={s.bar} accessibilityLabel="Navegação principal do profissional">{items.map(item=>{const active=pathname===item.href;return <Link key={item.href} href={item.href} style={s.link} accessibilityState={{selected:active}}><View style={s.item}><Text style={[s.icon,active&&s.active]}>{item.icon}</Text><Text style={[s.label,active&&s.active]}>{item.label}</Text></View></Link>})}</View>}
const s=StyleSheet.create({bar:{height:62,flexDirection:'row',alignItems:'center',backgroundColor:'#FFF',borderTopWidth:1,borderTopColor:BORDER,paddingHorizontal:8},link:{flex:1},item:{alignItems:'center',justifyContent:'center',gap:2},icon:{fontSize:18,fontWeight:'800',color:MUTED},label:{fontSize:10,fontWeight:'700',color:MUTED},active:{color:PURPLE}});
