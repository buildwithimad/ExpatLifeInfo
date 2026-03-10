"use client";
import React from "react";
import Link from "next/link";

const localizedData = {
  en: {
    tagline: "The Expat Intelligence Guide",
    about: "Your definitive source for residency, lifestyle, and business intelligence in the Kingdom of Saudi Arabia. Est. 2024.",
    newsletterTitle: "The Intelligence Brief",
    newsletterSub: "Get the latest visa updates and expat news delivered directly to your inbox.",
    subscribe: "Subscribe",
    emailPlaceholder: "Enter your email address",
    copyright: "© 2026 Expat Life Info. All rights reserved.",
    links: [
      {
        title: "Departments",
        items: [
          { label: "News & Events", href: "/en/news" },
          { label: "Visas & Iqama", href: "/en/visas" },
          { label: "Jobs & Careers", href: "/en/jobs" },
          { label: "Business News", href: "/en/business" },
        ],
      },
      {
        title: "City Guides",
        items: [
          { label: "Riyadh", href: "/en/news/riyadh" },
          { label: "Jeddah", href: "/en/news/jeddah" },
          { label: "Dammam", href: "/en/news/dammam" },
          { label: "Neom", href: "/en/news/neom" },
        ],
      },
      {
        title: "Company",
        items: [
          { label: "About Us", href: "/en/about" },
          { label: "Contact", href: "/en/contact" },
          { label: "Privacy Policy", href: "/en/privacy" },
          { label: "Terms of Service", href: "/en/terms" },
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
    emailPlaceholder: "أدخل بريدك الإلكتروني",
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

// SVG Social Icons Data
const socialIcons = [
  { name: "Twitter", path: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" },
  { name: "LinkedIn", path: "M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" },
  { name: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
];

export default function Footer({ lang }) {
  const isArabic = lang === "ar";
  const t = isArabic ? localizedData.ar : localizedData.en;

  return (
    <footer 
      dir={isArabic ? "rtl" : "ltr"} 
      className="bg-[#0d1a0f] text-[#f5f0e8] border-t-[4px] border-[#b5651d] selection:bg-[#b5651d] selection:text-[#f5f0e8]"
    >
   

      {/* ── MIDDLE SECTION: DIRECTORY ── */}
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-start">
            <Link href={`/${lang}`} className="inline-block mb-8 group">
              <span className="font-serif text-4xl font-black tracking-tight text-[#f5f0e8] group-hover:text-[#b5651d] transition-colors duration-300">
                Expat Life <em className="italic text-[#d4843e] font-light pr-1">Info</em>
              </span>
            </Link>
            <p className="text-[#f5f0e8]/60 leading-relaxed max-w-sm mb-10 text-sm md:text-base">
              {t.about}
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {socialIcons.map((icon) => (
                <a 
                  key={icon.name} 
                  href="#" 
                  aria-label={icon.name}
                  className="w-12 h-12 rounded-full border border-[#f5f0e8]/20 flex items-center justify-center text-[#f5f0e8]/60 hover:bg-[#b5651d] hover:text-[#f5f0e8] hover:border-[#b5651d] transition-all duration-300 hover:-translate-y-1"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-8 text-center md:text-start">
            {t.links.map((column) => (
              <div key={column.title}>
                <h4 className="text-[0.65rem] font-black uppercase tracking-[0.25em] text-[#d4843e] mb-8">
                  {column.title}
                </h4>
                <ul className="flex flex-col gap-5">
                  {column.items.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href}
                        className="text-sm md:text-base font-medium text-[#f5f0e8]/70 hover:text-[#f5f0e8] transition-colors relative group inline-block"
                      >
                        {link.label}
                        <span className="absolute -bottom-1 start-0 w-0 h-[1px] bg-[#b5651d] transition-all duration-300 group-hover:w-full" />
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
      <div className="bg-[#09120a] py-8 border-t border-[#f5f0e8]/5">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[0.65rem] font-bold uppercase tracking-widest text-[#f5f0e8]/40 text-center md:text-start">
            {t.copyright}
          </p>
          <div className="flex items-center gap-4 md:gap-6">
            <span className="text-[0.65rem] font-black uppercase tracking-widest text-[#d4843e]">
              KSA Vision 2030
            </span>
            <div className="w-6 md:w-8 h-[1px] bg-[#f5f0e8]/20" />
            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#f5f0e8]/40">
              {t.tagline}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}