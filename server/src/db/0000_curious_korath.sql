-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "programmes" (
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
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "faculty" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"name" varchar(150) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "departments" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"faculty_id" uuid,
	"name" varchar(150) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
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
	CONSTRAINT "users_ad_user_id_key" UNIQUE("ad_user_id"),
	CONSTRAINT "users_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"type" text,
	"reference_id" uuid,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "notification_recipients" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"notification_id" uuid,
	"recipient_id" uuid,
	"is_read" boolean DEFAULT false,
	"read_at" timestamp,
	CONSTRAINT "notification_recipients_notification_id_recipient_id_key" UNIQUE("recipient_id","notification_id")
);
--> statement-breakpoint
CREATE TABLE "programme_phase_steps" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"programme_phase_id" uuid,
	"phase_step_id" uuid,
	"decision" text,
	"notes" text,
	"completed" boolean DEFAULT false,
	"completed_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now(),
	"extra_data" jsonb,
	CONSTRAINT "program_phase_steps_program_phase_id_phase_step_id_key" UNIQUE("programme_phase_id","phase_step_id")
);
--> statement-breakpoint
CREATE TABLE "phase_steps" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" varchar(150),
	"order_index" smallint NOT NULL,
	"phase_id" uuid NOT NULL,
	"slug" text,
	CONSTRAINT "phase_steps_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"title" text,
	"date" timestamp
);
--> statement-breakpoint
CREATE TABLE "programme_phases" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"programme_id" uuid NOT NULL,
	"phase_id" uuid NOT NULL,
	"status" text DEFAULT 'not_started' NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	CONSTRAINT "program_phases_program_id_phase_id_key" UNIQUE("programme_id","phase_id"),
	CONSTRAINT "program_phases_status_check" CHECK (status = ANY (ARRAY['not_started'::text, 'in_progress'::text, 'completed'::text]))
);
--> statement-breakpoint
CREATE TABLE "phases" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"name" varchar(50) NOT NULL,
	"order_index" smallint NOT NULL,
	"description" varchar(150),
	"slug" text,
	CONSTRAINT "phases_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "attachments" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"programme_phase_step_id" uuid NOT NULL,
	"path" text NOT NULL,
	"uploaded_by" uuid,
	"uploaded_at" timestamp with time zone DEFAULT now() NOT NULL,
	"mime_type" text,
	"size" bigint
);
--> statement-breakpoint
ALTER TABLE "programmes" ADD CONSTRAINT "programmes_initiator_fkey" FOREIGN KEY ("initiator") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "fk_department_faculty" FOREIGN KEY ("faculty_id") REFERENCES "public"."faculty"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification_recipients" ADD CONSTRAINT "notification_recipients_notification_id_fkey" FOREIGN KEY ("notification_id") REFERENCES "public"."notifications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification_recipients" ADD CONSTRAINT "notification_recipients_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programme_phase_steps" ADD CONSTRAINT "programme_phase_steps_phase_step_id_fkey" FOREIGN KEY ("phase_step_id") REFERENCES "public"."phase_steps"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programme_phase_steps" ADD CONSTRAINT "programme_phase_steps_programme_phase_id_fkey" FOREIGN KEY ("programme_phase_id") REFERENCES "public"."programme_phases"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "phase_steps" ADD CONSTRAINT "phase_steps_phase_id_fkey" FOREIGN KEY ("phase_id") REFERENCES "public"."phases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programme_phases" ADD CONSTRAINT "program_phases_program_id_fkey" FOREIGN KEY ("programme_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programme_phases" ADD CONSTRAINT "programme_phases_phase_id_fkey" FOREIGN KEY ("phase_id") REFERENCES "public"."phases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_programme_phase_step_id_fkey" FOREIGN KEY ("programme_phase_step_id") REFERENCES "public"."programme_phase_steps"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_notification_created" ON "notifications" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_notification_recipient" ON "notification_recipients" USING btree ("recipient_id","is_read");
*/