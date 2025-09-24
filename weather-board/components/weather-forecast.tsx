import { Cloud, Sun, CloudRain, Wind, Droplets, Calendar } from "lucide-react"
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
        return <Sun className="h-8 w-8 text-yellow-400" />
      case "partly cloudy":
      case "cloudy":
        return <Cloud className="h-8 w-8 text-blue-400" />
      case "rainy":
      case "rain":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      default:
        return <Cloud className="h-8 w-8 text-blue-400" />
    }
  }

  const tempUnit = settings?.temperatureUnit === "fahrenheit" ? "°F" : "°C"
  const windUnit = settings?.windSpeedUnit === "mph" ? "mph" : "km/h"

  return (
    <div className="glass rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 glass rounded-xl">
          <Calendar className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">{t.forecast.title}</h3>
      </div>

      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="glass rounded-xl p-4 hover:glass-strong transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 glass rounded-lg">
                  {getWeatherIcon(day.condition)}
                </div>
                <div>
                  <p className="font-medium">{day.date}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.conditions[day.condition.toLowerCase() as keyof typeof t.conditions] || day.condition}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <span className="text-lg font-bold">
                    {day.maxTemp}{tempUnit}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {day.minTemp}{tempUnit}
                  </span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <Droplets className="h-3 w-3 text-blue-500" />
                    <span className="text-xs">{day.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wind className="h-3 w-3 text-blue-500" />
                    <span className="text-xs">{day.windSpeed} {windUnit}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
