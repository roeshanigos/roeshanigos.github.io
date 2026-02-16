import { useState } from 'react';
import '../styles/CitySearch.css';

const CitySearch = ({ onCityChange, currentCity }) => {
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) { // Only search if input is not empty
      setIsSearching(true);
      onCityChange(searchInput.trim());
      setSearchInput('');
      setTimeout(() => setIsSearching(false), 1000);
    }
  };

  return (
    <div className="city-search">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search city (e.g., Houston, San Antonio)"
          className="search-input"
          disabled={isSearching}
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={isSearching || !searchInput.trim()}
        >
          {isSearching ? '🔍' : '→'}
        </button>
      </form>
    </div>
  );
};

export default CitySearch;
