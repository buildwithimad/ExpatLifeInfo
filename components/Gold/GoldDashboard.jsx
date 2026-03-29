"use client";

import { useState, useEffect } from "react";
import { 
  Clock, 
  ShieldCheck, 
  ChevronDown,
  BarChart3,
  Sparkles,
  Scale,
  BookOpen
} from "lucide-react";

const OUNCE_TO_GRAM = 31.1035;
const TOLA_GRAM = 11.66;

const CURRENCY_INFO = {
  SAR: { flag: "🇸🇦", nameEn: "Saudi Arabia", nameAr: "المملكة العربية السعودية", code: "SAR" },
  USD: { flag: "🇺🇸", nameEn: "United States", nameAr: "الولايات المتحدة", code: "USD" },
  AED: { flag: "🇦🇪", nameEn: "United Arab Emirates", nameAr: "الإمارات العربية المتحدة", code: "AED" },
  QAR: { flag: "🇶🇦", nameEn: "Qatar", nameAr: "قطر", code: "QAR" },
  PKR: { flag: "🇵🇰", nameEn: "Pakistan", nameAr: "باكستان", code: "PKR" },
  INR: { flag: "🇮🇳", nameEn: "India", nameAr: "الهند", code: "INR" },
  BDT: { flag: "🇧🇩", nameEn: "Bangladesh", nameAr: "بنغلاديش", code: "BDT" },
  NPR: { flag: "🇳🇵", nameEn: "Nepal", nameAr: "نيبال", code: "NPR" },
};

const PURITY_OPTIONS = {
  24: { label: "24K", descEn: "99.9% Pure", descAr: "نقي بنسبة 99.9%", multiplier: 1 },
  22: { label: "22K", descEn: "91.6% Jewelry", descAr: "مجوهرات 91.6%", multiplier: 22 / 24 },
  18: { label: "18K", descEn: "75.0% Alloy", descAr: "سبيكة 75.0%", multiplier: 18 / 24 },
};

export default function GoldDashboard({ data, lang }) {
  const isArabic = lang === "ar";
  
  // Professional Financial Translation Dictionary
  const t = isArabic ? {
    statusBar: "أسعار السوق الموثقة",
    loading: "جاري الاتصال ببيانات السوق...",
    heroTitle: "السعر الفوري في السعودية",
    perGram: "/ جرام",
    perTola: "SAR / تولة",
    perOunce: "SAR / أونصة",
    perOunceUsd: "USD / أونصة",
    chartTitle: "تحليل نسب العيارات",
    selectPurity: "اختر العيار",
    filterTable: "تصفية الأسواق العالمية",
    allRegions: "جميع الأسواق",
    tableMarket: "المنطقة / السوق",
    tableGram: "السعر لكل جرام",
    tableTola: "لكل تولة<span class=\"lowercase font-semibold text-[#0d1a0f]/40 px-1\">(11.66g)</span>",
    tableOunce: "لكل أونصة",
    guideTitle: "دليل سوق الذهب",
    purityCard: "فهم العيارات (القيراط)",
    purity24: "عيار 24 (99.9%)",
    purity24desc: "الأنقى على الإطلاق. يُستخدم لسبائك وعملات الاستثمار، ولكنه لين جداً للاستخدام اليومي في المجوهرات.",
    purity22: "عيار 22 (91.6%)",
    purity22desc: "المعيار الأساسي للمجوهرات التقليدية وحفلات الزفاف في الشرق الأوسط وجنوب آسيا.",
    purity18: "عيار 18 (75.0%)",
    purity18desc: "ممزوج بمعادن أخرى لضمان متانة أعلى. خيار شائع للساعات الفاخرة والمجوهرات الراقية.",
    weightCard: "مقاييس الأوزان",
    ounceTitle: "الأونصة الترويسية (oz)",
    ounceDesc: "تعادل 31.1035 جرام. وهي الوحدة القياسية للكتلة في أسواق المعادن الثمينة عالمياً.",
    tolaTitle: "التولة (Tola)",
    tolaDesc: "تعادل 11.66 جرام تماماً. وحدة قياس تقليدية شائعة في الهند، باكستان، والشرق الأوسط.",
    gramTitle: "الجرام (g)",
    gramDesc: "الوحدة المترية القياسية. تُسعّر وتُباع معظم المجوهرات الحديثة في متاجر التجزئة بناءً على وزنها بالجرام.",
    spotCard: "السعر الفوري مقابل سعر التجزئة",
    spotDesc: "الأسعار المعروضة في هذه اللوحة هي الأسعار الفورية العالمية (Spot Prices). وهو السعر الخام الذي يُتداول به الذهب عالمياً بين المؤسسات المالية.",
    retailTitle: "لماذا تكون أسعار المجوهرات في المتاجر أعلى؟",
    retailDesc: "عند شراء المجوهرات الفعلية، يضيف التجار هوامش وتكاليف إضافية فوق السعر الفوري. وتغطي هذه الإضافات:",
    retailList: ["رسوم المصنعية والصياغة", "الرسوم الجمركية والضرائب المحلية (مثل ضريبة القيمة المضافة)", "هوامش ربح بائع التجزئة والتكاليف التشغيلية"],
  } : {
    statusBar: "Verified Market Rates",
    loading: "Connecting to market data...",
    heroTitle: "Saudi Arabia Spot Price",
    perGram: "/ gram",
    perTola: "SAR / Tola",
    perOunce: "SAR / Ounce",
    perOunceUsd: "USD / Ounce",
    chartTitle: "Purity Analysis",
    selectPurity: "Select Purity",
    filterTable: "Filter Global Table",
    allRegions: "All Regions",
    tableMarket: "Market Region",
    tableGram: "Price per Gram",
    tableTola: "Per Tola<span class=\"lowercase font-semibold text-[#0d1a0f]/40 ps-1\">(11.66g)</span>",
    tableOunce: "Per Ounce",
    guideTitle: "Gold Market Guide",
    purityCard: "Understanding Purity (Karat)",
    purity24: "24K (99.9%)",
    purity24desc: "Purest form. Used for investment coins and bars. Too soft for daily jewelry.",
    purity22: "22K (91.6%)",
    purity22desc: "Standard for traditional and bridal jewelry in the Middle East and South Asia.",
    purity18: "18K (75.0%)",
    purity18desc: "Alloyed with other metals for high durability. Popular in luxury watches and fine jewelry.",
    weightCard: "Weight Measurements",
    ounceTitle: "Troy Ounce (oz)",
    ounceDesc: "Equals 31.1035 grams. The standard unit of mass used in global precious metal markets.",
    tolaTitle: "Tola",
    tolaDesc: "Equals exactly 11.66 grams. A traditional unit of mass commonly used in India, Pakistan, and the Middle East.",
    gramTitle: "Gram (g)",
    gramDesc: "The standard metric unit. Most modern retail jewelry is priced and sold based on its weight in grams.",
    spotCard: "Spot vs. Retail Price",
    spotDesc: "The prices shown on this dashboard are Global Spot Prices. This is the raw market rate at which gold is traded globally among financial institutions.",
    retailTitle: "Why is retail jewelry more expensive?",
    retailDesc: "When purchasing physical jewelry, dealers will add premiums to the spot price. These premiums cover:",
    retailList: ["Making/crafting charges", "Import duties & local taxes (e.g., VAT)", "Retailer markups & overheads"],
  };

  const [purity, setPurity] = useState("24");
  const [currencyFilter, setCurrencyFilter] = useState("ALL");
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    // 🔴 Always use 'en-US' for time to ensure standard AM/PM and 0-9 digits
    setLastUpdated(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
  }, [data]);

  if (!data?.gold?.rates?.USDXAU || !data?.exchange?.conversion_rates) {
    return (
      <div dir={isArabic ? "rtl" : "ltr"} className="min-h-[60vh] flex items-center justify-center bg-[#fafaf8]">
        <div className="flex items-center gap-3 text-[#4a5e4d]">
          <div className="w-2 h-2 bg-[#b5651d] rounded-full animate-pulse" />
          <span className="text-sm font-medium tracking-wide">{t.loading}</span>
        </div>
      </div>
    );
  }

  const rates = data.exchange.conversion_rates;
  
  const baseUsdPerOunce24k = data.gold.rates.USDXAU;
  const currentMultiplier = PURITY_OPTIONS[purity].multiplier;
  
  const sarRate = rates.SAR || 3.75;
  const sarPerOunce = baseUsdPerOunce24k * currentMultiplier * sarRate;
  const sarPerGram = sarPerOunce / OUNCE_TO_GRAM;
  const sarPerTola = sarPerGram * TOLA_GRAM;
  const usdPerOunce = baseUsdPerOunce24k * currentMultiplier;

  const calculateLive = (exchangeRate) => {
    const gram = (baseUsdPerOunce24k * currentMultiplier / OUNCE_TO_GRAM) * exchangeRate;
    return {
      gram,
      tola: gram * TOLA_GRAM,
      ounce: gram * OUNCE_TO_GRAM,
    };
  };

  const currenciesToDisplay = currencyFilter === "ALL" 
    ? Object.keys(CURRENCY_INFO) 
    : [currencyFilter];

  // 🔴 Force 'en-US' so decimals are always points (1,234.56), never commas (1٬234٫56)
  const formatValue = (val) => val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-[#fafaf8] text-[#0d1a0f] pb-24 selection:bg-[#b5651d] selection:text-[#f5f0e8] font-sans">
      
      {/* 🟢 TOP STATUS BAR */}
      <div className="bg-[#0d1a0f] border-b-[1.5px] border-[#0d1a0f]/10 sticky top-0 z-20">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 text-[#f5f0e8]/70 text-[0.65rem] font-bold tracking-[0.2em] uppercase">
            <ShieldCheck className="w-4 h-4 text-[#b5651d]" />
            <span>{t.statusBar}</span>
          </div>
          <div className="flex items-center gap-2 text-[#f5f0e8]/40 text-[0.6rem] font-medium tracking-widest" dir="ltr">
            <Clock className="w-3.5 h-3.5" />
            <span>{lastUpdated || "--:--"}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 lg:px-8 mt-10">
        
        {/* 🟢 TOP SECTION: HERO + CHART */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          {/* Main SAR Hero Card */}
          <div className="lg:col-span-2 bg-white border-[1.5px] border-[#0d1a0f]/10 rounded-[1.5rem] p-8 lg:p-10 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute start-0 top-0 bottom-0 w-1.5 bg-[#b5651d]"></div>
            
            <div className="ps-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#b5651d]" />
                <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#b5651d]">
                  {t.heroTitle} ({PURITY_OPTIONS[purity].label})
                </span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8 mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#4a5e4d] mb-1">SAR</span>
                  <h1 className="text-6xl md:text-7xl font-black tracking-tight text-[#0d1a0f] font-mono" dir="ltr">
                    {formatValue(sarPerGram)}
                  </h1>
                  <span className="text-lg font-medium text-[#4a5e4d] ms-1">{t.perGram}</span>
                </div>
              </div>

              {/* Sub Metrics Strip */}
              <div className="flex flex-wrap gap-8 pt-6 border-t border-[#0d1a0f]/5">
                <div>
                  <p className="text-[#4a5e4d] text-[10px] font-bold uppercase tracking-widest mb-1">
                    {t.perTola}
                  </p>
                  <p className="text-xl font-bold font-mono text-[#0d1a0f]" dir="ltr">
                    {formatValue(sarPerTola)}
                  </p>
                </div>
                <div>
                  <p className="text-[#4a5e4d] text-[10px] font-bold uppercase tracking-widest mb-1">
                    {t.perOunce}
                  </p>
                  <p className="text-xl font-bold font-mono text-[#0d1a0f]" dir="ltr">
                    {formatValue(sarPerOunce)}
                  </p>
                </div>
                <div>
                  <p className="text-[#4a5e4d] text-[10px] font-bold uppercase tracking-widest mb-1">
                    {t.perOunceUsd}
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold text-[#0d1a0f]">$</span>
                    <p className="text-xl font-bold font-mono text-[#0d1a0f]" dir="ltr">
                      {formatValue(usdPerOunce)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Purity Chart Card */}
          <div className="bg-[#0d1a0f] border-[1.5px] border-[#0d1a0f] rounded-[1.5rem] p-8 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 end-0 w-40 h-40 bg-[#b5651d]/10 rounded-full blur-3xl -translate-y-1/2 rtl:-translate-x-1/2 ltr:translate-x-1/2"></div>
            
            <div className="flex items-center gap-2 mb-8 relative z-10">
              <BarChart3 className="w-5 h-5 text-[#b5651d]" />
              <h2 className="text-[#f5f0e8] text-sm font-bold tracking-widest uppercase">
                {t.chartTitle}
              </h2>
            </div>

            <div className="space-y-6 relative z-10">
              {Object.entries(PURITY_OPTIONS).map(([key, opt]) => {
                const priceForThisPurity = (baseUsdPerOunce24k * opt.multiplier / OUNCE_TO_GRAM) * sarRate;
                const widthPercent = opt.multiplier * 100;
                const isActive = purity === key;

                return (
                  <div key={key} className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}>
                    <div className="flex justify-between text-[#f5f0e8] text-xs font-bold uppercase tracking-wider mb-2">
                      <span>{opt.label} <span className="text-[#f5f0e8]/50 text-[10px] ms-1">({isArabic ? opt.descAr : opt.descEn})</span></span>
                      <div className="flex gap-1" dir="ltr">
                        <span className="font-mono text-[10px] leading-none self-end pb-0.5 text-[#f5f0e8]/70">SAR</span>
                        <span className="font-mono">{formatValue(priceForThisPurity)}</span>
                      </div>
                    </div>
                    <div className="w-full bg-[#f5f0e8]/10 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${isActive ? 'bg-[#b5651d]' : 'bg-[#f5f0e8]/40'}`}
                        style={{ width: `${widthPercent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* 🟢 CONTROLS */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          
          {/* Purity Segmented Control */}
          <div>
            <label className="block text-[10px] font-bold text-[#4a5e4d] uppercase tracking-widest mb-2 ms-1">
              {t.selectPurity}
            </label>
            <div className="bg-white p-1 rounded-lg flex items-center border border-[#0d1a0f]/10 w-full sm:w-auto shadow-sm">
              {Object.entries(PURITY_OPTIONS).map(([key, option]) => {
                const isActive = purity === key;
                return (
                  <button
                    key={key}
                    onClick={() => setPurity(key)}
                    className={`flex-1 sm:flex-none px-8 py-2.5 rounded-md text-[0.7rem] font-black uppercase tracking-[0.15em] transition-all duration-200 ${
                      isActive 
                        ? "bg-[#0d1a0f] text-[#f5f0e8]" 
                        : "text-[#4a5e4d] hover:text-[#0d1a0f] hover:bg-[#fafaf8]"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Region Filter */}
          <div className="w-full sm:w-auto">
            <label className="block text-[10px] font-bold text-[#4a5e4d] uppercase tracking-widest mb-2 ms-1">
              {t.filterTable}
            </label>
            <div className="relative">
              <select
                value={currencyFilter}
                onChange={(e) => setCurrencyFilter(e.target.value)}
                className="w-full sm:w-64 bg-white border border-[#0d1a0f]/10 text-[#0d1a0f] px-5 py-3 rounded-lg text-[0.7rem] font-bold uppercase tracking-wider outline-none cursor-pointer appearance-none shadow-sm hover:border-[#b5651d] transition-colors focus:border-[#b5651d]"
              >
                <option value="ALL">{t.allRegions}</option>
                {Object.entries(CURRENCY_INFO).map(([code, info]) => (
                  <option key={code} value={code}>{isArabic ? info.nameAr : info.nameEn} ({code})</option>
                ))}
              </select>
              <ChevronDown className="absolute end-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5e4d] pointer-events-none" />
            </div>
          </div>

        </div>

        {/* 🟢 FINANCIAL TABLE */}
        <div className="bg-white border-[1.5px] border-[#0d1a0f]/10 rounded-[1.5rem] overflow-hidden shadow-sm mb-16">
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse whitespace-nowrap">
              <thead className="bg-[#fafaf8] border-b border-[#0d1a0f]/10 sticky top-0 z-10">
                <tr>
                  <th className="py-5 px-6 text-[0.65rem] font-black text-[#4a5e4d] uppercase tracking-[0.2em] text-start">
                    {t.tableMarket}
                  </th>
                  <th className="py-5 px-6 text-[0.65rem] font-black text-[#4a5e4d] uppercase tracking-[0.2em] text-end">
                    {t.tableGram}
                  </th>
                  <th 
                    className="py-5 px-6 text-[0.65rem] font-black text-[#4a5e4d] uppercase tracking-[0.2em] text-end"
                    dangerouslySetInnerHTML={{ __html: t.tableTola }}
                  />
                  <th className="py-5 px-6 text-[0.65rem] font-black text-[#4a5e4d] uppercase tracking-[0.2em] text-end">
                    {t.tableOunce}
                  </th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-[#0d1a0f]/5">
                {currenciesToDisplay.map((currency) => {
                  const rate = rates[currency] || 0;
                  const val = calculateLive(rate);
                  const info = CURRENCY_INFO[currency];

                  return (
                    <tr 
                      key={currency} 
                      className="group hover:bg-[#b5651d]/[0.03] even:bg-[#0d1a0f]/[0.02] transition-colors duration-200"
                    >
                      <td className="py-5 px-6 text-start">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl leading-none drop-shadow-sm">{info.flag}</span>
                          <div>
                            <p className="font-bold text-[#0d1a0f] text-sm tracking-tight">{isArabic ? info.nameAr : info.nameEn}</p>
                            <p className="text-[10px] text-[#4a5e4d] font-bold uppercase tracking-widest mt-0.5" dir="ltr">{info.code}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-5 px-6 text-end">
                        <span className="text-lg font-black font-mono text-[#0d1a0f] group-hover:text-[#b5651d] transition-colors" dir="ltr">
                          {formatValue(val.gram)}
                        </span>
                      </td>

                      <td className="py-5 px-6 text-end">
                        <span className="text-sm font-semibold font-mono text-[#4a5e4d]" dir="ltr">
                          {formatValue(val.tola)}
                        </span>
                      </td>

                      <td className="py-5 px-6 text-end">
                        <span className="text-sm font-semibold font-mono text-[#4a5e4d]" dir="ltr">
                          {formatValue(val.ounce)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🟢 MARKET GUIDE & INSIGHTS */}
        <div className="mb-6 flex items-center gap-3">
          <span className="w-6 h-[2px] bg-[#b5651d]" />
          <h2 className="text-[0.7rem] font-black tracking-[0.2em] uppercase text-[#0d1a0f]">
            {t.guideTitle}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Understanding Purity */}
          <div className="bg-white border-[1.5px] border-[#0d1a0f]/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#fafaf8] border border-[#0d1a0f]/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#b5651d]" />
              </div>
              <h3 className="font-bold text-[#0d1a0f]">{t.purityCard}</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex flex-col sm:flex-row sm:justify-between sm:items-start border-b border-[#0d1a0f]/5 pb-3 gap-2">
                <span className="text-sm font-bold text-[#0d1a0f] whitespace-nowrap" dir="ltr">{t.purity24}</span>
                <span className="text-xs text-[#4a5e4d] font-medium sm:text-end sm:w-2/3 leading-relaxed">{t.purity24desc}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between sm:items-start border-b border-[#0d1a0f]/5 pb-3 gap-2">
                <span className="text-sm font-bold text-[#0d1a0f] whitespace-nowrap" dir="ltr">{t.purity22}</span>
                <span className="text-xs text-[#4a5e4d] font-medium sm:text-end sm:w-2/3 leading-relaxed">{t.purity22desc}</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <span className="text-sm font-bold text-[#0d1a0f] whitespace-nowrap" dir="ltr">{t.purity18}</span>
                <span className="text-xs text-[#4a5e4d] font-medium sm:text-end sm:w-2/3 leading-relaxed">{t.purity18desc}</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Weight Metrics */}
          <div className="bg-white border-[1.5px] border-[#0d1a0f]/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#fafaf8] border border-[#0d1a0f]/10 flex items-center justify-center">
                <Scale className="w-4 h-4 text-[#b5651d]" />
              </div>
              <h3 className="font-bold text-[#0d1a0f]">{t.weightCard}</h3>
            </div>
            <ul className="space-y-4">
              <li className="border-b border-[#0d1a0f]/5 pb-3">
                <p className="text-sm font-bold text-[#0d1a0f] mb-1">{t.ounceTitle}</p>
                <p className="text-xs text-[#4a5e4d] font-medium leading-relaxed">{t.ounceDesc}</p>
              </li>
              <li className="border-b border-[#0d1a0f]/5 pb-3">
                <p className="text-sm font-bold text-[#0d1a0f] mb-1">{t.tolaTitle}</p>
                <p className="text-xs text-[#4a5e4d] font-medium leading-relaxed">{t.tolaDesc}</p>
              </li>
              <li>
                <p className="text-sm font-bold text-[#0d1a0f] mb-1">{t.gramTitle}</p>
                <p className="text-xs text-[#4a5e4d] font-medium leading-relaxed">{t.gramDesc}</p>
              </li>
            </ul>
          </div>

          {/* Card 3: Spot vs Retail */}
          <div className="bg-white border-[1.5px] border-[#0d1a0f]/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#fafaf8] border border-[#0d1a0f]/10 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[#b5651d]" />
              </div>
              <h3 className="font-bold text-[#0d1a0f]">{t.spotCard}</h3>
            </div>
            <div className="space-y-4">
              <p className="text-xs text-[#4a5e4d] font-medium leading-relaxed">
                {t.spotDesc}
              </p>
              <div className="bg-[#fafaf8] p-4 rounded-xl border border-[#0d1a0f]/5">
                <p className="text-sm font-bold text-[#0d1a0f] mb-2">{t.retailTitle}</p>
                <p className="text-xs text-[#4a5e4d] font-medium leading-relaxed">
                  {t.retailDesc}
                </p>
                <ul className="list-disc list-inside text-xs text-[#4a5e4d] font-medium mt-2 space-y-1 ms-1">
                  {t.retailList.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}