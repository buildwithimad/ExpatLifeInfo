"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function LatestNewsSlider({ lang, latestPosts }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Determine current language state
  const isArabic = lang === "ar";
  
  const uiText = {
    en: { readMore: "Read Full Story", prev: "Previous News", next: "Next News", defaultCat: "News" },
    ar: { readMore: "اقرأ القصة كاملة", prev: "الخبر السابق", next: "الخبر التالي", defaultCat: "أخبار" },
  };

  const t = isArabic ? uiText.ar : uiText.en;

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (!latestPosts || latestPosts.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === latestPosts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [latestPosts]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === latestPosts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? latestPosts.length - 1 : prevIndex - 1
    );
  };

  // If no posts are fetched yet
  if (!latestPosts || latestPosts.length === 0) return null;

  return (
    <section 
      dir={isArabic ? "rtl" : "ltr"} 
      className="relative w-full h-[60vh] min-h-[600px] md:h-[75vh] bg-[#0d1a0f] overflow-hidden group"
    >
      {/* ── SLIDER TRACK ── */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{ transform: `translateX(${isArabic ? currentIndex * 100 : -(currentIndex * 100)}%)` }}
      >
        {latestPosts.map((news) => (
          <div key={news._id} className="relative w-full h-full shrink-0">
            {/* Background Image */}
            <img
              src={news.image}
              alt={news.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a0f] via-[#0d1a0f]/40 to-transparent opacity-90" />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12 md:px-16 md:pb-20">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#b5651d] text-[#f5f0e8] text-xs font-bold uppercase tracking-widest px-3 py-1">
                    {news.category?.title || t.defaultCat}
                  </span>
                  <span className="text-[#f5f0e8]/70 text-sm font-medium tracking-wide">
                    {new Date(news.publishedAt).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-[#f5f0e8] leading-tight mb-4 tracking-tight drop-shadow-lg">
                  {news.title}
                </h2>
                
                <Link 
                  href={`/${lang}/blog/${news.slug}`}
                  className="inline-flex items-center gap-2 text-[#b5651d] font-semibold uppercase tracking-widest text-sm transition-colors hover:text-[#d4843e]"
                >
                  {t.readMore}
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 rtl:rotate-180">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── NAVIGATION CONTROLS ── */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 start-4 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-[#f5f0e8]/10 text-[#f5f0e8] backdrop-blur-sm border border-[#f5f0e8]/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#b5651d] hover:border-[#b5651d] hidden md:flex"
        aria-label={t.prev}
      >
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5 rtl:rotate-180">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute top-1/2 end-4 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-[#f5f0e8]/10 text-[#f5f0e8] backdrop-blur-sm border border-[#f5f0e8]/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#b5651d] hover:border-[#b5651d] hidden md:flex"
        aria-label={t.next}
      >
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5 rtl:rotate-180">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 start-6 md:start-16 flex items-center gap-2 z-20">
        {latestPosts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === index
                ? "w-8 h-[3px] bg-[#b5651d]"
                : "w-4 h-[3px] bg-[#f5f0e8]/30 hover:bg-[#f5f0e8]/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}