const https = require('https');
const { URL } = require('url');

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

async function testWeatherAPI(city = 'Paris') {
  console.log(`Testing OpenWeather API for: ${city}`);
  
  const apiKey = process.env.OPENWEATHER_API_KEY || DEFAULT_API_KEY;
  
  // Test current weather API
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;
  
  try {
    const data = await httpsGet(currentUrl);
    
    console.log('✅ API Response received:');
    console.log(`Location: ${data.name}, ${data.sys?.country}`);
    console.log(`Temperature: ${kelvinToCelsius(data.main?.temp)}°C`);
    console.log(`Condition: ${data.weather?.[0]?.main}`);
    console.log(`Humidity: ${data.main?.humidity}%`);
    console.log(`Wind Speed: ${Math.round(data.wind?.speed * 3.6)} km/h`);
    console.log(`Pressure: ${data.main?.pressure} hPa`);
    console.log(`Coordinates: ${data.coord?.lat}, ${data.coord?.lon}`);
    
    return data;
  } catch (error) {
    console.error('❌ API Error:', error.message);
    throw error;
  }
}

// Test with different cities
async function runTests() {
  const cities = ['Paris', 'London', 'New York', 'Tokyo'];
  
  for (const city of cities) {
    try {
      console.log('\n' + '='.repeat(50));
      await testWeatherAPI(city);
    } catch (error) {
      console.error(`Failed to test ${city}:`, error.message);
    }
  }
}

runTests();