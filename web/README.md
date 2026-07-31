# HouseRent — Web version

This folder contains the **web adaptation** of the House Rent app. It's a single-file React component (`App.jsx`) built with **Tailwind CSS** and **lucide-react** icons.

The UI mirrors the Expo app (in the repo root) but runs in any modern browser.

## Features
- All the same features as the mobile app: Renter mode (browse/filter/favorites/map) + Owner mode (dashboard/CRUD)
- Animated splash screen (SVG-based rotating house)
- Smooth CSS transitions (mimics Reanimated feel)
- Dark mode toggle
- Reads from `houses.json` (identical to `../assets/houses.json`)

## Running it (Vite quickstart)

```bash
npm create vite@latest houserent-web -- --template react
cd houserent-web
npm install
npm install lucide-react

# then set up Tailwind CSS: https://tailwindcss.com/docs/guides/vite
# copy this folder's App.jsx to src/App.jsx and houses.json to src/houses.json

npm run dev
```

## Using the code directly

`App.jsx` reads its data from `window.__nexusData.houses` (Zaro platform integration). To run standalone, replace the top of the component with:

```jsx
import housesData from './houses.json';

export default function App() {
  const initialHouses = housesData;
  // ...rest of the component unchanged
}
```

That's it — the web version is a self-contained single-file component.

---

Built with [Zaro AI](https://zaro.ai).
