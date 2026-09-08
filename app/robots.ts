import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/crm", "/api/"] }],
    sitemap: "https://www.yazrestaurant.co.uk/sitemap.xml",
    host: "https://www.yazrestaurant.co.uk",
  };
}
