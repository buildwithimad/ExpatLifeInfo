"use client";
import React from "react";
import Image from "next/image";

export default function GovernmentServices({ lang }) {
  const isArabic = lang === "ar";

  // Fixed Data for Official Government Portals
  const portals = {
    hero: {
      id: "absher",
      titleEn: "Absher Platform",
      titleAr: "منصة أبشر",
      descEn: "The central portal for the Ministry of Interior. Essential for issuing exit/re-entry visas, tracking traffic violations, and managing digital residency (Iqama).",
      descAr: "البوابة المركزية لوزارة الداخلية. ضرورية لإصدار تأشيرات الخروج والعودة، تتبع المخالفات المرورية، وإدارة الإقامة الرقمية.",
      url: "https://www.absher.sa/",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", 
      tagEn: "Essential",
      tagAr: "أساسي",
    },
    grid: [
      {
        id: "qiwa",
        titleEn: "Qiwa",
        titleAr: "منصة قوى",
        descEn: "Ministry of Human Resources platform for employment contracts, end-of-service calculation, and sponsorship transfers.",
        descAr: "منصة وزارة الموارد البشرية لعقود العمل، حساب نهاية الخدمة، ونقل الكفالة.",
        url: "https://qiwa.sa/",
        domain: "qiwa.sa"
      },
      {
        id: "gosi",
        titleEn: "GOSI",
        titleAr: "التأمينات الاجتماعية",
        descEn: "General Organization for Social Insurance. Track your employment history, salary records, and occupational hazard coverage.",
        descAr: "المؤسسة العامة للتأمينات الاجتماعية. تتبع تاريخك الوظيفي، سجلات الرواتب، وتغطية الأخطار المهنية.",
        url: "https://www.gosi.gov.sa/",
        domain: "gosi.gov.sa"
      },
      {
        id: "ejar",
        titleEn: "Ejar Network",
        titleAr: "شبكة إيجار",
        descEn: "The official real estate platform to document standardized residential and commercial rental contracts.",
        descAr: "المنصة العقارية الرسمية لتوثيق عقود الإيجار السكنية والتجارية الموحدة.",
        url: "https://www.ejar.sa/",
        domain: "ejar.sa"
      },
      {
        id: "najiz",
        titleEn: "Najiz",
        titleAr: "بوابة ناجز",
        descEn: "Ministry of Justice portal for electronic legal services, issuing powers of attorney (Wakala), and court documents.",
        descAr: "بوابة وزارة العدل للخدمات القانونية الإلكترونية، إصدار الوكالات، ووثائق المحاكم.",
        url: "https://najiz.sa/",
        domain: "najiz.sa"
      },
      {
        id: "sehaty",
        titleEn: "Sehaty",
        titleAr: "تطبيق صحتي",
        descEn: "Ministry of Health portal for booking medical appointments, viewing sick leaves, and accessing vaccination records.",
        descAr: "بوابة وزارة الصحة لحجز المواعيد الطبية، عرض الإجازات المرضية، والوصول لسجلات التطعيم.",
        url: "https://www.moh.gov.sa/",
        domain: "moh.gov.sa"
      },
      {
        id: "zatca",
        titleEn: "ZATCA",
        titleAr: "هيئة الزكاة والضريبة",
        descEn: "Zakat, Tax and Customs Authority. Important for business owners managing VAT, e-invoicing, and customs declarations.",
        descAr: "هيئة الزكاة والضريبة والجمارك. مهمة لأصحاب الأعمال لإدارة ضريبة القيمة المضافة والفواتير الإلكترونية.",
        url: "https://zatca.gov.sa/",
        domain: "zatca.gov.sa"
      }
    ]
  };

  const t = {
    sectionEyebrow: isArabic ? "بوابات رسمية" : "Official Portals",
    sectionTitle: isArabic ? "المنصات الحكومية" : "Government Services",
    visitPortal: isArabic ? "زيارة المنصة" : "Visit Portal",
  };

  return (
    <section 
      dir={isArabic ? "rtl" : "ltr"} 
      // Clean white background, removed heavy top border
      className="py-24 px-5 lg:px-8 bg-white"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* Sleek Minimal Header */}
        <div className="flex flex-col mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#b5651d]" />
            <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#b5651d]">
              {t.sectionEyebrow}
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-[#0d1a0f] tracking-tight leading-none">
            {t.sectionTitle}
          </h2>
        </div>

        {/* ========================================= */}
        {/* 1. FEATURED HERO (Absher) */}
        {/* ========================================= */}
        <article className="group relative flex flex-col lg:flex-row gap-10 lg:gap-16 mb-20 lg:mb-24">
          {/* Hero Image (Soft rounded corners) */}
          <a 
            href={portals.hero.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="relative w-full lg:w-[60%] aspect-[16/10] overflow-hidden rounded-2xl bg-[#f5f0e8] outline-none"
          >
            <Image 
              src={portals.hero.image} 
              alt="Absher"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover opacity-90 transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
            />
            {/* Pill Badge */}
            <div className="absolute top-5 start-5 bg-[#0d1a0f] text-[#f5f0e8] text-[0.6rem] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
              {isArabic ? portals.hero.tagAr : portals.hero.tagEn}
            </div>
            {/* External Link Floating Circle */}
            <div className="absolute bottom-5 end-5 w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0d1a0f] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="w-5 h-5 rtl:-scale-x-100">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
          </a>

          {/* Hero Content */}
          <div className="flex flex-col justify-center w-full lg:w-[40%]">
            <h3 className="font-serif text-4xl md:text-5xl font-black text-[#0d1a0f] leading-tight mb-6 group-hover:text-[#b5651d] transition-colors duration-300">
              {isArabic ? portals.hero.titleAr : portals.hero.titleEn}
            </h3>

            <p className="text-[#4a5e4d] text-lg leading-relaxed mb-10 font-medium">
              {isArabic ? portals.hero.descAr : portals.hero.descEn}
            </p>

            {/* Vercel-style Pill Button */}
            <a 
              href={portals.hero.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#0d1a0f] text-[#f5f0e8] h-12 px-8 rounded-full font-bold text-[0.7rem] uppercase tracking-[0.15em] hover:bg-[#b5651d] hover:text-white transition-colors self-start"
            >
              {t.visitPortal}
              <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="w-4 h-4 ms-2 rtl:-scale-x-100">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </article>

        {/* ========================================= */}
        {/* 2. MODERN CARD GRID (Other Platforms) */}
        {/* ========================================= */}
        {/* Removed borders, added gaps to create floating cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portals.grid.map((portal) => (
            <a 
              key={portal.id} 
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              // Vercel-style cards: Soft background, rounded, crisp interactions
              className="group flex flex-col p-8 lg:p-10 rounded-2xl bg-[#f5f0e8]/50 outline-none hover:bg-[#0d1a0f] transition-colors duration-500"
            >
              {/* Top row: Title and Arrow */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-serif text-2xl font-bold text-[#0d1a0f] group-hover:text-[#f5f0e8] transition-colors duration-500">
                  {isArabic ? portal.titleAr : portal.titleEn}
                </h3>
                <div className="w-8 h-8 rounded-full bg-white/50 group-hover:bg-white/10 flex items-center justify-center shrink-0 transition-colors duration-500">
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 text-[#0d1a0f] group-hover:text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:-scale-x-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#4a5e4d] group-hover:text-[#f5f0e8]/70 text-sm leading-relaxed mb-8 flex-1 transition-colors duration-500">
                {isArabic ? portal.descAr : portal.descEn}
              </p>

              {/* Bottom URL Monospace text */}
              <div className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#0d1a0f]/40 group-hover:text-[#b5651d] transition-colors duration-500 mt-auto pt-5 border-t border-[#0d1a0f]/5 group-hover:border-[#f5f0e8]/10">
                {portal.domain}
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}