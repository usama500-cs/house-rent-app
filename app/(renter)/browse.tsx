import { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { HouseCard } from '../../components/HouseCard';
import { useHouses, House } from '../../hooks/useHouses';
import { useFavorites } from '../../hooks/useFavorites';
import { useTheme } from '../../hooks/useTheme';
import { TYPES } from '../../constants/amenities';
import { Colors, Spacing, Radii } from '../../constants/theme';

export default function Browse() {
  const router = useRouter();
  const { houses } = useHouses();
  const { isFavorite, toggle } = useFavorites();
  const { colors, isDark } = useTheme();

  const [search, setSearch] = useState('');
  const [type, setType] = useState<string>('all');

  const filtered = useMemo(() => {
    return houses
      .filter(h => !search || (h.title + h.city + h.address).toLowerCase().includes(search.toLowerCase()))
      .filter(h => type === 'all' || h.type === type)
      .sort((a, b) => (b.featured - a.featured) || (b.id - a.id));
  }, [houses, search, type]);

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.header, { backgroundColor: colors.bg, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Find your home</Text>
        <View style={[styles.searchWrap, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Search size={16} color={colors.textMuted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search city or title…"
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
          {['all', ...TYPES].map(t => {
            const active = type === t;
            return (
              <Pressable key={t} onPress={() => setType(t)}
                style={[styles.chip, { backgroundColor: active ? Colors.accent.lilac : colors.surface, borderColor: active ? Colors.accent.lilac : colors.border }]}>
                <Text style={{ color: active ? '#1A1A1A' : colors.text, fontSize: 12, fontWeight: '600' }}>
                  {t === 'all' ? 'All' : t}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={h => String(h.id)}
        contentContainerStyle={{ padding: Spacing.lg, gap: Spacing.lg }}
        renderItem={({ item, index }) => (
          <HouseCard
            house={item}
            isFavorite={isFavorite(item.id)}
            onFavorite={toggle}
            onPress={h => router.push(`/(renter)/${h.id}` as any)}
            dark={isDark}
            index={index}
          />
        )}
        ListEmptyComponent={
          <Animated.View entering={FadeIn} style={{ alignItems: 'center', paddingVertical: 60 }}>
            <Text style={{ color: colors.textSecondary }}>No homes match your filters</Text>
          </Animated.View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: Spacing.lg, paddingTop: 60, paddingBottom: Spacing.md, borderBottomWidth: 1 },
  title: { fontSize: 24, fontWeight: '700', letterSpacing: -0.4, marginBottom: 12 },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 16, height: 44, borderRadius: Radii.pill, borderWidth: 1,
  },
  searchInput: { flex: 1, fontSize: 14 },
  chipsScroll: { marginTop: 12 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: Radii.pill, borderWidth: 1, marginRight: 8 },
});
