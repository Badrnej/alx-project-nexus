"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, X, Trash2, Heart } from "lucide-react"
import type { Translations } from "@/lib/translations"

interface FavoriteCity {
  id: string
  name: string
  country: string
  coordinates: {
    lat: number
    lon: number
  }
  addedAt: string
}

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
    <div className="fixed inset-0 bg-background/20 backdrop-blur-md z-40" onClick={onClose}>
      <div
        className="fixed top-20 right-4 w-96 max-h-[calc(100vh-6rem)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass-strong rounded-3xl p-6 shadow-2xl border border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 glass rounded-xl">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
              </div>
              <h2 className="text-xl font-bold text-foreground">{t.favorites.title}</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="glass hover:glass-strong transition-all duration-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {favorites.length > 0 && (
            <Badge variant="secondary" className="glass mb-6">
              {favorites.length} {favorites.length > 1 ? t.favorites.cities : t.favorites.city}
            </Badge>
          )}

          <div className="max-h-96 overflow-y-auto">
            {favorites.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="p-4 glass rounded-2xl w-fit mx-auto">
                  <Heart className="h-12 w-12 text-muted-foreground opacity-50" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">{t.favorites.noFavorites}</p>
                  <p className="text-xs text-muted-foreground">{t.favorites.noFavoritesDesc}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {favorites.map((favorite) => (
                  <div
                    key={favorite.id}
                    className="group glass-strong rounded-2xl p-4 hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-border/30 hover:border-primary/30"
                    onClick={() => onSelect(favorite)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-1 glass rounded-lg">
                            <MapPin className="h-4 w-4 text-primary" />
                          </div>
                          <h3 className="font-semibold text-foreground">{favorite.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{favorite.country}</p>

                        <div className="grid grid-cols-1 gap-2">
                          <div className="glass rounded-lg p-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Ajouté le</span>
                              <span className="font-medium text-foreground">{formatDate(favorite.addedAt)}</span>
                            </div>
                          </div>
                          <div className="glass rounded-lg p-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Coordonnées</span>
                              <span className="font-medium text-foreground">
                                {favorite.coordinates.lat.toFixed(2)}°, {favorite.coordinates.lon.toFixed(2)}°
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          onRemove(favorite.id)
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-destructive hover:text-destructive hover:bg-destructive/10 glass hover:glass-strong ml-3"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
