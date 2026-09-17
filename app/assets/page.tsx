import { requireSession } from '@/lib/require-session'
import { SectionPage } from '@/components/section-page'
export default async function AssetsPage() { await requireSession(); return <SectionPage section="assets" /> }
