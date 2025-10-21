import { pgTable, check, uuid, varchar, smallint, text, jsonb, timestamp, foreignKey, unique, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const programmes = pgTable("programmes", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	title: varchar({ length: 100 }).notNull(),
	code: varchar({ length: 20 }).notNull(),
	department: uuid().notNull(),
	faculty: uuid().notNull(),
	level: smallint().notNull(),
	status: text().notNull(),
	initator: uuid().notNull(),
	coordinators: uuid().array(),
	advisories: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	check("programmes_id_not_null", sql`NOT NULL id`),
	check("programmes_title_not_null", sql`NOT NULL title`),
	check("programmes_code_not_null", sql`NOT NULL code`),
	check("programmes_department_not_null", sql`NOT NULL department`),
	check("programmes_faculty_not_null", sql`NOT NULL faculty`),
	check("programmes_level_not_null", sql`NOT NULL level`),
	check("programmes_status_not_null", sql`NOT NULL status`),
	check("programmes_initator_not_null", sql`NOT NULL initator`),
	check("programmes_created_at_not_null", sql`NOT NULL created_at`),
]);

export const phaseSteps = pgTable("phase_steps", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 150 }),
}, (table) => [
	check("phases_id_not_null", sql`NOT NULL id`),
	check("phases_name_not_null", sql`NOT NULL name`),
]);

export const programPhaseSteps = pgTable("program_phase_steps", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	programmePhaseId: uuid("programme_phase_id"),
	phaseStepId: uuid("phase_step_id"),
	decision: text(),
	notes: text(),
	completed: boolean().default(false),
	completedAt: timestamp("completed_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	extraData: jsonb("extra_data"),
}, (table) => [
	foreignKey({
			columns: [table.phaseStepId],
			foreignColumns: [phaseSteps.id],
			name: "programme_phase_steps_phase_step_id_fkey"
		}),
	foreignKey({
			columns: [table.programmePhaseId],
			foreignColumns: [programmePhases.id],
			name: "programme_phase_steps_programme_phase_id_fkey"
		}).onDelete("cascade"),
	unique("program_phase_steps_program_phase_id_phase_step_id_key").on(table.programmePhaseId, table.phaseStepId),
	check("program_phase_steps_id_not_null", sql`NOT NULL id`),
]);

export const events = pgTable("events", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	title: text(),
	date: timestamp({ mode: 'string' }),
}, (table) => [
	check("events_id_not_null", sql`NOT NULL id`),
]);

export const programmePhases = pgTable("programme_phases", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	programId: uuid("program_id"),
	phaseId: uuid("phase_id"),
	status: text().default('not_started'),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }),
	completedAt: timestamp("completed_at", { withTimezone: true, mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.programId],
			foreignColumns: [programmes.id],
			name: "program_phases_program_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.phaseId],
			foreignColumns: [phaseSteps.id],
			name: "program_phases_phase_id_fkey"
		}),
	unique("program_phases_program_id_phase_id_key").on(table.programId, table.phaseId),
	check("program_phases_status_check", sql`status = ANY (ARRAY['not_started'::text, 'in_progress'::text, 'completed'::text])`),
	check("program_phases_id_not_null", sql`NOT NULL id`),
]);
