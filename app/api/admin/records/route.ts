import { asc, eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { crmAuditLog, siteRecords } from "../../../../db/schema";
import { getChatGPTUser } from "../../../chatgpt-auth";

async function admin() { return await getChatGPTUser() ?? (process.env.NODE_ENV !== "production" ? { email: "local-admin@yazrestaurant.co.uk" } : null); }
const types = ["content", "menu", "event", "review"];

export async function GET() {
  if (!await admin()) return Response.json({ error: "Unauthorised" }, { status: 401 });
  return Response.json({ records: await getDb().select().from(siteRecords).orderBy(asc(siteRecords.type), asc(siteRecords.position), asc(siteRecords.id)) });
}

export async function POST(request: Request) {
  const user = await admin(); if (!user) return Response.json({ error: "Unauthorised" }, { status: 401 });
  const body = await request.json() as Record<string, unknown>;
  const type = String(body.type ?? ""); const title = String(body.title ?? "").trim();
  if (!types.includes(type) || !title || title.length > 180) return Response.json({ error: "Invalid record" }, { status: 400 });
  const [record] = await getDb().insert(siteRecords).values({ type, title, subtitle: String(body.subtitle ?? "").slice(0, 300), body: String(body.body ?? "").slice(0, 3000), metadata: JSON.stringify(body.metadata ?? {}), position: Number(body.position ?? 0), active: body.active !== false }).returning();
  await getDb().insert(crmAuditLog).values({ actorEmail: user.email, action: `${type}.created`, detail: `Record ${record.id}: ${title}` });
  return Response.json({ record }, { status: 201 });
}

export async function PATCH(request: Request) {
  const user = await admin(); if (!user) return Response.json({ error: "Unauthorised" }, { status: 401 });
  const body = await request.json() as Record<string, unknown>; const id = Number(body.id);
  if (!id) return Response.json({ error: "Invalid id" }, { status: 400 });
  const values = { title: String(body.title ?? "").trim().slice(0, 180), subtitle: String(body.subtitle ?? "").slice(0, 300), body: String(body.body ?? "").slice(0, 3000), metadata: JSON.stringify(body.metadata ?? {}), position: Number(body.position ?? 0), active: body.active !== false, updatedAt: new Date().toISOString() };
  await getDb().update(siteRecords).set(values).where(eq(siteRecords.id, id));
  await getDb().insert(crmAuditLog).values({ actorEmail: user.email, action: "record.updated", detail: `Record ${id}` });
  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  const user = await admin(); if (!user) return Response.json({ error: "Unauthorised" }, { status: 401 });
  const id = Number(new URL(request.url).searchParams.get("id")); if (!id) return Response.json({ error: "Invalid id" }, { status: 400 });
  await getDb().delete(siteRecords).where(eq(siteRecords.id, id));
  await getDb().insert(crmAuditLog).values({ actorEmail: user.email, action: "record.deleted", detail: `Record ${id}` });
  return Response.json({ ok: true });
}
