"use client";
import React from "react";
import Link from "next/link";

// Localized Data Dictionary
const localizedData = {
  en: {
    sectionEyebrow: "Digital Infrastructure",
    sectionTitle: "Official E-Services",
    subtitle: "Navigate the Kingdom's digital ecosystem. Access essential portals for residency, labor, housing, and healthcare.",
    accessPortal: "Access Portal",
    services: [
      {
        id: "absher",
        name: "Absher",
        arabicName: "أبشر",
        description: "The primary portal for individuals. Manage your digital ID, traffic violations, dependents, and visa statuses.",
        href: "#absher",
        // ID Card Icon for Absher
        icon: (
          <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
          </svg>
        )
      },
      {
        id: "qiwa",
        name: "Qiwa",
        arabicName: "قوى",
        description: "The Ministry of Human Resources portal. Review your employment contracts, request transfers, and manage labor rights.",
        href: "#qiwa",
        // Briefcase Icon for Qiwa
        icon: (
          <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.896 2-2 2H5.75c-1.104 0-2-.906-2-2v-4.25m16.5 0a2.18 2.18 0 00-1.516-.601m-14.984.601c.42.316.958.502 1.516.502h13.468c.558 0 1.096-.186 1.516-.502m-14.984.601A2.18 2.18 0 013.75 14.15v-4.25c0-1.094.896-2 2-2h12.5c1.104 0 2 .906 2 2v4.25c0 .558-.186 1.096-.502 1.516" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7.5V5.25a2.25 2.25 0 00-2.25-2.25h-1.5A2.25 2.25 0 009 5.25V7.5m6 0h-6" />
          </svg>
        )
      },
      {
        id: "ejar",
        name: "Ejar",
        arabicName: "إيجار",
        description: "The official housing network. Standardizes and documents all residential and commercial rental contracts to protect your rights.",
        href: "#ejar",
        // House Icon for Ejar
        icon: (
          <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
          </svg>
        )
      },
      {
        id: "sehaty",
        name: "Sehaty",
        arabicName: "صحتي",
        description: "The Ministry of Health application. Access your medical records, book appointments, and view vaccination history.",
        href: "#sehaty",
        // Medical Cross/Plus Icon for Sehaty
        icon: (
          <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
    ],
  },
  ar: {
    sectionEyebrow: "البنية التحتية الرقمية",
    sectionTitle: "الخدمات الحكومية الرسمية",
    subtitle: "تصفح النظام البيئي الرقمي في المملكة. احصل على وصول للخدمات الأساسية للإقامة، والعمل، والإسكان، والرعاية الصحية.",
    accessPortal: "دخول البوابة",
    services: [
      {
        id: "absher",
        name: "Absher",
        arabicName: "أبشر",
        description: "البوابة الرئيسية للأفراد. إدارة هويتك الرقمية، والمخالفات المرورية، والتابعين، وحالات التأشيرة.",
        href: "#absher",
        icon: (
          <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
          </svg>
        )
      },
      {
        id: "qiwa",
        name: "Qiwa",
        arabicName: "قوى",
        description: "بوابة وزارة الموارد البشرية. راجع عقود عملك، واطلب النقل، وأدر حقوقك العمالية.",
        href: "#qiwa",
        icon: (
          <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.896 2-2 2H5.75c-1.104 0-2-.906-2-2v-4.25m16.5 0a2.18 2.18 0 00-1.516-.601m-14.984.601c.42.316.958.502 1.516.502h13.468c.558 0 1.096-.186 1.516-.502m-14.984.601A2.18 2.18 0 013.75 14.15v-4.25c0-1.094.896-2 2-2h12.5c1.104 0 2 .906 2 2v4.25c0 .558-.186 1.096-.502 1.516" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7.5V5.25a2.25 2.25 0 00-2.25-2.25h-1.5A2.25 2.25 0 009 5.25V7.5m6 0h-6" />
          </svg>
        )
      },
      {
        id: "ejar",
        name: "Ejar",
        arabicName: "إيجار",
        description: "الشبكة الرسمية للإسكان. توحد وتوثق جميع عقود الإيجار السكنية والتجارية لحماية حقوقك.",
        href: "#ejar",
        icon: (
          <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
          </svg>
        )
      },
      {
        id: "sehaty",
        name: "Sehaty",
        arabicName: "صحتي",
        description: "تطبيق وزارة الصحة. الوصول إلى سجلاتك الطبية، وحجز المواعيد، وعرض تاريخ التطعيمات.",
        href: "#sehaty",
        icon: (
          <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
    ],
  },
};

export default function GovServices({ lang }) {
  const isArabic = lang === "ar";
  const t = isArabic ? localizedData.ar : localizedData.en;

  return (
    <section 
      dir={isArabic ? "rtl" : "ltr"} 
      className="py-16 md:py-24 px-5 lg:px-8 bg-white border-t border-[#0d1a0f]/10"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#b5651d]">
                {t.sectionEyebrow}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-black text-[#0d1a0f] tracking-tight mb-4">
              {t.sectionTitle}
            </h2>
            <p className="text-[#4a5e4d] text-base md:text-lg leading-relaxed max-w-xl">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Services Grid (Clean, Official Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {t.services.map((service) => (
            <div 
              key={service.id}
              className="group flex flex-col bg-[#f5f0e8]/50 border border-[#0d1a0f]/10 rounded-lg p-8 transition-colors duration-300 hover:bg-[#f5f0e8] hover:border-[#b5651d]/30"
            >
              
              {/* Header: Icon & Names */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-md bg-[#1a3320] text-[#f5f0e8] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  {service.icon}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-serif text-xl font-bold text-[#0d1a0f] leading-tight">
                    {service.name}
                  </h3>
                  <span className="text-[#b5651d] text-[0.65rem] font-bold uppercase tracking-widest mt-0.5">
                    {service.arabicName}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#4a5e4d] text-sm leading-relaxed flex-1 mb-8">
                {service.description}
              </p>

              {/* Simple Action Link */}
              <Link 
                href={service.href}
                className="mt-auto inline-flex items-center gap-2 text-[#0d1a0f] font-bold uppercase tracking-widest text-xs transition-colors hover:text-[#b5651d]"
              >
                {t.accessPortal}
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}