const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "841770cc35abfe66fd4ff255afd8328c"
const BASE_URL = process.env.NEXT_PUBLIC_OPENWEATHER_BASE_URL || "https://api.openweathermap.org/data/2.5"
const GEO_URL = process.env.NEXT_PUBLIC_OPENWEATHER_GEO_URL || "https://api.openweathermap.org/geo/1.0"

export interface WeatherData {
  location: string
  country: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  pressure: number
  visibility: number
  feelsLike: number
  icon: string
  localTime: string
  coordinates: {
    lat: number
    lon: number
  }
  sunrise: string
  sunset: string
  uvIndex: number
  dewPoint: number
  cloudCover: number
}

export interface ForecastDay {
  date: string
  maxTemp: number
  minTemp: number
  condition: string
  icon: string
  humidity: number
  windSpeed: number
  precipitation: number
  sunrise: string
  sunset: string
}

export interface HourlyData {
  time: string
  temperature: number
  condition: string
  icon: string
  humidity: number
  windSpeed: number
  precipitation: number
  pressure?: number
}

export interface GeolocationData {
  name: string
  country: string
  state?: string
  lat: number
  lon: number
}

// Conversion des icônes OpenWeather vers des icônes personnalisées
const getWeatherIcon = (iconCode: string): string => {
  const iconMap: { [key: string]: string } = {
    '01d': '☀️',
    '01n': '🌙',
    '02d': '⛅',
    '02n': '☁️',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧️',
    '09n': '🌧️',
    '10d': '🌦️',
    '10n': '🌧️',
    '11d': '⛈️',
    '11n': '⛈️',
    '13d': '❄️',
    '13n': '❄️',
    '50d': '🌫️',
    '50n': '🌫️',
  }
  return iconMap[iconCode] || '☀️'
}

// Rechercher des villes par nom
export async function searchCities(query: string): Promise<GeolocationData[]> {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`)
    }
    
    const data = await response.json()
    return data.map((city: any) => ({
      name: city.name,
      country: city.country,
      state: city.state,
      lat: city.lat,
      lon: city.lon,
    }))
  } catch (error) {
    console.error('Erreur lors de la recherche de villes:', error)
    throw error
  }
}

// Obtenir les données météo actuelles
export async function getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
    )
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`)
    }
    
    const data = await response.json()
    
    return {
      location: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Conversion m/s en km/h
      pressure: data.main.pressure,
      visibility: data.visibility ? Math.round(data.visibility / 1000) : 10, // Conversion en km
      feelsLike: Math.round(data.main.feels_like),
      icon: getWeatherIcon(data.weather[0].icon),
      localTime: new Date().toLocaleString('fr-FR'),
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon,
      },
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      uvIndex: 0, // Nécessite un appel séparé à l'API UV
      dewPoint: Math.round(data.main.temp - ((100 - data.main.humidity) / 5)),
      cloudCover: data.clouds.all,
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données météo:', error)
    throw error
  }
}

// Obtenir les prévisions météo sur 5 jours
export async function getWeatherForecast(lat: number, lon: number): Promise<{
  daily: ForecastDay[]
  hourly: HourlyData[]
}> {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
    )
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Traitement des données horaires (prochaines 24 heures)
    const hourly: HourlyData[] = data.list.slice(0, 8).map((item: any) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      temperature: Math.round(item.main.temp),
      condition: item.weather[0].description,
      icon: getWeatherIcon(item.weather[0].icon),
      humidity: item.main.humidity,
      windSpeed: Math.round(item.wind.speed * 3.6),
      precipitation: item.rain ? Math.round((item.rain['3h'] || 0) * 10) / 10 : 0,
      pressure: item.main.pressure, // Ajouter la pression des données horaires
    }))
    
    // Groupement par jour pour les prévisions quotidiennes
    const dailyMap = new Map<string, any[]>()
    
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toDateString()
      if (!dailyMap.has(date)) {
        dailyMap.set(date, [])
      }
      dailyMap.get(date)!.push(item)
    })
    
    const daily: ForecastDay[] = Array.from(dailyMap.entries()).slice(0, 5).map(([date, items]) => {
      const temps = items.map(item => item.main.temp)
      const maxTemp = Math.round(Math.max(...temps))
      const minTemp = Math.round(Math.min(...temps))
      
      // Prendre les données du milieu de journée (vers 12h)
      const midDayItem = items.find(item => {
        const hour = new Date(item.dt * 1000).getHours()
        return hour >= 12 && hour <= 15
      }) || items[0]
      
      return {
        date: new Date(date).toLocaleDateString('fr-FR', { 
          weekday: 'short', 
          day: 'numeric', 
          month: 'short' 
        }),
        maxTemp,
        minTemp,
        condition: midDayItem.weather[0].description,
        icon: getWeatherIcon(midDayItem.weather[0].icon),
        humidity: Math.round(items.reduce((sum, item) => sum + item.main.humidity, 0) / items.length),
        windSpeed: Math.round(items.reduce((sum, item) => sum + item.wind.speed, 0) / items.length * 3.6),
        precipitation: items.reduce((sum, item) => sum + (item.rain ? item.rain['3h'] || 0 : 0), 0),
        sunrise: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        sunset: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      }
    })
    
    return { daily, hourly }
  } catch (error) {
    console.error('Erreur lors de la récupération des prévisions:', error)
    throw error
  }
}

// Obtenir les données météo par nom de ville
export async function getWeatherByCity(cityName: string): Promise<{
  current: WeatherData
  forecast: { daily: ForecastDay[], hourly: HourlyData[] }
}> {
  try {
    // D'abord, obtenir les coordonnées de la ville
    const cities = await searchCities(cityName)
    if (cities.length === 0) {
      throw new Error('Ville non trouvée')
    }
    
    const city = cities[0]
    
    // Ensuite, obtenir les données météo
    const [current, forecast] = await Promise.all([
      getCurrentWeather(city.lat, city.lon),
      getWeatherForecast(city.lat, city.lon)
    ])
    
    return { current, forecast }
  } catch (error) {
    console.error('Erreur lors de la récupération des données météo par ville:', error)
    throw error
  }
}

// Obtenir les données météo par géolocalisation
export async function getWeatherByGeolocation(): Promise<{
  current: WeatherData
  forecast: { daily: ForecastDay[], hourly: HourlyData[] }
}> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('La géolocalisation n\'est pas supportée par ce navigateur'))
      return
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const [current, forecast] = await Promise.all([
            getCurrentWeather(latitude, longitude),
            getWeatherForecast(latitude, longitude)
          ])
          
          resolve({ current, forecast })
        } catch (error) {
          reject(error)
        }
      },
      (error) => {
        reject(new Error('Erreur de géolocalisation: ' + error.message))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  })
}