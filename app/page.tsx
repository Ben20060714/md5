import Link from 'next/link'
import { ArrowUpRight, Check, LockKeyhole, Radar, ShieldCheck, Siren, Workflow } from 'lucide-react'

const features = [
  { icon: Radar, title: 'Détection continue', copy: 'Vos signaux critiques sont corrélés en temps réel, avant qu’ils ne deviennent des incidents.' },
  { icon: Workflow, title: 'Réponse orchestrée', copy: 'Transformez chaque alerte en action claire avec des playbooks prêts à exécuter.' },
  { icon: LockKeyhole, title: 'Confiance mesurable', copy: 'Un score de sécurité lisible pour piloter vos priorités et rassurer vos équipes.' },
]

export default function HomePage() {
  return (
    <main className="marketing-page">
      <header className="marketing-header">
        <Link href="/" className="marketing-brand"><span className="brand-mark"><ShieldCheck size={20} /></span><span>CYBERSHIELD</span></Link>
        <nav aria-label="Navigation du site"><a href="#platform">Plateforme</a><a href="#approach">Méthode</a><a href="#contact">Contact</a></nav>
        <Link href="/sign-in" className="header-login">Accès administrateur <ArrowUpRight size={15} /></Link>
      </header>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> SECURITY OPERATIONS PLATFORM</p>
          <h1>La sécurité qui <em>anticipe</em> les menaces.</h1>
          <p className="hero-lede">Cybershield donne à vos équipes une vision nette des risques, des signaux faibles et des actions à prendre — dans un seul centre de contrôle.</p>
          <div className="hero-actions"><Link href="/sign-up" className="primary-button">Créer votre espace <ArrowUpRight size={16} /></Link><a href="#platform" className="text-link">Découvrir la plateforme <span>→</span></a></div>
          <div className="hero-proof"><div><strong>24/7</strong><span>Surveillance active</span></div><div><strong>94.8</strong><span>Score moyen protégé</span></div><div><strong>−38%</strong><span>Temps de réponse</span></div></div>
        </div>
        <div className="hero-visual" aria-label="Aperçu du centre de contrôle Cybershield">
          <div className="visual-topline"><span className="live-status"><span /> SYSTÈME OPÉRATIONNEL</span><span>LIVE FEED / 09:42:18</span></div>
          <div className="visual-score"><div><p>SECURITY SCORE</p><strong>94.8</strong><span>+2.4% depuis hier</span></div><div className="score-ring"><span>94</span></div></div>
          <div className="visual-lines"><span style={{ width: '92%' }} /><span style={{ width: '74%' }} /><span style={{ width: '86%' }} /><span style={{ width: '58%' }} /><span style={{ width: '80%' }} /></div>
          <div className="visual-alert"><Siren size={16} /><div><strong>Nouvelle alerte critique</strong><span>Tentative de connexion suspecte · auth-gateway</span></div><span className="alert-time">À l’instant</span></div>
        </div>
      </section>
      <section className="signal-strip"><span>PROTÈGEZ CE QUI COMPTE</span><i /> <span>Détection</span><i /> <span>Réponse</span><i /> <span>Résilience</span></section>
      <section className="feature-section" id="platform"><div className="section-intro"><p className="eyebrow">UNE PLATEFORME, UNE VISION</p><h2>De la donnée brute à la décision.</h2><p>Un espace de travail conçu pour les équipes qui veulent passer moins de temps à chercher et plus de temps à sécuriser.</p></div><div className="feature-grid">{features.map(({ icon: Icon, title, copy }) => <article className="feature-card" key={title}><span className="feature-icon"><Icon size={20} /></span><h3>{title}</h3><p>{copy}</p><ArrowUpRight size={17} /></article>)}</div></section>
      <section className="approach-section" id="approach"><div><p className="eyebrow">PENSÉ POUR L’ACTION</p><h2>Chaque seconde compte.<br /><em>Chaque signal aussi.</em></h2></div><div className="approach-copy"><p>Cybershield centralise vos incidents, vos actifs et vos automatisations dans une interface qui reste calme quand la menace monte.</p><Link href="/sign-up" className="text-link">Commencer maintenant <span>→</span></Link></div></section>
      <footer className="marketing-footer" id="contact"><span>© 2024 CYBERSHIELD</span><span>SECURITY OPERATIONS / FRANCE</span><Link href="/sign-in">Accès sécurisé <ArrowUpRight size={14} /></Link></footer>
    </main>
  )
}
