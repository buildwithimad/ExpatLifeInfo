import ExchangeDashboard from "@/components/ExchangeRates/ExchangeRateDashboard";

async function getExchangeData() {
   const apiUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SITE_URL_DEV
    : process.env.NEXT_PUBLIC_SITE_URL;
  try {
    const res = await fetch(`${apiUrl}/api/exchange`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function ExchangeRatesPage({ params }) {
  const data = await getExchangeData();
  const { lang } = await params;
  
  return <ExchangeDashboard data={data} lang={lang} />;
}