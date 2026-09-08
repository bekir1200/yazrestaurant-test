CREATE TABLE `api_integrations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`provider` text NOT NULL,
	`label` text NOT NULL,
	`base_url` text DEFAULT '' NOT NULL,
	`secret_encrypted` text NOT NULL,
	`secret_hint` text DEFAULT '' NOT NULL,
	`enabled` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
