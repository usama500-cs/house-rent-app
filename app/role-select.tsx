import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Search, Home } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';
import { Colors, Radii, Spacing } from '../constants/theme';

export default function RoleSelect() {
  const router = useRouter();
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Animated.Text entering={FadeInUp.duration(600)} style={[styles.title, { color: colors.text }]}>
        Welcome to HouseRent
      </Animated.Text>
      <Animated.Text entering={FadeInUp.delay(150).duration(600)} style={[styles.subtitle, { color: colors.textSecondary }]}>
        How would you like to use the app?
      </Animated.Text>

      <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.grid}>
        <Pressable onPress={() => router.push('/(renter)/browse')} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.iconBg, { backgroundColor: Colors.accent.lilac + '30' }]}>
            <Search size={26} color={Colors.accent.lilac} />
          </View>
          <Text style={[styles.cardTitle, { color: colors.text }]}>I'm looking to rent</Text>
          <Text style={[styles.cardMeta, { color: colors.textSecondary }]}>Browse, save favorites, and view details.</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/(owner)/dashboard')} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.iconBg, { backgroundColor: Colors.accent.amber + '30' }]}>
            <Home size={26} color={Colors.accent.amber} />
          </View>
          <Text style={[styles.cardTitle, { color: colors.text }]}>I have a property to rent</Text>
          <Text style={[styles.cardMeta, { color: colors.textSecondary }]}>Manage listings and see your dashboard.</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.xxl, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', letterSpacing: -0.5 },
  subtitle: { fontSize: 15, marginTop: 8, marginBottom: 32 },
  grid: { gap: 16 },
  card: {
    padding: 24, borderRadius: Radii.xl, borderWidth: 1,
  },
  iconBg: {
    width: 56, height: 56, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  cardTitle: { fontSize: 17, fontWeight: '600' },
  cardMeta: { fontSize: 13, marginTop: 4 },
});
