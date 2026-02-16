import '../styles/WeatherIcon.css';

const WeatherIcon = ({ condition, icon}) => { 
  const iconUrl = `https://cdn.weatherbit.io/static/img/icons/${icon}.png`;
  return (
    <div className={`weather-icon`}>
      <img src={iconUrl} alt={condition} className="icon-img" />
    </div>
  );
};

export default WeatherIcon;
