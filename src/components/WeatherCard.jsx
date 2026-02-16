import WeatherIcon from './WeatherIcon';
import { fahrenheitToCelsius } from '../utils/helpers';
import '../styles/WeatherCard.css';

const WeatherCard = ({ day, isCelsius, isToday }) => {
  const { date, high, low, condition, humidity, windSpeed, icon, description } = day;

  const displayHigh = isCelsius ? fahrenheitToCelsius(high) : high;
  const displayLow = isCelsius ? fahrenheitToCelsius(low) : low;
  const tempUnit = isCelsius ? '°C' : '°F';

  return (
    <div className={`weather-card ${isToday ? 'today' : ''}`}>
      
      <div className="card-header">
        <h3 className="date">{date}</h3>
      </div>

      <div className="card-body">
        <WeatherIcon condition={condition} icon={icon} />
        <div className="temperature">
          <span className="temp-high">{displayHigh}{tempUnit}</span>
          <span className="temp-divider">/</span>
          <span className="temp-low">{displayLow}{tempUnit}</span>
        </div>

        <p className="condition">{description}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
