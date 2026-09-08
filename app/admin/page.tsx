import { env } from "cloudflare:workers";
import { asc, count } from "drizzle-orm";
import { getDb } from "../../db";
import { apiIntegrations, crmLeads, siteRecords } from "../../db/schema";
import { requireChatGPTUser } from "../chatgpt-auth";
import { AdminConsole } from "./AdminConsole";
export const metadata={robots:{index:false,follow:false,nocache:true}};
export const dynamic="force-dynamic";
export default async function AdminPage(){if(process.env.NODE_ENV==="production")await requireChatGPTUser("/admin");await env.DB.prepare(`CREATE TABLE IF NOT EXISTS api_integrations (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, provider text NOT NULL, label text NOT NULL, base_url text DEFAULT '' NOT NULL, secret_encrypted text NOT NULL, secret_hint text DEFAULT '' NOT NULL, enabled integer DEFAULT true NOT NULL, created_at text DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at text DEFAULT CURRENT_TIMESTAMP NOT NULL)`).run();const records=await getDb().select().from(siteRecords).orderBy(asc(siteRecords.position));const integrations=await getDb().select({id:apiIntegrations.id,provider:apiIntegrations.provider,label:apiIntegrations.label,baseUrl:apiIntegrations.baseUrl,secretHint:apiIntegrations.secretHint,enabled:apiIntegrations.enabled,updatedAt:apiIntegrations.updatedAt}).from(apiIntegrations).orderBy(asc(apiIntegrations.label));const [{value:leadCount}]=await getDb().select({value:count()}).from(crmLeads);return <AdminConsole initialRecords={records} initialIntegrations={integrations} leadCount={leadCount}/>}
