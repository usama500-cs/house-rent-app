import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Polygon, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '../constants/theme';

type Props = { onDone?: () => void; dark?: boolean };

const { width } = Dimensions.get('window');

export function AnimatedSplash({ onDone, dark = false }: Props) {
  const rotate = useSharedValue(0);
  const bar = useSharedValue(0);
  const bg = dark ? '#0F0F0F' : '#FAFAF8';
  const text = dark ? '#FFFFFF' : '#1A1A1A';
  const meta = dark ? '#9B9B9B' : '#6B6B6B';

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(180, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(360, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false,
    );
    bar.value = withTiming(1, { duration: 1600, easing: Easing.out(Easing.cubic) });
    if (onDone) {
      const t = setTimeout(onDone, 2400);
      return () => clearTimeout(t);
    }
  }, []);

  const houseStyle = useAnimatedStyle(() => ({ transform: [{ rotateY: `${rotate.value}deg` }] }));
  const barStyle = useAnimatedStyle(() => ({ width: `${bar.value * 100}%` }));

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Animated.View style={[styles.house, houseStyle]}>
        <Svg width="160" height="160" viewBox="0 0 200 200">
          <Defs>
            <LinearGradient id="roofGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#B8A9E8" />
              <Stop offset="1" stopColor="#8B7EDB" />
            </LinearGradient>
            <LinearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#F5A623" />
              <Stop offset="1" stopColor="#E08E0B" />
            </LinearGradient>
          </Defs>
          <Polygon points="100,30 170,90 30,90" fill="url(#roofGrad)" />
          <Rect x="45" y="90" width="110" height="80" fill="url(#wallGrad)" />
          <Rect x="88" y="120" width="24" height="50" fill="#1A1A1A" rx="2" />
          <Rect x="55" y="105" width="22" height="22" fill="#4ECDC4" rx="2" />
          <Rect x="123" y="105" width="22" height="22" fill="#4ECDC4" rx="2" />
          <Rect x="130" y="45" width="14" height="30" fill="#FF6B6B" />
        </Svg>
      </Animated.View>

      <Text style={[styles.title, { color: text }]}>HouseRent</Text>
      <Text style={[styles.tagline, { color: meta }]}>Find your next home ✨</Text>

      <View style={[styles.barTrack, { backgroundColor: dark ? '#2A2A2A' : '#F0F0F0' }]}>
        <Animated.View style={[styles.barFill, barStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  house: { marginBottom: 24 },
  title: { fontSize: 32, fontWeight: '700', letterSpacing: -0.5 },
  tagline: { fontSize: 14, marginTop: 8 },
  barTrack: { width: 128, height: 4, borderRadius: 2, marginTop: 32, overflow: 'hidden' },
  barFill: { height: 4, backgroundColor: Colors.accent.lilac, borderRadius: 2 },
});
