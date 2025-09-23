"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { WeatherCard } from "@/components/weather-card"
import { WeatherSearch } from "@/components/weather-search"
import { WeatherForecast } from "@/components/weather-forecast"
import { WeatherCharts } from "@/components/weather-charts"
import { FavoritesPanel } from "@/components/favorites-panel"
import { SettingsPanel } from "@/components/settings-panel"
import { ThemeToggle } from "@/components/theme-toggle"
import HeroSection from "@/components/hero-section"
import EnhancedStats from "@/components/enhanced-stats"
import Footer from "@/components/footer"
import { Cloud, Wind, Droplets, Thermometer, Eye, Gauge, MapPin, Star, StarOff, Settings } from "lucide-react"
import { getTranslation, type Language } from "@/lib/translations"

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
  coordinates: {
    lat: number
    lon: number
  }
}

interface ForecastDay {
  date: string
  maxTemp: number
  minTemp: number
  condition: string
  icon: string
  humidity: number
  windSpeed: number
}

interface HourlyData {
  time: string
  temperature: number
  humidity: number
  windSpeed: number
  pressure: number
}

interface FavoriteCity {
  id: string
  name: string
  country: string
  coordinates: {
    lat: number
    lon: number
  }
  addedAt: string
}

interface UserSettings {
  temperatureUnit: "celsius" | "fahrenheit"
  windSpeedUnit: "kmh" | "mph"
  pressureUnit: "hpa" | "inHg"
  timeFormat: "24h" | "12h"
  autoRefresh: boolean
  refreshInterval: number
  showCharts: boolean
  showForecast: boolean
  theme: "light" | "dark" | "auto"
  language: Language
}

const defaultSettings: UserSettings = {
  temperatureUnit: "celsius",
  windSpeedUnit: "kmh",
  pressureUnit: "hpa",
  timeFormat: "24h",
  autoRefresh: true,
  refreshInterval: 300000, // 5 minutes
  showCharts: true,
  showForecast: true,
  theme: "auto",
  language: "fr",
}

export default function WeatherBoard() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([])
  const [loading, setLoading] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [favorites, setFavorites] = useState<FavoriteCity[]>([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState<UserSettings>(defaultSettings)
  const [expandedDetail, setExpandedDetail] = useState<string | null>(null)

  // Mock weather data for demonstration
  const mockWeatherData: WeatherData = {
    location: "Paris",
    country: "France",
    temperature: 22,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    visibility: 10,
    feelsLike: 24,
    icon: "partly-cloudy",
    localTime: new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Paris",
    }),
    coordinates: { lat: 48.8566, lon: 2.3522 },
  }

  const mockForecast: ForecastDay[] = [
    {
      date: "Aujourd'hui",
      maxTemp: 24,
      minTemp: 18,
      condition: "Partly Cloudy",
      icon: "partly-cloudy",
      humidity: 65,
      windSpeed: 12,
    },
    {
      date: "Demain",
      maxTemp: 26,
      minTemp: 19,
      condition: "Sunny",
      icon: "sunny",
      humidity: 58,
      windSpeed: 8,
    },
    {
      date: "Mercredi",
      maxTemp: 23,
      minTemp: 17,
      condition: "Rainy",
      icon: "rainy",
      humidity: 78,
      windSpeed: 15,
    },
    {
      date: "Jeudi",
      maxTemp: 21,
      minTemp: 15,
      condition: "Cloudy",
      icon: "cloudy",
      humidity: 72,
      windSpeed: 10,
    },
    {
      date: "Vendredi",
      maxTemp: 25,
      minTemp: 18,
      condition: "Sunny",
      icon: "sunny",
      humidity: 55,
      windSpeed: 7,
    },
  ]

  // Generate mock hourly data
  const generateHourlyData = (
    baseTemp: number,
    baseHumidity: number,
    baseWind: number,
    basePressure: number,
  ): HourlyData[] => {
    const data: HourlyData[] = []
    const now = new Date()

    for (let i = 0; i < 24; i++) {
      const time = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000)
      data.push({
        time: time.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
        temperature: baseTemp + Math.sin((i * Math.PI) / 12) * 5 + (Math.random() - 0.5) * 3,
        humidity: Math.max(30, Math.min(90, baseHumidity + (Math.random() - 0.5) * 20)),
        windSpeed: Math.max(0, baseWind + (Math.random() - 0.5) * 10),
        pressure: basePressure + (Math.random() - 0.5) * 20,
      })
    }
    return data
  }

  // Unit conversion functions
  const convertTemperature = (temp: number, unit: "celsius" | "fahrenheit") => {
    if (unit === "fahrenheit") {
      return Math.round((temp * 9) / 5 + 32)
    }
    return Math.round(temp)
  }

  const convertWindSpeed = (speed: number, unit: "kmh" | "mph") => {
    if (unit === "mph") {
      return Math.round(speed * 0.621371)
    }
    return Math.round(speed)
  }

  const convertPressure = (pressure: number, unit: "hpa" | "inHg") => {
    if (unit === "inHg") {
      return parseFloat((pressure * 0.02953).toFixed(2))
    }
    return Math.round(pressure)
  }

  useEffect(() => {
    // Initialize with mock data
    setCurrentWeather(mockWeatherData)
    setForecast(mockForecast)
    setHourlyData(generateHourlyData(22, 65, 12, 1013))

    // Load search history from localStorage
    const savedHistory = localStorage.getItem("weather-search-history")
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory))
    }

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("weather-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }

    // Load settings from localStorage
    const savedSettings = localStorage.getItem("weather-settings")
    if (savedSettings) {
      setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) })
    }

    // Check for dark mode preference
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  // Apply theme based on settings
  useEffect(() => {
    if (settings.theme === "auto") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDark(prefersDark)
      document.documentElement.classList.toggle("dark", prefersDark)
    } else {
      const isDarkTheme = settings.theme === "dark"
      setIsDark(isDarkTheme)
      document.documentElement.classList.toggle("dark", isDarkTheme)
    }
  }, [settings.theme])

  // Apply RTL for Arabic
  useEffect(() => {
    document.documentElement.dir = settings.language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = settings.language
  }, [settings.language])

  const handleSearch = async (city: string) => {
    setLoading(true)

    // Add to search history
    const newHistory = [city, ...searchHistory.filter((h) => h !== city)].slice(0, 5)
    setSearchHistory(newHistory)
    localStorage.setItem("weather-search-history", JSON.stringify(newHistory))

    try {
      const res = await fetch(`/api/weather?q=${encodeURIComponent(city)}`)
      if (!res.ok) throw new Error('API request failed')
      const data = await res.json()

      // Map normalized API data into our state shape
      const newWeather: WeatherData = {
        location: data.location || city,
        country: data.country || 'Unknown',
        temperature: data.temperature ?? mockWeatherData.temperature,
        condition: data.condition || mockWeatherData.condition,
        humidity: data.humidity ?? mockWeatherData.humidity,
        windSpeed: data.windSpeed ?? mockWeatherData.windSpeed,
        pressure: data.pressure ?? mockWeatherData.pressure,
        visibility: data.visibility ?? mockWeatherData.visibility,
        feelsLike: data.feelsLike ?? mockWeatherData.feelsLike,
        icon: data.icon || mockWeatherData.icon,
        localTime: new Date(data.localTime).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
        coordinates: data.coordinates || mockWeatherData.coordinates,
      }

      const newForecast: ForecastDay[] = (data.daily || mockForecast).slice(0, 5).map((d: any, idx: number) => ({
        date: d.date || mockForecast[idx].date,
        maxTemp: d.maxTemp ?? mockForecast[idx].maxTemp,
        minTemp: d.minTemp ?? mockForecast[idx].minTemp,
        condition: d.condition || mockForecast[idx].condition,
        icon: d.icon || mockForecast[idx].icon,
        humidity: d.humidity ?? mockForecast[idx].humidity,
        windSpeed: d.windSpeed ?? mockForecast[idx].windSpeed,
      }))

      const newHourlyData: HourlyData[] = (data.hourly || []).slice(0, 24).map((h: any) => ({
        time: new Date(h.time).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
        temperature: h.temperature,
        humidity: h.humidity,
        windSpeed: h.windSpeed,
        pressure: h.pressure,
      }))

      setCurrentWeather(newWeather)
      setForecast(newForecast)
      setHourlyData(newHourlyData.length ? newHourlyData : generateHourlyData(newWeather.temperature, newWeather.humidity, newWeather.windSpeed, newWeather.pressure))
    } catch (err) {
      // Fallback to mock behavior on error
      console.error('Weather API error:', err)
      setCurrentWeather(mockWeatherData)
      setForecast(mockForecast)
      setHourlyData(generateHourlyData(mockWeatherData.temperature, mockWeatherData.humidity, mockWeatherData.windSpeed, mockWeatherData.pressure))
    } finally {
      setLoading(false)
    }
  }

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.classList.toggle("dark", newTheme)
    // Update settings to manual theme control
    const newSettings = { ...settings, theme: newTheme ? ("dark" as const) : ("light" as const) }
    setSettings(newSettings)
    localStorage.setItem("weather-settings", JSON.stringify(newSettings))
  }

  const toggleFavorite = () => {
    if (!currentWeather) return

    const cityId = `${currentWeather.location}-${currentWeather.country}`
    const existingFavorite = favorites.find((fav) => fav.id === cityId)

    if (existingFavorite) {
      // Remove from favorites
      const newFavorites = favorites.filter((fav) => fav.id !== cityId)
      setFavorites(newFavorites)
      localStorage.setItem("weather-favorites", JSON.stringify(newFavorites))
    } else {
      // Add to favorites
      const newFavorite: FavoriteCity = {
        id: cityId,
        name: currentWeather.location,
        country: currentWeather.country,
        coordinates: currentWeather.coordinates,
        addedAt: new Date().toISOString(),
      }
      const newFavorites = [...favorites, newFavorite]
      setFavorites(newFavorites)
      localStorage.setItem("weather-favorites", JSON.stringify(newFavorites))
    }
  }

  const isFavorite = currentWeather
    ? favorites.some((fav) => fav.id === `${currentWeather.location}-${currentWeather.country}`)
    : false

  const handleFavoriteSelect = (favorite: FavoriteCity) => {
    handleSearch(favorite.name)
    setShowFavorites(false)
  }

  const removeFavorite = (favoriteId: string) => {
    const newFavorites = favorites.filter((fav) => fav.id !== favoriteId)
    setFavorites(newFavorites)
    localStorage.setItem("weather-favorites", JSON.stringify(newFavorites))
  }

  const handleSettingsChange = (newSettings: UserSettings) => {
    setSettings(newSettings)
    localStorage.setItem("weather-settings", JSON.stringify(newSettings))
  }

  const toggleDetailExpansion = (detailType: string) => {
    setExpandedDetail(expandedDetail === detailType ? null : detailType)
  }

  const getDetailedInfo = (type: string, weather: WeatherData) => {
    const details = {
      temperature: {
        title: "Informations sur la température",
        content: [
          `Température actuelle: ${weather.temperature}°${settings.temperatureUnit === "celsius" ? "C" : "F"}`,
          `Ressenti: ${weather.feelsLike}°${settings.temperatureUnit === "celsius" ? "C" : "F"}`,
          `La température peut varier selon l'altitude et la proximité de l'eau`,
          `Conditions idéales: 18-24°C pour le confort humain`,
        ]
      },
      humidity: {
        title: "Informations sur l'humidité",
        content: [
          `Humidité relative: ${weather.humidity}%`,
          `Taux d'humidité optimal: 40-60%`,
          `Humidité élevée (>70%): sensation de lourdeur`,
          `Humidité faible (<30%): air sec, inconfort`,
          `Impact sur la perception de température`,
        ]
      },
      wind: {
        title: "Informations sur le vent",
        content: [
          `Vitesse du vent: ${weather.windSpeed} ${settings.windSpeedUnit === "kmh" ? "km/h" : "mph"}`,
          `Force du vent: ${weather.windSpeed < 10 ? "Faible" : weather.windSpeed < 25 ? "Modéré" : weather.windSpeed < 50 ? "Fort" : "Très fort"}`,
          `Le vent affecte la température ressentie`,
          `Vent fort (>25 km/h): peut compliquer les activités extérieures`,
        ]
      },
      pressure: {
        title: "Informations sur la pression",
        content: [
          `Pression atmosphérique: ${weather.pressure} ${settings.pressureUnit === "hpa" ? "hPa" : "inHg"}`,
          `Pression normale: ~1013 hPa`,
          `Haute pression (>1020 hPa): temps stable, ciel dégagé`,
          `Basse pression (<1000 hPa): temps instable, risque de précipitations`,
          `Influence sur les conditions météorologiques`,
        ]
      }
    }
    return details[type as keyof typeof details] || null
  }

  const t = getTranslation(settings.language)

  // Apply unit conversions to weather data
  const displayWeather = currentWeather
    ? {
        ...currentWeather,
        temperature: convertTemperature(currentWeather.temperature, settings.temperatureUnit),
        feelsLike: convertTemperature(currentWeather.feelsLike, settings.temperatureUnit),
        windSpeed: convertWindSpeed(currentWeather.windSpeed, settings.windSpeedUnit),
        pressure: convertPressure(currentWeather.pressure, settings.pressureUnit),
      }
    : null

  const displayForecast = forecast.map((day) => ({
    ...day,
    maxTemp: convertTemperature(day.maxTemp, settings.temperatureUnit),
    minTemp: convertTemperature(day.minTemp, settings.temperatureUnit),
    windSpeed: convertWindSpeed(day.windSpeed, settings.windSpeedUnit),
  }))

  const displayHourlyData = hourlyData.map((hour) => ({
    ...hour,
    temperature: convertTemperature(hour.temperature, settings.temperatureUnit),
    windSpeed: convertWindSpeed(hour.windSpeed, settings.windSpeedUnit),
    pressure: convertPressure(hour.pressure, settings.pressureUnit),
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/50 to-indigo-50 dark:from-slate-900 dark:via-indigo-950/50 dark:to-slate-800 transition-all duration-500 animate-gradient-xy">
      <div className="background-particles"></div>
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 glass-shine">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 group">
                <div className="relative">
                  <Cloud className="h-8 w-8 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 drop-shadow-lg" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm scale-150 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 neon-hover">{t.appTitle}</h1>
              </div>
              <Badge variant="secondary" className="text-xs">
                {t.version}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <WeatherSearch onSearch={handleSearch} loading={loading} searchHistory={searchHistory} t={t} />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFavorites(!showFavorites)}
                className="relative transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary/10 border-primary/20"
              >
                <Star className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
                {favorites.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">{favorites.length}</Badge>
                )}
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setShowSettings(!showSettings)}
                className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary/10 border-primary/20"
              >
                <Settings className="h-4 w-4 transition-transform duration-300 hover:rotate-90" />
              </Button>
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            </div>
          </div>
        </div>
      </header>

      {/* Favorites Panel */}
      {showFavorites && (
        <FavoritesPanel
          favorites={favorites}
          onSelect={handleFavoriteSelect}
          onRemove={removeFavorite}
          onClose={() => setShowFavorites(false)}
          t={t}
        />
      )}

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onClose={() => setShowSettings(false)}
          t={t}
        />
      )}

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-8">
        {displayWeather ? (
          <div className="space-y-12">
            {/* Section Héros avec animations */}
            <HeroSection currentWeather={displayWeather} t={t} />

            {/* Statistiques améliorées avec animations */}
            <div className="space-y-6">
              <div className="text-center space-y-2 cascade-animation">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Conditions Actuelles
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Découvrez les détails météorologiques en temps réel avec des informations complètes et interactives
                </p>
              </div>
              
              <EnhancedStats 
                weather={displayWeather}
                settings={settings}
                t={t}
                expandedDetail={expandedDetail}
                onToggleDetail={toggleDetailExpansion}
                getDetailedInfo={getDetailedInfo}
              />
            </div>

            {/* Vue d'ensemble météo traditionnelle */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 cascade-animation" style={{animationDelay: '0.6s'}}>
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                      <Cloud className="h-5 w-5 text-primary animate-soft-pulse" />
                      Météo Détaillée
                    </h2>
                    <Button
                      variant={isFavorite ? "default" : "outline"}
                      size="sm"
                      onClick={toggleFavorite}
                      className="gap-2 transition-all duration-300 hover:scale-105 wave-effect"
                    >
                      {isFavorite ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
                      <span className="hidden sm:inline">
                        {isFavorite ? t.favorites.favorite : t.favorites.add}
                      </span>
                    </Button>
                  </div>
                  <div className="magic-glow">
                    <WeatherCard weather={displayWeather} settings={settings} t={t} />
                  </div>
                </div>
              </div>

              {/* Weather Details */}
              <div className="space-y-4">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-primary" />
                      {t.details.feelsLike}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Thermometer className="h-4 w-4" />
                        <span className="text-sm">{t.details.feelsLike}</span>
                      </div>
                      <span className="font-medium">
                        {displayWeather.feelsLike}°{settings.temperatureUnit === "celsius" ? "C" : "F"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Droplets className="h-4 w-4" />
                        <span className="text-sm">{t.details.humidity}</span>
                      </div>
                      <span className="font-medium">{displayWeather.humidity}%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Wind className="h-4 w-4" />
                        <span className="text-sm">{t.details.wind}</span>
                      </div>
                      <span className="font-medium">
                        {displayWeather.windSpeed} {settings.windSpeedUnit === "kmh" ? "km/h" : "mph"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Gauge className="h-4 w-4" />
                        <span className="text-sm">{t.details.pressure}</span>
                      </div>
                      <span className="font-medium">
                        {displayWeather.pressure} {settings.pressureUnit === "hpa" ? "hPa" : "inHg"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">{t.details.visibility}</span>
                      </div>
                      <span className="font-medium">{displayWeather.visibility} km</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      {t.details.location}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t.details.latitude}</span>
                      <span className="font-medium">{displayWeather.coordinates.lat.toFixed(4)}°</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t.details.longitude}</span>
                      <span className="font-medium">{displayWeather.coordinates.lon.toFixed(4)}°</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Graphiques et prévisions avec animations */}
            {settings.showCharts && (
              <div className="cascade-animation" style={{animationDelay: '0.8s'}}>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Analyses Météorologiques
                  </h3>
                  <p className="text-muted-foreground">Évolution des conditions sur 24 heures</p>
                </div>
                <div className="magic-glow">
                  <WeatherCharts hourlyData={displayHourlyData} settings={settings} t={t} />
                </div>
              </div>
            )}

            {settings.showForecast && (
              <div className="cascade-animation" style={{animationDelay: '1.0s'}}>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                    Prévisions 5 Jours
                  </h3>
                  <p className="text-muted-foreground">Planifiez vos activités en toute confiance</p>
                </div>
                <div className="magic-glow">
                  <WeatherForecast forecast={displayForecast} settings={settings} t={t} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[400px] cascade-animation">
            <div className="text-center space-y-6">
              <div className="relative">
                <Cloud className="h-24 w-24 text-muted-foreground mx-auto animate-elegant-bounce" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse opacity-30" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {t.empty.title}
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                  {t.empty.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer professionnel */}
      <Footer />
    </div>
  )
}
