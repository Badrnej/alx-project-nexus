"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Settings, X, Thermometer, Clock, RefreshCw, BarChart3, Calendar, Palette, Languages } from "lucide-react"
import type { Translations, Language } from "@/lib/translations"

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
  language: Language
}

interface SettingsPanelProps {
  settings: UserSettings
  onSettingsChange: (settings: UserSettings) => void
  onClose: () => void
  t: Translations
}

export function SettingsPanel({ settings, onSettingsChange, onClose, t }: SettingsPanelProps) {
  const handleSettingChange = (key: keyof UserSettings, value: any) => {
    const newSettings = { ...settings, [key]: value }
    onSettingsChange(newSettings)
  }

  const refreshIntervalOptions = [
    { value: 60000, label: t.settings.intervals["1min"] },
    { value: 300000, label: t.settings.intervals["5min"] },
    { value: 600000, label: t.settings.intervals["10min"] },
    { value: 1800000, label: t.settings.intervals["30min"] },
    { value: 3600000, label: t.settings.intervals["1hour"] },
  ]

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={onClose}>
      <div
        className="fixed top-20 right-4 w-96 max-h-[calc(100vh-6rem)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-card/95 backdrop-blur-sm border-border/50 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                {t.settings.title}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="max-h-96 overflow-y-auto space-y-6">
            {/* Language Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-primary" />
                <h3 className="font-medium text-foreground">{t.settings.language}</h3>
              </div>

              <div className="pl-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t.settings.language}</span>
                  <Select
                    value={settings.language}
                    onValueChange={(value: Language) => handleSettingChange("language", value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Units Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-primary" />
                <h3 className="font-medium text-foreground">{t.settings.units}</h3>
              </div>

              <div className="space-y-3 pl-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t.settings.temperature}</span>
                  <Select
                    value={settings.temperatureUnit}
                    onValueChange={(value: "celsius" | "fahrenheit") => handleSettingChange("temperatureUnit", value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="celsius">°C</SelectItem>
                      <SelectItem value="fahrenheit">°F</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t.settings.windSpeed}</span>
                  <Select
                    value={settings.windSpeedUnit}
                    onValueChange={(value: "kmh" | "mph") => handleSettingChange("windSpeedUnit", value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kmh">km/h</SelectItem>
                      <SelectItem value="mph">mph</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t.settings.pressure}</span>
                  <Select
                    value={settings.pressureUnit}
                    onValueChange={(value: "hpa" | "inHg") => handleSettingChange("pressureUnit", value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hpa">hPa</SelectItem>
                      <SelectItem value="inHg">inHg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Theme Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-primary" />
                <h3 className="font-medium text-foreground">{t.settings.appearance}</h3>
              </div>

              <div className="pl-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t.settings.theme}</span>
                  <Select
                    value={settings.theme}
                    onValueChange={(value: "light" | "dark" | "auto") => handleSettingChange("theme", value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">{t.settings.light}</SelectItem>
                      <SelectItem value="dark">{t.settings.dark}</SelectItem>
                      <SelectItem value="auto">{t.settings.auto}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Display Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                <h3 className="font-medium text-foreground">{t.settings.display}</h3>
              </div>

              <div className="space-y-3 pl-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{t.settings.showCharts}</span>
                  </div>
                  <Switch
                    checked={settings.showCharts}
                    onCheckedChange={(checked) => handleSettingChange("showCharts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{t.settings.showForecast}</span>
                  </div>
                  <Switch
                    checked={settings.showForecast}
                    onCheckedChange={(checked) => handleSettingChange("showForecast", checked)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Auto Refresh Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-primary" />
                <h3 className="font-medium text-foreground">{t.settings.autoRefresh}</h3>
              </div>

              <div className="space-y-3 pl-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t.settings.autoRefresh}</span>
                  <Switch
                    checked={settings.autoRefresh}
                    onCheckedChange={(checked) => handleSettingChange("autoRefresh", checked)}
                  />
                </div>

                {settings.autoRefresh && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t.settings.refreshInterval}</span>
                    <Select
                      value={settings.refreshInterval.toString()}
                      onValueChange={(value) => handleSettingChange("refreshInterval", Number.parseInt(value))}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {refreshIntervalOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Time Format Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <h3 className="font-medium text-foreground">{t.settings.timeFormat}</h3>
              </div>

              <div className="pl-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t.settings.timeFormat}</span>
                  <Select
                    value={settings.timeFormat}
                    onValueChange={(value: "24h" | "12h") => handleSettingChange("timeFormat", value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">24h</SelectItem>
                      <SelectItem value="12h">12h</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const defaultSettings = {
                    temperatureUnit: "celsius" as const,
                    windSpeedUnit: "kmh" as const,
                    pressureUnit: "hpa" as const,
                    timeFormat: "24h" as const,
                    autoRefresh: true,
                    refreshInterval: 300000,
                    showCharts: true,
                    showForecast: true,
                    theme: "auto" as const,
                    language: "fr" as const,
                  }
                  onSettingsChange(defaultSettings)
                }}
                className="w-full"
              >
                {t.settings.reset}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
