import Link from "next/link";
import Image from "next/image";
import './globals.css';

export default function NotFound({ params }) {
  const { lang } = params;
  const isArabic = lang === "ar";

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex flex-col items-center justify-center px-4 py-12" dir={isArabic ? "rtl" : "ltr"}>
      <div className="text-center max-w-lg">
        {/* 404 Number */}
        <h1 className="text-[clamp(6rem,15vw,10rem)] font-bold text-[#0d1a0f] leading-none mb-4">
          404
        </h1>
        
        {/* Decorative line */}
        <div className="w-24 h-1 bg-[#b5651d] mx-auto mb-6"></div>
        
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#0d1a0f] mb-4">
          {isArabic ? "الصفحة غير موجودة" : "Page Not Found"}
        </h2>
        
        {/* Description */}
        <p className="text-[#4a5e4d] mb-8 text-lg leading-relaxed">
          {isArabic 
            ? "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر."
            : "Sorry, the page you are looking for does not exist or has been moved to another location."}
        </p>
        
        {/* Back to Home */}
        <Link 
          href={`/${lang}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0d1a0f] text-[#f5f0e8] font-semibold tracking-wider uppercase text-sm hover:bg-[#b5651d] transition-colors rounded-sm"
        >
          <svg 
            className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {isArabic ? "العودة إلى الصفحة الرئيسية" : "Back to Home"}
        </Link>
        
        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-[#0d1a0f]/10">
          <p className="text-sm font-semibold text-[#b5651d] tracking-widest uppercase mb-4">
            {isArabic ? "روابط سريعة" : "Quick Links"}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href={`/${lang}/category/visa-and-iqama`}
              className="text-[#4a5e4d] hover:text-[#0d1a0f] text-sm font-medium transition-colors"
            >
              {isArabic ? "التأشيرات والإقامة" : "Visa & Iqama"}
            </Link>
            <Link 
              href={`/${lang}/category/jobs-and-salaries`}
              className="text-[#4a5e4d] hover:text-[#0d1a0f] text-sm font-medium transition-colors"
            >
              {isArabic ? "الوظائف والرواتب" : "Jobs & Salaries"}
            </Link>
            <Link 
              href={`/${lang}/category/cost-of-living`}
              className="text-[#4a5e4d] hover:text-[#0d1a0f] text-sm font-medium transition-colors"
            >
              {isArabic ? "تكلفة المعيشة" : "Cost of Living"}
            </Link>
            <Link 
              href={`/${lang}/government`}
              className="text-[#4a5e4d] hover:text-[#0d1a0f] text-sm font-medium transition-colors"
            >
              {isArabic ? "الخدمات الحكومية" : "Government Services"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
