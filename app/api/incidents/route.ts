import { desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { securityIncidents } from '@/lib/schema'

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const incidents = await db.select().from(securityIncidents).orderBy(desc(securityIncidents.detectedAt)).limit(100)
  return NextResponse.json({ incidents })
}
