CREATE TABLE `crm_audit_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`lead_id` integer,
	`actor_email` text NOT NULL,
	`action` text NOT NULL,
	`detail` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `crm_leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`event_type` text NOT NULL,
	`event_date` text DEFAULT '' NOT NULL,
	`guests` integer,
	`message` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`marketing_consent` integer DEFAULT false NOT NULL,
	`consent_recorded_at` text,
	`consent_text_version` text,
	`privacy_notice_version` text DEFAULT '2026-09-03' NOT NULL,
	`processing_restricted` integer DEFAULT false NOT NULL,
	`retention_until` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
