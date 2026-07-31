import { View, Text, ScrollView, Image, Pressable, StyleSheet, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart, MapPin, Star, BedDouble, Bath, Maximize, Home, Phone, Mail, Check } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { ImageCarousel } from '../../components/ImageCarousel';
import { useHouses } from '../../hooks/useHouses';
import { useFavorites } from '../../hooks/useFavorites';
import { useTheme } from '../../hooks/useTheme';
import { amenityIcon } from '../../constants/amenities';
import { Colors, Radii, Spacing, Status } from '../../constants/theme';
import { money, safe } from '../../utils/helpers';

export default function HouseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { byId } = useHouses();
  const { isFavorite, toggle } = useFavorites();
  const { colors } = useTheme();

  const house = byId(Number(id));
  if (!house) return null;
  const status = Status[house.status] || Status.available;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ position: 'relative' }}>
        <ImageCarousel images={house.images} height={300} />
        <Pressable onPress={() => router.back()} style={[styles.floatBtn, { left: 16, top: 50 }]}>
          <ArrowLeft size={18} color="#1A1A1A" />
        </Pressable>
        <Pressable onPress={() => toggle(house.id)} style={[styles.floatBtn, { right: 16, top: 50 }]}>
          <Heart size={18} color={isFavorite(house.id) ? Colors.accent.coral : '#1A1A1A'}
            fill={isFavorite(house.id) ? Colors.accent.coral : 'transparent'} />
        </Pressable>
      </View>

      <Animated.View entering={FadeInUp.duration(400)} style={{ padding: Spacing.lg }}>
        <View style={[styles.statusPill, { backgroundColor: status.c + '20', borderColor: status.c + '55' }]}>
          <Text style={{ color: status.tx, fontSize: 10, fontWeight: '700' }}>{status.label}</Text>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>{safe(house.title)}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
          <MapPin size={12} color={Colors.accent.lilac} />
          <Text style={{ color: colors.textSecondary, fontSize: 13 }}>{safe(house.address)}, {safe(house.city)}</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: colors.text }]}>{money(house.price)}
            <Text style={{ fontSize: 13, fontWeight: '400', color: colors.textSecondary }}> /month</Text>
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Star size={14} color={Colors.accent.amber} fill={Colors.accent.amber} />
            <Text style={{ color: Colors.accent.amber, fontWeight: '600' }}>{Number(house.rating || 0).toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.specs}>
          {[
            { i: BedDouble, l: 'Bedrooms', v: house.bedrooms, c: Colors.accent.teal },
            { i: Bath, l: 'Bathrooms', v: house.bathrooms, c: Colors.accent.lilac },
            { i: Maximize, l: 'Area', v: `${house.area_sqft} sqft`, c: Colors.accent.amber },
            { i: Home, l: 'Type', v: house.type, c: Colors.accent.green },
          ].map((s, i) => {
            const Icon = s.i;
            return (
              <View key={i} style={[styles.specCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <View style={[styles.specIcon, { backgroundColor: s.c + '20' }]}>
                  <Icon size={14} color={s.c} />
                </View>
                <Text style={[styles.specVal, { color: colors.text }]}>{s.v}</Text>
                <Text style={{ fontSize: 10, color: colors.textMuted }}>{s.l}</Text>
              </View>
            );
          })}
        </View>

        <Text style={[styles.section, { color: colors.text }]}>Description</Text>
        <Text style={{ color: colors.textSecondary, fontSize: 13, lineHeight: 20 }}>{safe(house.description)}</Text>

        <Text style={[styles.section, { color: colors.text }]}>Amenities</Text>
        <View style={styles.amenities}>
          {house.amenities.map((a, i) => {
            const Icon = amenityIcon(a);
            return (
              <View key={i} style={[styles.amenityRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Check size={12} color={Colors.accent.green} />
                <Icon size={12} color={Colors.accent.teal} />
                <Text style={{ color: colors.text, fontSize: 12 }}>{a}</Text>
              </View>
            );
          })}
        </View>

        <Text style={[styles.section, { color: colors.text }]}>Owner</Text>
        <View style={[styles.owner, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Image source={{ uri: house.owner_avatar }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.text, fontWeight: '600' }}>{safe(house.owner_name)}</Text>
            <Text style={{ color: colors.textSecondary, fontSize: 11 }}>{safe(house.owner_email)}</Text>
          </View>
          <Pressable onPress={() => Linking.openURL(`tel:${house.owner_phone}`)}
            style={[styles.contactBtn, { backgroundColor: Colors.accent.green + '30' }]}>
            <Phone size={14} color="#166534" />
          </Pressable>
          <Pressable onPress={() => Linking.openURL(`mailto:${house.owner_email}`)}
            style={[styles.contactBtn, { backgroundColor: Colors.accent.lilac + '30' }]}>
            <Mail size={14} color="#5B21B6" />
          </Pressable>
        </View>

        <Pressable style={[styles.cta, { backgroundColor: Colors.accent.lilac }]}>
          <Text style={{ color: '#1A1A1A', fontWeight: '600' }}>Book viewing</Text>
        </Pressable>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  floatBtn: {
    position: 'absolute', width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center',
  },
  statusPill: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 3, borderRadius: Radii.pill, borderWidth: 1 },
  title: { fontSize: 24, fontWeight: '700', marginTop: 8, letterSpacing: -0.5 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 },
  price: { fontSize: 24, fontWeight: '700' },
  specs: { flexDirection: 'row', gap: 8, marginTop: 20 },
  specCard: { flex: 1, padding: 12, borderRadius: Radii.lg, borderWidth: 1, alignItems: 'center' },
  specIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  specVal: { fontSize: 13, fontWeight: '600' },
  section: { fontSize: 15, fontWeight: '600', marginTop: 24, marginBottom: 8 },
  amenities: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  amenityRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: Radii.md, borderWidth: 1 },
  owner: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: Radii.lg, borderWidth: 1 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  contactBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  cta: { marginTop: 24, paddingVertical: 14, borderRadius: Radii.pill, alignItems: 'center' },
});
