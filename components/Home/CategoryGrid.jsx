"use client";
import React from "react";
import Link from "next/link";

export default function CategoriesGrid({ lang, categories }) {
  const isArabic = lang === "ar";

  // UI Translations for the section header
  const t = {
    sectionTitle: isArabic ? "تصفح حسب التصنيف" : "Browse by Intelligence",
    subtitle: isArabic 
      ? "اختر قسماً متخصصاً لتصفح أحدث التقارير والأدلة المتاحة." 
      : "Select a specialized department to filter our latest reporting and guides.",
  };

  // Prevent error if categories haven't loaded
  if (!categories || categories.length === 0) return null;

  return (
    <section 
      dir={isArabic ? "rtl" : "ltr"} 
      className="py-16 md:py-24 px-5 lg:px-8 bg-[#f5f0e8]"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-black text-[#0d1a0f] tracking-tight mb-4">
            {t.sectionTitle}
          </h2>
          <p className="text-[#4a5e4d] md:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Creative Masonry Grid - No Borders, Rounded, Elevated Hover */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {categories.map((cat, index) => {
            // Logic to assign sizes based on position to keep the unique layout
            // 0 = Large (2x2), 1 = Medium (2x1), Others = Small (1x1)
            let sizeClasses = "col-span-1 row-span-1"; 
            if (index === 0) sizeClasses = "col-span-2 row-span-2";
            if (index === 1) sizeClasses = "col-span-2 row-span-1";

            return (
              <Link 
                key={cat._id}
                href={`/${lang}/category/${cat.slug}`}
                // UPDATED CLASSES: rounded-2xl, removed border, added shadow and lift on hover
                className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0d1a0f]/20 ${sizeClasses}`}
              >
                {/* Background Image from Sanity */}
                <img 
                  src={cat.image} 
                  alt={cat.title}
                  // UPDATED: Slightly faster, smoother zoom. Higher base opacity.
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80"
                />

                {/* Gradient Overlay - Stronger bottom gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a0f] via-[#0d1a0f]/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                  {/* Small Text */}
                  <span className="text-[#d4843e] text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-3 opacity-90 group-hover:opacity-100 transition-opacity">
                    {cat.smallText}
                  </span>
                  
                  {/* Category Title */}
                  <h3 className={`font-serif font-bold text-[#f5f0e8] leading-tight transition-transform duration-500 group-hover:-translate-y-1
                    ${index === 0 ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'}
                  `}>
                    {cat.title}
                  </h3>
                  
                  {/* Animated Decorative Line */}
                  <div className="w-12 h-[3px] bg-[#b5651d] mt-5 transition-all duration-500 ease-out group-hover:w-24" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}