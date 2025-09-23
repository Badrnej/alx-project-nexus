"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Loader2, Clock, X } from "lucide-react"
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
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            className="pl-10 pr-10 w-64"
            disabled={loading}
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearQuery}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        <Button type="submit" disabled={loading || !query.trim()}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 bg-card/95 backdrop-blur-sm border-border/50">
          <CardContent className="p-2">
            <div className="space-y-1">
              {suggestions.map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(city)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2"
                >
                  {searchHistory.includes(city) ? (
                    <Clock className="h-3 w-3 text-muted-foreground" />
                  ) : (
                    <Search className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span className="text-sm">{city}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
