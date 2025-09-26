"use client"
import { Badge } from "@/components/ui/badge"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from "recharts"
import { Droplets, TrendingUp, TrendingDown, Activity, CloudRain, Sun } from "lucide-react"
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
  // Déterminer la locale en fonction de la langue actuelle
  let locale = "fr-FR" // Par défaut
  if (t === translations.en) locale = "en-US"
  else if (t === translations.ar) locale = "ar-SA"
  
  const extendedForecast = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    const baseHumidity = currentWeather.humidity + (Math.random() - 0.5) * 20
    return {
      day: date.toLocaleDateString(locale, { weekday: "short" }),
      date: date.toLocaleDateString(locale, { day: "2-digit", month: "2-digit" }),
      maxHumidity: Math.min(100, Math.round(baseHumidity + Math.random() * 15)),
      minHumidity: Math.max(0, Math.round(baseHumidity - Math.random() * 15)),
      avgHumidity: Math.round(baseHumidity),
    }
  })

  const getHumidityLevel = (humidity: number) => {
    // Utilisation des clés de traduction pour les niveaux d'humidité
    if (humidity < 30) return { level: t.analysis.low, color: "text-orange-500", bg: "bg-orange-500/20" }
    if (humidity < 60) return { level: t.analysis.moderate, color: "text-green-500", bg: "bg-green-500/20" }
    if (humidity < 80) return { level: t.analysis.high, color: "text-blue-500", bg: "bg-blue-500/20" }
    return { level: t.analysis.veryHigh, color: "text-purple-500", bg: "bg-purple-500/20" }
  }

  const currentLevel = getHumidityLevel(currentWeather.humidity)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-strong rounded-xl p-4 shadow-2xl border border-border/50">
          <p className="text-sm font-semibold text-foreground mb-2">{`${t.charts.time}: ${label}`}</p>
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
          <h1 className="text-4xl font-bold text-foreground">{t.analysis.detailedHumidity}</h1>
          <p className="text-muted-foreground">{t.analysis.temperatureConditions}</p>
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
            <span className="text-sm text-muted-foreground">{t.analysis.current}</span>
          </div>
          <div className="text-3xl font-bold text-cyan-500">{currentWeather.humidity}%</div>
          <p className={`text-xs mt-1 ${currentLevel.color}`}>{currentLevel.level}</p>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-sm text-muted-foreground">{t.analysis.maximum}</span>
          </div>
          <div className="text-3xl font-bold text-blue-500">{Math.round(maxHumidity)}%</div>
          <p className="text-xs text-muted-foreground mt-1">{t.analysis.peakOfDay}</p>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-500/20 rounded-xl">
              <TrendingDown className="h-5 w-5 text-orange-500" />
            </div>
            <span className="text-sm text-muted-foreground">{t.analysis.minimum}</span>
          </div>
          <div className="text-3xl font-bold text-orange-500">{Math.round(minHumidity)}%</div>
          <p className="text-xs text-muted-foreground mt-1">{t.analysis.lowestOfDay}</p>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <Activity className="h-5 w-5 text-purple-500" />
            </div>
            <span className="text-sm text-muted-foreground">{t.analysis.average}</span>
          </div>
          <div className="text-3xl font-bold text-purple-500">{Math.round(avgHumidity)}%</div>
          <p className="text-xs text-muted-foreground mt-1">{t.analysis.variation} {Math.round(humidityRange)}%</p>
        </div>
      </div>

      {/* Detailed Humidity Chart */}
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
              name={t.details.humidity}
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
        <h2 className="text-2xl font-bold text-foreground mb-6">{`${t.forecast.humidity} - ${t.forecast.forecasts7Days}`}</h2>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {extendedForecast.map((day, index) => (
            <div key={index} className="glass rounded-xl p-4 text-center">
              <div className="text-sm font-medium text-foreground mb-2">{day.day}</div>
              <div className="text-xs text-muted-foreground mb-3">{day.date}</div>
              <div className="space-y-2">
                <div className="text-lg font-bold text-blue-500">{day.maxHumidity}%</div>
                <div className="text-sm text-orange-500">{day.minHumidity}%</div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">{t.analysis.average} {day.avgHumidity}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Humidity Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-strong rounded-2xl p-6">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <CloudRain className="h-5 w-5 text-blue-500" />
            {t.analysis.humidityAnalysis}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">{t.analysis.dewPoint}</span>
              <span className="font-bold text-blue-500">
                {Math.round(currentWeather.temperature - (100 - currentWeather.humidity) / 5)}°
              </span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">{t.analysis.hygrometricComfort}</span>
              <span className={`font-bold ${currentLevel.color}`}>{currentLevel.level}</span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">{t.analysis.condensationRisk}</span>
              <span className="font-bold text-yellow-500">
                {currentWeather.humidity > 80 
                  ? t.analysis.high 
                  : currentWeather.humidity > 60 
                    ? t.analysis.moderate 
                    : t.analysis.low}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-sm text-muted-foreground">{t.analysis.evaporation}</span>
              <span className="font-bold text-green-500">
                {currentWeather.humidity < 40 
                  ? t.analysis.fast 
                  : currentWeather.humidity < 70 
                    ? t.analysis.normal 
                    : t.analysis.slow}
              </span>
            </div>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Sun className="h-5 w-5 text-yellow-500" />
            {t.analysis.recommendations}
          </h3>
          <div className="space-y-3">
            <div className="p-3 glass rounded-xl">
              <div className="font-medium text-foreground mb-1">{t.analysis.healthAndComfort}</div>
              <div className="text-sm text-muted-foreground">
                {currentWeather.humidity < 30
                  ? t.analysis.dryAir
                  : currentWeather.humidity > 70
                    ? t.analysis.humidAir
                    : t.analysis.idealHumidity}
              </div>
            </div>
            <div className="p-3 glass rounded-xl">
              <div className="font-medium text-foreground mb-1">{t.analysis.activities}</div>
              <div className="text-sm text-muted-foreground">
                {currentWeather.humidity > 80
                  ? t.analysis.avoidOutdoor
                  : t.analysis.favorableOutdoor}
              </div>
            </div>
            <div className="p-3 glass rounded-xl">
              <div className="font-medium text-foreground mb-1">{t.analysis.home}</div>
              <div className="text-sm text-muted-foreground">
                {currentWeather.humidity > 70
                  ? t.analysis.useDehumidifier
                  : currentWeather.humidity < 40
                    ? t.analysis.useHumidifier
                    : t.analysis.optimalHumidity}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
