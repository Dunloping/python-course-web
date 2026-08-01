import { sql } from './_lib/db.js'
import { verifyPassword } from './_lib/password.js'
import { signToken } from './_lib/jwt.js'
import { json, error, readBody, authCookie } from './_lib/http.js'
import { isValidEmail, toSafeUser } from './_lib/user.js'

export async function POST(req: Request) {
  const body = await readBody<{ email?: string; password?: string }>(req)
  if (!body || !body.email || !body.password) return error('Correo y contraseña requeridos')

  const email = body.email.trim().toLowerCase()
  if (!isValidEmail(email)) return error('Correo electrónico inválido')

  const rows = await sql`
    SELECT id, name, email, password_hash, role, age, created_at, last_login
    FROM users WHERE email = ${email} LIMIT 1
  `
  const user = rows[0]

  if (!user || !verifyPassword(body.password, user.password_hash)) {
    return error('Correo o contraseña incorrectos', 401)
  }

  const now = new Date()
  await sql`UPDATE users SET last_login = ${now} WHERE id = ${user.id}`

  const token = await signToken({ userId: user.id, email: user.email, role: user.role as 'admin' | 'student' })

  return json(
    { user: toSafeUser({ ...user, last_login: now }) },
    200,
    { 'Set-Cookie': authCookie(token) },
  )
}
