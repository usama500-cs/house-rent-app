import { Tabs } from 'expo-router';
import { LayoutDashboard, Building2 } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { Colors } from '../../constants/theme';

export default function OwnerLayout() {
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
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard', tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} /> }} />
      <Tabs.Screen name="listings" options={{ title: 'Listings', tabBarIcon: ({ color, size }) => <Building2 size={size} color={color} /> }} />
    </Tabs>
  );
}
