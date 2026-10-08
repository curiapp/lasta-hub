ALTER TABLE workflow.users
    ADD COLUMN IF NOT EXISTS email_notifications_enabled boolean NOT NULL DEFAULT false;
