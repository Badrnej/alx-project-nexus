import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudDrizzle,
  Wind,
  Droplets,
  Gauge,
  Thermometer,
  Umbrella,
  Eye,
  Sunrise,
  Sunset,
  MapPin,
  Calendar,
  Clock
} from "lucide-react"
import type { Translations } from "@/lib/translations"
import type { WeatherData, ForecastDay, HourlyData } from "@/lib/weather-api"

interface WeatherCardProps {
  weather?: WeatherData
  translations: Translations
  forecast?: {
    daily: ForecastDay[]
    hourly: HourlyData[]
  }
}

interface WeatherDataLegacy {
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
}

interface WeatherCardPropsNew {
  weather: WeatherData
  settings?: UserSettings
  t: Translations
  forecast?: {
    daily: ForecastDay[]
    hourly: HourlyData[]
  }
}

export function WeatherCard({ weather, settings, t, forecast }: WeatherCardPropsNew) {
  const getWeatherIcon = (condition: string, size: "large" | "small" = "large") => {
    const iconSize = size === "large" ? "h-20 w-20" : "h-8 w-8"
    const textSize = size === "large" ? "text-yellow-500" : "text-yellow-400"
    
    switch (condition.toLowerCase()) {
      case "sunny":
      case "clear":
      case "ensoleillé":
      case "dégagé":
        return <Sun className={`${iconSize} ${textSize} drop-shadow-lg`} />
      case "partly cloudy":
      case "cloudy":
      case "nuageux":
      case "partiellement nuageux":
      case "peu nuageux":
        return <Cloud className={`${iconSize} text-blue-500 drop-shadow-lg`} />
      case "rainy":
      case "rain":
      case "pluie":
      case "pluvieux":
      case "bruine":
        return <CloudRain className={`${iconSize} text-blue-600 drop-shadow-lg`} />
      case "snow":
      case "neige":
        return <CloudSnow className={`${iconSize} text-blue-200 drop-shadow-lg`} />
      case "thunderstorm":
      case "orage":
        return <CloudLightning className={`${iconSize} text-purple-500 drop-shadow-lg`} />
      case "drizzle":
      case "bruine légère":
        return <CloudDrizzle className={`${iconSize} text-blue-400 drop-shadow-lg`} />
      default:
        return <Cloud className={`${iconSize} text-blue-500 drop-shadow-lg`} />
    }
  }

  const getWeatherBackground = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
      case "clear":
        return "from-yellow-500/10 via-orange-500/5 to-red-500/10"
      case "partly cloudy":
        return "from-blue-500/10 via-cyan-500/5 to-indigo-500/10"
      case "cloudy":
        return "from-gray-500/10 via-slate-500/5 to-gray-600/10"
      case "rainy":
      case "rain":
        return "from-blue-600/10 via-indigo-600/5 to-purple-600/10"
      default:
        return "from-blue-500/10 via-cyan-500/5 to-indigo-500/10"
    }
  }

  const tempUnit = settings?.temperatureUnit === "fahrenheit" ? "°F" : "°C"

  return (
    <div
      className={`weather-card rounded-3xl p-8 bg-gradient-to-br ${getWeatherBackground(weather.condition)} hover:scale-[1.02] transition-all duration-500 relative overflow-hidden`}
    >
      {/* Particle effects */}
      <div className="weather-particles"></div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 relative z-10">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <div className="p-2 sm:p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
            <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-blue-300" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent truncate">
              {weather.location}
            </h2>
            <p className="text-sm sm:text-base text-blue-200/80 truncate">{weather.country}</p>
          </div>
        </div>
        <Badge variant="outline" className="glass text-xs backdrop-blur-md border-white/20 text-white/90 shrink-0">
          <Clock className="h-3 w-3 mr-1" />
          {t.details.live}
        </Badge>
      </div>

      {/* Main Weather Display */}
      <div className="flex items-center justify-between mb-8 sm:mb-10 relative z-10">
        <div className="space-y-3 sm:space-y-5 flex-1">
          <div className="flex items-baseline gap-2 sm:gap-3">
            <span className="text-6xl sm:text-8xl font-extralight bg-gradient-to-br from-white via-blue-100 to-blue-200 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
              {weather.temperature}
            </span>
            <span className="text-3xl sm:text-4xl text-white/70 font-light">{tempUnit}</span>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <p className="text-xl sm:text-2xl font-semibold text-white/90 drop-shadow-md">
              {t.conditions[weather.condition.toLowerCase() as keyof typeof t.conditions] || weather.condition}
            </p>
            <p className="text-sm sm:text-base text-white/70 backdrop-blur-sm bg-white/5 px-3 py-1 rounded-full border border-white/10 inline-block">
              {t.details.feelsLike} {weather.feelsLike}{tempUnit}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 sm:gap-5 shrink-0">
          <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-2xl">
            {getWeatherIcon(weather.condition)}
          </div>
        </div>
      </div>

      {/* Enhanced Weather Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
          <div className="flex items-center justify-center mb-1 sm:mb-2">
            <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">Visibilité</p>
          <p className="text-sm sm:text-lg font-semibold text-foreground">{weather.visibility} km</p>
        </div>

        <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
          <div className="flex items-center justify-center mb-1 sm:mb-2">
            <Wind className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">Vent</p>
          <p className="text-sm sm:text-lg font-semibold text-foreground">
            {weather.windSpeed} {settings?.windSpeedUnit === "mph" ? "mph" : "km/h"}
          </p>
        </div>

        <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
          <div className="flex items-center justify-center mb-1 sm:mb-2">
            <Sunrise className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">Lever</p>
          <p className="text-sm sm:text-lg font-semibold text-foreground">06:42</p>
        </div>

        <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
          <div className="flex items-center justify-center mb-1 sm:mb-2">
            <Sunset className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">Coucher</p>
          <p className="text-sm sm:text-lg font-semibold text-foreground">20:15</p>
        </div>
      </div>

      {/* Time and Location Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 pt-3 sm:pt-4 border-t border-border/30">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-xs sm:text-sm">
            {t.details.localTime}: {weather.localTime}
          </span>
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground">
          {weather.coordinates.lat.toFixed(2)}°, {weather.coordinates.lon.toFixed(2)}°
        </div>
      </div>

      {/* Daily Forecast Section */}
      <div className="mt-8 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
            <Calendar className="h-5 w-5 text-blue-300" />
          </div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Prévisions 5 jours
          </h3>
        </div>
        <div className="glass rounded-xl p-4 bg-gradient-to-r from-white/5 to-transparent">
          {forecast?.daily && forecast.daily.length > 0 ? (
            <div className="grid grid-cols-5 gap-3">
              {forecast.daily.map((day, index) => (
                <div key={index} className="text-center space-y-2">
                  <p className="text-xs text-white/70 font-medium">{day.date}</p>
                  <div className="flex justify-center">
                    {getWeatherIcon(day.condition, "small")}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">{day.maxTemp}°</p>
                    <p className="text-xs text-white/60">{day.minTemp}°</p>
                  </div>
                  <p className="text-xs text-white/50 leading-tight truncate">{day.condition}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-white/70 text-center">Chargement des prévisions...</p>
          )}
        </div>
      </div>

      {/* Hourly Forecast Section */}
      <div className="mt-6 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10">
            <Clock className="h-5 w-5 text-purple-300" />
          </div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent">
            Prévisions horaires
          </h3>
        </div>
        <div className="glass rounded-xl p-4 bg-gradient-to-r from-white/5 to-transparent">
          {forecast?.hourly && forecast.hourly.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {forecast.hourly.map((hour, index) => (
                <div key={index} className="flex-shrink-0 text-center space-y-2 min-w-[80px]">
                  <p className="text-xs text-white/70 font-medium">{hour.time}</p>
                  <div className="flex justify-center">
                    {getWeatherIcon(hour.condition, "small")}
                  </div>
                  <p className="text-sm font-bold text-white">{hour.temperature}°</p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <Droplets className="h-3 w-3 text-blue-300" />
                      <span className="text-xs text-white/60">{hour.humidity}%</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Wind className="h-3 w-3 text-green-300" />
                      <span className="text-xs text-white/60">{hour.windSpeed}km/h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-white/70 text-center">Chargement des prévisions...</p>
          )}
        </div>
      </div>
    </div>
  )
}
