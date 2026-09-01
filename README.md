# Estatify — Verified Real Estate Marketplace (Frontend)

A modern, production-grade real estate discovery platform built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Open Sans** typography. Designed to seamlessly connect with the Estatify Laravel REST API backend.

---

## 🌟 Key Features

- **Dynamic Hero Slider**: Admin-controllable hero banner with custom titles, images, and CTA links.
- **Explore Property Types**: Compact horizontal property category strip with live listing counts.
- **Advanced Search & Discovery**:
  - Filter by buy / rent / commercial listing types.
  - City and locality filtering (Jaipur, Mumbai, Delhi NCR, Pune, Bengaluru, Hyderabad).
  - Price range, BHK configurations, furnishing status, and amenities.
- **Detailed Property Pages**: High-resolution image galleries, verified badges, RERA details, floor plans, specs, and instant inquiry forms.
- **User Dashboard**: Manage posted listings, save favorites, track inquiries, and update profile.
- **Admin CMS**: Hero slider manager, property approval workflow, blog management, and user controls.
- **Responsive & Accessible**: Fully optimized for desktop, tablet, and mobile with smooth micro-interactions.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms & Validation**: React Hook Form + Zod
- **Typography**: Google Fonts (`"Open Sans", serif`)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ or 20+
- npm / yarn / pnpm

### 2. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env.local
```

Configure your environment variables:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 📦 Production Build

```bash
npm run build
npm run start
```

---

## 🌐 Vercel Deployment

1. Import this repository into [Vercel](https://vercel.com).
2. Set Framework Preset: **Next.js**.
3. Set Environment Variable:
   - `NEXT_PUBLIC_API_URL`: `https://YOUR-LARAVEL-API-DOMAIN/api/v1`
4. Click **Deploy**.
