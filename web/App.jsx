import React, { useState, useMemo, useEffect } from 'react';
import {
  Home, Search, Heart, MapPin, Star, BedDouble, Bath, Maximize,
  ChevronLeft, ChevronRight, X, Phone, Mail, Plus, LayoutDashboard,
  Building2, TrendingUp, DollarSign, Eye, Trash2, Edit3, Sun, Moon, Wifi,
  Car, Waves, Dumbbell, Snowflake, Flame, Trees, Dog, ChefHat, Shirt,
  ArrowUpDown, Sparkles, Loader2, Check
} from 'lucide-react';
import housesData from './houses.json';

/* ============================================================================
 * HouseRent — Web version (single-file React)
 * ----------------------------------------------------------------------------
 * Companion to the Expo mobile app in the repo root. Same product spec,
 * adapted for the browser with Tailwind CSS and CSS animations.
 * ============================================================================ */

function safe(v) { return String(v ?? '').trim(); }
function money(n) { return '$' + Number(n || 0).toLocaleString(); }

const ACCENT = {
  lilac: '#B8A9E8', amber: '#F5A623', teal: '#4ECDC4',
  coral: '#FF6B6B', green: '#4ADE80', ink: '#1A1A1A',
};

const STATUS_META = {
  available: { c: ACCENT.green, tx: '#166534', label: 'Available' },
  rented:    { c: ACCENT.coral, tx: '#DC2626', label: 'Rented' },
  pending:   { c: ACCENT.amber, tx: '#92400E', label: 'Pending' },
};

const AMENITY_ICON = {
  'wifi': Wifi, 'parking': Car, 'pool': Waves, 'gym': Dumbbell,
  'ac': Snowflake, 'heating': Flame, 'fireplace': Flame, 'garden': Trees,
  'pet friendly': Dog, 'kitchen': ChefHat, 'laundry': Shirt,
};
function amenityIcon(name) { return AMENITY_ICON[safe(name).toLowerCase()] || Sparkles; }

const TYPES = ['Apartment', 'House', 'Villa', 'Studio', 'Condo'];

function ImageCarousel({ images, height = 'h-56', rounded = 'rounded-2xl' }) {
  const [i, setI] = useState(0);
  const list = images && images.length ? images : ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'];
  return (
    <div className={`relative overflow-hidden ${rounded} ${height} bg-[#F0F0F0] group`}>
      {list.map((src, idx) => (
        <img key={idx} src={src} alt=""
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
          style={{ opacity: idx === i ? 1 : 0, transform: idx === i ? 'scale(1)' : 'scale(1.08)' }} />
      ))}
      {list.length > 1 && (
        <>
          <button onClick={e => { e.stopPropagation(); setI(v => (v - 1 + list.length) % list.length); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
            <ChevronLeft size={16} />
          </button>
          <button onClick={e => { e.stopPropagation(); setI(v => (v + 1) % list.length); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {list.map((_, idx) => (
              <span key={idx} className={`h-1 rounded-full transition-all ${idx === i ? 'w-5 bg-white' : 'w-1.5 bg-white/60'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function HouseCard({ house, favorite, onFavorite, onOpen, dark, delay = 0 }) {
  const [beat, setBeat] = useState(false);
  const status = STATUS_META[safe(house.status).toLowerCase()] || STATUS_META.available;
  const surface = dark ? 'bg-[#1F1F1F] border-[#2A2A2A]' : 'bg-white border-[#F0F0F0]';
  const title = dark ? 'text-white' : 'text-[#1A1A1A]';
  const meta = dark ? 'text-[#9B9B9B]' : 'text-[#6B6B6B]';

  return (
    <div onClick={() => onOpen(house)}
      className={`${surface} rounded-2xl border overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-200 animate-[cardIn_400ms_ease-out_both]`}
      style={{ animationDelay: `${delay}ms` }}>
      <div className="relative">
        <ImageCarousel images={house.images} />
        {house.featured === 1 && (
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur"
            style={{ backgroundColor: ACCENT.amber + 'E6', color: '#1A1A1A' }}>★ Featured</span>
        )}
        <span className="absolute top-3 right-12 text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur"
          style={{ backgroundColor: status.c + 'D9', color: '#fff' }}>{status.label}</span>
        <button onClick={e => { e.stopPropagation(); setBeat(true); setTimeout(() => setBeat(false), 400); onFavorite(house.id); }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:scale-110 transition-all ${beat ? 'animate-[pop_400ms_ease-out]' : ''}`}>
          <Heart size={16} className={favorite ? 'fill-[#FF6B6B] text-[#FF6B6B]' : 'text-[#1A1A1A]'} />
        </button>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className={`text-[15px] font-semibold ${title} truncate`}>{safe(house.title)}</h3>
            <p className={`text-xs ${meta} flex items-center gap-1 mt-0.5`}>
              <MapPin size={11} style={{ color: ACCENT.lilac }} />
              {safe(house.city)} · {safe(house.address)}
            </p>
          </div>
          <span className="text-[11px] font-semibold flex items-center gap-1 shrink-0" style={{ color: ACCENT.amber }}>
            <Star size={11} className="fill-current" />{Number(house.rating || 0).toFixed(1)}
          </span>
        </div>
        <div className={`flex items-center gap-3 text-[11px] ${meta}`}>
          <span className="flex items-center gap-1"><BedDouble size={12} style={{ color: ACCENT.teal }} />{house.bedrooms} bd</span>
          <span className="flex items-center gap-1"><Bath size={12} style={{ color: ACCENT.lilac }} />{house.bathrooms} ba</span>
          <span className="flex items-center gap-1"><Maximize size={12} style={{ color: ACCENT.amber }} />{house.area_sqft} sqft</span>
        </div>
        <div className="flex items-end justify-between pt-1">
          <div>
            <span className={`text-lg font-bold ${title}`}>{money(house.price)}</span>
            <span className={`text-[11px] ${meta}`}> /mo</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
            style={{ backgroundColor: ACCENT.lilac + '25', color: '#5B21B6' }}>{safe(house.type)}</span>
        </div>
      </div>
    </div>
  );
}

function SplashScreen({ dark }) {
  const bg = dark ? '#0F0F0F' : '#FAFAF8';
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center animate-[splashOut_600ms_ease-in_1800ms_forwards]"
      style={{ background: bg }}>
      <div className="relative w-40 h-40 mb-8" style={{ perspective: '800px' }}>
        <div className="absolute inset-0 animate-[spinCube_3s_ease-in-out_infinite]" style={{ transformStyle: 'preserve-3d' }}>
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
            <defs>
              <linearGradient id="roofGrad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#B8A9E8" /><stop offset="1" stopColor="#8B7EDB" />
              </linearGradient>
              <linearGradient id="wallGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#F5A623" /><stop offset="1" stopColor="#E08E0B" />
              </linearGradient>
            </defs>
            <polygon points="100,30 170,90 30,90" fill="url(#roofGrad)" />
            <rect x="45" y="90" width="110" height="80" fill="url(#wallGrad)" />
            <rect x="88" y="120" width="24" height="50" fill="#1A1A1A" rx="2" />
            <rect x="55" y="105" width="22" height="22" fill="#4ECDC4" rx="2" />
            <rect x="123" y="105" width="22" height="22" fill="#4ECDC4" rx="2" />
            <rect x="130" y="45" width="14" height="30" fill="#FF6B6B" />
          </svg>
        </div>
      </div>
      <h1 className="text-3xl font-bold tracking-tight animate-[fadeUp_800ms_ease-out_200ms_both]"
        style={{ color: dark ? '#fff' : '#1A1A1A' }}>HouseRent</h1>
      <p className="text-sm mt-2 animate-[fadeUp_800ms_ease-out_500ms_both]"
        style={{ color: dark ? '#9B9B9B' : '#6B6B6B' }}>Find your next home ✨</p>
      <div className="mt-8 w-32 h-1 rounded-full overflow-hidden" style={{ background: dark ? '#2A2A2A' : '#F0F0F0' }}>
        <div className="h-full rounded-full animate-[loadBar_1600ms_ease-out_forwards]"
          style={{ background: `linear-gradient(90deg, ${ACCENT.lilac}, ${ACCENT.teal}, ${ACCENT.amber})` }} />
      </div>
    </div>
  );
}

export default function App() {
  const [houses, setHouses] = useState(housesData);
  const [showSplash, setShowSplash] = useState(true);
  const [dark, setDark] = useState(false);
  const [role, setRole] = useState('renter');
  const [activeView, setActiveView] = useState('browse');
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('houserent_favs') || '[]'); } catch { return []; }
  });

  useEffect(() => { const t = setTimeout(() => setShowSplash(false), 2400); return () => clearTimeout(t); }, []);
  useEffect(() => { try { localStorage.setItem('houserent_favs', JSON.stringify(favorites)); } catch {} }, [favorites]);
  useEffect(() => { setActiveView(role === 'renter' ? 'browse' : 'dashboard'); }, [role]);

  const toggleFav = id => setFavorites(fs => fs.includes(id) ? fs.filter(x => x !== id) : [...fs, id]);

  const filtered = useMemo(() => {
    return houses
      .filter(h => !search || (h.title + h.city + h.address).toLowerCase().includes(search.toLowerCase()))
      .filter(h => typeFilter === 'all' || h.type === typeFilter)
      .sort((a, b) => (b.featured - a.featured) || (b.id - a.id));
  }, [houses, search, typeFilter]);

  const pageBg = dark ? 'bg-[#0F0F0F]' : 'bg-[#FAFAF8]';
  const surface = dark ? 'bg-[#1F1F1F]' : 'bg-white';
  const border = dark ? 'border-[#2A2A2A]' : 'border-[#F0F0F0]';
  const title = dark ? 'text-white' : 'text-[#1A1A1A]';
  const meta = dark ? 'text-[#9B9B9B]' : 'text-[#6B6B6B]';
  const chipBg = dark ? 'bg-[#2A2A2A]' : 'bg-[#F0F0F0]/60';

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-300`}>
      {showSplash && <SplashScreen dark={dark} />}
      <div className={`sticky top-0 z-40 ${dark ? 'bg-[#0F0F0F]/80' : 'bg-white/80'} backdrop-blur-xl border-b ${border}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${ACCENT.lilac}, ${ACCENT.teal})` }}>
                <Home size={18} className="text-white" />
              </div>
              <div>
                <h1 className={`text-lg font-bold ${title}`}>HouseRent</h1>
                <p className={`text-[11px] ${meta}`}>{houses.length} listings · demo data</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`flex ${chipBg} rounded-full p-1`}>
                {['renter', 'owner'].map(r => (
                  <button key={r} onClick={() => setRole(r)}
                    className={`text-xs font-semibold capitalize px-4 py-1.5 rounded-full transition-all ${role === r ? (dark ? 'bg-[#1F1F1F] text-white shadow-sm' : 'bg-white text-[#1A1A1A] shadow-sm') : meta}`}>
                    {r === 'renter' ? '🔍 Renter' : '🏠 Owner'}
                  </button>
                ))}
              </div>
              <button onClick={() => setDark(v => !v)}
                className={`w-9 h-9 rounded-full flex items-center justify-center border ${border} ${surface} hover:scale-105 transition-all`}>
                {dark ? <Sun size={14} style={{ color: ACCENT.amber }} /> : <Moon size={14} style={{ color: '#5B21B6' }} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className={`${surface} border ${border} rounded-2xl p-4 flex flex-wrap items-center gap-2 mb-5`}>
          <div className="relative flex-1 min-w-[220px]">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9B9B9B]" />
            <input className={`w-full pl-10 pr-4 py-2.5 rounded-full border ${dark ? 'bg-[#1F1F1F] border-[#2A2A2A] text-white' : 'bg-white border-[#F0F0F0] text-[#1A1A1A]'} text-sm focus:outline-none`}
              placeholder="Search city, title, or address…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className={`text-sm px-4 py-2.5 rounded-full border ${dark ? 'bg-[#1F1F1F] border-[#2A2A2A] text-white' : 'bg-white border-[#F0F0F0] text-[#1A1A1A]'}`}
            value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="all">All types</option>
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((h, i) => (
            <HouseCard key={h.id} house={h} favorite={favorites.includes(h.id)}
              onFavorite={toggleFav} onOpen={setSelected} dark={dark} delay={Math.min(i * 60, 400)} />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes cardIn { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes pop { 0% { transform: scale(1); } 40% { transform: scale(1.3); } 100% { transform: scale(1); } }
        @keyframes spinCube { 0% { transform: rotateY(0) rotateX(0); } 50% { transform: rotateY(180deg) rotateX(10deg); } 100% { transform: rotateY(360deg) rotateX(0); } }
        @keyframes loadBar { from { width: 0; } to { width: 100%; } }
        @keyframes splashOut { to { opacity: 0; pointer-events: none; transform: scale(1.05); } }
      `}} />
    </div>
  );
}
