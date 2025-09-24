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
    today: string
    tomorrow: string
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
    },

    stats: {
      temperature: "Température",
      humidity: "Humidité",
      wind: "Vent",
      pressure: "Pression",
    },

    forecast: {
      title: "Prévisions sur 5 jours",
      today: "Aujourd'hui",
      tomorrow: "Demain",
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
      localTime: "Local time",
      live: "Live",
    },

    stats: {
      temperature: "Temperature",
      humidity: "Humidity",
      wind: "Wind",
      pressure: "Pressure",
    },

    forecast: {
      title: "5-Day Forecast",
      today: "Today",
      tomorrow: "Tomorrow",
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
    },

    stats: {
      temperature: "درجة الحرارة",
      humidity: "الرطوبة",
      wind: "الرياح",
      pressure: "الضغط",
    },

    forecast: {
      title: "توقعات 5 أيام",
      today: "اليوم",
      tomorrow: "غداً",
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
