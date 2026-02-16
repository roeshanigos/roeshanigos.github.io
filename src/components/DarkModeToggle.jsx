import '../styles/DarkModeToggle.css';

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <button 
      className="dark-mode-toggle"
      onClick={onToggle}
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? '☀️' : '🌚'}
    </button>
  );
};

export default DarkModeToggle;