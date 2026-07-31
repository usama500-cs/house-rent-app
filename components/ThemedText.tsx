import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '../hooks/useTheme';

type Props = TextProps & { muted?: boolean; secondary?: boolean };

export function ThemedText({ style, muted, secondary, ...rest }: Props) {
  const { colors } = useTheme();
  const color = muted ? colors.textMuted : secondary ? colors.textSecondary : colors.text;
  return <Text {...rest} style={[{ color }, style]} />;
}
