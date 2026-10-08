BEGIN;

-- Shared application data lives in public. Copy any records that exist only in
-- the former workflow copies before changing foreign keys.
INSERT INTO public.faculty SELECT * FROM workflow.faculty ON CONFLICT (id) DO NOTHING;
INSERT INTO public.departments SELECT * FROM workflow.departments ON CONFLICT (id) DO NOTHING;
INSERT INTO public.users (id, ad_user_id, email, display_name, role, created_at, updated_at, password, first_name, last_name, "authToken", department)
SELECT id, ad_user_id, email, display_name, role, created_at, updated_at, password, first_name, last_name, "authToken", department
FROM workflow.users ON CONFLICT (id) DO NOTHING;
INSERT INTO public.programmes SELECT * FROM workflow.programmes ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notifications SELECT * FROM workflow.notifications ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_recipients SELECT * FROM workflow.notification_recipients ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.users ADD COLUMN IF NOT EXISTS email_notifications_enabled boolean NOT NULL DEFAULT false;
UPDATE public.users AS target
SET email_notifications_enabled = source.email_notifications_enabled
FROM workflow.users AS source
WHERE target.id = source.id;

-- Workflow engine tables now reference shared public entities.
ALTER TABLE workflow.definitions DROP CONSTRAINT IF EXISTS workflow_definitions_created_by_fkey;
ALTER TABLE workflow.definitions ADD CONSTRAINT workflow_definitions_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;
ALTER TABLE workflow.definition_versions DROP CONSTRAINT IF EXISTS workflow_definition_versions_created_by_fkey;
ALTER TABLE workflow.definition_versions ADD CONSTRAINT workflow_definition_versions_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;
ALTER TABLE workflow.process_instances DROP CONSTRAINT IF EXISTS workflow_process_instances_programme_id_fkey;
ALTER TABLE workflow.process_instances ADD CONSTRAINT workflow_process_instances_programme_id_fkey FOREIGN KEY (programme_id) REFERENCES public.programmes(id) ON DELETE CASCADE;
ALTER TABLE workflow.process_instances DROP CONSTRAINT IF EXISTS workflow_process_instances_started_by_fkey;
ALTER TABLE workflow.process_instances ADD CONSTRAINT workflow_process_instances_started_by_fkey FOREIGN KEY (started_by) REFERENCES public.users(id) ON DELETE SET NULL;
ALTER TABLE workflow.task_instances DROP CONSTRAINT IF EXISTS workflow_task_instances_programme_id_fkey;
ALTER TABLE workflow.task_instances ADD CONSTRAINT workflow_task_instances_programme_id_fkey FOREIGN KEY (programme_id) REFERENCES public.programmes(id) ON DELETE CASCADE;
ALTER TABLE workflow.task_instances DROP CONSTRAINT IF EXISTS workflow_task_instances_completed_by_fkey;
ALTER TABLE workflow.task_instances ADD CONSTRAINT workflow_task_instances_completed_by_fkey FOREIGN KEY (completed_by) REFERENCES public.users(id) ON DELETE SET NULL;
ALTER TABLE workflow.audit_events DROP CONSTRAINT IF EXISTS workflow_audit_events_programme_id_fkey;
ALTER TABLE workflow.audit_events ADD CONSTRAINT workflow_audit_events_programme_id_fkey FOREIGN KEY (programme_id) REFERENCES public.programmes(id) ON DELETE CASCADE;
ALTER TABLE workflow.audit_events DROP CONSTRAINT IF EXISTS workflow_audit_events_actor_id_fkey;
ALTER TABLE workflow.audit_events ADD CONSTRAINT workflow_audit_events_actor_id_fkey FOREIGN KEY (actor_id) REFERENCES public.users(id) ON DELETE SET NULL;

-- The legacy phase-step attachment table is obsolete. The workflow engine's
-- artifacts table is the active file record and is renamed to attachments.
DROP TABLE IF EXISTS workflow.attachments CASCADE;
ALTER TABLE workflow.artifacts RENAME TO attachments;
ALTER INDEX IF EXISTS workflow.idx_workflow_artifacts_programme RENAME TO idx_workflow_attachments_programme;
ALTER INDEX IF EXISTS workflow.idx_workflow_artifacts_task RENAME TO idx_workflow_attachments_task;
ALTER TABLE workflow.attachments DROP CONSTRAINT IF EXISTS workflow_artifacts_programme_id_fkey;
ALTER TABLE workflow.attachments ADD CONSTRAINT workflow_attachments_programme_id_fkey FOREIGN KEY (programme_id) REFERENCES public.programmes(id) ON DELETE CASCADE;
ALTER TABLE workflow.attachments DROP CONSTRAINT IF EXISTS workflow_artifacts_created_by_fkey;
ALTER TABLE workflow.attachments ADD CONSTRAINT workflow_attachments_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;

-- Remove legacy workflow copies and the obsolete public phase/event model.
DROP TABLE IF EXISTS workflow.notification_recipients, workflow.notifications, workflow.events,
  workflow.programme_phase_steps, workflow.programme_phases, workflow.phase_steps, workflow.phases,
  workflow.departments, workflow.faculty, workflow.programmes, workflow.users CASCADE;
DROP TABLE IF EXISTS public.attachments, public.programme_phase_steps, public.programme_phases,
  public.phase_steps, public.phases, public.events CASCADE;

COMMIT;
