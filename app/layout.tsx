import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { decryptIntegrationSecret, readAdminStore } from "../lib/local-admin-store";
import { IntegrationRuntime } from "./IntegrationRuntime";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600"] });
const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yazrestaurant.co.uk"),
  title: "Turkish Restaurant in Highams Park, London | Yaz",
  description: "Discover modern Turkish and Mediterranean dining at Yaz Restaurant in Highams Park. Breakfast, dinner, cocktails, private hire and reservations.",
  alternates: { canonical: "/" },
  openGraph: { title: "Yaz Restaurant | Mediterranean soul. London energy.", description: "Modern Turkish and Mediterranean dining in Highams Park, London.", type: "website", locale: "en_GB", url: "/", images: [{ url: "/og.png", width: 1734, height: 909, alt: "Yaz Restaurant — Mediterranean soul. London energy." }] },
  twitter: { card: "summary_large_image", title: "Yaz Restaurant, Highams Park", description: "Modern Turkish and Mediterranean dining in London.", images: ["/og.png"] },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const config:{ga4?:string;googleAds?:string;gtm?:string;metaPixel?:string;mapsKey?:string}={};
  try{for(const item of (await readAdminStore()).integrations.filter(item=>item.enabled)){const value=decryptIntegrationSecret(item.secretEncrypted);if(item.provider==="google-analytics")config.ga4=value;if(item.provider==="google-ads"){try{const ads=JSON.parse(value) as {id?:string;lead?:string;phone?:string;booking?:string};config.googleAds=JSON.stringify(ads)}catch{config.googleAds=value}}if(item.provider==="google-tag-manager")config.gtm=value;if(item.provider==="meta")config.metaPixel=value;if(item.provider==="google-maps")config.mapsKey=value}}catch{}
  return <html lang="en-GB"><body className={`${display.variable} ${sans.variable}`}>{children}<IntegrationRuntime config={config}/></body></html>;
}
