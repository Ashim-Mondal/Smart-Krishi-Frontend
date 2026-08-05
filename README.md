# KrishiBlock — Banglar Krishi Bazar

A verified agricultural wholesaler directory for Pandua Block, built with React 19, TypeScript, Vite, and Tailwind CSS, matching the provided UI design pixel-for-pixel.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Tech Stack

React 19 · Vite · TypeScript · React Router DOM · Tailwind CSS · Framer Motion ·
Lucide Icons · React Hook Form + Zod · Axios · TanStack Query · Context API

## Structure

- `src/components/layout` — Navbar, Footer, Sidebar, SearchBar, WeatherCard, ProductCard, WholesalerCard, StatsCard, ProfileCard
- `src/components/ui` — Button, Modal, SectionTitle
- `src/pages` — Home, Login, Signup, Products, Wholesalers, Profile, Dashboard, About
- `src/context/AppContext.tsx` — logged-in wholesaler profile state (Context API)
- `src/data/mockData.ts` — all mock/dummy data (no backend required)
- `src/routes/AppRoutes.tsx` — lazy-loaded, code-split route definitions
- `src/services/api.ts` — Axios instance, ready to wire up to a real backend

## Notes

- Everything runs on mock data — no backend is required to run the app.
- Edit Profile opens as a slide-in side panel from the Dashboard (not a separate route), per spec.
- `src/services/api.ts` is a placeholder Axios client you can point at a real API later.
