// Test updated API route with standard forecast API
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

async function testUpdatedAPIRoute(q = 'Paris') {
  console.log(`🧪 Testing Updated API Route Logic for: ${q}`);
  
  try {
    const apiKey = DEFAULT_API_KEY;
    
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
    
    // Use standard forecast API (5 day / 3 hour forecast) - free tier
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    console.log(`📊 Fetching forecast from: ${forecastUrl}`);
    const forecast = await httpsGet(forecastUrl);
    
    console.log(`📋 Forecast entries received: ${forecast.list?.length || 0}`);
    
    // Process forecast data into hourly and daily
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
      condition: day.conditions[0], // Use first condition of the day
      icon: day.icons[0], // Use first icon of the day
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
    
    console.log('\n✅ Updated API Route Results:');
    console.log(`📍 Location: ${normalized.location}, ${normalized.country}`);
    console.log(`🌡️  Temperature: ${normalized.temperature}°C (Feels like: ${normalized.feelsLike}°C)`);
    console.log(`☁️  Condition: ${normalized.condition} (${normalized.icon})`);
    console.log(`💧 Humidity: ${normalized.humidity}%`);
    console.log(`💨 Wind Speed: ${normalized.windSpeed} km/h`);
    console.log(`🔽 Pressure: ${normalized.pressure} hPa`);
    console.log(`👁️  Visibility: ${normalized.visibility} km`);
    console.log(`🎯 Coordinates: ${normalized.coordinates.lat}, ${normalized.coordinates.lon}`);
    console.log(`⏰ Hourly data points: ${normalized.hourly.length}`);
    console.log(`📅 Daily forecast days: ${normalized.daily.length}`);
    
    if (normalized.hourly.length > 0) {
      console.log(`🕐 First hourly: ${normalized.hourly[0].time.split('T')[1].split('.')[0]} - ${normalized.hourly[0].temperature}°C`);
      console.log(`🕕 Last hourly: ${normalized.hourly[normalized.hourly.length-1].time.split('T')[1].split('.')[0]} - ${normalized.hourly[normalized.hourly.length-1].temperature}°C`);
    }
    
    if (normalized.daily.length > 0) {
      console.log(`📆 Today: ${normalized.daily[0]?.date} - ${normalized.daily[0]?.maxTemp}°C/${normalized.daily[0]?.minTemp}°C - ${normalized.daily[0]?.condition}`);
      if (normalized.daily[1]) {
        console.log(`📆 Tomorrow: ${normalized.daily[1]?.date} - ${normalized.daily[1]?.maxTemp}°C/${normalized.daily[1]?.minTemp}°C - ${normalized.daily[1]?.condition}`);
      }
    }
    
    return normalized;
    
  } catch (error) {
    console.error('❌ Updated API Route Error:', error.message);
    throw error;
  }
}

async function runUpdatedTests() {
  const testCases = [
    'Paris',
    'London', 
    '48.8566,2.3522', // Paris coordinates
    'New York'
  ];
  
  console.log('🚀 Testing Updated Next.js API Route with Standard Forecast API\n');
  console.log('=' .repeat(80));
  
  for (const testCase of testCases) {
    try {
      await testUpdatedAPIRoute(testCase);
      console.log('\n' + '-'.repeat(80));
    } catch (error) {
      console.error(`Failed to test ${testCase}:`, error.message);
      console.log('\n' + '-'.repeat(80));
    }
  }
}

runUpdatedTests();