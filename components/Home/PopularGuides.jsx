"use client";
import React, { useState } from "react";
import Link from "next/link";

const uiTranslations = {
  en: {
    sectionTitle: "Essential Expat Guides",
    subtitle: "Navigate the complexities of Saudi life with our curated intelligence.",
    viewAll: "Explore All Guides",
    readGuide: "Read Guide",
    defaultCategory: "Guide",
  },
  ar: {
    sectionTitle: "أدلة المغتربين الأساسية",
    subtitle: "تجاوز تعقيدات الحياة في السعودية مع معلوماتنا المنسقة بعناية.",
    viewAll: "استكشف جميع الأدلة",
    readGuide: "اقرأ الدليل",
    defaultCategory: "دليل",
  },
};

export default function PopularGuides({ lang, popularGuides }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const isArabic = lang === "ar";
  const t = isArabic ? uiTranslations.ar : uiTranslations.en;

  // Return null if there's no data to show
  if (!popularGuides || popularGuides.length === 0) return null;

  return (
    <section 
      dir={isArabic ? "rtl" : "ltr"} 
      className="py-16 md:py-32 px-5 lg:px-8 bg-[#f5f0e8]"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header (Clean, borderless) */}
        <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 md:w-12 h-[2px] bg-[#b5651d]" />
              <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#b5651d]">
                Intelligence Brief
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-black text-[#0d1a0f] tracking-tight mb-4">
              {t.sectionTitle}
            </h2>
            <p className="text-[#4a5e4d] text-sm md:text-lg">
              {t.subtitle}
            </p>
          </div>
          
          <Link 
            href={`/${lang}/guides`}
            className="group inline-flex items-center gap-2 bg-[#0d1a0f]/5 px-6 py-3 rounded-full text-[#0d1a0f] font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-[#0d1a0f] hover:text-[#f5f0e8] w-fit"
          >
            {t.viewAll}
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-start">
          
          {/* ── LEFT: STICKY IMAGE GALLERY (Desktop) ── */}
          <div className="hidden lg:block relative w-full aspect-[4/5] overflow-hidden bg-[#0d1a0f] sticky top-32 rounded-2xl">
            {popularGuides.map((guide, index) => (
              <img 
                key={guide._id}
                src={guide.image} 
                alt={guide.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  activeIndex === index 
                    ? "opacity-100 scale-100" 
                    : "opacity-0 scale-105"
                }`}
              />
            ))}
            
            {/* Soft gradient to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute top-8 start-8 bg-[#f5f0e8] text-[#0d1a0f] text-[0.65rem] font-bold uppercase tracking-widest px-4 py-2 rounded-md transition-all shadow-sm">
              {popularGuides[activeIndex]?.categoryTitle || t.defaultCategory}
            </div>
          </div>

          {/* ── RIGHT: HOVER ACCORDION LIST ── */}
          <div className="flex flex-col gap-2">
            {popularGuides.map((guide, index) => {
              const isActive = activeIndex === index;
              return (
                <div 
                  key={guide._id} 
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative flex gap-5 md:gap-8 py-8 cursor-pointer transition-colors duration-300 ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
                >
                 

                  {/* Giant Number */}
                  <div className="text-3xl md:text-5xl font-serif font-light text-[#0d1a0f] mt-1">
                    0{index + 1}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 mt-2">
                    <h3 className="font-serif text-xl md:text-3xl font-bold text-[#0d1a0f] leading-tight mb-2 transition-colors duration-300">
                      {guide.title}
                    </h3>

                    {/* Sliding Excerpt (Uses CSS Grid for smooth height animation) */}
                    <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        
                        {/* MOBILE ONLY: INLINE IMAGE (Clean, rounded, no borders) */}
                        <div className="block lg:hidden relative w-full aspect-[16/9] mb-6 overflow-hidden rounded-xl bg-[#0d1a0f]">
                          <img 
                            src={guide.image} 
                            alt={guide.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute top-3 start-3 bg-[#f5f0e8] text-[#0d1a0f] text-[0.55rem] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md">
                            {guide.categoryTitle || t.defaultCategory}
                          </div>
                        </div>

                        <p className="text-[#4a5e4d] text-sm md:text-base leading-relaxed max-w-lg mb-6">
                          {guide.excerpt}
                        </p>
                        
                        <Link 
                          href={`/${lang}/guides/${guide.slug}`}
                          className="inline-flex items-center gap-2 text-[#b5651d] font-bold uppercase tracking-widest text-xs transition-colors hover:text-[#0d1a0f]"
                        >
                          {t.readGuide}
                          <span className="w-8 h-[1px] bg-current transition-all group-hover:w-12" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}