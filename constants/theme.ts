// Theme constants — brand palette, spacing, radii, typography
export const Colors = {
  light: {
    bg: '#FAFAF8',
    surface: '#FFFFFF',
    surfaceMuted: '#F0F0F0',
    border: '#F0F0F0',
    text: '#1A1A1A',
    textSecondary: '#6B6B6B',
    textMuted: '#9B9B9B',
  },
  dark: {
    bg: '#0F0F0F',
    surface: '#1F1F1F',
    surfaceMuted: '#2A2A2A',
    border: '#2A2A2A',
    text: '#FFFFFF',
    textSecondary: '#D4D4D4',
    textMuted: '#9B9B9B',
  },
  accent: {
    lilac: '#B8A9E8',
    amber: '#F5A623',
    teal: '#4ECDC4',
    coral: '#FF6B6B',
    green: '#4ADE80',
    ink: '#1A1A1A',
  },
} as const;

export const Status = {
  available: { c: Colors.accent.green, tx: '#166534', label: 'Available' },
  rented:    { c: Colors.accent.coral, tx: '#DC2626', label: 'Rented' },
  pending:   { c: Colors.accent.amber, tx: '#92400E', label: 'Pending' },
} as const;

export const Spacing = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32,
} as const;

export const Radii = { sm: 8, md: 12, lg: 16, xl: 20, pill: 999 } as const;

export const Typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, letterSpacing: -0.5 },
  h2: { fontSize: 22, fontWeight: '700' as const, letterSpacing: -0.3 },
  h3: { fontSize: 18, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  bodySemi: { fontSize: 15, fontWeight: '600' as const },
  caption: { fontSize: 12, fontWeight: '500' as const },
  meta: { fontSize: 11, fontWeight: '500' as const },
};
