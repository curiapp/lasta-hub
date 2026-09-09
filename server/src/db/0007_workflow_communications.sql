CREATE TABLE IF NOT EXISTS workflow.communications (
    id uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
    programme_id uuid REFERENCES programmes(id) ON DELETE CASCADE,
    sender_id uuid REFERENCES users(id) ON DELETE SET NULL,
    recipient_id uuid REFERENCES users(id) ON DELETE SET NULL,
    recipient_email text NOT NULL,
    recipient_name text,
    scope text NOT NULL DEFAULT 'programme',
    subject text NOT NULL,
    body text NOT NULL,
    email_status text NOT NULL DEFAULT 'pending',
    email_error text,
    sent_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_workflow_communications_programme
    ON workflow.communications USING btree (programme_id);

CREATE INDEX IF NOT EXISTS idx_workflow_communications_recipient
    ON workflow.communications USING btree (recipient_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_workflow_communications_sender
    ON workflow.communications USING btree (sender_id, created_at DESC);
