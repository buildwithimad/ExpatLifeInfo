"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function BusinessSetup({ lang, businessPosts }) {
  const isArabic = lang === "ar";

  // UI Translations
  const t = {
    sectionEyebrow: isArabic ? "ذكاء الأعمال" : "Business Intelligence",
    sectionTitle: isArabic ? "تأسيس الأعمال والشركات" : "Business & Company Setup",
    viewAll: isArabic ? "جميع أخبار الأعمال" : "All Business News",
    defaultCategory: isArabic ? "أعمال" : "Business",
    noPosts: isArabic ? "لا توجد مقالات متاحة حالياً." : "No posts available right now.",
    readMore: isArabic ? "اقرأ المزيد" : "Read More", // Added translation
  };

  return (
    <section 
      dir={isArabic ? "rtl" : "ltr"} 
      // Using cream background to contrast with the adjacent white sections
      className="py-16 md:py-28 px-5 lg:px-8 bg-[#f5f0e8]"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header (Clean, borderless, editorial pipe) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="flex items-stretch gap-4">
            {/* Editorial left-pipe */}
            <div className="w-[3px] bg-[#b5651d] rounded-full shrink-0" />
            
            <div className="flex flex-col py-1">
              <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#b5651d] mb-1">
                {t.sectionEyebrow}
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-black text-[#0d1a0f] tracking-tight leading-none">
                {t.sectionTitle}
              </h2>
            </div>
          </div>
          
          <Link 
            href={`/${lang}/category/business-and-company-setup`}
            className="group flex items-center gap-2 bg-white px-5 py-2.5 rounded-full text-[#0d1a0f] font-bold uppercase tracking-widest text-[0.65rem] transition-colors hover:bg-[#0d1a0f] hover:text-[#f5f0e8] shrink-0 shadow-sm"
          >
            {t.viewAll}
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-3.5 h-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Dynamic Grid OR Empty State */}
        {!businessPosts || businessPosts.length === 0 ? (
          
          // Empty State Layout
          <div className="flex flex-col items-center justify-center py-24 bg-white/50 rounded-2xl">
            <svg fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" className="w-12 h-12 text-[#0d1a0f]/20 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <p className="text-[#4a5e4d] font-serif text-lg md:text-xl">
              {t.noPosts}
            </p>
          </div>

        ) : (

          // Editorial Clean Grid (2 Columns Mobile, 4 Columns Desktop)
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-10 sm:gap-y-14">
            {businessPosts.map((post) => (
              <article key={post._id} className="group flex flex-col h-full">
                <Link href={`/${lang}/news/${post.slug}`} className="flex flex-col h-full outline-none">
                  
                  {/* Image (Rounded, borderless, optimized Next Image) */}
                  <div className="relative w-full aspect-[16/11] overflow-hidden bg-[#0d1a0f] mb-4 sm:mb-5 rounded-xl">
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    {/* Floating Category Badge (Glassmorphism) */}
                    <div className="absolute top-2 start-2 sm:top-3 sm:start-3 bg-[#0d1a0f]/80 backdrop-blur-sm text-[#f5f0e8] text-[0.45rem] sm:text-[0.55rem] font-bold uppercase tracking-widest px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md z-10">
                      {post.categoryTitle || t.defaultCategory}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col flex-1">
                    {/* Date */}
                    <span className="text-[0.55rem] sm:text-[0.65rem] text-[#b5651d] font-bold uppercase tracking-widest mb-2 sm:mb-3">
                      {new Date(post.publishedAt).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </span>

                    {/* Title */}
                    <h3 className="font-serif text-base sm:text-xl md:text-2xl font-bold text-[#0d1a0f] leading-snug mb-2 sm:mb-3 transition-colors group-hover:text-[#b5651d] line-clamp-3 sm:line-clamp-none">
                      {post.title}
                    </h3>
                    
                    {/* Excerpt - Hidden on mobile, line-clamp-2 to keep it shorter */}
                    <p className="hidden sm:block text-[#4a5e4d] text-sm leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Read More Section - Pushed to bottom using mt-auto */}
                    <div className="mt-auto pt-3 flex items-center gap-1.5 text-[#b5651d] text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-widest transition-colors group-hover:text-[#0d1a0f]">
                      <span>{t.readMore}</span>
                      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-3 h-3 sm:w-3.5 sm:h-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                </Link>
              </article>
            ))}
          </div>
          
        )}

      </div>
    </section>
  );
}