"use client"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"
import { TrendingUp, Droplets, Wind, Gauge } from "lucide-react"
import type { Translations } from "@/lib/translations"

interface HourlyData {
  time: string
  temperature: number
  humidity: number
  windSpeed: number
  pressure: number
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

interface WeatherChartsProps {
  hourlyData: HourlyData[]
  settings?: UserSettings
  t: Translations
  onChartClick?: (chartType: "temperature" | "humidity" | "wind" | "pressure") => void
}

export function WeatherCharts({ hourlyData, settings, t, onChartClick }: WeatherChartsProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const tempUnit = settings?.temperatureUnit === "fahrenheit" ? "°F" : "°C"
      const windUnit = settings?.windSpeedUnit === "mph" ? "mph" : "km/h"
      const pressureUnit = settings?.pressureUnit === "inHg" ? "inHg" : "hPa"

      return (
        <div className="glass-strong rounded-xl p-4 shadow-2xl border border-border/50">
          <p className="text-sm font-semibold text-foreground mb-2">{`${t.charts.time}: ${label}`}</p>
          {payload.map((entry: any, index: number) => {
            let unit = ""
            if (entry.name === t.stats.temperature) unit = tempUnit
            else if (entry.name === t.stats.humidity) unit = "%"
            else if (entry.name === t.stats.wind) unit = ` ${windUnit}`
            else if (entry.name === t.stats.pressure) unit = ` ${pressureUnit}`

            return (
              <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
                {`${entry.name}: ${entry.value}${unit}`}
              </p>
            )
          })}
        </div>
      )
    }
    return null
  }

  const tempUnit = settings?.temperatureUnit === "fahrenheit" ? "°F" : "°C"
  const windUnit = settings?.windSpeedUnit === "mph" ? "mph" : "km/h"
  const pressureUnit = settings?.pressureUnit === "inHg" ? "inHg" : "hPa"

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 glass rounded-xl">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">{t.charts.title}</h2>
        <Badge variant="outline" className="glass text-xs">
          24h
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          className="glass-strong rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:shadow-2xl"
          onClick={() => onChartClick?.("temperature")}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-200/20 to-blue-300/10 dark:from-blue-200/20 dark:to-blue-200/10 rounded-xl">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-200" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {t.charts.temperatureEvolution} ({tempUnit})
            </h3>
            <div className="ml-auto text-xs text-muted-foreground opacity-70">Cliquez pour plus de détails →</div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgb(59, 130, 246)" className="dark:stop-color-blue-200" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="rgb(59, 130, 246)" className="dark:stop-color-blue-200" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                className="dark:[&>*]:fill-blue-200"
                fontSize={12}
                interval="preserveStartEnd"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                className="dark:[&>*]:fill-blue-200"
                fontSize={12}
                domain={["dataMin - 2", "dataMax + 2"]}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="temperature"
                stroke="rgb(59, 130, 246)"
                strokeWidth={3}
                fill="url(#temperatureGradient)"
                name={t.stats.temperature}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div
          className="glass-strong rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:shadow-2xl"
          onClick={() => onChartClick?.("humidity")}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 rounded-xl">
              <Droplets className="h-5 w-5 text-cyan-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{t.charts.humidityRate} (%)</h3>
            <div className="ml-auto text-xs text-muted-foreground opacity-70">Cliquez pour plus de détails →</div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                className="dark:[&>*]:fill-blue-200"
                fontSize={12}
                interval="preserveStartEnd"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                className="dark:[&>*]:fill-blue-200"
                fontSize={12}
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="rgb(6, 182, 212)"
                strokeWidth={3}
                dot={{ fill: "rgb(6, 182, 212)", strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, stroke: "rgb(6, 182, 212)", strokeWidth: 3, fill: "white" }}
                name={t.stats.humidity}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          className="glass-strong rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:shadow-2xl"
          onClick={() => onChartClick?.("wind")}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 rounded-xl">
              <Wind className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {t.charts.windSpeed} ({windUnit})
            </h3>
            <div className="ml-auto text-xs text-muted-foreground opacity-70">Cliquez pour plus de détails →</div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                className="dark:[&>*]:fill-blue-200"
                fontSize={12}
                interval="preserveStartEnd"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                className="dark:[&>*]:fill-blue-200"
                fontSize={12} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="windSpeed" fill="rgb(99, 102, 241)" radius={[4, 4, 0, 0]} name={t.stats.wind} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          className="glass-strong rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:shadow-2xl"
          onClick={() => onChartClick?.("pressure")}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl">
              <Gauge className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {t.charts.atmosphericPressure} ({pressureUnit})
            </h3>
            <div className="ml-auto text-xs text-muted-foreground opacity-70">Cliquez pour plus de détails →</div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="pressureGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgb(147, 51, 234)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="rgb(147, 51, 234)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                className="dark:[&>*]:fill-blue-200"
                fontSize={12}
                interval="preserveStartEnd"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                className="dark:[&>*]:fill-blue-200"
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
                strokeWidth={3}
                fill="url(#pressureGradient)"
                name={t.stats.pressure}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
