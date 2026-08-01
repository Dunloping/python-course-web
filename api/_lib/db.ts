import { neon } from '@neondatabase/serverless'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('Falta la variable de entorno DATABASE_URL')
}

export const sql = neon(connectionString)
