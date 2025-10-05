# Guide de Développement TigerCLI

## 🎯 Vue d'Ensemble

Ce document guide l'équipe de développement à travers la construction progressive de TigerCLI selon le livre blanc technique.

## 📊 Progression du Projet

### ✅ Épique 1: MVP - Fondations de l'IDE (COMPLÉTÉ)

**Statut**: ✅ 100% Complété  
**Branche**: `genspark_ai_developer`  
**PR**: [#1](https://github.com/tigereponse/cliv4/pull/1)

#### Réalisations

- [x] **1.1** - Setup du projet monorepo avec Turborepo
- [x] **1.2** - Layout principal avec panneaux redimensionnables
- [x] **1.3** - Types partagés (@tigercli/shared-types)
- [x] **1.4** - Explorateur de fichiers avec arborescence
- [x] **1.7** - Interface de chat IA avec messages formatés

#### Livrables

1. **Architecture Monorepo**
   ```
   tigercli/
   ├── apps/
   │   └── frontend/     # Next.js 14 + React
   ├── packages/
   │   └── shared-types/ # Types TypeScript partagés
   └── turbo.json        # Configuration Turborepo
   ```

2. **Design Épuré**
   - Palette: #1a1a1a (fond), #252525 (secondaire), #0078d4 (accent)
   - 4 panneaux redimensionnables
   - Interface minimaliste professionnelle

3. **Composants UI** (Shadcn/UI)
   - Button, Input, Card, Badge, Alert
   - ScrollArea, Separator, Resizable
   - Tous personnalisés avec le thème sombre

### 🔄 Épique 2: Capacités Agentiques - Niveau 1 (EN ATTENTE)

**Statut**: ⏳ 0% Complété  
**Estimation**: 2-3 semaines

#### Tâches Prioritaires

- [ ] **2.1** - Backend NestJS avec structure modulaire
- [ ] **2.2** - Gateway LLM multi-modèles (OpenAI, Anthropic, Google)
- [ ] **2.3** - Agent Orchestrator v1 (décomposition de tâches)
- [ ] **2.4** - Service de fichiers sécurisé
- [ ] **2.5** - Intégration Monaco Editor réelle
- [ ] **2.6** - Terminal Xterm.js fonctionnel

#### Dépendances Techniques

- NestJS installation
- Configuration PostgreSQL
- Services Docker pour le développement local

### 🧠 Épique 3: Intelligence du Codebase (À PLANIFIER)

**Statut**: ⏳ Non démarré  
**Estimation**: 3-4 semaines

#### Composants Clés

- Service Python FastAPI pour embeddings
- Base vectorielle Qdrant
- Pipeline d'indexation du code
- Recherche sémantique

## 🛠️ Commandes de Développement

### Installation

```bash
# Installer toutes les dépendances
npm install

# Build des packages partagés
npm run build
```

### Développement

```bash
# Lancer tous les services en parallèle
npm run dev

# Frontend uniquement
cd apps/frontend && npm run dev

# Backend uniquement (quand disponible)
cd apps/backend && npm run dev
```

### Tests

```bash
# Lint de tout le monorepo
npm run lint

# Tests (à implémenter)
npm run test
```

### Nettoyage

```bash
# Nettoyer tous les builds
npm run clean
```

## 📦 Structure des Packages

### @tigercli/shared-types

Types TypeScript partagés entre frontend et backend.

**Exports principaux**:
- `FileNode`, `TabFile` - Système de fichiers
- `AgentTask`, `AgentStep` - Système d'agents
- `Message` - Chat IA
- `LLMProvider`, `LLMRequest`, `LLMResponse` - LLM Gateway
- `GitStatus`, `GitCommit` - Intégration Git

### apps/frontend

Application Next.js 14 avec App Router.

**Structure**:
```
src/
├── app/              # Pages Next.js
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── ui/          # Composants Shadcn/UI
└── lib/
    └── utils.ts     # Utilitaires
```

## 🎨 Design System

### Palette de Couleurs

```css
--background: #1a1a1a    /* Fond principal */
--card: #252525           /* Fond secondaire */
--border: #333333         /* Bordures */
--foreground: #e0e0e0     /* Texte */
--primary: #0078d4        /* Accent bleu */
--muted-foreground: #858585 /* Texte secondaire */
```

### Composants

Tous les composants UI sont dans `apps/frontend/src/components/ui/` et suivent les patterns Shadcn/UI avec notre thème personnalisé.

## 📝 Convention de Commits

Suivre [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nouvelle fonctionnalité
fix: correction de bug
docs: documentation uniquement
style: formatage, point-virgules manquants, etc.
refactor: refactoring du code
test: ajout de tests
chore: maintenance, dépendances, etc.
```

**Exemples**:
```bash
git commit -m "feat: add Monaco Editor integration"
git commit -m "fix: resolve file tree rendering issue"
git commit -m "docs: update API documentation"
```

## 🔄 Workflow Git (GenSpark)

### Règles Strictes

1. **TOUJOURS** committer après chaque modification
2. **TOUJOURS** créer/mettre à jour une PR après chaque commit
3. **TOUJOURS** synchroniser avec `main` avant de pousser
4. **TOUJOURS** résoudre les conflits en favorisant le code distant

### Processus Standard

```bash
# 1. Faire des modifications
# 2. Committer immédiatement
git add -A
git commit -m "feat: description"

# 3. Synchroniser avec main
git fetch origin main
git rebase origin/main

# 4. Résoudre les conflits si nécessaire
# (favoriser le code distant sauf si local est critique)

# 5. Squash des commits avant PR
git reset --soft HEAD~N  # N = nombre de commits
git commit -m "feat: description complète"

# 6. Pousser
git push origin genspark_ai_developer -f

# 7. Créer/Mettre à jour la PR
# Via GitHub UI ou API
```

## 🚀 Prochaines Étapes Immédiates

1. **Review de la PR #1** 
   - Vérifier le design
   - Valider l'architecture
   - Approuver pour merge

2. **Démarrage Épique 2**
   - Setup Backend NestJS
   - Configuration PostgreSQL
   - Premier service (Files API)

3. **Intégrations Critiques**
   - Monaco Editor
   - Xterm.js Terminal
   - LLM Gateway (Gemini)

## 📚 Ressources

- [Livre Blanc Technique](./README.md#-architecture)
- [Turborepo Docs](https://turbo.build/repo/docs)
- [Next.js 14 Docs](https://nextjs.org/docs)
- [Shadcn/UI](https://ui.shadcn.com/)
- [NestJS Docs](https://docs.nestjs.com/)

---

**Dernière mise à jour**: 5 octobre 2025  
**Maintenu par**: L'équipe TigerCLI
