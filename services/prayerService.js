/**
 * Prayer Times Service
 * Fetches prayer times from Aladhan API
 */

const ALADHAN_API_BASE = 'https://api.aladhan.com/v1/timingsByCity';

/**
 * Fetch prayer times for a given city
 * @param {string} city - City name (e.g., "riyadh", "mecca", "jeddah")
 * @returns {Promise<Object>} - Prayer times data
 */
export async function fetchPrayerTimes(city) {
  if (!city || city.trim() === '') {
    throw new Error('City name is required');
  }

  // Format city name - capitalize first letter for better API recognition
  const formattedCity = city.trim().split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  const encodedCity = encodeURIComponent(formattedCity);
  const url = `${ALADHAN_API_BASE}?city=${encodedCity}&country=Saudi Arabia`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // ISR: Revalidate every hour
    });

    // Try to parse response even if not OK (API might return error details in body)
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error(`Failed to fetch prayer times: ${response.status}`);
    }

    // Check for API-level errors
    if (data.status !== 200 && data.status !== 'OK') {
      const errorMessage = data.data?.message || data.message || 'Invalid API response';
      throw new Error(errorMessage);
    }

    // Handle case where city is not found
    if (data.data?.timings && Object.keys(data.data.timings).length === 0) {
      throw new Error(`City "${city}" not found. Please check the spelling.`);
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    throw error;
  }
}

/**
 * Get timing for a specific prayer
 * @param {Object} timings - Full timings object from API
 * @param {string} prayer - Prayer name (Fajr, Dhuhr, Asr, Maghrib, Isha)
 * @returns {string} - Time string
 */
export function getPrayerTiming(timings, prayer) {
  const timingMap = {
    'Fajr': timings.Fajr,
    'Dhuhr': timings.Dhuhr,
    'Asr': timings.Asr,
    'Maghrib': timings.Maghrib,
    'Isha': timings.Isha,
  };

  return timingMap[prayer] || null;
}

/**
 * Get all prayer times as an array
 * @param {Object} timings - Full timings object from API
 * @returns {Array} - Array of prayer time objects
 */
export function getAllPrayerTimes(timings) {
  return [
    { name: 'Fajr', nameAr: 'الفجر', time: timings.Fajr },
    { name: 'Dhuhr', nameAr: 'الظهر', time: timings.Dhuhr },
    { name: 'Asr', nameAr: 'العصر', time: timings.Asr },
    { name: 'Maghrib', nameAr: 'المغرب', time: timings.Maghrib },
    { name: 'Isha', nameAr: 'العشاء', time: timings.Isha },
  ];
}

/**
 * Convert 24-hour time to 12-hour format
 * @param {string} time24 - Time in 24-hour format (HH:mm:ss)
 * @returns {string} - Time in 12-hour format (h:mm a)
 */
export function convertTo12Hour(time24) {
  if (!time24) return '';
  
  const [hours, minutes] = time24.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  
  return `${h12}:${minutes} ${ampm}`;
}

/**
 * Format time for display (24-hour)
 * @param {string} time24 - Time in 24-hour format
 * @returns {string} - Formatted time (HH:mm)
 */
export function formatTime24(time24) {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':');
  return `${hours}:${minutes}`;
}

/**
 * Find the next upcoming prayer
 * @param {Array} prayerTimes - Array of prayer time objects
 * @returns {Object} - Next prayer object
 */
export function getNextPrayer(prayerTimes) {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  for (const prayer of prayerTimes) {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    const prayerTime = hours * 60 + minutes;

    if (prayerTime > currentTime) {
      return prayer;
    }
  }

  // If all prayers have passed, return Fajr (next day)
  return prayerTimes[0];
}

/**
 * Calculate countdown to next prayer
 * @param {string} prayerTime - Prayer time in HH:mm:ss format
 * @returns {Object} - Countdown object with hours, minutes, seconds
 */
export function getCountdown(prayerTime) {
  if (!prayerTime) return null;

  const now = new Date();
  const [hours, minutes, seconds] = prayerTime.split(':').map(Number);

  const prayerDate = new Date(now);
  prayerDate.setHours(hours, minutes, seconds, 0);

  // If prayer time has passed today, assume tomorrow
  if (prayerDate <= now) {
    prayerDate.setDate(prayerDate.getDate() + 1);
  }

  const diff = prayerDate - now;
  const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
  const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    hours: hoursLeft,
    minutes: minutesLeft,
    seconds: secondsLeft,
    total: diff,
  };
}
