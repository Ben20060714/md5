import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { hasDatabase } from '@/lib/db'

export const demoMode = process.env.NODE_ENV !== 'production' && !hasDatabase
export const demoSession = { user: { id: 'demo-admin', name: 'Administrateur', email: 'demo@cybershield.local' } }

export async function getSafeSession() {
  if (demoMode) return demoSession
  try { return await auth.api.getSession({ headers: await headers() }) } catch (error) { console.error('Failed to read session', error); return null }
}
