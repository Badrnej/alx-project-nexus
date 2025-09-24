# Intégration API OpenWeather

Ce projet utilise l'API OpenWeather pour récupérer des données météorologiques en temps réel.

## Configuration

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=votre_clé_api_ici
NEXT_PUBLIC_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
NEXT_PUBLIC_OPENWEATHER_GEO_URL=https://api.openweathermap.org/geo/1.0
```

### Obtenir une clé API

1. Visitez [OpenWeatherMap](https://openweathermap.org/api)
2. Créez un compte gratuit
3. Générez une clé API
4. Ajoutez-la à votre fichier `.env.local`

## Fonctionnalités

### 🌍 Recherche de villes
- Recherche par nom de ville
- Support multilingue (français)
- Géocodage inversé pour obtenir les coordonnées

### 📍 Géolocalisation
- Détection automatique de la position utilisateur
- Données météo basées sur la localisation GPS
- Bouton de géolocalisation dans l'interface

### 📊 Données météorologiques
- **Conditions actuelles** :
  - Température et ressenti
  - Humidité
  - Vitesse du vent
  - Pression atmosphérique
  - Visibilité
  - Heures de lever/coucher du soleil
  - Couverture nuageuse

- **Prévisions** :
  - Prévisions sur 5 jours
  - Données horaires (8 prochaines heures)
  - Températures min/max
  - Probabilité de précipitations

### 🔄 Unités de mesure
- Température : Celsius / Fahrenheit
- Vitesse du vent : km/h / mph
- Pression : hPa / inHg

## Structure du code

### `lib/weather-api.ts`
Service principal pour les appels API OpenWeather :
- `searchCities()` - Recherche de villes
- `getCurrentWeather()` - Données météo actuelles
- `getWeatherForecast()` - Prévisions
- `getWeatherByCity()` - Données par nom de ville
- `getWeatherByGeolocation()` - Données par géolocalisation

### Types TypeScript
```typescript
interface WeatherData {
  location: string
  country: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  pressure: number
  visibility: number
  feelsLike: number
  icon: string
  localTime: string
  coordinates: { lat: number; lon: number }
  sunrise: string
  sunset: string
  uvIndex: number
  dewPoint: number
  cloudCover: number
}
```

## Gestion des erreurs

- Géolocalisation échouée → Fallback sur Paris
- Ville non trouvée → Affichage d'un message d'erreur
- Erreur réseau → Retry automatique
- API key invalide → Message d'erreur dans la console

## Limitations

- Plan gratuit OpenWeather : 1000 appels/jour
- Données horaires limitées à 8 heures
- Mise à jour des données toutes les 10 minutes

## Développement

```bash
# Installation des dépendances
pnpm install

# Démarrage en mode développement
pnpm dev

# Construction pour la production
pnpm build
```