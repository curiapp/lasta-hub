CREATE TABLE IF NOT EXISTS "workflow"."faculty"
	(LIKE "public"."faculty" INCLUDING ALL);
--> statement-breakpoint
INSERT INTO "workflow"."faculty"
SELECT * FROM "public"."faculty"
ON CONFLICT ("id") DO NOTHING;
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "workflow"."departments"
	(LIKE "public"."departments" INCLUDING ALL);
--> statement-breakpoint
ALTER TABLE "workflow"."departments"
	DROP CONSTRAINT IF EXISTS "workflow_departments_faculty_fkey",
	ADD CONSTRAINT "workflow_departments_faculty_fkey"
		FOREIGN KEY ("faculty_id") REFERENCES "workflow"."faculty"("id") ON DELETE SET NULL;
--> statement-breakpoint
INSERT INTO "workflow"."departments"
SELECT * FROM "public"."departments"
ON CONFLICT ("id") DO NOTHING;
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "workflow"."phases"
	(LIKE "public"."phases" INCLUDING ALL);
--> statement-breakpoint
INSERT INTO "workflow"."phases"
SELECT * FROM "public"."phases"
ON CONFLICT ("id") DO NOTHING;
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "workflow"."phase_steps"
	(LIKE "public"."phase_steps" INCLUDING ALL);
--> statement-breakpoint
ALTER TABLE "workflow"."phase_steps"
	DROP CONSTRAINT IF EXISTS "workflow_phase_steps_phase_fkey",
	ADD CONSTRAINT "workflow_phase_steps_phase_fkey"
		FOREIGN KEY ("phase_id") REFERENCES "workflow"."phases"("id");
--> statement-breakpoint
INSERT INTO "workflow"."phase_steps"
SELECT * FROM "public"."phase_steps"
ON CONFLICT ("id") DO NOTHING;
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "workflow"."programme_phases"
	(LIKE "public"."programme_phases" INCLUDING ALL);
--> statement-breakpoint
ALTER TABLE "workflow"."programme_phases"
	DROP CONSTRAINT IF EXISTS "workflow_programme_phases_programme_fkey",
	DROP CONSTRAINT IF EXISTS "workflow_programme_phases_phase_fkey",
	ADD CONSTRAINT "workflow_programme_phases_programme_fkey"
		FOREIGN KEY ("programme_id") REFERENCES "workflow"."programmes"("id") ON DELETE CASCADE,
	ADD CONSTRAINT "workflow_programme_phases_phase_fkey"
		FOREIGN KEY ("phase_id") REFERENCES "workflow"."phases"("id");
--> statement-breakpoint
INSERT INTO "workflow"."programme_phases"
SELECT * FROM "public"."programme_phases"
ON CONFLICT ("id") DO NOTHING;
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "workflow"."programme_phase_steps"
	(LIKE "public"."programme_phase_steps" INCLUDING ALL);
--> statement-breakpoint
ALTER TABLE "workflow"."programme_phase_steps"
	DROP CONSTRAINT IF EXISTS "workflow_programme_phase_steps_phase_step_fkey",
	DROP CONSTRAINT IF EXISTS "workflow_programme_phase_steps_programme_phase_fkey",
	ADD CONSTRAINT "workflow_programme_phase_steps_phase_step_fkey"
		FOREIGN KEY ("phase_step_id") REFERENCES "workflow"."phase_steps"("id"),
	ADD CONSTRAINT "workflow_programme_phase_steps_programme_phase_fkey"
		FOREIGN KEY ("programme_phase_id") REFERENCES "workflow"."programme_phases"("id") ON DELETE CASCADE;
--> statement-breakpoint
INSERT INTO "workflow"."programme_phase_steps"
SELECT * FROM "public"."programme_phase_steps"
ON CONFLICT ("id") DO NOTHING;
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "workflow"."attachments"
	(LIKE "public"."attachments" INCLUDING ALL);
--> statement-breakpoint
ALTER TABLE "workflow"."attachments"
	DROP CONSTRAINT IF EXISTS "workflow_attachments_programme_phase_step_fkey",
	DROP CONSTRAINT IF EXISTS "workflow_attachments_uploaded_by_fkey",
	ADD CONSTRAINT "workflow_attachments_programme_phase_step_fkey"
		FOREIGN KEY ("programme_phase_step_id") REFERENCES "workflow"."programme_phase_steps"("id"),
	ADD CONSTRAINT "workflow_attachments_uploaded_by_fkey"
		FOREIGN KEY ("uploaded_by") REFERENCES "workflow"."users"("id");
--> statement-breakpoint
INSERT INTO "workflow"."attachments"
SELECT * FROM "public"."attachments"
ON CONFLICT ("id") DO NOTHING;
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "workflow"."notifications"
	(LIKE "public"."notifications" INCLUDING ALL);
--> statement-breakpoint
INSERT INTO "workflow"."notifications"
SELECT * FROM "public"."notifications"
ON CONFLICT ("id") DO NOTHING;
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "workflow"."notification_recipients"
	(LIKE "public"."notification_recipients" INCLUDING ALL);
--> statement-breakpoint
ALTER TABLE "workflow"."notification_recipients"
	DROP CONSTRAINT IF EXISTS "workflow_notification_recipients_notification_fkey",
	DROP CONSTRAINT IF EXISTS "workflow_notification_recipients_recipient_fkey",
	ADD CONSTRAINT "workflow_notification_recipients_notification_fkey"
		FOREIGN KEY ("notification_id") REFERENCES "workflow"."notifications"("id") ON DELETE CASCADE,
	ADD CONSTRAINT "workflow_notification_recipients_recipient_fkey"
		FOREIGN KEY ("recipient_id") REFERENCES "workflow"."users"("id") ON DELETE CASCADE;
--> statement-breakpoint
INSERT INTO "workflow"."notification_recipients"
SELECT * FROM "public"."notification_recipients"
ON CONFLICT ("id") DO NOTHING;
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "workflow"."events"
	(LIKE "public"."events" INCLUDING ALL);
--> statement-breakpoint
INSERT INTO "workflow"."events"
SELECT * FROM "public"."events"
ON CONFLICT ("id") DO NOTHING;
