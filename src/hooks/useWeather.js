import { useState, useEffect } from 'react';
import { getForecast, processForecastData, getCurrentWeather } from '../services/weatherService';

const useWeather = (city = 'Dallas') => {
  const [forecast, setForecast] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getForecast(city);
      const processedData = processForecastData(data);
      const current = getCurrentWeather(data);
      
      setForecast(processedData);
      setCurrentWeather(current);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]); // Refetch when city changes

  return {
    forecast,
    currentWeather,
    loading,
    error,
    refetch: fetchWeather
  };
};

export default useWeather;
