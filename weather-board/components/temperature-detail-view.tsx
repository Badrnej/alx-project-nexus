"use client"
import { Badge } from "@/components/ui/badge"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from "recharts"
import { TrendingUp, Thermometer, TrendingDown, Activity, Sun, Snowflake } from "lucide-react"
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

interface TemperatureDetailViewProps {
  hourlyData: HourlyData[]
  currentWeather: WeatherData
  settings?: UserSettings
  t: Translations
}

export function TemperatureDetailView({ hourlyData, currentWeather, settings, t }: TemperatureDetailViewProps) {
  const tempUnit = settings?.temperatureUnit === "fahrenheit" ? "°F" : "°C"

  // Calculate temperature statistics
  const temperatures = hourlyData.map((d) => d.temperature)
  const maxTemp = Math.max(...temperatures)
  const minTemp = Math.min(...temperatures)
  const avgTemp = temperatures.reduce((a, b) => a + b, 0) / temperatures.length
  const tempRange = maxTemp - minTemp

  // Generate extended forecast data (7 days)
  const extendedForecast = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    const baseTemp = currentWeather.temperature + (Math.random() - 0.5) * 10
    return {
      day: date.toLocaleDateString("fr-FR", { weekday: "short" }),
      date: date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }),
      maxTemp: Math.round(baseTemp + Math.random() * 5),
      minTemp: Math.round(baseTemp - Math.random() * 5),
      avgTemp: Math.round(baseTemp),
    }
  })

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-strong rounded-xl p-4 shadow-2xl border border-border/50">
          <p className="text-sm font-semibold text-foreground mb-2">{`Heure: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}${tempUnit}`}
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
          <TrendingUp className="h-8 w-8 text-blue-500" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-foreground">Analyse Détaillée de la Température</h1>
          <p className="text-muted-foreground">Évolution complète et statistiques avancées</p>
        </div>
        <Badge variant="outline" className="glass text-sm ml-auto">
          {currentWeather.location}
        </Badge>
      </div>

      {/* Temperature Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <Thermometer className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-sm text-muted-foreground">Actuelle</span>
          </div>
          <div className="text-3xl font-bold text-blue-500">
            {currentWeather.temperature}
            {tempUnit}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Ressenti {currentWeather.feelsLike}
            {tempUnit}
          </p>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-500/20 rounded-xl">
              <TrendingUp className="h-5 w-5 text-red-500" />
            </div>
            <span className="text-sm text-muted-foreground">Maximum</span>
          </div>
          <div className="text-3xl font-bold text-red-500">
            {Math.round(maxTemp)}
            {tempUnit}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Pic de la journée</p>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-cyan-500/20 rounded-xl">
              <TrendingDown className="h-5 w-5 text-cyan-500" />
            </div>
            <span className="text-sm text-muted-foreground">Minimum</span>
          </div>
          <div className="text-3xl font-bold text-cyan-500">
            {Math.round(minTemp)}
            {tempUnit}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Plus bas de la journée</p>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <Activity className="h-5 w-5 text-purple-500" />
            </div>
            <span className="text-sm text-muted-foreground">Moyenne</span>
          </div>
          <div className="text-3xl font-bold text-purple-500">
            {Math.round(avgTemp)}
            {tempUnit}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Amplitude {Math.round(tempRange)}
            {tempUnit}
          </p>
        </div>
      </div>

      {/* Detailed Temperature Chart */}
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
              <linearGradient id="temperatureDetailGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(59, 130, 246)" stopOpacity={0.6} />
                <stop offset="50%" stopColor="rgb(147, 51, 234)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="rgb(6, 182, 212)" stopOpacity={0.1} />
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
              domain={["dataMin - 3", "dataMax + 3"]}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="rgb(59, 130, 246)"
              strokeWidth={4}
              fill="url(#temperatureDetailGradient)"
              name="Température"
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="rgb(147, 51, 234)"
              strokeWidth={2}
              dot={{ fill: "rgb(147, 51, 234)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "rgb(147, 51, 234)", strokeWidth: 3, fill: "white" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Extended Forecast */}
      <div className="glass-strong rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Prévisions sur 7 Jours</h2>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {extendedForecast.map((day, index) => (
            <div key={index} className="glass rounded-xl p-4 text-center">
              <div className="text-sm font-medium text-foreground mb-2">{day.day}</div>
              <div className="text-xs text-muted-foreground mb-3">{day.date}</div>
              <div className="space-y-2">
                <div className="text-lg font-bold text-red-500">
                  {day.maxTemp}
                  {tempUnit}
                </div>
                <div className="text-sm text-cyan-500">
                  {day.minTemp}
                  {tempUnit}
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                Moy. {day.avgTemp}
                {tempUnit}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Temperature Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-strong rounded-2xl p-6">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Sun className="h-5 w-5 text-yellow-500" />
            Analyse Thermique
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">Indice de Chaleur</span>
              <span className="font-bold text-orange-500">Modéré</span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">Confort Thermique</span>
              <span className="font-bold text-green-500">Agréable</span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">Variation Journalière</span>
              <span className="font-bold text-blue-500">
                {Math.round(tempRange)}
                {tempUnit}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">Tendance</span>
              <span className="font-bold text-purple-500">Stable</span>
            </div>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Snowflake className="h-5 w-5 text-cyan-500" />
            Recommandations
          </h3>
          <div className="space-y-3">
            <div className="p-3 glass rounded-xl">
              <div className="font-medium text-foreground mb-1">Vêtements</div>
              <div className="text-sm text-muted-foreground">
                Vêtements légers recommandés, possibilité de superposer
              </div>
            </div>
            <div className="p-3 glass rounded-xl">
              <div className="font-medium text-foreground mb-1">Activités</div>
              <div className="text-sm text-muted-foreground">Conditions idéales pour les activités extérieures</div>
            </div>
            <div className="p-3 glass rounded-xl">
              <div className="font-medium text-foreground mb-1">Hydratation</div>
              <div className="text-sm text-muted-foreground">Maintenir une hydratation normale</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
