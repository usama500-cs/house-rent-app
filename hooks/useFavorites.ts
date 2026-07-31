import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'houserent_favs';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setFavorites(JSON.parse(raw));
      } catch {}
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(KEY, JSON.stringify(favorites)).catch(() => {});
  }, [favorites, loaded]);

  const toggle = (id: number) =>
    setFavorites(fs => (fs.includes(id) ? fs.filter(x => x !== id) : [...fs, id]));

  const isFavorite = (id: number) => favorites.includes(id);

  return { favorites, toggle, isFavorite, loaded };
}
