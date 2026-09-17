'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Activity, Bell, CheckCircle2, ChevronDown, CircleHelp, Clock3, Database, LayoutDashboard, Menu, Radar, Search, Server, ShieldAlert, ShieldCheck, SlidersHorizontal, UserRound, X, Zap } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import type { SecurityIncident } from '@/lib/schema'

function label(value: string) { return value.replace(/[-_]/g, ' ') }
function formatDate(value: Date | string) { return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(value)) }

export default function DashboardClient() {
  const [incidents, setIncidents] = useState<SecurityIncident[]>([])
  const [query, setQuery] = useState('')
  const [severity, setSeverity] = useState('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    fetch('/api/incidents', { cache: 'no-store' })
      .then(async (response) => { if (!response.ok) throw new Error('Impossible de charger les incidents'); return response.json() as Promise<{ incidents: SecurityIncident[] }> })
      .then((data) => active && setIncidents(data.incidents ?? []))
      .catch((reason: unknown) => active && setError(reason instanceof Error ? reason.message : 'Une erreur est survenue'))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  const visibleIncidents = useMemo(() => incidents.filter((incident) => `${incident.title} ${incident.source}`.toLowerCase().includes(query.toLowerCase()) && (severity === 'all' || incident.severity === severity)), [incidents, query, severity])
  const criticalCount = incidents.filter((incident) => incident.severity === 'critique').length
  const activeCount = incidents.filter((incident) => incident.status !== 'resolu').length
  const count = (value: string) => incidents.filter((incident) => incident.severity === value).length

  async function signOut() { await authClient.signOut(); window.location.assign('/sign-in') }

  return <div className="app-shell dashboard-glass">
    <aside className={`sidebar glass-panel ${menuOpen ? 'sidebar-open' : ''}`}>
      <div className="brand-lockup"><span className="brand-mark"><ShieldCheck size={18} /></span><div><strong>CYBERSHIELD</strong><span>SECURITY OPERATIONS</span></div><button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Fermer le menu"><X size={18} /></button></div>
      <p className="workspace-label"><Database size={11} /> WORKSPACE</p>
      <button className="workspace-switcher"><span className="workspace-avatar">MD</span><span><strong>MD5 Security</strong><small>Équipe SOC</small></span><ChevronDown size={14} /></button>
      <nav className="primary-nav" aria-label="Navigation principale"><span className="nav-label">VUE D’ENSEMBLE</span><Link href="/dashboard" className="nav-item nav-active"><LayoutDashboard size={15} /> Dashboard</Link><Link href="/incidents" className="nav-item"><ShieldAlert size={15} /> Incidents <em>{criticalCount}</em></Link><Link href="/detection" className="nav-item"><Radar size={15} /> Détection</Link><Link href="/assets" className="nav-item"><Server size={15} /> Actifs</Link><span className="nav-label nav-spacer">OUTILS</span><Link href="/automations" className="nav-item"><Zap size={15} /> Automatisations</Link><Link href="/settings" className="nav-item"><SlidersHorizontal size={15} /> Paramètres</Link></nav>
      <div className="sidebar-bottom"><button className="profile-card" onClick={signOut}><span className="profile-avatar"><UserRound size={14} /></span><span><strong>Administrateur</strong><small>Se déconnecter</small></span><ChevronDown size={14} /></button></div>
    </aside>
    <section className="content-area"><header className="topbar glass-header"><button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Ouvrir le menu"><Menu size={19} /></button><div className="breadcrumb"><span>Workspace</span><span>/</span><strong>Dashboard</strong></div><div className="topbar-actions"><span className="live-status"><span /> SYSTÈME OPÉRATIONNEL</span><button className="help-button"><CircleHelp size={14} /> Aide</button><button className="icon-button" onClick={() => setNotificationsOpen((open) => !open)} aria-label="Notifications"><Bell size={17} /><i>{criticalCount}</i></button>{notificationsOpen && <div className="notification-popover glass-panel"><strong>Centre de notifications</strong><p><ShieldAlert size={13} /> {criticalCount ? `${criticalCount} alerte(s) critique(s)` : 'Aucune alerte critique'}</p><p><CheckCircle2 size={13} /> Système opérationnel</p></div>}</div></header>
      <main className="dashboard-content"><div className="page-heading"><div><p className="eyebrow">JEUDI 17 SEPTEMBRE 2026 · 09:42 UTC</p><h1>Bonjour, administrateur.</h1><p className="heading-copy">Voici l’état de votre environnement de sécurité.</p></div><button className="primary-button"><Zap size={15} /> Lancer une analyse</button></div>
        <section className="metrics-grid"><Metric title="Score de sécurité" value="94.8" detail="+2.4% depuis hier" icon={<ShieldCheck size={14} />} tone="green" /><Metric title="Incidents actifs" value={String(activeCount)} detail={`${criticalCount} critique(s)`} icon={<ShieldAlert size={14} />} tone="red" /><Metric title="Temps de réponse" value="2m 14s" detail="−38% ce mois-ci" icon={<Clock3 size={14} />} tone="amber" /><Metric title="Sources surveillées" value="24" detail="Toutes opérationnelles" icon={<Activity size={14} />} tone="blue" /></section>
        <section className="main-grid"><article className="panel glass-panel"><div className="panel-header"><div><h2>Activité de détection</h2><p>Volume de signaux corrélés · 7 derniers jours</p></div><span className="stream-indicator"><span /> LIVE</span></div><div className="activity-chart"><div className="chart-y-labels"><span>80</span><span>60</span><span>40</span><span>20</span><span>0</span></div><div className="chart-area"><div className="chart-gridlines"><span /><span /><span /><span /><span /></div><svg viewBox="0 0 600 170" preserveAspectRatio="none" aria-label="Graphique d’activité"><path className="chart-fill" d="M0 143 L75 118 L150 130 L225 82 L300 102 L375 62 L450 78 L525 38 L600 53 L600 170 L0 170Z" /><path className="chart-line" d="M0 143 L75 118 L150 130 L225 82 L300 102 L375 62 L450 78 L525 38 L600 53" /></svg><div className="chart-x-labels"><span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span></div></div></div><div className="chart-legend"><span><i className="legend-green" /> Signaux détectés</span><span><i className="legend-orange" /> Incidents confirmés</span><span><i className="legend-line" /> Réponse moyenne</span></div></article><article className="panel glass-panel"><div className="panel-header"><div><h2>Répartition des menaces</h2><p>Par niveau de sévérité</p></div></div><div className="threat-visual"><div className="donut"><div><strong>{incidents.length}</strong><span>incidents</span></div></div><div className="threat-list"><Threat tone="red" name="Critique" value={criticalCount} /><Threat tone="orange" name="Élevée" value={count('élevée')} /><Threat tone="yellow" name="Moyenne" value={count('moyenne')} /><Threat tone="blue" name="Faible" value={count('faible')} /></div></div></article></section>
        <section className="panel incidents-panel glass-panel"><div className="panel-header incidents-header"><div><h2>Incidents récents</h2><p>Les dernières alertes remontées par vos sources.</p></div><button className="secondary-button"><CheckCircle2 size={14} /> Tout exporter</button></div><div className="table-toolbar"><label className="search-field"><Search size={13} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un incident..." aria-label="Rechercher un incident" /></label><label className="filter-group"><SlidersHorizontal size={12} /><select value={severity} onChange={(event) => setSeverity(event.target.value)} aria-label="Filtrer par sévérité"><option value="all">Toutes les sévérités</option><option value="critique">Critique</option><option value="élevée">Élevée</option><option value="moyenne">Moyenne</option><option value="faible">Faible</option></select></label></div><div className="incidents-table-wrap">{loading ? <p className="empty-state">Chargement des incidents…</p> : error ? <p className="empty-state auth-error">{error}</p> : visibleIncidents.length === 0 ? <p className="empty-state">Aucun incident ne correspond à votre recherche.</p> : <table><thead><tr><th>Incident</th><th>Source</th><th>Sévérité</th><th>Statut</th><th>Détection</th><th /></tr></thead><tbody>{visibleIncidents.map((incident) => <tr key={incident.id}><td><div className="incident-title"><span className="incident-icon"><ShieldAlert size={14} /></span><span><strong>{incident.title}</strong><small>#{incident.id.slice(0, 8)}</small></span></div></td><td className="source-cell">{incident.source}</td><td><span className={`severity severity-${incident.severity}`}><i className="status-dot" />{label(incident.severity)}</span></td><td><span className={`incident-status status-label-${incident.status}`}><i className="status-dot" />{label(incident.status)}</span></td><td><span className="time-cell"><Clock3 size={12} />{formatDate(incident.detectedAt)}</span></td><td><button className="resolve-button">Examiner</button></td></tr>)}</tbody></table>}</div></section>
        <footer className="dashboard-footer"><span><span className="stream-indicator"><span /> SYSTÈME OPÉRATIONNEL</span></span><span>Dernière synchronisation <b>à l’instant</b></span></footer>
      </main></section>
  </div>
}

function Metric({ title, value, detail, icon, tone }: { title: string; value: string; detail: string; icon: React.ReactNode; tone: string }) { return <article className="metric-card glass-panel"><div className="metric-topline">{title}<span className={`metric-icon metric-${tone}`}>{icon}</span></div><strong>{value}</strong><p className={`metric-detail metric-${tone}`}>{detail}</p></article> }
function Threat({ tone, name, value }: { tone: string; name: string; value: number }) { return <div><i className={`threat-dot threat-${tone}`} /> {name} <strong>{value}</strong></div> }
