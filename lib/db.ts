import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { securityIncidents } from './schema'

const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL

export const pool = new Pool({ connectionString })
export const db = drizzle(pool, { schema: { securityIncidents } })
