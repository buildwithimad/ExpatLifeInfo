import GoldDashboard from "@/components/Gold/GoldDashboard";

async function getData() {
  // Use absolute URL for server-side fetch in Next.js
  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL_DEV || "http://localhost:3000";
  const res = await fetch(`${apiUrl}/api/gold`, {
    next: { revalidate: 300 },
  });
  
  if (!res.ok) return null;
  return res.json();
}

export default async function GoldPage({ params }) {
  const { lang } = await params;
  const data = await getData();

  console.log("Gold Page Data:", data); // Debug log
  

  if (!data || !data.gold?.rates || !data.exchange?.conversion_rates) {
    return (
      <div className="p-6 max-w-6xl mx-auto border border-red-200 bg-red-50 text-red-600 rounded-md mt-10">
        Loading or API Error. Please try again later.
      </div>
    );
  }

  return <GoldDashboard data={data} lang={lang} />;
}