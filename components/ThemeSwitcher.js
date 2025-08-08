// components/ThemeSwitcher.js
import { useDarkMode } from '../context/ThemeColorContext'; 
import styles from '../styles/ThemeSwitcher.module.css';

/**
 * 主题切换器组件
 * @returns {JSX.Element} 主题切换器的JSX元素
 */
export default function ThemeSwitcher() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button 
      className={styles.themeSwitcher} 
      onClick={toggleDarkMode} // 使用新的切换函数
      aria-label="Toggle theme"
    >
      {/* 根据当前模式显示不同图标 */}
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
}