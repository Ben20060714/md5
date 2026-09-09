# CYBERSHIELD

Plateforme de sécurité opérations (SOC) pour surveiller, corréler et prioriser les menaces en temps réel. Le site met en avant une proposition de valeur orientée sécurité, avec un parcours marketing, une zone d’authentification administrateur et un tableau de bord protégé pour consulter les incidents.

## Présentation

CYBERSHIELD est une application web construite avec Next.js et pensée pour des équipes de sécurité qui doivent:

- surveiller les signaux critiques de manière continue ;
- centraliser les alertes et incidents ;
- prioriser les risques via un score de sécurité ;
- orchestrer les réponses avec une interface claire et rapide ;
- sécuriser l’accès aux outils de supervision avec authentification.

Le site présente une landing page orientée conversion avec un message de marque premium : “La sécurité qui anticipe les menaces.”

## Fonctionnalités du produit

### 1. Landing page marketing

La page d’accueil contient :

- un header avec navigation et accès administrateur ;
- une section hero avec message de positionnement ;
- des indicateurs de performance (surveillance 24/7, score de sécurité, réduction du temps de réponse) ;
- une grille de fonctionnalités : détection continue, réponse orchestrée, confiance mesurable ;
- une section “Méthode” et un footer de contact.

### 2. Authentification admin

Le projet intègre une authentification email/mot de passe avec Better Auth :

- page de connexion : `/sign-in`
- page d’inscription : `/sign-up`
- redirection automatique vers le dashboard si l’utilisateur est déjà connecté ;
- validation des identifiants côté client avec gestion d’erreurs.

### 3. Tableau de bord sécurisé

Le dashboard est protégé par session :

- si l’utilisateur n’est pas connecté, il est redirigé vers `/sign-in` ;
- si la session est valide, il accède à un espace de supervision ;
- le composant client gère l’affichage principal de l’interface.

### 4. API de gestion des incidents

Une route API sécurisée expose les incidents de sécurité :

- endpoint : `/api/incidents`
- vérification de session avant accès ;
- récupération des incidents classés par date de détection décroissante ;
- limite de 100 résultats.

## Architecture technique

### Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Better Auth
- Drizzle ORM
- PostgreSQL
- Node Postgres (`pg`)

### Structure principale

- `app/` : routes pages et API
- `components/` : composants UI et formulaires d’authentification
- `lib/` : configuration auth, base de données et schéma
- `public/` : actifs statiques

### Modèle de données

Le schéma principal est défini dans `lib/schema.ts` et contient la table `security_incidents` avec les champs suivants :

- `id`
- `title`
- `source`
- `severity`
- `detectedAt`
- `status`
- `createdAt`

## Variables d’environnement

Le projet attend au minimum une base PostgreSQL et des variables d’authentification pour le bon fonctionnement en local ou en production.

Exemple probable :

```bash
DATABASE_URL=postgresql://user:password@host:5432/dbname
BETTER_AUTH_URL=http://localhost:3000
```

En production, des variables telles que `VERCEL_URL`, `VERCEL_PROJECT_PRODUCTION_URL`, `V0_RUNTIME_URL` ou `V0_DEV_APP_URL` peuvent être utilisées pour configurer les origines autorisées.

## Installation

1. Installer les dépendances :

```bash
pnpm install
```

2. Démarrer le serveur de développement :

```bash
pnpm dev
```

3. Ouvrir le projet dans le navigateur :

```bash
http://localhost:3000
```

## Scripts disponibles

Dans `package.json` :

- `pnpm dev` : démarre le serveur Next.js
- `pnpm build` : construit l’application pour la production
- `pnpm start` : lance le build en mode production

## Cas d’usage

Cette application convient à :

- des startups ou sociétés qui veulent centraliser leur supervision de sécurité ;
- des équipes SOC ou SecOps ;
- des projets démonstratifs de surveillance et d’incidents cyber ;
- des prototypes de plateforme de sécurité avec accès protégé.

## Remarques

Le projet est structuré comme un MVP de plateforme de sécurité avec un design premium et des flux essentiels : marketing, inscription, connexion, dashboard et API incidents. L’objectif est de montrer une expérience de supervision cyber claire et orientée action.

## Licence

Projet personnel / démonstratif sans licence explicite renseignée dans le dépôt.
