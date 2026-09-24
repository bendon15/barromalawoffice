-- Run via `npm run db:migrate` (see scripts/migrate.mjs).
-- Safe to run multiple times.

-- Consultation requests submitted from the website's booking form.
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Added for the law firm version; these also upgrade an older table in place.
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS practice_area TEXT;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS consult_mode TEXT;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS preferred_date DATE;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS preferred_time TEXT;

-- Backs simple rate limiting for the booking form and admin login (see
-- lib/rateLimit.ts). Rows are cleaned up automatically as they age out.
CREATE TABLE IF NOT EXISTS rate_limit_events (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rate_limit_events_key_created
  ON rate_limit_events (key, created_at);
