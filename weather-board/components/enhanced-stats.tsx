"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Thermometer, Droplets, Wind, Gauge, Eye, MapPin } from "lucide-react"
import { useState, useEffect } from "react"

interface EnhancedStatsProps {
  weather: any
  settings: any
  t: any
  expandedDetail: string | null
  onToggleDetail: (type: string) => void
  getDetailedInfo: (type: string, weather: any) => any
}

export default function EnhancedStats({ 
  weather, 
  settings, 
  t, 
  expandedDetail, 
  onToggleDetail, 
  getDetailedInfo 
}: EnhancedStatsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [animatedValues, setAnimatedValues] = useState({
    temperature: 0,
    humidity: 0,
    windSpeed: 0,
    pressure: 0
  })

  // Animation des valeurs numériques
  useEffect(() => {
    if (!weather) return
    
    const animateValue = (start: number, end: number, duration: number, callback: (value: number) => void) => {
      const startTimestamp = performance.now()
      const step = (timestamp: number) => {
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        const value = start + (end - start) * easeOutCubic(progress)
        callback(Math.round(value * 10) / 10)
        if (progress < 1) {
          requestAnimationFrame(step)
        }
      }
      requestAnimationFrame(step)
    }

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    animateValue(0, weather.temperature, 1500, (value) => 
      setAnimatedValues(prev => ({ ...prev, temperature: value }))
    )
    animateValue(0, weather.humidity, 1200, (value) => 
      setAnimatedValues(prev => ({ ...prev, humidity: value }))
    )
    animateValue(0, weather.windSpeed, 1800, (value) => 
      setAnimatedValues(prev => ({ ...prev, windSpeed: value }))
    )
    animateValue(0, weather.pressure, 2000, (value) => 
      setAnimatedValues(prev => ({ ...prev, pressure: value }))
    )
  }, [weather])

  const statsConfig = [
    {
      id: 'temperature',
      icon: Thermometer,
      label: t.stats.temperature,
      value: animatedValues.temperature,
      unit: `°${settings.temperatureUnit === "celsius" ? "C" : "F"}`,
      gradient: 'from-red-500/20 to-orange-500/10',
      hoverGradient: 'from-red-500/30 to-orange-500/20',
      iconColor: 'text-red-600',
      textGradient: 'from-red-600 to-orange-500',
      bgColor: 'bg-red-50 dark:bg-red-950/30',
      borderColor: 'border-red-200 dark:border-red-800',
      progressColor: 'from-red-400 to-orange-500',
      progress: Math.min(100, (weather?.temperature + 20) * 2),
      animationDelay: '0.1s'
    },
    {
      id: 'humidity',
      icon: Droplets,
      label: t.stats.humidity,
      value: animatedValues.humidity,
      unit: '%',
      gradient: 'from-cyan-500/20 to-blue-500/10',
      hoverGradient: 'from-cyan-500/30 to-blue-500/20',
      iconColor: 'text-cyan-600',
      textGradient: 'from-cyan-600 to-blue-500',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/30',
      borderColor: 'border-cyan-200 dark:border-cyan-800',
      progressColor: 'from-cyan-400 to-blue-500',
      progress: weather?.humidity || 0,
      animationDelay: '0.2s'
    },
    {
      id: 'wind',
      icon: Wind,
      label: t.stats.wind,
      value: animatedValues.windSpeed,
      unit: settings.windSpeedUnit === "kmh" ? "km/h" : "mph",
      gradient: 'from-green-500/20 to-emerald-500/10',
      hoverGradient: 'from-green-500/30 to-emerald-500/20',
      iconColor: 'text-green-600',
      textGradient: 'from-green-600 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      borderColor: 'border-green-200 dark:border-green-800',
      progressColor: 'from-green-400 to-emerald-500',
      progress: Math.min(100, (weather?.windSpeed / 50) * 100),
      animationDelay: '0.3s'
    },
    {
      id: 'pressure',
      icon: Gauge,
      label: t.stats.pressure,
      value: animatedValues.pressure,
      unit: settings.pressureUnit === "hpa" ? "hPa" : "inHg",
      gradient: 'from-purple-500/20 to-violet-500/10',
      hoverGradient: 'from-purple-500/30 to-violet-500/20',
      iconColor: 'text-purple-600',
      textGradient: 'from-purple-600 to-violet-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
      borderColor: 'border-purple-200 dark:border-purple-800',
      progressColor: 'from-purple-400 to-violet-500',
      progress: Math.min(100, ((weather?.pressure - 950) / 100) * 100),
      animationDelay: '0.4s'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig.map((stat, index) => {
        const Icon = stat.icon
        const isExpanded = expandedDetail === stat.id
        const isHovered = hoveredCard === stat.id

        return (
          <Card
            key={stat.id}
            className={`relative overflow-hidden cursor-pointer transition-all duration-700 transform hover:scale-105 hover:shadow-2xl group border-2 ${
              isHovered ? 'shadow-2xl scale-105' : 'shadow-lg'
            } ${isExpanded ? 'ring-2 ring-primary ring-offset-2' : ''} morphing-border cascade-animation`}
            style={{ 
              animationDelay: stat.animationDelay,
              background: `linear-gradient(135deg, ${isHovered ? stat.hoverGradient : stat.gradient})`,
            }}
            onClick={() => onToggleDetail(stat.id)}
            onMouseEnter={() => setHoveredCard(stat.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Effet de vague animée */}
            <div className="absolute inset-0 wave-effect opacity-40" />
            
            {/* Particules flottantes */}
            <div className="absolute top-2 right-2 w-1 h-1 bg-white/40 rounded-full floating-particles" />
            <div className="absolute bottom-3 left-3 w-2 h-2 bg-white/30 rounded-full floating-particles" style={{animationDelay: '2s'}} />
            
            {/* Lueur d'arrière-plan */}
            <div className={`absolute -inset-4 bg-gradient-to-r ${stat.progressColor} opacity-20 blur-2xl rounded-full transition-all duration-700 ${isHovered ? 'scale-150 opacity-30' : 'scale-100'}`} />
            
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : ''} neomorphism`}>
                  <Icon className={`h-6 w-6 ${stat.iconColor} transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`} />
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{stat.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl font-bold bg-gradient-to-r ${stat.textGradient} bg-clip-text text-transparent transition-all duration-300`}>
                      {stat.value}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{stat.unit}</span>
                  </div>
                </div>
              </div>

              {/* Barre de progression animée */}
              <div className="relative">
                <div className="w-full bg-gray-200/30 dark:bg-gray-700/30 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.progressColor} rounded-full transition-all duration-1000 ease-out transform origin-left`}
                    style={{ 
                      width: `${stat.progress}%`,
                      transform: isHovered ? 'scaleY(1.5)' : 'scaleY(1)'
                    }}
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white/80 rounded-full shadow-lg transition-all duration-500" 
                     style={{ left: `${Math.max(0, stat.progress - 2)}%` }} />
              </div>

              {/* Détails extensibles avec animations améliorées */}
              {isExpanded && (
                <div className={`mt-6 p-4 rounded-xl ${stat.bgColor} border ${stat.borderColor} detail-expansion animate-slide-down backdrop-blur-sm`}>
                  <h4 className={`font-bold ${stat.iconColor} mb-3 flex items-center gap-2`}>
                    <Icon className="h-4 w-4" />
                    {getDetailedInfo(stat.id, weather)?.title}
                  </h4>
                  <ul className={`text-sm ${stat.iconColor} space-y-2`}>
                    {getDetailedInfo(stat.id, weather)?.content.map((info: string, index: number) => (
                      <li 
                        key={index} 
                        className="flex items-start gap-2 transform transition-all duration-300 hover:translate-x-2 cascade-animation"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <span className={`${stat.iconColor} mt-1 transition-transform duration-300`}>●</span>
                        <span className="leading-relaxed">{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Indicateur d'interaction */}
              <div className={`absolute bottom-2 right-2 w-2 h-2 rounded-full transition-all duration-300 ${isHovered ? 'bg-white/60 scale-150' : 'bg-white/30'}`} />
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}