import { list, put } from "@vercel/blob";
import type { Metadata } from "next";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type SeoPageKey = "home" | "menu" | "privateHire" | "privacy";
export type SeoSettings = {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  socialImage: string;
  twitterHandle: string;
  indexable: boolean;
  pages: Record<SeoPageKey, { title: string; description: string }>;
};

export const defaultSeoSettings: SeoSettings = {
  siteName: "Yaz Restaurant",
  siteUrl: "https://www.yazrestaurant.co.uk",
  defaultTitle: "Turkish Restaurant in Highams Park, London | Yaz",
  defaultDescription: "Discover modern Turkish and Mediterranean dining at Yaz Restaurant in Highams Park. Breakfast, dinner, cocktails, private hire and reservations.",
  socialImage: "/og.png",
  twitterHandle: "",
  indexable: true,
  pages: {
    home: {
      title: "Turkish Restaurant in Highams Park, London | Yaz",
      description: "Discover modern Turkish and Mediterranean dining at Yaz Restaurant in Highams Park. Breakfast, dinner, cocktails, private hire and reservations.",
    },
    menu: {
      title: "Turkish & Mediterranean Menu in Highams Park | Yaz",
      description: "Explore charcoal grills, colourful meze, seafood and vegetarian dishes at Yaz Restaurant in Highams Park, London.",
    },
    privateHire: {
      title: "Private Hire & Party Venue in Highams Park | Yaz",
      description: "Host birthdays, engagements and work dinners for up to 200 guests at Yaz Restaurant, Highams Park. Bespoke menus, cocktail bar and heated balcony.",
    },
    privacy: {
      title: "Privacy Notice | Yaz Restaurant",
      description: "Read how Yaz Restaurant handles website enquiries, analytics choices and personal information.",
    },
  },
};

const blobPath = "site-config/seo-settings.json";
const localPath = path.join(process.cwd(), ".data", "seo-settings.json");

export function hasPersistentSeoStorage() {
  return process.env.VERCEL !== "1" || Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function getSeoSettings(): Promise<SeoSettings> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const result = await list({ prefix: blobPath, limit: 1 });
      const blob = result.blobs.find((entry) => entry.pathname === blobPath);
      if (!blob) return defaultSeoSettings;
      const response = await fetch(`${blob.url}?v=${blob.uploadedAt.getTime()}`, { cache: "no-store" });
      if (!response.ok) return defaultSeoSettings;
      return mergeSeoSettings(await response.json());
    } catch {
      return defaultSeoSettings;
    }
  }

  try {
    return mergeSeoSettings(JSON.parse(await readFile(localPath, "utf8")));
  } catch {
    return defaultSeoSettings;
  }
}

export async function saveSeoSettings(settings: SeoSettings) {
  const json = JSON.stringify(settings, null, 2);
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put(blobPath, json, { access: "public", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true, cacheControlMaxAge: 60 });
    return;
  }
  if (process.env.VERCEL === "1") throw new Error("Connect Vercel Blob to save SEO settings persistently on this deployment.");
  await mkdir(path.dirname(localPath), { recursive: true });
  await writeFile(localPath, `${json}\n`, "utf8");
}

export function validateSeoSettings(input: unknown): SeoSettings | null {
  if (!input || typeof input !== "object") return null;
  const source = input as Partial<SeoSettings>;
  const clean = mergeSeoSettings(source);
  const strings = [clean.siteName, clean.defaultTitle, clean.defaultDescription, ...Object.values(clean.pages).flatMap((page) => [page.title, page.description])];
  if (strings.some((value) => !value.trim())) return null;
  if (clean.siteName.length > 80 || clean.defaultTitle.length > 100 || clean.defaultDescription.length > 200) return null;
  if (Object.values(clean.pages).some((page) => page.title.length > 100 || page.description.length > 200)) return null;
  try {
    const url = new URL(clean.siteUrl);
    if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) return null;
    clean.siteUrl = url.origin;
  } catch {
    return null;
  }
  if (clean.socialImage.length > 500 || (clean.socialImage.startsWith("/") ? clean.socialImage.startsWith("//") : !/^https:\/\//i.test(clean.socialImage))) return null;
  if (clean.twitterHandle && !/^@?[A-Za-z0-9_]{1,15}$/.test(clean.twitterHandle)) return null;
  return clean;
}

function mergeSeoSettings(input: unknown): SeoSettings {
  const data = input && typeof input === "object" ? input as Partial<SeoSettings> : {};
  const pages: Partial<Record<SeoPageKey, Partial<SeoSettings["pages"][SeoPageKey]>>> = data.pages && typeof data.pages === "object" ? data.pages : {};
  const text = (value: unknown, fallback: string) => typeof value === "string" ? value : fallback;
  const page = (key: SeoPageKey) => {
    const value = pages[key] && typeof pages[key] === "object" ? pages[key] : {};
    return {
      title: text(value.title, defaultSeoSettings.pages[key].title),
      description: text(value.description, defaultSeoSettings.pages[key].description),
    };
  };
  return {
    ...defaultSeoSettings,
    siteName: text(data.siteName, defaultSeoSettings.siteName),
    siteUrl: text(data.siteUrl, defaultSeoSettings.siteUrl),
    defaultTitle: text(data.defaultTitle, defaultSeoSettings.defaultTitle),
    defaultDescription: text(data.defaultDescription, defaultSeoSettings.defaultDescription),
    socialImage: text(data.socialImage, defaultSeoSettings.socialImage),
    twitterHandle: text(data.twitterHandle, defaultSeoSettings.twitterHandle),
    indexable: typeof data.indexable === "boolean" ? data.indexable : defaultSeoSettings.indexable,
    pages: {
      home: page("home"),
      menu: page("menu"),
      privateHire: page("privateHire"),
      privacy: page("privacy"),
    },
  };
}

export function pageSeoMetadata(settings: SeoSettings, key: SeoPageKey, pathname: string): Metadata {
  const page = settings.pages[key];
  const image = settings.socialImage;
  const handle = settings.twitterHandle ? (settings.twitterHandle.startsWith("@") ? settings.twitterHandle : `@${settings.twitterHandle}`) : undefined;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: pathname },
    robots: { index: settings.indexable, follow: settings.indexable },
    openGraph: { title: page.title, description: page.description, type: "website", locale: "en_GB", siteName: settings.siteName, url: pathname, images: [{ url: image, alt: settings.siteName }] },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, ...(handle ? { creator: handle } : {}), images: [image] },
  };
}
