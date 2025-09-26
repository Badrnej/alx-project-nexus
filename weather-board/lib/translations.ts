export type Language = "fr" | "en" | "ar"

export interface Translations {
  mobileMenu?: {
    title: string
    myLocation: string
    favorites: string
    settings: string
    dark: string
    quickAccess: string
    version: string
    appName: string
    by: string
    poweredBy: string
    copyright: string
  }
  // Header
  appTitle: string
  version: string
  searchPlaceholder: string

  // Weather conditions
  conditions: {
    sunny: string
    clear: string
    "partly cloudy": string
    cloudy: string
    rainy: string
    rain: string
  }

  // Weather details
  details: {
    feelsLike: string
    humidity: string
    wind: string
    pressure: string
    visibility: string
    location: string
    latitude: string
    longitude: string
    altitude: string
    localTime: string
    live: string
    additionalDetails: string
    uvIndex: string
    airQuality: string
    sunrise: string
    sunset: string
    moonPhase: string
    weatherDescription: string
  }

  // Stats
  stats: {
    temperature: string
    humidity: string
    wind: string
    pressure: string
  }

  // Forecast
  forecast: {
    title: string
    hourly: string
    daily: string
    today: string
    tomorrow: string
    thisWeek: string
    nextWeek: string
    min: string
    max: string
    precipitation: string
    wind: string
    humidity: string
    fiveDayTitle: string
    hourlyTitle: string
    evolution24h: string
    realTime: string
    forecasts7Days: string
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
    loading: string
  }

  // Charts
  charts: {
    title: string
    temperatureEvolution: string
    humidityRate: string
    windSpeed: string
    atmosphericPressure: string
    time: string
  }

  // Favorites
  favorites: {
    title: string
    noFavorites: string
    noFavoritesDesc: string
    addedOn: string
    favorite: string
    add: string
    cities: string
    city: string
  }

  // Settings
  settings: {
    title: string
    units: string
    temperature: string
    windSpeed: string
    pressure: string
    appearance: string
    theme: string
    light: string
    dark: string
    auto: string
    display: string
    showCharts: string
    showForecast: string
    autoRefresh: string
    refreshInterval: string
    timeFormat: string
    language: string
    reset: string
    intervals: {
      "1min": string
      "5min": string
      "10min": string
      "30min": string
      "1hour": string
    }
  }

  // Empty state
  empty: {
    title: string
    description: string
  }

  // Analysis
  analysis: {
  // veryLow supprimé ici (doublon)
    detailedTemperature: string
    detailedHumidity: string
    detailedWind: string
    detailedPressure: string
    completeEvolution: string
    temperatureConditions: string
    windConditions: string
    pressureConditions: string
    current: string
    maximum: string
    minimum: string
    average: string
    peakOfDay: string
    lowestOfDay: string
    dailyAmplitude: string
    variation: string
    humidityAnalysis: string
    dewPoint: string
    hygrometricComfort: string
    condensationRisk: string
    evaporation: string
    recommendations: string
    healthAndComfort: string
    activities: string
    home: string
    veryLow: string
    low: string
    normal: string
    moderate: string
    high: string
    veryHigh: string
    fast: string
    slow: string
    dryAir: string
    humidAir: string
    idealHumidity: string
    avoidOutdoor: string
    favorableOutdoor: string
    useDehumidifier: string
    useHumidifier: string
    optimalHumidity: string
    backToDashboard: string
    // Wind-specific keys
    windAnalysis: string
    // Pressure-specific keys
    pressureAnalysis: string
    barometricAnalysis: string
    seaLevel: string
    weatherStability: string
    stormRisk: string
    hourlyVariation: string
    probableEvolution: string
    sensitiveActivities: string
    health: string
    pressureForecast7Days: string
    dayAverage: string
    improvingWeather: string
    deterioratingWeather: string
    stableWeather: string
    avoidHighAltitude: string
    discomfortSensitive: string
    comfortableConditions: string
    trend: string
      rapidRise: string
      rise: string
      rapidFall: string
      fall: string
      stableValue: string
      beaufortScale: string
      windChill: string
      dominantDirection: string
      stability: string
      stable: string
      variable: string
      unstable: string
      calm: string
      // Temperature-specific keys
      thermalAnalysis: string
      thermalComfort: string
      dailyVariation: string
      clothing: string
      hydration: string
      pleasant: string
      keepNormalHydration: string
      lightClothing: string
      heatIndex: string
      idealConditions: string
    light: string
    strong: string
    veryStrong: string
    nauticalActivities: string
    flightActivities: string
    outdoorComfort: string
    idealLightSailing: string
    goodSailingConditions: string
    difficultConditions: string
    favorableForFlight: string
    tooWindyForFlight: string
    pleasantForOutdoor: string
    strongWind: string
    windForecast7Days: string
    beaufortLevel0: string
    beaufortLevel1: string
    beaufortLevel2: string
    beaufortLevel3: string
    beaufortLevel4: string
    beaufortLevel5: string
    beaufortLevel6Plus: string
  }

  // Common
  common: {
    close: string
    search: string
    loading: string
    backToDashboard: string
    recentSearches: string
  }

  // Messages
  messages: {
    geolocationFailed: string
    initializationError: string
  }
}

export const translations: Record<Language, Translations> = {
  fr: {
    mobileMenu: {
      title: "Menu",
      myLocation: "Ma position",
      favorites: "Favoris",
      settings: "Paramètres",
      dark: "Sombre",
      quickAccess: "Accès rapide aux fonctions",
      version: "✨ Version 1.0",
      appName: "Weather Board",
      by: "Par Badr Nejaa",
      poweredBy: "Propulsé par NEJAA BADR",
      copyright: "© 2025 - Fait avec ❤️"
    },
    appTitle: "Weather Board",
    version: "v1.0",
    searchPlaceholder: "Rechercher une ville...",

    conditions: {
      sunny: "Ensoleillé",
      clear: "Dégagé",
      "partly cloudy": "Partiellement nuageux",
      cloudy: "Nuageux",
      rainy: "Pluvieux",
      rain: "Pluie",
    },

    details: {
      feelsLike: "Ressenti",
      humidity: "Humidité",
      wind: "Vent",
      pressure: "Pression",
      visibility: "Visibilité",
      location: "Localisation",
      latitude: "Latitude",
      longitude: "Longitude",
      altitude: "Altitude",
      localTime: "Heure locale",
      live: "En direct",
      additionalDetails: "Détails Supplémentaires",
      uvIndex: "Indice UV",
      airQuality: "Qualité de l'Air",
      sunrise: "Lever",
      sunset: "Coucher",
      moonPhase: "Phase Lunaire",
      weatherDescription: "ciel dégagé",
    },

    stats: {
      temperature: "Température",
      humidity: "Humidité",
      wind: "Vent",
      pressure: "Pression",
    },

    forecast: {
      title: "Prévisions 5 jours",
      hourly: "Prévisions horaires",
      daily: "Prévisions quotidiennes",
      today: "Aujourd'hui",
      tomorrow: "Demain",
      thisWeek: "Cette semaine",
      nextWeek: "Semaine prochaine",
      min: "Min",
      max: "Max",
      precipitation: "Précipitations",
      wind: "Vent",
      humidity: "Humidité",
      fiveDayTitle: "Prévisions 5 jours",
      hourlyTitle: "Prévisions horaires",
      evolution24h: "Évolution sur 24 Heures",
      realTime: "Temps réel",
      forecasts7Days: "Prévisions sur 7 Jours",
      monday: "Lundi",
      tuesday: "Mardi",
      wednesday: "Mercredi",
      thursday: "Jeudi",
      friday: "Vendredi",
      saturday: "Samedi",
      sunday: "Dimanche",
      loading: "Chargement des prévisions...",
    },

    charts: {
      title: "Graphiques Météo",
      temperatureEvolution: "Évolution de la Température",
      humidityRate: "Taux d'Humidité",
      windSpeed: "Vitesse du Vent",
      atmosphericPressure: "Pression Atmosphérique",
      time: "Heure",
    },

    favorites: {
      title: "Villes Favorites",
      noFavorites: "Aucune ville favorite",
      noFavoritesDesc: "Ajoutez des villes à vos favoris pour un accès rapide",
      addedOn: "Ajouté le",
      favorite: "Favori",
      add: "Ajouter",
      cities: "villes",
      city: "ville",
    },

    settings: {
      title: "Paramètres",
      units: "Unités de Mesure",
      temperature: "Température",
      windSpeed: "Vitesse du vent",
      pressure: "Pression",
      appearance: "Apparence",
      theme: "Thème",
      light: "Clair",
      dark: "Sombre",
      auto: "Automatique",
      display: "Affichage",
      showCharts: "Afficher les graphiques",
      showForecast: "Afficher les prévisions",
      autoRefresh: "Actualisation automatique",
      refreshInterval: "Intervalle",
      timeFormat: "Format de l'heure",
      language: "Langue",
      reset: "Réinitialiser les paramètres",
      intervals: {
        "1min": "1 minute",
        "5min": "5 minutes",
        "10min": "10 minutes",
        "30min": "30 minutes",
        "1hour": "1 heure",
      },
    },

    analysis: {
      detailedTemperature: "Analyse Détaillée de la Température",
      detailedHumidity: "Analyse Détaillée de l'Humidité",
      detailedWind: "Analyse Détaillée du Vent",
      detailedPressure: "Analyse Détaillée de la Pression",
      completeEvolution: "Évolution complète et statistiques avancées",
      temperatureConditions: "Taux d'humidité et conditions atmosphériques",
      windConditions: "Vitesse, direction et conditions éoliennes",
      pressureConditions: "Pression atmosphérique et tendances météorologiques",
      current: "Actuelle",
      maximum: "Maximum",
      minimum: "Minimum",
      average: "Moyenne",
      peakOfDay: "Pic de la journée",
      lowestOfDay: "Plus bas de la journée",
      dailyAmplitude: "Amplitude",
      variation: "Variation",
      humidityAnalysis: "Analyse de l'Humidité",
      dewPoint: "Point de Rosée",
      hygrometricComfort: "Confort Hygrométrique",
      condensationRisk: "Risque de Condensation",
      evaporation: "Évaporation",
      recommendations: "Recommandations",
      healthAndComfort: "Santé & Confort",
      activities: "Activités",
      home: "Maison",
    veryLow: "Très basse",
    low: "Basse",
    normal: "Normale",
    moderate: "Modérée",
    high: "Élevée",
    veryHigh: "Très Élevée",
    fast: "Rapide",
    slow: "Lente",
      dryAir: "Air sec - hydratez-vous et utilisez un humidificateur",
      humidAir: "Air humide - aérez régulièrement",
      idealHumidity: "Conditions d'humidité idéales",
      avoidOutdoor: "Évitez les activités intenses à l'extérieur",
      favorableOutdoor: "Conditions favorables aux activités extérieures",
      useDehumidifier: "Utilisez un déshumidificateur si nécessaire",
      useHumidifier: "Considérez un humidificateur",
      optimalHumidity: "Taux d'humidité optimal pour l'habitat",
      backToDashboard: "← Retour au Tableau de Bord",
      // Wind-specific keys
      windAnalysis: "Analyse Éolienne",
      beaufortScale: "Échelle de Beaufort",
      windChill: "Refroidissement Éolien",
      dominantDirection: "Direction Dominante",
      stability: "Stabilité",
      stable: "Stable",
      variable: "Variable",
      unstable: "Instable",
      calm: "Calme",
      light: "Léger",
      strong: "Fort",
      veryStrong: "Très Fort",
      nauticalActivities: "Activités Nautiques",
      flightActivities: "Vol & Parapente",
      outdoorComfort: "Confort Extérieur",
      idealLightSailing: "Conditions idéales pour la voile légère",
      goodSailingConditions: "Bonnes conditions pour la voile",
      difficultConditions: "Conditions difficiles - prudence requise",
      favorableForFlight: "Conditions favorables au vol libre",
      tooWindyForFlight: "Vents trop forts pour les activités aériennes",
      pleasantForOutdoor: "Agréable pour les activités extérieures",
      strongWind: "Vent fort - habillez-vous chaudement",
      windForecast7Days: "Prévisions de Vent sur 7 Jours",
      beaufortLevel0: "0 - Calme",
      beaufortLevel1: "1 - Très légère brise",
      beaufortLevel2: "2 - Légère brise",
      beaufortLevel3: "3 - Petite brise",
      beaufortLevel4: "4 - Jolie brise",
      beaufortLevel5: "5 - Bonne brise",
      beaufortLevel6Plus: "6+ - Vent frais",
      // Pressure-specific keys
      pressureAnalysis: "Analyse de la Pression",
      barometricAnalysis: "Analyse Barométrique",
      seaLevel: "Niveau de Mer",
      weatherStability: "Stabilité Météo",
      stormRisk: "Risque d'Orage",
      hourlyVariation: "Variation 6h",
      probableEvolution: "Évolution Probable",
      sensitiveActivities: "Activités Sensibles",
      health: "Santé",
      pressureForecast7Days: "Prévisions de Pression sur 7 Jours",
      dayAverage: "Moy.",
      improvingWeather: "Amélioration du temps, ciel qui se dégage",
      deterioratingWeather: "Dégradation possible, risque de précipitations",
      stableWeather: "Temps stable, peu de changements attendus",
      avoidHighAltitude: "Évitez les activités en altitude",
      discomfortSensitive: "Possible gêne pour les personnes sensibles",
      comfortableConditions: "Conditions atmosphériques confortables",
      trend: "Tendance",
      rapidRise: "Hausse Rapide",
      rise: "Hausse",
      rapidFall: "Chute Rapide",
      fall: "Baisse",
      stableValue: "Stable",
      // Temperature-specific keys
      thermalAnalysis: "Analyse Thermique",
      thermalComfort: "Confort Thermique",
      dailyVariation: "Variation Journalière",
      clothing: "Vêtements",
      hydration: "Hydratation",
      pleasant: "Agréable",
      keepNormalHydration: "Maintenir une hydratation normale",
      lightClothing: "Vêtements légers recommandés, possibilité de superposer",
      heatIndex: "Indice de Chaleur",
      idealConditions: "Conditions idéales pour activités en extérieur",
    },

    empty: {
      title: "Recherchez une ville",
      description: "Entrez le nom d'une ville pour voir la météo",
    },

    common: {
      close: "Fermer",
      search: "Rechercher",
      loading: "Chargement...",
      backToDashboard: "Retour au Tableau de Bord",
      recentSearches: "Recherches récentes",
    },

    messages: {
      geolocationFailed: "Géolocalisation échouée, utilisation de Paris par défaut",
      initializationError: "Erreur lors de l'initialisation",
    },
  },

  en: {
    mobileMenu: {
      title: "Menu",
      myLocation: "My location",
      favorites: "Favorites",
      settings: "Settings",
      dark: "Dark",
      quickAccess: "Quick access to features",
      version: "✨ Version 1.0",
      appName: "Weather Board",
      by: "By Badr Nejaa",
      poweredBy: "Powered by NEJAA BADR",
      copyright: "© 2025 - Made with ❤️"
    },
    appTitle: "Weather Board",
    version: "v1.0",
    searchPlaceholder: "Search for a city...",

    conditions: {
      sunny: "Sunny",
      clear: "Clear",
      "partly cloudy": "Partly Cloudy",
      cloudy: "Cloudy",
      rainy: "Rainy",
      rain: "Rain",
    },

    details: {
      feelsLike: "Feels like",
      humidity: "Humidity",
      wind: "Wind",
      pressure: "Pressure",
      visibility: "Visibility",
      location: "Location",
      latitude: "Latitude",
      longitude: "Longitude",
      altitude: "Altitude",
      localTime: "Local Time",
      live: "Live",
      additionalDetails: "Additional Details",
      uvIndex: "UV Index",
      airQuality: "Air Quality",
      sunrise: "Sunrise",
      sunset: "Sunset",
      moonPhase: "Moon Phase",
      weatherDescription: "Clear sky",
    },

    stats: {
      temperature: "Temperature",
      humidity: "Humidity",
      wind: "Wind",
      pressure: "Pressure",
    },

    forecast: {
      title: "5-Day Forecast",
      hourly: "Hourly Forecast",
      daily: "Daily Forecast",
      today: "Today",
      tomorrow: "Tomorrow",
      thisWeek: "This Week",
      nextWeek: "Next Week",
      min: "Min",
      max: "Max",
      precipitation: "Precipitation",
      wind: "Wind",
      humidity: "Humidity",
      fiveDayTitle: "5-Day Forecast",
      hourlyTitle: "Hourly Forecast",
      evolution24h: "24-Hour Evolution",
      realTime: "Real Time",
      forecasts7Days: "7-Day Forecast",
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      loading: "Loading forecasts...",
    },

    charts: {
      title: "Weather Charts",
      temperatureEvolution: "Temperature Evolution",
      humidityRate: "Humidity Rate",
      windSpeed: "Wind Speed",
      atmosphericPressure: "Atmospheric Pressure",
      time: "Time",
    },

    favorites: {
      title: "Favorite Cities",
      noFavorites: "No favorite cities",
      noFavoritesDesc: "Add cities to your favorites for quick access",
      addedOn: "Added on",
      favorite: "Favorite",
      add: "Add",
      cities: "cities",
      city: "city",
    },

    settings: {
      title: "Settings",
      units: "Units of Measurement",
      temperature: "Temperature",
      windSpeed: "Wind speed",
      pressure: "Pressure",
      appearance: "Appearance",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      auto: "Auto",
      display: "Display",
      showCharts: "Show charts",
      showForecast: "Show forecast",
      autoRefresh: "Auto refresh",
      refreshInterval: "Interval",
      timeFormat: "Time format",
      language: "Language",
      reset: "Reset settings",
      intervals: {
        "1min": "1 minute",
        "5min": "5 minutes",
        "10min": "10 minutes",
        "30min": "30 minutes",
        "1hour": "1 hour",
      },
    },

    analysis: {
      detailedTemperature: "Detailed Temperature Analysis",
      detailedHumidity: "Detailed Humidity Analysis",
      detailedWind: "Detailed Wind Analysis",
      detailedPressure: "Detailed Pressure Analysis",
      completeEvolution: "Complete evolution and advanced statistics",
      temperatureConditions: "Humidity rate and atmospheric conditions",
      windConditions: "Speed, direction and wind conditions",
      pressureConditions: "Atmospheric pressure and meteorological trends",
      current: "Current",
      maximum: "Maximum",
      minimum: "Minimum",
      average: "Average",
      peakOfDay: "Peak of the day",
      lowestOfDay: "Lowest of the day",
      dailyAmplitude: "Amplitude",
      variation: "Variation",
      humidityAnalysis: "Humidity Analysis",
      dewPoint: "Dew Point",
      hygrometricComfort: "Hygrometric Comfort",
      condensationRisk: "Condensation Risk",
      evaporation: "Evaporation",
      recommendations: "Recommendations",
      healthAndComfort: "Health & Comfort",
      activities: "Activities",
      home: "Home",
  veryLow: "Very Low",
  low: "Low",
  normal: "Normal",
  moderate: "Moderate",
  high: "High",
  veryHigh: "Very High",
  fast: "Fast",
  slow: "Slow",
      dryAir: "Dry air - stay hydrated and use a humidifier",
      humidAir: "Humid air - ventilate regularly",
      idealHumidity: "Ideal humidity conditions",
      avoidOutdoor: "Avoid intense outdoor activities",
      favorableOutdoor: "Favorable conditions for outdoor activities",
      useDehumidifier: "Use a dehumidifier if necessary",
      useHumidifier: "Consider using a humidifier",
      optimalHumidity: "Optimal humidity level for homes",
      backToDashboard: "← Back to Dashboard",
      // Wind-specific keys
      windAnalysis: "Wind Analysis",
      beaufortScale: "Beaufort Scale",
      windChill: "Wind Chill",
      dominantDirection: "Dominant Direction",
      stability: "Stability",
      stable: "Stable",
      variable: "Variable",
      unstable: "Unstable",
      calm: "Calm",
      light: "Light",
      strong: "Strong",
      veryStrong: "Very Strong",
      nauticalActivities: "Nautical Activities",
      flightActivities: "Flight & Paragliding",
      outdoorComfort: "Outdoor Comfort",
      idealLightSailing: "Ideal conditions for light sailing",
      goodSailingConditions: "Good sailing conditions",
      difficultConditions: "Difficult conditions - caution required",
      favorableForFlight: "Favorable conditions for free flight",
      tooWindyForFlight: "Too windy for aerial activities",
      pleasantForOutdoor: "Pleasant for outdoor activities",
      strongWind: "Strong wind - dress warmly",
      windForecast7Days: "7-Day Wind Forecast",
      beaufortLevel0: "0 - Calm",
      beaufortLevel1: "1 - Light air",
      beaufortLevel2: "2 - Light breeze",
      beaufortLevel3: "3 - Gentle breeze",
      beaufortLevel4: "4 - Moderate breeze",
      beaufortLevel5: "5 - Fresh breeze",
      beaufortLevel6Plus: "6+ - Strong breeze",
      // Pressure-specific keys
      pressureAnalysis: "Pressure Analysis",
      barometricAnalysis: "Barometric Analysis",
      seaLevel: "Sea Level",
      weatherStability: "Weather Stability",
      stormRisk: "Storm Risk",
      hourlyVariation: "6h Variation",
      probableEvolution: "Probable Evolution",
      sensitiveActivities: "Sensitive Activities",
      health: "Health",
      pressureForecast7Days: "7-Day Pressure Forecast",
      dayAverage: "Avg.",
      improvingWeather: "Improving weather, clearing skies",
      deterioratingWeather: "Possible deterioration, risk of precipitation",
      stableWeather: "Stable weather, few changes expected",
      avoidHighAltitude: "Avoid high-altitude activities",
      discomfortSensitive: "Possible discomfort for sensitive people",
      comfortableConditions: "Comfortable atmospheric conditions",
      trend: "Trend",
      rapidRise: "Rapid Rise",
      rise: "Rising",
      rapidFall: "Rapid Fall",
      fall: "Falling",
      stableValue: "Stable",
      // Temperature-specific keys
      thermalAnalysis: "Thermal Analysis",
      thermalComfort: "Thermal Comfort",
      dailyVariation: "Daily Variation",
      clothing: "Clothing",
      hydration: "Hydration",
      pleasant: "Pleasant",
      keepNormalHydration: "Maintain normal hydration",
      lightClothing: "Light clothing recommended, layering possible",
      heatIndex: "Heat Index",
      idealConditions: "Ideal conditions for outdoor activities",
    },

    empty: {
      title: "Search for a city",
      description: "Enter a city name to see the weather",
    },

    common: {
      close: "Close",
      search: "Search",
      loading: "Loading...",
      backToDashboard: "Back to Dashboard",
      recentSearches: "Recent searches",
    },

    messages: {
      geolocationFailed: "Geolocation failed, using Paris as default",
      initializationError: "Error during initialization",
    },
  },

  ar: {
    mobileMenu: {
      title: "القائمة",
      myLocation: "موقعي",
      favorites: "المفضلة",
      settings: "الإعدادات",
      dark: "داكن",
      quickAccess: "وصول سريع للوظائف",
      version: "✨ الإصدار 1.0",
      appName: "لوحة الطقس",
      by: "بدر نجاع",
      poweredBy: "مدعوم من NEJAA BADR",
      copyright: "© 2025 - صُنع بحب ❤️"
    },
    appTitle: "لوحة الطقس",
    version: "الإصدار 1.0",
    searchPlaceholder: "البحث عن مدينة...",

    conditions: {
      sunny: "مشمس",
      clear: "صافي",
      "partly cloudy": "غائم جزئياً",
      cloudy: "غائم",
      rainy: "ممطر",
      rain: "مطر",
    },

    details: {
      feelsLike: "يبدو كأنه",
      humidity: "الرطوبة",
      wind: "الرياح",
      pressure: "الضغط",
      visibility: "الرؤية",
      location: "الموقع",
      latitude: "خط العرض",
      longitude: "خط الطول",
      altitude: "الارتفاع",
      localTime: "الوقت المحلي",
      live: "مباشر",
      additionalDetails: "تفاصيل إضافية",
      uvIndex: "مؤشر الأشعة فوق البنفسجية",
      airQuality: "جودة الهواء",
      sunrise: "شروق الشمس",
      sunset: "غروب الشمس",
      moonPhase: "مرحلة القمر",
      weatherDescription: "سماء صافية",
    },

    stats: {
      temperature: "درجة الحرارة",
      humidity: "الرطوبة",
      wind: "الرياح",
      pressure: "الضغط",
    },

    forecast: {
      title: "توقعات 5 أيام",
      hourly: "التوقعات الساعية",
      daily: "التوقعات اليومية",
      today: "اليوم",
      tomorrow: "غداً",
      thisWeek: "هذا الأسبوع",
      nextWeek: "الأسبوع القادم",
      min: "أدنى",
      max: "أقصى",
      precipitation: "الأمطار",
      wind: "الرياح",
      humidity: "الرطوبة",
      fiveDayTitle: "توقعات 5 أيام",
      hourlyTitle: "التوقعات الساعية",
      evolution24h: "التطور على مدى 24 ساعة",
      realTime: "الوقت الفعلي",
      forecasts7Days: "توقعات 7 أيام",
      monday: "الاثنين",
      tuesday: "الثلاثاء",
      wednesday: "الأربعاء",
      thursday: "الخميس",
      friday: "الجمعة",
      saturday: "السبت",
      sunday: "الأحد",
      loading: "جاري تحميل التوقعات...",
    },

    charts: {
      title: "رسوم الطقس البيانية",
      temperatureEvolution: "تطور درجة الحرارة",
      humidityRate: "معدل الرطوبة",
      windSpeed: "سرعة الرياح",
      atmosphericPressure: "الضغط الجوي",
      time: "الوقت",
    },

    favorites: {
      title: "المدن المفضلة",
      noFavorites: "لا توجد مدن مفضلة",
      noFavoritesDesc: "أضف مدناً إلى مفضلاتك للوصول السريع",
      addedOn: "أُضيف في",
      favorite: "مفضل",
      add: "إضافة",
      cities: "مدن",
      city: "مدينة",
    },

    settings: {
      title: "الإعدادات",
      units: "وحدات القياس",
      temperature: "درجة الحرارة",
      windSpeed: "سرعة الرياح",
      pressure: "الضغط",
      appearance: "المظهر",
      theme: "السمة",
      light: "فاتح",
      dark: "داكن",
      auto: "تلقائي",
      display: "العرض",
      showCharts: "إظهار الرسوم البيانية",
      showForecast: "إظهار التوقعات",
      autoRefresh: "التحديث التلقائي",
      refreshInterval: "الفترة الزمنية",
      timeFormat: "تنسيق الوقت",
      language: "اللغة",
      reset: "إعادة تعيين الإعدادات",
      intervals: {
        "1min": "دقيقة واحدة",
        "5min": "5 دقائق",
        "10min": "10 دقائق",
        "30min": "30 دقيقة",
        "1hour": "ساعة واحدة",
      },
    },

    analysis: {
      detailedTemperature: "تحليل مفصل لدرجة الحرارة",
      detailedHumidity: "تحليل مفصل للرطوبة",
      detailedWind: "تحليل مفصل للرياح",
      detailedPressure: "تحليل مفصل للضغط",
      completeEvolution: "التطور الكامل والإحصائيات المتقدمة",
      temperatureConditions: "معدل الرطوبة والظروف الجوية",
      windConditions: "السرعة والاتجاه وظروف الرياح",
      pressureConditions: "الضغط الجوي والاتجاهات الجوية",
      current: "الحالية",
      maximum: "أقصى",
      minimum: "أدنى",
      average: "متوسط",
      peakOfDay: "ذروة اليوم",
      lowestOfDay: "أدنى نقطة في اليوم",
      dailyAmplitude: "النطاق",
      variation: "التباين",
      humidityAnalysis: "تحليل الرطوبة",
      dewPoint: "نقطة الندى",
      hygrometricComfort: "الراحة الهيدروميترية",
      condensationRisk: "خطر التكثيف",
      evaporation: "التبخر",
      recommendations: "توصيات",
      healthAndComfort: "الصحة والراحة",
      activities: "الأنشطة",
      home: "المنزل",
  veryLow: "منخفض جداً",
  low: "منخفض",
  normal: "عادي",
  moderate: "معتدل",
  high: "مرتفع",
  veryHigh: "مرتفع جداً",
  fast: "سريع",
  slow: "بطيء",
      dryAir: "هواء جاف - حافظ على رطوبة جسمك واستخدم مرطب الهواء",
      humidAir: "هواء رطب - قم بالتهوية بانتظام",
      idealHumidity: "ظروف رطوبة مثالية",
      avoidOutdoor: "تجنب الأنشطة الخارجية المكثفة",
      favorableOutdoor: "ظروف مواتية للأنشطة الخارجية",
      useDehumidifier: "استخدم مزيل الرطوبة إذا لزم الأمر",
      useHumidifier: "فكر في استخدام مرطب الهواء",
      optimalHumidity: "مستوى رطوبة مثالي للمنازل",
      backToDashboard: "← العودة إلى لوحة التحكم",
      // Wind-specific keys
      windAnalysis: "تحليل الرياح",
      beaufortScale: "مقياس بوفورت",
      windChill: "برودة الرياح",
      dominantDirection: "الاتجاه السائد",
      stability: "الاستقرار",
      stable: "مستقر",
      variable: "متغير",
      unstable: "غير مستقر",
      calm: "هادئ",
      light: "خفيف",
      strong: "قوي",
      veryStrong: "قوي جداً",
      nauticalActivities: "الأنشطة البحرية",
      flightActivities: "الطيران والمظلات",
      outdoorComfort: "الراحة الخارجية",
      idealLightSailing: "ظروف مثالية للإبحار الخفيف",
      goodSailingConditions: "ظروف جيدة للإبحار",
      difficultConditions: "ظروف صعبة - يلزم الحذر",
      favorableForFlight: "ظروف مواتية للطيران الحر",
      tooWindyForFlight: "رياح قوية جداً للأنشطة الجوية",
      pleasantForOutdoor: "مناسب للأنشطة الخارجية",
      strongWind: "رياح قوية - البس ملابس دافئة",
      windForecast7Days: "توقعات الرياح لمدة 7 أيام",
      beaufortLevel0: "0 - هادئ",
      beaufortLevel1: "1 - نسيم خفيف جداً",
      beaufortLevel2: "2 - نسيم خفيف",
      beaufortLevel3: "3 - نسيم لطيف",
      beaufortLevel4: "4 - نسيم معتدل",
      beaufortLevel5: "5 - نسيم نشط",
      beaufortLevel6Plus: "6+ - رياح قوية",
      // Pressure-specific keys
      pressureAnalysis: "تحليل الضغط",
      barometricAnalysis: "تحليل البارومتر",
      seaLevel: "مستوى البحر",
      weatherStability: "استقرار الطقس",
      stormRisk: "خطر العواصف",
      hourlyVariation: "التغير خلال 6 ساعات",
      probableEvolution: "التطور المحتمل",
      sensitiveActivities: "الأنشطة الحساسة",
      health: "الصحة",
      pressureForecast7Days: "توقعات الضغط لمدة 7 أيام",
      dayAverage: "المتوسط",
      improvingWeather: "تحسن الطقس، صفاء السماء",
      deterioratingWeather: "تدهور محتمل، احتمال هطول أمطار",
      stableWeather: "طقس مستقر، تغييرات قليلة متوقعة",
      avoidHighAltitude: "تجنب أنشطة المرتفعات",
      discomfortSensitive: "إزعاج محتمل للأشخاص الحساسين",
      comfortableConditions: "ظروف جوية مريحة",
      trend: "الاتجاه",
      rapidRise: "ارتفاع سريع",
      rise: "ارتفاع",
      rapidFall: "انخفاض سريع",
      fall: "انخفاض",
      stableValue: "مستقر",
      // Temperature-specific keys
      thermalAnalysis: "التحليل الحراري",
      thermalComfort: "الراحة الحرارية",
      dailyVariation: "التغير اليومي",
      clothing: "الملابس",
      hydration: "الترطيب",
      pleasant: "لطيف",
      keepNormalHydration: "حافظ على مستوى ترطيب طبيعي",
      lightClothing: "ينصح بملابس خفيفة، مع إمكانية التطبيق",
      heatIndex: "مؤشر الحرارة",
      idealConditions: "ظروف مثالية للأنشطة الخارجية",
    },

    empty: {
      title: "ابحث عن مدينة",
      description: "أدخل اسم مدينة لرؤية الطقس",
    },

    common: {
      close: "إغلاق",
      search: "بحث",
      loading: "جاري التحميل...",
      backToDashboard: "العودة إلى لوحة القيادة",
      recentSearches: "البحوث الأخيرة",
    },

    messages: {
      geolocationFailed: "فشل تحديد الموقع، استخدام باريس كافتراضي",
      initializationError: "خطأ أثناء التهيئة",
    },
  },
}

export function getTranslation(language: Language): Translations {
  return translations[language] || translations.fr
}
