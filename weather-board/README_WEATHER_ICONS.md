# Guide d'utilisation - @bybas/weather-icons

## Installation et configuration terminées ✅

Le package `@bybas/weather-icons` a été installé et intégré avec succès dans votre projet.

## Changements effectués

### 1. Installation
```bash
npm i @bybas/weather-icons
```

### 2. Copie des icônes 
Les icônes SVG ont été copiées dans `public/weather-icons/` pour un accès optimisé.

### 3. Composant créé
- `components/weather-icons.tsx` avec deux composants principaux :
  - `WeatherIcon` : pour les conditions météo
  - `WeatherDetailIcon` : pour les détails (température, humidité, etc.)

### 4. Intégration dans les composants existants
- ✅ `weather-card.tsx` - Remplace les icônes Lucide par @bybas/weather-icons
- ✅ `weather-forecast.tsx` - Idem

## Utilisation

### Composant WeatherIcon
```tsx
import { WeatherIcon } from './components/weather-icons';

// Icône de base (32px par défaut)
<WeatherIcon condition="sunny" />

// Avec taille personnalisée
<WeatherIcon condition="cloudy" size={64} />

// Avec classe CSS
<WeatherIcon condition="rain" size={48} className="my-custom-class" />
```

### Composant WeatherDetailIcon
```tsx
import { WeatherDetailIcon } from './components/weather-icons';

<WeatherDetailIcon type="humidity" size={24} />
<WeatherDetailIcon type="temperature" size={32} />
<WeatherDetailIcon type="wind" size={28} />
<WeatherDetailIcon type="pressure" size={30} />
```

## Conditions supportées

Le composant reconnaît automatiquement ces conditions (en français et anglais) :

- **Clair** : "clear", "sunny", "ensoleillé", "dégagé" → `clear-day.svg`
- **Partiellement nuageux** : "partly cloudy" → `partly-cloudy-day.svg`
- **Nuageux** : "cloudy", "nuageux", "peu nuageux" → `cloudy.svg`
- **Pluie** : "rain", "pluie", "pluvieux" → `rain.svg`
- **Bruine** : "drizzle", "bruine" → `drizzle.svg`
- **Orage** : "thunderstorm", "orage" → `thunderstorms.svg`
- **Neige** : "snow", "neige" → `snow.svg`
- **Brouillard** : "mist", "fog" → `fog.svg`
- **Vent** : "wind" → `wind.svg`
- **Grêle** : "hail" → `hail.svg`

## Icônes disponibles

122 icônes météo au total incluant :
- Conditions de base (soleil, nuages, pluie, etc.)
- Phases de lune
- Échelle de Beaufort pour le vent
- Index UV
- Instruments de mesure

## Avantages

1. **122 icônes SVG** de haute qualité et animées
2. **Optimisation automatique** avec Next.js Image
3. **Support multilingue** (français/anglais)
4. **Responsive** et redimensionnable
5. **Cohérence visuelle** dans toute l'application

## Test

Votre application fonctionne maintenant avec les nouvelles icônes ! 
- Serveur : http://localhost:3001
- Les icônes Lucide ont été remplacées par @bybas/weather-icons dans `weather-card.tsx` et `weather-forecast.tsx`

## Exemple d'avant/après

**Avant** : `<Cloud className="h-8 w-8 text-blue-500" />`
**Après** : `<WeatherIcon condition="cloudy" size={32} />`

Les nouvelles icônes sont plus spécifiques, plus belles et offrent beaucoup plus de variété pour représenter fidèlement les conditions météo !