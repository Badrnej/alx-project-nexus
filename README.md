# Weather Board - Meteoro
### Styling & UI
- 🎨 **TailwindCSS** : Utility CSS framework for rapid development
- 🔧 **Radix UI** for accessible components
- 💅 **Shadcn/ui** for design system
- ✨ **Lucide React** for consistent icons

### Data Visualization
- 📊 **Recharts** for interactive charts
- 📈 **Responsive Container** for adaptability
- 🎯 **Custom Charts** for weather data

### Form Management
```
weather-board/
├── weather-search.tsx   # Location search bar
│   ├── weather-forecast.tsx # Multi-day forecasts
│   ├── weather-charts.tsx   # Trend charts
│   ├── favorites-panel.tsx  # Favorites management
│   ├── settings-panel.tsx   # User configuration
│   └── theme-provider.tsx   # Theme provider
├── hooks/                   # Custom React hooks
│   ├── use-mobile.ts        # Mobile device detection
│   └── use-toast.ts         # Notification system
├── lib/                     # Utilities and helpers
│   ├── translations.ts      # Type-safe multilingual system
│   └── utils.ts             # Tailwind utility functions
├── public/                  # Static assets
└── styles/                  # Additional CSS styles
```

## 🤝 Contributing to the Project

Contributions are welcome! Here's how you can contribute to Weather Board development:

### How to Contribute
1. 🍴 **Fork** the repository
2. 🌿 **Create a branch** for your feature (`git checkout -b feature/NewWeatherFeature`)
3. 💾 **Commit** your changes (`git commit -m 'Add: new weather feature'`)
4. 📤 **Push** to the branch (`git push origin feature/NewWeatherFeature`)
5. 🔃 **Open a Pull Request** with detailed description

### Types of Contributions Sought
- 🐛 **Bug fixes** : Improve application stability
- ✨ **New features** : Add weather functionalities
- 📚 **Documentation** : Improve technical documentation
- 🎨 **Design** : Propose UI/UX improvements
- 🌍 **Translations** : Add new languages
- ⚡ **Performance** : Optimize performance

### Development Guidelines
- 📝 **TypeScript required** : All new components must be typed
- 🎨 **TailwindCSS** : Use TailwindCSS for styling
- ♿ **Accessibility** : Follow WCAG standards
- 📱 **Responsive** : Test on mobile and desktop
- 🧪 **Tests** : Add tests for new features

## 📊 Metrics and Performance

### Current Performance
- ⚡ **Lighthouse Score** : 95+ (Performance, Accessibility, Best Practices, SEO)
- 📦 **Bundle Size** : < 500KB (optimized with Next.js)
- 🚀 **First Contentful Paint** : < 1.5s
- 📱 **Mobile Optimized** : 100% responsive interface

### Implemented Optimizations
- 🖼️ **Optimized images** with Next.js Image
- 📝 **Automatic code splitting** by routes
- 💾 **Memoization** of expensive components
- 🔄 **Intelligent cache** for weather data

## 🔒 Security and API

### Security Best Practices
- 🔐 **Environment variables** for API keys
- 🛡️ **Strict validation** of user inputs
- 🌐 **HTTPS only** in production
- 🚫 **No sensitive data** client-side

### Weather API Integration
- 🌤️ **WeatherAPI.com** for real-time data
- 📊 **Rate limiting** respected (1000 calls/month free)
- 🔄 **Fallback** in case of API error
- 💾 **Local cache** to reduce API calls

---

## 📞 Contact and Support

- 💬 **Discord** : banejaa
- 📧 **Email** : nejaa.badr@gmail.com  
- 🐙 **GitHub** : [Badrnej](https://github.com/Badrnej)
- 🌐 **LinkedIn** : [Badr Nejaa](https://www.linkedin.com/in/badr-nejaa/)

---

**Developed with ❤️ for the ProDev Frontend Engineering program**

*Weather Board - Your modern and elegant weather dashboard* 🌤️✨k Form** for performant forms
- ✅ **Zod** for schema validation
- 🔒 **@hookform/resolvers** for integration

### State & Storage
- 🏪 **React Context** for global state
- 💾 **localStorage** for persistence
- 🔄 **Custom Hooks** for business logic

### Theme & Accessibility
- 🌙 **next-themes** for dark/light theme
- ♿ **ARIA** complete support
- 📱 **Responsive Design** with TailwindCSS breakpoints

### Development Tools
- 🔧 **ESLint** for code quality
- 🏗️ **PostCSS** for CSS processing
- 📦 **pnpm** for dependency management

## 🤝 Contribution and Development

This Weather Board project is part of the ProDev program and serves as a concrete example of a modern Next.js application. We encourage:

- 🤝 **Code and solution sharing** : Contribute with your improvements
- � **Technical discussions** : Discord (#ProDevProjectNexus)
- 📚 **Collaborative documentation** : Improve documentation
- 🔄 **Code reviews** : Participate in peer-to-peer reviews
- 🎯 **New features** : Propose new weather features

### Roadmap and Future Features

#### Version 2.0 - Upcoming Features
- 🗺️ **Interactive weather maps**
- 📬 **Push notifications** for weather alerts
- 📱 **Complete Progressive Web App** (PWA)
- 🔄 **Cloud synchronization** of favorites
- 🌍 **Automatic geolocation** API
- 📊 **Historical weather** statistics

#### Technical Improvements
- ⚡ **React Server Components** for better performance
- 🧪 **Unit tests** with Jest and Testing Library
- 🚀 **Automated deployment** with CI/CD
- 📈 **Monitoring** and analytics
- 🔍 **Advanced SEO** optimization

## 📂 Detailed Project Structure

```
weather-board/
├── app/                      # Next.js 14 App Router
│   ├── globals.css          # Custom Tailwind styles
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Main dashboard page
└── components/
    ├── ui/                  # Base UI components (Shadcn)
    │   ├── button.tsx       # Custom button component
    │   ├── card.tsx         # Cards for weather data
    │   ├── dialog.tsx       # Modals and popups
    │   └── ...              # Other UI components
    └── weather-card.tsx     # Main weather data display
```
## 🏗️ Architecture and Project Structure

### Component Organization
- **Component-Based Architecture** : Modular and reusable architecture
- **Custom Hooks** : Business logic extracted into custom hooks
- **Type Safety** : Strict TypeScript interfaces for all weather data
- **Responsive Design** : Adaptive design with mobile detection hooks

### Folder Structure

## Project Overview

Weather Board is a modern meteorological dashboard web application developed with Next.js 14 and TypeScript. This application offers an elegant and responsive user interface for viewing real-time weather conditions, forecasts, and visualizing meteorological data through interactive charts.

## ✨ Key Features

- 🌤️ **Real-time weather** : View current weather conditions
- 🔍 **Location search** : Search by city or geographic coordinates
- 📊 **Interactive charts** : Visualize weather trends with Recharts
- 📅 **Weather forecasts** : Detailed multi-day forecasts
- ⭐ **Favorites** : Save your preferred locations
- 🌙 **Dark/light mode** : Adaptive theme with next-themes
- 🌍 **Multilingual** : Support for FR, EN, AR languages
- ⚙️ **Customizable settings** : Units of measurement, time format, auto-refresh
- 📱 **Responsive design** : Interface optimized for all devices

## 🛠️ Technical Stack

### Frontend Core
- ⚛️ **React 18** : Bibliothèque pour interfaces utilisateur modernes
- 🚀 **Next.js 14** : Framework React avec App Router pour les performances optimales
- 📝 **TypeScript** : Typage statique pour un développement robuste et maintenable

### Styling & UI
- 🎨 **TailwindCSS** : Framework CSS utilitaire pour un développement rapide
- 🔧 **Radix UI** : Composants accessibles et personnalisables
- 💅 **Shadcn/ui** : Système de design components préfabriqués
- 🌈 **Lucide Icons** : Icônes modernes et cohérentes

### Gestion des Données
- � **Recharts** : Bibliothèque de graphiques React pour la visualisation de données
- 🔄 **React Hook Form** : Gestion des formulaires performante
- ✅ **Zod** : Validation de schémas TypeScript-first

### Fonctionnalités Avancées
- 🌙 **next-themes** : Gestion du thème sombre/clair
- 🌍 **Système de traduction** : Support multilingue personnalisé
- 📱 **Design responsive** : Hooks personnalisés pour la détection mobile
- ⚡ **Sonner** : Notifications toast élégantes

## 🏗️ Architecture et Structure du Projet

### Organisation des Composants
- **Component-Based Architecture** : Architecture modulaire et réutilisable
- **Custom Hooks** : Logique métier extraite dans des hooks personnalisés
- **Type Safety** : Interfaces TypeScript strictes pour toutes les données météorologiques
- **Responsive Design** : Design adaptatif avec hooks de détection mobile

### Structure des Dossiers
```
weather-board/
├── app/                      # Next.js 14 App Router
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Main layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # Base UI components (Shadcn)
│   ├── weather-card.tsx     # Main weather card
│   ├── weather-search.tsx   # Search component
│   ├── weather-forecast.tsx # Weather forecasts
│   ├── weather-charts.tsx   # Data charts
│   ├── favorites-panel.tsx  # Favorites panel
│   ├── settings-panel.tsx   # Configuration panel
│   └── theme-provider.tsx   # Theme provider
├── hooks/                   # Custom hooks
│   ├── use-mobile.ts        # Mobile detection hook
│   └── use-toast.ts         # Notifications hook
├── lib/                     # Utilities and configurations
│   ├── translations.ts      # Translation system
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

### Implemented Technical Concepts

#### 🔧 **Custom Hooks**
- **useMobile** : Responsive mobile device detection
- **useToast** : Centralized notification management
- **useLocalStorage** : User settings persistence

#### 🌐 **Weather API Integration**
- **Fetch API** : Weather API consumption
- **Error Handling** : Robust network error management
- **TypeScript Interfaces** : Strict types for weather data
- **Real-time Updates** : Automatic data refresh

## 🚀 Installation and Setup

### Prerequisites
- **Node.js** : Version 18+ recommended
- **pnpm** : Package manager (or npm/yarn)
- **Git** : For repository cloning

### Installation
```bash
# Clone the repository
git clone https://github.com/Badrnej/alx-project-nexus.git

# Navigate to project folder
cd alx-project-nexus/weather-board

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts
```bash
pnpm dev        # Start development server
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Code verification with ESLint
```

The application will be accessible at `http://localhost:3000`

## 🔧 Technical Challenges and Solutions

### 🚧 **Challenge 1: User Settings State Management**
**Problem** : Persistence of user preferences (units, theme, favorites) between sessions.

**Solution** : Implementation of local state management system with localStorage and custom hooks.

```typescript
// Custom hook for settings persistence
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  return [storedValue, setValue] as const
}
```

### 🚧 **Challenge 2: Dynamic Multilingual Interface**
**Problem** : Real-time language switching without page reload.

**Solution** : Custom translation system with TypeScript for type safety.

```typescript
// Type-safe translation system
export interface Translations {
  appTitle: string
  searchPlaceholder: string
  conditions: {
    sunny: string
    cloudy: string
    rainy: string
  }
  // ... other translations
}

export const getTranslation = (lang: Language): Translations => {
  return translations[lang] || translations.en
}
```

### 🚧 **Challenge 3: Chart Performance Optimization**
**Problem** : Slow rendering of charts with large weather datasets.

**Solution** : Component memoization and data limitation.

```typescript
const WeatherCharts = memo(({ weatherData, settings }: WeatherChartsProps) => {
  const chartData = useMemo(() => {
    return weatherData.forecast.slice(0, 7) // Limit to 7 days
      .map(day => ({
        date: format(new Date(day.date), 'dd/MM'),
        temperature: settings.temperatureUnit === 'fahrenheit' 
          ? (day.temperature * 9/5) + 32 
          : day.temperature
      }))
  }, [weatherData.forecast, settings.temperatureUnit])

  return <ResponsiveContainer>{/* Chart */}</ResponsiveContainer>
})
```

## 💡 Implemented Best Practices

### Code Quality
- **TypeScript First** : Strict types for all weather data interfaces
- **Component Composition** : Reusable components with well-defined props
- **Custom Hooks** : Business logic encapsulated in custom hooks
- **Error Boundaries** : Graceful error handling for weather API

### Performance
- **Memoization** : React.memo for expensive components (charts)
- **Lazy Loading** : Deferred loading of forecast data
- **Optimistic Updates** : Immediate UI updates during user actions
- **Image Optimization** : Next.js optimized images for weather icons

### Accessibility
- **ARIA Labels** : Appropriate labels for weather data
- **Keyboard Navigation** : Complete keyboard navigation
- **Semantic HTML** : Semantic HTML structure for weather data
- **Color Contrast** : Optimal contrast in dark and light modes

### Internationalization
- **Type-Safe Translations** : Translation system with TypeScript
- **RTL Support** : Arabic support with right-to-left direction
- **Format Localization** : Date and unit formatting by language

## 📱 Detailed Features

### Main Dashboard
- 🌡️ **Current temperature** with feels-like
- 💨 **Wind speed** with direction
- 💧 **Humidity** and **atmospheric pressure**
- 👁️ **Visibility** and GPS coordinates
- 🕐 **Local time** of the location

### Favorites Panel
- ⭐ **Save** preferred locations
- 🗂️ **Organization** by categories
- 🔄 **Automatic synchronization** of data
- 🗑️ **Easy deletion** of favorites

### Customizable Settings
- 🌡️ **Temperature units** : Celsius/Fahrenheit
- 💨 **Wind units** : km/h, mph
- 📊 **Pressure units** : hPa, inHg
- 🕐 **Time format** : 12h/24h
- 🔄 **Auto-refresh** : Customizable interval
- 📊 **Display** : Optional charts and forecasts

## 🛠️ Technologies and Tools Used

### Frontend Core
- ⚛️ **React 18** avec hooks modernes
- 🚀 **Next.js 14** avec App Router
- � **TypeScript 5** pour la sécurité des types

### UI/UX Framework
- 🎨 **TailwindCSS 4** pour le styling rapide
- 🔧 **Radix UI** pour les composants accessibles
- � **Shadcn/ui** pour le système de design
- � **Lucide React** pour les icônes cohérentes

### Data Visualization
- 📊 **Recharts** pour les graphiques interactifs
- � **Responsive Container** pour l'adaptabilité
- 🎯 **Custom Charts** pour les données météo

### Form Management
- 📝 **React Hook Form** pour les formulaires performants
- ✅ **Zod** pour la validation de schémas
- � **@hookform/resolvers** pour l'intégration

### State & Storage
- 🏪 **React Context** pour l'état global
- 💾 **localStorage** pour la persistance
- � **Custom Hooks** pour la logique métier

### Theme & Accessibility
- 🌙 **next-themes** pour le thème sombre/clair
- ♿ **ARIA** support complet
- 📱 **Responsive Design** avec breakpoints TailwindCSS

### Development Tools
- � **ESLint** pour la qualité du code
- 🏗️ **PostCSS** pour le traitement CSS
- � **pnpm** pour la gestion des dépendances

## 🤝 Contribution et Développement

Ce projet Weather Board fait partie du programme ProDev et sert d'exemple concret d'application Next.js moderne. Nous encourageons :

- 🤝 **Partage de code et de solutions** : Contribuez avec vos améliorations
- 💬 **Discussions techniques** : Discord (#ProDevProjectNexus)
- 📚 **Documentation collaborative** : Améliorez la documentation
- 🔄 **Revues de code** : Participez aux reviews peer-to-peer
- 🎯 **Nouvelles fonctionnalités** : Proposez de nouvelles features météo

### Roadmap et Fonctionnalités Futures

#### Version 2.0 - Prochaines Fonctionnalités
- 🗺️ **Cartes météorologiques** interactives
- 📬 **Notifications push** pour les alertes météo
- 📱 **Progressive Web App** (PWA) complète
- 🔄 **Synchronisation cloud** des favoris
- 🌍 **API géolocalisation** automatique
- 📊 **Statistiques météo** historiques

#### Améliorations Techniques
- ⚡ **React Server Components** pour de meilleures performances
- 🧪 **Tests unitaires** avec Jest et Testing Library
- 🚀 **Déploiement automatisé** avec CI/CD
- 📈 **Monitoring** et analytics
- 🔍 **SEO optimization** avancée

## 📂 Structure du Projet Détaillée

```
weather-board/
├── app/                      # Next.js 14 App Router
│   ├── globals.css          # Styles Tailwind personnalisés
│   ├── layout.tsx           # Layout racine avec providers
│   └── page.tsx             # Page principale du dashboard
├── components/
│   ├── ui/                  # Composants UI de base (Shadcn)
│   │   ├── button.tsx       # Composant bouton personnalisé
│   │   ├── card.tsx         # Cartes pour les données météo
│   │   ├── dialog.tsx       # Modales et popups
│   │   └── ...              # Autres composants UI
│   ├── weather-card.tsx     # Affichage des données météo principales
│   ├── weather-search.tsx   # Barre de recherche de localisation
│   ├── weather-forecast.tsx # Prévisions sur plusieurs jours
│   ├── weather-charts.tsx   # Graphiques de tendances
│   ├── favorites-panel.tsx  # Gestion des favoris
│   ├── settings-panel.tsx   # Configuration utilisateur
│   └── theme-provider.tsx   # Provider pour le thème
├── hooks/                   # Hooks React personnalisés
│   ├── use-mobile.ts        # Détection des appareils mobiles
│   └── use-toast.ts         # Système de notifications
├── lib/                     # Utilitaires et helpers
│   ├── translations.ts      # Système multilingue type-safe
│   └── utils.ts             # Fonctions utilitaires Tailwind
├── public/                  # Assets statiques
└── styles/                  # Styles CSS additionnels
```

## 🤝 Contribuer au Projet

Les contributions sont les bienvenues ! Voici comment vous pouvez contribuer au développement de Weather Board :

### Comment Contribuer
1. 🍴 **Fork** le repository
2. 🌿 **Créer une branche** pour votre feature (`git checkout -b feature/NewWeatherFeature`)
3. 💾 **Commit** vos changements (`git commit -m 'Add: nouvelle fonctionnalité météo'`)
4. 📤 **Push** vers la branche (`git push origin feature/NewWeatherFeature`)
5. 🔃 **Ouvrir une Pull Request** avec une description détaillée

### Types de Contributions Recherchées
- 🐛 **Corrections de bugs** : Améliorez la stabilité de l'application
- ✨ **Nouvelles fonctionnalités** : Ajoutez des features météorologiques
- � **Documentation** : Améliorez la documentation technique
- 🎨 **Design** : Proposez des améliorations UI/UX
- 🌍 **Traductions** : Ajoutez de nouvelles langues
- ⚡ **Performance** : Optimisez les performances

### Guidelines de Développement
- � **TypeScript obligatoire** : Tous les nouveaux composants doivent être typés
- 🎨 **TailwindCSS** : Utilisez TailwindCSS pour le styling
- ♿ **Accessibilité** : Respectez les standards WCAG
- 📱 **Responsive** : Testez sur mobile et desktop
- 🧪 **Tests** : Ajoutez des tests pour les nouvelles fonctionnalités

## 📊 Métriques et Performance

### Performance Actuelle
- ⚡ **Lighthouse Score** : 95+ (Performance, Accessibility, Best Practices, SEO)
- 📦 **Bundle Size** : < 500KB (optimisé avec Next.js)
- � **First Contentful Paint** : < 1.5s
- 📱 **Mobile Optimized** : Interface 100% responsive

### Optimisations Implémentées
- 🖼️ **Images optimisées** avec Next.js Image
- 📝 **Code splitting** automatique par routes
- � **Memoization** des composants coûteux
- 🔄 **Cache** intelligent des données météo

## 🔒 Sécurité et API

### Bonnes Pratiques de Sécurité
- 🔐 **Variables d'environnement** pour les clés API
- 🛡️ **Validation** stricte des entrées utilisateur
- 🌐 **HTTPS only** en production
- 🚫 **Pas de données sensibles** côté client

### Intégration API Météo
- 🌤️ **API WeatherAPI.com** pour les données en temps réel
- 📊 **Rate limiting** respecté (1000 appels/mois en gratuit)
- 🔄 **Fallback** en cas d'erreur API
- 💾 **Cache local** pour réduire les appels

---

## 📞 Contact et Support

- 💬 **Discord** : banejaa
- 📧 **Email** : nejaa.badr@gmail.com  
- 🐙 **GitHub** : [Badrnej](https://github.com/Badrnej)
- 🌐 **LinkedIn** : [Badr Nejaa](https://www.linkedin.com/in/badr-nejaa/)

---

**Développé avec ❤️ pour le programme ProDev Frontend Engineering**

*Weather Board - Votre tableau de bord météorologique moderne et élégant* 🌤️✨
