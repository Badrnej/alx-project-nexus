"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { WeatherCard } from "@/components/weather-card"
import { WeatherSearch } from "@/components/weather-search"
import { WeatherForecast } from "@/components/weather-forecast"
import { WeatherCharts } from "@/components/weather-charts"
import { FavoritesPanel } from "@/components/favorites-panel"
import { SettingsPanel } from "@/components/settings-panel"
import { ThemeToggle } from "@/components/theme-toggle"
import { Cloud, Wind, Droplets, Thermometer, Eye, Gauge, MapPin, Star, StarOff, Settings } from "lucide-react"
import { WeatherDetailIcon } from "@/components/weather-icons"
import { getTranslation, type Language } from "@/lib/translations"
import { TemperatureDetailView } from "@/components/temperature-detail-view"
import { HumidityDetailView } from "@/components/humidity-detail-view"
import { WindDetailView } from "@/components/wind-detail-view"
import { PressureDetailView } from "@/components/pressure-detail-view"
import { LiquidButton } from "@/components/ui/liquid-button"
import { 
  getWeatherByCity, 
  getWeatherByGeolocation, 
  type WeatherData, 
  type ForecastDay, 
  type HourlyData 
} from "@/lib/weather-api"

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
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [favorites, setFavorites] = useState<FavoriteCity[]>([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState<UserSettings>(defaultSettings)
  const [currentView, setCurrentView] = useState<"dashboard" | "temperature" | "humidity" | "wind" | "pressure">(
    "dashboard",
  )

  // Initialize weather data with geolocation or default city
  const initializeWeatherData = async () => {
    try {
      setLoading(true)
      
      // Try to get weather by geolocation first
      try {
        const data = await getWeatherByGeolocation()
        setCurrentWeather(data.current)
        setForecast(data.forecast.daily)
        setHourlyData(data.forecast.hourly)
      } catch (geoError) {
        // If geolocation fails, default to Paris
        console.log(t.messages.geolocationFailed)
        const data = await getWeatherByCity("Paris")
        setCurrentWeather(data.current)
        setForecast(data.forecast.daily)
        setHourlyData(data.forecast.hourly)
      }
    } catch (error) {
      console.error(t.messages.initializationError, error)
    } finally {
      setLoading(false)
    }
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
      return Math.round(pressure * 0.02953 * 100) / 100
    }
    return pressure
  }

  useEffect(() => {
    // Initialize weather data
    initializeWeatherData()

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
    try {
      const { current, forecast } = await getWeatherByCity(city)
      
      setCurrentWeather(current)
      setForecast(forecast.daily)
      setHourlyData(forecast.hourly)

      // Update search history
      const newHistory = [city, ...searchHistory.filter((h) => h !== city)].slice(0, 5)
      setSearchHistory(newHistory)
      localStorage.setItem("weather-search-history", JSON.stringify(newHistory))
    } catch (error) {
      console.error("Erreur lors de la recherche:", error)
      // You could add a toast notification here
    } finally {
      setLoading(false)
    }
  }

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.classList.toggle("dark", newTheme)
    // Update settings to manual theme control
    const newSettings = { ...settings, theme: newTheme ? "dark" : ("light" as const) }
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

  const handleChartClick = (chartType: "temperature" | "humidity" | "wind" | "pressure") => {
    setCurrentView(chartType)
  }

  const handleBackToDashboard = () => {
    setCurrentView("dashboard")
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
    pressure: hour.pressure ? convertPressure(hour.pressure, settings.pressureUnit) : 1013,
  }))

  return (
    <div className="min-h-screen weather-gradient">
      {/* Header */}
      <header className="glass-strong border-b border-border/30 fixed-header">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="p-1.5 sm:p-2 glass rounded-xl">
                  <Cloud className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">{t.appTitle}</h1>
              </div>
              <Badge variant="secondary" className="text-xs glass hidden sm:inline-flex">
                {t.version}
              </Badge>
              {currentView !== "dashboard" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToDashboard}
                  className="glass hover:glass-strong transition-all duration-300 ml-2 sm:ml-4 bg-transparent hidden sm:inline-flex"
                >
                  ← {t.common.backToDashboard}
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Mobile back button */}
              {currentView !== "dashboard" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToDashboard}
                  className="glass hover:glass-strong transition-all duration-300 bg-transparent sm:hidden"
                >
                  ←
                </Button>
              )}

              {/* Search - responsive width */}
              <div className="hidden sm:block">
                <WeatherSearch onSearch={handleSearch} loading={loading} searchHistory={searchHistory} t={t} />
              </div>

              {/* Mobile search button */}
              <Button
                variant="outline"
                size="icon"
                className="glass hover:glass-strong transition-all duration-300 sm:hidden bg-transparent"
                onClick={() => {
                  /* Add mobile search modal logic */
                }}
              >
                <MapPin className="h-4 w-4" />
              </Button>

              {/* Geolocation button */}
              <LiquidButton
                variant="outline"
                size="icon"
                onClick={async () => {
                  try {
                    setLoading(true)
                    const data = await getWeatherByGeolocation()
                    setCurrentWeather(data.current)
                    setForecast(data.forecast.daily)
                    setHourlyData(data.forecast.hourly)
                  } catch (error) {
                    console.error("Erreur de géolocalisation:", error)
                  } finally {
                    setLoading(false)
                  }
                }}
                disabled={loading}
                title="Utiliser ma position actuelle"
              >
                <MapPin className="h-4 w-4" />
              </LiquidButton>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFavorites(!showFavorites)}
                className="relative glass hover:glass-strong transition-all duration-300"
              >
                <Star className="h-4 w-4" />
                {favorites.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 sm:h-5 sm:w-5 p-0 text-xs glass-strong">
                    {favorites.length}
                  </Badge>
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowSettings(!showSettings)}
                className="glass hover:glass-strong transition-all duration-300"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            </div>
          </div>

          <div className="mt-4 sm:hidden">
            <WeatherSearch onSearch={handleSearch} loading={loading} searchHistory={searchHistory} t={t} />
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
      <main className="container mx-auto px-4 py-4 sm:py-8 header-offset">{/* Content offset to compensate for fixed header */}
        {displayWeather ? (
          <div className="space-y-6 sm:space-y-8">
            {currentView === "dashboard" && (
              <>
                {/* Current Weather Overview */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                  <div className="xl:col-span-2">
                    <div className="relative">
                      <WeatherCard 
                        weather={displayWeather} 
                        settings={settings} 
                        t={t} 
                        forecast={{
                          daily: forecast,
                          hourly: hourlyData
                        }}
                      />
                    </div>
                    
                    {/* Favorite Button - Moved below the weather card */}
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant={isFavorite ? "default" : "outline"}
                        size="sm"
                        onClick={toggleFavorite}
                        className="gap-2 glass hover:glass-strong transition-all duration-300"
                      >
                        {isFavorite ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
                        <span className="hidden sm:inline">{isFavorite ? t.favorites.favorite : t.favorites.add}</span>
                      </Button>
                    </div>
                  </div>

                  {/* Weather Details */}
                  <div className="space-y-4 xl:space-y-4">
                    {/* Detailed Weather Metrics */}
                    <div className="glass-strong rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
                        <WeatherDetailIcon type="gauge" size={32} className="text-primary" />
                        {t.details.feelsLike}
                      </h3>

                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <WeatherDetailIcon type="temperature" size={28} />
                            <span className="text-xs sm:text-sm">{t.details.feelsLike}</span>
                          </div>
                          <span className="text-xl sm:text-2xl font-bold text-foreground">
                            {displayWeather.feelsLike}°{settings.temperatureUnit === "celsius" ? "C" : "F"}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <WeatherDetailIcon type="humidity" size={28} />
                            <span className="text-xs sm:text-sm">{t.details.humidity}</span>
                          </div>
                          <span className="text-xl sm:text-2xl font-bold text-foreground">
                            {displayWeather.humidity}%
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <WeatherDetailIcon type="wind" size={28} />
                            <span className="text-xs sm:text-sm">{t.details.wind}</span>
                          </div>
                          <span className="text-xl sm:text-2xl font-bold text-foreground">
                            {displayWeather.windSpeed} {settings.windSpeedUnit === "kmh" ? "km/h" : "mph"}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <WeatherDetailIcon type="visibility" size={28} />
                            <span className="text-xs sm:text-sm">{t.details.visibility}</span>
                          </div>
                          <span className="text-xl sm:text-2xl font-bold text-foreground">
                            {displayWeather.visibility} km
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 sm:pt-4 border-t border-border/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <WeatherDetailIcon type="pressure" size={28} />
                            <span className="text-xs sm:text-sm">{t.details.pressure}</span>
                          </div>
                          <span className="font-semibold text-foreground">
                            {displayWeather.pressure} {settings.pressureUnit === "hpa" ? "hPa" : "inHg"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Weather Details */}
                    <div className="glass-strong rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2 mb-4 sm:mb-6">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        Détails Supplémentaires
                      </h3>

                      <div className="space-y-4 sm:space-y-6">
                        {/* UV Index */}
                        <div className="flex items-center justify-between p-3 glass rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-500/20 rounded-lg">
                              <WeatherDetailIcon type="uv-index" size={28} className="text-orange-500" />
                            </div>
                            <div>
                              <span className="text-sm sm:text-base font-medium text-foreground">Indice UV</span>
                              <p className="text-xs sm:text-sm text-muted-foreground">Modéré</p>
                            </div>
                          </div>
                          <span className="text-xl sm:text-2xl font-bold text-orange-500">5</span>
                        </div>

                        {/* Air Quality */}
                        <div className="flex items-center justify-between p-3 glass rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500/20 rounded-lg">
                              <WeatherDetailIcon type="visibility" size={28} className="text-green-500" />
                            </div>
                            <div>
                              <span className="text-sm sm:text-base font-medium text-foreground">Qualité de l'Air</span>
                              <p className="text-xs sm:text-sm text-muted-foreground">Bonne</p>
                            </div>
                          </div>
                          <span className="text-xl sm:text-2xl font-bold text-green-500">42</span>
                        </div>

                        {/* Sunrise/Sunset */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div className="p-3 glass rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="p-1 bg-yellow-500/20 rounded">
                                <WeatherDetailIcon type="sunrise" size={24} className="text-yellow-500" />
                              </div>
                              <span className="text-xs sm:text-sm text-muted-foreground">Lever</span>
                            </div>
                            <span className="text-lg sm:text-xl font-bold text-foreground">06:42</span>
                          </div>
                          <div className="p-3 glass rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="p-1 bg-orange-500/20 rounded">
                                <WeatherDetailIcon type="sunset" size={24} className="text-orange-500" />
                              </div>
                              <span className="text-xs sm:text-sm text-muted-foreground">Coucher</span>
                            </div>
                            <span className="text-lg sm:text-xl font-bold text-foreground">20:15</span>
                          </div>
                        </div>

                        {/* Moon Phase */}
                        <div className="flex items-center justify-between p-3 glass rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-500/20 rounded-lg">
                              <WeatherDetailIcon type="moon" size={28} className="text-slate-400" />
                            </div>
                            <div>
                              <span className="text-sm sm:text-base font-medium text-foreground">Phase Lunaire</span>
                              <p className="text-xs sm:text-sm text-muted-foreground">Premier Quartier</p>
                            </div>
                          </div>
                          <span className="text-2xl sm:text-3xl">🌓</span>
                        </div>
                      </div>
                    </div>

                    {/* Location Details */}
                    <div className="glass-strong rounded-2xl p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2 mb-3 sm:mb-4">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        {t.details.location}
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-muted-foreground">{t.details.latitude}</span>
                          <span className="font-medium text-foreground text-sm sm:text-base">
                            {displayWeather.coordinates.lat.toFixed(4)}°
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-muted-foreground">{t.details.longitude}</span>
                          <span className="font-medium text-foreground text-sm sm:text-base">
                            {displayWeather.coordinates.lon.toFixed(4)}°
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border/30">
                          <span className="text-xs sm:text-sm text-muted-foreground">{t.details.altitude}</span>
                          <span className="font-medium text-foreground text-sm sm:text-base">35 m</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg sm:rounded-xl">
                        <Thermometer className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{t.stats.temperature}</p>
                        <p className="text-xl sm:text-2xl font-bold text-blue-500">
                          {displayWeather.temperature}°{settings.temperatureUnit === "celsius" ? "C" : "F"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 rounded-lg sm:rounded-xl">
                        <Droplets className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-500" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{t.stats.humidity}</p>
                        <p className="text-xl sm:text-2xl font-bold text-cyan-500">{displayWeather.humidity}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 rounded-lg sm:rounded-xl">
                        <Wind className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{t.stats.wind}</p>
                        <p className="text-xl sm:text-2xl font-bold text-indigo-500">
                          {displayWeather.windSpeed} {settings.windSpeedUnit === "kmh" ? "km/h" : "mph"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-lg sm:rounded-xl">
                        <Gauge className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{t.stats.pressure}</p>
                        <p className="text-xl sm:text-2xl font-bold text-purple-500">
                          {displayWeather.pressure} {settings.pressureUnit === "hpa" ? "hPa" : "inHg"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {settings.showCharts && (
                  <WeatherCharts
                    hourlyData={displayHourlyData}
                    settings={settings}
                    t={t}
                    onChartClick={handleChartClick}
                  />
                )}

                {settings.showForecast && <WeatherForecast forecast={displayForecast} settings={settings} t={t} />}
              </>
            )}

            {currentView === "temperature" && (
              <TemperatureDetailView
                hourlyData={displayHourlyData}
                currentWeather={displayWeather}
                settings={settings}
                t={t}
              />
            )}

            {currentView === "humidity" && (
              <HumidityDetailView
                hourlyData={displayHourlyData}
                currentWeather={displayWeather}
                settings={settings}
                t={t}
              />
            )}

            {currentView === "wind" && (
              <WindDetailView
                hourlyData={displayHourlyData}
                currentWeather={displayWeather}
                settings={settings}
                t={t}
              />
            )}

            {currentView === "pressure" && (
              <PressureDetailView
                hourlyData={displayHourlyData}
                currentWeather={displayWeather}
                settings={settings}
                t={t}
              />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4 glass-strong rounded-2xl p-8 sm:p-12 mx-4">
              <div className="p-3 sm:p-4 glass rounded-2xl w-fit mx-auto">
                <Cloud className="h-12 w-12 sm:h-16 sm:w-16 text-primary" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">{t.empty.title}</h2>
                <p className="text-sm sm:text-base text-muted-foreground">{t.empty.description}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
