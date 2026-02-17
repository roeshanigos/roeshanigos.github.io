import WeatherIcon from './WeatherIcon';
import TemperatureToggle from './TemperatureToggle';
import { fahrenheitToCelsius } from '../utils/helpers';
import '../styles/CurrentWeatherCard.css';

const CurrentWeatherCard = ({ currentWeather, isCelsius, onToggle }) => {
  const { temp, condition, description, windSpeed, date, city, icon } = currentWeather;

  const displayTemp = isCelsius ? fahrenheitToCelsius(temp) : Math.round(temp);
  const tempUnit = isCelsius ? '°C' : '°F';

  const cityTrim = city.split(",")[0].trim();

  return (
    <div className="current-weather-card">
      <div className="current-weather-content-wrapper">
        <div className="current-weather-body">
          <div className="current-weather">
            <div className="temperature-display">
              <span className="temp-large">{displayTemp}°</span>
              <WeatherIcon condition={condition} icon={icon} size="large" />
              <div className="weather-details">
              <p className="condition-text">{description}</p>
              <p className="wind-speed">{Math.round(windSpeed)} mph</p>
            </div>
            </div>
          </div>
          <div className="toggle-container">
            <TemperatureToggle 
              isCelsius={isCelsius} 
              onToggle={onToggle} 
            />
          </div>
        </div>
        <div className="skyline-container">
          <img 
          src={`/assets/${cityTrim}.png`}
          alt={cityTrim}
          className="dallas-skyline"
          onError={(e) => {
          e.target.src = '/assets/City.png'; // Fallback is a generic city image
      }}
    />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
