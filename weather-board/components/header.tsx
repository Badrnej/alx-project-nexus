"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { WeatherSearch } from "@/components/weather-search"
import { ThemeToggle } from "@/components/theme-toggle"
import { LiquidButton } from "@/components/ui/liquid-button"
import { 
  Cloud, 
  MapPin, 
  Star, 
  Settings, 
  Menu, 
  X,
  ChevronLeft,
  Search
} from "lucide-react"
import { cn } from "@/lib/utils"
import { type UserSettings, type FavoriteCity } from "@/types"

interface HeaderProps {
  currentView: "dashboard" | "temperature" | "humidity" | "wind" | "pressure"
  showFavorites: boolean
  showSettings: boolean
  favorites: FavoriteCity[]
  loading: boolean
  searchHistory: string[]
  isDark: boolean
  settings: UserSettings
  t: any
  onSearch: (query: string) => void
  onGeolocationClick: () => void
  onFavoritesToggle: () => void
  onSettingsToggle: () => void
  onThemeToggle: () => void
  onBackToDashboard: () => void
}

export function Header({
  currentView,
  showFavorites,
  showSettings,
  favorites,
  loading,
  searchHistory,
  isDark,
  settings,
  t,
  onSearch,
  onGeolocationClick,
  onFavoritesToggle,
  onSettingsToggle,
  onThemeToggle,
  onBackToDashboard,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    setMobileSearchOpen(false)
  }

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen)
    setMobileMenuOpen(false)
  }

  const handleMobileAction = (action: () => void) => {
    action()
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="glass-strong border-b border-border/30 fixed-header backdrop-blur-xl relative z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Title */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="p-1.5 sm:p-2 glass-strong rounded-xl border border-border/20">
                  <Cloud className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">
                  {t.appTitle}
                </h1>
              </div>
              
              {/* Version Badge */}
              <Badge variant="secondary" className="text-xs menu-badge hidden sm:inline-flex">
                {t.version}
              </Badge>
              
              {/* Back Button - Desktop */}
              {currentView !== "dashboard" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBackToDashboard}
                  className="glass-strong hover:bg-accent hover:text-accent-foreground border-border/30 transition-all duration-300 ml-2 sm:ml-4 hidden sm:inline-flex"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  {t.common.backToDashboard}
                </Button>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center gap-4">
              {/* Desktop Search */}
              <div className="w-72">
                <WeatherSearch 
                  onSearch={onSearch} 
                  loading={loading} 
                  searchHistory={searchHistory} 
                  t={t} 
                />
              </div>

              {/* Desktop Action Buttons */}
              <div className="flex items-center gap-2">
                <LiquidButton
                  variant="outline"
                  size="icon"
                  onClick={onGeolocationClick}
                  disabled={loading}
                  title="Utiliser ma position actuelle"
                  className="glass-strong border-border/30 hover:bg-accent hover:text-accent-foreground hover:scale-105 transition-all duration-300"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                </LiquidButton>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={onFavoritesToggle}
                  className={cn(
                    "relative glass-strong border-border/30 hover:bg-accent hover:text-accent-foreground transition-all duration-300",
                    showFavorites && "bg-primary/10 border-primary/30 text-primary"
                  )}
                >
                  <Star className={cn("h-4 w-4", 
                    showFavorites ? "text-primary" : "text-muted-foreground")} />
                  {favorites.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs menu-badge animate-pulse">
                      {favorites.length}
                    </Badge>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={onSettingsToggle}
                  className={cn(
                    "glass-strong border-border/30 hover:bg-accent hover:text-accent-foreground transition-all duration-300",
                    showSettings && "bg-primary/10 border-primary/30 text-primary"
                  )}
                >
                  <Settings className={cn("h-4 w-4 transition-transform duration-300", 
                    showSettings ? "rotate-90 text-primary" : "text-muted-foreground")} />
                </Button>

                <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex sm:hidden items-center gap-2">
              {/* Back Button - Mobile */}
              {currentView !== "dashboard" && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onBackToDashboard}
                  className="glass-strong border-border/30 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}

              {/* Mobile Search Toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={toggleMobileSearch}
                className={cn(
                  "glass-strong border-border/30 hover:bg-accent hover:text-accent-foreground transition-all duration-300",
                  mobileSearchOpen && "bg-primary/10 border-primary/30 text-primary"
                )}
              >
                <Search className="h-4 w-4" />
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={toggleMobileMenu}
                className={cn(
                  "glass-strong border-border/30 hover:bg-accent hover:text-accent-foreground transition-all duration-300",
                  mobileMenuOpen && "bg-primary/10 border-primary/30 text-primary"
                )}
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className={cn(
            "sm:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileSearchOpen ? "max-h-20 opacity-100 mt-4" : "max-h-0 opacity-0"
          )}>
            <WeatherSearch 
              onSearch={(query) => {
                onSearch(query)
                setMobileSearchOpen(false)
              }} 
              loading={loading} 
              searchHistory={searchHistory} 
              t={t} 
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "sm:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out",
        mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-background/90 dark:bg-background/95 backdrop-blur-md border-border/10"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu Panel - Centré */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center p-4 transition-all duration-300 ease-in-out mobile-menu-modal",
          mobileMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}>
          <div className="w-full max-w-md max-h-[85vh] centered-mobile-menu rounded-2xl overflow-hidden">
            <div className="p-6 flex flex-col">
              {/* Menu Header */}
              <div className="flex items-center justify-center mb-8 relative">
                <h2
                  className="text-2xl font-bold text-center bg-gradient-to-r from-blue-200 to-blue-500 bg-clip-text text-transparent"
                >
                  {t.mobileMenu.title}
                </h2>
              </div>

              {/* Menu Items - Grille 2x2 Unifiée */}
              <div className="flex-1 overflow-y-auto px-4 py-6 mt-4">
                <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                  {/* Geolocation Card */}
                  <LiquidButton
                    variant="outline"
                    onClick={() => handleMobileAction(onGeolocationClick)}
                    disabled={loading}
                    className="mobile-menu-card group p-3 h-20 flex-col items-center justify-center hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <MapPin className={cn("h-5 w-5 text-primary mb-1 relative z-10", 
                      loading ? "animate-pulse" : "")} />
                    <div className="text-[10px] font-semibold text-foreground text-center relative z-10 leading-tight">
                      {loading ? "Localisation..." : t.mobileMenu.myLocation}
                    </div>
                  </LiquidButton>

                  {/* Favorites Card */}
                  <Button
                    variant="outline"
                    onClick={() => handleMobileAction(onFavoritesToggle)}
                    className={cn(
                      "mobile-menu-card group p-3 h-20 flex-col items-center justify-center hover:scale-[1.02] transition-all duration-300 relative overflow-hidden",
                      showFavorites && "bg-primary/10 border-primary/30 shadow-md"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative mb-1 z-10 flex items-center justify-center">
                      <Star className={cn("h-5 w-5 transition-colors duration-300",
                        favorites.length > 0 ? "text-yellow-500 fill-yellow-500/20" : "text-muted-foreground",
                        showFavorites && "text-primary")} />
                      {favorites.length > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-3 w-3 p-0 text-[8px] menu-badge animate-pulse border-0">
                          {favorites.length}
                        </Badge>
                      )}
                    </div>
                    <div className="text-[10px] font-semibold text-foreground text-center relative z-10 leading-tight">
                      {t.mobileMenu.favorites}
                    </div>
                  </Button>

                  {/* Settings Card */}
                  <Button
                    variant="outline"
                    onClick={() => handleMobileAction(onSettingsToggle)}
                    className={cn(
                      "mobile-menu-card group p-3 h-20 flex-col items-center justify-center hover:scale-[1.02] transition-all duration-300 relative overflow-hidden",
                      showSettings && "bg-primary/10 border-primary/30 shadow-md"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex items-center justify-center mb-1 relative z-10">
                      <Settings className={cn("h-5 w-5 transition-all duration-300",
                        showSettings ? "rotate-90 text-primary" : "text-muted-foreground")} />
                    </div>
                    <div className="text-[10px] font-semibold text-foreground text-center relative z-10 leading-tight">
                      {t.mobileMenu.settings}
                    </div>
                  </Button>

                  {/* Theme Card */}
                  <Button
                    variant="outline"
                    onClick={() => handleMobileAction(onThemeToggle)}
                    className="mobile-menu-card group p-3 h-20 flex-col items-center justify-center hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="mb-1 flex items-center justify-center relative z-10">
                      <div className="scale-75">
                        <ThemeToggle isDark={isDark} onToggle={() => {}} />
                      </div>
                    </div>
                    <div className="text-[10px] font-semibold text-foreground text-center relative z-10 leading-tight">
                      {isDark ? t.mobileMenu.dark : t.settings.light}
                    </div>
                  </Button>
                </div>

                {/* Section Info Rapide - Liquid Glass */}
                <div className="mt-6 p-3 rounded-xl liquid-glass-info max-w-xs mx-auto">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1 w-1 bg-primary rounded-full animate-pulse"></div>
                    <span>{t.mobileMenu.quickAccess}</span>
                    <div className="h-1 w-1 bg-primary rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Menu Footer */}
              <div className="pt-6 mt-6 border-t border-border/30">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <Badge variant="secondary" className="menu-badge text-sm px-6 py-2 font-bold">
                      {t.mobileMenu.version}
                    </Badge>
                  </div>
                  <div className="space-y-4 p-6 rounded-2xl centered-mobile-menu mx-auto max-w-xs">
                    <div className="text-center">
                      <p
                        className="text-lg font-bold bg-gradient-to-r from-blue-200 to-blue-500 bg-clip-text text-transparent"
                      >
                        {t.mobileMenu.appName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t.mobileMenu.by}
                      </p>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                    <div className="text-sm text-muted-foreground opacity-75 space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <span>🌤️</span>
                        <span>{t.mobileMenu.poweredBy}</span>
                      </div>
                      <div className="font-medium">{t.mobileMenu.copyright}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}