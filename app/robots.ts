import type { MetadataRoute } from "next";
import { getSeoSettings } from "../lib/seo-settings";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { siteUrl, indexable } = await getSeoSettings();
  const base = siteUrl.replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", ...(indexable ? { allow: "/", disallow: ["/admin", "/crm", "/api/"] } : { disallow: ["/", "/admin", "/crm", "/api/"] }) }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
