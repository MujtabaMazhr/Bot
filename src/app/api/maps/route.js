import { NextResponse } from "next/server";

export async function POST(req) {
  const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
  };
  const { from, to } = await req.json();
  console.log("From: ",from);console.log("To: ",to);
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${from.lng},${from.lat};${to.lng},${to.lat}?geometries=geojson&access_token=pk.eyJ1IjoibXVqdGFiYS1tYXpoYXItNSIsImEiOiJjbWlveThvY2EwMGtnM2ZzY3VxMmNqeDY4In0.QSMDCw0eb1S6h63hHemZ0A`;
  const res = await fetch(url);
  const data = await res.json();
  return Response.json(data);
}
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const lng = searchParams.get("lng");
  const lat = searchParams.get("lat");

  // Reverse geocode to get country
  const countryURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=country&access_token=pk.eyJ1IjoibXVqdGFiYS1tYXpoYXItNSIsImEiOiJjbWlveThvY2EwMGtnM2ZzY3VxMmNqeDY4In0.QSMDCw0eb1S6h63hHemZ0A`;
  const countryRes = await fetch(countryURL);
  const countryData = await countryRes.json();
  const countryCode = countryData.features?.[0]?.properties?.short_code; // pk, us, ca, au

  // Now perform the search with country priority
  const searchURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?country=${countryCode}&proximity=${lng},${lat}&access_token=pk.eyJ1IjoibXVqdGFiYS1tYXpoYXItNSIsImEiOiJjbWlveThvY2EwMGtnM2ZzY3VxMmNqeDY4In0.QSMDCw0eb1S6h63hHemZ0A`;

  const res = await fetch(searchURL);
  const data = await res.json();

  return Response.json({ message: data });
}

export async function OPTIONS(){
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}