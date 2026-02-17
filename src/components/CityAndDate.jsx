import '../styles/CityAndDate.css';

const CityAndDate = ({ currentWeather}) => {
  const {date, city} = currentWeather;
 
  return (
   <div className="city-date-container">
        <div className="location">
          <span className="location-icon"> <img 
            src="/assets/location-pin.png" 
            alt="Location Icon" 
          /></span>
          <span className="location-name">{city}</span>
        </div>
        <div className="date-time">
             <span className="date-text">{date}</span>
        </div>
      </div>
  );
};

export default CityAndDate;
