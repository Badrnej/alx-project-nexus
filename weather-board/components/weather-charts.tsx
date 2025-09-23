"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

// ... existing interfaces ...

interface WeatherChartsProps {
  hourlyData: HourlyData[]
  settings?: UserSettings
  t: Translations
}

export function WeatherCharts({ hourlyData, settings, t }: WeatherChartsProps) {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const tempUnit = settings?.temperatureUnit === "fahrenheit" ? "°F" : "°C"
      const windUnit = settings?.windSpeedUnit === "mph" ? "mph" : "km/h"
      const pressureUnit = settings?.pressureUnit === "inHg" ? "inHg" : "hPa"

      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{`${t.charts.time}: ${label}`}</p>
          {payload.map((entry: any, index: number) => {
            let unit = ""
            if (entry.name === t.stats.temperature) unit = tempUnit
            else if (entry.name === t.stats.humidity) unit = "%"
            else if (entry.name === t.stats.wind) unit = ` ${windUnit}`
            else if (entry.name === t.stats.pressure) unit = ` ${pressureUnit}`

            return (
              <p key={index} className="text-sm" style={{ color: entry.color }}>
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
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">{t.charts.title}</h2>
        <Badge variant="outline" className="text-xs">
          24h
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature Chart */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              {t.charts.temperatureEvolution} ({tempUnit})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(59, 130, 246)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="rgb(59, 130, 246)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} interval="preserveStartEnd" />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={["dataMin - 2", "dataMax + 2"]} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="temperature"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth={2}
                  fill="url(#temperatureGradient)"
                  name={t.stats.temperature}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Humidity Chart */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Droplets className="h-5 w-5 text-cyan-600" />
              {t.charts.humidityRate} (%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} interval="preserveStartEnd" />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="rgb(6, 182, 212)"
                  strokeWidth={2}
                  dot={{ fill: "rgb(6, 182, 212)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "rgb(6, 182, 212)", strokeWidth: 2 }}
                  name={t.stats.humidity}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Wind Speed Chart */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Wind className="h-5 w-5 text-indigo-600" />
              {t.charts.windSpeed} ({windUnit})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} interval="preserveStartEnd" />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="windSpeed" fill="rgb(99, 102, 241)" radius={[2, 2, 0, 0]} name={t.stats.wind} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pressure Chart */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Gauge className="h-5 w-5 text-purple-600" />
              {t.charts.atmosphericPressure} ({pressureUnit})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="pressureGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(147, 51, 234)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="rgb(147, 51, 234)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} interval="preserveStartEnd" />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={["dataMin - 5", "dataMax + 5"]} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="pressure"
                  stroke="rgb(147, 51, 234)"
                  strokeWidth={2}
                  fill="url(#pressureGradient)"
                  name={t.stats.pressure}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
