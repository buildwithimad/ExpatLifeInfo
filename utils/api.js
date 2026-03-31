// Fetches prayer times from Aladhan API using just the city name
export async function getPrayerTimes(city) {
  try {
    const res = await fetch(
      `https://api.aladhan.com/v1/timingsByAddress?address=${encodeURIComponent(city)}`,
      { next: { revalidate: 3600 } } // ISR: Revalidate every hour
    );

    if (!res.ok) throw new Error('Failed to fetch data');
    
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}