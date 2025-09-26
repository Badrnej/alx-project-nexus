import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  Clock,
  Star,
  StarOff
} from "lucide-react"
import { WeatherIcon } from "./weather-icons"
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
  isFavorite?: boolean
  onToggleFavorite?: () => void
}

export function WeatherCard({ weather, settings, t, forecast, isFavorite, onToggleFavorite }: WeatherCardPropsNew) {
  const getWeatherIcon = (condition: string, size: "large" | "small" = "large") => {
    const iconSize = size === "large" ? 80 : 32;
    
    return <WeatherIcon condition={condition} size={iconSize} className="drop-shadow-lg" />
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
          <div className="p-2 sm:p-3 rounded-2xl bg-gradient-to-br darck:from-blue-500/20 dark:to-purple-500/20 backdrop-blur-sm border dark:border-white/10">
            <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-black dark:text-blue-300" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-blue-200 dark:via-blue-100 dark:to-gray-300 bg-clip-text text-transparent truncate">
              {weather.location}
            </h2>
            <p className="text-sm sm:text-base text-black dark:text-blue-200 truncate">{weather.country}</p>
          </div>
        </div>
        <Badge variant="outline" className="glass text-xs backdrop-blur-md border-white/20 text-black/90 dark:text-white/90 shrink-0">
          <Clock className="h-3 w-3 mr-1 rtl:mr-0 rtl:ml-1" />
          {t.details.live}
        </Badge>
        {onToggleFavorite && (
          <Button
            variant={isFavorite ? "default" : "outline"}
            size="sm"
            onClick={onToggleFavorite}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md px-3 has-[>svg]:px-2.5 gap-2 glass hover:glass-strong transition-all duration-300 ml-3 rtl:ml-0 rtl:mr-3"
            data-slot="button"
          >
            {isFavorite ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
            <span className="hidden sm:inline">{isFavorite ? t.favorites.favorite : t.favorites.add}</span>
          </Button>
        )}
      </div>

      {/* Main Weather Display */}
      <div className="flex items-center justify-between mb-8 sm:mb-10 relative z-10">
        <div className="space-y-3 sm:space-y-5 flex-1">
          <div className="flex items-baseline gap-2 sm:gap-3">
              <span
                  className="text-6xl sm:text-8xl font-extralight bg-gradient-to-br from-gray-900 via-gray-600 to-gray-800 dark:from-white dark:via-blue-100 dark:to-blue-200 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
                  {weather.temperature}
              </span>
            <span className="text-3xl sm:text-4xl text-gray-500/70 dark:text-blue-200/70 font-light">{tempUnit}</span>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <p className="text-xl sm:text-2xl font-semibold text-gray-500/70 dark:text-blue-200/70 drop-shadow-md">
              {t.conditions[weather.condition.toLowerCase() as keyof typeof t.conditions] || weather.condition}
            </p>
            <p className="text-sm sm:text-base text-blck/70 dark:text-blue-200/70 backdrop-blur-sm bg-white/5 px-3 py-1 rounded-full border border-white/10 inline-block">
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
          <p className="text-xs text-muted-foreground mb-1">{t.details.visibility}</p>
          <p className="text-sm sm:text-lg font-semibold text-foreground">{weather.visibility} km</p>
        </div>

        <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
          <div className="flex items-center justify-center mb-1 sm:mb-2">
            <Wind className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">{t.details.wind}</p>
          <p className="text-sm sm:text-lg font-semibold text-foreground">
            {weather.windSpeed} {settings?.windSpeedUnit === "mph" ? "mph" : "km/h"}
          </p>
        </div>

        <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
          <div className="flex items-center justify-center mb-1 sm:mb-2">
            <Sunrise className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">{t.details.sunrise}</p>
          <p className="text-sm sm:text-lg font-semibold text-foreground">06:42</p>
        </div>

        <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
          <div className="flex items-center justify-center mb-1 sm:mb-2">
            <Sunset className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">{t.details.sunset}</p>
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
      {settings?.showForecast !== false && (
        <div className="mt-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl dark:bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
              <Calendar className="h-5 w-5 text-black dark:text-blue-300" />
            </div>
            <h3
              className="text-lg font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-white dark:via-blue-100 dark:to-purple-200 bg-clip-text text-transparent">
              {t.forecast.fiveDayTitle}
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
                    <p className="text-xs text-white/50 leading-tight truncate">
                      {t.conditions[day.condition.toLowerCase() as keyof typeof t.conditions] || day.condition}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/70 text-center">{t.forecast.loading}</p>
            )}
          </div>
        </div>
      )}

      {/* Hourly Forecast Section */}
      {settings?.showForecast !== false && (
        <div className="mt-6 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl dark:bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10">
              <Clock className="h-5 w-5 text-black dark:text-purple-300" />
            </div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-white dark:via-blue-100 dark:to-purple-200 bg-clip-text text-transparent">
              {t.forecast.hourlyTitle}
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
              <p className="text-sm text-white/70 text-center">{t.forecast.loading}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
