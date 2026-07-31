import { useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/theme';

const KEY = 'houserent_theme'; // 'light' | 'dark' | 'system'

export function useTheme() {
  const system = useColorScheme();
  const [pref, setPref] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    AsyncStorage.getItem(KEY).then(v => {
      if (v === 'light' || v === 'dark' || v === 'system') setPref(v);
    });
  }, []);

  const resolved: 'light' | 'dark' =
    pref === 'system' ? (system === 'dark' ? 'dark' : 'light') : pref;

  const colors = Colors[resolved];

  const setPreference = (p: 'light' | 'dark' | 'system') => {
    setPref(p);
    AsyncStorage.setItem(KEY, p).catch(() => {});
  };

  return { theme: resolved, colors, pref, setPreference, isDark: resolved === 'dark' };
}
