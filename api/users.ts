import { randomUUID } from 'node:crypto'
import { sql } from './_lib/db.js'
import { hashPassword } from './_lib/password.js'
import { json, error, readBody, getAuthUser } from './_lib/http.js'
import { COURSE_LIMITS, isValidEmail, toSafeUser, toProgress } from './_lib/user.js'

function getIdFromUrl(req: Request): string | null {
  return new URL(req.url).searchParams.get('id')
}

export async function GET(req: Request) {
  const auth = await getAuthUser(req)
  if (!auth) return error('No autenticado', 401)
  if (auth.role !== 'admin') return error('Acceso denegado', 403)

  const rows = await sql`
    SELECT u.id, u.name, u.email, u.role, u.age, u.created_at, u.last_login,
           p.completed_lessons, p.exercise_results, p.current_week, p.last_accessed AS progress_last_accessed
    FROM users u
    LEFT JOIN progress p ON p.user_id = u.id
    ORDER BY u.created_at ASC
  `

  const users = rows.map((row) => {
    const safe = toSafeUser(row)
    if (row.completed_lessons !== undefined && row.completed_lessons !== null) {
      safe.progress = toProgress({
        completed_lessons: row.completed_lessons,
        exercise_results: row.exercise_results,
        current_week: row.current_week,
        last_accessed: row.progress_last_accessed,
      })
    }
    return safe
  })

  return json({ users })
}

export async function POST(req: Request) {
  const auth = await getAuthUser(req)
  if (!auth) return error('No autenticado', 401)
  if (auth.role !== 'admin') return error('Acceso denegado', 403)

  const body = await readBody<{
    name?: string
    email?: string
    password?: string
    role?: string
    age?: number
  }>(req)
  if (!body) return error('Datos inválidos')

  const name = (body.name ?? '').trim()
  const email = (body.email ?? '').trim().toLowerCase()
  const password = body.password ?? ''

  if (!name || name.length > 100) return error('El nombre es requerido')
  if (!isValidEmail(email)) return error('Correo electrónico inválido')
  if (password.length < 6) return error('La contraseña debe tener al menos 6 caracteres')

  const role = body.role === 'admin' ? 'admin' : 'student'
  const age = body.age

  if (role === 'student' && (typeof age !== 'number' || age < COURSE_LIMITS.minAge || age > COURSE_LIMITS.maxAge)) {
    return error(`La edad debe ser entre ${COURSE_LIMITS.minAge} y ${COURSE_LIMITS.maxAge} años`)
  }

  const existing = await sql`SELECT id FROM users WHERE email = ${email}`
  if (existing.length > 0) return error('El correo electrónico ya está registrado', 409)

  if (role === 'student') {
    const studentCount = await sql`SELECT COUNT(*)::int AS count FROM users WHERE role = 'student'`
    if (Number(studentCount[0]?.count ?? 0) >= COURSE_LIMITS.maxParticipants) {
      return error('No hay cupos disponibles. El curso está lleno', 409)
    }
  }

  const id = `user-${randomUUID()}`
  const passwordHash = hashPassword(password)
  const now = new Date()

  await sql`
    INSERT INTO users (id, name, email, password_hash, role, age, created_at, last_login)
    VALUES (${id}, ${name}, ${email}, ${passwordHash}, ${role}, ${age ?? null}, ${now}, ${now})
  `
  await sql`
    INSERT INTO progress (user_id, completed_lessons, exercise_results, current_week, last_accessed)
    VALUES (${id}, '[]', '{}', 1, ${now})
  `

  const row = { id, name, email, role, age: age ?? null, created_at: now, last_login: now }
  return json({ user: toSafeUser(row) }, 201)
}

export async function PATCH(req: Request) {
  const auth = await getAuthUser(req)
  if (!auth) return error('No autenticado', 401)

  const id = getIdFromUrl(req)
  if (!id) return error('Usuario no encontrado', 404)

  const isSelf = auth.userId === id
  if (!isSelf && auth.role !== 'admin') return error('Acceso denegado', 403)

  const body = await readBody<{
    name?: string
    email?: string
    password?: string
    role?: string
    age?: number | null
  }>(req)
  if (!body) return error('Datos inválidos')

  const isMainAdmin = id === 'admin-main-001'
  const target = (await sql`SELECT id, email, role FROM users WHERE id = ${id} LIMIT 1`)[0]
  if (!target) return error('Usuario no encontrado', 404)

  if (isSelf && auth.role !== 'admin') {
    const allowed = Object.keys(body).every((k) => k === 'name' || k === 'password')
    if (!allowed) return error('No tenés permiso para modificar esos campos', 403)
  }

  const updates: string[] = []
  const values: unknown[] = []

  if (body.name !== undefined) {
    const name = String(body.name).trim()
    if (!name || name.length > 100) return error('El nombre es requerido')
    updates.push(`name = $${values.length + 1}`)
    values.push(name)
  }

  if (body.email !== undefined) {
    const email = String(body.email).trim().toLowerCase()
    if (!isValidEmail(email)) return error('Correo electrónico inválido')
    if (email === target.email) {
      // sin cambios: se ignora
    } else if (isMainAdmin) {
      return error('No se puede cambiar el correo del administrador principal', 403)
    } else {
      const conflict = await sql`SELECT id FROM users WHERE email = ${email} AND id <> ${id}`
      if (conflict.length > 0) return error('El correo electrónico ya está registrado', 409)
      updates.push(`email = $${values.length + 1}`)
      values.push(email)
    }
  }

  if (body.role !== undefined) {
    const role = body.role === 'admin' ? 'admin' : 'student'
    if (role === target.role) {
      // sin cambios: se ignora
    } else if (isMainAdmin) {
      return error('No se puede cambiar el rol del administrador principal', 403)
    } else {
      if (isSelf && role !== 'admin') return error('No podés quitarte tu propio rol de administrador', 403)
      updates.push(`role = $${values.length + 1}`)
      values.push(role)
    }
  }

  if (body.password !== undefined && body.password !== '') {
    if (String(body.password).length < 6) return error('La contraseña debe tener al menos 6 caracteres')
    updates.push(`password_hash = $${values.length + 1}`)
    values.push(hashPassword(String(body.password)))
  }

  if (body.age !== undefined) {
    const age = body.age === null ? null : body.age
    if (age !== null && (typeof age !== 'number' || age < COURSE_LIMITS.minAge || age > COURSE_LIMITS.maxAge)) {
      return error(`La edad debe ser entre ${COURSE_LIMITS.minAge} y ${COURSE_LIMITS.maxAge} años`)
    }
    updates.push(`age = $${values.length + 1}`)
    values.push(age)
  }

  if (updates.length === 0) return error('No hay campos para actualizar')

  await sql.query(
    `UPDATE users SET ${updates.join(', ')} WHERE id = $${values.length + 1}`,
    [...values, id],
  )

  const rows = await sql`
    SELECT id, name, email, role, age, created_at, last_login
    FROM users WHERE id = ${id} LIMIT 1
  `

  return json({ user: toSafeUser(rows[0]) })
}

export async function DELETE(req: Request) {
  const auth = await getAuthUser(req)
  if (!auth) return error('No autenticado', 401)
  if (auth.role !== 'admin') return error('Acceso denegado', 403)

  const id = getIdFromUrl(req)
  if (!id) return error('Usuario no encontrado', 404)

  if (id === 'admin-main-001') return error('No se puede eliminar el administrador principal', 403)
  if (auth.userId === id) return error('No podés eliminar tu propia cuenta', 403)

  const target = await sql`SELECT id FROM users WHERE id = ${id} LIMIT 1`
  if (target.length === 0) return error('Usuario no encontrado', 404)

  await sql`DELETE FROM users WHERE id = ${id}`
  return json({ ok: true })
}
