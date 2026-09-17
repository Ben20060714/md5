import { requireSession } from '@/lib/require-session'
import DashboardClient from './dashboard-client'

export default async function DashboardPage() {
  await requireSession()
  return <DashboardClient />
}
