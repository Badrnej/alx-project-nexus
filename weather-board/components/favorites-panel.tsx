"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, X, Trash2 } from "lucide-react"
import type { Translations } from "@/lib/translations"

// ... existing interfaces ...

interface FavoritesPanelProps {
  favorites: FavoriteCity[]
  onSelect: (favorite: FavoriteCity) => void
  onRemove: (favoriteId: string) => void
  onClose: () => void
  t: Translations
}

export function FavoritesPanel({ favorites, onSelect, onRemove, onClose, t }: FavoritesPanelProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    })
  }

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
                <Star className="h-5 w-5 text-primary fill-current" />
                {t.favorites.title}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            {favorites.length > 0 && (
              <Badge variant="secondary" className="w-fit">
                {favorites.length} {favorites.length > 1 ? t.favorites.cities : t.favorites.city}
              </Badge>
            )}
          </CardHeader>

          <CardContent className="max-h-96 overflow-y-auto">
            {favorites.length === 0 ? (
              <div className="text-center py-8 space-y-3">
                <Star className="h-12 w-12 text-muted-foreground mx-auto opacity-50" />
                <div>
                  <p className="text-sm font-medium text-foreground">{t.favorites.noFavorites}</p>
                  <p className="text-xs text-muted-foreground">{t.favorites.noFavoritesDesc}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {favorites.map((favorite) => (
                  <div
                    key={favorite.id}
                    className="group bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-3 border border-primary/10 hover:border-primary/20 transition-all cursor-pointer"
                    onClick={() => onSelect(favorite)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="h-4 w-4 text-primary" />
                          <h3 className="font-medium text-foreground">{favorite.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{favorite.country}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>
                            {t.favorites.addedOn} {formatDate(favorite.addedAt)}
                          </span>
                          <span>
                            {favorite.coordinates.lat.toFixed(2)}°, {favorite.coordinates.lon.toFixed(2)}°
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          onRemove(favorite.id)
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
