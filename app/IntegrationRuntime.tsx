"use client";
import { useEffect, useState } from "react";

type TrackingConfig = { ga4?: string; googleAds?: string; gtm?: string; metaPixel?: string };
type AdsConfig = { id?: string; lead?: string; phone?: string; booking?: string };
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[][]; loaded?: boolean; version?: string };
    yazTrack?: (name: string, params?: Record<string, unknown>) => void;
  }
}

const consentKey = "yaz_cookie_consent";
function loadScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const node = document.createElement("script"); node.id = id; node.async = true; node.src = src; document.head.appendChild(node);
}

export function IntegrationRuntime({ config }: { config: TrackingConfig }) {
  const [choice, setChoice] = useState<"accepted" | "rejected" | null>(null);

  useEffect(() => {
    setChoice(localStorage.getItem(consentKey) as "accepted" | "rejected" | null);
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function (...args: unknown[]) { window.dataLayer.push(args); };
    window.gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" });
  }, []);

  useEffect(() => {
    if (choice !== "accepted") return;
    window.gtag("consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" });
    if (config.gtm) { window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" }); loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(config.gtm)}`, "yaz-gtm"); }
    let ads: AdsConfig = {};
    try { ads = JSON.parse(config.googleAds || "{}"); } catch { ads.id = config.googleAds?.split("/")[0]; }
    const googleId = config.ga4 || ads.id;
    if (googleId) {
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleId)}`, "yaz-google-tag");
      window.gtag("js", new Date());
      if (config.ga4) window.gtag("config", config.ga4);
      if (ads.id) window.gtag("config", ads.id);
    }
    if (config.metaPixel) {
      const queue: unknown[][] = [];
      const fbq = function (...args: unknown[]) { queue.push(args); } as NonNullable<Window["fbq"]>;
      fbq.queue = queue; fbq.loaded = true; fbq.version = "2.0"; window.fbq = fbq;
      loadScript("https://connect.facebook.net/en_US/fbevents.js", "yaz-meta-pixel"); fbq("init", config.metaPixel); fbq("track", "PageView");
    }
    window.yazTrack = (name, params = {}) => {
      window.dataLayer.push({ event: name, ...params }); window.gtag("event", name, params);
      const label = name === "generate_lead" ? ads.lead : name === "phone_call_click" ? ads.phone : name === "booking_start" ? ads.booking : undefined;
      if (ads.id && label) window.gtag("event", "conversion", { send_to: `${ads.id}/${label}` });
      if (name === "generate_lead") window.fbq?.("track", "Lead");
    };
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest("a") as HTMLAnchorElement | null;
      if (link?.href.startsWith("tel:")) window.yazTrack?.("phone_call_click");
      if (link?.hash === "#book") window.yazTrack?.("booking_click");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [choice, config]);

  function decide(next: "accepted" | "rejected") { localStorage.setItem(consentKey, next); setChoice(next); }
  if (choice !== null) return <button className="cookie-settings" onClick={() => { localStorage.removeItem(consentKey); setChoice(null); }}>Cookie settings</button>;
  return <aside className="cookie-banner" aria-label="Cookie preferences"><div><strong>Cookie preferences</strong><p>We use optional analytics and advertising cookies to measure visits and enquiries. You can accept or reject them.</p><a href="/privacy">Privacy notice</a></div><div><button onClick={() => decide("rejected")}>Reject optional</button><button className="accept" onClick={() => decide("accepted")}>Accept all</button></div></aside>;
}
