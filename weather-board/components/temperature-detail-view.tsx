"use client"
import { Badge } from "@/components/ui/badge"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from "recharts"
import { TrendingUp, Thermometer, TrendingDown, Activity, Sun, Snowflake } from "lucide-react"
import type { Translations } from "@/lib/translations"
import { translations } from "@/lib/translations"

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
  // Déterminer la locale en fonction de la langue actuelle
  let locale = "fr-FR" // Par défaut
  if (t === translations.en) locale = "en-US"
  else if (t === translations.ar) locale = "ar-SA"
  
  const extendedForecast = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    const baseTemp = currentWeather.temperature + (Math.random() - 0.5) * 10
    return {
      day: date.toLocaleDateString(locale, { weekday: "short" }),
      date: date.toLocaleDateString(locale, { day: "2-digit", month: "2-digit" }),
      maxTemp: Math.round(baseTemp + Math.random() * 5),
      minTemp: Math.round(baseTemp - Math.random() * 5),
      avgTemp: Math.round(baseTemp),
    }
  })

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-strong rounded-xl p-4 shadow-2xl border border-border/50">
          <p className="text-sm font-semibold text-foreground mb-2">{`${t.charts.time}: ${label}`}</p>
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
          <h1 className="text-4xl font-bold text-foreground">{t.analysis.detailedTemperature}</h1>
          <p className="text-muted-foreground">{t.analysis.completeEvolution}</p>
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
            <span className="text-sm text-muted-foreground">{t.analysis.current}</span>
          </div>
          <div className="text-3xl font-bold text-blue-500">
            {currentWeather.temperature}
            {tempUnit}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {t.details.feelsLike} {currentWeather.feelsLike}
            {tempUnit}
          </p>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-500/20 rounded-xl">
              <TrendingUp className="h-5 w-5 text-red-500" />
            </div>
            <span className="text-sm text-muted-foreground">{t.analysis.maximum}</span>
          </div>
          <div className="text-3xl font-bold text-red-500">
            {Math.round(maxTemp)}
            {tempUnit}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{t.analysis.peakOfDay}</p>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-cyan-500/20 rounded-xl">
              <TrendingDown className="h-5 w-5 text-cyan-500" />
            </div>
            <span className="text-sm text-muted-foreground">{t.analysis.minimum}</span>
          </div>
          <div className="text-3xl font-bold text-cyan-500">
            {Math.round(minTemp)}
            {tempUnit}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{t.analysis.lowestOfDay}</p>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <Activity className="h-5 w-5 text-purple-500" />
            </div>
            <span className="text-sm text-muted-foreground">{t.analysis.average}</span>
          </div>
          <div className="text-3xl font-bold text-purple-500">
            {Math.round(avgTemp)}
            {tempUnit}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {t.analysis.dailyAmplitude} {Math.round(tempRange)}
            {tempUnit}
          </p>
        </div>
      </div>

      {/* Detailed Temperature Chart */}
      <div className="glass-strong rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">{t.forecast.evolution24h}</h2>
          <Badge variant="outline" className="glass">
            {t.forecast.realTime}
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
              name={t.stats.temperature}
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
        <h2 className="text-2xl font-bold text-foreground mb-6">{t.forecast.forecasts7Days}</h2>
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
                {t.analysis.dayAverage} {day.avgTemp}
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
            {t.analysis.thermalAnalysis}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">{t.analysis.heatIndex}</span>
              <span className="font-bold text-orange-500">{t.analysis.moderate}</span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">{t.analysis.thermalComfort}</span>
              <span className="font-bold text-green-500">{t.analysis.pleasant}</span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">{t.analysis.dailyVariation}</span>
              <span className="font-bold text-blue-500">
                {Math.round(tempRange)}
                {tempUnit}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">{t.analysis.trend}</span>
              <span className="font-bold text-purple-500">{t.analysis.stable}</span>
            </div>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Snowflake className="h-5 w-5 text-cyan-500" />
            {t.analysis.recommendations}
          </h3>
          <div className="space-y-3">
            <div className="p-3 glass rounded-xl">
              <div className="font-medium text-foreground mb-1">{t.analysis.clothing}</div>
              <div className="text-sm text-muted-foreground">
                {t.analysis.lightClothing}
              </div>
            </div>
            <div className="p-3 glass rounded-xl">
              <div className="font-medium text-foreground mb-1">{t.analysis.activities}</div>
              <div className="text-sm text-muted-foreground">{t.analysis.idealConditions}</div>
            </div>
            <div className="p-3 glass rounded-xl">
              <div className="font-medium text-foreground mb-1">{t.analysis.hydration}</div>
              <div className="text-sm text-muted-foreground">{t.analysis.keepNormalHydration}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
