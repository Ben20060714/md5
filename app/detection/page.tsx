import { requireSession } from '@/lib/require-session'
import { SectionPage } from '@/components/section-page'
export default async function DetectionPage() { await requireSession(); return <SectionPage section="detection" /> }
