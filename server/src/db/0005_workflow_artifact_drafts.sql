ALTER TABLE workflow.artifacts
ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'submitted',
ADD COLUMN IF NOT EXISTS submitted_at timestamptz;

ALTER TABLE workflow.artifacts
DROP CONSTRAINT IF EXISTS workflow_artifacts_status_check;

ALTER TABLE workflow.artifacts
ADD CONSTRAINT workflow_artifacts_status_check
CHECK (status = ANY (ARRAY['draft'::text, 'submitted'::text]));

UPDATE workflow.artifacts
SET submitted_at = COALESCE(submitted_at, created_at)
WHERE status = 'submitted';

CREATE INDEX IF NOT EXISTS idx_workflow_artifacts_status
ON workflow.artifacts USING btree (status);
