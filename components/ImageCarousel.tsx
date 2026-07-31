import React, { useState } from 'react';
import { View, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type Props = { images: string[]; height?: number };

export function ImageCarousel({ images, height = 200 }: Props) {
  const [i, setI] = useState(0);
  const list = images && images.length ? images : ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'];

  return (
    <View style={[styles.container, { height, backgroundColor: '#F0F0F0' }]}>
      <Animated.Image
        key={list[i]}
        source={{ uri: list[i] }}
        style={styles.image}
        entering={FadeIn.duration(400)}
        exiting={FadeOut.duration(200)}
      />
      {list.length > 1 && (
        <>
          <Pressable onPress={() => setI(v => (v - 1 + list.length) % list.length)}
            style={[styles.arrow, { left: 8 }]}>
            <ChevronLeft size={16} color="#1A1A1A" />
          </Pressable>
          <Pressable onPress={() => setI(v => (v + 1) % list.length)}
            style={[styles.arrow, { right: 8 }]}>
            <ChevronRight size={16} color="#1A1A1A" />
          </Pressable>
          <View style={styles.dots}>
            {list.map((_, idx) => (
              <View key={idx} style={[styles.dot, idx === i ? styles.dotActive : null]} />
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'relative', overflow: 'hidden' },
  image: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
  arrow: {
    position: 'absolute', top: '50%', width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.85)', alignItems: 'center', justifyContent: 'center',
    marginTop: -16,
  },
  dots: { position: 'absolute', bottom: 8, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 4 },
  dot: { width: 6, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.6)' },
  dotActive: { width: 20, backgroundColor: '#FFFFFF' },
});
