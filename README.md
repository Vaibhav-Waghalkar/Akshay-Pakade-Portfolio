# Akshay Pakade | Portfolio & ATS Resume

Personal portfolio and ATS resume web application for **Akshay Pakade**, Senior DevOps Engineer transitioning into **Agentic AI** and **Forward Deployed Engineering (FDE)**.

Built according to the **"Crystal"** design direction: clean, precise, sharp cut-glass aesthetic, dark and white themes with zero load flash, hairline borders, frosted glass surfaces, and restrained steel-blue accents.

---

## 🛠️ Tech Stack

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Vanilla CSS Crystal Tokens
- **Icons**: Lucide Icons & Crisp Line SVGs
- **Motion**: Framer Motion (restrained micro reveals <= 280ms)
- **Routing**: React Router v7 (`/`, `/resume`, `/privacy`, `/terms`, `*`)
- **PDF Engine**: Puppeteer-core via local Chromium/Chrome for static ATS resume builds

---

## 🚀 Quickstart & Development

### 1. Prerequisites
- Node.js 18+ (tested on Node v20.20.0)
- Google Chrome or Chromium (for static resume PDF generation)

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 4. Build Production Bundle
```bash
npm run build
```

### 5. Generate Static Resume PDF
```bash
npm run build:resume
```
This launches a preview instance, connects to your local Chrome via Puppeteer, and renders an exact 2-page A4 print layout to [`public/Akshay_Pakade_Resume.pdf`](file:///public/Akshay_Pakade_Resume.pdf).

---

## 💎 Design Direction: "Crystal"

- **Dual Theme System**: Dark mode (near-black graphite `#0A0B0D`) and White mode (cool paper white `#F7F8FA`) with instantaneous theme toggle in nav. Choice is persisted in `localStorage` (`crystal-theme`) with no white flash on load.
- **Single Source of Truth**: All data (bio, focus areas, experiences, projects, skills, education) lives strictly inside [`src/data/profile.ts`](file:///src/data/profile.ts).
- **Profile Image**: Displayed in [`public/images/akshay.jpg`](file:///public/images/akshay.jpg) with a precision faceted clip path and crystal border highlight.
- **Faceted Buttons & Badges**: Rectangular with 2-4px radius, no pill buttons, no neon gradients, no purple.
- **ATS Resume (`/resume`)**: 100% theme-independent (black on white) standard single-column format with print CSS optimized for Ctrl+P.

---

## 🚢 Deployment (Vercel / Netlify)

### Deploying to Vercel
1. Push your code to GitHub/GitLab.
2. Import project in Vercel.
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add rewrite rule for client-side routing in `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Deploying to Netlify
Create `public/_redirects`:
```text
/*    /index.html   200
```
Build command: `npm run build`, publish directory: `dist`.

---

## 📋 Launch Checklist

- [x] **Profile Picture**: Placed in `public/images/akshay.jpg` and displayed with faceted crystal frame.
- [x] **Resume PDF**: Generated and available at `/Akshay_Pakade_Resume.pdf`.
- [x] **Theme Switcher**: Dark & light theme toggle tested without layout or color flash.
- [x] **Single Source of Truth**: All facts, experiences, projects, and education sourced from `src/data/profile.ts`.
- [x] **No AI/Templated Artifacts**: Emojis stripped, no customer counters, no fake stats, no em dashes.
- [x] **SEO & Schema**: Title, meta description, Open Graph, Twitter cards, JSON-LD Person schema, sitemap.xml, robots.txt.
- [x] **Favicon**: Custom "AP" crystal monogram SVG + web manifest.
- [x] **Legal**: Clean `/privacy` and `/terms` routes live.
- [x] **Zero Build Errors**: TypeScript and Vite build passes cleanly.
