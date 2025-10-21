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
	"status" text NOT NULL,
	"initator" uuid NOT NULL,
	"coordinators" uuid[],
	"advisories" jsonb,
	"created_at" timestamp with time zone NOT NULL,
	CONSTRAINT "programmes_id_not_null" CHECK (NOT NULL id),
	CONSTRAINT "programmes_title_not_null" CHECK (NOT NULL title),
	CONSTRAINT "programmes_code_not_null" CHECK (NOT NULL code),
	CONSTRAINT "programmes_department_not_null" CHECK (NOT NULL department),
	CONSTRAINT "programmes_faculty_not_null" CHECK (NOT NULL faculty),
	CONSTRAINT "programmes_level_not_null" CHECK (NOT NULL level),
	CONSTRAINT "programmes_status_not_null" CHECK (NOT NULL status),
	CONSTRAINT "programmes_initator_not_null" CHECK (NOT NULL initator),
	CONSTRAINT "programmes_created_at_not_null" CHECK (NOT NULL created_at)
);
--> statement-breakpoint
CREATE TABLE "phase_steps" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" varchar(150),
	CONSTRAINT "phases_id_not_null" CHECK (NOT NULL id),
	CONSTRAINT "phases_name_not_null" CHECK (NOT NULL name)
);
--> statement-breakpoint
CREATE TABLE "program_phase_steps" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"programme_phase_id" uuid,
	"phase_step_id" uuid,
	"decision" text,
	"notes" text,
	"completed" boolean DEFAULT false,
	"completed_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now(),
	"extra_data" jsonb,
	CONSTRAINT "program_phase_steps_program_phase_id_phase_step_id_key" UNIQUE("programme_phase_id","phase_step_id"),
	CONSTRAINT "program_phase_steps_id_not_null" CHECK (NOT NULL id)
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"title" text,
	"date" timestamp,
	CONSTRAINT "events_id_not_null" CHECK (NOT NULL id)
);
--> statement-breakpoint
CREATE TABLE "programme_phases" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"program_id" uuid,
	"phase_id" uuid,
	"status" text DEFAULT 'not_started',
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	CONSTRAINT "program_phases_program_id_phase_id_key" UNIQUE("program_id","phase_id"),
	CONSTRAINT "program_phases_status_check" CHECK (status = ANY (ARRAY['not_started'::text, 'in_progress'::text, 'completed'::text])),
	CONSTRAINT "program_phases_id_not_null" CHECK (NOT NULL id)
);
--> statement-breakpoint
ALTER TABLE "program_phase_steps" ADD CONSTRAINT "programme_phase_steps_phase_step_id_fkey" FOREIGN KEY ("phase_step_id") REFERENCES "public"."phase_steps"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "program_phase_steps" ADD CONSTRAINT "programme_phase_steps_programme_phase_id_fkey" FOREIGN KEY ("programme_phase_id") REFERENCES "public"."programme_phases"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programme_phases" ADD CONSTRAINT "program_phases_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programme_phases" ADD CONSTRAINT "program_phases_phase_id_fkey" FOREIGN KEY ("phase_id") REFERENCES "public"."phase_steps"("id") ON DELETE no action ON UPDATE no action;
*/