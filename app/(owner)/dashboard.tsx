import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Building2, Home, DollarSign, Star, TrendingUp } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useHouses } from '../../hooks/useHouses';
import { useTheme } from '../../hooks/useTheme';
import { Colors, Radii, Spacing, Status } from '../../constants/theme';
import { money } from '../../utils/helpers';

const OWNER = 'Emma Chen'; // demo owner

export default function Dashboard() {
  const { houses } = useHouses();
  const { colors } = useTheme();

  const mine = houses.filter(h => h.owner_name === OWNER);
  const total = mine.length;
  const avail = mine.filter(h => h.status === 'available').length;
  const revenue = mine.filter(h => h.status !== 'available').reduce((s, h) => s + h.price, 0);
  const avgRating = total ? (mine.reduce((s, h) => s + h.rating, 0) / total).toFixed(1) : '0.0';

  const stats = [
    { l: 'Total listings',   v: String(total),   i: Building2,   c: Colors.accent.lilac },
    { l: 'Available',        v: String(avail),   i: Home,        c: Colors.accent.green },
    { l: 'Monthly revenue',  v: money(revenue),  i: DollarSign,  c: Colors.accent.amber },
    { l: 'Avg. rating',      v: avgRating,       i: Star,        c: Colors.accent.teal  },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: Spacing.lg, paddingTop: 60 }}>
      <Text style={[styles.h1, { color: colors.text }]}>Welcome back, {OWNER.split(' ')[0]} 👋</Text>
      <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 4 }}>
        Here's how your listings are performing.
      </Text>

      <View style={styles.grid}>
        {stats.map((s, i) => {
          const Icon = s.i;
          return (
            <Animated.View key={i} entering={FadeInUp.delay(i * 80).duration(400)}
              style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={[styles.icon, { backgroundColor: s.c + '25' }]}>
                <Icon size={14} color={s.c} />
              </View>
              <Text style={[styles.statVal, { color: colors.text }]}>{s.v}</Text>
              <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 2 }}>{s.l}</Text>
            </Animated.View>
          );
        })}
      </View>

      <View style={[styles.card2, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 }}>
          <TrendingUp size={14} color={Colors.accent.amber} />
          <Text style={{ color: colors.text, fontWeight: '600', fontSize: 14 }}>Listings by status</Text>
        </View>
        <View style={{ flexDirection: 'row', height: 140, alignItems: 'flex-end', gap: 24 }}>
          {(['available', 'pending', 'rented'] as const).map(s => {
            const count = mine.filter(h => h.status === s).length;
            const max = Math.max(1, ...(['available', 'pending', 'rented'] as const).map(x => mine.filter(h => h.status === x).length));
            const st = Status[s];
            return (
              <View key={s} style={{ flex: 1, alignItems: 'center', gap: 6 }}>
                <View style={{ height: 100, justifyContent: 'flex-end' }}>
                  <View style={{ width: 40, height: (count / max) * 100 || 4, backgroundColor: st.c, borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
                </View>
                <Text style={{ color: colors.text, fontWeight: '600', fontSize: 12 }}>{count}</Text>
                <Text style={{ color: colors.textMuted, fontSize: 10 }}>{st.label}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 24, fontWeight: '700', letterSpacing: -0.4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 20 },
  card: { width: '47%', padding: 16, borderRadius: Radii.lg, borderWidth: 1 },
  icon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  statVal: { fontSize: 22, fontWeight: '700' },
  card2: { marginTop: 20, padding: 20, borderRadius: Radii.lg, borderWidth: 1 },
});
