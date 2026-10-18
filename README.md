# Akshay Pakade | Portfolio & ATS Resume

Personal portfolio and ATS resume web application for **Akshay Pakade**, Senior DevOps Engineer transitioning into **Agentic AI** and **Forward Deployed Engineering (FDE)**.

Built according to the **"Crystal"** design direction: clean, precise, sharp cut-glass aesthetic, dark and white themes with zero load flash, hairline borders, frosted glass surfaces, and restrained steel-blue accents.

---

## 🛠️ Tech Stack

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Vanilla CSS Crystal Design Tokens
- **Typography**: Self-hosted `@fontsource/space-grotesk` and `@fontsource/jetbrains-mono` (zero third-party font requests)
- **Icons**: Lucide Icons & Crisp Line SVGs (no emojis anywhere)
- **Motion**: Framer Motion (restrained micro reveals <= 280ms)
- **Routing**: React Router v7 (`/`, `/resume`, `/privacy`, `/terms`, `*`)
- **Image Pipeline**: Real headshot processed via Sharp into responsive AVIF, WebP, and JPEG sizes (320, 480, 626px), ultra-light LQIP blur placeholder, and 1200x630 OG image
- **PDF Engine**: Puppeteer-core via local Chromium/Chrome for static ATS resume builds (strict 2 pages A4)

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

### 4. Build Production Bundle with Integrity Verification
```bash
npm run build
```
This automatically runs `npm run check` (verifies zero emojis, no em dashes, no lorem ipsum, no TODOs, and no urn:li references) followed by TypeScript typechecking and Vite production packaging.

### 5. Generate Static Resume PDF
```bash
npm run build:resume
```
This builds an exact 2-page A4 print layout to [`public/Akshay_Pakade_Resume.pdf`](file:///public/Akshay_Pakade_Resume.pdf).

### 6. Process Real Photos & OG Cards
```bash
npm run build:images
```

---

## 💎 Design Direction: "Crystal"

- **Dual Theme System**: Dark mode (near-black graphite `#0A0B0D`) and White mode (cool paper white `#F7F8FA`) with instantaneous theme toggle in nav. Choice is persisted in `localStorage` (`crystal-theme`) with no flash on load.
- **Single Source of Truth**: All data (bio, focus areas, experiences, projects, skills, education) lives strictly inside [`src/data/profile.ts`](file:///src/data/profile.ts).
- **Real Profile Photo**: Uses the authentic portrait at `public/images/akshay.png` served via `<picture>` with AVIF/WebP/JPEG variants, high priority loading, LQIP, and faceted crystal crop. No AI-generated portraits.
- **Inline Flow Diagrams**: Each of the 4 AI projects includes a collapsible SVG architecture flow diagram built directly from components in the description.
- **ATS Resume (`/resume`)**: 100% theme-independent (black on white) standard single-column format with print CSS optimized for Ctrl+P (exact 2 pages A4).

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

- [ ] **Email Configuration**: Add real contact email to `socialLinks.email` in [`src/data/profile.ts`](file:///src/data/profile.ts) when ready (left empty by default).
- [ ] **Public Phone Confirmation**: Confirm phone number `+91 91728 15355` is intended for public display (tel: link + copy button active on site and resume).
- [ ] **Repository & Live Links**: Add official `repoUrl` and `liveUrl` values in [`src/data/profile.ts`](file:///src/data/profile.ts) when individual project repos/demos become public.
- [ ] **Contact Form Endpoint**: Set `contactEndpoint` in `src/data/profile.ts` (e.g., Formspree URL) to activate interactive message posting.
- [ ] **Custom Domain**: Connect your domain and verify canonical link in `index.html`.
- [ ] **Open Graph Card Verification**: Validate 1200x630 card at `https://akshaypakade.dev/og-image.jpg` using Facebook Sharing Debugger and Twitter Card Validator.
- [ ] **Print / Download PDF Verification**: Confirm `public/Akshay_Pakade_Resume.pdf` downloads cleanly and prints to exactly 2 pages A4.
