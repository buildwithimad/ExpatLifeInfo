import React from "react";
import Link from "next/link";
import Image from "next/image"; // Upgraded to Next.js Image for better performance

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
  const isArabic = lang === "ar";
  const t = isArabic ? uiTranslations.ar : uiTranslations.en;

  if (!popularGuides || popularGuides.length === 0) return null;

  // Split the guides: 1 featured, the rest in a grid
  const featuredGuide = popularGuides[0];
  const gridGuides = popularGuides.slice(1);

  return (
    <section 
      dir={isArabic ? "rtl" : "ltr"} 
      className="py-16 md:py-24 px-5 lg:px-8 bg-[#f5f0e8] selection:bg-[#b5651d] selection:text-[#f5f0e8]"
    >
      <div className="max-w-[1200px] mx-auto">
        
        {/* ── Section Header ── */}
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
            <p className="text-[#4a5e4d] text-base md:text-lg leading-relaxed">
              {t.subtitle}
            </p>
          </div>
          
          <Link 
            href={`/${lang}/blog`}
            className="group inline-flex items-center gap-2 text-[#b5651d] font-bold uppercase tracking-widest text-xs transition-colors hover:text-[#0d1a0f] shrink-0 pb-2"
          >
            {t.viewAll}
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* ── Featured Guide (First Item) ── */}
        {featuredGuide && (
          <article className="group mb-16 md:mb-24">
            <Link href={`/${lang}/blog/${featuredGuide.slug}`} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 outline-none items-center">
              
              {/* Featured Image */}
              <div className="relative w-full aspect-[16/10] md:aspect-[4/3] rounded-[2rem] overflow-hidden bg-[#0d1a0f]/5">
                {featuredGuide.image && (
                  <img 
                    src={featuredGuide.image} 
                    alt={featuredGuide.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                  />
                )}
              </div>

              {/* Featured Content */}
              <div className="flex flex-col justify-center py-4 lg:py-0">
                <span className="text-[#b5651d] text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-4 block">
                  {featuredGuide.categoryTitle || t.defaultCategory}
                </span>
                
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black text-[#0d1a0f] leading-[1.15] mb-6 transition-colors group-hover:text-[#b5651d]">
                  {featuredGuide.title}
                </h3>
                
                <p className="text-[#4a5e4d] text-base md:text-lg leading-relaxed line-clamp-3 md:line-clamp-4 mb-8">
                  {featuredGuide.excerpt}
                </p>
                
                <span className="inline-flex items-center gap-2 text-[#0d1a0f] text-[0.65rem] font-black uppercase tracking-[0.3em] group-hover:text-[#b5651d] transition-colors duration-300 w-fit">
                  {t.readGuide}
                  <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 inline-block">
                    {isArabic ? "←" : "→"}
                  </span>
                </span>
              </div>

            </Link>
          </article>
        )}

        {/* Divider if there are grid items */}
        {gridGuides.length > 0 && (
          <div className="w-full h-px bg-[#0d1a0f]/10 mb-16 md:mb-20" />
        )}

        {/* ── Grid Guides (Remaining Items) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {gridGuides.map((guide) => (
            <article key={guide._id} className="group flex flex-col h-full">
              <Link href={`/${lang}/blog/${guide.slug}`} className="flex flex-col h-full outline-none">
                
                {/* Grid Image */}
                <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-[#0d1a0f]/5 mb-6">
                  {guide.image && (
                    <img 
                      src={guide.image} 
                      alt={guide.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Grid Content */}
                <div className="flex flex-col flex-1">
                  <span className="text-[#b5651d] text-[0.6rem] font-bold uppercase tracking-[0.2em] mb-3 block">
                    {guide.categoryTitle || t.defaultCategory}
                  </span>
                  
                  <h4 className="font-serif text-xl md:text-2xl font-bold text-[#0d1a0f] leading-snug mb-4 transition-colors group-hover:text-[#b5651d]">
                    {guide.title}
                  </h4>
                  
                  <p className="text-[#4a5e4d]/80 text-sm leading-relaxed line-clamp-3 mb-6">
                    {guide.excerpt}
                  </p>
                  
                  {/* Push CTA to the bottom */}
                  <div className="mt-auto inline-flex items-center gap-2 text-[#0d1a0f] text-[0.6rem] font-black uppercase tracking-[0.3em] group-hover:text-[#b5651d] transition-colors duration-300">
                    {t.readGuide}
                    <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 inline-block">
                      {isArabic ? "←" : "→"}
                    </span>
                  </div>
                </div>

              </Link>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}