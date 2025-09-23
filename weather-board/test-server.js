#!/usr/bin/env node

// Simple HTTP server to test our API route
const http = require('http');
const { URL } = require('url');

// Import our API route function directly
async function runAPI(req, res) {
  // Simulate NextResponse.json for testing
  const NextResponse = {
    json: (data, options = {}) => {
      res.writeHead(options.status || 200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    }
  };

  // Import and run our API route logic
  try {
    // Re-implement the route logic here for testing
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const q = searchParams.get('q');
    
    if (!q) {
      return NextResponse.json({ error: 'Missing query parameter q (city name or lat,lon)' }, { status: 400 });
    }

    const DEFAULT_API_KEY = '841770cc35abfe66fd4ff255afd8328c';
    const apiKey = process.env.OPENWEATHER_API_KEY || DEFAULT_API_KEY;

    const https = require('https');
    
    function httpsGet(url) {
      return new Promise((resolve, reject) => {
        https.get(url, (response) => {
          let data = '';
          response.on('data', chunk => data += chunk);
          response.on('end', () => {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(e);
            }
          });
        }).on('error', reject);
      });
    }

    function kelvinToCelsius(k) {
      return Math.round(k - 273.15);
    }

    // Support both city name and lat,lon
    const isCoords = /^-?\d+(?:\.\d+)?,\s*-?\d+(?:\.\d+)?$/.test(q);
    
    let currentData = null;
    let lat = null;
    let lon = null;
    
    if (isCoords) {
      const [latStr, lonStr] = q.split(',').map(s => s.trim());
      lat = Number(latStr);
      lon = Number(lonStr);
      
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      currentData = await httpsGet(currentUrl);
    } else {
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&appid=${apiKey}`;
      currentData = await httpsGet(currentUrl);
      lat = currentData.coord?.lat;
      lon = currentData.coord?.lon;
    }
    
    if (lat == null || lon == null) {
      return NextResponse.json({ error: 'Coordinates not available from OpenWeather response' }, { status: 500 });
    }

    // Use standard forecast API
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const forecast = await httpsGet(forecastUrl);

    // Process forecast data
    const hourlyData = (forecast.list || []).slice(0, 24).map(item => ({
      time: new Date(item.dt * 1000).toISOString(),
      temperature: kelvinToCelsius(item.main?.temp),
      humidity: item.main?.humidity,
      windSpeed: Math.round(item.wind?.speed * 3.6),
      pressure: item.main?.pressure,
    }));

    // Group forecast by day for daily data
    const dailyMap = new Map();
    forecast.list?.forEach(item => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          date,
          temps: [],
          conditions: [],
          icons: [],
          humidities: [],
          windSpeeds: [],
        });
      }
      const day = dailyMap.get(date);
      day.temps.push(kelvinToCelsius(item.main?.temp));
      day.conditions.push(item.weather?.[0]?.main);
      day.icons.push(item.weather?.[0]?.icon);
      day.humidities.push(item.main?.humidity);
      day.windSpeeds.push(Math.round(item.wind?.speed * 3.6));
    });

    const dailyData = Array.from(dailyMap.values()).slice(0, 7).map(day => ({
      date: day.date,
      maxTemp: Math.max(...day.temps),
      minTemp: Math.min(...day.temps),
      condition: day.conditions[0],
      icon: day.icons[0],
      humidity: Math.round(day.humidities.reduce((a, b) => a + b, 0) / day.humidities.length),
      windSpeed: Math.round(day.windSpeeds.reduce((a, b) => a + b, 0) / day.windSpeeds.length),
    }));

    const normalized = {
      location: currentData.name,
      country: currentData.sys?.country,
      temperature: kelvinToCelsius(currentData.main?.temp),
      feelsLike: kelvinToCelsius(currentData.main?.feels_like),
      condition: currentData.weather?.[0]?.main,
      icon: currentData.weather?.[0]?.icon,
      humidity: currentData.main?.humidity,
      windSpeed: Math.round(currentData.wind?.speed * 3.6),
      pressure: currentData.main?.pressure,
      visibility: (currentData.visibility !== null && currentData.visibility !== undefined) 
        ? Math.round(currentData.visibility / 1000) : null,
      localTime: new Date().toISOString(),
      coordinates: { lat, lon },
      hourly: hourlyData,
      daily: dailyData,
    };

    return NextResponse.json(normalized);

  } catch (err) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}

// Create server
const server = http.createServer(async (req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  if (req.url.startsWith('/api/weather')) {
    try {
      await runAPI(req, res);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const PORT = 3006;
server.listen(PORT, () => {
  console.log(`🚀 Test API Server running on http://localhost:${PORT}`);
  console.log(`📍 Test endpoints:`);
  console.log(`   http://localhost:${PORT}/api/weather?q=Paris`);
  console.log(`   http://localhost:${PORT}/api/weather?q=London`);
  console.log(`   http://localhost:${PORT}/api/weather?q=48.8566,2.3522`);
  console.log(`\n🧪 Press Ctrl+C to stop`);
});

// Handle shutdown gracefully
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down test server...');
  server.close(() => {
    process.exit(0);
  });
});