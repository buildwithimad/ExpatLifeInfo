"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Clock, 
  ShieldCheck, 
  ArrowDownUp,
  Globe,
  Landmark,
  Wallet,
  Search,
  BarChart3,
  ChevronDown 
} from "lucide-react";

// Design System Colors
const COLORS = {
  primary: "#0d1a0f",
  accent: "#d4843e",
  background: "#faf8f5",
  textPrimary: "#0d1a0f",
  textMuted: "#4a5e4d",
};

const getFlagEmoji = (currencyCode) => {
  const specialFlags = {
    EUR: "🇪🇺", GBP: "🇬🇧", ANG: "🇳🇱", XCD: "🇨🇼",
    BTC: "₿", XAU: "🥇", XAG: "🪙", XPD: "🪙", XPT: "🪙",
  };
  if (specialFlags[currencyCode]) return specialFlags[currencyCode];
  
  if (currencyCode.length >= 2) {
    const countryCode = currencyCode.substring(0, 2);
    const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0));
    try {
      return String.fromCodePoint(...codePoints);
    } catch(e) {
      return "🏳️";
    }
  }
  return "🏳️";
};

export default function ExchangeDashboard({ data, lang }) {
  const isArabic = lang === "ar";
  
  const t = isArabic ? {
    statusBar: "أسعار السوق الموثقة",
    loading: "جاري الاتصال ببيانات السوق...",
    heroTitle: "أسعار الصرف",
    perGram: " جرام",
    amount: "المبلغ المرسل",
    convertedAmount: "المبلغ المستلم",
    chartTitle: "تحليل أسعار الصرف",
    tableTitle: "أسعار الصرف العالمية",
    searchPlaceholder: "ابحث عن عملة (مثل USD, EUR)...",
    baseCurrency: "عملة الأساس",
    thCurrency: "العملة",
    thBuy: "شراء 1",
    thSell: "بيع 1",
    guideTitle: "رؤى مالية",
    guide1Title: "أسعار منتصف السوق",
    guide1Desc: "نستخدم أسعار منتصف السوق الحقيقية المعتمدة لدى كبرى المؤسسات المالية لضمان الشفافية.",
    guide2Title: "هوامش البنوك",
    guide2Desc: "تضيف البنوك عادة هوامش ربحية مخفية. قارن أسعارنا لتكتشف القيمة الحقيقية لتحويلاتك.",
    guide3Title: "ارتباط العملات",
    guide3Desc: "بعض العملات كالريال السعودي ترتبط بالدولار بأسعار ثابتة لحماية استقرارها الاقتصادي.",
  } : {
    statusBar: "Live Market Rates",
    loading: "Connecting to market data...",
    heroTitle: "Currency Exchange",
    perGram: " gram",
    amount: "You send",
    convertedAmount: "Recipient gets",
    chartTitle: "Exchange Rate Analysis",
    tableTitle: "Global Exchange Rates",
    searchPlaceholder: "Search currencies (e.g., USD, EUR)...",
    baseCurrency: "Base Currency",
    thCurrency: "Currency",
    thBuy: "Buy 1",
    thSell: "Sell 1",
    guideTitle: "Financial Insights",
    guide1Title: "Mid-Market Rates",
    guide1Desc: "We use the real mid-market rates independently provided by major financial institutions.",
    guide2Title: "Hidden Bank Spreads",
    guide2Desc: "Banks often conceal markups in their exchange rates. We emphasize total transparency.",
    guide3Title: "Currency Pegs",
    guide3Desc: "Certain currencies, like the SAR, are pegged to the USD at fixed rates for economic stability.",
  };

  const [amount, setAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState("SAR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [tableBaseCurrency, setTableBaseCurrency] = useState("SAR");
  const [searchQuery, setSearchQuery] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
  }, [data]);

  const currenciesList = useMemo(() => {
    if (!data?.rates) return [];
    const displayNameAr = new Intl.DisplayNames(['ar'], { type: 'currency' });
    const displayNameEn = new Intl.DisplayNames(['en'], { type: 'currency' });

    return Object.keys(data.rates).map((code) => {
      let nameAr = code; let nameEn = code;
      try { nameAr = displayNameAr.of(code); } catch(e) {}
      try { nameEn = displayNameEn.of(code); } catch(e) {}
      return {
        code, nameAr, nameEn, name: isArabic ? nameAr : nameEn, flag: getFlagEmoji(code),
      };
    }).sort((a, b) => a.code.localeCompare(b.code));
  }, [data?.rates, isArabic]);

  if (!data?.success || !data?.rates) {
    return (
      <div dir={isArabic ? "rtl" : "ltr"} className="min-h-screen flex items-center justify-center bg-[#faf8f5]">
        <div className="flex flex-col items-center gap-5">
          <div className="relative flex items-center justify-center w-12 h-12">
            <div className="absolute inset-0 border-[3px] border-[#d4843e]/10 rounded-full"></div>
            <div className="absolute inset-0 border-[3px] border-[#d4843e] rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-[#0d1a0f] text-sm font-semibold tracking-tight">{t.loading}</p>
        </div>
      </div>
    );
  }

  const rates = data.rates;
  const getExchangeRate = (base, target) => base === target ? 1 : rates[target] / rates[base];

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const currentRate = getExchangeRate(fromCurrency, toCurrency);
  const convertedAmount = (amount || 0) * currentRate;
  const formatNum = (val, max = 2) => val.toLocaleString('en-US', { minimumFractionDigits: max, maximumFractionDigits: max });

  const filteredCurrencies = currenciesList.filter(c => 
    c.code !== tableBaseCurrency &&
    (c.code.toLowerCase().includes(searchQuery.toLowerCase()) || c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const chartTopCurrencies = ['USD', 'EUR', 'GBP', 'AED', 'JPY'];
  const chartMaxVal = Math.max(...chartTopCurrencies.map(c => (amount || 0) * getExchangeRate(fromCurrency, c)));

  const activeFromData = currenciesList.find(c => c.code === fromCurrency);
  const activeToData = currenciesList.find(c => c.code === toCurrency);
  const activeBaseData = currenciesList.find(c => c.code === tableBaseCurrency);

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-[#f8fafc] text-slate-900 pb-32 selection:bg-[#d4843e]/20 selection:text-[#d4843e] antialiased">
      
      {/* ✨ PREMIUM DASHBOARD HERO */}
      <div className="relative w-full bg-[#0d1a0f] h-[380px] lg:h-[420px] overflow-hidden">
        
        {/* ✨ FLOATING CURRENCY ELEMENTS & SMOOTH GRADIENTS */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          {/* Base Glowing Orbs */}
          <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(22,163,74,0.18),rgba(255,255,255,0))]"></div>
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#d4843e]/10 rounded-full blur-[80px]"></div>
          <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] bg-[#16a34a]/15 rounded-full blur-[80px]"></div>
          
          {/* Ambient Currency Symbols */}
          <div className="absolute top-[10%] left-[8%] text-white/5 font-serif text-8xl -rotate-12 blur-[1px]">¥</div>
          <div className="absolute top-[25%] right-[10%] text-[#d4843e]/10 font-serif text-9xl rotate-12 blur-[2px]">€</div>
          <div className="absolute top-[60%] left-[25%] text-[#16a34a]/20 font-serif text-[140px] rotate-[20deg] blur-[4px]">$</div>
          <div className="absolute top-[35%] right-[25%] text-white/5 font-serif text-7xl -rotate-[15deg] blur-[1px]">£</div>
          <div className="absolute top-[15%] left-[55%] text-[#d4843e]/5 font-serif text-8xl rotate-45 blur-[3px]">﷼</div>
          <div className="absolute top-[45%] left-[4%] text-white/5 font-serif text-6xl rotate-6">₿</div>
          <div className="absolute top-[55%] right-[5%] text-[#16a34a]/10 font-serif text-8xl -rotate-12 blur-[2px]">₹</div>
        </div>

        {/* Bottom Fade to content */}
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#faf8f5] via-[#faf8f5]/80 to-transparent z-10"></div>
        
        {/* STATUS BAR */}
        <div className="relative z-30 max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-2 text-white/90 text-xs font-semibold tracking-wide bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
            <span>{t.statusBar}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/60 text-xs font-semibold tracking-wide" dir="ltr">
            <Clock className="w-3.5 h-3.5" />
            <span>{lastUpdated || "--:--"}</span>
          </div>
        </div>

        {/* HERO TYPOGRAPHY */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 pt-10 pb-24 text-center sm:text-start">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 drop-shadow-md">
            {t.heroTitle}
          </h1>
          <p className="text-[#d4843e]/90 text-base sm:text-lg max-w-xl mx-auto sm:mx-0 font-medium">
            {isArabic ? "حوّل أموالك بدقة تامة. أسعار منتصف السوق الحقيقية، بدون رسوم خفية." : "Send money globally with absolute precision. Real-time mid-market rates, zero hidden fees."}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-30 -mt-32 lg:-mt-36">
        
        {/* ✨ MAIN CONVERTER SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20">
          
          {/* Main Converter Card */}
          <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-[2rem] p-3 sm:p-4 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#0d1a0f]/5 backdrop-blur-xl">
            <div className="relative flex flex-col gap-2">
              
              {/* Box 1: You Send - (DYNAMIC Z-INDEX FIX) */}
              <div className={`relative group bg-[#faf8f5] rounded-[1.5rem] p-6 sm:p-8 transition-all duration-200 border border-transparent focus-within:border-[#d4843e]/30 focus-within:ring-4 focus-within:ring-[#d4843e]/10 focus-within:bg-white ${activeDropdown === 'from' ? 'z-30' : 'z-10'}`}>
                <label className="block text-sm font-semibold text-[#4a5e4d] mb-3 transition-colors group-focus-within:text-[#d4843e]">
                  {t.amount}
                </label>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-transparent text-[#0d1a0f] text-5xl sm:text-6xl font-bold tracking-tighter tabular-nums outline-none placeholder:text-[#4a5e4d]/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    dir="ltr"
                    min="0"
                  />
                  
                  {/* ✨ CUSTOM DROPDOWN TRIGGER: FROM CURRENCY */}
                  <div className="relative shrink-0 w-full sm:w-auto">
                    <div 
                      onClick={() => setActiveDropdown(activeDropdown === 'from' ? null : 'from')}
                      className="flex items-center justify-between sm:justify-start bg-white shadow-sm border border-[#0d1a0f]/5 hover:border-[#0d1a0f]/20 transition-all rounded-2xl px-4 py-3 cursor-pointer min-w-[140px] sm:w-[220px]"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="text-2xl drop-shadow-sm leading-none shrink-0">{activeFromData?.flag}</span>
                        <div className="flex flex-col items-start truncate">
                          <span className="text-[#0d1a0f] text-base font-bold leading-tight">{activeFromData?.code}</span>
                          <span className="text-[#4a5e4d] text-[10px] font-medium truncate w-full">{activeFromData?.name}</span>
                        </div>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-[#4a5e4d] shrink-0 ms-2 transition-transform duration-300 ${activeDropdown === 'from' ? 'rotate-180' : ''}`} />
                    </div>

                    {/* ✨ CUSTOM DROPDOWN LIST */}
                    {activeDropdown === 'from' && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)}></div>
                        <div className="absolute top-[calc(100%+8px)] end-0 w-full sm:w-[300px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#0d1a0f]/5 z-50 overflow-hidden transform origin-top transition-all animate-in fade-in zoom-in-95 duration-200">
                          <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-1.5">
                            {currenciesList.map((c) => (
                              <div
                                key={`from-${c.code}`}
                                onClick={() => { setFromCurrency(c.code); setActiveDropdown(null); }}
                                className={`flex items-center gap-3.5 px-3 py-2.5 cursor-pointer rounded-xl transition-colors duration-150 ${fromCurrency === c.code ? 'bg-[#faf8f5]' : 'hover:bg-[#faf8f5]/60'}`}
                              >
                                <span className="text-2xl leading-none">{c.flag}</span>
                                <div className="flex flex-col items-start truncate">
                                  <span className="text-[#0d1a0f] font-bold text-sm leading-tight">{c.code}</span>
                                  <span className="text-[#4a5e4d] text-[11px] font-medium mt-0.5 truncate w-full">{c.name}</span>
                                </div>
                                {fromCurrency === c.code && <div className="ms-auto w-1.5 h-1.5 rounded-full bg-[#d4843e]"></div>}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                </div>
              </div>

              {/* Floating Swap Button */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <button 
                  onClick={handleSwap}
                  className="flex items-center justify-center w-12 h-12 bg-white border border-[#0d1a0f]/5 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.08)] text-[#d4843e] hover:scale-[1.05] active:-rotate-180 transition-all duration-300"
                  aria-label="Swap currencies"
                >
                  <ArrowDownUp className="w-5 h-5" />
                </button>
              </div>

              {/* Box 2: Recipient Gets - (DYNAMIC Z-INDEX FIX) */}
              <div className={`relative bg-white rounded-[1.5rem] p-6 sm:p-8 border border-[#0d1a0f]/5 transition-all duration-200 ${activeDropdown === 'to' ? 'z-30' : 'z-10'}`}>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-semibold text-[#4a5e4d]">
                    {t.convertedAmount}
                  </label>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
                  <div className="w-full text-5xl sm:text-6xl font-bold tracking-tighter tabular-nums text-[#0d1a0f] truncate" dir="ltr">
                    {formatNum(convertedAmount)}
                  </div>
                  
                  {/* ✨ CUSTOM DROPDOWN TRIGGER: TO CURRENCY */}
                  <div className="relative shrink-0 w-full sm:w-auto">
                    <div 
                      onClick={() => setActiveDropdown(activeDropdown === 'to' ? null : 'to')}
                      className="flex items-center justify-between sm:justify-start bg-[#faf8f5] shadow-sm border border-transparent hover:border-[#0d1a0f]/10 transition-all rounded-2xl px-4 py-3 cursor-pointer min-w-[140px] sm:w-[220px]"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="text-2xl drop-shadow-sm leading-none shrink-0">{activeToData?.flag}</span>
                        <div className="flex flex-col items-start truncate">
                          <span className="text-[#0d1a0f] text-base font-bold leading-tight">{activeToData?.code}</span>
                          <span className="text-[#4a5e4d] text-[10px] font-medium truncate w-full">{activeToData?.name}</span>
                        </div>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-[#4a5e4d] shrink-0 ms-2 transition-transform duration-300 ${activeDropdown === 'to' ? 'rotate-180' : ''}`} />
                    </div>

                    {/* ✨ CUSTOM DROPDOWN LIST */}
                    {activeDropdown === 'to' && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)}></div>
                        <div className="absolute top-[calc(100%+8px)] end-0 w-full sm:w-[300px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#0d1a0f]/5 z-50 overflow-hidden transform origin-top transition-all animate-in fade-in zoom-in-95 duration-200">
                          <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-1.5">
                            {currenciesList.map((c) => (
                              <div
                                key={`to-${c.code}`}
                                onClick={() => { setToCurrency(c.code); setActiveDropdown(null); }}
                                className={`flex items-center gap-3.5 px-3 py-2.5 cursor-pointer rounded-xl transition-colors duration-150 ${toCurrency === c.code ? 'bg-[#faf8f5]' : 'hover:bg-[#faf8f5]/60'}`}
                              >
                                <span className="text-2xl leading-none">{c.flag}</span>
                                <div className="flex flex-col items-start truncate">
                                  <span className="text-[#0d1a0f] font-bold text-sm leading-tight">{c.code}</span>
                                  <span className="text-[#4a5e4d] text-[11px] font-medium mt-0.5 truncate w-full">{c.name}</span>
                                </div>
                                {toCurrency === c.code && <div className="ms-auto w-1.5 h-1.5 rounded-full bg-[#d4843e]"></div>}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                </div>
              </div>
            </div>

            {/* Rate Info Footer */}
            <div className="mt-4 px-6 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-sm font-semibold text-[#4a5e4d] tracking-tight" dir="ltr">
                1 {fromCurrency} = <span className="text-[#d4843e]">{formatNum(currentRate, 4)}</span> {toCurrency}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#16a34a] bg-[#16a34a]/10 px-3 py-1.5 rounded-lg w-fit">
                <ShieldCheck className="w-4 h-4" /> {isArabic ? "سعر مضمون" : "Guaranteed Rate"}
              </div>
            </div>
          </div>

          {/* Sexy & Light Chart Card */}
          <div className="lg:col-span-5 xl:col-span-4 bg-white border border-[#0d1a0f]/5 rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] flex flex-col">
            <div className="flex items-center gap-2 mb-8">
              <BarChart3 className="w-5 h-5 text-[#4a5e4d]" />
              <h2 className="text-[#0d1a0f] text-sm font-bold tracking-widest uppercase">
                {t.chartTitle}
              </h2>
            </div>

            <div className="space-y-6 flex-grow flex flex-col justify-center">
              {chartTopCurrencies.map((code) => {
                const targetVal = (amount || 0) * getExchangeRate(fromCurrency, code);
                const widthPercent = chartMaxVal > 0 ? (targetVal / chartMaxVal) * 100 : 0;

                return (
                  <div key={code} className="group cursor-default">
                    <div className="flex justify-between items-end mb-2.5">
                      <div className="flex gap-3 items-center">
                        <span className="text-xl leading-none drop-shadow-sm">{getFlagEmoji(code)}</span>
                        <span className="text-sm font-bold text-slate-500 group-hover:text-[#0d1a0f] transition-colors">{code}</span>
                      </div>
                      <span className="text-base font-bold tracking-tight tabular-nums text-[#0d1a0f]" dir="ltr">{formatNum(targetVal, 2)}</span>
                    </div>
                    <div className="w-full bg-[#faf8f5] rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-[#d4843e] transition-all duration-700 ease-out"
                        style={{ width: `${Math.max(widthPercent, 2)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ✨ STRIPE-STYLE AIRY TABLE */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-[#0d1a0f]">
              {t.tableTitle}
            </h2>
            
            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
              {/* Flat sleek search */}
              <div className="w-full sm:w-80 relative group">
                <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5e4d] transition-colors" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-[#0d1a0f]/5 text-[#0d1a0f] ps-11 pe-4 py-3 rounded-xl text-sm font-medium outline-none focus:border-[#d4843e]/40 transition-all duration-200 shadow-sm"
                />
              </div>

              {/* ✨ CUSTOM DROPDOWN: BASE CURRENCY (TABLE) - (DYNAMIC Z-INDEX FIX) */}
              <div className={`w-full sm:w-56 relative ${activeDropdown === 'tableBase' ? 'z-30' : 'z-10'}`}>
                <div 
                  onClick={() => setActiveDropdown(activeDropdown === 'tableBase' ? null : 'tableBase')}
                  className="flex items-center justify-between bg-white border border-[#0d1a0f]/5 text-[#0d1a0f] ps-4 pe-4 py-3 rounded-xl text-sm font-bold outline-none cursor-pointer hover:border-[#0d1a0f]/20 transition-all duration-200 shadow-sm"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-lg drop-shadow-sm leading-none">{activeBaseData?.flag}</span>
                    <span className="truncate">{activeBaseData?.code} - {activeBaseData?.name}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#4a5e4d] shrink-0 ms-2 transition-transform duration-300 ${activeDropdown === 'tableBase' ? 'rotate-180' : ''}`} />
                </div>

                {activeDropdown === 'tableBase' && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)}></div>
                    <div className="absolute top-[calc(100%+8px)] end-0 w-full sm:w-[280px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#0d1a0f]/5 z-50 overflow-hidden transform origin-top transition-all animate-in fade-in zoom-in-95 duration-200">
                      <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-1.5">
                        {currenciesList.map((c) => (
                          <div
                            key={`base-${c.code}`}
                            onClick={() => { setTableBaseCurrency(c.code); setActiveDropdown(null); }}
                            className={`flex items-center gap-3 px-3 py-2 cursor-pointer rounded-xl transition-colors duration-150 ${tableBaseCurrency === c.code ? 'bg-[#faf8f5]' : 'hover:bg-[#faf8f5]/60'}`}
                          >
                            <span className="text-xl leading-none">{c.flag}</span>
                            <div className="flex flex-col items-start truncate">
                              <span className="text-[#0d1a0f] font-bold text-sm leading-tight">{c.code}</span>
                              <span className="text-[#4a5e4d] text-[10px] font-medium mt-0.5 truncate w-full">{c.name}</span>
                            </div>
                            {tableBaseCurrency === c.code && <div className="ms-auto w-1.5 h-1.5 rounded-full bg-[#d4843e]"></div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#0d1a0f]/5 relative">
            <div className="overflow-y-auto max-h-[500px] custom-scrollbar px-2">
              <table className="w-full text-start border-collapse whitespace-nowrap">
                <thead className="bg-white sticky top-0 z-10 border-b border-[#0d1a0f]/5">
                  <tr>
                    <th className="py-5 px-6 text-xs font-bold tracking-widest uppercase text-[#4a5e4d] text-start">
                      {t.thCurrency}
                    </th>
                    <th className="py-5 px-6 text-xs font-bold tracking-widest uppercase text-[#4a5e4d] text-end">
                      {t.thBuy} {tableBaseCurrency}
                    </th>
                    <th className="py-5 px-6 text-xs font-bold tracking-widest uppercase text-[#4a5e4d] text-end">
                      {t.thSell} {tableBaseCurrency}
                    </th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-[#0d1a0f]/5">
                  {filteredCurrencies.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="py-20 text-center text-sm font-semibold text-[#4a5e4d]">
                        No results found.
                      </td>
                    </tr>
                  ) : (
                    filteredCurrencies.map((c) => {
                      const baseToTarget = getExchangeRate(tableBaseCurrency, c.code);
                      const targetToBase = getExchangeRate(c.code, tableBaseCurrency);

                      return (
                        <tr 
                          key={`row-${c.code}`} 
                          className="group hover:bg-[#faf8f5] transition-colors duration-150 rounded-xl"
                        >
                          <td className="py-4 px-6 text-start">
                            <div className="flex items-center gap-4">
                              <span className="text-3xl leading-none drop-shadow-sm">{c.flag}</span>
                              <div>
                                <p className="font-bold text-[#0d1a0f] text-sm tracking-tight">{c.code}</p>
                                <p className="text-xs font-medium text-[#4a5e4d] mt-0.5">{c.name}</p>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-6 text-end">
                            <span className="text-sm font-bold tracking-tight tabular-nums text-[#0d1a0f]" dir="ltr">
                              {formatNum(baseToTarget, 4)}
                            </span>
                          </td>

                          <td className="py-4 px-6 text-end">
                            <span className="text-sm font-semibold tracking-tight tabular-nums text-[#4a5e4d]" dir="ltr">
                              {formatNum(targetToBase, 4)}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ✨ PREMIUM CLEAN INSIGHT CARDS */}
        <h2 className="text-2xl font-bold tracking-tight text-[#0d1a0f] mb-8">
          {t.guideTitle}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#0d1a0f]/5 rounded-[1.5rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-[#faf8f5] flex items-center justify-center mb-6 text-[#d4843e] group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#0d1a0f] text-lg tracking-tight mb-3">{t.guide1Title}</h3>
            <p className="text-sm font-medium text-[#4a5e4d] leading-relaxed">{t.guide1Desc}</p>
          </div>

          <div className="bg-white border border-[#0d1a0f]/5 rounded-[1.5rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-[#faf8f5] flex items-center justify-center mb-6 text-[#d4843e] group-hover:scale-110 transition-transform duration-300">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#0d1a0f] text-lg tracking-tight mb-3">{t.guide2Title}</h3>
            <p className="text-sm font-medium text-[#4a5e4d] leading-relaxed">{t.guide2Desc}</p>
          </div>

          <div className="bg-white border border-[#0d1a0f]/5 rounded-[1.5rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-[#faf8f5] flex items-center justify-center mb-6 text-[#d4843e] group-hover:scale-110 transition-transform duration-300">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-[#0d1a0f] text-lg tracking-tight mb-3">{t.guide3Title}</h3>
            <p className="text-sm font-medium text-[#4a5e4d] leading-relaxed">{t.guide3Desc}</p>
          </div>
        </div>

      </div>
    </div>
  );
}