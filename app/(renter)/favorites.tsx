import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { HouseCard } from '../../components/HouseCard';
import { useHouses } from '../../hooks/useHouses';
import { useFavorites } from '../../hooks/useFavorites';
import { useTheme } from '../../hooks/useTheme';
import { Colors, Spacing } from '../../constants/theme';

export default function Favorites() {
  const router = useRouter();
  const { houses } = useHouses();
  const { favorites, isFavorite, toggle } = useFavorites();
  const { colors, isDark } = useTheme();

  const list = houses.filter(h => favorites.includes(h.id));

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Your favorites</Text>
        <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 4 }}>
          {list.length} saved home{list.length === 1 ? '' : 's'}
        </Text>
      </View>
      {list.length === 0 ? (
        <View style={styles.empty}>
          <Heart size={40} color="#E0E0E0" />
          <Text style={{ color: colors.textSecondary, marginTop: 12 }}>
            Tap the heart on any listing to save it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={list}
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
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: Spacing.lg, paddingTop: 60, paddingBottom: Spacing.md, borderBottomWidth: 1 },
  title: { fontSize: 24, fontWeight: '700', letterSpacing: -0.4 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
});
