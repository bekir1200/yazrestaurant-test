import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.yazrestaurant.co.uk";
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/menu`, changeFrequency: "weekly", priority: .9 },
    { url: `${base}/private-hire`, changeFrequency: "monthly", priority: .8 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: .2 },
  ];
}
