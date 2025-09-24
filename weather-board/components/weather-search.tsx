"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Loader2, Clock, X, MapPin } from "lucide-react"
import type { Translations } from "@/lib/translations"

interface WeatherSearchProps {
  onSearch: (city: string) => void
  loading?: boolean
  searchHistory?: string[]
  t: Translations
}

export function WeatherSearch({ onSearch, loading = false, searchHistory = [], t }: WeatherSearchProps) {
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Popular cities for suggestions
  const popularCities = [
    "Paris",
    "London",
    "New York",
    "Tokyo",
    "Sydney",
    "Berlin",
    "Madrid",
    "Rome",
    "Amsterdam",
    "Barcelona",
    "Vienna",
    "Prague",
    "Budapest",
    "Warsaw",
    "Stockholm",
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (value.length > 0) {
      // Filter suggestions based on input
      const filtered = [
        ...searchHistory.filter((city) => city.toLowerCase().includes(value.toLowerCase())),
        ...popularCities.filter(
          (city) => city.toLowerCase().includes(value.toLowerCase()) && !searchHistory.includes(city),
        ),
      ].slice(0, 5)

      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      setQuery("")
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (city: string) => {
    onSearch(city)
    setQuery("")
    setShowSuggestions(false)
  }

  const handleFocus = () => {
    if (query.length === 0 && (searchHistory.length > 0 || popularCities.length > 0)) {
      setSuggestions([...searchHistory.slice(0, 3), ...popularCities.slice(0, 2)])
      setShowSuggestions(true)
    }
  }

  const clearQuery = () => {
    setQuery("")
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="relative">
          <Input
            ref={inputRef}
            type="text"
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            className="pl-4 pr-10 w-72 glass-strong border-border/50 focus:border-primary/50 transition-all duration-300"
            disabled={loading}
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearQuery}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 glass hover:glass-strong transition-all duration-300"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        <Button
          type="submit"
          disabled={loading || !query.trim()}
          className="glass-strong hover:scale-105 transition-all duration-300"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </form>

      {/* Enhanced Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <div className="glass-strong rounded-2xl p-4 shadow-2xl border border-border/50">
            <div className="space-y-2">
              {searchHistory.length > 0 && suggestions.some((city) => searchHistory.includes(city)) && (
                <div className="pb-2 mb-2 border-b border-border/30">
                  <p className="text-xs text-muted-foreground font-medium mb-2">{t.common.recentSearches}</p>
                </div>
              )}
              {suggestions.map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(city)}
                  className="w-full text-left p-3 glass rounded-xl hover:glass-strong transition-all duration-300 flex items-center gap-3 group"
                >
                  <div className="p-1 glass rounded-lg group-hover:scale-110 transition-transform duration-300">
                    {searchHistory.includes(city) ? (
                      <Clock className="h-4 w-4 text-blue-500" />
                    ) : (
                      <MapPin className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">{city}</span>
                    <p className="text-xs text-muted-foreground">
                      {searchHistory.includes(city) ? "Recherche récente" : "Ville populaire"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
