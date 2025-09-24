export type Language = "fr" | "en" | "ar"

export interface Translations {
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
    backToDashboard: string
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
      backToDashboard: "← Retour au Tableau de Bord",
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
      backToDashboard: "← Back to Dashboard",
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
      backToDashboard: "← العودة إلى لوحة التحكم",
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
