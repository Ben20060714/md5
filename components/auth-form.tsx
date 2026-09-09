'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const isSignUp = mode === 'sign-up'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)
    const result = isSignUp
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password })
    setLoading(false)
    if (result.error) {
      setError('Impossible de valider ces identifiants. Vérifiez les informations saisies.')
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <Link href="/" className="auth-brand">CYBERSHIELD</Link>
        <p className="auth-kicker">ESPACE ADMINISTRATEUR</p>
        <h1>{isSignUp ? 'Créer le compte administrateur' : 'Accéder au SOC'}</h1>
        <p className="auth-copy">{isSignUp ? 'La première inscription crée le compte de supervision.' : 'Connectez-vous pour surveiller votre environnement.'}</p>
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && <label>Nom complet<input value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" /></label>}
          <label>Email professionnel<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label>
          <label>Mot de passe<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} autoComplete={isSignUp ? 'new-password' : 'current-password'} /></label>
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="primary-button auth-submit" disabled={loading}>{loading ? 'Vérification…' : isSignUp ? 'Créer le compte' : 'Se connecter'}</button>
        </form>
        <p className="auth-switch">{isSignUp ? 'Déjà administrateur ?' : 'Premier accès ?'} <Link href={isSignUp ? '/sign-in' : '/sign-up'}>{isSignUp ? 'Se connecter' : 'Créer le compte'}</Link></p>
      </div>
    </main>
  )
}
