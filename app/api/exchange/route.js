import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 💱 Fetch latest rates base USD
    const exchangeRes = await fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/USD`,
      { next: { revalidate: 3600 } } // Revalidate every hour to save API quota
    );

    if (!exchangeRes.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const exchangeData = await exchangeRes.json();

    return NextResponse.json({
      success: true,
      rates: exchangeData.conversion_rates,
      lastUpdate: exchangeData.time_last_update_unix
    });

  } catch (err) {
    return NextResponse.json({ success: false, error: "API failed" }, { status: 500 });
  }
}