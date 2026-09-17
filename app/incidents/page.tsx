import { requireSession } from '@/lib/require-session'
import { SectionPage } from '@/components/section-page'
export default async function IncidentsPage() { await requireSession(); return <SectionPage section="incidents" /> }
