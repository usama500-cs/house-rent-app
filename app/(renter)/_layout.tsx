import { Tabs } from 'expo-router';
import { Search, Heart, MapPin } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { Colors } from '../../constants/theme';

export default function RenterLayout() {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.accent.lilac,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
      }}
    >
      <Tabs.Screen name="browse" options={{ title: 'Browse', tabBarIcon: ({ color, size }) => <Search size={size} color={color} /> }} />
      <Tabs.Screen name="favorites" options={{ title: 'Favorites', tabBarIcon: ({ color, size }) => <Heart size={size} color={color} /> }} />
      <Tabs.Screen name="map" options={{ title: 'Map', tabBarIcon: ({ color, size }) => <MapPin size={size} color={color} /> }} />
      <Tabs.Screen name="[id]" options={{ href: null }} />
    </Tabs>
  );
}
