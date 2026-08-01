import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { scryptSync, randomBytes } from 'node:crypto'
import pg from 'pg'

const __dirname = dirname(fileURLToPath(import.meta.url))

const DATABASE_URL = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error('Falta DATABASE_URL. Corré: node --env-file=.env.local scripts/migrate.mjs')
  process.exit(1)
}

const client = new pg.Client({ connectionString: DATABASE_URL })
await client.connect()

function hashPassword(password) {
  const salt = randomBytes(16)
  const derived = scryptSync(password, salt, 32)
  return `scrypt:${salt.toString('base64')}:${derived.toString('base64')}`
}

async function main() {
  console.log('▶ Ejecutando schema...')
  const schema = readFileSync(join(__dirname, '..', 'db', 'schema.sql'), 'utf8')
  await client.query(schema)
  console.log('✓ Schema aplicado')

  const adminEmail = 'jesusdanielav@gmail.com'
  const existing = await client.query('SELECT id FROM users WHERE email = $1', [adminEmail])
  if (existing.rows.length === 0) {
    console.log('▶ Sembrando admin...')
    const passwordHash = hashPassword('Admin123!')
    await client.query(
      `INSERT INTO users (id, name, email, password_hash, role)
       VALUES ('admin-main-001', 'Jesús Alvarado', $1, $2, 'admin')`,
      [adminEmail, passwordHash]
    )
    await client.query(
      `INSERT INTO progress (user_id, completed_lessons, exercise_results, current_week)
       VALUES ('admin-main-001', '[]', '{}', 1)`
    )
    console.log('✓ Admin sembrado')
  } else {
    console.log('• Admin ya existe, no se repite el seed')
  }

  console.log('✓ Migración completada')
  await client.end()
  process.exit(0)
}

main().catch(async (err) => {
  console.error('✗ Error en migración:', err)
  await client.end().catch(() => {})
  process.exit(1)
})
