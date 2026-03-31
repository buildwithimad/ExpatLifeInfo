import { getPrayerTimes } from '@/utils/api'; 
import PrayerDashboard from '@/components/Prayer/PrayerDashboard';

// ✅ 1. ENABLE ISR: Revalidate this page every hour (3600 seconds)
export const revalidate = 3600;

// ✅ 2. PRE-RENDER TOP CITIES: Builds HTML for these cities instantly for maximum SEO.
// Other searched cities will still work, they'll just be generated on first visit, then cached!
export async function generateStaticParams() {
  const popularCities = ['Riyadh', 'Mecca', 'Medina', 'Dubai', 'London', 'New York'];
  const languages = ['en', 'ar']; // Assuming you have bilingual routing
  
  const params = [];
  for (const lang of languages) {
    for (const city of popularCities) {
      params.push({ lang, city });
    }
  }
  return params;
}

// Generate SEO Metadata dynamically
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const city = decodeURIComponent(resolvedParams.city || 'Riyadh');
  const lang = resolvedParams.lang || 'en';
  
  return {
    title: lang === 'ar' ? `مواقيت الصلاة في ${city} - اليوم` : `Prayer Times in ${city} - Today Salah Times`,
    description: lang === 'ar' 
      ? `مواقيت الصلاة الدقيقة في ${city} بما في ذلك الفجر، الظهر، العصر، المغرب، والعشاء. يتم التحديث يومياً.`
      : `Accurate prayer times in ${city} including Fajr, Dhuhr, Asr, Maghrib, and Isha. Updated daily.`,
  };
}

export default async function CityPrayerTimes({ params }) {
  const resolvedParams = await params;
  const city = decodeURIComponent(resolvedParams.city || 'Riyadh');
  const lang = resolvedParams.lang || 'en';
  
  const data = await getPrayerTimes(city);

  if (!data) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#faf8f5] space-y-4">
        <h2 className="text-2xl font-semibold text-[#0d1a0f]">
          {lang === 'ar' ? 'لم يتم العثور على المدينة' : 'City not found'}
        </h2>
      </div>
    );
  }

  return <PrayerDashboard prayerData={data} city={city} lang={lang} />;
}