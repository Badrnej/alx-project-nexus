"use client"
import { Badge } from "@/components/ui/badge"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from "recharts"
import { Gauge, TrendingUp, TrendingDown, Activity, CloudRain, Sun } from "lucide-react"
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

interface PressureDetailViewProps {
  hourlyData: HourlyData[]
  currentWeather: WeatherData
  settings?: UserSettings
  t: Translations
}

export function PressureDetailView({ hourlyData, currentWeather, settings, t }: PressureDetailViewProps) {
  const pressureUnit = settings?.pressureUnit === "inHg" ? "inHg" : "hPa"

  // Calculate pressure statistics
  const pressureValues = hourlyData.map((d) => d.pressure)
  const maxPressure = Math.max(...pressureValues)
  const minPressure = Math.min(...pressureValues)
  const avgPressure = pressureValues.reduce((a, b) => a + b, 0) / pressureValues.length
  const pressureRange = maxPressure - minPressure

  // Calculate pressure trend
  const recentPressures = pressureValues.slice(-6) // Last 6 hours
  const pressureTrend = recentPressures[recentPressures.length - 1] - recentPressures[0]

  // Generate extended forecast data (7 days)
  const extendedForecast = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    const basePressure = Number(currentWeather.pressure) + (Math.random() - 0.5) * 30
    return {
      day: date.toLocaleDateString("fr-FR", { weekday: "short" }),
      date: date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }),
      maxPressure: Math.round(basePressure + Math.random() * 15),
      minPressure: Math.round(basePressure - Math.random() * 15),
      avgPressure: Math.round(basePressure),
    }
  })

  const getPressureLevel = (pressure: number) => {
    if (pressure < 1000) return { level: "Basse", color: "text-red-500", bg: "bg-red-500/20", weather: "Instable" }
    if (pressure < 1013)
      return { level: "Faible", color: "text-orange-500", bg: "bg-orange-500/20", weather: "Variable" }
    if (pressure < 1025) return { level: "Normale", color: "text-green-500", bg: "bg-green-500/20", weather: "Stable" }
    return { level: "Élevée", color: "text-blue-500", bg: "bg-blue-500/20", weather: "Très Stable" }
  }

  const currentLevel = getPressureLevel(Number(currentWeather.pressure))

  const getTrendDirection = (trend: number) => {
    if (trend > 2) return { direction: "Hausse Rapide", color: "text-green-500", icon: "↗️" }
    if (trend > 0.5) return { direction: "Hausse", color: "text-blue-500", icon: "↑" }
    if (trend < -2) return { direction: "Chute Rapide", color: "text-red-500", icon: "↘️" }
    if (trend < -0.5) return { direction: "Baisse", color: "text-orange-500", icon: "↓" }
    return { direction: "Stable", color: "text-gray-500", icon: "→" }
  }

  const trendInfo = getTrendDirection(pressureTrend)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-strong rounded-xl p-4 shadow-2xl border border-border/50">
          <p className="text-sm font-semibold text-foreground mb-2">{`Heure: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} ${pressureUnit}`}
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
          <Gauge className="h-8 w-8 text-purple-500" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-foreground">Analyse Détaillée de la Pression</h1>
          <p className="text-muted-foreground">Pression atmosphérique et tendances météorologiques</p>
        </div>
        <Badge variant="outline" className="glass text-sm ml-auto">
          {currentWeather.location}
        </Badge>
      </div>

      {/* Pressure Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <Gauge className="h-5 w-5 text-purple-500" />
            </div>
            <span className="text-sm text-muted-foreground">Actuelle</span>
          </div>
          <div className="text-3xl font-bold text-purple-500">
            {currentWeather.pressure} {pressureUnit}
          </div>
          <p className={`text-xs mt-1 ${currentLevel.color}`}>{currentLevel.level}</p>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-sm text-muted-foreground">Maximum</span>
          </div>
          <div className="text-3xl font-bold text-blue-500">
            {Math.round(maxPressure)} {pressureUnit}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Pic de la journée</p>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-500/20 rounded-xl">
              <TrendingDown className="h-5 w-5 text-red-500" />
            </div>
            <span className="text-sm text-muted-foreground">Minimum</span>
          </div>
          <div className="text-3xl font-bold text-red-500">
            {Math.round(minPressure)} {pressureUnit}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Plus bas de la journée</p>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-500/20 rounded-xl">
              <Activity className="h-5 w-5 text-green-500" />
            </div>
            <span className="text-sm text-muted-foreground">Tendance</span>
          </div>
          <div className={`text-2xl font-bold ${trendInfo.color} flex items-center gap-2`}>
            <span>{trendInfo.icon}</span>
            <span className="text-lg">{Math.abs(pressureTrend).toFixed(1)}</span>
          </div>
          <p className={`text-xs mt-1 ${trendInfo.color}`}>{trendInfo.direction}</p>
        </div>
      </div>

      {/* Detailed Pressure Chart */}
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
              <linearGradient id="pressureDetailGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(147, 51, 234)" stopOpacity={0.6} />
                <stop offset="50%" stopColor="rgb(99, 102, 241)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="rgb(59, 130, 246)" stopOpacity={0.1} />
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
              domain={["dataMin - 5", "dataMax + 5"]}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="pressure"
              stroke="rgb(147, 51, 234)"
              strokeWidth={4}
              fill="url(#pressureDetailGradient)"
              name="Pression"
            />
            <Line
              type="monotone"
              dataKey="pressure"
              stroke="rgb(99, 102, 241)"
              strokeWidth={2}
              dot={{ fill: "rgb(99, 102, 241)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "rgb(99, 102, 241)", strokeWidth: 3, fill: "white" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Extended Forecast */}
      <div className="glass-strong rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Prévisions de Pression sur 7 Jours</h2>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {extendedForecast.map((day, index) => (
            <div key={index} className="glass rounded-xl p-4 text-center">
              <div className="text-sm font-medium text-foreground mb-2">{day.day}</div>
              <div className="text-xs text-muted-foreground mb-3">{day.date}</div>
              <div className="space-y-2">
                <div className="text-lg font-bold text-blue-500">
                  {day.maxPressure} {pressureUnit}
                </div>
                <div className="text-sm text-red-500">
                  {day.minPressure} {pressureUnit}
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                Moy. {day.avgPressure} {pressureUnit}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pressure Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-strong rounded-2xl p-6">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <CloudRain className="h-5 w-5 text-blue-500" />
            Analyse Barométrique
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">Niveau de Mer</span>
              <span className="font-bold text-blue-500">
                {Math.round(Number(currentWeather.pressure) + 35)} {pressureUnit}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">Stabilité Météo</span>
              <span className={`font-bold ${currentLevel.color}`}>{currentLevel.weather}</span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">Risque d'Orage</span>
              <span className="font-bold text-yellow-500">
                {Number(currentWeather.pressure) < 1005
                  ? "Élevé"
                  : Number(currentWeather.pressure) < 1015
                    ? "Modéré"
                    : "Faible"}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">Variation 6h</span>
              <span className={`font-bold ${trendInfo.color}`}>
                {pressureTrend > 0 ? "+" : ""}
                {pressureTrend.toFixed(1)} {pressureUnit}
              </span>
            </div>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Sun className="h-5 w-5 text-yellow-500" />
            Prévisions Météo
          </h3>
          <div className="space-y-3">
            <div className="p-3 glass rounded-xl">
              <div className="font-medium text-foreground mb-1">Évolution Probable</div>
              <div className="text-sm text-muted-foreground">
                {pressureTrend > 1
                  ? "Amélioration du temps, ciel qui se dégage"
                  : pressureTrend < -1
                    ? "Dégradation possible, risque de précipitations"
                    : "Temps stable, peu de changements attendus"}
              </div>
            </div>
            <div className="p-3 glass rounded-xl">
              <div className="font-medium text-foreground mb-1">Activités Sensibles</div>
              <div className="text-sm text-muted-foreground">
                {Number(currentWeather.pressure) < 1010
                  ? "Évitez les activités en altitude"
                  : "Conditions favorables aux activités extérieures"}
              </div>
            </div>
            <div className="p-3 glass rounded-xl">
              <div className="font-medium text-foreground mb-1">Santé</div>
              <div className="text-sm text-muted-foreground">
                {Number(currentWeather.pressure) < 1005
                  ? "Possible gêne pour les personnes sensibles"
                  : "Conditions atmosphériques confortables"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
