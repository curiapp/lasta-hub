import { pgTable, uuid, varchar, text, timestamp, index, foreignKey, unique, boolean, smallint, jsonb, pgSchema, bigint, check } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const workflow = pgSchema("workflow");


export const faculty = pgTable("faculty", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	name: varchar({ length: 150 }).notNull(),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const notifications = pgTable("notifications", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	title: text().notNull(),
	message: text().notNull(),
	type: text(),
	referenceId: uuid("reference_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_notification_created").using("btree", table.createdAt.asc().nullsLast().op("timestamp_ops")),
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

export const attachmentsInWorkflow = workflow.table("attachments", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	programmeId: uuid("programme_id").notNull(),
	processId: uuid("process_id").notNull(),
	taskId: uuid("task_id").notNull(),
	type: text().notNull(),
	title: text().notNull(),
	reference: text(),
	path: text(),
	mimeType: text("mime_type"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	size: bigint({ mode: "number" }),
	createdBy: uuid("created_by"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	status: text().default('submitted').notNull(),
	submittedAt: timestamp("submitted_at", { withTimezone: true, mode: 'string' }),
}, (table) => [
	index("idx_workflow_attachments_programme").using("btree", table.programmeId.asc().nullsLast().op("uuid_ops")),
	index("idx_workflow_attachments_task").using("btree", table.taskId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.programmeId],
			foreignColumns: [programmes.id],
			name: "workflow_attachments_programme_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "workflow_attachments_created_by_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.processId],
			foreignColumns: [processInstancesInWorkflow.id],
			name: "workflow_attachments_process_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.taskId],
			foreignColumns: [taskInstancesInWorkflow.id],
			name: "workflow_attachments_task_id_fkey"
		}).onDelete("cascade"),
]);

export const definitionVersionsInWorkflow = workflow.table("definition_versions", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	definitionId: uuid("definition_id").notNull(),
	version: smallint().notNull(),
	status: text().default('draft').notNull(),
	initialTaskKey: text("initial_task_key").notNull(),
	definition: jsonb().notNull(),
	createdBy: uuid("created_by"),
	publishedAt: timestamp("published_at", { withTimezone: true, mode: 'string' }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_workflow_definition_versions_definition").using("btree", table.definitionId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.definitionId],
			foreignColumns: [definitionsInWorkflow.id],
			name: "workflow_definition_versions_definition_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "workflow_definition_versions_created_by_fkey"
		}).onDelete("set null"),
	unique("workflow_definition_versions_definition_version_key").on(table.version, table.definitionId),
]);

export const processInstancesInWorkflow = workflow.table("process_instances", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	programmeId: uuid("programme_id").notNull(),
	definitionVersionId: uuid("definition_version_id").notNull(),
	status: text().default('running').notNull(),
	currentStageKey: text("current_stage_key"),
	startedBy: uuid("started_by"),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	completedAt: timestamp("completed_at", { withTimezone: true, mode: 'string' }),
}, (table) => [
	index("idx_workflow_process_programme").using("btree", table.programmeId.asc().nullsLast().op("uuid_ops")),
	index("idx_workflow_process_status").using("btree", table.status.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.definitionVersionId],
			foreignColumns: [definitionVersionsInWorkflow.id],
			name: "workflow_process_instances_definition_version_id_fkey"
		}),
	foreignKey({
			columns: [table.programmeId],
			foreignColumns: [programmes.id],
			name: "workflow_process_instances_programme_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.startedBy],
			foreignColumns: [users.id],
			name: "workflow_process_instances_started_by_fkey"
		}).onDelete("set null"),
]);

export const taskInstancesInWorkflow = workflow.table("task_instances", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	processId: uuid("process_id").notNull(),
	programmeId: uuid("programme_id").notNull(),
	taskKey: text("task_key").notNull(),
	stageKey: text("stage_key").notNull(),
	name: text().notNull(),
	status: text().default('active').notNull(),
	ownerRoles: text("owner_roles").array().notNull(),
	formData: jsonb("form_data"),
	decision: text(),
	transitionLabel: text("transition_label"),
	causedByTaskId: uuid("caused_by_task_id"),
	completedBy: uuid("completed_by"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	completedAt: timestamp("completed_at", { withTimezone: true, mode: 'string' }),
}, (table) => [
	index("idx_workflow_tasks_process").using("btree", table.processId.asc().nullsLast().op("uuid_ops")),
	index("idx_workflow_tasks_programme").using("btree", table.programmeId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.processId],
			foreignColumns: [processInstancesInWorkflow.id],
			name: "workflow_task_instances_process_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.causedByTaskId],
			foreignColumns: [table.id],
			name: "workflow_task_instances_caused_by_task_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.programmeId],
			foreignColumns: [programmes.id],
			name: "workflow_task_instances_programme_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.completedBy],
			foreignColumns: [users.id],
			name: "workflow_task_instances_completed_by_fkey"
		}).onDelete("set null"),
]);

export const definitionsInWorkflow = workflow.table("definitions", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	slug: text().notNull(),
	name: text().notNull(),
	description: text(),
	status: text().default('draft').notNull(),
	createdBy: uuid("created_by"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "workflow_definitions_created_by_fkey"
		}).onDelete("set null"),
	unique("workflow_definitions_slug_key").on(table.slug),
	check("workflow_definitions_status_check", sql`status = ANY (ARRAY['draft'::text, 'active'::text, 'archived'::text])`),
]);

export const auditEventsInWorkflow = workflow.table("audit_events", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	programmeId: uuid("programme_id"),
	processId: uuid("process_id"),
	taskId: uuid("task_id"),
	actorId: uuid("actor_id"),
	actorRole: text("actor_role"),
	type: text().notNull(),
	message: text().notNull(),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_workflow_audit_created").using("btree", table.createdAt.desc().nullsFirst().op("timestamptz_ops")),
	foreignKey({
			columns: [table.processId],
			foreignColumns: [processInstancesInWorkflow.id],
			name: "workflow_audit_events_process_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.taskId],
			foreignColumns: [taskInstancesInWorkflow.id],
			name: "workflow_audit_events_task_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.programmeId],
			foreignColumns: [programmes.id],
			name: "workflow_audit_events_programme_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.actorId],
			foreignColumns: [users.id],
			name: "workflow_audit_events_actor_id_fkey"
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
	emailNotificationsEnabled: boolean("email_notifications_enabled").default(false).notNull(),
}, (table) => [
	unique("users_ad_user_id_key").on(table.adUserId),
	unique("users_email_key").on(table.email),
]);

export const communicationsInWorkflow = workflow.table("communications", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	programmeId: uuid("programme_id"),
	senderId: uuid("sender_id"),
	recipientId: uuid("recipient_id"),
	recipientEmail: text("recipient_email").notNull(),
	recipientName: text("recipient_name"),
	scope: text().default('programme').notNull(),
	subject: text().notNull(),
	body: text().notNull(),
	emailStatus: text("email_status").default('pending').notNull(),
	emailError: text("email_error"),
	sentAt: timestamp("sent_at", { withTimezone: true, mode: 'string' }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_workflow_communications_programme").using("btree", table.programmeId.asc().nullsLast().op("uuid_ops")),
	index("idx_workflow_communications_recipient").using("btree", table.recipientId.asc().nullsLast().op("uuid_ops"), table.createdAt.desc().nullsFirst().op("timestamptz_ops")),
	index("idx_workflow_communications_sender").using("btree", table.senderId.asc().nullsLast().op("uuid_ops"), table.createdAt.desc().nullsFirst().op("timestamptz_ops")),
	foreignKey({
			columns: [table.programmeId],
			foreignColumns: [programmes.id],
			name: "communications_programme_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.senderId],
			foreignColumns: [users.id],
			name: "communications_sender_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.recipientId],
			foreignColumns: [users.id],
			name: "communications_recipient_id_fkey"
		}).onDelete("set null"),
]);
