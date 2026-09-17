import { redirect } from 'next/navigation'
import { getSafeSession } from '@/lib/session'

export async function requireSession() {
  const session = await getSafeSession()
  if (!session?.user) redirect('/sign-in')
  return session
}
