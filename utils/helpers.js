// Converts 24h format (15:30) to 12h format (03:30 PM)
export function format12Hour(time24) {
  let [hours, minutes] = time24.split(':');
  hours = parseInt(hours, 10);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours.toString().padStart(2, '0')}:${minutes} ${suffix}`;
}

// Calculates time difference in seconds for the countdown
export function getSecondsUntil(targetTime24) {
  const now = new Date();
  const [targetHours, targetMinutes] = targetTime24.split(':').map(Number);
  
  const targetDate = new Date(now);
  targetDate.setHours(targetHours, targetMinutes, 0, 0);

  // If target time has passed today, move to tomorrow
  if (targetDate < now) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  return Math.floor((targetDate - now) / 1000);
}