import WeatherCard from './WeatherCard';
import '../styles/ForecastList.css';

const ForecastList = ({ forecast, isCelsius }) => {
  if (!forecast || forecast.length === 0) {
    return <p>No forecast data available</p>;
  }

  return (
    <div className="forecast-list">
      {forecast.map((day, index) => (
        <WeatherCard 
          key={index}
          day={day}
          isCelsius={isCelsius}
          isToday={false}
        />
      ))}
    </div>
  );
};

export default ForecastList;
