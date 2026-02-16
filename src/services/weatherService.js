import axios from 'axios';

const API_URL = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

const getCoordinates = async (city) => {
  try {
    const response = await axios.get(GEOCODING_URL, {
      params: {
        name: city,
        count: 1,
        language: 'en',
        format: 'json'
      }
    });

    if (response.data.results && response.data.results.length > 0) {
      const result = response.data.results[0];
      return {
        latitude: result.latitude,
        longitude: result.longitude,
        name: result.name,
        country: result.country
      };
    }
    throw new Error('Location not found');
  } catch (error) {
    throw new Error('Unable to find location coordinates');
  }
};

// returns Promise Weather forecast data
export const getForecast = async (cityName = 'Dallas') => {
  try {
    // Get coordinates for the city
    const locationData = await getCoordinates(cityName);
    
    const response = await axios.get(API_URL, {
      params: {
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        daily: 'weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max',
        current_weather: true,
        temperature_unit: 'fahrenheit',
        windspeed_unit: 'mph',
        timezone: 'auto',
        forecast_days: 6  // today + 5 future days
      }
    });

    return {
      ...response.data,
      cityInfo: {
        name: locationData.name,
        country: locationData.country
      }
    };
  } catch (error) {
    if (error.message === 'Unable to find location coordinates') {
      throw new Error(`City "${cityName}" not found. Please try another city.`);
    } else if (error.response) {
      throw new Error(`Weather API Error: ${error.response.data.reason || 'Unable to fetch weather data'}`);
    } else if (error.request) {
      throw new Error('Unable to reach weather service. Please check your connection.');
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const getCurrentWeather = (forecastData) => {
  if (!forecastData || !forecastData.current_weather) {
    return null;
  }

  const current = forecastData.current_weather;
  const condition = getWeatherCondition(current.weathercode);
  console.log(forecastData);

  return {
    temp: current.temperature,
    condition: condition.main,
    description: condition.description,
    icon: condition.icon,
    windSpeed: current.windspeed,
    humidity: 0, // Not provided 
    city: forecastData.cityInfo?.name ?? 'Dallas, Texas',
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  };
};

export const processForecastData = (forecastData) => {
  if (!forecastData || !forecastData.daily) {
    return [];
  }

  const daily = forecastData.daily;
  const forecasts = [];

  for (let i = 1; i < Math.min(6, daily.time.length); i++) {
    const date = new Date(daily.time[i]);
    const weathercode = daily.weathercode[i];
    const condition = getWeatherCondition(weathercode);

    forecasts.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      high: Math.round(daily.temperature_2m_max[i]),
      low: Math.round(daily.temperature_2m_min[i]),
      condition: condition.main,
      humidity: 0, 
      windSpeed: Math.round(daily.windspeed_10m_max[i]),
      icon: condition.icon,
      description: condition.description
    });
  }

  return forecasts;
};

// returns weather condition details with Weatherbit icon code
const getWeatherCondition = (code) => {
  const weatherCodes = {
    // Clear
    0: { main: 'Clear', description: 'Clear sky', icon: 'c01d' },
    1: { main: 'Clear', description: 'Mainly clear', icon: 'c02d' },
    
    // Clouds
    2: { main: 'Clouds', description: 'Partly cloudy', icon: 'c02d' },
    3: { main: 'Clouds', description: 'Overcast', icon: 'c04d' },
    
    // Fog
    45: { main: 'Fog', description: 'Foggy', icon: 'a05d' },
    48: { main: 'Fog', description: 'Depositing rime fog', icon: 'a06d' },
    
    // Drizzle
    51: { main: 'Drizzle', description: 'Light drizzle', icon: 'd01d' },
    53: { main: 'Drizzle', description: 'Moderate drizzle', icon: 'd02d' },
    55: { main: 'Drizzle', description: 'Dense drizzle', icon: 'd03d' },
    
    // Rain
    61: { main: 'Rain', description: 'Slight rain', icon: 'r01d' },
    63: { main: 'Rain', description: 'Moderate rain', icon: 'r02d' },
    65: { main: 'Rain', description: 'Heavy rain', icon: 'r03d' },
    
    // Snow
    71: { main: 'Snow', description: 'Slight snow', icon: 's01d' },
    73: { main: 'Snow', description: 'Moderate snow', icon: 's02d' },
    75: { main: 'Snow', description: 'Heavy snow', icon: 's06d' },
    77: { main: 'Snow', description: 'Snow grains', icon: 's02d' },
    
    // Rain Showers
    80: { main: 'Rain', description: 'Slight rain showers', icon: 'r04d' },
    81: { main: 'Rain', description: 'Moderate rain showers', icon: 'r05d' },
    82: { main: 'Rain', description: 'Violent rain showers', icon: 'r06d' },
    
    // Snow Showers
    85: { main: 'Snow', description: 'Slight snow showers', icon: 's01d' },
    86: { main: 'Snow', description: 'Heavy snow showers', icon: 's02d' },
    
    // Thunderstorm
    95: { main: 'Thunderstorm', description: 'Thunderstorm', icon: 't01d' },
    96: { main: 'Thunderstorm', description: 'Thunderstorm with slight hail', icon: 't04d' },
    99: { main: 'Thunderstorm', description: 'Thunderstorm with heavy hail', icon: 't05d' }
  };

  return weatherCodes[code] || { main: 'Unknown', description: 'Unknown', icon: 'c02d' };
};