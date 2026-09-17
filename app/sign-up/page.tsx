import { redirect } from 'next/navigation'
import { AuthForm } from '@/components/auth-form'
import { getSafeSession } from '@/lib/session'

export default async function SignUpPage() {
  const session = await getSafeSession()
  if (session?.user) redirect('/dashboard')
  return <AuthForm mode="sign-up" />
}
