"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function CategoryDropdown({ lang, categories }) {
  const isArabic = lang === "ar";
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  // UI Translations
  const t = {
    sectionEyebrow: isArabic ? "استكشف" : "Discover",
    sectionTitle: isArabic ? "تصفح حسب التصنيف" : "Browse by Category",
    triggerText: isArabic ? "اختر تصنيفاً للمتابعة..." : "Select a category to explore...",
    searchPlaceholder: isArabic ? "ابحث عن تصنيف..." : "Type to search categories...",
    noResults: isArabic ? "لم يتم العثور على تصنيفات." : "No categories found.",
    allCategories: isArabic ? "جميع التصنيفات" : "All Categories",
    results: isArabic ? "نتائج" : "results"
  };

  // Fallback to empty array
  const safeCategories = categories || [];

  // Live filter logic
  const filteredCategories = safeCategories.filter((cat) =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section 
      dir={isArabic ? "rtl" : "ltr"} 
      className="py-16  px-5 lg:px-8 bg-[#f5f0e8] text-[#0d1a0f] relative z-20"
    >
      <div className="max-w-[800px] mx-auto flex flex-col items-center text-center">
        
        {/* Centered Header */}
        <div className="flex flex-col items-center mb-10 md:mb-12">
          <div className="w-8 h-[3px] bg-[#b5651d] rounded-full mb-4" />
          <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#b5651d] mb-3">
            {t.sectionEyebrow}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-black text-[#0d1a0f] tracking-tight leading-none">
            {t.sectionTitle}
          </h2>
        </div>

        {/* Custom Dropdown Container */}
        <div className="relative w-full max-w-[600px]" ref={dropdownRef}>
          
          {/* Dropdown Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-between px-6 py-5 bg-white border transition-all duration-300 rounded-2xl outline-none group
              ${isOpen 
                ? "border-[#b5651d] shadow-[0_8px_30px_rgba(181,101,29,0.12)]" 
                : "border-[#e5e0d8] shadow-sm hover:border-[#b5651d]/50 hover:shadow-md"}
            `}
          >
            <div className="flex items-center gap-3">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5 text-[#b5651d] opacity-70 group-hover:opacity-100 transition-opacity">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
              <span className={`font-serif text-lg transition-colors ${searchQuery || isOpen ? "text-[#0d1a0f]" : "text-[#4a5e4d]"}`}>
                {searchQuery ? t.allCategories : t.triggerText}
              </span>
            </div>

            <svg 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              className={`w-5 h-5 text-[#b5651d] transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isOpen ? "rotate-180" : ""}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Floating Dropdown Menu */}
          <div 
            className={`absolute top-[calc(100%+0.75rem)] start-0 w-full bg-white border border-[#e5e0d8] rounded-2xl shadow-[0_20px_40px_rgba(13,26,15,0.08)] overflow-hidden transition-all duration-300 origin-top z-50
              ${isOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
            `}
          >
            {/* Sticky Search Input inside Dropdown */}
            <div className="p-3 border-b border-[#e5e0d8] bg-white/90 backdrop-blur-md sticky top-0 z-10 flex flex-col gap-2">
              <div className="relative">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-[#4a5e4d]/60">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-[#f5f0e8] border-transparent rounded-xl py-3 ps-10 pe-4 text-[#0d1a0f] text-sm focus:outline-none focus:ring-2 focus:ring-[#b5651d]/20 focus:bg-white transition-all placeholder:text-[#4a5e4d]/50"
                />
              </div>
              
              {/* Dynamic Results Counter */}
              <div className="flex justify-between items-center px-2 pt-1 pb-0.5">
                <span className="text-[0.65rem] font-bold tracking-wider uppercase text-[#b5651d]">
                  {searchQuery ? t.searchPlaceholder.split('.')[0] : t.allCategories}
                </span>
                <span className="text-[0.65rem] font-bold text-[#4a5e4d]/60">
                  {filteredCategories.length} {t.results}
                </span>
              </div>
            </div>

            {/* Scrollable Categories List */}
            <div className="max-h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#b5651d]/30 hover:scrollbar-thumb-[#b5651d] scrollbar-track-transparent">
              {filteredCategories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-[#4a5e4d]/60">
                  <svg fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" className="w-10 h-10 mb-3 opacity-50">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm font-medium">{t.noResults}</p>
                </div>
              ) : (
                <ul className="p-2 flex flex-col gap-1">
                  {filteredCategories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/${lang}/category/${category.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[#f5f0e8] transition-colors"
                      >
                        <span className="font-serif text-base text-[#0d1a0f] group-hover:text-[#b5651d] transition-colors">
                          {category.title}
                        </span>
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white opacity-0 -translate-x-2 rtl:translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 rtl:group-hover:translate-x-0 group-hover:shadow-sm border border-[#e5e0d8]">
                          <svg 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            viewBox="0 0 24 24" 
                            className="w-3 h-3 text-[#b5651d] rtl:rotate-180"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}