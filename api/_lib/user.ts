export const COURSE_LIMITS = {
  maxParticipants: 10,
  minAge: 14,
  maxAge: 22,
} as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email)
}

type DbRow = Record<string, any>

export function toSafeUser(row: DbRow) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    age: row.age ?? undefined,
    createdAt: new Date(row.created_at).toISOString(),
    lastLogin: new Date(row.last_login).toISOString(),
  }
}

export function toProgress(row: DbRow) {
  const week =
    typeof row.current_week === 'number'
      ? row.current_week
      : parseInt(String(row.current_week), 10) || 1
  return {
    completedLessons: Array.isArray(row.completed_lessons) ? row.completed_lessons : [],
    exerciseResults: row.exercise_results && typeof row.exercise_results === 'object' ? row.exercise_results : {},
    currentWeek: week,
    lastAccessed: new Date(row.last_accessed).toISOString(),
  }
}
