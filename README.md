# Expat Life Info - Saudi Expat Guide

A bilingual (Arabic/English) website providing comprehensive information for expatriates living and working in Saudi Arabia. Built with Next.js 16 and Sanity CMS.

## 🌐 Website Overview

**Expat Life Info** (دليل المغتربين في السعودية) is your ultimate resource for navigating life in the Kingdom of Saudi Arabia. The platform provides:

- 📰 **Latest News** - Local news and updates for expats
- 📋 **Guides & Articles** - In-depth articles on visas, jobs, living costs, and more
- 🧮 **Tools** - Gold rate calculator, and more utility tools
- 🏛️ **Government Services** - Information about official government services
- 📂 **Categories** - Organized content by topic

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | React Framework |
| React | 19.2.3 | UI Library |
| Sanity CMS | 4.22.0 | Headless CMS |
| next-sanity | 11.6.12 | Sanity Integration |
| Tailwind CSS | 4 | Styling |
| Lucide React | 0.575.0 | Icons |

## 📁 Project Structure

```
saudiguide/
├── app/                    # Next.js App Router
│   ├── [lang]/            # Internationalized routes
│   │   ├── page.jsx       # Homepage
│   │   ├── blog/          # Blog listing & details
│   │   ├── category/     # Category pages
│   │   ├── gold-rate/     # Gold rate tool
│   │   └── government/    # Government services
│   ├── api/               # API routes
│   │   └── gold/          # Gold price API
│   └── dashboard/         # Sanity Studio
├── components/            # React components
│   ├── Home/              # Homepage sections
│   ├── Blog/              # Blog components
│   ├── Category/          # Category components
│   ├── Gold/              # Gold dashboard
│   ├── Government/        # Government services
│   ├── Navbar.jsx         # Navigation
│   └── Footer.jsx         # Footer
├── services/              # Data services
│   ├── postServices.js    # Blog post fetching
│   └── categoriesServices.js # Category fetching
├── sanity/                # Sanity configuration
│   ├── schemaTypes/       # Content schemas
│   └── lib/               # Sanity client
└── public/                # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The website will be available at `http://localhost:3000`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🌎 Internationalization

The website supports **English** (`en`) and **Arabic** (`ar`) with full RTL support.

### Language Detection

- URLs include language code: `/en/` or `/ar/`
- Content is fetched based on the language parameter
- Layout automatically switches direction (LTR/RTL)

### Adding New Languages

1. Add the language code to `validLangs` array in page files
2. Create translations in component dictionaries
3. Update navbar language switcher

## 📂 Core Features

### 1. Homepage Sections

The homepage (`app/[lang]/page.jsx`) includes multiple sections:

- **Latest News Slider** - Featured articles
- **Tools Section** - Utility tools (Gold Rate available)
- **Popular Guides** - Most-read articles
- **Category Explore** - Browse by category
- **Categories Grid** - All categories
- **Living in Saudi** - Cost of living content
- **Visa & Iqama** - Visa-related articles
- **Banking & Finance** - Financial guides
- **Jobs & Salaries** - Employment resources
- **Driving & Traffic** - Driving guidelines
- **Business Setup** - Company formation
- **Government Services** - Official services

### 2. Blog System

- **Blog Listing** - `/[lang]/blog`
- **Blog Details** - `/[lang]/blog/[slug]`
- Powered by Sanity CMS
- Supports rich text with Portable Text

### 3. Categories

Categories available:

| Category | Arabic | Slug |
|----------|-------|-----|
| Visa & Iqama | التأشيرات والإقامة | visa-and-iqama |
| Jobs & Salaries | الوظائف والرواتب | jobs-and-salaries |
| Cost of Living | تكلفة المعيشة | cost-of-living |
| Business Setup | تأسيس الشركات | business-and-company-setup |
| Driving & Traffic | القيادة والمرور | driving-and-traffic |
| Banking & Finance | الخدمات المصرفية والمالية | banking-and-finance |

### 4. Gold Rate Tool

**Live gold price dashboard** with:

- Real-time prices in SAR
- Multiple purity options (24K, 22K, 18K)
- Conversion to different units (gram, tola, ounce)
- Currency conversion
- Regional market data

Access: `/[lang]/gold-rate`

### 5. Government Services

Information about Saudi government services and portals.

Access: `/[lang]/government`

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#0d1a0f` | Dark green - main brand |
| Accent | `#d4843e` | Orange/gold - highlights |
| Background | `#faf8f5` | Light cream - backgrounds |
| Text Primary | `#0d1a0f` | Dark text |
| Text Muted | `#4a5e4d` | Secondary text |

### Typography

- Headings: Custom font stack
- Body: System fonts with RTL support for Arabic

### RTL Support

- Automatic text direction switching
- Mirrored layouts for Arabic
- Proper Arabic numeral handling

## 🔌 API Endpoints

### Gold Prices

```bash
GET /api/gold
```

Returns current gold prices in SAR.

## 🧩 Component Architecture

### Reusable Components

| Component | Location | Purpose |
|-----------|----------|---------|
| Navbar | `components/Navbar.jsx` | Main navigation |
| Footer | `components/Footer.jsx` | Site footer |
| ToolsSection | `components/Home/ToolsSection.jsx` | Tools grid |
| GoldDashboard | `components/Gold/GoldDashboard.jsx` | Gold prices |
| BlogList | `components/Blog/BlogList.jsx` | Blog listing |
| BlogDetails | `components/Blog/BlogDetails.jsx` | Single post |
| CategoryView | `components/Category/CategoryView.jsx` | Category page |

## 📦 Sanity CMS Integration

### Schema Types

- **Post** - Blog articles
- **Category** - Content categories
- **Author** - Article authors

### Sanity Studio

Access the CMS at: `/dashboard`

Configure in:
- `sanity.config.js`
- `sanity/schemaTypes/`

## 🔧 Development Guidelines

### Adding New Features

1. Create component in `components/`
2. Add page route in `app/[lang]/`
3. Include in homepage if needed
4. Add translations

### Code Style

- Use ESLint for code quality
- Follow React best practices
- Use `"use client"` for interactive components
- Implement proper TypeScript types

### Performance

- ISR (Incremental Static Regeneration) for pages
- Image optimization with `next/image`
- Code splitting via Next.js

## 🔐 Environment Variables

Create `.env.local` for local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

## 📱 Responsive Design

| Breakpoint | Width | Columns |
|------------|-------|---------|
| Mobile | <640px | 1 |
| Tablet | 640-1024px | 2 |
| Desktop | 1024-1280px | 3 |
| Large | >1280px | 4 |

## 📄 License

Private - All rights reserved

## 👏 Credits

- Built with [Next.js](https://nextjs.org)
- CMS by [Sanity](https://www.sanity.io)
- Icons by [Lucide](https://lucide.dev)
- Styling with [Tailwind CSS](https://tailwindcss.com)

---

For more details about specific components, see individual component READMEs at `components/Home/ToolsSection/README.md`