import React from 'react';
import { WeatherIcon, WeatherDetailIcon } from './weather-icons';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export const WeatherIconTest: React.FC = () => {
  const conditions = [
    'clear',
    'sunny', 
    'cloudy',
    'partly cloudy',
    'rain',
    'drizzle',
    'thunderstorm',
    'snow',
    'fog',
    'wind'
  ];

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Test des icônes @bybas/weather-icons</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-4 mb-8">
          {conditions.map((condition) => (
            <div key={condition} className="flex flex-col items-center space-y-2">
              <WeatherIcon condition={condition} size={48} />
              <span className="text-sm text-center">{condition}</span>
            </div>
          ))}
        </div>
        
        <h3 className="text-lg font-semibold mb-4">Icônes de détails</h3>
        <div className="flex space-x-6">
          <div className="flex flex-col items-center space-y-2">
            <WeatherDetailIcon type="humidity" size={32} />
            <span className="text-sm">Humidité</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <WeatherDetailIcon type="temperature" size={32} />
            <span className="text-sm">Température</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <WeatherDetailIcon type="wind" size={32} />
            <span className="text-sm">Vent</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <WeatherDetailIcon type="pressure" size={32} />
            <span className="text-sm">Pression</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherIconTest;