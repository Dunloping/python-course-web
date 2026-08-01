import { sql } from './_lib/db.js'
import { json, error, getAuthUser } from './_lib/http.js'
import { toSafeUser, toProgress } from './_lib/user.js'

export async function GET(req: Request) {
  const auth = await getAuthUser(req)
  if (!auth) return error('No autenticado', 401)

  const rows = await sql`
    SELECT id, name, email, role, age, created_at, last_login
    FROM users WHERE id = ${auth.userId} LIMIT 1
  `
  const user = rows[0]
  if (!user) return error('Usuario no encontrado', 404)

  const progressRows = await sql`
    SELECT completed_lessons, exercise_results, current_week, last_accessed
    FROM progress WHERE user_id = ${auth.userId} LIMIT 1
  `

  return json({
    user: {
      ...toSafeUser(user),
      progress: progressRows[0] ? toProgress(progressRows[0]) : undefined,
    },
  })
}
