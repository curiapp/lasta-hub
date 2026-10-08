ALTER TABLE workflow.definitions
    ADD COLUMN IF NOT EXISTS is_default boolean DEFAULT false NOT NULL;

UPDATE workflow.definitions
SET is_default = (slug = 'programme-development');

CREATE UNIQUE INDEX IF NOT EXISTS workflow_definitions_single_default
    ON workflow.definitions (is_default)
    WHERE is_default = true;
