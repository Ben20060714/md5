import type { SecurityIncident } from '@/lib/schema'

export const demoIncidents: SecurityIncident[] = [
  { id: 'inc-001', title: 'Tentative de connexion suspecte', source: 'auth-gateway', severity: 'critique', detectedAt: new Date('2026-09-17T09:38:00Z'), status: 'nouveau', createdAt: new Date('2026-09-17T09:38:00Z') },
  { id: 'inc-002', title: 'Exfiltration de données potentielle', source: 'egress-monitor', severity: 'élevée', detectedAt: new Date('2026-09-17T09:12:00Z'), status: 'en-cours', createdAt: new Date('2026-09-17T09:12:00Z') },
  { id: 'inc-003', title: 'Certificat bientôt expiré', source: 'cloud-assets', severity: 'moyenne', detectedAt: new Date('2026-09-17T08:44:00Z'), status: 'en-cours', createdAt: new Date('2026-09-17T08:44:00Z') },
  { id: 'inc-004', title: 'Scan de ports détecté', source: 'edge-firewall', severity: 'faible', detectedAt: new Date('2026-09-17T07:51:00Z'), status: 'resolu', createdAt: new Date('2026-09-17T07:51:00Z') },
]
