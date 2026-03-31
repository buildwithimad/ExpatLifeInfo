import { getPrayerTimes } from '@/utils/api';
import PrayerDashboard from '@/components/Prayer/PrayerDashboard';

// ✅ ENABLE ISR: Revalidate this page every hour (3600 seconds)
export const revalidate = 3600;

// SEO Metadata for default page
export const metadata = {
  title: 'Prayer Times in Riyadh - Today Salah Times',
  description: 'Accurate prayer times in Riyadh including Fajr, Dhuhr, Asr, Maghrib, and Isha. Modern real-time tracker.',
};

export default async function PrayerTimesIndex({ params }) {
  const resolvedParams = await params;
  // Safely grab language if you are using [lang] in the route, otherwise default to 'en'
  const lang = resolvedParams?.lang || 'en'; 
  const defaultCity = 'Riyadh';
  
  const data = await getPrayerTimes(defaultCity);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#faf8f5] text-[#4a5e4d] font-semibold">
        Failed to load prayer times. Please try again later.
      </div>
    );
  }

  return <PrayerDashboard prayerData={data} city={defaultCity} lang={lang} />;
}