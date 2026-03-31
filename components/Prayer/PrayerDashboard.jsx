"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  Clock, 
  ShieldCheck, 
  MapPin,
  CalendarDays,
  Search,
  Moon,
  Sun,
  Globe,
  Sunrise,
  ArrowRight,
  Loader2,
  Info
} from "lucide-react";

// Design System Colors
const COLORS = {
  primary: "#0d1a0f",
  accent: "#d4843e",
  background: "#faf8f5",
};

const PRAYER_NAMES = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const ARABIC_PRAYERS = { Fajr: 'الفجر', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء', Sunrise: 'الشروق' };

// Default Cities fallback before typing
const DEFAULT_CITIES = [
  { name: 'Riyadh', country: 'Saudi Arabia', timezone: 'Asia/Riyadh' },
  { name: 'Mecca', country: 'Saudi Arabia', timezone: 'Asia/Riyadh' },
  { name: 'Dubai', country: 'United Arab Emirates', timezone: 'Asia/Dubai' },
  { name: 'London', country: 'United Kingdom', timezone: 'Europe/London' },
  { name: 'New York', country: 'United States', timezone: 'America/New York' },
];

// Utilities
function getSecondsUntil(targetTime24) {
  const now = new Date();
  const [targetHours, targetMinutes] = targetTime24.split(':').map(Number);
  const targetDate = new Date(now);
  targetDate.setHours(targetHours, targetMinutes, 0, 0);
  if (targetDate < now) targetDate.setDate(targetDate.getDate() + 1);
  return Math.floor((targetDate - now) / 1000);
}

function format12Hour(time24) {
  let [hours, minutes] = time24.split(':');
  hours = parseInt(hours, 10);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours.toString().padStart(2, '0')}:${minutes} ${suffix}`;
}

export default function PrayerDashboard({ prayerData, city, lang }) {
  const isArabic = lang === "ar";
  const router = useRouter();
  
  const t = isArabic ? {
    statusBar: "مواقيت دقيقة ومحدثة",
    loading: "جاري تحميل المواقيت...",
    heroTitle: "مواقيت الصلاة العالمية",
    heroDesc: `أوقات الصلاة الحية لمدينة ${city}. متزامنة مع منطقتك الزمنية.`,
    nextPrayer: "الصلاة القادمة",
    timeRemaining: "الوقت المتبقي",
    searchPlaceholder: "ابحث عن أي مدينة في العالم...",
    timeFormat: "الصيغة",
    h12: "١٢ ساعة",
    h24: "٢٤ ساعة",
    guideTitle: "معلومات فلكية",
    guide1Title: "دقة المعايير",
    guide1Desc: "نعتمد على أدق المعايير الفلكية المعتمدة عالمياً ومحلياً لحساب أوقات الصلاة.",
    guide2Title: "التوقيت الصيفي",
    guide2Desc: "تعديل تلقائي ليتناسب مع التوقيت الصيفي والشتوي في منطقتك.",
    guide3Title: "المناطق الزمنية",
    guide3Desc: "دعم شامل لجميع المناطق الزمنية لضمان الدقة أينما كنت.",
    sunrise: "الشروق",
    method: "طريقة الحساب:"
  } : {
    statusBar: "Verified & Accurate",
    loading: "Loading times...",
    heroTitle: "Global Prayer Times",
    heroDesc: `Live prayer schedule for ${city}. Synchronized with your timezone.`,
    nextPrayer: "Next Prayer",
    timeRemaining: "Time Remaining",
    searchPlaceholder: "Search any city in the world...",
    timeFormat: "Format",
    h12: "12h",
    h24: "24h",
    guideTitle: "Astronomical Insights",
    guide1Title: "Standard Accuracy",
    guide1Desc: "We rely on the most accurate, globally recognized astronomical standards.",
    guide2Title: "Daylight Saving",
    guide2Desc: "Times automatically adjust to match DST variations in your region.",
    guide3Title: "Time Zones",
    guide3Desc: "Full support for all global time zones ensuring absolute precision.",
    sunrise: "Sunrise",
    method: "Calculation Method:"
  };

  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState('');
  const [is24Hour, setIs24Hour] = useState(false);
  
  // Search & API State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const timings = prayerData?.timings || {};
  const dateInfo = prayerData?.date || null;
  const currentZone = prayerData?.meta?.timezone || 'Unknown Timezone';
  const calcMethod = prayerData?.meta?.method?.name || (isArabic ? 'تلقائي' : 'Automatic');

  // Live Timer Logic
  useEffect(() => {
    if (!timings.Fajr) return;
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      let upcoming = null;
      let minDiff = Infinity;

      PRAYER_NAMES.forEach(name => {
        const diff = getSecondsUntil(timings[name]);
        if (diff > 0 && diff < minDiff) {
          minDiff = diff;
          upcoming = name;
        }
      });

      if (!upcoming) upcoming = 'Fajr';
      setNextPrayer(upcoming);

      const hours = Math.floor(minDiff / 3600);
      const minutes = Math.floor((minDiff % 3600) / 60);
      const seconds = minDiff % 60;
      setCountdown(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, [timings]);

  // Global Cities API Fetcher
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const fetchCities = async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=8&language=en&format=json`);
        const data = await res.json();
        if (data.results) {
          setSearchResults(data.results);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchCities();
    }, 400); // Wait 400ms after user stops typing to hit the API

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = (selectedCity) => {
    if (selectedCity.trim()) {
      setActiveDropdown(null);
      setSearchQuery("");
      router.push(`/${lang}/prayer-times/${encodeURIComponent(selectedCity.trim())}`);
    }
  };

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-[#f8fafc] text-slate-900 pb-32 selection:bg-[#d4843e]/20 selection:text-[#d4843e] antialiased">
      
      {/* ✨ PREMIUM DASHBOARD HERO */}
      <div className="relative w-full bg-[#0d1a0f] h-[400px] lg:h-[460px] overflow-hidden">
        {/* Abstract Glowing Orbs & Geometry */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(212,132,62,0.18),rgba(255,255,255,0))]"></div>
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#d4843e]/15 rounded-full blur-[90px]"></div>
          <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] bg-[#16a34a]/15 rounded-full blur-[80px]"></div>
          
          <div className="absolute top-[15%] left-[10%] text-white/5 text-8xl -rotate-12 blur-[1px] transition-transform duration-1000 hover:rotate-0">🌙</div>
          <div className="absolute top-[25%] right-[15%] text-[#d4843e]/10 text-9xl rotate-12 blur-[2px]">🕌</div>
          <div className="absolute top-[60%] left-[30%] text-[#16a34a]/10 text-[140px] rotate-[20deg] blur-[4px]">✨</div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#faf8f5] via-[#faf8f5]/90 to-transparent z-10"></div>
        
        {/* Header Bar */}
        <div className="relative z-30 max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-2 text-white/90 text-xs font-semibold tracking-wide bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#d4843e]" />
            <span>{t.statusBar}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/80 text-xs font-bold tracking-widest bg-black/20 px-4 py-2 rounded-full" dir="ltr">
            <Clock className="w-3.5 h-3.5 text-[#d4843e]" />
            <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 pt-8 pb-24 text-center sm:text-start">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-5 drop-shadow-lg">
            {t.heroTitle}
          </h1>
          <p className="text-[#d4843e]/90 text-base sm:text-xl max-w-2xl mx-auto sm:mx-0 font-medium flex items-center justify-center sm:justify-start gap-2">
            <Globe className="w-5 h-5 opacity-70" /> {t.heroDesc}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-30 -mt-36 lg:-mt-40">
        
        {/* ✨ MAIN INTERACTIVE SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          
          {/* Main Info Card */}
          <div className="lg:col-span-7 xl:col-span-8 bg-white/60 rounded-[3rem] p-3 sm:p-4">
            <div className="relative flex flex-col gap-3">
              
              {/* Box 1: Location & Intelligent Search */}
              <div className={`relative group bg-white rounded-2xl p-6 sm:p-8 transition-all duration-300  shadow-sm focus-within:border-[#d4843e]/30 focus-within:ring-4 focus-within:ring-[#d4843e]/5 ${activeDropdown === 'search' ? 'z-40' : 'z-10'}`}>
                
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                  <div className="flex-1 w-full">
                    <label className="text-sm font-bold text-[#4a5e4d] mb-2 flex items-center gap-2 uppercase tracking-wider">
                      <MapPin className="w-4 h-4 text-[#d4843e]" /> 
                      {isArabic ? "الموقع المحدد" : "Selected Location"}
                    </label>
                    <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0d1a0f] truncate w-full max-w-[400px]">
                      {city}
                    </div>
                    
                    {/* Extra Location Details */}
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <p className="text-xs font-semibold text-[#4a5e4d]/80 bg-[#faf8f5] px-3 py-1.5 rounded-lg border border-[#0d1a0f]/5">
                        <Globe className="w-3 h-3 inline-block mr-1" /> {currentZone}
                      </p>
                      <p className="text-[10px] font-bold text-[#4a5e4d]/60 bg-white border border-[#0d1a0f]/5 px-2 py-1.5 rounded-lg truncate max-w-full">
                        <Info className="w-3 h-3 inline-block mr-1 text-[#d4843e]" /> 
                        {t.method} {calcMethod}
                      </p>
                    </div>
                  </div>
                  
                  {/* ✨ Global API Search Dropdown Trigger */}
                  <div className="relative w-full xl:w-96">
                    <div className="relative">
                     
                      <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setActiveDropdown('search');
                        }}
                        onFocus={() => setActiveDropdown('search')}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                        className={`w-full bg-[#faf8f5] border border-transparent text-[#0d1a0f] ${isArabic ? 'pr-14 pl-4' : 'pl-14 pr-4'} py-4 px-4 rounded-2xl text-sm font-bold outline-none focus:bg-white focus:border-[#d4843e]/40 focus:shadow-[0_8px_30px_rgba(212,132,62,0.12)] transition-all`}
                      />
                      {isSearching && (
                        <Loader2 className={`absolute ${isArabic ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4843e] animate-spin`} />
                      )}
                    </div>

                    {/* ✨ Filter Dropdown List */}
                    {activeDropdown === 'search' && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)}></div>
                        <div className="absolute top-[calc(100%+12px)] end-0 w-full bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#0d1a0f]/5 z-50 overflow-hidden flex flex-col">
                          
                          <div className="max-h-[350px] overflow-y-auto p-2">
                            {/* IF NO SEARCH YET: Show Defaults */}
                            {searchQuery.length < 2 && searchResults.length === 0 ? (
                              <>
                                <p className="px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-[#4a5e4d]/50">Popular Global Cities</p>
                                {DEFAULT_CITIES.map((c, i) => (
                                  <div
                                    key={i}
                                    onClick={() => handleSearch(c.name)}
                                    className="flex items-center justify-between px-4 py-3 hover:bg-[#faf8f5] cursor-pointer rounded-2xl transition-colors group"
                                  >
                                    <div>
                                      <p className="text-sm font-bold text-[#0d1a0f] group-hover:text-[#d4843e] transition-colors">{c.name}, <span className="text-[#4a5e4d] font-semibold">{c.country}</span></p>
                                      <p className="text-[10px] font-mono text-[#4a5e4d]/60 mt-0.5">{c.timezone}</p>
                                    </div>
                                    <ArrowRight className={`w-4 h-4 text-[#d4843e] opacity-0 group-hover:opacity-100 transition-all transform ${isArabic ? 'rotate-180 -translate-x-2' : 'translate-x-2'} group-hover:translate-x-0`} />
                                  </div>
                                ))}
                              </>
                            ) : 
                            /* IF SEARCHING & HAVE RESULTS */
                            searchResults.length > 0 ? (
                              searchResults.map((c, i) => (
                                <div
                                  key={i}
                                  onClick={() => handleSearch(c.name)}
                                  className="flex items-center justify-between px-4 py-3 hover:bg-[#faf8f5] cursor-pointer rounded-2xl transition-colors group"
                                >
                                  <div>
                                    <p className="text-sm font-bold text-[#0d1a0f] group-hover:text-[#d4843e] transition-colors">{c.name}, <span className="text-[#4a5e4d] font-semibold">{c.country}</span></p>
                                    <p className="text-[10px] font-mono text-[#4a5e4d]/60 mt-0.5">{c.timezone}</p>
                                  </div>
                                  <ArrowRight className={`w-4 h-4 text-[#d4843e] opacity-0 group-hover:opacity-100 transition-all transform ${isArabic ? 'rotate-180 -translate-x-2' : 'translate-x-2'} group-hover:translate-x-0`} />
                                </div>
                              ))
                            ) : 
                            /* IF FINISHED TYPING BUT NO RESULTS */
                            !isSearching ? (
                              <div className="px-5 py-8 text-center flex flex-col items-center">
                                <Globe className="w-8 h-8 text-[#4a5e4d]/20 mb-3" />
                                <p className="text-sm font-bold text-[#4a5e4d]">No cities found matching "{searchQuery}"</p>
                                <p className="text-xs text-[#4a5e4d]/60 mt-1">Try searching in English</p>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Floating Center Icon */}
              <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <div className="flex items-center justify-center w-14 h-14 bg-[#faf8f5] border-[4px] border-white rounded-full shadow-sm text-[#d4843e]">
                  <Clock className="w-5 h-5 animate-[pulse_3s_ease-in-out_infinite]" />
                </div>
              </div>

              {/* Box 2: Next Prayer Countdown */}
              <div className="relative bg-[#0d1a0f] rounded-2xl p-6 sm:p-10 z-10 overflow-hidden shadow-inner">
                <div className="absolute top-0 right-0 w-72 h-72 bg-[#d4843e]/10 rounded-2xl blur-[70px] pointer-events-none"></div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 relative z-10">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-[#d4843e] mb-2 uppercase tracking-wider">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-2xl bg-[#d4843e] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d4843e]"></span>
                      </span>
                      {t.nextPrayer}
                    </label>
                    <div className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-white drop-shadow-lg">
                      {isArabic ? ARABIC_PRAYERS[nextPrayer] : nextPrayer}
                    </div>
                  </div>
                  <div className={`text-${isArabic ? 'start' : 'end'}`}>
                    <label className="block text-sm font-bold text-white/50 mb-2 uppercase tracking-wider">
                      {t.timeRemaining}
                    </label>
                    <div className="text-4xl sm:text-6xl font-black tracking-tighter tabular-nums text-white drop-shadow-md" dir="ltr">
                      {countdown || '--h --m --s'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ✨ Controls Footer with BOTH Gregorian & Hijri Dates */}
            <div className="mt-4 px-4 sm:px-6 pb-2 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              {/* Date Displays */}
              {dateInfo && (
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
                  <span className="text-sm font-bold text-[#0d1a0f] flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-[#0d1a0f]/5">
                    <CalendarDays className="w-4 h-4 text-[#d4843e]" />
                    {dateInfo.hijri.day} {dateInfo.hijri.month[isArabic ? 'ar' : 'en']} {dateInfo.hijri.year} AH
                  </span>
                  <span className="text-sm font-bold text-[#0d1a0f] flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-sm ">
                    {dateInfo.gregorian.day} {dateInfo.gregorian.month.en} {dateInfo.gregorian.year}
                  </span>
                </div>
              )}

              {/* Time Toggle */}
              <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm border border-[#0d1a0f]/5">
                <button 
                  onClick={() => setIs24Hour(false)}
                  className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${!is24Hour ? 'bg-[#0d1a0f] text-white shadow-md' : 'text-[#4a5e4d] hover:bg-[#faf8f5]'}`}
                >
                  {t.h12}
                </button>
                <button 
                  onClick={() => setIs24Hour(true)}
                  className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${is24Hour ? 'bg-[#0d1a0f] text-white shadow-md' : 'text-[#4a5e4d] hover:bg-[#faf8f5]'}`}
                >
                  {t.h24}
                </button>
              </div>
            </div>
          </div>

          {/* Times Display Grid */}
          <div className="lg:col-span-5 xl:col-span-4 bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl flex flex-col justify-between gap-3">
            {PRAYER_NAMES.map((prayer) => {
              const isNext = prayer === nextPrayer;
              const timeString = timings[prayer];
              if (!timeString) return null;
              const displayTime = is24Hour ? timeString : format12Hour(timeString);
              const Icon = prayer === 'Maghrib' || prayer === 'Isha' || prayer === 'Fajr' ? Moon : Sun;

              return (
                <div 
                  key={prayer}
                  className={`relative overflow-hidden flex items-center justify-between p-4 sm:p-5 rounded-[2rem] transition-all duration-300 ${isNext ? 'bg-[#0d1a0f] text-white shadow-[0_10px_30px_rgba(13,26,15,0.2)] scale-[1.02] border border-[#d4843e]/30' : 'bg-white text-[#0d1a0f] hover:bg-[#faf8f5] hover:border-[#d4843e]/20 border border-[#0d1a0f]/5 shadow-sm'}`}
                >
                  {isNext && <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4843e]/20 blur-[25px] -mr-10 -mt-10 pointer-events-none"></div>}
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`p-2.5 rounded-xl ${isNext ? 'bg-white/10' : 'bg-[#faf8f5] shadow-inner'}`}>
                      <Icon className={`w-5 h-5 ${isNext ? 'text-[#d4843e]' : 'text-[#4a5e4d]'}`} />
                    </div>
                    <span className="font-extrabold text-lg tracking-tight">
                      {isArabic ? ARABIC_PRAYERS[prayer] : prayer}
                    </span>
                  </div>
                  <span className={`text-2xl sm:text-3xl font-black tracking-tight tabular-nums relative z-10 ${isNext ? 'text-[#d4843e]' : 'text-[#0d1a0f]'}`} dir="ltr">
                    {displayTime}
                  </span>
                </div>
              );
            })}

            {/* Subtle Sunrise Addition */}
            {timings.Sunrise && (
              <div className="flex items-center justify-between px-6 py-4 mt-2 border-t border-[#0d1a0f]/10 bg-white/50 rounded-[2rem]">
                <span className="flex items-center gap-2 text-xs font-bold text-[#4a5e4d] uppercase tracking-wider">
                  <Sunrise className="w-4 h-4" /> {t.sunrise}
                </span>
                <span className="text-base font-extrabold text-[#4a5e4d]" dir="ltr">
                  {is24Hour ? timings.Sunrise : format12Hour(timings.Sunrise)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ✨ PREMIUM CLEAN INSIGHT CARDS */}
        <h2 className="text-2xl font-extrabold tracking-tight text-[#0d1a0f] mb-8 flex items-center gap-3">
          <Globe className="w-6 h-6 text-[#d4843e]" /> {t.guideTitle}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#0d1a0f]/5 rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-[#faf8f5] border border-[#0d1a0f]/5 flex items-center justify-center mb-6 text-[#d4843e] group-hover:bg-[#d4843e] group-hover:text-white transition-all duration-300 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-[#0d1a0f] text-xl tracking-tight mb-3">{t.guide1Title}</h3>
            <p className="text-sm font-medium text-[#4a5e4d] leading-relaxed">{t.guide1Desc}</p>
          </div>

          <div className="bg-white border border-[#0d1a0f]/5 rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-[#faf8f5] border border-[#0d1a0f]/5 flex items-center justify-center mb-6 text-[#d4843e] group-hover:bg-[#d4843e] group-hover:text-white transition-all duration-300 shadow-inner">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-[#0d1a0f] text-xl tracking-tight mb-3">{t.guide2Title}</h3>
            <p className="text-sm font-medium text-[#4a5e4d] leading-relaxed">{t.guide2Desc}</p>
          </div>

          <div className="bg-white border border-[#0d1a0f]/5 rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-[#faf8f5] border border-[#0d1a0f]/5 flex items-center justify-center mb-6 text-[#d4843e] group-hover:bg-[#d4843e] group-hover:text-white transition-all duration-300 shadow-inner">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-[#0d1a0f] text-xl tracking-tight mb-3">{t.guide3Title}</h3>
            <p className="text-sm font-medium text-[#4a5e4d] leading-relaxed">{t.guide3Desc}</p>
          </div>
        </div>

      </div>
    </div>
  );
}