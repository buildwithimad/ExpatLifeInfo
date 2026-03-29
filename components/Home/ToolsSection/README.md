# Tools Section Component

A bilingual (Arabic/English) tools hub component for the Saudi Expat Guide website.

## 📁 Location

```
components/Home/ToolsSection.jsx
```

## 🎯 Purpose

Displays a grid of utility tools on the homepage where users can access different financial and daily tools. Currently only **Gold Rate** is functional; all other tools show as "Coming Soon".

## ✨ Features

- **8 Tool Cards** in responsive grid layout
- **Full RTL Support** - Automatically switches text direction for Arabic
- **Bilingual Content** - All text available in English and Arabic
- **Interactive Gold Rate Card** - Links to `/[lang]/gold-rate` with animated button
- **Coming Soon Cards** - 7 disabled tools with lock icon
- **Smooth Hover Animations** - Scale, border highlight, button reveal

## 📱 Responsive Grid

| Breakpoint | Columns |
|------------|---------|
| Mobile (<640px) | 1 |
| Tablet (640-1024px) | 2 |
| Desktop (1024-1280px) | 3 |
| Large Desktop (>1280px) | 4 |

## 🛠️ Usage

```jsx
import ToolsSection from "@/components/Home/ToolsSection";

// In your page component
<ToolsSection lang={lang} />
```

## 📦 Props

| Prop | Type | Description |
|------|------|-------------|
| `lang` | `string` | Language code ('en' or 'ar') |

## 🧰 Tools Available

### Available
| Tool | Arabic Name | Route |
|------|-------------|-------|
| Gold Rate | أسعار الذهب | `/${lang}/gold-rate` |

### Coming Soon
| Tool | Arabic Name |
|------|-------------|
| Exchange Rates | أسعار الصرف |
| Prayer Times | أوقات الصلاة |
| Iqama Fee Calculator | حاسبة رسوم الإقامة |
| Work Permit Calculator | حاسبة رخصة العمل |
| ESB Calculator | حاسبة ESB |
| Fuel Prices | أسعار الوقود |
| Cost of Living | تكلفة المعيشة |

## 🎨 Design System

Uses the website's color palette:
- Primary: `#0d1a0f` (Dark Green)
- Accent: `#d4843e` (Orange/Gold)
- Background: `#faf8f5` (Light Cream)
- Text: `#0d1a0f` (Dark) / `#4a5e4d` (Muted)

## 🔧 Adding New Tools

To add a new tool:

1. Add the tool to the `tools` array in [`ToolsSection.jsx`](components/Home/ToolsSection.jsx:34):
```jsx
{
  id: "your-tool-id",
  name: isArabic ? "Arabic Name" : "English Name",
  description: isArabic ? "Arabic description" : "English description",
  icon: YourIcon, // from lucide-react
  status: "available", // or "coming-soon"
  href: `/${lang}/your-route`,
}
```

2. Import the icon from `lucide-react`

3. Add the route in your app directory (e.g., `app/[lang]/your-route/page.jsx`)

## 🚀 Notes

- The component uses `"use client"` directive for client-side interactivity
- Icons are from `lucide-react` library
- No backend logic is implemented for Coming Soon tools
- The section is positioned on the homepage between Category Explore and Categories Grid