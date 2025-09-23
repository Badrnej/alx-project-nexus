import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, Sun, CloudRain, MapPin, Clock } from "lucide-react"
import type { Translations } from "@/lib/translations"

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

interface WeatherCardProps {
  weather: WeatherData
  settings?: UserSettings
  t: Translations
}

export function WeatherCard({ weather, settings, t }: WeatherCardProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
      case "clear":
        return <Sun className="h-16 w-16 text-yellow-500" />
      case "partly cloudy":
      case "cloudy":
        return <Cloud className="h-16 w-16 text-blue-500" />
      case "rainy":
      case "rain":
        return <CloudRain className="h-16 w-16 text-blue-600" />
      default:
        return <Cloud className="h-16 w-16 text-blue-500" />
    }
  }

  const tempUnit = settings?.temperatureUnit === "fahrenheit" ? "°F" : "°C"

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl font-bold">
              {weather.location}, {weather.country}
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {t.details.live}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span className="text-sm">
            {t.details.localTime}: {weather.localTime}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-bold text-primary">{weather.temperature}</span>
              <span className="text-2xl text-muted-foreground">{tempUnit}</span>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-medium text-foreground">
                {t.conditions[weather.condition.toLowerCase() as keyof typeof t.conditions] || weather.condition}
              </p>
              <p className="text-sm text-muted-foreground">
                {t.details.feelsLike} {weather.feelsLike}
                {tempUnit}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            {getWeatherIcon(weather.condition)}
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                {t.conditions[weather.condition.toLowerCase() as keyof typeof t.conditions] || weather.condition}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
