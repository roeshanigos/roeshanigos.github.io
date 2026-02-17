import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WeatherAnimation from './components/WeatherAnimation';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import CityAndDate from './components/CityAndDate';
import ForecastList from './components/ForecastList';
import TemperatureToggle from './components/TemperatureToggle';
import './styles/App.css';
import './styles/DarkMode.css';
import useWeather from './hooks/useWeather';

function App() {
  const [isCelsius, setIsCelsius] = useState(false);
  const [city, setCity] = useState('Dallas');
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const { forecast, currentWeather, loading, error } = useWeather(city);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTemperature = () => {
    setIsCelsius(!isCelsius);
  };

  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      {currentWeather && (
        <WeatherAnimation condition={currentWeather.condition} />
      )}

      <Navbar 
        onCityChange={handleCityChange}
        currentCity={city}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <main className="app-main">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>⚠️ {error}</p>
            <button onClick={() => setCity('Dallas')}>
              Back to Dallas
            </button>
          </div>
        )}

        {!loading && !error && forecast && currentWeather && (
          <div className="weather-container">
            <div className="weather-container-header">
              <CityAndDate currentWeather={currentWeather} />
            </div>
            <CurrentWeatherCard 
              currentWeather={currentWeather}
              isCelsius={isCelsius}
              onToggle={toggleTemperature}
            />
            <ForecastList 
              forecast={forecast} 
              isCelsius={isCelsius} 
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;