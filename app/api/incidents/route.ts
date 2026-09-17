import { desc } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { demoMode, getSafeSession } from '@/lib/session'
import { demoIncidents } from '@/lib/demo-data'
import { securityIncidents } from '@/lib/schema'

export async function GET() {
  try {
    const session = await getSafeSession()
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (demoMode) return NextResponse.json({ incidents: demoIncidents })
    const incidents = await db.select().from(securityIncidents).orderBy(desc(securityIncidents.detectedAt)).limit(100)
    return NextResponse.json({ incidents })
  } catch (error) {
    console.error('Failed to load incidents', error)
    return NextResponse.json({ error: 'Unable to load incidents' }, { status: 500 })
  }
}
