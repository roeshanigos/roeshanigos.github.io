import CitySearch from './CitySearch';
import DarkModeToggle from './DarkModeToggle';
import '../styles/Navbar.css';

const Navbar = ({ onCityChange, currentCity, isDarkMode, onToggleDarkMode }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-header">
          <h1 className="brand-text">Roesha's Weather App</h1>
        </div>
        <div className="navbar-search">
          <CitySearch 
            onCityChange={onCityChange}
            currentCity={currentCity}
          />
        </div>

        <div className="navbar-actions">
          <DarkModeToggle 
            isDarkMode={isDarkMode}
            onToggle={onToggleDarkMode}
          />
        </div>
    
      </div>
    </nav>
  );
};

export default Navbar;


