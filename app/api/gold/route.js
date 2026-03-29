export async function GET() {
  try {
    // ✅ ONLY latest (free plan works)
    const goldRes = await fetch(
      `https://api.metalpriceapi.com/v1/latest?api_key=${process.env.METAL_API_KEY}&base=USD&currencies=XAU`,
      { next: { revalidate: 300 } }
    );

    const goldData = await goldRes.json();

    const exchangeRes = await fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/USD`,
      { next: { revalidate: 300 } }
    );

    const exchangeData = await exchangeRes.json();

    return Response.json({
      gold: goldData,
      exchange: exchangeData,
    });

  } catch (err) {
    console.log("API ERROR:", err);
    return Response.json({ error: "API failed" }, { status: 500 });
  }
}