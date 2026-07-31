import { useState, useEffect, useMemo } from 'react';
import housesData from '../assets/houses.json';

export type House = {
  id: number;
  title: string;
  price: number;
  city: string;
  address: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  rating: number;
  status: 'available' | 'rented' | 'pending';
  featured: number;
  images: string[];
  amenities: string[];
  description: string;
  owner_name: string;
  owner_phone: string;
  owner_email: string;
  owner_avatar: string;
  latitude: number;
  longitude: number;
  created_at: string;
};

export function useHouses() {
  const [houses, setHouses] = useState<House[]>(housesData as House[]);

  const addHouse = (h: Omit<House, 'id'>) => {
    const nextId = Math.max(0, ...houses.map(x => x.id)) + 1;
    const row: House = { ...h, id: nextId };
    setHouses(list => [row, ...list]);
    return row;
  };

  const updateHouse = (id: number, patch: Partial<House>) => {
    setHouses(list => list.map(h => (h.id === id ? { ...h, ...patch } : h)));
  };

  const deleteHouse = (id: number) => {
    setHouses(list => list.filter(h => h.id !== id));
  };

  const byId = (id: number) => houses.find(h => h.id === id);

  return { houses, addHouse, updateHouse, deleteHouse, byId };
}
