-- Migration for Mailvibe: add "campaigns" table for email campaigns

CREATE TABLE IF NOT EXISTS "campaigns" (
  "id" text PRIMARY KEY DEFAULT gen_random_uuid(),
  "team_id" text NOT NULL REFERENCES "teams" ("id") ON DELETE CASCADE,
  "name" text NOT NULL,
  "subject" text NOT NULL,
  "content" text NOT NULL,
  "created_by_user_id" text NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);