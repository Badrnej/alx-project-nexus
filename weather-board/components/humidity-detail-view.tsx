"use client"
import { Badge } from "@/components/ui/badge"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from "recharts"
import { Droplets, TrendingUp, TrendingDown, Activity, CloudRain, Sun } from "lucide-react"
import type { Translations } from "@/lib/translations"

interface HourlyData {
  time: string
  temperature: number
  humidity: number
  windSpeed: number
  pressure: number
}

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

interface HumidityDetailViewProps {
  hourlyData: HourlyData[]
  currentWeather: WeatherData
  settings?: UserSettings
  t: Translations
}

export function HumidityDetailView({ hourlyData, currentWeather, settings, t }: HumidityDetailViewProps) {
  // Calculate humidity statistics
  const humidityValues = hourlyData.map((d) => d.humidity)
  const maxHumidity = Math.max(...humidityValues)
  const minHumidity = Math.min(...humidityValues)
  const avgHumidity = humidityValues.reduce((a, b) => a + b, 0) / humidityValues.length
  const humidityRange = maxHumidity - minHumidity

  // Generate extended forecast data (7 days)
  const extendedForecast = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    const baseHumidity = currentWeather.humidity + (Math.random() - 0.5) * 20
    return {
      day: date.toLocaleDateString("fr-FR", { weekday: "short" }),
      date: date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }),
      maxHumidity: Math.min(100, Math.round(baseHumidity + Math.random() * 15)),
      minHumidity: Math.max(0, Math.round(baseHumidity - Math.random() * 15)),
      avgHumidity: Math.round(baseHumidity),
    }
  })

  const getHumidityLevel = (humidity: number) => {
    if (humidity < 30) return { level: "Faible", color: "text-orange-500", bg: "bg-orange-500/20" }
    if (humidity < 60) return { level: "Modérée", color: "text-green-500", bg: "bg-green-500/20" }
    if (humidity < 80) return { level: "Élevée", color: "text-blue-500", bg: "bg-blue-500/20" }
    return { level: "Très Élevée", color: "text-purple-500", bg: "bg-purple-500/20" }
  }

  const currentLevel = getHumidityLevel(currentWeather.humidity)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-strong rounded-xl p-4 shadow-2xl border border-border/50">
          <p className="text-sm font-semibold text-foreground mb-2">{`Heure: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}%`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 glass rounded-2xl">
          <Droplets className="h-8 w-8 text-cyan-500" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-foreground">Analyse Détaillée de l'Humidité</h1>
          <p className="text-muted-foreground">Taux d'humidité et conditions atmosphériques</p>
        </div>
        <Badge variant="outline" className="glass text-sm ml-auto">
          {currentWeather.location}
        </Badge>
      </div>

      {/* Humidity Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-cyan-500/20 rounded-xl">
              <Droplets className="h-5 w-5 text-cyan-500" />
            </div>
            <span className="text-sm text-muted-foreground">Actuelle</span>
          </div>
          <div className="text-3xl font-bold text-cyan-500">{currentWeather.humidity}%</div>
          <p className={`text-xs mt-1 ${currentLevel.color}`}>{currentLevel.level}</p>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-sm text-muted-foreground">Maximum</span>
          </div>
          <div className="text-3xl font-bold text-blue-500">{Math.round(maxHumidity)}%</div>
          <p className="text-xs text-muted-foreground mt-1">Pic de la journée</p>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-500/20 rounded-xl">
              <TrendingDown className="h-5 w-5 text-orange-500" />
            </div>
            <span className="text-sm text-muted-foreground">Minimum</span>
          </div>
          <div className="text-3xl font-bold text-orange-500">{Math.round(minHumidity)}%</div>
          <p className="text-xs text-muted-foreground mt-1">Plus bas de la journée</p>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <Activity className="h-5 w-5 text-purple-500" />
            </div>
            <span className="text-sm text-muted-foreground">Moyenne</span>
          </div>
          <div className="text-3xl font-bold text-purple-500">{Math.round(avgHumidity)}%</div>
          <p className="text-xs text-muted-foreground mt-1">Variation {Math.round(humidityRange)}%</p>
        </div>
      </div>

      {/* Detailed Humidity Chart */}
      <div className="glass-strong rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Évolution sur 24 Heures</h2>
          <Badge variant="outline" className="glass">
            Temps réel
          </Badge>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={hourlyData}>
            <defs>
              <linearGradient id="humidityDetailGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(6, 182, 212)" stopOpacity={0.6} />
                <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="rgb(147, 51, 234)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis
              dataKey="time"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="humidity"
              stroke="rgb(6, 182, 212)"
              strokeWidth={4}
              fill="url(#humidityDetailGradient)"
              name="Humidité"
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="rgb(59, 130, 246)"
              strokeWidth={2}
              dot={{ fill: "rgb(59, 130, 246)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "rgb(59, 130, 246)", strokeWidth: 3, fill: "white" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Extended Forecast */}
      <div className="glass-strong rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Prévisions d'Humidité sur 7 Jours</h2>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {extendedForecast.map((day, index) => (
            <div key={index} className="glass rounded-xl p-4 text-center">
              <div className="text-sm font-medium text-foreground mb-2">{day.day}</div>
              <div className="text-xs text-muted-foreground mb-3">{day.date}</div>
              <div className="space-y-2">
                <div className="text-lg font-bold text-blue-500">{day.maxHumidity}%</div>
                <div className="text-sm text-orange-500">{day.minHumidity}%</div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">Moy. {day.avgHumidity}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Humidity Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-strong rounded-2xl p-6">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <CloudRain className="h-5 w-5 text-blue-500" />
            Analyse de l'Humidité
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">Point de Rosée</span>
              <span className="font-bold text-blue-500">
                {Math.round(currentWeather.temperature - (100 - currentWeather.humidity) / 5)}°
              </span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">Confort Hygrométrique</span>
              <span className={`font-bold ${currentLevel.color}`}>{currentLevel.level}</span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">Risque de Condensation</span>
              <span className="font-bold text-yellow-500">
                {currentWeather.humidity > 80 ? "Élevé" : currentWeather.humidity > 60 ? "Modéré" : "Faible"}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">Évaporation</span>
              <span className="font-bold text-green-500">
                {currentWeather.humidity < 40 ? "Rapide" : currentWeather.humidity < 70 ? "Normale" : "Lente"}
              </span>
            </div>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Sun className="h-5 w-5 text-yellow-500" />
            Recommandations
          </h3>
          <div className="space-y-3">
            <div className="p-3 glass rounded-xl">
              <div className="font-medium text-foreground mb-1">Santé & Confort</div>
              <div className="text-sm text-muted-foreground">
                {currentWeather.humidity < 30
                  ? "Air sec - hydratez-vous et utilisez un humidificateur"
                  : currentWeather.humidity > 70
                    ? "Air humide - aérez régulièrement"
                    : "Conditions d'humidité idéales"}
              </div>
            </div>
            <div className="p-3 glass rounded-xl">
              <div className="font-medium text-foreground mb-1">Activités</div>
              <div className="text-sm text-muted-foreground">
                {currentWeather.humidity > 80
                  ? "Évitez les activités intenses à l'extérieur"
                  : "Conditions favorables aux activités extérieures"}
              </div>
            </div>
            <div className="p-3 glass rounded-xl">
              <div className="font-medium text-foreground mb-1">Maison</div>
              <div className="text-sm text-muted-foreground">
                {currentWeather.humidity > 70
                  ? "Utilisez un déshumidificateur si nécessaire"
                  : currentWeather.humidity < 40
                    ? "Considérez un humidificateur"
                    : "Taux d'humidité optimal pour l'habitat"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
