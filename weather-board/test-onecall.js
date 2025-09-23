// Test One Call API specifically
const https = require('https');

const DEFAULT_API_KEY = '841770cc35abfe66fd4ff255afd8328c';

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

async function testOneCallAPI() {
  const apiKey = DEFAULT_API_KEY;
  const lat = 48.8566;
  const lon = 2.3522;
  
  const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${apiKey}`;
  
  console.log('Testing One Call API...');
  console.log('URL:', oneCallUrl);
  
  try {
    const data = await httpsGet(oneCallUrl);
    console.log('✅ One Call API Response Keys:', Object.keys(data));
    
    if (data.current) {
      console.log('Current data available');
    }
    
    if (data.hourly) {
      console.log(`Hourly data: ${data.hourly.length} entries`);
    } else {
      console.log('❌ No hourly data');
    }
    
    if (data.daily) {
      console.log(`Daily data: ${data.daily.length} entries`);
    } else {
      console.log('❌ No daily data');
    }
    
    return data;
    
  } catch (error) {
    console.error('❌ One Call API Error:', error.message);
    
    // Test alternative forecast API
    console.log('\n🔄 Testing standard forecast API instead...');
    
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    console.log('Forecast URL:', forecastUrl);
    
    try {
      const forecastData = await httpsGet(forecastUrl);
      console.log('✅ Forecast API Response Keys:', Object.keys(forecastData));
      
      if (forecastData.list) {
        console.log(`Forecast entries: ${forecastData.list.length}`);
        if (forecastData.list.length > 0) {
          console.log('First forecast entry:', {
            dt: forecastData.list[0].dt,
            temp: forecastData.list[0].main?.temp,
            weather: forecastData.list[0].weather?.[0]?.main
          });
        }
      }
      
      return { forecast: forecastData };
      
    } catch (forecastError) {
      console.error('❌ Forecast API Error:', forecastError.message);
      throw forecastError;
    }
  }
}

testOneCallAPI();