import { requestHasAdminSession } from "../../../../lib/admin-auth";
import { getSeoSettings, hasPersistentSeoStorage, saveSeoSettings, validateSeoSettings } from "../../../../lib/seo-settings";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!requestHasAdminSession(request)) return Response.json({ error: "Unauthorised" }, { status: 401 });
  return Response.json({ settings: await getSeoSettings(), storageReady: hasPersistentSeoStorage() }, { headers: { "cache-control": "no-store" } });
}

export async function PUT(request: Request) {
  if (!requestHasAdminSession(request)) return Response.json({ error: "Unauthorised" }, { status: 401 });
  let input: unknown;
  try { input = await request.json(); } catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }
  const settings = validateSeoSettings(input);
  if (!settings) return Response.json({ error: "Check the SEO fields, URL and character limits." }, { status: 400 });
  try {
    await saveSeoSettings(settings);
    return Response.json({ settings, storageReady: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save SEO settings.";
    return Response.json({ error: message || "Could not save SEO settings." }, { status: 503 });
  }
}
