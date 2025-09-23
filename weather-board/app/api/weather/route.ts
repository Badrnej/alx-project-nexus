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

    // One Call for forecast (exclude minutely to reduce payload)
    const resOne = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${apiKey}`)
    if (!resOne.ok) throw new Error('OpenWeather onecall fetch failed')
    const one = await resOne.json()

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
      localTime: new Date((one.current?.dt ?? Date.now() / 1000) * 1000).toISOString(),
      coordinates: { lat, lon },
      hourly: (one.hourly || []).slice(0, 24).map((h: any) => ({
        time: new Date(h.dt * 1000).toISOString(),
        temperature: kelvinToCelsius(h.temp),
        humidity: h.humidity,
        windSpeed: Math.round(h.wind_speed * 3.6),
        pressure: h.pressure,
      })),
      daily: (one.daily || []).slice(0, 7).map((d: any) => ({
        date: new Date(d.dt * 1000).toISOString().split('T')[0],
        maxTemp: kelvinToCelsius(d.temp?.max),
        minTemp: kelvinToCelsius(d.temp?.min),
        condition: d.weather?.[0]?.main,
        icon: d.weather?.[0]?.icon,
        humidity: d.humidity,
        windSpeed: Math.round(d.wind_speed * 3.6),
      })),
    }

    return NextResponse.json(normalized)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 })
  }
}
