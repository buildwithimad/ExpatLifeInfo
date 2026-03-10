"use client";
import Link from "next/link";
// IMPORT NEXT.JS IMAGE FOR OPTIMIZED LOADING
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

// Localized Data Dictionary mapped to real Sanity Categories
const localizedData = {
  en: {
    tickerTitle: "Saudi Expat Guide",
    brandSaudi: "Saudi", // Kept for alt text
    brandExpat: "Expat", // Kept for alt text
    live: "Live",
    yourGuide: "Your guide<br />to life in KSA",
    localNews: "Local News",
    quickAccess: "Quick Access",
    langName: "العربية",
    langCode: "ar",
    quickAccessTiles: ["Weather", "Currency", "Prayer Times", "Directory"],
    primaryNav: [
      { label: "Home", href: "/" },
      { label: "Visa & Iqama", href: "/category/visa-and-iqama" },
      { label: "Jobs & Salaries", href: "/category/jobs-and-salaries" },
      { label: "Cost of Living", href: "/category/cost-of-living" },
      { label: "Business Setup", href: "/category/business-and-company-setup" },
      { label: "Driving & Traffic", href: "/category/driving-and-traffic" },
      { label: "Banking & Finance", href: "/category/banking-and-finance" },
    ],
    secondaryNav: [
      { label: "Gov Services", href: "/government" },
      { label: "Riyadh", href: "/news/riyadh" },
      { label: "Jeddah", href: "/news/jeddah" },
      { label: "Dammam", href: "/news/dammam" },
      { label: "NEOM", href: "/news/neom" },
      { label: "Guides", href: "/guides" },
    ],
    tickerItems: [
      "Latest: New Premium Residency products launched",
      "MHRSD updates Qiwa platform transfer rules",
      "Riyadh metro officially begins partial operations",
      "Saudi Arabia introduces new digital Iqama features",
    ],
  },
  ar: {
    tickerTitle: "دليل المغترب السعودي",
    brandSaudi: "المغترب", // Kept for alt text
    brandExpat: "السعودي", // Kept for alt text
    live: "مباشر",
    yourGuide: "دليلك للحياة<br />في السعودية",
    localNews: "أخبار محلية",
    quickAccess: "وصول سريع",
    langName: "English",
    langCode: "en",
    quickAccessTiles: ["الطقس", "العملات", "أوقات الصلاة", "الدليل"],
    primaryNav: [
      { label: "الرئيسية", href: "/" },
      { label: "التأشيرات والإقامة", href: "/category/visa-and-iqama" },
      { label: "الوظائف والرواتب", href: "/category/jobs-and-salaries" },
      { label: "تكلفة المعيشة", href: "/category/cost-of-living" },
      { label: "تأسيس الأعمال", href: "/category/business-and-company-setup" },
      { label: "القيادة والمرور", href: "/category/driving-and-traffic" },
      { label: "البنوك والمالية", href: "/category/banking-and-finance" },
    ],
    secondaryNav: [
      { label: "الخدمات الحكومية", href: "/category/government-services" },
      { label: "الرياض", href: "/news/riyadh" },
      { label: "جدة", href: "/news/jeddah" },
      { label: "الدمام", href: "/news/dammam" },
      { label: "نيوم", href: "/news/neom" },
      { label: "أدلة", href: "/guides" },
    ],
    tickerItems: [
      "عاجل: إطلاق منتجات جديدة للإقامة المميزة",
      "الموارد البشرية تحدث قواعد نقل الكفالة عبر منصة قوى",
      "مترو الرياض يبدأ عملياته التشغيلية جزئياً",
      "السعودية تقدم ميزات جديدة لهوية المقيم الرقمية",
    ],
  },
};

export default function Navbar({ lang, tickerItems = [] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Determine current language state
  const isArabic = lang === "ar";
  const t = isArabic ? localizedData.ar : localizedData.en;
  
  // Use prop tickerItems if provided, otherwise fall back to localizedData
  const displayTickerItems = tickerItems.length > 0 
    ? tickerItems 
    : t.tickerItems;

  // Logic to calculate the alternative language link
  const redirectedPathname = (targetLang) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = targetLang;
    return segments.join("/");
  };

  // Dynamic active state checker
  const checkIsActive = (href) => {
    if (href === "/") {
      return pathname === `/${lang}` || pathname === `/${lang}/`;
    }
    return pathname.includes(href);
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <div dir={isArabic ? "rtl" : "ltr"}>
      <style>{`
        @keyframes ticker-ltr { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes ticker-rtl { from { transform: translateX(0); } to { transform: translateX(50%); } }
        @keyframes live-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.3; transform: scale(0.6); } }
        @keyframes ov-in-ltr { from { opacity: 0; transform: translateX(-14px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes ov-in-rtl { from { opacity: 0; transform: translateX(14px); } to { opacity: 1; transform: translateX(0); } }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      <header className="sticky top-0 z-[100] bg-[#f5f0e8] border-b-[3px] border-[#0d1a0f]">
        {/* Ticker stripe */}
        <div className="bg-[#0d1a0f] h-[28px] flex items-center px-5 overflow-hidden gap-4">
          <span className="text-[0.63rem] font-bold tracking-[0.18em] uppercase text-[#d4843e] shrink-0 hidden sm:block">{t.tickerTitle}</span>
          <span className="w-[1px] h-[12px] bg-[#f5f0e8]/10 shrink-0 hidden sm:block" />
          <div className="flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)]">
            <div className="flex items-center gap-10 whitespace-nowrap hover:[animation-play-state:paused]" style={{ animation: `${isArabic ? 'ticker-rtl' : 'ticker-ltr'} 30s linear infinite` }}>
              {[...displayTickerItems, ...displayTickerItems].map((item, i) => (
                <React.Fragment key={i}>
                  <span className="text-[0.68rem] font-medium tracking-[0.07em] text-[#f5f0e8]/60 shrink-0 uppercase">{item}</span>
                  <span className="text-[#b5651d] shrink-0 text-[0.45rem]">◆</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Brand row */}
        <div className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center px-5 lg:px-8 h-[64px] lg:h-[72px] border-b-[1.5px] border-[#0d1a0f]/10 gap-4">
          <div className="flex items-center">
            <button className="w-[36px] h-[36px] flex lg:hidden items-center justify-center bg-transparent border-[1.5px] border-[#0d1a0f]/20 text-[#0d1a0f] cursor-pointer shrink-0" onClick={() => setMobileOpen(true)}>
              <svg fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" className="w-4 h-4"><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="16" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></svg>
            </button>
          </div>

          {/* 🌟 REPLACED: Updated Link component with Next.js Image */}
          <Link href={`/${lang}`} className="flex items-center justify-self-center outline-none">
            {/* The relative container allows Next.js 'fill' strategy.
                Adjust the clamp values if your logo is square.
                Currently optimized for a wide, premium logo. */}
            <div className="relative h-[clamp(32px,4vw,40px)] md:h-[48px] aspect-[4/1] overflow-hidden">
                <Image 
                  src="/Logo.png" // User-specified path
                  alt={`${t.brandSaudi} ${t.brandExpat}`} // Existing translation strings for alternative text
                  fill
                  className="object-contain" // Ensures the logo isn't cropped or stretched
                  priority // Tells Next.js to load this instantly for SEO
                  sizes="(max-width: 768px) 160px, 192px" // Optimization hint for Next.js
                />
            </div>
          </Link>

          <div className="flex items-center justify-end gap-2">
            {/* Desktop Language Switcher */}
            <Link 
                href={redirectedPathname(t.langCode)}
                className="hidden lg:flex h-[36px] items-center px-3 border-[1.5px] border-[#b5651d]/30 text-[#b5651d] text-[0.65rem] font-bold uppercase tracking-widest hover:bg-[#b5651d] hover:text-[#f5f0e8] transition-all outline-none rounded-sm"
            >
                {t.langName}
            </Link>

            <button className="w-[36px] h-[36px] flex items-center justify-center bg-transparent border-[1.5px] border-[#0d1a0f]/20 text-[#0d1a0f] cursor-pointer shrink-0 hover:bg-[#0d1a0f] hover:text-[#f5f0e8] transition-colors rounded-sm"><svg fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" className="w-4 h-4"><circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M20 20l-4-4" /></svg></button>
          </div>
        </div>

        {/* Desktop primary nav */}
        <div className="hidden lg:block bg-[#f5f0e8] border-b-[1.5px] border-[#0d1a0f]/10 overflow-x-auto hide-scrollbar">
          <div className="flex items-stretch px-8 min-w-max">
            {t.primaryNav.map((item, i) => {
              const isActive = checkIsActive(item.href);
              return (
                <Link key={item.label} href={`/${lang}${item.href === "/" ? "" : item.href}`} className={`group relative flex items-center gap-[0.35rem] px-[0.95rem] h-[44px] text-[0.75rem] font-semibold tracking-[0.1em] uppercase whitespace-nowrap transition-colors duration-150 border-e border-[#0d1a0f]/10 overflow-hidden first:border-s outline-none ${isActive ? 'bg-[#0d1a0f] text-[#f5f0e8]' : 'text-[#4a5e4d] hover:text-[#f5f0e8]'}`}>
                  {!isActive && <span className="absolute inset-0 bg-[#0d1a0f] scale-y-0 origin-bottom transition-transform duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-y-100 z-0" />}
                  <span className={`text-[0.48rem] font-light relative z-10 leading-none mt-[3px] shrink-0 ${isActive ? 'text-[#d4843e]' : 'text-[#b5651d]'}`}>0{i + 1}</span>
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
            {/* Live Indicator filler at the end */}
            <div className="ms-auto flex items-center gap-[0.4rem] px-5 border-s border-[#0d1a0f]/10 h-[44px] shrink-0 sticky end-0 bg-[#f5f0e8]">
              <span className="w-[6px] h-[6px] bg-[#c0392b] rounded-full animate-[live-pulse_1.6s_infinite]" />
              <span className="text-[0.64rem] font-bold tracking-[0.16em] uppercase text-[#c0392b]">{t.live}</span>
            </div>
          </div>
        </div>

        {/* Secondary/city nav */}
        <div className="bg-[#1a3320] overflow-x-auto hide-scrollbar">
          <div className="flex items-center h-[36px] px-5 lg:px-8 min-w-max">
            {t.secondaryNav.map((item) => (
              <Link key={item.label} href={`/${lang}${item.href}`} className="group relative flex items-center h-full px-[0.85rem] text-[0.7rem] font-medium tracking-[0.1em] uppercase text-[#f5f0e8]/50 whitespace-nowrap transition-colors duration-150 border-e border-[#f5f0e8]/10 first:border-s hover:text-[#f5f0e8] hover:bg-[#f5f0e8]/5 outline-none">
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#b5651d] scale-x-0 origin-center transition-transform duration-200 group-hover:scale-x-100" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div className={`fixed inset-0 z-[200] grid grid-cols-[3fr_2fr] ${mobileOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible transition-[visibility] duration-0 delay-[450ms]'}`}>
        <div className={`bg-[#0d1a0f] flex flex-col overflow-hidden transition-transform duration-[440ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${mobileOpen ? 'translate-x-0' : (isArabic ? 'translate-x-full' : '-translate-x-full')}`}>
          <div className="flex items-center justify-between px-4 h-[56px] border-b border-[#f5f0e8]/10 shrink-0">
            {/* 🌟 Updated Mobile Branding Link to use Logo Image */}
            <Link href={`/${lang}`} className="relative h-[32px] aspect-[4/1] outline-none">
              <Image 
                  src="/assets/images/logo.png" 
                  alt={`${t.brandSaudi} ${t.brandExpat}`}
                  fill
                  className="object-contain"
                  priority
              />
            </Link>
            <button className="w-[36px] h-[36px] flex items-center justify-center bg-transparent border-[1.5px] border-[#f5f0e8]/15 text-[#f5f0e8] rounded-sm" onClick={() => setMobileOpen(false)}><svg fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" className="w-4 h-4"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {t.primaryNav.map((item, i) => {
              const isActive = checkIsActive(item.href);
              return (
                <Link 
                  key={item.label} 
                  href={`/${lang}${item.href === "/" ? "" : item.href}`} 
                  style={{ 
                    animationName: mobileOpen ? (isArabic ? 'ov-in-rtl' : 'ov-in-ltr') : 'none',
                    animationDuration: '0.32s',
                    animationFillMode: 'both',
                    animationDelay: `${0.14 + (i * 0.05)}s` 
                  }}
                  className={`flex items-baseline gap-2 py-[0.8rem] px-5 text-[clamp(1.1rem,3.5vw,1.5rem)] font-bold tracking-[0.02em] uppercase outline-none border-b border-[#f5f0e8]/5 transition-all duration-[220ms] hover:text-[#f5f0e8] hover:ps-7 hover:bg-[#f5f0e8]/5 ${isActive ? 'text-[#d4843e]' : 'text-[#f5f0e8]/65'}`} 
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-[0.5rem] font-light text-[#b5651d] opacity-60 shrink-0 self-start mt-[6px]">0{i + 1}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="py-4 px-5 border-t border-[#f5f0e8]/10 flex items-center justify-between shrink-0">
              <div className="text-[0.58rem] tracking-[0.14em] uppercase text-[#f5f0e8]/20 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.yourGuide }} />
              {/* Mobile Lang Switcher */}
              <Link href={redirectedPathname(t.langCode)} className="text-[#d4843e] text-[0.7rem] font-bold uppercase tracking-widest border border-[#d4843e]/30 px-3 py-1 rounded-sm hover:bg-[#d4843e] hover:text-[#0d1a0f] transition-all outline-none">
                {t.langName}
              </Link>
          </div>
        </div>

        <div className={`bg-[#f5f0e8] flex flex-col border-s-[2.5px] border-[#0d1a0f] overflow-hidden transition-transform duration-[440ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${mobileOpen ? 'translate-x-0' : (isArabic ? '-translate-x-full' : 'translate-x-full')}`}>
          <div className="h-[56px] flex items-center justify-end px-3 border-b border-[#0d1a0f]/10 shrink-0"><button className="w-[36px] h-[36px] flex items-center justify-center bg-transparent border-[1.5px] border-[#0d1a0f]/20 text-[#0d1a0f] rounded-sm" onClick={() => setMobileOpen(false)}><svg fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" className="w-4 h-4"><circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M20 20l-4-4" /></svg></button></div>
          <div className="flex-1 overflow-y-auto py-5 px-4 flex flex-col gap-6 hide-scrollbar">
            <div>
              <div className="text-[0.52rem] font-bold tracking-[0.22em] uppercase text-[#b5651d] mb-2 flex items-center gap-[0.4rem] after:content-[''] after:flex-1 after:h-[1px] after:bg-[#0d1a0f]/10">{t.localNews}</div>
              {t.secondaryNav.map((item) => (<Link key={item.label} href={`/${lang}${item.href}`} className="block py-[0.5rem] text-[0.85rem] font-semibold tracking-[0.07em] uppercase text-[#4a5e4d] outline-none border-b border-[#0d1a0f]/5 transition-all duration-150 hover:text-[#0d1a0f] hover:ps-[0.35rem]" onClick={() => setMobileOpen(false)}>{item.label}</Link>))}
            </div>
            <div>
              <div className="text-[0.52rem] font-bold tracking-[0.22em] uppercase text-[#b5651d] mb-2 flex items-center gap-[0.4rem] after:content-[''] after:flex-1 after:h-[1px] after:bg-[#0d1a0f]/10">{t.quickAccess}</div>
              <div className="grid grid-cols-2 gap-[0.4rem]">{t.quickAccessTiles.map((label) => (<div key={label} className="py-[0.55rem] px-[0.6rem] border border-[#0d1a0f]/10 rounded-sm text-[0.65rem] font-semibold tracking-[0.09em] uppercase text-[#4a5e4d] cursor-pointer hover:bg-[#0d1a0f] hover:text-[#f5f0e8] transition-colors">{label}</div>))}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}