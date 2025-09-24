# ✨ Weather Board - Tableau de Bord Météo Premium

Un tableau de bord météorologique moderne et élégant avec des effets **Glassmorphisme** et **Liquid Glass** avancés, intégrant l'API OpenWeather pour des données en temps réel.

![Preview](https://img.shields.io/badge/Status-✅%20Live-brightgreen)
![API](https://img.shields.io/badge/API-OpenWeather-blue)
![Design](https://img.shields.io/badge/Design-Glassmorphism-purple)

## 🌟 Fonctionnalités Premium

### 🎨 **Design Glassmorphisme Avancé**
- Effets de verre liquide avec blur et transparence
- Animations fluides et transitions cinématiques
- Particules flottantes animées
- Gradients dynamiques adaptés aux conditions météo
- Interface responsive ultra-moderne

### 🌍 **Données Météo en Temps Réel**
- **API OpenWeather** intégrée avec votre clé : `841770cc35abfe66fd4ff255afd8328c`
- Détection automatique de géolocalisation
- Recherche de villes en temps réel
- Prévisions sur 5 jours
- Données horaires (8 heures)

### 📱 **Interface Responsive Premium**
- Design mobile-first optimisé
- Effets tactiles améliorés
- Animations de hover sophistiquées
- Navigation intuitive entre les vues

### ⚙️ **Paramètres Personnalisables**
- Unités de mesure configurables
- Thème sombre/clair automatique
- Actualisation automatique
- Historique de recherche
- Système de favoris

## 🎭 **Nouveaux Effets Visuels**

### ✨ Glassmorphisme Liquid
```css
.weather-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
}
```

### 🌊 Animations Fluides
- Particules flottantes animées
- Effets de hover cinématiques
- Transitions de vue fluides
- Gradients animés

### 🎨 Couleurs Dynamiques
- Gradients adaptatifs selon la météo
- Effets de lumière contextuelle
- Transparences optimisées
- Contraste automatique

## 🚀 Installation & Démarrage

```bash
# Installation des dépendances
pnpm install

# Démarrage en mode développement
pnpm dev

# Construction pour la production
pnpm build
```

## 🔧 Configuration

### Variables d'Environnement
1. Copiez le fichier `.env.example` vers `.env.local` :
   ```bash
   cp .env.example .env.local
   ```
2. Remplacez `your_openweather_api_key_here` par votre vraie clé API OpenWeather

## 📁 Structure du Projet

```
weather-board/
├── app/
│   ├── globals.css          # Styles glassmorphisme avancés
│   ├── layout.tsx
│   └── page.tsx             # Page principale avec API
├── components/
│   ├── ui/
│   │   └── liquid-button.tsx # Boutons avec effets liquid
│   ├── weather-card.tsx     # Carte météo premium
│   ├── weather-search.tsx   # Recherche avec API
│   └── ...
├── lib/
│   ├── weather-api.ts       # Service API OpenWeather
│   └── utils.ts
└── styles/
    └── globals.css
```

## 🎨 **Améliorations Visuelles Apportées**

### 1. **Fond d'Écran Dynamique**
- Gradients animés adaptatifs
- Particules flottantes
- Effets de profondeur

### 2. **Cartes Météo Premium**
```tsx
<div className="weather-card">
  <div className="weather-particles"></div>
  {/* Contenu avec effets glassmorphisme */}
</div>
```

### 3. **Boutons Liquid Glass**
```tsx
<LiquidButton variant="outline" size="icon">
  <MapPin className="h-4 w-4" />
</LiquidButton>
```

### 4. **Typographie Élégante**
- Gradients de texte
- Ombres portées
- Weights variables

## 🎯 **Fonctionnalités Principales**

- ✅ **API OpenWeather** intégrée
- ✅ **Géolocalisation** automatique
- ✅ **Recherche de villes** en temps réel
- ✅ **Prévisions** 5 jours + horaires
- ✅ **Interface glassmorphisme** premium
- ✅ **Animations fluides** et transitions
- ✅ **Responsive design** mobile-first
- ✅ **Thème sombre/clair** automatique
- ✅ **Favoris** et historique
- ✅ **Unités personnalisables**

## 🔮 **Technologies Utilisées**

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **OpenWeather API** - Données météo
- **Glassmorphisme** - Effets visuels
- **Liquid Glass** - Animations avancées

## 🌐 **Accès**

🚀 **Serveur local** : http://localhost:3001

---

**Développé avec ❤️ en utilisant les dernières technologies web et des effets visuels de pointe**