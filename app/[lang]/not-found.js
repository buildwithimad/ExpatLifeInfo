'use client';

import Link from "next/link";
import { useParams } from "next/navigation";

const translations = {
  en: {
    title: "Page Not Found",
    description: "Sorry, the page you are looking for does not exist or has been moved.",
    backToHome: "Back to Home",
  },
  ar: {
    title: "الصفحة غير موجودة",
    description: "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
    backToHome: "العودة إلى الصفحة الرئيسية",
  },
};

export default function NotFound() {
  const params = useParams();
  const lang = params?.lang || "en";
  const t = translations[lang] || translations.en;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <h1 className="text-8xl font-bold text-accent mb-4">404</h1>
        
        {/* Title */}
        <h2 className="text-2xl font-semibold text-primary mb-4">
          {t.title}
        </h2>
        
        {/* Description */}
        <p className="text-secondary mb-8 leading-relaxed">
          {t.description}
        </p>
        
        {/* Back to Home Button */}
        <Link
          href={`/${lang}`}
          className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors duration-200"
        >
          {t.backToHome}
        </Link>
      </div>
    </div>
  );
}
