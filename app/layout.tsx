import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { decryptIntegrationSecret, readAdminStore } from "../lib/local-admin-store";
import { getSeoSettings } from "../lib/seo-settings";
import { IntegrationRuntime } from "./IntegrationRuntime";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600"] });
const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600"] });

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();
  const creator = seo.twitterHandle ? (seo.twitterHandle.startsWith("@") ? seo.twitterHandle : `@${seo.twitterHandle}`) : undefined;
  return {
    metadataBase: new URL(seo.siteUrl),
    icons: { icon: "/favicon.ico", apple: "/icon.png" },
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    alternates: { canonical: "/" },
    robots: { index: seo.indexable, follow: seo.indexable },
    openGraph: { title: seo.defaultTitle, description: seo.defaultDescription, type: "website", locale: "en_GB", siteName: seo.siteName, url: "/", images: [{ url: seo.socialImage, alt: seo.siteName }] },
    twitter: { card: "summary_large_image", title: seo.defaultTitle, description: seo.defaultDescription, ...(creator ? { creator } : {}), images: [seo.socialImage] },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const config:{ga4?:string;googleAds?:string;gtm?:string;metaPixel?:string;mapsKey?:string}={};
  try{for(const item of (await readAdminStore()).integrations.filter(item=>item.enabled)){const value=decryptIntegrationSecret(item.secretEncrypted);if(item.provider==="google-analytics")config.ga4=value;if(item.provider==="google-ads"){try{const ads=JSON.parse(value) as {id?:string;lead?:string;phone?:string;booking?:string};config.googleAds=JSON.stringify(ads)}catch{config.googleAds=value}}if(item.provider==="google-tag-manager")config.gtm=value;if(item.provider==="meta")config.metaPixel=value;if(item.provider==="google-maps")config.mapsKey=value}}catch{}
  return <html lang="en-GB"><body className={`${display.variable} ${sans.variable}`}>{children}<IntegrationRuntime config={config}/></body></html>;
}
