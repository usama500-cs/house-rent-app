import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { HouseMap } from '../../components/HouseMap';
import { useHouses } from '../../hooks/useHouses';
import { useTheme } from '../../hooks/useTheme';
import { Spacing } from '../../constants/theme';

export default function MapScreen() {
  const router = useRouter();
  const { houses } = useHouses();
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Explore on map</Text>
        <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 4 }}>
          {houses.length} homes
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <HouseMap
          houses={houses}
          onSelect={h => router.push(`/(renter)/${h.id}` as any)}
          dark={isDark}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: Spacing.lg, paddingTop: 60, paddingBottom: Spacing.md, borderBottomWidth: 1 },
  title: { fontSize: 24, fontWeight: '700', letterSpacing: -0.4 },
});
