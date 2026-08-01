import { randomUUID } from 'node:crypto'
import { sql } from './_lib/db.js'
import { hashPassword } from './_lib/password.js'
import { json, error, readBody } from './_lib/http.js'
import { COURSE_LIMITS, isValidEmail, toSafeUser } from './_lib/user.js'

export async function POST(req: Request) {
  const body = await readBody<{ name?: string; email?: string; password?: string; age?: number }>(req)
  if (!body) return error('Datos inválidos')

  const name = (body.name ?? '').trim()
  const email = (body.email ?? '').trim().toLowerCase()
  const password = body.password ?? ''

  if (!name || name.length > 100) return error('El nombre es requerido')
  if (!isValidEmail(email)) return error('Correo electrónico inválido')
  if (password.length < 6) return error('La contraseña debe tener al menos 6 caracteres')

  const age = body.age
  if (typeof age !== 'number' || age < COURSE_LIMITS.minAge || age > COURSE_LIMITS.maxAge) {
    return error(`La edad debe ser entre ${COURSE_LIMITS.minAge} y ${COURSE_LIMITS.maxAge} años`)
  }

  const existing = await sql`SELECT id FROM users WHERE email = ${email}`
  if (existing.length > 0) return error('El correo electrónico ya está registrado', 409)

  const studentCount = await sql`SELECT COUNT(*)::int AS count FROM users WHERE role = 'student'`
  if (Number(studentCount[0]?.count ?? 0) >= COURSE_LIMITS.maxParticipants) {
    return error('No hay cupos disponibles. El curso está lleno', 409)
  }

  const id = `student-${randomUUID()}`
  const passwordHash = hashPassword(password)
  const now = new Date()

  await sql`
    INSERT INTO users (id, name, email, password_hash, role, age, created_at, last_login)
    VALUES (${id}, ${name}, ${email}, ${passwordHash}, 'student', ${age}, ${now}, ${now})
  `
  await sql`
    INSERT INTO progress (user_id, completed_lessons, exercise_results, current_week, last_accessed)
    VALUES (${id}, '[]', '{}', 1, ${now})
  `

  const row = { id, name, email, role: 'student', age, created_at: now, last_login: now }

  return json({ user: toSafeUser(row) }, 201)
}
