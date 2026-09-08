import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const crmLeads = sqliteTable("crm_leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  eventType: text("event_type").notNull(),
  eventDate: text("event_date").notNull().default(""),
  guests: integer("guests"),
  message: text("message").notNull().default(""),
  status: text("status").notNull().default("new"),
  marketingConsent: integer("marketing_consent", { mode: "boolean" }).notNull().default(false),
  consentRecordedAt: text("consent_recorded_at"),
  consentTextVersion: text("consent_text_version"),
  privacyNoticeVersion: text("privacy_notice_version").notNull().default("2026-09-03"),
  processingRestricted: integer("processing_restricted", { mode: "boolean" }).notNull().default(false),
  retentionUntil: text("retention_until").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const crmAuditLog = sqliteTable("crm_audit_log", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  leadId: integer("lead_id"),
  actorEmail: text("actor_email").notNull(),
  action: text("action").notNull(),
  detail: text("detail").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const siteRecords = sqliteTable("site_records", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type").notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull().default(""),
  body: text("body").notNull().default(""),
  metadata: text("metadata").notNull().default("{}"),
  position: integer("position").notNull().default(0),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const apiIntegrations = sqliteTable("api_integrations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  provider: text("provider").notNull(),
  label: text("label").notNull(),
  baseUrl: text("base_url").notNull().default(""),
  secretEncrypted: text("secret_encrypted").notNull(),
  secretHint: text("secret_hint").notNull().default(""),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
