import { View, Text, FlatList, Image, Pressable, StyleSheet, Alert } from 'react-native';
import { Trash2, Edit3, Eye, Plus } from 'lucide-react-native';
import { useHouses } from '../../hooks/useHouses';
import { useTheme } from '../../hooks/useTheme';
import { Colors, Radii, Spacing, Status } from '../../constants/theme';
import { money } from '../../utils/helpers';

const OWNER = 'Emma Chen';

export default function Listings() {
  const { houses, deleteHouse } = useHouses();
  const { colors } = useTheme();
  const mine = houses.filter(h => h.owner_name === OWNER);

  const confirmDelete = (id: number) => {
    Alert.alert('Delete listing?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteHouse(id) },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Manage listings</Text>
        <Pressable style={[styles.addBtn, { backgroundColor: Colors.accent.lilac }]}>
          <Plus size={14} color="#1A1A1A" />
          <Text style={{ fontSize: 13, fontWeight: '600', color: '#1A1A1A' }}>New</Text>
        </Pressable>
      </View>
      <FlatList
        data={mine}
        keyExtractor={h => String(h.id)}
        contentContainerStyle={{ padding: Spacing.lg, gap: Spacing.md }}
        renderItem={({ item }) => {
          const s = Status[item.status];
          return (
            <View style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Image source={{ uri: item.images[0] }} style={styles.thumb} />
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.text, fontWeight: '600', fontSize: 14 }} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={{ color: colors.textSecondary, fontSize: 11 }}>{item.city}</Text>
                <View style={{ flexDirection: 'row', gap: 6, marginTop: 6 }}>
                  <View style={[styles.pill, { backgroundColor: s.c + '20', borderColor: s.c + '55' }]}>
                    <Text style={{ color: s.tx, fontSize: 9, fontWeight: '700' }}>{s.label}</Text>
                  </View>
                  <Text style={{ color: colors.text, fontSize: 13, fontWeight: '700' }}>{money(item.price)}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                <Pressable style={styles.iconBtn}><Eye size={14} color={Colors.accent.teal} /></Pressable>
                <Pressable style={styles.iconBtn}><Edit3 size={14} color={Colors.accent.amber} /></Pressable>
                <Pressable style={styles.iconBtn} onPress={() => confirmDelete(item.id)}>
                  <Trash2 size={14} color={Colors.accent.coral} />
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: Spacing.lg, paddingTop: 60, paddingBottom: Spacing.md, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', letterSpacing: -0.4 },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 14, paddingVertical: 8, borderRadius: Radii.pill },
  row: { flexDirection: 'row', gap: 12, alignItems: 'center', padding: 10, borderRadius: Radii.lg, borderWidth: 1 },
  thumb: { width: 56, height: 56, borderRadius: 12 },
  pill: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: Radii.pill, borderWidth: 1 },
  iconBtn: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
});
