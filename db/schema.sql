CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('admin', 'student')),
  age INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_login TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS progress (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  completed_lessons JSONB NOT NULL DEFAULT '[]',
  exercise_results JSONB NOT NULL DEFAULT '{}',
  current_week INTEGER NOT NULL DEFAULT 1,
  last_accessed TIMESTAMPTZ NOT NULL DEFAULT now()
);
