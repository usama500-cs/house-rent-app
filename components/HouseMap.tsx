import React from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { Colors, Radii } from '../constants/theme';
import type { House } from '../hooks/useHouses';

// Wrap react-native-maps import in a try/catch so the web bundle doesn't break.
let MapView: any = null;
let Marker: any = null;
try {
  if (Platform.OS !== 'web') {
    const maps = require('react-native-maps');
    MapView = maps.default;
    Marker = maps.Marker;
  }
} catch {}

type Props = { houses: House[]; onSelect?: (h: House) => void; dark?: boolean };

export function HouseMap({ houses, onSelect, dark }: Props) {
  if (!MapView || houses.length === 0) {
    return (
      <View style={[styles.fallback, { backgroundColor: dark ? '#141414' : '#F5F0FF' }]}>
        <Text style={{ color: dark ? '#9B9B9B' : '#6B6B6B', fontSize: 12 }}>
          Map available on iOS/Android device.
        </Text>
      </View>
    );
  }

  const lats = houses.map(h => h.latitude);
  const lngs = houses.map(h => h.longitude);
  const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: centerLat, longitude: centerLng,
        latitudeDelta: 40, longitudeDelta: 40,
      }}
    >
      {houses.map(h => (
        <Marker
          key={h.id}
          coordinate={{ latitude: h.latitude, longitude: h.longitude }}
          title={h.title}
          description={`${h.city} · $${h.price}/mo`}
          onPress={() => onSelect?.(h)}
        >
          <View style={styles.pin}>
            <Text style={styles.pinText}>${h.price}</Text>
          </View>
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1, borderRadius: Radii.lg },
  fallback: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: Radii.lg },
  pin: {
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: Radii.pill,
    backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: Colors.accent.lilac,
  },
  pinText: { fontSize: 12, fontWeight: '700', color: '#1A1A1A' },
});
