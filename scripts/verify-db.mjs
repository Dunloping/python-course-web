import pg from 'pg'

const client = new pg.Client({ connectionString: process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL })
await client.connect()

const tables = await client.query("SELECT tablename FROM pg_tables WHERE schemaname = 'public'")
console.log('tables:', tables.rows.map((r) => r.tablename).join(', '))

const users = await client.query('SELECT id, name, email, role, created_at FROM users')
console.log('users:', JSON.stringify(users.rows))

const progress = await client.query('SELECT user_id, completed_lessons, current_week FROM progress')
console.log('progress:', JSON.stringify(progress.rows))

await client.end()
process.exit(0)
