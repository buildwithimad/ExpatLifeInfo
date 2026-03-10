"use client";
import React from "react";
import Link from "next/link";

const localizedData = {
  en: {
    tagline: "The Expat Intelligence Guide",
    about: "Your definitive source for residency, lifestyle, and business intelligence in the Kingdom of Saudi Arabia. Est. 2024.",
    newsletterTitle: "The Intelligence Brief",
    newsletterSub: "Get the latest visa updates and expat news delivered to your inbox.",
    subscribe: "Subscribe",
    emailPlaceholder: "Email address",
    copyright: "© 2026 Saudi Expat. All rights reserved.",
    links: [
      {
        title: "Departments",
        items: [
          { label: "News & Events", href: "/news" },
          { label: "Visas & Iqama", href: "/visas" },
          { label: "Jobs & Careers", href: "/jobs" },
          { label: "Business News", href: "/business" },
        ],
      },
      {
        title: "City Guides",
        items: [
          { label: "Riyadh", href: "/news/riyadh" },
          { label: "Jeddah", href: "/news/jeddah" },
          { label: "Dammam", href: "/news/dammam" },
          { label: "Neom", href: "/news/neom" },
        ],
      },
      {
        title: "Company",
        items: [
          { label: "About Us", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
        ],
      },
    ],
  },
  ar: {
    tagline: "دليل ذكاء المغتربين",
    about: "مصدرك النهائي لمعلومات الإقامة وأسلوب الحياة والأعمال في المملكة العربية السعودية. تأسس عام ٢٠٢٤.",
    newsletterTitle: "موجز المعلومات",
    newsletterSub: "احصل على آخر تحديثات التأشيرات وأخبار المغتربين مباشرة في بريدك الإلكتروني.",
    subscribe: "اشترك الآن",
    emailPlaceholder: "البريد الإلكتروني",
    copyright: "© ٢٠٢٦ المغترب السعودي. جميع الحقوق محفوظة.",
    links: [
      {
        title: "الأقسام",
        items: [
          { label: "الأخبار والفعاليات", href: "/ar/news" },
          { label: "التأشيرات والإقامة", href: "/ar/visas" },
          { label: "الوظائف والمهن", href: "/ar/jobs" },
          { label: "أخبار الأعمال", href: "/ar/business" },
        ],
      },
      {
        title: "أدلة المدن",
        items: [
          { label: "الرياض", href: "/ar/news/riyadh" },
          { label: "جدة", href: "/ar/news/jeddah" },
          { label: "الدمام", href: "/ar/news/dammam" },
          { label: "نيوم", href: "/ar/news/neom" },
        ],
      },
      {
        title: "الشركة",
        items: [
          { label: "عن الموقع", href: "/ar/about" },
          { label: "اتصل بنا", href: "/ar/contact" },
          { label: "سياسة الخصوصية", href: "/ar/privacy" },
          { label: "شروط الخدمة", href: "/ar/terms" },
        ],
      },
    ],
  },
};

export default function Footer({ lang }) {
  const isArabic = lang === "ar";
  const t = isArabic ? localizedData.ar : localizedData.en;

  return (
    <footer 
      dir={isArabic ? "rtl" : "ltr"} 
      className="bg-[#0d1a0f] text-[#f5f0e8] border-t-[3px] border-[#b5651d]"
    >
      {/* ── TOP SECTION: NEWSLETTER ── */}
      <div className="border-b border-[#f5f0e8]/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3">
                {t.newsletterTitle}
              </h3>
              <p className="text-[#f5f0e8]/60 text-sm md:text-base max-w-md">
                {t.newsletterSub}
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder={t.emailPlaceholder}
                className="flex-1 bg-[#1a3320] border border-[#f5f0e8]/20 px-6 py-4 text-[#f5f0e8] focus:outline-none focus:border-[#d4843e] transition-colors"
              />
              <button className="bg-[#b5651d] hover:bg-[#d4843e] text-[#f5f0e8] font-bold uppercase tracking-widest text-xs px-8 py-4 transition-colors">
                {t.subscribe}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── MIDDLE SECTION: DIRECTORY ── */}
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-3xl font-black tracking-tight">
                Saudi <em className="italic text-[#d4843e]">Expat</em>
              </span>
            </Link>
            <p className="text-[#f5f0e8]/60 leading-relaxed max-w-sm mb-8">
              {t.about}
            </p>
            {/* Social Placeholder */}
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 border border-[#f5f0e8]/20 flex items-center justify-center hover:bg-[#b5651d] hover:border-[#b5651d] transition-all cursor-pointer">
                  <div className="w-4 h-4 bg-current opacity-40" />
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {t.links.map((column) => (
              <div key={column.title}>
                <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#d4843e] mb-6">
                  {column.title}
                </h4>
                <ul className="flex flex-col gap-4">
                  {column.items.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href}
                        className="text-sm text-[#f5f0e8]/60 hover:text-[#f5f0e8] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="bg-[#09120a] py-8">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[0.65rem] font-bold uppercase tracking-widest text-[#f5f0e8]/30">
            {t.copyright}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#d4843e]">
              KSA Vision 2030
            </span>
            <div className="w-8 h-[1px] bg-[#f5f0e8]/20" />
            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#f5f0e8]/30">
              {t.tagline}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}