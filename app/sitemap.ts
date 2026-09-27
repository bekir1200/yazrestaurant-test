import type { MetadataRoute } from "next";
import { getSeoSettings } from "../lib/seo-settings";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (await getSeoSettings()).siteUrl.replace(/\/$/, "");
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/menu`, changeFrequency: "weekly", priority: .9 },
    { url: `${base}/private-hire`, changeFrequency: "monthly", priority: .8 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: .2 },
  ];
}
