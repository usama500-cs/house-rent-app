import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import Animated, { FadeInUp, useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { Heart, MapPin, Star, BedDouble, Bath, Maximize } from 'lucide-react-native';
import { Colors, Radii, Spacing, Status, Typography } from '../constants/theme';
import { amenityIcon } from '../constants/amenities';
import { money, safe } from '../utils/helpers';
import type { House } from '../hooks/useHouses';
import { ImageCarousel } from './ImageCarousel';

type Props = {
  house: House;
  isFavorite: boolean;
  onFavorite: (id: number) => void;
  onPress: (h: House) => void;
  dark: boolean;
  index?: number;
};

export function HouseCard({ house, isFavorite, onFavorite, onPress, dark, index = 0 }: Props) {
  const scale = useSharedValue(1);
  const heartScale = useSharedValue(1);

  const cardStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const heartStyle = useAnimatedStyle(() => ({ transform: [{ scale: heartScale.value }] }));

  const c = dark ? Colors.dark : Colors.light;
  const status = Status[house.status] || Status.available;

  const handlePress = () => {
    scale.value = withSpring(0.97, { damping: 20 }, () => {
      scale.value = withSpring(1);
    });
    onPress(house);
  };

  const handleFavorite = () => {
    heartScale.value = withTiming(1.35, { duration: 120 }, () => {
      heartScale.value = withSpring(1);
    });
    onFavorite(house.id);
  };

  return (
    <Animated.View entering={FadeInUp.delay(Math.min(index * 60, 400)).duration(400)}>
      <Animated.View style={[cardStyle]}>
        <Pressable onPress={handlePress}>
          <View style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }]}>
            <View>
              <ImageCarousel images={house.images} height={200} />
              {house.featured === 1 && (
                <View style={[styles.featured, { backgroundColor: Colors.accent.amber }]}>
                  <Text style={styles.featuredText}>★ FEATURED</Text>
                </View>
              )}
              <View style={[styles.statusPill, { backgroundColor: status.c }]}>
                <Text style={styles.statusText}>{status.label}</Text>
              </View>
              <Pressable onPress={handleFavorite} style={styles.favBtn}>
                <Animated.View style={heartStyle}>
                  <Heart
                    size={16}
                    color={isFavorite ? Colors.accent.coral : c.text}
                    fill={isFavorite ? Colors.accent.coral : 'transparent'}
                  />
                </Animated.View>
              </Pressable>
            </View>

            <View style={styles.body}>
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, { color: c.text }]} numberOfLines={1}>{safe(house.title)}</Text>
                  <View style={styles.metaRow}>
                    <MapPin size={11} color={Colors.accent.lilac} />
                    <Text style={[styles.meta, { color: c.textSecondary }]} numberOfLines={1}>
                      {safe(house.city)} · {safe(house.address)}
                    </Text>
                  </View>
                </View>
                <View style={styles.rating}>
                  <Star size={11} color={Colors.accent.amber} fill={Colors.accent.amber} />
                  <Text style={[styles.ratingText, { color: Colors.accent.amber }]}>
                    {Number(house.rating || 0).toFixed(1)}
                  </Text>
                </View>
              </View>

              <View style={styles.specs}>
                <View style={styles.specItem}>
                  <BedDouble size={12} color={Colors.accent.teal} />
                  <Text style={[styles.specText, { color: c.textSecondary }]}>{house.bedrooms} bd</Text>
                </View>
                <View style={styles.specItem}>
                  <Bath size={12} color={Colors.accent.lilac} />
                  <Text style={[styles.specText, { color: c.textSecondary }]}>{house.bathrooms} ba</Text>
                </View>
                <View style={styles.specItem}>
                  <Maximize size={12} color={Colors.accent.amber} />
                  <Text style={[styles.specText, { color: c.textSecondary }]}>{house.area_sqft} sqft</Text>
                </View>
              </View>

              <View style={styles.amenities}>
                {house.amenities.slice(0, 3).map((a, i) => {
                  const Icon = amenityIcon(a);
                  return (
                    <View key={i} style={[styles.chip, { backgroundColor: c.surfaceMuted }]}>
                      <Icon size={9} color={c.textSecondary} />
                      <Text style={[styles.chipText, { color: c.textSecondary }]}>{a}</Text>
                    </View>
                  );
                })}
                {house.amenities.length > 3 && (
                  <View style={[styles.chip, { backgroundColor: c.surfaceMuted }]}>
                    <Text style={[styles.chipText, { color: c.textSecondary }]}>+{house.amenities.length - 3}</Text>
                  </View>
                )}
              </View>

              <View style={styles.footer}>
                <View>
                  <Text style={[styles.price, { color: c.text }]}>{money(house.price)}</Text>
                  <Text style={[styles.priceUnit, { color: c.textSecondary }]}>/month</Text>
                </View>
                <View style={[styles.typePill, { backgroundColor: Colors.accent.lilac + '30' }]}>
                  <Text style={styles.typeText}>{safe(house.type)}</Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: Radii.lg, borderWidth: 1, overflow: 'hidden' },
  featured: {
    position: 'absolute', top: 12, left: 12, paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  featuredText: { fontSize: 9, fontWeight: '700', letterSpacing: 1, color: '#1A1A1A' },
  statusPill: {
    position: 'absolute', top: 12, right: 52, paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  statusText: { fontSize: 9, fontWeight: '700', color: '#fff' },
  favBtn: {
    position: 'absolute', top: 10, right: 10, width: 34, height: 34, borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center',
  },
  body: { padding: Spacing.md, gap: Spacing.sm },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  title: { fontSize: 15, fontWeight: '600' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  meta: { ...Typography.caption, flex: 1 },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontSize: 11, fontWeight: '600' },
  specs: { flexDirection: 'row', gap: 14 },
  specItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  specText: { fontSize: 11 },
  amenities: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 8, paddingVertical: 2, borderRadius: Radii.pill },
  chipText: { fontSize: 10 },
  footer: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: 4 },
  price: { fontSize: 18, fontWeight: '700' },
  priceUnit: { fontSize: 11 },
  typePill: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: Radii.pill },
  typeText: { fontSize: 10, fontWeight: '600', color: '#5B21B6' },
});
