import { desc } from "drizzle-orm";
import { getDb } from "../../db";
import { crmLeads } from "../../db/schema";
import { requireChatGPTUser } from "../chatgpt-auth";
import { CrmActions } from "./CrmActions";

export const dynamic = "force-dynamic";
export const metadata={robots:{index:false,follow:false,nocache:true}};

export default async function CrmPage() {
  const user = process.env.NODE_ENV === "production" ? await requireChatGPTUser("/crm") : { displayName: "Local administrator", email: "local-admin@yazrestaurant.co.uk" };
  const leads = await getDb().select().from(crmLeads).orderBy(desc(crmLeads.createdAt)).limit(100);
  return <main className="crm-shell"><header><div><p className="eyebrow">Yaz private hire</p><h1>Guest enquiries</h1></div><div className="crm-user">Signed in as<br/><strong>{user.displayName}</strong></div></header><section className="crm-summary"><div><strong>{leads.length}</strong><span>Active records</span></div><div><strong>{leads.filter(l=>l.status==="new").length}</strong><span>New enquiries</span></div><div><strong>{leads.filter(l=>l.marketingConsent).length}</strong><span>Marketing opt-ins</span></div><div><strong>{leads.filter(l=>l.processingRestricted).length}</strong><span>Restricted</span></div></section><section className="crm-table-wrap"><table><thead><tr><th>Guest</th><th>Event</th><th>Contact</th><th>Privacy</th><th>Retention</th><th>Action</th></tr></thead><tbody>{leads.map(lead=><tr key={lead.id}><td><strong>{lead.name}</strong><small>{lead.createdAt}</small></td><td>{lead.eventType}<small>{lead.eventDate || "Date not set"} · {lead.guests ?? "?"} guests</small></td><td><a href={`mailto:${lead.email}`}>{lead.email}</a><small>{lead.phone || "No phone"}</small></td><td><span className={lead.marketingConsent ? "consent-yes" : "consent-no"}>{lead.marketingConsent ? "Email opt-in" : "Service only"}</span>{lead.processingRestricted && <small>Processing restricted</small>}</td><td>{lead.retentionUntil}</td><td><CrmActions id={lead.id} status={lead.status} restricted={lead.processingRestricted}/></td></tr>)}</tbody></table>{!leads.length&&<p className="empty">No enquiries yet. New private-hire forms will appear here.</p>}</section><footer className="crm-foot"><a href="/">← Restaurant site</a><a href="/privacy">Privacy notice</a></footer></main>;
}
