import { type Language } from "@/lib/translations"

export interface FavoriteCity {
  id: string
  name: string
  country: string
  coordinates: {
    lat: number
    lon: number
  }
  addedAt: string
}

export interface UserSettings {
  temperatureUnit: "celsius" | "fahrenheit"
  windSpeedUnit: "kmh" | "mph"
  pressureUnit: "hpa" | "inHg"
  timeFormat: "24h" | "12h"
  autoRefresh: boolean
  refreshInterval: number
  showCharts: boolean
  showForecast: boolean
  theme: "light" | "dark" | "auto"
  language: Language
}

export const defaultSettings: UserSettings = {
  temperatureUnit: "celsius",
  windSpeedUnit: "kmh",
  pressureUnit: "hpa",
  timeFormat: "24h",
  autoRefresh: true,
  refreshInterval: 300000, // 5 minutes
  showCharts: true,
  showForecast: true,
  theme: "auto",
  language: "fr",
}