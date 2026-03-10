"use client";
import React from "react";
import Link from "next/link";

export default function LivingInSaudi({ lang, livingPosts }) {
  const isArabic = lang === "ar";

  // UI Translations
  const t = {
    sectionEyebrow: isArabic ? "أسلوب الحياة والثقافة" : "Lifestyle & Culture",
    sectionTitle: isArabic ? "المعيشة في السعودية" : "Living in Saudi",
    viewAll: isArabic ? "المزيد من أخبار المعيشة" : "More Lifestyle News",
    defaultCategory: isArabic ? "معيشة" : "Living",
  };

  // Prevent rendering if there is no data
  if (!livingPosts || livingPosts.length === 0) return null;

  return (
    <section 
      dir={isArabic ? "rtl" : "ltr"} 
      className="py-16 md:py-24 px-5 lg:px-8 bg-[#f5f0e8]"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-2 border-[#0d1a0f] mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[2px] bg-[#b5651d]" />
              <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#b5651d]">
                {t.sectionEyebrow}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-black text-[#0d1a0f] tracking-tight">
              {t.sectionTitle}
            </h2>
          </div>
          
          <Link 
            href={`/${lang}/living`}
            className="group flex items-center gap-2 text-[#0d1a0f] font-bold uppercase tracking-widest text-xs transition-colors hover:text-[#b5651d]"
          >
            {t.viewAll}
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Article Grid (4 Columns, 2 Rows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-12 md:gap-y-16">
          {livingPosts.map((post) => (
            <article key={post._id} className="group flex flex-col h-full">
              <Link href={`/${lang}/living/${post.slug}`} className="flex flex-col h-full outline-none">
                
                {/* Image from Sanity */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0d1a0f] mb-5 border border-[#0d1a0f]/10">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105 opacity-95"
                  />
                </div>

                {/* Meta Data (Sanity Category & Date) */}
                <div className="flex items-center gap-3 text-[0.6rem] font-bold uppercase tracking-widest mb-3">
                  <span className="text-[#b5651d]">
                    {post.categoryTitle || t.defaultCategory}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#0d1a0f]/20" />
                  <span className="text-[#4a5e4d]">
                    {new Date(post.publishedAt).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                {/* Title (Line Clamped) */}
                <h3 className="font-serif text-xl font-bold text-[#0d1a0f] leading-snug mb-3 transition-colors group-hover:text-[#b5651d] line-clamp-3">
                  {post.title}
                </h3>
                
                {/* Excerpt (Line Clamped) */}
                <p className="text-[#4a5e4d] text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}