import { sql } from './_lib/db.js'
import { json, error, readBody, getAuthUser } from './_lib/http.js'
import { toProgress } from './_lib/user.js'

export async function GET(req: Request) {
  const auth = await getAuthUser(req)
  if (!auth) return error('No autenticado', 401)

  let rows = await sql`
    SELECT completed_lessons, exercise_results, current_week, last_accessed
    FROM progress WHERE user_id = ${auth.userId} LIMIT 1
  `

  if (rows.length === 0) {
    await sql`
      INSERT INTO progress (user_id, completed_lessons, exercise_results, current_week, last_accessed)
      VALUES (${auth.userId}, '[]', '{}', 1, now())
    `
    rows = await sql`
      SELECT completed_lessons, exercise_results, current_week, last_accessed
      FROM progress WHERE user_id = ${auth.userId} LIMIT 1
    `
  }

  return json({ progress: toProgress(rows[0]) })
}

export async function PUT(req: Request) {
  const auth = await getAuthUser(req)
  if (!auth) return error('No autenticado', 401)

  const body = await readBody<{
    completedLessons?: string[]
    exerciseResults?: Record<string, unknown>
    currentWeek?: number
  }>(req)
  if (!body) return error('Datos inválidos')

  const current = await sql`
    SELECT completed_lessons, exercise_results, current_week, last_accessed
    FROM progress WHERE user_id = ${auth.userId} LIMIT 1
  `

  const base = current[0]
  const completedLessons = Array.isArray(body.completedLessons)
    ? JSON.stringify(body.completedLessons)
    : base?.completed_lessons
      ? JSON.stringify(base.completed_lessons)
      : '[]'
  const exerciseResults =
    body.exerciseResults && typeof body.exerciseResults === 'object'
      ? JSON.stringify(body.exerciseResults)
      : base?.exercise_results
        ? JSON.stringify(base.exercise_results)
        : '{}'
  const currentWeek =
    typeof body.currentWeek === 'number' && body.currentWeek >= 1
      ? body.currentWeek
      : base?.current_week ?? 1

  await sql`
    INSERT INTO progress (user_id, completed_lessons, exercise_results, current_week, last_accessed)
    VALUES (${auth.userId}, ${completedLessons}, ${exerciseResults}, ${currentWeek}, now())
    ON CONFLICT (user_id) DO UPDATE SET
      completed_lessons = EXCLUDED.completed_lessons,
      exercise_results = EXCLUDED.exercise_results,
      current_week = EXCLUDED.current_week,
      last_accessed = now()
  `

  const rows = await sql`
    SELECT completed_lessons, exercise_results, current_week, last_accessed
    FROM progress WHERE user_id = ${auth.userId} LIMIT 1
  `

  return json({ progress: toProgress(rows[0]) })
}
