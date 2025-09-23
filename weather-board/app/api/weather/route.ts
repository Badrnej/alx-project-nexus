import { NextResponse } from 'next/server'

const DEFAULT_API_KEY = '841770cc35abfe66fd4ff255afd8328c'

function kelvinToCelsius(k: number) {
  return Math.round(k - 273.15)
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')
    if (!q) {
      return NextResponse.json({ error: 'Missing query parameter q (city name or lat,lon)' }, { status: 400 })
    }

    const apiKey = process.env.OPENWEATHER_API_KEY || DEFAULT_API_KEY

    // Support both city name and lat,lon (e.g. "48.85,2.35")
    const isCoords = /^-?\d+(?:\.\d+)?,\s*-?\d+(?:\.\d+)?$/.test(q)

    // If coords provided, call One Call (requires lat & lon). Otherwise use current weather by q and then One Call for forecast
    let currentData: any = null
    let lat: number | null = null
    let lon: number | null = null

    if (isCoords) {
      const [latStr, lonStr] = q.split(',').map((s) => s.trim())
      lat = Number(latStr)
      lon = Number(lonStr)

      const resCur = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
      if (!resCur.ok) throw new Error('OpenWeather current data fetch failed')
      currentData = await resCur.json()
    } else {
      const resCur = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&appid=${apiKey}`)
      if (!resCur.ok) return NextResponse.json({ error: 'City not found' }, { status: resCur.status })
      currentData = await resCur.json()
      lat = currentData.coord?.lat
      lon = currentData.coord?.lon
    }

    if (lat == null || lon == null) {
      return NextResponse.json({ error: 'Coordinates not available from OpenWeather response' }, { status: 500 })
    }

    // Use standard forecast API (5 day / 3 hour forecast) - free tier
    const resForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    if (!resForecast.ok) throw new Error('OpenWeather forecast fetch failed')
    const forecast = await resForecast.json()

    // Process forecast data into hourly and daily
    const hourlyData = (forecast.list || []).slice(0, 24).map((item: any) => ({
      time: new Date(item.dt * 1000).toISOString(),
      temperature: kelvinToCelsius(item.main?.temp),
      humidity: item.main?.humidity,
      windSpeed: Math.round(item.wind?.speed * 3.6),
      pressure: item.main?.pressure,
    }))

    // Group forecast by day for daily data
    const dailyMap = new Map()
    forecast.list?.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0]
      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          date,
          temps: [],
          conditions: [],
          icons: [],
          humidities: [],
          windSpeeds: [],
        })
      }
      const day = dailyMap.get(date)
      day.temps.push(kelvinToCelsius(item.main?.temp))
      day.conditions.push(item.weather?.[0]?.main)
      day.icons.push(item.weather?.[0]?.icon)
      day.humidities.push(item.main?.humidity)
      day.windSpeeds.push(Math.round(item.wind?.speed * 3.6))
    })

    const dailyData = Array.from(dailyMap.values()).slice(0, 7).map((day: any) => ({
      date: day.date,
      maxTemp: Math.max(...day.temps),
      minTemp: Math.min(...day.temps),
      condition: day.conditions[0], // Use first condition of the day
      icon: day.icons[0], // Use first icon of the day
      humidity: Math.round(day.humidities.reduce((a: number, b: number) => a + b, 0) / day.humidities.length),
      windSpeed: Math.round(day.windSpeeds.reduce((a: number, b: number) => a + b, 0) / day.windSpeeds.length),
    }))

    const normalized = {
      location: currentData.name,
      country: currentData.sys?.country,
      temperature: kelvinToCelsius(currentData.main?.temp),
      feelsLike: kelvinToCelsius(currentData.main?.feels_like),
      condition: currentData.weather?.[0]?.main,
      icon: currentData.weather?.[0]?.icon,
      humidity: currentData.main?.humidity,
      windSpeed: Math.round(currentData.wind?.speed * 3.6), // m/s to km/h
      pressure: currentData.main?.pressure,
      visibility: (currentData.visibility ?? null) !== null ? Math.round((currentData.visibility as number) / 1000) : null,
      localTime: new Date().toISOString(),
      coordinates: { lat, lon },
      hourly: hourlyData,
      daily: dailyData,
    }

    return NextResponse.json(normalized)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 })
  }
}
