CREATE SCHEMA IF NOT EXISTS "workflow";
--> statement-breakpoint
CREATE TABLE "workflow"."definitions" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"status" text DEFAULT 'draft' NOT NULL,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "workflow_definitions_slug_key" UNIQUE("slug"),
	CONSTRAINT "workflow_definitions_status_check" CHECK ("status" = ANY (ARRAY['draft'::text, 'active'::text, 'archived'::text]))
);
--> statement-breakpoint
CREATE TABLE "workflow"."definition_versions" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"definition_id" uuid NOT NULL,
	"version" smallint NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"initial_task_key" text NOT NULL,
	"definition" jsonb NOT NULL,
	"created_by" uuid,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "workflow_definition_versions_definition_version_key" UNIQUE("definition_id","version"),
	CONSTRAINT "workflow_definition_versions_status_check" CHECK ("status" = ANY (ARRAY['draft'::text, 'published'::text, 'retired'::text]))
);
--> statement-breakpoint
CREATE TABLE "workflow"."process_instances" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"programme_id" uuid NOT NULL,
	"definition_version_id" uuid NOT NULL,
	"status" text DEFAULT 'running' NOT NULL,
	"current_stage_key" text,
	"started_by" uuid,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	CONSTRAINT "workflow_process_instances_status_check" CHECK ("status" = ANY (ARRAY['running'::text, 'completed'::text, 'rejected'::text, 'stopped'::text, 'cancelled'::text]))
);
--> statement-breakpoint
CREATE TABLE "workflow"."task_instances" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"process_id" uuid NOT NULL,
	"programme_id" uuid NOT NULL,
	"task_key" text NOT NULL,
	"stage_key" text NOT NULL,
	"name" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"owner_roles" text[] NOT NULL,
	"form_data" jsonb,
	"decision" text,
	"transition_label" text,
	"caused_by_task_id" uuid,
	"completed_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	CONSTRAINT "workflow_task_instances_status_check" CHECK ("status" = ANY (ARRAY['active'::text, 'completed'::text, 'cancelled'::text, 'skipped'::text]))
);
--> statement-breakpoint
CREATE TABLE "workflow"."artifacts" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"programme_id" uuid NOT NULL,
	"process_id" uuid NOT NULL,
	"task_id" uuid NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"reference" text,
	"path" text,
	"mime_type" text,
	"size" bigint,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workflow"."audit_events" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"programme_id" uuid,
	"process_id" uuid,
	"task_id" uuid,
	"actor_id" uuid,
	"actor_role" text,
	"type" text NOT NULL,
	"message" text NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "workflow"."definitions" ADD CONSTRAINT "workflow_definitions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "workflow"."definition_versions" ADD CONSTRAINT "workflow_definition_versions_definition_id_fkey" FOREIGN KEY ("definition_id") REFERENCES "workflow"."definitions"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "workflow"."definition_versions" ADD CONSTRAINT "workflow_definition_versions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "workflow"."process_instances" ADD CONSTRAINT "workflow_process_instances_programme_id_fkey" FOREIGN KEY ("programme_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "workflow"."process_instances" ADD CONSTRAINT "workflow_process_instances_definition_version_id_fkey" FOREIGN KEY ("definition_version_id") REFERENCES "workflow"."definition_versions"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "workflow"."process_instances" ADD CONSTRAINT "workflow_process_instances_started_by_fkey" FOREIGN KEY ("started_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "workflow"."task_instances" ADD CONSTRAINT "workflow_task_instances_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "workflow"."process_instances"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "workflow"."task_instances" ADD CONSTRAINT "workflow_task_instances_programme_id_fkey" FOREIGN KEY ("programme_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "workflow"."task_instances" ADD CONSTRAINT "workflow_task_instances_caused_by_task_id_fkey" FOREIGN KEY ("caused_by_task_id") REFERENCES "workflow"."task_instances"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "workflow"."task_instances" ADD CONSTRAINT "workflow_task_instances_completed_by_fkey" FOREIGN KEY ("completed_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "workflow"."artifacts" ADD CONSTRAINT "workflow_artifacts_programme_id_fkey" FOREIGN KEY ("programme_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "workflow"."artifacts" ADD CONSTRAINT "workflow_artifacts_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "workflow"."process_instances"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "workflow"."artifacts" ADD CONSTRAINT "workflow_artifacts_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "workflow"."task_instances"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "workflow"."artifacts" ADD CONSTRAINT "workflow_artifacts_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "workflow"."audit_events" ADD CONSTRAINT "workflow_audit_events_programme_id_fkey" FOREIGN KEY ("programme_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "workflow"."audit_events" ADD CONSTRAINT "workflow_audit_events_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "workflow"."process_instances"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "workflow"."audit_events" ADD CONSTRAINT "workflow_audit_events_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "workflow"."task_instances"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "workflow"."audit_events" ADD CONSTRAINT "workflow_audit_events_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX "idx_workflow_definition_versions_definition" ON "workflow"."definition_versions" USING btree ("definition_id");
--> statement-breakpoint
CREATE INDEX "idx_workflow_process_programme" ON "workflow"."process_instances" USING btree ("programme_id");
--> statement-breakpoint
CREATE INDEX "idx_workflow_process_status" ON "workflow"."process_instances" USING btree ("status");
--> statement-breakpoint
CREATE INDEX "idx_workflow_tasks_process" ON "workflow"."task_instances" USING btree ("process_id");
--> statement-breakpoint
CREATE INDEX "idx_workflow_tasks_programme" ON "workflow"."task_instances" USING btree ("programme_id");
--> statement-breakpoint
CREATE INDEX "idx_workflow_tasks_status" ON "workflow"."task_instances" USING btree ("status");
--> statement-breakpoint
CREATE INDEX "idx_workflow_tasks_stage" ON "workflow"."task_instances" USING btree ("stage_key");
--> statement-breakpoint
CREATE INDEX "idx_workflow_artifacts_programme" ON "workflow"."artifacts" USING btree ("programme_id");
--> statement-breakpoint
CREATE INDEX "idx_workflow_artifacts_task" ON "workflow"."artifacts" USING btree ("task_id");
--> statement-breakpoint
CREATE INDEX "idx_workflow_audit_programme" ON "workflow"."audit_events" USING btree ("programme_id");
--> statement-breakpoint
CREATE INDEX "idx_workflow_audit_process" ON "workflow"."audit_events" USING btree ("process_id");
--> statement-breakpoint
CREATE INDEX "idx_workflow_audit_created" ON "workflow"."audit_events" USING btree ("created_at" DESC);
