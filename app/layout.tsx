import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB"><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>;
}
