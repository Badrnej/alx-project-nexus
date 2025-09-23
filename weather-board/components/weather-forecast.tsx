import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Wind, Droplets } from "lucide-react"
import type { Translations } from "@/lib/translations"

interface ForecastDay {
  date: string
  maxTemp: number
  minTemp: number
  condition: string
  icon: string
  humidity: number
  windSpeed: number
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

interface WeatherForecastProps {
  forecast: ForecastDay[]
  settings?: UserSettings
  t: Translations
}

export function WeatherForecast({ forecast, settings, t }: WeatherForecastProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
      case "clear":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "partly cloudy":
      case "cloudy":
        return <Cloud className="h-8 w-8 text-blue-500" />
      case "rainy":
      case "rain":
        return <CloudRain className="h-8 w-8 text-blue-600" />
      default:
        return <Cloud className="h-8 w-8 text-blue-500" />
    }
  }

  const tempUnit = settings?.temperatureUnit === "fahrenheit" ? "°F" : "°C"
  const windUnit = settings?.windSpeedUnit === "mph" ? "mph" : "km/h"

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{t.forecast.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {forecast.map((day, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-4 border border-primary/10 hover:border-primary/20 transition-colors"
            >
              <div className="text-center space-y-3">
                <h3 className="font-semibold text-foreground">{day.date}</h3>

                <div className="flex justify-center">{getWeatherIcon(day.condition)}</div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg font-bold text-foreground">
                      {day.maxTemp}
                      {tempUnit}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {day.minTemp}
                      {tempUnit}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t.conditions[day.condition.toLowerCase() as keyof typeof t.conditions] || day.condition}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-border/50">
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <Droplets className="h-3 w-3" />
                    <span>{day.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <Wind className="h-3 w-3" />
                    <span>
                      {day.windSpeed} {windUnit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
