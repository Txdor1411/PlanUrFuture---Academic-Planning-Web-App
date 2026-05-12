-- Run this in Supabase SQL Editor to add new fields needed for PUF features.

-- 1. Profile: new fields for Calendar AI plan and Profile page
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS sat_score   integer;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS class_year  text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS goals       text;

-- 2. (Optional) calendar_tasks table for future Supabase persistence
--    Currently calendar uses localStorage; migrate here when ready.
CREATE TABLE IF NOT EXISTS calendar_tasks (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title       text NOT NULL,
  date        date NOT NULL,
  status      text DEFAULT 'todo' CHECK (status IN ('todo','in-progress','done')),
  source      text DEFAULT 'manual' CHECK (source IN ('manual','ai','activity')),
  priority    text DEFAULT 'low' CHECK (priority IN ('low','high')),
  notes       text,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE calendar_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "users own tasks"
  ON calendar_tasks
  USING (auth.uid() = user_id);

-- 3. (Optional) exercise_scores table for future score tracking
CREATE TABLE IF NOT EXISTS exercise_scores (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  exercise_id   text NOT NULL,
  subject       text NOT NULL,
  correct       boolean NOT NULL,
  completed_at  timestamptz DEFAULT now()
);

ALTER TABLE exercise_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "users own scores"
  ON exercise_scores
  USING (auth.uid() = user_id);
