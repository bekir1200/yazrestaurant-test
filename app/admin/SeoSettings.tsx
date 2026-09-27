"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { SeoPageKey, SeoSettings } from "../../lib/seo-settings";

const pages: { key: SeoPageKey; label: string; path: string }[] = [
  { key: "home", label: "Homepage", path: "/" },
  { key: "menu", label: "Menu", path: "/menu" },
  { key: "privateHire", label: "Private hire", path: "/private-hire" },
  { key: "privacy", label: "Privacy", path: "/privacy" },
];

export function SeoSettingsPanel() {
  const [settings, setSettings] = useState<SeoSettings | null>(null);
  const [storageReady, setStorageReady] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    fetch("/api/admin/seo", { cache: "no-store" }).then(async (response) => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not load SEO settings.");
      setSettings(result.settings);
      setStorageReady(result.storageReady);
    }).catch((error: unknown) => setNotice(error instanceof Error ? error.message : "Could not load SEO settings.")).finally(() => setLoading(false));
  }, []);

  function update<K extends keyof SeoSettings>(key: K, value: SeoSettings[K]) {
    setSettings((current) => current ? { ...current, [key]: value } : current);
  }

  function updatePage(key: SeoPageKey, field: "title" | "description", value: string) {
    setSettings((current) => current ? { ...current, pages: { ...current.pages, [key]: { ...current.pages[key], [field]: value } } } : current);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!settings || !storageReady) return;
    setSaving(true); setNotice("");
    try {
      const response = await fetch("/api/admin/seo", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(settings) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save SEO settings.");
      setSettings(result.settings); setStorageReady(result.storageReady); setNotice("SEO settings saved. Public page metadata will use the new values.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not save SEO settings.");
    } finally { setSaving(false); }
  }

  return <section className="seo-admin">
    <header className="seo-admin-heading"><div><p>Website · Search visibility</p><h1>SEO settings</h1><span>Edit how Yaz appears in Google and social previews.</span></div></header>
    {!storageReady && <div className="seo-storage-warning" role="status"><strong>Persistent storage is not connected.</strong><span>SEO edits cannot be saved on this Vercel deployment until Vercel Blob is connected. Local and VDS installs save to the server's persistent data folder.</span></div>}
    {loading ? <p className="seo-notice">Loading SEO settings…</p> : settings ? <form className="seo-admin-form" onSubmit={save}>
      <section className="seo-fields-card">
        <header><h2>Site-wide details</h2><p>Used as defaults, in social cards and in search-engine files.</p></header>
        <label>Business / site name<input required maxLength={80} value={settings.siteName} onChange={(event) => update("siteName", event.target.value)} /></label>
        <label>Canonical site URL<input required type="url" maxLength={200} value={settings.siteUrl} onChange={(event) => update("siteUrl", event.target.value)} /><small>Use the preferred HTTPS domain, with no page path. This also sets sitemap and canonical link URLs.</small></label>
        <label>Default page title<input required maxLength={100} value={settings.defaultTitle} onChange={(event) => update("defaultTitle", event.target.value)} /><small>{settings.defaultTitle.length}/100 characters</small></label>
        <label>Default search description<textarea required maxLength={200} rows={3} value={settings.defaultDescription} onChange={(event) => update("defaultDescription", event.target.value)} /><small>{settings.defaultDescription.length}/200 characters</small></label>
        <label>Social sharing image URL<input required maxLength={500} value={settings.socialImage} onChange={(event) => update("socialImage", event.target.value)} /><small>Use a site path such as /og.png or a public HTTPS image URL.</small></label>
        <label>Instagram / X handle<input maxLength={16} value={settings.twitterHandle} onChange={(event) => update("twitterHandle", event.target.value)} placeholder="@yazrestaurant_uk" /><small>Optional. Used as the social-card creator where supported.</small></label>
        <label className="seo-index-toggle"><input type="checkbox" checked={settings.indexable} onChange={(event) => update("indexable", event.target.checked)} /><span><strong>Allow search engines to index the public site</strong><small>Turn off for a staging site. Admin, CRM and API paths remain excluded.</small></span></label>
      </section>

      <section className="seo-fields-card seo-page-fields">
        <header><h2>Page titles & descriptions</h2><p>These values override the site-wide defaults for each public page.</p></header>
        {pages.map((page) => <fieldset key={page.key}>
          <legend>{page.label} <code>{page.path}</code></legend>
          <label>Page title<input required maxLength={100} value={settings.pages[page.key].title} onChange={(event) => updatePage(page.key, "title", event.target.value)} /><small>{settings.pages[page.key].title.length}/100 characters</small></label>
          <label>Search description<textarea required maxLength={200} rows={3} value={settings.pages[page.key].description} onChange={(event) => updatePage(page.key, "description", event.target.value)} /><small>{settings.pages[page.key].description.length}/200 characters</small></label>
          <article className="seo-result-preview"><small>{settings.siteUrl.replace(/\/$/, "")}{page.path}</small><strong>{settings.pages[page.key].title || "Page title preview"}</strong><span>{settings.pages[page.key].description || "Page description preview"}</span></article>
        </fieldset>)}
      </section>
      <div className="seo-save-row"><span className="seo-notice" aria-live="polite">{notice}</span><button type="submit" disabled={saving || !storageReady}>{saving ? "Saving…" : "Save SEO settings"}</button></div>
    </form> : <p className="seo-notice" role="alert">{notice || "SEO settings are unavailable."}</p>}
  </section>;
}
