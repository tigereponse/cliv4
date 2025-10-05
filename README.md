# TigerCLI - IDE Agentique

> Un environnement de développement intégré (IDE) de nouvelle génération avec co-développeur IA intégré.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Vision du Produit

TigerCLI est un IDE agentique qui révolutionne le développement logiciel en intégrant un co-développeur IA proactif et autonome. L'IA ne se contente pas d'assister - elle anticipe, orchestre et automatise les aspects les plus complexes du développement.

### Philosophie

- **Agentique**: L'IA planifie, raisonne et exécute des tâches complexes de manière autonome
- **Contextuelle**: Compréhension sémantique profonde de l'ensemble du projet
- **Intégrée**: Connectée à tout l'écosystème du développeur (Git, CI/CD, Cloud)

## 🏗️ Architecture

### Structure Monorepo

```
tigercli/
├── apps/
│   ├── frontend/          # Application Next.js (React)
│   └── backend/           # API NestJS (Node.js)
├── packages/
│   └── shared-types/      # Types TypeScript partagés
├── .github/
│   └── workflows/         # CI/CD GitHub Actions
├── turbo.json             # Configuration Turborepo
└── package.json           # Dépendances racine
```

### Pile Technique

#### Frontend
- **Framework**: Next.js 14 (React)
- **UI**: Shadcn/UI + Tailwind CSS
- **State Management**: Zustand
- **Éditeur**: Monaco Editor (moteur de VS Code)
- **Terminal**: Xterm.js
- **Langage**: TypeScript

#### Backend
- **Framework**: NestJS (Node.js)
- **Base de données**: PostgreSQL
- **LLM Gateway**: Support multi-modèles (OpenAI, Anthropic, Google)
- **Langage**: TypeScript

#### AI Services
- **Framework**: Python (FastAPI)
- **Base Vectorielle**: Qdrant
- **Embeddings**: CodeBERT / GraphCodeBERT

## 🚀 Démarrage Rapide

### Prérequis

- Node.js >= 18.0.0
- npm >= 9.0.0
- Python >= 3.9 (pour les services IA)

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-org/tigercli.git
cd tigercli

# Installer les dépendances
npm install

# Lancer l'environnement de développement
npm run dev
```

Les services seront disponibles sur :
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- AI Services: http://localhost:8000

## 📋 Fonctionnalités

### ✅ MVP (Version 1.0)

- [x] Éditeur de code Monaco avec coloration syntaxique
- [x] Explorateur de fichiers hiérarchique
- [x] Terminal intégré (Xterm.js)
- [x] Chat IA conversationnel
- [ ] Gateway LLM (Gemini)
- [ ] Service de fichiers sécurisé

### 🔜 Roadmap

#### Épique 2: Capacités Agentiques - Niveau 1
- [ ] Gateway LLM multi-modèles
- [ ] Agent Orchestrator (décomposition de tâches)
- [ ] Interface de suivi de progression des tâches

#### Épique 3: Intelligence du Codebase
- [ ] Service d'embeddings Python
- [ ] Base vectorielle Qdrant
- [ ] Recherche sémantique dans le code
- [ ] Édition multi-fichiers

#### Épique 4: Intégration Git
- [ ] Service Git complet
- [ ] Panneau Git UI
- [ ] Génération automatique de messages de commit
- [ ] Génération automatique de tests

#### Épique 5: Intégration GCP
- [ ] Service GCP (Cloud Run, GKE)
- [ ] Déploiement automatisé
- [ ] Débogage autonome

## 🎨 Design

L'interface suit un design épuré en 4 blocs principaux :

1. **Haut Gauche**: Explorateur de fichiers + Terminal
2. **Centre**: Éditeur Monaco avec onglets multiples
3. **Droite**: Prévisualisation en temps réel
4. **Bas**: Chat IA avec assistant conversationnel

### Thème

- **Palette**: Thème sombre moderne (#1a1a1a, #252525, #333333)
- **Accent**: Bleu professionnel (#0078d4)
- **Typographie**: 
  - Code: Fira Code
  - UI: Inter

## 🛠️ Scripts Disponibles

```bash
# Développement
npm run dev              # Lance tous les services en parallèle
npm run dev:frontend     # Frontend uniquement
npm run dev:backend      # Backend uniquement

# Production
npm run build            # Build tous les packages
npm run start            # Lance en mode production

# Qualité du code
npm run lint             # Lint tous les packages
npm run test             # Tests unitaires
npm run clean            # Nettoie les fichiers de build
```

## 📚 Documentation

Pour plus de détails techniques, consultez :
- [Livre Blanc Technique](./docs/WHITEPAPER.md)
- [Guide de Contribution](./CONTRIBUTING.md)
- [API Documentation](./docs/API.md)

## 🤝 Contribution

Les contributions sont les bienvenues ! Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour les guidelines.

## 📄 Licence

MIT © 2025 TigerCLI

## 🙏 Remerciements

- Monaco Editor - Microsoft
- Shadcn/UI - shadcn
- Turborepo - Vercel

---

**Construit avec ❤️ par l'équipe TigerCLI**
