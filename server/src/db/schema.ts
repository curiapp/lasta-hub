import { pgSchema, pgTable, foreignKey, uuid, varchar, smallint, text, jsonb, timestamp, unique, index, boolean, check, bigint } from "drizzle-orm/pg-core"
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
	index("idx_notification_recipient").using("btree", table.recipientId.asc().nullsLast().op("uuid_ops"), table.isRead.asc().nullsLast().op("bool_ops")),
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

export const workflow = pgSchema("workflow");

export const workflowUsers = workflow.table("users", {
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
	unique("workflow_users_ad_user_id_key").on(table.adUserId),
	unique("workflow_users_email_key").on(table.email),
]);

export const workflowProgrammes = workflow.table("programmes", {
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
			foreignColumns: [workflowUsers.id],
			name: "workflow_programmes_initiator_fkey"
	}),
]);

export const workflowFaculty = workflow.table("faculty", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	name: varchar({ length: 150 }).notNull(),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const workflowDepartments = workflow.table("departments", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	facultyId: uuid("faculty_id"),
	name: varchar({ length: 150 }).notNull(),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
		columns: [table.facultyId],
		foreignColumns: [workflowFaculty.id],
		name: "workflow_departments_faculty_fkey"
	}).onDelete("set null"),
]);

export const workflowPhases = workflow.table("phases", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	orderIndex: smallint("order_index").notNull(),
	description: varchar({ length: 150 }),
	slug: text(),
}, (table) => [
	unique("phases_slug_unique").on(table.slug),
]);

export const workflowPhaseSteps = workflow.table("phase_steps", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 150 }),
	orderIndex: smallint("order_index").notNull(),
	phaseId: uuid("phase_id").notNull(),
	slug: text(),
}, (table) => [
	foreignKey({
		columns: [table.phaseId],
		foreignColumns: [workflowPhases.id],
		name: "workflow_phase_steps_phase_fkey"
	}),
	unique("phase_steps_slug_unique").on(table.slug),
]);

export const workflowProgrammePhases = workflow.table("programme_phases", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	programmeId: uuid("programme_id").notNull(),
	phaseId: uuid("phase_id").notNull(),
	status: text().default('not_started').notNull(),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	completedAt: timestamp("completed_at", { withTimezone: true, mode: 'string' }),
}, (table) => [
	foreignKey({
		columns: [table.programmeId],
		foreignColumns: [workflowProgrammes.id],
		name: "workflow_programme_phases_programme_fkey"
	}).onDelete("cascade"),
	foreignKey({
		columns: [table.phaseId],
		foreignColumns: [workflowPhases.id],
		name: "workflow_programme_phases_phase_fkey"
	}),
	unique("program_phases_program_id_phase_id_key").on(table.programmeId, table.phaseId),
	check("program_phases_status_check", sql`${table.status} = ANY (ARRAY['not_started'::text, 'in_progress'::text, 'completed'::text])`),
]);

export const workflowProgrammePhaseSteps = workflow.table("programme_phase_steps", {
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
		foreignColumns: [workflowPhaseSteps.id],
		name: "workflow_programme_phase_steps_phase_step_fkey"
	}),
	foreignKey({
		columns: [table.programmePhaseId],
		foreignColumns: [workflowProgrammePhases.id],
		name: "workflow_programme_phase_steps_programme_phase_fkey"
	}).onDelete("cascade"),
	unique("program_phase_steps_program_phase_id_phase_step_id_key").on(table.programmePhaseId, table.phaseStepId),
]);

export const workflowAttachments = workflow.table("attachments", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	programmePhaseStepId: uuid("programme_phase_step_id").notNull(),
	path: text().notNull(),
	uploadedBy: uuid("uploaded_by"),
	uploadedAt: timestamp("uploaded_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	mimeType: text("mime_type"),
	size: bigint({ mode: "number" }),
}, (table) => [
	foreignKey({
		columns: [table.programmePhaseStepId],
		foreignColumns: [workflowProgrammePhaseSteps.id],
		name: "workflow_attachments_programme_phase_step_fkey"
	}),
	foreignKey({
		columns: [table.uploadedBy],
		foreignColumns: [workflowUsers.id],
		name: "workflow_attachments_uploaded_by_fkey"
	}),
]);

export const workflowNotifications = workflow.table("notifications", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	title: text().notNull(),
	message: text().notNull(),
	type: text(),
	referenceId: uuid("reference_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_notification_created").using("btree", table.createdAt.desc().nullsFirst().op("timestamp_ops")),
]);

export const workflowNotificationRecipients = workflow.table("notification_recipients", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	notificationId: uuid("notification_id"),
	recipientId: uuid("recipient_id"),
	isRead: boolean("is_read").default(false),
	readAt: timestamp("read_at", { mode: 'string' }),
}, (table) => [
	index("idx_notification_recipient").using("btree", table.recipientId.asc().nullsLast().op("bool_ops"), table.isRead.asc().nullsLast().op("uuid_ops")),
	foreignKey({
		columns: [table.notificationId],
		foreignColumns: [workflowNotifications.id],
		name: "workflow_notification_recipients_notification_fkey"
	}).onDelete("cascade"),
	foreignKey({
		columns: [table.recipientId],
		foreignColumns: [workflowUsers.id],
		name: "workflow_notification_recipients_recipient_fkey"
	}).onDelete("cascade"),
	unique("notification_recipients_notification_id_recipient_id_key").on(table.recipientId, table.notificationId),
]);

export const workflowEvents = workflow.table("events", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	title: text(),
	date: timestamp({ mode: 'string' }),
});

export const workflowDefinitions = workflow.table("definitions", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	slug: text().notNull(),
	name: text().notNull(),
	description: text(),
	status: text().default('draft').notNull(),
	createdBy: uuid("created_by"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("workflow_definitions_slug_key").on(table.slug),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [workflowUsers.id],
			name: "workflow_definitions_created_by_fkey"
		}).onDelete("set null"),
	check("workflow_definitions_status_check", sql`${table.status} = ANY (ARRAY['draft'::text, 'active'::text, 'archived'::text])`),
]);

export const workflowDefinitionVersions = workflow.table("definition_versions", {
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
	unique("workflow_definition_versions_definition_version_key").on(table.definitionId, table.version),
	foreignKey({
			columns: [table.definitionId],
			foreignColumns: [workflowDefinitions.id],
			name: "workflow_definition_versions_definition_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [workflowUsers.id],
			name: "workflow_definition_versions_created_by_fkey"
		}).onDelete("set null"),
	check("workflow_definition_versions_status_check", sql`${table.status} = ANY (ARRAY['draft'::text, 'published'::text, 'retired'::text])`),
]);

export const workflowProcessInstances = workflow.table("process_instances", {
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
			columns: [table.programmeId],
			foreignColumns: [workflowProgrammes.id],
			name: "workflow_process_instances_programme_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.definitionVersionId],
			foreignColumns: [workflowDefinitionVersions.id],
			name: "workflow_process_instances_definition_version_id_fkey"
		}),
	foreignKey({
			columns: [table.startedBy],
			foreignColumns: [workflowUsers.id],
			name: "workflow_process_instances_started_by_fkey"
		}).onDelete("set null"),
	check("workflow_process_instances_status_check", sql`${table.status} = ANY (ARRAY['running'::text, 'completed'::text, 'rejected'::text, 'stopped'::text, 'cancelled'::text])`),
]);

export const workflowTaskInstances = workflow.table("task_instances", {
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
	index("idx_workflow_tasks_status").using("btree", table.status.asc().nullsLast().op("text_ops")),
	index("idx_workflow_tasks_stage").using("btree", table.stageKey.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.processId],
			foreignColumns: [workflowProcessInstances.id],
			name: "workflow_task_instances_process_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.programmeId],
			foreignColumns: [workflowProgrammes.id],
			name: "workflow_task_instances_programme_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.causedByTaskId],
			foreignColumns: [table.id],
			name: "workflow_task_instances_caused_by_task_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.completedBy],
			foreignColumns: [workflowUsers.id],
			name: "workflow_task_instances_completed_by_fkey"
		}).onDelete("set null"),
	check("workflow_task_instances_status_check", sql`${table.status} = ANY (ARRAY['active'::text, 'completed'::text, 'cancelled'::text, 'skipped'::text])`),
]);

export const workflowArtifacts = workflow.table("artifacts", {
	id: uuid().default(sql`uuidv7()`).primaryKey().notNull(),
	programmeId: uuid("programme_id").notNull(),
	processId: uuid("process_id").notNull(),
	taskId: uuid("task_id").notNull(),
	type: text().notNull(),
	title: text().notNull(),
	reference: text(),
	path: text(),
	mimeType: text("mime_type"),
	size: bigint({ mode: "number" }),
	createdBy: uuid("created_by"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	status: text().default('submitted').notNull(),
	submittedAt: timestamp("submitted_at", { withTimezone: true, mode: 'string' }),
}, (table) => [
	index("idx_workflow_artifacts_programme").using("btree", table.programmeId.asc().nullsLast().op("uuid_ops")),
	index("idx_workflow_artifacts_task").using("btree", table.taskId.asc().nullsLast().op("uuid_ops")),
	index("idx_workflow_artifacts_status").using("btree", table.status.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.programmeId],
			foreignColumns: [workflowProgrammes.id],
			name: "workflow_artifacts_programme_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.processId],
			foreignColumns: [workflowProcessInstances.id],
			name: "workflow_artifacts_process_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.taskId],
			foreignColumns: [workflowTaskInstances.id],
			name: "workflow_artifacts_task_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [workflowUsers.id],
			name: "workflow_artifacts_created_by_fkey"
	}).onDelete("set null"),
	check("workflow_artifacts_status_check", sql`${table.status} = ANY (ARRAY['draft'::text, 'submitted'::text])`),
]);

export const workflowAuditEvents = workflow.table("audit_events", {
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
	index("idx_workflow_audit_programme").using("btree", table.programmeId.asc().nullsLast().op("uuid_ops")),
	index("idx_workflow_audit_process").using("btree", table.processId.asc().nullsLast().op("uuid_ops")),
	index("idx_workflow_audit_created").using("btree", table.createdAt.desc().nullsFirst().op("timestamptz_ops")),
	foreignKey({
			columns: [table.programmeId],
			foreignColumns: [workflowProgrammes.id],
			name: "workflow_audit_events_programme_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.processId],
			foreignColumns: [workflowProcessInstances.id],
			name: "workflow_audit_events_process_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.taskId],
			foreignColumns: [workflowTaskInstances.id],
			name: "workflow_audit_events_task_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.actorId],
			foreignColumns: [workflowUsers.id],
			name: "workflow_audit_events_actor_id_fkey"
		}).onDelete("set null"),
]);
