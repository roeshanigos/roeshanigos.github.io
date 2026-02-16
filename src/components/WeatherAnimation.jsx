import '../styles/WeatherAnimation.css';

const WeatherAnimation = ({ condition }) => {
  if (!condition) return null;

  const conditionLower = condition.toLowerCase();

  const showClouds = conditionLower.includes('cloud');
  const showRain = conditionLower.includes('rain') || conditionLower.includes('drizzle');
  const showThunderstorm = conditionLower.includes('thunder') || conditionLower.includes('storm');
  const showSnow = conditionLower.includes('snow');

  return (
    <div className="weather-animation">
      {showClouds && (
        <div className="clouds-container">
          <div className="cloud cloud-1">☁️</div>
          <div className="cloud cloud-2">☁️</div>
          <div className="cloud cloud-3">☁️</div>
        </div>
      )}

      {showRain && (
        <div className="rain-container">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="raindrop"
              style={{
                left: `${Math.random() * 100}%`, // Random horizontal position
                animationDelay: `${Math.random() * 2}s`, // Random delay before the raindrop starts falling
                animationDuration: `${0.5 + Math.random() * 0.5}s` // Random duration for the raindrop to fall
              }}
            />
          ))}
        </div>
      )}

      {showThunderstorm && (
        <>
          <div className="rain-container thunderstorm">
            {[...Array(80)].map((_, i) => (
              <div 
                key={i} 
                className="raindrop heavy"
                style={{
                  left: `${Math.random() * 100}%`, // Random horizontal position
                  animationDelay: `${Math.random() * 2}s`, // Random delay before the thunderstorm raindrop starts falling
                  animationDuration: `${0.3 + Math.random() * 0.3}s` // Faster fall for thunderstorm raindrops
                }}
              />
            ))}
          </div>
          <div className="lightning-container">
            <div className="lightning lightning-1"></div>
            <div className="lightning lightning-2"></div>
          </div>
        </>
      )}

      {showSnow && (
        <div className="snow-container">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="snowflake"
              style={{
                left: `${Math.random() * 100}%`, // Random horizontal position
                animationDelay: `${Math.random() * 3}s`, // Random delay before the snowflake starts falling
                animationDuration: `${2 + Math.random() * 3}s`, // Random duration for the snowflake to fall
                fontSize: `${Math.random() * 10}px` // Random size for snowflakes
              }}
            >
              ❄️
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherAnimation;