"use client";
import { useState } from "react";

export function GoogleMap({ apiKey }: { apiKey: string }) {
  const [loaded, setLoaded] = useState(false);
  if (!apiKey) return null;
  return <div className="google-map-embed">{loaded ? <iframe title="Yaz Restaurant on Google Maps" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" src={`https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(apiKey)}&q=${encodeURIComponent("Yaz Restaurant, 7-9 Signal Walk, Highams Park, London E4 9BW")}`}/> : <button onClick={() => setLoaded(true)}>Load Google map</button>}</div>;
}
