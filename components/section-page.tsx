'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Activity, Bot, Box, CheckCircle2, ChevronRight, CircleHelp, LayoutDashboard, LogOut, Menu, Settings2, ShieldAlert, Sparkles, X } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

const navigation = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/incidents', label: 'Incidents', icon: ShieldAlert },
  { href: '/detection', label: 'Détection', icon: Activity },
  { href: '/assets', label: 'Actifs', icon: Box },
  { href: '/automations', label: 'Automatisations', icon: Bot },
  { href: '/settings', label: 'Paramètres', icon: Settings2 },
]

const content: Record<string, { kicker: string; title: string; copy: string; cards: [string, string, string][] }> = {
  incidents: { kicker: 'CENTRE DE RÉPONSE', title: 'Incidents', copy: 'Centralisez, qualifiez et traitez chaque signal important.', cards: [['Incidents ouverts', '12', '−18% cette semaine'], ['Critiques', '03', 'Action immédiate requise'], ['Temps moyen', '2m 14s', 'Objectif : moins de 5m']] },
  detection: { kicker: 'VISIBILITÉ CONTINUE', title: 'Détection', copy: 'Vos sources remontent leurs signaux en temps réel.', cards: [['Sources connectées', '24', 'Toutes opérationnelles'], ['Signaux / heure', '1 284', '+12% sur 24h'], ['Règles actives', '86', '4 nécessitent une revue']] },
  assets: { kicker: 'INVENTAIRE SÉCURISÉ', title: 'Actifs', copy: 'Gardez une vue claire de votre surface d’exposition.', cards: [['Actifs surveillés', '248', '99.2% visibles'], ['À risque', '07', '3 nouveaux depuis hier'], ['Couverture', '94.8%', '+2.4% ce mois-ci']] },
  automations: { kicker: 'RÉPONSE ORCHESTRÉE', title: 'Automatisations', copy: 'Transformez vos playbooks en réponses rapides et fiables.', cards: [['Playbooks actifs', '18', '5 exécutions aujourd’hui'], ['Actions exécutées', '342', '98.6% de succès'], ['Temps économisé', '16h', 'Sur les 7 derniers jours']] },
  settings: { kicker: 'CONFIGURATION DU SOC', title: 'Paramètres', copy: 'Configurez l’espace, les accès et les notifications.', cards: [['Membres', '08', '2 invitations en attente'], ['Intégrations', '11', 'Toutes synchronisées'], ['Politique de session', '7 jours', 'Renouvellement automatique']] },
}

export function SectionPage({ section }: { section: keyof typeof content }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const data = content[section]
  async function signOut() { await authClient.signOut(); window.location.assign('/sign-in') }
  return <div className="app-shell dashboard-glass">
    <aside className={`sidebar glass-panel ${menuOpen ? 'sidebar-open' : ''}`}><div className="brand-lockup"><span className="brand-mark"><Sparkles size={17} /></span><div><strong>CYBERSHIELD</strong><span>SECURITY OPERATIONS</span></div><button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Fermer le menu"><X size={18} /></button></div><nav className="primary-nav section-navigation" aria-label="Navigation principale"><span className="nav-label">ESPACE DE TRAVAIL</span>{navigation.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={`nav-item ${href === `/${section}` ? 'nav-active' : ''}`}><Icon size={15} /> {label}</Link>)}</nav><div className="sidebar-bottom"><button className="profile-card" onClick={signOut}><span className="profile-avatar"><LogOut size={14} /></span><span><strong>Administrateur</strong><small>Se déconnecter</small></span><ChevronRight size={14} /></button></div></aside>
    <section className="content-area"><header className="topbar glass-header"><button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Ouvrir le menu"><Menu size={19} /></button><div className="breadcrumb"><span>Workspace</span><span>/</span><strong>{data.title}</strong></div><button className="help-button"><CircleHelp size={14} /> Aide</button></header><main className="dashboard-content section-content"><div className="page-heading"><div><p className="eyebrow">{data.kicker}</p><h1>{data.title}</h1><p className="heading-copy">{data.copy}</p></div><button className="primary-button"><Sparkles size={15} /> Nouvelle action</button></div><section className="metrics-grid">{data.cards.map(([title, value, detail]) => <article className="metric-card glass-panel" key={title}><div className="metric-topline">{title}<span className="metric-icon metric-cyan"><CheckCircle2 size={14} /></span></div><strong>{value}</strong><p className="metric-detail metric-cyan">{detail}</p></article>)}</section><section className="panel glass-panel section-feed"><div className="panel-header"><div><h2>Activité récente</h2><p>Les dernières informations de votre espace.</p></div><span className="stream-indicator"><span /> SYNCHRONISÉ</span></div><div className="feed-list"><div><span className="feed-icon"><CheckCircle2 size={15} /></span><span><strong>Synchronisation terminée</strong><small>Les sources de données sont à jour</small></span><time>À l’instant</time></div><div><span className="feed-icon"><ShieldAlert size={15} /></span><span><strong>Nouvelle priorité identifiée</strong><small>Une action nécessite votre attention</small></span><time>Il y a 12 min</time></div><div><span className="feed-icon"><Sparkles size={15} /></span><span><strong>Playbook recommandé</strong><small>Une réponse automatisée est disponible</small></span><time>Il y a 28 min</time></div></div><Link href="/dashboard" className="secondary-button section-back">Revenir au dashboard <ChevronRight size={14} /></Link></section></main></section>
  </div>
}
