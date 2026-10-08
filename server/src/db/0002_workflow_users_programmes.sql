CREATE TABLE IF NOT EXISTS "workflow"."users" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"ad_user_id" uuid,
	"email" text NOT NULL,
	"display_name" text,
	"role" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"password" text,
	"first_name" text,
	"last_name" text,
	"authToken" text,
	"department" uuid,
	CONSTRAINT "workflow_users_ad_user_id_key" UNIQUE("ad_user_id"),
	CONSTRAINT "workflow_users_email_key" UNIQUE("email")
);
--> statement-breakpoint
INSERT INTO "workflow"."users" (
	"id", "ad_user_id", "email", "display_name", "role", "created_at",
	"updated_at", "password", "first_name", "last_name", "authToken", "department"
)
SELECT
	"id", "ad_user_id", "email", "display_name", "role", "created_at",
	"updated_at", "password", "first_name", "last_name", "authToken", "department"
FROM "public"."users"
ON CONFLICT ("id") DO NOTHING;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workflow"."programmes" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"title" varchar(100) NOT NULL,
	"code" varchar(20) NOT NULL,
	"department" uuid NOT NULL,
	"faculty" uuid NOT NULL,
	"level" smallint NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"initiator" uuid NOT NULL,
	"coordinators" uuid[],
	"advisories" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "workflow_programmes_initiator_fkey"
		FOREIGN KEY ("initiator") REFERENCES "workflow"."users"("id")
);
--> statement-breakpoint
INSERT INTO "workflow"."programmes" (
	"id", "title", "code", "department", "faculty", "level", "status",
	"initiator", "coordinators", "advisories", "created_at"
)
SELECT
	"id", "title", "code", "department", "faculty", "level", "status",
	"initiator", "coordinators", "advisories", "created_at"
FROM "public"."programmes"
ON CONFLICT ("id") DO NOTHING;
--> statement-breakpoint
ALTER TABLE "workflow"."definitions"
	DROP CONSTRAINT IF EXISTS "workflow_definitions_created_by_fkey",
	ADD CONSTRAINT "workflow_definitions_created_by_fkey"
		FOREIGN KEY ("created_by") REFERENCES "workflow"."users"("id") ON DELETE SET NULL;
--> statement-breakpoint
ALTER TABLE "workflow"."definition_versions"
	DROP CONSTRAINT IF EXISTS "workflow_definition_versions_created_by_fkey",
	ADD CONSTRAINT "workflow_definition_versions_created_by_fkey"
		FOREIGN KEY ("created_by") REFERENCES "workflow"."users"("id") ON DELETE SET NULL;
--> statement-breakpoint
ALTER TABLE "workflow"."process_instances"
	DROP CONSTRAINT IF EXISTS "workflow_process_instances_programme_id_fkey",
	DROP CONSTRAINT IF EXISTS "workflow_process_instances_started_by_fkey",
	ADD CONSTRAINT "workflow_process_instances_programme_id_fkey"
		FOREIGN KEY ("programme_id") REFERENCES "workflow"."programmes"("id") ON DELETE CASCADE,
	ADD CONSTRAINT "workflow_process_instances_started_by_fkey"
		FOREIGN KEY ("started_by") REFERENCES "workflow"."users"("id") ON DELETE SET NULL;
--> statement-breakpoint
ALTER TABLE "workflow"."task_instances"
	DROP CONSTRAINT IF EXISTS "workflow_task_instances_programme_id_fkey",
	DROP CONSTRAINT IF EXISTS "workflow_task_instances_completed_by_fkey",
	ADD CONSTRAINT "workflow_task_instances_programme_id_fkey"
		FOREIGN KEY ("programme_id") REFERENCES "workflow"."programmes"("id") ON DELETE CASCADE,
	ADD CONSTRAINT "workflow_task_instances_completed_by_fkey"
		FOREIGN KEY ("completed_by") REFERENCES "workflow"."users"("id") ON DELETE SET NULL;
--> statement-breakpoint
ALTER TABLE "workflow"."artifacts"
	DROP CONSTRAINT IF EXISTS "workflow_artifacts_programme_id_fkey",
	DROP CONSTRAINT IF EXISTS "workflow_artifacts_created_by_fkey",
	ADD CONSTRAINT "workflow_artifacts_programme_id_fkey"
		FOREIGN KEY ("programme_id") REFERENCES "workflow"."programmes"("id") ON DELETE CASCADE,
	ADD CONSTRAINT "workflow_artifacts_created_by_fkey"
		FOREIGN KEY ("created_by") REFERENCES "workflow"."users"("id") ON DELETE SET NULL;
--> statement-breakpoint
ALTER TABLE "workflow"."audit_events"
	DROP CONSTRAINT IF EXISTS "workflow_audit_events_programme_id_fkey",
	DROP CONSTRAINT IF EXISTS "workflow_audit_events_actor_id_fkey",
	ADD CONSTRAINT "workflow_audit_events_programme_id_fkey"
		FOREIGN KEY ("programme_id") REFERENCES "workflow"."programmes"("id") ON DELETE CASCADE,
	ADD CONSTRAINT "workflow_audit_events_actor_id_fkey"
		FOREIGN KEY ("actor_id") REFERENCES "workflow"."users"("id") ON DELETE SET NULL;
