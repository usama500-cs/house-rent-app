import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '../hooks/useTheme';

type Props = ViewProps & { surface?: boolean };

export function ThemedView({ style, surface, ...rest }: Props) {
  const { colors } = useTheme();
  const bg = surface ? colors.surface : colors.bg;
  return <View {...rest} style={[{ backgroundColor: bg }, style]} />;
}
