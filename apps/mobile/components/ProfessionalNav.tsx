import { Link, usePathname } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const PURPLE = '#5B35D5';
const INK = '#20202A';
const MUTED = '#767681';
const SURFACE = '#FFFFFF';
const BORDER = '#E9E6F2';

const items = [
  { href: '/profissional-inicio', label: 'Início' },
  { href: '/trabalhos', label: 'Trabalhos' },
  { href: '/ganhos', label: 'Ganhos' },
  { href: '/perfil', label: 'Perfil' }
] as const;

export function ProfessionalNav() {
  const pathname = usePathname();
  return (
    <View style={s.bar} accessibilityLabel="Navegação principal do profissional">
      {items.map(item => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            style={[s.item, active && s.active]}
            accessibilityState={{ selected: active }}
          >
            {item.label}
          </Link>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    gap: 4,
    padding: 6,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    backgroundColor: SURFACE
  },
  item: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 4,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '700',
    color: MUTED
  },
  active: {
    backgroundColor: PURPLE,
    color: SURFACE,
    fontWeight: '800'
  }
});
