import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const securityIncidents = pgTable('security_incidents', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  source: text('source').notNull(),
  severity: text('severity').notNull(),
  detectedAt: timestamp('detected_at', { withTimezone: true }).notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
})

export type SecurityIncident = typeof securityIncidents.$inferSelect
