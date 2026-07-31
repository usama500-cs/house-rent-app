import { Home, Wifi, Car, Waves, Dumbbell, Snowflake, Flame, Trees, Dog, ChefHat, Shirt, Sparkles } from 'lucide-react-native';

export const TYPES = ['Apartment', 'House', 'Villa', 'Studio', 'Condo'] as const;

export const AMENITY_POOL = [
  'WiFi', 'Parking', 'Gym', 'Pool', 'AC', 'Heating', 'Fireplace',
  'Garden', 'BBQ', 'Pet Friendly', 'Kitchen', 'Laundry', 'Elevator',
  'Doorman', 'Balcony', 'Rooftop',
] as const;

const AMENITY_ICON: Record<string, any> = {
  wifi: Wifi, parking: Car, pool: Waves, gym: Dumbbell,
  ac: Snowflake, heating: Flame, fireplace: Flame, garden: Trees,
  'pet friendly': Dog, kitchen: ChefHat, laundry: Shirt,
};

export function amenityIcon(name: string) {
  return AMENITY_ICON[String(name || '').trim().toLowerCase()] || Sparkles;
}
