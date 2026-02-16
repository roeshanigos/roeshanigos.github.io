import '../styles/TemperatureToggle.css';

const TemperatureToggle = ({ isCelsius, onToggle }) => {
  return (
    <div className="temperature-toggle">
      <button
        className={`toggle-button ${!isCelsius ? 'active' : ''}`}
        onClick={onToggle}
        aria-label="Switch to Fahrenheit"
      >
        °F
      </button>
      <button
        className={`toggle-button ${isCelsius ? 'active' : ''}`}
        onClick={onToggle}
        aria-label="Switch to Celsius"
      >
        °C
      </button>
    </div>
  );
};

export default TemperatureToggle;
