import React from 'react';
import Image from 'next/image';

interface WeatherIconProps {
  condition: string;
  size?: number;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  condition, 
  size = 80, 
  className = "" 
}) => {
  // Mapping des conditions météo vers les noms de fichiers d'icônes
  const getIconName = (weatherCondition: string) => {
    const normalizedCondition = weatherCondition.toLowerCase();
    
    if (normalizedCondition.includes('clear') || normalizedCondition.includes('sunny') || 
        normalizedCondition.includes('ensoleillé') || normalizedCondition.includes('dégagé')) {
      return 'clear-day';
    }
    if (normalizedCondition.includes('partly') && normalizedCondition.includes('cloud')) {
      return 'partly-cloudy-day';
    }
    if (normalizedCondition.includes('cloud') || normalizedCondition.includes('nuageux') || 
        normalizedCondition.includes('peu nuageux')) {
      return 'cloudy';
    }
    if (normalizedCondition.includes('rain') || normalizedCondition.includes('pluie') || 
        normalizedCondition.includes('pluvieux')) {
      return 'rain';
    }
    if (normalizedCondition.includes('drizzle') || normalizedCondition.includes('bruine')) {
      return 'drizzle';
    }
    if (normalizedCondition.includes('thunderstorm') || normalizedCondition.includes('orage')) {
      return 'thunderstorms';
    }
    if (normalizedCondition.includes('snow') || normalizedCondition.includes('neige')) {
      return 'snow';
    }
    if (normalizedCondition.includes('mist') || normalizedCondition.includes('fog')) {
      return 'fog';
    }
    if (normalizedCondition.includes('wind')) {
      return 'wind';
    }
    if (normalizedCondition.includes('hail')) {
      return 'hail';
    }
    
    // Icône par défaut
    return 'clear-day';
  };

  const iconName = getIconName(condition);
  
  return (
    <div className={className} style={{ width: size, height: size }}>
      <Image
        src={`/weather-icons/${iconName}.svg`}
        alt={condition}
        width={size}
        height={size}
        className="weather-icon drop-shadow-lg"
        priority
      />
    </div>
  );
};

// Composant pour les icônes spécifiques aux détails météo
export const WeatherDetailIcon: React.FC<{
  type: 'humidity' | 'pressure' | 'wind' | 'temperature' | 'visibility' | 'gauge' | 'uv-index' | 'sunrise' | 'sunset' | 'moon' | 'compass';
  size?: number;
  className?: string;
}> = ({ type, size = 40, className = "" }) => {
  const iconMap = {
    humidity: 'humidity',
    pressure: 'barometer', 
    wind: 'wind',
    temperature: 'thermometer',
    visibility: 'fog',
    gauge: 'barometer',
    'uv-index': 'uv-index',
    sunrise: 'sunrise',
    sunset: 'sunset',
    moon: 'moon-full',
    compass: 'compass'
  };
  
  const iconName = iconMap[type];
  
  return (
    <div className={className} style={{ width: size, height: size }}>
      <Image
        src={`/weather-icons/${iconName}.svg`}
        alt={type}
        width={size}
        height={size}
        className="weather-detail-icon drop-shadow-lg"
        priority
      />
    </div>
  );
};

export default WeatherIcon;
