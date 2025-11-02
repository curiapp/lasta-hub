import { pgTable, foreignKey, check, uuid, varchar, smallint, text, jsonb, timestamp, unique, time, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const programmes = pgTable("programmes", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	title: varchar({ length: 100 }).notNull(),
	code: varchar({ length: 20 }).notNull(),
	department: uuid().notNull(),
	faculty: uuid().notNull(),
	level: smallint().notNull(),
	status: text().notNull(),
	initiator: uuid().notNull(),
	coordinators: uuid().array(),
	advisories: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.initiator],
			foreignColumns: [users.id],
			name: "programmes_initiator_fkey"
		}),
	check("programmes_id_not_null", sql`NOT NULL id`),
	check("programmes_title_not_null", sql`NOT NULL title`),
	check("programmes_code_not_null", sql`NOT NULL code`),
	check("programmes_department_not_null", sql`NOT NULL department`),
	check("programmes_faculty_not_null", sql`NOT NULL faculty`),
	check("programmes_level_not_null", sql`NOT NULL level`),
	check("programmes_status_not_null", sql`NOT NULL status`),
	check("programmes_initator_not_null", sql`NOT NULL initiator`),
	check("programmes_created_at_not_null", sql`NOT NULL created_at`),
]);

export const users = pgTable("users", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	adUserId: uuid("ad_user_id"),
	email: text().notNull(),
	displayName: text("display_name").notNull(),
	role: text().notNull(),
	createdAt: time("created_at", { withTimezone: true }).defaultNow().notNull(),
	updatedAt: time("updated_at", { withTimezone: true }),
}, (table) => [
	unique("users_ad_user_id_key").on(table.adUserId),
	unique("users_email_key").on(table.email),
	check("users_id_not_null", sql`NOT NULL id`),
	check("users_email_not_null", sql`NOT NULL email`),
	check("users_display_name_not_null", sql`NOT NULL display_name`),
	check("users_role_not_null", sql`NOT NULL role`),
	check("users_created_at_not_null", sql`NOT NULL created_at`),
]);

export const phaseSteps = pgTable("phase_steps", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 150 }),
	orderIndex: smallint("order_index").notNull(),
	phaseId: uuid("phase_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.phaseId],
			foreignColumns: [phases.id],
			name: "phase_steps_phase_id_fkey"
		}),
	unique("phase_steps_order_index_phase_id_key").on(table.phaseId, table.orderIndex),
	check("phases_id_not_null", sql`NOT NULL id`),
	check("phases_name_not_null", sql`NOT NULL name`),
	check("phase_steps_order_index_not_null", sql`NOT NULL order_index`),
	check("phase_steps_phase_id_not_null", sql`NOT NULL phase_id`),
]);

export const programmePhaseSteps = pgTable("programme_phase_steps", {
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
	programmeId: uuid("programme_id").notNull(),
	phaseId: uuid("phase_id").notNull(),
	status: text().default('not_started').notNull(),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	completedAt: timestamp("completed_at", { withTimezone: true, mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.programmeId],
			foreignColumns: [programmes.id],
			name: "program_phases_program_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.phaseId],
			foreignColumns: [phases.id],
			name: "programme_phases_phase_id_fkey"
		}),
	unique("program_phases_program_id_phase_id_key").on(table.programmeId, table.phaseId),
	check("program_phases_status_check", sql`status = ANY (ARRAY['not_started'::text, 'in_progress'::text, 'completed'::text])`),
	check("program_phases_id_not_null", sql`NOT NULL id`),
	check("programme_phases_program_id_not_null", sql`NOT NULL programme_id`),
	check("programme_phases_phase_id_not_null", sql`NOT NULL phase_id`),
	check("programme_phases_status_not_null", sql`NOT NULL status`),
	check("programme_phases_started_at_not_null", sql`NOT NULL started_at`),
]);

export const phases = pgTable("phases", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	orderIndex: smallint("order_index").notNull(),
	description: varchar({ length: 150 }),
}, (table) => [
	check("phases_id_not_null1", sql`NOT NULL id`),
	check("phases_name_not_null1", sql`NOT NULL name`),
	check("phases_order_index_not_null", sql`NOT NULL order_index`),
]);
