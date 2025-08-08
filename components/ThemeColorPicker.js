// components/ThemeColorPicker.js
import { useState } from 'react';
import { useThemeColor } from '../context/ThemeColorContext';
import styles from '../styles/ThemeColorPicker.module.css';

export default function ThemeColorPicker() {
  const { themeColor, changeThemeColor, themeColors } = useThemeColor();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button 
        className={styles.pickerButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme color"
        style={{ color: themeColor }}
      >
        🎨
      </button>
      
      {isOpen && (
        <div className={styles.colorPicker}>
          {themeColors.map((color) => (
            <button
              key={color}
              className={styles.colorOption}
              style={{ 
                backgroundColor: color,
                borderColor: color === themeColor ? 'white' : 'var(--text-color)'
              }}
              onClick={() => {
                changeThemeColor(color);
                setIsOpen(false);
              }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}