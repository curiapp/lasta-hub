import { pgTable, foreignKey, uuid, varchar, smallint, text, jsonb, timestamp, unique, index, boolean, check, bigint } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const programmes = pgTable("programmes", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	title: varchar({ length: 100 }).notNull(),
	code: varchar({ length: 20 }).notNull(),
	department: uuid().notNull(),
	faculty: uuid().notNull(),
	level: smallint().notNull(),
	status: text().default('draft').notNull(),
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
]);

export const faculty = pgTable("faculty", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	name: varchar({ length: 150 }).notNull(),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const departments = pgTable("departments", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	facultyId: uuid("faculty_id"),
	name: varchar({ length: 150 }).notNull(),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.facultyId],
			foreignColumns: [faculty.id],
			name: "fk_department_faculty"
		}).onDelete("set null"),
]);

export const users = pgTable("users", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	adUserId: uuid("ad_user_id"),
	email: text().notNull(),
	displayName: text("display_name"),
	role: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	password: text(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	authToken: text(),
	department: uuid(),
}, (table) => [
	unique("users_ad_user_id_key").on(table.adUserId),
	unique("users_email_key").on(table.email),
]);

export const notifications = pgTable("notifications", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	title: text().notNull(),
	message: text().notNull(),
	type: text(),
	referenceId: uuid("reference_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_notification_created").using("btree", table.createdAt.desc().nullsFirst().op("timestamp_ops")),
]);

export const notificationRecipients = pgTable("notification_recipients", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	notificationId: uuid("notification_id"),
	recipientId: uuid("recipient_id"),
	isRead: boolean("is_read").default(false),
	readAt: timestamp("read_at", { mode: 'string' }),
}, (table) => [
	index("idx_notification_recipient").using("btree", table.recipientId.asc().nullsLast().op("bool_ops"), table.isRead.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.notificationId],
			foreignColumns: [notifications.id],
			name: "notification_recipients_notification_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.recipientId],
			foreignColumns: [users.id],
			name: "notification_recipients_recipient_id_fkey"
		}).onDelete("cascade"),
	unique("notification_recipients_notification_id_recipient_id_key").on(table.recipientId, table.notificationId),
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
]);

export const phaseSteps = pgTable("phase_steps", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 150 }),
	orderIndex: smallint("order_index").notNull(),
	phaseId: uuid("phase_id").notNull(),
	slug: text(),
}, (table) => [
	foreignKey({
			columns: [table.phaseId],
			foreignColumns: [phases.id],
			name: "phase_steps_phase_id_fkey"
		}),
	unique("phase_steps_slug_unique").on(table.slug),
]);

export const events = pgTable("events", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	title: text(),
	date: timestamp({ mode: 'string' }),
});

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
]);

export const phases = pgTable("phases", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	orderIndex: smallint("order_index").notNull(),
	description: varchar({ length: 150 }),
	slug: text(),
}, (table) => [
	unique("phases_slug_unique").on(table.slug),
]);

export const attachments = pgTable("attachments", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	programmePhaseStepId: uuid("programme_phase_step_id").notNull(),
	path: text().notNull(),
	uploadedBy: uuid("uploaded_by"),
	uploadedAt: timestamp("uploaded_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	mimeType: text("mime_type"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	size: bigint({ mode: "number" }),
}, (table) => [
	foreignKey({
			columns: [table.programmePhaseStepId],
			foreignColumns: [programmePhaseSteps.id],
			name: "attachments_programme_phase_step_id_fkey"
		}),
	foreignKey({
			columns: [table.uploadedBy],
			foreignColumns: [users.id],
			name: "attachments_uploaded_by_fkey"
		}),
]);
