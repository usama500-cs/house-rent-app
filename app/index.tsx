import { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { AnimatedSplash } from '../components/AnimatedSplash';
import { useTheme } from '../hooks/useTheme';

export default function SplashScreen() {
  const router = useRouter();
  const { isDark } = useTheme();

  useEffect(() => {
    const t = setTimeout(() => router.replace('/role-select'), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AnimatedSplash dark={isDark} />
    </View>
  );
}
