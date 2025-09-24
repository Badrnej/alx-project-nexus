"use client"
import { Badge } from "@/components/ui/badge"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts"
import { Wind, TrendingUp, TrendingDown, Activity, Navigation, Zap } from "lucide-react"
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

interface WindDetailViewProps {
  hourlyData: HourlyData[]
  currentWeather: WeatherData
  settings?: UserSettings
  t: Translations
}

export function WindDetailView({ hourlyData, currentWeather, settings, t }: WindDetailViewProps) {
  const windUnit = settings?.windSpeedUnit === "mph" ? "mph" : "km/h"

  // Calculate wind statistics
  const windSpeeds = hourlyData.map((d) => d.windSpeed)
  const maxWind = Math.max(...windSpeeds)
  const minWind = Math.min(...windSpeeds)
  const avgWind = windSpeeds.reduce((a, b) => a + b, 0) / windSpeeds.length
  const windRange = maxWind - minWind

  // Generate wind direction data (mock)
  const windDirectionData = Array.from({ length: 8 }, (_, i) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    const angles = [0, 45, 90, 135, 180, 225, 270, 315]
    return {
      direction: directions[i],
      angle: angles[i],
      frequency: Math.random() * 100,
      avgSpeed: Math.random() * 30 + 5,
    }
  })

  // Generate extended forecast data (7 days)
  const extendedForecast = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    const baseWind = currentWeather.windSpeed + (Math.random() - 0.5) * 10
    return {
      day: date.toLocaleDateString("fr-FR", { weekday: "short" }),
      date: date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }),
      maxWind: Math.max(0, Math.round(baseWind + Math.random() * 10)),
      minWind: Math.max(0, Math.round(baseWind - Math.random() * 5)),
      avgWind: Math.round(baseWind),
      direction: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.floor(Math.random() * 8)],
    }
  })

  const getWindLevel = (speed: number) => {
    if (speed < 5) return { level: "Calme", color: "text-green-500", bg: "bg-green-500/20" }
    if (speed < 15) return { level: "Léger", color: "text-blue-500", bg: "bg-blue-500/20" }
    if (speed < 30) return { level: "Modéré", color: "text-yellow-500", bg: "bg-yellow-500/20" }
    if (speed < 50) return { level: "Fort", color: "text-orange-500", bg: "bg-orange-500/20" }
    return { level: "Très Fort", color: "text-red-500", bg: "bg-red-500/20" }
  }

  const currentLevel = getWindLevel(currentWeather.windSpeed)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-strong rounded-xl p-4 shadow-2xl border border-border/50">
          <p className="text-sm font-semibold text-foreground mb-2">{`Heure: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} ${windUnit}`}
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
          <Wind className="h-8 w-8 text-indigo-500" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-foreground">Analyse Détaillée du Vent</h1>
          <p className="text-muted-foreground">Vitesse, direction et conditions éoliennes</p>
        </div>
        <Badge variant="outline" className="glass text-sm ml-auto">
          {currentWeather.location}
        </Badge>
      </div>

      {/* Wind Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-indigo-500/20 rounded-xl">
              <Wind className="h-5 w-5 text-indigo-500" />
            </div>
            <span className="text-sm text-muted-foreground">Actuelle</span>
          </div>
          <div className="text-3xl font-bold text-indigo-500">
            {currentWeather.windSpeed} {windUnit}
          </div>
          <p className={`text-xs mt-1 ${currentLevel.color}`}>{currentLevel.level}</p>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-500/20 rounded-xl">
              <TrendingUp className="h-5 w-5 text-red-500" />
            </div>
            <span className="text-sm text-muted-foreground">Maximum</span>
          </div>
          <div className="text-3xl font-bold text-red-500">
            {Math.round(maxWind)} {windUnit}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Rafale maximale</p>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-500/20 rounded-xl">
              <TrendingDown className="h-5 w-5 text-green-500" />
            </div>
            <span className="text-sm text-muted-foreground">Minimum</span>
          </div>
          <div className="text-3xl font-bold text-green-500">
            {Math.round(minWind)} {windUnit}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Plus calme</p>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <Activity className="h-5 w-5 text-purple-500" />
            </div>
            <span className="text-sm text-muted-foreground">Moyenne</span>
          </div>
          <div className="text-3xl font-bold text-purple-500">
            {Math.round(avgWind)} {windUnit}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Variation {Math.round(windRange)} {windUnit}
          </p>
        </div>
      </div>

      {/* Wind Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Wind Speed Evolution */}
        <div className="glass-strong rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Évolution sur 24 Heures</h2>
            <Badge variant="outline" className="glass">
              Temps réel
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={hourlyData}>
              <defs>
                <linearGradient id="windDetailGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgb(99, 102, 241)" stopOpacity={0.6} />
                  <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity={0.3} />
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
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="windSpeed" fill="url(#windDetailGradient)" radius={[4, 4, 0, 0]} name="Vitesse du Vent" />
              <Line
                type="monotone"
                dataKey="windSpeed"
                stroke="rgb(99, 102, 241)"
                strokeWidth={3}
                dot={{ fill: "rgb(99, 102, 241)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "rgb(99, 102, 241)", strokeWidth: 3, fill: "white" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Wind Direction Radar */}
        <div className="glass-strong rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Rose des Vents</h2>
            <Badge variant="outline" className="glass">
              Direction
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={windDirectionData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="direction" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              />
              <Radar
                name="Fréquence"
                dataKey="frequency"
                stroke="rgb(99, 102, 241)"
                fill="rgb(99, 102, 241)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Extended Forecast */}
      <div className="glass-strong rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Prévisions de Vent sur 7 Jours</h2>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {extendedForecast.map((day, index) => (
            <div key={index} className="glass rounded-xl p-4 text-center">
              <div className="text-sm font-medium text-foreground mb-2">{day.day}</div>
              <div className="text-xs text-muted-foreground mb-3">{day.date}</div>
              <div className="space-y-2">
                <div className="text-lg font-bold text-red-500">
                  {day.maxWind} {windUnit}
                </div>
                <div className="text-sm text-green-500">
                  {day.minWind} {windUnit}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-1">
                <Navigation className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{day.direction}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wind Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-strong rounded-2xl p-6">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Analyse Éolienne
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">Échelle de Beaufort</span>
              <span className="font-bold text-blue-500">
                {currentWeather.windSpeed < 2
                  ? "0 - Calme"
                  : currentWeather.windSpeed < 6
                    ? "1 - Très légère brise"
                    : currentWeather.windSpeed < 12
                      ? "2 - Légère brise"
                      : currentWeather.windSpeed < 20
                        ? "3 - Petite brise"
                        : currentWeather.windSpeed < 29
                          ? "4 - Jolie brise"
                          : currentWeather.windSpeed < 39
                            ? "5 - Bonne brise"
                            : "6+ - Vent frais"}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">Refroidissement Éolien</span>
              <span className="font-bold text-cyan-500">
                {Math.round(currentWeather.feelsLike - currentWeather.windSpeed * 0.5)}°
              </span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">Direction Dominante</span>
              <span className="font-bold text-purple-500">Sud-Ouest</span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">Stabilité</span>
              <span className="font-bold text-green-500">
                {windRange < 5 ? "Stable" : windRange < 15 ? "Variable" : "Instable"}
              </span>
            </div>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Navigation className="h-5 w-5 text-indigo-500" />
            Recommandations
          </h3>
          <div className="space-y-3">
            <div className="p-3 glass rounded-xl">
              <div className="font-medium text-foreground mb-1">Activités Nautiques</div>
              <div className="text-sm text-muted-foreground">
                {currentWeather.windSpeed < 10
                  ? "Conditions idéales pour la voile légère"
                  : currentWeather.windSpeed < 25
                    ? "Bonnes conditions pour la voile"
                    : "Conditions difficiles - prudence requise"}
              </div>
            </div>
            <div className="p-3 glass rounded-xl">
              <div className="font-medium text-foreground mb-1">Vol & Parapente</div>
              <div className="text-sm text-muted-foreground">
                {currentWeather.windSpeed < 15
                  ? "Conditions favorables au vol libre"
                  : "Vents trop forts pour les activités aériennes"}
              </div>
            </div>
            <div className="p-3 glass rounded-xl">
              <div className="font-medium text-foreground mb-1">Confort Extérieur</div>
              <div className="text-sm text-muted-foreground">
                {currentWeather.windSpeed < 20
                  ? "Agréable pour les activités extérieures"
                  : "Vent fort - habillez-vous chaudement"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
