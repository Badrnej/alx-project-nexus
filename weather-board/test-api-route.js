// Test our Next.js API route logic
const https = require('https');

const DEFAULT_API_KEY = '841770cc35abfe66fd4ff255afd8328c';

function kelvinToCelsius(k) {
  return Math.round(k - 273.15);
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function simulateAPIRoute(q) {
  console.log(`\n🧪 Testing API route logic for: ${q}`);
  
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY || DEFAULT_API_KEY;
    
    // Check if q is coordinates
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
      throw new Error('Coordinates not available');
    }
    
    // Get One Call data
    const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${apiKey}`;
    const oneCallData = await httpsGet(oneCallUrl);
    
    // Normalize data like our API route does
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
      visibility: (currentData.visibility !== null && currentData.visibility !== undefined) 
        ? Math.round(currentData.visibility / 1000) : null,
      localTime: new Date((oneCallData.current?.dt ?? Date.now() / 1000) * 1000).toISOString(),
      coordinates: { lat, lon },
      hourly: (oneCallData.hourly || []).slice(0, 24).map(h => ({
        time: new Date(h.dt * 1000).toISOString(),
        temperature: kelvinToCelsius(h.temp),
        humidity: h.humidity,
        windSpeed: Math.round(h.wind_speed * 3.6),
        pressure: h.pressure,
      })),
      daily: (oneCallData.daily || []).slice(0, 7).map(d => ({
        date: new Date(d.dt * 1000).toISOString().split('T')[0],
        maxTemp: kelvinToCelsius(d.temp?.max),
        minTemp: kelvinToCelsius(d.temp?.min),
        condition: d.weather?.[0]?.main,
        icon: d.weather?.[0]?.icon,
        humidity: d.humidity,
        windSpeed: Math.round(d.wind_speed * 3.6),
      })),
    };
    
    console.log('✅ API Route Logic Test Results:');
    console.log(`Location: ${normalized.location}, ${normalized.country}`);
    console.log(`Temperature: ${normalized.temperature}°C (Feels like: ${normalized.feelsLike}°C)`);
    console.log(`Condition: ${normalized.condition} (${normalized.icon})`);
    console.log(`Humidity: ${normalized.humidity}%`);
    console.log(`Wind Speed: ${normalized.windSpeed} km/h`);
    console.log(`Pressure: ${normalized.pressure} hPa`);
    console.log(`Visibility: ${normalized.visibility} km`);
    console.log(`Coordinates: ${normalized.coordinates.lat}, ${normalized.coordinates.lon}`);
    console.log(`Hourly data points: ${normalized.hourly.length}`);
    console.log(`Daily forecast days: ${normalized.daily.length}`);
    
    if (normalized.hourly.length > 0) {
      console.log(`First hourly: ${normalized.hourly[0].time} - ${normalized.hourly[0].temperature}°C`);
    }
    
    if (normalized.daily.length > 0) {
      console.log(`Tomorrow: ${normalized.daily[1]?.date} - ${normalized.daily[1]?.maxTemp}°C/${normalized.daily[1]?.minTemp}°C`);
    }
    
    return normalized;
    
  } catch (error) {
    console.error('❌ API Route Logic Error:', error.message);
    throw error;
  }
}

async function runAPITests() {
  const testCases = [
    'Paris',
    'London', 
    '48.8566,2.3522', // Paris coordinates
    'Tokyo'
  ];
  
  console.log('🚀 Testing Next.js API Route Logic\n');
  console.log('=' .repeat(60));
  
  for (const testCase of testCases) {
    try {
      await simulateAPIRoute(testCase);
      console.log('\n' + '-'.repeat(60));
    } catch (error) {
      console.error(`Failed to test ${testCase}:`, error.message);
      console.log('\n' + '-'.repeat(60));
    }
  }
}

runAPITests();