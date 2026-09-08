import { eq } from "drizzle-orm";
import { getDb } from "../../../../../db";
import { crmAuditLog, crmLeads } from "../../../../../db/schema";
import { getChatGPTUser } from "../../../../chatgpt-auth";

async function authorised() { const user = await getChatGPTUser(); return user ?? (process.env.NODE_ENV !== "production" ? { email: "local-admin@yazrestaurant.co.uk" } : null); }

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await authorised(); if (!user) return Response.json({ error: "Unauthorised" }, { status: 401 });
  const { id } = await context.params; const leadId = Number(id); const body = await request.json() as { status?: string; restricted?: boolean };
  const allowed = ["new", "contacted", "viewing", "quoted", "booked", "closed"];
  const values: { status?: string; processingRestricted?: boolean; updatedAt: string } = { updatedAt: new Date().toISOString() };
  if (body.status && allowed.includes(body.status)) values.status = body.status;
  if (typeof body.restricted === "boolean") values.processingRestricted = body.restricted;
  await getDb().update(crmLeads).set(values).where(eq(crmLeads.id, leadId));
  await getDb().insert(crmAuditLog).values({ leadId, actorEmail: user.email, action: "lead.updated", detail: JSON.stringify(values) });
  return Response.json({ ok: true });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await authorised(); if (!user) return Response.json({ error: "Unauthorised" }, { status: 401 });
  const { id } = await context.params; const leadId = Number(id);
  await getDb().insert(crmAuditLog).values({ leadId, actorEmail: user.email, action: "lead.erased", detail: "Erasure action completed" });
  await getDb().delete(crmLeads).where(eq(crmLeads.id, leadId));
  return Response.json({ ok: true });
}
