"use client"

import { Github, Twitter, Linkedin, Mail, Cloud, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ]

  return (
    <footer className="relative mt-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/20 border-t border-border/50">
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full floating-particles"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo et description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <Cloud className="h-8 w-8 text-primary animate-soft-pulse" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm scale-150 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                WeatherBoard Pro
              </h3>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Une application météorologique moderne et intuitive qui vous offre des prévisions précises 
              avec une interface élégante et des animations sophistiquées.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <Button
                    key={link.label}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary/10 hover:scale-110 transition-all duration-300 cascade-animation"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{link.label}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Liens Rapides</h4>
            <ul className="space-y-2">
              {["Accueil", "Prévisions", "Cartes", "API"].map((item, index) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform inline-block cascade-animation"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Fonctionnalités */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Fonctionnalités</h4>
            <ul className="space-y-2">
              {["Temps Réel", "Prévisions 5 Jours", "Graphiques", "Multi-langues"].map((item, index) => (
                <li key={item}>
                  <span className="text-muted-foreground cascade-animation" style={{ animationDelay: `${index * 0.1}s` }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Statistiques et badge */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20 magic-glow">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Disponibilité</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">180+</div>
                <div className="text-sm text-muted-foreground">Pays couverts</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Précision</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">1M+</div>
                <div className="text-sm text-muted-foreground">Utilisateurs</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Copyright et crédits */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>© {currentYear} WeatherBoard Pro. Fait avec</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>par l'équipe de développement</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors duration-300">
                Politique de confidentialité
              </a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors duration-300">
                Conditions d'utilisation
              </a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors duration-300">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Effet de vague en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-indigo-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      </div>
    </footer>
  )
}