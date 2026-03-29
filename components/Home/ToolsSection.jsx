"use client";

import React from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Calculator, 
  Briefcase, 
  Zap, 
  Fuel, 
  Home,
  ArrowRight,
  ArrowLeft,
  Lock
} from "lucide-react";

export default function ToolsSection({ lang }) {
  const isArabic = lang === "ar";

  // UI Translations
  const t = {
    sectionTitle: isArabic ? "استكشف الأدوات" : "Explore Tools",
    subtitle: isArabic 
      ? "أدوات وحاسبات سريعة لمساعدتك يومياً" 
      : "Quick calculators and tools for your daily needs",
    comingSoon: isArabic ? "قريباً" : "Soon",
  };

  // Tools data with unique color themes
  const tools = [
    {
      id: "gold-rate",
      name: isArabic ? "أسعار الذهب" : "Gold Rate",
      description: isArabic ? "أسعار الذهب اليومية المحدثة" : "Live daily gold market prices",
      icon: TrendingUp,
      status: "available",
      href: `/${lang}/gold-rate`,
      color: {
        bg: "bg-amber-50",
        text: "text-amber-600",
        hoverBg: "group-hover:bg-amber-500",
        hoverText: "group-hover:text-white"
      }
    },
    {
      id: "exchange-rates",
      name: isArabic ? "أسعار الصرف" : "Exchange Rates",
      description: isArabic ? "تحويل العملات المباشر" : "Live currency conversion",
      icon: DollarSign,
      status: "available",
      href: `/${lang}/exchange-rates`,
      color: {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        hoverBg: "group-hover:bg-emerald-500",
        hoverText: "group-hover:text-white"
      }
    },
    {
      id: "prayer-times",
      name: isArabic ? "أوقات الصلاة" : "Prayer Times",
      description: isArabic ? "مواقيت الصلاة لمدن المملكة" : "Accurate Saudi prayer times",
      icon: Clock,
      status: "coming-soon",
      href: null,
      color: {
        bg: "bg-blue-50",
        text: "text-blue-600",
      }
    },
    {
      id: "iqama-calculator",
      name: isArabic ? "رسوم الإقامة" : "Iqama Fees",
      description: isArabic ? "حاسبة رسوم التجديد" : "Calculate renewal costs",
      icon: Calculator,
      status: "coming-soon",
      href: null,
      color: {
        bg: "bg-indigo-50",
        text: "text-indigo-600",
      }
    },
    {
      id: "work-permit",
      name: isArabic ? "رخصة العمل" : "Work Permit",
      description: isArabic ? "رسوم وتكاليف مكتب العمل" : "Labor office fee calculator",
      icon: Briefcase,
      status: "coming-soon",
      href: null,
      color: {
        bg: "bg-violet-50",
        text: "text-violet-600",
      }
    },
    {
      id: "esb-calculator",
      name: isArabic ? "حاسبة ESB" : "ESB Calculator",
      description: isArabic ? "تكاليف الاستقدام والتأشيرات" : "Visa and recruitment fees",
      icon: Zap,
      status: "coming-soon",
      href: null,
      color: {
        bg: "bg-cyan-50",
        text: "text-cyan-600",
      }
    },
    {
      id: "fuel-prices",
      name: isArabic ? "أسعار الوقود" : "Fuel Prices",
      description: isArabic ? "تحديثات أرامكو الشهرية" : "Monthly Aramco updates",
      icon: Fuel,
      status: "coming-soon",
      href: null,
      color: {
        bg: "bg-orange-50",
        text: "text-orange-600",
      }
    },
    {
      id: "cost-of-living",
      name: isArabic ? "تكلفة المعيشة" : "Cost of Living",
      description: isArabic ? "مقارنة أسعار المدن" : "City price comparisons",
      icon: Home,
      status: "coming-soon",
      href: null,
      color: {
        bg: "bg-teal-50",
        text: "text-teal-600",
      }
    },
  ];

  return (
    <section 
      dir={isArabic ? "rtl" : "ltr"} 
      className="py-12 md:py-20 px-5 lg:px-8 bg-[#fafaf8]"
    >
      <div className="max-w-[1200px] mx-auto">
        
        {/* ✨ Compact Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[2px] bg-[#0d1a0f]"></span>
              <span className="text-[#0d1a0f] text-[0.65rem] font-bold uppercase tracking-[0.2em]">
                {isArabic ? "مركز الأدوات" : "Tools Hub"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0d1a0f] tracking-tight">
              {t.sectionTitle}
            </h2>
          </div>
          <p className="text-[#4a5e4d] text-sm md:text-base font-medium max-w-sm md:text-end">
            {t.subtitle}
          </p>
        </div>

        {/* ✨ Colorful Mini-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isAvailable = tool.status === "available";

            const CardContent = (
              <div 
                className={`
                  relative flex items-center p-4 rounded-2xl bg-white border transition-all duration-300 group overflow-hidden
                  ${isAvailable 
                    ? "border-[#0d1a0f]/5 hover:border-transparent hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 cursor-pointer" 
                    : "border-transparent opacity-60 grayscale-[0.3]"
                  }
                `}
              >
                {/* Subtle Hover Background Effect for Available Tools */}
                {isAvailable && (
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${tool.color.bg}`}></div>
                )}

                {/* Colorful Icon Box */}
                <div className={`
                  relative z-10 w-12 h-12 shrink-0 rounded-[14px] flex items-center justify-center transition-all duration-300
                  ${tool.color.bg} ${tool.color.text}
                  ${isAvailable ? `${tool.color.hoverBg} ${tool.color.hoverText} group-hover:scale-110 group-hover:rotate-3` : ""}
                `}>
                  <Icon size={20} strokeWidth={2.5} />
                </div>

                {/* Text Content */}
                <div className="ms-4 flex-1 min-w-0 relative z-10">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-[#0d1a0f] text-sm truncate pr-2">
                      {tool.name}
                    </h3>
                    
                    {/* Status Indicator */}
                    {isAvailable ? (
                      <div className={`
                        opacity-0 -translate-x-2 rtl:translate-x-2 transition-all duration-300
                        group-hover:opacity-100 group-hover:translate-x-0 ${tool.color.text}
                      `}>
                        {isArabic ? <ArrowLeft size={16} strokeWidth={2.5} /> : <ArrowRight size={16} strokeWidth={2.5} />}
                      </div>
                    ) : (
                      <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
                        <Lock size={8} strokeWidth={3} />
                        {t.comingSoon}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-[#4a5e4d] font-medium truncate">
                    {tool.description}
                  </p>
                </div>
              </div>
            );

            if (isAvailable && tool.href) {
              return (
                <Link key={tool.id} href={tool.href} className="block outline-none">
                  {CardContent}
                </Link>
              );
            }

            return (
              <div key={tool.id} className="cursor-not-allowed">
                {CardContent}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}