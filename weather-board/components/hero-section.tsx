"use client"

import { useEffect, useState } from "react"
import { Cloud, Sun, CloudRain, Snowflake, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface HeroSectionProps {
  currentWeather?: any
  t: any
}

export default function HeroSection({ currentWeather, t }: HeroSectionProps) {
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (condition: string) => {
    const icons = {
      sunny: Sun,
      cloudy: Cloud,
      rainy: CloudRain,
      snowy: Snowflake,
      stormy: Zap,
    }
    return icons[condition as keyof typeof icons] || Cloud
  }

  const WeatherIcon = currentWeather ? getWeatherIcon(currentWeather.condition) : Cloud

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Arrière-plan animé avec particules météorologiques */}
      <div className="absolute inset-0">
        {/* Particules météo animées */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/20 rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `float-particles ${3 + Math.random() * 4}s ease-in-out infinite`,
            }}
          />
        ))}
        
        {/* Gradient animé d'arrière-plan */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-500/10 to-indigo-600/20 animate-gradient-xy" />
        
        {/* Overlay avec effet de verre */}
        <div className="absolute inset-0 backdrop-blur-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      {/* Contenu principal du héros */}
      <div className="relative z-10 text-center space-y-8 px-4">
        {/* Icône météo principale avec animations */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-30 scale-150 animate-soft-pulse" />
          <div className="relative p-8 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
            <WeatherIcon 
              className="h-24 w-24 text-white animate-elegant-bounce" 
              style={{
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
                animation: 'elegant-bounce 3s ease-in-out infinite, smooth-rotate 20s linear infinite'
              }}
            />
          </div>
          
          {/* Anneaux orbitaux */}
          <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-spin" style={{animationDuration: '10s'}} />
          <div className="absolute inset-4 rounded-full border border-white/5 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}} />
        </div>

        {/* Titre principal avec effet de typing */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100 leading-tight">
            <span className="inline-block animate-elegant-bounce" style={{animationDelay: '0.1s'}}>W</span>
            <span className="inline-block animate-elegant-bounce" style={{animationDelay: '0.2s'}}>e</span>
            <span className="inline-block animate-elegant-bounce" style={{animationDelay: '0.3s'}}>a</span>
            <span className="inline-block animate-elegant-bounce" style={{animationDelay: '0.4s'}}>t</span>
            <span className="inline-block animate-elegant-bounce" style={{animationDelay: '0.5s'}}>h</span>
            <span className="inline-block animate-elegant-bounce" style={{animationDelay: '0.6s'}}>e</span>
            <span className="inline-block animate-elegant-bounce" style={{animationDelay: '0.7s'}}>r</span>
            <span className="mx-4" />
            <span className="inline-block animate-elegant-bounce" style={{animationDelay: '0.8s'}}>P</span>
            <span className="inline-block animate-elegant-bounce" style={{animationDelay: '0.9s'}}>r</span>
            <span className="inline-block animate-elegant-bounce" style={{animationDelay: '1.0s'}}>o</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
            {t?.hero?.subtitle || "Découvrez la météo avec style et précision"}
          </p>
        </div>

        {/* Données météo actuelles si disponibles */}
        {currentWeather && (
          <Card className="inline-block bg-white/10 backdrop-blur-md border-white/20 shadow-2xl magic-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">{currentWeather.temperature}°</div>
                  <div className="text-white/70 text-sm">{currentWeather.location}</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <div className="text-white/90 text-lg capitalize">{currentWeather.condition}</div>
                  <div className="text-white/70 text-sm">Ressenti {currentWeather.feelsLike}°</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Indicateur de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Éléments décoratifs flottants */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/20 rounded-full animate-ping" style={{animationDelay: '1s'}} />
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-blue-300/30 rounded-full animate-ping" style={{animationDelay: '2s'}} />
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-300/30 rounded-full animate-ping" style={{animationDelay: '3s'}} />
    </div>
  )
}