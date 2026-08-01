import { sql } from './_lib/db.js'
import { json } from './_lib/http.js'
import { COURSE_LIMITS } from './_lib/user.js'

export async function GET() {
  const studentCount = await sql`SELECT COUNT(*)::int AS count FROM users WHERE role = 'student'`
  const taken = Number(studentCount[0]?.count ?? 0)
  const spotsRemaining = Math.max(0, COURSE_LIMITS.maxParticipants - taken)

  return json({ maxParticipants: COURSE_LIMITS.maxParticipants, spotsRemaining })
}
