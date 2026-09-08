import { desc } from "drizzle-orm";
import { getDb } from "../../../../db";
import { crmAuditLog, crmLeads } from "../../../../db/schema";
import { getChatGPTUser } from "../../../chatgpt-auth";

export async function GET() {
  const user = await getChatGPTUser();
  if (!user && process.env.NODE_ENV === "production") return Response.json({ error: "Unauthorised" }, { status: 401 });
  const leads = await getDb().select().from(crmLeads).orderBy(desc(crmLeads.createdAt)).limit(100);
  return Response.json({ leads });
}

export async function POST(request: Request) {
  const body = await request.json() as Record<string, string>;
  const name = body.name?.trim(); const email = body.email?.trim().toLowerCase(); const eventType = body.eventType?.trim();
  if (!name || !email || !eventType || name.length > 120 || email.length > 254) return Response.json({ error: "Invalid enquiry" }, { status: 400 });
  const marketingConsent = body.marketingConsent === "yes";
  const retentionUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const [lead] = await getDb().insert(crmLeads).values({ name, email, phone: body.phone?.trim().slice(0, 40) ?? "", eventType, eventDate: body.eventDate ?? "", guests: body.guests ? Math.min(200, Math.max(1, Number(body.guests))) : null, message: body.message?.trim().slice(0, 1500) ?? "", marketingConsent, consentRecordedAt: marketingConsent ? new Date().toISOString() : null, consentTextVersion: marketingConsent ? "marketing-email-v1" : null, retentionUntil }).returning();
  await getDb().insert(crmAuditLog).values({ leadId: lead.id, actorEmail: "public-form", action: "lead.created", detail: marketingConsent ? "Marketing consent recorded" : "No marketing consent" });
  return Response.json({ ok: true }, { status: 201 });
}
