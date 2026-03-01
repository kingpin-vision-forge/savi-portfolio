# 💧 SAVI — Premium Packaged Drinking Water

> **Hydration, Refined.** — The official website for SAVI Packaged Drinking Water, established in 2004 in Vijayapura, Karnataka. Celebrating 22+ years of trust, purity, and community care.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)

---

## 📖 Table of Contents

- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Pages Overview](#-pages-overview)
  - [Home](#-home---)
  - [About](#-about--about-)
  - [Our Journey](#-our-journey--journey-)
  - [Quality](#-quality--quality-)
  - [Gallery](#-gallery--gallery-)
  - [Music](#-music--music-)
  - [Marketplace](#-marketplace--marketplace-)
  - [Partners](#-partners--partners-)
  - [Dealers](#-dealers--dealers-)
  - [Contact](#-contact--contact-)
  - [Checkout](#-checkout--checkout-)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)

---

## 🛠 Tech Stack

| Technology       | Purpose                          |
| ---------------- | -------------------------------- |
| **Next.js 16**   | React framework (App Router)     |
| **React 19**     | UI library                       |
| **TypeScript 5** | Type-safe development            |
| **Tailwind CSS 4** | Utility-first styling          |
| **Lucide React** | Icon library                     |
| **Three.js**     | 3D/liquid background effects     |
| **Leaflet**      | Interactive delivery maps        |
| **QRCode**       | UPI payment QR generation        |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
npm start
```

The app runs at **http://localhost:3000** by default.

---

## 📄 Pages Overview

### 🏠 Home (`/`)

The main landing page — a single-page experience combining multiple scrollable sections:

- **Hero Section** — Full-screen hero with an animated 3D bottle, floating info cards (BIS Certified, 7.4 pH), and CTAs to order or request bulk supply. Features the 22-year anniversary badge.
- **About Section** — Brand story panel ("Purity in Slate") with stats bar (99.9% Purity, 50+ Natural Springs, 0 Carbon Footprint) and a certification logo strip (BIS, FSSAI, ISO, MSME, ZED Gold, In-House Labs).
- **Quality Section** — Live water analysis panel showing pH level, TDS, contaminants, UV sterilization, and ozonization metrics. Includes a lab report download card and full certification grid (7 certifications). Features the 9-stage **Purity Protocol** process flow.
- **Gallery Section** — Filterable image gallery with categories: All, Events, Products, and Outlets.
- **Contact Section** — Contact form (routed via WhatsApp), quick-action cards (WhatsApp, Call), factory address, office address, and an embedded Google Maps iframe.

**Global elements:** Loading screen animation, `LiquidEther` fluid background effect, sticky header, footer, and cart drawer.

---

### 📜 About (`/about`)

A dedicated about page with:

- **Hero** — Full-screen background image with glass-panel overlay, "Purity in Slate" heading, and CTA buttons (Our Journey, Watch Film).
- **Stats Bar** — 99.9% Purity, 50+ Natural Springs, 0 Carbon Footprint.
- **Timeline** — Company history from 2004 (Founding) → 2010 (Growth) → 2018 (Expansion) → 2026 (Recognition).
- **Certifications Row** — BIS License, FSSAI, ISO Certified, MSME, ZED Gold, In-House Labs.

---

### 🕰 Our Journey (`/journey`)

A detailed, animated timeline page telling the SAVI story through four eras:

| Year | Title                    | Highlights                                                                                  |
| ---- | ------------------------ | ------------------------------------------------------------------------------------------- |
| 2004 | **Beginning**            | Founded by Prashant S. Jevoor & Somanath S. Jevoor; started with 20L cans in Vijayapura     |
| 2010 | **Growth**               | New factory at Jevoor Empire, Athani Road; first BIS certification in the region              |
| 2018 | **Expansion**            | 5 outlets in Vijayapura; expanded to Kalaburagi, Bagalkote, Hubballi, Gadag, Solapur & Pune  |
| 2026 | **Achievements**         | 22 years of service; recognized by national organisations and awarded ZED Gold                |

Includes a **"Our Promise"** section and a CTA to order SAVI. Uses `AnimateOnScroll` and `GlowOnScroll` effects.

---

### 🔬 Quality (`/quality`)

Dedicated quality and compliance page showcasing:

- **Live Water Analysis Panel** — Alkalinity (7.4 pH), TDS (280 ppm), Contaminants (0.00) with visual progress bars.
- **Lab Report Card** — Link to view the full ISO 17025 accredited lab report PDF.
- **Global Certifications** — 7 cards: BIS License (ISI), FSSAI, ISO Certified, MSME Registered, ZED Certified, First ZED Gold (District-level), In-House Labs.
- **The Purity Protocol** — 3-step purification process: Molecular Reverse Osmosis → Mineral Infusion → Ozone Sanitization.

---

### 🖼 Gallery (`/gallery`)

A filterable, masonry-style photo gallery with:

- **Categories** — All, Latest, Corporate, Private, Logistics, Product.
- **Gallery Items** — Promotional content, corporate events, product shots (500ml, 250ml, 20L), factory/production images, and VIP hospitality moments.
- **Interactions** — Hover animations, grayscale-to-color transitions, category badges, and a "Load More" button.

Uses Next.js `Image` component for optimized loading.

---

### 🎵 Music (`/music`)

A full-featured music player page — **"SAVI Sounds"**:

- **70 tracks** spanning Hindi and Kannada songs across five eras: 1980s, 1990s, 2000s, 2010s, and Latest (2020s).
- **Filters** — Language (All / Hindi / Kannada) and Era dropdown.
- **Now Playing Card** — Album art with vinyl spin animation, progress bar, play/pause/next/previous controls, shuffle, repeat, and volume slider.
- **Track List** — Numbered playlist with duration, language/era tags, playing indicator animation, and like button.

Audio is served from the `/public/music/` folder.

---

### 🛒 Marketplace (`/marketplace`)

The e-commerce product catalog featuring:

| Product        | Size            | Pack              | Price  |
| -------------- | --------------- | ----------------- | ------ |
| SAVI 200ML     | 200ml × 48      | Case (48 Bottles) | ₹240   |
| SAVI 250ML     | 250ml × 36      | Case (36 Bottles) | ₹190   |
| SAVI 300ML     | 300ml × 30      | Case (30 Bottles) | ₹170   |
| SAVI 500ML     | 500ml × 24      | Case (24 Bottles) | ₹160   |
| SAVI 1000ML    | 1000ml × 12     | Case (12 Bottles) | ₹110   |
| SAVI 2000ML    | 2000ml × 6      | Case (6 Bottles)  | ₹110   |
| SAVI 20LTR     | 20 Litre        | Can               | ₹40    |

- **Add to Cart** — Quantity controls with cart context integration.
- **Bulk Orders Section** — Request bulk quote form (100+ units) with custom packaging, scheduled delivery, and corporate pricing.
- **Corporate Supply Section** — B2B solutions for Office Hydration, Event Hydration, and Hospitality.

---

### 🤝 Partners (`/partners`)

A trust-building page for enterprise clients:

- **Hero** — "Purity Refined by Trust" with animated badge.
- **Stats** — 500+ Enterprise Clients, 50+ Countries Served, 99.9% Purity Rating.
- **Partner Logos** — Scrolling marquee and a grid of partner logos.
- **Testimonials** — Client quotes from enterprise leaders.
- **CTA** — "Become a Partner" and "Contact Sales" buttons.

---

### 🏪 Dealers (`/dealers`)

Franchise and dealer partnership page with:

- **Hero** — Split-design layout: dark side with "Purity in Prestige" messaging, green side with franchise benefits (Premium Margins, Exclusive Territories, Global Marketing).
- **Partner Logos Bar** — Trusted hospitality brands.
- **Onboarding Steps** — 4-step path: Apply Online → Screening Call → Site Approval → Launch.
- **Application Form** — Full dealer application (First Name, Last Name, Email, Phone, Company Name, and a "Why SAVI?" message field) with a submit button.

---

### 📞 Contact (`/contact`)

A dedicated contact page featuring:

- **Contact Form** — First name, last name, email, inquiry type (Corporate Bulk Order / Private Event / Partnership / General), and message. Submits via **WhatsApp** to `+91 7760161401`.
- **Quick Actions** — WhatsApp and Call buttons.
- **Factory Location** — Jevoor Empire, Athani Road, Vijayapura – 586102.
- **Office Location** — Chalukya Nagar, Solapur Road, Vijayapura – 586103.
- **Operating Hours** — 9:00 AM – 7:00 PM.
- **Emails** — `jevoorempire@gmail.com`, `savidhareminerals2004@gmail.com`.

---

### 💳 Checkout (`/checkout`)

A 3-step checkout flow:

1. **Shipping** — First name, last name, phone, email, address, city, pincode, GPS coordinates (via browser geolocation with reverse geocoding), order notes. Includes an interactive **Leaflet map** with draggable pin.
2. **Payment** — UPI payment via dynamically generated **QR code**. Supports all UPI apps (PhonePe, GPay, Paytm, etc.). Requires transaction ID / UTR number input.
3. **Confirmation** — Order details sent to WhatsApp with customer info, delivery address, GPS coordinates (Google Maps link), and payment details. Cart is cleared automatically.

---

## 📂 Project Structure

```
savi-website/
├── public/
│   ├── images/          # Product photos, event images, logos
│   ├── gallery/         # Gallery promotional images
│   └── music/           # MP3 audio files for music page
├── src/
│   ├── app/
│   │   ├── page.tsx         # Home (multi-section landing page)
│   │   ├── layout.tsx       # Root layout (Manrope font, global background, cart provider)
│   │   ├── globals.css      # Global styles
│   │   ├── about/           # About page
│   │   ├── journey/         # Our Journey timeline page
│   │   ├── quality/         # Quality & certifications page
│   │   ├── gallery/         # Photo gallery page
│   │   ├── music/           # Music player page
│   │   ├── marketplace/     # Product catalog & e-commerce
│   │   ├── partners/        # Partners & testimonials
│   │   ├── dealers/         # Dealer/franchise applications
│   │   ├── contact/         # Contact form page
│   │   └── checkout/        # Checkout flow (shipping → payment → confirmation)
│   ├── components/          # Reusable UI components (Header, Footer, CartDrawer, etc.)
│   └── context/             # React context (CartContext)
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_UPI_ID=your-upi-id@bank
NEXT_PUBLIC_UPI_NAME=SAVI
NEXT_PUBLIC_WHATSAPP_NUMBER=917760161401
```

---

**Built with ♥ for SAVI Packaged Drinking Water — Since 2004**
